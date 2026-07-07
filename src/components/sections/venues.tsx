import { MapPin } from "lucide-react";
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

const venues = [
  {
    type: "Ceremony",
    ...siteConfig.wedding.ceremony,
  },
  {
    type: "Reception",
    ...siteConfig.wedding.reception,
  },
];

export function Venues() {
  return (
    <Section
      id="venues"
      aria-labelledby="venues-heading"
      className="relative overflow-hidden"
    >
      <SectionBackdrop preset="venue" />
      <Container>
        <FadeIn>
          <Ribbon className="mb-8 w-16" />
          <Heading as="h2" id="venues-heading" className="mb-4">
            Venues
          </Heading>
          <Text className="mb-12 max-w-2xl text-muted-foreground">
            Both celebrations take place in the beautiful hills of Tagaytay.
          </Text>
        </FadeIn>

        <div className="grid gap-6 md:grid-cols-2">
          {venues.map((venue, index) => (
            <FadeIn key={venue.type} delay={index * 0.1}>
              <Card className="h-full">
                <CardHeader>
                  <CardDescription>{venue.type}</CardDescription>
                  <CardTitle>{venue.venue}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-2 text-muted-foreground">
                    <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                    <span className="text-body">{venue.address}</span>
                  </div>
                  <p className="font-heading text-lg text-gold">{venue.time}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    nativeButton={false}
                    render={
                      <a
                        href={venue.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      />
                    }
                  >
                    View on Maps
                  </Button>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
