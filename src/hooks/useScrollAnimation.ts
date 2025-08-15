"use client";

import { useState, useEffect, useRef, useCallback } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
  initialInView?: boolean;
  skip?: boolean;
}

interface UseScrollAnimationReturn {
  ref: React.RefObject<HTMLElement>;
  isVisible: boolean;
  hasBeenVisible: boolean;
  entry?: IntersectionObserverEntry;
}

export function useScrollAnimation(
  options: UseScrollAnimationOptions = {}
): UseScrollAnimationReturn {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px', // Reduced margin for better triggering
    triggerOnce = true,
    initialInView = false,
    skip = false,
  } = options;

  const [isVisible, setIsVisible] = useState(initialInView);
  const [hasBeenVisible, setHasBeenVisible] = useState(initialInView);
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const ref = useRef<HTMLElement>(null);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [currentEntry] = entries;
      setEntry(currentEntry);

      const isIntersecting = currentEntry.isIntersecting;

      // Update visibility state
      if (!triggerOnce) {
        setIsVisible(isIntersecting);
      }

      // Update has been visible state
      if (isIntersecting && !hasBeenVisible) {
        setHasBeenVisible(true);
        if (triggerOnce) {
          setIsVisible(true);
        }
      }
    },
    [hasBeenVisible, triggerOnce]
  );

  useEffect(() => {
    if (skip) return;

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
      // Add root for better performance
      root: null,
    });

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [handleIntersection, threshold, rootMargin, skip]);

  return {
    ref,
    isVisible: triggerOnce ? hasBeenVisible : isVisible,
    hasBeenVisible,
    entry,
  };
}

// Enhanced hook for CSS class animations with better performance
export function useScrollAnimationClasses(
  animationClass: string = 'animate-fade-in',
  options: UseScrollAnimationOptions = {}
) {
  const { ref, isVisible, hasBeenVisible } = useScrollAnimation(options);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (isVisible && !isAnimated) {
      // Use requestAnimationFrame for smoother animation application
      requestAnimationFrame(() => {
        element.classList.add(animationClass);
        setIsAnimated(true);
      });
    } else if (!isVisible && !options.triggerOnce && isAnimated) {
      element.classList.remove(animationClass);
      setIsAnimated(false);
    }
  }, [isVisible, animationClass, isAnimated, options.triggerOnce]);

  return { ref, isVisible, hasBeenVisible, isAnimated };
}

// Hook for advanced scroll-triggered animations with custom callbacks
export function useScrollTrigger(
  onEnter?: () => void,
  onLeave?: () => void,
  options: UseScrollAnimationOptions = {}
) {
  const { ref, isVisible, hasBeenVisible } = useScrollAnimation(options);
  const hasTriggeredEnter = useRef(false);
  const hasTriggeredLeave = useRef(false);

  useEffect(() => {
    if (isVisible && !hasTriggeredEnter.current && onEnter) {
      onEnter();
      hasTriggeredEnter.current = true;
    }

    if (!isVisible && hasTriggeredEnter.current && !hasTriggeredLeave.current && onLeave) {
      onLeave();
      hasTriggeredLeave.current = true;
    }

    // Reset triggers if not triggerOnce
    if (!options.triggerOnce) {
      if (!isVisible) {
        hasTriggeredEnter.current = false;
      }
      if (isVisible) {
        hasTriggeredLeave.current = false;
      }
    }
  }, [isVisible, onEnter, onLeave, options.triggerOnce]);

  return { ref, isVisible, hasBeenVisible };
}

export default useScrollAnimation;