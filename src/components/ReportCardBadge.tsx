import { useEffect, useState } from "react";

type ReportCardBadgeProps = {
  photoSrc: string;
  photoAlt: string;
};

const statcatLogoUrl = "/media/STATCATSports-logo-design.png";
const canadaFlagUrl = new URL("../../ca.svg", import.meta.url).href;

const ReportCardBadge = ({ photoSrc, photoAlt }: ReportCardBadgeProps) => {
  const [pinned, setPinned] = useState(false);
  const [pulse, setPulse] = useState(false);
  const flipped = pinned;

  useEffect(() => {
    if (!pulse) return;
    const timeout = window.setTimeout(() => setPulse(false), 240);
    return () => window.clearTimeout(timeout);
  }, [pulse]);

  const metrics = [
    ["SRS", 60],
    ["LRS", 75],
    ["DIS", 80],
    ["TEC", 83],
    ["MIN", 78],
    ["PHY", 71],
  ] as const;
  const metricColumns = [metrics.slice(0, 3), metrics.slice(3)] as const;

  return (
    <button
      type="button"
      onClick={() => {
        setPinned((value) => !value);
        setPulse(true);
      }}
      className={`group relative w-full max-w-[360px] rounded-[28px] shadow-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg motion-safe:transition-[transform,box-shadow] motion-safe:duration-200 active:scale-[0.99] sm:max-w-[400px] lg:max-w-[440px] ${pulse ? "ring-1 ring-white/20" : ""}`}
      style={{ perspective: "1200px" }}
      aria-pressed={pinned}
      aria-label="Report card badge preview"
    >
      <div
        className="relative min-h-[470px] w-full motion-safe:transition-transform motion-safe:duration-500 sm:min-h-[530px] lg:min-h-[580px]"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div
          className="absolute inset-0 flex h-full flex-col overflow-hidden rounded-[28px]"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="flex min-h-[280px] flex-1 overflow-hidden bg-[#141722] sm:min-h-[320px] lg:min-h-[360px]">
            <div className="flex w-[18%] flex-col items-center justify-center gap-3 py-4 text-white">
              <div className="text-5xl font-extrabold leading-none">78</div>
              <div className="w-full text-center text-sm font-semibold uppercase -tracking-widest-[0.2em]">
                GK
              </div>
              <div className="h-px w-10 bg-white/50" />
              <div className="h-5 w-10 overflow-hidden">
                <img
                  src={canadaFlagUrl}
                  alt="Canada flag"
                  className="h-full w-full scale-[1.08] object-cover"
                />
              </div>
            </div>
            <div className="flex w-[74%] items-center justify-center bg-[#d9d9d9]">
              <img
                src={photoSrc}
                alt={photoAlt}
                className="h-full w-full object-cover"
                width={1400}
                height={1377}
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </div>
          </div>

          <div className="flex shrink-0 items-center justify-between bg-[#2fe5ad] px-8 py-2 text-[15px] font-semibold uppercase tracking-[0.2em] text-[#0b0f1a]">
            <span>Leadership score</span>
            <span className="text-base font-bold">84</span>
          </div>

          <div className="relative grid shrink-0 grid-cols-2 bg-[#141722] px-4 py-5 text-white sm:px-5">
            <div
              className="pointer-events-none absolute inset-y-4 left-1/2 w-px bg-white/15"
              aria-hidden="true"
            />
            {metricColumns.map((column, columnIndex) => (
              <div
                key={`metrics-${columnIndex}`}
                className={`grid gap-y-2 ${columnIndex === 0 ? "pr-4" : "pl-4"}`}
              >
                {column.map(([label, value]) => (
                  <div
                    key={label}
                    className="grid grid-cols-[auto,1fr] items-baseline gap-x-2"
                  >
                    <span className="text-[18px] font-semibold uppercase tracking-[0.22em] text-white/80">
                      {label}
                    </span>
                    <span className="text-xl font-extrabold tabular-nums text-right">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div
          className="absolute inset-0 flex items-center justify-center rounded-[28px] bg-[#11131b]"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <img
            src={statcatLogoUrl}
            alt="StatCat logo"
            className="h-56 w-auto opacity-90"
          />
        </div>
      </div>
    </button>
  );
};

export default ReportCardBadge;
