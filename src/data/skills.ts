// src/data/skills.ts
import { SkillNode, SkillEdge } from "@/types";

export const skillNodes: SkillNode[] = [
  { id: "react", label: "React", x: 140, y: 80, tags: "react frontend js javascript" },
  { id: "js", label: "JavaScript", x: 90, y: 170, tags: "js javascript frontend" },
  { id: "html", label: "HTML/CSS", x: 210, y: 150, tags: "frontend css design html" },
  { id: "laravel", label: "Laravel", x: 150, y: 320, tags: "laravel php backend" },
  { id: "php", label: "PHP", x: 80, y: 270, tags: "php backend laravel" },
  { id: "node", label: "Node.js", x: 250, y: 280, tags: "node nodejs backend js javascript" },
  { id: "python", label: "Python", x: 400, y: 210, tags: "python backend ai" },
  { id: "rag", label: "RAG", x: 560, y: 110, tags: "rag ai python retrieval" },
  { id: "langgraph", label: "LangGraph", x: 660, y: 170, tags: "langgraph ai agent python" },
  { id: "chroma", label: "ChromaDB", x: 600, y: 250, tags: "chromadb vector ai rag" },
  { id: "chatbot", label: "Chatbots", x: 480, y: 290, tags: "chatbot ai" },
  { id: "freelance", label: "Freelancing", x: 690, y: 340, tags: "freelance nz strategy delivery client" },
];

export const skillEdges: SkillEdge[] = [
  { from: "react", to: "js" },
  { from: "react", to: "html" },
  { from: "js", to: "html" },
  { from: "laravel", to: "php" },
  { from: "laravel", to: "node" },
  { from: "php", to: "node" },
  { from: "node", to: "python" },
  { from: "laravel", to: "python" },
  { from: "python", to: "rag" },
  { from: "python", to: "langgraph" },
  { from: "python", to: "chroma" },
  { from: "python", to: "chatbot" },
  { from: "rag", to: "chroma" },
  { from: "rag", to: "langgraph" },
  { from: "langgraph", to: "chatbot" },
  { from: "chroma", to: "chatbot" },
  { from: "chatbot", to: "freelance" },
  { from: "laravel", to: "freelance" },
];