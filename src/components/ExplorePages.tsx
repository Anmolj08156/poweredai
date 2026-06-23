import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "./ui/Section";
import { StaggerGroup, staggerItem } from "./ui/Reveal";
import { SEO_PAGES } from "../data/seoPages";

/** Short card blurbs for the explore grid, keyed by page slug. */
const SUMMARY: Record<string, string> = {
  "what-is-studnexus": "A complete overview of the AI Learning Operating System.",
  "ai-notes-generator": "Turn any PDF or lecture into clean, structured notes.",
  "chat-with-pdfs": "Ask questions to your documents and get instant answers.",
  "ai-quiz-generator": "Create smart quizzes and mock tests from your material.",
  "study-planner": "Build an adaptive plan around your syllabus and exam date.",
  community: "Educators & creators publish, share and promote their notes.",
};

export function ExplorePages() {
  return (
    <Section id="explore">
      <SectionHeading
        eyebrow={<>Explore StudNexus</>}
        title={
          <>
            Go deeper into <span className="text-gradient-brand">what you can do</span>
          </>
        }
        description="Dedicated guides for every part of the StudNexus Learning Operating System."
      />

      <StaggerGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SEO_PAGES.map((page) => {
          const Icon = page.icon;
          return (
            <motion.div key={page.slug} variants={staggerItem}>
              <Link
                to={`/${page.slug}`}
                className="group surface relative flex h-full flex-col overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
              >
                <ArrowUpRight className="absolute right-5 top-5 h-4 w-4 text-ink-soft transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-300" />
                <div className="grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-brand-300">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">{page.h1}</h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-muted">
                  {SUMMARY[page.slug]}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-300">
                  Learn more
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </motion.div>
          );
        })}
      </StaggerGroup>
    </Section>
  );
}
