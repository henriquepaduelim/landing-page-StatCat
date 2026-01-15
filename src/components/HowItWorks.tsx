import { content } from "../data/content";
import Icon from "./Icon";

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="section-light py-section">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-small uppercase tracking-[0.2em] text-muted">
            {content.howItWorks.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-headline text-text">
            {content.howItWorks.title}
          </h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {content.howItWorks.steps.map((step, index) => (
            <div
              key={step.title}
              className="card animate-fade-up"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <div className="flex items-center justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-md bg-secondary/10 text-secondary">
                  <Icon name={step.icon} className="text-2xl leading-none" />
                </div>
                <span className="text-sm font-semibold text-muted">
                  {content.howItWorks.stepLabel} {index + 1}
                </span>
              </div>
              <h3 className="mt-4 text-title font-semibold text-text">
                {step.title}
              </h3>
              <p className="mt-2 text-small text-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
