import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "./ui/Section";
import { StaggerGroup, staggerItem } from "./ui/Reveal";
import { CATEGORIES } from "../data/content";

export function Categories() {
  return (
    <Section id="categories">
      <SectionHeading
        eyebrow={<>Built for every learner</>}
        title={
          <>
            One platform, tuned to <span className="text-gradient-brand">your goal</span>
          </>
        }
        description="Whatever you're preparing for, StudNexus adapts to the way your field actually demands you learn."
      />

      <StaggerGroup className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          return (
            <motion.button
              key={cat.title}
              variants={staggerItem}
              type="button"
              className="group surface relative flex flex-col items-start overflow-hidden p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
            >
              {/* Glow that follows the brand colour per card */}
              <div
                className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: cat.glow }}
              />
              <ArrowUpRight className="absolute right-4 top-4 h-4 w-4 text-ink-soft opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />

              <div className="relative grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-brand-300 transition-transform duration-300 group-hover:scale-105">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="relative mt-4 text-base font-semibold text-white">{cat.title}</h3>
              <p className="relative mt-1 text-xs leading-relaxed text-ink-soft">{cat.blurb}</p>
            </motion.button>
          );
        })}
      </StaggerGroup>
    </Section>
  );
}
