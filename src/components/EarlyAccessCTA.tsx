import { motion } from "framer-motion";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { SITE } from "../lib/config";
import { openDemoModal } from "./DemoModal";

const PERKS = ["Free to start", "No credit card needed", "AI-powered & private"];

export function EarlyAccessCTA() {
  return (
    <section id="early-access" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="shell">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="border-gradient relative overflow-hidden rounded-4xl bg-ink-card px-6 py-14 sm:px-12 sm:py-20"
        >
          {/* Decorative glows */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-brand-500/25 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-indigo-accent/20 blur-[100px]" />
          <div className="pointer-events-none absolute inset-0 bg-dots opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

          <div className="relative mx-auto max-w-2xl text-center">
            <span className="eyebrow mx-auto">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
              Start in seconds
            </span>
            <h2 className="mt-5 font-display text-balance text-3xl font-bold tracking-tight text-gradient sm:text-5xl">
              Ready to learn smarter?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-base text-ink-muted sm:text-lg">
              Bring your notes, PDFs and syllabus into one AI workspace — and start understanding
              more in less time. It's free to get going.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={SITE.app} className="btn-primary group w-full px-6 py-4 text-base sm:w-auto">
                Get Started Free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <button
                onClick={openDemoModal}
                className="btn-ghost w-full px-6 py-4 text-base sm:w-auto"
              >
                <Sparkles className="h-4 w-4 text-brand-400" />
                Book a Demo
              </button>
            </div>

            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              {PERKS.map((perk) => (
                <li key={perk} className="flex items-center gap-2 text-sm text-zinc-300">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-500/15 text-emerald-400">
                    <Check className="h-3 w-3" />
                  </span>
                  {perk}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
