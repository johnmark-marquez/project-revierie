"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Text } from "@/components/ui/typography";
import { RsvpLoading } from "@/components/rsvp/rsvp-loading";
import { RsvpPageHeader } from "@/components/rsvp/rsvp-page-header";
import { RsvpStatusBadge } from "@/components/rsvp/rsvp-status-badge";
import { useGuestCodeFromPath } from "@/hooks/useGuestCodeFromPath";
import { siteConfig } from "@/config/site";
import {
  isValidGuestCode,
  normalizeGuestCode,
  rsvpPath,
} from "@/lib/guest-code";
import { getGuest, RsvpApiError, submitRsvp } from "@/lib/rsvp-api";
import { cn } from "@/lib/utils";
import type { Guest } from "@/types/rsvp-api";

const fieldClassName =
  "w-full rounded-lg border border-border/60 bg-background px-3 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted-foreground focus:border-gold/60 focus:ring-2 focus:ring-gold/20";

interface RsvpGuestPageProps {
  fallbackCode?: string;
}

export function RsvpGuestPage({ fallbackCode }: RsvpGuestPageProps) {
  const router = useRouter();
  const guestCode = useGuestCodeFromPath(fallbackCode);
  const normalizedCode = normalizeGuestCode(guestCode);

  const [guest, setGuest] = useState<Guest | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [attending, setAttending] = useState<boolean | null>(null);
  const [confirmedSeats, setConfirmedSeats] = useState(1);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const loadGuest = useCallback(async () => {
    if (!isValidGuestCode(normalizedCode)) {
      setLoading(false);
      setLoadError("This invitation link doesn't look right. Please check your code.");
      return;
    }

    setLoading(true);
    setLoadError(null);

    try {
      const data = await getGuest(normalizedCode);
      setGuest(data);
      setConfirmedSeats(
        data.confirmedHeadcount > 0 ? data.confirmedHeadcount : data.seats || 1,
      );

      if (data.status === "Confirmed") {
        setAttending(true);
      } else if (data.status === "Declined") {
        setAttending(false);
      }
    } catch (error) {
      if (error instanceof RsvpApiError) {
        setLoadError(error.message);
      } else {
        setLoadError("Something went wrong loading your invitation. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }, [normalizedCode]);

  useEffect(() => {
    void loadGuest();
  }, [loadGuest]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!guest || attending === null) {
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const result = await submitRsvp({
        guestCode: normalizedCode,
        attending,
        confirmedSeats: attending ? confirmedSeats : 0,
        message: message.trim() || undefined,
      });

      const params = new URLSearchParams({
        code: result.guestCode,
        status: result.status,
      });
      router.push(`${rsvpPath()}success/?${params.toString()}`);
    } catch (error) {
      if (error instanceof RsvpApiError) {
        setSubmitError(error.message);
      } else {
        setSubmitError("We couldn't save your RSVP. Please try again.");
      }
      setSubmitting(false);
    }
  }

  if (!guestCode) {
    return (
      <>
        <RsvpPageHeader
          title="Invitation not found"
          description="This link doesn't include a valid invitation code."
          showDeadline={false}
        />
        <div className="mx-auto max-w-lg px-6 text-center">
          <Button
            nativeButton={false}
            render={<Link href={rsvpPath()} />}
          >
            Enter invitation code
          </Button>
        </div>
      </>
    );
  }

  if (loading) {
    return <RsvpLoading />;
  }

  if (loadError || !guest) {
    return (
      <>
        <RsvpPageHeader
          title="Invitation not found"
          description={loadError ?? "We couldn't find that invitation."}
          showDeadline={false}
        />
        <div className="mx-auto flex max-w-lg flex-col gap-3 px-6 sm:flex-row sm:justify-center">
          <Button
            nativeButton={false}
            render={<Link href={rsvpPath()} />}
            variant="outline"
          >
            Enter invitation code
          </Button>
          <Button type="button" onClick={() => void loadGuest()}>
            Try again
          </Button>
        </div>
      </>
    );
  }

  const alreadyResponded = guest.status !== "Pending";
  const firstName = guest.name.split(" ")[0];

  return (
    <>
      <RsvpPageHeader
        title={`Hello, ${firstName}`}
        description={
          alreadyResponded
            ? "You can update your response below."
            : "We would be honored to have you celebrate with us."
        }
      />

      <div className="mx-auto max-w-lg px-6">
        <div className="mb-4 flex justify-center">
          <RsvpStatusBadge status={guest.status} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your RSVP</CardTitle>
            <CardDescription>
              {guest.seats > 1
                ? `Your invitation includes up to ${guest.seats} guests.`
                : "Your invitation is for one guest."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <fieldset className="space-y-3">
                <legend className="text-sm font-medium text-ink">
                  Will you be attending?
                </legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition-colors",
                      attending === true
                        ? "border-gold/60 bg-gold/5"
                        : "border-border/60",
                    )}
                  >
                    <input
                      type="radio"
                      name="attending"
                      checked={attending === true}
                      onChange={() => setAttending(true)}
                      className="accent-gold"
                      required
                    />
                    <span className="text-sm">Joyfully accept</span>
                  </label>
                  <label
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition-colors",
                      attending === false
                        ? "border-gold/60 bg-gold/5"
                        : "border-border/60",
                    )}
                  >
                    <input
                      type="radio"
                      name="attending"
                      checked={attending === false}
                      onChange={() => setAttending(false)}
                      className="accent-gold"
                      required
                    />
                    <span className="text-sm">Regretfully decline</span>
                  </label>
                </div>
              </fieldset>

              {attending ? (
                <div className="space-y-2">
                  <label
                    htmlFor="confirmed-seats"
                    className="text-sm font-medium text-ink"
                  >
                    Number of guests attending
                  </label>
                  <select
                    id="confirmed-seats"
                    value={confirmedSeats}
                    onChange={(event) =>
                      setConfirmedSeats(Number(event.target.value))
                    }
                    className={fieldClassName}
                  >
                    {Array.from({ length: guest.seats }, (_, index) => index + 1).map(
                      (count) => (
                        <option key={count} value={count}>
                          {count}
                        </option>
                      ),
                    )}
                  </select>
                </div>
              ) : null}

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-ink">
                  Message for the couple
                </label>
                <textarea
                  id="message"
                  rows={3}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Optional"
                  className={`${fieldClassName} resize-y`}
                />
              </div>

              {submitError ? (
                <p className="text-sm text-destructive" role="alert">
                  {submitError}
                </p>
              ) : null}

              <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                {submitting
                  ? "Sending…"
                  : alreadyResponded
                    ? "Update RSVP"
                    : "Send RSVP"}
              </Button>

              <Text variant="caption" className="text-center text-muted-foreground">
                Please respond by {siteConfig.rsvp.deadline}
              </Text>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
