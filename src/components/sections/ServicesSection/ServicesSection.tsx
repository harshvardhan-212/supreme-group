'use client';

import React, { useState, useEffect } from 'react';

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
}

interface ServicesSectionProps {
  className?: string;
}

const SERVICES: Service[] = [
  {
    id: 'passenger',
    title: 'Passenger vehicles',
    description: 'Revving up innovation from interior to exterior.',
    videoCategories: [
      { id: 'complete-body', name: 'Complete body', icon: '/icons/completebodypassenger.png', video: '/videos/passenger-complete-body.mp4' },
      { id: 'front', name: 'Front', icon: '/icons/frontpassenger.png', video: '/videos/passenger-front.mp4' },
      { id: 'cabin', name: 'Cabin', icon: '/icons/cabinpassenger.png', video: '/videos/passenger-cabin.mp4' },
    ],
  },
  {
    id: 'commercial',
    title: 'Commercial vehicles',
    description: 'Advancing engineering for heavy-duty vehicles.',
    videoCategories: [
      { id: 'complete-body', name: 'Complete Body', icon: '/icons/completebodypassenger.png', video: '/videos/commercial-complete-body.mp4' },
      { id: 'engine', name: 'Engine', icon: '/icons/frontpassenger.png', video: '/videos/commercial-engine.mp4' },
      { id: 'cabin', name: 'Cabin', icon: '/icons/cabinpassenger.png', video: '/videos/commercial-cabin.mp4' },
    ],
  },
];

export const ServicesSection: React.FC<ServicesSectionProps> = ({ className = "" }) => {
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const activeService = SERVICES[activeServiceIndex];
  const activeCategory = activeService.videoCategories[activeCategoryIndex];

  const handleServiceClick = (index: number) => {
    setActiveServiceIndex(index);
    setActiveCategoryIndex(0);
  };

  const handleCategoryClick = (index: number) => {
    setActiveCategoryIndex(index);
  };

  const scrollbarHeight = 100 / SERVICES.length;
  const scrollbarTop = (activeServiceIndex * 100) / SERVICES.length;

  return (
    <section 
      className={`w-full min-h-screen bg-black relative overflow-hidden py-16 ${className}`}
      id="services-section"
      suppressHydrationWarning
    >
      <div className="w-full h-full flex flex-col items-center justify-center px-4" suppressHydrationWarning>
        {/* Title */}
        <h2 className="text-white text-center font-manrope text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal leading-normal tracking-tight max-w-4xl mx-auto mb-12">
          Evolving the drive with <span className="font-bold">360-degree</span> comprehensive solutions
        </h2>

        {/* Main Content Grid */}
        <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Panel */}
          <div className="relative" suppressHydrationWarning>
            {/* Scrollbar Track */}
            <div className="absolute left-0 top-0 h-full w-1 bg-gray-600">
              <div 
                className="absolute left-0 w-full bg-white transition-all duration-500"
                style={{
                  height: `${scrollbarHeight}%`,
                  top: `${scrollbarTop}%`
                }}
                suppressHydrationWarning
              />
            </div>
            
            {/* Services List */}
            <div className="pl-8">
              <div className="space-y-8">
                {SERVICES.map((service, index) => {
                  const isActive = index === activeServiceIndex;
                  return (
                    <div
                      key={service.id}
                      onClick={() => handleServiceClick(index)}
className={`cursor-pointer transition-all duration-700 ${
  isActive ? 'opacity-100' : 'opacity-30'
}`}                      suppressHydrationWarning
                    >
                      <h3 className="text-xl lg:text-2xl font-semibold mb-2 font-manrope text-white">
                        {service.title}
                      </h3>
                      <div className="w-full text-left py-2 transition-all duration-300">
                        <p 
                          className="text-sm lg:text-base leading-relaxed"
                          suppressHydrationWarning
                          style={{ 
                            color: isActive ? '#ffffff' : '#9ca3af'
                          }}
                        >
                          {service.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Panel - Video Section */}
          <div className="space-y-6">
            {/* Video Container */}
            <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden relative" suppressHydrationWarning>
              {isClient ? (
                <video
                  key={activeCategory.video}
                  className="w-full h-full object-cover"
                  src={activeCategory.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                  <div className="text-gray-400">Loading video...</div>
                </div>
              )}
            </div>

            {/* Video Category Controls */}
            <div className="flex flex-wrap gap-3 justify-center" suppressHydrationWarning>
              {activeService.videoCategories.map((category, index) => {
                const isActive = index === activeCategoryIndex;
                return (
                  <div
                    key={category.id}
                    onClick={() => handleCategoryClick(index)}
                    className="flex flex-col items-center gap-2 px-6 py-4 rounded-lg transition-all duration-300 min-w-24 cursor-pointer"
                    suppressHydrationWarning
                    style={{
                      boxShadow: isActive ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : 'none'
                    }}
                  >
                    <img
                      src={category.icon}
                      alt={category.name}
                      className="w-8 h-8"
                      style={{ opacity: isActive ? 1 : 0.5 }}
                    />
                    <span 
                      className="text-xs font-medium text-center leading-tight text-white"
                      suppressHydrationWarning
                      style={{ opacity: isActive ? 1 : 0.5 }}
                    >
                      {category.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;