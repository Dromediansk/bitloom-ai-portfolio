import { Quicksand } from "next/font/google";
import { getLocale } from "next-intl/server";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { BackgroundElements } from "@/components/BackgroundElements";
import { AnalyticsLoader } from "@/components/AnalyticsLoader";

import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  display: "swap",
  fallback: ["sans-serif"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} className={quicksand.className} suppressHydrationWarning data-scroll-behavior="smooth">
      <body className="antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:bg-white focus:text-gray-900 focus:px-4 focus:py-2 focus:rounded-md focus:shadow-lg focus:outline-2 focus:outline-primary-600"
        >
          Skip to main content
        </a>
        <ThemeProvider>
          <main id="main-content">
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 text-gray-900 dark:text-white">
              <BackgroundElements />
              <div className="pt-16 relative z-1">{children}</div>
            </div>
          </main>
        </ThemeProvider>
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <AnalyticsLoader gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
      </body>
    </html>
  );
}
