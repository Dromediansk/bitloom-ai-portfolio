# Bitloom Website

The company website for **Bitloom**, a one-person software engineering company based in Košice, Slovakia, building web, mobile and AI products. Live at [bitloom.sk](https://bitloom.sk).

## Design: "the loom"

The site is built on its own design system, "the loom":

- Paper (light) and navy (dark) sections with hard cuts and a single cobalt accent. There is no theme toggle; pages alternate light and dark grounds themselves.
- Archivo (display, width axis), Geist (text) and Geist Mono (labels), loaded via `next/font`.
- A fixed woven strip, the **selvedge**, is woven by the visitor's scroll on every page. Sections marked with `data-chapter` become its bands and nav links.
- The home page is a scroll-driven story in chapters (title, problem, turn, work, founder, close), with the weaving drawn on canvas.
- Projects are represented by woven swatches (weave + two threads) when there is no screenshot.

All design tokens live in `src/styles/tokens.css`. Components use semantic tokens only; `npm run lint` fails on any hex/rgb value written elsewhere (`scripts/check-tokens.mjs`).

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router, Turbopack in dev) and [React 19](https://react.dev/)
- TypeScript
- Plain CSS on the loom design system; Tailwind CSS v4 is used only for its base reset (preflight)
- [next-intl](https://next-intl.dev/): Slovak (default) and English
- [Mailtrap](https://mailtrap.io/): contact form delivery
- Google Analytics 4, loaded only after cookie consent

## Pages

Slovak is served without a prefix, English under `/en`.

| Route           | Content                                      |
| --------------- | -------------------------------------------- |
| `/`             | Home: the loom story                         |
| `/services`     | Web, mobile and AI development; process      |
| `/projects`     | Client work and Bitloom's own products       |
| `/about`        | Founder, values, tech stack                  |
| `/testimonials` | Client testimonials                          |
| `/contact`      | Inquiry form (name, email, company, message) |
| `/imprint`      | Legal / company details                      |
| `/privacy`      | Privacy policy (GDPR)                        |

The blog lives at [blog.bitloom.sk](https://blog.bitloom.sk) (external link in the nav and footer).

## Project Structure

```
src/
├── app/
│   ├── layout.tsx            # Root layout, fonts
│   ├── [locale]/             # Locale-scoped pages (see table above), not-found, [...rest] catch-all
│   ├── api/contact/route.ts  # Contact form → Mailtrap
│   ├── sitemap.ts, robots.ts
│   └── globals.css
├── components/
│   ├── loom/                 # Shared shell: SiteNav, SiteFooter, LoomShell (selvedge), PageMasthead, PageClose, WovenLabel, LocaleSwitch
│   ├── contact/              # ContactForm, ContactInfo
│   ├── projects/             # Project data (data.ts) and types
│   ├── testimonial/          # Testimonial modal, author header, badge
│   └── CookieConsent, AnalyticsLoader, Modal, Button, FeaturedTestimonial
├── sections/
│   ├── loom/                 # Home page (LoomHome.tsx, homeRuntime.ts, loom.css)
│   └── Services, Projects, About, Testimonials, Contact sections
├── lib/
│   ├── loom/                 # Scroll runtime, weave helpers, chapters, token readers
│   └── analytics.ts, config.ts, consent.ts, utils.ts
├── styles/                   # tokens.css (single source of truth), loom-shell.css, loom-pages.css
├── i18n/                     # next-intl routing + request config
└── proxy.ts                  # next-intl middleware (Next.js 16's name for middleware.ts)
messages/                     # en.json, sk.json
scripts/                      # check-tokens.mjs (lint), generate-project-banner.mjs
public/                       # Icons, logo, project and about images
```

## Getting Started

Requires Node.js 20.9+ (Next.js 16).

```bash
npm install
```

Create `.env.local`:

```bash
MAILTRAP_API_TOKEN=your_mailtrap_api_token        # required for the contact form
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX        # optional, enables Google Analytics after consent
# Optional overrides (defaults: portfolio@bitloom.sk → info@bitloom.sk)
# CONTACT_SENDER_EMAIL=
# CONTACT_RECIPIENT_EMAIL=
```

The Mailtrap token needs **Send Email** permission (Mailtrap dashboard → API Tokens).

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (Slovak) or [http://localhost:3000/en](http://localhost:3000/en) (English).

### Scripts

- `npm run dev` — dev server (Turbopack)
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — ESLint + design-token check
- `npm run lint:tokens` — design-token check only

## Contributing Notes

- All user-facing text goes in both `messages/en.json` and `messages/sk.json`. Slovak should read as natural Slovak.
- Use semantic tokens from `tokens.css`; never hard-code colors. Canvas code reads colors via `readTokens()` / `threadColor()` from `src/lib/loom/tokens.ts`.
- To add a portfolio project, use the `/add-project` command in Claude Code (`.claude/commands/add-project.md`).
- `CLAUDE.md` holds the full guidelines for AI assistants (mirrored in `.github/copilot-instructions.md`).

## Deployment

A standard Next.js app; deploy it to [Vercel](https://vercel.com) or any Node host that runs `next start`. Set the environment variables above in the host.

## Contact

- Email: info@bitloom.sk
- Blog: [blog.bitloom.sk](https://blog.bitloom.sk)
- Website: [bitloom.sk](https://bitloom.sk)

## License

Proprietary. © Bitloom. All rights reserved.
