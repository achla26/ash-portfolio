// src/data/about.ts
import { NowItem } from "@/types";

export const aboutParagraphs = [
  `I'm Achla - a full-stack developer with an MCA and roughly <strong>five years of professional experience</strong>, built across web development roles in India and, more recently, working in Christchurch, New Zealand. My day-to-day stack is <strong>PHP/Laravel, React, and Node.js</strong>, and over the last stretch I've moved deliberately into <strong>applied AI</strong> - building RAG systems, agent graphs with LangGraph, and chatbots backed by ChromaDB. More recently I've specialised into <strong>data engineering</strong> - most visibly Shaky Isles, an hourly NZ quake pipeline (dbt + Airflow, tested, green CI).`,
  `Alongside full-time roles, I've been <strong>freelancing independently</strong> - scoping and delivering everything from client-facing web applications to strategy decks and full digital audits for local businesses.`,
];

export const aboutQuote =
  "I like projects where the backend logic and the AI layer both have to be right - not just impressive in a demo.";

export const nowItems: NowItem[] = [
  { bold: "Building", text: "a React Native home services marketplace app" },
  { bold: "Shipped", text: "AI Resume Matcher - built and deployed in one day" },
  { bold: "Shipped", text: "Shaky Isles quake pipeline - dbt + Airflow, green CI" },
  { bold: "Learning", text: "Azure + Fabric (DP-700 track) & Power BI" },
  {
    bold: "Reading",
    text: "AI Engineering (Chip Huyen) & Designing Data-Intensive Applications",
  },
  { bold: "Certified", text: "Docker, Datacom & Deloitte job simulations" },
];