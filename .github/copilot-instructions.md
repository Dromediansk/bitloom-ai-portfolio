## Purpose

This document provides instructions and guidelines for GitHub Copilot to assist in developing a **modern company website for Bitloom**, a product-oriented software engineering company founded by Miroslav. Bitloom specializes in web development, mobile development, and technical consulting with an emphasis on high-quality, scalable solutions that drive business growth.

## Tech Stack

- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **@next/font** or custom fonts for typography
- **next-intl** (for internationalization - English and Slovak)

## Project Structure Guidelines

/app # App Router entry point
/components # Reusable UI components
/sections # Page sections (Intro, Projects, References, Contact)
/lib # Utilities (SEO config, email utils, etc.)
/public # Static assets (images, icons, etc.)
/messages # i18n translation files (en.json, sk.json)
/i18n # Internationalization configuration (routing, middleware)

## Internationalization (i18n)

- **Supported Languages**: English (default) and Slovak
- **URL Structure**: `/en/page` and `/sk/page` with automatic locale detection
- **Translation Files**:
  - `messages/en.json` - English translations
  - `messages/sk.json` - Slovak translations
- **Components**: All user-facing text uses `useTranslations()` hook from next-intl
- **Language Switcher**: Available in navigation for seamless language switching
- **Middleware**: Automatic locale detection and routing via `src/middleware.ts`

## Pages / Routes

- `/` or `/en` → Company Intro (hero section with company mission and values)
- `/sk` → Slovak version of homepage
- `/en/services` or `/sk/services` → Service offerings (web development, consulting, product strategy)
- `/en/projects` or `/sk/projects` → Featured client work and case studies
- `/en/about` or `/sk/about` → Company story, team, and founder Miroslav's background
- `/en/contact` or `/sk/contact` → Contact form and business inquiry details
- `/en/references` or `/sk/references` → Client testimonials and success stories
- `blog.bitloom.sk` → External blog link (opens in new tab)

## Style Guide

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
- **Industry Focus**: Specialized experience in healthcare and financial sector projects where precision, security, and reliability are essential
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

- Title and meta description per page (use **next-seo**)
- Open Graph / Twitter Card meta tags for link previews
- Headings (`<h1>` → `<h6>`) structured hierarchically
- Use `next/image` for optimized images

## Features to Implement

### Intro Section

- Company hero with strong value proposition
- Mission statement and core values
- Call to Action (explore services or start a project)

### Services Section

- Core service offerings:
  - **Modern Web Craft** - Crafting exceptional web experiences through full-stack development and modern architecture
  - **Mobile Mastery** - Crafting seamless cross-platform mobile applications that feel native on every device
  - **Technical consulting** - Strategic guidance to help businesses make informed technology decisions and optimize their development processes.
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

### References Section

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

## Optional Enhancements

- **Dark Mode** with Tailwind theming
- **Framer Motion** for transitions
- **Sitemap.xml** and **robots.txt** for SEO completeness
- **RSS feed** if a blog is added later

## Example Copilot Prompts

// Create a responsive company hero section with value proposition and CTA using Tailwind CSS

// Generate enterprise-focused SEO config for a Next.js business website

// Build a professional contact form for business inquiries with validation

---

**Goal**: Assist in building a **modern, accessible, SEO-optimized company website** for Bitloom using Next.js, TypeScript, and Tailwind.
