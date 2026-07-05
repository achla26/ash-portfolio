import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GrainOverlay } from "@/components/effects/GrainOverlay";
import { MeshGradient } from "@/components/effects/MeshGradient";

export const metadata: Metadata = {
  title: "Notes",
  description:
    "Working notes on system design, AI, DevOps, and backend engineering by Achla.",
};

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MeshGradient />
      <GrainOverlay />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}