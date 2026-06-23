import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2, AlertCircle, Check } from "lucide-react";
import { submitWaitlist, type SubmitResult } from "../../lib/waitlist";
import { WAITLIST_ROLES } from "../../data/content";
import { cn } from "../../lib/utils";

interface WaitlistFormProps {
  /** Show the optional name field. */
  withName?: boolean;
  /** Visual size. */
  size?: "md" | "lg";
  className?: string;
  ctaLabel?: string;
  source?: string;
}

type Status = "idle" | "loading" | "success" | "error";

export function WaitlistForm({
  withName = false,
  size = "md",
  className,
  ctaLabel = "Join Early Access",
}: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setMessage("");

    const result: SubmitResult = await submitWaitlist({ email, name, role, company });

    if (result.ok) {
      setStatus("success");
      setMessage("You're on the list. We'll be in touch soon.");
      setEmail("");
      setName("");
      setRole("");
    } else if (result.reason === "duplicate") {
      setStatus("success");
      setMessage(result.message);
    } else {
      setStatus("error");
      setMessage(result.message);
    }
  }

  const isLarge = size === "lg";

  return (
    <form
      onSubmit={onSubmit}
      className={cn("w-full", className)}
      noValidate
      aria-label="Join the early access waitlist"
    >
      {/* Honeypot: visually hidden, off-screen, not tab-focusable */}
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label>
          Company
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </label>
      </div>

      {/* Role selector (required) */}
      <div className="mb-3">
        <p className="mb-2 text-xs font-medium text-ink-muted">I'm joining as a…</p>
        <div className="grid grid-cols-3 gap-2">
          {WAITLIST_ROLES.map((r) => {
            const active = role === r.value;
            return (
              <button
                key={r.value}
                type="button"
                onClick={() => setRole(r.value)}
                aria-pressed={active}
                className={cn(
                  "group relative flex flex-col items-start gap-0.5 rounded-xl border px-3 py-2 text-left transition-all",
                  active
                    ? "border-brand-400/60 bg-brand-500/15"
                    : "border-white/10 bg-white/[0.02] hover:border-white/20"
                )}
              >
                <span className="flex w-full items-center justify-between">
                  <span className={cn("text-sm font-semibold", active ? "text-white" : "text-zinc-200")}>
                    {r.label}
                  </span>
                  {active && <Check className="h-3.5 w-3.5 shrink-0 text-brand-300" />}
                </span>
                <span className="hidden text-[11px] leading-tight text-ink-soft sm:block">{r.hint}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        className={cn(
          "flex flex-col gap-3",
          !withName && "sm:flex-row sm:items-stretch"
        )}
      >
        {withName ? (
          <div className="grid gap-3 sm:grid-cols-2">
            <Field
              type="text"
              placeholder="Your name (optional)"
              value={name}
              onChange={setName}
              large={isLarge}
              autoComplete="name"
            />
            <Field
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={setEmail}
              large={isLarge}
              required
              autoComplete="email"
            />
          </div>
        ) : (
          <Field
            type="email"
            placeholder="you@email.com"
            value={email}
            onChange={setEmail}
            large={isLarge}
            required
            autoComplete="email"
            className="flex-1"
          />
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className={cn(
            "btn-primary group shrink-0",
            isLarge ? "px-6 py-4 text-base" : "py-3",
            withName && "w-full"
          )}
        >
          {status === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Joining…
            </>
          ) : (
            <>
              {ctaLabel}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {message ? (
          <motion.p
            key={message}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={cn(
              "mt-3 flex items-center gap-2 text-sm",
              status === "success" ? "text-emerald-400" : "text-rose-400"
            )}
            role="status"
          >
            {status === "success" ? (
              <CheckCircle2 className="h-4 w-4 shrink-0" />
            ) : (
              <AlertCircle className="h-4 w-4 shrink-0" />
            )}
            {message}
          </motion.p>
        ) : (
          <p className="mt-3 text-xs text-ink-soft">
            No spam. Early access invites only. Unsubscribe anytime.
          </p>
        )}
      </AnimatePresence>
    </form>
  );
}

interface FieldProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  large?: boolean;
  required?: boolean;
  autoComplete?: string;
  className?: string;
}

function Field({
  type,
  placeholder,
  value,
  onChange,
  large,
  required,
  autoComplete,
  className,
}: FieldProps) {
  return (
    <input
      type={type}
      inputMode={type === "email" ? "email" : undefined}
      placeholder={placeholder}
      value={value}
      required={required}
      autoComplete={autoComplete}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        "w-full rounded-xl border border-white/10 bg-white/[0.03] text-zinc-100 placeholder:text-ink-soft",
        "transition-colors focus:border-brand-400/60 focus:bg-white/[0.05]",
        large ? "px-5 py-4 text-base" : "px-4 py-3 text-sm",
        className
      )}
    />
  );
}
