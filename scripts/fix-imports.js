#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Icon usage mapping for each file
const iconUsage = {
  'src/app/about/page.tsx': ['Target', 'Star', 'Users', 'MessageCircle', 'Calendar', 'Globe'],
  'src/app/community/page.tsx': ['Search', 'Filter', 'Heart', 'MessageCircle', 'Share2', 'Star', 'Plus', 'TrendingUp', 'Users'],
  'src/app/compatibility/page.tsx': ['Heart', 'Sparkles', 'Zap', 'Shield', 'Users', 'Star', 'Flame'],
  'src/app/contact/page.tsx': ['MessageCircle', 'CheckCircle', 'AlertCircle', 'Send', 'Mail', 'Globe', 'Clock'],
  'src/app/dreams/page.tsx': ['Plus', 'Moon', 'BookOpen', 'Calendar', 'Star', 'Sparkles', 'Eye', 'Brain', 'Heart'],
  'src/app/experts/page.tsx': ['Search', 'Users', 'Star', 'Calendar', 'MessageCircle'],
  'src/app/faq/page.tsx': ['HelpCircle', 'ChevronUp', 'ChevronDown', 'MessageCircle'],
  'src/app/legal/privacy/page.tsx': ['Shield', 'CheckCircle', 'Lock', 'Key', 'Globe'],
  'src/app/legal/terms/page.tsx': ['FileText', 'AlertTriangle', 'CheckCircle', 'XCircle', 'Info'],
  'src/app/onboarding/page.tsx': ['Star', 'Sun', 'Moon', 'Check', 'Sparkles', 'ArrowLeft', 'ArrowRight'],
  'src/app/onboarding/signup/page.tsx': ['Sun', 'Moon', 'Check', 'ArrowRight'],
  'src/app/premium/page.tsx': ['Shield', 'MessageCircle', 'Calendar', 'Gift'],
  'src/app/profile/page.tsx': ['Clock', 'Globe', 'Lock'],
  'src/app/settings/notifications/page.tsx': ['BellOff', 'Shield'],
  'src/app/settings/page.tsx': ['Settings', 'Palette'],
  'src/app/settings/privacy/page.tsx': ['EyeOff', 'Unlock', 'AlertTriangle']
};

function fixImports(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  if (iconUsage[filePath]) {
    const icons = iconUsage[filePath];
    const importLine = `import { ${icons.join(', ')} } from 'lucide-react'`;
    
    // Find existing lucide-react import
    const lucideImportRegex = /import\s*{[^}]*}\s*from\s*['"]lucide-react['"];?\s*\n?/;
    
    if (content.match(lucideImportRegex)) {
      // Replace existing import
      content = content.replace(lucideImportRegex, importLine + '\n');
      modified = true;
    } else {
      // Add new import at the top
      const lines = content.split('\n');
      let insertIndex = 0;
      
      // Find the last import statement
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('import ')) {
          insertIndex = i + 1;
        }
      }
      
      lines.splice(insertIndex, 0, importLine);
      content = lines.join('\n');
      modified = true;
    }
    
    console.log(`Fixed imports for ${filePath}`);
  }

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed: ${filePath}`);
  }
}

// Fix all files
console.log('🔧 Fixing import statements...\n');

Object.keys(iconUsage).forEach(fixImports);

console.log('\n✅ Import fixes completed!');
