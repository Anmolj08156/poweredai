/**
 * Central site configuration & brand constants.
 * Single source of truth for company info, contact and integrations.
 */

export const SITE = {
  product: "StudNexus",
  tagline: "One Platform. Every Learner.",
  url: import.meta.env.VITE_SITE_URL || "https://studnexus.com",

  company: "DataSmith Research Labs",
  companyUrl: "https://datasmithlabs.com",

  email: "anmol@datasmithlabs.com",

  social: {
    twitter: "https://twitter.com/datasmithlabs",
    linkedin: "https://www.linkedin.com/company/datasmithlabs",
  },
} as const;

/**
 * Waitlist endpoint (Google Apps Script Web App).
 * Falls back to the deployed StudNexus sheet so signups work out-of-the-box
 * on any host (Cloudflare Pages, Netlify, Vercel) with zero configuration.
 * Override per-environment with VITE_WAITLIST_ENDPOINT if needed.
 */
export const WAITLIST_ENDPOINT =
  import.meta.env.VITE_WAITLIST_ENDPOINT ||
  "https://script.google.com/macros/s/AKfycbxgb_5tjfz4rw1wafg5RezCXbzDVSExLneSo-m7ydCxUIdM9gl28BQbAibll0sBgml9hg/exec";
