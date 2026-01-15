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
      className={`fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-strong transition duration-200 hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${
        visible ? "opacity-100 translate-y-0" : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <Icon name="arrow_upward" className="text-xl" />
    </button>
  );
};

export default ScrollToTop;
