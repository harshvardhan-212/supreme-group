"use client";

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/useTheme';

interface Language {
  code: string;
  label: string;
  flag: string;
}

const LANGUAGES: Language[] = [
  { code: 'en', label: 'ENG', flag: '🇺🇸' },
  { code: 'hi', label: 'हिं', flag: '🇮🇳' },
  { code: 'mr', label: 'मरा', flag: '🇮🇳' },
];

interface LanguageSelectorProps {
  className?: string;
  defaultLanguage?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  className,
  defaultLanguage = 'en'
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState(defaultLanguage);
  const [isOpen, setIsOpen] = useState(false);
  const { resolvedTheme, mounted } = useTheme();

  const currentLanguage = LANGUAGES.find(lang => lang.code === selectedLanguage) || LANGUAGES[0];

  const handleLanguageChange = (langCode: string) => {
    setSelectedLanguage(langCode);
    setIsOpen(false);
    console.log('Language changed to:', langCode);
  };

  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <div className={cn("relative", className)}>
      <button
        onClick={mounted ? () => setIsOpen(!isOpen) : undefined}
        className={cn(
          "flex items-center gap-1 lg:gap-1.5 px-2 py-1 rounded-md",
          "font-manrope text-xs font-bold transition-all duration-300",
          "focus:outline-none cursor-pointer",
          "border border-transparent",
          // Use consistent styling for SSR and client
          mounted ? [
            // Light/dark mode styles when mounted
            !isDark ? [
              "text-black",
              "hover:text-supreme-blue hover:border-supreme-blue/20 hover:bg-supreme-blue/5",
              "focus:text-supreme-blue focus:border-supreme-blue",
            ] : [
              "text-white border-white/30",
              "hover:text-supreme-cyan hover:border-supreme-cyan hover:bg-supreme-cyan/10",
              "focus:text-supreme-cyan focus:border-supreme-cyan",
              "hover:shadow-lg hover:shadow-supreme-cyan/20",
              "transform hover:scale-105",
            ]
          ] : "text-black" // Default light mode style for SSR
        )}
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="text-sm" aria-hidden="true">{currentLanguage.flag}</span>
        <span>{currentLanguage.label}</span>
        <svg 
          className={cn(
            "w-3 h-3 transition-all duration-300",
            isOpen && "rotate-180",
            isDark && "drop-shadow-sm"
          )}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Only render dropdown when mounted and open */}
      {mounted && isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          
          {/* Dropdown */}
          <div 
            className={cn(
              "absolute top-full right-0 mt-2 z-20",
              "rounded-md shadow-lg min-w-[80px] py-1",
              "transform transition-all duration-200",
              "animate-in slide-in-from-top-2",
              // Light mode dropdown
              !isDark && [
                "bg-white border border-gray-200",
              ],
              // Dark mode dropdown
              isDark && [
                "bg-gray-800 border border-gray-600",
                "shadow-xl shadow-black/20",
                "backdrop-blur-sm",
              ]
            )}
            role="listbox"
            aria-label="Available languages"
          >
            {LANGUAGES.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={cn(
                  "w-full px-3 py-2 text-left flex items-center gap-2",
                  "text-sm font-manrope transition-all duration-200",
                  "transform hover:scale-[1.02]",
                  // Light mode options
                  !isDark && [
                    "text-gray-900 hover:bg-gray-50",
                    selectedLanguage === language.code && "bg-supreme-light-cyan text-supreme-blue"
                  ],
                  // Dark mode options
                  isDark && [
                    "text-gray-100 hover:bg-gray-700 hover:text-supreme-cyan",
                    "hover:shadow-md hover:shadow-supreme-cyan/10",
                    selectedLanguage === language.code && "bg-supreme-blue/20 text-supreme-cyan border-l-2 border-supreme-cyan"
                  ]
                )}
                role="option"
                aria-selected={selectedLanguage === language.code}
              >
                <span aria-hidden="true">{language.flag}</span>
                <span>{language.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSelector;
