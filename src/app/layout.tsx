import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { GoogleAnalytics } from "@next/third-parties/google";

import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  display: "swap",
  fallback: ["sans-serif"],
});

export const metadata: Metadata = {
  title: "Bitloom - Software Craftsmanship Company",
  description:
    "Bitloom specializes in web development, mobile development, and technical consulting with high-quality, scalable solutions that drive business growth. Founded by Miroslav.",
  keywords: [
    "software development",
    "web development",
    "mobile development",
    "technical consulting",
    "scalable solutions",
    "Next.js",
    "TypeScript",
    "React Native",
  ],
  authors: [{ name: "Bitloom" }],
  creator: "Bitloom",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bitloom.com",
    title: "Bitloom - Software Craftsmanship Company",
    description:
      "Bitloom specializes in web development, mobile development, and technical consulting with high-quality, scalable solutions that drive business growth.",
    siteName: "Bitloom",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bitloom - Software Craftsmanship Company",
    description:
      "Software Craftsmanship company specializing in web development, mobile development, and technical consulting.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={quicksand.className} suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <main>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 text-gray-900 dark:text-white">
              <Navigation />
              <div className="pt-20">{children}</div>
              <Footer />
            </div>
          </main>
        </ThemeProvider>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!} />
      </body>
    </html>
  );
}
