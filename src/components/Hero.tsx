import type { MouseEvent } from "react";
import { motion } from "framer-motion";
import { content } from "../data/content";
import Icon from "./Icon";
import ReportCardBadge from "./ReportCardBadge";
import { smoothScrollToId } from "../utils/smoothScroll";
import { floatingTransition, revealUp, softScale } from "../motion/presets";

const Hero = () => {
  const handleScroll = (id: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    smoothScrollToId(id, 136);
  };

  return (
    <section id="hero" className="hero-section section-dark relative overflow-hidden">
      <div className="mx-auto grid max-w-content gap-20 px-4 py-hero sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8">
        <motion.div
          variants={revealUp(0.12)}
          initial="hidden"
          animate="visible"
          className="space-y-6 px-1 py-2 sm:px-2"
        >
          <h1 className="font-display text-display font-extrabold tracking-[-0.03em] text-text">
            {content.hero.headline}
          </h1>
          <p className="max-w-[65ch] text-title font-semibold text-muted">
            {content.hero.supportLine}
          </p>
          <p className="max-w-[65ch] text-body leading-relaxed text-muted">
            {content.hero.subheadline}
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#cta" onClick={handleScroll("cta")} className="btn-primary">
              {content.hero.primaryCta}
            </a>
            <a
              href="#how-it-works"
              onClick={handleScroll("how-it-works")}
              className="btn-outline"
            >
              {content.hero.secondaryCta}
            </a>
          </div>
          <ul className="grid gap-3 text-small text-muted sm:grid-cols-2">
            {content.hero.highlights.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <Icon name="check_circle" className="mt-0.5 text-secondary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          variants={softScale(0.22)}
          initial="hidden"
          animate="visible"
          className="relative flex justify-center"
        >
          <motion.div
            animate={{ y: [0, -8] }}
            transition={floatingTransition}
            className="w-full max-w-[440px]"
          >
            <ReportCardBadge
              photoSrc={content.hero.preview.video.src}
              photoAlt={content.hero.preview.video.label}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
