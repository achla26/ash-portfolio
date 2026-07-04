// src/data/experience.ts
import { ExperienceItem } from "@/types";

export const experiences: ExperienceItem[] = [
  {
    date: "Ongoing",
    title: "Freelance Developer",
    description:
      "Taking on independent freelance projects - client strategy, web application delivery, and digital presence audits for local businesses in NZ and remotely.",
  },
  {
    date: "New Zealand",
    title: "Full-stack Developer",
    description:
      "Moved to Christchurch, NZ as a permanent resident; continued full-stack delivery while building applied AI skills - RAG, LangGraph, and chatbot systems.",
  },
  {
    date: "India",
    title: "Full-stack Developer - multiple roles",
    description:
      "Roughly five years across web development roles, working primarily in PHP/Laravel, React, and Node.js on client and product teams.",
  },
  {
    date: "Education",
    title: "MCA - Master of Computer Applications",
    description:
      "Foundation in computer science and applications, since extended with hands-on, self-directed AI engineering work.",
  },
];

export const toolbox = [
  { category: "Languages", items: ["PHP", "JavaScript", "TypeScript", "Python"] },
  { category: "Backend", items: ["Laravel", "Node.js", "REST APIs"] },
  { category: "Frontend", items: ["React", "HTML/CSS", "Tailwind"] },
  { category: "AI / ML", items: ["LangGraph", "ChromaDB", "RAG", "Embeddings"] },
  { category: "Tools", items: ["Git", "Docker", "VS Code", "Linux"] },
  { category: "Learning", items: ["AWS", "System Design", "AI Engineering"] },
];