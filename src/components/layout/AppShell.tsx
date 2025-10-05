'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Home, 
  Star, 
  Calculator, 
  Users, 
  Settings, 
  ChevronRight,
  Sparkles,
  Moon,
  Sun,
  Bell,
  User,
  Heart
} from 'lucide-react';
import { useTheme } from 'next-themes';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Breadcrumbs from './Breadcrumbs';
import ZodiacAvatar from '@/components/profile/ZodiacAvatar';
import { cn } from '@/lib/utils';

interface AppShellProps {
  children: React.ReactNode;
  className?: string;
}

const AppShell: React.FC<AppShellProps> = ({ children, className }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { data: session, status } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Get user data from session or use guest
  const user = session?.user || {
    id: 'guest',
    name: 'Guest User',
    email: 'guest@dailysecrets.app',
    role: 'guest',
    image: null
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className={cn("min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900", className)}>
      {/* Navigation */}
      <Navbar 
        user={user}
        onMenuClick={() => setSidebarOpen(true)}
        onThemeToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      />

      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        user={user}
        currentPath={pathname}
      />

      {/* Main Content */}
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          <Breadcrumbs pathname={pathname} />
          
          {/* Page Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6"
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AppShell;