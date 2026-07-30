/**
 * Fixed, page-wide light backdrop: warm cream paper with a soft peach glow
 * in the top-right. Purely decorative, pointer-events disabled.
 */
export function AmbientBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Cream base */}
      <div className="absolute inset-0 bg-ink" />

      {/* Soft warm glows */}
      <div className="absolute -right-40 -top-40 h-[38rem] w-[38rem] rounded-full bg-brand-300/25 blur-[130px]" />
      <div className="absolute -left-48 top-[30%] h-[32rem] w-[32rem] rounded-full bg-brand-200/20 blur-[140px]" />
    </div>
  );
}
