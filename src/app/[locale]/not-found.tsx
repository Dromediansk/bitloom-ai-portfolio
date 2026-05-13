import { ButtonLink } from "@/components/Button";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center relative overflow-hidden">
      <div className="container-max section-padding text-center relative z-10">
        <div className="max-w-3xl mx-auto">
          <p
            className="text-7xl md:text-9xl lg:text-[12rem] font-bold leading-none text-transparent bg-linear-to-r from-primary-200 via-primary-600 to-primary-950 dark:from-primary-700 dark:via-primary-500 dark:to-primary-100 bg-clip-text mb-6 animate-hero-title"
            aria-hidden="true"
          >
            {t("code")}
          </p>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-700 dark:text-gray-300 mb-6 animate-hero-slide-in">
            {t("title")}
          </h1>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed animate-hero-blur-fade">
            {t("description")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-hero-rise">
            <ButtonLink
              href="/"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto transform hover:scale-105 hover:shadow-lg hover:animate-glow transition-all duration-300"
            >
              {t("backHome")}
            </ButtonLink>
            <ButtonLink
              href="/contact"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto transform hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              {t("contactUs")}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
