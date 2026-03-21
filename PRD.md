# PRD: AXELO Landing Page

## 1. System Instructions
You are an expert Frontend Systems Architect. Build a single-page landing page for **AXELO**. The page must be a strictly single `index.html` file, deployed on Netlify directly via GitHub. It serves as a portfolio, lead generation tool, and brand statement.

**Frontend Tech Stack (Mandatory Reference):**
*   HTML5 (Semantic structure)
*   Tailwind CSS (via CDN)
*   Google Fonts: Inter (`wght@300;400;500;600;700`)
*   FontAwesome 6.5.1
*   AOS 2.3.4 (Scroll animations)
*   Particles.js 2.0.0 (Background generative effect)
*   Typed.js 2.0.16 (Typing effects)
*   CountUp.js 2.8.0 (Number counting animations)
*   SweetAlert2 11 (Form submission alerts)
*   Vanilla JavaScript for orchestration (Embedded at bottom)

## 2. Aesthetic Spec
*   **Theme:** Modern, premium dark mode with glassmorphism and subtle neon accents. The aesthetic should scream "enterprise-grade automation" but remain accessible and personal ("Ramly burger, not McChicken"). 
*   **Colors:** Deep slate/black background (`#0F172A` or similar), stark white headings, muted silver body text. Accents should use a vibrant electric blue (e.g., `text-blue-500`) or emerald green.
*   **Typography:** Google Font 'Inter'. Clean, sans-serif. Monospace elements for technical/code-like accents.
*   **Interaction:** Smooth scrolling, AOS for staggered fade-ups, interactive hover states (scaling, glowing borders) on buttons and cards. Particles.js running subtly in the background hero section.

## 3. Section-by-Section Spec

**1. Hero Section (The Hook)**
*   **Background:** Immersive dark canvas with Particles.js abstract node connections.
*   **Pre-heading:** `AXELO //` in monospace accent.
*   **Headline:** "Broken process?" followed by a dynamic Typed.js element: `["We fix that.", "We automate it.", "We make it run without you."]`
*   **Subheadline:** "We find broken business operations and turn them into automated systems that run without you. Designed to outlive its creator."
*   **CTAs:** 
    1. Primary (Solid Accent): "Get Free Diagnostic" (Scrolls to Form)
    2. Secondary (Glassmorphism outline): "View Case Studies" (Scrolls to Portfolio)

**2. The AXELO Advantage (Core Philosophy)**
*   **Grid Layout:** 3-column bento box or glassmorphic cards.
*   **Content:**
    1. *Diagnostic First:* We find the pain, calculate the cost, and prescribe the fix.
    2. *Zero Maintenance Mandate:* Pure graceful degradation. Systems built to run independently without you—or us.
    3. *Documented Handover:* Minimum 10-page documentation and complete ownership transfer.

**3. Services & Pricing (Transparent Matrix)**
*   **Header:** Transparent, Value-Based Pricing (5-10% of annual value created).
*   **Service Cards:**
    *   *Quick Build:* $750 – $1,500 (1-2 automations, 5-7 days)
    *   *Full Build:* $2,500 – $5,000 (3-5 automations + docs, 2 weeks)
    *   *Sentinel-Class:* $5,000 – $8,000 (Complex/Fintech rules engines, 3-4 weeks)
    *   *Managed Ops (Optional):* $500 – $2,000/mo (Hosting + Proactive maintenance)
*   *Note:* Emphasize that managed ops is convenience, not a dependency.

**4. Products (Templates)**
*   Showcase premium templates available via Gumroad (Prices from $29 to $497). E.g., Lead Capture, Invoice Auto-Processor, Compliance Kit.

**5. Portfolio & Case Studies (Proof)**
*   Showcase "Case Study #1: 23-Node Transaction Monitoring Engine" (Sentinel V2).
*   Structure: Problem -> Solution -> Result (with measurable numbers, e.g., "Saved 15 hours/week").
*   Use CountUp.js to animate the metrics (e.g., hours saved, rows processed).

**6. Lead Capture (The Diagnostic Engine)**
*   **Form Integration:** Formspree (`method="POST"`).
*   **Fields:** Name, Email, "What is currently broken?", "How many hours a week does this cost you?"
*   **Submission UX:** Hijack standard form submission to prevent redirect. Use `fetch` API for AJAX submission. On success, use SweetAlert2 to show a premium success modal ("Diagnostic recommendation within 48 hours").

**7. Footer**
*   "AXELO — Designed to outlive its creator."
*   Links to LinkedIn and GitHub. Clean, minimalistic copyright.

## 4. Data Integration
*   **Contact Form:** Formspree. Ensure no redirect by using JS `fetch`.
*   **API Security:** No secrets in the frontend. All scripts loaded via public CDNs.

## 5. Performance
*   **Speed:** Load times under 1.5 seconds.
*   **Responsiveness:** Perfect single-column stacking on mobile. Input fields at least 16px to prevent iOS zoom. Tap targets 48x48px minimum.
*   **Animation Efficiency:** Particles.js configured to NOT overwhelm mobile devices (reduce density or frame rates on small screens).

## 6. Success Criteria (Measurable)
*   100% single-file `index.html` delivery.
*   0 console errors on load.
*   Lighthouse Performance Score > 90.
*   Formspree AJAX submission returns success modal without page navigation.
*   Particles.js, Typed.js, AOS, and CountUp.js successfully execute on page render.