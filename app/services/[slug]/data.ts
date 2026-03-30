import { 
  Heart, Brain, Cpu, Shield, Zap, Globe, 
  Utensils, Activity, Palette, Rocket, 
  LucideIcon 
} from "lucide-react";

export type ServiceTheme = {
  primary: string;     // Tailwind class: e.g., "blue-500"
  secondary: string;   // Tailwind class: e.g., "cyan-400"
  accent: string;      // Tailwind class: e.g., "text-blue-500"
  glow: string;        // Hex code for raw CSS Bloom (High Luminance)
  glass: string;       // Hex code with low alpha for borders/fills
};

export type ServiceContent = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  video: string;
  icon: LucideIcon;
  framework: string[];
  outcomes: string[];
  theme: ServiceTheme;
  philosophy: {
    heart: string;
    mind: string;
    tech: string;
  };
  features: {
    title: string;
    desc: string;
  }[];
  subServices: string[];
};

export const SERVICES_DATA: Record<string, ServiceContent> = {
  advisory: {
    id: "01",
    title: "Technology Advisory & Consulting",
    tagline: "Architecting the Digital Sovereignty of Your Future",
    description: "We bridge the gap between legacy limitations and future possibilities, ensuring technology serves as a catalyst for human potential.",
    video: "/videos/tech-advisory.mp4",
    icon: Shield,
    framework: ["Mind", "Technology"],
    outcomes: ["Digital Resilience", "Strategic Autonomy", "Architectural Excellence"],
    theme: {
      primary: "blue-500",
      secondary: "cyan-400",
      accent: "text-blue-500",
      glow: "#3b82f6", // Electric Blue
      glass: "rgba(59, 130, 246, 0.1)"
    },
    philosophy: {
      heart: "Technology is a tool; human flourishing is the goal.",
      mind: "Anticipating market shifts before they become disruptions.",
      tech: "Building invisible, frictionless, and secure foundations."
    },
    features: [
      { title: "Sovereign Architecture", desc: "Systems designed for long-term independence and scalability." },
      { title: "Cognitive Strategy", desc: "Advisory that respects human psychology and organizational culture." },
      { title: "Digital Trust", desc: "Prioritizing privacy and ethics in an era of opaque algorithms." }
    ],
    subServices: ["Digital Transformation", "Cloud Architecture", "Cybersecurity", "AI Strategy"]
  },
  strategic: {
    id: "02",
    title: "Strategic Ventures & Partnerships",
    tagline: "Incubating Ideas with a Human-Centric Pulse",
    description: "We don't just invest; we co-build. We align financial incentives with mission-driven outcomes.",
    video: "/videos/ventures.mp4",
    icon: Rocket,
    framework: ["Heart", "Mind"],
    outcomes: ["Market Disruption", "Founder Resilience", "Impact-Driven ROI"],
    theme: {
      primary: "violet-500",
      secondary: "fuchsia-400",
      accent: "text-violet-500",
      glow: "#8b5cf6", // Deep Purple Neon
      glass: "rgba(139, 92, 246, 0.1)"
    },
    philosophy: {
      heart: "Radical transparency and shared vulnerability.",
      mind: "Synthesizing disparate data into actionable venture logic.",
      tech: "Agile, automated operations for rapid pivotability."
    },
    features: [
      { title: "Co-Creation Engine", desc: "Turning high-level concepts into MVPs within weeks." },
      { title: "Global Network", desc: "Instant access to key decision-makers across five continents." },
      { title: "Ethical Capital", desc: "Structuring deals that protect the long-term vision." }
    ],
    subServices: ["Venture Incubation", "Growth Strategy", "Capital Advisory", "Market Entry"]
  },
  design: {
    id: "03",
    title: "Design Studio",
    tagline: "Where Invisible Intent Becomes Visible Beauty",
    description: "We translate abstract values into sensory experiences that feel like second nature.",
    video: "/videos/design.mp4",
    icon: Palette,
    framework: ["Heart"],
    outcomes: ["Brand Devotion", "Intuitive UX", "Sensory Cohesion"],
    theme: {
      primary: "rose-500",
      secondary: "orange-400",
      accent: "text-rose-500",
      glow: "#f43f5e", // Cyber Rose
      glass: "rgba(244, 63, 94, 0.1)"
    },
    philosophy: {
      heart: "Designing for the way people feel, not just click.",
      mind: "Layouts governed by cognitive load and hierarchy.",
      tech: "Engineering that treats performance as a design feature."
    },
    features: [
      { title: "Emotional Branding", desc: "Identities that resonate on a subconscious level." },
      { title: "User-Flow Empathy", desc: "Eliminating friction by predicting behavior patterns." },
      { title: "Future-Proof Systems", desc: "Modular design systems that evolve with your product." }
    ],
    subServices: ["UI/UX Design", "Brand Identity", "Visual Storytelling", "Product Strategy"]
  },
  arts: {
    id: "04",
    title: "Culinary Arts & Culture",
    tagline: "Tradition Refined by Science, Served with Soul",
    description: "We craft community-centric culinary concepts that celebrate heritage while leveraging modern food-tech.",
    video: "/videos/culinary.mp4",
    icon: Utensils,
    framework: ["Heart", "Technology"],
    outcomes: ["Cultural Impact", "Operational Efficiency", "Gastronomic Excellence"],
    theme: {
      primary: "amber-500",
      secondary: "orange-500",
      accent: "text-amber-500",
      glow: "#f59e0b", // Warm Ember
      glass: "rgba(245, 158, 11, 0.1)"
    },
    philosophy: {
      heart: "The kitchen is the center of the home.",
      mind: "Precision engineering applied to the art of flavor.",
      tech: "Sustainable supply chains tracked with transparency."
    },
    features: [
      { title: "Concept Innovation", desc: "From ghost kitchens to immersive cultural galleries." },
      { title: "Sustainable Sourcing", desc: "Hyper-local networks powered by logistical tech." },
      { title: "Sensory Engineering", desc: "Optimizing atmosphere, sound, and taste for memory." }
    ],
    subServices: ["Hospitality Design", "Food-Tech Integration", "Sustainability", "Cultural Curation"]
  },
  health: {
    id: "05",
    title: "Health & Wellness",
    tagline: "The Union of Ancient Wisdom and Applied Bio-Tech",
    description: "Wellness ecosystems that treat health as a proactive state of peak vitality.",
    video: "/videos/wellness.mp4",
    icon: Activity,
    framework: ["Heart", "Technology"],
    outcomes: ["Vitality Optimization", "Mental Resilience", "Data-Driven Peace"],
    theme: {
      primary: "emerald-500",
      secondary: "teal-400",
      accent: "text-emerald-500",
      glow: "#10b981", // Bio-Digital Green
      glass: "rgba(16, 185, 129, 0.1)"
    },
    philosophy: {
      heart: "Compassion-led care is the most powerful medicine.",
      mind: "Understanding the data of the body to predict and prevent.",
      tech: "Wearable tech that works in the background."
    },
    features: [
      { title: "Personalized Vitality", desc: "Health roadmaps tailored to unique genetic data." },
      { title: "Longevity Design", desc: "Structuring environments that promote health by default." },
      { title: "Mental Performance", desc: "Tools and techniques for clarity in a high-stress world." }
    ],
    subServices: ["Corporate Wellness", "Bio-Tech Advisory", "Performance Coaching", "Holistic Living"]
  }
};