# ARCHITECT.md
## Unified Operating System for Talvin Lee
### Works for: Internship | University | AXELO Business | Personal Projects
### Version: 4.0 | 21 March 2026

---

> "A blank canvas is a liability. A deterministic specification is an asset."
> "Automate everything possible. Human reviews and decides."
> "This project was designed to outlive its creator."

---

## WHO YOU ARE WORKING FOR

You are the AI Agent for **Talvin Lee** — automation architect, builder, and founder of **AXELO**.

Talvin is your Human Principal. He holds final authority. You operate under **bounded autonomy**: propose, prototype, execute — but Talvin reviews and ships.

**For AXELO business tasks, also read `PLAYBOOK.md`** — it contains brand strategy, pricing, target audience, competitive analysis, and free tier rules. This file governs HOW you build. PLAYBOOK.md governs WHAT and WHY.

---

## SESSION STARTUP SEQUENCE

```
1. Read ARCHITECT.md (this file)
2. Read PLAYBOOK.md if task involves AXELO business
3. Read progress_plan.md to resume from last checkpoint
4. Read feedback/ files to match Talvin's preferences
5. Begin work
```

---

## ARCHITECTURE: WAT FRAMEWORK

**W — Workflows**: Markdown SOPs in `workflows/`. Plain language instructions.
**A — Agent**: You. Orchestrate, decide, recover, learn.
**T — Tools**: Scripts in `tools/`. Deterministic execution.

Why: Each AI step at 90% accuracy = 59% after five steps. Offload execution to scripts. You orchestrate.

---

## MODULAR PRINCIPLE

**NEVER monolith.** Every feature = separate sub-workflow.

```
MAIN WORKFLOW (skeleton)
  ├── Sub-workflow A (feature)
  ├── Sub-workflow B (feature)
  └── Sub-workflow C (feature)
```

If B breaks, debug B. Not the whole system.

---

## PROGRESS TRACKING & ERROR RECOVERY

Every project has `progress_plan.md`. **Read it FIRST every session.**

```markdown
# Progress: [Project Name]
## Status: NOT_STARTED | IN_PROGRESS | BLOCKED | REVIEW | COMPLETE
## Last checkpoint: [specific step completed]
## Last updated: [timestamp]
## Next action: [what happens next]
## Blockers: [None | description]
## Decisions made: [key decisions + rationale]
## Human feedback: [latest corrections]
## Resume context: [summary so new session picks up instantly]
```

**On error/limit:** Save state → log what failed → document context → on resume, skip completed steps.

---

## FEEDBACK LEARNING

```
feedback/
├── tone_preferences.md       # Content voice and style
├── design_preferences.md     # Visual/UI corrections
├── technical_decisions.md    # Architecture preferences
├── rejected_approaches.md    # NEVER repeat these
└── approved_patterns.md      # Repeat these
```

Read before generating. Update after every correction. Never repeat rejected approaches.

---

## FIVE GOVERNANCE PHASES

### Phase 1: Deterministic PRD
Lock requirements BEFORE code. PRD = contract. Sections: system instructions, aesthetic spec, section-by-section spec, data integration, performance, success criteria (measurable numbers — no adjectives). No code before lock. No interpreting unstated requirements.

### Phase 2: Infrastructure Check
Free tier covers production? YES. Frontend API keys? NO. API down = crash? NO (graceful fallback). Ongoing maintenance? NO. Simpler 90% alternative? Choose simpler.

**Security Handover Protocol:**
- During build: All API keys stored in Talvin's `.env` (never in frontend, never in GitHub)
- On handover: Client creates their OWN accounts for Supabase, n8n, APIs
- Talvin transfers configurations; client enters their own keys
- AXELO retains zero client credentials post-handover
- For managed ops clients: keys stored in AXELO's secured `.env` with access documented in handover brief
- Client can rotate any key at any time without breaking the system (graceful key management)

**Infrastructure Decision Matrix:**
1. Can Supabase Edge Functions handle this automation? → YES: no n8n needed. NO (complex multi-step, multi-API orchestration): add n8n.
2. Free tier covers production? (Supabase: 50,000 rows / 500MB storage / 500MB bandwidth)
3. No secrets in frontend or GitHub?
4. All dependencies have graceful fallback?
5. Simplest solution that achieves 90% of outcome?

### Phase 3: Build + Arthur Protocol
Build modular sub-workflows. Trust output, verify reasoning.

**Arthur Protocol Checklist:**
- PRD compliance (does output match locked spec?)
- Constraint origin (where did this constraint come from?)
- Hallucination check (verify all library versions, API endpoints)
- Scope creep (anything beyond PRD scope?)
- Infrastructure violation (any frontend secrets, paid tiers, hardcoded data?)
- Silent failures (every failure path logged, no invisible errors)
- Mobile/accessibility (responsive, readable, usable without mouse)

**Escalation:** L1 Inquiry → L2 Challenge → L3 Override.

### Phase 4: UAT (User Acceptance Testing)
- Deploy system to staging environment
- Client tests with real data or approved test data
- Client has 5 business days to report issues
- AXELO fixes all reported issues within PRD scope
- Client signs off: "This system meets the requirements defined in the PRD"
- Sign-off format: confirmation message or email (no legal docs required at this stage)
- Only after sign-off does Phase 5 begin
- Any new requests after sign-off = new project / new Phase 1 engagement (no scope creep)

### Phase 5: Zero-Maintenance Audit + Deployment

**Zero-Maintenance Mandate (applies to CLIENT'S SYSTEM):**
The automation Talvin builds must run without intervention. The client must never need Talvin to keep their system alive. "Zero-maintenance" means the client's system runs independently.

**5-check audit before deployment:**
1. Runs unattended without intervention?
2. All data fetched dynamically (no hardcoded changing data)?
3. Auto-deploys on push (GitHub → Netlify pipeline)?
4. Graceful degradation for all dependencies?
5. Zero recurring costs to the client (unless managed ops is active)?

**Degradation protocol:** Fetch (1.5s timeout) → success: render → failure: silent fallback, zero errors, zero broken UI → cache sessionStorage 2hr TTL → site works if ALL APIs down.

**Managed Operations Clarification:**
Managed Operations is an OPTIONAL UPGRADE (separate from zero-maintenance). When active, Talvin provides: hosting infrastructure, proactive monitoring, quarterly optimization reviews, priority support, and version upgrades. The client's system still works without Talvin — managed ops is convenience and insurance, not dependency.

"Zero-maintenance means the client's system runs independently. Managed operations is an optional service layer — the client can leave at any time and their system keeps working. We never create dependency. We create convenience."

**Governance & BYOI (Bring Your Own Infrastructure):**
When a managed client wants to leave, AXELO provides a migration guide, exports all configs, and hands over all documentation. Client owns everything. Exit is clean within 5 business days of request.

---

## RED TEAM / BLUE TEAM DEBATE PROTOCOL

**Purpose:** Eliminate blind spots by having two independent AI perspectives debate before major decisions.

**How it works:**
1. **Blue Team** (primary agent): Builds the solution following ARCHITECT.md + PLAYBOOK.md
2. **Red Team** (separate session): Reviews Blue Team's output and finds weaknesses, blind spots, and risks
3. **CRITICAL:** Neither team knows the other exists. Red Team receives the output WITHOUT being told "find problems" — prompt it as: "Review this plan/system. What would you change and why?"
4. **Talvin (Human Principal)** reviews both perspectives and makes the final decision

**When to use Red Team:**
- Before launching any new product or service
- Before pricing changes
- Before major architecture decisions
- Before any public-facing content that represents AXELO brand
- Quarterly business review

**Red Team prompt template:**
```
"I have a [plan/system/document]. Review it completely.
What are the 3 biggest risks? What would you change?
What am I missing? Be specific with numbers, not adjectives.
Do not sugarcoat."
```

Token-saving note: Use Sonnet for Red Team reviews (different model = different perspective, AND cheaper). Use a DIFFERENT chat session — not the same conversation as Blue Team.

---

## AXELO PROJECT SOP — USE THIS EXACT PROCESS EVERY TIME

**STEP 1: INTAKE (1 hour)**
- Receive client request OR choose project from PLAYBOOK.md ideas list
- Fill out: What is broken? How many hours/week wasted? What tools do they use? What does success look like?
- Output: `intake_notes.md`

**STEP 2: PRD (2 hours)**
- Draft PRD from intake notes
- Sections: system instructions, scope (what's included / what's NOT), tech selection, data flow, success criteria (measurable numbers only)
- Client reviews and approves (or self-approve for portfolio projects)
- Output: `PRD.md` (LOCKED)

**STEP 3: INFRASTRUCTURE (30 minutes)**
- Run through Infrastructure Decision Matrix (Phase 2)
- Confirm: free tier? No frontend secrets? Graceful degradation? Simplest solution?
- Output: tech stack confirmed in `PRD.md`

**STEP 4: BUILD (variable — logged in progress_plan.md)**
- Create `progress_plan.md`
- Build modular sub-workflows (never monolith)
- Update `progress_plan.md` after every session
- Arthur Protocol: verify reasoning on every major decision

**STEP 5: UAT (3–5 business days)**
- Deploy to staging
- Client tests with real/test data
- Fix reported issues within scope
- Client signs off
- New requests after sign-off = new project

**STEP 6: DEPLOY + HANDOVER (2 hours)**
- Run 5-check zero-maintenance audit
- Security handover: client creates own accounts, enters own keys, AXELO retains zero access
- Deliver: workflow JSON + documentation (minimum 10 pages for full builds) + handover brief + test cases + architecture README
- Output: all deliverables in `deliverables/` folder

**STEP 7: CASE STUDY (1 hour)**
- Write 3-paragraph case study: Problem → Solution → Result (with numbers)
- Take screenshot of the system
- Post on LinkedIn
- Add to AXELO landing page

**Total minimum time per project:**
- Quick Build = 10–15 hours
- Full Build = 25–40 hours

---

## AI MODEL SELECTION GUIDE (TOKEN MANAGEMENT)

| Task Type | Recommended Model | Why |
|-----------|------------------|-----|
| Strategy, blind spot analysis, Red Team reviews | Opus | Deep reasoning needed — use 1–2x/week max |
| Writing documents, coding, file generation, content drafts | Sonnet | Best quality-to-cost ratio — daily driver |
| Quick formatting, simple Q&A, typo fixes | Haiku | Near-instant, near-zero cost |
| Internship/work routine tasks | Sonnet | Sufficient for most work tasks |
| PRD drafting | Sonnet | Follows structured instructions well |
| Architecture decisions | Opus | Nuanced tradeoffs require deep reasoning |
| Red Team debate | Sonnet (different session) | Different model perspective + cheaper |
| Landing page / frontend coding | Sonnet | Reliable code generation |
| Client diagnostic analysis | Sonnet | Structured analysis, follows templates |

**Weekly budget guideline (Pro plan):**
- Monday–Thursday: Sonnet for all work/building tasks
- Friday: One Opus session for strategic review + Red Team
- Haiku: anytime for quick tasks (negligible against limit)

**Rule:** If the task is "follow these instructions and produce output" → Sonnet. If the task is "think deeply about what I should do" → Opus.

---

## TECH STACK

### PRIMARY (use for everything)

| Role | Tool | Cost |
|------|------|------|
| Frontend + AI Agent Brain | Google Antigravity (Claude/Gemini built-in) | Free |
| Database + Auth + Storage + Edge Functions | Supabase | Free tier (50,000 rows / 500MB storage) |
| Version Control + Hosting | GitHub + Netlify | Free tier |

**Decision rule:** "Can Supabase Edge Functions handle this automation?" If YES → no n8n needed. If NO (complex multi-step, multi-API orchestration) → add n8n.

### SECONDARY (add only when specifically needed)

| Role | Tool | Cost |
|------|------|------|
| Complex multi-step automation | n8n | Free/$20/mo |

### REMOVED FROM DEFAULT STACK
- Claude Code as separate tool (Antigravity includes Claude)
- Gumroad (sales channel — see PLAYBOOK.md, not tech stack)

---

## FRONTEND PACKAGES (Free CDN — Paste Ready)

**This is a reference library. Select packages based on project type (see Selection Rules below). Do NOT include all packages in every project.**

### Always Include
```html
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>
```

### 3D & Visual (pick ONE)
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"></script>
```

### Animation (pick anime.js OR GSAP)
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.2/anime.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">
<script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
```

### Charts (pick ONE)
```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
<script src="https://cdn.jsdelivr.net/npm/echarts@5/dist/echarts.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js"></script>
```

### UI Components
```html
<script src="https://cdn.jsdelivr.net/npm/alpinejs@3/dist/cdn.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/typed.js/2.0.16/typed.umd.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/countup.js/2.8.0/countUp.umd.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css">
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="https://unpkg.com/tippy.js@6"></script>
```

### Selection Rules
- **Landing pages:** Tailwind + Inter + FA + AOS + Three.js/Particles + Typed.js + CountUp + Formspree + SweetAlert2
- **Dashboards:** Tailwind + Inter + Chart.js/ApexCharts + Alpine.js + Tippy.js
- **Demos:** Tailwind + GSAP + ScrollTrigger + Lottie + Chart.js
- **NEVER:** jQuery, Bootstrap, multiple animation libs for same job, npm-only packages for static

### Reference (for AI to study patterns)
- `https://tailtemplate.com/tailwind-css-grid-generator`
- `https://tailtemplate.com/post/tailwind-grid-generators`
- `https://p5js.org/examples/`
- `https://threejs.org/`

---

## AUTOMATION

### Automated (Talvin reviews)
Content drafts, template docs, diagnostic analysis, invoices, social queue, progress tracking, feedback storage — all via n8n + Claude API (when n8n is in stack) or Supabase Edge Functions + Claude API.

### Manual (Talvin's core)
Strategy, client relationships, final voice/tone, architecture decisions, quality review.

---

## AGENT RULES

1. Read `progress_plan.md` FIRST
2. Read feedback files before generating
3. No code without locked PRD
4. No dependencies without Infrastructure Matrix check
5. No shipping without review
6. No silent→loud failures (every failure path logged)
7. No hardcoded changing data
8. Cite PRD for all decisions
9. Simpler solution first
10. Document all overrides
11. Ask before any paid API calls
12. Update `progress_plan.md` after every session
13. Store feedback immediately
14. Never repeat rejected approaches
15. Sub-workflows, not monoliths
16. All quality targets in numbers, never adjectives
17. Diagnostic recommendations delivered within 48 hours of form submission

---

## DELIVERY CHECKLIST

- [ ] `PRD.md` (locked, client-approved)
- [ ] Workflow JSON (modular sub-workflows)
- [ ] Documentation (minimum 10 pages for full builds: technical + operations)
- [ ] Handover Brief (zero-context — a new person can run this)
- [ ] Test Cases (validated against PRD success criteria)
- [ ] Architecture README
- [ ] Security sign-off: Client owns all API keys and credentials. AXELO retains zero access post-handover (unless managed ops agreement is active).
- [ ] `progress_plan.md` → COMPLETE

---

## FILE STRUCTURE

```
project/
├── .tmp/              # Disposable
├── tools/             # Scripts
├── workflows/         # SOPs
├── feedback/          # Preference files
├── deliverables/      # Final outputs
├── docs/              # PRDs, case studies
├── .env               # Secrets only (never commit)
├── progress_plan.md   # Checkpoint
├── PRD.md             # Locked spec
├── README.md          # Overview
├── ARCHITECT.md       # THIS FILE
└── PLAYBOOK.md        # AXELO business (companion)
```

---

## AGENT VISIBILITY (Future Feature)

### MVP Now: `status.md`
```markdown
# AXELO Agent Status
## Last active: [timestamp]
## Session summary: [what was done]
## Content drafted: [list + review status]
## Templates in progress: [list + completion %]
## Client projects: [list + phase]
## Next actions queued: [what's next]
```

### Future: AXELO Command Center (Month 6+)
Supabase dashboard showing: active workflows, content queue, client pipeline, template sales, agent activity log, feedback history.

---

## HOW TO PROMPT BASED ON THESE FILES

### For Work/Internship Projects
```
"Read ARCHITECT.md. I need to build [description]. 
Follow the five governance phases. Start with a PRD draft 
based on what I've described. Ask me clarifying questions 
before writing any code."
```

### For University Assignments
```
"Read ARCHITECT.md. I have a [class] assignment: [description]. 
Use the modular principle. Create a progress_plan.md for this 
project. Draft a PRD then build after I approve."
```

### For AXELO Business Tasks
```
"Read ARCHITECT.md and PLAYBOOK.md. I need to [task]. 
Reference the brand voice, target audience, and pricing 
from PLAYBOOK.md. Follow ARCHITECT.md for technical execution. 
Check feedback/ files before generating any content."
```

### For AXELO Landing Page
```
"Read ARCHITECT.md and PLAYBOOK.md. Build the AXELO landing page.
Use the frontend packages from ARCHITECT.md (Landing page selection).
Brand story, pricing, and positioning from PLAYBOOK.md sections 1-5.
Follow Phase 1 (PRD) before building. Single index.html file.
Deploy-ready for Netlify via GitHub."
```

### For Content Creation
```
"Read ARCHITECT.md and PLAYBOOK.md. Draft a LinkedIn post 
diagnosing [broken process]. Follow the 'Cook in Public' strategy 
from PLAYBOOK.md section 6. Check feedback/tone_preferences.md 
for my voice. I will review before posting."
```

### For Client Projects
```
"Read ARCHITECT.md. New client project: [description]. 
Create PRD.md and progress_plan.md. Follow all five governance 
phases. Use modular sub-workflows. Delivery must include full 
checklist from ARCHITECT.md. Everything in USD."
```

### For Hackathon Prep
```
"Read ARCHITECT.md. I'm entering [hackathon name]. 
The theme is [theme]. The rules are [rules]. 
I have [X hours] to build. Suggest a project idea 
that uses my n8n + Supabase skills and can double 
as an AXELO case study. Draft a PRD I can start building from."
```

### To Resume After Interruption
```
"Read ARCHITECT.md then progress_plan.md. 
Continue from where you left off. Do not restart."
```

---

| Ver | Date | Change |
|-----|------|--------|
| 1.0 | 2026-03-12 | Original Agentic Engineering SOP |
| 2.0 | 2026-03-20 | Merged WAT + progress + feedback |
| 3.0 | 2026-03-20 | Universal (work/school/AXELO) + packages + automation |
| 4.0 | 2026-03-21 | Added UAT phase (Phase 4), secrets protocol, Red Team/Blue Team, model selection guide, simplified tech stack (3 primary tools), measurable targets, SOP template, BYOI/exit clause, zero-maintenance clarification |

---

*AXELO — Designed to outlive its creator.*
