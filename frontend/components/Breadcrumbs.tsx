/**
 * 🌌 Daily Secrets - Breadcrumbs Component
 * Navigation breadcrumbs with cosmic styling
 */

import React from 'react';
import { useRouter } from 'next/router';
import { ChevronRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';

interface BreadcrumbItem {
  name: string;
  href: string;
  icon?: React.ComponentType<any>;
}

interface BreadcrumbsProps {
  currentPath?: string;
  customItems?: BreadcrumbItem[];
  showHome?: boolean;
  maxItems?: number;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  currentPath,
  customItems,
  showHome = true,
  maxItems = 5
}) => {
  const router = useRouter();
  const pathname = currentPath || router.pathname;

  // Generate breadcrumb items from pathname
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (customItems) {
      return customItems;
    }

    const segments = pathname.split('/').filter(Boolean);
    const items: BreadcrumbItem[] = [];

    // Add home item
    if (showHome) {
      items.push({
        name: 'Home',
        href: '/',
        icon: Home
      });
    }

    // Add path segments
    let currentPath = '';
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Map segment to display name
      const displayName = getDisplayName(segment);
      
      items.push({
        name: displayName,
        href: currentPath
      });
    });

    // Limit items if maxItems is set
    if (maxItems && items.length > maxItems) {
      const startIndex = items.length - maxItems + 1;
      return [
        items[0], // Keep home
        { name: '...', href: '#', icon: undefined },
        ...items.slice(startIndex)
      ];
    }

    return items;
  };

  // Get display name for path segment
  const getDisplayName = (segment: string): string => {
    const pathMap: Record<string, string> = {
      'dashboard': 'Dashboard',
      'astrology': 'Astrology',
      'numerology': 'Numerology',
      'compatibility': 'Compatibility',
      'dreams': 'Dreams',
      'ai-chat': 'AI Chat',
      'premium': 'Premium',
      'admin': 'Admin',
      'settings': 'Settings',
      'profile': 'Profile',
      'auth': 'Authentication',
      'signin': 'Sign In',
      'signup': 'Sign Up',
      'guest': 'Guest Dashboard'
    };

    return pathMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
  };

  const breadcrumbItems = generateBreadcrumbs();

  // Handle breadcrumb click
  const handleBreadcrumbClick = (href: string, index: number) => {
    if (href === '#') return; // Don't navigate for ellipsis
    
    // Navigate to the breadcrumb path
    router.push(href);
  };

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumb-list">
        {breadcrumbItems.map((item, index) => (
          <li key={index} className="breadcrumb-item">
            {index > 0 && (
              <ChevronRight className="breadcrumb-separator" />
            )}
            
            <motion.button
              className={`breadcrumb-link ${index === breadcrumbItems.length - 1 ? 'current' : ''}`}
              onClick={() => handleBreadcrumbClick(item.href, index)}
              disabled={index === breadcrumbItems.length - 1}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {item.icon && (
                <item.icon className="breadcrumb-icon" />
              )}
              <span className="breadcrumb-text">{item.name}</span>
            </motion.button>
          </li>
        ))}
      </ol>

      <style jsx>{`
        .breadcrumbs {
          padding: 1rem 0;
          border-bottom: 1px solid var(--color-cosmic-stellarGray);
          background: var(--mood-surface, var(--color-cosmic-cosmicNavy));
        }

        .breadcrumb-list {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          list-style: none;
          margin: 0;
          padding: 0;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .breadcrumb-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .breadcrumb-separator {
          width: 1rem;
          height: 1rem;
          color: var(--color-neutral-gray400);
          flex-shrink: 0;
        }

        .breadcrumb-link {
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
          font-size: var(--font-size-sm);
          text-decoration: none;
        }

        .breadcrumb-link:hover:not(:disabled) {
          background: var(--mood-primary, var(--color-semantic-primary));
          color: var(--color-neutral-white);
        }

        .breadcrumb-link.current {
          color: var(--mood-primary, var(--color-semantic-primary));
          cursor: default;
          font-weight: var(--font-weight-medium);
        }

        .breadcrumb-link:disabled {
          cursor: default;
        }

        .breadcrumb-icon {
          width: 1rem;
          height: 1rem;
          flex-shrink: 0;
        }

        .breadcrumb-text {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 200px;
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .breadcrumb-list {
            padding: 0 1rem;
            overflow-x: auto;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }

          .breadcrumb-list::-webkit-scrollbar {
            display: none;
          }

          .breadcrumb-text {
            max-width: 120px;
          }
        }

        @media (max-width: 480px) {
          .breadcrumb-list {
            gap: 0.25rem;
          }

          .breadcrumb-link {
            padding: 0.25rem 0.5rem;
            font-size: var(--font-size-xs);
          }

          .breadcrumb-text {
            max-width: 80px;
          }
        }

        /* Animation for breadcrumb changes */
        .breadcrumb-item {
          animation: breadcrumbFadeIn 0.3s ease-in-out;
        }

        @keyframes breadcrumbFadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Focus styles for accessibility */
        .breadcrumb-link:focus {
          outline: 2px solid var(--mood-primary, var(--color-semantic-primary));
          outline-offset: 2px;
        }

        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .breadcrumb-link {
            border: 1px solid var(--color-neutral-gray600);
          }

          .breadcrumb-link:hover:not(:disabled) {
            border-color: var(--mood-primary, var(--color-semantic-primary));
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .breadcrumb-item {
            animation: none;
          }

          .breadcrumb-link {
            transition: none;
          }
        }
      `}</style>
    </nav>
  );
};

export default Breadcrumbs;

