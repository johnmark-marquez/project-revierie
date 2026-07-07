"use client";

import { useId } from "react";
import type { TexturePreset } from "@/lib/watercolor/themes";
import { texturePresets } from "@/lib/watercolor/themes";

interface Props {
  preset?: TexturePreset;
  className?: string;
  lite?: boolean;
}

export function PaperTexture({
  preset = "cotton",
  className = "",
  lite = false,
}: Props) {
  const id = useId().replace(/:/g, "");
  const config = texturePresets[preset];

  if (lite) {
    return (
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 ${className}`}
        style={{
          opacity: config.intensity * 1.6,
          backgroundImage: [
            "radial-gradient(circle at 15% 20%, rgba(56,56,56,0.05) 0%, transparent 45%)",
            "radial-gradient(circle at 80% 70%, rgba(56,56,56,0.04) 0%, transparent 40%)",
            "radial-gradient(circle at 45% 55%, rgba(56,56,56,0.03) 0%, transparent 50%)",
          ].join(", "),
        }}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{ opacity: config.intensity }}
    >
      <svg className="h-full w-full" preserveAspectRatio="none">
        <defs>
          <filter
            id={`paper-cotton-grain-${id}`}
            x="0%"
            y="0%"
            width="100%"
            height="100%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency={config.grainFrequency}
              numOctaves="4"
              seed="3"
              stitchTiles="stitch"
              result="grain"
            />
            <feColorMatrix
              in="grain"
              type="matrix"
              values="0 0 0 0 0.45  0 0 0 0 0.42  0 0 0 0 0.38  0 0 0 0.4 0"
            />
          </filter>
          <filter id={`paper-fiber-${id}`} x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.04 0.9"
              numOctaves="2"
              seed="9"
              stitchTiles="stitch"
            />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.35  0 0 0 0 0.33  0 0 0 0 0.3  0 0 0 0.25 0"
            />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter={`url(#paper-cotton-grain-${id})`} />
        <rect
          width="100%"
          height="100%"
          filter={`url(#paper-fiber-${id})`}
          opacity={config.fiberOpacity}
        />
      </svg>
    </div>
  );
}
