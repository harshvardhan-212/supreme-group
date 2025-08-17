"use client";

import { useEffect, useCallback } from 'react';

export function useLenisScroll() {
  const scrollTo = useCallback((target: string | number, options?: any) => {
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
