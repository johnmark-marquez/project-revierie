import { FadeIn } from "@/components/common/fade-in";
import { Ribbon } from "@/components/common/ribbon";
import { SectionWashFade } from "@/components/effects/watercolor/section-wash-fade";
import { SectionBackdrop } from "@/components/layout/section-backdrop";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Heading, Text } from "@/components/ui/typography";
import { siteConfig } from "@/config/site";

type StoryMilestone = {
  when?: string;
  title: string;
  description: string;
};

const milestones = siteConfig.story.milestones as readonly StoryMilestone[];

export function OurStory() {
  return (
    <Section
      id="story"
      aria-labelledby="story-heading"
      className="relative overflow-hidden"
    >
      <SectionBackdrop preset="story" />
      <SectionWashFade position="top" />

      <Container className="relative z-10">
        <FadeIn>
          <Ribbon className="mb-8 w-16" />
          <Heading as="h2" id="story-heading" className="mb-4">
            {siteConfig.story.title}
          </Heading>
          <Text className="mb-12 max-w-2xl text-muted-foreground">
            {siteConfig.story.description}
          </Text>
        </FadeIn>

        <div className="relative space-y-0">
          <div
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-4 w-px bg-border md:left-1/2 md:-translate-x-px"
          />

          {milestones.map((milestone, index) => (
            <FadeIn key={milestone.title} delay={index * 0.1}>
              <div
                className={`relative flex flex-col gap-4 pb-12 md:flex-row md:gap-8 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="hidden flex-1 md:block" />

                <div
                  aria-hidden="true"
                  className="absolute left-4 z-10 size-3 -translate-x-1/2 rounded-full border-2 border-gold bg-ivory md:left-1/2"
                />

                <div className="flex-1 pl-10 md:pl-0">
                  {milestone.when ? (
                    <p className="mb-2 text-caption tracking-[0.18em] text-gold uppercase">
                      {milestone.when}
                    </p>
                  ) : null}
                  <Heading as="h3">{milestone.title}</Heading>
                  <Text className="mt-2 text-muted-foreground">
                    {milestone.description}
                  </Text>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
