import { useEffect, useRef } from "react";
import { content } from "../data/content";
import Icon from "./Icon";

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
  const carouselSlides = [...carouselImages, ...carouselImages];
  const gridItems = content.features.items.filter(
    (item) => !carouselImages.some((image) => image.key === item.title)
  );
  const carouselRef = useRef<HTMLDivElement>(null);
  const carouselOffsetRef = useRef(0);
  const carouselAdjustingRef = useRef(false);

  const setCarouselOffset = () => {
    const node = carouselRef.current;
    if (!node) {
      return;
    }
    const children = Array.from(node.children) as HTMLElement[];
    if (children.length < carouselImages.length) {
      return;
    }
    const computed = getComputedStyle(node);
    const gapValue = Number.parseFloat(
      computed.columnGap || computed.gap || "0"
    );
    const gap = Number.isFinite(gapValue) ? gapValue : 0;
    let width = 0;
    for (let index = 0; index < carouselImages.length; index += 1) {
      width += children[index]?.getBoundingClientRect().width ?? 0;
    }
    const offset = width + gap * carouselImages.length;
    if (!Number.isFinite(offset) || offset <= 0) {
      return;
    }
    carouselOffsetRef.current = offset;
    carouselAdjustingRef.current = true;
    node.scrollLeft = offset;
    requestAnimationFrame(() => {
      carouselAdjustingRef.current = false;
    });
  };

  useEffect(() => {
    const node = carouselRef.current;
    if (!node) {
      return undefined;
    }
    const updateOffset = () => {
      setCarouselOffset();
    };
    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => {
      window.removeEventListener("resize", updateOffset);
    };
  }, [carouselImages.length]);

  const handleCarouselScroll = () => {
    if (carouselAdjustingRef.current) {
      return;
    }
    const node = carouselRef.current;
    const offset = carouselOffsetRef.current;
    if (!node || offset <= 0) {
      return;
    }
    const maxScrollLeft = node.scrollWidth - node.clientWidth;
    if (maxScrollLeft <= 0) {
      return;
    }
    const edgeBuffer = 2;
    if (node.scrollLeft <= edgeBuffer) {
      carouselAdjustingRef.current = true;
      node.scrollLeft = node.scrollLeft + offset;
      requestAnimationFrame(() => {
        carouselAdjustingRef.current = false;
      });
      return;
    }
    if (node.scrollLeft >= maxScrollLeft - edgeBuffer) {
      carouselAdjustingRef.current = true;
      node.scrollLeft = node.scrollLeft - offset;
      requestAnimationFrame(() => {
        carouselAdjustingRef.current = false;
      });
    }
  };

  const scrollCarousel = (direction: number) => {
    const node = carouselRef.current;
    if (!node) {
      return;
    }
    const firstItem = node.firstElementChild as HTMLElement | null;
    const gap = Number.parseFloat(getComputedStyle(node).gap || "0");
    const scrollAmount =
      (firstItem?.getBoundingClientRect().width ?? node.clientWidth) + gap;
    node.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
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
              ref={carouselRef}
              onScroll={handleCarouselScroll}
              className="carousel-scrollbar-hidden flex snap-x snap-mandatory gap-[0.45rem] overflow-x-auto scroll-smooth pb-4 px-4 sm:px-6 lg:px-8"
            >
              {carouselSlides.map((image, index) => {
                const isDuplicate = index >= carouselImages.length;
                return (
                  <div
                    key={`${image.key}-${index}`}
                    className="group shrink-0 snap-start overflow-hidden"
                    aria-hidden={isDuplicate ? "true" : undefined}
                  >
                    <img
                      src={image.src}
                      alt={isDuplicate ? "" : image.alt}
                      className="block h-[800px] w-[400px] max-h-[80vh] max-w-[90vw] transform-gpu object-contain opacity-65 transition duration-300 ease-out group-hover:scale-[1.03] group-hover:opacity-100"
                      loading="lazy"
                    />
                  </div>
                );
              })}
            </div>
            <button
              type="button"
              onClick={() => scrollCarousel(-1)}
              className="absolute left-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border/60 bg-surface/80 text-text shadow-soft transition hover:bg-surface focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg sm:flex"
              aria-label="Scroll carousel left"
              aria-controls="features-carousel"
            >
              <Icon name="chevron_left" className="text-[22px]" />
            </button>
            <button
              type="button"
              onClick={() => scrollCarousel(1)}
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
