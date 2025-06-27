"use client";

import { ButtonLink, SectionTitle } from "@/components";
import { useIntersectionObserver } from "@/lib/hooks";
import { ProcessContainer } from "@/components/process";
import { getStaggeredDelay } from "@/lib/utils";

const services = [
  {
    id: "modern-web-craft",
    title: "Modern Web Craft",
    description:
      "We craft exceptional web experiences through the art of full-stack development. From responsive websites to complex web applications, every digital touchpoint is built with precision, performance, and user experience at its core.",
    features: [
      "Full-stack web applications",
      "Responsive website design",
      "Modern frameworks & architecture",
      "Performance optimization",
    ],
    icon: "🌐",
  },
  {
    id: "mobile-mastery",
    title: "Mobile Mastery",
    description:
      "From concept to app store, we craft mobile applications that feel native on every platform. Our cross-platform expertise ensures your users get a seamless experience, whether they're on iOS or Android.",
    features: [
      "Cross-platform excellence",
      "Native performance & feel",
      "App store optimization",
      "User-centric design",
    ],
    icon: "📱",
  },
  {
    id: "technical-consulting",
    title: "Technical Consulting",
    description:
      "Navigate complex technical challenges with strategic consulting services. We help businesses make informed technology decisions and build scalable solutions that align with your goals.",
    features: [
      "Technology assessment",
      "Architecture planning",
      "Team mentoring",
    ],
    icon: "🧭",
  },
];

const ServicesSection = () => {
  const { elementRef, hasIntersected } = useIntersectionObserver();

  return (
    <section
      ref={elementRef}
      id="services"
      className="min-h-screen section-padding"
    >
      <div className="container-max px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <SectionTitle
          title="Our Services"
          subtitle="Comprehensive software development solutions designed to drive your business forward"
          animated={true}
          isVisible={hasIntersected}
        />

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-20">
          {services.map((service, index) => {
            const delayClass = getStaggeredDelay(index);
            return (
              <div
                key={service.id}
                className={`bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 dark:border-gray-700 group hover:-translate-y-2 ${delayClass} ${
                  hasIntersected
                    ? "animate-fade-in-up"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <div className="flex items-center mb-4">
                  <div className="text-4xl mr-4 group-hover:scale-110 group-hover:rotate-24 transition-all duration-300 ease-out">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {service.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-gray-700 dark:text-gray-300"
                    >
                      <span className="text-primary-500 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Process Section */}
        <ProcessContainer />

        {/* CTA Section */}
        <div
          className={`text-center mt-16 transition-all duration-1000 delay-1000 ${
            hasIntersected ? "animate-fade-in-up" : "opacity-0 translate-y-8"
          }`}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Start Your Project?
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss how Bitloom can help transform your ideas into
            powerful digital solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ButtonLink
              href="/contact"
              variant="primary"
              size="lg"
              className="transform hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              Start a Project
            </ButtonLink>
            <ButtonLink
              href="/projects"
              variant="secondary"
              size="lg"
              className="transform hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              View Our Work
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
