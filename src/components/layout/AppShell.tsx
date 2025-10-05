'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Home, 
  Star, 
  Calculator, 
  Users, 
  Settings, 
  LogOut,
  ChevronRight,
  Sparkles,
  Moon,
  Sun
} from 'lucide-react';
import { useTheme } from 'next-themes';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Breadcrumbs from './Breadcrumbs';
import { cn } from '@/lib/utils';

interface AppShellProps {
  children: React.ReactNode;
  className?: string;
}

const AppShell: React.FC<AppShellProps> = ({ children, className }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle authentication redirects
  useEffect(() => {
    if (status === 'loading') return;
    
    const protectedRoutes = ['/dashboard', '/premium', '/admin'];
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
    
    if (isProtectedRoute && !session) {
      router.push('/auth/signin');
    }
  }, [session, status, pathname, router]);

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gold-400"></div>
      </div>
    );
  }

  const isGuest = !session;
  const isFree = session?.user?.role === 'user';
  const isPremium = session?.user?.role === 'premium';
  const isAdmin = session?.user?.role === 'admin';

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900">
      {/* Cosmic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-500/20 via-transparent to-transparent"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-silver-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Main Layout */}
      <div className="relative z-10 flex h-screen">
        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-violet-900/95 backdrop-blur-xl border-r border-violet-700/50"
            >
              <Sidebar 
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                userRole={session?.user?.role}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Overlay for mobile */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Navbar */}
          <Navbar 
            onMenuClick={() => setSidebarOpen(true)}
            userRole={session?.user?.role}
            userName={session?.user?.name}
            userEmail={session?.user?.email}
          />

          {/* Breadcrumbs */}
          <Breadcrumbs pathname={pathname} />

          {/* Page Content */}
          <main className={cn(
            "flex-1 overflow-auto",
            "bg-gradient-to-br from-violet-900/50 via-purple-900/50 to-indigo-900/50",
            "backdrop-blur-sm",
            className
          )}>
            <div className="container mx-auto px-4 py-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={pathname}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {children}
                </motion.div>
              </AnimatePresence>
            </div>
          </main>
        </div>
      </div>

      {/* Theme Toggle */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-violet-800/80 backdrop-blur-xl border border-violet-600/50 text-gold-400 hover:bg-violet-700/80 transition-colors"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </motion.button>
    </div>
  );
};

export default AppShell;
