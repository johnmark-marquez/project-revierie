"use client";

import { useEffect, useState } from "react";
import { FadeIn } from "@/components/common/fade-in";
import { Ribbon } from "@/components/common/ribbon";
import { SectionWashFade } from "@/components/effects/watercolor/section-wash-fade";
import { SectionBackdrop } from "@/components/layout/section-backdrop";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Heading, Text } from "@/components/ui/typography";
import { siteConfig } from "@/config/site";
import { daysUntilWedding } from "@/lib/wedding-countdown";

export function SaveTheDate() {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    setDays(daysUntilWedding());

    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const timeoutId = window.setTimeout(() => {
      setDays(daysUntilWedding());
    }, midnight.getTime() - Date.now());

    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <Section
      id="save-the-date"
      aria-labelledby="save-the-date-heading"
      className="relative overflow-hidden"
    >
      <SectionBackdrop preset="saveTheDate" />
      <SectionWashFade position="top" />
      <SectionWashFade position="bottom" />
      <Container className="relative z-10 text-center">
        <FadeIn>
          <Ribbon className="mx-auto mb-8 w-16" />
          <Heading as="h2" id="save-the-date-heading" className="mb-4">
            Save the Date
          </Heading>
          <Text className="mx-auto mb-10 max-w-md text-muted-foreground">
            Mark your calendars — we can&apos;t wait to celebrate with you.
          </Text>
        </FadeIn>

        <FadeIn delay={0.08}>
          <p className="font-heading text-2xl text-ink sm:text-3xl md:text-4xl">
            {siteConfig.wedding.dateFormatted}
          </p>
          <p className="mt-2 text-sm tracking-[0.16em] text-muted-foreground uppercase sm:text-base">
            {siteConfig.wedding.locationShort}
          </p>
        </FadeIn>

        <FadeIn delay={0.14} className="mt-12 md:mt-16">
          {days === null ? (
            <div
              aria-hidden="true"
              className="mx-auto h-20 w-32 animate-pulse rounded-lg bg-border/40 sm:h-24"
            />
          ) : days > 0 ? (
            <div>
              <p
                aria-live="polite"
                className="font-heading text-7xl leading-none text-ink sm:text-8xl md:text-9xl"
              >
                {days}
              </p>
              <p className="mt-3 text-sm tracking-[0.2em] text-muted-foreground uppercase">
                {days === 1 ? "day to go" : "days to go"}
              </p>
            </div>
          ) : days === 0 ? (
            <p
              aria-live="polite"
              className="font-heading text-3xl text-ink sm:text-4xl"
            >
              It&apos;s our wedding day
            </p>
          ) : (
            <p
              aria-live="polite"
              className="font-heading text-3xl text-ink sm:text-4xl"
            >
              We said I do
            </p>
          )}
        </FadeIn>
      </Container>
    </Section>
  );
}
