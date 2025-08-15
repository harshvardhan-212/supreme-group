"use client";

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface NavigationItem {
  label: string;
  href: string;
  isActive?: boolean;
}

const NAVIGATION_ITEMS: NavigationItem[] = [
  { label: 'Home', href: '#home', isActive: true },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Applications', href: '#applications' },
  { label: 'Contact', href: '#contact' },
];

interface NavigationProps {
  className?: string;
  isMobile?: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({ 
  className, 
  isMobile = false 
}) => {
  const [activeItem, setActiveItem] = useState('Home');

  const handleNavigationClick = (item: NavigationItem) => {
    setActiveItem(item.label);
    
    // Smooth scroll to section
    const element = document.querySelector(item.href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isMobile) {
    return (
      <nav 
        className={cn("flex flex-col gap-4", className)}
        aria-label="Mobile navigation"
      >
        {NAVIGATION_ITEMS.map((item) => (
          <button
            key={item.label}
            onClick={() => handleNavigationClick(item)}
            className={cn(
              "text-left py-2 px-4 rounded-lg transition-colors",
              "font-manrope text-base font-medium",
              activeItem === item.label
                ? "bg-supreme-blue text-white"
                : "text-gray-700 hover:bg-gray-100"
            )}
          >
            {item.label}
          </button>
        ))}
      </nav>
    );
  }

  return (
    <nav 
      className={cn("hidden lg:flex items-center gap-8", className)}
      aria-label="Main navigation"
    >
      {NAVIGATION_ITEMS.map((item) => (
        <button
          key={item.label}
          onClick={() => handleNavigationClick(item)}
          className={cn(
            "font-manrope text-sm font-medium transition-colors",
            "hover:text-supreme-blue focus:outline-none focus:text-supreme-blue",
            activeItem === item.label
              ? "text-supreme-blue border-b-2 border-supreme-blue pb-1"
              : "text-black"
          )}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
};

export default Navigation;