import Link from "next/link";
import { SectionBackdrop } from "@/components/layout/section-backdrop";
import { Container } from "@/components/layout/container";
import { siteConfig } from "@/config/site";

interface RsvpShellProps {
  children: React.ReactNode;
}

export function RsvpShell({ children }: RsvpShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-ivory">
      <SectionBackdrop preset="rsvp" />

      <header className="relative z-10 border-b border-border/40 bg-ivory/90 backdrop-blur-md">
        <Container className="flex items-center justify-between py-4">
          <Link
            href="/"
            className="font-heading text-lg tracking-wide text-ink transition-colors hover:text-gold"
          >
            {siteConfig.title}
          </Link>
          <Link
            href="/"
            className="text-sm text-muted-foreground transition-colors hover:text-ink"
          >
            Back to site
          </Link>
        </Container>
      </header>

      <main className="relative z-10 py-10 sm:py-14">{children}</main>
    </div>
  );
}
