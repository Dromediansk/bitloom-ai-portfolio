import { useEffect, useRef, useState } from "react";

// Optimized intersection observer hook for performance
export function useIntersectionObserver<T extends HTMLElement = HTMLElement>(
  options: IntersectionObserverInit = {},
) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Check if element is already visible in viewport on mount.
    // Uses requestAnimationFrame to avoid synchronous setState in effect body.
    // This prevents content from staying invisible (opacity-0) on mobile devices
    // where the IntersectionObserver callback may not fire on initial load.
    const rafId = requestAnimationFrame(() => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setIsIntersecting(true);
        setHasIntersected(true);
      }
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isCurrentlyIntersecting = entry.isIntersecting;
        setIsIntersecting(isCurrentlyIntersecting);

        if (isCurrentlyIntersecting && !hasIntersected) {
          setHasIntersected(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
        ...options,
      },
    );

    observer.observe(element);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [hasIntersected, options]);

  return { elementRef, isIntersecting, hasIntersected };
}

// Hook to detect scroll direction for navigation animation
export function useScrollDirection(threshold = 10) {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(
    null,
  );
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const difference = scrollY - lastScrollY.current;

      if (Math.abs(difference) > threshold) {
        const newDirection = difference > 0 ? "down" : "up";
        setScrollDirection(newDirection);

        // Hide navigation when scrolling down (except at top)
        // Show navigation when scrolling up or at top
        setIsVisible(newDirection === "up" || scrollY < 100);

        lastScrollY.current = scrollY;
      }

      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(updateScrollDirection);
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [threshold]);

  return { scrollDirection, isVisible };
}
