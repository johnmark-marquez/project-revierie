"use client";

import { useMemo } from "react";
import type { WatercolorScene } from "@/components/effects/watercolor/types";
import { randomizeScene } from "@/lib/watercolor/randomize-scene";

/** Stable seeded variation per scene id — safe for SSR and static export. */
export function useRandomizedScene(scene: WatercolorScene) {
  return useMemo(() => randomizeScene(scene, scene.id), [scene]);
}
