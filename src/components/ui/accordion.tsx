"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { assetPath } from "@/lib/asset-path";

interface FaqQrCode {
  name: string;
  image: string;
  imageAlt: string;
}

interface AccordionItemProps {
  question: string;
  answer: string;
  qrCodes?: readonly FaqQrCode[];
  defaultOpen?: boolean;
}

export function AccordionItem({
  question,
  answer,
  qrCodes,
  defaultOpen = false,
}: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-border/60">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <span className="text-h3 text-lg md:text-xl">{question}</span>
        <ChevronDown
          className={cn(
            "size-5 shrink-0 text-muted-foreground transition-transform duration-200",
            open && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>
      <div
        className={cn(
          "grid transition-all duration-200",
          open ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <p className="text-body text-muted-foreground">{answer}</p>
          {qrCodes && qrCodes.length > 0 ? (
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {qrCodes.map((qr) => (
                <figure
                  key={qr.name}
                  className="flex flex-col items-center rounded-lg border border-border/60 bg-background/60 p-4"
                >
                  <div className="relative aspect-square w-full max-w-[220px]">
                    <Image
                      src={assetPath(qr.image)}
                      alt={qr.imageAlt}
                      fill
                      sizes="(max-width: 640px) 50vw, 220px"
                      className="object-contain"
                    />
                  </div>
                  <figcaption className="mt-3 text-center text-sm text-foreground">
                    {qr.name}
                  </figcaption>
                </figure>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

interface AccordionProps {
  items: {
    question: string;
    answer: string;
    qrCodes?: readonly FaqQrCode[];
  }[];
}

export function Accordion({ items }: AccordionProps) {
  return (
    <div>
      {items.map((item, index) => (
        <AccordionItem
          key={item.question}
          question={item.question}
          answer={item.answer}
          qrCodes={item.qrCodes}
          defaultOpen={index === 0}
        />
      ))}
    </div>
  );
}
