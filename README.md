# JD.core — Dynamic Portfolio & Consultancy Landing Page

A single-file, high-performance developer portfolio and B2B consultancy landing page. Built with zero frameworks — just HTML5, Tailwind CSS (CDN), and Vanilla JavaScript — designed to convert cold traffic into qualified leads.

**Live:** [talvin29.github.io/portfolio_landing_page](https://talvin29.github.io/portfolio_landing_page/)

---

## Architecture

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Structure | HTML5 (Semantic) | Single `index.html`, zero build step |
| Styling | Tailwind CSS (CDN) | Utility-first, responsive design system |
| Typography | Google Fonts (Inter) | Clean sans-serif headings & body text |
| Icons | FontAwesome 6 (CDN) | UI iconography with `aria-hidden` for a11y |
| 3D Background | Three.js | Interactive particle network, mouse-reactive |
| Animations | anime.js | Timeline-based scroll reveals & micro-interactions |
| Data | GitHub REST API | Dynamic repo fetching with sessionStorage caching |
| Forms | Formspree | AJAX lead capture with inline success state |
| Geolocation | ipapi.co | Currency localization with 1.5s graceful fallback |

## Features

### Consultancy Conversion Engine
- **Loss-Aversion Hero** — Interactive ROI slider calculates annual cost of manual data entry in real-time ("You are actively bleeding $X a year").
- **Psychological Pricing** — 3-tier deployment grid using anchor pricing ($1,500 → $497), charm pricing ($1,997), and a highlighted $197/mo managed retainer as the default.
- **Engagement Funnel** — "How We Work" 3-step process (Discovery → Architecture → Deployment) guides visitors before the lead form.
- **Qualified Lead Form** — 5 strategic qualification questions submitted via Formspree AJAX (no page redirect).

### Deployed Systems (GitHub API)
- Fetches repos from `https://api.github.com/users/talvin29/repos?sort=updated&per_page=100`.
- Filters out forks and the portfolio repo itself.
- Renders enterprise-styled "case study" cards with repo name, description, language badge, source code link, and live demo link (when available).
- `sessionStorage` caching (2-hour TTL) to stay within unauthenticated rate limits (60 req/hr).
- `DocumentFragment` rendering for DOM performance.
- Graceful error state with GitHub fallback link if the API is down.

### Core Competencies (Bento Grid)
- Asymmetrical bento-box layout showcasing 4 capability areas:
  - Data Ingestion & ETL Pipelines
  - Deterministic Logic
  - API Orchestration
  - Cognitive Synthesis

### Production Hardening
- **Zero-Exposure Protocol** — Geolocation API has a strict 1.5s timeout; silent fallback to USD on failure with zero console errors.
- **SEO & Open Graph** — Full meta tags and `og:` properties for LinkedIn/X/Slack link previews.
- **Mobile Optimization** — 16px min font size (prevents iOS Safari auto-zoom), 48×48px tap targets, particle count reduced 70% on mobile for 60FPS.
- **Accessibility** — `aria-hidden="true"` on decorative icons, semantic HTML5 structure, keyboard-navigable form.

## Local Development

No build tools, no dependencies, no install step. It's a single HTML file.

```bash
# Clone
git clone https://github.com/TALVIN29/portfolio_landing_page.git
cd portfolio_landing_page

# Open directly
start index.html        # Windows
open index.html         # macOS
xdg-open index.html     # Linux
```

Or use any local server:

```bash
npx serve .
```

## Deployment

This is a static single-file site. Deploy to any static host:

| Platform | Method |
|----------|--------|
| **GitHub Pages** | Push to `main`, enable Pages in repo settings |
| **Netlify** | Drag-and-drop `index.html` or connect repo |
| **Vercel** | Import repo, zero config needed |
| **Cloudflare Pages** | Connect repo, build command: _(none)_ |

## Configuration

| Item | Location | Notes |
|------|----------|-------|
| Formspree endpoint | `index.html` line ~463 | Replace `xdawgenp` with your Formspree form ID |
| GitHub username | `index.html` line ~556 | Change `talvin29` in the API URL |
| ROI hourly rate | `index.html` line ~635 | Default `$40/hr`, adjust `HOURLY_RATE` variable |
| OG image | `<head>` meta tags | Point `og:image` to your hosted preview image |

## Data & Security

- **No backend.** All data is fetched client-side from public APIs.
- **No API keys.** GitHub public API and ipapi.co free tier require no authentication.
- **No secrets in frontend.** The Formspree form ID is a public endpoint by design.
- **Form submissions** are handled entirely by Formspree's infrastructure.

---

Built by **Talvin Lee** — [GitHub](https://github.com/talvin29) · [LinkedIn](https://www.linkedin.com/in/talvin-lee-579a02241)
