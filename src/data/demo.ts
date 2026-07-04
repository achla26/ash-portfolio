// src/data/demo.ts
import { DemoChunk, DemoPreset } from "@/types";

export const demoPresets: DemoPreset[] = [
  { label: "AI tools?", query: "what AI tools does Achla use?" },
  { label: "Backend stack?", query: "what is Achla's backend stack?" },
  { label: "Data projects?", query: "what data projects has Achla built?" },
  { label: "Open to remote?", query: "is Achla open to remote work?" },
];

export const demoChunks: DemoChunk[] = [
  {
    id: "c1",
    text: "Achla is a full-stack developer with an MCA and roughly five years of professional experience, built across web development roles in India and Christchurch, New Zealand.",
    tags: ["background", "experience", "fullstack"],
  },
  {
    id: "c2",
    text: "Day-to-day stack is PHP/Laravel, React, and Node.js. Also works with Python for data analysis and AI - building RAG systems, LangChain pipelines, and data warehouses.",
    tags: ["stack", "backend", "ai", "rag", "laravel", "react", "node", "python"],
  },
  {
    id: "c3",
    text: "Currently freelancing independently - scoping and delivering client-facing web applications, data analysis projects, and digital audits for local businesses.",
    tags: ["freelance", "independent", "strategy"],
  },
  {
    id: "c4",
    text: "Built a production-ready RAG Q&A system using LangChain, Qdrant, and FastAPI with 100% accuracy on test queries and 1.01s average latency. Implements three guardrails: citation validation, hallucination detection, and confidence scoring.",
    tags: ["rag", "ai", "langchain", "qdrant", "fastapi", "project", "recent"],
  },
  {
    id: "c5",
    text: "Analyzed Walmart sales data across 45 stores using Python, Pandas, and SQL. Discovered 8.1x revenue gap between top and bottom stores and $54M annual holiday revenue impact.",
    tags: ["data", "analysis", "python", "sql", "pandas", "walmart", "project"],
  },
  {
    id: "c6",
    text: "Designed and built a SQL data warehouse with Bronze→Silver→Gold architecture, ETL stored procedures, star schema, and comprehensive data quality checks using PostgreSQL and Docker.",
    tags: ["data", "engineering", "sql", "warehouse", "etl", "postgresql", "project"],
  },
  {
    id: "c7",
    text: "Created a reusable Python EDA automation library with 5 modules: data summarization, missing value analysis, outlier detection (IQR and Z-score), visualization generation, and automated HTML reports.",
    tags: ["data", "python", "eda", "library", "analysis", "project"],
  },
  {
    id: "c8",
    text: "Built full-stack web applications including a poker platform (Laravel/Vue.js/WebSockets), medical research portal (Laravel), ecommerce platform (Laravel/Stripe), and photography portfolio.",
    tags: ["web", "laravel", "fullstack", "vue", "project", "client"],
  },
  {
    id: "c9",
    text: "Open to mid-level full-stack and AI engineering roles in Christchurch and remote. Also available for freelance projects.",
    tags: ["remote", "open", "roles", "work", "location", "freelance"],
  },
  {
    id: "c10",
    text: "AI and data tools used: Python, LangChain, Qdrant, FastAPI, Streamlit, Groq, Pandas, NumPy, Matplotlib, Seaborn, PostgreSQL, SQL, Jupyter notebooks.",
    tags: ["ai", "tools", "data", "python", "langchain", "qdrant", "sql"],
  },
];