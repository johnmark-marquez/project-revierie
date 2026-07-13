"use client";

import { ChevronDown } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/config/site";

export function ScrollCue() {
  const prefersReducedMotion = useReducedMotion();
  const scrollToStory =
    siteConfig.showOurStory && !siteConfig.saveTheDateOnly;
  const href = scrollToStory ? "#story" : "#save-the-date";
  const label = scrollToStory
    ? "Scroll to our story"
    : "Scroll to save the date";

  return (
    <motion.a
      href={href}
      aria-label={label}
      className="mt-10 inline-flex text-muted-foreground transition-colors hover:text-gold"
      animate={prefersReducedMotion ? undefined : { y: [0, 5, 0] }}
      transition={
        prefersReducedMotion
          ? undefined
          : { duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }
      }
    >
      <ChevronDown className="size-5 opacity-75" aria-hidden="true" />
    </motion.a>
  );
}
