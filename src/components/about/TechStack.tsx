import Image from "next/image";
import { useTranslations } from "next-intl";
import { useIntersectionObserver } from "@/lib/hooks";

const TechStack = () => {
  const { elementRef, hasIntersected } = useIntersectionObserver<HTMLDivElement>();
  const t = useTranslations("about.techStack");

  const technologies = [
    {
      name: "React.js",
      description: t("technologies.reactjs"),
      iconPath: "/icons/ReactJS.svg",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
      keepOriginalInDark: true,
    },
    {
      name: "Next.js",
      description: t("technologies.nextjs"),
      iconPath: "/icons/NextJS.svg",
      bgColor: "bg-gray-100 dark:bg-gray-900/30",
      keepOriginalInDark: false,
    },
    {
      name: "React Native",
      description: t("technologies.reactNative"),
      iconPath: "/icons/ReactNative.svg",
      bgColor: "bg-cyan-100 dark:bg-cyan-900/30",
      keepOriginalInDark: true,
    },
    {
      name: "Expo",
      description: t("technologies.expo"),
      iconPath: "/icons/Expo.svg",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
      keepOriginalInDark: false,
    },
    {
      name: "TypeScript",
      description: t("technologies.typescript"),
      iconPath: "/icons/Typescript.svg",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
      keepOriginalInDark: true,
    },
    {
      name: "Node.js",
      description: t("technologies.nodejs"),
      iconPath: "/icons/NodeJS.svg",
      bgColor: "bg-green-100 dark:bg-green-900/30",
      keepOriginalInDark: true,
    },
    {
      name: "Python",
      description: t("technologies.python"),
      iconPath: "/icons/Python.svg",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
      keepOriginalInDark: true,
    },
    {
      name: "PostgreSQL",
      description: t("technologies.postgresql"),
      iconPath: "/icons/Postgres.svg",
      bgColor: "bg-indigo-100 dark:bg-indigo-900/30",
      keepOriginalInDark: true,
    },
  ];

  return (
    <div className="mb-20" ref={elementRef}>
      <div
        className={`text-center mb-12 transition-all duration-1000 ${
          hasIntersected ? "animate-fade-in-up" : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {t("title")}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          {t("description")}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {technologies.map((tech, index) => {
          return (
            <div
              key={tech.name}
              className={`bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 dark:border-gray-700 group hover:-translate-y-1 ${
                hasIntersected
                  ? "animate-fade-in-up"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                animationDelay: `${index * 150}ms`,
              }}
            >
              <div
                className={`w-12 h-12 ${tech.bgColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300 ease-out`}
              >
                <Image
                  src={tech.iconPath}
                  alt={`${tech.name} icon`}
                  width={24}
                  height={24}
                  className={`w-6 h-6 ${
                    tech.keepOriginalInDark
                      ? ""
                      : "dark:invert dark:brightness-0 dark:contrast-100"
                  }`}
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {tech.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {tech.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TechStack;
