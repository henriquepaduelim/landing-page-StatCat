import { useEffect, useRef, useState, type CSSProperties } from "react";

type LazyVideoProps = {
  src: string;
  type?: string;
  className?: string;
  ariaLabel?: string;
  poster?: string;
  style?: CSSProperties;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  rootMargin?: string;
};

const LazyVideo = ({
  src,
  type = "video/mp4",
  className,
  ariaLabel,
  poster,
  style,
  loop = true,
  muted = true,
  playsInline = true,
  rootMargin = "240px",
}: LazyVideoProps) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [canLoad, setCanLoad] = useState(false);
  const [allowAutoplay, setAllowAutoplay] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;

    const constrainedNetwork =
      connection?.saveData === true || /(^|-)2g|3g/.test(connection?.effectiveType ?? "");

    setAllowAutoplay(!mediaQuery.matches && !constrainedNetwork);
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node || canLoad) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      setCanLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCanLoad(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin, threshold: 0.01 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [canLoad, rootMargin]);

  return (
    <video
      ref={ref}
      className={className}
      autoPlay={canLoad && allowAutoplay}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      preload="none"
      aria-label={ariaLabel}
      poster={poster}
      style={style}
    >
      {canLoad ? <source src={src} type={type} /> : null}
    </video>
  );
};

export default LazyVideo;
