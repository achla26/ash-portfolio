"use client";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Divider } from "@/components/layout/Divider";
import { GrainOverlay } from "@/components/effects/GrainOverlay";
import { MeshGradient } from "@/components/effects/MeshGradient";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { LiveDemo } from "@/components/sections/LiveDemo";
import { Work } from "@/components/sections/Work";
import { Experience } from "@/components/sections/Experience";
import { Principles } from "@/components/sections/Principles";
import { Contact } from "@/components/sections/Contact";

// Client-only components
const CustomCursor = dynamic(
  () =>
    import("@/components/effects/CustomCursor").then(
      (mod) => mod.CustomCursor
    ),
  { ssr: false }
);

const Hero = dynamic(
  () =>
    import("@/components/sections/Hero").then((mod) => mod.Hero),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      <CustomCursor />
      <MeshGradient />
      <GrainOverlay />

      <Navbar />

      <main id="top">
        <Hero />
        <Divider />
        <About />
        <Divider />
        <Skills />
        <Divider />
        <LiveDemo />
        <Divider />
        <Work />
        <Divider />
        <Experience />
        <Divider />
        <Principles />
        <Divider />
        <Contact />
      </main>

      <Footer />
    </>
  );
}