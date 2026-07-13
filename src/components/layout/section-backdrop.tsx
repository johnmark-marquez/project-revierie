"use client";

import {
  scenePresets,
  type ScenePresetId,
} from "@/components/effects/watercolor/scenes";
import { StaticBackdrop } from "@/components/effects/watercolor/watercolorCanvas/staticBackdrop";
import { PaperTexture } from "@/components/effects/watercolor/paperTexture";

export type BackdropPreset = ScenePresetId | "minimal";

interface SectionBackdropProps {
  preset: BackdropPreset;
}

function PaperOnlyBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 bg-ivory"
    >
      <PaperTexture preset="cotton" lite />
    </div>
  );
}

/**
 * Section backgrounds — static CSS watercolor on every device.
 * Only the hero uses the live WatercolorCanvas engine.
 */
export function SectionBackdrop({ preset }: SectionBackdropProps) {
  if (preset === "minimal" || preset === "hero") {
    return <PaperOnlyBackdrop />;
  }

  return (
    <StaticBackdrop
      scene={scenePresets[preset]}
      fadeTop={preset === "story" || preset === "saveTheDate"}
      fadeBottom={preset === "saveTheDate"}
    />
  );
}
