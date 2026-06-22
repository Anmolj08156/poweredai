import { motion } from "framer-motion";
import { Section, SectionHeading } from "./ui/Section";
import { StaggerGroup, staggerItem } from "./ui/Reveal";
import { PROBLEMS } from "../data/content";

export function Problem() {
  return (
    <Section id="problem">
      <SectionHeading
        eyebrow={<>The current learning experience</>}
        title={
          <>
            Studying today is <span className="text-gradient-brand">broken</span> into
            a dozen disconnected pieces
          </>
        }
        description="Most learners aren't short on effort or material. They're short on a system that turns all of it into real understanding."
      />

      <StaggerGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PROBLEMS.map((p) => {
          const Icon = p.icon;
          return (
            <motion.div
              key={p.title}
              variants={staggerItem}
              className="group surface relative overflow-hidden p-6"
            >
              {/* subtle red-to-transparent hint that this is a "problem" */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-rose-500/[0.04] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative">
                <div className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-rose-300/80">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{p.description}</p>
              </div>
            </motion.div>
          );
        })}

        {/* Closing statement card */}
        <motion.div
          variants={staggerItem}
          className="border-gradient relative flex flex-col justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-brand-500/10 to-indigo-accent/5 p-6"
        >
          <p className="text-lg font-medium leading-snug text-white">
            The result? You feel busy, but rarely in control of what you actually know.
          </p>
          <p className="mt-3 text-sm text-brand-200/80">There's a better way →</p>
        </motion.div>
      </StaggerGroup>
    </Section>
  );
}
