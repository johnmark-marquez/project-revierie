import {
  footerScene,
  heroScene,
  rsvpScene,
  scenePresets,
  storyScene,
  venueScene,
  WatercolorCanvas,
} from "@/components/effects/watercolor";

const scenes = [
  { label: "Hero", scene: heroScene },
  { label: "Story", scene: storyScene },
  { label: "Venue", scene: venueScene },
  { label: "RSVP", scene: rsvpScene },
  { label: "Footer", scene: footerScene },
] as const;

export default function PlaygroundPage() {
  if (process.env.NODE_ENV === "production") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">
          Playground is only available in development.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory">
      <header className="border-b border-border px-6 py-4">
        <h1 className="text-h2">Watercolor Playground</h1>
        <p className="text-caption">
          Scene tester — {Object.keys(scenePresets).length} presets
        </p>
      </header>

      {scenes.map(({ label, scene }) => (
        <div key={scene.id} className="border-b border-border">
          <p className="px-6 py-3 text-sm font-medium text-muted-foreground">
            {label} ({scene.id}) — {scene.texture} / {scene.lighting}
            {scene.motion ? " · motion" : ""}
          </p>
          <WatercolorCanvas
            scene={scene}
            className="h-[60vh]"
            animated={scene.motion}
          />
        </div>
      ))}
    </div>
  );
}
