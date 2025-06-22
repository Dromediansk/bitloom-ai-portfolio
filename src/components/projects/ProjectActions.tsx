import { memo } from "react";
import { ButtonLink } from "@/components";

interface ProjectActionsProps {
  demoUrl?: string;
  codeUrl?: string;
}

export const ProjectActions = memo(
  ({ demoUrl, codeUrl }: ProjectActionsProps) => {
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
            View Project
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
            Case Study
          </ButtonLink>
        )}
      </div>
    );
  }
);

ProjectActions.displayName = "ProjectActions";
