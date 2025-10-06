'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Navigation from '@/components/readdy/Navigation'
import StarfieldBackground from '@/components/readdy/StarfieldBackground'
import Card from '@/components/readdy/Card'
import Button from '@/components/readdy/Button'

export default function AdminThemePage() {
  const [selectedTheme, setSelectedTheme] = useState('cosmic')
  const [customColors, setCustomColors] = useState({
    primary: '#A855F7',
    secondary: '#FB7185',
    accent: '#F59E0B',
    background: '#180C2E'
  })

  const themes = [
    {
      id: 'cosmic',
      name: 'Cosmic',
      description: 'Dark purple gradients with cosmic effects',
      colors: {
        primary: '#A855F7',
        secondary: '#FB7185',
        accent: '#F59E0B',
        background: '#180C2E'
      },
      preview: 'from-purple-500 to-pink-500',
      status: 'active'
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Clean white and gray design',
      colors: {
        primary: '#6B7280',
        secondary: '#9CA3AF',
        accent: '#3B82F6',
        background: '#FFFFFF'
      },
      preview: 'from-gray-500 to-gray-700',
      status: 'available'
    },
    {
      id: 'ocean',
      name: 'Ocean',
      description: 'Blue and cyan ocean theme',
      colors: {
        primary: '#0EA5E9',
        secondary: '#06B6D4',
        accent: '#8B5CF6',
        background: '#0F172A'
      },
      preview: 'from-blue-500 to-cyan-500',
      status: 'available'
    },
    {
      id: 'forest',
      name: 'Forest',
      description: 'Green and emerald nature theme',
      colors: {
        primary: '#10B981',
        secondary: '#059669',
        accent: '#F59E0B',
        background: '#064E3B'
      },
      preview: 'from-green-500 to-emerald-500',
      status: 'available'
    },
    {
      id: 'sunset',
      name: 'Sunset',
      description: 'Warm orange and red sunset theme',
      colors: {
        primary: '#F97316',
        secondary: '#EF4444',
        accent: '#F59E0B',
        background: '#7C2D12'
      },
      preview: 'from-orange-500 to-red-500',
      status: 'available'
    },
    {
      id: 'midnight',
      name: 'Midnight',
      description: 'Dark blue and indigo night theme',
      colors: {
        primary: '#6366F1',
        secondary: '#8B5CF6',
        accent: '#EC4899',
        background: '#0F0F23'
      },
      preview: 'from-indigo-500 to-purple-500',
      status: 'available'
    }
  ]

  const handleThemeChange = (themeId: string) => {
    setSelectedTheme(themeId)
    const theme = themes.find(t => t.id === themeId)
    if (theme) {
      setCustomColors(theme.colors)
    }
  }

  const handleCustomColorChange = (colorType: string, value: string) => {
    setCustomColors(prev => ({
      ...prev,
      [colorType]: value
    }))
  }

  return (
    <div className="min-h-screen relative">
      {/* Starfield Background */}
      <StarfieldBackground />
      
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative z-10 pt-16">
        {/* Hero Section */}
        <section className="text-center py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-cosmic">
              Theme Management
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Customize the visual appearance of your Daily Secrets application.
            </p>
          </div>
        </section>

        {/* Theme Selection */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-cosmic">Available Themes</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {themes.map((theme) => (
                <Card key={theme.id} className="p-6 hover:scale-105 cosmic-glow">
                  <div className="text-center">
                    <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r ${theme.preview} flex items-center justify-center text-2xl`}>
                      {theme.id === 'cosmic' && '🌟'}
                      {theme.id === 'minimal' && '⚪'}
                      {theme.id === 'ocean' && '🌊'}
                      {theme.id === 'forest' && '🌲'}
                      {theme.id === 'sunset' && '🌅'}
                      {theme.id === 'midnight' && '🌙'}
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2">{theme.name}</h3>
                    <p className="text-gray-300 text-sm mb-4">{theme.description}</p>
                    
                    <div className="mb-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        theme.status === 'active' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {theme.status === 'active' ? 'Active' : 'Available'}
                      </span>
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <Button 
                        variant={theme.status === 'active' ? 'cosmic' : 'primary'}
                        size="sm" 
                        className="w-full"
                        onClick={() => handleThemeChange(theme.id)}
                      >
                        {theme.status === 'active' ? 'Current Theme' : 'Apply Theme'}
                      </Button>
                      
                      <Button variant="secondary" size="sm" className="w-full">
                        Preview
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Custom Color Editor */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 cosmic-glow">
              <h2 className="text-3xl font-bold mb-8 text-center text-cosmic">Custom Color Editor</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Primary Color</label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={customColors.primary}
                        onChange={(e) => handleCustomColorChange('primary', e.target.value)}
                        className="w-12 h-12 rounded border border-white/20"
                      />
                      <input
                        type="text"
                        value={customColors.primary}
                        onChange={(e) => handleCustomColorChange('primary', e.target.value)}
                        className="flex-1 p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Secondary Color</label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={customColors.secondary}
                        onChange={(e) => handleCustomColorChange('secondary', e.target.value)}
                        className="w-12 h-12 rounded border border-white/20"
                      />
                      <input
                        type="text"
                        value={customColors.secondary}
                        onChange={(e) => handleCustomColorChange('secondary', e.target.value)}
                        className="flex-1 p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Accent Color</label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={customColors.accent}
                        onChange={(e) => handleCustomColorChange('accent', e.target.value)}
                        className="w-12 h-12 rounded border border-white/20"
                      />
                      <input
                        type="text"
                        value={customColors.accent}
                        onChange={(e) => handleCustomColorChange('accent', e.target.value)}
                        className="flex-1 p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Background Color</label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={customColors.background}
                        onChange={(e) => handleCustomColorChange('background', e.target.value)}
                        className="w-12 h-12 rounded border border-white/20"
                      />
                      <input
                        type="text"
                        value={customColors.background}
                        onChange={(e) => handleCustomColorChange('background', e.target.value)}
                        className="flex-1 p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded text-white"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Color Preview</h3>
                  <div className="space-y-4">
                    <div 
                      className="p-4 rounded-lg"
                      style={{ backgroundColor: customColors.primary }}
                    >
                      <p className="text-white font-semibold">Primary Color</p>
                    </div>
                    
                    <div 
                      className="p-4 rounded-lg"
                      style={{ backgroundColor: customColors.secondary }}
                    >
                      <p className="text-white font-semibold">Secondary Color</p>
                    </div>
                    
                    <div 
                      className="p-4 rounded-lg"
                      style={{ backgroundColor: customColors.accent }}
                    >
                      <p className="text-white font-semibold">Accent Color</p>
                    </div>
                    
                    <div 
                      className="p-4 rounded-lg border border-white/20"
                      style={{ backgroundColor: customColors.background }}
                    >
                      <p className="text-white font-semibold">Background Color</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-center space-x-4">
                <Button variant="cosmic" size="lg" className="btn-cosmic">
                  Apply Custom Theme
                </Button>
                <Button variant="secondary" size="lg">
                  Reset to Default
                </Button>
              </div>
            </Card>
          </div>
        </section>

        {/* Theme Settings */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 cosmic-glow">
              <h2 className="text-3xl font-bold mb-8 text-center text-cosmic">Theme Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Display Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Dark Mode</span>
                      <Button variant="secondary" size="sm">Toggle</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Animations</span>
                      <Button variant="secondary" size="sm">Toggle</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Glassmorphism Effects</span>
                      <Button variant="secondary" size="sm">Toggle</Button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Advanced Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Custom CSS</span>
                      <Button variant="secondary" size="sm">Edit</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Font Settings</span>
                      <Button variant="secondary" size="sm">Configure</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Responsive Breakpoints</span>
                      <Button variant="secondary" size="sm">Edit</Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}
