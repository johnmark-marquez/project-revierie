"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  isValidGuestCode,
  normalizeGuestCode,
  rsvpPath,
} from "@/lib/guest-code";
import { cn } from "@/lib/utils";

const inputClassName =
  "w-full rounded-lg border border-border/60 bg-background px-3 py-2.5 font-mono text-sm tracking-wide text-ink uppercase outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-gold/60 focus:ring-2 focus:ring-gold/20";

interface RsvpCodeFormProps {
  idPrefix?: string;
  submitLabel?: string;
  className?: string;
  initialCode?: string;
}

export function RsvpCodeForm({
  idPrefix = "rsvp",
  submitLabel = "Continue",
  className,
  initialCode = "",
}: RsvpCodeFormProps) {
  const router = useRouter();
  const [code, setCode] = useState(initialCode);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = normalizeGuestCode(code);

    if (!isValidGuestCode(normalized)) {
      setError(
        "Please enter a valid invitation code (for example, RVR-4RBSN).",
      );
      return;
    }

    setError(null);
    router.push(rsvpPath(normalized));
  }

  const inputId = `${idPrefix}-guest-code`;
  const errorId = `${idPrefix}-guest-code-error`;

  return (
    <form className={cn("space-y-4", className)} onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label htmlFor={inputId} className="text-sm font-medium text-ink">
          Invitation code
        </label>
        <input
          id={inputId}
          name="code"
          type="text"
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          placeholder="RVR-4RBSN"
          value={code}
          onChange={(event) => {
            setCode(event.target.value);
            if (error) {
              setError(null);
            }
          }}
          className={inputClassName}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
        />
        {error ? (
          <p id={errorId} className="text-sm text-destructive">
            {error}
          </p>
        ) : null}
      </div>

      <Button type="submit" size="lg" className="w-full">
        {submitLabel}
      </Button>
    </form>
  );
}
