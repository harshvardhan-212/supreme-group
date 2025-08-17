"use client";

import React from 'react';
import { Logo } from '@/components/icons';
import { FooterSection } from './FooterSection';
import { COMPANY_INFO } from '@/lib/constants';
import { cn } from '@/lib/utils';

const FOOTER_LINKS = {
  applications: [
    'Apparel',
    'Automotive', 
    'Filtration',
    'Customised Solutions'
  ],
  company: [
    'Innovation',
    'Global Competency',
    'About Us',
    'Contact Us'
  ],
  more: [
    'Careers',
    'Privacy Policy', 
    'Terms and Conditions'
  ],
  followUs: [
    'Twitter',
    'LinkedIn',
    'Instagram',
    'Medium'
  ]
};

interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer 
      className={cn(
        "w-full min-h-[400px] lg:h-[682px] relative",
        className
      )}
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="w-full h-[681px] bg-white" />
        <div className="absolute top-[70px] w-full h-[612px]">
          <div className="w-full h-[612px]" />
          <div className="absolute top-[68px] w-full h-[544px]  mix-blend-hue" />
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 lg:gap-[79px] pt-16  px-4 pb-8">
        {/* Supreme Group Logo */}
        <Logo 
          className="w-32 h-8 sm:w-48 sm:h-12 lg:w-[226px] lg:h-16" 
          variant="default"
        />

        {/* Footer Links */}
        <div className="grid grid-cols-2 lg:flex lg:items-start gap-8 lg:gap-[150px] max-w-[988px] w-full">
          <FooterSection 
            title="Applications" 
            links={FOOTER_LINKS.applications}
          />
          <FooterSection 
            title="Company" 
            links={FOOTER_LINKS.company}
          />
          <FooterSection 
            title="More" 
            links={FOOTER_LINKS.more}
          />
          <FooterSection 
            title="Follow Us" 
            links={FOOTER_LINKS.followUs}
          />
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-start gap-4 lg:gap-[419px] pb-[7px] w-full max-w-[988px]">
          <span className="text-black/70 font-manrope text-xs lg:text-sm font-medium leading-normal text-center lg:text-left">
            ©2023. All Rights Reserved.
          </span>
          <span className="text-black/70 font-manrope text-xs lg:text-sm font-medium leading-normal text-center lg:text-right">
            Supreme house: {COMPANY_INFO.address}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;