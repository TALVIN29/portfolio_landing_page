# AXELO — Active Automation Architect

A highly-performant, zero-maintenance single-page landing page architecture representing the **AXELO** brand. Designed to outlive its creator, this portfolio leverages a strict separation between robust infrastructure and immersive frontend aesthetics.

**Version:** 4.0 (21 March 2026)  
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
| Styling | Tailwind CSS (CDN) | Utility-first, responsive Glassmorphism design system |
| Typography | Google Fonts (Inter) | Clean sans-serif headings, Monospace technical accents |
| Environment | Particles.js | Generative "Technocrat" node-based background |
| Interactivity | Typed.js, CountUp.js | Micro-animations, value-based metric counters |
| Lead Engine | Formspree via AJAX | Intercepted payload transmission without page redirection |
| Alert System | SweetAlert2 | Premium UX completion states |

## 3. Deployment (The Zero-Maintenance Mandate)

This system is built explicitly for rapid deployment and 100% independent execution. It utilizes the **5-check zero-maintenance audit**:

1. **Runs unattended:** Formspree automatically routes inquiries via API.
2. **No hardcoded dynamic APIs:** Fallbacks ensure the core UI never breaks.
3. **Auto-deployments:** Hooked to GitHub → Netlify pipelines directly.
4. **Graceful degradation:** If `Particles.js` or `Typed.js` fail to load from CDN, standard CSS typography cleanly substitutes them.
5. **Zero overhead:** Hosted exclusively within free-tier limitations (Netlify CDN).

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

## 5. State of Work

Track ongoing developmental phases and the Arthur Protocol validation logic within the `progress_plan.md` framework.

---
*Broken process? We fix that. Designed to outlive its creator.*
