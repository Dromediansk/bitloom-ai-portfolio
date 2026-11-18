## Purpose

This document provides instructions and guidelines for GitHub Copilot to assist in developing a **modern company website for Bitloom**, a single-person product-oriented software engineering company founded by Miroslav. Bitloom specializes in web development, mobile development, and AI development with an emphasis on high-quality, scalable solutions that drive business growth.

## Tech Stack

- **Next.js 16** (App Router, Turbopack dev)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**: only its base reset (preflight) is used; there are no utility classes and no `@theme` tokens. Styling is plain CSS on the loom design system (see Style Guide)
- **next-intl** (i18n — English and Slovak)
- **mailtrap** (contact form email delivery)

## Dev Commands

- `npm run dev` — start dev server (Turbopack)
- `npm run build` — production build
- `npm run lint` — ESLint + design-token check (`npm run lint:tokens` runs the token check alone)

## Project Structure Guidelines

src/app # App Router (locale-scoped pages under src/app/[locale])
src/components # Reusable UI components (loom/ = shared shell: header, selvedge, label, footer; contact/, projects/, testimonial/)
src/sections # Page sections (loom/ = home page; Services, Projects, About, Testimonials, Contact)
src/lib # Utilities (analytics, config, consent, utils; loom/ = scroll runtime + weave helpers)
src/styles # Design system CSS (tokens.css = single source of truth; loom-shell.css shared components, loom-pages.css inner pages)
src/i18n # next-intl routing + request config
src/proxy.ts # next-intl middleware (Next.js 16 renamed `middleware.ts` → `proxy.ts`)
src/app/api # Route handlers (contact form)
public # Static assets
messages # i18n translation files (en.json, sk.json)

## Internationalization (i18n)

- **Supported Languages**: Slovak (default) and English
- **URL Structure**: `/page` for Slovak (default) and `/en/page` for English — `localePrefix: "as-needed"` hides the prefix for the default locale
- **Translation Files**:
  - `messages/en.json` - English translations
  - `messages/sk.json` - Slovak translations
- **Components**: All user-facing text uses `useTranslations()` hook from next-intl
- **Language Switcher**: Available in navigation for seamless language switching
- **Middleware**: Automatic locale detection and routing via `src/proxy.ts` (Next.js 16 renamed `middleware.ts` → `proxy.ts`)

## Pages / Routes

- `/` (Slovak) or `/en` → Company Intro (hero section with company mission and values)
- `/services` or `/en/services` → Service offerings (web development, AI development, mobile apps)
- `/projects` or `/en/projects` → Featured client work and case studies
- `/about` or `/en/about` → Company story, team, and founder Miroslav's background
- `/contact` or `/en/contact` → Contact form and business inquiry details
- `/testimonials` or `/en/testimonials` → Client testimonials and success stories
- `/imprint` or `/en/imprint` → Imprint / legal information
- `blog.bitloom.sk` → External blog link (opens in new tab)

## Style Guide

- **Design system "the loom"**: paper (`#edf0f3`) and navy (`#0a1122`) sections with hard cuts, one cobalt accent, Archivo (display, width axis) + Geist + Geist Mono. No dark-mode toggle: the pages alternate light and dark grounds themselves. A fixed woven strip (selvedge) is woven by the visitor's scroll on every page; sections with `data-chapter` become its bands and nav links.
- **Design tokens live only in `src/styles/tokens.css`**, in three layers: palette (`--color-*`, raw values), semantic (`--ink`, `--accent`, `--panel`, `--shadow-*`, type/space/motion) and grounds (`.loom-g-paper` / `.loom-g-navy` re-point the semantic colors). Canvas colors are `--thread-*`, `--cloth-*`, `--title-*` and `--turn-*`.
  - Components use semantic tokens only. Never write a hex/rgb value anywhere else; `npm run lint` fails on it (`scripts/check-tokens.mjs`).
  - A light surface inside a dark section (label, form, modal) gets `loom-g-paper`; a dark floating one gets `loom-g-navy`. Don't re-declare token values on a component.
  - Canvas runtimes read colors with `readTokens()` / `threadColor()` from `src/lib/loom/tokens.ts`. `data-weft` / `data-warp` and `chapter()` take thread names (`"cobalt"`, `"navy"`…), not hex. Add a new thread to both `tokens.css` and `THREADS`.
  - The contact email (`src/app/api/contact/route.ts`) is the one exception: email clients can't read CSS variables, so it mirrors token values, and the lint check verifies they match.
- **Design**: Clean, minimalist, professional with enterprise appeal
- **Color Palette**: Modern sophisticated tones; excellent contrast for business credibility
- **Typography**: Clear headings, professional font choices, responsive and accessible
- **Brand Voice**: Confident, expert, solution-focused

## Company Values & Details

- **Core Values**: Transparent communication, remote-first cooperation, and open-mindedness
- **Location**: Based in Kosice, Slovakia (serving clients globally)
- **Contact Email**: info@bitloom.sk
- **Company Blog**: blog.bitloom.sk (external link in navigation)
- **Approach**: Growth-oriented with emphasis on collaboration and transparency

### Founder & Leadership

- **Founder**: Miroslav - Self-taught professional developer with 6 years of experience
- **Industry Focus**: Fintech and banking (regulated, high-stakes work) and enterprise software, alongside websites and apps for small businesses and entrepreneurs
- **Market Advantage**: Experience in high-stakes industries has shaped his approach to building dependable software solutions
- **Professional Journey**: Demonstrates commitment to continuous learning and mastery of modern technologies

### Technical Expertise

Bitloom's core technical expertise includes:

- **React.js** - Modern frontend development with component-based architecture
- **Next.js** - Full-stack React framework for production-ready applications
- **React Native** - Cross-platform mobile app development
- **Expo** - Streamlined React Native development and deployment platform
- **TypeScript** - Type-safe development for robust, maintainable applications
- **Node.js** - Server-side JavaScript for scalable backend solutions
- **Python** - Versatile programming for web applications, APIs, and automation
- **PostgreSQL** - Powerful, open-source relational database system

## Accessibility (a11y)

- Use **semantic HTML** wherever possible (`<main>`, `<section>`, `<article>`)
- Ensure **keyboard navigation** is smooth
- Add **aria-labels** or `alt` text for all non-decorative images
- Use `:focus-visible` for focus states on interactive elements

## SEO Guidelines

- Title and meta description per page via Next.js Metadata API (`export const metadata` / `generateMetadata`)
- Open Graph / Twitter Card meta tags for link previews
- Headings (`<h1>` → `<h6>`) structured hierarchically
- Use `next/image` for optimized images
- `src/app/sitemap.ts` and `src/app/robots.ts` generate sitemap.xml and robots.txt

## Features to Implement

### Intro Section

- Company hero with strong value proposition
- Mission statement and core values
- Call to Action (explore services or start a project)

### Services Section

- Core service offerings:
  - **Modern Web Craft** - Crafting exceptional web experiences through full-stack development and modern architecture
  - **Mobile Mastery** - Crafting seamless cross-platform mobile applications that feel native on every device
  - **AI Development** - Building AI agents, automations, and AI-powered productivity tools that help businesses harness artificial intelligence.
- Service descriptions with benefits
- Process overview (discovery, analysis, development, delivery)

### Projects Section

- Featured client projects and case studies with:
  - Project name and client (if permissible)
  - Challenge and solution overview
  - Technologies and approach used
  - Results and impact achieved
  - Optimized project images or mockups

### About Section

- Company story and founding vision
- Founder Miroslav's background and expertise
- Team philosophy and approach
- Why choose Bitloom

### Testimonials Section

- Client testimonials and success stories
- Company/contact name and role
- Project outcomes and satisfaction
- Styled quote components with credibility indicators

### Contact Section

- Business inquiry form (Company, Contact, Project Details, Budget Range)
- Form validation and professional handling
- Alternative contact methods
- Business hours and response expectations

### Footer

- Professional contact information
- Business links (LinkedIn, GitHub for technical credibility)
- Privacy policy and terms (if needed)
- Copyright and company registration details
- Language switcher for easy locale switching

## i18n Implementation Guidelines

### Translation Structure

- All user-facing text is stored in JSON files under `/messages/`
- Hierarchical structure: `navigation.home`, `services.title`, `contact.form.email`
- Use descriptive keys that reflect content purpose, not just location

### Component Implementation

- Use `"use client"` directive for components using `useTranslations()`
- Import: `import { useTranslations } from "next-intl"`
- Usage: `const t = useTranslations("sectionName"); t("keyName")`
- Nest translation keys logically by component/section

### Adding New Content

- Add translations to both `en.json` and `sk.json` files
- Maintain consistent key structure across both languages
- Use professional, business-appropriate tone for both languages
- Slovak translations should sound natural, not machine-translated

## Custom Agents

- **Marketing Specialist** (`.claude/agents/marketing-specialist.md`) — When implementing changes to website copy, CTAs, page structure, SEO, or anything that affects marketing and sales effectiveness, consult this agent first for best-practice recommendations before writing code.

---

**Goal**: Assist in building a **modern, accessible, SEO-optimized company website** for Bitloom using Next.js, TypeScript, and the loom design system.
