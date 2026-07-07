"use client";

import { useSyncExternalStore } from "react";
import { normalizeGuestCode } from "@/lib/guest-code";

function parseGuestCodeFromPath(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const escapedBase = base.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`${escapedBase}/rsvp/([^/]+)/?$`);
  const match = window.location.pathname.match(pattern);

  if (!match?.[1]) {
    return null;
  }

  return normalizeGuestCode(decodeURIComponent(match[1]));
}

function subscribe(callback: () => void) {
  window.addEventListener("popstate", callback);
  return () => window.removeEventListener("popstate", callback);
}

/** Resolve guest code from the current URL (supports static export + copied paths). */
export function useGuestCodeFromPath(fallback?: string): string {
  const fromPath = useSyncExternalStore(
    subscribe,
    parseGuestCodeFromPath,
    () => (fallback ? normalizeGuestCode(fallback) : null),
  );

  if (fromPath) {
    return fromPath;
  }

  return fallback ? normalizeGuestCode(fallback) : "";
}
