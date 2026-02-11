import { content } from "../data/content";

const logoUrl = "/media/STATCATSports-logo-design.png";

const Footer = () => {
  const year = new Date().getFullYear().toString();
  const copyrightLine = content.footer.copyrightTemplate
    .replace("{year}", year)
    .replace("{brand}", content.brand.name)
    .replace("{rights}", content.footer.copyright);

  return (
    <footer className="border-t border-border bg-surface/80">
      <div className="mx-auto max-w-content px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr_0.8fr]">
          <div>
            <div className="flex items-center gap-3 font-display text-lg font-semibold">
              <span className="flex h-18 w-18 items-center justify-center rounded-full bg-black">
                <img
                  src={logoUrl}
                  alt={`${content.brand.name} logo`}
                  className="h-14 w-auto object-contain"
                />
              </span>
              <span>{content.brand.logoText}</span>
            </div>
            <p className="mt-3 text-small text-muted">{content.brand.tagline}</p>
            <p className="mt-4 text-small text-muted">{content.footer.line}</p>
          </div>
          <div>
            <p className="text-small uppercase tracking-[0.2em] text-muted">
              {content.footer.linksHeading}
            </p>
            <ul className="mt-3 space-y-2 text-small text-muted">
              {content.footer.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="transition hover:text-text">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-small uppercase tracking-[0.2em] text-muted">
              {content.footer.contactHeading}
            </p>
            <p className="mt-3 text-small text-muted">
              {content.footer.contactLabel}:{" "}
              <a href={`mailto:${content.footer.contactEmail}`}>
                {content.footer.contactEmail}
              </a>
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 border-t border-border/70 pt-6 text-xs text-muted">
          <span>
            {copyrightLine}
          </span>
          <span>{content.footer.proudBadge}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
