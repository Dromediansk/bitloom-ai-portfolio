"use client";

import { Link, usePathname } from "@/i18n/routing";
import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import NavigationLink from "./NavigationLink";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { useScrollDirection } from "@/lib/hooks";

type NavLink = {
  href: string;
  label: string;
  isExternal?: boolean;
  icon?: React.ReactNode;
};

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isVisible } = useScrollDirection();
  const pathname = usePathname();
  const t = useTranslations("navigation");

  const navigationLinks: NavLink[] = [
    { href: "/", label: t("home") },
    { href: "/services", label: t("services") },
    { href: "/projects", label: t("projects") },
    { href: "/about", label: t("about") },
    { href: "/references", label: t("references") },
    {
      href: "https://blog.bitloom.sk",
      label: t("blog"),
      isExternal: true,
      icon: (
        <svg
          className="w-3 h-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      ),
    },
  ];

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 nav-blur-enhanced transition-transform duration-600 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container-max px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center hover:opacity-80 transition-all duration-300 transform hover:scale-[1.02] animate-fade-in-left"
          >
            <Image
              src="/logo_pure.svg"
              alt="Bitloom Logo"
              width={200}
              height={60}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8 animate-fade-in-right">
            <div className="flex items-center space-x-5">
              {navigationLinks.map((link) => (
                <NavigationLink
                  key={link.href}
                  href={link.href}
                  isExternal={link.isExternal}
                  isActive={link.isExternal !== true && isLinkActive(link.href)}
                  className={link.icon ? "flex items-center gap-1" : ""}
                >
                  {link.label}
                  {link.icon}
                </NavigationLink>
              ))}
            </div>
            <div className="flex items-center space-x-3">
              <Link
                href="/contact"
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary-600/25"
              >
                {t("contact")}
              </Link>
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Button and Controls */}
          <div className="lg:hidden flex items-center space-x-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="relative p-2 w-10 h-10 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-white/70 dark:hover:bg-gray-600/50 transition-all duration-300 cursor-pointer"
              aria-label={t("toggleMenu")}
              aria-expanded={isMenuOpen}
            >
              <span
                aria-hidden="true"
                className={`block absolute left-2 w-6 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all duration-300 ${
                  isMenuOpen ? "top-[1.125rem] rotate-45" : "top-3"
                }`}
              />
              <span
                aria-hidden="true"
                className={`block absolute left-2 top-[1.125rem] w-6 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all duration-300 ${
                  isMenuOpen ? "opacity-0 scale-x-0" : "opacity-100"
                }`}
              />
              <span
                aria-hidden="true"
                className={`block absolute left-2 w-6 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all duration-300 ${
                  isMenuOpen ? "top-[1.125rem] -rotate-45" : "top-6"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-1">
              {([...navigationLinks, { href: "/contact", label: t("contact") }] as NavLink[]).map(
                (link, index, arr) => {
                  const active = !link.isExternal && isLinkActive(link.href);
                  return (
                    <NavigationLink
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      showUnderline={false}
                      isExternal={link.isExternal}
                      isActive={active}
                      className={`py-3 px-4 rounded-xl transition-all duration-300 ${
                        active
                          ? "bg-primary-50 dark:bg-primary-900/30"
                          : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                      } ${link.icon ? "flex items-center gap-1" : ""}`}
                      style={{
                        transitionDelay: isMenuOpen
                          ? `${index * 50}ms`
                          : `${(arr.length - 1 - index) * 30}ms`,
                      }}
                    >
                      {link.label}
                      {link.icon}
                    </NavigationLink>
                  );
                },
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
