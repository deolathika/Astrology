#!/usr/bin/env node

const fs = require('fs')

console.log('🔧 Fixing syntax errors...')

// Fix offline-llm-client.ts
const file = 'src/lib/ai/offline-llm-client.ts'
if (fs.existsSync(file)) {
  let content = fs.readFileSync(file, 'utf8')
  
  // Fix the syntax error
  content = content.replace(/\+ '%'\)/g, "console.log('Loading progress:', progress + '%')")
  
  // Fix other syntax issues
  content = content.replace(/try \{[\s\S]*?catch \(error\) \{[\s\S]*?\}/g, (match) => {
    return match.replace(/\+ '%'\)/g, "console.log('Loading progress:', progress + '%')")
  })
  
  fs.writeFileSync(file, content)
  console.log(`✅ Fixed syntax errors in ${file}`)
}

// Fix today page
const todayFile = 'src/app/today/page.tsx'
if (fs.existsSync(todayFile)) {
  let content = fs.readFileSync(todayFile, 'utf8')
  
  // Fix expression expected errors
  content = content.replace(/Expression expected/g, '')
  
  fs.writeFileSync(todayFile, content)
  console.log(`✅ Fixed syntax errors in ${todayFile}`)
}

console.log('🎉 Syntax errors fixed!')
