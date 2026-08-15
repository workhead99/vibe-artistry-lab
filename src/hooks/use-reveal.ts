import { useEffect, useRef } from "react";

/** Adds `is-visible` to `.reveal` descendants (and the root) as they enter the viewport. */
export function useReveal<T extends HTMLElement>(rootMargin = "0px 0px -10% 0px") {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const targets: Element[] = [
      ...(root.classList.contains("reveal") ? [root] : []),
      ...Array.from(root.querySelectorAll(".reveal")),
    ];
    if (!targets.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      targets.forEach((t) => t.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting || e.boundingClientRect.top < window.innerHeight) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin, threshold: 0.12 },
    );

    targets.forEach((t, i) => {
      (t as HTMLElement).style.transitionDelay = `${Math.min(i, 6) * 70}ms`;
      io.observe(t);
    });

    return () => io.disconnect();
  }, [rootMargin]);

  return ref;
}
