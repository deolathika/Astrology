/**
 * 🌌 Daily Secrets - App Shell Component
 * Main application shell with navigation and layout
 */

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Star, 
  Calculator, 
  Heart, 
  Moon, 
  MessageCircle, 
  User, 
  Settings,
  Menu,
  X,
  Sun,
  Moon as MoonIcon,
  type LucideIcon
} from 'lucide-react';

// Navigation item interface
export interface NavigationItem {
  name: string;
  href: string;
  icon: LucideIcon;
  requiresAuth?: boolean;
  requiresPremium?: boolean;
  requiresAdmin?: boolean;
}

interface AppShellProps {
  children: React.ReactNode;
  currentPath?: string;
  user?: any;
  role?: 'guest' | 'free' | 'premium' | 'admin';
  theme?: 'light' | 'dark';
  mood?: 'fire' | 'water' | 'air' | 'earth';
  onThemeToggle?: () => void;
  onMoodChange?: (mood: 'fire' | 'water' | 'air' | 'earth') => void;
}

const AppShell: React.FC<AppShellProps> = ({
  children,
  currentPath = '/',
  user,
  role = 'guest',
  theme = 'dark',
  mood = 'fire',
  onThemeToggle,
  onMoodChange
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  // Navigation items based on user role
  const getNavigationItems = (): NavigationItem[] => {
    const baseItems: NavigationItem[] = [
      { name: 'Dashboard', href: '/dashboard', icon: Home, requiresAuth: true },
      { name: 'Astrology', href: '/astrology', icon: Star, requiresAuth: true },
      { name: 'Numerology', href: '/numerology', icon: Calculator, requiresAuth: true },
      { name: 'Compatibility', href: '/compatibility', icon: Heart, requiresAuth: true },
    ];

    const premiumItems: NavigationItem[] = [
      { name: 'Dreams', href: '/dreams', icon: Moon, requiresPremium: true },
      { name: 'AI Chat', href: '/ai-chat', icon: MessageCircle, requiresPremium: true },
    ];

    const adminItems: NavigationItem[] = [
      { name: 'Admin', href: '/admin', icon: Settings, requiresAdmin: true },
    ];

    let items: NavigationItem[] = baseItems;
    
    if (role === 'premium' || role === 'admin') {
      items = [...items, ...premiumItems];
    }
    
    if (role === 'admin') {
      items = [...items, ...adminItems];
    }

    return items;
  };

  const navigationItems = getNavigationItems();

  // Handle navigation
  const handleNavigation = (href: string) => {
    router.push(href);
    setSidebarOpen(false);
    setMobileMenuOpen(false);
  };

  // Handle mood change
  const handleMoodChange = (newMood: 'fire' | 'water' | 'air' | 'earth') => {
    onMoodChange?.(newMood);
  };

  return (
    <div className={`app-shell theme-${theme} mood-${mood}`}>
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          {/* Logo */}
          <div className="logo" onClick={() => handleNavigation('/')}>
            <Star className="logo-icon" />
            <span className="logo-text">Daily Secrets</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                className={`nav-item ${currentPath === item.href ? 'active' : ''}`}
                onClick={() => handleNavigation(item.href)}
              >
                <item.icon className="nav-icon" />
                <span className="nav-text">{item.name}</span>
              </button>
            ))}
          </nav>

          {/* User Menu */}
          <div className="user-menu">
            {/* Theme Toggle */}
            <button
              className="theme-toggle"
              onClick={onThemeToggle}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
            </button>

            {/* Mood Selector */}
            <div className="mood-selector">
              <select
                value={mood}
                onChange={(e) => handleMoodChange(e.target.value as any)}
                className="mood-select"
              >
                <option value="fire">🔥 Fire</option>
                <option value="water">💧 Water</option>
                <option value="air">💨 Air</option>
                <option value="earth">🌍 Earth</option>
              </select>
            </div>

            {/* User Profile */}
            {user ? (
              <div className="user-profile">
                <User className="user-icon" />
                <span className="user-name">{user.name}</span>
              </div>
            ) : (
              <button
                className="login-button"
                onClick={() => handleNavigation('/auth/signin')}
              >
                Sign In
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="mobile-nav">
              {navigationItems.map((item) => (
                <button
                  key={item.name}
                  className={`mobile-nav-item ${currentPath === item.href ? 'active' : ''}`}
                  onClick={() => handleNavigation(item.href)}
                >
                  <item.icon className="mobile-nav-icon" />
                  <span className="mobile-nav-text">{item.name}</span>
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar (Desktop) */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-content">
          <nav className="sidebar-nav">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                className={`sidebar-nav-item ${currentPath === item.href ? 'active' : ''}`}
                onClick={() => handleNavigation(item.href)}
              >
                <item.icon className="sidebar-nav-icon" />
                <span className="sidebar-nav-text">{item.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-wrapper">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-links">
            <a href="/about">About</a>
            <a href="/terms">Terms</a>
            <a href="/privacy">Privacy</a>
            <a href="/contact">Contact</a>
          </div>
          <div className="footer-copyright">
            © 2024 Daily Secrets. All rights reserved.
          </div>
        </div>
      </footer>

      <style jsx>{`
        .app-shell {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: var(--mood-background, var(--color-cosmic-deepSpace));
          color: var(--color-neutral-white);
        }

        .app-header {
          position: sticky;
          top: 0;
          z-index: var(--z-index-sticky);
          background: var(--mood-surface, var(--color-cosmic-cosmicNavy));
          border-bottom: 1px solid var(--color-cosmic-stellarGray);
          backdrop-filter: blur(10px);
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 2rem;
          max-width: 1280px;
          margin: 0 auto;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          font-family: var(--font-family-heading);
          font-weight: var(--font-weight-bold);
          font-size: var(--font-size-xl);
          color: var(--mood-primary, var(--color-semantic-primary));
        }

        .logo-icon {
          width: 2rem;
          height: 2rem;
        }

        .desktop-nav {
          display: flex;
          gap: 2rem;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: var(--border-radius-lg);
          background: transparent;
          color: var(--color-neutral-gray300);
          border: none;
          cursor: pointer;
          transition: all var(--duration-normal) var(--easing-cosmic);
        }

        .nav-item:hover {
          background: var(--mood-primary, var(--color-semantic-primary));
          color: var(--color-neutral-white);
        }

        .nav-item.active {
          background: var(--mood-primary, var(--color-semantic-primary));
          color: var(--color-neutral-white);
        }

        .nav-icon {
          width: 1.25rem;
          height: 1.25rem;
        }

        .user-menu {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .theme-toggle,
        .login-button {
          padding: 0.5rem;
          border-radius: var(--border-radius-lg);
          background: var(--mood-secondary, var(--color-semantic-secondary));
          color: var(--color-neutral-white);
          border: none;
          cursor: pointer;
          transition: all var(--duration-normal) var(--easing-cosmic);
        }

        .theme-toggle:hover,
        .login-button:hover {
          background: var(--mood-accent, var(--color-semantic-accent));
        }

        .mood-selector {
          position: relative;
        }

        .mood-select {
          padding: 0.5rem;
          border-radius: var(--border-radius-lg);
          background: var(--mood-surface, var(--color-cosmic-cosmicNavy));
          color: var(--color-neutral-white);
          border: 1px solid var(--color-cosmic-stellarGray);
          cursor: pointer;
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: var(--border-radius-lg);
          background: var(--mood-surface, var(--color-cosmic-cosmicNavy));
        }

        .user-icon {
          width: 1.25rem;
          height: 1.25rem;
        }

        .mobile-menu-toggle {
          display: none;
          padding: 0.5rem;
          border-radius: var(--border-radius-lg);
          background: var(--mood-secondary, var(--color-semantic-secondary));
          color: var(--color-neutral-white);
          border: none;
          cursor: pointer;
        }

        .mobile-menu {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: var(--mood-surface, var(--color-cosmic-cosmicNavy));
          border-bottom: 1px solid var(--color-cosmic-stellarGray);
          z-index: var(--z-index-dropdown);
        }

        .mobile-nav {
          display: flex;
          flex-direction: column;
          padding: 1rem;
        }

        .mobile-nav-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem;
          border-radius: var(--border-radius-lg);
          background: transparent;
          color: var(--color-neutral-gray300);
          border: none;
          cursor: pointer;
          transition: all var(--duration-normal) var(--easing-cosmic);
        }

        .mobile-nav-item:hover {
          background: var(--mood-primary, var(--color-semantic-primary));
          color: var(--color-neutral-white);
        }

        .mobile-nav-item.active {
          background: var(--mood-primary, var(--color-semantic-primary));
          color: var(--color-neutral-white);
        }

        .mobile-nav-icon {
          width: 1.25rem;
          height: 1.25rem;
        }

        .sidebar {
          position: fixed;
          left: 0;
          top: 0;
          bottom: 0;
          width: 16rem;
          background: var(--mood-surface, var(--color-cosmic-cosmicNavy));
          border-right: 1px solid var(--color-cosmic-stellarGray);
          transform: translateX(-100%);
          transition: transform var(--duration-normal) var(--easing-cosmic);
          z-index: var(--z-index-sidebar);
        }

        .sidebar.open {
          transform: translateX(0);
        }

        .sidebar-content {
          padding: 2rem 1rem;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .sidebar-nav-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-radius: var(--border-radius-lg);
          background: transparent;
          color: var(--color-neutral-gray300);
          border: none;
          cursor: pointer;
          transition: all var(--duration-normal) var(--easing-cosmic);
        }

        .sidebar-nav-item:hover {
          background: var(--mood-primary, var(--color-semantic-primary));
          color: var(--color-neutral-white);
        }

        .sidebar-nav-item.active {
          background: var(--mood-primary, var(--color-semantic-primary));
          color: var(--color-neutral-white);
        }

        .sidebar-nav-icon {
          width: 1.25rem;
          height: 1.25rem;
        }

        .main-content {
          flex: 1;
          padding: 2rem;
          margin-left: 0;
          transition: margin-left var(--duration-normal) var(--easing-cosmic);
        }

        .content-wrapper {
          max-width: 1280px;
          margin: 0 auto;
        }

        .app-footer {
          background: var(--mood-surface, var(--color-cosmic-cosmicNavy));
          border-top: 1px solid var(--color-cosmic-stellarGray);
          padding: 2rem;
        }

        .footer-content {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .footer-links {
          display: flex;
          gap: 2rem;
        }

        .footer-links a {
          color: var(--color-neutral-gray300);
          text-decoration: none;
          transition: color var(--duration-normal) var(--easing-cosmic);
        }

        .footer-links a:hover {
          color: var(--mood-primary, var(--color-semantic-primary));
        }

        .footer-copyright {
          color: var(--color-neutral-gray400);
          font-size: var(--font-size-sm);
        }

        @media (max-width: 768px) {
          .desktop-nav {
            display: none;
          }

          .mobile-menu-toggle {
            display: block;
          }

          .main-content {
            padding: 1rem;
          }
        }

        @media (min-width: 1024px) {
          .sidebar {
            position: static;
            transform: translateX(0);
          }

          .main-content {
            margin-left: 16rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AppShell;

