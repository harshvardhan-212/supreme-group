"use client";

import { useCallback } from 'react';

interface ScrollOptions {
  duration?: number;
  offset?: number;
  easing?: (t: number) => number;
  immediate?: boolean;
}

export function useLenisScroll() {
  const scrollTo = useCallback((target: string | number, options?: ScrollOptions) => {
    window.dispatchEvent(new CustomEvent('lenis:scrollTo', {
      detail: { target, options }
    }));
  }, []);

  const scrollToTop = useCallback(() => {
    scrollTo(0, { duration: 1.5 });
  }, [scrollTo]);

  const scrollToElement = useCallback((selector: string) => {
    scrollTo(selector, { duration: 1.2, offset: -100 });
  }, [scrollTo]);

  return {
    scrollTo,
    scrollToTop,
    scrollToElement,
  };
}
