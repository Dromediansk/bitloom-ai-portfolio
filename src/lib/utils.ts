// Utility function to combine classes
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

// Email validation
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Generate staggered animation delay classes for Tailwind CSS
export function getStaggeredDelay(
  index: number,
  delayIncrement: number = 150
): string {
  if (index === 0) return "";
  if (index === 1) return "delay-150";
  if (index === 2) return "delay-300";
  if (index === 3) return "delay-500";
  if (index === 4) return "delay-700";

  // For higher indexes, use arbitrary values
  return `delay-[${index * delayIncrement}ms]`;
}
