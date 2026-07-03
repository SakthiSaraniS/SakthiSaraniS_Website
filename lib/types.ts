export type Project = {
  slug: string;
  title: string;
  shortDescription: string;
  logo: string; // path under /public, e.g. '/logos/bedrock.svg'
  domainTags: string[]; // subset of DOMAIN_FILTERS
  skillTags: string[]; // subset of SKILL_FILTERS
  fullToolList: string[]; // everything, shown on detail page only
  body: {
    problem: string;
    role: string;
    challenges: string;
    results?: string;
    skillBreakdown?: {
      high: string[];
      solid: string[];
      basic: string[];
      limitations?: string[];
    };
  };
  images: string[]; // paths under /public
  links: {
    github?: string;
    demo?: string;
    paper?: string;
  };
};

export type BackgroundEntryType =
  'education' | 'club' | 'internship' | 'certification' | 'experience';

export type BackgroundEntry = {
  slug?: string; // only present when clickable
  title: string;
  dateRange: string;
  type: BackgroundEntryType;
  clickable: boolean;
  tags?: string[]; // used for the Projects-page filter crossover
  shortDescription: string;
  body?: {
    whatIDid: string;
    whatILearned: string;
    outcome?: string;
  };
};

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags?: string[];
  body: string;
};

// Shared filter taxonomy — the single source of truth both
// /projects and Background-entry tagging pull from.
export const DOMAIN_FILTERS = [
  'Cloud / AI Infrastructure',
  'Machine Learning',
  'IoT / Embedded Systems',
  'Data Engineering',
  'Software Engineering / Full-Stack',
  'Cybersecurity',
] as const;

export const SKILL_FILTERS = [
  'Python',
  'AWS / Cloud',
  'SQL / Databases',
  'JavaScript / TypeScript',
  'C / C++ (Embedded)',
  'Machine Learning tools',
] as const;

export type DomainFilter = (typeof DOMAIN_FILTERS)[number];
export type SkillFilter = (typeof SKILL_FILTERS)[number];
