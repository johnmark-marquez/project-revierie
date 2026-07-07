import type { WatercolorScene } from "@/components/effects/watercolor/types";
import type { WatercolorQuality } from "@/hooks/use-watercolor-quality";

const WASH_LIMITS: Record<WatercolorQuality, number | null> = {
  full: null,
  reduced: 6,
  minimal: 3,
};

export function sceneForQuality(
  scene: WatercolorScene,
  quality: WatercolorQuality,
): WatercolorScene {
  const limit = WASH_LIMITS[quality];

  if (limit === null) {
    return scene;
  }

  return {
    ...scene,
    motion: false,
    washes: scene.washes.slice(0, limit),
  };
}
