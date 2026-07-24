/**
 * StudNexus — Cloudflare Worker backend.
 *
 * Serves the static site (via the ASSETS binding) AND exposes a tiny, secured
 * API for the admin bulk-email tool. AWS SES credentials live ONLY here, as
 * Worker secrets — never in the frontend bundle.
 *
 * Secrets (set with `wrangler secret put <NAME>`):
 *   ADMIN_PASSWORD          strong password to use the admin mailer
 *   SES_ACCESS_KEY_ID       AWS IAM access key id (SES send permission)
 *   SES_SECRET_ACCESS_KEY   AWS IAM secret access key
 * Vars (in wrangler.jsonc):
 *   SES_REGION              e.g. "us-east-1"
 *   SES_FROM                verified sender, e.g. "StudNexus <noreply@datasmithlabs.com>"
 */
import { AwsClient } from "aws4fetch";

interface Env {
  ASSETS: { fetch: (req: Request) => Promise<Response> };
  ADMIN_PASSWORD?: string;
  SES_ACCESS_KEY_ID?: string;
  SES_SECRET_ACCESS_KEY?: string;
  SES_REGION?: string;
  SES_FROM?: string;
  SES_REPLY_TO?: string;
}

interface Attachment {
  filename: string;
  contentType: string;
  contentBase64: string;
}

interface SendBody {
  password?: string;
  subject?: string;
  body?: string;
  isHtml?: boolean;
  recipients?: string[];
  attachment?: Attachment | null;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/api/")) {
      if (url.pathname === "/api/admin-check" && request.method === "POST") return handleCheck(request, env);
      if (url.pathname === "/api/send-email" && request.method === "POST") return handleSend(request, env);
      return json({ error: "not_found" }, 404);
    }
    // Everything else → static assets (with SPA fallback via wrangler config).
    return env.ASSETS.fetch(request);
  },
};

/* ------------------------------- Handlers ------------------------------- */

function authed(env: Env, password?: string): boolean {
  return Boolean(env.ADMIN_PASSWORD) && typeof password === "string" && password === env.ADMIN_PASSWORD;
}

async function handleCheck(request: Request, env: Env): Promise<Response> {
  const body = (await request.json().catch(() => ({}))) as { password?: string };
  return json({
    ok: authed(env, body.password),
    from: env.SES_FROM || null,
    replyTo: env.SES_REPLY_TO || null,
  });
}

async function handleSend(request: Request, env: Env): Promise<Response> {
  const body = (await request.json().catch(() => null)) as SendBody | null;
  if (!body) return json({ error: "bad_json" }, 400);
  if (!authed(env, body.password)) return json({ error: "unauthorized" }, 401);

  const from = env.SES_FROM;
  const region = env.SES_REGION || "us-east-1";
  if (!from) return json({ error: "SES_FROM not configured on the server" }, 500);
  if (!env.SES_ACCESS_KEY_ID || !env.SES_SECRET_ACCESS_KEY) {
    return json({ error: "SES credentials not configured on the server" }, 500);
  }

  const recipients = Array.isArray(body.recipients) ? body.recipients.filter(Boolean) : [];
  if (recipients.length === 0) return json({ error: "no_recipients" }, 400);
  if (recipients.length > 45) return json({ error: "too_many_per_request" }, 400); // Worker subrequest budget

  const aws = new AwsClient({
    accessKeyId: env.SES_ACCESS_KEY_ID,
    secretAccessKey: env.SES_SECRET_ACCESS_KEY,
    region,
    service: "ses",
  });

  const results: { email: string; ok: boolean; messageId?: string; error?: string }[] = [];
  for (const to of recipients) {
    try {
      const r = await sendOne(aws, region, from, {
        to,
        subject: body.subject || "",
        content: body.body || "",
        isHtml: Boolean(body.isHtml),
        attachment: body.attachment || null,
        replyTo: env.SES_REPLY_TO || "",
      });
      results.push({ email: to, ...r });
    } catch (e) {
      results.push({ email: to, ok: false, error: String((e as Error)?.message || e) });
    }
  }

  return json({ results });
}

/* --------------------------------- SES ---------------------------------- */

async function sendOne(
  aws: AwsClient,
  region: string,
  from: string,
  msg: { to: string; subject: string; content: string; isHtml: boolean; attachment: Attachment | null; replyTo: string }
): Promise<{ ok: boolean; messageId?: string; error?: string }> {
  const endpoint = `https://email.${region}.amazonaws.com/v2/email/outbound-emails`;
  const replyTo = msg.replyTo?.trim();

  let payload: Record<string, unknown>;
  if (msg.attachment) {
    const mime = buildRawMime(from, msg.to, msg.subject, msg.content, msg.isHtml, msg.attachment, replyTo);
    payload = {
      FromEmailAddress: from,
      Destination: { ToAddresses: [msg.to] },
      Content: { Raw: { Data: utf8ToBase64(mime) } },
    };
  } else {
    const bodyContent = msg.isHtml
      ? { Html: { Data: msg.content, Charset: "UTF-8" } }
      : { Text: { Data: msg.content, Charset: "UTF-8" } };
    payload = {
      FromEmailAddress: from,
      Destination: { ToAddresses: [msg.to] },
      Content: { Simple: { Subject: { Data: msg.subject, Charset: "UTF-8" }, Body: bodyContent } },
    };
    if (replyTo) payload.ReplyToAddresses = [replyTo];
  }

  const res = await aws.fetch(endpoint, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  });

  if (res.ok) {
    const j = (await res.json().catch(() => ({}))) as { MessageId?: string };
    return { ok: true, messageId: j.MessageId };
  }

  const text = await res.text().catch(() => "");
  let message = `HTTP ${res.status}`;
  try {
    const j = JSON.parse(text);
    message = j.message || j.Message || j.__type || message;
  } catch {
    if (text) message = text.slice(0, 240);
  }
  return { ok: false, error: message };
}

/* ------------------------------ MIME / base64 --------------------------- */

function utf8ToBase64(str: string): string {
  return bytesToBase64(new TextEncoder().encode(str));
}

function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

function encodeHeaderWord(s: string): string {
  // eslint-disable-next-line no-control-regex
  if (/^[\x00-\x7F]*$/.test(s)) return s;
  return `=?UTF-8?B?${utf8ToBase64(s)}?=`;
}

function wrap76(s: string): string {
  return s.replace(/(.{76})/g, "$1\r\n");
}

function buildRawMime(
  from: string,
  to: string,
  subject: string,
  content: string,
  isHtml: boolean,
  att: Attachment,
  replyTo?: string
): string {
  const boundary = "b_" + Math.random().toString(36).slice(2);
  const ctype = isHtml ? "text/html" : "text/plain";
  const safeName = att.filename.replace(/["\r\n]/g, "");
  return [
    `From: ${from}`,
    `To: ${to}`,
    ...(replyTo ? [`Reply-To: ${replyTo}`] : []),
    `Subject: ${encodeHeaderWord(subject)}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/mixed; boundary="${boundary}"`,
    "",
    `--${boundary}`,
    `Content-Type: ${ctype}; charset=UTF-8`,
    "Content-Transfer-Encoding: base64",
    "",
    wrap76(utf8ToBase64(content)),
    "",
    `--${boundary}`,
    `Content-Type: ${att.contentType || "application/octet-stream"}; name="${safeName}"`,
    `Content-Disposition: attachment; filename="${safeName}"`,
    "Content-Transfer-Encoding: base64",
    "",
    wrap76(att.contentBase64.replace(/\s/g, "")),
    "",
    `--${boundary}--`,
    "",
  ].join("\r\n");
}

/* -------------------------------- utils --------------------------------- */

function json(obj: unknown, status = 200): Response {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}
