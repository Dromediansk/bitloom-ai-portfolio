interface SocialLinksProps {
  className?: string;
  iconSize?: "sm" | "md" | "lg";
  layout?: "horizontal" | "vertical";
  showLabels?: boolean;
}

const SocialLinks = ({
  className = "",
  iconSize = "md",
  layout = "horizontal",
  showLabels = false,
}: SocialLinksProps) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const iconSizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const containerClasses =
    layout === "horizontal" ? "flex space-x-4" : "flex flex-col space-y-4";

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/Dromediansk",
      ariaLabel: "GitHub Profile",
      icon: (
        <svg
          className={`${iconSizeClasses[iconSize]} text-gray-700 dark:text-gray-300`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/miroslavpillar",
      ariaLabel: "LinkedIn Profile",
      icon: (
        <svg
          className={`${iconSizeClasses[iconSize]} text-gray-700 dark:text-gray-300`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Blog",
      href: "https://blog.bitloom.sk",
      ariaLabel: "Bitloom Blog",
      icon: (
        <svg
          className={`${iconSizeClasses[iconSize]} text-gray-700 dark:text-gray-300`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className={`${containerClasses} ${className}`}>
      {socialLinks.map((link) => (
        <div
          key={link.name}
          className={layout === "vertical" ? "flex items-center space-x-3" : ""}
        >
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${sizeClasses[iconSize]} bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors hover:scale-110 hover:shadow-lg`}
            aria-label={link.ariaLabel}
          >
            {link.icon}
          </a>
          {showLabels && (
            <span className="text-gray-600 dark:text-gray-400 text-sm font-medium">
              {link.name}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default SocialLinks;
