"use client";

import Link from "next/link";
import { useState } from "react";
import NavigationLink from "./NavigationLink";
import ThemeToggle from "./ThemeToggle";
import { useScrollDirection } from "@/lib/hooks";

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/references", label: "References" },
  { href: "/contact", label: "Contact" },
  {
    href: "https://blog.bitloom.sk",
    label: "Blog",
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

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isVisible } = useScrollDirection();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 transition-transform duration-600 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container-max px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 transform hover:scale-105 animate-fade-in-left"
          >
            Bitloom
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 animate-fade-in-right">
            <div className="flex items-center space-x-8">
              {navigationLinks.map((link) => (
                <NavigationLink
                  key={link.href}
                  href={link.href}
                  isExternal={link.isExternal}
                  className={link.icon ? "flex items-center gap-1" : ""}
                >
                  {link.label}
                  {link.icon}
                </NavigationLink>
              ))}
            </div>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button and Theme Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle mobile menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-4">
              {navigationLinks.map((link) => (
                <NavigationLink
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  showUnderline={false}
                  isExternal={link.isExternal}
                  className={link.icon ? "flex items-center gap-1" : ""}
                >
                  {link.label}
                  {link.icon}
                </NavigationLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
