import { NextRequest, NextResponse } from "next/server"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import { createMockup, generateToken } from "@/lib/mockups"
import type { Mockup, Currency } from "@/lib/mockups"

/**
 * POST /api/admin/mockups
 *
 * Body: form-encoded or JSON with the new mockup's metadata. Screenshots
 * are NOT uploaded here — that happens via the upload endpoint after the
 * mockup is created (so we have a token to namespace them under).
 *
 * Returns: { token: string } on success.
 */
export async function POST(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 })
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  // Validate required fields
  const companyName = strField(body.companyName)
  if (!companyName) {
    return NextResponse.json(
      { error: "companyName is required" },
      { status: 400 },
    )
  }

  const priceMinor = numField(body.priceMinor)
  if (priceMinor === null || priceMinor < 0) {
    return NextResponse.json(
      { error: "priceMinor must be a non-negative number (smallest currency unit, e.g. 350000 for AED 3500)" },
      { status: 400 },
    )
  }

  const currency = strField(body.currency)
  if (!currency || !["AED", "USD", "EUR", "GBP"].includes(currency)) {
    return NextResponse.json(
      { error: "currency must be one of AED, USD, EUR, GBP" },
      { status: 400 },
    )
  }

  const deliverables = arrField<string>(body.deliverables, (v) =>
    typeof v === "string" ? v.trim() : null,
  )
  if (deliverables.length === 0) {
    return NextResponse.json(
      { error: "At least one deliverable is required" },
      { status: 400 },
    )
  }

  const pageLabels = arrField<string>(body.pageLabels, (v) =>
    typeof v === "string" ? v.trim() : null,
  )
  if (pageLabels.length === 0) {
    return NextResponse.json(
      { error: "At least one page is required" },
      { status: 400 },
    )
  }
  if (pageLabels.length > 5) {
    return NextResponse.json(
      { error: "Maximum 5 pages per mockup" },
      { status: 400 },
    )
  }

  // Build mockup
  const token = generateToken(companyName)
  const mockup: Mockup = {
    token,
    companyName,
    contactName: strField(body.contactName) ?? undefined,
    currentWebsite: strField(body.currentWebsite) ?? undefined,
    pages: pageLabels.map((label) => ({
      label,
      // Placeholders — user uploads images next, which patches these URLs
      beforeImage: "",
      afterImage: "",
    })),
    deliverables,
    priceMinor,
    currency: currency as Currency,
    status: "pending",
    createdAt: new Date().toISOString(),
    internalNote: strField(body.internalNote) ?? undefined,
  }

  try {
    await createMockup(mockup)
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Could not create mockup"
    return NextResponse.json({ error: msg }, { status: 500 })
  }

  return NextResponse.json({ token: mockup.token })
}

// ─── small validators ───────────────────────────────────────────

function strField(v: unknown): string | null {
  if (typeof v !== "string") return null
  const t = v.trim()
  return t === "" ? null : t
}

function numField(v: unknown): number | null {
  if (typeof v === "number" && Number.isFinite(v)) return v
  if (typeof v === "string") {
    const n = Number(v.trim())
    if (Number.isFinite(n)) return n
  }
  return null
}

function arrField<T>(v: unknown, validate: (item: unknown) => T | null): T[] {
  if (!Array.isArray(v)) return []
  return v
    .map(validate)
    .filter((x): x is T => x !== null && (typeof x !== "string" || x !== ""))
}
