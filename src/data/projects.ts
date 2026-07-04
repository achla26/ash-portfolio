// src/data/projects.ts
import { Project, FeaturedProjectData } from "@/types";

export const featuredProject: FeaturedProjectData = {
  title: "RAG Document Q&A",
  description:
    "A retrieval-augmented question-answering tool over uploaded documents - built to prove out a production-shaped RAG pipeline end to end, not just a notebook demo. The live console above runs on the same idea.",
  badge: "Featured build",
  pipeline: [
    { label: "Upload doc", icon: "upload" },
    { label: "Chunk text", icon: "chunk" },
    { label: "Embed vectors", icon: "embed" },
    { label: "Retrieve top-k", icon: "search" },
    { label: "Generate answer", icon: "chat" },
  ],
  metrics: [
    { value: "ChromaDB", label: "Vector store" },
    { value: "Chunk + rerank", label: "Retrieval strategy" },
    { value: "Python", label: "Core language" },
  ],
};

export const projects: Project[] = [
  {
    number: "02",
    title: "LangGraph Support Agent",
    description:
      "A multi-step conversational agent that routes between retrieval, tool calls, and clarifying questions instead of answering single-shot.",
    tags: ["LangGraph", "Chatbot"],
    linkLabel: "View case study",
    linkHref: "#",
  },
  {
    number: "03",
    title: "Client Web Strategy",
    description:
      "Freelance engagement for an NZ enterprise banking client, proposing UX and technical improvements to their home lending experience.",
    tags: ["Strategy", "Laravel"],
    linkLabel: "View case study",
    linkHref: "#",
  },
  {
    number: "04",
    title: "Job Tracker",
    description:
      "A lightweight application-tracking tool built for my own job search - stages, follow-ups, and notes in one place, actively in use.",
    tags: ["React", "Node.js"],
    linkLabel: "View repo",
    linkHref: "#",
  },
];