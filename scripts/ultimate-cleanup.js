#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Files that need final cleanup
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
  'src/components/cosmic-navigation.tsx',
  'src/components/cosmic-profile.tsx',
  'src/components/day-rules-card.tsx',
  'src/components/lucky-trio-card.tsx',
  'src/components/optimized-error-boundary.tsx',
  'src/components/share-card.tsx',
  'src/components/social-share.tsx',
  'src/components/theme-provider.tsx',
  'src/components/todays-secret-card.tsx',
  'src/components/translation-bar.tsx',
  'src/components/translation-provider.tsx',
  'src/components/user-provider.tsx',
  'src/components/whatsapp-share.tsx',
  'src/lib/ai/gemini-service.ts'
];

function cleanFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Remove console statements
  const consoleRegex = /console\.(log|warn|error|info)\([^)]*\);?\s*\n?/g;
  if (content.match(consoleRegex)) {
    content = content.replace(consoleRegex, '');
    modified = true;
    console.log(`Removed console statements from ${filePath}`);
  }

  // Remove unused imports
  const unusedImports = [
    'useEffect', 'useMemo', 'useCallback', 'useState',
    'Star', 'Users', 'Heart', 'Moon', 'Settings', 'Translate', 'Sparkles', 'Zap', 'Calculator', 'User',
    'Clock', 'Globe', 'Lock', 'BellOff', 'Shield', 'EyeOff', 'Unlock', 'AlertTriangle',
    'Settings', 'Palette', 'Share2', 'Smile', 'Heart', 'Sparkles'
  ];

  unusedImports.forEach(importName => {
    const importRegex = new RegExp(`import\\s*{[^}]*\\b${importName}\\b[^}]*}\\s*from\\s*['"][^'"]+['"];?\\s*\\n?`, 'g');
    if (content.match(importRegex)) {
      content = content.replace(importRegex, '');
      modified = true;
    }
  });

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
    content = content.replace(/const\s+handlePlanSelect\s*=\s*\(planId\)\s*=>/g, 'const handlePlanSelect = () =>');
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

  if (filePath === 'src/components/cosmic-navigation.tsx') {
    content = content.replace(/console\.(log|warn|error|info)\([^)]*\);?\s*\n?/g, '');
    modified = true;
  }

  if (filePath === 'src/components/cosmic-profile.tsx') {
    content = content.replace(/\(user\)\s*=>/g, '() =>');
    modified = true;
  }

  if (filePath === 'src/components/day-rules-card.tsx') {
    content = content.replace(/\(user\)\s*=>/g, '() =>');
    modified = true;
  }

  if (filePath === 'src/components/lucky-trio-card.tsx') {
    content = content.replace(/\(user\)\s*=>/g, '() =>');
    modified = true;
  }

  if (filePath === 'src/components/optimized-error-boundary.tsx') {
    content = content.replace(/console\.(log|warn|error|info)\([^)]*\);?\s*\n?/g, '');
    modified = true;
  }

  if (filePath === 'src/components/share-card.tsx') {
    content = content.replace(/console\.(log|warn|error|info)\([^)]*\);?\s*\n?/g, '');
    modified = true;
  }

  if (filePath === 'src/components/social-share.tsx') {
    content = content.replace(/console\.(log|warn|error|info)\([^)]*\);?\s*\n?/g, '');
    content = content.replace(/const\s+shareToPlatform\s*=\s*\(platform\)\s*=>/g, 'const shareToPlatform = () =>');
    modified = true;
  }

  if (filePath === 'src/components/theme-provider.tsx') {
    content = content.replace(/const\s+theme\s*=\s*[^;]+;\s*\n/g, '');
    modified = true;
  }

  if (filePath === 'src/components/todays-secret-card.tsx') {
    content = content.replace(/import\s*{\s*useEffect\s*}\s*from\s*['"]react['"];?\s*\n?/g, '');
    content = content.replace(/\(user\)\s*=>/g, '() =>');
    modified = true;
  }

  if (filePath === 'src/components/translation-bar.tsx') {
    content = content.replace(/\(language\)\s*=>/g, '() =>');
    modified = true;
  }

  if (filePath === 'src/components/translation-provider.tsx') {
    content = content.replace(/import\s*{\s*useEffect\s*}\s*from\s*['"]react['"];?\s*\n?/g, '');
    content = content.replace(/const\s+language\s*=\s*[^;]+;\s*\n/g, '');
    content = content.replace(/const\s+key\s*=\s*[^;]+;\s*\n/g, '');
    modified = true;
  }

  if (filePath === 'src/components/user-provider.tsx') {
    content = content.replace(/console\.(log|warn|error|info)\([^)]*\);?\s*\n?/g, '');
    content = content.replace(/const\s+userData\s*=\s*[^;]+;\s*\n/g, '');
    modified = true;
  }

  if (filePath === 'src/components/whatsapp-share.tsx') {
    content = content.replace(/console\.(log|warn|error|info)\([^)]*\);?\s*\n?/g, '');
    content = content.replace(/import\s*{\s*Sparkles\s*}\s*from\s*['"]lucide-react['"];?\s*\n?/g, '');
    modified = true;
  }

  if (filePath === 'src/lib/ai/gemini-service.ts') {
    content = content.replace(/console\.(log|warn|error|info)\([^)]*\);?\s*\n?/g, '');
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Cleaned: ${filePath}`);
  }
}

// Clean all files
console.log('🧹 Ultimate cleanup starting...\n');

filesToClean.forEach(cleanFile);

console.log('\n✅ Ultimate cleanup completed!');
console.log('\nRunning final lint check...');

