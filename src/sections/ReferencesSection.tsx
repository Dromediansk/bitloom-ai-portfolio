"use client";

import { ButtonLink, SectionTitle } from "@/components";
import { useIntersectionObserver } from "@/lib/hooks";
import { getStaggeredDelay } from "@/lib/utils";

interface Reference {
  id: number;
  name: string;
  role: string;
  company: string;
  testimonial: string;
  avatar?: string;
}

// Sample references data - replace with actual testimonials
const references: Reference[] = [
  {
    id: 1,
    name: "Andy Swan",
    role: "Head of Software Engineering",
    company: "Aptitude Global",
    testimonial:
      "I worked with Miro on a project aimed at standardising enterprise approach to application development. His approach to development and QA, alongside his pragmatic view of reusability, stand above people with significantly more experience. On top of typical development tasks utilising JS, TS, HTML, CSS and AWS, he was actively involved in technical architecture processes where his input was valuable. I was sorry to see him move on from that project and the opening he left was difficult to fill. I would recommend Miro wholeheartedly and hope to work with him again in the future.",
  },
  {
    id: 2,
    name: "Jacob Ellis",
    role: "Team Lead",
    company: "Cognitive Creators",
    testimonial:
      "Working alongside Miro on a high profile US Pharma project has been an excellent experience. He stands out as a top-tier developer, with exceptional skills in TypeScript, FullStack, React, Node.js, AWS Lambda, Serverless, and PostgreSQL. Miro's technical acumen places him in the upper echelons of developers I've had the pleasure to work with. His ability to merge high-level technical skills with real-world applications has been instrumental in driving our project forward. Miro’s insights have been invaluable, contributing significantly to both my work and the project as a whole. Though his departure leaves big shoes to fill, his future team is incredibly lucky to have him. Wishing Miro all the best in his new endeavors – his impact here will be remembered.",
  },
];

const ReferenceCard = ({
  reference,
  isVisible,
  delayClass,
}: {
  reference: Reference;
  isVisible: boolean;
  delayClass: string;
}) => {
  return (
    <div
      className={`bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-500 ${
        isVisible
          ? `animate-fade-in-up ${delayClass}`
          : "opacity-0 translate-y-8"
      }`}
    >
      {/* Quote Icon */}
      <div className="text-primary-500 mb-4">
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {/* Testimonial */}
      <blockquote className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
        &ldquo;{reference.testimonial}&rdquo;
      </blockquote>

      {/* Author Info */}
      <div className="flex items-center">
        {/* Avatar Placeholder */}
        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-lg mr-4">
          {reference.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>

        <div>
          <div className="font-semibold text-gray-900 dark:text-white">
            {reference.name}
          </div>
          <div className="text-gray-600 dark:text-gray-400">
            {reference.role} at {reference.company}
          </div>
        </div>
      </div>
    </div>
  );
};

const ReferencesSection = () => {
  const { elementRef, hasIntersected } = useIntersectionObserver();

  return (
    <section ref={elementRef} className="min-h-screen section-padding">
      <div className="container-max">
        {/* Header */}
        <SectionTitle
          title="Client Reviews & References"
          subtitle="Here's what clients and colleagues have to say about working with me."
          animated={true}
          isVisible={hasIntersected}
        />

        {/* References Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {references.map((reference, index) => (
            <ReferenceCard
              key={reference.id}
              reference={reference}
              isVisible={hasIntersected}
              delayClass={getStaggeredDelay(index)}
            />
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              50+
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              Projects Completed
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              30+
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              Happy Clients
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              3+
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              Years Experience
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              100%
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              Client Satisfaction
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Let&apos;s discuss how I can help bring your ideas to life.
          </p>
          <ButtonLink href="/contact" variant="primary">
            Start a Conversation
          </ButtonLink>
        </div>
      </div>
    </section>
  );
};

export default ReferencesSection;
