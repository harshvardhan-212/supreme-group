"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface FooterSectionProps {
  title: string;
  links: string[];
  className?: string;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ 
  title, 
  links, 
  className 
}) => {
  return (
    <div className={cn("flex flex-col items-start gap-5", className)}>
      <h3 className="text-black font-manrope text-sm lg:text-base font-bold leading-normal tracking-[0.16px] uppercase">
        {title}
      </h3>
      <nav 
        className="flex flex-col items-start text-black/70 font-manrope text-xs lg:text-sm font-medium leading-6 lg:leading-[41px] tracking-[0.42px]"
        aria-label={`${title} links`}
      >
        {links.map((link, index) => (
          <a
            key={index}
            href="#"
            className="hover:text-supreme-blue transition-colors duration-200 focus:outline-none focus:text-supreme-blue"
            onClick={(e) => {
              e.preventDefault();
              console.log(`Navigate to: ${link}`);
            }}
          >
            {link}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default FooterSection;