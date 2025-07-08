import { memo } from "react";
import { ButtonLink } from "@/components";
import { useTranslations } from "next-intl";

interface ProjectActionsProps {
  demoUrl?: string;
  codeUrl?: string;
}

export const ProjectActions = memo(
  ({ demoUrl, codeUrl }: ProjectActionsProps) => {
    const t = useTranslations("projects");

    return (
      <div className="flex gap-3">
        {demoUrl && (
          <ButtonLink
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            className="flex-1 text-center hover:scale-105 transition-all duration-300"
          >
            {t("actions.viewProject")}
          </ButtonLink>
        )}
        {codeUrl && (
          <ButtonLink
            href={codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            className="flex-1 text-center hover:scale-105 transition-all duration-300"
          >
            {t("actions.sourceCode")}
          </ButtonLink>
        )}
      </div>
    );
  }
);

ProjectActions.displayName = "ProjectActions";
