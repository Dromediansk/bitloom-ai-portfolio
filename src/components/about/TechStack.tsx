import Image from "next/image";
import { useTranslations } from "next-intl";

interface TechStackProps {
  isVisible?: boolean;
}

const TechStack = ({ isVisible = true }: TechStackProps) => {
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
    <div className="mb-20">
      <div
        className={`text-center mb-12 transition-all duration-1000 delay-800 ${
          isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {t("title")}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          {t("description")}
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
