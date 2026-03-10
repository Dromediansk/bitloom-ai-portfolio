# Bitloom Portfolio Website

A modern, professional company website for **Bitloom** - a product-oriented software engineering company specializing in web development, mobile development, and AI development with high-quality, scalable solutions.

## 🤖 AI-Powered Development

This project showcases the power of **AI-driven development** and **prompt engineering expertise**. The entire website was primarily created using GitHub Copilot and advanced AI assistance, demonstrating how modern AI tools can accelerate high-quality software development while maintaining professional standards.

### AI Development Approach

- **Prompt Engineering**: Sophisticated prompts designed for optimal AI code generation
- **AI-First Architecture**: Project structure and components designed with AI assistance
- **Intelligent Code Generation**: Leveraging GitHub Copilot for efficient, consistent code creation
- **AI-Guided Best Practices**: Following modern development standards through AI recommendations

## 🚀 Features

### Company Sections

- **Hero Section** - Compelling value proposition and mission statement
- **Services** - Core offerings including web development, mobile apps, and AI development
- **Projects** - Featured client work and case studies
- **About** - Company story and founder Miroslav's background
- **References** - Client testimonials and success stories
- **Contact** - Professional inquiry form with Mailtrap email integration

### Technical Features

- **Dark Mode Support** - Seamless theme switching with light, dark, and system modes
- **Responsive Design** - Mobile-first, accessible across all devices
- **SEO Optimized** - Meta tags, sitemap, and structured data
- **Performance First** - Optimized images, lazy loading, and fast loading times
- **Accessibility** - WCAG compliant with semantic HTML and ARIA labels
- **Type Safety** - Full TypeScript implementation
- **Modern Architecture** - Clean, maintainable code structure

## 🛠️ Tech Stack

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Perfect dark mode support
- **[Mailtrap](https://mailtrap.io/)** - Professional email delivery service
- **[React 19](https://react.dev/)** - Latest React features
- **Modern Tooling** - ESLint, PostCSS, Turbopack

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Homepage
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── projects/          # Projects showcase
│   ├── references/        # Client testimonials
│   └── services/          # Service offerings
├── components/            # Reusable UI components
│   ├── Navigation.tsx     # Main navigation with theme toggle
│   ├── ThemeToggle.tsx    # Dark mode theme switcher
│   ├── Button.tsx         # Button components
│   └── projects/          # Project-specific components
├── sections/              # Page sections
│   ├── HeroSection.tsx    # Homepage hero
│   ├── ServicesSection.tsx # Services overview
│   └── ContactSection.tsx # Contact form
└── lib/                   # Utilities and configurations
    ├── config.ts          # App configuration
    ├── utils.ts           # Utility functions
    └── hooks.ts           # Custom React hooks
├── providers/             # React context providers
│   └── ThemeProvider.tsx  # Dark mode theme provider
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd bitloom_portfolio_2
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and add your Mailtrap API token:

   ```bash
   MAILTRAP_API_TOKEN=your_mailtrap_api_token_here
   ```

   To get your Mailtrap API token:

   - Sign up at [mailtrap.io](https://mailtrap.io)
   - Go to **API Tokens** in your dashboard
   - Create a new token with **Send Email** permission
   - Copy the token to your `.env.local` file

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the website.

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality

## 🎨 Design Philosophy

The website follows a **clean, minimalist, and professional** design approach:

- **Modern Sophistication** - Contemporary design with enterprise appeal
- **Dark Mode Excellence** - Seamless theme switching with system preference support
- **Excellent Contrast** - High readability and business credibility in both themes
- **Responsive Typography** - Clear headings and professional font choices
- **Brand Voice** - Confident, expert, and solution-focused messaging

## 🌟 Company Values

**Bitloom** is built on core values of:

- **Transparent Communication** - Open and honest client relationships
- **Remote-First Cooperation** - Flexible, global collaboration
- **Open-Mindedness** - Embracing new technologies and approaches
- **Growth-Oriented** - Focus on scalable, business-driving solutions

## 🚀 Deployment

The easiest way to deploy your Next.js app is to use [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically with each push

## � Contact

- **Email**: info@bitloom.sk
- **Blog**: [blog.bitloom.sk](https://blog.bitloom.sk)
- **Website**: [bitloom.sk](https://bitloom.sk)

## 🤝 Contributing

This project demonstrates AI-assisted development practices. When contributing:

1. Follow the established prompt engineering patterns
2. Maintain TypeScript strict mode compliance
3. Use Tailwind CSS for styling consistency
4. Ensure accessibility standards (WCAG 2.1)
5. Write semantic HTML with proper heading hierarchy

## 📄 License

This project is proprietary and belongs to Bitloom. All rights reserved.

---

**Built with AI Excellence** 🤖 | **Powered by Next.js** ⚡ | **Crafted for Growth** 🚀

_This README itself was generated using AI assistance, showcasing the comprehensive capabilities of AI-driven development workflows._
