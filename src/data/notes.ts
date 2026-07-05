export type NoteFormat = "HTML" | "PDF" | "Markdown";
export type NoteStatus = "In Progress" | "Complete";

export interface Note {
  id: string;
  title: string;
  description: string;
  category: string;
  format: NoteFormat;
  status: NoteStatus;
  date: string;
  url: string;
}

export const notes: Note[] = [
  {
    id: "system-design",
    title: "System Design Masterclass",
    description:
      "Interactive notes on scaling, caching, load balancing, CAP theorem, and distributed systems.",
    category: "Architecture",
    format: "HTML",
    status: "In Progress",
    date: "2024",
    url: "https://notes.achla.dev/system-design.html",
  },
  {
    id: "ai-resume-matcher",
    title: "AI Resume Matcher Notes",
    description:
      "Notes while building a production-ready resume matcher using Groq API and Streamlit.",
    category: "AI/ML",
    format: "HTML",
    status: "Complete",
    date: "2024",
    url: "https://notes.achla.dev/ai-resume-matcher.html",
  },
  {
    id: "docker-notes",
    title: "Docker Certification Notes",
    description:
      "Containerisation basics, lifecycle management, Dockerfile best practices.",
    category: "DevOps",
    format: "PDF",
    status: "Complete",
    date: "2025",
    url: "file:///C:/Users/Gurpreet/Downloads/_OceanofPDF.com_AI_Engineering_Building_Applications_-_Chip_Huyen.pdf",
  },
];