import { NextRequest, NextResponse } from "next/server"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import {
  getMockupSeed,
  replaceMockup,
  deleteMockup,
} from "@/lib/mockups-data"
import { deleteAllScreenshotsForToken } from "@/lib/blob"
import type { Mockup } from "@/lib/mockups"

interface RouteContext {
  params: Promise<{ token: string }>
}

/**
 * PATCH /api/admin/mockups/[token]
 *
 * Updates a subset of mockup fields. Only fields present in the request
 * body are changed. The token cannot be changed via PATCH — to "rename"
 * a mockup, delete + recreate.
 */
export async function PATCH(req: NextRequest, ctx: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 })
  }

  const { token } = await ctx.params
  const existing = await getMockupSeed(token)
  if (!existing) {
    return NextResponse.json({ error: "Mockup not found" }, { status: 404 })
  }

  let patch: Record<string, unknown>
  try {
    patch = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  // Build the next mockup. Whitelist what can be PATCHed — never accept
  // arbitrary fields (token, paidAt, stripeSessionId, etc. are off-limits).
  const next: Mockup = { ...existing }

  if (typeof patch.companyName === "string" && patch.companyName.trim()) {
    next.companyName = patch.companyName.trim()
  }
  if ("contactName" in patch) {
    next.contactName =
      typeof patch.contactName === "string" && patch.contactName.trim()
        ? patch.contactName.trim()
        : undefined
  }
  if ("currentWebsite" in patch) {
    next.currentWebsite =
      typeof patch.currentWebsite === "string" && patch.currentWebsite.trim()
        ? patch.currentWebsite.trim()
        : undefined
  }
  if (typeof patch.priceMinor === "number" && patch.priceMinor >= 0) {
    next.priceMinor = Math.round(patch.priceMinor)
  }
  if (
    typeof patch.currency === "string" &&
    ["AED", "USD", "EUR", "GBP"].includes(patch.currency)
  ) {
    next.currency = patch.currency as Mockup["currency"]
  }
  if (
    typeof patch.status === "string" &&
    ["pending", "paid", "expired"].includes(patch.status)
  ) {
    next.status = patch.status as Mockup["status"]
    if (next.status === "paid" && !next.paidAt) {
      next.paidAt = new Date().toISOString()
    }
  }
  if ("internalNote" in patch) {
    next.internalNote =
      typeof patch.internalNote === "string" && patch.internalNote.trim()
        ? patch.internalNote.trim()
        : undefined
  }
  if (Array.isArray(patch.deliverables)) {
    const items = patch.deliverables
      .filter((d): d is string => typeof d === "string" && d.trim() !== "")
      .map((d) => d.trim())
    if (items.length > 0) next.deliverables = items
  }
  if (Array.isArray(patch.pages)) {
    // Each page must have at least a label; image URLs come from upload
    // endpoint and are preserved when caller passes them through.
    const incoming = patch.pages.filter(
      (p): p is Record<string, unknown> =>
        !!p && typeof p === "object" && typeof (p as { label?: unknown }).label === "string",
    )
    if (incoming.length > 0 && incoming.length <= 5) {
      next.pages = incoming.map((p) => ({
        label: (p.label as string).trim() || "Page",
        beforeImage: typeof p.beforeImage === "string" ? p.beforeImage : "",
        afterImage: typeof p.afterImage === "string" ? p.afterImage : "",
        notes:
          typeof p.notes === "string" && p.notes.trim() ? p.notes.trim() : undefined,
      }))
    }
  }

  try {
    await replaceMockup(token, next)
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Could not update mockup"
    return NextResponse.json({ error: msg }, { status: 500 })
  }

  return NextResponse.json({ ok: true, mockup: next })
}

/**
 * DELETE /api/admin/mockups/[token]
 * Permanently deletes the mockup AND its uploaded screenshots.
 */
export async function DELETE(req: NextRequest, ctx: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 })
  }

  const { token } = await ctx.params
  const existing = await getMockupSeed(token)
  if (!existing) {
    return NextResponse.json({ error: "Mockup not found" }, { status: 404 })
  }

  try {
    await deleteMockup(token)
    // Best-effort: delete uploaded screenshots too. Don't fail the request
    // if this errors — orphaned blobs are an annoyance but not a bug.
    deleteAllScreenshotsForToken(token).catch((err) => {
      console.warn("[admin] Failed to delete screenshots for", token, err)
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Could not delete mockup"
    return NextResponse.json({ error: msg }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
