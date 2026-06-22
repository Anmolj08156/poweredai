import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { WaitlistForm } from "./ui/WaitlistForm";

const PERKS = [
  "Free during the entire beta",
  "Shape the roadmap with us",
  "Priority onboarding & support",
];

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
              Limited early access
            </span>
            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tightest text-gradient sm:text-5xl">
              Be among the first learners
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-base text-ink-muted sm:text-lg">
              Join the waitlist today and get early access to the Learning Operating System built
              for the way you actually study.
            </p>

            <div className="mx-auto mt-8 max-w-xl">
              <WaitlistForm withName size="lg" ctaLabel="Claim Early Access" source="cta" />
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
