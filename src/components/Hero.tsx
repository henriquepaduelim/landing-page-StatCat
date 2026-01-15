import type { MouseEvent } from "react";
import { content } from "../data/content";
import Icon from "./Icon";
import ReportCardBadge from "./ReportCardBadge";
import { smoothScrollToId } from "../utils/smoothScroll";

const canadaFlagUrl = new URL("../../ca.svg", import.meta.url).href;

const Hero = () => {
  const handleScroll = (id: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    smoothScrollToId(id, 136);
  };

  const trustLineText = `${content.hero.trustLine.primary} ${content.hero.trustLine.secondary}`;

  return (
    <section id="hero" className="section-dark relative overflow-hidden">
      <div className="marquee trustline h-10 border-b border-white/10 bg-black text-white">
        <span className="sr-only">{trustLineText}</span>
        <div className="marquee-track" aria-hidden="true">
          <span className="flex items-center gap-6 px-6 text-xs uppercase tracking-[0.32em] text-white">
            <span>{content.hero.trustLine.primary}</span>
            <img
              src={canadaFlagUrl}
              alt=""
              aria-hidden="true"
              className="h-4 w-auto"
            />
            <span>{content.hero.trustLine.secondary}</span>
          </span>
        </div>
      </div>
      <div className="mx-auto grid max-w-content gap-16 px-4 py-hero sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8">
        <div className="space-y-6 animate-fade-up">
          <h1 className="font-display text-display text-text">
            {content.hero.headline}
          </h1>
          <p className="max-w-2xl text-body text-muted">{content.hero.subheadline}</p>
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
        </div>

        <div className="relative flex justify-center animate-fade-in">
          <ReportCardBadge
            photoSrc={content.hero.preview.video.src}
            photoAlt={content.hero.preview.video.label}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
