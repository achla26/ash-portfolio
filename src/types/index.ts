// src/types/index.ts

export interface NavLink {
  label: string;
  href: string;
}

export interface HeroStat {
  value: string;
  label: string;
}

export interface SkillNode {
  id: string;
  label: string;
  x: number;
  y: number;
  tags: string;
}

export interface SkillEdge {
  from: string;
  to: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  techStack: string[];
  features: string[];
  github?: string;
  link?: string;
  featured: boolean;
  status: "completed" | "in-progress";
  year: string;
}

export type ProjectCategory =
  | "Data Analysis"
  | "Data Engineering"
  | "AI/ML"
  | "Web Development";

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectInsight {
  title: string;
  items: string[];
}

export interface ExperienceItem {
  date: string;
  title: string;
  location: string;
  description: string;
  highlights: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
}

export interface Principle {
  number: string;
  title: string;
  description: string;
}

export interface NowItem {
  bold: string;
  text: string;
}

export interface DemoChunk {
  id: string;
  text: string;
  tags: string[];
}

export interface DemoPreset {
  label: string;
  query: string;
}

export interface ToolboxGroup {
  category: string;
  items: string[];
}