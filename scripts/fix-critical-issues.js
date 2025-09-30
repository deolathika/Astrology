#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

console.log('🔧 Fixing critical issues...')

// Fix missing React imports
const files = [
  'src/components/share-card.tsx',
  'src/components/social-share.tsx',
  'src/components/todays-secret-card.tsx',
  'src/components/translation-bar.tsx',
  'src/components/whatsapp-share.tsx'
]

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8')
    
    // Add React import if missing
    if (!content.includes("import React") && !content.includes("import { useState")) {
      content = content.replace(
        /import { ([^}]+) } from 'react'/,
        "import React, { $1 } from 'react'"
      )
    }
    
    // Add missing useState import
    if (content.includes('useState') && !content.includes('useState')) {
      content = content.replace(
        /import React, { ([^}]+) } from 'react'/,
        "import React, { $1, useState } from 'react'"
      )
    }
    
    fs.writeFileSync(file, content)
    console.log(`✅ Fixed imports in ${file}`)
  }
})

// Fix missing icon imports
const iconFiles = [
  'src/components/share-card.tsx',
  'src/components/social-share.tsx',
  'src/components/todays-secret-card.tsx'
]

iconFiles.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8')
    
    // Add missing icon imports
    const missingIcons = [
      'Sun', 'Moon', 'Heart', 'Star', 'Sparkles', 'Share2', 'Download',
      'MessageCircle', 'Instagram', 'Twitter', 'Facebook', 'Mail', 'Check', 'Copy',
      'ChevronUp', 'ChevronDown', 'ThumbsUp', 'X'
    ]
    
    const currentImports = content.match(/import { ([^}]+) } from 'lucide-react'/)?.[1] || ''
    const neededIcons = missingIcons.filter(icon => 
      content.includes(icon) && !currentImports.includes(icon)
    )
    
    if (neededIcons.length > 0) {
      const newImports = [...currentImports.split(', '), ...neededIcons]
        .filter(Boolean)
        .join(', ')
      
      content = content.replace(
        /import { ([^}]+) } from 'lucide-react'/,
        `import { ${newImports} } from 'lucide-react'`
      )
      
      fs.writeFileSync(file, content)
      console.log(`✅ Fixed icon imports in ${file}`)
    }
  }
})

console.log('🎉 Critical issues fixed!')
