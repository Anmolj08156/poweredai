import { motion } from "framer-motion";
import { Section, SectionHeading } from "./ui/Section";
import { STEPS } from "../data/content";

export function HowItWorks() {
  return (
    <Section id="how">
      <SectionHeading
        eyebrow={<>How it works</>}
        title={
          <>
            From scattered material to <span className="text-gradient-brand">mastery</span>, in six steps
          </>
        }
        description="A simple, repeatable loop that compounds every time you sit down to study."
      />

      <div className="relative mx-auto mt-16 max-w-5xl">
        {/* connecting line (desktop) */}
        <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/10 to-transparent md:block" />

        <div className="flex flex-col gap-6 md:gap-2">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            const left = i % 2 === 0;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className={`relative flex items-center gap-5 md:w-1/2 ${
                  left ? "md:self-start md:pr-10" : "md:self-end md:flex-row-reverse md:pl-10"
                }`}
              >
                {/* node on the line (desktop) */}
                <span
                  className={`absolute top-1/2 hidden h-3 w-3 -translate-y-1/2 rounded-full bg-brand-500 shadow-glow ring-4 ring-ink md:block ${
                    left ? "right-[-1.7rem]" : "left-[-1.7rem]"
                  }`}
                />

                <div className="surface flex w-full items-start gap-4 p-5">
                  <div className="relative grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-500/20 to-indigo-accent/10 text-brand-300">
                    <Icon className="h-6 w-6" />
                    <span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full border border-white/10 bg-ink text-[11px] font-bold text-white">
                      {i + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-muted">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
