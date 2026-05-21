import { LucideIcon, Heart, Brain, Cpu, Shield, Zap, Globe, Utensils, Activity, Palette, Rocket } from "lucide-react";

export interface PortfolioTier {
  label: string;
  name: string;
  subtitle: string;
  summary: string;
  benchmarks?: string[];
}

export interface ValuePillar {
  index: string;
  headline: string;
  subline: string;
  body: string;
}

export interface ProcessPhase {
  stepNumber: string;
  frameworkNode: string;
  durationWindow: string;
  title: string;
  narrative: string;
}

export interface CaseStudyAssertion {
  vertical: string;
  transformType: string;
  headline: string;
  problemDescription: string;
  resolutionDescription: string;
  impactMetrics: string;
  activeNodes?: string[];
}

export interface FAQMatrixNode {
  question: string;
  answer: string;
}

export interface ServiceTheme {
  primary: string;
  secondary: string;
  accent: string;
  glow: string;
  glass: string;
}

export interface ServiceContent {
  _id: string;
  id: string;
  title: string;
  description: string;
  iconName: string;
  portfolioTiers?: PortfolioTier[];
  valuePillars?: ValuePillar[];
  processTimeline?: ProcessPhase[];
  caseStudies?: CaseStudyAssertion[];
  faqCollection?: FAQMatrixNode[];
  theme?: ServiceTheme;
}

export const iconMap: Record<string, LucideIcon> = {
  heart: Heart,
  brain: Brain,
  cpu: Cpu,
  shield: Shield,
  zap: Zap,
  globe: Globe,
  utensils: Utensils,
  activity: Activity,
  palette: Palette,
  rocket: Rocket,
};