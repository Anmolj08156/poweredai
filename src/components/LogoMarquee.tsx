import { SOCIAL_PROOF_LOGOS } from "../data/content";

/** Trust band: a subtle, auto-scrolling row of learner cohorts. */
export function LogoMarquee() {
  const items = [...SOCIAL_PROOF_LOGOS, ...SOCIAL_PROOF_LOGOS];
  return (
    <section className="relative border-y border-ink-border py-8">
      <div className="shell">
        <p className="mb-6 text-center text-xs font-medium uppercase tracking-[0.2em] text-ink-soft">
          Trusted by students &amp; educators from
        </p>
        <div className="mask-fade-edges overflow-hidden">
          <div className="flex w-max animate-marquee items-center gap-12">
            {items.map((label, i) => (
              <span
                key={i}
                className="whitespace-nowrap text-lg font-semibold tracking-tight text-neutral-400 transition-colors hover:text-neutral-700"
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
