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
  client: string;
  logo: string;
  category: string;
  mainMetric: string;
  metricLabel: string;
  secondaryMetrics: CaseStudyMetric[];
  image: string;
  challenge: string;
  solution: string;
  tags: string[];
  testimonial?: {
    text: string;
    author: string;
    role: string;
    image: string;
  };
}

export interface NavLink {
  label: string;
  path: string;
}