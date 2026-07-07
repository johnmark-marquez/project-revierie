"use client";

import { palette } from "@/lib/watercolor/palette";
import { renderScene } from "@/lib/watercolor/renderer";
import { sceneForQuality } from "@/lib/watercolor/scene-quality";
import type { LightingPreset, TexturePreset } from "@/lib/watercolor/themes";
import { useWatercolorQuality } from "@/hooks/use-watercolor-quality";
import type { WatercolorQuality } from "@/hooks/use-watercolor-quality";
import { Lighting } from "./lighting";
import { Motion } from "./motion";
import { PaperTexture } from "./paperTexture";
import type { WatercolorScene } from "./types";
import { WatercolorLayer } from "./watercolorLayer";

interface Props {
  scene: WatercolorScene;
  children?: React.ReactNode;
  className?: string;
  texture?: TexturePreset;
  lighting?: LightingPreset;
  animated?: boolean;
  quality?: WatercolorQuality;
}

/**
 * Watercolor Engine public API.
 *
 * Scene → Composition → Washes → Texture → Lighting → Motion → Content
 */
export function WatercolorCanvas({
  scene,
  children,
  className = "",
  texture,
  lighting,
  animated,
  quality: qualityOverride,
}: Props) {
  const detectedQuality = useWatercolorQuality();
  const quality = qualityOverride ?? detectedQuality;
  const adaptedScene = sceneForQuality(scene, quality);
  const texturePreset = texture ?? adaptedScene.texture ?? "cotton";
  const lightingPreset = lighting ?? adaptedScene.lighting ?? "morning";
  const motionEnabled =
    quality === "full" && (animated ?? adaptedScene.motion ?? false);
  const washes = renderScene(adaptedScene, {
    lighting: lightingPreset,
    quality,
  });
  const useSvgFilters = quality === "full";
  const usePaperTexture = quality !== "minimal";

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor: palette[adaptedScene.background] }}
    >
      <Motion enabled={motionEnabled}>
        {washes.map((wash) => (
          <WatercolorLayer
            key={wash.key}
            wash={wash}
            quality={quality}
            useFilter={useSvgFilters}
          />
        ))}
      </Motion>

      {usePaperTexture ? (
        <PaperTexture preset={texturePreset} lite={quality !== "full"} />
      ) : null}
      {quality !== "minimal" ? <Lighting preset={lightingPreset} /> : null}

      <div className="relative z-10">{children}</div>
    </div>
  );
}
