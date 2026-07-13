import type { WatercolorScene } from "./types";

export const heroScene: WatercolorScene = {
  id: "hero",
  background: "ivory",
  texture: "cotton",
  lighting: "morning",
  motion: true,
  washes: [
    {
      shape: "bloom",
      color: "coral",
      size: 480,
      blur: 38,
      opacity: 0.32,
      composition: {
        anchor: "top-left",
        offset: { x: 8, y: 12 },
        rotation: -22,
        depth: 0,
      },
    },
    {
      shape: "ribbon",
      color: "rose",
      size: 520,
      blur: 42,
      opacity: 0.28,
      composition: {
        anchor: "top-left",
        offset: { x: 22, y: 28 },
        rotation: -12,
        depth: 1,
      },
    },
    {
      shape: "petal",
      color: "peach",
      size: 440,
      blur: 36,
      opacity: 0.27,
      composition: {
        anchor: "top-left",
        offset: { x: 38, y: 18 },
        rotation: 8,
        depth: 2,
      },
    },
    {
      shape: "wash",
      color: "buttercream",
      size: 500,
      blur: 40,
      opacity: 0.25,
      composition: {
        anchor: "top-left",
        offset: { x: 52, y: 35 },
        rotation: -5,
        depth: 0,
      },
    },
    {
      shape: "cloud",
      color: "mint",
      size: 460,
      blur: 38,
      opacity: 0.27,
      composition: {
        anchor: "top-left",
        offset: { x: 65, y: 22 },
        rotation: 15,
        depth: 1,
      },
    },
    {
      shape: "splash",
      color: "sage",
      size: 420,
      blur: 44,
      opacity: 0.24,
      composition: {
        anchor: "top-left",
        offset: { x: 78, y: 38 },
        rotation: -8,
        depth: 0,
      },
    },
    {
      shape: "bloom",
      color: "sky",
      size: 400,
      blur: 36,
      opacity: 0.28,
      composition: {
        anchor: "top-left",
        offset: { x: 88, y: 18 },
        rotation: 20,
        depth: 2,
      },
    },
    {
      shape: "ribbon",
      color: "mist",
      size: 480,
      blur: 46,
      opacity: 0.22,
      composition: {
        anchor: "top-left",
        offset: { x: 18, y: 72 },
        rotation: 10,
        depth: 1,
      },
    },
    {
      shape: "wash",
      color: "periwinkle",
      size: 520,
      blur: 48,
      opacity: 0.2,
      composition: {
        anchor: "top-left",
        offset: { x: 42, y: 78 },
        rotation: -15,
        depth: 0,
      },
    },
    {
      shape: "petal",
      color: "lavender",
      size: 450,
      blur: 42,
      opacity: 0.23,
      composition: {
        anchor: "top-left",
        offset: { x: 68, y: 70 },
        rotation: 6,
        depth: 2,
      },
    },
    {
      shape: "cloud",
      color: "lilac",
      size: 430,
      blur: 45,
      opacity: 0.21,
      composition: {
        anchor: "top-left",
        offset: { x: 85, y: 82 },
        rotation: -18,
        depth: 1,
      },
    },
  ],
};

/** Light washes — story sections */
export const storyScene: WatercolorScene = {
  id: "story",
  background: "ivory",
  texture: "cotton",
  lighting: "afternoon",
  motion: false,
  washes: [
    {
      shape: "wash",
      color: "peach",
      size: 380,
      blur: 45,
      opacity: 0.14,
      composition: {
        anchor: "top-left",
        offset: { x: 10, y: 30 },
        rotation: -10,
        depth: 0,
      },
    },
    {
      shape: "cloud",
      color: "mint",
      size: 360,
      blur: 48,
      opacity: 0.13,
      composition: {
        anchor: "top-left",
        offset: { x: 85, y: 25 },
        rotation: 12,
        depth: 1,
      },
    },
    {
      shape: "splash",
      color: "periwinkle",
      size: 400,
      blur: 50,
      opacity: 0.12,
      composition: {
        anchor: "top-left",
        offset: { x: 50, y: 80 },
        rotation: -5,
        depth: 0,
      },
    },
  ],
};

/** Whisper washes — timeline */
export const detailsScene: WatercolorScene = {
  id: "details",
  background: "ivory",
  texture: "cotton",
  lighting: "afternoon",
  motion: false,
  washes: [
    {
      shape: "cloud",
      color: "sage",
      size: 340,
      blur: 52,
      opacity: 0.07,
      composition: {
        anchor: "top-left",
        offset: { x: 5, y: 20 },
        rotation: -8,
        depth: 0,
      },
    },
    {
      shape: "wash",
      color: "lavender",
      size: 360,
      blur: 55,
      opacity: 0.06,
      composition: {
        anchor: "top-left",
        offset: { x: 75, y: 60 },
        rotation: 12,
        depth: 1,
      },
    },
  ],
};

/** Hillside greens & sky — venues */
export const venueScene: WatercolorScene = {
  id: "venue",
  background: "ivory",
  texture: "linen",
  lighting: "afternoon",
  motion: false,
  washes: [
    {
      shape: "petal",
      color: "sage",
      size: 400,
      blur: 48,
      opacity: 0.11,
      composition: {
        anchor: "top-left",
        offset: { x: 8, y: 15 },
        rotation: -14,
        depth: 0,
      },
    },
    {
      shape: "bloom",
      color: "mint",
      size: 380,
      blur: 50,
      opacity: 0.1,
      composition: {
        anchor: "top-left",
        offset: { x: 72, y: 10 },
        rotation: 18,
        depth: 1,
      },
    },
    {
      shape: "cloud",
      color: "sky",
      size: 420,
      blur: 54,
      opacity: 0.09,
      composition: {
        anchor: "top-left",
        offset: { x: 40, y: 55 },
        rotation: 6,
        depth: 0,
      },
    },
    {
      shape: "wash",
      color: "mist",
      size: 360,
      blur: 52,
      opacity: 0.08,
      composition: {
        anchor: "top-left",
        offset: { x: 85, y: 70 },
        rotation: -10,
        depth: 2,
      },
    },
  ],
};

/** Warm invitation tones — RSVP */
export const rsvpScene: WatercolorScene = {
  id: "rsvp",
  background: "ivory",
  texture: "cotton",
  lighting: "morning",
  motion: true,
  washes: [
    {
      shape: "ribbon",
      color: "rose",
      size: 400,
      blur: 46,
      opacity: 0.12,
      composition: {
        anchor: "top-left",
        offset: { x: 12, y: 20 },
        rotation: -8,
        depth: 1,
      },
    },
    {
      shape: "splash",
      color: "apricot",
      size: 360,
      blur: 48,
      opacity: 0.11,
      composition: {
        anchor: "top-left",
        offset: { x: 78, y: 18 },
        rotation: 14,
        depth: 0,
      },
    },
    {
      shape: "bloom",
      color: "buttercream",
      size: 380,
      blur: 50,
      opacity: 0.1,
      composition: {
        anchor: "top-left",
        offset: { x: 48, y: 75 },
        rotation: -5,
        depth: 2,
      },
    },
  ],
};

/** Soft dawn wash — Save the Date */
export const saveTheDateScene: WatercolorScene = {
  id: "save-the-date",
  background: "ivory",
  texture: "cotton",
  lighting: "morning",
  motion: false,
  washes: [
    {
      shape: "wash",
      color: "rose",
      size: 400,
      blur: 56,
      opacity: 0.1,
      composition: {
        anchor: "top-left",
        offset: { x: 12, y: 20 },
        rotation: -8,
        depth: 0,
      },
    },
    {
      shape: "cloud",
      color: "mist",
      size: 420,
      blur: 58,
      opacity: 0.1,
      composition: {
        anchor: "top-left",
        offset: { x: 78, y: 35 },
        rotation: 12,
        depth: 1,
      },
    },
    {
      shape: "petal",
      color: "gold",
      size: 340,
      blur: 50,
      opacity: 0.08,
      composition: {
        anchor: "top-left",
        offset: { x: 45, y: 75 },
        rotation: -4,
        depth: 0,
      },
    },
  ],
};

/** Soft dusk close — footer */
export const footerScene: WatercolorScene = {
  id: "footer",
  background: "ivory",
  texture: "linen",
  lighting: "evening",
  motion: false,
  washes: [
    {
      shape: "wash",
      color: "lilac",
      size: 380,
      blur: 56,
      opacity: 0.09,
      composition: {
        anchor: "top-left",
        offset: { x: 10, y: 30 },
        rotation: -12,
        depth: 0,
      },
    },
    {
      shape: "cloud",
      color: "periwinkle",
      size: 400,
      blur: 58,
      opacity: 0.08,
      composition: {
        anchor: "top-left",
        offset: { x: 65, y: 25 },
        rotation: 10,
        depth: 1,
      },
    },
    {
      shape: "ribbon",
      color: "mist",
      size: 340,
      blur: 54,
      opacity: 0.07,
      composition: {
        anchor: "top-left",
        offset: { x: 35, y: 80 },
        rotation: -6,
        depth: 0,
      },
    },
  ],
};

export const scenePresets = {
  hero: heroScene,
  saveTheDate: saveTheDateScene,
  story: storyScene,
  details: detailsScene,
  venue: venueScene,
  rsvp: rsvpScene,
  footer: footerScene,
} as const;

export type ScenePresetId = keyof typeof scenePresets;
