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
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary-200/20 dark:bg-primary-500/10 rounded-full animate-float"></div>
        <div
          className="absolute top-40 right-20 w-32 h-32 bg-primary-300/20 dark:bg-primary-400/10 rounded-full animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-40 left-20 w-16 h-16 bg-primary-400/20 dark:bg-primary-600/10 rounded-full animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 right-10 w-24 h-24 bg-primary-300/20 dark:bg-primary-500/10 rounded-full animate-float"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      <div className="container-max section-padding text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Company name with gradient text effect */}
          <h1
            className={`text-5xl md:text-7xl lg:text-8xl font-bold text-transparent bg-linear-to-r from-primary-200 via-primary-600 to-primary-950 dark:from-primary-700 dark:via-primary-500 dark:to-primary-100 bg-clip-text mb-6 transition-all duration-1000 delay-200 ${
              hasIntersected ? "animate-scale-in" : "opacity-0 scale-50"
            }`}
          >
            {t("companyName")}
          </h1>

          {/* Company mission */}
          <h2
            className={`text-2xl md:text-3xl lg:text-4xl text-gray-700 dark:text-gray-300 mb-8 transition-all duration-1000 delay-500 ${
              hasIntersected ? "animate-fade-in-up" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="inline-block">{t("tagline")}</span>
          </h2>

          {/* Company description */}
          <p
            className={`text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed transition-all duration-1000 delay-700 ${
              hasIntersected ? "animate-fade-in" : "opacity-0"
            }`}
          >
            {t("description")}
          </p>

          {/* CTA Buttons with hover animations */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-1000 ${
              hasIntersected ? "animate-fade-in-up" : "opacity-0 translate-y-4"
            }`}
          >
            <ButtonLink
              href="/services"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto transform hover:scale-105 hover:shadow-lg hover:animate-glow transition-all duration-300 group"
            >
              <span className="group-hover:animate-pulse">
                {t("exploreServices")}
              </span>
            </ButtonLink>
            <ButtonLink
              href="/contact"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto transform hover:scale-105 hover:shadow-lg transition-all duration-300 hover:rotate-1"
            >
              {t("contactUs")}
            </ButtonLink>
          </div>

          {/* Scroll Indicator with enhanced animation */}
          <div
            className={`mt-16 transition-all duration-1000 delay-1200 ${
              hasIntersected ? "animate-bounce-in" : "opacity-0 scale-50"
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
