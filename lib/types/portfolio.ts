export interface Portfolio {
  id: string;
  title: string;
  category: string;
  image: string[];
  description: string;
  technologies: string[];
  challenge: string;
  solution: string;
  features: string[];
  demo?: string | null;
  github?: string | null;
} 