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
  LogOut,
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

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  userRole?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, userRole }) => {
  const router = useRouter();
  const pathname = usePathname();

  const navigationItems = [
    {
      name: 'Home',
      href: '/',
      icon: Home,
      roles: ['guest', 'user', 'premium', 'admin']
    },
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: BarChart3,
      roles: ['user', 'premium', 'admin']
    },
    {
      name: 'Astrology',
      href: '/astrology',
      icon: Star,
      roles: ['guest', 'user', 'premium', 'admin']
    },
    {
      name: 'Numerology',
      href: '/numerology',
      icon: Calculator,
      roles: ['guest', 'user', 'premium', 'admin']
    },
    {
      name: 'Compatibility',
      href: '/compatibility',
      icon: Heart,
      roles: ['user', 'premium', 'admin']
    },
    {
      name: 'Dream Analysis',
      href: '/dream-analysis',
      icon: Moon,
      roles: ['premium', 'admin']
    },
    {
      name: 'AI Chat',
      href: '/ai-chat',
      icon: MessageCircle,
      roles: ['premium', 'admin']
    },
    {
      name: 'Premium Features',
      href: '/premium',
      icon: Crown,
      roles: ['premium', 'admin']
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: Settings,
      roles: ['user', 'premium', 'admin']
    }
  ];

  const adminItems = [
    {
      name: 'Admin Panel',
      href: '/admin',
      icon: Shield,
      roles: ['admin']
    },
    {
      name: 'User Management',
      href: '/admin/users',
      icon: UserCog,
      roles: ['admin']
    },
    {
      name: 'System Analytics',
      href: '/admin/analytics',
      icon: BarChart3,
      roles: ['admin']
    }
  ];

  const getRoleIcon = (role?: string) => {
    switch (role) {
      case 'admin':
        return <Shield className="w-4 h-4 text-red-400" />;
      case 'premium':
        return <Crown className="w-4 h-4 text-gold-400" />;
      case 'user':
        return <Sparkles className="w-4 h-4 text-blue-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-violet-400" />;
    }
  };

  const getRoleLabel = (role?: string) => {
    switch (role) {
      case 'admin':
        return 'Admin';
      case 'premium':
        return 'Premium';
      case 'user':
        return 'Free';
      default:
        return 'Guest';
    }
  };

  const getRoleColor = (role?: string) => {
    switch (role) {
      case 'admin':
        return 'text-red-400 bg-red-900/20 border-red-700/50';
      case 'premium':
        return 'text-gold-400 bg-gold-900/20 border-gold-700/50';
      case 'user':
        return 'text-blue-400 bg-blue-900/20 border-blue-700/50';
      default:
        return 'text-violet-400 bg-violet-900/20 border-violet-700/50';
    }
  };

  const handleNavigation = (href: string) => {
    router.push(href);
    onClose();
  };

  const filteredNavigationItems = navigationItems.filter(item => 
    !userRole ? item.roles.includes('guest') : item.roles.includes(userRole)
  );

  const filteredAdminItems = adminItems.filter(item => 
    userRole === 'admin' && item.roles.includes('admin')
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-violet-700/50">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-violet-900" />
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-gold-400 to-silver-400 bg-clip-text text-transparent">
            Daily Secrets
          </span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="p-2 rounded-lg bg-violet-800/50 hover:bg-violet-700/50 transition-colors lg:hidden"
          aria-label="Close menu"
        >
          <X className="w-5 h-5 text-gold-400" />
        </motion.button>
      </div>

      {/* User Info */}
      {userRole && (
        <div className="p-4 border-b border-violet-700/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-400 to-purple-500 rounded-full flex items-center justify-center">
              {getRoleIcon(userRole)}
            </div>
            <div>
              <div className="font-medium text-violet-200">Welcome back!</div>
              <div className={cn(
                "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border",
                getRoleColor(userRole)
              )}>
                {getRoleIcon(userRole)}
                <span className="ml-1">{getRoleLabel(userRole)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-2">
          <div className="text-xs font-semibold text-violet-400 uppercase tracking-wider mb-3">
            Navigation
          </div>
          
          {filteredNavigationItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <motion.button
                key={item.name}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleNavigation(item.href)}
                className={cn(
                  "w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-lg transition-colors",
                  isActive
                    ? "bg-gold-400/20 text-gold-400 border border-gold-700/50"
                    : "text-violet-300 hover:text-gold-400 hover:bg-violet-800/50"
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
                {item.name === 'Premium Features' && userRole !== 'premium' && userRole !== 'admin' && (
                  <Crown className="w-3 h-3 text-gold-400 ml-auto" />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Admin Section */}
        {filteredAdminItems.length > 0 && (
          <div className="p-4 space-y-2 border-t border-violet-700/50">
            <div className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-3">
              Administration
            </div>
            
            {filteredAdminItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              
              return (
                <motion.button
                  key={item.name}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleNavigation(item.href)}
                  className={cn(
                    "w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-lg transition-colors",
                    isActive
                      ? "bg-red-400/20 text-red-400 border border-red-700/50"
                      : "text-red-300 hover:text-red-400 hover:bg-red-900/20"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </motion.button>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-violet-700/50">
        <div className="text-xs text-violet-400 text-center">
          Daily Secrets v1.0.0
        </div>
        <div className="text-xs text-violet-500 text-center mt-1">
          Powered by cosmic wisdom
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
