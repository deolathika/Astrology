'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  X, 
  Home, 
  Star, 
  Calculator, 
  Users, 
  Settings, 
  Sparkles,
  Crown,
  Shield,
  Heart,
  Brain,
  Moon,
  Sun,
  Zap,
  BookOpen,
  MessageCircle,
  BarChart3,
  UserCog
} from 'lucide-react';
import { cn } from '@/lib/utils';
import ZodiacAvatar from '@/components/profile/ZodiacAvatar';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  user?: any;
  currentPath: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, user, currentPath }) => {
  const router = useRouter();

  const navigationItems = [
    { name: 'Home', href: '/', icon: Home, description: 'Dashboard' },
    { name: 'Zodiac', href: '/zodiac', icon: Star, description: 'Astrology' },
    { name: 'Numerology', href: '/numerology', icon: Calculator, description: 'Numbers' },
    { name: 'Dreams', href: '/dreams', icon: Moon, description: 'Dream Analysis' },
    { name: 'Community', href: '/community', icon: Users, description: 'Connect' },
    { name: 'Profile', href: '/profile', icon: UserCog, description: 'Settings' },
  ];

  const adminItems = [
    { name: 'Admin', href: '/admin', icon: Shield, description: 'Admin Panel' },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed left-0 top-0 h-full w-80 bg-black/20 backdrop-blur-lg border-r border-white/10 z-50"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <Sparkles className="w-8 h-8 text-gold-400" />
              <span className="text-xl font-bold text-white">Daily Secrets</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Info */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <ZodiacAvatar 
                sign="leo" 
                size="md" 
                showName={false}
              />
              <div>
                <h3 className="text-white font-semibold">{user?.name || 'Developer User'}</h3>
                <p className="text-violet-300 text-sm">{user?.email || 'dev@dailysecrets.app'}</p>
                <div className="flex items-center space-x-1 mt-1">
                  <Crown className="w-3 h-3 text-gold-400" />
                  <span className="text-xs text-gold-400">Premium</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto py-6">
            <div className="px-6 space-y-2">
              <h4 className="text-violet-300 text-xs font-semibold uppercase tracking-wider mb-4">
                Navigation
              </h4>
              {navigationItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    router.push(item.href);
                    onClose();
                  }}
                  className={cn(
                    "flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-left transition-colors",
                    currentPath === item.href
                      ? "bg-white/10 text-white"
                      : "text-violet-200 hover:text-white hover:bg-white/5"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-violet-400">{item.description}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Admin Section */}
            <div className="px-6 mt-8 space-y-2">
              <h4 className="text-violet-300 text-xs font-semibold uppercase tracking-wider mb-4">
                Admin
              </h4>
              {adminItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    router.push(item.href);
                    onClose();
                  }}
                  className={cn(
                    "flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-left transition-colors",
                    currentPath === item.href
                      ? "bg-white/10 text-white"
                      : "text-violet-200 hover:text-white hover:bg-white/5"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-violet-400">{item.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-white/10">
            <div className="text-center text-xs text-violet-400">
              Development Mode
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;