"use client";

import Image from "next/image";
import { ButtonLink, SectionTitle } from "@/components";
import { useIntersectionObserver } from "@/lib/hooks";
import { ReasonContainer, TechStack } from "@/components/about";

const AboutSection = () => {
  const { elementRef, hasIntersected } = useIntersectionObserver();

  return (
    <section
      ref={elementRef}
      id="about"
      className="min-h-screen section-padding"
    >
      <div className="container-max px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            title="About Bitloom"
            subtitle="Founded with a vision to deliver exceptional software solutions that drive business growth"
            animated={true}
            isVisible={hasIntersected}
          />

          {/* Company Story */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div
              className={`transition-all duration-1000 delay-300 ${
                hasIntersected
                  ? "animate-fade-in-left"
                  : "opacity-0 -translate-x-8"
              }`}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Bitloom was founded by Miroslav with a clear mission: to bridge
                the gap between innovative technology and meaningful business
                outcomes. We believe that great software is not just about code
                – it&apos;s about understanding your business, your users, and
                your goals.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Our product-oriented approach ensures that every solution we
                build is designed to scale, perform, and deliver measurable
                value to your organization. We embrace growth-oriented values
                that guide everything we do.
              </p>
              <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Our Core Values
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-primary-600 dark:text-primary-400">
                      🔍
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">
                      <strong>Transparent Communication</strong> - Clear, honest
                      dialogue at every step
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-primary-600 dark:text-primary-400">
                      🌍
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">
                      <strong>Remote-First Cooperation</strong> - Seamless
                      collaboration across borders
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-primary-600 dark:text-primary-400">
                      💡
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">
                      <strong>Open-Mindedness</strong> - Embracing new ideas and
                      approaches
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`relative transition-all duration-1000 delay-500 ${
                hasIntersected
                  ? "animate-fade-in-right"
                  : "opacity-0 translate-x-8"
              }`}
            >
              <div className="w-80 h-80 mx-auto bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl flex items-center justify-center relative overflow-hidden group cursor-pointer transform hover:scale-105 transition-all duration-500 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="text-white text-7xl font-bold z-10 group-hover:animate-pulse">
                  B
                </div>
                <div className="absolute top-6 left-10 w-3 h-3 bg-white/30 rounded-full animate-float"></div>
                <div
                  className="absolute bottom-10 right-8 w-4 h-4 bg-white/20 rounded-full animate-float"
                  style={{ animationDelay: "1s" }}
                ></div>
                <div
                  className="absolute top-16 right-16 w-2 h-2 bg-white/40 rounded-full animate-float"
                  style={{ animationDelay: "2s" }}
                ></div>
              </div>
            </div>
          </div>

          {/* Founder Section */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-3xl p-8 md:p-12 mb-20">
            <div className="grid lg:grid-cols-3 gap-8 items-center">
              <div
                className={`lg:col-span-2 transition-all duration-1000 delay-600 ${
                  hasIntersected
                    ? "animate-fade-in-left"
                    : "opacity-0 -translate-x-8"
                }`}
              >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Meet Our Founder
                </h2>
                <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-4">
                  Miroslav Pillár - Founder & Digital Craftsman
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Based in Kosice, Slovakia
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  With years of experience in software development and a passion
                  for creating products that matter, Miroslav founded Bitloom to
                  help businesses harness the power of modern web technologies.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  His expertise spans full-stack development, cloud
                  architecture, and product strategy, ensuring that every
                  project benefits from both technical excellence and business
                  acumen.
                </p>
              </div>
              <div
                className={`flex justify-center transition-all duration-1000 delay-700 ${
                  hasIntersected
                    ? "animate-fade-in-right"
                    : "opacity-0 translate-x-8"
                }`}
              >
                <div className="w-48 h-48 rounded-full overflow-hidden shadow-xl ring-4 ring-primary-200 dark:ring-primary-800">
                  <Image
                    src="/images/about/avatar.png"
                    alt="Miroslav - Founder of Bitloom"
                    width={192}
                    height={192}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Technical Expertise */}
          <TechStack isVisible={hasIntersected} />

          {/* Why Choose Bitloom */}
          <ReasonContainer />

          {/* CTA */}
          <div
            className={`text-center mt-16 transition-all duration-1000 delay-1400 ${
              hasIntersected ? "animate-fade-in-up" : "opacity-0 translate-y-8"
            }`}
          >
            <ButtonLink
              href="/contact"
              variant="primary"
              size="lg"
              className="transform hover:scale-105 hover:shadow-xl transition-all duration-300"
            >
              Start Your Project
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
