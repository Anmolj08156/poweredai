import { motion } from "framer-motion";
import { Sparkles, Star, ArrowUpRight } from "lucide-react";
import { WaitlistForm } from "./ui/WaitlistForm";
import { HeroVisual } from "./HeroVisual";
import { SITE } from "../lib/config";
import { openDemoModal } from "./DemoModal";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
      {/* Top spotlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[40rem] bg-[radial-gradient(60%_50%_at_50%_0%,rgba(236,139,13,0.18),transparent_70%)]" />

      <div className="shell">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          {/* Copy */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-ink-muted backdrop-blur lg:mx-0"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
              </span>
              Early access is now open
              <span className="text-ink-soft">·</span>
              <span className="text-gradient-brand">One Platform. Every Learner.</span>
            </motion.div>

            <motion.a
              href={SITE.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="group mx-auto mt-3 flex w-fit items-center gap-1.5 text-xs text-ink-soft transition-colors hover:text-zinc-300 lg:mx-0"
            >
              A product of
              <span className="font-medium text-zinc-300 group-hover:text-white">{SITE.company}</span>
              <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.a>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 font-display text-balance text-6xl font-bold leading-[1.04] tracking-tight sm:text-7xl md:text-[5.25rem]"
            >
              <span className="text-gradient-brand">StudNexus</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="mt-3 font-display text-balance text-2xl font-medium italic leading-tight text-gradient sm:text-3xl md:text-4xl"
            >
              The AI-Powered Learning Operating System
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-ink-muted sm:text-lg lg:mx-0"
            >
              StudNexus helps learners understand, practice and retain knowledge with AI — and
              gives educators & creators a home to publish, share and grow their notes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-8 max-w-xl lg:mx-0"
            >
              <WaitlistForm size="lg" />

              <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row lg:items-start">
                <button onClick={openDemoModal} className="btn-ghost w-full sm:w-auto">
                  <Sparkles className="h-4 w-4 text-brand-400" />
                  Book a Demo
                </button>
                <div className="flex items-center gap-2 text-sm text-ink-muted">
                  <div className="flex -space-x-2">
                    {["#ec8b0d", "#f5a623", "#d97706", "#c66f0a"].map((c, i) => (
                      <span
                        key={i}
                        className="h-7 w-7 rounded-full border-2 border-ink bg-gradient-to-br"
                        style={{ background: `linear-gradient(135deg, ${c}, #241910)` }}
                      />
                    ))}
                  </div>
                  <span>
                    <span className="font-semibold text-white">500+</span> learners on the list
                  </span>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-ink-soft lg:justify-start">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-brand-400 text-brand-400" />
                ))}
                <span className="ml-1">Loved by early testers across 20+ campuses</span>
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
      </div>
    </section>
  );
}
