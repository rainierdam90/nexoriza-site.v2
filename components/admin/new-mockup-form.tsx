"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
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
  Plus,
  Trash2,
  Loader2,
  AlertCircle,
  Building2,
  User,
  Globe,
  CreditCard,
  ListChecks,
  FileText,
  StickyNote,
} from "lucide-react"

const DEFAULT_DELIVERABLES = [
  "Full website redesign — all pages on your current site",
  "Mobile-first responsive layouts",
  "AI-assisted copy refinement on every page",
  "CMS integration so you can edit content yourself",
  "SEO basics: meta tags, semantic HTML, sitemap",
  "Three months of post-launch support",
]

type Currency = "AED" | "USD" | "EUR" | "GBP"

export function NewMockupForm() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Form state
  const [companyName, setCompanyName] = useState("")
  const [contactName, setContactName] = useState("")
  const [currentWebsite, setCurrentWebsite] = useState("")
  const [pricePresented, setPricePresented] = useState("") // major units, free-form input
  const [currency, setCurrency] = useState<Currency>("AED")
  const [pageLabels, setPageLabels] = useState<string[]>(["Homepage"])
  const [deliverables, setDeliverables] =
    useState<string[]>(DEFAULT_DELIVERABLES)
  const [internalNote, setInternalNote] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Convert price to minor units (cents/fils)
    const priceMajor = Number(pricePresented.replace(/[^0-9.]/g, ""))
    if (!Number.isFinite(priceMajor) || priceMajor <= 0) {
      setError("Please enter a valid price")
      return
    }
    const priceMinor = Math.round(priceMajor * 100)

    const cleanedPages = pageLabels
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
    if (cleanedPages.length === 0) {
      setError("Add at least one page")
      return
    }
    const cleanedDeliverables = deliverables
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
    if (cleanedDeliverables.length === 0) {
      setError("Add at least one deliverable")
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch("/api/admin/mockups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: companyName.trim(),
          contactName: contactName.trim() || undefined,
          currentWebsite: currentWebsite.trim() || undefined,
          priceMinor,
          currency,
          pageLabels: cleanedPages,
          deliverables: cleanedDeliverables,
          internalNote: internalNote.trim() || undefined,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Could not create mockup")

      // Jump straight to the upload screen for the new mockup
      router.push(`/admin/mockup/${encodeURIComponent(data.token)}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
      setSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 rounded-2xl border border-border bg-background p-8"
    >
      {error && (
        <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* Customer */}
      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold text-foreground">
          Customer
        </legend>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="companyName" className="flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5 text-blue-600" />
              Company name <span className="text-blue-600">*</span>
            </Label>
            <Input
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Acme Trading LLC"
              required
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="contactName" className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-blue-600" />
              Contact name{" "}
              <span className="text-xs font-normal text-muted-foreground">
                (optional)
              </span>
            </Label>
            <Input
              id="contactName"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              placeholder="Sarah"
              className="mt-1.5"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              Used as the greeting on the mockup page (&ldquo;Hi Sarah,...&rdquo;)
            </p>
          </div>
        </div>

        <div>
          <Label htmlFor="currentWebsite" className="flex items-center gap-1.5">
            <Globe className="h-3.5 w-3.5 text-blue-600" />
            Current website{" "}
            <span className="text-xs font-normal text-muted-foreground">
              (optional)
            </span>
          </Label>
          <Input
            id="currentWebsite"
            type="url"
            value={currentWebsite}
            onChange={(e) => setCurrentWebsite(e.target.value)}
            placeholder="https://example.com"
            className="mt-1.5"
          />
        </div>
      </fieldset>

      {/* Price */}
      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold text-foreground">
          Pricing
        </legend>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="sm:col-span-2">
            <Label htmlFor="price" className="flex items-center gap-1.5">
              <CreditCard className="h-3.5 w-3.5 text-blue-600" />
              Price <span className="text-blue-600">*</span>
            </Label>
            <Input
              id="price"
              inputMode="decimal"
              value={pricePresented}
              onChange={(e) => setPricePresented(e.target.value)}
              placeholder="3500"
              required
              className="mt-1.5"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              In whole units (e.g. 3500 for AED 3,500). No symbols.
            </p>
          </div>

          <div>
            <Label htmlFor="currency">
              Currency <span className="text-blue-600">*</span>
            </Label>
            <Select
              value={currency}
              onValueChange={(v) => setCurrency(v as Currency)}
            >
              <SelectTrigger id="currency" className="mt-1.5">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AED">AED — UAE Dirham</SelectItem>
                <SelectItem value="USD">USD — US Dollar</SelectItem>
                <SelectItem value="EUR">EUR — Euro</SelectItem>
                <SelectItem value="GBP">GBP — British Pound</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </fieldset>

      {/* Pages */}
      <fieldset className="space-y-3">
        <div>
          <legend className="text-sm font-semibold text-foreground">
            <span className="inline-flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-blue-600" />
              Pages
            </span>
          </legend>
          <p className="mt-0.5 text-xs text-muted-foreground">
            One row per redesigned page. You&apos;ll upload before/after screenshots after saving.
          </p>
        </div>

        <RepeatingTextRows
          values={pageLabels}
          onChange={setPageLabels}
          placeholder="Homepage"
          maxItems={5}
          addLabel="Add page"
        />
      </fieldset>

      {/* Deliverables */}
      <fieldset className="space-y-3">
        <div>
          <legend className="text-sm font-semibold text-foreground">
            <span className="inline-flex items-center gap-1.5">
              <ListChecks className="h-3.5 w-3.5 text-blue-600" />
              What&apos;s included
            </span>
          </legend>
          <p className="mt-0.5 text-xs text-muted-foreground">
            These appear as a bullet list on the customer&apos;s page above the price.
          </p>
        </div>

        <RepeatingTextRows
          values={deliverables}
          onChange={setDeliverables}
          placeholder="…"
          maxItems={12}
          addLabel="Add deliverable"
        />
      </fieldset>

      {/* Internal note */}
      <fieldset className="space-y-2">
        <Label htmlFor="internalNote" className="flex items-center gap-1.5">
          <StickyNote className="h-3.5 w-3.5 text-blue-600" />
          Internal note{" "}
          <span className="text-xs font-normal text-muted-foreground">
            (only visible to you in the admin)
          </span>
        </Label>
        <Textarea
          id="internalNote"
          value={internalNote}
          onChange={(e) => setInternalNote(e.target.value)}
          placeholder="e.g. Sarah requested an emphasis on trust signals — make sure to highlight years in business."
          rows={3}
        />
      </fieldset>

      <div className="flex items-center justify-end gap-3 border-t border-border pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin")}
          disabled={submitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={submitting}
          className="bg-gradient-to-r from-blue-700 to-slate-500 text-white hover:from-blue-800 hover:to-slate-600"
        >
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating…
            </>
          ) : (
            "Create & continue to uploads →"
          )}
        </Button>
      </div>
    </form>
  )
}

// ─────────────────────────────────────────────────────────────────
// RepeatingTextRows — small helper for variable-length text-input lists
// ─────────────────────────────────────────────────────────────────

interface RepeatingTextRowsProps {
  values: string[]
  onChange: (next: string[]) => void
  placeholder: string
  maxItems: number
  addLabel: string
}

function RepeatingTextRows({
  values,
  onChange,
  placeholder,
  maxItems,
  addLabel,
}: RepeatingTextRowsProps) {
  const set = (i: number, v: string) => {
    const next = [...values]
    next[i] = v
    onChange(next)
  }
  const add = () => onChange([...values, ""])
  const remove = (i: number) => onChange(values.filter((_, idx) => idx !== i))

  return (
    <div className="space-y-2">
      {values.map((value, i) => (
        <div key={i} className="flex items-center gap-2">
          <Input
            value={value}
            onChange={(e) => set(i, e.target.value)}
            placeholder={placeholder}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => remove(i)}
            disabled={values.length === 1}
            aria-label="Remove row"
            className="shrink-0 text-muted-foreground hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      {values.length < maxItems && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={add}
          className="gap-1.5"
        >
          <Plus className="h-3.5 w-3.5" />
          {addLabel}
        </Button>
      )}
    </div>
  )
}
