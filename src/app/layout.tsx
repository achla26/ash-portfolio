import type { Metadata } from "next";
import { inter, fraunces, jetbrainsMono } from "@/lib/fonts";
import { cn } from "@/lib/utils"
import "./globals.css";

export const metadata: Metadata = {
  title: "Achla - Full-stack & AI Engineer",
  description:
    "Five years across web development and applied AI: Laravel and React in production, RAG pipelines and LangGraph agents on the side. Currently open to full-stack & AI engineering roles.",
  openGraph: {
    title: "Achla - Full-stack & AI Engineer",
    description:
      "Five years across web development and applied AI. Currently open to full-stack & AI engineering roles.",
    type: "website",
  },
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