export type Theme = 'dark' | 'light';

export type SectionId = 'about' | 'skills' | 'experience' | 'contact';

export interface NavItem {
  id: SectionId;
  label: string;
}

export interface Skill {
  name: string;
  level: number;
  category: string; // 'Language' | 'Backend' | 'Frontend' | 'Cloud'
  icon?: string;
}

export interface Position {
  title: string;
  startDate: string;
  endDate: string | null;
  description: string;
}

export interface Experience {
  companyName: string;
  positions: Position[];
  skills: string[];
}

// Timeline JSON types (timeline.json)
export type TimelineType = 'work' | 'education' | 'milestone';

export interface TimelinePosition {
  title: string;
  startDate: string;
  endDate: string | null;
  description: string;
  isPromotion: boolean;
}

export interface TimelineEntry {
  id: string;
  type: TimelineType;
  organization?: string;
  positions?: TimelinePosition[];
  title?: string;
  description?: string;
}

export interface TimelineMeta {
  lastUpdated: string;
  authorName: string;
  siteTitle: string;
  siteDescription: string;
  totalEntries: number;
  careerStartYear: number;
  softwareCareerStartYear: number;
  filters: string[];
}

export interface TimelineData {
  meta: TimelineMeta;
  timeline: TimelineEntry[];
}

// Portfolio JSON types (portfolio.json)
export interface PortfolioContact {
  email: string;
  linkedIn: string;
  github: string;
  resumeUrl: string;
  timeline: string;
}

export interface PortfolioProfile {
  name: string;
  initials: string;
  position: string;
  roles: string[];
  tagline: string;
  contact: PortfolioContact;
  avatarUrl?: string;
}

export interface PortfolioData {
  profile: PortfolioProfile;
  about: { paragraphs: string[] };
  skills: Skill[];
  experience: Experience[];
  meta: { lastUpdated: string; siteTitle: string; siteDescription: string };
}
