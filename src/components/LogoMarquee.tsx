import { SOCIAL_PROOF_LOGOS } from "../data/content";

/** Trust band: a subtle, auto-scrolling row of learner cohorts. */
export function LogoMarquee() {
  const items = [...SOCIAL_PROOF_LOGOS, ...SOCIAL_PROOF_LOGOS];
  return (
    <section className="relative border-y border-white/[0.05] py-8">
      <div className="shell">
        <p className="mb-6 text-center text-xs font-medium uppercase tracking-[0.2em] text-ink-soft">
          Trusted by ambitious learners preparing for
        </p>
        <div className="mask-fade-edges overflow-hidden">
          <div className="flex w-max animate-marquee items-center gap-12">
            {items.map((label, i) => (
              <span
                key={i}
                className="whitespace-nowrap text-lg font-semibold tracking-tight text-zinc-500 transition-colors hover:text-zinc-300"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
