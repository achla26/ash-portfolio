// src/app/projects/layout.tsx
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GrainOverlay } from "@/components/effects/GrainOverlay";
import { MeshGradient } from "@/components/effects/MeshGradient";

export default function ProjectsLayout({
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