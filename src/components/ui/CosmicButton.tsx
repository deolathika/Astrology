'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CosmicButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'neon' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const CosmicButton: React.FC<CosmicButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  type = 'button'
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-violet-800/50 text-violet-200 border border-violet-600/50 hover:bg-violet-700/50';
      case 'ghost':
        return 'bg-transparent text-violet-300 hover:bg-violet-800/30';
      case 'neon':
        return 'bg-violet-900/50 text-gold-400 border border-gold-400/50 shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_30px_rgba(255,215,0,0.5)]';
      case 'gradient':
        return 'bg-gradient-to-r from-gold-400 to-silver-400 text-violet-900 hover:from-gold-500 hover:to-silver-500';
      default:
        return 'bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-700 hover:to-purple-700';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2 text-sm rounded-lg';
      case 'lg':
        return 'px-8 py-4 text-lg rounded-xl';
      default:
        return 'px-6 py-3 text-base rounded-lg';
    }
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
      className={cn(
        'relative overflow-hidden font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:ring-offset-2 focus:ring-offset-violet-900',
        getVariantStyles(),
        getSizeStyles(),
        disabled && 'opacity-50 cursor-not-allowed',
        loading && 'cursor-wait',
        className
      )}
    >
      {/* Shimmer Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center space-x-2">
        {loading && (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {children}
      </div>
    </motion.button>
  );
};

export default CosmicButton;
