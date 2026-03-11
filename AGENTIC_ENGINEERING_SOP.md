# AGENTIC ENGINEERING SOP
### Standard Operating Procedure for Human-AI Collaborative System Development

**Version:** 1.0  
**Effective Date:** 2026-03-12  
**Classification:** Internal Engineering Standard  
**Authors:** Talvin Lee (Principal Engineer / Human-in-the-Loop) · Arthur (AI Project Director / Autonomous Agent)

---

> *"A blank canvas is a liability. A deterministic specification is an asset."*

## 1. Purpose & Scope

This document codifies the **standard operating procedure** for all future system development conducted between a Human Principal Engineer and an Autonomous AI Agent ("Arthur"). It is derived from the battle-tested workflow used to architect and deploy the **JD.core Dynamic Portfolio & B2B Consultancy Landing Page** — a zero-dependency, single-file production system that integrates real-time GitHub API data, psychological conversion engineering, Formspree lead capture, and Three.js generative design.

This SOP applies to **every net-new build**, regardless of domain, and governs:

- How requirements are defined before a single line of code is written.
- How infrastructure decisions are evaluated and constrained.
- How the Human interrogates and corrects the Agent's autonomous reasoning.
- How the final system is hardened for zero-maintenance, zero-cost, perpetual operation.

**This is not a suggestion. It is a mandate.** Deviation from this SOP requires explicit, documented justification from the Human Principal.

---

## 2. Definitions

| Term | Definition |
|------|-----------|
| **Human Principal** | The human engineer who holds final authority over all architectural and strategic decisions. Identified as the HITL (Human-in-the-Loop) operator. |
| **Agent ("Arthur")** | The autonomous AI system responsible for code generation, strategic recommendations, and execution. Arthur operates under bounded autonomy — he can propose, but never unilaterally ship. |
| **PRD** | Product Requirements Document. The deterministic specification that governs all downstream work. |
| **Hallucinated Constraint** | A requirement or limitation invented by the Agent that does not originate from the Human Principal, the PRD, or any verifiable technical reality. |
| **Zero-Maintenance Mandate** | The architectural principle that no deployed system shall require ongoing human intervention, paid infrastructure, or manual update cycles to remain operational. |
| **Graceful Degradation** | The protocol ensuring that any external dependency failure results in a silent, invisible fallback — never a broken UI, console error, or user-facing crash. |
| **The Arthur Protocol** | The formal code review process in which the Human Principal interrogates every autonomous decision the Agent has made, with burden of proof on the Agent. |

---

## 3. The Four Phases

---

### PHASE 1: The Deterministic PRD
#### *"We never start from a blank canvas."*

**Objective:** Lock down aesthetics, architecture, information hierarchy, and conversion strategy in a written specification **before any code is generated.**

**Rationale:**  
The JD.core build proved that allowing the Agent to generate code from ambiguous instructions produces drift, scope creep, and hallucinated features. The PRD exists to create a **deterministic contract** — a single source of truth that both Human and Agent can reference to resolve disputes, validate output, and prevent unauthorized improvisation.

**Required PRD Sections (Minimum Viable Specification):**

| # | Section | Purpose |
|---|---------|---------|
| 1 | **System Instructions for AI** | Explicit tech stack constraints, forbidden patterns, and output format (e.g., "Output a single `index.html` file. Do not use React."). |
| 2 | **Global Aesthetic** | Locked color palette (hex values), typography (font families, weights), spacing tokens, and layout constraints (`max-w-5xl`, `py-20`). No ambiguity. |
| 3 | **Section-by-Section Specification** | Every UI section defined with exact heading text, subtext, CTA labels, grid configurations, and conditional rendering logic. |
| 4 | **Data Integration Contract** | API endpoints, filtering rules, caching strategies, error handling, and fallback states — all specified before implementation. |
| 5 | **Conversion Strategy** | Business positioning, pricing psychology, CTA hierarchy, and engagement funnel architecture. |
| 6 | **Performance & Production Requirements** | SEO meta tags, accessibility standards, mobile optimization targets (e.g., 60FPS, 48×48px tap targets, 16px min font). |

**Process:**

```
1. Human drafts initial PRD skeleton with core requirements.
2. Agent proposes strategic enhancements (e.g., pricing psychology,
   conversion architecture, UX patterns) as addenda.
3. Human reviews, interrogates, and approves/rejects each addendum.
4. PRD is LOCKED. All subsequent work references this document.
5. Any scope change requires a formal PRD amendment with Human sign-off.
```

**Anti-Patterns (Strictly Prohibited):**

- ❌ Starting code generation from a verbal description or chat message.
- ❌ Allowing the Agent to "interpret" requirements not explicitly stated.
- ❌ Treating the PRD as a living document that changes mid-sprint without formal amendment.
- ❌ Omitting the aesthetic specification ("just make it look good" is not a requirement).

**Deliverable:** A versioned `PRD.md` committed to the repository root.

---

### PHASE 2: The Infrastructure Reality Check
#### *"If it requires a server, a database, or a monthly bill — justify it or kill it."*

**Objective:** Ensure every infrastructure decision prioritizes **zero-maintenance, zero-cost, static/serverless architecture** unless the Human Principal explicitly authorizes an exception.

**Rationale:**  
The JD.core system operates on **zero backend infrastructure**. It is a single HTML file served by GitHub Pages, using only public APIs (GitHub REST API, ipapi.co) and managed third-party services (Formspree). There are no API keys on the frontend, no databases, no server processes, and no recurring costs. This is not laziness — it is a **deliberate architectural decision** that eliminates entire categories of failure, maintenance burden, and operational cost.

**The Infrastructure Decision Matrix:**

Every proposed technology or service must pass through this matrix before adoption:

| Question | Required Answer | If "No" → Action |
|----------|----------------|-------------------|
| Can this run as a static file on GitHub Pages / Netlify / Vercel? | Yes | Justify the exception or find a static alternative. |
| Does this require an API key or secret on the frontend? | No | Reject. Find a keyless public API or managed service. |
| Does this have a free tier that covers production traffic? | Yes | Reject or find an alternative with a free tier. |
| If this external API goes down, does the site crash? | No | Implement Graceful Degradation (see Phase 4). |
| Does this require ongoing human maintenance (updates, renewals, monitoring)? | No | Reject or automate. |
| Is there a simpler solution that achieves 90% of the same outcome? | Evaluated | Document the trade-off and choose the simpler path unless the 10% is critical. |

**Approved Infrastructure Patterns (Precedent from JD.core):**

| Need | Approved Solution | Why |
|------|-------------------|-----|
| Hosting | GitHub Pages (auto-deploy on push to `main`) | Free, zero-config, SSL included. |
| Styling | Tailwind CSS via CDN | No build step, no `node_modules`, instant deployment. |
| Forms / Lead Capture | Formspree (AJAX submission) | No backend, no database, no server. Managed service with free tier. |
| Dynamic Data | GitHub REST API (public, unauthenticated) | No API key, 60 req/hr free, cacheable with `sessionStorage`. |
| Geolocation | ipapi.co (free tier, no key) | Keyless, silent fallback to USD on failure. |
| 3D / Generative | Three.js / p5.js via CDN | Client-side rendering, no server compute. |
| Animations | anime.js via CDN | Lightweight, no build dependency. |

**Process:**

```
1. For each feature in the PRD, the Agent proposes an implementation approach.
2. The Human evaluates each proposal against the Infrastructure Decision Matrix.
3. Any proposal that fails the matrix is either:
   a. Rejected outright, or
   b. Sent back with a constraint (e.g., "Use Formspree instead of a custom Express server").
4. The final approved stack is documented in the PRD and README.
```

**Anti-Patterns (Strictly Prohibited):**

- ❌ Proposing a database when `localStorage` / `sessionStorage` suffices.
- ❌ Suggesting a Node.js/Express backend for a contact form (use Formspree or equivalent).
- ❌ Embedding API keys, tokens, or secrets in frontend code under any circumstance.
- ❌ Choosing a technology because it is "industry standard" without evaluating the simpler alternative.
- ❌ Deploying any service with a paid-only tier unless the Human Principal explicitly authorizes the cost.

**Deliverable:** An Architecture table in `README.md` listing every technology, its purpose, and the zero-maintenance justification.

---

### PHASE 3: The "Arthur Protocol" — Adversarial Code Review
#### *"Trust the Agent's output. Verify the Agent's reasoning."*

**Objective:** Establish a formal, adversarial review process where the Human Principal interrogates every autonomous decision the Agent has made — checking for hallucinated constraints, unauthorized scope additions, and unjustified architectural choices.

**Rationale:**  
During the JD.core build, the Agent autonomously pivoted the entire site positioning from a developer portfolio to a B2B consultancy. This decision was based on a legacy "Option C" constraint from an earlier PRD revision. The pivot was ultimately **correct** — but only because the Human caught it, interrogated the reasoning, and validated the logic against the PRD. Without the review, a hallucinated constraint could have shipped to production unchallenged.

The Arthur Protocol exists because **AI agents are confidently wrong at the same volume as they are confidently right.** The Human cannot distinguish between the two without active interrogation.

**The Review Checklist:**

For every deliverable the Agent produces, the Human must evaluate:

| # | Check | Question to Ask |
|---|-------|-----------------|
| 1 | **PRD Compliance** | "Does this implementation match what the PRD specifies, or has the Agent added/removed features?" |
| 2 | **Constraint Origin** | "Where did this constraint come from? Is it in the PRD, or did the Agent invent it?" |
| 3 | **Hallucination Detection** | "Is the Agent referencing a library, API, or pattern that doesn't exist or doesn't work as described?" |
| 4 | **Scope Creep** | "Did the Agent add features I didn't ask for? Are they justified, or are they noise?" |
| 5 | **Infrastructure Violation** | "Does this introduction violate the Infrastructure Decision Matrix from Phase 2?" |
| 6 | **Business Logic Merge** | "Has the Agent's business/conversion logic been properly merged with my technical requirements, or are they in conflict?" |
| 7 | **Silent Failures** | "If I disable network access, does this code degrade gracefully or does it crash?" |
| 8 | **Mobile & A11y** | "Has the Agent tested or accounted for mobile viewports, touch targets, and screen readers?" |

**The Interrogation Protocol:**

When the Human identifies a suspect decision, the following escalation process is used:

```
LEVEL 1 — INQUIRY
  Human: "Why did you choose [X] instead of [Y]?"
  Agent: Must cite the specific PRD section, technical constraint, or
         documented precedent that drove the decision.

LEVEL 2 — CHALLENGE
  Human: "The PRD says [Z]. Your implementation does [X]. Reconcile."
  Agent: Must either:
         a. Demonstrate that [X] is a valid interpretation of [Z], or
         b. Acknowledge the deviation and propose a correction.

LEVEL 3 — OVERRIDE
  Human: "Revert to [Y]. Here is why: [justification]."
  Agent: Executes the override without argument. Documents the
         decision in the PRD as a formal amendment.
```

**The Merge Pattern (Business Logic ↔ Technical Requirements):**

The most valuable output of the Arthur Protocol is the **merge** — where the Agent's autonomous business insights (e.g., psychological pricing, loss-aversion copy, decoy effect positioning) are validated and integrated with the Human's technical constraints (e.g., GitHub API integration, Formspree AJAX, zero-key architecture).

| Agent Contribution (Business) | Human Contribution (Technical) | Merged Output |
|-------------------------------|-------------------------------|---------------|
| "Push the $197/mo retainer as the default using the Decoy Effect." | "All pricing must render client-side with no backend. Currency must localize via a free, keyless API." | Psychological pricing grid with ipapi.co geolocation, 1.5s timeout, and silent USD fallback. |
| "Use Loss Aversion: 'You are bleeding $X a year.'" | "The calculation must be deterministic, driven by a slider, with `Intl.NumberFormat` for locale-safe currency." | Interactive ROI slider with real-time annual cost calculation and localized currency display. |
| "Offer a 'Free Workflow Audit' as a low-friction lead magnet." | "Form submissions must go through Formspree AJAX with inline success state. No page redirect." | 5-question qualification form with AJAX submission, inline success message, and zero backend dependencies. |

**Anti-Patterns (Strictly Prohibited):**

- ❌ Shipping Agent output without Human review ("it looks fine, just merge it").
- ❌ Accepting the Agent's justification at face value without cross-referencing the PRD.
- ❌ Allowing the Agent to introduce new dependencies or services during implementation without returning to Phase 2.
- ❌ Skipping the merge step — the Agent's business logic and the Human's technical requirements must be explicitly reconciled, never left in conflict.

**Deliverable:** A reviewed, annotated codebase where every major decision is traceable to either the PRD, a formal amendment, or a documented Human override.

---

### PHASE 4: The Zero-Maintenance Mandate
#### *"If it can't run unattended for 5 years, it doesn't ship."*

**Objective:** Ensure every deployed system is architected for **perpetual, autonomous operation** — requiring zero ongoing human intervention, zero paid services, and zero manual update cycles.

**Rationale:**  
The JD.core system was designed to survive indefinitely on GitHub Pages with no human touch. The GitHub API dynamically populates project data as new repos are created. Formspree handles form submissions externally. The geolocation API silently fails to USD if it ever goes offline. There is no database to migrate, no server to patch, no SSL certificate to renew, no dependency to update. **The system is self-sustaining by design.**

This is the terminal quality gate. No system passes this phase unless it can answer "yes" to every question below.

**The Zero-Maintenance Audit:**

| # | Audit Question | Pass Criteria |
|---|---------------|---------------|
| 1 | **Can this run without human intervention for 5+ years?** | No manual deployments, no scheduled maintenance, no credential rotations. |
| 2 | **Are all external data sources dynamic?** | Content updates itself via API (e.g., GitHub repos appear automatically when pushed). No hardcoded project lists. |
| 3 | **Is deployment fully automated?** | Push to `main` → auto-deploy. No CI/CD configuration beyond initial setup. |
| 4 | **Does every external dependency have a fallback?** | API timeout → graceful degradation. CDN down → system still renders core content. |
| 5 | **Are there zero recurring costs?** | Free hosting, free APIs, free form handling. No credit card on file. |
| 6 | **Are there zero secrets to rotate?** | No API keys, no tokens, no `.env` files. Everything is public or managed by a third party. |
| 7 | **Is the codebase a single deployable artifact?** | Ideally one file (`index.html`). No build step, no `node_modules`, no transpilation. |
| 8 | **Is the system resilient to partial outages?** | If GitHub API is rate-limited, cached data serves. If geolocation fails, USD defaults. If Formspree is down, the form still renders (submission fails gracefully). |

**Dynamic Content Strategy:**

The system must never rely on hardcoded content for data that changes over time. The following patterns are mandated:

| Content Type | Wrong Approach (Static) | Correct Approach (Dynamic) |
|-------------|------------------------|---------------------------|
| Projects / Portfolio | Hardcoded HTML cards that require manual updates | GitHub API fetch with filtering, caching, and automatic rendering |
| Pricing / Currency | Hardcoded `$` symbol | ipapi.co geolocation with locale-aware `Intl.NumberFormat` |
| Form Handling | Custom backend with database | Formspree / Formsubmit managed service (AJAX) |
| Deployment | Manual FTP / SCP upload | GitHub Pages auto-deploy on push to `main` |

**The Graceful Degradation Protocol:**

Every external dependency must implement the following failure cascade:

```
┌─────────────────────────────────────────────────────────────┐
│                    GRACEFUL DEGRADATION                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   1. ATTEMPT        Fetch external resource                 │
│                     (with strict timeout: ≤ 1.5s)           │
│                                                             │
│   2. ON SUCCESS     Parse and render dynamic content        │
│                                                             │
│   3. ON FAILURE     Trigger silent fallback:                │
│                     • Default to safe static value          │
│                     • Zero console errors                   │
│                     • Zero broken UI elements               │
│                     • Zero user-visible error messages      │
│                                                             │
│   4. CACHE          Store successful responses in           │
│                     sessionStorage (TTL: 2 hours)           │
│                     to reduce API calls and survive         │
│                     temporary outages                       │
│                                                             │
│   5. INVARIANT      The site must be fully functional       │
│                     and visually intact even if every       │
│                     external API is simultaneously down.    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Anti-Patterns (Strictly Prohibited):**

- ❌ Deploying a system that requires manual content updates to stay current.
- ❌ Using any service that requires periodic credential rotation or billing management.
- ❌ Allowing a failed API call to produce a console error, a broken layout, or a user-visible error message.
- ❌ Requiring a build step (`npm run build`, `webpack`, etc.) for deployment when a static file would suffice.
- ❌ Creating a system that "works today" but will silently break when a free tier changes or an API endpoint is deprecated, without a documented fallback plan.

**Deliverable:** A production-hardened `index.html` (or equivalent minimal artifact) deployed to a zero-cost static host with automated deployment, dynamic content, and graceful degradation for all external dependencies.

---

## 4. Workflow Summary

The following diagram illustrates the end-to-end workflow:

```
 Phase 1                Phase 2                Phase 3                Phase 4
┌──────────┐          ┌──────────┐          ┌──────────┐          ┌──────────┐
│          │          │          │          │          │          │          │
│   PRD    │────────▶ │  INFRA   │────────▶ │  REVIEW  │────────▶ │  ZERO    │
│  LOCK    │          │  CHECK   │          │ PROTOCOL │          │  MAINT.  │
│          │          │          │          │          │          │          │
└──────────┘          └──────────┘          └──────────┘          └──────────┘
     │                     │                     │                     │
     ▼                     ▼                     ▼                     ▼
  PRD.md              README.md            Reviewed Code       Production Deploy
  committed           Architecture         +                   (GitHub Pages)
  to repo             table locked         PRD Amendments      Zero-cost, 
                                           documented          self-sustaining
```

**The Golden Rule:** At no point in this workflow does the Agent operate without a written specification, an infrastructure constraint, a Human review, or a maintenance audit. **Autonomy is bounded. Output is verified. Systems are permanent.**

---

## 5. Appendix A: Lessons from JD.core

The following decisions from the JD.core build serve as canonical precedent for this SOP:

| Decision Point | What Happened | Lesson Codified |
|----------------|--------------|-----------------|
| **Option C Pivot** | Agent autonomously pivoted from portfolio to B2B consultancy based on a legacy PRD constraint. Human caught it in review and validated the reasoning. | Phase 3: Always interrogate constraint origin. The Agent may be right — but prove it. |
| **Formspree over Express** | Agent initially considered a backend for form handling. Human enforced Formspree as a zero-maintenance alternative. | Phase 2: Infrastructure Decision Matrix. If a managed service exists, use it. |
| **Psychological Pricing** | Agent introduced anchor pricing, charm pricing, and the Decoy Effect. Human validated the business logic and enforced keyless currency localization. | Phase 3: The Merge Pattern. Business logic and technical constraints must be explicitly reconciled. |
| **GitHub API Caching** | Agent implemented `sessionStorage` with 2-hour TTL to avoid rate limiting. | Phase 4: Dynamic content with caching is the standard pattern. |
| **ipapi.co Fallback** | Agent implemented 1.5s timeout with silent USD default. | Phase 4: Graceful Degradation Protocol. No external failure is ever user-visible. |
| **Single-File Architecture** | Entire production system ships as one `index.html`. No build step, no dependencies. | Phase 4: The simplest deployable artifact is the correct one. |
| **1-Task-Per-Person Policy** | Agent structured team delegation with strict single-responsibility assignments to prevent overlap and chaos. | Phase 1: Deterministic task assignment prevents scope collision. |

---

## 6. Appendix B: The Agent's Rules of Engagement

The following rules govern the Agent's behavior across all phases:

1. **Never generate code without a locked PRD.** If the Human hasn't signed off on the specification, the Agent's job is to *ask questions*, not write code.

2. **Never introduce a dependency without passing the Infrastructure Decision Matrix.** Every `<script src="...">`, every `fetch()` call, every external service must be justified.

3. **Never ship without Human review.** The Agent can propose, prototype, and recommend — but the Human merges.

4. **Never allow a silent failure to become a loud failure.** If an API can go down, the Agent must implement graceful degradation *before* the Human asks for it.

5. **Never hardcode data that changes.** If the content will be different in 6 months, it must be dynamically sourced.

6. **Always cite the PRD.** When the Human asks "why did you do X?", the Agent must be able to point to a specific section, line, or amendment in the PRD. "I thought it was a good idea" is not acceptable.

7. **Always propose the simpler solution first.** Complexity is a cost. The Agent must demonstrate that the simpler alternative was evaluated and found insufficient before proposing the complex one.

8. **Always document overrides.** When the Human overrides the Agent's decision, the override and its justification are recorded as a PRD amendment. This creates an audit trail and prevents the Agent from re-proposing rejected approaches.

---

## 7. Revision History

| Version | Date | Author | Change |
|---------|------|--------|--------|
| 1.0 | 2026-03-12 | Talvin Lee / Arthur | Initial SOP drafted from JD.core landing page build workflow. |

---

*This SOP is a living governance document. Amendments require Human Principal approval and must be versioned in this revision history.*
