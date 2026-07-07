"use client";

import { FadeIn } from "@/components/common/fade-in";
import { Ribbon } from "@/components/common/ribbon";
import { ScrollCue } from "@/components/common/scroll-cue";
import {
  WatercolorCanvas,
  heroScene,
} from "@/components/effects/watercolor";
import { Heading, Text } from "@/components/ui/typography";
import { useRenderQuality } from "@/hooks/useRenderQuality";
import { siteConfig } from "@/config/site";

export function Hero() {
  const quality = useRenderQuality();

  return (
    <WatercolorCanvas
      scene={heroScene}
      className="min-h-screen"
      animated
    >
      <div className="relative flex min-h-screen flex-col items-center px-6 pt-28 pb-12 text-center md:pt-28">
        {quality === "low" ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-16 bottom-0 z-[2] bg-[radial-gradient(ellipse_at_center,rgba(250,248,245,0.55)_0%,rgba(250,248,245,0.2)_58%,transparent_90%)]"
          />
        ) : null}
        <FadeIn className="relative flex w-full max-w-2xl flex-col items-center">
          <Ribbon className="mb-5 w-28 md:w-36" />
          <Text variant="caption" className="mb-3 tracking-[0.2em] uppercase">
            We&apos;re getting married
          </Text>
          <Heading as="display" className="mb-4">
            {siteConfig.title}
          </Heading>
          <Text className="mx-auto max-w-md text-lg text-muted-foreground">
            {siteConfig.tagline}
          </Text>
          <p className="font-heading mt-5 text-2xl text-ink md:text-3xl">
            {siteConfig.wedding.dateFormatted}
          </p>
          <ScrollCue />
        </FadeIn>
      </div>
    </WatercolorCanvas>
  );
}

export function HeroSection() {
  return <Hero />;
}
