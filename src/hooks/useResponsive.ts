"use client";

import { useState, useEffect } from 'react';
import { breakpoints } from '@/lib/utils';

type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface UseResponsiveReturn {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
  currentBreakpoint: Breakpoint;
  isAbove: (breakpoint: Breakpoint) => boolean;
  isBelow: (breakpoint: Breakpoint) => boolean;
  windowWidth: number;
}

export function useResponsive(): UseResponsiveReturn {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    // Set initial width
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getCurrentBreakpoint = (): Breakpoint => {
    if (windowWidth >= breakpoints['2xl']) return '2xl';
    if (windowWidth >= breakpoints.xl) return 'xl';
    if (windowWidth >= breakpoints.lg) return 'lg';
    if (windowWidth >= breakpoints.md) return 'md';
    return 'sm';
  };

  const isAbove = (breakpoint: Breakpoint): boolean => {
    return windowWidth >= breakpoints[breakpoint];
  };

  const isBelow = (breakpoint: Breakpoint): boolean => {
    return windowWidth < breakpoints[breakpoint];
  };

  return {
    isMobile: windowWidth < breakpoints.md,
    isTablet: windowWidth >= breakpoints.md && windowWidth < breakpoints.lg,
    isDesktop: windowWidth >= breakpoints.lg && windowWidth < breakpoints.xl,
    isLargeDesktop: windowWidth >= breakpoints.xl,
    currentBreakpoint: getCurrentBreakpoint(),
    isAbove,
    isBelow,
    windowWidth,
  };
}

export default useResponsive;