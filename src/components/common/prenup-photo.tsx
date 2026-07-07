import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { palette, type PaletteColor } from "@/lib/watercolor/palette";
import { assetPath } from "@/lib/asset-path";
import { cn } from "@/lib/utils";
import { Text } from "@/components/ui/typography";

export interface PrenupPhotoProps {
  alt: string;
  caption?: string;
  image?: string | null;
  tint?: PaletteColor;
  featured?: boolean;
  className?: string;
}

function placeholderGradient(tint: PaletteColor) {
  const primary = palette[tint];
  const secondary =
    tint === "mist" || tint === "sky"
      ? palette.lavender
      : tint === "rose" || tint === "coral"
        ? palette.peach
        : palette.mint;

  return `linear-gradient(145deg, color-mix(in srgb, ${primary} 28%, var(--ivory)) 0%, color-mix(in srgb, ${secondary} 22%, var(--ivory)) 100%)`;
}

export function PrenupPhoto({
  alt,
  caption,
  image,
  tint = "mist",
  featured = false,
  className,
}: PrenupPhotoProps) {
  const hasImage = Boolean(image);

  return (
    <figure
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border/60 bg-card/50 shadow-sm",
        className,
      )}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden",
          featured ? "aspect-[4/5] md:aspect-auto md:min-h-[26rem]" : "aspect-square",
        )}
      >
        {hasImage ? (
          <Image
            src={assetPath(image!)}
            alt={alt}
            fill
            sizes={
              featured
                ? "(max-width: 768px) 100vw, 66vw"
                : "(max-width: 768px) 50vw, 33vw"
            }
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: placeholderGradient(tint) }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.55),transparent_55%)]" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
              <div className="rounded-full border border-border/50 bg-ivory/70 p-3 backdrop-blur-sm">
                <ImageIcon className="size-5 text-muted-foreground" />
              </div>
              <Text variant="caption" className="max-w-[12rem] text-muted-foreground/80">
                Prenup photo coming soon
              </Text>
            </div>
          </div>
        )}
      </div>

      {caption ? (
        <figcaption className="border-t border-border/50 px-4 py-3">
          <Text variant="caption">{caption}</Text>
        </figcaption>
      ) : null}

      {!hasImage ? (
        <span className="sr-only">{alt}</span>
      ) : null}
    </figure>
  );
}
