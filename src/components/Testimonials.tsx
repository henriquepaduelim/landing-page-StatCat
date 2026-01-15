import { content } from "../data/content";

const Testimonials = () => {
  return (
    <section id="testimonials" className="section-dark py-section">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-small uppercase tracking-[0.2em] text-text">
            {content.testimonials.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-headline text-text">
            {content.testimonials.title}
          </h2>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {content.testimonials.items.map((testimonial) => (
            <figure key={testimonial.name} className="card">
              <blockquote className="text-body text-muted">
                "{testimonial.quote}"
              </blockquote>
              <figcaption className="mt-4 text-small font-semibold text-muted">
                <span>{testimonial.name}</span>
                <span className="block">{testimonial.role}</span>
                <span className="block">{testimonial.location}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
