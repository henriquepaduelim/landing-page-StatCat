import { motion } from "framer-motion";
import { content } from "../data/content";
import { revealUp, staggerContainer } from "../motion/presets";

const SocialProof = () => {
  return (
    <section id="social-proof" className="section-light py-section">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <motion.div
            className="space-y-5"
            variants={revealUp(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <p className="text-small uppercase tracking-[0.2em] text-muted">
              {content.socialProof.eyebrow}
            </p>
            <h2 className="font-display text-headline text-text">
              {content.socialProof.title}
            </h2>
            <p className="text-body text-muted">{content.socialProof.subtitle}</p>
            <div className="group w-full max-w-[520px] overflow-hidden rounded-card shadow-soft">
              <video
                className="h-auto w-full transform-gpu object-cover transition duration-500 ease-out group-hover:scale-[1.3]"
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                aria-label="Elite One Goalkeepers app preview"
                style={{ transformOrigin: "78% 67%" }}
              >
                <source
                  src="/media/EliteOneGoalkeepers.webm"
                  type="video/webm"
                />
              </video>
            </div>
          </motion.div>
          <motion.div
            className="grid gap-4 sm:grid-cols-2"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {content.socialProof.metrics.map((metric) => {
              const isAppCard = metric.value === "Your own app";
              const isCanadaCard = metric.value === "Canadian support";
              const isReportCard = metric.value === "Report cards";
              const isSessionsCard = metric.value === "Sessions to seasons";
              const imageSrc =
                isSessionsCard
                  ? "/media/mockupiphone.webp"
                  : isReportCard
                    ? "/media/reportcardsIphone.webp"
                    : isAppCard
                      ? "/media/elite1iphoneicone.webp"
                      : isCanadaCard
                        ? "/media/canadaflag.webp"
                        : null;
              const imageAlt = isAppCard
                ? "StatCat app icon"
                : isCanadaCard
                  ? "Canadian flag"
                  : "StatCat mobile app mockup";
              const imageWidth = isAppCard ? 453 : isCanadaCard ? 1000 : isReportCard ? 900 : 800;
              const imageHeight = isAppCard ? 912 : isCanadaCard ? 750 : isReportCard ? 900 : 800;
              const zoomOriginClass = isAppCard
                ? "origin-[25%_75%]"
                : "origin-center";
              const hoverScaleClass = isAppCard
                ? "group-hover:scale-[2.5]"
                : "group-hover:scale-[1.45]";
              const imageFitClass = isAppCard ? "object-contain" : "object-cover";

              return (
                <motion.div
                  key={metric.label}
                  className="card-muted group relative min-h-[200px] overflow-hidden p-0"
                  variants={revealUp(0)}
                >
                  <div
                    className={`absolute inset-0 transition-transform duration-300 ${hoverScaleClass} ${zoomOriginClass}`}
                  >
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt={imageAlt}
                        loading="lazy"
                        decoding="async"
                        width={imageWidth}
                        height={imageHeight}
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
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
