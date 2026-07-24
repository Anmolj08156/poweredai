# Admin Bulk Mailer — setup

A password-gated tool at **`/admin/email`** to send an email (with an optional
attachment) **individually** to a list of recipients, with a per-recipient
sent / failed **audit**. It sends via **AWS SES**.

## 🔐 Security model (read this)

- AWS SES keys live **only** as **Cloudflare Worker secrets** — never in the
  website code or the repo. The browser never sees them.
- The admin password is checked **server-side** (Worker) on every request
  against the `ADMIN_PASSWORD` secret. The password is never stored in the
  bundle — you type it each session.
- `/admin/` and `/api/` are disallowed in `robots.txt`.

> ⚠️ If you ever pasted AWS credentials anywhere (chat, screenshot, email),
> **rotate them** in AWS IAM immediately.

---

## Step 1 — AWS SES setup (one time)

1. **Pick a region** (e.g. `us-east-1`) and use it consistently.
2. **Verify a sender** in SES → *Verified identities* → verify an email
   (e.g. `noreply@datasmithlabs.com`) or, better, your **domain**.
3. **Create sending credentials**: IAM → create a user (or role) with a policy
   allowing `ses:SendEmail` and `ses:SendRawEmail`, then create an
   **Access key** → note the **Access Key ID** and **Secret Access Key**.
4. **Leave the SES sandbox**: by default SES only sends to *verified* addresses.
   To email your real list, open SES → *Account dashboard* → **Request
   production access** (usually approved within ~24h).

## Step 2 — Configure the site

**Non-secret vars** — edit [`wrangler.jsonc`](../wrangler.jsonc):

```jsonc
"vars": {
  "SES_REGION": "us-east-1",
  "SES_FROM": "StudNexus <noreply@datasmithlabs.com>"   // your verified sender
}
```

**Secrets** — set these in the **Cloudflare dashboard** →
*Workers & Pages → your Worker → Settings → Variables and Secrets → Add* (type
**Secret**), or via CLI:

```bash
wrangler secret put ADMIN_PASSWORD
wrangler secret put SES_ACCESS_KEY_ID
wrangler secret put SES_SECRET_ACCESS_KEY
```

Redeploy (a git push auto-deploys). Secrets take effect on the next deploy.

## Step 3 — Use it

1. Go to **`https://studnexus.com/admin/email`** and enter the admin password.
2. Write a **Subject** and **Message** (toggle **HTML** for rich emails).
3. Optionally **attach a document** (≤ ~8 MB — SES caps total message ~10 MB).
4. **Paste recipients** — separated by commas, spaces or new lines. Duplicates
   and invalid addresses are cleaned automatically. **Each person gets their own
   separate email** (nobody sees anyone else's address).
5. Click **Send to all**. Watch the live **audit**: ✅ sent / ❌ failed (with the
   error reason). **Download CSV** for a record of who got it and who didn't.

---

## Good to know

- **Throughput**: emails are sent in batches of 30 (Cloudflare per-request
  subrequest budget). The UI loops through all recipients automatically.
- **SES send rate**: new accounts have a low rate/quota — SES may throttle large
  bursts. Errors show per-recipient in the audit, so you can retry failures.
- **Deliverability**: verify your **domain** (SPF/DKIM) rather than a single
  email for best inbox placement. Only email people who expect to hear from you.
- **Change the admin path/password** anytime — the route is `/admin/email`, the
  password is the `ADMIN_PASSWORD` secret.
