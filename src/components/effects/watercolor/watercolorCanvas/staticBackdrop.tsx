"use client";

import { palette } from "@/lib/watercolor/palette";
import type { WatercolorScene } from "../types";
import { OrganicWash } from "../organicWash";
import { PaperTexture } from "../paperTexture";
import { WashEdgeMask } from "../section-wash-fade";

interface StaticBackdropProps {
  scene: WatercolorScene;
  className?: string;
  /** Fade wash in from the top — for sections that follow the hero. */
  fadeTop?: boolean;
  /** Fade wash out toward the bottom — soft edge into the next section. */
  fadeBottom?: boolean;
}

/** Static organic watercolor for section backgrounds. */
export function StaticBackdrop({
  scene,
  className = "",
  fadeTop = false,
  fadeBottom = false,
}: StaticBackdropProps) {
  let wash: React.ReactNode = (
    <OrganicWash scene={scene} priority="low" className="h-full w-full" />
  );

  if (fadeBottom) {
    wash = <WashEdgeMask edge="bottom">{wash}</WashEdgeMask>;
  }

  if (fadeTop) {
    wash = <WashEdgeMask edge="top">{wash}</WashEdgeMask>;
  }

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 isolate ${className}`}
      style={{ backgroundColor: palette[scene.background] }}
    >
      <PaperTexture preset={scene.texture ?? "cotton"} lite className="z-0" />
      <div className="absolute inset-0 z-[1]">{wash}</div>
    </div>
  );
}
