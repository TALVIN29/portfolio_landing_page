# AXELO — Active Automation Architect

A highly-performant, zero-maintenance single-page landing page architecture representing the **AXELO** brand. Designed to outlive its creator, this portfolio leverages a strict separation between robust infrastructure and immersive frontend aesthetics.

**Version:** 4.1 (21 March 2026)  
**Primary Architect:** Talvin Lee

---

## 1. Governance & Protocol

This repository is governed exclusively by the specifications laid out in:
- `AXELO_ARCHITECT.md` (Operational architecture, technical boundaries, execution protocols)
- `AXELO_PLAYBOOK.md` (Brand positioning, pricing models, target audience, competitive moat)
- `PRD.md` (Design specifications, implementation constraints, performance targets)

## 2. Infrastructure Architecture

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Structure | HTML5 (Semantic) | Single `index.html` file, no build step required |
| Styling | Tailwind CSS CLI (compiled) | Compiled into `style.css` via Tailwind CLI — **not** a CDN runtime |
| Typography | Google Fonts (Inter) | Clean sans-serif headings, Monospace technical accents |
| Environment | Particles.js | Generative "Technocrat" node-based background |
| Interactivity | Typed.js, CountUp.js | Micro-animations, value-based metric counters (Deferred loading) |
| Lead Engine | Supabase Edge Function | Payload transmission direct to DB with timestamped SLAs |
| Alert System | SweetAlert2 | Premium UX completion states |

## 3. Deployment (The Zero-Maintenance Mandate)

This system is built explicitly for rapid deployment and 100% independent execution. It utilizes the **5-check zero-maintenance audit**:

1. **Runs unattended:** Supabase Edge Functions actively records SLA timestamps and prompts downstream alert layers.
2. **No hardcoded dynamic APIs:** All pricing parameters and client metrics are decoupled from HTML markup into a strict `data.json` store.
3. **Auto-deployments:** Hooked to GitHub → Netlify pipelines directly.
4. **Graceful degradation:** Native JS fallbacks and explicit `<noscript>` CSS ensure UI consistency even across heavy CDN blockages.
5. **Zero overhead:** Hosted exclusively within free-tier limitations (Netlify CDN, Supabase).

## 4. Run Locally

No package managers, webpacks, or servers are required. The system is structurally deterministic within the `index.html` file.

```bash
# Clone the repository
git clone https://github.com/TALVIN29/portfolio_landing_page.git
cd portfolio_landing_page

# Simply open it in your browser
start index.html        # Windows
open index.html         # macOS
xdg-open index.html     # Linux
```

## 5. CSS Build (Required When Adding New Tailwind Classes)

`style.css` is a **pre-compiled** Tailwind stylesheet. The CDN runtime is **not** used in production.
If you add new Tailwind utility classes to `index.html`, you **must** recompile or the new styles will be silently ignored.

### One-time setup
```bash
# Install Node.js (≥ 18) if not present, then:
npm install -D tailwindcss
npx tailwindcss init  # generates tailwind.config.js
```

### Recompile `style.css`
```bash
# Watch mode (auto-recompiles on file save during development)
npx tailwindcss -i ./src/input.css -o ./style.css --watch

# Single production build (minified)
npx tailwindcss -i ./src/input.css -o ./style.css --minify
```

> **`src/input.css` minimum contents:**
> ```css
> @tailwind base;
> @tailwind components;
> @tailwind utilities;
> ```

> **`tailwind.config.js` content scan path:**
> ```js
> /** @type {import('tailwindcss').Config} */
> module.exports = { content: ['./*.html'] }
> ```

**Deployment note:** Only `style.css` is committed to the repo. The `node_modules/` directory is `.gitignore`-d. Netlify does **not** run a build command — it serves the pre-compiled file directly.

## 6. Lead Notification Setup (Slack Webhook — Free Forever)

Every form submission fires a Slack message to your phone within seconds. **No manual DB monitoring required.**

The notification code is already live in the Edge Function. You only need to complete this one-time setup:

### Step 1 — Create a Slack Incoming Webhook
1. Go to [api.slack.com/apps](https://api.slack.com/apps) → **Create New App** → **From scratch**
2. Name it `AXELO Leads` → select your workspace → **Create App**
3. In the left sidebar: **Incoming Webhooks** → toggle **Activate Incoming Webhooks** → ON
4. Click **Add New Webhook to Workspace** → select a channel (e.g. `#leads` or just DM yourself) → **Allow**
5. Copy the webhook URL — it looks like: `https://hooks.slack.com/services/T.../B.../...`

### Step 2 — Add to Supabase as a Secret
1. Supabase Dashboard → your project → **Settings** → **Edge Functions** → **Secrets**
2. Click **Add new secret**
3. Name: `SLACK_WEBHOOK_URL`
4. Value: paste the webhook URL from Step 1
5. Click **Save**

### Step 3 — Verify
Submit a test form on your live site. Within 5 seconds you should receive a Slack message containing:
```
🚨 New AXELO Diagnostic Request 🚨

Name: [name]
Email: [email]
Hours Lost: [n] hrs/wk
Problem: [description]
Source: [utm_source / utm_medium / utm_campaign]  ← only if UTM params present

48hr SLA Deadline: [timestamp]
```

> **Zero-Maintenance Note:** The `SLACK_WEBHOOK_URL` is stored as a Supabase server secret — never in the frontend or GitHub. If you rotate the webhook URL, update the secret in Supabase Dashboard only. No code changes, no redeployment.

## 7. State of Work

Track ongoing developmental phases and the Arthur Protocol validation logic within the `progress_plan.md` framework.

---
*Broken process? We fix that. Designed to outlive its creator.*
