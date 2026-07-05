// src/data/experience.ts
import { ExperienceItem } from "@/types";

export const experiences: ExperienceItem[] = [
  {
    date: "Jan 2024 – Present",
    title: "Freelance Full Stack & AI Engineer",
    location: "Christchurch, NZ",
    description:
      "Building a React Native home services marketplace app with Laravel REST API backend. Built and deployed a live AI Resume Matcher using Python, Streamlit and Groq API. Shipped a production RAG Q&A system with LangChain, FastAPI, and Qdrant. Developed end-to-end data analysis projects with stakeholder-ready reporting.",
    highlights: [
      "React Native marketplace app (in active development)",
      "AI Resume Matcher - shipped in one day",
      "RAG Q&A system - 100% test accuracy, 1.01s latency",
      "Automated HTML report generation for stakeholders",
    ],
  },
  {
    date: "Mar 2022 – Dec 2023",
    title: "Full Stack Web Developer - NJ Graphica",
    location: "India",
    description:
      "Backend development for multiple client web apps using Laravel (PHP), with frontend support in React/Vue across EdTech, Rakeback platform and e-commerce projects. Built and integrated REST APIs, designed MySQL schemas, and wrote optimized queries.",
    highlights: [
      "Catking.in EdTech platform (Laravel + Vue)",
      "Whispering Shouts poker platform",
      "Brew My Idea & Original Rides e-commerce",
      "REST API integration & MySQL optimization",
    ],
  },
  {
    date: "Jan 2019 – Feb 2022",
    title: "Junior Web Developer - Globehost Pvt. Ltd",
    location: "India",
    description:
      "Built multiple PHP/Laravel applications for small to mid-size clients, from requirements through deployment. Fixed production bugs, refactored backend modules for scalability, and wrote internal documentation for team knowledge sharing.",
    highlights: [
      "End-to-end client project delivery",
      "Production bug fixes & stability improvements",
      "Backend refactoring for scalability",
      "Internal documentation & knowledge sharing",
    ],
  },
];

export const certifications = [
  {
    title: "Datacom Software Development Job Simulation",
    issuer: "Forage",
    date: "Feb 2025",
  },
  {
    title: "Deloitte Australia Data Analytics Job Simulation",
    issuer: "Forage",
    date: "May 2025",
  },
  {
    title: "Docker Certification",
    issuer: "Docker",
    date: "Containerisation, lifecycle management, image workflows",
  },
];

export const toolbox = [
  {
    category: "Languages",
    items: ["PHP", "JavaScript", "TypeScript", "Python", "SQL" , "Java"],
  },
  {
    category: "Backend",
    items: ["Laravel", "Node.js", "FastAPI", "REST APIs" ,"Express"],
  },
  {
    category: "Frontend",
    items: ["React", "Vue.js", "React Native", "Tailwind", "HTML/CSS" ,"Next JS"],
  },
  {
    category: "AI / Data",
    items: ["LangChain", "Qdrant", "Groq", "Pandas", "NumPy", "Streamlit" ,"LangGraph" ,"CrewAI"],
  },
  {
    category: "Databases",
    items: ["MySQL", "PostgreSQL", "Qdrant" ,"MongoDB" ,"SqlLite"],
  },
  {
    category: "Tools",
    items: ["Git", "Docker", "VS Code", "Linux", "Jupyter" ,"AWS" ,"Claude"],
  },
];