"use client";

import Image from "next/image";

interface TechStackProps {
  isVisible?: boolean;
}

const technologies = [
  {
    name: "React.js",
    description:
      "Modern frontend development with component-based architecture",
    iconPath: "/icons/ReactJS.svg",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
    keepOriginalInDark: true, // React should keep its blue color
  },
  {
    name: "Next.js",
    description: "Full-stack React framework for production-ready applications",
    iconPath: "/icons/NextJS.svg",
    bgColor: "bg-gray-100 dark:bg-gray-900/30",
    keepOriginalInDark: false, // Next.js is usually black, needs inversion
  },
  {
    name: "TypeScript",
    description: "Type-safe development for robust, maintainable applications",
    iconPath: "/icons/Typescript.svg",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
    keepOriginalInDark: true, // TypeScript should keep its blue color
  },
  {
    name: "Node.js",
    description: "Server-side JavaScript for scalable backend solutions",
    iconPath: "/icons/NodeJS.svg",
    bgColor: "bg-green-100 dark:bg-green-900/30",
    keepOriginalInDark: true, // Node.js should keep its green color
  },
  {
    name: "Python",
    description:
      "Versatile programming for web applications, APIs, and automation",
    iconPath: "/icons/Python.svg",
    bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
    keepOriginalInDark: true, // Python should keep its yellow/blue colors
  },
  {
    name: "PostgreSQL",
    description: "Powerful, open-source relational database system",
    iconPath: "/icons/Postgres.svg",
    bgColor: "bg-indigo-100 dark:bg-indigo-900/30",
    keepOriginalInDark: true, // PostgreSQL should keep its blue color
  },
  {
    name: "React Native",
    description: "Cross-platform mobile app development",
    iconPath: "/icons/ReactNative.svg",
    bgColor: "bg-cyan-100 dark:bg-cyan-900/30",
    keepOriginalInDark: true, // React Native should keep its blue color
  },
  {
    name: "Expo",
    description: "Streamlined React Native development and deployment platform",
    iconPath: "/icons/Expo.svg",
    bgColor: "bg-purple-100 dark:bg-purple-900/30",
    keepOriginalInDark: false, // Expo might need inversion depending on design
  },
];

const TechStack = ({ isVisible = true }: TechStackProps) => {
  return (
    <div className="mb-20">
      <div
        className={`text-center mb-12 transition-all duration-1000 delay-800 ${
          isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Our Technical Expertise
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          We specialize in modern technologies that enable us to build scalable,
          performant, and maintainable solutions for your business needs.
        </p>
      </div>

      <div
        className={`grid md:grid-cols-3 lg:grid-cols-4 gap-4 transition-all duration-1000 delay-900 ${
          isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
        }`}
      >
        {technologies.map((tech) => (
          <div
            key={tech.name}
            className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center">
              <div
                className={`w-8 h-8 ${tech.bgColor} rounded-lg flex items-center justify-center mr-3`}
              >
                {" "}
                <Image
                  src={tech.iconPath}
                  alt={`${tech.name} icon`}
                  width={16}
                  height={16}
                  className={`w-4 h-4 ${
                    tech.keepOriginalInDark
                      ? ""
                      : "dark:invert dark:brightness-0 dark:contrast-100"
                  }`}
                />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                {tech.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStack;
