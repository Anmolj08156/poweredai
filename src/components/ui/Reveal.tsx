import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in seconds. */
  delay?: number;
  /** Vertical offset to animate from. */
  y?: number;
  once?: boolean;
}

/** Fade + rise into view on scroll. Respects reduced-motion via CSS. */
export function Reveal({ children, className, delay = 0, y = 22, once = true }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

/** Container that staggers its `staggerItem` children into view. */
export function StaggerGroup({
  children,
  className,
  amount = "some",
}: {
  children: ReactNode;
  className?: string;
  /**
   * How much of the group must be visible to trigger. Defaults to "some"
   * (any part) — using a numeric fraction can NEVER be satisfied when the
   * group is taller than the viewport (e.g. long card grids on mobile),
   * leaving the children stuck at opacity 0.
   */
  amount?: number | "some" | "all";
}) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount, margin: "0px 0px -10% 0px" }}
    >
      {children}
    </motion.div>
  );
}
