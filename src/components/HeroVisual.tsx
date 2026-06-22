import { motion } from "framer-motion";
import {
  FileText,
  Sparkles,
  Target,
  RefreshCw,
  LineChart,
  BrainCircuit,
} from "lucide-react";

/**
 * The hero centrepiece: an abstract "learning ecosystem" — a central AI core
 * with orbiting knowledge nodes, animated connections and floating insight
 * cards. Intentionally NOT a product screenshot.
 */

const NODES = [
  { icon: FileText, label: "Resources", angle: -90, color: "#a855f7" },
  { icon: Sparkles, label: "Understand", angle: -30, color: "#7c3aed" },
  { icon: Target, label: "Practice", angle: 30, color: "#4f46e5" },
  { icon: LineChart, label: "Track", angle: 90, color: "#8b5cf6" },
  { icon: RefreshCw, label: "Revise", angle: 150, color: "#a855f7" },
  { icon: BrainCircuit, label: "Connect", angle: 210, color: "#6366f1" },
];

const RADIUS = 38; // percentage of container

function polar(angleDeg: number, r: number) {
  const a = (angleDeg * Math.PI) / 180;
  return { x: 50 + r * Math.cos(a), y: 50 + r * Math.sin(a) };
}

export function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[34rem]">
      {/* Glow base */}
      <div className="absolute inset-8 rounded-full bg-radial-glow blur-2xl" />

      {/* Orbit rings */}
      <div className="absolute inset-0 grid place-items-center">
        <div className="h-[78%] w-[78%] rounded-full border border-white/[0.06]" />
        <div className="absolute h-[55%] w-[55%] rounded-full border border-white/[0.05]" />
        <div className="absolute h-[30%] w-[30%] rounded-full border border-white/[0.04]" />
      </div>

      {/* Connection lines */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        {NODES.map((n, i) => {
          const p = polar(n.angle, RADIUS);
          return (
            <motion.line
              key={i}
              x1="50"
              y1="50"
              x2={p.x}
              y2={p.y}
              stroke="url(#line)"
              strokeWidth="0.4"
              strokeDasharray="1 1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
            />
          );
        })}
      </svg>

      {/* Slowly rotating node layer */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        {NODES.map((n, i) => {
          const p = polar(n.angle, RADIUS);
          const Icon = n.icon;
          return (
            <motion.div
              key={n.label}
              className="absolute"
              style={{ left: `${p.x}%`, top: `${p.y}%`, transform: "translate(-50%, -50%)" }}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.1, type: "spring", stiffness: 200, damping: 16 }}
            >
              {/* Counter-rotate so cards stay upright */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="flex flex-col items-center gap-1.5"
              >
                <div
                  className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-ink-card/90 backdrop-blur-md"
                  style={{ boxShadow: `0 0 24px -6px ${n.color}80` }}
                >
                  <Icon className="h-5 w-5" style={{ color: n.color }} />
                </div>
                <span className="whitespace-nowrap rounded-md bg-ink/60 px-1.5 py-0.5 text-[10px] font-medium text-ink-muted backdrop-blur">
                  {n.label}
                </span>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Central core */}
      <div className="absolute inset-0 grid place-items-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 160, damping: 14 }}
          className="relative grid h-24 w-24 place-items-center rounded-3xl border border-white/15 bg-gradient-to-br from-brand-500 to-indigo-accent shadow-glow-lg"
        >
          {/* pulse rings */}
          <span className="absolute inset-0 rounded-3xl border border-brand-400/40 animate-pulse-ring" />
          <span className="absolute inset-0 rounded-3xl border border-brand-400/30 animate-pulse-ring [animation-delay:1.5s]" />
          <BrainCircuit className="h-11 w-11 text-white" />
        </motion.div>
      </div>

      {/* Floating insight cards */}
      <FloatingCard
        className="left-[-6%] top-[14%]"
        delay={0.8}
        title="Concept mastered"
        sub="Thermodynamics · 92%"
        tone="emerald"
      />
      <FloatingCard
        className="right-[-4%] top-[30%]"
        delay={1}
        title="12 questions generated"
        sub="Adaptive difficulty"
        tone="violet"
      />
      <FloatingCard
        className="bottom-[8%] left-[2%]"
        delay={1.2}
        title="Revision due today"
        sub="6 cards · 4 min"
        tone="indigo"
      />
    </div>
  );
}

function FloatingCard({
  className,
  delay,
  title,
  sub,
  tone,
}: {
  className?: string;
  delay: number;
  title: string;
  sub: string;
  tone: "emerald" | "violet" | "indigo";
}) {
  const dot =
    tone === "emerald" ? "bg-emerald-400" : tone === "violet" ? "bg-brand-400" : "bg-indigo-400";
  return (
    <motion.div
      className={`absolute hidden sm:block ${className}`}
      initial={{ opacity: 0, y: 14, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="animate-float glass rounded-xl px-3.5 py-2.5 shadow-card" style={{ animationDelay: `${delay}s` }}>
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${dot} shadow-[0_0_8px_currentColor]`} />
          <p className="text-xs font-semibold text-white">{title}</p>
        </div>
        <p className="mt-0.5 pl-4 text-[11px] text-ink-soft">{sub}</p>
      </div>
    </motion.div>
  );
}
