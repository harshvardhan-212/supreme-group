"use client";

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface VideoCategory {
  id: string;
  name: string;
  icon: string;
  video: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
  videoCategories: VideoCategory[];
  isActive?: boolean;
}

const SERVICES: Service[] = [
  {
    id: 'passenger',
    title: 'Passenger vehicles',
    description: 'Revving up innovation from interior to exterior.',
    videoCategories: [
      { id: 'complete-body', name: 'Complete body', icon: '🚗', video: '/videos/passenger-complete-body.mp4' },
      { id: 'front', name: 'Front', icon: '🔧', video: '/videos/passenger-front.mp4' },
      { id: 'cabin', name: 'Cabin', icon: '🪑', video: '/videos/passenger-cabin.mp4' },
    ],
    isActive: true,
  },
  {
    id: 'commercial',
    title: 'Commercial vehicles',
    description: 'Advancing engineering for heavy-duty vehicles.',
    videoCategories: [
      { id: 'complete-body', name: 'Complete Body', icon: '🚛', video: '/videos/commercial-complete-body.mp4' },
      { id: 'engine', name: 'Engine', icon: '⚙️', video: '/videos/commercial-engine.mp4' },
      { id: 'cabin', name: 'Cabin', icon: '🏠', video: '/videos/commercial-cabin.mp4' },
    ],
  },
];

interface ServicesSectionProps {
  className?: string;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ className }) => {
  const [activeService, setActiveService] = useState(0);
  const [activeVideoCategory, setActiveVideoCategory] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const leftPanel = leftPanelRef.current;
    const rightPanel = rightPanelRef.current;

    if (!section || !title || !leftPanel || !rightPanel) return;

    // Initial setup
    gsap.set([leftPanel, rightPanel], { opacity: 0, y: 100 });

    // ScrollTrigger for title movement and content reveal
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "center center",
        end: "bottom center",
        scrub: 1,
        onUpdate: (self) => {
          if (self.progress > 0.2 && !isExpanded) {
            setIsExpanded(true);
          }
        }
      }
    });

    // Move title up and show content
    tl.to(title, {
      y: -120,
      scale: 0.8,
      duration: 1,
      ease: "power2.out"
    })
    .to([leftPanel, rightPanel], {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out"
    }, "-=0.5");

    // Service switching scroll trigger
    ScrollTrigger.create({
      trigger: section,
      start: "center center",
      end: "bottom center",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        if (progress > 0.6 && activeService === 0) {
          handleServiceSwitch(1);
        } else if (progress <= 0.6 && activeService === 1) {
          handleServiceSwitch(0);
        }
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [activeService, isExpanded]);

  const handleServiceSwitch = (newServiceIndex: number) => {
    if (newServiceIndex === activeService) return;

    const videoContainer = videoContainerRef.current;
    if (!videoContainer) return;

    const direction = newServiceIndex > activeService ? 1 : -1;

    // Animate video container out and in
    gsap.to(videoContainer, {
      y: direction * -100,
      opacity: 0,
      duration: 1.5,
      ease: "power2.inOut",
      onComplete: () => {
        setActiveService(newServiceIndex);
        setActiveVideoCategory(0);
        
        // Animate new video in from opposite direction
        gsap.fromTo(videoContainer, 
          { y: direction * 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
        );
      }
    });
  };

  const handleVideoCategoryChange = (categoryIndex: number) => {
    if (categoryIndex === activeVideoCategory) return;
    setActiveVideoCategory(categoryIndex);
  };

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const currentService = SERVICES[activeService];
  const currentVideoCategory = currentService.videoCategories[activeVideoCategory];

  return (
    <section 
      ref={sectionRef}
      className={cn(
        "w-full min-h-[800px] lg:h-[1020px] bg-black relative overflow-hidden",
        className
      )}
    >
      {/* Fixed Title */}
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center px-4 py-16 lg:py-0">
        <h2 
          ref={titleRef}
          className={cn(
            "text-white text-center font-manrope",
            "text-2xl sm:text-3xl md:text-4xl lg:text-[48px]",
            "font-normal leading-normal tracking-[-0.24px]",
            "max-w-[778px] mb-8 lg:mb-16"
          )}
        >
          Evolving the drive with <span className="font-bold">360-degree</span> comprehensive solutions
        </h2>

        {/* Main Content Grid */}
        <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Panel - Fixed Service Text */}
          <div ref={leftPanelRef} className="space-y-8 opacity-0">
            {SERVICES.map((service, index) => (
              <div
                key={service.id}
                className={cn(
                  "transition-all duration-500 border-l-4 pl-6",
                  index === activeService 
                    ? "border-white text-white opacity-100" 
                    : "border-gray-600 text-gray-500 opacity-50"
                )}
              >
                <h3 className="text-xl lg:text-2xl font-semibold mb-2 font-manrope">
                  {service.title}
                </h3>
                <p className="text-sm lg:text-base leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          {/* Right Panel - Video Section */}
          <div ref={rightPanelRef} className="space-y-6 opacity-0">
            {/* Video Container */}
            <div 
              ref={videoContainerRef}
              className="aspect-video bg-gray-900 rounded-lg overflow-hidden relative"
            >
              <video
                ref={videoRef}
                key={`${currentService.id}-${currentVideoCategory.id}`}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              >
                <source src={currentVideoCategory.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Video overlay with category name */}
              <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-2 rounded-lg">
                <span className="text-white text-sm font-medium">
                  {currentVideoCategory.name}
                </span>
              </div>

              {/* Play/Pause Button */}
              <button
                onClick={togglePlayPause}
                className="absolute bottom-4 right-4 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-all duration-200"
              >
                {isPlaying ? (
                  <div className="flex space-x-1">
                    <div className="w-1 h-4 bg-white"></div>
                    <div className="w-1 h-4 bg-white"></div>
                  </div>
                ) : (
                  <div className="w-0 h-0 border-l-[6px] border-l-white border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-1"></div>
                )}
              </button>
            </div>

            {/* Video Category Controls */}
            <div className="flex flex-wrap gap-3 justify-center">
              {currentService.videoCategories.map((category, index) => (
                <button
                  key={category.id}
                  onClick={() => handleVideoCategoryChange(index)}
                  className={cn(
                    "flex flex-col items-center space-y-1 px-4 py-3 rounded-lg transition-all duration-200",
                    "border border-gray-600 hover:border-gray-400",
                    index === activeVideoCategory
                      ? "bg-white text-black border-white"
                      : "bg-transparent text-white hover:bg-gray-800"
                  )}
                >
                  <span className="text-lg">{category.icon}</span>
                  <span className="text-xs font-medium">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;