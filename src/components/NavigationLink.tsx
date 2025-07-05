import { Link } from "@/i18n/routing";

interface NavigationLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  isExternal?: boolean;
  showUnderline?: boolean;
}

const NavigationLink = ({
  href,
  children,
  onClick,
  className = "",
  isExternal = false,
  showUnderline = true,
}: NavigationLinkProps) => {
  const baseClasses =
    "text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300";
  const desktopClasses = showUnderline ? "relative group" : "";
  const combinedClasses =
    `${baseClasses} ${desktopClasses} ${className}`.trim();

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={combinedClasses}
        onClick={onClick}
      >
        {children}
        {showUnderline && (
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
        )}
      </a>
    );
  }

  return (
    <Link href={href} className={combinedClasses} onClick={onClick}>
      {children}
      {showUnderline && (
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
      )}
    </Link>
  );
};

export default NavigationLink;
