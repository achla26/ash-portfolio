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
  number: string;
  title: string;
  description: string;
  tags: string[];
  linkLabel: string;
  linkHref: string;
}

export interface FeaturedProjectData {
  title: string;
  description: string;
  badge: string;
  pipeline: PipelineStep[];
  metrics: Metric[];
}

export interface PipelineStep {
  label: string;
  icon: string;
}

export interface Metric {
  value: string;
  label: string;
}

export interface ExperienceItem {
  date: string;
  title: string;
  description: string;
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