import { content } from "../data/content";
import Icon from "./Icon";

const Features = () => {
  return (
    <section id="features" className="section-dark py-section">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-small uppercase tracking-[0.2em] text-muted">
            {content.features.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-headline text-text">
            {content.features.title}
          </h2>
          <p className="mt-4 text-body text-muted">{content.features.subtitle}</p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div className="space-y-4">
            <p className="text-small uppercase tracking-[0.2em] text-muted">
              {content.features.highlight.eyebrow}
            </p>
            <h3 className="text-title font-semibold text-text sm:text-2xl">
              {content.features.highlight.title}
            </h3>
            <p className="text-body text-muted">
              {content.features.highlight.description}
            </p>
            <ul className="space-y-3 text-small text-muted">
              {content.features.highlight.bullets.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Icon name="check_circle" className="mt-0.5 text-secondary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <figure>
            <div className="overflow-hidden rounded-2xl bg-surface/90 shadow-strong">
              <video
                className="h-full w-full object-cover"
                src={content.features.highlight.video.src}
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                aria-label={content.features.highlight.video.ariaLabel}
              />
            </div>
            <figcaption className="mt-4 text-small text-muted">
              <span className="block text-xs uppercase tracking-[0.2em] text-muted">
                {content.features.highlight.video.label}
              </span>
              <span>{content.features.highlight.video.caption}</span>
            </figcaption>
          </figure>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {content.features.items.map((feature, index) => (
            <div
              key={feature.title}
              className="card animate-fade-up"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Icon name={feature.icon} className="text-2xl" />
              </div>
              <h3 className="mt-4 text-title font-semibold text-text">
                {feature.title}
              </h3>
              <p className="mt-2 text-small text-muted">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
