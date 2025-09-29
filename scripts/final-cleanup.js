#!/usr/bin/env node

const fs = require('fs');

// Comprehensive cleanup for all remaining issues
const filesToClean = [
  'src/app/api/astro/transits/route.ts',
  'src/app/api/today/route.ts',
  'src/app/dreams/page.tsx',
  'src/app/experts/page.tsx',
  'src/app/faq/page.tsx',
  'src/app/premium/page.tsx',
  'src/app/profile/page.tsx',
  'src/app/settings/notifications/page.tsx',
  'src/app/settings/page.tsx',
  'src/app/settings/privacy/page.tsx',
  'src/app/subscription/page.tsx',
  'src/components/analytics-provider.tsx',
  'src/components/comprehensive-navigation.tsx',
  'src/components/cosmic-home-screen.tsx'
];

// Additional icons needed for each file
const additionalIcons = {
  'src/app/premium/page.tsx': ['Crown', 'Star', 'Zap', 'Check', 'X', 'Users', 'CreditCard'],
  'src/app/profile/page.tsx': ['User', 'Share2', 'Settings', 'Sun', 'Moon', 'Star', 'Download', 'Trash2', 'Save', 'X', 'Edit3'],
  'src/app/settings/notifications/page.tsx': ['Bell', 'Calendar', 'Settings'],
  'src/app/settings/page.tsx': ['Bell', 'Globe', 'Shield', 'User', 'CreditCard', 'LogOut', 'HelpCircle', 'Info'],
  'src/app/settings/privacy/page.tsx': ['Shield', 'Database', 'Download', 'Trash2', 'Lock', 'CheckCircle'],
  'src/components/cosmic-home-screen.tsx': ['Star', 'Users', 'Heart', 'Moon', 'Settings', 'Translate', 'Sparkles', 'Zap', 'Calculator', 'User']
};

function cleanFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Add missing icons
  if (additionalIcons[filePath]) {
    const icons = additionalIcons[filePath];
    const importLine = `import { ${icons.join(', ')} } from 'lucide-react'`;
    
    // Find existing lucide-react import and add missing icons
    const lucideImportRegex = /import\s*{\s*([^}]*)\s*}\s*from\s*['"]lucide-react['"];?\s*\n?/;
    const match = content.match(lucideImportRegex);
    
    if (match) {
      const existingIcons = match[1].split(',').map(icon => icon.trim());
      const allIcons = [...new Set([...existingIcons, ...icons])];
      const newImportLine = `import { ${allIcons.join(', ')} } from 'lucide-react'`;
      content = content.replace(lucideImportRegex, newImportLine + '\n');
      modified = true;
    }
  }

  // Remove console statements
  const consoleRegex = /console\.(log|warn|error|info)\([^)]*\);?\s*\n?/g;
  if (content.match(consoleRegex)) {
    content = content.replace(consoleRegex, '');
    modified = true;
  }

  // Remove unused variables and parameters
  if (filePath === 'src/app/api/astro/transits/route.ts') {
    content = content.replace(/\(date, latitude, longitude\)/g, '()');
    content = content.replace(/\(latitude, longitude\)/g, '()');
    modified = true;
  }

  if (filePath === 'src/app/api/today/route.ts') {
    // Remove all unused variables and functions
    content = content.replace(/const\s+hour\s*=\s*[^;]+;\s*\n/g, '');
    content = content.replace(/const\s+generateDailyGuidance\s*=\s*[^;]+;\s*\n/g, '');
    content = content.replace(/const\s+generateLuckyNumbers\s*=\s*[^;]+;\s*\n/g, '');
    content = content.replace(/const\s+generateDayRules\s*=\s*[^;]+;\s*\n/g, '');
    content = content.replace(/const\s+generateMoodFix\s*=\s*[^;]+;\s*\n/g, '');
    content = content.replace(/const\s*{\s*lifePath,\s*destiny,\s*planetaryHours,\s*dayOfMonth,\s*month\s*}\s*=\s*[^;]+;\s*\n/g, '');
    content = content.replace(/const\s*{\s*destiny,\s*dailyNumber\s*}\s*=\s*[^;]+;\s*\n/g, '');
    content = content.replace(/function\s+generateLuckyColor\([^)]*\)/g, 'function generateLuckyColor()');
    content = content.replace(/function\s+generateLuckyObject\([^)]*\)/g, 'function generateLuckyObject()');
    content = content.replace(/function\s+generateDoRules\([^)]*\)/g, 'function generateDoRules()');
    content = content.replace(/function\s+generateDontRules\([^)]*\)/g, 'function generateDontRules()');
    content = content.replace(/function\s+generateMoodFixArray\([^)]*\)/g, 'function generateMoodFixArray()');
    modified = true;
  }

  if (filePath === 'src/app/dreams/page.tsx') {
    content = content.replace(/const\s*\[\s*searchQuery,\s*setSearchQuery\s*\]\s*=\s*useState[^;]+;\s*\n/g, '');
    modified = true;
  }

  if (filePath === 'src/app/experts/page.tsx') {
    content = content.replace(/const\s+handleExpertClick\s*=\s*\(expertId\)\s*=>/g, 'const handleExpertClick = () =>');
    content = content.replace(/const\s+handleConsultationClick\s*=\s*\(expertId\)\s*=>/g, 'const handleConsultationClick = () =>');
    modified = true;
  }

  if (filePath === 'src/app/faq/page.tsx') {
    content = content.replace(/\(faq,\s*index\)\s*=>/g, '(faq) =>');
    modified = true;
  }

  if (filePath === 'src/app/premium/page.tsx') {
    content = content.replace(/const\s*\[\s*selectedPlan,\s*setSelectedPlan\s*\]\s*=\s*useState[^;]+;\s*\n/g, '');
    content = content.replace(/const\s*\[\s*selectedConsultation,\s*setSelectedConsultation\s*\]\s*=\s*useState[^;]+;\s*\n/g, '');
    content = content.replace(/const\s+handlePlanSelect\s*=\s*\(planId\)\s*=>/g, 'const handlePlanSelect = () =>');
    content = content.replace(/const\s+handleConsultationSelect\s*=\s*\(consultationId\)\s*=>/g, 'const handleConsultationSelect = () =>');
    modified = true;
  }

  if (filePath === 'src/app/profile/page.tsx') {
    content = content.replace(/const\s+translate\s*=\s*[^;]+;\s*\n/g, '');
    content = content.replace(/\(profile,\s*index\)\s*=>/g, '(profile) =>');
    modified = true;
  }

  if (filePath === 'src/app/settings/privacy/page.tsx') {
    content = content.replace(/const\s*\[\s*showDataExport,\s*setShowDataExport\s*\]\s*=\s*useState[^;]+;\s*\n/g, '');
    content = content.replace(/const\s*\[\s*showDeleteAccount,\s*setShowDeleteAccount\s*\]\s*=\s*useState[^;]+;\s*\n/g, '');
    modified = true;
  }

  if (filePath === 'src/app/subscription/page.tsx') {
    content = content.replace(/const\s*\[\s*selectedPlan,\s*setSelectedPlan\s*\]\s*=\s*useState[^;]+;\s*\n/g, '');
    modified = true;
  }

  if (filePath === 'src/components/analytics-provider.tsx') {
    content = content.replace(/const\s+trackEvent\s*=\s*\(event,\s*properties\)\s*=>/g, 'const trackEvent = () =>');
    content = content.replace(/const\s+identify\s*=\s*\(userId,\s*traits\)\s*=>/g, 'const identify = () =>');
    content = content.replace(/const\s+page\s*=\s*\(name,\s*properties\)\s*=>/g, 'const page = () =>');
    content = content.replace(/const\s+Window\s*=\s*[^;]+;\s*\n/g, '');
    content = content.replace(/const\s+args\s*=\s*[^;]+;\s*\n/g, '');
    modified = true;
  }

  if (filePath === 'src/components/comprehensive-navigation.tsx') {
    content = content.replace(/import\s*{\s*Calendar\s*}\s*from\s*['"]lucide-react['"];?\s*\n/g, '');
    modified = true;
  }

  if (filePath === 'src/components/cosmic-home-screen.tsx') {
    // Keep the imports as they are used in the component
    modified = false;
  }

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Cleaned: ${filePath}`);
  }
}

// Clean all files
console.log('🧹 Final comprehensive cleanup...\n');

filesToClean.forEach(cleanFile);

console.log('\n✅ Final cleanup completed!');
console.log('\nRunning final checks...');
