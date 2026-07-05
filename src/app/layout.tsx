import type { Metadata, Viewport } from "next";
import { inter, fraunces, jetbrainsMono } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0a0e13",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Achla - Full-stack & AI Engineer",
    template: "%s - Achla",
  },
  description:
    "Five years shipping web applications and applied AI systems. Laravel, React, and Python in production. Currently freelancing and open to full-stack & AI engineering roles.",
  keywords: [
    "full-stack developer",
    "AI Engineer",
    "Laravel",
    "React",
    "Python",
    "LangChain",
    "RAG",
    "freelance developer",
    "Christchurch",
    "New Zealand",
  ],
  authors: [{ name: "Achla" }],
  creator: "Achla",
  openGraph: {
    type: "website",
    locale: "en_NZ",
    url: "https://achla-dev.vercel.app",
    siteName: "achla.dev",
    title: "Achla - Full-stack & AI Engineer",
    description:
      "Five years shipping web applications and applied AI systems. Currently open to full-stack & AI engineering roles.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Achla - Full-stack & AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Achla - Full-stack & AI Engineer",
    description:
      "Five years shipping web applications and applied AI systems.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://achla-dev.vercel.app"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        inter.variable,
        fraunces.variable,
        jetbrainsMono.variable
      )}
    >
      <body className="font-body">{children}</body>
    </html>
  );
}