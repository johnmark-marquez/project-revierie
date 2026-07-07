"use client";

import { palette } from "@/lib/watercolor/palette";
import type { WatercolorScene } from "../types";
import { OrganicWash } from "../organicWash";
import { PaperTexture } from "../paperTexture";

interface StaticBackdropProps {
  scene: WatercolorScene;
  className?: string;
}

/** Static organic watercolor for section backgrounds. */
export function StaticBackdrop({ scene, className = "" }: StaticBackdropProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 ${className}`}
      style={{ backgroundColor: palette[scene.background] }}
    >
      <OrganicWash scene={scene} />
      <PaperTexture preset={scene.texture ?? "cotton"} lite />
    </div>
  );
}
