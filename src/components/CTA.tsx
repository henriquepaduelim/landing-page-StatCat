import { useEffect, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { content } from "../data/content";
import Icon from "./Icon";
import { revealUp, softScale } from "../motion/presets";

const buildWhatsappLink = (baseUrl: string, message: string) => {
  try {
    const url = new URL(baseUrl);
    url.searchParams.set("text", message);
    return url.toString();
  } catch {
    const separator = baseUrl.includes("?") ? "&" : "?";
    return `${baseUrl}${separator}text=${encodeURIComponent(message)}`;
  }
};

const CTA = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!submitted) {
      return;
    }

    const timer = window.setTimeout(() => setSubmitted(false), 3000);
    return () => window.clearTimeout(timer);
  }, [submitted]);

  const validate = () => {
    const nextErrors: { name?: string; email?: string } = {};

    if (name.trim().length < 2) {
      nextErrors.name = content.cta.validation.nameRequired;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      nextErrors.email = content.cta.validation.emailInvalid;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const whatsappMessage = `Hello, my name is ${cleanName} and I would like to book a demo. My email is ${cleanEmail}.`;
    const whatsappLink = buildWhatsappLink(content.footer.contactWhatsapp, whatsappMessage);
    const popup = window.open(whatsappLink, "_blank", "noopener,noreferrer");

    if (!popup) {
      window.location.href = whatsappLink;
    }

    setSubmitted(true);
    setName("");
    setEmail("");
  };

  return (
    <section id="cta" className="section-dark py-section">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <motion.div
          className="card relative overflow-hidden"
          variants={softScale(0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="absolute -right-20 -top-24 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-16 left-10 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />
          <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div
              variants={revealUp(0)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <p className="text-small uppercase tracking-[0.2em] text-muted">
                {content.cta.eyebrow}
              </p>
              <h2 className="mt-3 font-display text-headline text-text">
                {content.cta.title}
              </h2>
              <p className="mt-4 text-body text-muted">
                {content.cta.subtitle}
              </p>
              <div className="mt-6 space-y-3 text-small text-muted">
                {content.cta.highlights.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <Icon name="check_circle" className="text-secondary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.form
              className="rounded-xl bg-white/[0.03] p-6"
              onSubmit={handleSubmit}
              noValidate
              variants={revealUp(0.12)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="space-y-4">
                <div>
                  <label className="text-small text-muted" htmlFor="name">
                    {content.cta.form.nameLabel}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="mt-2 w-full rounded-md border-0 border-b border-white/20 bg-transparent px-3 py-2 text-sm"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    required
                  />
                  {errors.name ? (
                    <p id="name-error" className="mt-1 text-xs text-accent">
                      {errors.name}
                    </p>
                  ) : null}
                </div>
                <div>
                  <label className="text-small text-muted" htmlFor="email">
                    {content.cta.form.emailLabel}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="mt-2 w-full rounded-md border-0 border-b border-white/20 bg-transparent px-3 py-2 text-sm"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    required
                  />
                  {errors.email ? (
                    <p id="email-error" className="mt-1 text-xs text-accent">
                      {errors.email}
                    </p>
                  ) : null}
                </div>
                <button type="submit" className="btn-primary w-full">
                  {content.cta.form.submitLabel}
                </button>
                <p className="text-xs text-muted">{content.cta.consent}</p>
              </div>
            </motion.form>
          </div>
        </motion.div>
      </div>

      {submitted ? (
        <div
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-lg border border-white/10 bg-bg-dark/90 px-4 py-3 text-sm text-text shadow-strong backdrop-blur-md"
          role="status"
          aria-live="polite"
        >
          <Icon name="check_circle" className="text-secondary" />
          <span>{content.cta.toast}</span>
        </div>
      ) : null}
    </section>
  );
};

export default CTA;
