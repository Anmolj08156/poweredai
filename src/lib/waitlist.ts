/**
 * Waitlist store.
 *
 * Frontend-only persistence layer for the `early_access_waitlist` collection.
 * Entries are kept in localStorage so the experience is fully functional with
 * zero backend. If `VITE_WAITLIST_ENDPOINT` is set, submissions are also POSTed
 * to that endpoint — making the swap to a real database a one-line change.
 *
 * Mirrors the intended DB schema:
 *   id, email, name, created_at, source, device
 */

import { track } from "./analytics";
import { WAITLIST_ENDPOINT } from "./config";

export interface WaitlistEntry {
  id: string;
  email: string;
  name?: string;
  role: string; // "Learner" | "Educator" | "Both"
  created_at: string; // ISO timestamp
  source: string; // referral source
  device: string; // device / UA summary
}

const STORAGE_KEY = "studnexus:waitlist";
const RATE_KEY = "studnexus:waitlist:last";
const RATE_LIMIT_MS = 8_000; // min gap between submissions per device

export type SubmitResult =
  | { ok: true; entry: WaitlistEntry }
  | {
      ok: false;
      reason: "invalid_email" | "invalid_role" | "duplicate" | "rate_limited" | "honeypot" | "error";
      message: string;
    };

/* --------------------------------- Read --------------------------------- */

export function getEntries(): WaitlistEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as WaitlistEntry[]) : [];
  } catch {
    return [];
  }
}

function saveEntries(entries: WaitlistEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

/* ------------------------------ Validation ------------------------------ */

// RFC-5322-lite: good enough for a landing page, intentionally strict-ish.
const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export function isValidEmail(email: string): boolean {
  const v = email.trim();
  return v.length <= 254 && EMAIL_RE.test(v);
}

/* ------------------------------ Context info ---------------------------- */

/** Derive a referral source from URL params / referrer. */
export function detectSource(): string {
  try {
    const params = new URLSearchParams(window.location.search);
    const utm =
      params.get("utm_source") ||
      params.get("ref") ||
      params.get("source");
    if (utm) return utm.slice(0, 60);

    const ref = document.referrer;
    if (!ref) return "direct";
    const host = new URL(ref).hostname.replace(/^www\./, "");
    if (host === window.location.hostname) return "internal";
    return host.slice(0, 60);
  } catch {
    return "direct";
  }
}

/** Compact, privacy-conscious device summary (no fingerprinting). */
export function detectDevice(): string {
  if (typeof navigator === "undefined") return "unknown";
  const ua = navigator.userAgent;
  const platform =
    /android/i.test(ua) ? "Android" :
    /iphone|ipad|ipod/i.test(ua) ? "iOS" :
    /mac/i.test(ua) ? "macOS" :
    /win/i.test(ua) ? "Windows" :
    /linux/i.test(ua) ? "Linux" : "Other";
  const browser =
    /edg/i.test(ua) ? "Edge" :
    /chrome|crios/i.test(ua) ? "Chrome" :
    /firefox|fxios/i.test(ua) ? "Firefox" :
    /safari/i.test(ua) ? "Safari" : "Browser";
  const form = window.matchMedia("(max-width: 768px)").matches ? "Mobile" : "Desktop";
  return `${form} · ${platform} · ${browser}`;
}

function uid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `wl_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

/* -------------------------------- Submit -------------------------------- */

export interface SubmitInput {
  email: string;
  name?: string;
  /** Required: "Learner" | "Educator" | "Both". */
  role?: string;
  /** Honeypot field — must stay empty for a human. */
  company?: string;
}

export async function submitWaitlist(input: SubmitInput): Promise<SubmitResult> {
  // 1. Honeypot — bots fill hidden fields.
  if (input.company && input.company.trim() !== "") {
    return { ok: false, reason: "honeypot", message: "Submission blocked." };
  }

  const email = input.email.trim().toLowerCase();
  const name = input.name?.trim() || undefined;
  const role = input.role?.trim() || "";

  // 2. Validation
  if (!isValidEmail(email)) {
    return { ok: false, reason: "invalid_email", message: "Please enter a valid email address." };
  }
  if (!role) {
    return { ok: false, reason: "invalid_role", message: "Please tell us if you're a learner, educator or both." };
  }

  // 3. Rate limit (per device)
  try {
    const last = Number(localStorage.getItem(RATE_KEY) || 0);
    if (Date.now() - last < RATE_LIMIT_MS) {
      return { ok: false, reason: "rate_limited", message: "You're going a little fast — try again in a moment." };
    }
  } catch {
    /* ignore */
  }

  // 4. Build entry
  const entries = getEntries();
  const alreadyLocal = entries.some((e) => e.email === email);
  const entry: WaitlistEntry = {
    id: uid(),
    email,
    name,
    role,
    created_at: new Date().toISOString(),
    source: detectSource(),
    device: detectDevice(),
  };

  // 5. Remote sync FIRST, so the Google Sheet always receives valid signups —
  //    even if this device already has the email locally. The Apps Script
  //    de-dupes by email server-side, so re-sends are harmless.
  //    We send a "simple" text/plain request + no-cors so the browser skips the
  //    CORS preflight that Apps Script can't answer. (The response is opaque, so
  //    we can't read success — that's a known no-cors limitation.)
  //    NOTE: the Web App MUST be deployed with "Who has access: Anyone",
  //    otherwise Google returns 403 and nothing is written. See
  //    docs/COLLECT-WAITLIST.md.
  await syncToSheet(entry);

  // 6. Local dedup for UX (so a returning visitor sees "already on the list").
  if (alreadyLocal) {
    localStorage.setItem(RATE_KEY, String(Date.now()));
    return { ok: false, reason: "duplicate", message: "You're already on the list — see you soon! 🎉" };
  }

  // 7. Persist locally
  try {
    saveEntries([entry, ...entries]);
    localStorage.setItem(RATE_KEY, String(Date.now()));
  } catch {
    return { ok: false, reason: "error", message: "Something went wrong. Please try again." };
  }

  track("waitlist_signup", { source: entry.source });
  return { ok: true, entry };
}

async function syncToSheet(entry: WaitlistEntry) {
  const endpoint = WAITLIST_ENDPOINT;
  if (!endpoint) return;
  try {
    await fetch(endpoint, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(entry),
      keepalive: true,
    });
  } catch {
    /* network error — local copy is still saved and can be reconciled later */
  }
}

/* ------------------------------------------------------------------------ */
// Note: signups are stored in the visitor's own localStorage purely for
// per-device de-duplication and rate-limiting. The source of truth for all
// signups is the connected Google Sheet (see src/lib/config.ts). There is no
// in-app admin panel — there is nothing to expose.
