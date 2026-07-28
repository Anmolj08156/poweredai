/**
 * Fixed, page-wide ambient backdrop: a restrained warm glow + subtle grid.
 * Purely decorative, pointer-events disabled, GPU-friendly.
 */
export function AmbientBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base */}
      <div className="absolute inset-0 bg-ink" />

      {/* Subtle grid, fading out near the top only */}
      <div className="absolute inset-0 bg-grid opacity-[0.22] [mask-image:radial-gradient(ellipse_at_top,black_10%,transparent_60%)]" />

      {/* One soft warm glow behind the hero — restrained, not a wash */}
      <div className="absolute -top-48 left-1/2 h-[36rem] w-[52rem] -translate-x-1/2 rounded-full bg-brand-600/10 blur-[150px]" />
      <div className="absolute top-[40%] -right-52 h-[30rem] w-[30rem] rounded-full bg-brand-500/[0.06] blur-[150px]" />

      {/* Vignette to keep edges calm */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(10,8,6,0.75)_100%)]" />
    </div>
  );
}
