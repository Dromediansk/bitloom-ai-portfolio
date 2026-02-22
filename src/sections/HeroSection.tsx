"use client";

import { ButtonLink } from "@/components";
import { useIntersectionObserver } from "@/lib/hooks";
import { useTranslations } from "next-intl";

const HeroSection = () => {
  const { elementRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: "0px",
  });
  const t = useTranslations("hero");

  return (
    <section
      ref={elementRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div className="container-max section-padding text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Company name with gradient text effect */}
          <h1
            className={`text-5xl md:text-7xl lg:text-8xl font-bold text-transparent bg-linear-to-r from-primary-200 via-primary-600 to-primary-950 dark:from-primary-700 dark:via-primary-500 dark:to-primary-100 bg-clip-text mb-6 transition-all duration-800 delay-200 ${
              hasIntersected
                ? "animate-hero-title"
                : "opacity-0 scale-[1.3] -translate-y-10"
            }`}
          >
            {t("companyName")}
          </h1>

          {/* Company mission */}
          <h2
            className={`text-2xl md:text-3xl lg:text-4xl text-gray-700 dark:text-gray-300 mb-8 transition-all duration-600 delay-500 ${
              hasIntersected
                ? "animate-hero-slide-in"
                : "opacity-0 -translate-x-15 skew-x-3"
            }`}
          >
            <span className="inline-block">{t("tagline")}</span>
          </h2>

          {/* Company description */}
          <p
            className={`text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed transition-all duration-700 delay-800 ${
              hasIntersected
                ? "animate-hero-blur-fade"
                : "opacity-0 blur-sm translate-y-2.5"
            }`}
          >
            {t("description")}
          </p>

          {/* CTA Buttons with hover animations */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-600 delay-1100 ${
              hasIntersected ? "animate-hero-rise" : "opacity-0 translate-y-12"
            }`}
          >
            <ButtonLink
              href="/contact"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto transform hover:scale-105 hover:shadow-lg hover:animate-glow transition-all duration-300 group"
            >
              <span className="group-hover:animate-pulse">
                {t("contactUs")}
              </span>
            </ButtonLink>
            <ButtonLink
              href="/services"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto transform hover:scale-105 hover:shadow-lg transition-all duration-300 hover:rotate-1"
            >
              {t("exploreServices")}
            </ButtonLink>
          </div>

          {/* Scroll Indicator with enhanced animation */}
          <div
            className={`mt-16 transition-all duration-800 delay-1500 ${
              hasIntersected ? "animate-hero-soft-fade" : "opacity-0 scale-90"
            }`}
          >
            <button
              onClick={() => {
                document.getElementById("services")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className="cursor-pointer hover:opacity-70 hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg p-2 group"
              aria-label={t("scrollToServicesAriaLabel")}
            >
              <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full mx-auto group-hover:border-primary-500 transition-colors duration-300 animate-pulse-slow">
                <div className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mx-auto mt-2 group-hover:bg-primary-500 transition-colors duration-300 animate-bounce"></div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 group-hover:text-primary-500 transition-colors duration-300">
                {t("scrollToExplore")}
              </p>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
