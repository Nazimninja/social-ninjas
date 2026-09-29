export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  features: string[];
}

export interface CaseStudyMetric {
  label: string;
  value: string;
}

export interface CaseStudy {
  id: number;
  slug: string;
  client: string;
  logo: string;
  category: string;
  industry?: string;
  location?: string;
  timeline?: string;
  servicesUsed?: string[];
  mainMetric: string;
  metricLabel: string;
  secondaryMetrics: CaseStudyMetric[];
  image: string;
  challenge: string;
  solution: string;
  clientBackground?: string;
  whatWeDid?: {
    step: string;
    title: string;
    description: string;
  }[];
  detailedResults?: {
    metric: string;
    before: string;
    after: string;
    impact: string;
  }[];
  keyTakeaways?: string[];
  tags: string[];
  testimonial?: {
    text: string;
    author: string;
    role: string;
    image: string;
  };
  publishedAt?: string;
  updatedAt?: string;
  relatedService?: {
    name: string;
    path: string;
  };
}

export interface NavLink {
  label: string;
  path: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: string;
  author: {
    name: string;
    image: string;
  };
  publishedAt: string;
  readTime: string;
  content: string; // Markdown or HTML string
  tags: string[];
}