'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CosmicCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'neon' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  hover?: boolean;
  glow?: boolean;
  shimmer?: boolean;
}

const CosmicCard: React.FC<CosmicCardProps> = ({
  children,
  className,
  variant = 'default',
  size = 'md',
  hover = true,
  glow = false,
  shimmer = false
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'glass':
        return 'bg-violet-900/20 backdrop-blur-xl border border-violet-700/50';
      case 'neon':
        return 'bg-violet-900/30 border border-gold-400/50 shadow-[0_0_20px_rgba(255,215,0,0.3)]';
      case 'gradient':
        return 'bg-gradient-to-br from-violet-900/40 via-purple-900/40 to-indigo-900/40 border border-violet-600/50';
      default:
        return 'bg-violet-900/30 backdrop-blur-sm border border-violet-700/30';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'p-4 rounded-lg';
      case 'lg':
        return 'p-8 rounded-2xl';
      default:
        return 'p-6 rounded-xl';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover ? { scale: 1.02, y: -2 } : {}}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        'relative overflow-hidden transition-all duration-300',
        getVariantStyles(),
        getSizeStyles(),
        glow && 'shadow-[0_0_40px_rgba(139,216,230,0.3)]',
        shimmer && 'animate-shimmer',
        className
      )}
    >
      {/* Shimmer Effect */}
      {shimmer && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Glow Effect */}
      {glow && (
        <div className="absolute inset-0 bg-gradient-to-br from-gold-400/10 via-transparent to-blue-400/10 animate-pulse" />
      )}
    </motion.div>
  );
};

export default CosmicCard;
