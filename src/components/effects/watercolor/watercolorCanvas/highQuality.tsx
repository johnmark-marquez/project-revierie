"use client";

import { palette } from "@/lib/watercolor/palette";
import { Lighting } from "../lighting";
import { Motion } from "../motion";
import { OrganicWash } from "../organicWash";
import { PaperTexture } from "../paperTexture";
import type { WatercolorCanvasProps } from "./types";

/** Desktop — full organic wash, paper grain, drift motion. */
export function HighQualityCanvas({
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
      <Motion enabled={motionEnabled}>
        <OrganicWash scene={scene} animated={motionEnabled} />
      </Motion>

      <PaperTexture preset={texturePreset} />
      <Lighting preset={lightingPreset} />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
