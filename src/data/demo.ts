import { DemoChunk, DemoPreset } from "@/types";

export const demoPresets: DemoPreset[] = [
  { label: "AI tools?", query: "what AI tools does Achla use?" },
  { label: "Backend stack?", query: "what is Achla's backend stack?" },
  { label: "Open to remote?", query: "is Achla open to remote work?" },
  { label: "Recent work?", query: "what has Achla shipped recently?" },
];

export const demoChunks: DemoChunk[] = [
  {
    id: "c1",
    text: "Achla is a full-stack developer with an MCA and roughly five years of professional experience, built across web development roles in India and Christchurch, New Zealand.",
    tags: ["background", "experience", "fullstack"],
  },
  {
    id: "c2",
    text: "Day-to-day stack is Python, PHP/Laravel, React, and Node.js. Over the last stretch moved deliberately into applied AI - building RAG systems, agent graphs with LangGraph, and chatbots backed by ChromaDB.",
    tags: ["stack", "backend", "ai", "rag", "laravel", "react", "node"],
  },
  {
    id: "c3",
    text: "Currently freelancing independently - scoping and delivering everything from client-facing web applications to strategy decks and full digital audits for local businesses.",
    tags: ["freelance", "independent", "strategy"],
  },
  {
    id: "c4",
    text: "Currently shipping a RAG document Q&A project end-to-end. Reading AI Engineering (Chip Huyen) and Designing Data-Intensive Applications. Studying for an AWS certification.",
    tags: ["current", "rag", "aws", "learning", "recent"],
  },
  {
    id: "c5",
    text: "Built a retrieval-augmented question-answering tool over uploaded documents using ChromaDB as the vector store, with chunk and rerank retrieval strategy in Python.",
    tags: ["rag", "chromadb", "python", "ai", "project"],
  },
  {
    id: "c6",
    text: "Built a multi-step conversational agent using LangGraph that routes between retrieval, tool calls, and clarifying questions instead of answering single-shot.",
    tags: ["langgraph", "chatbot", "agent", "ai", "project"],
  },
  {
    id: "c7",
    text: "Open to mid-level full-stack and AI engineering roles in Christchurch and remote, across US/EU timezones.",
    tags: ["remote", "open", "roles", "work", "location"],
  },
  {
    id: "c8",
    text: "AI tools used: LangGraph, ChromaDB, RAG pipelines, Python for AI/ML, embeddings, vector search, chatbot systems.",
    tags: ["ai", "tools", "langgraph", "chromadb", "rag", "python", "embeddings"],
  },
  {
    id: "c9",
    text: "Backend stack: PHP, Laravel, Node.js, Python. Frontend: React, JavaScript, HTML/CSS.",
    tags: ["backend", "stack", "laravel", "php", "node", "python", "react", "frontend"],
  },
  {
    id: "c10",
    text: "Freelance project: delivered a web strategy presentation and analysis for an NZ enterprise banking client, proposing UX and technical improvements to their home lending experience.",
    tags: ["freelance", "strategy", "shipped", "recent", "nz", "client"],
  },
];