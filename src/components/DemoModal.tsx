import { useEffect, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, CalendarClock, Loader2, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { submitDemo, DEMO_TIME_SLOTS } from "../lib/demo";
import { SITE } from "../lib/config";
import { cn } from "../lib/utils";

const OPEN_EVENT = "studnexus:open-demo";

/** Trigger the demo modal from anywhere. */
export function openDemoModal() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

type Status = "idle" | "loading" | "success" | "error";

const todayISO = () => new Date().toISOString().split("T")[0];

export function DemoModal() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState<string>(DEMO_TIME_SLOTS[0]);
  const [exam, setExam] = useState("");
  const [company, setCompany] = useState(""); // honeypot

  // Open via global event
  useEffect(() => {
    const handler = () => {
      setStatus("idle");
      setMessage("");
      setOpen(true);
    };
    window.addEventListener(OPEN_EVENT, handler);
    return () => window.removeEventListener(OPEN_EVENT, handler);
  }, []);

  // Lock scroll + Esc to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setMessage("");

    const result = await submitDemo({ name, email, date, time, exam, company });
    if (result.ok) {
      setStatus("success");
    } else {
      setStatus("error");
      setMessage(result.message);
    }
  }

  function resetAndClose() {
    setOpen(false);
    setName("");
    setEmail("");
    setDate("");
    setTime(DEMO_TIME_SLOTS[0]);
    setExam("");
    setStatus("idle");
    setMessage("");
  }

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] grid place-items-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
            onClick={resetAndClose}
            aria-hidden="true"
          />

          {/* Dialog */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Book a demo"
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="surface relative z-10 w-full max-w-lg overflow-hidden p-6 sm:p-8"
          >
            {/* Glow */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-500/20 blur-[80px]" />

            <button
              onClick={resetAndClose}
              aria-label="Close"
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-ink-muted transition-colors hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            {status === "success" ? (
              <SuccessView name={name} date={date} time={time} onClose={resetAndClose} />
            ) : (
              <>
                <div className="relative flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-indigo-accent shadow-glow">
                    <CalendarClock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">Book a demo</h2>
                    <p className="text-xs text-ink-muted">A 1:1 walkthrough of StudNexus — pick a time that suits you.</p>
                  </div>
                </div>

                <form onSubmit={onSubmit} className="relative mt-6 space-y-3" noValidate>
                  {/* Honeypot */}
                  <div className="absolute left-[-9999px] h-px w-px overflow-hidden" aria-hidden="true">
                    <input
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Your name" required>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        autoComplete="name"
                        placeholder="e.g. Aarav Sharma"
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Email" required>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                        placeholder="you@email.com"
                        className={inputCls}
                      />
                    </Field>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Preferred date" required>
                      <input
                        type="date"
                        value={date}
                        min={todayISO()}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className={cn(inputCls, "[color-scheme:dark]")}
                      />
                    </Field>
                    <Field label="Preferred time (IST)" required>
                      <select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className={cn(inputCls, "[color-scheme:dark]")}
                      >
                        {DEMO_TIME_SLOTS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <Field label="What are you preparing for?">
                    <input
                      value={exam}
                      onChange={(e) => setExam(e.target.value)}
                      placeholder="e.g. UPSC, GATE, NEET PG, Engineering… (optional)"
                      className={inputCls}
                    />
                  </Field>

                  {message && status === "error" && (
                    <p className="flex items-center gap-2 text-sm text-rose-400">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      {message}
                    </p>
                  )}

                  <button type="submit" disabled={status === "loading"} className="btn-primary w-full">
                    {status === "loading" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" /> Request demo
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs text-ink-soft">
                    We'll confirm your slot at <span className="text-ink-muted">{SITE.email}</span>.
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 placeholder:text-ink-soft transition-colors focus:border-brand-400/60 focus:bg-white/[0.05]";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-ink-muted">
        {label}
        {required && <span className="text-brand-400"> *</span>}
      </span>
      {children}
    </label>
  );
}

function SuccessView({
  name,
  date,
  time,
  onClose,
}: {
  name: string;
  date: string;
  time: string;
  onClose: () => void;
}) {
  return (
    <div className="relative flex flex-col items-center py-6 text-center">
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-emerald-500/15 text-emerald-400">
        <CheckCircle2 className="h-7 w-7" />
      </div>
      <h2 className="mt-5 text-xl font-semibold text-white">Demo requested 🎉</h2>
      <p className="mt-2 max-w-sm text-sm text-ink-muted">
        Thanks{name ? `, ${name.split(" ")[0]}` : ""}! We've noted your preferred slot
        {date ? ` for ${date}` : ""}
        {time ? `, ${time} IST` : ""}. Our team will email you a confirmation shortly.
      </p>
      <button onClick={onClose} className="btn-primary mt-6">
        Done
      </button>
    </div>
  );
}
