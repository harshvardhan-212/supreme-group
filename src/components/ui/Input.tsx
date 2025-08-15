"use client";

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    type = 'text',
    label,
    error,
    helper,
    leftIcon,
    rightIcon,
    id,
    required,
    ...props 
  }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label 
            htmlFor={inputId}
            className={cn(
              "text-sm font-medium font-manrope",
              error ? "text-red-600" : "text-gray-700"
            )}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}
          
          <input
            type={type}
            id={inputId}
            className={cn(
              "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2",
              "text-sm font-manrope placeholder:text-gray-400",
              "focus:outline-none focus:ring-2 focus:ring-supreme-blue focus:border-transparent",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "transition-colors duration-200",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              error && "border-red-500 focus:ring-red-500",
              className
            )}
            ref={ref}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>
        
        {error && (
          <span className="text-sm text-red-600 font-manrope">{error}</span>
        )}
        
        {helper && !error && (
          <span className="text-sm text-gray-500 font-manrope">{helper}</span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
export default Input;

