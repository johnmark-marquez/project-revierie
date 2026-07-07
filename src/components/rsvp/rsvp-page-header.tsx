import { Ribbon } from "@/components/common/ribbon";
import { Heading, Text } from "@/components/ui/typography";
import { siteConfig } from "@/config/site";

interface RsvpPageHeaderProps {
  title: string;
  description?: string;
  showDeadline?: boolean;
}

export function RsvpPageHeader({
  title,
  description,
  showDeadline = true,
}: RsvpPageHeaderProps) {
  return (
    <div className="mx-auto mb-8 max-w-lg px-6 text-center">
      <Ribbon className="mx-auto mb-6 w-16" />
      <Text variant="caption" className="mb-2 text-gold">
        {siteConfig.wedding.dateFormatted}
      </Text>
      <Heading as="h1" className="mb-2">
        {title}
      </Heading>
      {description ? (
        <Text className="text-muted-foreground">{description}</Text>
      ) : null}
      {showDeadline ? (
        <Text variant="caption" className="mt-4 text-muted-foreground">
          Please respond by {siteConfig.rsvp.deadline}
        </Text>
      ) : null}
    </div>
  );
}
