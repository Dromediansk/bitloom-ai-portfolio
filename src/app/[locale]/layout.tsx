import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getMessages, getTranslations } from "next-intl/server";
import { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import { siteConfig } from "@/lib/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  // Get keywords as an array
  const keywords = [];
  for (let i = 0; i < 6; i++) {
    try {
      const keyword = t(`keywords.${i}`);
      if (keyword) keywords.push(keyword);
    } catch {
      break;
    }
  }

  return {
    title: t("title"),
    description: t("description"),
    keywords,
    authors: [{ name: "Miroslav Pillár" }],
    creator: "Miroslav Pillár",
    openGraph: {
      type: "website",
      locale: locale === "sk" ? "sk_SK" : "en_US",
      url: siteConfig.url,
      title: t("title"),
      description: t("description"),
      siteName: "bitloom.sk",
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: t("title"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [siteConfig.ogImage],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Navigation />
      {children}
      <CookieConsent />
      <Footer />
    </NextIntlClientProvider>
  );
}
