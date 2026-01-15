import { useEffect, useRef, useState } from "react";
import type { TouchEvent, TransitionEvent } from "react";
import { content } from "../data/content";
import Icon from "./Icon";

const CAROUSEL_TRANSITION_MS = 420;

const Features = () => {
  const carouselImages = [
    {
      key: "Report cards and evaluations",
      src: "/media/iphonemockReportcard.png",
      alt: "Report cards screen on iPhone",
    },
    {
      key: "Scheduling and events",
      src: "/media/iphonemockscheduling.png",
      alt: "Scheduling screen on iPhone",
    },
    {
      key: "Approvals",
      src: "/media/iphonemockApprove.png",
      alt: "Approvals screen on iPhone",
    },
    {
      key: "Communication hub",
      src: "/media/iphoneRSVP.png",
      alt: "Communication hub screen on iPhone",
    },
  ];
  const [carouselItems, setCarouselItems] = useState(() => carouselImages);
  const [carouselShift, setCarouselShift] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const gridItems = content.features.items.filter(
    (item) => !carouselImages.some((image) => image.key === item.title)
  );
  const carouselRef = useRef<HTMLDivElement>(null);
  const slideOffsetRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const pendingDirectionRef = useRef<1 | -1 | 0>(0);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const touchLastRef = useRef<{ x: number; y: number } | null>(null);
  const touchHandledRef = useRef(false);

  const updateSlideOffset = () => {
    const node = carouselRef.current;
    if (!node) {
      return;
    }
    const firstItem = node.firstElementChild as HTMLElement | null;
    if (!firstItem) {
      return;
    }
    const gapValue = Number.parseFloat(getComputedStyle(node).gap || "0");
    const gap = Number.isFinite(gapValue) ? gapValue : 0;
    const width = firstItem.getBoundingClientRect().width ?? 0;
    const offset = width + gap;
    if (Number.isFinite(offset) && offset > 0) {
      slideOffsetRef.current = offset;
    }
  };

  useEffect(() => {
    const updateOffset = () => {
      updateSlideOffset();
    };
    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => {
      window.removeEventListener("resize", updateOffset);
    };
  }, [carouselImages.length]);

  const shiftCarousel = (direction: 1 | -1) => {
    if (isAnimatingRef.current) {
      return;
    }
    if (!slideOffsetRef.current) {
      updateSlideOffset();
    }
    const offset = slideOffsetRef.current;
    if (!offset) {
      return;
    }
    isAnimatingRef.current = true;
    setTransitionEnabled(false);
    setCarouselItems((items) => {
      if (items.length <= 1) {
        return items;
      }
      if (direction === 1) {
        const [first, ...rest] = items;
        return [...rest, first];
      }
      const last = items[items.length - 1];
      return [last, ...items.slice(0, -1)];
    });
    setCarouselShift(direction === 1 ? offset : -offset);
    requestAnimationFrame(() => {
      pendingDirectionRef.current = direction;
      setTransitionEnabled(true);
      setCarouselShift(0);
    });
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    if (isAnimatingRef.current) {
      return;
    }
    const touch = event.touches[0];
    if (!touch) {
      return;
    }
    const point = { x: touch.clientX, y: touch.clientY };
    touchStartRef.current = point;
    touchLastRef.current = point;
    touchHandledRef.current = false;
  };

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    if (!touchStartRef.current) {
      return;
    }
    const touch = event.touches[0];
    if (!touch) {
      return;
    }
    touchLastRef.current = { x: touch.clientX, y: touch.clientY };
    if (touchHandledRef.current) {
      return;
    }
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    if (Math.abs(deltaX) > Math.abs(deltaY) * 1.2 && Math.abs(deltaX) > 12) {
      touchHandledRef.current = true;
    }
  };

  const handleTouchEnd = () => {
    if (!touchStartRef.current || isAnimatingRef.current) {
      touchStartRef.current = null;
      touchLastRef.current = null;
      touchHandledRef.current = false;
      return;
    }
    const start = touchStartRef.current;
    const last = touchLastRef.current ?? start;
    const handled = touchHandledRef.current;
    touchStartRef.current = null;
    touchLastRef.current = null;
    touchHandledRef.current = false;
    if (!handled) {
      return;
    }
    const deltaX = last.x - start.x;
    const deltaY = last.y - start.y;
    if (
      Math.abs(deltaX) > Math.abs(deltaY) * 1.2 &&
      Math.abs(deltaX) > 36
    ) {
      shiftCarousel(deltaX < 0 ? 1 : -1);
    }
  };

  const handleTouchCancel = () => {
    touchStartRef.current = null;
    touchLastRef.current = null;
    touchHandledRef.current = false;
  };

  const handleTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.propertyName !== "transform") {
      return;
    }
    const direction = pendingDirectionRef.current;
    if (!direction) {
      return;
    }
    pendingDirectionRef.current = 0;
    isAnimatingRef.current = false;
  };

  return (
    <section id="features" className="section-dark py-section">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-small uppercase tracking-[0.2em] text-muted">
            {content.features.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-headline text-text">
            {content.features.title}
          </h2>
          <p className="mt-4 text-body text-muted">{content.features.subtitle}</p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div className="space-y-4">
            <p className="text-small uppercase tracking-[0.2em] text-muted">
              {content.features.highlight.eyebrow}
            </p>
            <h3 className="text-title font-semibold text-text sm:text-2xl">
              {content.features.highlight.title}
            </h3>
            <p className="text-body text-muted">
              {content.features.highlight.description}
            </p>
            <ul className="space-y-3 text-small text-muted">
              {content.features.highlight.bullets.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Icon name="check_circle" className="mt-0.5 text-secondary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <figure>
            <div className="overflow-hidden rounded-2xl bg-surface/90 shadow-strong">
              <video
                className="h-full w-full object-cover"
                src={content.features.highlight.video.src}
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                aria-label={content.features.highlight.video.ariaLabel}
              />
            </div>
            <figcaption className="mt-4 text-small text-muted">
              <span className="block text-xs uppercase tracking-[0.2em] text-muted">
                {content.features.highlight.video.label}
              </span>
              <span>{content.features.highlight.video.caption}</span>
            </figcaption>
          </figure>
        </div>

        <div className="mt-12 -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="relative">
            <div
              id="features-carousel"
              className="overflow-hidden pb-4 px-4 sm:px-6 lg:px-8"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={handleTouchCancel}
            >
              <div
                ref={carouselRef}
                onTransitionEnd={handleTransitionEnd}
                className="flex w-max gap-[0.45rem] transform-gpu"
                style={{
                  transform: `translateX(${carouselShift}px)`,
                  transition: transitionEnabled
                    ? `transform ${CAROUSEL_TRANSITION_MS}ms ease`
                    : "none",
                }}
              >
                {carouselItems.map((image) => (
                  <div key={image.key} className="group shrink-0 overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="block h-[800px] w-[400px] max-h-[80vh] max-w-[90vw] transform-gpu object-contain opacity-65 transition duration-300 ease-out group-hover:scale-[1.03] group-hover:opacity-100"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={() => shiftCarousel(-1)}
              className="absolute left-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border/60 bg-surface/80 text-text shadow-soft transition hover:bg-surface focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg sm:flex"
              aria-label="Scroll carousel left"
              aria-controls="features-carousel"
            >
              <Icon name="chevron_left" className="text-[22px]" />
            </button>
            <button
              type="button"
              onClick={() => shiftCarousel(1)}
              className="absolute right-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border/60 bg-surface/80 text-text shadow-soft transition hover:bg-surface focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg sm:flex"
              aria-label="Scroll carousel right"
              aria-controls="features-carousel"
            >
              <Icon name="chevron_right" className="text-[22px]" />
            </button>
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {gridItems.map((feature, index) => (
            <div
              key={feature.title}
              className="card animate-fade-up"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="grid h-12 w-12 place-items-center rounded-md bg-primary/10 text-primary">
                <Icon name={feature.icon} className="text-2xl leading-none" />
              </div>
              <h3 className="mt-4 text-title font-semibold text-text">
                {feature.title}
              </h3>
              <p className="mt-2 text-small text-muted">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
