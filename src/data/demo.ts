// src/data/demo.ts
import { DemoChunk, DemoPreset } from "@/types";

export const demoPresets: DemoPreset[] = [
  { label: "AI tools?", query: "what AI tools does Achla use?" },
  { label: "Backend stack?", query: "what is Achla's backend stack?" },
  { label: "Data projects?", query: "what data projects has Achla built?" },
  { label: "Open to remote?", query: "is Achla open to remote work?" },
  { label: "Experience?", query: "where has Achla worked?" },
];

export const demoChunks: DemoChunk[] = [
  {
    id: "c1",
    text: "Achla is a full-stack developer with an MCA and roughly five years of professional experience across web development roles in India and Christchurch, New Zealand. Currently freelancing independently.",
    tags: ["background", "experience", "fullstack", "freelance"],
  },
  {
    id: "c2",
    text: "Day-to-day stack is PHP/Laravel, React, Next.js, and Node.js. Also works with Python for AI and data analysis - building RAG systems, LangChain pipelines, and data projects with Pandas and SQL.",
    tags: ["stack", "backend", "ai", "rag", "laravel", "react", "node", "python", "vue"],
  },
  {
    id: "c3",
    text: "Worked at NJ Graphica (Mar 2022 – Dec 2023) as a Full Stack Web Developer on client projects including Catking.in EdTech, Whispering Shouts poker platform, and e-commerce platforms using Laravel, React, and Vue.",
    tags: ["experience", "nj", "graphica", "laravel", "catking", "work"],
  },
  {
    id: "c4",
    text: "Worked at Globehost Pvt. Ltd (Jan 2019 – Feb 2022) as a Junior Web Developer building PHP/Laravel applications for small to mid-size clients. Handled requirements through deployment.",
    tags: ["experience", "globehost", "junior", "laravel", "php", "work"],
  },
  {
    id: "c5",
    text: "Built a production-ready RAG Q&A system using LangChain, Qdrant, and FastAPI with 100% accuracy on test queries and 1.01s average latency. Implements citation validation, hallucination detection, and confidence scoring.",
    tags: ["rag", "ai", "langchain", "qdrant", "fastapi", "project", "recent"],
  },
  {
    id: "c6",
    text: "Built and deployed an AI Resume Matcher using Python, Streamlit, and Groq API within one day. Users paste a job description and resume to get a match score and improvement suggestions.",
    tags: ["ai", "resume", "streamlit", "groq", "python", "project", "shipped"],
  },
  {
    id: "c7",
    text: "Analyzed Walmart sales data across 45 stores using Python, Pandas, and SQL. Discovered 8.1x revenue gap between top and bottom stores and $54M annual holiday revenue impact.",
    tags: ["data", "analysis", "python", "sql", "pandas", "walmart", "project"],
  },
  {
    id: "c8",
    text: "Currently building a React Native home services marketplace app with a Laravel REST API backend as a freelance client project. Features service listings, booking flow, and JWT auth.",
    tags: ["react native", "mobile", "laravel", "freelance", "current", "project"],
  },
  {
    id: "c9",
    text: "Open to mid-level full-stack and AI engineering roles in Christchurch and remote. Also available for freelance projects.",
    tags: ["remote", "open", "roles", "work", "location", "freelance"],
  },
  {
    id: "c10",
    text: "AI and data tools: Python, LangChain, Qdrant, FastAPI, Streamlit, Groq, Pandas, NumPy, Matplotlib, Seaborn, PostgreSQL, SQL, Jupyter notebooks. Certified in Docker and completed Datacom and Deloitte job simulations.",
    tags: ["ai", "tools", "data", "python", "langchain", "qdrant", "sql", "docker", "certifications"],
  },
];