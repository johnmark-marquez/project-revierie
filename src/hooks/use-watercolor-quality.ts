"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

export type WatercolorQuality = "full" | "reduced" | "minimal";

function getQuality(): WatercolorQuality {
  if (typeof window === "undefined") {
    return "reduced";
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return "minimal";
  }

  if (window.matchMedia("(max-width: 640px)").matches) {
    return "minimal";
  }

  if (
    window.matchMedia("(max-width: 1024px)").matches ||
    window.matchMedia("(pointer: coarse)").matches
  ) {
    return "reduced";
  }

  return "full";
}

function subscribe(onStoreChange: () => void) {
  const queries = [
    window.matchMedia("(prefers-reduced-motion: reduce)"),
    window.matchMedia("(max-width: 640px)"),
    window.matchMedia("(max-width: 1024px)"),
    window.matchMedia("(pointer: coarse)"),
  ];

  queries.forEach((query) => query.addEventListener("change", onStoreChange));

  return () => {
    queries.forEach((query) =>
      query.removeEventListener("change", onStoreChange),
    );
  };
}

/** Downgrades expensive watercolor effects on phones and coarse-pointer devices. */
export function useWatercolorQuality(): WatercolorQuality {
  const clientQuality = useSyncExternalStore(
    subscribe,
    getQuality,
    (): WatercolorQuality => "reduced",
  );
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  // Match SSR/first paint, then apply device-specific quality after hydration.
  return hydrated ? clientQuality : "reduced";
}
