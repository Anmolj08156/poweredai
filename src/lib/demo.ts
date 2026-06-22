/**
 * Demo booking submission.
 *
 * Sends a "Book a Demo" request to the SAME Google Apps Script endpoint as the
 * waitlist, tagged with `type: "demo"` so the script can route it to a separate
 * "Demos" tab (name, email, preferred date/time, exam). No backend required.
 */

import { WAITLIST_ENDPOINT } from "./config";
import { isValidEmail, detectSource, detectDevice } from "./waitlist";
import { track } from "./analytics";

export interface DemoBooking {
  type: "demo";
  id: string;
  name: string;
  email: string;
  preferred_date: string;
  preferred_time: string;
  exam?: string;
  created_at: string;
  source: string;
  device: string;
}

export type DemoResult =
  | { ok: true }
  | { ok: false; reason: "invalid" | "rate_limited" | "honeypot" | "error"; message: string };

const RATE_KEY = "studnexus:demo:last";
const RATE_LIMIT_MS = 8_000;

export interface DemoInput {
  name: string;
  email: string;
  date: string;
  time: string;
  exam?: string;
  /** Honeypot — must stay empty. */
  company?: string;
}

function uid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return `demo_${crypto.randomUUID()}`;
  return `demo_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

export async function submitDemo(input: DemoInput): Promise<DemoResult> {
  if (input.company && input.company.trim() !== "") {
    return { ok: false, reason: "honeypot", message: "Submission blocked." };
  }

  const name = input.name.trim();
  const email = input.email.trim().toLowerCase();
  const date = input.date.trim();
  const time = input.time.trim();

  if (!name || !date || !time || !isValidEmail(email)) {
    return { ok: false, reason: "invalid", message: "Please fill in your name, a valid email, date and time." };
  }

  try {
    const last = Number(localStorage.getItem(RATE_KEY) || 0);
    if (Date.now() - last < RATE_LIMIT_MS) {
      return { ok: false, reason: "rate_limited", message: "You're going a little fast — try again in a moment." };
    }
  } catch {
    /* ignore */
  }

  const booking: DemoBooking = {
    type: "demo",
    id: uid(),
    name,
    email,
    preferred_date: date,
    preferred_time: time,
    exam: input.exam?.trim() || undefined,
    created_at: new Date().toISOString(),
    source: detectSource(),
    device: detectDevice(),
  };

  if (WAITLIST_ENDPOINT) {
    try {
      await fetch(WAITLIST_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(booking),
        keepalive: true,
      });
    } catch {
      /* opaque response with no-cors; optimistic success */
    }
  }

  try {
    localStorage.setItem(RATE_KEY, String(Date.now()));
  } catch {
    /* ignore */
  }

  track("demo_request", { source: booking.source, exam: booking.exam });
  return { ok: true };
}

/** Selectable demo time slots (IST). */
export const DEMO_TIME_SLOTS = [
  "09:00 – 11:00",
  "11:00 – 13:00",
  "14:00 – 16:00",
  "16:00 – 18:00",
  "18:00 – 20:00",
] as const;
