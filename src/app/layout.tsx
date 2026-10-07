import type { Metadata, Viewport } from "next";
import { inter, fraunces, jetbrainsMono } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import "./globals.css";
import { FloatingChatButton } from "@/components/chat/FloatingChatButton";

export const viewport: Viewport = {
  themeColor: "#0a0e13",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Achla - Software & Data Engineer",
    template: "%s - Achla",
  },
  description:
    "Software & data engineer (5+ yrs backend) building pipelines with SQL, Python, dbt and Airflow - plus applied AI systems. Open to data, AI and full-stack roles.",
  keywords: [
    "data engineer",
    "analytics engineer",
    "dbt",
    "SQL",
    "ETL",
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
    title: "Achla - Software & Data Engineer",
    description:
      "Software & data engineer building pipelines and applied AI systems. Open to data, AI and full-stack roles.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Achla - Software & Data Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Achla - Software & Data Engineer",
    description:
      "Software & data engineer: pipelines (SQL, dbt, Airflow) plus applied AI.",
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
      <body className="font-body">{children}
        <FloatingChatButton />
      </body>
    </html>
  );
}