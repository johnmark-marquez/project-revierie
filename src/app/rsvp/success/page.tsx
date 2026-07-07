"use client";

import { CheckCircle2, Heart } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Ribbon } from "@/components/common/ribbon";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { RsvpShell } from "@/components/rsvp/rsvp-shell";
import { rsvpPath } from "@/lib/guest-code";

function SuccessContent() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const status = searchParams.get("status");

  const declined = status === "Declined";

  return (
    <div className="mx-auto max-w-lg px-6 text-center">
      <Ribbon className="mx-auto mb-6 w-16" />
      <div className="mb-4 flex justify-center">
        {declined ? (
          <Heart className="size-12 text-muted-foreground" aria-hidden="true" />
        ) : (
          <CheckCircle2 className="size-12 text-gold" aria-hidden="true" />
        )}
      </div>
      <Heading as="h1" className="mb-3">
        {declined ? "We'll miss you" : "Thank you!"}
      </Heading>
      <Text className="mb-8 text-muted-foreground">
        {declined
          ? "Your response has been recorded. We hope to celebrate with you another time."
          : "Your RSVP has been received. We can't wait to celebrate with you."}
      </Text>

      <Card>
        <CardHeader>
          <CardTitle>All set</CardTitle>
          <CardDescription>
            {code
              ? `Confirmation saved for invitation ${code}.`
              : "Your response is saved."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {code ? (
            <Button
              nativeButton={false}
              variant="outline"
              className="w-full"
              render={<Link href={rsvpPath(code)} />}
            >
              View or update RSVP
            </Button>
          ) : null}
          <Button nativeButton={false} className="w-full" render={<Link href="/" />}>
            Back to wedding site
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default function RsvpSuccessPage() {
  return (
    <RsvpShell>
      <Suspense
        fallback={
          <p className="text-center text-muted-foreground">Loading…</p>
        }
      >
        <SuccessContent />
      </Suspense>
    </RsvpShell>
  );
}
