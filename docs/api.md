# RSVP API Contract

Project Reverie — Google Apps Script backend ↔ Next.js frontend.

**Status:** Draft v1 (agreed before implementation)  
**Base URL:** Set via `NEXT_PUBLIC_RSVP_API_URL` (Apps Script Web App deploy URL)

---

## Overview

| Concern | Approach |
|--------|----------|
| Database | Google Spreadsheet (Guest List + RSVP Log) |
| Backend | Google Apps Script Web App (JSON REST) |
| Frontend | Next.js `/rsvp` routes |
| Auth | Guest code in URL (e.g. `JM001`) — treat as an invite token |
| CORS | Apps Script must return `Access-Control-Allow-Origin` for the site origin |

---

## Spreadsheet schema

### Sheet: `Guest List` (source of truth)

| Column | Key | Type | Notes |
|--------|-----|------|-------|
| A | `guestCode` | string | Unique, uppercase, e.g. `RVR-4RBSN` |
| B | `guestName` | string | Surname, first name |
| C | `seats` | number | Allotted number of seats |
| D | `phone` | string | Contact number/s (not written by API) |
| E | `email` | string | Email address/es (not written by API) |
| F | `physicalAddress` | string | Physical address (not written by API) |
| G | `rsvpStatus` | enum | `Pending` \| `Confirmed` \| `Declined` |
| H | `confirmedHeadcount` | number | Confirmed headcount after RSVP |
| I | `lastUpdated` | ISO datetime | Last RSVP change |
| J | `table` | string | Table number at reception (not written by API) |

### Sheet: `RSVP Log` (audit trail)

| Column | Key | Type |
|--------|-----|------|
| A | `timestamp` | ISO datetime |
| B | `guestCode` | string |
| C | `response` | `Accepted` \| `Declined` |
| D | `headcount` | number |
| E | `message` | string |

---

## Deploy Apps Script (Sprint 2)

1. Open your Google Sheet → **Extensions → Apps Script**
2. Replace `Code.gs` with [`google-apps-script/Code.gs`](../google-apps-script/Code.gs)
3. Confirm sheet tabs are named **`Guest List`** and **`RSVP Log`** with columns from [Spreadsheet schema](#spreadsheet-schema)
4. Run **`testFindGuest`** once (uses `JM001` in your sheet) to verify lookup
5. **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Copy the `/exec` URL into `.env.local`:
   ```
   NEXT_PUBLIC_RSVP_API_URL=https://script.google.com/macros/s/YOUR_ID/exec
   ```
7. Optional script properties: `RSVP_DEADLINE`, `ALLOWED_ORIGIN`

**POST note:** Frontend sends `Content-Type: text/plain` to avoid CORS preflight with Apps Script.

---

Apps Script uses a single Web App URL with `?path=` routing (or `doGet`/`doPost` path parsing). The **logical** paths below are what the frontend calls; map them in `Code.gs`.

### 1. Get guest

**`GET /guest/:guestCode`**

Lookup guest for personalized RSVP page.

#### Request

```
GET {BASE_URL}?path=guest/JM001
```

Or path-style if your script supports it:

```
GET {BASE_URL}/guest/JM001
```

#### Response `200 OK`

```json
{
  "ok": true,
  "data": {
    "guestCode": "JM001",
    "name": "John & Jane Doe",
    "seats": 2,
    "status": "Pending",
    "confirmedHeadcount": 0,
    "lastUpdated": null
  }
}
```

#### Response `404 Not Found`

```json
{
  "ok": false,
  "error": {
    "code": "GUEST_NOT_FOUND",
    "message": "We couldn't find that invitation code. Please check your invite or contact us."
  }
}
```

#### Response `400 Bad Request`

```json
{
  "ok": false,
  "error": {
    "code": "INVALID_GUEST_CODE",
    "message": "Invalid invitation code format."
  }
}
```

**Guest code format:** `RVR-4RBSN` style (`^[A-Z0-9]{2,6}-[A-Z0-9]{4,10}$`)

---

### 2. Submit RSVP

**`POST /rsvp`**

Submit or update a guest response.

#### Request

```
POST {BASE_URL}?path=rsvp
Content-Type: application/json
```

```json
{
  "guestCode": "RVR-MZGC5",
  "attending": true,
  "confirmedSeats": 1,
  "message": "Can't wait!"
}
```

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| `guestCode` | string | yes | Must exist in Guest List |
| `attending` | boolean | yes | `true` = accept, `false` = decline |
| `confirmedSeats` | number | if attending | `1..seats` when attending; `0` when declining |
| `message` | string | no | Max 1000 chars |

#### Response `200 OK`

```json
{
  "ok": true,
  "data": {
    "guestCode": "JM001",
    "status": "Confirmed",
    "confirmedHeadcount": 2,
    "lastUpdated": "2028-01-15T10:30:00+08:00"
  }
}
```

Declined example:

```json
{
  "ok": true,
  "data": {
    "guestCode": "JM001",
    "status": "Declined",
    "confirmedHeadcount": 0,
    "lastUpdated": "2028-01-15T10:30:00+08:00"
  }
}
```

#### Response `409 Conflict` — duplicate policy

**Policy (v1):** Allow updates until `siteConfig.rsvp.deadline` (enforced server-side). If you prefer block-after-first-submit, return:

```json
{
  "ok": false,
  "error": {
    "code": "ALREADY_RSVPED",
    "message": "You've already responded. Contact us if you need to make a change."
  }
}
```

**Recommended for v1:** Allow updates (upsert) — append to RSVP Log each time, update Guest List.

#### Response `422 Unprocessable Entity`

```json
{
  "ok": false,
  "error": {
    "code": "SEATS_EXCEEDED",
    "message": "Your invitation is for up to 2 guests.",
    "details": { "maxSeats": 2, "requested": 3 }
  }
}
```

Other codes:

| Code | HTTP | When |
|------|------|------|
| `GUEST_NOT_FOUND` | 404 | Unknown `guestCode` |
| `INVALID_PAYLOAD` | 400 | Missing/invalid fields |
| `RSVP_CLOSED` | 403 | Past deadline |
| `SERVER_ERROR` | 500 | Script/sheet failure |

---

## Frontend routes (Phase 3)

| Route | Purpose |
|-------|---------|
| `/rsvp/` | Optional code entry fallback |
| `/rsvp/[guestCode]/` | Personalized welcome + form |
| `/rsvp/success/` | Confirmation (query: `?code=JM001`) |

### Static export note

The site uses `output: "export"` for GitHub Pages. Dynamic `/rsvp/JM001` URLs require one of:

1. **`generateStaticParams`** — prebuild all guest codes at deploy time (redeploy when list changes), or  
2. **Client-side routing** — single `/rsvp/` page reads `window.location.pathname` and fetches guest via API, or  
3. **Move RSVP host to Vercel** — keep marketing site on Pages, RSVP on `reverie2028.com` with SSR.

**Recommendation:** Use **(2)** for flexibility until guest list is frozen, then **(1)** before invitations print.

---

## Environment variables

| Variable | Where | Example |
|----------|-------|---------|
| `NEXT_PUBLIC_RSVP_API_URL` | Next.js | `https://script.google.com/macros/s/.../exec` |
| `RSVP_DEADLINE` | Apps Script property | `2028-01-15T23:59:59+08:00` |

---

## TypeScript types (frontend)

```ts
export type RsvpStatus = "Pending" | "Confirmed" | "Declined";

export interface Guest {
  guestCode: string;
  name: string;
  seats: number;
  status: RsvpStatus;
  confirmedHeadcount: number;
  lastUpdated: string | null;
}

export interface GetGuestResponse {
  ok: true;
  data: Guest;
}

export interface SubmitRsvpRequest {
  guestCode: string;
  attending: boolean;
  confirmedSeats: number;
  message?: string;
}

export interface SubmitRsvpResponse {
  ok: true;
  data: {
    guestCode: string;
    status: Exclude<RsvpStatus, "Pending">;
    confirmedHeadcount: number;
    lastUpdated: string;
  };
}

export interface ApiError {
  ok: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
}
```

---

## Sprint mapping

| Sprint | Deliverable |
|--------|-------------|
| 1 | Spreadsheet columns + guest codes |
| 2 | Apps Script implementing this contract |
| 3 | `src/lib/rsvp-api.ts` + `/rsvp/[guestCode]` |
| 4 | RSVP form UI |
| 5 | Success page, errors, loading states |
| 6 | QR codes → `https://reverie2028.com/rsvp/JM001` |

---

## Open decisions

- [ ] **Duplicate policy:** Allow updates until deadline (recommended) vs block after first submit
- [ ] **Deadline:** Exact date for `RSVP_CLOSED`
- [ ] **Custom domain:** `reverie2028.com` DNS + static host for `/rsvp/*`
- [ ] **Decline flow:** Hide headcount/dietary fields when `attending: false`

Once these are checked off, Sprint 2 (Apps Script) and Sprint 3 (frontend) can proceed in parallel.
