"use client";

import { useId } from "react";
import { useWatercolorQuality } from "@/hooks/use-watercolor-quality";
import { palette } from "@/lib/watercolor/palette";
import { rainbow } from "@/lib/watercolor/themes";
import { cn } from "@/lib/utils";

interface RibbonProps {
  className?: string;
  variant?: "straight" | "painted";
}

export function Ribbon({ className, variant = "painted" }: RibbonProps) {
  const id = useId().replace(/:/g, "");
  const quality = useWatercolorQuality();
  const usePaintFilter = quality === "full";

  if (variant === "straight") {
    return (
      <div
        aria-hidden="true"
        className={cn("h-px w-full", className)}
        style={{ background: "var(--rainbow-gradient)" }}
      />
    );
  }

  const gradientId = `ribbon-gradient-${id}`;
  const filterId = `ribbon-paint-${id}`;

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 16"
      className={cn("h-4 w-full", className)}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          {rainbow.map((color, i) => (
            <stop
              key={color}
              offset={`${(i / (rainbow.length - 1)) * 100}%`}
              stopColor={palette[color]}
            />
          ))}
        </linearGradient>
        <filter id={filterId} x="-10%" y="-50%" width="120%" height="200%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.08"
            numOctaves="3"
            seed="5"
            result="ribbonNoise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="ribbonNoise"
            scale="3"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
      <path
        d="M 2 9 C 28 4, 52 12, 78 7 S 128 11, 154 6 S 182 10, 198 8"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={usePaintFilter ? `url(#${filterId})` : undefined}
        opacity="0.85"
      />
    </svg>
  );
}
