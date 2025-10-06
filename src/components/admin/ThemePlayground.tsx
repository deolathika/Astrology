'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Palette, 
  Sun, 
  Moon, 
  Sparkles,
  Check,
  Copy,
  Download
} from 'lucide-react'
import { themePresets, applyTheme, getStoredTheme, themeDescriptions } from '@/styles/presets'
import type { ThemePreset } from '@/styles/presets'

const ThemePlayground: React.FC = () => {
  const [activeTheme, setActiveTheme] = useState<ThemePreset>('celestialBright')
  const [customColors, setCustomColors] = useState({
    bg: '#FFFFFF',
    surface: '#F8FAFC',
    text: '#111827',
    textMuted: '#374151',
    primary: '#6D28D9',
    secondary: '#0EA5E9',
    accent: '#22C55E'
  })

  useEffect(() => {
    const stored = getStoredTheme()
    setActiveTheme(stored)
  }, [])

  const handleThemeChange = (theme: ThemePreset) => {
    setActiveTheme(theme)
    applyTheme(theme)
  }

  const handleCustomColorChange = (key: string, value: string) => {
    setCustomColors(prev => ({ ...prev, [key]: value }))
    
    // Apply custom colors immediately
    const root = document.documentElement
    root.style.setProperty(`--color-${key}`, value)
  }

  const copyThemeCode = () => {
    const themeCode = `const customTheme = {
  colors: {
    bg: "${customColors.bg}",
    surface: "${customColors.surface}",
    text: "${customColors.text}",
    textMuted: "${customColors.textMuted}",
    primary: "${customColors.primary}",
    secondary: "${customColors.secondary}",
    accent: "${customColors.accent}"
  }
}`
    
    navigator.clipboard.writeText(themeCode)
  }

  const downloadTheme = () => {
    const themeData = {
      name: "Custom Theme",
      colors: customColors,
      generated: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(themeData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'custom-theme.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
              <Palette className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold">Theme Playground</h1>
          </div>
          <p className="text-[var(--color-text-muted)]">
            Preview and customize the Daily Secrets design system
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Theme Presets */}
          <div className="lg:col-span-1">
            <div className="bg-[var(--color-surface)] rounded-2xl p-6 shadow-[0_8px_30px_rgba(17,24,39,0.06)]">
              <h2 className="text-xl font-semibold mb-4">Theme Presets</h2>
              <div className="space-y-3">
                {Object.entries(themePresets).map(([key, theme]) => (
                  <motion.button
                    key={key}
                    onClick={() => handleThemeChange(key as ThemePreset)}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${
                      activeTheme === key
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                        {key === 'celestialBright' && <Sun className="w-4 h-4 text-yellow-500" />}
                        {key === 'cosmicNight' && <Moon className="w-4 h-4 text-blue-500" />}
                        {key === 'serenePastel' && <Sparkles className="w-4 h-4 text-pink-500" />}
                      </div>
                      <div className="text-left">
                        <h3 className="font-medium">{theme.name}</h3>
                        <p className="text-sm text-[var(--color-text-muted)]">
                          {themeDescriptions[key as ThemePreset].description}
                        </p>
                      </div>
                      {activeTheme === key && (
                        <Check className="w-5 h-5 text-green-500 ml-auto" />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Custom Colors */}
          <div className="lg:col-span-2">
            <div className="bg-[var(--color-surface)] rounded-2xl p-6 shadow-[0_8px_30px_rgba(17,24,39,0.06)]">
              <h2 className="text-xl font-semibold mb-4">Custom Colors</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(customColors).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <label className="block text-sm font-medium capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={value}
                        onChange={(e) => handleCustomColorChange(key, e.target.value)}
                        className="w-12 h-10 rounded-lg border border-gray-200 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => handleCustomColorChange(key, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono"
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={copyThemeCode}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  <span>Copy Code</span>
                </button>
                <button
                  onClick={downloadTheme}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="mt-8">
          <div className="bg-[var(--color-surface)] rounded-2xl p-6 shadow-[0_8px_30px_rgba(17,24,39,0.06)]">
            <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Sample Card */}
              <div className="bg-[var(--color-bg)] rounded-xl p-4 shadow-sm">
                <h3 className="font-semibold text-[var(--color-text)] mb-2">Sample Card</h3>
                <p className="text-sm text-[var(--color-text-muted)] mb-3">
                  This card shows how your theme looks in practice
                </p>
                <button className="w-full py-2 px-4 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white rounded-lg text-sm font-medium">
                  Sample Button
                </button>
              </div>
              
              {/* Color Swatches */}
              <div className="space-y-3">
                <h4 className="font-medium text-[var(--color-text)]">Color Swatches</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="h-8 rounded-lg" style={{ backgroundColor: customColors.bg }}></div>
                  <div className="h-8 rounded-lg" style={{ backgroundColor: customColors.surface }}></div>
                  <div className="h-8 rounded-lg" style={{ backgroundColor: customColors.primary }}></div>
                  <div className="h-8 rounded-lg" style={{ backgroundColor: customColors.secondary }}></div>
                </div>
              </div>
              
              {/* Typography Preview */}
              <div className="space-y-2">
                <h4 className="font-medium text-[var(--color-text)]">Typography</h4>
                <div className="space-y-1">
                  <h1 className="text-2xl font-bold text-[var(--color-text)]">Heading</h1>
                  <p className="text-sm text-[var(--color-text-muted)]">Body text</p>
                  <p className="text-xs text-[var(--color-text-muted)]">Small text</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThemePlayground
