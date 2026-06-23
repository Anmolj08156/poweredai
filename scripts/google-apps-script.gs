/**
 * StudNexus — Waitlist + Demo bookings → Google Sheet (no backend required)
 * ------------------------------------------------------------------------
 * Paste this into your Sheet's Apps Script editor, then re-deploy:
 *   Deploy → Manage deployments → ✏️ Edit → Version: "New version" → Deploy.
 * (This keeps the SAME /exec URL — no need to update the website.)
 *
 * Receives JSON bodies:
 *   Waitlist : { id, email, name, role, created_at, source, device }
 *   Demo     : { type:"demo", id, name, email, preferred_date,
 *                preferred_time, exam, created_at, source, device }
 *
 * Waitlist rows go to the FIRST sheet tab. Demo bookings go to a "Demos" tab
 * (auto-created on first request).
 */

var WAITLIST_HEADERS = ['id', 'email', 'name', 'role', 'created_at', 'source', 'device'];
var DEMO_HEADERS = [
  'id', 'name', 'email', 'preferred_date', 'preferred_time', 'exam',
  'created_at', 'source', 'device',
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000); // avoid race conditions on concurrent submits
  try {
    var data = JSON.parse(e.postData.contents);
    if (data && data.type === 'demo') {
      return handleDemo(data);
    }
    return handleWaitlist(data);
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function handleWaitlist(data) {
  // Keep waitlist on the first (default) sheet tab.
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sheet.getLastRow() === 0) sheet.appendRow(WAITLIST_HEADERS);

  var email = String(data.email || '').trim().toLowerCase();
  if (!email) return json({ ok: false, error: 'missing_email' });
  if (emailExists(sheet, email, 2)) return json({ ok: true, duplicate: true });

  sheet.appendRow([
    data.id || '',
    email,
    data.name || '',
    data.role || '',
    data.created_at || new Date().toISOString(),
    data.source || 'direct',
    data.device || '',
  ]);
  return json({ ok: true });
}

function handleDemo(data) {
  var sheet = getOrCreateSheet('Demos', DEMO_HEADERS);
  var email = String(data.email || '').trim().toLowerCase();
  if (!email) return json({ ok: false, error: 'missing_email' });

  sheet.appendRow([
    data.id || '',
    data.name || '',
    email,
    data.preferred_date || '',
    data.preferred_time || '',
    data.exam || '',
    data.created_at || new Date().toISOString(),
    data.source || 'direct',
    data.device || '',
  ]);
  return json({ ok: true, type: 'demo' });
}

function getOrCreateSheet(name, headers) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(name);
  if (!sheet) sheet = ss.insertSheet(name);
  if (sheet.getLastRow() === 0) sheet.appendRow(headers);
  return sheet;
}

function emailExists(sheet, email, col) {
  var last = sheet.getLastRow();
  if (last < 2) return false;
  var vals = sheet.getRange(2, col, last - 1, 1).getValues();
  for (var i = 0; i < vals.length; i++) {
    if (String(vals[i][0]).trim().toLowerCase() === email) return true;
  }
  return false;
}

// Optional: open the URL in a browser to confirm the app is live.
function doGet() {
  return json({ ok: true, service: 'StudNexus waitlist', ts: new Date().toISOString() });
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
