#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Files to clean up
const filesToClean = [
  'src/app/about/page.tsx',
  'src/app/community/page.tsx',
  'src/app/compatibility/page.tsx',
  'src/app/contact/page.tsx',
  'src/app/dreams/page.tsx',
  'src/app/experts/page.tsx',
  'src/app/faq/page.tsx',
  'src/app/legal/privacy/page.tsx',
  'src/app/legal/terms/page.tsx',
  'src/app/onboarding/page.tsx',
  'src/app/onboarding/signup/page.tsx',
  'src/app/premium/page.tsx',
  'src/app/profile/page.tsx',
  'src/app/settings/notifications/page.tsx',
  'src/app/settings/page.tsx',
  'src/app/settings/privacy/page.tsx',
  'src/app/subscription/page.tsx'
];

// Unused imports to remove
const unusedImports = {
  'src/app/about/page.tsx': ['Award', 'Zap', 'BookOpen', 'CheckCircle'],
  'src/app/community/page.tsx': ['Calendar', 'MapPin'],
  'src/app/compatibility/page.tsx': ['Plus', 'Search', 'Calendar', 'MapPin'],
  'src/app/contact/page.tsx': ['MapPin'],
  'src/app/dreams/page.tsx': ['Search', 'Zap', 'Shield'],
  'src/app/experts/page.tsx': ['Award', 'Clock', 'DollarSign', 'Filter', 'Heart', 'Shield', 'Zap', 'BookOpen', 'Globe'],
  'src/app/faq/page.tsx': ['Heart', 'Calendar', 'Globe'],
  'src/app/legal/privacy/page.tsx': ['AlertTriangle', 'XCircle', 'Info'],
  'src/app/legal/terms/page.tsx': ['Shield', 'Lock', 'Users'],
  'src/app/onboarding/page.tsx': ['Calendar', 'MapPin', 'Clock'],
  'src/app/onboarding/signup/page.tsx': ['Clock'],
  'src/app/premium/page.tsx': ['Shield', 'MessageCircle', 'Calendar', 'Gift'],
  'src/app/profile/page.tsx': ['Clock', 'Globe', 'Lock'],
  'src/app/settings/notifications/page.tsx': ['BellOff', 'Shield'],
  'src/app/settings/page.tsx': ['Settings', 'Palette'],
  'src/app/settings/privacy/page.tsx': ['EyeOff', 'Unlock', 'AlertTriangle']
};

// Console statements to remove
const consoleStatements = [
  'src/app/api/astro/natal/route.ts',
  'src/app/api/astro/transits/route.ts',
  'src/app/api/astrology/calculate/route.ts',
  'src/app/api/notifications/send/route.ts',
  'src/app/api/numerology/calculate/route.ts',
  'src/app/api/numerology/core/route.ts',
  'src/app/api/today/route.ts',
  'src/app/dreams/page.tsx',
  'src/app/experts/page.tsx',
  'src/app/premium/page.tsx',
  'src/app/settings/privacy/page.tsx'
];

function cleanFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Remove unused imports
  if (unusedImports[filePath]) {
    unusedImports[filePath].forEach(importName => {
      const importRegex = new RegExp(`import\\s*{[^}]*\\b${importName}\\b[^}]*}\\s*from\\s*['"][^'"]+['"];?\\s*\\n?`, 'g');
      if (content.match(importRegex)) {
        content = content.replace(importRegex, '');
        modified = true;
        console.log(`Removed unused import: ${importName} from ${filePath}`);
      }
    });
  }

  // Remove console statements
  if (consoleStatements.includes(filePath)) {
    const consoleRegex = /console\.(log|warn|error|info)\([^)]*\);?\s*\n?/g;
    if (content.match(consoleRegex)) {
      content = content.replace(consoleRegex, '');
      modified = true;
      console.log(`Removed console statements from ${filePath}`);
    }
  }

  // Remove unused variables
  const unusedVarRegex = /const\s+(\w+)\s*=\s*[^;]+;\s*\n(?=.*\1)/g;
  if (content.match(unusedVarRegex)) {
    content = content.replace(unusedVarRegex, '');
    modified = true;
    console.log(`Removed unused variables from ${filePath}`);
  }

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Cleaned up: ${filePath}`);
  }
}

// Clean up all files
console.log('🧹 Starting code cleanup...\n');

filesToClean.forEach(cleanFile);
consoleStatements.forEach(cleanFile);

console.log('\n✅ Code cleanup completed!');
console.log('\nNext steps:');
console.log('1. Run: npm run lint');
console.log('2. Run: npm run type-check');
console.log('3. Run: npm test');

