"use client";

import { useState, useMemo } from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHead } from "@/components/ui/SectionHead";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { skillNodes, skillEdges } from "@/data/skills";

export function Skills() {
  const [search, setSearch] = useState("");

  const { matchedNodes, matchCount } = useMemo(() => {
    if (!search.trim()) {
      return { matchedNodes: new Set(skillNodes.map((n) => n.id)), matchCount: skillNodes.length };
    }

    const q = search.toLowerCase();
    const matched = new Set<string>();

    skillNodes.forEach((node) => {
      if (
        node.label.toLowerCase().includes(q) ||
        node.tags.toLowerCase().includes(q)
      ) {
        matched.add(node.id);
      }
    });

    return { matchedNodes: matched, matchCount: matched.size };
  }, [search]);

  const isEdgeActive = (from: string, to: string): boolean => {
    return matchedNodes.has(from) && matchedNodes.has(to);
  };

  const nodeMap = useMemo(() => {
    const map: Record<string, (typeof skillNodes)[0]> = {};
    skillNodes.forEach((n) => (map[n.id] = n));
    return map;
  }, []);

  const hasSearch = search.trim().length > 0;

  return (
    <Section id="skills">
      <Container>
        <ScrollReveal>
          <SectionHead
            tag="02 · Skills"
            title="How it all connects"
            description="A small embedding-style graph of what I work with. Search it - matching nodes light up, everything else fades."
          />

          <div className="bg-card backdrop-blur-[14px] border border-line-strong rounded-2xl p-2">
            {/* Search */}
            <div className="flex items-center gap-[10px] py-[14px] px-[18px] border-b border-line mb-[6px]">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="opacity-55 flex-shrink-0"
              >
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="try: rag, laravel, react, python..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent border-none outline-none text-paper font-mono text-[0.95rem] w-full placeholder:text-slate"
                autoComplete="off"
              />
              <span className="font-mono text-[0.72rem] text-paper-dim whitespace-nowrap">
                {matchCount} nodes
              </span>
            </div>

            {/* SVG Graph */}
            <svg
              viewBox="0 0 800 420"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto block"
            >
              {/* Edges */}
              {skillEdges.map((edge, i) => {
                const from = nodeMap[edge.from];
                const to = nodeMap[edge.to];
                if (!from || !to) return null;

                const active = isEdgeActive(edge.from, edge.to);
                const dimmed = hasSearch && !active;

                return (
                  <line
                    key={i}
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke={
                      active && hasSearch
                        ? "rgba(212,162,76,0.5)"
                        : "rgba(236,228,214,0.16)"
                    }
                    strokeWidth={1}
                    opacity={dimmed ? 0.15 : 1}
                    className="transition-all duration-300 ease-out"
                  />
                );
              })}

              {/* Nodes */}
              {skillNodes.map((node) => {
                const isMatched = matchedNodes.has(node.id);
                const dimmed = hasSearch && !isMatched;
                const isPython = node.id === "python";

                return (
                  <g key={node.id}>
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={
                        isPython
                          ? isMatched && hasSearch
                            ? 12
                            : 9
                          : isMatched && hasSearch
                          ? 10
                          : 7
                      }
                      fill={
                        isMatched && hasSearch
                          ? "#d4a24c"
                          : isPython
                          ? "#9b7a8c"
                          : "#171f27"
                      }
                      stroke="rgba(236,228,214,0.16)"
                      strokeWidth={1.5}
                      opacity={dimmed ? 0.25 : 1}
                      className="transition-all duration-300 ease-out"
                    />
                    <text
                      x={node.x}
                      y={node.y - 14}
                      textAnchor="middle"
                      className="font-mono"
                      fontSize={11}
                      fill={
                        isMatched && hasSearch
                          ? "#ece4d6"
                          : "#a49c92"
                      }
                      opacity={dimmed ? 0.25 : 1}
                      style={{ transition: "fill 0.3s, opacity 0.3s" }}
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Hint */}
            <div className="font-mono text-[0.72rem] text-slate py-[10px] px-[18px] pb-4">
              try <b className="text-mauve font-medium">python</b> to see it
              bridge both AI and backend clusters
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}