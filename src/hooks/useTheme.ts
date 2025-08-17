"use client";

import { useState, useEffect } from 'react';

export type Theme = 'light' | 'dark' | 'system';

export function useTheme() {
  // Default to 'light' to ensure consistent SSR rendering
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);
  // Default to 'light' for SSR
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  // Effect that runs only on the client after hydration
  useEffect(() => {
    setMounted(true);
    
    // Get theme from localStorage or default to 'light'
    const savedTheme = localStorage?.getItem('theme') as Theme || 'light';
    setTheme(savedTheme);
    
    // Resolve the theme
    if (savedTheme === 'system') {
      const isSystemDark = window?.matchMedia('(prefers-color-scheme: dark)').matches;
      setResolvedTheme(isSystemDark ? 'dark' : 'light');
    } else {
      setResolvedTheme(savedTheme === 'dark' ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Update resolved theme when theme changes
    if (theme === 'system') {
      const isSystemDark = window?.matchMedia('(prefers-color-scheme: dark)').matches;
      setResolvedTheme(isSystemDark ? 'dark' : 'light');
    } else {
      setResolvedTheme(theme === 'dark' ? 'dark' : 'light');
    }

    // Save to localStorage
    localStorage?.setItem('theme', theme);
    
    // Update document class
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme === 'system' 
      ? (window?.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : theme);
  }, [theme, mounted]);

  // Listen for system preference changes
  useEffect(() => {
    if (!mounted || theme !== 'system') return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      const newResolvedTheme = e.matches ? 'dark' : 'light';
      setResolvedTheme(newResolvedTheme);
      
      const root = document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(newResolvedTheme);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
    mounted,
  };
}
