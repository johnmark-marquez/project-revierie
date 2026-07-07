import guestCodes from "@/data/guest-codes.json";
import { RsvpGuestPage } from "@/components/rsvp/rsvp-guest-page";
import { RsvpShell } from "@/components/rsvp/rsvp-shell";

export function generateStaticParams() {
  return guestCodes.map((guestCode) => ({ guestCode }));
}

interface RsvpGuestRouteProps {
  params: Promise<{ guestCode: string }>;
}

export default async function RsvpGuestRoute({ params }: RsvpGuestRouteProps) {
  const { guestCode } = await params;

  return (
    <RsvpShell>
      <RsvpGuestPage fallbackCode={guestCode} />
    </RsvpShell>
  );
}
