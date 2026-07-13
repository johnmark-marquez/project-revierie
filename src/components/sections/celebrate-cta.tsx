import Link from "next/link";
import { FadeIn } from "@/components/common/fade-in";
import { Ribbon } from "@/components/common/ribbon";
import { SectionWashFade } from "@/components/effects/watercolor/section-wash-fade";
import { SectionBackdrop } from "@/components/layout/section-backdrop";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Heading, Text } from "@/components/ui/typography";
import { siteConfig } from "@/config/site";
import { rsvpPath } from "@/lib/guest-code";

export function CelebrateCta() {
  return (
    <Section
      id="celebrate"
      aria-labelledby="celebrate-heading"
      className="relative overflow-hidden"
    >
      <SectionBackdrop preset="rsvp" />
      <SectionWashFade position="top" />
      <Container size="sm" className="relative z-10 text-center">
        <FadeIn>
          <Ribbon className="mx-auto mb-8 w-16" />
          <Heading as="h2" id="celebrate-heading" className="mb-4">
            Come celebrate with us
          </Heading>
          <Text className="mx-auto mb-10 max-w-md text-muted-foreground">
            {siteConfig.rsvp.note}
          </Text>
          <Button
            nativeButton={false}
            size="lg"
            render={<Link href={rsvpPath()} />}
          >
            {siteConfig.rsvp.buttonLabel}
          </Button>
        </FadeIn>
      </Container>
    </Section>
  );
}
