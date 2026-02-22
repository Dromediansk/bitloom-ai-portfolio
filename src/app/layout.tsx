import { Quicksand } from "next/font/google";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { BackgroundElements } from "@/components/BackgroundElements";
import { GoogleAnalytics } from "@next/third-parties/google";
import Head from "next/head";

import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  display: "swap",
  fallback: ["sans-serif"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={quicksand.className} suppressHydrationWarning>
      <Head>
        <meta charSet="UTF-8" />
      </Head>
      <body className="antialiased">
        <ThemeProvider>
          <main>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 text-gray-900 dark:text-white">
              <BackgroundElements />
              <div className="pt-20 relative z-1">{children}</div>
            </div>
          </main>
        </ThemeProvider>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!} />
      </body>
    </html>
  );
}
