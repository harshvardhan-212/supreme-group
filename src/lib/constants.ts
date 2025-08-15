export const COMPANY_INFO = {
  name: "Supreme Group",
  tagline: "Performance in motion",
  description: "Soft Trims and NVH Solutions for seamless rides",
  address: "110, 16th Road, Chembur, Mumbai – 400071",
  phone: "+91 22 25208822",
  email: "info@supremegroup.co.in",
  website: "https://supremegroup.co.in",
} as const;

export const NAVIGATION_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#applications", label: "Applications" },
  { href: "#contact", label: "Contact" },
] as const;

export const SOCIAL_LINKS = [
  { 
    name: "LinkedIn", 
    url: "https://linkedin.com/company/supreme-group", 
    icon: "linkedin" 
  },
  { 
    name: "Twitter", 
    url: "https://twitter.com/supremegroup", 
    icon: "twitter" 
  },
  { 
    name: "Instagram", 
    url: "https://instagram.com/supremegroup", 
    icon: "instagram" 
  },
] as const;

export const SERVICES_DATA = [
  {
    id: 'commercial',
    title: 'Commercial vehicles',
    description: 'Advancing Nonwoven engineering for heavy-duty vehicles.',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    features: [
      'Heavy-duty durability',
      'Noise reduction technology',
      'Temperature resistance',
      'Custom engineering solutions'
    ]
  },
  {
    id: 'passenger',
    title: 'Passenger vehicles',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, incididunt ut labore et dolore magna aliqua.',
    image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    features: [
      'Comfort optimization',
      'Acoustic engineering',
      'Lightweight materials',
      'Aesthetic integration'
    ]
  },
] as const;

export const FOOTER_SECTIONS = {
  applications: {
    title: 'Applications',
    links: [
      { label: 'Apparel', href: '#apparel' },
      { label: 'Automotive', href: '#automotive' },
      { label: 'Filtration', href: '#filtration' },
      { label: 'Customised Solutions', href: '#custom' },
    ]
  },
  company: {
    title: 'Company',
    links: [
      { label: 'Innovation', href: '#innovation' },
      { label: 'Global Competency', href: '#global' },
      { label: 'About Us', href: '#about' },
      { label: 'Contact Us', href: '#contact' },
    ]
  },
  more: {
    title: 'More',
    links: [
      { label: 'Careers', href: '#careers' },
      { label: 'Privacy Policy', href: '#privacy' },
      { label: 'Terms and Conditions', href: '#terms' },
    ]
  },
  followUs: {
    title: 'Follow Us',
    links: [
      { label: 'Twitter', href: 'https://twitter.com/supremegroup' },
      { label: 'LinkedIn', href: 'https://linkedin.com/company/supreme-group' },
      { label: 'Instagram', href: 'https://instagram.com/supremegroup' },
      { label: 'Medium', href: 'https://medium.com/@supremegroup' },
    ]
  }
} as const;

export const HERO_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    alt: 'Industrial automotive manufacturing facility',
    quality: 85,
  }
] as const;

// Form validation constants
export const FORM_VALIDATION = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address'
  },
  phone: {
    pattern: /^[\+]?[1-9][\d]{0,15}$/,
    message: 'Please enter a valid phone number'
  },
  minLength: {
    name: 2,
    subject: 3,
    message: 10
  }
} as const;

// Animation constants
export const ANIMATIONS = {
  duration: {
    fast: 200,
    normal: 300,
    slow: 500,
  },
  easing: {
    easeOut: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    easeIn: 'cubic-bezier(0.55, 0.06, 0.68, 0.19)',
    easeInOut: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  }
} as const;