import { useEffect, useRef, useState, type MouseEvent } from "react";
import { content } from "../data/content";
import Icon from "./Icon";
import { smoothScrollToId } from "../utils/smoothScroll";
import { createFocusTrap } from "../utils/focusTrap";

const logoUrl = "/media/STATCATSports-logo-design.webp";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleScroll = () => {
      setIsCompact(window.scrollY > 16);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen || !drawerRef.current) {
      return;
    }

    const cleanup = createFocusTrap(drawerRef.current, () => setMenuOpen(false));
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      cleanup();
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const handleNavClick = (id: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    smoothScrollToId(id, 136);
    setMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div
        className={`mx-auto flex max-w-content items-center justify-between px-4 transition-all duration-200 sm:px-6 lg:px-8 ${
          isCompact ? "h-16" : "h-24"
        }`}
      >
        <a
          href="#hero"
          onClick={handleNavClick("hero")}
          className="flex h-full items-center self-center"
        >
          <img
            src={logoUrl}
            alt={`${content.brand.name} logo`}
            className="h-full w-auto origin-center scale-[1.4] object-contain saturate-[1.12] brightness-[1.4] contrast-[0.88] drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
          />
        </a>

        <div className="flex items-center gap-3 rounded-xl bg-black/30 px-3 py-2 backdrop-blur-[2px]">
          <nav
            className="hidden items-center gap-6 text-sm font-semibold text-muted lg:flex"
            aria-label={content.header.primaryNavLabel}
          >
            {content.nav.map((item) => (
              <a
                key={item.href}
                href={`#${item.href}`}
                onClick={handleNavClick(item.href)}
                className="site-nav-link"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <a href="#cta" onClick={handleNavClick("cta")} className="btn-primary">
              {content.hero.primaryCta}
            </a>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-border bg-surface p-2 text-text shadow-soft transition hover:border-primary/40 lg:hidden"
            aria-label={content.header.openLabel}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <Icon name="menu" className="text-[22px]" />
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="lg:hidden">
          <div
            className="fixed inset-0 z-40 bg-text/20 backdrop-blur"
            role="presentation"
            onClick={() => setMenuOpen(false)}
          />
          <div
            ref={drawerRef}
            className="fixed right-0 top-0 z-50 h-full w-80 max-w-full border-l border-border bg-surface p-6 shadow-strong"
            role="dialog"
            aria-modal="true"
            aria-label={content.header.mobileNavLabel}
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-lg font-semibold">{content.header.mobileTitle}</span>
              <button
                type="button"
                className="rounded-md border border-border bg-surface p-2"
                onClick={() => setMenuOpen(false)}
                aria-label={content.header.closeLabel}
              >
                <Icon name="close" className="text-[20px]" />
              </button>
            </div>
            <nav
              className="mt-8 flex flex-col gap-4 text-base font-semibold"
              aria-label={content.header.mobileNavMenuLabel}
            >
              {content.nav.map((item) => (
                <a
                  key={item.href}
                  href={`#${item.href}`}
                  onClick={handleNavClick(item.href)}
                  className="site-nav-link site-nav-link-mobile"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="mt-6">
              <a href="#cta" onClick={handleNavClick("cta")} className="btn-primary w-full">
                {content.hero.primaryCta}
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
};

export default Header;
