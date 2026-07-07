import { Suspense } from "react";
import { CodeEntry } from "@/components/rsvp/code-entry";
import { RsvpShell } from "@/components/rsvp/rsvp-shell";

export default function RsvpIndexPage() {
  return (
    <RsvpShell>
      <Suspense
        fallback={
          <p className="text-center text-muted-foreground">Loading…</p>
        }
      >
        <CodeEntry />
      </Suspense>
    </RsvpShell>
  );
}
