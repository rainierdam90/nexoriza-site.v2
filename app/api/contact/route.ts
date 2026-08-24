import { NextRequest, NextResponse } from "next/server"

// Form submissions are relayed via FormSubmit (formsubmit.co) — the same
// provider used for www.nexthorizonsglobal.com. No API key required; the
// recipient address must be activated once with FormSubmit (already done
// for rainier@nexthorizonsglobal.com).
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const name          = (formData.get("name")          as string)?.trim()
    const company       = (formData.get("company")       as string)?.trim()
    const email         = (formData.get("email")         as string)?.trim()
    const phone         = (formData.get("phone")         as string)?.trim()
    const service       = (formData.get("service")       as string)?.trim()
    const message       = (formData.get("message")       as string)?.trim()
    const website       = (formData.get("website")       as string)?.trim()
    const preferredDate = (formData.get("preferredDate") as string)?.trim()
    const timeSlot      = (formData.get("timeSlot")      as string)?.trim()

    if (!name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const toEmail = process.env.CONTACT_EMAIL ?? "rainier@nexthorizonsglobal.com"

    const isMockupRequest = service === "Free Redesign Mockup Request"
    const isCallBooking   = service?.startsWith("Call Booking")

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
      ...(company       ? { Company: company }              : {}),
      Email:     email,
      ...(phone         ? { Phone: phone }                  : {}),
      ...(website       ? { Website: website }              : {}),
      Topic:     service || "Not specified",
      ...(preferredDate ? { "Preferred date": preferredDate } : {}),
      ...(timeSlotLabel ? { "Time slot": timeSlotLabel }      : {}),
      Message:   message || "(none provided)",
    }

    // FormSubmit requires Origin/Referer headers and activates recipients
    // per website domain (one-time "Activate Form" email on first use).
    const host   = req.headers.get("x-forwarded-host") ?? req.headers.get("host") ?? "rainierdam90-nexoriza-sitev2.vercel.app"
    const origin = `https://${host}`

    const res = await fetch(`https://formsubmit.co/ajax/${toEmail}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept":       "application/json",
        "Origin":       origin,
        "Referer":      `${origin}/contact`,
      },
      body: JSON.stringify(payload),
    })

    const raw = await res.text()
    let data: any = null
    try { data = JSON.parse(raw) } catch {}
    if (!res.ok || !data || String(data.success) !== "true") {
      console.error("[Contact] FormSubmit error:", res.status, raw.slice(0, 500))
      // TODO: remove debug detail once delivery is confirmed
      return NextResponse.json({ error: "Failed to send email", debug: { status: res.status, body: raw.slice(0, 300) } }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[Contact] Error:", err)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}
