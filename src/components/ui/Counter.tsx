import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { formatCompact } from "../../lib/utils";

interface CounterProps {
  value: number;
  suffix?: string;
  durationMs?: number;
  className?: string;
}

/** Counts up to `value` once it scrolls into view. */
export function Counter({ value, suffix = "", durationMs = 1600, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / durationMs, 1);
      // easeOutExpo
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setDisplay(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, durationMs]);

  return (
    <span ref={ref} className={className}>
      {formatCompact(display)}
      {suffix}
    </span>
  );
}
