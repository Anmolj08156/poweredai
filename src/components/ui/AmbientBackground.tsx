/**
 * Fixed, page-wide ambient backdrop: aurora glows + grid + noise.
 * Purely decorative, pointer-events disabled, GPU-friendly.
 */
export function AmbientBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base */}
      <div className="absolute inset-0 bg-ink" />

      {/* Grid */}
      <div className="absolute inset-0 bg-grid opacity-[0.5] [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_75%)]" />

      {/* Aurora blobs */}
      <div className="absolute -top-40 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-brand-600/25 blur-[120px] animate-aurora" />
      <div className="absolute top-[20%] -left-40 h-[34rem] w-[34rem] rounded-full bg-indigo-accent/20 blur-[120px] animate-float-slow" />
      <div className="absolute top-[55%] -right-40 h-[36rem] w-[36rem] rounded-full bg-brand-400/15 blur-[130px] animate-aurora [animation-delay:-6s]" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(9,9,11,0.7)_100%)]" />
    </div>
  );
}
