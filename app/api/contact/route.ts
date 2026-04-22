import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const name    = (formData.get("name")    as string)?.trim()
    const company = (formData.get("company") as string)?.trim()
    const email   = (formData.get("email")   as string)?.trim()
    const service = (formData.get("service") as string)?.trim()
    const message = (formData.get("message") as string)?.trim()
    const website = (formData.get("website") as string)?.trim()

    if (!name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const toEmail   = process.env.CONTACT_EMAIL ?? "contact@nexthorizons.ae"
    const fromEmail = process.env.CONTACT_FROM  ?? "contact@nexthorizons.ae"
    const apiKey    = process.env.RESEND_API_KEY

    const isMockupRequest = service === "Free Redesign Mockup Request"
    const subject = isMockupRequest
      ? `Free Mockup Request from ${name}${website ? ` — ${website}` : ""}`
      : `New enquiry from ${name}${company ? ` (${company})` : ""}`

    const textLines = [
      isMockupRequest
        ? "Free Redesign Mockup Request — Next Horizons"
        : "New contact form submission — Next Horizons",
      "",
      `Name:     ${name}`,
      ...(company ? [`Company:  ${company}`] : []),
      `Email:    ${email}`,
      ...(website ? [`Website:  ${website}`] : []),
      `Topic:    ${service || "Not specified"}`,
      "",
      "Message / Wishes:",
      message || "(none provided)",
      "",
      "---",
      "Sent via nexthorizons.ae",
    ]

    const text = textLines.join("\n")

    const websiteRow = website
      ? `<tr><td style="padding:8px 0;color:#64748b;width:90px">Website</td><td style="padding:8px 0"><a href="${website}" style="color:#1d4ed8">${website}</a></td></tr>`
      : ""
    const companyRow = company
      ? `<tr><td style="padding:8px 0;color:#64748b">Company</td><td style="padding:8px 0">${company}</td></tr>`
      : ""

    const html = `
      <div style="font-family:Inter,sans-serif;max-width:560px;margin:0 auto;color:#0f172a">
        <div style="background:linear-gradient(135deg,#1d4ed8,#475569);padding:24px 32px;border-radius:12px 12px 0 0">
          <p style="margin:0;font-size:13px;color:#bfdbfe;font-weight:600;letter-spacing:.05em;text-transform:uppercase">
            ${isMockupRequest ? "Free Mockup Request" : "New Enquiry"} — Next Horizons
          </p>
        </div>
        <div style="background:#f8fafc;padding:32px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 12px 12px">
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr><td style="padding:8px 0;color:#64748b;width:90px">Name</td><td style="padding:8px 0;font-weight:600">${name}</td></tr>
            ${companyRow}
            <tr><td style="padding:8px 0;color:#64748b">Email</td><td style="padding:8px 0"><a href="mailto:${email}" style="color:#1d4ed8">${email}</a></td></tr>
            ${websiteRow}
            <tr><td style="padding:8px 0;color:#64748b">Topic</td><td style="padding:8px 0">${service || "Not specified"}</td></tr>
          </table>
          <hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0"/>
          <p style="margin:0 0 8px;color:#64748b;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:.05em">
            ${isMockupRequest ? "Wishes / Notes" : "Message"}
          </p>
          <p style="margin:0;white-space:pre-wrap;line-height:1.7;font-size:15px">${(message || "(none provided)").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</p>
          <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0"/>
          <p style="margin:0;font-size:12px;color:#94a3b8">Reply directly to this email to respond to ${name}.</p>
        </div>
      </div>`

    if (apiKey) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from:     fromEmail,
          to:       [toEmail],
          reply_to: email,
          subject,
          text,
          html,
        }),
      })

      if (!res.ok) {
        const err = await res.text()
        console.error("[Contact] Resend error:", err)
        return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
      }
    } else {
      console.log("[Contact] ⚠️  RESEND_API_KEY not set — email not sent.\nAdd RESEND_API_KEY to .env.local")
      console.log(`[Contact] Would send to: ${toEmail}\n${text}`)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[Contact] Error:", err)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}
