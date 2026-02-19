import { useEffect, useState } from "react";
import Icon from "./Icon";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleScroll = () => {
      setVisible(window.scrollY > 320);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    if (typeof window === "undefined") {
      return;
    }

    const prefersReducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-gradient-brand text-white shadow-soft transition duration-200 hover:-translate-y-1 hover:shadow-glow focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${
        visible ? "opacity-100 translate-y-0" : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <Icon name="arrow_upward" className="text-xl" />
    </button>
  );
};

export default ScrollToTop;
