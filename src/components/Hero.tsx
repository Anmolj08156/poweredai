import { motion } from "framer-motion";
import { Sparkles, Star, ArrowRight } from "lucide-react";
import { HeroVisual } from "./HeroVisual";
import { FEATURE_PILLS } from "../data/content";
import { SITE } from "../lib/config";
import { scrollToId } from "../lib/utils";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-12 sm:pt-36 sm:pb-16">
      {/* Top spotlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[40rem] bg-[radial-gradient(60%_50%_at_50%_0%,rgba(236,139,13,0.18),transparent_70%)]" />

      <div className="shell">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          {/* Copy */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto flex w-fit items-center gap-2 rounded-full border border-brand-400/20 bg-brand-500/[0.08] px-3 py-1.5 text-xs font-medium text-brand-200 backdrop-blur lg:mx-0"
            >
              <Sparkles className="h-3.5 w-3.5 text-brand-400" />
              Your AI Learning OS
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 font-display text-balance text-5xl font-bold leading-[1.02] tracking-tightest sm:text-6xl md:text-[4.5rem]"
            >
              <span className="text-gradient">Learn Smarter.</span>
              <br />
              <span className="text-gradient-brand">Master Anything.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-ink-muted sm:text-lg lg:mx-0"
            >
              The all-in-one AI platform that helps you organize notes, chat with PDFs, generate
              quizzes, plan your studies and truly understand — faster.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8"
            >
              <div className="flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
                <a href={SITE.app} className="btn-primary group w-full px-6 py-4 text-base sm:w-auto">
                  Start Free
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <button onClick={() => scrollToId("features")} className="btn-ghost w-full px-6 py-4 text-base sm:w-auto">
                  Explore Features
                </button>
              </div>

              <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row lg:items-center lg:justify-start">
                <div className="flex -space-x-2">
                  {["#ec8b0d", "#f5a623", "#d97706", "#c66f0a"].map((c, i) => (
                    <span
                      key={i}
                      className="h-8 w-8 rounded-full border-2 border-ink"
                      style={{ background: `linear-gradient(135deg, ${c}, #241910)` }}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2 text-sm text-ink-muted">
                  <span className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-brand-400 text-brand-400" />
                    ))}
                  </span>
                  <span>
                    <span className="font-semibold text-white">4.9/5</span> from 500+ early learners
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <HeroVisual />
          </motion.div>
        </div>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-wrap items-center justify-center gap-2.5 sm:mt-16"
        >
          {FEATURE_PILLS.map((pill) => (
            <span
              key={pill}
              className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-zinc-200 backdrop-blur"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
              {pill}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
