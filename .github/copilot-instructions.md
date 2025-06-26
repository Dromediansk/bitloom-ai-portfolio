## Purpose

This document provides instructions and guidelines for GitHub Copilot to assist in developing a **modern company website for Bitloom**, a premium software development company founded by Miroslav. Bitloom specializes in product-oriented web development with an emphasis on high-quality, scalable solutions that drive business growth.

## Tech Stack

- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **@next/font** or custom fonts for typography
- **Framer Motion** (optional, for subtle animations)

## Project Structure Guidelines

/app # App Router entry point
/components # Reusable UI components
/sections # Page sections (Intro, Projects, References, Contact)
/lib # Utilities (SEO config, email utils, etc.)
/public # Static assets (images, icons, etc.)
/styles # Tailwind config, global styles

## Pages / Routes

- `/` → Company Intro (hero section with company mission and values)
- `/services` → Service offerings (web development, consulting, product strategy)
- `/projects` → Featured client work and case studies
- `/about` → Company story, team, and founder Miroslav's background
- `/contact` → Contact form and business inquiry details
- `blog.bitloom.sk` → External blog link (opens in new tab)

## Style Guide

- **Design**: Clean, minimalist, professional with enterprise appeal
- **Color Palette**: Modern sophisticated tones; excellent contrast for business credibility
- **Typography**: Clear headings, professional font choices, responsive and accessible
- **Brand Voice**: Confident, expert, solution-focused

## Company Values & Details

- **Core Values**: Transparent communication, remote-first cooperation, and open-mindedness
- **Contact Email**: info@bitloom.sk
- **Company Blog**: blog.bitloom.sk (external link in navigation)
- **Approach**: Growth-oriented with emphasis on collaboration and transparency

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
  - Product-oriented web development
  - Full-stack application development
  - Modern mobile development
  - Technical consulting and strategy
- Service descriptions with benefits
- Process overview (discovery, design, development, delivery)

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
