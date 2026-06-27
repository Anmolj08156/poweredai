import type { LucideIcon } from "lucide-react";
import {
  Sparkles,
  BrainCircuit,
  Network,
  Target,
  RefreshCw,
  LineChart,
  FolderKanban,
  Layers,
  EyeOff,
  Waves,
  Cpu,
  GraduationCap,
  Stethoscope,
  Landmark,
  Calculator,
  CircuitBoard,
  Building2,
  BadgeCheck,
  Upload,
  MessagesSquare,
  ListChecks,
  TrendingUp,
  Trophy,
  Layers3,
  Users,
  CalendarClock,
} from "lucide-react";

/* --------------------------------- Nav ---------------------------------- */

export const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Explore", href: "#explore" },
  { label: "For Everyone", href: "#categories" },
  { label: "How it works", href: "#how" },
  { label: "FAQ", href: "#faq" },
] as const;

/* ------------------------------ Waitlist role --------------------------- */

export const WAITLIST_ROLES = [
  { value: "Learner", label: "Learner", hint: "I'm here to study" },
  { value: "Educator", label: "Educator / Creator", hint: "I'll share & promote notes" },
  { value: "Both", label: "Both", hint: "I learn and create" },
] as const;

export type WaitlistRole = (typeof WAITLIST_ROLES)[number]["value"];

/* ------------------------------- Problems ------------------------------- */

export interface ProblemItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const PROBLEMS: ProblemItem[] = [
  {
    icon: Layers,
    title: "Scattered notes",
    description: "PDFs, screenshots, and handwritten notes spread across a dozen places you can never find again.",
  },
  {
    icon: FolderKanban,
    title: "Too many apps",
    description: "A notes app, a flashcard app, a planner, a PDF reader — none of them talk to each other.",
  },
  {
    icon: RefreshCw,
    title: "Poor revision",
    description: "You study hard once, then forget most of it because nothing reminds you to review at the right time.",
  },
  {
    icon: EyeOff,
    title: "No progress visibility",
    description: "You feel busy but have no real signal on whether you're actually getting closer to mastery.",
  },
  {
    icon: Waves,
    title: "Information overload",
    description: "Endless material, infinite tabs, and no system to turn all of it into understanding.",
  },
];

/* ------------------------------- Solution ------------------------------- */

export const SOLUTION_PILLARS = [
  { label: "Understand", icon: BrainCircuit, color: "from-amber-400 to-amber-600" },
  { label: "Practice", icon: Target, color: "from-orange-400 to-orange-600" },
  { label: "Revise", icon: RefreshCw, color: "from-yellow-400 to-amber-500" },
  { label: "Track", icon: LineChart, color: "from-amber-500 to-orange-600" },
  { label: "Master", icon: Trophy, color: "from-orange-400 to-amber-600" },
] as const;

/* ------------------------------- Features ------------------------------- */

export interface Feature {
  icon: LucideIcon;
  title: string;
  tagline: string;
  description: string;
  accent: string;
  /** Highlighted as an advanced / standout capability. */
  advanced?: boolean;
}

export const FEATURES: Feature[] = [
  {
    icon: Sparkles,
    title: "AI Workspace",
    tagline: "Upload. Understand. Explore.",
    description:
      "Bring your PDFs, notes and resources into one intelligent workspace that reads, structures and indexes everything for you.",
    accent: "from-amber-500/15 to-transparent",
  },
  {
    icon: Users,
    title: "Community & Creators",
    tagline: "Create, share & get discovered.",
    description:
      "Educators and top students publish their notes, build an audience and promote their work — while learners discover and upvote the best material for every exam.",
    accent: "from-orange-500/15 to-transparent",
    advanced: true,
  },
  {
    icon: CalendarClock,
    title: "Study Planner",
    tagline: "Your exam, perfectly paced.",
    description:
      "An adaptive plan that decides what to study and when — built around your syllabus, your exam date and your real progress.",
    accent: "from-amber-500/15 to-transparent",
    advanced: true,
  },
  {
    icon: RefreshCw,
    title: "Revision Vault",
    tagline: "Never forget important concepts.",
    description:
      "A spaced-repetition vault resurfaces the right concept at the right moment — so what you learn actually sticks.",
    accent: "from-amber-500/15 to-transparent",
    advanced: true,
  },
  {
    icon: BrainCircuit,
    title: "Deep Learning Assistant",
    tagline: "Learn concepts deeply.",
    description:
      "Ask anything and get clear, grounded explanations that adapt to your level — from first principles to exam-ready depth.",
    accent: "from-orange-500/15 to-transparent",
  },
  {
    icon: Network,
    title: "Cross-Document Intelligence",
    tagline: "Connect knowledge across resources.",
    description:
      "StudNexus links ideas across all your material, surfacing connections you'd never spot reading one file at a time.",
    accent: "from-amber-500/15 to-transparent",
  },
  {
    icon: Target,
    title: "Smart Practice",
    tagline: "Generate intelligent assessments.",
    description:
      "Turn any topic into targeted questions and mock tests calibrated to where you are and where you need to be.",
    accent: "from-orange-500/15 to-transparent",
  },
  {
    icon: Layers3,
    title: "Flashcards",
    tagline: "Active recall, automated.",
    description:
      "Auto-generate flashcards from your material and master them with spaced, self-graded recall sessions.",
    accent: "from-orange-500/15 to-transparent",
  },
  {
    icon: LineChart,
    title: "Learning Analytics",
    tagline: "Measure progress objectively.",
    description:
      "See mastery by topic, spot weak areas early, and watch real, measurable progress toward your goal.",
    accent: "from-amber-500/15 to-transparent",
  },
];

/* ------------------------------ Categories ------------------------------ */

export interface Category {
  icon: LucideIcon;
  title: string;
  blurb: string;
  glow: string;
}

export const CATEGORIES: Category[] = [
  { icon: CircuitBoard, title: "Engineering", blurb: "Core subjects, labs & semesters", glow: "rgba(236,139,13,0.35)" },
  { icon: Stethoscope, title: "Medical", blurb: "NEET PG, high-volume retention", glow: "rgba(245,166,35,0.35)" },
  { icon: Landmark, title: "UPSC", blurb: "Vast syllabus, made manageable", glow: "rgba(217,119,6,0.35)" },
  { icon: Calculator, title: "CAT", blurb: "Quant, VARC & LRDI mastery", glow: "rgba(245,166,35,0.35)" },
  { icon: Cpu, title: "GATE", blurb: "Concept depth + problem solving", glow: "rgba(236,139,13,0.35)" },
  { icon: Building2, title: "State Exams", blurb: "Region-specific preparation", glow: "rgba(245,166,35,0.35)" },
  { icon: BadgeCheck, title: "Certifications", blurb: "Professional & upskilling tracks", glow: "rgba(217,119,6,0.35)" },
  { icon: GraduationCap, title: "University", blurb: "Coursework, projects & exams", glow: "rgba(245,166,35,0.35)" },
];

/* ------------------------------ How it works ---------------------------- */

export interface Step {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const STEPS: Step[] = [
  { icon: FolderKanban, title: "Create a workspace", description: "Spin up a dedicated space for a subject, exam or semester." },
  { icon: Upload, title: "Upload learning resources", description: "Drop in PDFs, notes and material — we structure it instantly." },
  { icon: MessagesSquare, title: "Learn with AI", description: "Explore concepts with an assistant that knows your material." },
  { icon: ListChecks, title: "Practice", description: "Generate intelligent questions and assessments on demand." },
  { icon: TrendingUp, title: "Track progress", description: "Watch mastery grow across every topic, objectively." },
  { icon: Trophy, title: "Master concepts", description: "Revise at the right time and retain knowledge for good." },
];

/* ------------------------------- Metrics -------------------------------- */

export interface Metric {
  icon: LucideIcon;
  label: string;
  value: number;
  suffix?: string;
}

export const METRICS: Metric[] = [
  { icon: GraduationCap, label: "Early learners on the list", value: 500, suffix: "+" },
  { icon: FolderKanban, label: "Study PDFs processed", value: 3200, suffix: "+" },
  { icon: BrainCircuit, label: "Concepts explained", value: 14000, suffix: "+" },
  { icon: Target, label: "Practice questions generated", value: 8400, suffix: "+" },
];

/* --------------------------------- FAQ ---------------------------------- */

export interface FAQItem {
  q: string;
  a: string;
}

export const FAQS: FAQItem[] = [
  {
    q: "Who is StudNexus for?",
    a: "StudNexus is built for every serious learner — engineering and medical students, UPSC, CAT and GATE aspirants, state-exam candidates, certification learners, and university students who want one place to actually learn.",
  },
  {
    q: "Is it free?",
    a: "Early access members use StudNexus free throughout the beta. A generous free tier will remain after launch, with optional premium plans for power users.",
  },
  {
    q: "When is launch?",
    a: "We're onboarding learners in waves to keep the experience exceptional. Join the early access waitlist and you'll be among the first invited in.",
  },
  {
    q: "How does AI help?",
    a: "AI explains concepts at your level, connects ideas across your documents, generates intelligent practice, and schedules revision — so you understand more and forget less.",
  },
  {
    q: "Can I upload PDFs?",
    a: "Yes. Upload PDFs, notes and learning resources into a workspace and StudNexus turns them into an interactive, searchable knowledge base you can question and practice from.",
  },
  {
    q: "Does it support competitive exams?",
    a: "Absolutely. StudNexus is designed around the real workflows of UPSC, CAT, GATE, state government exams and professional certifications.",
  },
];

/* -------------------------------- Footer -------------------------------- */

export const FOOTER_LINKS = [
  {
    heading: "Product",
    links: [
      { label: "AI Notes Generator", href: "/ai-notes-generator" },
      { label: "Chat With PDFs", href: "/chat-with-pdfs" },
      { label: "AI Quiz Generator", href: "/ai-quiz-generator" },
      { label: "Study Planner", href: "/study-planner" },
    ],
  },
  {
    heading: "Explore",
    links: [
      { label: "What is StudNexus?", href: "/what-is-studnexus" },
      { label: "Community & Creators", href: "/community" },
      { label: "Features", href: "#features" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "DataSmith Research Labs", href: "https://datasmithlabs.com" },
      { label: "Contact", href: "mailto:anmol@datasmithlabs.com" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
] as const;

export const SOCIAL_PROOF_LOGOS = [
  "IIT Aspirants",
  "AIIMS Track",
  "UPSC 2026",
  "IIM Bound",
  "GATE CSE",
  "State PSC",
] as const;
