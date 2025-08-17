"use client";

import React from 'react';
import { ContactForm } from './ContactForm';
import { cn } from '@/lib/utils';
import { COMPANY_INFO } from '@/lib/constants';
import type { ContactFormData } from '@/lib/types';

interface ContactSectionProps {
  className?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ className }) => {
  const handleFormSubmit = (data: ContactFormData) => {
    console.log('Contact form submitted:', data);
    // Here we would typically send the data to your backend
  };

  return (
    <section 
      id="contact"
      className={cn(
        "w-full min-h-[800px] lg:h-[1020px] bg-supreme-blue",
        "flex items-center justify-center px-4 py-16 lg:py-0",
        className
      )}
      aria-label="Contact section"
    >
      <div className="w-full max-w-[1362px] min-h-[600px] lg:h-[609px] bg-supreme-blue rounded-[10px] flex items-center justify-center p-8 lg:p-[88px]">
        <div className="w-full max-w-[1099px] flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-[150px]">
          {/* Left side - Contact Information */}
          <div className="flex flex-col items-start gap-6 lg:gap-10 w-full lg:w-[418px]">
            {/* Header */}
            <div className="flex flex-col items-start gap-5">
              <h2 className="text-white font-manrope text-3xl sm:text-4xl lg:text-[48px] font-semibold leading-tight lg:leading-[38px] w-full lg:w-[481px]">
                Get in touch
              </h2>
              <div className="w-12 h-[3px] bg-white" />
            </div>

            {/* Content */}
            <div className="flex flex-col items-start gap-6 lg:gap-10">
              <p className="text-white font-manrope text-lg lg:text-2xl font-normal leading-6 lg:leading-7 w-full lg:w-[481px]">
                For general enquiries
              </p>

              <div className="flex flex-col items-start gap-4 lg:gap-[30px]">
                {/* Address */}
                <div className="flex flex-col items-start gap-[15px]">
                  <h3 className="text-white font-manrope text-lg lg:text-xl font-semibold leading-4">
                    Address :
                  </h3>
                  <p className="text-white font-manrope text-base lg:text-xl font-normal leading-4">
                    {COMPANY_INFO.address}
                  </p>
                </div>

                {/* Phone */}
                <div className="flex flex-col items-start gap-[15px]">
                  <h3 className="text-white font-manrope text-lg lg:text-xl font-semibold leading-4">
                    Phone :
                  </h3>
                  <a 
                    href={`tel:${COMPANY_INFO.phone}`}
                    className="text-white font-manrope text-base lg:text-xl font-normal leading-4 hover:text-supreme-cyan transition-colors"
                  >
                    {COMPANY_INFO.phone}
                  </a>
                </div>

                {/* Email */}
                <div className="flex flex-col items-start gap-[15px]">
                  <h3 className="text-white font-manrope text-lg lg:text-xl font-semibold leading-4">
                    Email :
                  </h3>
                  <a 
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="text-white font-manrope text-base lg:text-xl font-normal leading-4 hover:text-supreme-cyan transition-colors"
                  >
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Contact Form */}
          <ContactForm onSubmit={handleFormSubmit} />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;