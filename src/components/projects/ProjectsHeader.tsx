import { memo } from "react";
import { SectionTitle } from "../SectionTitle";
import { useTranslations } from "next-intl";

interface ProjectsHeaderProps {
  isVisible?: boolean;
}

export const ProjectsHeader = memo<ProjectsHeaderProps>(
  ({ isVisible = true }) => {
    const t = useTranslations("projects");

    return (
      <SectionTitle
        title={t("title")}
        subtitle={t("subtitle")}
        animated={true}
        isVisible={isVisible}
      />
    );
  }
);

ProjectsHeader.displayName = "ProjectsHeader";
