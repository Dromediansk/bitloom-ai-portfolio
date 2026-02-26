import { memo } from "react";
import type { Project } from "./types";
import { ProjectImage } from "./ProjectImage";
import { TechTags } from "./TechTags";
import { ProjectActions } from "./ProjectActions";
import { useIntersectionObserver } from "@/lib/hooks";
import { getStaggeredDelay } from "@/lib/utils";

interface ProjectGridProps {
  projects: Project[];
}

const ProjectContent = ({
  project,
  className = "",
}: {
  project: Project;
  className?: string;
}) => (
  <div className={`p-6 flex flex-col flex-grow ${className}`}>
    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
      {project.title}
    </h3>

    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed flex-grow">
      {project.description}
    </p>

    {/* Technologies with theme colors */}
    <TechTags technologies={project.technologies} />

    {/* Action Buttons */}
    <ProjectActions demoUrl={project.demoUrl} codeUrl={project.codeUrl} />
  </div>
);

export const ProjectGrid = memo(({ projects }: ProjectGridProps) => {
  const { elementRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "50px",
  });

  return (
    <div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {projects.map((project, index) => {
        const delayClass = getStaggeredDelay(index, 2000);
        const isFeatured = index === 0;

        return (
          <article
            key={project.id}
            className={`bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden transition-all duration-500 will-change-transform group hover:shadow-xl hover:-translate-y-2 border border-gray-100 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-700 h-full ${
              isFeatured ? "md:col-span-2 flex flex-col lg:flex-row" : "flex flex-col"
            } ${delayClass} ${
              hasIntersected ? `animate-fade-in-up` : "opacity-0 translate-y-8"
            }`}
          >
            {isFeatured ? (
              <>
                <div className="lg:w-1/2 w-full">
                  <ProjectImage project={project} featured />
                </div>
                <ProjectContent
                  project={project}
                  className="lg:w-1/2 w-full"
                />
              </>
            ) : (
              <>
                <ProjectImage project={project} />
                <ProjectContent project={project} />
              </>
            )}
          </article>
        );
      })}
    </div>
  );
});

ProjectGrid.displayName = "ProjectGrid";
