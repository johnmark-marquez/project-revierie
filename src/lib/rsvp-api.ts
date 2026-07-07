import type {
  ApiErrorBody,
  GetGuestResponse,
  Guest,
  SubmitRsvpRequest,
  SubmitRsvpResponse,
} from "@/types/rsvp-api";

const API_URL = process.env.NEXT_PUBLIC_RSVP_API_URL;
const POST_HEADERS = { "Content-Type": "text/plain;charset=utf-8" };

function getApiUrl() {
  if (!API_URL) {
    throw new Error(
      "NEXT_PUBLIC_RSVP_API_URL is not set. Add your Apps Script web app URL.",
    );
  }

  return API_URL.replace(/\/$/, "");
}

function buildUrl(path: string) {
  return `${getApiUrl()}?path=${encodeURIComponent(path)}`;
}

async function postJson<T>(path: string, body: unknown): Promise<T | ApiErrorBody> {
  const response = await fetch(buildUrl(path), {
    method: "POST",
    headers: POST_HEADERS,
    body: JSON.stringify(body),
    cache: "no-store",
  });

  return (await response.json()) as T | ApiErrorBody;
}

export async function getGuest(guestCode: string): Promise<Guest> {
  const normalized = guestCode.trim().toUpperCase();

  // POST is more reliable than GET with Apps Script redirects
  const data = await postJson<GetGuestResponse>("guest", {
    guestCode: normalized,
  });

  if (!data.ok) {
    throw new RsvpApiError(data);
  }

  return data.data;
}

export async function submitRsvp(
  payload: SubmitRsvpRequest,
): Promise<SubmitRsvpResponse["data"]> {
  const data = await postJson<SubmitRsvpResponse>("rsvp", {
    ...payload,
    guestCode: payload.guestCode.trim().toUpperCase(),
  });

  if (!data.ok) {
    throw new RsvpApiError(data);
  }

  return data.data;
}

export class RsvpApiError extends Error {
  code: string;
  details?: Record<string, unknown>;

  constructor(error: ApiErrorBody) {
    super(formatApiErrorMessage(error));
    this.name = "RsvpApiError";
    this.code = error.error.code;
    this.details = error.error.details;
  }
}

function formatApiErrorMessage(error: ApiErrorBody): string {
  if (error.error.code === "INVALID_PATH") {
    return "The RSVP server is out of date. The site owner needs to redeploy the Apps Script (Deploy → Manage deployments → New version).";
  }

  return error.error.message;
}
