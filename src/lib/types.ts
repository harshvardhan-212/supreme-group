// Contact form types
export interface ContactFormData {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

// Common types
export type ThemeMode = 'light' | 'dark';

export interface NavigationItem {
  label: string;
  href: string;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}// Core application types

export interface ContactFormData {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

export interface CompanyInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
}

export interface SocialMedia {
  platform: string;
  url: string;
  icon: string;
}

// Navigation types
export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

// SEO types
export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
}

// Theme types
export type Theme = 'light' | 'dark';

// Language types
export type Language = 'en' | 'es' | 'fr';

// Animation types
export interface AnimationConfig {
  duration: number;
  delay?: number;
  easing?: string;
}