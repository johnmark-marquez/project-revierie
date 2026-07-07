"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RsvpCodeForm } from "@/components/rsvp/rsvp-code-form";
import { RsvpPageHeader } from "@/components/rsvp/rsvp-page-header";

function CodeEntryContent() {
  const searchParams = useSearchParams();
  const initialCode = searchParams.get("code") ?? "";

  return (
    <>
      <RsvpPageHeader
        title="RSVP"
        description="Enter the invitation code from your invite to respond."
      />

      <div className="mx-auto max-w-lg px-6">
        <Card className="text-left">
          <CardHeader>
            <CardTitle>Invitation code</CardTitle>
            <CardDescription>
              It&apos;s printed on your invitation or QR card.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RsvpCodeForm initialCode={initialCode} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export function CodeEntry() {
  return (
    <Suspense fallback={<p className="text-center text-muted-foreground">Loading…</p>}>
      <CodeEntryContent />
    </Suspense>
  );
}
