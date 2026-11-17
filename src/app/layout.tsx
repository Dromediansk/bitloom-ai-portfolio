import { Archivo, Geist, Geist_Mono, Quicksand } from "next/font/google";
import { getLocale } from "next-intl/server";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { SiteFrame } from "@/components/SiteFrame";
import { AnalyticsLoader } from "@/components/AnalyticsLoader";

import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  fallback: ["sans-serif"],
});

// Faces for the home page (the loom): Archivo with its width axis for display,
// Geist for text, Geist Mono for labels.
const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-archivo",
});
const geist = Geist({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-geist",
});
const geistMono = Geist_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-geist-mono",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      className={`${quicksand.className} ${archivo.variable} ${geist.variable} ${geistMono.variable}`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body className="antialiased">
        <script async src="/low-perf.js" />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:bg-white focus:text-gray-900 focus:px-4 focus:py-2 focus:rounded-md focus:shadow-lg focus:outline-2 focus:outline-primary-600"
        >
          Skip to main content
        </a>
        <ThemeProvider>
          <main id="main-content">
            <SiteFrame>{children}</SiteFrame>
          </main>
        </ThemeProvider>
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <AnalyticsLoader gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
      </body>
    </html>
  );
}
