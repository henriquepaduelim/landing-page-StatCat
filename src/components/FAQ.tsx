import { useState } from "react";
import { motion } from "framer-motion";
import { content } from "../data/content";
import Icon from "./Icon";
import { revealUp, staggerContainer } from "../motion/presets";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-light py-section">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          variants={revealUp(0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <p className="text-small uppercase tracking-[0.2em] text-muted">
            {content.faq.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-headline text-text">
            {content.faq.title}
          </h2>
        </motion.div>
        <motion.div
          className="mt-10 space-y-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {content.faq.items.map((item, index) => {
            const isOpen = openIndex === index;
            const answerId = `faq-answer-${index}`;

            return (
              <motion.div key={item.question} className="card" variants={revealUp(0)}>
                <h3>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 text-left"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() =>
                      setOpenIndex(isOpen ? null : index)
                    }
                  >
                    <span className="text-title font-semibold text-text">
                      {item.question}
                    </span>
                    <Icon
                      name={isOpen ? "remove" : "add"}
                      className="text-xl text-muted"
                    />
                  </button>
                </h3>
                {isOpen ? (
                  <p
                    id={answerId}
                    className="mt-3 text-small text-muted"
                  >
                    {item.answer}
                  </p>
                ) : null}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
