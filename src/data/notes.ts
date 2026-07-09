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
  interactive?: boolean;
}

const NOTES_BASE = "https://achla-notes.vercel.app";

export const notes: Note[] = [
  {
    id: "system-design-fundamentals",
    title: "System Design Fundamentals",
    description:
      "Deep dive into scaling, load balancing, CAP theorem, caching, sharding, and distributed systems with interactive simulators.",
    category: "System Design",
    format: "HTML",
    status: "In Progress",
    date: "2024",
    url: `${NOTES_BASE}/system-design-fundamentals.html`,
    interactive: true,
  },
  {
    id: "system-design-visualizer",
    title: "System Design Concepts Visualizer",
    description:
      "Visual walkthroughs of system design concepts — load balancers, hashing rings, message queues, and more with live diagrams.",
    category: "System Design",
    format: "HTML",
    status: "In Progress",
    date: "2024",
    url: `${NOTES_BASE}/system-design-concepts-visualizer.html`,
    interactive: true,
  },
  {
    id: "database-concepts",
    title: "Database Concepts",
    description:
      "Core database concepts — indexes, transactions, normalization, ACID properties, SQL vs NoSQL, and query optimization.",
    category: "Databases",
    format: "HTML",
    status: "In Progress",
    date: "2024",
    url: `${NOTES_BASE}/database-concepts.html`,
  },
  {
    id: "design-patterns",
    title: "Design Patterns",
    description:
      "Common software design patterns explained with code examples — Singleton, Factory, Observer, Strategy, and more.",
    category: "Architecture",
    format: "HTML",
    status: "In Progress",
    date: "2024",
    url: `${NOTES_BASE}/design-pattern.html`,
  },
  {
    id: "design-patterns-hinglish",
    title: "Design Patterns (Hinglish Edition)",
    description:
      "Design patterns explained in Hinglish for easier understanding — same patterns, more relatable language and examples.",
    category: "Architecture",
    format: "HTML",
    status: "In Progress",
    date: "2024",
    url: `${NOTES_BASE}/design-pattern-hinglish.html`,
  },
  {
    id: "networking",
    title: "Interactive Networking Notes",
    description:
      "Networking fundamentals with interactive visuals — TCP/UDP, HTTP/HTTPS, DNS, WebSockets, and how the internet actually works.",
    category: "Networking",
    format: "HTML",
    status: "In Progress",
    date: "2024",
    url: `${NOTES_BASE}/interactive-networks-notes.html`,
    interactive: true,
  },
  {
    id: "aws-floci-lab",
    title: "AWS FLoCI Lab Guide",
    description:
      "Hands-on AWS lab guide — services setup and cloud infrastructure best practices.",
    category: "Cloud / AWS",
    format: "HTML",
    status: "In Progress",
    date: "2024",
    url: `${NOTES_BASE}/aws-floci-lab-guide.html`,
  },
  {
    id: "java",
    title: "Interactive Java Notes",
    description:
      "java fundamentals with interactive code snippets and live examples — OOP, collections, streams, and more.",
    category: "Programming",
    format: "HTML",
    status: "In Progress",
    date: "2024",
    url: `${NOTES_BASE}/java-notes.html`,
    interactive: true,
  },
];

// Helper: get unique categories
export const getNoteCategories = (): string[] => {
  const categories = Array.from(new Set(notes.map((n) => n.category)));
  return ["All", ...categories];
};

// Helper: filter by category
export const getNotesByCategory = (category: string): Note[] => {
  if (category === "All") return notes;
  return notes.filter((n) => n.category === category);
};