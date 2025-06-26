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
      className="min-h-screen section-padding relative overflow-hidden"
    >
      {/* Animated background elements */}
      <BackgroundElements />

      <div className="container-max relative">
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
