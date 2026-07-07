import Link from "next/link";
import { FadeIn } from "@/components/common/fade-in";
import { Ribbon } from "@/components/common/ribbon";
import { SectionBackdrop } from "@/components/layout/section-backdrop";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { RsvpCodeForm } from "@/components/rsvp/rsvp-code-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { siteConfig } from "@/config/site";
import { rsvpPath } from "@/lib/guest-code";

export function Rsvp() {
  const { rsvp } = siteConfig;

  return (
    <Section
      id="rsvp"
      aria-labelledby="rsvp-heading"
      className="relative overflow-hidden"
    >
      <SectionBackdrop preset="rsvp" />
      <Container size="sm">
        <FadeIn>
          <div className="text-center">
            <Ribbon className="mx-auto mb-8 w-16" />
            <Heading as="h2" id="rsvp-heading" className="mb-4">
              RSVP
            </Heading>
            <Text className="mx-auto mb-12 max-w-lg text-muted-foreground">
              {rsvp.message}
            </Text>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <Card className="text-center">
            <CardHeader>
              <CardTitle>Please respond by</CardTitle>
              <CardDescription className="text-lg text-gold">
                {rsvp.deadline}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="mx-auto max-w-sm space-y-2 text-left text-sm text-muted-foreground">
                {rsvp.fields.map((field) => (
                  <li key={field} className="flex gap-2">
                    <span aria-hidden="true" className="text-gold">
                      ·
                    </span>
                    <span>{field}</span>
                  </li>
                ))}
              </ul>

              <div className="mx-auto max-w-sm space-y-4 text-left">
                <RsvpCodeForm
                  idPrefix="home-rsvp"
                  submitLabel={rsvp.buttonLabel}
                />
                <Text variant="caption" className="block text-center">
                  {rsvp.note}
                </Text>
              </div>

              <Button
                nativeButton={false}
                variant="outline"
                size="sm"
                render={<Link href={rsvpPath()} />}
              >
                Open full RSVP page
              </Button>
            </CardContent>
          </Card>
        </FadeIn>
      </Container>
    </Section>
  );
}
