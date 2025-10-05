#!/usr/bin/env node

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

// Build performance analysis
class BuildAnalyzer {
  constructor() {
    this.startTime = Date.now()
    this.metrics = {}
  }

  // Analyze build performance
  async analyzeBuild() {
    console.log('🔍 Analyzing build performance...')
    
    try {
      // Clean previous build
      this.cleanBuild()
      
      // Run build with timing
      const buildTime = await this.timeBuild()
      this.metrics.buildTime = buildTime
      
      // Analyze bundle sizes
      const bundleSizes = this.analyzeBundleSizes()
      this.metrics.bundleSizes = bundleSizes
      
      // Analyze build output
      const buildOutput = this.analyzeBuildOutput()
      this.metrics.buildOutput = buildOutput
      
      // Generate report
      this.generateReport()
      
    } catch (error) {
      console.error('❌ Build analysis failed:', error)
      process.exit(1)
    }
  }

  // Clean build directory
  cleanBuild() {
    console.log('🧹 Cleaning build directory...')
    try {
      if (fs.existsSync('.next')) {
        fs.rmSync('.next', { recursive: true, force: true })
      }
      console.log('✅ Build directory cleaned')
    } catch (error) {
      console.warn('⚠️  Could not clean build directory:', error.message)
    }
  }

  // Time the build process
  async timeBuild() {
    console.log('⏱️  Timing build process...')
    const startTime = Date.now()
    
    try {
      execSync('npm run build', { stdio: 'pipe' })
      const endTime = Date.now()
      const buildTime = endTime - startTime
      
      console.log(`✅ Build completed in ${buildTime}ms (${(buildTime / 1000).toFixed(2)}s)`)
      return buildTime
    } catch (error) {
      console.error('❌ Build failed:', error.message)
      throw error
    }
  }

  // Analyze bundle sizes
  analyzeBundleSizes() {
    console.log('📦 Analyzing bundle sizes...')
    
    const bundleSizes = {}
    const buildDir = '.next/static'
    
    if (!fs.existsSync(buildDir)) {
      console.warn('⚠️  Build directory not found')
      return bundleSizes
    }
    
    // Analyze JavaScript bundles
    const jsFiles = this.findFiles(buildDir, '.js')
    jsFiles.forEach(file => {
      const size = fs.statSync(file).size
      const relativePath = path.relative(buildDir, file)
      bundleSizes[relativePath] = {
        size: size,
        sizeKB: Math.round(size / 1024 * 100) / 100,
        sizeMB: Math.round(size / 1024 / 1024 * 100) / 100
      }
    })
    
    // Analyze CSS bundles
    const cssFiles = this.findFiles(buildDir, '.css')
    cssFiles.forEach(file => {
      const size = fs.statSync(file).size
      const relativePath = path.relative(buildDir, file)
      bundleSizes[relativePath] = {
        size: size,
        sizeKB: Math.round(size / 1024 * 100) / 100,
        sizeMB: Math.round(size / 1024 / 1024 * 100) / 100
      }
    })
    
    console.log(`✅ Found ${Object.keys(bundleSizes).length} bundle files`)
    return bundleSizes
  }

  // Find files recursively
  findFiles(dir, extension) {
    const files = []
    
    if (!fs.existsSync(dir)) return files
    
    const items = fs.readdirSync(dir)
    
    items.forEach(item => {
      const fullPath = path.join(dir, item)
      const stat = fs.statSync(fullPath)
      
      if (stat.isDirectory()) {
        files.push(...this.findFiles(fullPath, extension))
      } else if (item.endsWith(extension)) {
        files.push(fullPath)
      }
    })
    
    return files
  }

  // Analyze build output
  analyzeBuildOutput() {
    console.log('📊 Analyzing build output...')
    
    const buildOutput = {
      totalSize: 0,
      fileCount: 0,
      largestFiles: [],
      recommendations: []
    }
    
    if (!fs.existsSync('.next')) {
      console.warn('⚠️  Build directory not found')
      return buildOutput
    }
    
    // Calculate total size
    const totalSize = this.calculateDirectorySize('.next')
    buildOutput.totalSize = totalSize
    buildOutput.totalSizeMB = Math.round(totalSize / 1024 / 1024 * 100) / 100
    
    // Count files
    buildOutput.fileCount = this.countFiles('.next')
    
    // Find largest files
    buildOutput.largestFiles = this.findLargestFiles('.next', 10)
    
    // Generate recommendations
    buildOutput.recommendations = this.generateRecommendations(buildOutput)
    
    console.log(`✅ Build output analyzed: ${buildOutput.totalSizeMB}MB, ${buildOutput.fileCount} files`)
    return buildOutput
  }

  // Calculate directory size
  calculateDirectorySize(dir) {
    let totalSize = 0
    
    if (!fs.existsSync(dir)) return totalSize
    
    const items = fs.readdirSync(dir)
    
    items.forEach(item => {
      const fullPath = path.join(dir, item)
      const stat = fs.statSync(fullPath)
      
      if (stat.isDirectory()) {
        totalSize += this.calculateDirectorySize(fullPath)
      } else {
        totalSize += stat.size
      }
    })
    
    return totalSize
  }

  // Count files recursively
  countFiles(dir) {
    let count = 0
    
    if (!fs.existsSync(dir)) return count
    
    const items = fs.readdirSync(dir)
    
    items.forEach(item => {
      const fullPath = path.join(dir, item)
      const stat = fs.statSync(fullPath)
      
      if (stat.isDirectory()) {
        count += this.countFiles(fullPath)
      } else {
        count++
      }
    })
    
    return count
  }

  // Find largest files
  findLargestFiles(dir, limit = 10) {
    const files = []
    
    if (!fs.existsSync(dir)) return files
    
    const items = fs.readdirSync(dir)
    
    items.forEach(item => {
      const fullPath = path.join(dir, item)
      const stat = fs.statSync(fullPath)
      
      if (stat.isDirectory()) {
        files.push(...this.findLargestFiles(fullPath, limit))
      } else {
        files.push({
          path: fullPath,
          size: stat.size,
          sizeKB: Math.round(stat.size / 1024 * 100) / 100
        })
      }
    })
    
    return files
      .sort((a, b) => b.size - a.size)
      .slice(0, limit)
  }

  // Generate recommendations
  generateRecommendations(buildOutput) {
    const recommendations = []
    
    // Check total size
    if (buildOutput.totalSizeMB > 50) {
      recommendations.push('Build size is large (>50MB). Consider implementing code splitting and tree shaking.')
    }
    
    // Check for large files
    buildOutput.largestFiles.forEach(file => {
      if (file.sizeKB > 1000) { // > 1MB
        recommendations.push(`Large file detected: ${file.path} (${file.sizeKB}KB). Consider optimizing.`)
      }
    })
    
    // Check build time
    if (this.metrics.buildTime > 60000) { // > 1 minute
      recommendations.push('Build time is slow (>1 minute). Consider optimizing webpack configuration.')
    }
    
    return recommendations
  }

  // Generate performance report
  generateReport() {
    console.log('\n📊 Build Performance Report')
    console.log('=' .repeat(50))
    
    // Build time
    console.log(`⏱️  Build Time: ${this.metrics.buildTime}ms (${(this.metrics.buildTime / 1000).toFixed(2)}s)`)
    
    // Bundle sizes
    if (this.metrics.bundleSizes) {
      console.log('\n📦 Bundle Sizes:')
      Object.entries(this.metrics.bundleSizes)
        .sort(([,a], [,b]) => b.size - a.size)
        .slice(0, 10)
        .forEach(([file, info]) => {
          console.log(`  ${file}: ${info.sizeKB}KB`)
        })
    }
    
    // Build output
    if (this.metrics.buildOutput) {
      const output = this.metrics.buildOutput
      console.log(`\n📁 Build Output: ${output.totalSizeMB}MB, ${output.fileCount} files`)
      
      if (output.largestFiles.length > 0) {
        console.log('\n🔍 Largest Files:')
        output.largestFiles.slice(0, 5).forEach(file => {
          console.log(`  ${file.path}: ${file.sizeKB}KB`)
        })
      }
    }
    
    // Recommendations
    if (this.metrics.buildOutput?.recommendations.length > 0) {
      console.log('\n💡 Recommendations:')
      this.metrics.buildOutput.recommendations.forEach(rec => {
        console.log(`  • ${rec}`)
      })
    }
    
    console.log('\n✅ Build analysis completed!')
  }
}

// Run analysis
if (require.main === module) {
  const analyzer = new BuildAnalyzer()
  analyzer.analyzeBuild()
    .then(() => {
      console.log('🎉 Build performance analysis completed successfully!')
      process.exit(0)
    })
    .catch((error) => {
      console.error('❌ Build performance analysis failed:', error)
      process.exit(1)
    })
}

module.exports = { BuildAnalyzer }
