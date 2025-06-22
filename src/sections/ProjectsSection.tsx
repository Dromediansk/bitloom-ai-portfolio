"use client";

import {
  projects,
  ProjectsHeader,
  ProjectGrid,
  ProjectsCTA,
  BackgroundElements,
} from "@/components/projects";
import { useIntersectionObserver } from "@/lib/hooks";

const ProjectsSection = () => {
  const { elementRef, hasIntersected } = useIntersectionObserver();

  return (
    <section
      ref={elementRef}
      className="min-h-screen pt-24 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <BackgroundElements />

      <div className="container-max section-padding relative">
        {/* Header */}
        <ProjectsHeader isVisible={hasIntersected} />

        {/* Projects Grid */}
        <ProjectGrid projects={projects} />

        {/* CTA Section */}
        <ProjectsCTA />
      </div>
    </section>
  );
};

export default ProjectsSection;
