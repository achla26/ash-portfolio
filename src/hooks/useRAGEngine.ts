"use client";

import { useState, useCallback } from "react";
import { demoChunks } from "@/data/demo";

interface RetrievedChunk {
  id: string;
  text: string;
  score: number;
}

interface RAGResult {
  chunks: RetrievedChunk[];
  answer: string;
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 1);
}

function computeScore(query: string, chunkText: string, tags: string[]): number {
  const queryTokens = tokenize(query);
  const textTokens = tokenize(chunkText);
  const tagString = tags.join(" ").toLowerCase();

  if (queryTokens.length === 0) return 0;

  let hits = 0;
  let tagHits = 0;

  queryTokens.forEach((qt) => {
    if (textTokens.some((tt) => tt.includes(qt) || qt.includes(tt))) hits++;
    if (tagString.includes(qt)) tagHits++;
  });

  const textScore = hits / queryTokens.length;
  const tagScore = tagHits / queryTokens.length;

  return Math.min(1, textScore * 0.6 + tagScore * 0.4);
}

function synthesizeAnswer(query: string, topChunks: RetrievedChunk[]): string {
  if (topChunks.length === 0 || topChunks[0].score < 0.1) {
    return "I couldn't find a strong match for that query in the portfolio content. Try asking about Achla's stack, AI tools, experience, or availability.";
  }

  const combined = topChunks
    .slice(0, 3)
    .map((c) => c.text)
    .join(" ");

  const queryLower = query.toLowerCase();

  if (queryLower.includes("ai tool") || queryLower.includes("ai")) {
    const aiSentences = combined
      .split(".")
      .filter(
        (s) =>
          s.toLowerCase().includes("ai") ||
          s.toLowerCase().includes("rag") ||
          s.toLowerCase().includes("langgraph") ||
          s.toLowerCase().includes("chroma")
      );
    if (aiSentences.length > 0) {
      return (
        aiSentences.join(". ").trim() +
        ". These tools form the core of Achla's applied AI toolkit."
      );
    }
  }

  if (queryLower.includes("backend") || queryLower.includes("stack")) {
    const stackSentences = combined
      .split(".")
      .filter(
        (s) =>
          s.toLowerCase().includes("laravel") ||
          s.toLowerCase().includes("php") ||
          s.toLowerCase().includes("node") ||
          s.toLowerCase().includes("python") ||
          s.toLowerCase().includes("stack")
      );
    if (stackSentences.length > 0) {
      return stackSentences.join(". ").trim() + ".";
    }
  }

  if (queryLower.includes("remote") || queryLower.includes("open")) {
    const remoteSentences = combined
      .split(".")
      .filter(
        (s) =>
          s.toLowerCase().includes("remote") ||
          s.toLowerCase().includes("open") ||
          s.toLowerCase().includes("roles")
      );
    if (remoteSentences.length > 0) {
      return remoteSentences.join(". ").trim() + ".";
    }
  }

  if (queryLower.includes("shipped") || queryLower.includes("recent")) {
    const recentSentences = combined
      .split(".")
      .filter(
        (s) =>
          s.toLowerCase().includes("shipped") ||
          s.toLowerCase().includes("currently") ||
          s.toLowerCase().includes("built") ||
          s.toLowerCase().includes("shipping")
      );
    if (recentSentences.length > 0) {
      return recentSentences.join(". ").trim() + ".";
    }
  }

  return topChunks[0].text;
}

export function useRAGEngine() {
  const [result, setResult] = useState<RAGResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const runQuery = useCallback((query: string) => {
    if (!query.trim()) return;

    setIsProcessing(true);

    // Simulate processing delay
    setTimeout(() => {
      const scored: RetrievedChunk[] = demoChunks
        .map((chunk) => ({
          id: chunk.id,
          text: chunk.text,
          score: computeScore(query, chunk.text, chunk.tags),
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 4);

      const answer = synthesizeAnswer(query, scored);

      setResult({ chunks: scored, answer });
      setIsProcessing(false);
    }, 600);
  }, []);

  return { result, isProcessing, runQuery };
}