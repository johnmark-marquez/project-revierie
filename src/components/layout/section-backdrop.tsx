"use client";

import { useEffect, useRef, useState } from "react";
import {
  scenePresets,
  type ScenePresetId,
} from "@/components/effects/watercolor/scenes";
import { PaperTexture } from "@/components/effects/watercolor/paperTexture";
import { WatercolorCanvas } from "@/components/effects/watercolor/watercolorCanvas";
import { useWatercolorQuality } from "@/hooks/use-watercolor-quality";

export type BackdropPreset = ScenePresetId | "minimal";

interface SectionBackdropProps {
  preset: BackdropPreset;
}

function PaperOnlyBackdrop() {
  const quality = useWatercolorQuality();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 bg-ivory"
    >
      <PaperTexture preset="cotton" lite={quality !== "full"} />
    </div>
  );
}

/**
 * Section backgrounds mapped to scene presets.
 * Defers heavy canvases until near the viewport and downgrades on phones.
 */
export function SectionBackdrop({ preset }: SectionBackdropProps) {
  const quality = useWatercolorQuality();
  const ref = useRef<HTMLDivElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsNearViewport(entry?.isIntersecting ?? false);
      },
      { rootMargin: "120px 0px", threshold: 0.01 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  if (preset === "minimal" || preset === "hero" || quality === "minimal") {
    return <PaperOnlyBackdrop />;
  }

  const scene = scenePresets[preset];

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10"
    >
      {isNearViewport ? (
        <WatercolorCanvas scene={scene} className="h-full" />
      ) : (
        <PaperOnlyBackdrop />
      )}
    </div>
  );
}
