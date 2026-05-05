"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Upload,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ImageIcon,
  Trash2,
  Save,
} from "lucide-react"
import type { Mockup, MockupStatus, Currency } from "@/lib/mockups"

interface MockupEditorProps {
  mockup: Mockup
}

export function MockupEditor({ mockup: initial }: MockupEditorProps) {
  const router = useRouter()
  const [mockup, setMockup] = useState<Mockup>(initial)
  const [savingMeta, setSavingMeta] = useState(false)
  const [metaError, setMetaError] = useState<string | null>(null)
  const [metaJustSaved, setMetaJustSaved] = useState(false)
  const [deleting, setDeleting] = useState(false)

  // Editable metadata fields
  const [companyName, setCompanyName] = useState(mockup.companyName)
  const [contactName, setContactName] = useState(mockup.contactName ?? "")
  const [currentWebsite, setCurrentWebsite] = useState(mockup.currentWebsite ?? "")
  const [pricePresented, setPricePresented] = useState(
    String(mockup.priceMinor / 100),
  )
  const [currency, setCurrency] = useState<Currency>(mockup.currency)
  const [status, setStatus] = useState<MockupStatus>(mockup.status)
  const [internalNote, setInternalNote] = useState(mockup.internalNote ?? "")

  const handleSaveMeta = async () => {
    setMetaError(null)
    setMetaJustSaved(false)

    const priceMajor = Number(pricePresented.replace(/[^0-9.]/g, ""))
    if (!Number.isFinite(priceMajor) || priceMajor < 0) {
      setMetaError("Invalid price")
      return
    }

    setSavingMeta(true)
    try {
      const res = await fetch(`/api/admin/mockups/${mockup.token}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: companyName.trim(),
          contactName: contactName.trim() || null,
          currentWebsite: currentWebsite.trim() || null,
          priceMinor: Math.round(priceMajor * 100),
          currency,
          status,
          internalNote: internalNote.trim() || null,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Save failed")
      setMockup(data.mockup)
      setMetaJustSaved(true)
      setTimeout(() => setMetaJustSaved(false), 2000)
      router.refresh()
    } catch (err) {
      setMetaError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setSavingMeta(false)
    }
  }

  const handleUploaded = (
    pageIndex: number,
    variant: "before" | "after",
    url: string,
  ) => {
    setMockup((prev) => ({
      ...prev,
      pages: prev.pages.map((p, i) =>
        i === pageIndex
          ? variant === "before"
            ? { ...p, beforeImage: url }
            : { ...p, afterImage: url }
          : p,
      ),
    }))
    router.refresh()
  }

  const handleDelete = async () => {
    if (
      !confirm(
        `Permanently delete mockup for ${mockup.companyName}? This cannot be undone, and all uploaded screenshots will be removed.`,
      )
    ) {
      return
    }
    setDeleting(true)
    try {
      const res = await fetch(`/api/admin/mockups/${mockup.token}`, {
        method: "DELETE",
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error ?? "Delete failed")
      }
      router.push("/admin")
    } catch (err) {
      alert(err instanceof Error ? err.message : "Delete failed")
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Screenshots — pages */}
      <section className="rounded-2xl border border-border bg-background p-6">
        <h2 className="text-base font-semibold text-foreground">
          Screenshots
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Upload a before and after image for each page. PNG, JPEG, WebP or SVG, max 4 MB each.
        </p>

        <div className="mt-6 space-y-8">
          {mockup.pages.map((page, idx) => (
            <div key={idx} className="rounded-xl border border-border/70 bg-foreground/[0.01] p-5">
              <h3 className="font-medium text-foreground">
                {page.label}{" "}
                <span className="text-xs font-normal text-muted-foreground">
                  · Page {idx + 1} of {mockup.pages.length}
                </span>
              </h3>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <UploadSlot
                  label="Before (current site)"
                  token={mockup.token}
                  pageIndex={idx}
                  variant="before"
                  currentUrl={page.beforeImage}
                  onUploaded={(url) => handleUploaded(idx, "before", url)}
                />
                <UploadSlot
                  label="After (your redesign)"
                  token={mockup.token}
                  pageIndex={idx}
                  variant="after"
                  currentUrl={page.afterImage}
                  onUploaded={(url) => handleUploaded(idx, "after", url)}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Metadata — editable */}
      <section className="rounded-2xl border border-border bg-background p-6">
        <h2 className="text-base font-semibold text-foreground">Details</h2>

        {metaError && (
          <div className="mt-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <p>{metaError}</p>
          </div>
        )}
        {metaJustSaved && (
          <div className="mt-4 flex items-start gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            <p>Saved</p>
          </div>
        )}

        <div className="mt-6 space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="companyName">Company name</Label>
              <Input
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="contactName">Contact name</Label>
              <Input
                id="contactName"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="mt-1.5"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="currentWebsite">Current website</Label>
            <Input
              id="currentWebsite"
              type="url"
              value={currentWebsite}
              onChange={(e) => setCurrentWebsite(e.target.value)}
              className="mt-1.5"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                inputMode="decimal"
                value={pricePresented}
                onChange={(e) => setPricePresented(e.target.value)}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="currency">Currency</Label>
              <Select
                value={currency}
                onValueChange={(v) => setCurrency(v as Currency)}
              >
                <SelectTrigger id="currency" className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AED">AED</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              value={status}
              onValueChange={(v) => setStatus(v as MockupStatus)}
            >
              <SelectTrigger id="status" className="mt-1.5">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending — customer can view & pay</SelectItem>
                <SelectItem value="paid">Paid — manually mark as paid</SelectItem>
                <SelectItem value="expired">Expired — disable the link</SelectItem>
              </SelectContent>
            </Select>
            <p className="mt-1 text-xs text-muted-foreground">
              Marking as <strong>paid</strong> here is for manual payments outside Stripe (e.g. bank transfer). Stripe payments update the status automatically.
            </p>
          </div>

          <div>
            <Label htmlFor="internalNote">Internal note</Label>
            <Textarea
              id="internalNote"
              value={internalNote}
              onChange={(e) => setInternalNote(e.target.value)}
              rows={3}
              className="mt-1.5"
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="button"
              onClick={handleSaveMeta}
              disabled={savingMeta}
              className="bg-gradient-to-r from-blue-700 to-slate-500 text-white hover:from-blue-800 hover:to-slate-600"
            >
              {savingMeta ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving…
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save changes
                </>
              )}
            </Button>
          </div>
        </div>
      </section>

      {/* Danger zone */}
      <section className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <h2 className="text-base font-semibold text-red-900">Danger zone</h2>
        <p className="mt-1 text-sm text-red-800">
          Permanently delete this mockup and all uploaded screenshots. This cannot be undone.
        </p>
        <Button
          type="button"
          variant="outline"
          onClick={handleDelete}
          disabled={deleting}
          className="mt-4 border-red-300 bg-white text-red-700 hover:bg-red-100"
        >
          {deleting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Deleting…
            </>
          ) : (
            <>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete mockup
            </>
          )}
        </Button>
      </section>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// UploadSlot — drag-and-drop or click to upload one image
// ─────────────────────────────────────────────────────────────────

interface UploadSlotProps {
  label: string
  token: string
  pageIndex: number
  variant: "before" | "after"
  currentUrl: string
  onUploaded: (url: string) => void
}

function UploadSlot({
  label,
  token,
  pageIndex,
  variant,
  currentUrl,
  onUploaded,
}: UploadSlotProps) {
  const fileInput = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState(false)

  const upload = async (file: File) => {
    setError(null)
    setUploading(true)
    try {
      const fd = new FormData()
      fd.set("file", file)
      fd.set("pageIndex", String(pageIndex))
      fd.set("variant", variant)
      const res = await fetch(`/api/admin/mockups/${token}/upload`, {
        method: "POST",
        body: fd,
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Upload failed")
      onUploaded(data.url)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <p className="mb-2 text-xs font-medium text-foreground">{label}</p>

      <div
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragOver(false)
          const file = e.dataTransfer.files[0]
          if (file) upload(file)
        }}
        onClick={() => fileInput.current?.click()}
        className={[
          "relative flex aspect-[4/3] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed transition-colors",
          dragOver
            ? "border-blue-500 bg-blue-50"
            : currentUrl
              ? "border-border/50 bg-muted"
              : "border-border bg-background hover:border-blue-400 hover:bg-blue-50/40",
        ].join(" ")}
      >
        {currentUrl && !uploading ? (
          <>
            <Image
              src={currentUrl}
              alt={`${label} preview`}
              fill
              unoptimized
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-foreground/0 opacity-0 transition-opacity hover:bg-foreground/40 hover:opacity-100">
              <span className="rounded-full bg-background px-3 py-1.5 text-xs font-medium text-foreground shadow-sm">
                <Upload className="mr-1 inline h-3 w-3" />
                Replace
              </span>
            </div>
          </>
        ) : uploading ? (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-xs">Uploading…</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 px-4 text-center text-muted-foreground">
            <ImageIcon className="h-8 w-8" />
            <p className="text-xs font-medium">
              Drag an image here or click to browse
            </p>
            <p className="text-[10px]">PNG, JPEG, WebP, SVG · Max 4 MB</p>
          </div>
        )}
      </div>

      <input
        ref={fileInput}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) upload(f)
          // Reset so re-selecting the same file fires onChange
          e.target.value = ""
        }}
      />

      {error && (
        <p className="mt-1.5 text-xs text-red-600">
          <AlertCircle className="mr-1 inline h-3 w-3" />
          {error}
        </p>
      )}
    </div>
  )
}
