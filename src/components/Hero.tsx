import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  PlayCircle,
  Sparkles,
  PenLine,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { SITE } from "../lib/config";
import { scrollToId } from "../lib/utils";
import { cn } from "../lib/utils";

const SHOTS = [
  { src: "/app/dashboard.webp", thumb: "/app/dashboard-thumb.webp", label: "Your Command Center" },
  { src: "/app/ai-classroom.webp", thumb: "/app/ai-classroom-thumb.webp", label: "AI Classroom", badge: "NEW" },
  { src: "/app/ai-workspace.webp", thumb: "/app/ai-workspace-thumb.webp", label: "AI Workspace" },
  { src: "/app/quiz.webp", thumb: "/app/quiz-thumb.webp", label: "Quiz & Mock Tests" },
  { src: "/app/study-planner.webp", thumb: "/app/study-planner-thumb.webp", label: "Study Planner" },
  { src: "/app/community.webp", thumb: "/app/community-thumb.webp", label: "Community" },
];

const TAGS = [
  { icon: Sparkles, label: "Smart AI Tools" },
  { icon: PenLine, label: "Personalized Learning" },
  { icon: Zap, label: "Study Smarter" },
];

export function Hero() {
  const [active, setActive] = useState(0);
  const go = (dir: 1 | -1) => setActive((a) => (a + dir + SHOTS.length) % SHOTS.length);

  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-10 sm:pt-32">
      <div className="shell">
        <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
          {/* Copy */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mx-auto flex w-fit items-center gap-2 rounded-full border border-ink-border bg-white py-1 pl-1.5 pr-3 shadow-sm lg:mx-0"
            >
              <div className="flex -space-x-2">
                {["#ec8b0d", "#f5a623", "#d97706"].map((c, i) => (
                  <span
                    key={i}
                    className="h-6 w-6 rounded-full border-2 border-white"
                    style={{ background: `linear-gradient(135deg, ${c}, #7c450f)` }}
                  />
                ))}
              </div>
              <span className="text-xs font-medium text-neutral-700">
                Join <span className="font-bold text-neutral-900">500+</span> learners
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="mt-6 text-balance text-5xl font-bold leading-[1.02] tracking-tight text-neutral-900 sm:text-6xl md:text-[4.25rem]"
            >
              Your study.
              <br />
              Supercharged by <span className="text-gradient-brand">AI.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12 }}
              className="mx-auto mt-6 max-w-md text-pretty text-base leading-relaxed text-ink-muted sm:text-lg lg:mx-0"
            >
              From notes to mastery. StudNexus turns any study material into personalized learning
              that actually works.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start"
            >
              <a href={SITE.appSignup} className="btn-primary group w-full px-6 py-3.5 text-base sm:w-auto">
                Start for Free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <button onClick={() => scrollToId("how")} className="btn-ghost w-full px-6 py-3.5 text-base sm:w-auto">
                <PlayCircle className="h-4 w-4 text-brand-500" />
                See How It Works
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 lg:justify-start"
            >
              {TAGS.map((t) => (
                <span key={t.label} className="inline-flex items-center gap-1.5 text-sm text-ink-muted">
                  <t.icon className="h-4 w-4 text-brand-500" />
                  {t.label}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Active screenshot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative"
          >
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-brand-300/20 blur-3xl" />
            <div className="overflow-hidden rounded-xl border border-ink-border bg-white shadow-[0_30px_70px_-30px_rgba(17,12,8,0.4)]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={active}
                  src={SHOTS[active].src}
                  alt={SHOTS[active].label}
                  width={1500}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="block w-full"
                  loading="eager"
                />
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Screenshot carousel */}
        <div className="mt-12 rounded-2xl border border-ink-border bg-white/70 p-3 shadow-sm backdrop-blur sm:p-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => go(-1)}
              aria-label="Previous"
              className="hidden h-9 w-9 shrink-0 place-items-center rounded-full border border-ink-border bg-white text-ink-muted transition-colors hover:text-neutral-900 sm:grid"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex flex-1 gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {SHOTS.map((s, i) => {
                const on = i === active;
                return (
                  <button
                    key={s.label}
                    onClick={() => setActive(i)}
                    className="group shrink-0 basis-[46%] text-center sm:basis-[30%] lg:basis-[19%]"
                  >
                    <div
                      className={cn(
                        "overflow-hidden rounded-lg border-2 transition-all",
                        on ? "border-brand-500 shadow-md" : "border-ink-border opacity-70 group-hover:opacity-100"
                      )}
                    >
                      <img src={s.thumb} alt="" loading="lazy" className="block w-full" />
                    </div>
                    <div className="mt-1.5 flex items-center justify-center gap-1.5">
                      <span className={cn("truncate text-xs font-medium", on ? "text-neutral-900" : "text-ink-muted")}>
                        {s.label}
                      </span>
                      {s.badge && (
                        <span className="rounded bg-emerald-100 px-1 py-px text-[9px] font-bold text-emerald-600">
                          {s.badge}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => go(1)}
              aria-label="Next"
              className="hidden h-9 w-9 shrink-0 place-items-center rounded-full border border-ink-border bg-white text-ink-muted transition-colors hover:text-neutral-900 sm:grid"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Dots */}
          <div className="mt-3 flex items-center justify-center gap-1.5">
            {SHOTS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Slide ${i + 1}`}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === active ? "w-5 bg-brand-500" : "w-1.5 bg-neutral-300"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
