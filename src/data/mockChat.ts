import { Message, SuggestedQuestion } from "@/types/chat";

export const suggestedQuestions: SuggestedQuestion[] = [
  { label: "Tell me about yourself", query: "Tell me about yourself", icon: "👋" },
  { label: "Best projects", query: "What are your best projects?", icon: "🚀" },
  { label: "Tech stack", query: "What is your tech stack?", icon: "⚡" },
  { label: "Why hire you?", query: "Why should I hire you?", icon: "💼" },
  { label: "Remote work?", query: "Are you open to remote work?", icon: "🌍" },
  { label: "Experience", query: "Tell me about your experience", icon: "📊" },
];

// Mock messages for testing UI
export const mockMessages: Message[] = [
  {
    id: "1",
    role: "user",
    content: "Tell me about your best projects",
    timestamp: new Date(Date.now() - 60000).toISOString(),
  },
  {
    id: "2",
    role: "assistant",
    content:
      "I've built several exciting projects, but my favorite is a **RAG-based portfolio chatbot** using LangChain and Groq. It answers questions about my work in real-time by retrieving relevant context from my resume and project docs.\n\nAnother project I'm proud of is a full-stack e-commerce platform built with Next.js and MongoDB, which handles 1000+ daily users. You can check both on my GitHub!",
    timestamp: new Date(Date.now() - 30000).toISOString(),

    retrieved: [
      {
        source: "projects.md",
        score: 0.89,
        preview: "RAG-based portfolio chatbot using LangChain and Groq API for real-time context retrieval...",
      },
      {
        source: "projects.md",
        score: 0.76,
        preview: "Full-stack e-commerce platform built with Next.js, MongoDB, and Stripe integration...",
      },
      {
        source: "about.md",
        score: 0.62,
        preview: "I love building things that solve real problems, especially in the AI/ML space...",
      },
    ],
  },
];

// Mock API response simulator
export function mockChatResponse(query: string): Promise<{ answer: string; retrieved: any[] }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        answer: `This is a mock response to your question: "${query}"\n\nOnce the backend is connected, you'll get a real AI-generated answer here based on my actual resume and project data.`,
        retrieved: [
          { source: "about.md", score: 0.85, preview: "Mock retrieved chunk 1..." },
          { source: "projects.md", score: 0.72, preview: "Mock retrieved chunk 2..." },
          { source: "skills.md", score: 0.65, preview: "Mock retrieved chunk 3..." },
        ],
      });
    }, 1500);
  });
}