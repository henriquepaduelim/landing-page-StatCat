import { content } from "../data/content";
import Icon from "./Icon";

const Testimonials = () => {
  return (
    <section id="testimonials" className="section-dark py-section">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-small uppercase tracking-[0.2em] text-muted">
            {content.testimonials.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-headline text-text">
            {content.testimonials.title}
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-body text-muted">
            {content.testimonials.subtitle}
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <article className="card">
            <h3 className="text-title font-semibold text-text">{content.testimonials.before.title}</h3>
            <ul className="mt-4 space-y-3 text-small text-muted">
              {content.testimonials.before.items.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Icon name="remove_circle" className="mt-0.5 text-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="card">
            <h3 className="text-title font-semibold text-text">{content.testimonials.after.title}</h3>
            <ul className="mt-4 space-y-3 text-small text-muted">
              {content.testimonials.after.items.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Icon name="check_circle" className="mt-0.5 text-secondary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-10">
          <h3 className="text-title font-semibold text-text">{content.testimonials.evidenceTitle}</h3>
          <div className="mt-4 grid gap-6 md:grid-cols-3">
            {content.testimonials.evidenceItems.map((item) => (
              <article key={item.title} className="card-muted overflow-hidden p-0">
                <div className="relative h-44 overflow-hidden bg-bg">
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white">
                    {item.tag}
                  </span>
                </div>
                <div className="p-5">
                  <h4 className="text-base font-semibold text-text">{item.title}</h4>
                  <p className="mt-2 text-small text-muted">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
