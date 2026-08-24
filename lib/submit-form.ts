// Client-side form relay via FormSubmit (formsubmit.co) — the same provider
// used for www.nexthorizonsglobal.com.
//
// Submissions MUST be sent from the browser: FormSubmit sits behind
// Cloudflare, which blocks requests from datacenter IPs (a server-side relay
// from Vercel gets a 403 bot challenge). The browser also supplies the
// Origin header FormSubmit uses to match the activated site domain — the
// recipient address is activated once per domain via FormSubmit's
// "Activate Form" email.
const CONTACT_EMAIL = "rainier@nexthorizonsglobal.com"

export async function submitViaFormSubmit(formData: FormData): Promise<void> {
  const get = (key: string) => ((formData.get(key) as string) ?? "").trim()

  const name          = get("name")
  const company       = get("company")
  const email         = get("email")
  const phone         = get("phone")
  const service       = get("service")
  const message       = get("message")
  const website       = get("website")
  const preferredDate = get("preferredDate")
  const timeSlot      = get("timeSlot")

  if (!name || !email) throw new Error("Missing required fields")

  const isMockupRequest = service === "Free Redesign Mockup Request"
  const isCallBooking   = service.startsWith("Call Booking")

  let subject: string
  if (isMockupRequest) {
    subject = `Free Mockup Request from ${name}${website ? ` — ${website}` : ""}`
  } else if (isCallBooking) {
    subject = `Call Booking Request from ${name}${preferredDate ? ` — ${preferredDate}` : ""}`
  } else {
    subject = `New enquiry from ${name}${company ? ` (${company})` : ""}`
  }

  const timeSlotLabels: Record<string, string> = {
    "morning-early":   "Morning (09:00–11:00 GST)",
    "morning-late":    "Late morning (11:00–13:00 GST)",
    "afternoon-early": "Early afternoon (13:00–15:00 GST)",
    "afternoon-late":  "Late afternoon (15:00–18:00 GST)",
    "flexible":        "Flexible — suggest a time",
  }
  const timeSlotLabel = timeSlotLabels[timeSlot] || timeSlot

  const payload: Record<string, string> = {
    _subject:  subject,
    _template: "table",
    _replyto:  email,
    Type:      isMockupRequest ? "Free Redesign Mockup Request" : isCallBooking ? "Call Booking Request" : "Contact form enquiry",
    Name:      name,
    ...(company       ? { Company: company }                 : {}),
    Email:     email,
    ...(phone         ? { Phone: phone }                     : {}),
    ...(website       ? { Website: website }                 : {}),
    Topic:     service || "Not specified",
    ...(preferredDate ? { "Preferred date": preferredDate }  : {}),
    ...(timeSlotLabel ? { "Time slot": timeSlotLabel }       : {}),
    Message:   message || "(none provided)",
  }

  const res = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept":       "application/json",
    },
    body: JSON.stringify(payload),
  })

  const data = await res.json().catch(() => null)
  if (!res.ok || !data || String(data.success) !== "true") {
    // FormSubmit's message explains actionable cases (e.g. the one-time
    // per-domain activation email) — surface it to the user.
    throw new Error(data?.message || "Submission failed")
  }
}

export function submitErrorMessage(err: unknown, base: string): string {
  const detail = err instanceof Error && err.message && err.message !== "Submission failed" ? ` Details: ${err.message}` : ""
  return `${base}${detail}`
}
