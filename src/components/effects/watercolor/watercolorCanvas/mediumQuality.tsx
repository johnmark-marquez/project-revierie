"use client";

import { palette } from "@/lib/watercolor/palette";
import { Lighting } from "../lighting";
import { OrganicWash } from "../organicWash";
import { PaperTexture } from "../paperTexture";
import type { WatercolorCanvasProps } from "./types";

/** Tablet — organic wash, static paper, opacity animation only. */
export function MediumQualityCanvas({
  scene,
  children,
  className = "",
  texture,
  lighting,
  animated,
}: WatercolorCanvasProps) {
  const texturePreset = texture ?? scene.texture ?? "cotton";
  const lightingPreset = lighting ?? scene.lighting ?? "morning";
  const motionEnabled = animated ?? scene.motion ?? false;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor: palette[scene.background] }}
    >
      <OrganicWash scene={scene} animated={motionEnabled} />
      <PaperTexture preset={texturePreset} lite />
      <Lighting preset={lightingPreset} />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
