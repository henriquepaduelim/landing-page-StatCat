import { content } from "../data/content";

const canadaFlagUrl = new URL("../../ca.svg", import.meta.url).href;

const TrustLine = () => {
  const trustLineText = `${content.hero.trustLine.primary} ${content.hero.trustLine.secondary}`;

  return (
    <div className="marquee trustline h-10 border-y border-white/10 bg-bg-deep text-white">
      <span className="sr-only">{trustLineText}</span>
      <div className="marquee-track" aria-hidden="true">
        <span className="flex items-center gap-6 px-6 text-xs uppercase tracking-[0.32em] text-white">
          <span>{content.hero.trustLine.primary}</span>
          <img src={canadaFlagUrl} alt="" aria-hidden="true" className="h-4 w-auto" />
          <span>{content.hero.trustLine.secondary}</span>
        </span>
      </div>
    </div>
  );
};

export default TrustLine;
