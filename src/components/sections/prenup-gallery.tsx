import { FadeIn } from "@/components/common/fade-in";
import { Ribbon } from "@/components/common/ribbon";
import { PrenupPhoto } from "@/components/common/prenup-photo";
import { SectionBackdrop } from "@/components/layout/section-backdrop";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Heading, Text } from "@/components/ui/typography";
import { siteConfig } from "@/config/site";

type PrenupPhotoEntry = (typeof siteConfig.prenup.photos)[number];

function isFeaturedPhoto(
  photo: PrenupPhotoEntry,
): photo is PrenupPhotoEntry & { featured: true } {
  return "featured" in photo && photo.featured === true;
}

function photoImage(photo: PrenupPhotoEntry): string | undefined {
  if ("image" in photo && typeof photo.image === "string") {
    return photo.image;
  }

  return undefined;
}

export function PrenupGallery() {
  const { prenup } = siteConfig;
  const featured = prenup.photos.find(isFeaturedPhoto);
  const supporting = prenup.photos.filter((photo) => !isFeaturedPhoto(photo));

  return (
    <Section
      id="prenup"
      aria-labelledby="prenup-heading"
      className="relative overflow-hidden"
    >
      <SectionBackdrop preset="venue" />
      <Container className="relative z-10">
        <FadeIn>
          <Ribbon className="mb-8 w-16" />
          <Text variant="caption" className="mb-2 tracking-[0.18em] uppercase">
            {prenup.eyebrow}
          </Text>
          <Heading as="h2" id="prenup-heading" className="mb-4">
            {prenup.title}
          </Heading>
          <Text className="mb-12 max-w-2xl text-muted-foreground">
            {prenup.description}
          </Text>
        </FadeIn>

        <div className="grid gap-3 sm:gap-4 md:grid-cols-3 md:grid-rows-2">
          {featured ? (
            <FadeIn delay={0.1} className="md:col-span-2 md:row-span-2">
              <PrenupPhoto
                alt={featured.alt}
                caption={featured.caption}
                image={photoImage(featured)}
                tint={featured.tint}
                featured
                className="h-full"
              />
            </FadeIn>
          ) : null}

          {supporting.map((photo, index) => (
            <FadeIn key={photo.id} delay={0.15 + index * 0.05}>
              <PrenupPhoto
                alt={photo.alt}
                caption={photo.caption}
                image={photoImage(photo)}
                tint={photo.tint}
              />
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
