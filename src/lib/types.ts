export interface ContactFormData {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

export interface NavigationLink {
  href: string;
  label: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface CompanyInfo {
  name: string;
  tagline: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
}

export interface FooterSection {
  title: string;
  links: Array<{
    label: string;
    href: string;
  }>;
}

export interface HeroImage {
  src: string;
  alt: string;
  quality: number;
}

// Form types
export interface FormField {
  id: keyof ContactFormData;
  label: string;
  type: 'text' | 'email' | 'textarea';
  required: boolean;
  placeholder?: string;
  validation?: {
    pattern?: RegExp;
    minLength?: number;
    maxLength?: number;
    message?: string;
  };
}

export interface FormErrors {
  [key: string]: string;
}

// Component prop types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface LayoutProps extends BaseComponentProps {
  variant?: 'default' | 'contained' | 'fullWidth';
}

export interface ButtonVariant {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

// API types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface ContactFormResponse extends ApiResponse {
  data?: {
    id: string;
    timestamp: string;
  };
}

// Animation types
export interface AnimationConfig {
  duration?: number;
  delay?: number;
  easing?: string;
  fill?: 'forwards' | 'backwards' | 'both' | 'none';
}

export interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

// Responsive types
export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface ResponsiveValue<T> {
  base?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  '2xl'?: T;
}