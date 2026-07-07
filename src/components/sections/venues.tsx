import { MapPin } from "lucide-react";
import Image from "next/image";
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
import { assetPath } from "@/lib/asset-path";
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

        <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
          {venues.map((venue, index) => (
            <FadeIn key={venue.type} delay={index * 0.1}>
              <Card className="h-full overflow-hidden p-0">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={assetPath(venue.image)}
                    alt={venue.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <CardHeader className="gap-2 px-6 pt-6 pb-0">
                  <CardDescription>{venue.type}</CardDescription>
                  <CardTitle>{venue.venue}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5 px-6 pt-4 pb-7">
                  <div className="flex items-start gap-2.5 text-muted-foreground">
                    <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                    <span className="text-body">{venue.address}</span>
                  </div>
                  <p className="font-heading text-lg text-gold">{venue.time}</p>
                  <div className="flex flex-wrap gap-3 pt-1">
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
                      Google Maps
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      nativeButton={false}
                      render={
                        <a
                          href={venue.wazeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        />
                      }
                    >
                      Waze
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
