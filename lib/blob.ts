/**
 * Screenshot storage helper.
 *
 * Two backends, picked at runtime:
 *
 *   - Vercel Blob (production): when BLOB_READ_WRITE_TOKEN is set.
 *     Files are uploaded to Vercel's CDN-served object storage.
 *
 *   - Local filesystem (dev): writes to /public/mockups/<token>/.
 *     Convenient when running locally — files are served via Next's
 *     static asset pipeline.
 *
 * Both return a URL that can be used directly as an <img src=...>.
 */

import fs from "node:fs"
import path from "node:path"
import { put, del, list } from "@vercel/blob"

const PUBLIC_DIR = path.join(process.cwd(), "public", "mockups")

function isBlobAvailable(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN
}

/** Server-side validation: file must be a reasonable image */
const ALLOWED_MIME = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
  "image/svg+xml",
])
const MAX_FILE_BYTES = 4 * 1024 * 1024 // 4 MB
// Note: Vercel server functions cap request bodies at 4.5 MB. For larger
// files, switch to Vercel Blob's client-upload flow (see Vercel docs).

export interface UploadResult {
  url: string
  contentType: string
  sizeBytes: number
}

/**
 * Upload a screenshot for a given mockup token. Filename is sanitised and
 * a short timestamp suffix added so re-uploads don't collide.
 */
export async function uploadScreenshot(
  token: string,
  file: File,
  variant: "before" | "after",
  pageSlug: string,
): Promise<UploadResult> {
  // Validate
  if (!ALLOWED_MIME.has(file.type)) {
    throw new Error(
      `Unsupported image type "${file.type}". Use PNG, JPEG, WebP, GIF, or SVG.`,
    )
  }
  if (file.size > MAX_FILE_BYTES) {
    throw new Error(
      `File too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Max is 4 MB.`,
    )
  }

  // Determine extension from content type so we always have a sensible suffix
  const ext = mimeToExt(file.type)
  // Add a short cache-busting suffix so the new image isn't shadowed by a
  // CDN-cached old one.
  const stamp = Date.now().toString(36)
  const safeSlug = pageSlug.toLowerCase().replace(/[^a-z0-9-]/g, "-").slice(0, 32)
  const filename = `${safeSlug}-${variant}-${stamp}.${ext}`
  const keyPath = `mockups/${token}/${filename}`

  const buf = Buffer.from(await file.arrayBuffer())

  if (isBlobAvailable()) {
    const blob = await put(keyPath, buf, {
      access: "public",
      contentType: file.type,
      addRandomSuffix: false,
      allowOverwrite: true,
    })
    return { url: blob.url, contentType: file.type, sizeBytes: file.size }
  }

  // Local dev: write to /public/mockups/<token>/
  const dir = path.join(PUBLIC_DIR, token)
  fs.mkdirSync(dir, { recursive: true })
  const filePath = path.join(dir, filename)
  fs.writeFileSync(filePath, buf)
  // Public URL is the path inside /public, served at root
  return {
    url: `/${path.posix.join("mockups", token, filename)}`,
    contentType: file.type,
    sizeBytes: file.size,
  }
}

/** Delete a previously uploaded screenshot, if we own it */
export async function deleteScreenshot(url: string): Promise<void> {
  if (!url) return
  if (isBlobAvailable() && url.startsWith("https://")) {
    try {
      await del(url)
    } catch (err) {
      console.warn("[blob] Failed to delete blob:", err)
    }
    return
  }
  // Local file (dev)
  if (url.startsWith("/mockups/")) {
    const localPath = path.join(process.cwd(), "public", url.replace(/^\//, ""))
    try {
      fs.unlinkSync(localPath)
    } catch {
      // Best-effort
    }
  }
}

/** Delete all screenshots for a given token (used when deleting a mockup) */
export async function deleteAllScreenshotsForToken(token: string): Promise<void> {
  if (isBlobAvailable()) {
    const { blobs } = await list({ prefix: `mockups/${token}/`, limit: 1000 })
    if (blobs.length === 0) return
    await del(blobs.map((b) => b.url))
    return
  }
  // Local dev
  const dir = path.join(PUBLIC_DIR, token)
  try {
    fs.rmSync(dir, { recursive: true, force: true })
  } catch {
    // Best-effort
  }
}

function mimeToExt(mime: string): string {
  switch (mime) {
    case "image/png": return "png"
    case "image/jpeg": return "jpg"
    case "image/webp": return "webp"
    case "image/gif": return "gif"
    case "image/svg+xml": return "svg"
    default: return "bin"
  }
}
