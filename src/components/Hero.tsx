import { motion } from "framer-motion";
import { Sparkles, Star, ArrowRight, PlayCircle } from "lucide-react";
import { HeroVisual } from "./HeroVisual";
import { FEATURE_PILLS } from "../data/content";
import { SITE } from "../lib/config";
import { scrollToId } from "../lib/utils";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-12 sm:pt-36 sm:pb-16">
      <div className="shell">
        <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10">
          {/* Copy */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto flex w-fit items-center gap-2 rounded-full border border-ink-border bg-white px-3 py-1.5 text-xs font-medium text-brand-600 shadow-sm lg:mx-0"
            >
              <Sparkles className="h-3.5 w-3.5 text-brand-500" />
              Your AI Learning OS
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 text-balance text-5xl font-bold leading-[1.03] tracking-tight text-neutral-900 sm:text-6xl md:text-[4.5rem]"
            >
              Your notes.
              <br />
              Understood.
              <br />
              <span className="text-gradient-brand">Mastered.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-6 max-w-lg text-pretty text-base leading-relaxed text-ink-muted sm:text-lg lg:mx-0"
            >
              StudNexus turns any study material into understanding, practice and long-term memory —
              all in one intelligent workspace.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8"
            >
              <div className="flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
                <a href={SITE.appSignup} className="btn-primary group w-full px-6 py-4 text-base sm:w-auto">
                  Start for free
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <button onClick={() => scrollToId("how")} className="btn-ghost w-full px-6 py-4 text-base sm:w-auto">
                  <PlayCircle className="h-4 w-4 text-brand-500" />
                  See it in action
                </button>
              </div>

              <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row lg:items-center lg:justify-start">
                <div className="flex -space-x-2">
                  {["#ec8b0d", "#f5a623", "#d97706", "#c66f0a"].map((c, i) => (
                    <span
                      key={i}
                      className="h-8 w-8 rounded-full border-2 border-ink"
                      style={{ background: `linear-gradient(135deg, ${c}, #7c450f)` }}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2 text-sm text-ink-muted">
                  <span className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-brand-500 text-brand-500" />
                    ))}
                  </span>
                  <span>Loved by <span className="font-semibold text-neutral-900">500+</span> early learners</span>
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
              className="inline-flex items-center gap-2 rounded-xl border border-ink-border bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 shadow-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              {pill}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
