import { content } from "../data/content";
import Icon from "./Icon";

const UseCases = () => {
  return (
    <section id="use-cases" className="section-dark py-section">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-small uppercase tracking-[0.2em] text-muted">
            {content.useCases.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-headline text-text">
            {content.useCases.title}
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-body text-muted">
            {content.useCases.subtitle}
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {content.useCases.items.map((item, index) => (
            <div
              key={item.title}
              className="card animate-fade-up"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <div className="flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center text-accent">
                  <Icon name={item.icon} className="text-4xl leading-none" />
                </div>
              </div>
              <h3 className="mt-6 text-title font-semibold text-text text-center">
                {item.title}
              </h3>
              <p className="mt-2 text-small text-muted">{item.description}</p>
              <ul className="mt-4 space-y-2 text-small text-muted">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2">
                    <Icon name="check" className="mt-0.5 text-secondary" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
