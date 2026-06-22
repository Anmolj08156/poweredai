import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "./ui/Section";
import { SOLUTION_PILLARS } from "../data/content";

export function Solution() {
  return (
    <Section id="solution">
      <SectionHeading
        eyebrow={<>The StudNexus approach</>}
        title={
          <>
            Everything you need to learn,
            <br className="hidden sm:block" /> finally in <span className="text-gradient-brand">one flow</span>
          </>
        }
        description="StudNexus brings the entire learning loop together — so progress compounds instead of leaking between apps."
      />

      <div className="mt-16">
        <div className="flex flex-col items-stretch gap-4 md:flex-row md:items-center md:justify-center">
          {SOLUTION_PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.label} className="flex flex-1 items-center gap-4 md:flex-col md:gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="surface group flex w-full flex-1 flex-col items-center gap-3 p-6 text-center transition-transform duration-300 hover:-translate-y-1"
                >
                  <div
                    className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${pillar.color} shadow-glow`}
                  >
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <span className="text-base font-semibold text-white">{pillar.label}</span>
                  <span className="text-xs text-ink-soft">Step {i + 1}</span>
                </motion.div>

                {i < SOLUTION_PILLARS.length - 1 && (
                  <ArrowRight className="hidden h-5 w-5 shrink-0 rotate-90 text-ink-soft md:block md:rotate-0" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
