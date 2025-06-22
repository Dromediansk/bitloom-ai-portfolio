import { memo } from "react";
import { SectionTitle } from "../SectionTitle";

interface ProjectsHeaderProps {
  isVisible?: boolean;
}

export const ProjectsHeader = memo<ProjectsHeaderProps>(
  ({ isVisible = true }) => {
    return (
      <SectionTitle
        title="Featured Projects"
        subtitle="Discover our portfolio of successful client projects. Each solution demonstrates our commitment to delivering exceptional results through innovative technology and strategic thinking."
        animated={true}
        isVisible={isVisible}
      />
    );
  }
);

ProjectsHeader.displayName = "ProjectsHeader";
