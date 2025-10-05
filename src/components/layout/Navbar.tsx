'use client';

import React, { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Menu, 
  Bell, 
  User, 
  Settings, 
  LogOut,
  Sparkles,
  Crown,
  Shield,
  ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavbarProps {
  onMenuClick: () => void;
  userRole?: string;
  userName?: string;
  userEmail?: string;
}

const Navbar: React.FC<NavbarProps> = ({ 
  onMenuClick, 
  userRole, 
  userName, 
  userEmail 
}) => {
  const router = useRouter();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  const getRoleIcon = (role?: string) => {
    switch (role) {
      case 'admin':
        return <Shield className="w-4 h-4 text-red-400" />;
      case 'premium':
        return <Crown className="w-4 h-4 text-gold-400" />;
      case 'user':
        return <User className="w-4 h-4 text-blue-400" />;
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

  return (
    <nav className="sticky top-0 z-40 bg-violet-900/80 backdrop-blur-xl border-b border-violet-700/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-lg bg-violet-800/50 hover:bg-violet-700/50 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 text-gold-400" />
            </motion.button>

            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => router.push('/')}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-violet-900" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-gold-400 to-silver-400 bg-clip-text text-transparent">
                Daily Secrets
              </span>
            </motion.div>
          </div>

          {/* Center Section - Navigation Links (Desktop) */}
          <div className="hidden lg:flex items-center space-x-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/')}
              className="text-violet-300 hover:text-gold-400 transition-colors"
            >
              Home
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/astrology')}
              className="text-violet-300 hover:text-gold-400 transition-colors"
            >
              Astrology
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/numerology')}
              className="text-violet-300 hover:text-gold-400 transition-colors"
            >
              Numerology
            </motion.button>
            {userRole === 'premium' && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/ai-chat')}
                className="text-violet-300 hover:text-gold-400 transition-colors"
              >
                AI Chat
              </motion.button>
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg bg-violet-800/50 hover:bg-violet-700/50 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-gold-400" />
              {/* Notification Badge */}
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </motion.button>

            {/* User Menu */}
            {userRole ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 rounded-lg bg-violet-800/50 hover:bg-violet-700/50 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-violet-400 to-purple-500 rounded-full flex items-center justify-center">
                    {getRoleIcon(userRole)}
                  </div>
                  <div className="hidden sm:block text-left">
                    <div className="text-sm font-medium text-violet-200">{userName}</div>
                    <div className="text-xs text-violet-400">{getRoleLabel(userRole)}</div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-violet-400" />
                </motion.button>

                {/* User Dropdown Menu */}
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-64 bg-violet-900/95 backdrop-blur-xl border border-violet-700/50 rounded-lg shadow-xl z-50"
                  >
                    <div className="p-4 border-b border-violet-700/50">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-violet-400 to-purple-500 rounded-full flex items-center justify-center">
                          {getRoleIcon(userRole)}
                        </div>
                        <div>
                          <div className="font-medium text-violet-200">{userName}</div>
                          <div className="text-sm text-violet-400">{userEmail}</div>
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
                    
                    <div className="p-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setShowUserMenu(false);
                          router.push('/dashboard');
                        }}
                        className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-violet-300 hover:text-gold-400 hover:bg-violet-800/50 rounded-lg transition-colors"
                      >
                        <User className="w-4 h-4" />
                        <span>Dashboard</span>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setShowUserMenu(false);
                          router.push('/settings');
                        }}
                        className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-violet-300 hover:text-gold-400 hover:bg-violet-800/50 rounded-lg transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </motion.button>
                      
                      {userRole === 'premium' && (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setShowUserMenu(false);
                            router.push('/premium');
                          }}
                          className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gold-400 hover:text-gold-300 hover:bg-gold-900/20 rounded-lg transition-colors"
                        >
                          <Crown className="w-4 h-4" />
                          <span>Premium Features</span>
                        </motion.button>
                      )}
                      
                      {userRole === 'admin' && (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setShowUserMenu(false);
                            router.push('/admin');
                          }}
                          className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          <Shield className="w-4 h-4" />
                          <span>Admin Panel</span>
                        </motion.button>
                      )}
                      
                      <div className="border-t border-violet-700/50 my-2"></div>
                      
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setShowUserMenu(false);
                          handleSignOut();
                        }}
                        className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push('/auth/signin')}
                  className="px-4 py-2 text-sm font-medium text-violet-300 hover:text-gold-400 transition-colors"
                >
                  Sign In
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push('/auth/signup')}
                  className="px-4 py-2 text-sm font-medium bg-gold-400 text-violet-900 rounded-lg hover:bg-gold-500 transition-colors"
                >
                  Sign Up
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Notifications Panel */}
      {showNotifications && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute right-4 top-16 w-80 bg-violet-900/95 backdrop-blur-xl border border-violet-700/50 rounded-lg shadow-xl z-50"
        >
          <div className="p-4 border-b border-violet-700/50">
            <h3 className="text-lg font-semibold text-violet-200">Notifications</h3>
          </div>
          <div className="p-4">
            <div className="text-sm text-violet-400">No new notifications</div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
