import type { RsvpStatus } from "@/types/rsvp-api";
import { cn } from "@/lib/utils";

const statusStyles: Record<RsvpStatus, string> = {
  Pending: "border-gold/40 bg-gold/10 text-gold",
  Confirmed: "border-sage/50 bg-sage/20 text-ink",
  Declined: "border-border/60 bg-muted/50 text-muted-foreground",
};

const statusLabels: Record<RsvpStatus, string> = {
  Pending: "Awaiting response",
  Confirmed: "Confirmed",
  Declined: "Declined",
};

interface RsvpStatusBadgeProps {
  status: RsvpStatus;
  className?: string;
}

export function RsvpStatusBadge({ status, className }: RsvpStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium tracking-wide uppercase",
        statusStyles[status],
        className,
      )}
    >
      {statusLabels[status]}
    </span>
  );
}
