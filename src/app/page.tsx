import { SiteShell } from "@/components/layout/site-shell";
import { CelebrateCta } from "@/components/sections/celebrate-cta";
import { Faq } from "@/components/sections/faq";
import { HeroSection } from "@/components/sections/hero";
import { OurStory } from "@/components/sections/our-story";
import { PrenupGallery } from "@/components/sections/prenup-gallery";
import { Rsvp } from "@/components/sections/rsvp";
import { SaveTheDate } from "@/components/sections/save-the-date";
import { Timeline } from "@/components/sections/timeline";
import { Venues } from "@/components/sections/venues";
import { siteConfig } from "@/config/site";

export default function HomePage() {
  if (siteConfig.saveTheDateOnly) {
    return (
      <SiteShell>
        <HeroSection />
        <SaveTheDate />
        <CelebrateCta />
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <HeroSection />
      <SaveTheDate />
      {siteConfig.showOurStory ? <OurStory /> : null}
      {siteConfig.showPrenup ? <PrenupGallery /> : null}
      <Timeline />
      <Venues />
      <Rsvp />
      <Faq />
    </SiteShell>
  );
}
