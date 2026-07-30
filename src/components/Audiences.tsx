import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "./ui/Section";
import { StaggerGroup, staggerItem } from "./ui/Reveal";
import { AUDIENCES } from "../data/content";
import { cn } from "../lib/utils";

export function Audiences() {
  return (
    <Section id="audiences">
      <SectionHeading
        eyebrow={<>One platform, every role</>}
        title={
          <>
            Built for every learner <span className="text-gradient-brand">and educator</span>
          </>
        }
        description="Whether you're a student, an educator or an institution, StudNexus adapts to the way you work."
      />

      <StaggerGroup className="mt-14 grid gap-4 md:grid-cols-3">
        {AUDIENCES.map((a) => {
          const Icon = a.icon;
          const isRoute = a.href.startsWith("/");
          const inner = (
            <>
              <div
                className={cn(
                  "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                  a.accent
                )}
              />
              {/* Header band */}
              <div className="relative flex h-32 items-center justify-center overflow-hidden rounded-xl border border-ink-border bg-gradient-to-br from-brand-500/15 via-ink-surface to-ink-card">
                <div className="absolute inset-0 bg-dots opacity-30" />
                <div className="relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-indigo-accent shadow-glow">
                  <Icon className="h-7 w-7 text-white" />
                </div>
              </div>

              <h3 className="relative mt-5 text-lg font-semibold text-neutral-900">{a.title}</h3>
              <p className="relative mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
                {a.description}
              </p>
              <span className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                {a.ctaLabel}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </>
          );

          const className =
            "group surface relative flex h-full flex-col overflow-hidden p-5 transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300";

          return (
            <motion.div key={a.title} variants={staggerItem}>
              {isRoute ? (
                <Link to={a.href} className={className}>
                  {inner}
                </Link>
              ) : (
                <a href={a.href} className={className}>
                  {inner}
                </a>
              )}
            </motion.div>
          );
        })}
      </StaggerGroup>
    </Section>
  );
}
