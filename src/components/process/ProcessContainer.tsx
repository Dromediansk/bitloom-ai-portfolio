import { memo } from "react";
import { ProcessCard } from "./ProcessCard";
import { useIntersectionObserver } from "@/lib/hooks";
import { useTranslations } from "next-intl";

export const ProcessContainer = memo(() => {
  const { elementRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "50px",
  });
  const t = useTranslations("process");

  const processes = [
    {
      id: "1",
      step: t("discovery.step"),
      title: t("discovery.title"),
      description: t("discovery.description"),
    },
    {
      id: "2",
      step: t("analysis.step"),
      title: t("analysis.title"),
      description: t("analysis.description"),
    },
    {
      id: "3",
      step: t("development.step"),
      title: t("development.title"),
      description: t("development.description"),
    },
    {
      id: "4",
      step: t("delivery.step"),
      title: t("delivery.title"),
      description: t("delivery.description"),
    },
  ];

  return (
    <div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-gray-700"
    >
      <div className="text-center mb-12">
        <h2
          className={`text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-all duration-1000 ${
            hasIntersected ? "animate-fade-in-down" : "opacity-0 translate-y-8"
          }`}
        >
          {t("title")}
        </h2>
        <p
          className={`text-lg text-gray-600 dark:text-gray-400 transition-all duration-1000 delay-200 ${
            hasIntersected ? "animate-fade-in-up" : "opacity-0 translate-y-8"
          }`}
        >
          {t("subtitle")}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {processes.map((process, index) => (
          <ProcessCard
            key={process.id}
            process={process}
            index={index}
            isVisible={hasIntersected}
          />
        ))}
      </div>
    </div>
  );
});

ProcessContainer.displayName = "ProcessContainer";
