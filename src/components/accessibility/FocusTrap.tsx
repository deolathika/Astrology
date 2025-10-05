'use client';

import React, { useEffect, useRef, ReactNode } from 'react';

interface FocusTrapProps {
  children: ReactNode;
  active?: boolean;
  className?: string;
}

const FocusTrap: React.FC<FocusTrapProps> = ({ 
  children, 
  active = true, 
  className = '' 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLElement | null>(null);
  const lastFocusableRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!active || !containerRef.current) return;

    const container = containerRef.current;
    
    // Get all focusable elements
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;

    if (focusableElements.length === 0) return;

    firstFocusableRef.current = focusableElements[0];
    lastFocusableRef.current = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstFocusableRef.current) {
            e.preventDefault();
            lastFocusableRef.current?.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastFocusableRef.current) {
            e.preventDefault();
            firstFocusableRef.current?.focus();
          }
        }
      }
    };

    // Focus the first element
    firstFocusableRef.current?.focus();

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [active]);

  return (
    <div 
      ref={containerRef} 
      className={`focus-trap ${className}`}
      role="dialog"
      aria-modal="true"
    >
      {children}
    </div>
  );
};

export default FocusTrap;
