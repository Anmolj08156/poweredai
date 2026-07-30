import { cn } from "../../lib/utils";

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
}

/** StudNexus brand logo (SN monogram) + optional wordmark. */
export function Logo({ className, showWordmark = true }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <img
        src="/logo.png"
        alt="StudNexus"
        width={36}
        height={36}
        className="h-9 w-9 rounded-xl object-cover ring-1 ring-neutral-200"
      />
      {showWordmark && (
        <span className="text-[1.05rem] font-semibold tracking-tight text-neutral-900">
          Stud<span className="text-gradient-brand">Nexus</span>
        </span>
      )}
    </span>
  );
}
