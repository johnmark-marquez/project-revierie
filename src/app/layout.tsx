import type { Metadata } from "next";
import { Geist_Mono, Cormorant_Garamond, Inter } from "next/font/google";
import { siteConfig } from "@/config/site";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: `${siteConfig.title} | ${siteConfig.wedding.dateFormatted}`,
  description: `Join ${siteConfig.title} in celebrating their wedding on ${siteConfig.wedding.dateFormatted} in Tagaytay.`,
  openGraph: {
    title: `${siteConfig.title} | ${siteConfig.wedding.dateFormatted}`,
    description: siteConfig.tagline,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="bg-background min-h-full antialiased"
      >
        {children}
      </body>
    </html>
  );
}
