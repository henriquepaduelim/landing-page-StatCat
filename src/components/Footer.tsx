import { content } from "../data/content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faAt } from "@fortawesome/free-solid-svg-icons";

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

                <img
                  src={logoUrl}
                  alt={`${content.brand.name} logo`}
                  className="h-32 w-auto object-contain"
                />
              
              
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
            <a
              href={content.footer.contactWhatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abrir conversa no WhatsApp"
              className="mt-3 inline-flex items-center gap-2 rounded-full border border-border/60 bg-surface/70 px-3 py-1.5 text-small font-semibold text-text transition hover:bg-surface"
            >
              <FontAwesomeIcon icon={faWhatsapp} className="text-lg text-[#25D366]" />
              <span>{content.footer.contactWhatsappLabel}</span>
            </a>
            <a
              href={`mailto:${content.footer.contactEmail}`}
              aria-label="Enviar e-mail"
              className="mt-2 inline-flex items-center gap-2 rounded-full border border-border/60 bg-surface/70 px-3 py-1.5 text-small font-semibold text-text transition hover:bg-surface"
            >
              <FontAwesomeIcon icon={faAt} className="text-sm" />
              <span>{content.footer.contactEmailLabel}</span>
            </a>
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
