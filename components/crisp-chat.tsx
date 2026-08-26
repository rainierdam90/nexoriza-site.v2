"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

// Crisp's queued-command global. Calls pushed before the loader finishes are
// flushed once the live SDK takes over.
declare global {
  interface Window {
    $crisp?: unknown[]
    CRISP_WEBSITE_ID?: string
  }
}

// The Crisp Website ID is a public identifier — it's embedded in plain
// HTML on every Crisp-enabled site — so committing it to source is fine.
// You can override per-environment by setting NEXT_PUBLIC_CRISP_WEBSITE_ID
// (e.g. to disable on staging, or to point to a different Crisp workspace).
const DEFAULT_WEBSITE_ID = "be6e3fad-fa28-4a8b-a237-091f620607fe"

/**
 * Routes the widget must never touch. /iptv is the TV pairing page: visitors
 * type their IPTV server, username and password into it, and the password can
 * be revealed in plain text — a third-party script with full DOM access (and a
 * co-browsing feature that streams that DOM to an operator) has no business
 * there. The launcher would also sit on top of the submit button at 360px.
 */
const BLOCKED_PREFIXES = ["/iptv"]

function isBlocked(pathname: string): boolean {
  return BLOCKED_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))
}

/**
 * CrispChat
 * ---------
 * Loads the Crisp Live Chat widget on every page of the site.
 *
 * Behaviour:
 *   - Uses the hardcoded DEFAULT_WEBSITE_ID, unless NEXT_PUBLIC_CRISP_WEBSITE_ID
 *     is set — in which case that takes precedence. Set the env var to an
 *     empty string ("") to disable the widget on a specific environment.
 *   - Loads the Crisp JS library once on first mount, except on the routes in
 *     BLOCKED_PREFIXES. A client-side navigation onto one of those from a page
 *     that already loaded it hides the chatbox instead — the script cannot be
 *     unloaded once it is in the document.
 *   - Tells Crisp which page the visitor is on, and updates this on every
 *     client-side route change — useful context for the AI bot and for any
 *     human agent who picks up the conversation.
 *
 * AI behaviour, branding, greetings, and routing rules are configured inside
 * the Crisp dashboard. See CRISP_SETUP.md in the repo root.
 */
export default function CrispChat() {
  // Env var takes precedence (including the empty-string "disable" case).
  const envId = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID
  const websiteId = envId !== undefined ? envId : DEFAULT_WEBSITE_ID
  const pathname = usePathname()
  const blocked = isBlocked(pathname)

  // Load the Crisp loader once.
  useEffect(() => {
    if (!websiteId) return // Explicitly disabled via empty env var
    if (blocked) return
    if (typeof window === "undefined") return
    if (window.CRISP_WEBSITE_ID) return // Already loaded (HMR / re-render)

    window.$crisp = []
    window.CRISP_WEBSITE_ID = websiteId

    const script = document.createElement("script")
    script.src = "https://client.crisp.chat/l.js"
    script.async = true
    document.head.appendChild(script)
  }, [websiteId, blocked])

  // Track the current page so it appears in the agent / bot conversation context.
  useEffect(() => {
    if (!websiteId) return
    if (typeof window === "undefined") return
    if (!window.$crisp) return

    // Already loaded by an earlier route: hide it for as long as the visitor is
    // on a blocked page, and hand it back when they leave. The path is not
    // reported either — a blocked route is none of the widget's business.
    if (blocked) {
      window.$crisp.push(["do", "chat:hide"])
      return () => {
        window.$crisp?.push(["do", "chat:show"])
      }
    }

    // Crisp's nested-array format for session:data is intentional — see
    // https://docs.crisp.chat/references/chatbox-sdks/v1/#session-data
    window.$crisp.push(["set", "session:data", [[["page", pathname]]]])
  }, [pathname, websiteId, blocked])

  return null
}
