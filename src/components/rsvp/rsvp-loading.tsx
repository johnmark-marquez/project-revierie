import { Text } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

interface RsvpLoadingProps {
  message?: string;
  className?: string;
}

export function RsvpLoading({
  message = "Loading your invitation…",
  className,
}: RsvpLoadingProps) {
  return (
    <div className={cn("mx-auto max-w-lg px-6 text-center", className)}>
      <div
        className="mx-auto mb-4 size-8 animate-spin rounded-full border-2 border-gold/30 border-t-gold"
        role="status"
        aria-label="Loading"
      />
      <Text className="text-muted-foreground">{message}</Text>
    </div>
  );
}
