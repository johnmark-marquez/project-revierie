import type { PaletteColor } from "@/lib/watercolor/palette";
import { palette } from "@/lib/watercolor/palette";
import { createSeededRandom, hashString } from "@/lib/watercolor/seeded-random";

export type WashIntensity = "bold" | "soft" | "whisper";

/** Left → right pigment flow: blue → green → gold → coral → violet */
const WASH_SPECTRUM: PaletteColor[] = [
  "sky",
  "mist",
  "sage",
  "mint",
  "sunshine",
  "buttercream",
  "apricot",
  "peach",
  "rose",
  "coral",
  "lavender",
  "lilac",
  "periwinkle",
];

export interface OrganicWashOptions {
  width: number;
  height: number;
  seed: string;
  intensity?: WashIntensity;
  verticalCenter?: number;
  tilt?: number;
}

const INTENSITY: Record<
  WashIntensity,
  { bandHeight: number; alpha: number; splatters: number; tendrils: number }
> = {
  bold: { bandHeight: 0.66, alpha: 1, splatters: 220, tendrils: 1.15 },
  soft: { bandHeight: 0.54, alpha: 0.84, splatters: 110, tendrils: 0.95 },
  whisper: { bandHeight: 0.4, alpha: 0.58, splatters: 50, tendrils: 0.72 },
};

function hexToRgb(hex: string) {
  const value = Number.parseInt(hex.slice(1), 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function hash01(x: number, seed: number) {
  const value = Math.sin(x * 12.9898 + seed * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function smoothNoise(x: number, seed: number) {
  const left = Math.floor(x);
  const fraction = x - left;
  const smooth = fraction * fraction * (3 - 2 * fraction);
  const a = hash01(left, seed);
  const b = hash01(left + 1, seed);
  return a * (1 - smooth) + b * smooth;
}

function fbm(x: number, seed: number, octaves = 4) {
  let total = 0;
  let amplitude = 1;
  let frequency = 1;
  let max = 0;

  for (let octave = 0; octave < octaves; octave += 1) {
    total += smoothNoise(x * frequency, seed + octave * 41) * amplitude;
    max += amplitude;
    amplitude *= 0.52;
    frequency *= 2.05;
  }

  return total / max;
}

function saturate(
  color: { r: number; g: number; b: number },
  amount: number,
) {
  const gray = 0.299 * color.r + 0.587 * color.g + 0.114 * color.b;

  return {
    r: Math.min(255, gray + (color.r - gray) * amount),
    g: Math.min(255, gray + (color.g - gray) * amount),
    b: Math.min(255, gray + (color.b - gray) * amount),
  };
}

function colorAt(colors: ReturnType<typeof hexToRgb>[], position: number) {
  const scaled = position * (colors.length - 1);
  const index = Math.floor(scaled);
  const fraction = scaled - index;
  const left = colors[Math.min(index, colors.length - 1)]!;
  const right = colors[Math.min(index + 1, colors.length - 1)]!;

  return saturate(
    {
      r: left.r * (1 - fraction) + right.r * fraction,
      g: left.g * (1 - fraction) + right.g * fraction,
      b: left.b * (1 - fraction) + right.b * fraction,
    },
    1.28,
  );
}

export function intensityForSceneId(sceneId: string, washOpacity?: number) {
  if (sceneId === "hero" || (washOpacity ?? 0) > 0.2) {
    return "bold" as const;
  }

  if ((washOpacity ?? 0) > 0.09) {
    return "soft" as const;
  }

  return "whisper" as const;
}

export function washOptionsForScene(
  sceneId: string,
  width: number,
  height: number,
  washOpacity?: number,
): OrganicWashOptions {
  const rng = createSeededRandom(hashString(sceneId));

  return {
    width,
    height,
    seed: sceneId,
    intensity: intensityForSceneId(sceneId, washOpacity),
    verticalCenter: rng.range(0.4, 0.56),
    tilt: rng.range(-3.5, 3.5),
  };
}

export function paintOrganicWash(
  ctx: CanvasRenderingContext2D,
  options: OrganicWashOptions,
) {
  const {
    width,
    height,
    seed,
    intensity = "soft",
    verticalCenter = 0.48,
    tilt = 0,
  } = options;
  const config = INTENSITY[intensity];
  const noiseSeed = hashString(seed);
  const rng = createSeededRandom(noiseSeed);
  const colors = WASH_SPECTRUM.map((name) => hexToRgb(palette[name]));
  const centerY = height * verticalCenter;
  const bandHalf = (height * config.bandHeight) / 2;
  const radians = (tilt * Math.PI) / 180;
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  const imageData = ctx.createImageData(width, height);
  const data = imageData.data;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const rotatedX = (x - width / 2) * cos - (y - centerY) * sin + width / 2;
      const nx = rotatedX / width;
      const topNoise =
        fbm(nx * 4.2, noiseSeed, 5) * 0.62 + fbm(nx * 9.5, noiseSeed + 17, 3) * 0.38;
      const bottomNoise =
        fbm(nx * 3.8 + 1.7, noiseSeed + 53, 5) * 0.64 +
        fbm(nx * 8.1, noiseSeed + 71, 3) * 0.36;
      const topEdge = centerY - bandHalf + topNoise * bandHalf * 0.72;
      const bottomEdge = centerY + bandHalf - bottomNoise * bandHalf * 0.68;
      const mid = (topEdge + bottomEdge) / 2;
      const halfBand = Math.max(12, (bottomEdge - topEdge) / 2);
      let alpha = 0;

      if (y >= topEdge && y <= bottomEdge) {
        const distFromMid = Math.abs(y - mid) / halfBand;
        const verticalFade = Math.pow(1 - distFromMid, 1.05);
        const pigment = fbm(nx * 14 + y * 0.02, noiseSeed + 120, 3);
        alpha = verticalFade * config.alpha * (0.72 + pigment * 0.28);
      } else {
        const outside =
          y < topEdge ? topEdge - y : y > bottomEdge ? y - bottomEdge : 0;
        const tendrilNoise = fbm(nx * 11 + y * 0.04, noiseSeed + 190, 2);

        if (outside < bandHalf * 0.42 * config.tendrils && tendrilNoise > 0.42) {
          alpha =
            (1 - outside / (bandHalf * 0.42)) *
            (tendrilNoise - 0.42) *
            2.4 *
            config.alpha *
            0.55;
        }
      }

      if (alpha <= 0.01) {
        continue;
      }

      const bleed = fbm(nx * 2.4, noiseSeed + 240, 2) * 0.08;
      const pigment = colorAt(colors, Math.min(1, Math.max(0, nx + bleed)));
      const idx = (y * width + x) * 4;

      data[idx] = pigment.r;
      data[idx + 1] = pigment.g;
      data[idx + 2] = pigment.b;
      data[idx + 3] = Math.min(255, alpha * 255);
    }
  }

  ctx.clearRect(0, 0, width, height);
  ctx.putImageData(imageData, 0, 0);

  ctx.globalCompositeOperation = "source-over";

  for (let index = 0; index < config.splatters; index += 1) {
    const x = rng.range(0, width);
    const y = centerY + rng.range(-bandHalf * 1.55, bandHalf * 1.55);
    const radius = rng.range(0.4, 5.2);
    const bleach = rng.next() > 0.72;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);

    if (bleach) {
      ctx.fillStyle = `rgba(255,255,255,${rng.range(0.12, 0.45)})`;
    } else {
      const color = saturate(colors[rng.int(colors.length)]!, 1.22);
      ctx.fillStyle = `rgba(${color.r},${color.g},${color.b},${rng.range(0.22, 0.58)})`;
    }

    ctx.fill();
  }

  for (let index = 0; index < config.splatters * 0.35; index += 1) {
    const x = rng.range(-width * 0.02, width * 1.02);
    const edge = rng.next() > 0.5 ? -1 : 1;
    const y =
      centerY +
      edge * bandHalf * rng.range(0.85, 1.35) +
      rng.range(-18, 18);
    const radius = rng.range(0.2, 2.4);
    const color = saturate(colors[rng.int(colors.length)]!, 1.22);

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${color.r},${color.g},${color.b},${rng.range(0.14, 0.38)})`;
    ctx.fill();
  }

  ctx.globalCompositeOperation = "source-over";
}

export function renderOrganicWashToCanvas(
  canvas: HTMLCanvasElement,
  options: OrganicWashOptions,
) {
  const context = canvas.getContext("2d", { alpha: true });

  if (!context) {
    return;
  }

  const targetWidth = Math.max(1, Math.round(options.width));
  const targetHeight = Math.max(1, Math.round(options.height));

  canvas.width = targetWidth;
  canvas.height = targetHeight;

  const scratch = document.createElement("canvas");
  scratch.width = targetWidth;
  scratch.height = targetHeight;

  const scratchContext = scratch.getContext("2d", { alpha: true });

  if (!scratchContext) {
    return;
  }

  paintOrganicWash(scratchContext, {
    ...options,
    width: targetWidth,
    height: targetHeight,
  });

  context.clearRect(0, 0, targetWidth, targetHeight);
  context.filter = "blur(0.6px)";
  context.drawImage(scratch, 0, 0);
  context.filter = "none";
}
