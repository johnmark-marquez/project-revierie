/** Matches invitation codes like `RVR-4RBSN`. */
export const GUEST_CODE_PATTERN = /^[A-Z0-9]{2,6}-[A-Z0-9]{4,10}$/;

export function normalizeGuestCode(code: string): string {
  return code.trim().toUpperCase();
}

export function isValidGuestCode(code: string): boolean {
  return GUEST_CODE_PATTERN.test(normalizeGuestCode(code));
}

/** Build an RSVP path with optional GitHub Pages basePath. */
export function rsvpPath(guestCode?: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (!guestCode) {
    return `${base}/rsvp/`;
  }

  const normalized = encodeURIComponent(normalizeGuestCode(guestCode));
  return `${base}/rsvp/${normalized}/`;
}
