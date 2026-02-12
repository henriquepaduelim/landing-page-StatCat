import { useEffect } from "react";
import Footer from "../components/Footer";
import Icon from "../components/Icon";
import { content } from "../data/content";

const logoUrl = "/media/STATCATSports-logo-design.webp";

const setMeta = (key: "name" | "property", value: string, metaContent: string) => {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${key}="${value}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(key, value);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", metaContent);
};

const setCanonical = (href: string) => {
  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }
  canonical.setAttribute("href", href);
};

const setJsonLd = (id: string, payload: object) => {
  let script = document.head.querySelector<HTMLScriptElement>(`script[data-seo-id="${id}"]`);
  if (!script) {
    script = document.createElement("script");
    script.setAttribute("type", "application/ld+json");
    script.dataset.seoId = id;
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(payload);
};

const TeamSnapAlternativePage = () => {
  useEffect(() => {
    const title = "TeamSnap Alternative | StatCat Sports for Football Clubs";
    const description =
      "Looking for a TeamSnap alternative? StatCat Sports gives football clubs a branded app with athlete development tracking, report cards, scheduling, and family communication.";
    const url = "https://www.statcatsports.net/teamsnap-alternative";

    document.title = title;
    setMeta("name", "description", description);
    setMeta(
      "name",
      "keywords",
      "teamsnap alternative, teamsnap alternatives, football club app, sports team management software, athlete development tracking"
    );
    setMeta("property", "og:type", "website");
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", "https://www.statcatsports.net/media/STATCATSports-logo-design.webp");
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", "https://www.statcatsports.net/media/STATCATSports-logo-design.webp");
    setCanonical(url);

    setJsonLd("teamsnap-alternative-software", {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title,
      description,
      url,
      mainEntity: {
        "@type": "SoftwareApplication",
        name: "StatCat Sports",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
      },
    });
  }, []);

  return (
    <div className="page-bg min-h-screen text-text">
      <header className="site-header section-dark border-b border-border/40">
        <div className="mx-auto flex max-w-content items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <a href="/" className="flex items-center">
            <img
              src={logoUrl}
              alt={`${content.brand.name} logo`}
              className="h-10 w-auto object-contain sm:h-12"
            />
          </a>
          <a href="#cta" className="btn-primary">
            Book a demo
          </a>
        </div>
      </header>

      <main>
        <section className="section-dark py-section">
          <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
            <p className="text-small uppercase tracking-[0.2em] text-muted">Comparison</p>
            <h1 className="mt-3 max-w-4xl font-display text-display text-text">
              TeamSnap Alternative for Football Clubs That Need Real Development Tracking
            </h1>
            <p className="mt-5 max-w-3xl text-body text-muted">
              StatCat Sports is a TeamSnap alternative built for clubs that want a branded app,
              athlete development tracking, report cards, scheduling, and family communication in one
              platform.
            </p>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <div className="card">
                <h2 className="text-title font-semibold text-text">Why clubs switch from TeamSnap</h2>
                <ul className="mt-4 grid gap-3 text-small text-muted">
                  <li className="flex items-start gap-2">
                    <Icon name="check_circle" className="mt-0.5 text-secondary" />
                    <span>Track athlete development across sessions and seasons</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="check_circle" className="mt-0.5 text-secondary" />
                    <span>Share clear report cards with athletes and parents</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="check_circle" className="mt-0.5 text-secondary" />
                    <span>Run communication, approvals, and schedules in one place</span>
                  </li>
                </ul>
              </div>
              <div className="card">
                <h2 className="text-title font-semibold text-text">What StatCat adds</h2>
                <ul className="mt-4 grid gap-3 text-small text-muted">
                  <li className="flex items-start gap-2">
                    <Icon name="star" className="mt-0.5 text-secondary" />
                    <span>Your own club-branded app (name, logo, and colors)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="star" className="mt-0.5 text-secondary" />
                    <span>Canadian support and onboarding for program launches</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="star" className="mt-0.5 text-secondary" />
                    <span>Built for football program workflows, not generic team chat</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="section-light py-section">
          <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-headline text-text">
              TeamSnap vs StatCat at a Glance
            </h2>
            <p className="mt-3 max-w-3xl text-body text-muted">
              If you are searching for TeamSnap alternatives, this is usually the difference clubs care
              about most: communication alone versus communication plus measurable development.
            </p>
            <div className="mt-8 overflow-x-auto rounded-xl border border-border/70 bg-surface shadow-soft">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead className="bg-surface">
                  <tr className="border-b border-border/70">
                    <th className="px-5 py-4 font-semibold text-text">Capability</th>
                    <th className="px-5 py-4 font-semibold text-text">StatCat Sports</th>
                    <th className="px-5 py-4 font-semibold text-text">TeamSnap-style workflow</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/60">
                    <td className="px-5 py-4 text-muted">Club branding</td>
                    <td className="px-5 py-4 text-text">Your own branded app</td>
                    <td className="px-5 py-4 text-muted">Limited branding focus</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="px-5 py-4 text-muted">Athlete development tracking</td>
                    <td className="px-5 py-4 text-text">Session-to-season history</td>
                    <td className="px-5 py-4 text-muted">Basic team management focus</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="px-5 py-4 text-muted">Report cards for families</td>
                    <td className="px-5 py-4 text-text">Built-in report card flows</td>
                    <td className="px-5 py-4 text-muted">Usually external tools</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-4 text-muted">Canadian onboarding support</td>
                    <td className="px-5 py-4 text-text">Yes</td>
                    <td className="px-5 py-4 text-muted">Varies</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="cta" className="section-dark py-section">
          <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
            <div className="card">
              <h2 className="font-display text-headline text-text">
                Looking for a TeamSnap alternative for your club?
              </h2>
              <p className="mt-3 max-w-2xl text-body text-muted">
                Talk to us and we will show how StatCat can replace scattered tools with one branded
                platform for development, communication, and reporting.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={content.footer.contactWhatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Talk on WhatsApp
                </a>
                <a href={`mailto:${content.footer.contactEmail}`} className="btn-outline">
                  Email us
                </a>
                <a href="/" className="btn-outline">
                  Back to homepage
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TeamSnapAlternativePage;
