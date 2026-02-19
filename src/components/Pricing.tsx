import { motion } from "framer-motion";
import { content } from "../data/content";
import PricingCalculator from "./pricing/PricingCalculator";
import { revealUp, staggerContainer } from "../motion/presets";

const Pricing = () => {
  const { pricing } = content;

  return (
    <section id="pricing" className="section-light py-section">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div className="mb-8 h-px w-full bg-gradient-to-r from-transparent via-border/60 to-transparent" />
        <motion.div
          className="text-center"
          variants={revealUp(0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <p className="text-small uppercase tracking-[0.2em] text-muted">
            {pricing.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-headline text-text">
            {pricing.title}
          </h2>
          <p className="mx-auto mt-4 max-w-prose text-body text-muted">
            {pricing.subtitle}
          </p>
          {pricing.subtitleNote ? (
            <p className="mx-auto mt-2 max-w-prose text-small text-muted">
              {pricing.subtitleNote}
            </p>
          ) : null}
        </motion.div>

        <motion.div
          className="mt-6 flex justify-center"
          variants={revealUp(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="rounded-pill bg-white/[0.08] px-5 py-2 text-xs font-semibold text-text">
            {pricing.callout}
          </div>
        </motion.div>

        <motion.div
          className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div className="card" variants={revealUp(0)}>
            <p className="text-small uppercase tracking-[0.2em] text-muted">
              {pricing.setupFee.eyebrow}
            </p>
            <h3 className="mt-3 text-title font-semibold text-text">
              {pricing.setupFee.label}
            </h3>
            <p className="mt-2 text-small text-muted">
              {pricing.setupFee.description}
            </p>
            <ul className="mt-4 space-y-2 text-small text-muted">
              {pricing.setupFee.bullets.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-[0.45rem] inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-secondary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs font-semibold text-text">
              {pricing.setupFee.note}
            </p>
          </motion.div>

          <motion.div className="card" variants={revealUp(0.08)}>
            <p className="text-small uppercase tracking-[0.2em] text-muted">
              {pricing.idealFor.title}
            </p>
            <ul className="mt-4 space-y-2 text-small text-muted">
              {pricing.idealFor.bullets.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-[0.45rem] inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div className="card" variants={revealUp(0.16)}>
            <p className="text-small uppercase tracking-[0.2em] text-muted">
              {pricing.addonsLabel}
            </p>
            <ul className="mt-4 space-y-2 text-small text-muted">
              {pricing.addons.map((addon) => (
                <li key={addon} className="flex items-start gap-2">
                  <span className="mt-[0.45rem] inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-secondary" />
                  <span>{addon}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
        <motion.div
          className="mt-8"
          variants={revealUp(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <PricingCalculator />
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
