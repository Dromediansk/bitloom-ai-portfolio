import { memo } from "react";
import type { Project } from "./types";
import { ProjectCard } from "./ProjectCard";

interface ProjectGridProps {
  projects: Project[];
}

export const ProjectGrid = memo(({ projects }: ProjectGridProps) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
});

ProjectGrid.displayName = "ProjectGrid";
