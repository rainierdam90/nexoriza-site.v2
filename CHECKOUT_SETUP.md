# Mockup Showcase + Checkout — Setup Guide

This system gives each customer a private URL where they can preview their website redesign mockup, see what's included, and pay online to unlock the full redesign — delivered within two business days.

It has three parts: a **customer-facing mockup page**, **Stripe-powered checkout**, and an **admin dashboard** where you create mockups and upload screenshots without touching code.

---

## TL;DR setup checklist

1. **Set up Vercel Blob** (Storage → Create Database → Blob → connect to project) — for screenshot uploads
2. **Create a Stripe account** + grab API keys + webhook secret — for payments
3. **Set environment variables** on Vercel: `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`. (Vercel injects `BLOB_READ_WRITE_TOKEN` automatically once the Blob store is connected.)
4. **Deploy** → log into `/admin` → start creating mockups

Each step in detail below.

---

## 1. Vercel Blob (mockup data + screenshots)

The admin panel needs somewhere to store mockup metadata (company names, prices) and the screenshots you upload. We use Vercel Blob — a CDN-served object store that's free for the volumes you'll be at.

**Setup:**

1. In your Vercel dashboard, go to your project → **Storage** tab
2. Click **Create Database** → choose **Blob**
3. Pick a name (e.g. `nh-mockups`) → **Create**
4. Click **Connect to Project** and select your project + the environments you want (Production at minimum; Preview is useful too)
5. Vercel automatically adds the `BLOB_READ_WRITE_TOKEN` env var

That's it — nothing in your code or repo changes. After your next deploy, the admin panel uses Blob storage automatically.

**Free tier limits** (more than enough for hundreds of customers):
- 5 GB storage
- 100 GB bandwidth/month
- $0.15/GB beyond the free tier

**Local development:** Without `BLOB_READ_WRITE_TOKEN` set, the admin panel writes mockups to `data/mockups.json` and screenshots to `public/mockups/` so you can test locally. To use real Blob in dev, copy the token from your Vercel dashboard into `.env.local`.

---

## 2. Stripe (payments)

The system gracefully handles the case where Stripe isn't configured — you'll see a friendly "payment not configured" message instead of crashes. So you can deploy first and add Stripe later.

### 2a. Create the account and get your secret key

1. Sign up at <https://dashboard.stripe.com>
2. Go to **Developers → API keys**
3. Copy your **Secret key** (starts with `sk_live_...` for production, `sk_test_...` for testing)
4. Set it as `STRIPE_SECRET_KEY` in your Vercel env vars

> **Important:** the secret key is *secret*. Never paste it into a chat, a public repo, an issue tracker, or anywhere it could be logged. If it leaks, immediately roll it in the Stripe dashboard (Developers → API keys → click the key → Roll).

### 2b. Set up the webhook

The webhook is what tells your site when a payment succeeds.

1. Go to **Developers → Webhooks → Add endpoint**
2. Endpoint URL: `https://nexthorizons.ae/api/webhooks/stripe` (or your domain)
3. Events to send: select `checkout.session.completed` and `charge.refunded`
4. Click **Add endpoint**
5. On the endpoint detail page, click **Reveal** under "Signing secret" and copy it
6. Set as `STRIPE_WEBHOOK_SECRET` in your Vercel env vars

### 2c. (Local dev) Use the Stripe CLI

To test the webhook locally:

```bash
# Install: https://docs.stripe.com/stripe-cli
stripe login
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

The CLI prints a webhook signing secret (`whsec_...`). Use that as your local `STRIPE_WEBHOOK_SECRET`.

### 2d. Test the flow

1. With test keys configured, log into `/admin` and create a mockup
2. Open the customer page and click **Unlock & Order**
3. Use a test card: `4242 4242 4242 4242` with any future expiry and any CVC
4. After payment you should land on the success page; the mockup itself shows the green "in production" banner

---

## 3. Admin panel (`/admin`)

### Required env vars

```
ADMIN_PASSWORD=…              # Pick a strong one
ADMIN_SESSION_SECRET=…        # 32+ random chars (e.g. `openssl rand -base64 48`)
```

### Creating a mockup

1. Log into `/admin`
2. Click **New mockup** (top right)
3. Fill in:
   - Company name (required)
   - Contact name (optional — used in the greeting)
   - Current website (optional)
   - Price + currency (AED / USD / EUR / GBP)
   - Page labels (one row per page, e.g. "Homepage", "Services")
   - Deliverables (the bullet list shown above the price)
   - Internal note (only visible to you)
4. Click **Create & continue to uploads**
5. On the next screen, drag-and-drop or click to upload before/after screenshots for each page
6. Send the customer their link: `https://nexthorizons.ae/mockup/<token>` — copy from the admin

### Editing a mockup

From the dashboard, click **Edit** on any mockup row to:
- Replace screenshots
- Change prices, status, internal notes
- Manually mark as paid (for off-platform payments like bank transfer)
- Delete the mockup permanently (also wipes its screenshots)

### Manually marking as paid

If a customer pays outside Stripe (bank transfer, cash, etc.):

1. Open the mockup in the admin
2. Change **Status** from "Pending" to "Paid"
3. Click **Save changes**

The customer's mockup page now shows the "in production" banner. Note: Stripe-paid mockups update automatically — you only need to do this for off-platform payments.

---

## How "paid" status works (architecture note)

This is worth understanding because it's a deliberate design choice.

Stripe is the source of truth for online payments. The system never writes "paid" to a database when payment succeeds — instead, when a page renders, it asks Stripe "has this token been paid?". The result is cached in memory for 30 seconds to avoid hitting the API on every request.

For manual payments (the "mark as paid" button in the admin), the status is written to the JSON blob alongside the rest of the mockup data.

**Why this design:**
- Online payments: no race conditions between webhook and customer redirect
- Manual payments: easy admin override
- Migration to a real database later is straightforward — just replace the lookup function

**Trade-off:**
- First mockup page load after a cold start adds ~200ms while it queries Stripe
- Below ~50 customers/day this is invisible

---

## Files involved

```
data/mockups.json                              ← Seed data (used as bootstrap on first deploy)

lib/mockups-data.ts                            ← Storage layer (Blob in prod, FS in dev)
lib/mockups.ts                                 ← Public API (combines seed + Stripe state)
lib/stripe.ts                                  ← Stripe SDK wrapper
lib/blob.ts                                    ← Screenshot upload/delete helpers
lib/admin-auth.ts                              ← Admin session handling

app/mockup/page.tsx                            ← /mockup → token entry page
app/mockup/[token]/page.tsx                    ← /mockup/<token> → customer view
app/mockup/[token]/success/page.tsx            ← Post-payment confirmation

app/api/checkout/route.ts                      ← Creates Stripe Checkout sessions
app/api/webhooks/stripe/route.ts               ← Receives Stripe payment events
app/api/admin/mockups/route.ts                 ← POST: create new mockup
app/api/admin/mockups/[token]/route.ts         ← PATCH/DELETE: update or delete
app/api/admin/mockups/[token]/upload/route.ts  ← POST: upload screenshot

app/admin/login/page.tsx                       ← Admin login form
app/admin/page.tsx                             ← Admin dashboard
app/admin/new/page.tsx                         ← New-mockup form
app/admin/mockup/[token]/page.tsx              ← Mockup editor (uploads, edits, delete)
app/admin/actions.ts                           ← Login/logout server actions

components/mockup/before-after-slider.tsx      ← Drag-to-compare component
components/mockup/unlock-button.tsx            ← Stripe checkout trigger
components/admin/new-mockup-form.tsx           ← Create-mockup form
components/admin/mockup-editor.tsx             ← Editor + upload UI
components/admin/copy-button.tsx               ← Copy-to-clipboard helper
```

---

## Security notes

- **Mockup URLs are unguessable but publicly readable.** Anyone with the link can see the mockup. Treat them like Google Doc "anyone with the link" sharing.
- **Pages are noindex'd** — Google won't crawl them.
- **The admin password is your only protection.** Pick a strong one. Rotate `ADMIN_SESSION_SECRET` to invalidate all existing sessions if you suspect a compromise.
- **Stripe handles all card data** — your server never sees card numbers.
- **Refunds are not automated.** Issue refunds via the Stripe Dashboard. The webhook logs them, but doesn't change mockup status.
