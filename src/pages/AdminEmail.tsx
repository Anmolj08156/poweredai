import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  Mail,
  ShieldCheck,
  Loader2,
  Send,
  Paperclip,
  X,
  CheckCircle2,
  AlertCircle,
  Download,
  LogOut,
  Home,
  Users,
} from "lucide-react";
import { AmbientBackground } from "../components/ui/AmbientBackground";
import { Logo } from "../components/ui/Logo";
import { isValidEmail } from "../lib/waitlist";
import { cn } from "../lib/utils";

/**
 * Hidden admin bulk mailer at /admin/email.
 *
 * SECURITY: the password is validated server-side (Worker) against the
 * ADMIN_PASSWORD secret on every request. AWS SES keys never touch the browser
 * — the Worker holds them. This page only sends the typed password + message.
 */

const BATCH_SIZE = 30; // < Worker's per-request cap (45)

type SendStatus = "pending" | "sent" | "failed";
interface AuditRow {
  email: string;
  status: SendStatus;
  detail?: string;
}

export default function AdminEmail() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [fromAddr, setFromAddr] = useState<string | null>(null);
  const [replyTo, setReplyTo] = useState<string | null>(null);

  if (!authed) {
    return (
      <Gate
        onUnlock={(pw, from, reply) => {
          setPassword(pw);
          setFromAddr(from);
          setReplyTo(reply);
          setAuthed(true);
        }}
      />
    );
  }
  return (
    <Mailer
      password={password}
      fromAddr={fromAddr}
      replyTo={replyTo}
      onLogout={() => {
        setPassword("");
        setAuthed(false);
      }}
    />
  );
}

/* --------------------------------- Gate --------------------------------- */

function Gate({ onUnlock }: { onUnlock: (pw: string, from: string | null, replyTo: string | null) => void }) {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<"idle" | "checking" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("checking");
    setMsg("");
    try {
      const res = await fetch("/api/admin-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: value }),
      });
      const data = (await res.json()) as { ok?: boolean; from?: string | null; replyTo?: string | null };
      if (data.ok) {
        onUnlock(value, data.from ?? null, data.replyTo ?? null);
      } else {
        setStatus("error");
        setMsg("Incorrect password.");
      }
    } catch {
      setStatus("error");
      setMsg("Backend unreachable. This tool only works on the deployed site (Cloudflare Worker).");
    }
  }

  return (
    <>
      <Helmet>
        <title>Admin Mailer — StudNexus</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <AmbientBackground />
      <main className="grid min-h-screen place-items-center px-6">
        <form onSubmit={submit} className="surface w-full max-w-sm p-8">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-indigo-accent shadow-glow">
            <ShieldCheck className="h-6 w-6 text-white" />
          </div>
          <h1 className="mt-5 text-xl font-semibold text-white">Admin Mailer</h1>
          <p className="mt-1 text-sm text-ink-muted">Enter the admin password to continue.</p>
          <input
            type="password"
            autoFocus
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setStatus("idle");
            }}
            placeholder="Password"
            className="mt-5 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-ink-soft focus:border-brand-400/60"
          />
          {msg && <p className="mt-2 text-xs text-rose-400">{msg}</p>}
          <button type="submit" disabled={status === "checking"} className="btn-primary mt-4 w-full">
            {status === "checking" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Unlock"}
          </button>
          <Link to="/" className="mt-4 flex items-center justify-center gap-1.5 text-xs text-ink-soft hover:text-zinc-300">
            <Home className="h-3.5 w-3.5" /> Back to site
          </Link>
        </form>
      </main>
    </>
  );
}

/* -------------------------------- Mailer -------------------------------- */

function Mailer({ password, fromAddr, replyTo, onLogout }: { password: string; fromAddr: string | null; replyTo: string | null; onLogout: () => void }) {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [isHtml, setIsHtml] = useState(false);
  const [signature, setSignature] = useState(true);
  const [recipientsRaw, setRecipientsRaw] = useState("");
  const [attachment, setAttachment] = useState<{ filename: string; contentType: string; contentBase64: string; sizeKB: number } | null>(null);
  const [sending, setSending] = useState(false);
  const [audit, setAudit] = useState<AuditRow[]>([]);
  const [done, setDone] = useState(0);

  const parsed = useMemo(() => {
    const tokens = recipientsRaw.split(/[\s,;]+/).map((t) => t.trim().toLowerCase()).filter(Boolean);
    const seen = new Set<string>();
    const valid: string[] = [];
    const invalid: string[] = [];
    for (const t of tokens) {
      if (seen.has(t)) continue;
      seen.add(t);
      if (isValidEmail(t)) valid.push(t);
      else invalid.push(t);
    }
    return { valid, invalid };
  }, [recipientsRaw]);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) {
      alert("Attachment is larger than 8 MB — SES limits total message size to ~10 MB. Please use a smaller file.");
      e.target.value = "";
      return;
    }
    const base64 = await fileToBase64(file);
    setAttachment({ filename: file.name, contentType: file.type || "application/octet-stream", contentBase64: base64, sizeKB: Math.round(file.size / 1024) });
    e.target.value = "";
  }

  async function send(recipients: string[]) {
    if (recipients.length === 0) return;
    if (!subject.trim() || !body.trim()) {
      alert("Please fill in a subject and body.");
      return;
    }
    if (!confirm(`Send this email individually to ${recipients.length} recipient(s)?`)) return;

    setSending(true);
    setDone(0);
    setAudit(recipients.map((email) => ({ email, status: "pending" as const })));

    // Append the Anushka signature (forces HTML) if enabled.
    let finalBody = body;
    let finalIsHtml = isHtml;
    if (signature) {
      const base = isHtml ? body : escapeHtml(body).replace(/\n/g, "<br>");
      finalBody = base + signatureHtml(replyTo);
      finalIsHtml = true;
    }

    const chunks = chunk(recipients, BATCH_SIZE);
    for (const group of chunks) {
      try {
        const res = await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password, subject, body: finalBody, isHtml: finalIsHtml, recipients: group, attachment }),
        });
        const data = (await res.json()) as { results?: { email: string; ok: boolean; error?: string }[]; error?: string };
        if (!res.ok || !data.results) {
          const err = data.error || `HTTP ${res.status}`;
          setAudit((prev) => prev.map((r) => (group.includes(r.email) ? { ...r, status: "failed", detail: err } : r)));
        } else {
          const map = new Map(data.results.map((r) => [r.email, r]));
          setAudit((prev) =>
            prev.map((r) => {
              const hit = map.get(r.email);
              if (!hit) return r;
              return { email: r.email, status: hit.ok ? "sent" : "failed", detail: hit.ok ? undefined : hit.error };
            })
          );
        }
      } catch (e) {
        setAudit((prev) => prev.map((r) => (group.includes(r.email) ? { ...r, status: "failed", detail: String(e) } : r)));
      }
      setDone((d) => d + group.length);
    }
    setSending(false);
  }

  const sentCount = audit.filter((r) => r.status === "sent").length;
  const failCount = audit.filter((r) => r.status === "failed").length;

  return (
    <>
      <Helmet>
        <title>Admin Mailer — StudNexus</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <AmbientBackground />

      <div className="min-h-screen">
        <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-ink/70 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
            <div className="flex items-center gap-3">
              <Logo showWordmark={false} />
              <div>
                <h1 className="text-sm font-semibold text-white">Bulk Mailer</h1>
                <p className="text-xs text-ink-soft">
                  From: {fromAddr || "(server SES_FROM)"}
                  {replyTo && <span> · Reply-To: {replyTo}</span>}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link to="/" className="btn-ghost hidden py-2 sm:inline-flex"><Home className="h-4 w-4" /> Site</Link>
              <button onClick={onLogout} className="btn-ghost py-2"><LogOut className="h-4 w-4" /> Logout</button>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-5 py-8">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            {/* Compose */}
            <div className="space-y-4">
              <div className="surface p-5">
                <label className="mb-1.5 block text-xs font-medium text-ink-muted">Subject</label>
                <input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Your subject line"
                  className={inputCls}
                />

                <div className="mt-4 flex items-center justify-between">
                  <label className="text-xs font-medium text-ink-muted">Message</label>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 text-xs text-ink-soft">
                      <input type="checkbox" checked={signature} onChange={(e) => setSignature(e.target.checked)} className="accent-brand-500" />
                      Anushka signature
                    </label>
                    <label className="flex items-center gap-2 text-xs text-ink-soft">
                      <input type="checkbox" checked={isHtml} onChange={(e) => setIsHtml(e.target.checked)} className="accent-brand-500" />
                      HTML
                    </label>
                  </div>
                </div>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  rows={10}
                  placeholder={isHtml ? "<p>Hello…</p>" : "Write your message…"}
                  className={cn(inputCls, "mt-1.5 resize-y font-mono text-[13px] leading-relaxed")}
                />

                {/* Attachment */}
                <div className="mt-4">
                  <label className="mb-1.5 block text-xs font-medium text-ink-muted">Attachment (optional)</label>
                  {attachment ? (
                    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5">
                      <span className="flex items-center gap-2 truncate text-sm text-zinc-200">
                        <Paperclip className="h-4 w-4 text-brand-400" />
                        {attachment.filename} <span className="text-ink-soft">· {attachment.sizeKB} KB</span>
                      </span>
                      <button onClick={() => setAttachment(null)} className="text-ink-soft hover:text-rose-400">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="btn-ghost w-full cursor-pointer justify-center">
                      <Paperclip className="h-4 w-4" /> Attach a document
                      <input type="file" className="hidden" onChange={onFile} />
                    </label>
                  )}
                </div>
              </div>

              {/* Recipients */}
              <div className="surface p-5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-ink-muted">Recipients</label>
                  <span className="text-xs text-ink-soft">
                    <span className="font-semibold text-brand-300">{parsed.valid.length}</span> valid
                    {parsed.invalid.length > 0 && <span className="text-rose-400"> · {parsed.invalid.length} invalid</span>}
                  </span>
                </div>
                <textarea
                  value={recipientsRaw}
                  onChange={(e) => setRecipientsRaw(e.target.value)}
                  rows={5}
                  placeholder="Paste emails — separated by comma, space or new line. Each person gets a separate email."
                  className={cn(inputCls, "mt-1.5 resize-y font-mono text-[13px]")}
                />
                {parsed.invalid.length > 0 && (
                  <p className="mt-2 truncate text-xs text-rose-400">Ignored (invalid): {parsed.invalid.join(", ")}</p>
                )}
              </div>

              {/* Send */}
              <div className="surface flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-ink-muted">
                  {parsed.valid.length} recipient(s) · each sent individually (private)
                </p>
                <button
                  onClick={() => send(parsed.valid)}
                  disabled={sending || parsed.valid.length === 0}
                  className="btn-primary py-2.5"
                >
                  {sending ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Sending {done}/{audit.length}…</>
                  ) : (
                    <><Send className="h-4 w-4" /> Send to all</>
                  )}
                </button>
              </div>
            </div>

            {/* Audit */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="surface p-5">
                <div className="flex items-center justify-between">
                  <h2 className="flex items-center gap-2 text-sm font-semibold text-white">
                    <Users className="h-4 w-4 text-brand-400" /> Send audit
                  </h2>
                  {audit.length > 0 && (
                    <button onClick={() => downloadAudit(audit)} className="inline-flex items-center gap-1.5 text-xs text-ink-muted hover:text-white">
                      <Download className="h-3.5 w-3.5" /> CSV
                    </button>
                  )}
                </div>

                {audit.length > 0 && (
                  <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                    <Stat label="Sent" value={sentCount} tone="emerald" />
                    <Stat label="Failed" value={failCount} tone="rose" />
                    <Stat label="Total" value={audit.length} tone="brand" />
                  </div>
                )}

                <div className="mt-3 max-h-[28rem] space-y-1.5 overflow-y-auto pr-1">
                  {audit.length === 0 ? (
                    <div className="grid place-items-center py-16 text-center">
                      <Mail className="h-7 w-7 text-ink-soft" />
                      <p className="mt-3 text-sm text-ink-muted">Results appear here after you send.</p>
                    </div>
                  ) : (
                    audit.map((r) => (
                      <div key={r.email} className="flex items-start gap-2.5 rounded-lg border border-white/[0.05] bg-white/[0.02] px-3 py-2">
                        {r.status === "sent" ? (
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                        ) : r.status === "failed" ? (
                          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
                        ) : (
                          <Loader2 className="mt-0.5 h-4 w-4 shrink-0 animate-spin text-ink-soft" />
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs text-zinc-200">{r.email}</p>
                          {r.detail && <p className="truncate text-[11px] text-rose-400">{r.detail}</p>}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-ink-soft focus:border-brand-400/60";

function Stat({ label, value, tone }: { label: string; value: number; tone: "emerald" | "rose" | "brand" }) {
  const c = tone === "emerald" ? "text-emerald-300" : tone === "rose" ? "text-rose-300" : "text-brand-300";
  return (
    <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] py-2">
      <p className={cn("text-lg font-semibold", c)}>{value}</p>
      <p className="text-[11px] text-ink-soft">{label}</p>
    </div>
  );
}

/* -------------------------------- helpers ------------------------------- */

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Email-safe HTML signature with Anushka's photo (hosted at /anushka.png). */
function signatureHtml(replyTo: string | null): string {
  const email = replyTo || "anmol@datasmithlabs.com";
  const origin = typeof window !== "undefined" ? window.location.origin : "https://studnexus.com";
  return `
<table cellpadding="0" cellspacing="0" role="presentation" style="margin-top:28px;padding-top:16px;border-top:1px solid #eaeaea;font-family:Arial,Helvetica,sans-serif">
  <tr>
    <td style="padding-right:14px;vertical-align:middle">
      <img src="${origin}/anushka.png" width="52" height="52" alt="Anushka" style="width:52px;height:52px;border-radius:9999px;display:block;object-fit:cover" />
    </td>
    <td style="vertical-align:middle">
      <div style="font-size:15px;font-weight:bold;color:#1a1a1a">Anushka</div>
      <div style="font-size:13px;color:#666">StudNexus — The AI Learning OS</div>
      <div style="font-size:13px"><a href="mailto:${email}" style="color:#d97706;text-decoration:none">${email}</a></div>
    </td>
  </tr>
</table>`;
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result);
      resolve(result.slice(result.indexOf(",") + 1)); // strip data: prefix
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function downloadAudit(rows: AuditRow[]) {
  const esc = (v: string) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const csv = [
    "email,status,detail",
    ...rows.map((r) => [r.email, r.status, r.detail ?? ""].map(esc).join(",")),
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `mail-audit-${new Date().toISOString().slice(0, 19)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
