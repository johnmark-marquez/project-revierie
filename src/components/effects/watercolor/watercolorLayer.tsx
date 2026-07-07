import type { RenderedWash } from "@/lib/watercolor/renderer";
import type { WatercolorQuality } from "@/hooks/use-watercolor-quality";
import { WatercolorShape } from "./watercolorShape";

interface Props {
  wash: RenderedWash;
  useFilter?: boolean;
  quality?: WatercolorQuality;
}

function washBlur(blur: number, quality: WatercolorQuality) {
  if (quality === "minimal") {
    return Math.min(6, Math.round(blur * 0.2));
  }

  if (quality === "reduced") {
    return Math.min(12, Math.round(blur * 0.3));
  }

  return Math.max(10, Math.round(blur * 0.4));
}

export function WatercolorLayer({
  wash,
  useFilter = true,
  quality = "full",
}: Props) {
  const cssBlur = washBlur(wash.blur, quality);

  return (
    <div
      className="absolute watercolor-wash"
      style={{
        left: wash.left,
        top: wash.top,
        width: wash.size,
        height: wash.size,
        opacity: wash.opacity,
        zIndex: Math.round(wash.depth * 10) + 1,
        filter: `blur(${cssBlur}px)`,
        mixBlendMode: quality === "full" ? "multiply" : "normal",
        transform: `
          translate(-50%, -50%)
          rotate(${wash.rotation}deg)
          scale(${wash.scale})
        `,
      }}
    >
      <WatercolorShape
        shape={wash.shape}
        color={wash.color}
        filterUrl={useFilter ? "url(#watercolor-wash)" : undefined}
      />
    </div>
  );
}
