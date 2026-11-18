import { Archivo, Geist, Geist_Mono } from "next/font/google";
import { getLocale } from "next-intl/server";
import { AnalyticsLoader } from "@/components/AnalyticsLoader";

import "./globals.css";

// Archivo with its width axis for display, Geist for text, Geist Mono for labels.
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
      className={`${archivo.variable} ${geist.variable} ${geistMono.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>
        <script async src="/low-perf.js" />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <AnalyticsLoader gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
      </body>
    </html>
  );
}
