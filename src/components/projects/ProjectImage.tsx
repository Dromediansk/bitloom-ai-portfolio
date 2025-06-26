import Image from "next/image";
import type { Project } from "./types";

interface ProjectImageProps {
  project: Project;
}

export const ProjectImage = ({ project }: ProjectImageProps) => {
  return (
    <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 overflow-hidden">
      {project.imageUrl ? (
        /* Project Image */
        <Image
          src={project.imageUrl}
          alt={`${project.title} project screenshot`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      ) : (
        <>
          {/* Subtle pattern overlay - fallback */}
          <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(45deg, ${
                  project.id === 1
                    ? "#0d6efd20"
                    : project.id === 2
                    ? "#6366f120"
                    : "#06b6d420"
                } 25%, transparent 25%, transparent 75%, ${
                  project.id === 1
                    ? "#0d6efd20"
                    : project.id === 2
                    ? "#6366f120"
                    : "#06b6d420"
                } 75%), linear-gradient(45deg, ${
                  project.id === 1
                    ? "#0d6efd20"
                    : project.id === 2
                    ? "#6366f120"
                    : "#06b6d420"
                } 25%, transparent 25%, transparent 75%, ${
                  project.id === 1
                    ? "#0d6efd20"
                    : project.id === 2
                    ? "#6366f120"
                    : "#06b6d420"
                } 75%)`,
                backgroundSize: "20px 20px",
                backgroundPosition: "0 0, 10px 10px",
              }}
            ></div>
          </div>

          {/* Project icon - fallback */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={`
                w-16 h-16 rounded-xl flex items-center justify-center text-white
                ${
                  project.id === 1
                    ? "bg-primary-500"
                    : project.id === 2
                    ? "bg-indigo-500"
                    : "bg-cyan-500"
                }
                group-hover:scale-110 transition-transform duration-300 shadow-lg
              `}
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

ProjectImage.displayName = "ProjectImage";
