import { memo, useMemo } from "react";

interface TechTagsProps {
  technologies: string[];
}

export const TechTags = memo(({ technologies }: TechTagsProps) => {
  // Memoize tech tags with consistent theming
  const techTags = useMemo(
    () =>
      technologies.map((tech, techIndex) => (
        <span
          key={techIndex}
          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-primary-100 dark:hover:bg-primary-900 hover:text-primary-700 dark:hover:text-primary-300 transition-all duration-200 cursor-pointer"
        >
          {tech}
        </span>
      )),
    [technologies]
  );

  return <div className="flex flex-wrap gap-2 mb-6">{techTags}</div>;
});

TechTags.displayName = "TechTags";
