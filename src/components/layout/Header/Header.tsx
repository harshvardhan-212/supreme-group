"use client";

import React, { useState, useEffect } from 'react';
import { Logo } from '@/components/icons';
import { LanguageSelector } from './LanguageSelector';
import { ThemeToggle } from './ThemeToggle';
import { ContactButton } from './ContactButton';
import { useTheme } from '@/hooks/useTheme';

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className = "" }) => {
  console.log('Header rendered');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

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
    // Set initial state
    setIsScrolled(window.scrollY > 10);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMounted]);

  const isDark = resolvedTheme === 'dark';

  // Static classes that don't change between server and client
  const baseClasses = "fixed top-0 z-50 w-full transition-all duration-300 flex items-center justify-between px-4 sm:px-6 lg:px-8";
  
  // Dynamic classes based on scroll - only apply after mount
  const scrollClasses = isMounted 
    ? isScrolled 
      ? "h-16 sm:h-20 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-md"
      : "h-20 sm:h-24 bg-transparent"
    : "h-20 sm:h-24 bg-transparent"; // Default for SSR

  return (
    <header 
      className={`${baseClasses} ${scrollClasses} ${className}`}
      role="banner"
      aria-label="Site header"
    >
      {/* Logo */}
      <div className="flex-shrink-0" aria-label="Supreme Group Home">
        <Logo 
          className="w-20 h-7 sm:w-32 sm:h-9 lg:w-[146px] lg:h-[42px]" 
          variant={isMounted && isDark ? 'white' : 'default'}
        />
      </div>

      {/* Right side navigation */}
      <nav 
        className="flex items-center gap-2 sm:gap-4 lg:gap-10"
        aria-label="Header navigation"
      >
        {/* Theme Toggle Button */}
        <ThemeToggle className="mx-1" />
        {/* Language Selector */}
        <LanguageSelector />
        {/* Contact Button */}
        <ContactButton />
      </nav>
    </header>
  );
};

export default Header;