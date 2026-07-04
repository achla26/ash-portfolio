import { Inter, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";

// Fraunces from Google Fonts
// next/font doesn't support variable optical size well for Fraunces
// so we use Inter and JetBrains from next/font, Fraunces via Google Fonts link 

import { Fraunces } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});