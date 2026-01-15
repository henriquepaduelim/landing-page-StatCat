import { content } from "../data/content";

const SocialProof = () => {
  return (
    <section id="social-proof" className="section-light py-section">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-5">
            <p className="text-small uppercase tracking-[0.2em] text-muted">
              {content.socialProof.eyebrow}
            </p>
            <h2 className="font-display text-headline text-text">
              {content.socialProof.title}
            </h2>
            <p className="text-body text-muted">{content.socialProof.subtitle}</p>
            <video
              className="h-auto w-full max-w-[520px] rounded-2xl shadow-soft"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Elite One Goalkeepers app preview"
            >
              <source src="/media/EliteOneGoalkeepers.webm" type="video/webm" />
            </video>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {content.socialProof.metrics.map((metric) => {
              const isAppCard = metric.value === "Your own app";
              const imageSrc =
                metric.value === "Sessions to seasons"
                  ? "/media/mockupiphone.png"
                  : metric.value === "Report cards"
                    ? "/media/reportcardsIphone.png"
                    : isAppCard
                      ? "/media/elite1iphoneicone.svg"
                      : null;
              const imageAlt = isAppCard
                ? "StatCat app icon"
                : "StatCat mobile app mockup";
              const zoomOriginClass = isAppCard
                ? "origin-[25%_75%]"
                : "origin-center";
              const hoverScaleClass = isAppCard
                ? "group-hover:scale-[2.5]"
                : "group-hover:scale-[1.25]";
              const imageFitClass = isAppCard ? "object-contain" : "object-cover";

              return (
                <div
                  key={metric.label}
                  className="card-muted group relative min-h-[200px] overflow-hidden p-0"
                >
                  <div
                    className={`absolute inset-0 transition-transform duration-300 ${hoverScaleClass} ${zoomOriginClass}`}
                  >
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt={imageAlt}
                        className={`h-full w-full ${imageFitClass}`}
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-slate-900/70 via-slate-800/60 to-slate-900/80" />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/10" />
                  <div className="relative z-10 p-4 transition-opacity duration-300 group-hover:opacity-25 sm:p-5">
                    <p className="text-2xl font-semibold text-white">
                      {metric.value}
                    </p>
                    <p className="text-small text-white/80">{metric.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
