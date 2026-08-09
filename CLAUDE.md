# CLAUDE.md — Arclights Landing Page

This file guides Claude Code (or any AI coding agent) when working on the Arclights marketing website. Follow this direction precisely for copy, structure, color, and typography unless the user explicitly overrides it.

## Brand Positioning

**Arclights** — *Automate. Innovate. Elevate.*

Position Arclights as: a technology studio that designs, builds, and automates practical digital solutions for businesses and ideas. Not "freelancers who build software," and not a 200-person enterprise.

The site must communicate, fast: We understand the problem → We build the solution → We make it work better.

Personality: intelligent, precise, modern, approachable, ambitious, reliable.
Avoid: student project, crypto startup, gaming company, generic AI agency, luxury fashion label, corporate consulting template.

## Tech Stack

- **Framework**: Next.js (App Router, latest stable), TypeScript
- **Styling**: Tailwind CSS, configured with the brand tokens below as custom theme colors/fonts (do not hardcode hex values inline — extend `tailwind.config` instead)
- **Animation**: Framer Motion for section transitions, arc motion paths, and the splash-to-hero handoff. Keep motion subtle and premium per the "Visual Language" section — no bouncy/playful easing.
- **Fonts**: Manrope via `next/font` (self-hosted, not a render-blocking Google Fonts `<link>`)
- **Deployment target**: Vercel (Next.js default) — confirm with user before first deploy
- **Images/video**: use `next/image` for the logos; the intro video is a native `<video>` element (see Splash Intro below), not `next/image`

## Brand Assets

Source files live in `Assets/` at the project root:

| File | Usage |
|---|---|
| `Assets/Archlights-logo.jpeg` | **Light logo** (graphite wordmark, gold→silver arc, ivory background). Default logo across the site — navbar, light-mode sections. Note the filename typo ("Archlights") — fix on copy into the app (e.g. `public/logo-light.png`), do not propagate the typo into code. |
| `Assets/Arclights-dark-logo.jpeg` | **Dark logo** (white wordmark, gold→silver arc, black background). Use in dark sections: footer, CTA section, splash intro. |
| `Assets/Arclights-intro.mp4` | 10s, 848×478, H.264, 24fps. 3D-rendered metallic ribbon animation: a silver/gold ribbon coils and resolves into the Arc, then the full ARCLIGHTS lockup + tagline fades in on a soft ivory-gray studio background with a small sparkle/glint accent. **Used as a one-time splash intro** (see below) — not embedded elsewhere on the page. |

Before use, re-export the two JPEG logos as transparent-background PNG/SVG assets (the source JPEGs have baked-in ivory/black backgrounds, which will not composite over other section backgrounds). Vectorizing the arc mark as SVG is preferable for crisp rendering at all sizes and for CSS-driven color/gradient reuse in the arc motif elsewhere on the page.

### Splash Intro (Arclights-intro.mp4)

- Plays once on a visitor's first load per session (gate with `sessionStorage`, not a cookie — no consent banner needed for a non-tracking flag)
- Full-viewport, video centered/covered on the ivory backdrop matching the video's own background so the transition into the page is seamless
- Skippable: a subtle "Skip" control appears after ~1s; also skip immediately if the user has `prefers-reduced-motion: reduce`
- On end (or skip), cross-fade into the real Hero section — do not hard-cut
- On repeat visits within the same session, or on any route other than `/`, never show it again
- Autoplay muted, `playsInline`, no controls chrome, no loop

## Page Structure (exact order)

1. Navbar
2. Hero — "We turn ideas into technology that works"
3. Capability strip
4. What We Do
5. Selected Work
6. Why Arclights
7. How We Work
8. Technology / Capabilities
9. About Arclights (preview only)
10. Team preview
11. Project CTA
12. Footer

Flow this creates: Who are you? → What do you do? → Show me → Why you? → How will you work with me? → Who are you? → Let's talk.

## 1. Navbar

- Left: Arclights symbol + `ARCLIGHTS` wordmark
- Nav links: `Home`, `Services`, `Work`, `Process`, `About`, `Contact`
- Right CTA: `Start a Project →`
- Mobile: collapse into a minimal hamburger menu
- Do not add Careers, Blog, Products, Resources, Case Studies, Industries, etc. yet

## 2. Hero Section

Do NOT use generic openers like "Welcome to Arclights" or "We provide innovative technology solutions."

- Eyebrow text: `SOFTWARE • AUTOMATION • AI • DIGITAL SOLUTIONS`
- Headline: "We turn ideas into technology that works." — highlight one phrase in gold
- Supporting copy: "Arclights designs and builds practical software, intelligent automation, and digital solutions that help businesses work smarter, move faster, and grow with confidence."
- Primary CTA: `Start a Project →`
- Secondary CTA: `Explore Our Work`
- Below buttons: `Automate | Innovate | Elevate`

### Hero Visual

No laptop mockups. Build the visual language around the logo's Arc:
- Arc symbol enlarged in the background
- Subtle metallic gradient
- Fine grid
- Glowing connection nodes
- Abstract software/interface elements
- Very subtle motion following the arc — beginning bottom-left, rising behind the headline, disappearing toward the right

## 3. Trust / Intro Strip

- Line: "From ideas to working solutions."
- Sub-line: `Strategy · Design · Development · Automation · Deployment`
- Optional slow horizontal animation, premium feel — not flashy
- Do NOT add fake client logos or fake statistics. Convert to a real "Trusted by" strip only once there are real clients.

## 4. What Arclights Does

- Section label: `WHAT WE DO`
- Heading: "Technology built around real problems."
- Description: "We help turn business requirements, repetitive processes, and new ideas into reliable digital solutions — from the first concept to a working system."

Four large service cards:

**01 — Software Development**
"Build software around the way your business actually works."
Custom web applications, internal tools, dashboards, management systems, APIs, databases, and business platforms designed around specific requirements.
Labels: `Web Applications` `Business Systems` `APIs` `Dashboards`

**02 — Automation**
"Turn repetitive work into intelligent workflows."
We design automation systems that connect tools, move information, trigger actions, reduce manual work, and simplify everyday operations.
Labels: `Workflow Automation` `Business Process Automation` `System Integration` `Notifications & Actions`

**03 — AI Solutions**
"Apply AI where it creates real value."
From AI-powered assistants and intelligent search to document processing and agent-based workflows, we build practical AI systems around genuine use cases.
Labels: `AI Assistants` `RAG Systems` `Intelligent Workflows` `AI Integration`

**04 — Digital Solutions**
"From an idea to something people can actually use."
We help shape concepts, design interfaces, build prototypes, create MVPs, and turn technical ideas into deployable products.
Labels: `MVP Development` `Product Prototyping` `UI / UX` `System Architecture`

## 5. Why Arclights (Differentiation)

- Section label: `WHY ARCLIGHTS`
- Heading: "Less complexity. More clarity."

Four principles:
- **Practical by Design** — We focus on solving the actual problem instead of adding technology for the sake of it.
- **Built Around You** — Every project begins with understanding your workflow, requirements, users, and goals.
- **Clear Communication** — You know what is being built, why it is being built, and where the project stands.
- **Built to Improve** — We test, learn, refine, and improve throughout the development process.

Reflects existing values: Purposeful, Curious, Reliable, Always Improving.

## 6. How We Work (Process)

- Section label: `HOW WE WORK`
- Heading: "From problem to product."
- Visual: horizontal flowing line inspired by the Arc

Steps:
1. **Understand** — We begin with the problem — your goals, users, workflow, challenges, and requirements.
2. **Plan** — We define the solution, architecture, features, technologies, milestones, and expected outcome.
3. **Build** — We design and develop the solution through clear, manageable iterations.
4. **Test** — We validate functionality, usability, reliability, and real-world behaviour.
5. **Launch** — We deploy the solution and make sure everything works in its intended environment.
6. **Improve** — We gather feedback, refine the system, and continue improving where needed.

## 7. Selected Work

- Section label: `SELECTED WORK`
- Heading: "Things we've built."
- Present personal/team projects professionally, without pretending they were commercial client work.

Each project card:
- Project name
- One-line problem statement
- Tags
- Buttons: `View Project →`, `GitHub ↗`, and `Live Demo ↗` if available

For stronger projects, later expand with: Problem, Approach, Technology, Outcome. Never show bare GitHub repo cards only — always communicate business value.

### Confirmed project cards (source: github.com/Vishal-WD, resume)

**Campus Connect**
"A full-stack, role-based campus management platform selected as a primary showcase for global ABET accreditation."
Distinct dashboards for students, faculty, and administrators — real-time announcements, resource repository, attendance and grade tracking, and RBAC-secured data flows.
Tags: `Web App` `Full-Stack` `RBAC`
Tech: React / Next.js, Tailwind CSS, FastAPI, PostgreSQL, Firebase, Firestore, JWT
Links: GitHub → https://github.com/Vishal-WD/CAMPUS-CONNECT (no public live demo)

**VisionSense**
"A computer vision pipeline that turns retail CCTV footage into customer behavior intelligence — built for Orientbell Tiles and awarded 1st Prize at the KARE SCRS Hackathon (DEV-FEST 2.0)."
Multi-stage pipeline tracking navigation patterns, dwell time, and real-time sentiment; a staff-vs-customer classifier running at 95%+ accuracy generates heatmaps for showroom layout optimization.
Tags: `Computer Vision` `AI` `Retail Analytics`
Tech: Python, YOLOv11, ByteTrack, DeepFace, OpenCV, PyTorch
Links: GitHub → https://github.com/Vishal-WD/VisionSense (no public live demo — CV pipeline, not a hosted app)

**AquaSense AI**
"An IoT and AI-driven platform that monitors water quality in real time and flags contamination risk before it becomes a problem — built during the Infosys Springboard internship, 2nd Place at EUPHORIA 2026 Techno-Management Meet."
ESP32 sensor array (pH, turbidity, temperature, light) streams over MQTT into a FastAPI/PostgreSQL backend; a Random Forest model predicts risk; role-based dashboards serve citizens, NGOs, and government bodies.
Tags: `IoT` `AI` `Full-Stack`
Tech: FastAPI, PostgreSQL, React / Angular / Ionic, ESP32, MQTT, Random Forest (scikit-learn)
Links: GitHub → https://github.com/Vishal-WD/AquaSense · Live Demo → https://aqua-sense-three.vercel.app

Order on the page: Campus Connect, VisionSense, AquaSense AI (matches GitHub pinned order).

## 8. Capabilities / Technology

- Section label: `CAPABILITIES`
- Heading: "The technology behind the work."
- Do not display rows of language/framework logos. Group by category instead:

**Development**: Web Applications, Backend Systems, APIs, Databases, Cloud-ready Architecture
**Automation**: Workflow Automation, API Integration, Business Process Automation, Data Pipelines
**Artificial Intelligence**: Generative AI, RAG, Agentic Workflows, AI Integration, Intelligent Search
**Data**: Data Processing, Analytics, ETL / ELT, Dashboards, Data Engineering

Closing line: "We choose technologies based on the problem — not the trend."

## 9. About Preview

Do not place the full About page content on the landing page — only a preview.

- Section label: `ABOUT ARCLIGHTS`
- Heading: "Small team. Serious about what we build."
- Copy: "Arclights was started by two people with backgrounds in technology and a shared belief that software should solve meaningful problems. We combine development, automation, software quality, and continuous experimentation to turn ideas into practical solutions."
- CTA: `Our Story →`

## 10. Team Preview

"The People Behind Arclights"
- **Dharanyaa** — Software · QA · Automation
- **Vishal** — Development · Software · Technology

Do not lead with educational qualifications (MCA / B.Tech CSE) on the landing page — that belongs on the full About page. Clients care about capability, not credentials.

## 11. CTA Section

Bold, dark section even though the overall site is light.

- Small text: `HAVE SOMETHING IN MIND?`
- Heading: "Let's turn it into something real."
- Supporting text: "Whether you're starting with an idea, an existing workflow, or a problem that needs solving, tell us what you're trying to build."
- Button: `Start a Project →`
- Secondary: `hello@arclights...`
- Future additions: WhatsApp / Calendly / consultation booking

## 12. Footer

Luxurious, minimal.

- `ARCLIGHTS` — "Automate. Innovate. Elevate."
- Nav: `Work` `Services` `About` `Contact`
- Social: `LinkedIn ↗` `GitHub ↗`
- Bottom: `© 2026 Arclights. All rights reserved.`
- Optional: `Built with purpose.`

## Content Rule — Landing Page vs. About Page

The About page's current closing line "We're Just Getting Started" (learning/growing framing) stays on the About page only — on the landing page it can read as inexperience.

On the landing page, use instead: **"Built to solve. Ready to grow."**

Landing page = sell capability. About page = tell the personal journey.

---

## Brand Color Palette

The light logo is the strongest basis for the site: light/warm by default, with dark sections used strategically.

| Token | Hex | Usage |
|---|---|---|
| Arc Ivory (primary background) | `#F8F6F1` | Use instead of pure white — warmer, premium |
| Pure Surface | `#FFFFFF` | Cards, forms, floating panels, project mockups |
| Midnight Graphite (primary text) | `#171922` | Headlines, navigation, body emphasis, light-bg logo text |
| Arc Black (deep background) | `#080808` | Dark hero variant, CTA section, footer, project showcases |
| Arc Gold (signature accent) | `#C99A54` | Small labels, hover effects, icons, buttons, lines, numbers, highlighted words — use rarely |
| Soft Gold | `#E6C892` | Gradients, subtle backgrounds, decorative glow, hover states |
| Metallic Silver | `#B8BBC1` | Sparingly: arc gradients, borders, decorative graphics |
| Muted Text | `#686A71` | Body copy, secondary text |
| Soft Border | `#E8E4DC` | Card outlines, section separators, input fields |

**Core brand gradient**: `#B7833E → #E7C98D → #F2EEE4 → #7B7E85 → #292B31`
Use only for: the Arc graphic, animated lines, tiny borders, special icons, visual highlights. Never as a full-page background.

### Light Mode (default)
Background `#F8F6F1` · Heading `#171922` · Body `#686A71` · Card `#FFFFFF` · Gold `#C99A54` · Borders `#E8E4DC`

### Dark Mode / Dark Sections
Background `#080808` · Elevated surface `#111216` · Heading `#F7F5F0` · Body `#A8A8AA` · Gold `#D0A05A` · Silver `#C4C5C8` · Border `#24252A`

### Color Usage Ratio

70% Ivory/light neutral · 20% Graphite/black · 7% Gold · 3% Silver/gradient effects.

Too much gold reads as jewelry/luxury-property/financial branding. The technology feeling should come from typography, geometry, layout, and interaction — gold only provides personality.

## Typography

- Headings font: **Manrope** (preferred; alternatives Satoshi, Plus Jakarta Sans) — clean, technical, modern, not boring
- Sizes: Hero `64–80px` · H2 `48–56px` · H3 `24–30px` · Body `16–18px` · Small labels `12–14px`
- Section label letter-spacing: `0.14em–0.20em` (e.g., `W H A T   W E   D O`) — echoes the spaced-out ARCLIGHTS wordmark

## Visual Language — "The Arc"

Reuse the Arc concept as a design system, not literally the logo everywhere:
- Curved trajectories
- Thin connection lines
- Soft arcs
- Rising motion
- Gradient trails
- Curved masking
- Light traveling along curves

Metaphor: Arc = progression (Idea → Development → Solution). Light = clarity (Complexity → Understanding). Arclights = technology that moves ideas forward.

## UI Style Prompt

When generating or briefing visual design, use this description:

> Premium minimal technology studio website. Warm off-white background, deep graphite typography, restrained champagne-gold accents, metallic silver details, generous whitespace, oversized editorial headings, soft geometric cards, subtle borders, smooth arc-inspired motion graphics and highly polished micro-interactions. Avoid stereotypical neon-blue AI graphics, excessive gradients, glassmorphism and generic stock imagery.

## Buttons

**Primary** ("Start a Project →"): Graphite background, ivory text. Hover: gold background, graphite text.
**Secondary**: Transparent background, graphite text, 1px muted border. Hover: gold border.
**Radius**: 8–12px — not pill-shaped.

## Cards

- Very light background, 1px border, 12–18px radius, generous internal spacing, almost no shadow
- Hover: card lifts ~4px, border transitions toward gold, small arrow moves right
- Avoid heavily floating card styles

## Logo Usage

- **Light logo** = default across the site
- **Dark logo** = alternate identity for footer, CTA sections, social banners, presentation covers, dark app screens, marketing material
- Gold remains the signature accent shared by both versions

---

## Founder Credentials — Reference Only (do not put on landing page)

Pulled from Vishal's resume. Useful for the full About page or a future credentials/press section — not the landing page, per the "Built to solve. Ready to grow." rule above.

- **Patent Application Published**: "A Federated Intelligent Terminal Ecosystem for Real Time Debugging and Automated Documentation Using RAG and Hive Based Collaborative Intelligence" — Application No. 202641023307 A, Indian Patent Office Journal, April 2026. (Underlying project: LUNA, a GenAI terminal assistant.)
- **Research Paper Published**: "Voice Assistant: AI Speech Recognition Module" — EPRA International Journal of Multidisciplinary Research (IJMR), March 2022.
- **1st Prize, KARE SCRS Hackathon (DEV-FEST 2.0)** — VisionSense, Computer Vision for retail business intelligence.
- **2nd Place, EUPHORIA 2026 Techno-Management Meet** — AquaSense AI.
- **Certifications**: Oracle Cloud Infrastructure (OCI) 2025 Generative AI Professional; Forage Job Simulations (Deloitte Data Analytics, TCS Data Visualization); Google Cloud Arcade Facilitator Program Level 3; Infosys Springboard Industry Readiness Certification.
- Certificate files (research paper PDF, patent publication, OCI/Forage/Google Cloud certificates) live on the portfolio site (vishal-wd-portfolio.vercel.app) but have not yet been downloaded — that site is JavaScript-rendered and requires browser tooling to access. Pending.

## Working Notes for the Agent

- Keep copy exactly as specified above unless the user requests changes — this is finalized brand copy, not a draft.
- Do not invent client logos, testimonials, or statistics.
- Do not surface founder degrees (MCA / B.Tech CSE) on the landing page.
- Any new sections beyond the 12 listed should be treated as out of scope unless explicitly requested.
- Tech stack, splash-intro behavior, and asset-handling notes above are locked decisions (confirmed 2026-08-09) — do not silently switch frameworks or drop the splash intro.
