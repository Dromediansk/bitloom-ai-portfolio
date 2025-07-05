import { memo } from "react";
import { ButtonLink } from "@/components";
import { useTranslations } from "next-intl";

export const ProjectsCTA = memo(() => {
  const t = useTranslations("projects.cta");

  return (
    <div className="text-center mt-16">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {t("title")}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          {t("description")}
        </p>
        <ButtonLink
          href="/contact"
          variant="primary"
          className="hover:scale-105 transition-all duration-300 inline-flex items-center gap-2 group"
        >
          <span>{t("startProject")}</span>
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </ButtonLink>
      </div>
    </div>
  );
});

ProjectsCTA.displayName = "ProjectsCTA";
