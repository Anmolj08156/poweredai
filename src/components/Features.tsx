import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Section, SectionHeading } from "./ui/Section";
import { StaggerGroup, staggerItem } from "./ui/Reveal";
import { FEATURES } from "../data/content";
import { cn } from "../lib/utils";

export function Features() {
  return (
    <Section id="features">
      <SectionHeading
        eyebrow={<>Capabilities</>}
        title={
          <>
            An intelligent layer over <span className="text-gradient-brand">everything you study</span>
          </>
        }
        description="Six core capabilities working as one system — built to deepen understanding, not just store notes."
      />

      <StaggerGroup className="mt-14 grid auto-rows-[1fr] gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature, i) => {
          const Icon = feature.icon;
          // Make the first card span two columns on large screens (bento feel)
          const wide = i === 0;
          return (
            <motion.article
              key={feature.title}
              variants={staggerItem}
              className={cn(
                "group surface relative flex flex-col overflow-hidden p-6 transition-all duration-300 hover:border-white/20",
                wide && "lg:col-span-2 lg:flex-row lg:items-center lg:gap-8 lg:p-8",
                feature.advanced && "border-brand-400/30 bg-brand-500/[0.04]"
              )}
            >
              {/* Hover glow */}
              <div
                className={cn(
                  "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                  feature.accent
                )}
              />

              {feature.advanced && (
                <span className="absolute right-4 top-4 z-10 inline-flex items-center gap-1 rounded-full border border-brand-400/30 bg-brand-500/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-brand-200">
                  <Sparkles className="h-3 w-3" />
                  Advanced
                </span>
              )}

              <div className={cn("relative", wide && "lg:max-w-md")}>
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-brand-300 transition-colors group-hover:text-brand-200",
                      feature.advanced && "border-brand-400/30 bg-brand-500/15"
                    )}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-medium text-brand-300/90">{feature.tagline}</span>
                </div>
                <h3 className="mt-5 text-xl font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{feature.description}</p>
              </div>

              {wide && (
                <div className="relative mt-6 flex-1 lg:mt-0">
                  <FeatureMiniViz />
                </div>
              )}
            </motion.article>
          );
        })}
      </StaggerGroup>
    </Section>
  );
}

/** Abstract mini visualization for the headline feature card. */
function FeatureMiniViz() {
  const rows = [
    { w: "92%", label: "lecture-notes.pdf", chip: "Indexed" },
    { w: "76%", label: "chapter-4-summary.pdf", chip: "Linked" },
    { w: "60%", label: "previous-papers.pdf", chip: "Practice" },
  ];
  return (
    <div className="glass rounded-2xl p-4">
      <div className="mb-3 flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/60" />
        <span className="ml-2 text-[11px] text-ink-soft">AI Workspace</span>
      </div>
      <div className="space-y-2.5">
        {rows.map((r, i) => (
          <motion.div
            key={r.label}
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.12 }}
            className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2"
          >
            <div className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-brand-500/15 text-[10px] font-bold text-brand-300">
              PDF
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs text-zinc-200">{r.label}</p>
              <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-brand-500 to-indigo-accent"
                  initial={{ width: 0 }}
                  whileInView={{ width: r.w }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.12, duration: 0.8 }}
                />
              </div>
            </div>
            <span className="shrink-0 rounded-full bg-brand-500/10 px-2 py-0.5 text-[10px] font-medium text-brand-200">
              {r.chip}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
