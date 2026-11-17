"use client";

import { usePathname } from "next/navigation";
import { BackgroundElements } from "@/components/BackgroundElements";

// The home page (the loom) draws its own grounds and chrome edge to edge.
// Every other page keeps the shared gradient frame under the fixed navigation.
export const isHomePath = (pathname: string | null) =>
  /^\/(en|sk)?\/?$/.test(pathname ?? "");

export function SiteFrame({ children }: { children: React.ReactNode }) {
  const isHome = isHomePath(usePathname());

  if (isHome) return <>{children}</>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 text-gray-900 dark:text-white">
      <BackgroundElements />
      <div className="pt-16 relative z-1">{children}</div>
    </div>
  );
}

export function HideOnHome({ children }: { children: React.ReactNode }) {
  return isHomePath(usePathname()) ? null : <>{children}</>;
}
