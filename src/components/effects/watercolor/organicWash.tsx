"use client";

import { useEffect, useRef } from "react";
import type { WatercolorScene } from "@/components/effects/watercolor/types";
import {
  renderOrganicWashToCanvas,
  washOptionsForScene,
} from "@/lib/watercolor/generate-organic-wash";

interface OrganicWashProps {
  scene: WatercolorScene;
  className?: string;
  animated?: boolean;
}

function averageWashOpacity(scene: WatercolorScene) {
  if (!scene.washes.length) {
    return 0.15;
  }

  const total = scene.washes.reduce(
    (sum, wash) => sum + (wash.opacity ?? 0.2),
    0,
  );

  return total / scene.washes.length;
}

/** Procedural horizontal watercolor band — organic edges, rainbow bleed, splatters. */
export function OrganicWash({ scene, className = "", animated }: OrganicWashProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const motionEnabled = animated ?? scene.motion ?? false;

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;

    if (!canvas || !container) {
      return;
    }

    const paint = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      if (width < 1 || height < 1) {
        return;
      }

      const pixelBudget = 520_000;
      const scale = Math.min(1, Math.sqrt(pixelBudget / (width * height)));
      const renderWidth = Math.max(320, Math.round(width * scale));
      const renderHeight = Math.max(180, Math.round(height * scale));

      renderOrganicWashToCanvas(
        canvas,
        washOptionsForScene(
          scene.id,
          renderWidth,
          renderHeight,
          averageWashOpacity(scene),
        ),
      );
    };

    paint();

    const observer = new ResizeObserver(() => {
      paint();
    });

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [scene.id, scene.washes]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-[1] h-full w-full ${motionEnabled ? "watercolor-opacity-motion" : ""} ${className}`}
    />
  );
}
