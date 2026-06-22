import { cn } from "../../lib/utils";

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
}

/** StudNexus mark: interlinked nodes forming an "N" constellation. */
export function Logo({ className, showWordmark = true }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="relative grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-brand-500 to-indigo-accent shadow-glow">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" aria-hidden="true">
          <path
            d="M6 18V6l12 12V6"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="6" cy="6" r="2" fill="currentColor" />
          <circle cx="18" cy="18" r="2" fill="currentColor" />
        </svg>
      </span>
      {showWordmark && (
        <span className="text-[1.05rem] font-semibold tracking-tight text-white">
          Stud<span className="text-gradient-brand">Nexus</span>
        </span>
      )}
    </span>
  );
}
