/**
* Project Reverie — RSVP API
* Bind this script to your Google Sheet (Extensions → Apps Script).
*
* Deploy: Deploy → New deployment → Web app
*   - Execute as: Me
*   - Who has access: Anyone
*
* Test GET:
*   {WEB_APP_URL}?path=guest/JM001
*
* Script properties (Project settings → Script properties):
*   RSVP_DEADLINE  optional ISO date, e.g. 2028-01-15T23:59:59+08:00
*   ALLOWED_ORIGIN optional CORS origin, default *
*/

const GUEST_LIST_SHEET = "Guest List";
const RSVP_LOG_SHEET = "RSVP Log";
/** Bump when redeploying — verify at {WEB_APP_URL}?path=ping */
const API_VERSION = 5;
const GUEST_CODE_PATTERN = /^([A-Z0-9]{2,6}-[A-Z0-9]{4,10}|[A-Z]{2}\d{3})$/;

/** Guest List columns (0-based). RSVP writes only rsvpStatus, confirmedHeadcount, lastUpdated. */
const COL = {
guestCode: 0,
guestName: 1,
seats: 2,
phone: 3,
email: 4,
physicalAddress: 5,
rsvpStatus: 6,
confirmedHeadcount: 7,
lastUpdated: 8,
table: 9,
};

function doGet(e) {
try {
  const path = getPath(e);

  if (path === "ping") {
    return jsonOk({ apiVersion: API_VERSION, status: "ok" });
  }

  const guestCode = resolveGuestCodeFromGet(e);

  if (!guestCode) {
    return jsonError(400, "INVALID_PATH", "Unknown endpoint.");
  }

  return lookupGuestResponse(guestCode);
} catch (err) {
  return jsonError(500, "SERVER_ERROR", String(err.message || err));
}
}

function doPost(e) {
try {
  const path = getPath(e);

  if (path === "guest") {
    const body = parseJsonBody(e);
    const guestCode = String(body.guestCode || "").trim().toUpperCase();
    return lookupGuestResponse(guestCode);
  }

  if (isRsvpClosed()) {
    return jsonError(403, "RSVP_CLOSED", "RSVP is now closed. Please contact us if you need help.");
  }

  if (path !== "rsvp") {
    return jsonError(400, "INVALID_PATH", "Unknown endpoint.");
  }

  const body = parseJsonBody(e);
  const guestCode = String(body.guestCode || "").trim().toUpperCase();

  if (!GUEST_CODE_PATTERN.test(guestCode)) {
    return jsonError(400, "INVALID_GUEST_CODE", "Invalid invitation code format.");
  }

  if (typeof body.attending !== "boolean") {
    return jsonError(400, "INVALID_PAYLOAD", "attending must be true or false.");
  }

  const guest = findGuest(guestCode);

  if (!guest) {
    return jsonError(404, "GUEST_NOT_FOUND", "We couldn't find that invitation code.");
  }

  const attending = body.attending;
  const confirmedSeats = attending ? Number(body.confirmedSeats) : 0;

  if (attending) {
    if (!Number.isFinite(confirmedSeats) || confirmedSeats < 1) {
      return jsonError(400, "INVALID_PAYLOAD", "confirmedSeats must be at least 1 when attending.");
    }

    if (confirmedSeats > guest.seats) {
      return jsonError(422, "SEATS_EXCEEDED", "Your invitation is for up to " + guest.seats + " guests.", {
        maxSeats: guest.seats,
        requested: confirmedSeats,
      });
    }
  } else if (confirmedSeats !== 0) {
    return jsonError(400, "INVALID_PAYLOAD", "confirmedSeats must be 0 when declining.");
  }

  const message = truncate(String(body.message || ""), 1000);

  const status = attending ? "Confirmed" : "Declined";
  const response = attending ? "Accepted" : "Declined";
  const now = new Date().toISOString();

  updateGuestRow(guest.rowIndex, {
    status: status,
    confirmedHeadcount: attending ? confirmedSeats : 0,
    lastUpdated: now,
  });

  appendRsvpLog({
    timestamp: now,
    guestCode: guestCode,
    response: response,
    headcount: attending ? confirmedSeats : 0,
    message: message,
  });

  return jsonOk({
    guestCode: guestCode,
    status: status,
    confirmedHeadcount: attending ? confirmedSeats : 0,
    lastUpdated: now,
  });
} catch (err) {
  return jsonError(500, "SERVER_ERROR", String(err.message || err));
}
}

function getPath(e) {
const params = e.parameter || {};

if (params.path) {
  try {
    return decodeURIComponent(String(params.path))
      .replace(/^\/+/, "")
      .replace(/\/+$/, "");
  } catch (err) {
    return String(params.path).replace(/^\/+/, "").replace(/\/+$/, "");
  }
}

return "";
}

function resolveGuestCodeFromGet(e) {
const params = e.parameter || {};

if (params.guestCode) {
  return String(params.guestCode).trim().toUpperCase();
}

if (params.code) {
  return String(params.code).trim().toUpperCase();
}

const path = getPath(e);
const match = path.match(/^guest\/(.+)$/i);

if (!match) {
  return null;
}

try {
  return decodeURIComponent(match[1]).trim().toUpperCase();
} catch (err) {
  return String(match[1]).trim().toUpperCase();
}
}

function lookupGuestResponse(guestCode) {
if (!GUEST_CODE_PATTERN.test(guestCode)) {
  return jsonError(400, "INVALID_GUEST_CODE", "Invalid invitation code format.");
}

const guest = findGuest(guestCode);

if (!guest) {
  return jsonError(
    404,
    "GUEST_NOT_FOUND",
    "We couldn't find that invitation code. Please check your invite or contact us.",
  );
}

return jsonOk({
  guestCode: guest.guestCode,
  name: guest.name,
  seats: guest.seats,
  status: guest.status,
  confirmedHeadcount: guest.confirmedHeadcount,
  lastUpdated: guest.lastUpdated,
});
}

function parseJsonBody(e) {
if (!e.postData || !e.postData.contents) {
  throw new Error("Missing request body.");
}

return JSON.parse(e.postData.contents);
}

function getSpreadsheet() {
return SpreadsheetApp.getActiveSpreadsheet();
}

function getSheet(name) {
const sheet = getSpreadsheet().getSheetByName(name);

if (!sheet) {
  throw new Error('Sheet not found: "' + name + '"');
}

return sheet;
}

function findGuest(guestCode) {
const sheet = getSheet(GUEST_LIST_SHEET);
const values = sheet.getDataRange().getValues();

for (let i = 1; i < values.length; i++) {
  const row = values[i];
  const code = String(row[COL.guestCode] || "").trim().toUpperCase();

  if (code === guestCode) {
    return {
      rowIndex: i + 1,
      guestCode: code,
      name: String(row[COL.guestName] || ""),
      seats: Number(row[COL.seats]) || 0,
      status: normalizeStatus(row[COL.rsvpStatus]),
      confirmedHeadcount: Number(row[COL.confirmedHeadcount]) || 0,
      lastUpdated: row[COL.lastUpdated]
        ? new Date(row[COL.lastUpdated]).toISOString()
        : null,
    };
  }
}

return null;
}

function updateGuestRow(rowIndex, update) {
const sheet = getSheet(GUEST_LIST_SHEET);

sheet.getRange(rowIndex, COL.rsvpStatus + 1).setValue(update.status);
sheet.getRange(rowIndex, COL.confirmedHeadcount + 1).setValue(update.confirmedHeadcount);
sheet.getRange(rowIndex, COL.lastUpdated + 1).setValue(update.lastUpdated);
}

function appendRsvpLog(entry) {
const sheet = getSheet(RSVP_LOG_SHEET);

sheet.appendRow([
  entry.timestamp,
  entry.guestCode,
  entry.response,
  entry.headcount,
  entry.message,
]);
}

function normalizeStatus(value) {
const status = String(value || "Pending").trim();

if (status === "Confirmed" || status === "Declined") {
  return status;
}

return "Pending";
}

function isRsvpClosed() {
const deadline = PropertiesService.getScriptProperties().getProperty("RSVP_DEADLINE");

if (!deadline) {
  return false;
}

return new Date() > new Date(deadline);
}

function truncate(value, max) {
return value.length > max ? value.slice(0, max) : value;
}

function jsonOk(data) {
return jsonResponse({ ok: true, data: data }, 200);
}

function jsonError(statusCode, code, message, details) {
const payload = {
  ok: false,
  error: {
    code: code,
    message: message,
  },
};

if (details) {
  payload.error.details = details;
}

return jsonResponse(payload, statusCode);
}

function jsonResponse(payload, statusCode) {
const origin =
  PropertiesService.getScriptProperties().getProperty("ALLOWED_ORIGIN") || "*";

// Apps Script cannot set true HTTP status codes; include for client parsing.
const output = ContentService.createTextOutput(
  JSON.stringify(Object.assign({ status: statusCode }, payload)),
).setMimeType(ContentService.MimeType.JSON);

return output;
}

/** Run once from the editor to verify sheet structure. */
function testFindGuest() {
const guest = findGuest("RVR-4RBSN");
Logger.log(JSON.stringify(guest, null, 2));
}
