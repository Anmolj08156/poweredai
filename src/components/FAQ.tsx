import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { Section, SectionHeading } from "./ui/Section";
import { FAQS } from "../data/content";
import { cn } from "../lib/utils";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq">
      <SectionHeading
        eyebrow={<>FAQ</>}
        title={<>Questions, answered</>}
        description="Everything you might want to know before you join. Still curious? Email anmol@datasmithlabs.com."
      />

      <div className="mx-auto mt-12 max-w-3xl">
        <div className="divide-y divide-white/[0.06] overflow-hidden rounded-2xl border border-ink-border bg-ink-card">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-white/[0.02] sm:px-6"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-medium text-white sm:text-lg">{item.q}</span>
                  <span
                    className={cn(
                      "grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/10 text-ink-muted transition-all duration-300",
                      isOpen && "rotate-45 border-brand-400/40 bg-brand-500/10 text-brand-300"
                    )}
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed text-ink-muted sm:px-6 sm:text-[15px]">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
