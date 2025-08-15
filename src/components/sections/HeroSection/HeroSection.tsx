"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { COMPANY_INFO } from '@/lib/constants';
import { useScrollAnimationClasses } from '@/hooks/useScrollAnimation';
import { useLenisScroll } from '@/hooks/useLenisScroll';
import { useTheme } from '@/hooks/useTheme';

interface HeroSectionProps {
  className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { resolvedTheme, mounted } = useTheme();
  const lenisScroll = useLenisScroll();
  
  // Declare animation hooks at the component top level
  // and conditionally use them based on mounted state
  const containerAnimation = useScrollAnimationClasses('animate-fade-in', {
    threshold: 0.2,
    triggerOnce: true,
    initialInView: true,
    skip: !mounted, // Skip the observer if not mounted
  });
  
  const taglineAnimation = useScrollAnimationClasses('animate-slide-up animate-delay-200', {
    threshold: 0.5,
    triggerOnce: true,
    initialInView: true,
    skip: !mounted,
  });
  
  const titleAnimation = useScrollAnimationClasses('animate-slide-up animate-delay-300', {
    threshold: 0.5,
    triggerOnce: true,
    initialInView: true,
    skip: !mounted,
  });
  
  const scrollIndicatorAnimation = useScrollAnimationClasses('animate-fade-in animate-delay-500', {
    threshold: 0.3,
    triggerOnce: true,
    initialInView: true,
    skip: !mounted,
  });

  // Store refs in an object for easier reference
  const animationRefs = {
    containerRef: containerAnimation.ref,
    taglineRef: taglineAnimation.ref,
    titleRef: titleAnimation.ref,
    scrollIndicatorRef: scrollIndicatorAnimation.ref,
  };
  
  // Get the scroll function from the Lenis hook
  const scrollToElement = lenisScroll.scrollToElement;

  useEffect(() => {
    if (!mounted) return;
    // Set loaded state immediately for faster rendering
    setIsLoaded(true);
  }, [mounted]);

  const handleScrollToNext = () => {
    if (scrollToElement) scrollToElement('#services');
  };

  // Show a placeholder during server-side rendering, but switch to real content
  // as soon as we're mounted on the client
  if (!mounted) {
    return (
      <div className="w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[925px] mt-16 sm:mt-20 bg-supreme-gray dark:bg-gray-900 animate-pulse" />
    );
  }

  const { containerRef } = animationRefs;
  const { ref: taglineRef } = taglineAnimation;
  const { ref: titleRef } = titleAnimation;
  const { ref: scrollIndicatorRef } = scrollIndicatorAnimation;
  const isDark = resolvedTheme === 'dark';

  return (
    <section 
      ref={containerRef}
      className={cn(
        "relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[925px]",
        "mt-16 sm:mt-20 overflow-hidden scroll-element",
        className
      )}
      aria-label="Hero section"
      id="home"
    >
      {/* Background Image with Optimization */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
          alt="Industrial automotive manufacturing facility"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
          quality={85}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGBkbHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
        {/* Dark overlay for better text readability */}
        <div 
          className={cn(
            "absolute inset-0",
            "hero-overlay", // This class is defined in globals.css with dark mode support
          )}
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <div className="flex flex-col items-center gap-2.5 max-w-[761px] mx-auto">
          {/* Text Content */}
          <div className="flex flex-col items-center gap-[30px] relative top-[-38px]">
            <p 
              ref={taglineRef as React.RefObject<HTMLParagraphElement>}
              className={cn(
                "text-center font-manrope text-lg sm:text-xl lg:text-[22px] font-normal intersection-element",
                "text-white", // Always white on dark background
                isDark && "drop-shadow-lg" // Add glow effect in dark mode
              )}
            >
              {COMPANY_INFO.tagline}
            </p>
            
            <h1 
              ref={titleRef as React.RefObject<HTMLHeadingElement>}
              className={cn(
                "text-center font-manrope",
                "text-2xl sm:text-3xl md:text-4xl lg:text-[48px]",
                "font-light leading-tight sm:leading-normal lg:leading-[58px]",
                "tracking-[-0.24px] max-w-[761px] intersection-element",
                "text-white", // Always white on dark background
                isDark && "drop-shadow-lg" // Add glow effect in dark mode
              )}
            >
              <span className="font-bold">Soft Trims and</span>
              {/* Ensure the text-supreme-cyan class is applied correctly */}
              <span className="font-bold text-[#00AEEF]"> NVH Solutions</span>
              <br className="hidden sm:block" />
              <span className="font-normal">for seamless rides</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        ref={scrollIndicatorRef as React.RefObject<HTMLDivElement>}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 intersection-element"
        aria-label="Scroll down indicator"
      >
        <button
          onClick={handleScrollToNext}
          className={cn(
            "w-6 h-10 border-2 rounded-full",
            "flex justify-center items-start pt-2",
            "transition-all duration-300 animate-bounce",
            "focus:outline-none",
            // Light mode styles
            !isDark && [
              "border-white/50 hover:border-white hover:scale-110",
              "focus:border-white focus:scale-110"
            ],
            // Dark mode styles with glow
            isDark && [
              "border-supreme-cyan/70 hover:border-supreme-cyan hover:scale-110",
              "focus:border-supreme-cyan focus:scale-110",
              "hover:shadow-glow focus:shadow-glow"
            ]
          )}
          aria-label="Scroll to next section"
        >
          <div 
            className={cn(
              "w-1 h-3 rounded-full animate-pulse",
              !isDark && "bg-white/70",
              isDark && "bg-supreme-cyan/80"
            )} 
          />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;