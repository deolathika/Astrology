'use client'

import React, { useState, useEffect } from 'react'
import { 
  Eye, 
  EyeOff, 
  Volume2, 
  VolumeX, 
  Type, 
  MousePointer, 
  Keyboard, 
  Settings, 
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Contrast,
  Palette,
  Accessibility
} from 'lucide-react'

interface AccessibilitySettings {
  highContrast: boolean
  largeText: boolean
  reducedMotion: boolean
  screenReader: boolean
  keyboardNavigation: boolean
  focusIndicators: boolean
  colorBlind: boolean
  zoom: number
  fontSize: number
  audioDescriptions: boolean
}

const defaultSettings: AccessibilitySettings = {
  highContrast: false,
  largeText: false,
  reducedMotion: false,
  screenReader: false,
  keyboardNavigation: true,
  focusIndicators: true,
  colorBlind: false,
  zoom: 100,
  fontSize: 16,
  audioDescriptions: false
}

export default function AccessibilityEnhancer() {
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings)
  const [isOpen, setIsOpen] = useState(false)
  const [isKeyboardMode, setIsKeyboardMode] = useState(false)

  useEffect(() => {
    // Load saved settings
    const savedSettings = localStorage.getItem('accessibility-settings')
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }

    // Apply settings on mount
    applySettings(settings)
  }, [])

  useEffect(() => {
    // Save settings to localStorage
    localStorage.setItem('accessibility-settings', JSON.stringify(settings))
    
    // Apply settings
    applySettings(settings)
  }, [settings])

  const applySettings = (newSettings: AccessibilitySettings) => {
    const root = document.documentElement
    
    // High contrast
    if (newSettings.highContrast) {
      root.classList.add('high-contrast')
    } else {
      root.classList.remove('high-contrast')
    }

    // Large text
    if (newSettings.largeText) {
      root.classList.add('large-text')
    } else {
      root.classList.remove('large-text')
    }

    // Reduced motion
    if (newSettings.reducedMotion) {
      root.classList.add('reduced-motion')
    } else {
      root.classList.remove('reduced-motion')
    }

    // Color blind support
    if (newSettings.colorBlind) {
      root.classList.add('color-blind')
    } else {
      root.classList.remove('color-blind')
    }

    // Zoom
    root.style.zoom = `${newSettings.zoom}%`

    // Font size
    root.style.fontSize = `${newSettings.fontSize}px`

    // Focus indicators
    if (newSettings.focusIndicators) {
      root.classList.add('focus-visible')
    } else {
      root.classList.remove('focus-visible')
    }
  }

  const updateSetting = (key: keyof AccessibilitySettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const resetSettings = () => {
    setSettings(defaultSettings)
  }

  const toggleKeyboardMode = () => {
    setIsKeyboardMode(!isKeyboardMode)
    if (!isKeyboardMode) {
      // Enable keyboard navigation
      document.body.classList.add('keyboard-navigation')
    } else {
      document.body.classList.remove('keyboard-navigation')
    }
  }

  const announceToScreenReader = (message: string) => {
    const announcement = document.createElement('div')
    announcement.setAttribute('aria-live', 'polite')
    announcement.setAttribute('aria-atomic', 'true')
    announcement.className = 'sr-only'
    announcement.textContent = message
    document.body.appendChild(announcement)
    
    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 1000)
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false)
    }
  }

  return (
    <>
      {/* Accessibility Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className="fixed bottom-4 right-4 z-50 glass-button p-3 rounded-full shadow-lg hover:glass-strong transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Open accessibility settings"
        title="Accessibility Settings"
      >
        <Accessibility className="w-6 h-6 text-white" />
      </button>

      {/* Accessibility Panel */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="glass-card-strong max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleKeyDown}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Accessibility className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Accessibility Settings</h2>
                  <p className="text-white/70 text-sm">Customize your experience for better accessibility</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="glass-button p-2 hover:glass-strong"
                aria-label="Close accessibility settings"
              >
                <Settings className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Settings Content */}
            <div className="p-6 space-y-6">
              {/* Visual Settings */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Visual Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex items-center space-x-3 p-4 glass-card hover:glass-strong cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.highContrast}
                      onChange={(e) => updateSetting('highContrast', e.target.checked)}
                      className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500"
                    />
                    <Contrast className="w-5 h-5 text-white" />
                    <div>
                      <div className="text-white font-medium">High Contrast</div>
                      <div className="text-white/70 text-sm">Enhanced contrast for better visibility</div>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3 p-4 glass-card hover:glass-strong cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.largeText}
                      onChange={(e) => updateSetting('largeText', e.target.checked)}
                      className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500"
                    />
                    <Type className="w-5 h-5 text-white" />
                    <div>
                      <div className="text-white font-medium">Large Text</div>
                      <div className="text-white/70 text-sm">Increased text size for readability</div>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3 p-4 glass-card hover:glass-strong cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.colorBlind}
                      onChange={(e) => updateSetting('colorBlind', e.target.checked)}
                      className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500"
                    />
                    <Palette className="w-5 h-5 text-white" />
                    <div>
                      <div className="text-white font-medium">Color Blind Support</div>
                      <div className="text-white/70 text-sm">Alternative color schemes</div>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3 p-4 glass-card hover:glass-strong cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.focusIndicators}
                      onChange={(e) => updateSetting('focusIndicators', e.target.checked)}
                      className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500"
                    />
                    <MousePointer className="w-5 h-5 text-white" />
                    <div>
                      <div className="text-white font-medium">Focus Indicators</div>
                      <div className="text-white/70 text-sm">Enhanced focus visibility</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Motion Settings */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Motion Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex items-center space-x-3 p-4 glass-card hover:glass-strong cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.reducedMotion}
                      onChange={(e) => updateSetting('reducedMotion', e.target.checked)}
                      className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500"
                    />
                    <RotateCcw className="w-5 h-5 text-white" />
                    <div>
                      <div className="text-white font-medium">Reduce Motion</div>
                      <div className="text-white/70 text-sm">Minimize animations and transitions</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Navigation Settings */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Navigation Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex items-center space-x-3 p-4 glass-card hover:glass-strong cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.keyboardNavigation}
                      onChange={(e) => updateSetting('keyboardNavigation', e.target.checked)}
                      className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500"
                    />
                    <Keyboard className="w-5 h-5 text-white" />
                    <div>
                      <div className="text-white font-medium">Keyboard Navigation</div>
                      <div className="text-white/70 text-sm">Enhanced keyboard support</div>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3 p-4 glass-card hover:glass-strong cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.screenReader}
                      onChange={(e) => updateSetting('screenReader', e.target.checked)}
                      className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500"
                    />
                    <Eye className="w-5 h-5 text-white" />
                    <div>
                      <div className="text-white font-medium">Screen Reader Support</div>
                      <div className="text-white/70 text-sm">Enhanced ARIA labels and descriptions</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Zoom Controls */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Zoom Controls</h3>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => updateSetting('zoom', Math.max(50, settings.zoom - 10))}
                    className="glass-button p-2"
                    aria-label="Zoom out"
                  >
                    <ZoomOut className="w-4 h-4 text-white" />
                  </button>
                  
                  <div className="flex-1">
                    <label className="block text-white font-medium mb-2">
                      Zoom Level: {settings.zoom}%
                    </label>
                    <input
                      type="range"
                      min="50"
                      max="200"
                      value={settings.zoom}
                      onChange={(e) => updateSetting('zoom', parseInt(e.target.value))}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  
                  <button
                    onClick={() => updateSetting('zoom', Math.min(200, settings.zoom + 10))}
                    className="glass-button p-2"
                    aria-label="Zoom in"
                  >
                    <ZoomIn className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>

              {/* Font Size Controls */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Font Size</h3>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => updateSetting('fontSize', Math.max(12, settings.fontSize - 2))}
                    className="glass-button p-2"
                    aria-label="Decrease font size"
                  >
                    <Type className="w-4 h-4 text-white" />
                  </button>
                  
                  <div className="flex-1">
                    <label className="block text-white font-medium mb-2">
                      Font Size: {settings.fontSize}px
                    </label>
                    <input
                      type="range"
                      min="12"
                      max="24"
                      value={settings.fontSize}
                      onChange={(e) => updateSetting('fontSize', parseInt(e.target.value))}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  
                  <button
                    onClick={() => updateSetting('fontSize', Math.min(24, settings.fontSize + 2))}
                    className="glass-button p-2"
                    aria-label="Increase font size"
                  >
                    <Type className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>

              {/* Reset Button */}
              <div className="flex justify-center pt-4">
                <button
                  onClick={resetSettings}
                  className="glass-button px-6 py-3 text-white hover:glass-strong transition-all duration-300"
                >
                  <RotateCcw className="w-4 h-4 inline mr-2" />
                  Reset to Defaults
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Screen Reader Only Content */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {settings.highContrast && "High contrast mode enabled"}
        {settings.largeText && "Large text mode enabled"}
        {settings.reducedMotion && "Reduced motion enabled"}
        {settings.keyboardNavigation && "Keyboard navigation enabled"}
      </div>
    </>
  )
}
