import { useState } from 'react';
import Navigation from '../../../components/feature/Navigation';
import CosmicBackground from '../../../components/ui/CosmicBackground';
import Card from '../../../components/base/Card';
import Button from '../../../components/base/Button';

export default function AdminTheme() {
  const [themeSettings, setThemeSettings] = useState({
    // Colors
    primaryColor: '#A855F7',
    secondaryColor: '#FB7185',
    accentColor: '#F59E0B',
    backgroundColor: '#180C2E',
    backgroundMid: '#2A1B4D',
    backgroundEnd: '#3B218A',
    
    // Typography
    fontFamily: 'Inter',
    fontSize: 'medium',
    fontWeight: 'normal',
    
    // Layout
    borderRadius: 'large',
    spacing: 'normal',
    density: 'comfortable',
    
    // Effects
    glassOpacity: 6,
    blurIntensity: 20,
    shadowIntensity: 'medium',
    animationSpeed: 'normal',
    
    // Starfield
    starfieldIntensity: 100,
    starfieldSpeed: 0.5,
    nebulaeOpacity: 30,
    
    // Advanced
    contrastRatio: 'normal',
    colorTemperature: 'cool',
    saturation: 'normal'
  });

  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState('colors');

  const colorPresets = [
    {
      name: 'Cosmic Purple (Default)',
      primary: '#A855F7',
      secondary: '#FB7185',
      accent: '#F59E0B',
      bgStart: '#180C2E',
      bgMid: '#2A1B4D',
      bgEnd: '#3B218A'
    },
    {
      name: 'Ocean Blue',
      primary: '#3B82F6',
      secondary: '#06B6D4',
      accent: '#10B981',
      bgStart: '#0C1E2E',
      bgMid: '#1B2A4D',
      bgEnd: '#21438A'
    },
    {
      name: 'Sunset Orange',
      primary: '#F97316',
      secondary: '#EF4444',
      accent: '#FBBF24',
      bgStart: '#2E1A0C',
      bgMid: '#4D2A1B',
      bgEnd: '#8A4321'
    },
    {
      name: 'Forest Green',
      primary: '#059669',
      secondary: '#0D9488',
      accent: '#84CC16',
      bgStart: '#0C2E1A',
      bgMid: '#1B4D2A',
      bgEnd: '#218A43'
    },
    {
      name: 'Royal Gold',
      primary: '#D97706',
      secondary: '#B45309',
      accent: '#FCD34D',
      bgStart: '#2E220C',
      bgMid: '#4D3B1B',
      bgEnd: '#8A6521'
    },
    {
      name: 'Mystic Pink',
      primary: '#EC4899',
      secondary: '#F472B6',
      accent: '#A78BFA',
      bgStart: '#2E0C1E',
      bgMid: '#4D1B2A',
      bgEnd: '#8A2143'
    }
  ];

  const fontOptions = [
    { value: 'Inter', label: 'Inter (Default)' },
    { value: 'Satoshi', label: 'Satoshi' },
    { value: 'Poppins', label: 'Poppins' },
    { value: 'Roboto', label: 'Roboto' },
    { value: 'Open Sans', label: 'Open Sans' },
    { value: 'Montserrat', label: 'Montserrat' }
  ];

  const handleSettingChange = (key: string, value: any) => {
    setThemeSettings(prev => ({ ...prev, [key]: value }));
  };

  const applyPreset = (preset: typeof colorPresets[0]) => {
    setThemeSettings(prev => ({
      ...prev,
      primaryColor: preset.primary,
      secondaryColor: preset.secondary,
      accentColor: preset.accent,
      backgroundColor: preset.bgStart,
      backgroundMid: preset.bgMid,
      backgroundEnd: preset.bgEnd
    }));
  };

  const resetToDefaults = () => {
    setThemeSettings({
      primaryColor: '#A855F7',
      secondaryColor: '#FB7185',
      accentColor: '#F59E0B',
      backgroundColor: '#180C2E',
      backgroundMid: '#2A1B4D',
      backgroundEnd: '#3B218A',
      fontFamily: 'Inter',
      fontSize: 'medium',
      fontWeight: 'normal',
      borderRadius: 'large',
      spacing: 'normal',
      density: 'comfortable',
      glassOpacity: 6,
      blurIntensity: 20,
      shadowIntensity: 'medium',
      animationSpeed: 'normal',
      starfieldIntensity: 100,
      starfieldSpeed: 0.5,
      nebulaeOpacity: 30,
      contrastRatio: 'normal',
      colorTemperature: 'cool',
      saturation: 'normal'
    });
  };

  const exportTheme = () => {
    const themeJson = JSON.stringify(themeSettings, null, 2);
    const blob = new Blob([themeJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'daily-secrets-theme.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target?.result as string);
          setThemeSettings(imported);
        } catch (error) {
          alert('Invalid theme file');
        }
      };
      reader.readAsText(file);
    }
  };

  const tabs = [
    { id: 'colors', label: 'Colors', icon: 'ri-palette-line' },
    { id: 'typography', label: 'Typography', icon: 'ri-text' },
    { id: 'layout', label: 'Layout', icon: 'ri-layout-line' },
    { id: 'effects', label: 'Effects', icon: 'ri-magic-line' },
    { id: 'advanced', label: 'Advanced', icon: 'ri-settings-3-line' }
  ];

  return (
    <div className="min-h-screen relative">
      <CosmicBackground intensity={themeSettings.starfieldIntensity} />
      <Navigation userRole="admin" />
      
      <div className="relative z-10 pt-20 pb-12">
        {/* Header */}
        <section className="px-4 sm:px-6 lg:px-8 mb-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                    Theme Editor
                  </span>
                </h1>
                <p className="text-gray-300">Customize the cosmic appearance of Daily Secrets</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  accept=".json"
                  onChange={importTheme}
                  className="hidden"
                  id="import-theme"
                />
                <label htmlFor="import-theme">
                  <Button variant="ghost" className="cursor-pointer">
                    <i className="ri-upload-line mr-2"></i>
                    Import
                  </Button>
                </label>
                
                <Button variant="secondary" onClick={exportTheme}>
                  <i className="ri-download-line mr-2"></i>
                  Export
                </Button>
                
                <Button variant="ghost" onClick={resetToDefaults}>
                  <i className="ri-refresh-line mr-2"></i>
                  Reset
                </Button>
                
                <Button variant="cosmic">
                  <i className="ri-save-line mr-2"></i>
                  Save Theme
                </Button>
              </div>
            </div>
          </div>
        </section>

        <div className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Controls Panel */}
              <div className="lg:col-span-1 space-y-6">
                {/* Tab Navigation */}
                <Card className="p-4">
                  <div className="space-y-2">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                          activeTab === tab.id
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                            : 'text-gray-300 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <i className={`${tab.icon} text-lg`}></i>
                        <span className="font-medium">{tab.label}</span>
                      </button>
                    ))}
                  </div>
                </Card>

                {/* Settings Panel */}
                <Card className="p-6">
                  {/* Colors Tab */}
                  {activeTab === 'colors' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-white mb-4">Color Settings</h3>
                      
                      {/* Color Presets */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-300 mb-3">Quick Presets</h4>
                        <div className="grid grid-cols-1 gap-2">
                          {colorPresets.map((preset, index) => (
                            <button
                              key={index}
                              onClick={() => applyPreset(preset)}
                              className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                            >
                              <div className="flex space-x-1">
                                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.primary }}></div>
                                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.secondary }}></div>
                                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.accent }}></div>
                              </div>
                              <span className="text-white text-sm font-medium">{preset.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Individual Colors */}
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Primary Color</label>
                          <div className="flex items-center space-x-3">
                            <input
                              type="color"
                              value={themeSettings.primaryColor}
                              onChange={(e) => handleSettingChange('primaryColor', e.target.value)}
                              className="w-12 h-10 rounded-lg border-2 border-white/20"
                            />
                            <input
                              type="text"
                              value={themeSettings.primaryColor}
                              onChange={(e) => handleSettingChange('primaryColor', e.target.value)}
                              className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Secondary Color</label>
                          <div className="flex items-center space-x-3">
                            <input
                              type="color"
                              value={themeSettings.secondaryColor}
                              onChange={(e) => handleSettingChange('secondaryColor', e.target.value)}
                              className="w-12 h-10 rounded-lg border-2 border-white/20"
                            />
                            <input
                              type="text"
                              value={themeSettings.secondaryColor}
                              onChange={(e) => handleSettingChange('secondaryColor', e.target.value)}
                              className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Accent Color</label>
                          <div className="flex items-center space-x-3">
                            <input
                              type="color"
                              value={themeSettings.accentColor}
                              onChange={(e) => handleSettingChange('accentColor', e.target.value)}
                              className="w-12 h-10 rounded-lg border-2 border-white/20"
                            />
                            <input
                              type="text"
                              value={themeSettings.accentColor}
                              onChange={(e) => handleSettingChange('accentColor', e.target.value)}
                              className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Background Gradient */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-300 mb-3">Background Gradient</h4>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Start</label>
                            <input
                              type="color"
                              value={themeSettings.backgroundColor}
                              onChange={(e) => handleSettingChange('backgroundColor', e.target.value)}
                              className="w-full h-8 rounded border border-white/20"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Middle</label>
                            <input
                              type="color"
                              value={themeSettings.backgroundMid}
                              onChange={(e) => handleSettingChange('backgroundMid', e.target.value)}
                              className="w-full h-8 rounded border border-white/20"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">End</label>
                            <input
                              type="color"
                              value={themeSettings.backgroundEnd}
                              onChange={(e) => handleSettingChange('backgroundEnd', e.target.value)}
                              className="w-full h-8 rounded border border-white/20"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Typography Tab */}
                  {activeTab === 'typography' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-white mb-4">Typography Settings</h3>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Font Family</label>
                        <select
                          value={themeSettings.fontFamily}
                          onChange={(e) => handleSettingChange('fontFamily', e.target.value)}
                          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white pr-8"
                        >
                          {fontOptions.map((font) => (
                            <option key={font.value} value={font.value} className="bg-gray-800">
                              {font.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Font Size</label>
                        <select
                          value={themeSettings.fontSize}
                          onChange={(e) => handleSettingChange('fontSize', e.target.value)}
                          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white pr-8"
                        >
                          <option value="small" className="bg-gray-800">Small</option>
                          <option value="medium" className="bg-gray-800">Medium</option>
                          <option value="large" className="bg-gray-800">Large</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Font Weight</label>
                        <select
                          value={themeSettings.fontWeight}
                          onChange={(e) => handleSettingChange('fontWeight', e.target.value)}
                          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white pr-8"
                        >
                          <option value="light" className="bg-gray-800">Light</option>
                          <option value="normal" className="bg-gray-800">Normal</option>
                          <option value="medium" className="bg-gray-800">Medium</option>
                          <option value="semibold" className="bg-gray-800">Semi Bold</option>
                          <option value="bold" className="bg-gray-800">Bold</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Layout Tab */}
                  {activeTab === 'layout' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-white mb-4">Layout Settings</h3>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Border Radius</label>
                        <select
                          value={themeSettings.borderRadius}
                          onChange={(e) => handleSettingChange('borderRadius', e.target.value)}
                          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white pr-8"
                        >
                          <option value="none" className="bg-gray-800">None (0px)</option>
                          <option value="small" className="bg-gray-800">Small (4px)</option>
                          <option value="medium" className="bg-gray-800">Medium (8px)</option>
                          <option value="large" className="bg-gray-800">Large (12px)</option>
                          <option value="xl" className="bg-gray-800">Extra Large (16px)</option>
                          <option value="full" className="bg-gray-800">Full (50%)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Spacing</label>
                        <select
                          value={themeSettings.spacing}
                          onChange={(e) => handleSettingChange('spacing', e.target.value)}
                          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white pr-8"
                        >
                          <option value="compact" className="bg-gray-800">Compact</option>
                          <option value="normal" className="bg-gray-800">Normal</option>
                          <option value="relaxed" className="bg-gray-800">Relaxed</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Content Density</label>
                        <select
                          value={themeSettings.density}
                          onChange={(e) => handleSettingChange('density', e.target.value)}
                          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white pr-8"
                        >
                          <option value="compact" className="bg-gray-800">Compact</option>
                          <option value="comfortable" className="bg-gray-800">Comfortable</option>
                          <option value="spacious" className="bg-gray-800">Spacious</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Effects Tab */}
                  {activeTab === 'effects' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-white mb-4">Visual Effects</h3>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Glass Opacity: {themeSettings.glassOpacity}%
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="20"
                          value={themeSettings.glassOpacity}
                          onChange={(e) => handleSettingChange('glassOpacity', parseInt(e.target.value))}
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Blur Intensity: {themeSettings.blurIntensity}px
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="40"
                          value={themeSettings.blurIntensity}
                          onChange={(e) => handleSettingChange('blurIntensity', parseInt(e.target.value))}
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Shadow Intensity</label>
                        <select
                          value={themeSettings.shadowIntensity}
                          onChange={(e) => handleSettingChange('shadowIntensity', e.target.value)}
                          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white pr-8"
                        >
                          <option value="none" className="bg-gray-800">None</option>
                          <option value="subtle" className="bg-gray-800">Subtle</option>
                          <option value="medium" className="bg-gray-800">Medium</option>
                          <option value="strong" className="bg-gray-800">Strong</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Animation Speed</label>
                        <select
                          value={themeSettings.animationSpeed}
                          onChange={(e) => handleSettingChange('animationSpeed', e.target.value)}
                          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white pr-8"
                        >
                          <option value="none" className="bg-gray-800">No Animation</option>
                          <option value="slow" className="bg-gray-800">Slow</option>
                          <option value="normal" className="bg-gray-800">Normal</option>
                          <option value="fast" className="bg-gray-800">Fast</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Starfield Intensity: {themeSettings.starfieldIntensity}
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="200"
                          value={themeSettings.starfieldIntensity}
                          onChange={(e) => handleSettingChange('starfieldIntensity', parseInt(e.target.value))}
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Starfield Speed: {themeSettings.starfieldSpeed}
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="2"
                          step="0.1"
                          value={themeSettings.starfieldSpeed}
                          onChange={(e) => handleSettingChange('starfieldSpeed', parseFloat(e.target.value))}
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Nebulae Opacity: {themeSettings.nebulaeOpacity}%
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={themeSettings.nebulaeOpacity}
                          onChange={(e) => handleSettingChange('nebulaeOpacity', parseInt(e.target.value))}
                          className="w-full"
                        />
                      </div>
                    </div>
                  )}

                  {/* Advanced Tab */}
                  {activeTab === 'advanced' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-white mb-4">Advanced Settings</h3>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Contrast Ratio</label>
                        <select
                          value={themeSettings.contrastRatio}
                          onChange={(e) => handleSettingChange('contrastRatio', e.target.value)}
                          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white pr-8"
                        >
                          <option value="low" className="bg-gray-800">Low</option>
                          <option value="normal" className="bg-gray-800">Normal</option>
                          <option value="high" className="bg-gray-800">High</option>
                          <option value="maximum" className="bg-gray-800">Maximum</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Color Temperature</label>
                        <select
                          value={themeSettings.colorTemperature}
                          onChange={(e) => handleSettingChange('colorTemperature', e.target.value)}
                          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white pr-8"
                        >
                          <option value="warm" className="bg-gray-800">Warm</option>
                          <option value="neutral" className="bg-gray-800">Neutral</option>
                          <option value="cool" className="bg-gray-800">Cool</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Saturation</label>
                        <select
                          value={themeSettings.saturation}
                          onChange={(e) => handleSettingChange('saturation', e.target.value)}
                          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white pr-8"
                        >
                          <option value="low" className="bg-gray-800">Low</option>
                          <option value="normal" className="bg-gray-800">Normal</option>
                          <option value="high" className="bg-gray-800">High</option>
                          <option value="vivid" className="bg-gray-800">Vivid</option>
                        </select>
                      </div>
                    </div>
                  )}
                </Card>
              </div>

              {/* Preview Panel */}
              <div className="lg:col-span-2">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">Live Preview</h3>
                    
                    {/* Device Preview Toggle */}
                    <div className="flex items-center space-x-2 bg-white/10 rounded-lg p-1">
                      {(['desktop', 'tablet', 'mobile'] as const).map((device) => (
                        <button
                          key={device}
                          onClick={() => setPreviewMode(device)}
                          className={`px-3 py-2 rounded-md transition-all duration-200 ${
                            previewMode === device
                              ? 'bg-purple-500 text-white'
                              : 'text-gray-300 hover:text-white'
                          }`}
                        >
                          <i className={`${
                            device === 'desktop' ? 'ri-computer-line' :
                            device === 'tablet' ? 'ri-tablet-line' :
                            'ri-smartphone-line'
                          }`}></i>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Preview Container */}
                  <div className="bg-gray-900 rounded-xl p-4 overflow-hidden">
                    <div 
                      className={`mx-auto transition-all duration-300 ${
                        previewMode === 'desktop' ? 'max-w-full' :
                        previewMode === 'tablet' ? 'max-w-2xl' :
                        'max-w-sm'
                      }`}
                    >
                      {/* Preview Content */}
                      <div 
                        className="rounded-xl overflow-hidden"
                        style={{
                          background: `linear-gradient(135deg, ${themeSettings.backgroundColor}, ${themeSettings.backgroundMid}, ${themeSettings.backgroundEnd})`,
                          fontFamily: themeSettings.fontFamily
                        }}
                      >
                        {/* Preview Header */}
                        <div className="p-4 border-b border-white/10">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div 
                                className="w-8 h-8 rounded-full flex items-center justify-center"
                                style={{ background: `linear-gradient(135deg, ${themeSettings.primaryColor}, ${themeSettings.secondaryColor})` }}
                              >
                                <i className="ri-star-fill text-white text-sm"></i>
                              </div>
                              <span className="text-white font-bold">Daily Secrets</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button 
                                className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10"
                                style={{ backgroundColor: `rgba(255,255,255,${themeSettings.glassOpacity/100})` }}
                              >
                                <i className="ri-notification-line"></i>
                              </button>
                              <button 
                                className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10"
                                style={{ backgroundColor: `rgba(255,255,255,${themeSettings.glassOpacity/100})` }}
                              >
                                <i className="ri-user-line"></i>
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Preview Content */}
                        <div className="p-6 space-y-6">
                          {/* Sample Card */}
                          <div 
                            className="p-6 rounded-xl border"
                            style={{ 
                              backgroundColor: `rgba(255,255,255,${themeSettings.glassOpacity/100})`,
                              backdropFilter: `blur(${themeSettings.blurIntensity}px)`,
                              borderColor: 'rgba(255,255,255,0.1)',
                              borderRadius: themeSettings.borderRadius === 'none' ? '0' :
                                          themeSettings.borderRadius === 'small' ? '4px' :
                                          themeSettings.borderRadius === 'medium' ? '8px' :
                                          themeSettings.borderRadius === 'large' ? '12px' :
                                          themeSettings.borderRadius === 'xl' ? '16px' : '50%'
                            }}
                          >
                            <h3 className="text-lg font-bold text-white mb-3">Your Cosmic Profile</h3>
                            <p className="text-gray-300 mb-4">
                              Discover what the stars have aligned for you today with personalized insights.
                            </p>
                            
                            <div className="flex space-x-3">
                              <button 
                                className="px-4 py-2 rounded-lg font-medium text-white transition-all"
                                style={{ 
                                  background: `linear-gradient(135deg, ${themeSettings.primaryColor}, ${themeSettings.secondaryColor})`,
                                  borderRadius: themeSettings.borderRadius === 'none' ? '0' :
                                              themeSettings.borderRadius === 'small' ? '4px' :
                                              themeSettings.borderRadius === 'medium' ? '8px' :
                                              themeSettings.borderRadius === 'large' ? '12px' :
                                              themeSettings.borderRadius === 'xl' ? '16px' : '50%'
                                }}
                              >
                                Primary Button
                              </button>
                              <button 
                                className="px-4 py-2 rounded-lg font-medium text-white transition-all"
                                style={{ 
                                  backgroundColor: themeSettings.accentColor,
                                  borderRadius: themeSettings.borderRadius === 'none' ? '0' :
                                              themeSettings.borderRadius === 'small' ? '4px' :
                                              themeSettings.borderRadius === 'medium' ? '8px' :
                                              themeSettings.borderRadius === 'large' ? '12px' :
                                              themeSettings.borderRadius === 'xl' ? '16px' : '50%'
                                }}
                              >
                                Accent
                              </button>
                            </div>
                          </div>

                          {/* Color Palette Display */}
                          <div className="grid grid-cols-3 gap-4">
                            <div className="text-center">
                              <div 
                                className="w-full h-16 rounded-lg mb-2"
                                style={{ backgroundColor: themeSettings.primaryColor }}
                              ></div>
                              <p className="text-xs text-gray-300">Primary</p>
                            </div>
                            <div className="text-center">
                              <div 
                                className="w-full h-16 rounded-lg mb-2"
                                style={{ backgroundColor: themeSettings.secondaryColor }}
                              ></div>
                              <p className="text-xs text-gray-300">Secondary</p>
                            </div>
                            <div className="text-center">
                              <div 
                                className="w-full h-16 rounded-lg mb-2"
                                style={{ backgroundColor: themeSettings.accentColor }}
                              ></div>
                              <p className="text-xs text-gray-300">Accent</p>
                            </div>
                          </div>

                          {/* Typography Sample */}
                          <div 
                            className="p-4 rounded-lg"
                            style={{ backgroundColor: `rgba(255,255,255,${themeSettings.glassOpacity/200})` }}
                          >
                            <h4 className="text-white font-semibold mb-2">Typography Sample</h4>
                            <p className="text-gray-300 text-sm">
                              This is how your text will appear with the current font settings. 
                              The cosmic wisdom flows through every word.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
