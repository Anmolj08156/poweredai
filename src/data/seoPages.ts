import type { LucideIcon } from "lucide-react";
import {
  Sparkles,
  FileText,
  MessagesSquare,
  ListChecks,
  CalendarClock,
  Users,
} from "lucide-react";

/**
 * SEO landing pages. Each is a real, crawlable, keyword-focused page that links
 * back to the homepage waitlist. Driven by data so the layout stays consistent.
 */

export interface SeoSection {
  heading: string;
  body: string[];
  bullets?: string[];
}

export interface SeoPage {
  slug: string; // route path without leading slash
  icon: LucideIcon;
  eyebrow: string;
  /** <title> tag */
  metaTitle: string;
  /** meta description */
  metaDescription: string;
  /** single H1 */
  h1: string;
  /** lead paragraph under H1 */
  intro: string;
  keywords: string[];
  sections: SeoSection[];
  faq: { q: string; a: string }[];
  /** related page slugs for internal linking */
  related: string[];
}

export const SEO_PAGES: SeoPage[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "what-is-studnexus",
    icon: Sparkles,
    eyebrow: "Overview",
    metaTitle: "What is StudNexus? The AI Learning Operating System Explained",
    metaDescription:
      "StudNexus is an AI-powered Learning Operating System for students. Learn how it organizes notes, chats with your PDFs, generates quizzes, and plans your studies.",
    h1: "What is StudNexus?",
    intro:
      "StudNexus is an AI-powered Learning Operating System — a single platform where students organize their study material, understand concepts deeply, practice with smart quizzes, and revise at the right time. Instead of juggling a dozen apps, you bring everything you study into one intelligent workspace.",
    keywords: ["AI learning platform", "student operating system", "AI study assistant"],
    sections: [
      {
        heading: "Why students need a Learning Operating System",
        body: [
          "Studying today is fragmented. Your notes live in one app, your PDFs in another, your flashcards somewhere else, and your study plan in your head. Nothing talks to each other, so revision is messy and progress is invisible.",
          "StudNexus fixes that by acting as the operating system for your learning — one place that reads your material, connects ideas across documents, and turns passive reading into active understanding.",
        ],
      },
      {
        heading: "What you can do with StudNexus",
        body: ["Every core study workflow, powered by AI and connected in one flow:"],
        bullets: [
          "Generate clean, structured notes from any PDF or document",
          "Chat with your PDFs and ask questions in plain language",
          "Create intelligent quizzes and mock tests from your own material",
          "Build an adaptive study plan around your exam date",
          "Revise with spaced repetition so concepts actually stick",
          "Discover and share notes in a community of learners and educators",
        ],
      },
      {
        heading: "Who is StudNexus for?",
        body: [
          "StudNexus is built for every serious learner — engineering and medical students, UPSC, CAT and GATE aspirants, state-exam candidates, certification learners, and university students. Educators and creators can also publish, share and promote their notes to a growing audience.",
        ],
      },
    ],
    faq: [
      {
        q: "Is StudNexus free?",
        a: "Early access members use StudNexus free throughout the beta, and a generous free tier remains after launch with optional premium plans.",
      },
      {
        q: "Do I need to install anything?",
        a: "No. StudNexus runs in your browser — just create a workspace, upload your material, and start learning.",
      },
    ],
    related: ["ai-notes-generator", "chat-with-pdfs", "study-planner"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "ai-notes-generator",
    icon: FileText,
    eyebrow: "Feature",
    metaTitle: "AI Notes Generator — Turn PDFs & Lectures into Notes | StudNexus",
    metaDescription:
      "Generate clean, structured study notes from any PDF, document or lecture with the StudNexus AI Notes Generator. Save hours and study smarter.",
    h1: "AI Notes Generator",
    intro:
      "Stop re-typing and highlighting endlessly. The StudNexus AI Notes Generator reads your PDFs, textbooks and lecture material and turns them into clean, structured, easy-to-revise notes in seconds.",
    keywords: ["AI notes generator", "generate notes from PDF", "study notes AI"],
    sections: [
      {
        heading: "How the AI Notes Generator works",
        body: ["Three simple steps to ready-to-revise notes:"],
        bullets: [
          "Upload a PDF, document or paste your material into a workspace",
          "StudNexus reads and understands the content, then structures it",
          "Get organized notes with headings, key points and summaries you can edit",
        ],
      },
      {
        heading: "Why students love AI-generated notes",
        body: [
          "Hand-written notes take hours and still miss structure. AI-generated notes capture the key ideas, definitions and formulas in a consistent format — so you spend your time understanding and revising, not transcribing.",
          "Because your notes live in the same workspace as your PDFs and quizzes, everything stays connected and searchable.",
        ],
      },
    ],
    faq: [
      {
        q: "Can it generate notes from a PDF?",
        a: "Yes — upload any PDF and StudNexus turns it into structured notes you can edit, search and revise.",
      },
      {
        q: "Are the notes editable?",
        a: "Absolutely. AI gives you a strong first draft; you stay in control and can refine anything.",
      },
    ],
    related: ["chat-with-pdfs", "ai-quiz-generator", "what-is-studnexus"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "chat-with-pdfs",
    icon: MessagesSquare,
    eyebrow: "Feature",
    metaTitle: "Chat With PDFs — Ask Questions to Any Document | StudNexus",
    metaDescription:
      "Chat with your PDFs using AI. Upload notes, textbooks or research papers and ask questions in plain language to get instant, grounded answers with StudNexus.",
    h1: "Chat With PDFs",
    intro:
      "Turn any PDF into a conversation. Upload your textbooks, notes or research papers and simply ask questions — StudNexus answers in plain language, grounded in your own documents.",
    keywords: ["chat with PDF", "ask questions to PDF", "AI PDF reader"],
    sections: [
      {
        heading: "Understand documents faster",
        body: [
          "Instead of scrolling through hundreds of pages to find one answer, just ask. StudNexus reads your PDF, finds the relevant section, and explains it at your level — with the context to back it up.",
        ],
      },
      {
        heading: "What you can ask",
        body: ["Anything you'd ask a tutor about your material:"],
        bullets: [
          "“Explain this concept in simple terms”",
          "“Summarize chapter 4 in 5 bullet points”",
          "“What are the key formulas I should remember?”",
          "“Make practice questions from this section”",
        ],
      },
    ],
    faq: [
      {
        q: "Can I chat with multiple PDFs at once?",
        a: "Yes. StudNexus connects ideas across all the documents in your workspace, so answers draw on everything you've uploaded.",
      },
      {
        q: "Are answers based on my documents?",
        a: "Yes — responses are grounded in your uploaded material, so they stay relevant to what you're actually studying.",
      },
    ],
    related: ["ai-notes-generator", "ai-quiz-generator", "what-is-studnexus"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "ai-quiz-generator",
    icon: ListChecks,
    eyebrow: "Feature",
    metaTitle: "AI Quiz Generator — Create Quizzes from Your Notes | StudNexus",
    metaDescription:
      "Generate intelligent quizzes and mock tests from your own notes and PDFs with the StudNexus AI Quiz Generator. Practice smarter and find your weak spots.",
    h1: "AI Quiz Generator",
    intro:
      "Reading isn't enough — you remember what you practice. The StudNexus AI Quiz Generator turns your notes and PDFs into targeted quizzes and mock tests, calibrated to where you are and where you need to be.",
    keywords: ["AI quiz generator", "quiz from notes", "generate mock test AI"],
    sections: [
      {
        heading: "Practice that adapts to you",
        body: [
          "StudNexus creates questions from your own material, then focuses on the topics you find hardest. Every attempt surfaces your weak areas early — long before exam day.",
        ],
      },
      {
        heading: "Built for real exam prep",
        body: ["Generate the kind of practice that competitive and university exams demand:"],
        bullets: [
          "MCQs, short-answer and concept-check questions",
          "Full mock tests from a topic or a whole document",
          "Instant feedback with explanations",
          "Difficulty that scales as you improve",
        ],
      },
    ],
    faq: [
      {
        q: "Does it support competitive exams?",
        a: "Yes — StudNexus is designed around the workflows of UPSC, CAT, GATE, NEET, state exams and university courses.",
      },
      {
        q: "Where do the questions come from?",
        a: "From your own notes and PDFs, so practice always matches exactly what you're studying.",
      },
    ],
    related: ["ai-notes-generator", "study-planner", "what-is-studnexus"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "study-planner",
    icon: CalendarClock,
    eyebrow: "Feature",
    metaTitle: "AI Study Planner — Plan Your Exam Prep Smartly | StudNexus",
    metaDescription:
      "Build an adaptive study plan with the StudNexus AI Study Planner. Plan what to study and when around your syllabus, exam date and real progress.",
    h1: "AI Study Planner",
    intro:
      "Plan smarter, not harder. The StudNexus AI Study Planner decides what to study and when — built around your syllabus, your exam date and your real progress, so you always know your next step.",
    keywords: ["AI study planner", "study schedule maker", "exam preparation planner"],
    sections: [
      {
        heading: "A plan that adapts as you go",
        body: [
          "Most planners are static — you fall behind once and the whole schedule breaks. StudNexus rebalances automatically based on what you've actually covered and how well you're retaining it, so your plan always reflects reality.",
        ],
      },
      {
        heading: "Stay consistent until exam day",
        body: ["Turn a huge syllabus into a clear, daily path:"],
        bullets: [
          "Break your syllabus into manageable daily goals",
          "Prioritize weak topics and high-yield areas",
          "Blend new learning with timed revision",
          "See measurable progress toward your target",
        ],
      },
    ],
    faq: [
      {
        q: "Does the plan adjust if I fall behind?",
        a: "Yes — the planner rebalances around your real progress so you never have to rebuild your schedule from scratch.",
      },
      {
        q: "Can I plan for a specific exam date?",
        a: "Definitely. Set your exam date and StudNexus paces your syllabus to finish with time to revise.",
      },
    ],
    related: ["ai-quiz-generator", "what-is-studnexus", "community"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "community",
    icon: Users,
    eyebrow: "For Creators & Educators",
    metaTitle: "Community for Creators & Educators — Share & Promote Notes | StudNexus",
    metaDescription:
      "Join the StudNexus community. Educators and creators publish, share and promote their study notes, build an audience, while learners discover the best material.",
    h1: "Community for Creators & Educators",
    intro:
      "StudNexus isn't only for learners. It's a home for educators and creators to publish their notes, build an audience and promote their work — while learners discover and upvote the best study material for every exam.",
    keywords: ["share study notes", "study community", "sell notes online", "notes for educators"],
    sections: [
      {
        heading: "For creators & educators",
        body: ["Turn the notes you already make into reach and recognition:"],
        bullets: [
          "Publish your notes to a focused audience of serious learners",
          "Build a following and promote your work",
          "Get discovered through upvotes and subject-wise discovery",
          "Establish yourself as a go-to creator in your exam niche",
        ],
      },
      {
        heading: "For learners",
        body: [
          "Find high-quality, peer-reviewed notes for exactly what you're preparing for. Upvote what helps, follow creators you trust, and study from material that other toppers swear by — all inside the same workspace where you take notes and practice.",
        ],
      },
    ],
    faq: [
      {
        q: "Who can share notes?",
        a: "Anyone — educators, toppers and creators can publish notes to the community and grow an audience around them.",
      },
      {
        q: "Is the community free to join?",
        a: "Yes. Join the early access waitlist and you'll be among the first creators and learners onboarded.",
      },
    ],
    related: ["what-is-studnexus", "ai-notes-generator", "study-planner"],
  },
];

export function getSeoPage(slug: string): SeoPage | undefined {
  return SEO_PAGES.find((p) => p.slug === slug);
}
