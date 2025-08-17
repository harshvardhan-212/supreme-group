"use client";

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ContactButtonProps {
  className?: string;
  onClick?: () => void;
}

export const ContactButton: React.FC<ContactButtonProps> = ({ 
  className, 
  onClick 
}) => {
  // Track if component is mounted to avoid hydration mismatch
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Default behavior - scroll to contact section
      const contactSection = document.getElementById('contact');
      contactSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // For consistent server-side rendering and client-side hydration
  return (
    <button
      onClick={mounted ? handleClick : undefined}
      className={cn(
        "hidden sm:flex h-10 lg:h-[50px] px-4 lg:px-[30px] justify-center items-center gap-2.5",
        "rounded-full border border-supreme-cyan bg-supreme-light-cyan text-black",
        "font-manrope text-sm lg:text-base font-medium",
        "hover:bg-supreme-cyan hover:scale-105 active:scale-95",
        "transition-all duration-200 ease-in-out",
        "focus:outline-none focus:ring-2 focus:ring-supreme-blue focus:ring-opacity-50",
        className
      )}
      aria-label="Contact us"
      type="button"
      suppressHydrationWarning={true}
    >
      Contact Us
    </button>
  );
};

export default ContactButton;