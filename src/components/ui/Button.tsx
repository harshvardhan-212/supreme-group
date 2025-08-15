"use client";

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    isLoading = false,
    leftIcon,
    rightIcon,
    children, 
    disabled,
    ...props 
  }, ref) => {
    const baseClasses = [
      'inline-flex items-center justify-center gap-2',
      'font-manrope font-medium',
      'rounded-full border',
      'transition-all duration-200 ease-in-out',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'disabled:hover:scale-100'
    ];

    const variants = {
      primary: [
        'bg-supreme-blue text-white border-supreme-blue',
        'hover:bg-supreme-cyan hover:border-supreme-cyan hover:scale-105',
        'active:scale-95',
        'focus:ring-supreme-blue focus:ring-opacity-50'
      ],
      secondary: [
        'bg-supreme-light-cyan text-supreme-blue border-supreme-cyan',
        'hover:bg-supreme-cyan hover:text-white hover:scale-105',
        'active:scale-95',
        'focus:ring-supreme-cyan focus:ring-opacity-50'
      ],
      outline: [
        'bg-transparent text-supreme-blue border-supreme-blue',
        'hover:bg-supreme-blue hover:text-white hover:scale-105',
        'active:scale-95',
        'focus:ring-supreme-blue focus:ring-opacity-50'
      ],
      ghost: [
        'bg-transparent text-supreme-blue border-transparent',
        'hover:bg-supreme-light-cyan hover:scale-105',
        'active:scale-95',
        'focus:ring-supreme-blue focus:ring-opacity-50'
      ]
    };

    const sizes = {
      sm: 'h-8 px-4 text-sm',
      md: 'h-10 px-6 text-base',
      lg: 'h-12 px-8 text-lg'
    };

    return (
      <button
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg 
            className="animate-spin h-4 w-4" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4" 
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" 
            />
          </svg>
        )}
        {!isLoading && leftIcon}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
export default Button;
