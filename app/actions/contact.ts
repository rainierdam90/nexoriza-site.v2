"use server"

export async function submitContactForm(formData: FormData) {
  const name = formData.get("name") as string
  const company = formData.get("company") as string
  const email = formData.get("email") as string
  const service = formData.get("service") as string
  const message = formData.get("message") as string

  const toEmail = process.env.CONTACT_EMAIL || "contact@nexthorizons.ae"

  const body = [
    "New enquiry via the Next Horizons website",
    "",
    `Name: ${name}`,
    `Company: ${company || "—"}`,
    `Email: ${email}`,
    `Service interest: ${service || "Not specified"}`,
    "",
    "Message:",
    message,
  ].join("\n")

  console.log(`[Contact Form] To: ${toEmail}\n${body}`)

  // ─── Resend (recommended) ─────────────────────────────────────────────────
  // Install: pnpm add resend
  // Set env var: RESEND_API_KEY=re_xxxx  and  CONTACT_EMAIL=your@email.com
  //
  // import { Resend } from "resend"
  // const resend = new Resend(process.env.RESEND_API_KEY)
  // await resend.emails.send({
  //   from: "contact@nexthorizons.ae",
  //   to: toEmail,
  //   replyTo: email,
  //   subject: `Website enquiry from ${name}`,
  //   text: body,
  // })
  // ─────────────────────────────────────────────────────────────────────────

  return { success: true }
}
