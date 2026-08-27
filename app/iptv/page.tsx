import { headers } from "next/headers"
import type { Metadata } from "next"
import {
  BACKUP_TRANSFER_CODE_LENGTH,
  CODE_LENGTH,
  isValidBackupTransferCode,
  normalizeCode,
} from "@/lib/iptv-pairing"
import { PairingClient, type Lang } from "./pairing-client"

export const metadata: Metadata = {
  title: "Connect Your TV | Tivexo IPTV",
  description:
    "Send your IPTV details to the Tivexo app on your Samsung TV by entering the code shown on the television screen.",
  robots: { index: false, follow: false },
}

/**
 * Only Dutch matters: everyone else gets English. The highest quality wins
 * rather than the first entry, because the list is not required to be sorted,
 * and an undecidable header (absent, or only "*") returns nothing so the client
 * can fall back to navigator.languages.
 */
function preferredLang(header: string | null): Lang | undefined {
  let best: { tag: string; quality: number } | undefined

  for (const entry of header?.split(",") ?? []) {
    const [tag, ...params] = entry.trim().split(";")
    if (!tag) continue
    const raw = Number(params.find((p) => p.trim().startsWith("q="))?.split("=")[1] ?? 1)
    const quality = Number.isFinite(raw) ? raw : 0
    if (quality > 0 && (!best || quality > best.quality)) best = { tag: tag.toLowerCase(), quality }
  }

  if (!best || best.tag === "*") return undefined
  return best.tag.startsWith("nl") ? "nl" : "en"
}

export default async function IptvPairingPage({
  searchParams,
}: {
  searchParams: Promise<{ c?: string | string[]; export?: string | string[] }>
}) {
  // Resolved here rather than in the client: the visitor has just scanned this
  // code off a Dutch television, and a paint of English copy before the swap is
  // exactly what they do not need.
  const initialLang = preferredLang((await headers()).get("accept-language"))

  // The scanned code is read here rather than with useSearchParams() in the
  // client: that hook pushes the whole subtree behind a Suspense boundary that
  // Next renders on the client only. Passed down as a prop it is part of the
  // first paint, and the form is ordinary interactive HTML.
  const params = await searchParams
  const raw = params.c
  const initialCode = normalizeCode(Array.isArray(raw) ? raw[0] : raw).slice(0, CODE_LENGTH)
  const rawExport = params.export
  const candidateExport = normalizeCode(Array.isArray(rawExport) ? rawExport[0] : rawExport)
    .slice(0, BACKUP_TRANSFER_CODE_LENGTH)
  const exportCode = isValidBackupTransferCode(candidateExport) ? candidateExport : ""

  return (
    <PairingClient
      initialCode={initialCode}
      initialLang={initialLang}
      year={new Date().getFullYear()}
      exportCode={exportCode}
    />
  )
}
