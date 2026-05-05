import { NextRequest, NextResponse } from "next/server"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import { getMockupSeed, replaceMockup } from "@/lib/mockups-data"
import { uploadScreenshot, deleteScreenshot } from "@/lib/blob"

interface RouteContext {
  params: Promise<{ token: string }>
}

/**
 * POST /api/admin/mockups/[token]/upload
 *
 * Multipart form upload: one file per request, with these fields:
 *   - file: the image (max 4 MB)
 *   - pageIndex: integer 0-based — which page in the mockup
 *   - variant: "before" | "after"
 *
 * On success, updates the mockup's pages[i].{before,after}Image to the new
 * URL and deletes any previously-stored image at that slot. Returns the
 * new URL.
 *
 * Concurrency note: if the admin uploads two files in parallel for the
 * same mockup, there's a small chance one overwrites the other's metadata
 * change. For our scale (one admin, one customer at a time) this is fine.
 * If you ever go multi-admin, swap the JSON-blob storage for a real DB
 * with row-level locking.
 */
export async function POST(req: NextRequest, ctx: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 })
  }

  const { token } = await ctx.params
  const mockup = await getMockupSeed(token)
  if (!mockup) {
    return NextResponse.json({ error: "Mockup not found" }, { status: 404 })
  }

  let formData: FormData
  try {
    formData = await req.formData()
  } catch {
    return NextResponse.json(
      { error: "Invalid form data — expected multipart/form-data" },
      { status: 400 },
    )
  }

  const file = formData.get("file")
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing 'file' field" }, { status: 400 })
  }

  const pageIndexRaw = formData.get("pageIndex")
  const pageIndex = Number(pageIndexRaw)
  if (
    !Number.isInteger(pageIndex) ||
    pageIndex < 0 ||
    pageIndex >= mockup.pages.length
  ) {
    return NextResponse.json(
      { error: `pageIndex must be 0..${mockup.pages.length - 1}` },
      { status: 400 },
    )
  }

  const variant = String(formData.get("variant") ?? "")
  if (variant !== "before" && variant !== "after") {
    return NextResponse.json(
      { error: "variant must be 'before' or 'after'" },
      { status: 400 },
    )
  }

  // Slug for the filename — derived from the page's label so files are
  // self-describing on disk / in blob storage.
  const pageSlug = mockup.pages[pageIndex].label || `page-${pageIndex + 1}`

  let uploadResult
  try {
    uploadResult = await uploadScreenshot(token, file, variant, pageSlug)
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Upload failed"
    return NextResponse.json({ error: msg }, { status: 400 })
  }

  // Delete the previous image at this slot (best-effort, non-blocking)
  const oldUrl =
    variant === "before"
      ? mockup.pages[pageIndex].beforeImage
      : mockup.pages[pageIndex].afterImage
  if (oldUrl) {
    deleteScreenshot(oldUrl).catch((err) => {
      console.warn("[upload] Failed to delete old screenshot:", err)
    })
  }

  // Persist the new URL on the mockup
  const updatedPages = mockup.pages.map((p, i) =>
    i === pageIndex
      ? variant === "before"
        ? { ...p, beforeImage: uploadResult.url }
        : { ...p, afterImage: uploadResult.url }
      : p,
  )

  try {
    await replaceMockup(token, { ...mockup, pages: updatedPages })
  } catch (err) {
    // Roll back the upload if metadata save fails
    deleteScreenshot(uploadResult.url).catch(() => {})
    const msg = err instanceof Error ? err.message : "Could not save mockup"
    return NextResponse.json({ error: msg }, { status: 500 })
  }

  return NextResponse.json({
    url: uploadResult.url,
    pageIndex,
    variant,
  })
}
