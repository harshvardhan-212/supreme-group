"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import Lenis from "@studio-freight/lenis";

interface LenisProviderProps {
  children: ReactNode;
}

export function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Delay Lenis initialization to avoid hydration issues
    const initTimeout = setTimeout(() => {
      // Initialize Lenis with optimized settings
      lenisRef.current = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        gestureOrientation: "vertical",
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
        syncTouch: false,
        syncTouchLerp: 0.075,
        touchInertiaMultiplier: 35,
      });

      // Optimized RAF loop
      function raf(time: number) {
        if (lenisRef.current) {
          lenisRef.current.raf(time);
        }
        rafRef.current = requestAnimationFrame(raf);
      }

      // Start the animation loop
      rafRef.current = requestAnimationFrame(raf);
      setIsReady(true);

      // Handle window resize
      const handleResize = () => {
        if (lenisRef.current) {
          lenisRef.current.resize();
        }
      };

      window.addEventListener('resize', handleResize);

      // Clean up on unmount
      return () => {
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
        }
        if (lenisRef.current) {
          lenisRef.current.destroy();
        }
        window.removeEventListener('resize', handleResize);
      };
    }, 100); // Small delay to ensure hydration completes

    return () => {
      clearTimeout(initTimeout);
    };
  }, []);

  // Scroll to functionality
  useEffect(() => {
    if (!isReady) return;

    const scrollToElement = (event: CustomEvent) => {
      const { target, options } = event.detail;
      if (lenisRef.current && target) {
        lenisRef.current.scrollTo(target, options);
      }
    };

    window.addEventListener('lenis:scrollTo', scrollToElement as EventListener);

    return () => {
      window.removeEventListener('lenis:scrollTo', scrollToElement as EventListener);
    };
  }, [isReady]);

  return <>{children}</>;
}

export default LenisProvider;