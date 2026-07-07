import { FadeIn } from "@/components/common/fade-in";
import { Ribbon } from "@/components/common/ribbon";
import { SectionBackdrop } from "@/components/layout/section-backdrop";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Accordion } from "@/components/ui/accordion";
import { Heading, Text } from "@/components/ui/typography";
import { siteConfig } from "@/config/site";

export function Faq() {
  return (
    <Section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative overflow-hidden"
    >
      <SectionBackdrop preset="minimal" />
      <Container size="sm">
        <FadeIn>
          <Ribbon className="mb-8 w-16" />
          <Heading as="h2" id="faq-heading" className="mb-4">
            Frequently Asked Questions
          </Heading>
          <Text className="mb-12 max-w-2xl text-muted-foreground">
            Everything you need to know about our special day.
          </Text>
        </FadeIn>

        <FadeIn delay={0.1}>
          <Accordion items={[...siteConfig.faq]} />
        </FadeIn>
      </Container>
    </Section>
  );
}
