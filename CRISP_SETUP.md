# Crisp Live Chat — Setup Guide

The site already loads the [Crisp](https://crisp.chat) Live Chat widget on every page — no environment variable, no extra configuration needed. Just push the code to GitHub and deploy.

This guide explains what's already wired up, and walks you through configuring the AI bot inside the Crisp dashboard (which is where the actual chat behaviour lives).

---

## What's already done

- **Widget loaded on every page.** The Crisp script is mounted in the root layout, so the chat bubble appears on every route — home, services, about, contact, book-call, everything.
- **Website ID hardcoded.** Your Crisp Website ID (`be6e3fad-fa28-4a8b-a237-091f620607fe`) is set as the default inside `components/crisp-chat.tsx`. The Website ID is a public identifier — it shows up in the page HTML on every Crisp-using site — so committing it is fine.
- **Page tracking.** On every client-side route change, the current path is pushed into Crisp's conversation context. You'll see entries like `page: /services/website-redesign` in the **Conversation context** panel inside Crisp — useful both for human agents picking up a conversation and for the AI bot when reasoning about visitor intent.

You don't need to do anything in the codebase to get the widget working. **Push to GitHub, deploy, done.**

---

## What you still need to do (inside the Crisp dashboard)

The widget loads, but the *behaviour* — what it says, when it triggers, whether AI answers — is configured in your Crisp dashboard, not in code.

### 1. Brand the widget

Crisp dashboard → **Settings → Chatbox Appearance**:

- **Color** — set to your brand blue. The hex closest to what we use across the site is `#1d4ed8` (Tailwind `blue-700`).
- **Position** — bottom-right is the default and matches what most visitors expect.
- **Welcome message** — e.g. "Hi 👋 — questions about the redesign or our compliance software? Ask away."
- **Operating hours** — Sunday–Thursday, 9:00–18:00 GST (matches what's shown on `/book-call`).
- **Offline form** — capture name + email when you're not around.

### 2. Set up the AI chatbot

The right path depends on your Crisp plan.

#### Option A — Crisp AI (recommended, requires a paid plan)

Crisp's built-in AI assistant uses your Helpdesk (knowledge base) articles to answer visitor questions automatically.

1. **Build out your Helpdesk first.** Crisp dashboard → **Helpdesk** → create articles for the questions visitors most commonly ask. For Next Horizons, good starting articles:
   - "What does a website redesign cost?"
   - "How long does the redesign process take?"
   - "How does the due diligence software work?"
   - "Do you serve clients outside the UAE?"
   - "How is my data handled?"
   - "What's included in the three months of post-launch support?"

   The more thorough the articles, the better the AI's answers. Aim for clear headings and 2–4 paragraphs each.

2. **Enable Crisp AI.** Plugins → search **Crisp AI** → install/enable.
3. **Configure it** to draw from your Helpdesk. Set its tone to match your brand voice (professional, concise).
4. **Set the fallback rule:** if AI cannot answer confidently, route the conversation to your inbox / email / Slack.

#### Option B — Bot Plugin with predefined flows (free plan)

If you don't have a paid plan or prefer scripted answers:

1. Crisp dashboard → **Plugins** → **Bot Plugin** → install.
2. Open the bot builder and create a flow with the most common visitor questions as buttons (e.g., "Pricing", "Process", "Book a call").
3. For each path, write the answer or route the visitor to a form.
4. Add a fallback "Talk to a human" branch that opens a normal chat with you.

#### Option C — Hybrid

Combine both: a short scripted flow ("Hi — what brings you here today?") that routes to AI for free-text questions and to humans for complex ones. Set this up in the bot builder.

### 3. Test it

1. Open the site in an incognito window so Crisp treats you as a brand-new visitor.
2. The chat bubble should appear in the bottom-right within ~1 second.
3. Open the chat — your welcome message and any bot flow should fire.
4. Send a test message — confirm it lands in your Crisp inbox.
5. Move between pages and confirm in the Crisp dashboard that `page` updates in the conversation context panel.

---

## Optional: per-environment overrides

If you ever want different Crisp behaviour per environment (e.g., disable the widget on staging), you can override the hardcoded ID via an environment variable.

Set `NEXT_PUBLIC_CRISP_WEBSITE_ID` in your hosting provider's environment settings:

| Value | Effect |
|---|---|
| Not set | Uses the default ID (current behaviour) |
| `some-other-id` | Loads that workspace instead |
| `""` (empty string) | Disables the widget on that environment |

For Vercel: Project → Settings → Environment Variables. Add the variable for the environment(s) where you want different behaviour, then redeploy.

---

## Troubleshooting

**The widget doesn't appear at all.**
- Check the browser console for errors related to `client.crisp.chat`.
- Confirm in your Crisp dashboard that the website is **Active** (sometimes Crisp deactivates new workspaces until you complete onboarding).
- If you set `NEXT_PUBLIC_CRISP_WEBSITE_ID=""` somewhere, that disables the widget — clear it.

**The widget loads but shows no welcome message / no bot replies.**
- Welcome messages, bot flows, and AI behaviour all live in the Crisp dashboard, not in this codebase. Check **Settings → Chatbox Appearance** and your **Bot Plugin / Crisp AI** configuration.

**AI answers are inaccurate.**
- Crisp AI quality depends almost entirely on the depth of your Helpdesk articles. Add more articles, with clearer headings and example questions, then re-test.

**I want to switch to a different Crisp workspace later.**
- Either edit the `DEFAULT_WEBSITE_ID` constant at the top of `components/crisp-chat.tsx`, or set `NEXT_PUBLIC_CRISP_WEBSITE_ID` in your hosting env vars (the env var wins).

---

## Files involved in this integration

- `components/crisp-chat.tsx` — loads the Crisp script, tracks page changes, holds the default Website ID
- `app/layout.tsx` — mounts the component on every page
- `.env.local.example` — documents the optional env-variable override
- `CRISP_SETUP.md` — this file
