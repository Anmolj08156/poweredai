/** Legal document content (Privacy Policy + Terms). Rendered by LegalPage. */

export type LegalBlock = { p: string } | { ul: string[] };

export interface LegalSection {
  heading: string;
  blocks: LegalBlock[];
}

export interface LegalDoc {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
  /** Closing disclaimer note. */
  note: string;
}

const DISCLAIMER =
  "This document is a general template provided in good faith and is not legal advice. Please have it reviewed by a qualified professional before public launch.";

export const PRIVACY: LegalDoc = {
  slug: "privacy",
  title: "Privacy Policy",
  metaTitle: "Privacy Policy — StudNexus",
  metaDescription:
    "How StudNexus collects, uses and protects your data — what we collect, why, who processes it, and the control you have.",
  lastUpdated: "27 June 2026",
  intro:
    "This policy explains exactly what StudNexus collects, why, who processes it, and the control you have over your data. We collect only what we need to run your study tools.",
  sections: [
    {
      heading: "1. What we collect",
      blocks: [
        {
          ul: [
            "Account info: email, name, username, your role (student/educator), school/organization, and — if you sign in with Google — your Google profile name and avatar.",
            "Your content: PDFs and notes you upload, your highlights, annotations and any text you paste (e.g. a syllabus).",
            "Study & usage data: quizzes and mock tests, scores, progress, XP, streaks, completed tasks, flashcards, and AI usage logs (which features you used).",
            "Community activity: posts you share, likes, and who you follow.",
            "Technical basics: standard log/session data needed to keep you signed in and to keep the Service secure.",
          ],
        },
        { p: "We do not sell your personal data, and we do not run third-party advertising trackers." },
      ],
    },
    {
      heading: "2. How we use it",
      blocks: [
        {
          ul: [
            "To provide core features (workspace, chat, quizzes, planner, progress, community).",
            "To personalize your dashboard, streaks, reminders and recommendations.",
            "To keep your account secure and prevent abuse.",
            "To improve and maintain the Service.",
          ],
        },
      ],
    },
    {
      heading: "3. AI processing",
      blocks: [
        {
          p: "When you use AI features (summaries, chat, quiz generation, the deep-learning assistant), the relevant content — such as your PDF text and your question — is sent to Google Vertex AI (Gemini) to generate a response. This processing is done to serve your request. We don't use your private content to train public models.",
        },
      ],
    },
    {
      heading: "4. Who processes your data (sub-processors)",
      blocks: [
        {
          ul: [
            "Supabase — authentication and database (your account, progress and metadata).",
            "Google Cloud — file storage (your uploaded PDFs) and Vertex AI (Gemini) for the AI features above.",
            "Vercel — hosting/serving of the web app.",
          ],
        },
        { p: "These providers process data on our behalf under their own security and privacy terms." },
      ],
    },
    {
      heading: "5. Storage & security",
      blocks: [
        {
          p: "Your data is stored on Supabase and Google Cloud with access controls (row-level security) so that, by default, only you can access your own content. We use encrypted connections (HTTPS).",
        },
      ],
    },
    {
      heading: "6. Your choices & rights",
      blocks: [
        {
          ul: [
            "View and edit your profile and preferences in Settings.",
            "Delete individual PDFs, highlights, flashcards and posts at any time.",
            "Request deletion of your account and associated data by contacting us.",
          ],
        },
      ],
    },
    {
      heading: "7. Cookies",
      blocks: [
        {
          p: "We use essential cookies only — to keep you signed in and remember basic preferences. We do not use advertising or cross-site tracking cookies.",
        },
      ],
    },
    {
      heading: "8. Children",
      blocks: [
        {
          p: "StudNexus is meant for learners of an appropriate age for their education context. If you believe a child has provided data without consent, contact us and we will remove it.",
        },
      ],
    },
    {
      heading: "9. Changes",
      blocks: [
        {
          p: "We may update this policy as the Service evolves; the “Last updated” date above reflects the latest version.",
        },
      ],
    },
  ],
  note: DISCLAIMER,
};

export const TERMS: LegalDoc = {
  slug: "terms",
  title: "Terms & Conditions",
  metaTitle: "Terms & Conditions — StudNexus",
  metaDescription:
    "The terms that govern your access to and use of StudNexus — accounts, your content, AI features, acceptable use, plans and payments.",
  lastUpdated: "27 June 2026",
  intro:
    "Welcome to StudNexus (“StudNexus”, “we”, “us”). These Terms & Conditions govern your access to and use of our website, apps and services (the “Service”). By creating an account or using the Service, you agree to these terms. If you do not agree, please do not use StudNexus.",
  sections: [
    {
      heading: "1. Eligibility & accounts",
      blocks: [
        {
          p: "The Service is intended for students, educators and learners. You are responsible for the information you provide, for keeping your login credentials secure, and for all activity under your account. You must provide accurate details (name, email, role, organization) during sign-up.",
        },
      ],
    },
    {
      heading: "2. Your content",
      blocks: [
        {
          p: "You retain ownership of the notes, PDFs, highlights and other materials you upload (“Your Content”). By uploading, you grant StudNexus a limited license to store, process and display Your Content solely to operate features for you — for example to generate summaries, answer questions, and create quizzes.",
        },
        { p: "Only upload content you have the right to use. Do not upload unlawful, infringing or harmful material." },
      ],
    },
    {
      heading: "3. AI features — important",
      blocks: [
        {
          p: "StudNexus uses AI (Google Gemini via Vertex AI) to generate summaries, answers, quizzes and study suggestions. AI output can be inaccurate or incomplete and is provided for study assistance only. It is not professional, medical, legal or academic-grading advice. Always verify important information yourself.",
        },
      ],
    },
    {
      heading: "4. Acceptable use",
      blocks: [
        { p: "You agree not to:" },
        {
          ul: [
            "misuse, disrupt, or attempt to gain unauthorized access to the Service;",
            "upload malware or attempt to reverse-engineer the platform;",
            "use the Service to cheat where prohibited, or to harass other users;",
            "scrape, resell, or abuse the AI features or community.",
          ],
        },
      ],
    },
    {
      heading: "5. Plans, credits & payments",
      blocks: [
        {
          p: "Some features are free; others use credits or require a paid plan (Pro, Max or Team). Plan details and limits are shown on the Subscription page and may change. During the testing phase, access may be granted, limited or revoked at our discretion.",
        },
      ],
    },
    {
      heading: "6. Termination",
      blocks: [
        {
          p: "You may stop using the Service and delete your account at any time. We may suspend or terminate accounts that violate these terms or misuse the Service.",
        },
      ],
    },
    {
      heading: "7. Disclaimer & liability",
      blocks: [
        {
          p: "The Service is provided “as is” without warranties of any kind. To the maximum extent permitted by law, StudNexus is not liable for any indirect or consequential loss, or for loss of data or study outcomes arising from use of the Service or its AI output.",
        },
      ],
    },
    {
      heading: "8. Changes",
      blocks: [
        {
          p: "We may update these terms as the Service evolves. Material changes will be reflected by the “Last updated” date above. Continued use after changes means you accept the updated terms.",
        },
      ],
    },
  ],
  note: DISCLAIMER,
};

export const LEGAL_DOCS: Record<string, LegalDoc> = {
  privacy: PRIVACY,
  terms: TERMS,
};
