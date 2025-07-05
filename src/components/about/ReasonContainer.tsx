import { useIntersectionObserver } from "@/lib/hooks";
import { getStaggeredDelay } from "@/lib/utils";
import { useTranslations } from "next-intl";
import React from "react";

export const ReasonContainer = () => {
  const { elementRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "50px",
  });
  const t = useTranslations("about.whyChoose");

  const reasons = [
    {
      id: 1,
      title: t("productMindset.title"),
      description: t("productMindset.description"),
    },
    {
      id: 2,
      title: t("qualityFocus.title"),
      description: t("qualityFocus.description"),
    },
    {
      id: 3,
      title: t("growthPartnership.title"),
      description: t("growthPartnership.description"),
    },
  ];

  return (
    <div
      className="text-center mt-20"
      ref={elementRef as React.RefObject<HTMLDivElement>}
    >
      <h2
        className={`text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 transition-all duration-500 delay-200 ${
          hasIntersected ? "animate-fade-in-down" : "opacity-0 translate-y-8"
        }`}
      >
        {t("title")}
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {reasons.map((reason, index) => {
          const delayClass = getStaggeredDelay(index);
          return (
            <div
              key={reason.id}
              className={`bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg transition-all duration-1000 hover:shadow-xl hover:-translate-y-2 ${delayClass} ${
                hasIntersected
                  ? "animate-fade-in-up"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {reason.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                {reason.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
ReasonContainer.displayName = "ReasonContainer";
