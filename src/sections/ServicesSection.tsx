"use client";

import { ButtonLink, SectionTitle } from "@/components";
import { useIntersectionObserver } from "@/lib/hooks";

const services = [
  {
    id: "product-web-development",
    title: "Product-Oriented Web Development",
    description:
      "We build web applications with a product mindset, focusing on user experience, scalability, and business goals.",
    features: [
      "User-centered design",
      "Scalable architecture",
      "Performance optimization",
      "Modern frameworks",
    ],
    icon: "🚀",
  },
  {
    id: "fullstack-development",
    title: "Full-Stack Application Development",
    description:
      "End-to-end development of robust web applications using cutting-edge technologies and best practices.",
    features: [
      "Frontend & Backend",
      "AI integration",
      "API development",
      "Cloud deployment",
    ],
    icon: "⚡",
  },
  {
    id: "mobile-development",
    title: "Modern Mobile Development",
    description:
      "Cross-platform mobile applications built with modern frameworks, delivering native performance and seamless user experiences.",
    features: [
      "React Native",
      "Cross-platform solutions",
      "Native performance",
      "App store deployment",
    ],
    icon: "📱",
  },
  {
    id: "technical-consulting",
    title: "Technical Consulting & Strategy",
    description:
      "Strategic guidance to help businesses make informed technology decisions and optimize their development processes.",
    features: [
      "Technology assessment",
      "Architecture planning",
      "Process optimization",
      "Team mentoring",
    ],
    icon: "🎯",
  },
];

const processes = [
  {
    id: "1",
    step: "01",
    title: "Discovery",
    description:
      "Understanding your business goals, requirements, and target audience.",
  },
  {
    id: "2",
    step: "02",
    title: "Design",
    description:
      "Creating user-centered designs and technical architecture plans.",
  },
  {
    id: "3",
    step: "03",
    title: "Development",
    description:
      "Building robust, scalable solutions using modern technologies.",
  },
  {
    id: "4",
    step: "04",
    title: "Delivery",
    description: "Testing, deployment, and ongoing support for your success.",
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
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 dark:border-gray-700 group hover:-translate-y-2 ${
                hasIntersected
                  ? "animate-fade-in-up"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ animationDelay: `${300 + index * 100}ms` }}
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
          ))}
        </div>

        {/* Process Section */}
        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-gray-700">
          <div className="text-center mb-12">
            <h2
              className={`text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-all duration-1000 ${
                hasIntersected
                  ? "animate-fade-in-down"
                  : "opacity-0 translate-y-8"
              }`}
            >
              Our Process
            </h2>
            <p
              className={`text-lg text-gray-600 dark:text-gray-400 transition-all duration-1000 delay-200 ${
                hasIntersected
                  ? "animate-fade-in-up"
                  : "opacity-0 translate-y-8"
              }`}
            >
              A proven methodology that ensures successful project delivery
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processes.map((process, index) => (
              <div
                key={process.id}
                className={`text-center group transition-all duration-1000 ${
                  hasIntersected
                    ? "animate-fade-in-up"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ animationDelay: `${500 + index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded-full text-2xl font-bold mb-4 group-hover:scale-110 group-hover:bg-primary-600 group-hover:text-white dark:group-hover:bg-primary-500 transition-all duration-300">
                  {process.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {process.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {process.description}
                </p>
              </div>
            ))}
          </div>
        </div>

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
