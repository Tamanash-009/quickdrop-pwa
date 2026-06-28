import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { faqData } from "../data";

export default function FAQ() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section
      id="faq"
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-surface/40"
    >
      {/* Visual glowing blobs */}
      <div className="absolute top-[30%] left-[-10%] w-[350px] aspect-square rounded-full bg-primary/5 blur-[100px]" />
      <div className="absolute bottom-[20%] right-[-10%] w-[400px] aspect-square rounded-full bg-brand-cyan/5 blur-[110px]" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-3.5 py-1 rounded-full bg-primary/10 text-[11px] font-mono tracking-widest font-bold uppercase text-primary inline-flex items-center gap-1.5 mb-4"
          >
            <span>Answering Questions</span>
          </motion.div>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-on-surface tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base md:text-lg text-on-surface-variant">
            Learn more about our shipping logistics, product safety measures, and flat-rate pricing.
          </p>
        </div>

        {/* Accordion Layout list */}
        <div className="flex flex-col gap-4 text-left">
          {faqData.map((faq, index) => {
            const isExpanded = expandedId === faq.id;

            return (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                key={faq.id}
                className="rounded-2xl glass border-white/60 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Accordion Button Toggle header */}
                <button
                  onClick={() => toggleExpand(faq.id)}
                  className="w-full p-6 flex items-center justify-between text-left gap-4 focus:outline-none cursor-pointer select-none"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-primary/5 text-primary flex items-center justify-center shrink-0">
                      <HelpCircle size={16} />
                    </div>
                    <span className="font-display font-bold text-base md:text-lg text-on-surface group-hover:text-primary transition-colors">
                      {faq.question}
                    </span>
                  </div>

                  {/* Rotating Chevron marker */}
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-8 h-8 rounded-full bg-on-surface/5 text-on-surface-variant flex items-center justify-center shrink-0"
                  >
                    <ChevronDown size={16} />
                  </motion.div>
                </button>

                {/* Expanded Answer body */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-1 text-sm md:text-base text-on-surface-variant leading-relaxed border-t border-outline bg-surface/20">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
