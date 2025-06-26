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

        return (
          <article
            key={project.id}
            className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-500 will-change-transform group hover:shadow-xl hover:-translate-y-1 border border-gray-100 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-700 h-full flex flex-col ${delayClass} ${
              hasIntersected ? `animate-fade-in-up` : "opacity-0 translate-y-8"
            }`}
          >
            {/* Project Image */}
            <ProjectImage project={project} />

            {/* Project Content */}
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                {project.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed flex-grow">
                {project.description}
              </p>

              {/* Technologies with theme colors */}
              <TechTags technologies={project.technologies} />

              {/* Action Buttons */}
              <ProjectActions
                demoUrl={project.demoUrl}
                codeUrl={project.codeUrl}
              />
            </div>
          </article>
        );
      })}
    </div>
  );
});

ProjectGrid.displayName = "ProjectGrid";
