import type { WatercolorScene } from "@/components/effects/watercolor/types";
import {
  createSeededRandom,
  hashString,
  seededShuffle,
} from "@/lib/watercolor/seeded-random";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

/** Apply stable, seeded variation so each section feels organic but stays SSR-safe. */
export function randomizeScene(
  scene: WatercolorScene,
  seed: string = scene.id,
): WatercolorScene {
  const rng = createSeededRandom(hashString(seed));

  const washes = scene.washes.map((wash, index) => {
    const washRng = createSeededRandom(hashString(`${seed}:${index}`));

    return {
      ...wash,
      size: Math.round(wash.size * washRng.range(0.88, 1.14)),
      blur: Math.round(wash.blur * washRng.range(0.9, 1.12)),
      opacity: clamp(
        (wash.opacity ?? 0.24) * washRng.range(0.9, 1.12),
        0.1,
        0.42,
      ),
      composition: {
        ...wash.composition,
        offset: {
          x: clamp(
            wash.composition.offset.x + washRng.range(-16, 16),
            -45,
            45,
          ),
          y: clamp(
            wash.composition.offset.y + washRng.range(-16, 16),
            -45,
            45,
          ),
        },
        rotation:
          (wash.composition.rotation ?? 0) + washRng.range(-24, 24),
        scale: (wash.composition.scale ?? 1) * washRng.range(0.9, 1.12),
        depth:
          (wash.composition.depth ?? 0) +
          (washRng.next() > 0.72 ? (washRng.next() > 0.5 ? 1 : -1) : 0),
      },
    };
  });

  return {
    ...scene,
    washes: seededShuffle(washes, rng.int(1_000_000)),
  };
}
