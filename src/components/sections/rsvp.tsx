import { FadeIn } from "@/components/common/fade-in";
import { Ribbon } from "@/components/common/ribbon";
import { SectionBackdrop } from "@/components/layout/section-backdrop";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
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

export function Rsvp() {
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
              {siteConfig.rsvp.message}
            </Text>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <Card className="text-center">
            <CardHeader>
              <CardTitle>Please respond by</CardTitle>
              <CardDescription className="text-lg text-gold">
                {siteConfig.rsvp.deadline}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                size="lg"
                className="min-w-48"
                nativeButton={false}
                render={
                  <a
                    href={siteConfig.rsvp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              >
                Respond to Invitation
              </Button>
            </CardContent>
          </Card>
        </FadeIn>
      </Container>
    </Section>
  );
}
