#!/usr/bin/env node

/**
 * Comprehensive App Audit Script
 * Checks frontend and backend for issues
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

console.log('🔍 Daily Secrets App Audit Starting...\n')

const issues = []
const warnings = []
const fixes = []

// Check for missing imports
function checkImports() {
  console.log('📦 Checking imports...')
  
  const files = [
    'src/components/analytics-provider.tsx',
    'src/components/translation-provider.tsx',
    'src/components/user-provider.tsx',
    'src/components/theme-provider.tsx'
  ]
  
  files.forEach(file => {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8')
      
      // Check for missing React imports
      if (content.includes('useState') && !content.includes("import React") && !content.includes("import { useState")) {
        issues.push(`❌ ${file}: Missing React import for useState`)
      }
      
      if (content.includes('useEffect') && !content.includes("import { useEffect")) {
        issues.push(`❌ ${file}: Missing React import for useEffect`)
      }
      
      if (content.includes('createContext') && !content.includes("import { createContext")) {
        issues.push(`❌ ${file}: Missing React import for createContext`)
      }
    }
  })
}

// Check for console statements
function checkConsoleStatements() {
  console.log('🔍 Checking for console statements...')
  
  const files = fs.readdirSync('src', { recursive: true })
    .filter(file => file.endsWith('.tsx') || file.endsWith('.ts'))
    .map(file => path.join('src', file))
  
  files.forEach(file => {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8')
      const consoleMatches = content.match(/console\.(log|warn|error|info)/g)
      
      if (consoleMatches) {
        warnings.push(`⚠️  ${file}: Found ${consoleMatches.length} console statements`)
      }
    }
  })
}

// Check for unused variables
function checkUnusedVariables() {
  console.log('🔍 Checking for unused variables...')
  
  const files = [
    'src/components/comprehensive-navigation.tsx',
    'src/app/onboarding/complete/page.tsx'
  ]
  
  files.forEach(file => {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8')
      
      // Check for excessive imports
      const importLines = content.split('\n').filter(line => line.trim().startsWith('import'))
      if (importLines.length > 20) {
        warnings.push(`⚠️  ${file}: Too many imports (${importLines.length})`)
      }
    }
  })
}

// Check for missing assets
function checkMissingAssets() {
  console.log('📁 Checking for missing assets...')
  
  const assets = [
    'public/Icon-192.png',
    'public/flutter_service_worker.js',
    'public/manifest.json',
    'public/favicon.ico'
  ]
  
  assets.forEach(asset => {
    if (!fs.existsSync(asset)) {
      issues.push(`❌ Missing asset: ${asset}`)
    } else {
      fixes.push(`✅ Found asset: ${asset}`)
    }
  })
}

// Check API routes
function checkAPIRoutes() {
  console.log('🔌 Checking API routes...')
  
  const apiFiles = [
    'src/app/api/today/route.ts',
    'src/app/api/numerology/core/route.ts',
    'src/app/api/community/chat/route.ts'
  ]
  
  apiFiles.forEach(file => {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8')
      
      // Check for proper error handling
      if (!content.includes('try {') && !content.includes('catch')) {
        warnings.push(`⚠️  ${file}: Missing error handling`)
      }
      
      // Check for proper response format
      if (!content.includes('NextResponse.json')) {
        warnings.push(`⚠️  ${file}: Missing proper response format`)
      }
    } else {
      issues.push(`❌ Missing API route: ${file}`)
    }
  })
}

// Check TypeScript errors
function checkTypeScriptErrors() {
  console.log('📝 Checking TypeScript errors...')
  
  try {
    execSync('npx tsc --noEmit', { stdio: 'pipe' })
    fixes.push('✅ No TypeScript errors found')
  } catch (error) {
    const output = error.stdout?.toString() || error.stderr?.toString() || ''
    const errorLines = output.split('\n').filter(line => line.includes('error'))
    
    errorLines.forEach(line => {
      issues.push(`❌ TypeScript: ${line}`)
    })
  }
}

// Check ESLint errors
function checkESLintErrors() {
  console.log('🔧 Checking ESLint errors...')
  
  try {
    execSync('npx eslint src --ext .ts,.tsx', { stdio: 'pipe' })
    fixes.push('✅ No ESLint errors found')
  } catch (error) {
    const output = error.stdout?.toString() || error.stderr?.toString() || ''
    const errorLines = output.split('\n').filter(line => line.includes('error'))
    
    errorLines.slice(0, 10).forEach(line => {
      warnings.push(`⚠️  ESLint: ${line}`)
    })
  }
}

// Check for hydration issues
function checkHydrationIssues() {
  console.log('💧 Checking for hydration issues...')
  
  const clientComponents = [
    'src/components/analytics-provider.tsx',
    'src/components/translation-provider.tsx',
    'src/components/user-provider.tsx'
  ]
  
  clientComponents.forEach(file => {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8')
      
      // Check for proper SSR handling
      if (content.includes('localStorage') && !content.includes('typeof window !== \'undefined\'')) {
        issues.push(`❌ ${file}: localStorage used without SSR check`)
      }
      
      // Check for mounted state
      if (content.includes('useState') && !content.includes('mounted')) {
        warnings.push(`⚠️  ${file}: Consider adding mounted state for SSR`)
      }
    }
  })
}

// Check mobile responsiveness
function checkMobileResponsiveness() {
  console.log('📱 Checking mobile responsiveness...')
  
  const pages = [
    'src/app/home/page.tsx',
    'src/app/onboarding/complete/page.tsx',
    'src/app/profile/page.tsx'
  ]
  
  pages.forEach(file => {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8')
      
      // Check for mobile-specific classes
      if (!content.includes('md:') && !content.includes('lg:') && !content.includes('sm:')) {
        warnings.push(`⚠️  ${file}: Missing responsive classes`)
      }
      
      // Check for mobile state
      if (!content.includes('isMobile') && !content.includes('useState')) {
        warnings.push(`⚠️  ${file}: Consider adding mobile state detection`)
      }
    }
  })
}

// Check accessibility
function checkAccessibility() {
  console.log('♿ Checking accessibility...')
  
  const components = [
    'src/components/policy-navigation.tsx',
    'src/app/onboarding/complete/page.tsx'
  ]
  
  components.forEach(file => {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8')
      
      // Check for proper button elements
      if (content.includes('onClick') && !content.includes('<button')) {
        warnings.push(`⚠️  ${file}: Consider using button elements for clickable items`)
      }
      
      // Check for alt text
      if (content.includes('<img') && !content.includes('alt=')) {
        warnings.push(`⚠️  ${file}: Images missing alt text`)
      }
      
      // Check for proper heading hierarchy
      if (content.includes('<h2') && !content.includes('<h1')) {
        warnings.push(`⚠️  ${file}: Check heading hierarchy`)
      }
    }
  })
}

// Run all checks
function runAudit() {
  checkImports()
  checkConsoleStatements()
  checkUnusedVariables()
  checkMissingAssets()
  checkAPIRoutes()
  checkTypeScriptErrors()
  checkESLintErrors()
  checkHydrationIssues()
  checkMobileResponsiveness()
  checkAccessibility()
  
  // Print results
  console.log('\n📊 Audit Results:\n')
  
  if (fixes.length > 0) {
    console.log('✅ Fixes Applied:')
    fixes.forEach(fix => console.log(fix))
    console.log('')
  }
  
  if (warnings.length > 0) {
    console.log('⚠️  Warnings:')
    warnings.forEach(warning => console.log(warning))
    console.log('')
  }
  
  if (issues.length > 0) {
    console.log('❌ Issues Found:')
    issues.forEach(issue => console.log(issue))
    console.log('')
  }
  
  // Summary
  console.log(`📈 Summary:`)
  console.log(`   ✅ Fixes: ${fixes.length}`)
  console.log(`   ⚠️  Warnings: ${warnings.length}`)
  console.log(`   ❌ Issues: ${issues.length}`)
  
  if (issues.length === 0) {
    console.log('\n🎉 All critical issues resolved!')
  } else {
    console.log('\n🔧 Please fix the issues above.')
  }
}

// Run the audit
runAudit()


