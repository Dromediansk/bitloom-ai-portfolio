import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navigation from "@/components/Navigation";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bitloom - Premium Software Development Company",
  description:
    "Bitloom specializes in product-oriented web development with high-quality, scalable solutions that drive business growth. Founded by Miroslav.",
  keywords: [
    "software development",
    "web development",
    "product-oriented",
    "scalable solutions",
    "Next.js",
    "TypeScript",
    "consulting",
  ],
  authors: [{ name: "Bitloom" }],
  creator: "Bitloom",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bitloom.com",
    title: "Bitloom - Premium Software Development Company",
    description:
      "Bitloom specializes in product-oriented web development with high-quality, scalable solutions that drive business growth.",
    siteName: "Bitloom",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bitloom - Premium Software Development Company",
    description:
      "Premium software development company specializing in product-oriented web solutions.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <main>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 text-gray-900 dark:text-white">
              <Navigation />
              <div className="pt-20">{children}</div>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
