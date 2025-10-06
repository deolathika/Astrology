'use client'

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export default function Card({ children, className = '', hover = true, glow = false }: CardProps) {
  return (
    <div className={`
      bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 
      ${hover ? 'hover:bg-white/15 hover:scale-105 hover:shadow-2xl' : ''} 
      ${glow ? 'shadow-lg shadow-purple-500/20' : 'shadow-lg'} 
      transition-all duration-300 ${className}
    `}>
      {children}
    </div>
  );
}

