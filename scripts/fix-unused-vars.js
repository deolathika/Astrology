#!/usr/bin/env node

const fs = require('fs');

// Files with unused variables to fix
const filesToFix = [
  'src/app/api/astro/transits/route.ts',
  'src/app/api/today/route.ts',
  'src/app/dreams/page.tsx',
  'src/app/experts/page.tsx',
  'src/app/faq/page.tsx',
  'src/app/premium/page.tsx',
  'src/app/profile/page.tsx',
  'src/app/settings/privacy/page.tsx'
];

function fixUnusedVars(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Remove unused variable assignments
  const unusedVarPatterns = [
    // Remove unused destructured variables
    /const\s*{\s*([^}]*)\s*}\s*=\s*[^;]+;\s*\n/g,
    // Remove unused function parameters
    /function\s+\w+\([^)]*\)\s*{/g,
    // Remove unused arrow function parameters
    /\([^)]*\)\s*=>\s*{/g
  ];

  // Specific fixes for known issues
  if (filePath === 'src/app/api/astro/transits/route.ts') {
    // Remove unused parameters from function signatures
    content = content.replace(/\(date, latitude, longitude\)/g, '()');
    content = content.replace(/\(latitude, longitude\)/g, '()');
    modified = true;
  }

  if (filePath === 'src/app/api/today/route.ts') {
    // Remove unused variables
    content = content.replace(/const\s+hour\s*=\s*[^;]+;\s*\n/g, '');
    content = content.replace(/const\s+generateDailyGuidance\s*=\s*[^;]+;\s*\n/g, '');
    content = content.replace(/const\s+generateLuckyNumbers\s*=\s*[^;]+;\s*\n/g, '');
    content = content.replace(/const\s+generateDayRules\s*=\s*[^;]+;\s*\n/g, '');
    content = content.replace(/const\s+generateMoodFix\s*=\s*[^;]+;\s*\n/g, '');
    
    // Remove unused destructured variables
    content = content.replace(/const\s*{\s*lifePath,\s*destiny,\s*planetaryHours,\s*dayOfMonth,\s*month\s*}\s*=\s*[^;]+;\s*\n/g, '');
    content = content.replace(/const\s*{\s*destiny,\s*dailyNumber\s*}\s*=\s*[^;]+;\s*\n/g, '');
    
    // Remove unused function parameters
    content = content.replace(/function\s+generateLuckyColor\([^)]*\)/g, 'function generateLuckyColor()');
    content = content.replace(/function\s+generateLuckyObject\([^)]*\)/g, 'function generateLuckyObject()');
    content = content.replace(/function\s+generateDoRules\([^)]*\)/g, 'function generateDoRules()');
    content = content.replace(/function\s+generateDontRules\([^)]*\)/g, 'function generateDontRules()');
    content = content.replace(/function\s+generateMoodFixArray\([^)]*\)/g, 'function generateMoodFixArray()');
    
    modified = true;
  }

  if (filePath === 'src/app/dreams/page.tsx') {
    // Remove unused state variables
    content = content.replace(/const\s*\[\s*searchQuery,\s*setSearchQuery\s*\]\s*=\s*useState[^;]+;\s*\n/g, '');
    modified = true;
  }

  if (filePath === 'src/app/experts/page.tsx') {
    // Remove unused parameters
    content = content.replace(/const\s+handleExpertClick\s*=\s*\(expertId\)\s*=>/g, 'const handleExpertClick = () =>');
    content = content.replace(/const\s+handleConsultationClick\s*=\s*\(expertId\)\s*=>/g, 'const handleConsultationClick = () =>');
    modified = true;
  }

  if (filePath === 'src/app/faq/page.tsx') {
    // Remove unused index parameter
    content = content.replace(/\(faq,\s*index\)\s*=>/g, '(faq) =>');
    modified = true;
  }

  if (filePath === 'src/app/premium/page.tsx') {
    // Remove unused state variables
    content = content.replace(/const\s*\[\s*selectedPlan,\s*setSelectedPlan\s*\]\s*=\s*useState[^;]+;\s*\n/g, '');
    content = content.replace(/const\s*\[\s*selectedConsultation,\s*setSelectedConsultation\s*\]\s*=\s*useState[^;]+;\s*\n/g, '');
    content = content.replace(/const\s+handlePlanSelect\s*=\s*\(planId\)\s*=>/g, 'const handlePlanSelect = () =>');
    content = content.replace(/const\s+handleConsultationSelect\s*=\s*\(consultationId\)\s*=>/g, 'const handleConsultationSelect = () =>');
    modified = true;
  }

  if (filePath === 'src/app/profile/page.tsx') {
    // Remove unused translate variable
    content = content.replace(/const\s+translate\s*=\s*[^;]+;\s*\n/g, '');
    content = content.replace(/\(profile,\s*index\)\s*=>/g, '(profile) =>');
    modified = true;
  }

  if (filePath === 'src/app/settings/privacy/page.tsx') {
    // Remove unused state variables
    content = content.replace(/const\s*\[\s*showDataExport,\s*setShowDataExport\s*\]\s*=\s*useState[^;]+;\s*\n/g, '');
    content = content.replace(/const\s*\[\s*showDeleteAccount,\s*setShowDeleteAccount\s*\]\s*=\s*useState[^;]+;\s*\n/g, '');
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed unused variables in: ${filePath}`);
  }
}

// Fix all files
console.log('🔧 Fixing unused variables...\n');

filesToFix.forEach(fixUnusedVars);

console.log('\n✅ Unused variable fixes completed!');
