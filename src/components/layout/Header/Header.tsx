"use client";

import React, { useState, useEffect } from 'react';
import { Logo } from '@/components/icons';
// import { ContactButton } from './ContactButton';
import { LanguageSelector } from './LanguageSelector';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/useTheme';

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
  console.log('Header rendered');
  const [isScrolled, setIsScrolled] = useState(false);
  const { resolvedTheme, mounted } = useTheme();

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Always render the same header structure, use loading styles until mounted
  const isDark = resolvedTheme === 'dark';

  return (
    <header 
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        "h-16 sm:h-20",
        "bg-supreme-gray/95", // Always include base styles for SSR consistency
        "flex items-center justify-between",
        "px-4 sm:px-8 lg:px-[134px] lg:pr-[150px]",
        mounted && [
          "backdrop-blur-[47px]",
          // Light mode styles
          !isDark && [
            isScrolled && "shadow-sm border-b border-gray-200/50"
          ],
          // Dark mode styles
          isDark && [
            "bg-gray-900/95 border-b border-gray-800/50",
            isScrolled && "shadow-lg shadow-black/10 border-gray-700/50"
          ]
        ],
        className
      )}
      role="banner"
      aria-label="Site header"
    >
      {/* Logo */}
      <div className="flex-shrink-0" aria-label="Supreme Group Home">
        <Logo 
          className="w-20 h-7 sm:w-32 sm:h-9 lg:w-[146px] lg:h-[42px]" 
          variant={mounted && isDark ? 'white' : 'default'}
        />
      </div>

      {/* Right side navigation */}
      <nav 
        className="flex items-center gap-2 sm:gap-4 lg:gap-10"
        aria-label="Header navigation"
      >
        {/* Theme Toggle Button - Always render but handle visibility inside */}
        <ThemeToggle className="mx-1" />
        {/* Language Selector - Always render but handle visibility inside */}
        <LanguageSelector />
        {/* Contact Button */}
        {/* <ContactButton /> */}
      </nav>
    </header>
  );
};

export default Header;