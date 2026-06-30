export interface Feature {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badge?: string;
}

export type RoutePath = 'home' | 'pricing' | 'terms' | 'privacy' | 'refunds';

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
}
