'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { motion } from 'framer-motion';
import { 
  Menu, 
  Bell, 
  User, 
  Settings, 
  Sparkles,
  Crown,
  Shield,
  ChevronDown,
  Moon,
  Sun,
  Calculator,
  Users
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import ZodiacAvatar from '@/components/profile/ZodiacAvatar';

interface NavbarProps {
  onMenuClick: () => void;
  user?: any;
  onThemeToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick, user, onThemeToggle }) => {
  const router = useRouter();
  const { theme } = useTheme();
  const { data: session } = useSession();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navigationItems = [
    { name: 'Home', href: '/', icon: Sparkles },
    { name: 'Zodiac', href: '/zodiac', icon: Crown },
    { name: 'Numerology', href: '/numerology', icon: Calculator },
    { name: 'Dreams', href: '/dreams', icon: Moon },
    { name: 'Community', href: '/community', icon: Users },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo and Menu */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuClick}
              className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="flex items-center space-x-2">
              <Sparkles className="w-8 h-8 text-gold-400" />
              <span className="text-xl font-bold text-white">Daily Secrets</span>
            </div>
          </div>

          {/* Center - Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                onClick={() => router.push(item.href)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-violet-200 hover:text-white hover:bg-white/10 transition-colors"
              >
                <item.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{item.name}</span>
              </button>
            ))}
          </div>

          {/* Right side - User menu and theme toggle */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <button
              onClick={onThemeToggle}
              className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Notifications */}
            <button className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors">
              <Bell className="w-5 h-5" />
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
              >
                <ZodiacAvatar 
                  sign="leo" 
                  size="sm" 
                  showName={false}
                />
                <span className="text-sm font-medium">{user?.name || 'Developer'}</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* User Dropdown */}
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 py-2"
                >
                  <button
                    onClick={() => router.push('/profile')}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-left text-white hover:bg-white/10 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </button>
                  <button
                    onClick={() => router.push('/settings')}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-left text-white hover:bg-white/10 transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                  <div className="border-t border-white/20 my-2"></div>
                  {session ? (
                    <button
                      onClick={() => signOut()}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-left text-white hover:bg-white/10 transition-colors"
                    >
                      <span>Sign Out</span>
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => router.push('/auth/signin')}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-left text-white hover:bg-white/10 transition-colors"
                      >
                        <span>Sign In</span>
                      </button>
                      <button
                        onClick={() => router.push('/auth/signup')}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-left text-white hover:bg-white/10 transition-colors"
                      >
                        <span>Sign Up</span>
                      </button>
                    </>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;