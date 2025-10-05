'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronRight, Home, Star, Calculator, Heart, Moon, MessageCircle, Crown, Settings, Shield, UserCog, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

const Breadcrumbs: React.FC<{ pathname: string }> = ({ pathname }) => {
  const getBreadcrumbItems = (pathname: string) => {
    const segments = pathname.split('/').filter(Boolean);
    const items: Array<{ name: string; href: string; icon?: any }> = [{ name: 'Home', href: '/', icon: Home }];

    if (segments.length === 0) return items;

    const pathMap: Record<string, { name: string; icon?: any }> = {
      'dashboard': { name: 'Dashboard', icon: BarChart3 },
      'astrology': { name: 'Astrology', icon: Star },
      'numerology': { name: 'Numerology', icon: Calculator },
      'compatibility': { name: 'Compatibility', icon: Heart },
      'dream-analysis': { name: 'Dream Analysis', icon: Moon },
      'ai-chat': { name: 'AI Chat', icon: MessageCircle },
      'premium': { name: 'Premium Features', icon: Crown },
      'settings': { name: 'Settings', icon: Settings },
      'admin': { name: 'Admin Panel', icon: Shield },
      'users': { name: 'User Management', icon: UserCog },
      'analytics': { name: 'Analytics', icon: BarChart3 },
      'auth': { name: 'Authentication' },
      'signin': { name: 'Sign In' },
      'signup': { name: 'Sign Up' },
      'profile': { name: 'Profile' }
    };

    let currentPath = '';
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const pathInfo = pathMap[segment];
      
      if (pathInfo) {
        items.push({
          name: pathInfo.name,
          href: currentPath,
          icon: pathInfo.icon
        });
      } else {
        // Handle dynamic segments (like user IDs)
        items.push({
          name: segment.charAt(0).toUpperCase() + segment.slice(1),
          href: currentPath
        });
      }
    });

    return items;
  };

  const breadcrumbItems = getBreadcrumbItems(pathname);

  // Don't show breadcrumbs on home page
  if (pathname === '/') return null;

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-violet-900/50 backdrop-blur-sm border-b border-violet-700/30"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center space-x-2 text-sm">
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;
            const Icon = item.icon;

            return (
              <React.Fragment key={item.href}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={cn(
                    "flex items-center space-x-1",
                    isLast
                      ? "text-gold-400 font-medium"
                      : "text-violet-400 hover:text-gold-400 transition-colors cursor-pointer"
                  )}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  <span>{item.name}</span>
                </motion.div>
                
                {!isLast && (
                  <ChevronRight className="w-4 h-4 text-violet-500" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};

export default Breadcrumbs;
