"use client";

import { ButtonLink, SectionTitle } from "@/components";
import { useIntersectionObserver } from "@/lib/hooks";

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
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "Tech Solutions Inc.",
    testimonial:
      "Bitloom transformed our outdated e-commerce platform into a modern, scalable solution that increased our conversion rates by 40%. Their product-oriented approach and attention to user experience made all the difference. The team delivered ahead of schedule and exceeded every expectation.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CTO",
    company: "Digital Innovations",
    testimonial:
      "Working with Bitloom was exceptional. They brought strategic thinking to our technical challenges and delivered a robust web application that scaled seamlessly with our growth. Their expertise in modern technologies and clean architecture principles saved us months of development time.",
  },
  {
    id: 3,
    name: "Emma Davis",
    role: "Design Director",
    company: "Creative Agency Pro",
    testimonial:
      "Bitloom has an incredible ability to transform complex designs into flawless, responsive web experiences. Their attention to detail and understanding of both technical and aesthetic requirements resulted in a website that perfectly represents our brand and performs beautifully.",
  },
  {
    id: 4,
    name: "Alex Rodriguez",
    role: "Startup Founder",
    company: "InnovateLabs",
    testimonial:
      "As a startup, we needed a development partner who could move fast without compromising quality. Bitloom delivered our MVP on time and within budget, while providing valuable strategic insights that shaped our product roadmap. Their business acumen combined with technical excellence is rare.",
  },
];

const ReferenceCard = ({ reference }: { reference: Reference }) => {
  return (
    <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
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
    <section ref={elementRef} className="min-h-screen pt-24">
      <div className="container-max section-padding">
        {/* Header */}
        <SectionTitle
          title="Client Reviews & References"
          subtitle="Here's what clients and colleagues have to say about working with me."
          animated={true}
          isVisible={hasIntersected}
        />

        {/* References Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {references.map((reference) => (
            <ReferenceCard key={reference.id} reference={reference} />
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
