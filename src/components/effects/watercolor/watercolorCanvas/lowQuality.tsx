"use client";

import { palette } from "@/lib/watercolor/palette";
import { OrganicWash } from "../organicWash";
import { PaperTexture } from "../paperTexture";
import type { WatercolorCanvasProps } from "./types";

/** Mobile — procedural organic wash, static paper, gentle opacity fade. */
export function LowQualityCanvas({
  scene,
  children,
  className = "",
  texture,
  animated,
}: WatercolorCanvasProps) {
  const texturePreset = texture ?? scene.texture ?? "cotton";
  const motionEnabled = animated ?? scene.motion ?? false;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor: palette[scene.background] }}
    >
      <OrganicWash scene={scene} animated={motionEnabled} />
      <PaperTexture preset={texturePreset} lite />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
