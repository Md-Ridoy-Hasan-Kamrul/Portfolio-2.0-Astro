# Premium Portfolio Website — Md. Ridoy Hasan Kamrul

A single-page, animation-driven developer portfolio built with React, TypeScript, and GSAP. It presents a Front-End Developer's profile through a cinematic loading sequence, scroll-triggered reveals, a magnetic cursor, and a curated set of project case studies.

## Overview

The site is a single React component tree (`src/app/App.tsx`) rendered as one continuous scroll, split into the following sections:

| # | Section | Description |
|---|---------|-------------|
| — | **Loading Screen** | Animated name reveal before the page is shown |
| 01 | **Hero** | Headline, availability badge, profile photo, stats, and CTAs (View Work / Download CV) |
| 02 | **About** | Bio, education timeline, and quick stats |
| 03 | **Skills** | Floating, hoverable constellation of tech icons (React, Next.js, TypeScript, Tailwind, Node.js, Figma, Git, etc.) |
| 04 | **Projects** | Case studies with live links, descriptions, and tech tags |
| 05 | **Experience** | Interactive, expandable work history timeline |
| 06 | **Contact** | Contact details (email, phone, location) and a `mailto:`-powered message form |

Additional UI touches: a custom magnetic cursor, a film-grain overlay, a marquee tech ticker, a fixed social sidebar, and a floating WhatsApp chat button.

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** — build tool and dev server
- **Tailwind CSS v4** — utility-first styling
- **GSAP** + **ScrollTrigger** — scroll-based and entrance animations
- **react-icons** — Feather, Simple Icons, and Font Awesome icon sets
- **Radix UI** primitives + a local **shadcn/ui**-style component library (`src/app/components/ui`)
- Supporting libraries: `recharts`, `embla-carousel-react`, `react-hook-form`, `sonner`, `motion`, and others available for future sections

## Project Structure

```
src/
├── main.tsx                  # React app entry point
├── app/
│   ├── App.tsx                # All portfolio sections + page composition
│   └── components/
│       ├── Toast.tsx           # Toast notification wrapper
│       ├── figma/               # Figma-imported helper components
│       └── ui/                  # shadcn/ui-style component library
├── styles/                    # Global styles, Tailwind config, fonts, theme
└── imports/                    # Portfolio assets (photos, CV, exported text)
```

## Getting Started

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm i

# Start the development server
npm run dev

# Build for production
npm run build
```

## Customization

Personal content lives directly in `src/app/App.tsx`:

- `SKILLS_LIST` — tech stack icons shown in the Skills section
- `PROJECTS` — project case studies (title, description, tags, links, images)
- `EXPERIENCE` — work history entries
- Contact details, social links, and the CV file path (`/Ridoy_Hasan_Kamrul_CV.pdf` in `public/`)

Design tokens (colors) are defined near the top of the same file: `LIME`, `MINT`, `PURPLE`, `BG`, `SURFACE`, `MUTED`, `TEXT`.

## License & Attributions

See [ATTRIBUTIONS.md](ATTRIBUTIONS.md) for third-party component and asset licenses (shadcn/ui, Unsplash).