export interface RetrievedChunk {
  source: string;
  score: number;
  preview: string;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string; // ISO string for LocalStorage compatibility
  retrieved?: RetrievedChunk[];
  isLoading?: boolean;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

export interface SuggestedQuestion {
  label: string;
  query: string;
  icon?: string;
}