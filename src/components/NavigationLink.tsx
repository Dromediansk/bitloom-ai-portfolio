import { Link } from "@/i18n/routing";

interface NavigationLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  isExternal?: boolean;
  showUnderline?: boolean;
  isActive?: boolean;
  style?: React.CSSProperties;
}

const NavigationLink = ({
  href,
  children,
  onClick,
  className = "",
  isExternal = false,
  showUnderline = true,
  isActive = false,
  style,
}: NavigationLinkProps) => {
  const baseClasses = isActive
    ? "text-primary-600 dark:text-primary-400 font-medium transition-all duration-300"
    : "text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300";
  const desktopClasses = showUnderline ? "relative group" : "";
  const combinedClasses =
    `${baseClasses} ${desktopClasses} ${className}`.trim();

  const underline = showUnderline && (
    <span
      aria-hidden="true"
      className={`absolute -bottom-1 left-0 h-0.5 bg-primary-600 transition-all duration-300 ${
        isActive ? "w-full" : "w-0 group-hover:w-full"
      }`}
    ></span>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={combinedClasses}
        onClick={onClick}
        style={style}
      >
        {children}
        {underline}
      </a>
    );
  }

  return (
    <Link href={href} className={combinedClasses} onClick={onClick} style={style}>
      {children}
      {underline}
    </Link>
  );
};

export default NavigationLink;
