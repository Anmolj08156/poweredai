# Collecting waitlist signups — without a backend

> ✅ **Already configured.** A deployed Google Apps Script Web App is baked into
> [`src/lib/config.ts`](../src/lib/config.ts) (`WAITLIST_ENDPOINT`), so signups
> already land in the connected Google Sheet on every deploy — no setup needed.
> The guide below is only if you want to point it at a **different** sheet.

The site also keeps a copy of each signup in the visitor's own browser
(`localStorage`) purely for de-duplication and rate-limiting — there is no
in-app admin page. The Google Sheet is your single source of truth for all
signups.

You do **not** need to give anyone a "Sheet ID". You create the sheet yourself
and paste **one URL** into the project. Here's the whole thing in ~3 minutes.

---

## Option A — Google Sheet (recommended, free, you own the data)

### 1. Create the sheet
- Go to <https://sheets.new> → name it e.g. **StudNexus Waitlist**.

### 2. Add the script
- In the sheet: **Extensions → Apps Script**.
- Delete the sample code, paste the contents of
  [`scripts/google-apps-script.gs`](../scripts/google-apps-script.gs).
- Click **Save** (💾).

### 3. Deploy as a Web App
- Top right: **Deploy → New deployment**.
- Click the gear ⚙ → **Web app**.
- Set:
  - **Description:** waitlist
  - **Execute as:** *Me*
  - **Who has access:** **Anyone**  ← important
- **Deploy** → authorize/allow access when prompted (it's your own script).
- Copy the **Web app URL**. It looks like:
  ```
  https://script.google.com/macros/s/AKfy..................../exec
  ```

### 4. Plug it into the site
- Create `.env.local` (copy from `.env.example`) and add:
  ```env
  VITE_WAITLIST_ENDPOINT=https://script.google.com/macros/s/AKfy..../exec
  ```
- Restart the dev server (`npm run dev`) or redeploy.

✅ Done. Every signup now appends a row to your sheet with:
`id · email · name · created_at · source · device` — and duplicate emails are
skipped automatically.

> **So, what do you give me?** Just that one **/exec Web app URL**. Paste it into
> `VITE_WAITLIST_ENDPOINT`. Nothing else (no Sheet ID, no API key) is needed.

> **Note on duplicates:** the browser also blocks re-submits per device, and the
> script de-dupes by email — so your sheet stays clean.

### ⚠️ Troubleshooting: signups not reaching the sheet (403)

If the form says "You're on the list" but **no row appears** in the sheet, the
Web App is almost certainly **not public**. Test the URL in a browser — if you
see *"Sorry, unable to open the file"* / a Google login / **403 Forbidden**, fix
the access:

1. Apps Script → **Deploy → Manage deployments**.
2. Click the ✏️ **pencil** on the active deployment.
3. **Who has access** → must be **`Anyone`** (not "Only myself", not "Anyone with
   a Google account").
4. **Version** → *New version* → **Deploy**.
5. Re-test the `/exec` URL in an incognito window — you should now see
   `{"ok":true,"service":"StudNexus waitlist", ...}`.

> The frontend POSTs with `no-cors` (required for Apps Script), which means the
> browser **cannot read** the response — so a 403 fails silently and the UI still
> shows success. That's why the public-access setting is critical: if it's wrong,
> rows simply never reach the sheet.

> **Workspace/org accounts:** if your Google account is a company/college
> Workspace, an admin policy may block "Anyone" access entirely. Use a personal
> `@gmail.com` account for the sheet, or switch to Option B below.

---

## Option B — Form services (zero code)

If you'd rather not touch Apps Script, any of these give you an endpoint URL you
drop into `VITE_WAITLIST_ENDPOINT` the same way:

| Service | Free tier | Notes |
| --- | --- | --- |
| [Formspree](https://formspree.io) | ✅ | Email + dashboard, spam filtering |
| [Getform](https://getform.io) | ✅ | Sends to Sheets/Slack/email |
| [SheetDB](https://sheetdb.io) / [Sheety](https://sheety.co) | ✅ | REST API on top of a Google Sheet |
| [Tally](https://tally.so) / Google Forms | ✅ | If you're OK redirecting to a form |

For these, you may need to switch the request in
[`src/lib/waitlist.ts`](../src/lib/waitlist.ts) from `mode: "no-cors"` +
`text/plain` back to a normal JSON `fetch`, since they support CORS. The code
has a comment marking exactly where.

---

## Option C — Real backend later

When you're ready for a proper database, create the table from
[`db/schema.sql`](../db/schema.sql) (Supabase/Postgres), expose an insert
endpoint, and set `VITE_WAITLIST_ENDPOINT` to it. No frontend changes needed —
and you can migrate existing rows by exporting them from your Google Sheet.
