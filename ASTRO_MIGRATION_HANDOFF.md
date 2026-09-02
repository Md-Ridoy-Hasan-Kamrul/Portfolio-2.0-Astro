# Portfolio-2.0 → Astro Full Migration Handoff

> **এই ফাইলের উদ্দেশ্য:** নতুন ফোল্ডারে AI-কে দিয়ে **Vite + React** পোর্টফোলিওকে **Astro**-তে A–Z migrate করানো।  
> পুরো conversation আবার explain করতে হবে না — এই `.md` attach/copy করে AI-কে বলুন: **"এই handoff অনুযায়ী full migration করো।"**

**তৈরির তারিখ:** 2026-09-02  
**মূল প্রজেক্ট:** `Portfolio-2.0` (Md. Ridoy Hasan Kamrul — Front-End Developer Portfolio)  
**GitHub:** `Md-Ridoy-Hasan-Kamrul/Portfolio-2.0`  
**Live (Vercel):** `portfolio-2-0-seven-opal.vercel.app`

---

## AI-কে কী বলবেন (Copy-Paste Prompt)

```
আমার Portfolio-2.0 প্রজেক্ট Vite + React SPA থেকে Astro-তে full A–Z migrate করতে হবে।

অবশ্যই পড়ো: ASTRO_MIGRATION_HANDOFF.md (এই ফাইল)

Requirements:
1. Design, section order, colors, content — current project-এর মতো same রাখতে হবে
2. Contact form EmailJS দিয়ে কাজ করবে
3. CV download: public/Ridoy_Hasan_Kamrul_Resumes.pdf
4. Static sections → .astro; interactive (Contact, GSAP, CustomCursor) → React islands
5. Vercel deploy ready (dist, PUBLIC_* env)
6. GitHub Pages base path support: /Portfolio-2.0/ when not on Vercel

Source reference: বর্তমান Portfolio-2.0 codebase copy করে নতুন astro project-এ migrate করো।
```

---

## ১. বর্তমান প্রজেক্ট সংক্ষেপ

| বিষয় | মান |
|--------|-----|
| Framework | **Vite 6 + React 19 (SPA)** |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Animation | GSAP + ScrollTrigger |
| Contact | EmailJS (`@emailjs/browser`) |
| Icons | `react-icons` (Si*, Fi*) |
| Deploy | Vercel (`dist/`) + optional GitHub Pages |
| Dev port | `5173` |
| Base path | Vercel: `/` — GitHub Pages: `/Portfolio-2.0/` |

### Entry flow (বর্তমান)

```
index.html → src/main.tsx → src/app/App.tsx → সব section React component
```

### Section order (`App.tsx`)

1. LoadingScreen (optional overlay)
2. GrainOverlay, CustomCursor, Toaster
3. SocialSidebar, Navbar, WhatsAppFAB
4. HeroSection
5. MarqueeStrip
6. AboutSection
7. SkillsSection
8. ProjectsSection
9. ExperienceSection
10. ContactSection
11. Footer (useFooterReveal hook)

---

## ২. Astro vs Vite vs React — স্পষ্ট বোঝা (AI + Owner)

| জিনিস | কী? | Role |
|--------|-----|------|
| **HTML** | Markup language | Page structure |
| **JS** | Programming language | Logic |
| **React** | UI library (JS) | Components, state, interactivity |
| **Vite** | **Build tool** (dev server + bundle) | React app run/build করে |
| **Astro** | **Framework** (pages, SSG, islands) | HTML-first site; ভিতরে Vite use করে |

### গুরুত্বপূর্ণ উত্তর

- **Vite "বদলে" Astro হবে না** — Astro project-এর ভিতর Vite engine থাকতে পারে
- **React "বদলে" Astro হবে না** — React library থাকবে যেখানে interactivity দরকার (islands)
- **Migration মানে:** SPA (পুরো app React) → **HTML pages + optional React islands**

### Flow comparison

**এখন (Vite + React):**
```
Browser → index.html → বড় JS bundle → React #root paint → সব section client-side
```

**Astro পর:**
```
Browser → ready HTML (Hero, About, Projects...) → শুধু island-এ React JS (Contact, Cursor, GSAP...)
```

---

## ৩. আগের conversation-এ যা fix হয়েছিল (reference)

AI migration-এ এগুলো **ভুলে যেও না**:

### EmailJS Contact Form

- **সমস্যা:** Template variable mismatch — code `from_name`, template `{{name}}`
- **Fix:** `emailjs.send()` payload:
  ```js
  { name, email, message, time: new Date().toLocaleString() }
  ```
- **Env (Vite):** `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`
- **Values (owner dashboard):**
  - Service: `service_pauzq6l`
  - Template: `template_3zgkwkh` (Contact Us)
  - Public key only (private key client-এ লাগে না)

### CV Download

- **File on disk:** `public/Ridoy_Hasan_Kamrul_Resumes.pdf`
- **site.ts path:** `Ridoy_Hasan_Kamrul_Resumes.pdf` (NOT `Ridoy_Hasan_Kamrul_CV.pdf`)
- **Download name:** `Md_Ridoy_Hasan_Kamrul_Resume.pdf`

### Vercel White Screen

- **কারণ:** `vite.config.ts` base `/Portfolio-2.0/` — Vercel root `/` থেকে serve করে
- **Fix:** `base: process.env.VERCEL ? '/' : '/Portfolio-2.0/'`

### Vercel Build Settings

- Build: `npm run build`
- Output: `dist`
- Install: `npm install`
- Root Directory: **repo root** (NOT `src`)

### SEO (recommended — migration-এ apply করো)

- `index.html`-এ `noindex, nofollow` **সরিয়ে** `index, follow` দাও
- Title: `Md. Ridoy Hasan Kamrul — Front-End Developer (React, Next.js, TypeScript)`
- Proper meta description + Open Graph

---

## ৪. বর্তমান ফাইল স্ট্রাকচার (migrate source)

```
Portfolio-2.0/
├── public/
│   ├── favicon.svg
│   └── Ridoy_Hasan_Kamrul_Resumes.pdf
├── src/
│   ├── main.tsx
│   ├── styles/
│   │   ├── index.css
│   │   ├── tailwind.css
│   │   ├── theme.css
│   │   └── fonts.css
│   ├── assets/                    # hero image etc.
│   └── app/
│       ├── App.tsx
│       ├── components/
│       │   ├── common/            # Toast, LoadingScreen, CustomCursor, GrainOverlay, MagneticBtn
│       │   ├── layout/            # Navbar, Footer, SocialSidebar, WhatsAppFAB
│       │   └── sections/          # Hero, About, Skills, Projects, Experience, Contact, MarqueeStrip
│       ├── constants/
│       │   ├── site.ts
│       │   ├── theme.ts
│       │   └── emailjs.ts
│       ├── data/
│       │   ├── projects.ts        # 8–9 live projects
│       │   ├── experience.ts
│       │   └── skills.ts
│       └── hooks/
│           ├── useSectionSpacing.ts
│           └── useFooterReveal.ts
├── index.html
├── vite.config.ts
├── package.json
└── .env                           # gitignored
```

---

## ৫. Astro target structure (migration output)

```
portfolio-astro/   (or Portfolio-2.0-astro/)
├── public/
│   ├── favicon.svg
│   └── Ridoy_Hasan_Kamrul_Resumes.pdf
├── src/
│   ├── pages/
│   │   └── index.astro            # single-page portfolio
│   ├── layouts/
│   │   └── BaseLayout.astro       # head, Navbar, Footer, global CSS
│   ├── components/
│   │   ├── layout/                # .astro files
│   │   ├── sections/              # mostly .astro
│   │   └── islands/               # React: ContactSection.jsx, CustomCursor.jsx, etc.
│   ├── data/                      # projects.ts, experience.ts, skills.ts (copy)
│   ├── lib/                       # site.ts, theme.ts, emailjs.ts
│   └── styles/                    # global.css, tailwind, theme, fonts
├── astro.config.mjs
├── package.json
└── .env                           # PUBLIC_EMAILJS_*
```

---

## ৬. Component → Astro mapping (full table)

| Source file | Astro approach | Client directive | Notes |
|-------------|----------------|------------------|-------|
| `App.tsx` | ❌ delete → `index.astro` | — | composition moves to page |
| `main.tsx` | ❌ delete | — | Astro handles entry |
| `HeroSection.tsx` | React island OR `.astro` | `client:visible` if GSAP | GSAP ScrollTrigger |
| `AboutSection.tsx` | **`.astro`** | — | static content |
| `SkillsSection.tsx` | **`.astro`** (+ optional island) | `client:visible` if orbit anim | react-icons in astro tricky → island or SVG |
| `ProjectsSection.tsx` | **`.astro`** (+ filter island) | optional | category filter = small React |
| `ExperienceSection.tsx` | **`.astro`** | — | timeline static |
| `ContactSection.tsx` | **React `.jsx`** | **`client:load`** | EmailJS + toast + form state |
| `MarqueeStrip.tsx` | **`.astro`** + CSS | — | `@keyframes marquee` |
| `Navbar.tsx` | **`.astro`** | — | anchor links |
| `Footer.tsx` | **`.astro`** | — | footer reveal = CSS or small island |
| `SocialSidebar.tsx` | **`.astro`** | — | external links |
| `WhatsAppFAB.tsx` | **`.astro`** | — | `<a href={WHATSAPP}>` |
| `LoadingScreen.tsx` | skip OR island | optional | Astro fast — often removed |
| `CustomCursor.tsx` | React | **`client:load`** | mouse tracking |
| `GrainOverlay.tsx` | **`.astro`** CSS | — | pure CSS overlay |
| `MagneticBtn.tsx` | React | `client:visible` | hover effect |
| `Toast.tsx` | React (with Contact) | bundled in Contact island | sonner-style toast |

---

## ৭. Data files — copy with minimal changes

### `projects.ts`
- 9 projects including CoorDeck, Rain (crypto), Layls, M19, Maktech, Elyxa, Property-File, SkyRidge, Dr. T UX Coaching
- Live URLs must stay correct
- Images: currently Unsplash placeholders — owner may replace with real screenshots later

### `experience.ts`
1. Front-End Developer — Maktech via Fiverr (Jan 2025 – Present)
2. Research Analyst — BPO (Jan 2022 – Dec 2024)
3. Front-End Developer, Intern — Matrix Apparels (Jan 2021 – Aug 2021)

### `skills.ts`
- React, Next.js, TypeScript, JS, HTML, CSS, Tailwind, Redux, Framer Motion, GSAP, Node, Figma, Git, GitHub, Postman

### `site.ts` constants
```ts
CONTACT_EMAIL = "mdridoyhasankamrul@gmail.com"
CONTACT_PHONE = "+880 1680 092066"
CONTACT_LOCATION = "Dhaka, Bangladesh"
LINKEDIN = https://www.linkedin.com/in/md-ridoy-hasan-kamrul
GITHUB = https://github.com/Md-Ridoy-Hasan-Kamrul
WHATSAPP = https://wa.me/8801680092066
CV_PDF = Ridoy_Hasan_Kamrul_Resumes.pdf
```

### `theme.ts`
- Colors: BG, LIME, SURFACE, TEXT, BODY, MINT, PURPLE — used inline styles across sections

---

## ৮. Env variable migration

| Vite (current) | Astro (new) |
|----------------|-------------|
| `VITE_EMAILJS_SERVICE_ID` | `PUBLIC_EMAILJS_SERVICE_ID` |
| `VITE_EMAILJS_TEMPLATE_ID` | `PUBLIC_EMAILJS_TEMPLATE_ID` |
| `VITE_EMAILJS_PUBLIC_KEY` | `PUBLIC_EMAILJS_PUBLIC_KEY` |

**Astro access:**
```ts
import.meta.env.PUBLIC_EMAILJS_SERVICE_ID
```

**Vercel:** Settings → Environment Variables → `PUBLIC_*` prefix required for client-side.

---

## ৯. Setup commands (new Astro project)

```bash
npm create astro@latest portfolio-astro
# Template: Empty
# TypeScript: Yes
# Install deps: Yes

cd portfolio-astro
npx astro add react tailwind
```

### `astro.config.mjs` (target)

```js
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [react(), tailwind()],
  site: 'https://portfolio-2-0-seven-opal.vercel.app',
  base: process.env.VERCEL ? '/' : '/Portfolio-2.0/',
});
```

### Scripts

```json
{
  "dev": "astro dev",
  "build": "astro build",
  "preview": "astro preview"
}
```

Dev URL: `http://localhost:4321`

---

## ১০. Example: index.astro skeleton

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/sections/Hero.astro';
import MarqueeStrip from '../components/sections/MarqueeStrip.astro';
import About from '../components/sections/About.astro';
import Skills from '../components/sections/Skills.astro';
import Projects from '../components/sections/Projects.astro';
import Experience from '../components/sections/Experience.astro';
import ContactSection from '../components/islands/ContactSection.jsx';
import CustomCursor from '../components/islands/CustomCursor.jsx';
---
<BaseLayout>
  <CustomCursor client:load />
  <Hero client:visible />
  <MarqueeStrip />
  <About />
  <Skills />
  <Projects />
  <Experience />
  <ContactSection client:load />
</BaseLayout>
```

---

## ১১. ContactSection — EmailJS (keep this logic)

```tsx
await emailjs.send(
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
  {
    name: form.name,
    email: form.email,
    message: form.message,
    time: new Date().toLocaleString(),
  },
  { publicKey: EMAILJS_PUBLIC_KEY }
);
```

**Template variables must match:** `{{name}}`, `{{email}}`, `{{message}}`, `{{time}}`  
**No phone/subject in form** — template-এ থাকলে blank আসবে (optional: template থেকে সরানো)

**Guard:**
```tsx
if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
  toast.error("Email service is not configured...");
  return;
}
```

---

## ১২. Deploy checklist

### Vercel
- [ ] Build: `npm run build` or `astro build`
- [ ] Output: `dist`
- [ ] Root: repo root (NOT `src`)
- [ ] Env: 3× `PUBLIC_EMAILJS_*`
- [ ] Test contact form on live URL
- [ ] Test CV download

### GitHub Pages (optional)
- [ ] `base: '/Portfolio-2.0/'` when not VERCEL
- [ ] `site` URL set in astro.config

---

## ১৩. কী same থাকবে vs কী বদলাবে

### Same (লক্ষ্য)
- UI design, colors, fonts, section order
- All live project links
- EmailJS contact
- CV PDF download
- Social links (LinkedIn, GitHub, WhatsApp)
- Tailwind utility classes

### Changes
| Area | Change |
|------|--------|
| File format | Many `.tsx` → `.astro` |
| Entry | No `main.tsx` / `App.tsx` |
| JS bundle | Much smaller (islands only) |
| Dev port | 5173 → 4321 |
| Env prefix | `VITE_` → `PUBLIC_` |
| SEO | Better (HTML-first) |
| Dependencies | Remove unused MUI, Radix, Emotion if not used |

---

## ১৪. Migration order (AI workflow)

| Step | Task |
|------|------|
| 1 | `npm create astro@latest` + react + tailwind |
| 2 | Copy `public/`, `src/styles/`, `src/data/`, constants → `src/lib/` |
| 3 | Build `BaseLayout.astro` (head SEO, Navbar, Footer, global CSS) |
| 4 | Convert static sections → `.astro` (About, Experience, Marquee, layout) |
| 5 | Port `ProjectsSection`, `SkillsSection` |
| 6 | Port `ContactSection.jsx` as React island + EmailJS |
| 7 | Port `HeroSection`, `CustomCursor`, GSAP as islands |
| 8 | Wire `index.astro` matching App.tsx order |
| 9 | `astro.config.mjs` base/site for Vercel + GitHub Pages |
| 10 | `.env.example` with `PUBLIC_*` |
| 11 | `npm run build` — fix errors |
| 12 | Manual test: all sections, contact, CV download, mobile |

**Estimated effort:** 1–2 focused days for pixel-parity

---

## ১৫. Known issues to fix during migration

1. **`index.html` noindex** — remove for SEO
2. **Project 02** was wrongly labeled "Trading Journal" — correct name is **Rain** (crypto exchange), link `rainbitx.com`
3. **Unsplash stock images** in projects — replace with real screenshots when available
4. **921KB hero PNG** — compress to WebP for performance
5. **Resume/portfolio alignment** — experience.ts has BPO + Matrix internship; resume should match (see RESUME_MASTER.md if present)

---

## ১৬. Dependencies — keep vs remove

### Keep
- `react`, `react-dom`
- `gsap`
- `@emailjs/browser`
- `react-icons`
- `tailwindcss`, `@astrojs/react`, `@astrojs/tailwind`

### Likely remove (if unused in migrated code)
- `@mui/*`, `@emotion/*`, `@radix-ui/*` (many in package.json but portfolio may not use all)
- `recharts` (only if no chart section)
- `gh-pages` (if Vercel-only)

---

## ১৭. Owner profile (for resume/job context — optional)

- **Name:** Md. Ridoy Hasan Kamrul
- **Role:** Front-End Developer (React, Next.js, TypeScript, MERN)
- **Location:** Dhaka, Bangladesh — open to remote
- **Education:** B.Sc CSE, UITS, 2022
- **Live client sites:** 8+ (CoorDeck, Layls, Rain, Maktech, Elyxa, SkyRidge, M19, Property-File, Dr. T)
- **EmailJS template keys:** `name`, `email`, `message`, `time`

---

## ১৮. Reference links

- Astro Docs: https://docs.astro.build/
- Getting Started: https://docs.astro.build/en/getting-started/
- Astro Components: https://docs.astro.build/en/basics/astro-components/
- Integrations (React): https://docs.astro.build/en/guides/integrations-guide/
- Deploy (Vercel): https://docs.astro.build/en/guides/deploy/

---

## ১৯. Related files in repo (if present)

| File | Purpose |
|------|---------|
| `RESUME_MASTER.md` | ATS resume template + XYZ bullets |
| `job-tracker.csv` | Job application tracker template |
| `.env.example` | EmailJS env template (Vite naming) |

---

## ২০. Final notes for AI

1. **Do NOT** change design/content unless fixing known bugs above
2. **Do NOT** commit `.env` with secrets
3. **DO** test `npm run build` before finishing
4. **DO** use React islands sparingly — only where state/events/GSAP/EmailJS need client JS
5. **DO** preserve section IDs for navbar anchors (`#about`, `#projects`, `#contact`, etc.)
6. Owner will run project in **new folder** — this doc is the single source of truth for migration context

---

*End of handoff document.*
