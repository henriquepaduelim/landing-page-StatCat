import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { content } from "../data/content";
import Icon from "./Icon";
import { revealUp, staggerContainer } from "../motion/presets";

const HowItWorks = () => {
  const reduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveStep((current) => (current + 1) % content.howItWorks.steps.length);
    }, 2200);

    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  const highlightedStep = hoveredStep ?? activeStep;

  return (
    <section id="how-it-works" className="section-light py-section">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          variants={revealUp(0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <p className="text-small uppercase tracking-[0.2em] text-muted">
            {content.howItWorks.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-headline text-text">
            {content.howItWorks.title}
          </h2>
        </motion.div>
        <motion.div
          className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {content.howItWorks.steps.map((step, index) => (
            <motion.article
              key={step.title}
              className="card group relative min-h-[220px] overflow-hidden bg-transparent p-0"
              variants={revealUp(index * 0.08)}
              onHoverStart={() => setHoveredStep(index)}
              onHoverEnd={() => setHoveredStep(null)}
              onTap={() => setActiveStep(index)}
              whileHover={
                reduceMotion
                  ? undefined
                  : { y: -7, scale: 1.015, transition: { duration: 0.28 } }
              }
              whileTap={reduceMotion ? undefined : { scale: 0.992 }}
              animate={
                reduceMotion
                  ? undefined
                  : highlightedStep === index
                    ? {
                        y: -4,
                        boxShadow:
                          "0 18px 34px rgba(0,0,0,0.22), 0 0 0 1px rgba(129,27,33,0.24)",
                      }
                    : {
                        y: 0,
                        boxShadow: "0 8px 18px rgba(0,0,0,0.14)",
                      }
              }
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-slate-900/55 via-slate-800/45 to-slate-900/60"
                animate={
                  reduceMotion
                    ? undefined
                    : highlightedStep === index
                      ? { opacity: [0.82, 1, 0.82] }
                      : { opacity: 0.88 }
                }
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="star-surface absolute inset-0 opacity-60" />
              <motion.div
                className="absolute -right-12 -top-16 h-36 w-36 rounded-full bg-primary/18 blur-3xl"
                animate={
                  reduceMotion
                    ? undefined
                    : highlightedStep === index
                      ? { scale: [1, 1.18, 1], opacity: [0.5, 0.8, 0.5] }
                      : { scale: 1, opacity: 0.45 }
                }
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -bottom-14 left-10 h-28 w-28 rounded-full bg-accent/18 blur-3xl"
                animate={
                  reduceMotion
                    ? undefined
                    : highlightedStep === index
                      ? { scale: [1, 1.25, 1], opacity: [0.45, 0.72, 0.45] }
                      : { scale: 1, opacity: 0.4 }
                }
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent opacity-85 md:opacity-75" />
              <motion.div
                className="absolute left-0 top-0 h-[2px] w-24 bg-gradient-to-r from-transparent via-brand-accent to-transparent"
                animate={
                  reduceMotion
                    ? undefined
                    : highlightedStep === index
                      ? { x: ["-40%", "240%"], opacity: [0, 0.95, 0] }
                      : { opacity: 0 }
                }
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  repeatDelay: 0.35,
                  ease: "easeInOut",
                }}
              />
              <div className="relative z-10 flex h-full flex-col justify-between p-6 text-white/90">
                <div className="flex items-center justify-between">
                  <motion.div
                    className="grid h-11 w-11 place-items-center rounded-md bg-white/10 text-white"
                    animate={
                      reduceMotion
                        ? undefined
                        : highlightedStep === index
                          ? { scale: [1, 1.08, 1], rotate: [0, -4, 0] }
                          : { scale: 1, rotate: 0 }
                    }
                    transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Icon name={step.icon} className="text-2xl leading-none" />
                  </motion.div>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                    {content.howItWorks.stepLabel} {index + 1}
                  </span>
                </div>
                <div>
                  <h3 className="mt-4 text-lg font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/80">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
