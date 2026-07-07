import type {
  WatercolorShapeName,
  WatercolorScene,
  WatercolorWash,
} from "@/components/effects/watercolor/types";
import { resolveComposition } from "@/lib/watercolor/composition";
import { palette } from "@/lib/watercolor/palette";
import { sceneForRenderQuality } from "@/lib/watercolor/render-quality";
import type { RenderQuality } from "@/hooks/useRenderQuality";

const SHAPE_PROFILES: Record<
  WatercolorShapeName,
  { rx: number; ry: number; layers: number; streak?: boolean }
> = {
  bloom: { rx: 70, ry: 52, layers: 2 },
  cloud: { rx: 88, ry: 48, layers: 3 },
  ribbon: { rx: 92, ry: 38, layers: 2, streak: true },
  petal: { rx: 48, ry: 82, layers: 2, streak: true },
  wash: { rx: 78, ry: 62, layers: 2 },
  splash: { rx: 62, ry: 58, layers: 3 },
};

function colorMix(hex: string, opacity: number) {
  return `color-mix(in srgb, ${hex} ${Math.round(opacity * 100)}%, transparent)`;
}

function compositionCenter(composition: WatercolorWash["composition"]) {
  const resolved = resolveComposition(composition);
  return {
    x: clampPercent(parseFloat(resolved.left)),
    y: clampPercent(parseFloat(resolved.top)),
    rotation: resolved.rotation,
  };
}

function clampPercent(value: number) {
  return Math.min(96, Math.max(4, value));
}

function washGradients(
  wash: WatercolorWash,
  strength: number,
  whisper: boolean,
) {
  const { x, y, rotation } = compositionCenter(wash.composition);
  const profile = SHAPE_PROFILES[wash.shape];
  const radians = (rotation * Math.PI) / 180;
  const color = palette[wash.color];
  const layers: string[] = [];

  const rx = profile.rx + (wash.size % 17) * 0.35;
  const ry = profile.ry + (wash.blur % 13) * 0.4;

  layers.push(
    `radial-gradient(ellipse ${rx}% ${ry}% at ${x}% ${y}%, ${colorMix(color, strength)} 0%, transparent 68%)`,
  );

  const offsetX = x + Math.cos(radians) * 9;
  const offsetY = y + Math.sin(radians) * 7;
  layers.push(
    `radial-gradient(ellipse ${ry * 0.82}% ${rx * 0.72}% at ${offsetX}% ${offsetY}%, ${colorMix(color, strength * 0.55)} 0%, transparent 72%)`,
  );

  if (profile.layers >= 3) {
    layers.push(
      `radial-gradient(ellipse 36% 28% at ${x - 6}% ${y + 5}%, ${colorMix(color, strength * 0.35)} 0%, transparent 80%)`,
    );
  }

  if (profile.streak) {
    const streakX = x + Math.cos(radians + 0.5) * 14;
    const streakY = y + Math.sin(radians + 0.5) * 10;
    layers.push(
      `linear-gradient(${rotation + 18}deg, ${colorMix(color, whisper ? 0.12 : 0.18)} 0%, transparent 72%)`,
    );
    layers.push(
      `radial-gradient(ellipse 24% 64% at ${streakX}% ${streakY}%, ${colorMix(color, strength * 0.28)} 0%, transparent 78%)`,
    );
  }

  return layers;
}

/** CSS-only rainbow wash — shape-aware layers instead of uniform circles. */
export function staticColorWash(
  scene: WatercolorScene,
  quality: RenderQuality = "low",
) {
  const adapted = sceneForRenderQuality(scene, quality);
  const whisper = scene.washes.every((wash) => (wash.opacity ?? 0.24) < 0.15);

  const layers = adapted.washes.flatMap((wash) => {
    const baseOpacity = wash.opacity ?? 0.22;
    const strength = Math.min(
      whisper ? 0.38 : 0.48,
      baseOpacity * (quality === "low" ? 2.8 : 2.2),
    );

    return washGradients(wash, strength, whisper);
  });

  return layers.join(", ");
}
