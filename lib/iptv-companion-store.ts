import { createHash } from 'node:crypto'
import { companionRedis } from './iptv-store'
export const MANAGE_TTL = 1800
export interface RelayMessage { seq: string; packet: { iv: string; data: string } }
interface Result { status: number; body?: RelayMessage }
const globalRelay = globalThis as typeof globalThis & { __tivexoManageMail?: Map<string, { value: string; until: number }> }
const memory = globalRelay.__tivexoManageMail ||= new Map()

/** Only SET EX + GETDEL: compatible with Redis and the existing private
 * pairing store. Senders retry identical sequence IDs until acknowledged.
 * The TV caches replies, so a retry cannot apply a mutation twice. Mailboxes
 * deliberately allow replacement: each phone sends one command at a time and
 * retries the exact same sequence until acknowledged. A delayed old packet is
 * answered from the TV cache; a displaced current packet is retried. Unlike
 * the public six-character pairing code, these mailboxes are private to a
 * 256-bit capability, so first-write-wins is not an authorization boundary.
 * The session capability is shared by its two endpoints, never put in a URL.
 * Encryption binds packets to the session, direction and sequence.
 * Sensitive commands additionally require approval on the TV.
 * The TV owns the hard deadline/revocation and stops executing on close.
 */
async function command(args: string[]): Promise<unknown> {
  const result = await companionRedis(args)
  if (result !== undefined) return result
  for (const [key, entry] of memory) if (entry.until <= Date.now()) memory.delete(key)
  const [op, key, value] = args
  if (op === 'GETDEL') { const found = memory.get(key); memory.delete(key); return found?.value ?? null }
  if (op === 'SET') {
    if (!memory.has(key) && memory.size >= 200) throw new Error('Development relay full')
    memory.set(key, { value, until: Date.now() + MANAGE_TTL * 1000 }); return 'OK'
  }
  throw new Error('Unsupported relay operation')
}
export async function relay(id: string, op: 'create' | 'get' | 'put' | 'delete', role: string, hash: string, payload: object = {}): Promise<Result> {
  const key = 'iptv:manage:' + createHash('sha256').update(id + ':' + hash).digest('hex')
  if (op === 'create') {
    await command(['SET', key + ':probe', '1', 'EX', '60']); await command(['GETDEL', key + ':probe'])
    return { status: 204 }
  }
  if (op === 'delete') { await command(['GETDEL', key + ':command']); await command(['GETDEL', key + ':reply']); return { status: 204 } }
  if (op === 'get') {
    const value = await command(['GETDEL', key + (role === 'tv' ? ':command' : ':reply')])
    return typeof value === 'string' ? { status: 200, body: JSON.parse(value) as RelayMessage } : { status: 204 }
  }
  const result = await command(['SET', key + (role === 'phone' ? ':command' : ':reply'), JSON.stringify(payload), 'EX', String(MANAGE_TTL)])
  if (result !== 'OK') throw new Error('Relay write failed')
  return { status: 204 }
}
