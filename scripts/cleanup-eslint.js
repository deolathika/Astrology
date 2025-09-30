#!/usr/bin/env node

/**
 * ESLint Cleanup Script
 * Removes unused imports and variables to clean up ESLint warnings
 */

const fs = require('fs');
const path = require('path');

// Files to clean up (most problematic ones)
const filesToClean = [
  'src/app/about-us/page.tsx',
  'src/app/main/page.tsx',
  'src/app/mobile-app/page.tsx',
  'src/app/app/page.tsx',
  'src/app/dashboard/page.tsx',
  'src/app/onboarding/page.tsx',
  'src/app/today/page.tsx',
  'src/app/profile/page.tsx',
  'src/app/settings/page.tsx',
  'src/app/settings/notifications/page.tsx',
  'src/app/settings/privacy/page.tsx',
  'src/app/premium-services/page.tsx',
  'src/app/subscription/page.tsx',
  'src/app/wallet/page.tsx',
  'src/app/zodiac-systems/page.tsx',
  'src/app/community/page.tsx',
  'src/app/comparison/page.tsx',
  'src/app/compatibility/page.tsx',
  'src/app/cosmic-profile/page.tsx',
  'src/app/dreams/page.tsx',
  'src/app/experts/page.tsx',
  'src/app/faq/page.tsx',
  'src/app/home-fixed/page.tsx',
  'src/app/home-simple/page.tsx',
  'src/app/notifications/page.tsx',
  'src/app/numerology/page.tsx',
  'src/app/onboarding/complete/page.tsx',
  'src/app/onboarding/signup/page.tsx',
  'src/app/premium/page.tsx',
  'src/components/analytics-provider.tsx',
  'src/components/theme-provider.tsx',
  'src/components/translation-provider.tsx',
  'src/components/translation-bar.tsx',
  'src/components/unified-navigation.tsx',
  'src/components/user-provider.tsx',
  'src/components/todays-secret-card.tsx',
  'src/lib/ai/gemini-service.ts',
  'src/lib/ai/offline-llm-client.ts',
  'src/lib/ai/offline-llm.ts',
  'src/lib/ai/openai-service.ts',
  'src/lib/astrology/swiss-ephemeris.ts',
  'src/lib/auth.ts',
  'src/lib/community/emoji-chat.ts',
  'src/lib/maps/google-maps.ts',
  'src/lib/notifications/notification-system.ts',
  'src/lib/numerology/engines.ts',
  'src/lib/numerology/enhanced-numerology.ts',
  'src/middleware.ts'
];

// Common unused imports to remove
const unusedImports = [
  'Award', 'Sparkles', 'Target', 'Zap', 'Calendar', 'ChevronRight', 'CheckCircle',
  'ChevronLeft', 'Check', 'X', 'Globe', 'Shield', 'Smartphone', 'Tablet', 'Monitor',
  'Wifi', 'Bell', 'Users', 'Sun', 'Moon', 'Compass', 'Target', 'Gift', 'BookOpen',
  'Settings', 'Crown', 'Diamond', 'Eye', 'TrendingUp', 'Menu', 'HomeIcon', 'ArrowLeft',
  'ArrowRight', 'ChevronDown', 'ChevronUp', 'ExternalLink', 'Plus', 'Minus', 'Share2',
  'Volume2', 'Search', 'Filter', 'List', 'RefreshCw', 'Download', 'MessageCircle',
  'Phone', 'Mail', 'MapPin', 'CreditCard', 'BarChart3', 'PieChart', 'TrendingDown',
  'Activity', 'Lock', 'Unlock', 'Key', 'Database', 'Server', 'Cloud', 'CheckCircle',
  'Play', 'Pause', 'SkipBack', 'SkipForward', 'Volume1', 'VolumeX', 'Mic', 'MicOff',
  'Video', 'VideoOff', 'Camera', 'Image', 'File', 'FileText', 'FileImage', 'FileVideo',
  'FileAudio', 'FileArchive', 'FileCode', 'FileJson', 'FileX', 'Scale', 'Bell', 'Wallet',
  'Settings', 'Shield', 'TrendingUp', 'Calendar', 'Gift', 'BookOpen', 'Compass', 'Eye',
  'Sun', 'Menu', 'X', 'HomeIcon', 'ArrowLeft', 'ArrowRight', 'ExternalLink', 'Plus',
  'Minus', 'Share2', 'Smartphone', 'Tablet', 'Monitor', 'Wifi', 'Battery', 'Volume2',
  'Filter', 'List', 'RefreshCw', 'Download', 'Phone', 'Mail', 'MapPin', 'CreditCard',
  'BarChart3', 'PieChart', 'TrendingDown', 'Activity', 'Lock', 'Unlock', 'Key',
  'Database', 'Server', 'Cloud', 'Play', 'Pause', 'SkipBack', 'SkipForward', 'Volume1',
  'VolumeX', 'Mic', 'MicOff', 'Video', 'VideoOff', 'Camera', 'Image', 'File', 'FileText',
  'FileImage', 'FileVideo', 'FileAudio', 'FileArchive', 'FileCode', 'FileJson', 'FileX'
];

function cleanFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`File not found: ${filePath}`);
      return;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Remove unused imports from lucide-react
    const importRegex = /import\s*{\s*([^}]+)\s*}\s*from\s*['"]lucide-react['"]/g;
    content = content.replace(importRegex, (match, imports) => {
      const importList = imports.split(',').map(imp => imp.trim());
      const usedImports = importList.filter(imp => {
        // Check if the import is actually used in the file
        const importName = imp.split(' as ')[0].trim();
        const usageRegex = new RegExp(`\\b${importName}\\b`, 'g');
        const matches = content.match(usageRegex);
        return matches && matches.length > 1; // More than just the import itself
      });

      if (usedImports.length !== importList.length) {
        modified = true;
        if (usedImports.length === 0) {
          return ''; // Remove entire import line
        }
        return `import { ${usedImports.join(', ')} } from 'lucide-react'`;
      }
      return match;
    });

    // Remove unused variables (simple cases)
    const unusedVarPatterns = [
      /const\s+(\w+)\s*=\s*useState\([^)]*\);\s*\/\/.*unused/gi,
      /let\s+(\w+)\s*=\s*[^;]+;\s*\/\/.*unused/gi,
      /const\s+(\w+)\s*=\s*[^;]+;\s*\/\/.*unused/gi
    ];

    unusedVarPatterns.forEach(pattern => {
      content = content.replace(pattern, '');
      modified = true;
    });

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Cleaned: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error cleaning ${filePath}:`, error.message);
  }
}

// Clean up files
console.log('Starting ESLint cleanup...');
filesToClean.forEach(cleanFile);
console.log('ESLint cleanup completed!');
