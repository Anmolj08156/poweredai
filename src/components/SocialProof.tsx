import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Section } from "./ui/Section";
import { StaggerGroup, staggerItem } from "./ui/Reveal";
import { Counter } from "./ui/Counter";
import { METRICS } from "../data/content";

const TESTIMONIALS = [
  {
    quote:
      "It finally feels like my notes, my doubts and my revision live in the same brain. I stopped losing things between apps.",
    name: "Ishaan R.",
    role: "GATE CSE Aspirant",
  },
  {
    quote:
      "The practice questions it generates from my own material are scarily good. My weak topics surfaced in week one.",
    name: "Sneha K.",
    role: "NEET PG",
  },
  {
    quote:
      "For UPSC the syllabus is endless. StudNexus is the first thing that made it feel structured instead of suffocating.",
    name: "Arjun M.",
    role: "UPSC 2026",
  },
];

export function SocialProof() {
  return (
    <Section id="proof">
      {/* Metrics */}
      <StaggerGroup className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {METRICS.map((m) => {
          const Icon = m.icon;
          return (
            <motion.div
              key={m.label}
              variants={staggerItem}
              className="surface flex flex-col items-center gap-2 p-6 text-center"
            >
              <div className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-brand-300">
                <Icon className="h-5 w-5" />
              </div>
              <div className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                <Counter value={m.value} suffix={m.suffix} />
              </div>
              <p className="text-xs text-ink-muted">{m.label}</p>
            </motion.div>
          );
        })}
      </StaggerGroup>

      {/* Testimonials */}
      <StaggerGroup className="mt-6 grid gap-4 md:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <motion.figure
            key={t.name}
            variants={staggerItem}
            className="surface flex flex-col p-6"
          >
            <Quote className="h-6 w-6 text-brand-400/60" />
            <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-zinc-200">
              "{t.quote}"
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-indigo-accent text-xs font-bold text-white">
                {t.name.charAt(0)}
              </span>
              <span>
                <span className="block text-sm font-semibold text-white">{t.name}</span>
                <span className="block text-xs text-ink-soft">{t.role}</span>
              </span>
            </figcaption>
          </motion.figure>
        ))}
      </StaggerGroup>

      <p className="mt-6 text-center text-xs text-ink-soft">
        * Figures reflect our private beta so far and update as we onboard more learners.
      </p>
    </Section>
  );
}
