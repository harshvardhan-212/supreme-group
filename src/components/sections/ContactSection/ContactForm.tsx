// src/components/sections/ContactSection/ContactForm.tsx
"use client";

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import type { ContactFormData } from '@/lib/types';

interface ContactFormProps {
  className?: string;
  onSubmit?: (data: ContactFormData) => void;
}

interface FormField {
  id: keyof ContactFormData;
  label: string;
  type: 'text' | 'email' | 'textarea';
  required: boolean;
  placeholder?: string;
}

const FORM_FIELDS: FormField[] = [
  { id: 'fullName', label: 'Full name', type: 'text', required: true, placeholder: 'Enter your full name' },
  { id: 'email', label: 'E-mail', type: 'email', required: true, placeholder: 'Enter your email address' },
  { id: 'subject', label: 'Subject', type: 'text', required: true, placeholder: 'Enter subject' },
  { id: 'message', label: 'Message', type: 'textarea', required: true, placeholder: 'Enter your message' },
] as const;

export const ContactForm: React.FC<ContactFormProps> = ({ 
  className, 
  onSubmit 
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateField = (id: keyof ContactFormData, value: string): string => {
    switch (id) {
      case 'email':
        if (!value) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email';
        return '';
      case 'fullName':
        if (!value) return 'Full name is required';
        if (value.length < 2) return 'Name must be at least 2 characters';
        return '';
      case 'subject':
        if (!value) return 'Subject is required';
        if (value.length < 3) return 'Subject must be at least 3 characters';
        return '';
      case 'message':
        if (!value) return 'Message is required';
        if (value.length < 10) return 'Message must be at least 10 characters';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (id: keyof ContactFormData, value: string) => {
    setFormData((prev: ContactFormData) => ({ ...prev, [id]: value }));
    
    // Clear error when user starts typing
    if (errors[id]) {
      setErrors((prev: Partial<ContactFormData>) => ({ ...prev, [id]: '' }));
    }
  };

  const handleBlur = (id: keyof ContactFormData) => {
    const error = validateField(id, formData[id]);
    if (error) {
      setErrors((prev: Partial<ContactFormData>) => ({ ...prev, [id]: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: Partial<ContactFormData> = {};
    FORM_FIELDS.forEach(field => {
      const error = validateField(field.id, formData[field.id]);
      if (error) newErrors[field.id] = error;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (onSubmit) {
        onSubmit(formData);
      } else {
        console.log('Form submitted:', formData);
      }
      
      setIsSubmitted(true);
      setFormData({ fullName: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={cn("flex flex-col items-center gap-6 animate-fade-in", className)}>
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-white text-xl font-semibold mb-2">Message Sent Successfully!</h3>
          <p className="text-white/80">Thank you for contacting us. We&apos;ll get back to you soon.</p>
        </div>
        <button
          onClick={() => setIsSubmitted(false)}
          className="text-supreme-cyan hover:text-white transition-colors underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form 
      onSubmit={handleSubmit}
      className={cn("flex flex-col items-start gap-8 lg:gap-[49px] w-full lg:w-auto", className)}
      noValidate
    >
      <div className="flex flex-col items-start w-full space-y-[65px]">
        {FORM_FIELDS.map((field) => {
          const fieldId = String(field.id);
          return (
            <div 
              key={fieldId} 
              className="w-full lg:w-[551px] min-h-[90px]"
            >
              <div className="mb-2">
                <label 
                  htmlFor={fieldId}
                  className={cn(
                    "text-white font-manrope text-lg lg:text-xl font-semibold leading-4",
                    errors[field.id] && "text-red-400"
                  )}
                >
                  {field.label}
                  {field.required && <span className="text-red-400 ml-1">*</span>}
                </label>
              </div>
              
              <div className="mb-2">
                {field.type === 'textarea' ? (
                  <textarea
                    id={fieldId}
                    value={formData[field.id]}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    onBlur={() => handleBlur(field.id)}
                    placeholder={field.placeholder}
                    required={field.required}
                    rows={4}
                    className={cn(
                      "w-full bg-transparent border-0 border-b-2 border-white/40",
                      "text-white placeholder-white/50 font-manrope text-base",
                      "focus:border-supreme-cyan focus:outline-none",
                      "transition-colors duration-200 resize-none",
                      errors[field.id] && "border-red-400"
                    )}
                    aria-describedby={errors[field.id] ? `${fieldId}-error` : undefined}
                  />
                ) : (
                  <input
                    type={field.type}
                    id={fieldId}
                    value={formData[field.id]}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    onBlur={() => handleBlur(field.id)}
                    placeholder={field.placeholder}
                    required={field.required}
                    className={cn(
                      "w-full bg-transparent border-0 border-b-2 border-white/40",
                      "text-white placeholder-white/50 font-manrope text-base",
                      "focus:border-supreme-cyan focus:outline-none",
                      "transition-colors duration-200",
                      errors[field.id] && "border-red-400"
                    )}
                    aria-describedby={errors[field.id] ? `${fieldId}-error` : undefined}
                  />
                )}
              </div>
              
              <div className="h-5">
                {errors[field.id] && (
                  <span 
                    id={`${fieldId}-error`}
                    className="text-red-400 text-sm font-manrope"
                    role="alert"
                  >
                    {errors[field.id]}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          "flex h-[50px] px-[30px] justify-center items-center gap-2.5",
          "rounded-full border border-supreme-cyan bg-white text-black",
          "font-manrope text-base font-medium",
          "hover:bg-gray-100 hover:scale-105 active:scale-95",
          "focus:outline-none focus:ring-2 focus:ring-supreme-cyan focus:ring-opacity-50",
          "transition-all duration-200 ease-in-out",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        )}
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Sending...
          </>
        ) : (
          "Send"
        )}
      </button>
    </form>
  );
};

export default ContactForm;