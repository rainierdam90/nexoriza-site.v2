import { NextRequest, NextResponse } from 'next/server'
import { createHash } from 'node:crypto'
import { z } from 'zod'
import { relay } from '@/lib/iptv-companion-store'
import { consumeRateLimit } from '@/lib/iptv-store'
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
const HEADERS = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Tivexo-Role', 'Access-Control-Expose-Headers': 'Retry-After',
  'Cache-Control': 'no-store', 'Referrer-Policy': 'no-referrer', 'X-Content-Type-Options': 'nosniff' }
const message = z.object({ seq: z.string().regex(/^[a-f0-9]{32}$/), packet: z.object({
  iv: z.string().regex(/^[A-Za-z0-9+/]{16}$/), data: z.string().min(24).max(220000).regex(/^[A-Za-z0-9+/]+={0,2}$/)
}).strict() }).strict()
const create = z.object({ create: z.literal(true), phoneHash: z.string().regex(/^[a-f0-9]{64}$/) }).strict()
type Context = { params: Promise<{ id: string }> }
async function bounded(req: NextRequest): Promise<string | null> {
  if (Number(req.headers.get('content-length')) > 225000) return null
  if (!req.body) return ''
  const reader = req.body.getReader(); const parts: Uint8Array[] = []; let size = 0
  while (true) { const { done, value } = await reader.read(); if (done) break; size += value.length;
    if (size > 225000) { await reader.cancel(); return null } parts.push(value) }
  return Buffer.concat(parts).toString('utf8')
}
async function handle(req: NextRequest, ctx: Context): Promise<NextResponse> {
  const response = (status: number, body?: unknown) => new NextResponse(body === undefined ? null : JSON.stringify(body), { status, headers: { ...HEADERS, 'Content-Type': 'application/json' } })
  try {
    const id = (await ctx.params).id; const role = req.headers.get('x-tivexo-role') || ''
    const token = req.headers.get('authorization')?.replace(/^Bearer /, '') || ''
    if (!/^[a-f0-9]{32}$/.test(id) || !/^[a-f0-9]{64}$/.test(token) || !['tv', 'phone'].includes(role)) return response(404)
    const ip = (req.headers.get('x-vercel-forwarded-for') || req.headers.get('x-real-ip') || req.headers.get('x-forwarded-for') || 'unknown').split(',')[0]
    const limited = await consumeRateLimit('manage:' + ip, 120, 60)
    if (!limited.ok) return new NextResponse(null, { status: 429, headers: { ...HEADERS, 'Retry-After': String(limited.retryAfter) } })
    const hash = createHash('sha256').update(token).digest('hex')
    let op: 'create' | 'get' | 'put' | 'delete' = req.method === 'GET' ? 'get' : req.method === 'DELETE' ? 'delete' : 'put'
    let payload: object = {}
    if (req.method === 'POST') {
      const raw = await bounded(req); if (raw === null) return response(413)
      let body: unknown; try { body = JSON.parse(raw) } catch { return response(400) }
      const created = create.safeParse(body)
      if (created.success && role === 'tv') {
        const limit = await consumeRateLimit('manage-create:' + ip, 5, 60); if (!limit.ok) return response(429)
        op = 'create'; payload = { tv: hash, phone: created.data.phoneHash }
      } else { const parsed = message.safeParse(body); if (!parsed.success) return response(400); payload = parsed.data }
    }
    const result = await relay(id, op, role, hash, payload)
    return response(result.status, result.body)
  } catch { return response(503, { error: 'companion_unavailable' }) }
}
export const GET = handle
export const POST = handle
export const DELETE = handle
export async function OPTIONS() { return new NextResponse(null, { status: 204, headers: HEADERS }) }
export async function HEAD() { return new NextResponse(null, { status: 405, headers: HEADERS }) }
