
import { useState } from 'react';
import Navigation from '../../components/feature/Navigation';
import StarfieldBackground from '../../components/feature/StarfieldBackground';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('theme');
  const [themeSettings, setThemeSettings] = useState({
    primaryColor: '#8B5CF6',
    secondaryColor: '#EC4899',
    accentColor: '#F59E0B',
    backgroundColor: '#1E1B4B',
    fontFamily: 'Inter',
    borderRadius: 'rounded-xl',
    animationSpeed: 'normal'
  });

  const [moduleSettings, setModuleSettings] = useState({
    astrology: true,
    numerology: true,
    dreams: true,
    compatibility: true,
    community: true,
    premiumFeatures: true
  });

  const [userStats, setUserStats] = useState({
    totalUsers: 12847,
    activeUsers: 3256,
    premiumUsers: 847,
    guestUsers: 8744
  });

  const colorPresets = [
    { name: 'Cosmic Purple', primary: '#8B5CF6', secondary: '#EC4899', accent: '#F59E0B' },
    { name: 'Ocean Blue', primary: '#3B82F6', secondary: '#06B6D4', accent: '#10B981' },
    { name: 'Sunset Orange', primary: '#F97316', secondary: '#EF4444', accent: '#FBBF24' },
    { name: 'Forest Green', primary: '#059669', secondary: '#0D9488', accent: '#84CC16' },
    { name: 'Royal Gold', primary: '#D97706', secondary: '#B45309', accent: '#FCD34D' }
  ];

  const handleThemeChange = (setting: string, value: string) => {
    setThemeSettings(prev => ({ ...prev, [setting]: value }));
  };

  const handleModuleToggle = (module: string) => {
    setModuleSettings(prev => ({ ...prev, [module]: !prev[module as keyof typeof prev] }));
  };

  const applyColorPreset = (preset: typeof colorPresets[0]) => {
    setThemeSettings(prev => ({
      ...prev,
      primaryColor: preset.primary,
      secondaryColor: preset.secondary,
      accentColor: preset.accent
    }));
  };

  return (
    <div className="min-h-screen relative">
      <StarfieldBackground />
      <Navigation userRole="admin" />
      
      <div className="relative z-10 pt-20 pb-12">
        {/* Header */}
        <section className="px-4 sm:px-6 lg:px-8 mb-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-gray-300">Customize your cosmic experience and manage platform settings</p>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="secondary">
                  <i className="ri-save-line mr-2"></i>
                  Save Changes
                </Button>
                <Button variant="cosmic">
                  <i className="ri-rocket-line mr-2"></i>
                  Publish Live
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Overview */}
        <section className="px-4 sm:px-6 lg:px-8 mb-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="p-6 text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">{userStats.totalUsers.toLocaleString()}</div>
                <p className="text-gray-300">Total Users</p>
                <div className="text-sm text-green-400 mt-1">↗ +12% this month</div>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">{userStats.activeUsers.toLocaleString()}</div>
                <p className="text-gray-300">Active Users</p>
                <div className="text-sm text-green-400 mt-1">↗ +8% this week</div>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">{userStats.premiumUsers.toLocaleString()}</div>
                <p className="text-gray-300">Premium Users</p>
                <div className="text-sm text-green-400 mt-1">↗ +15% this month</div>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-3xl font-bold text-orange-400 mb-2">{userStats.guestUsers.toLocaleString()}</div>
                <p className="text-gray-300">Guest Users</p>
                <div className="text-sm text-yellow-400 mt-1">→ +2% this week</div>
              </Card>
            </div>
          </div>
        </section>

        {/* Admin Tabs */}
        <section className="px-4 sm:px-6 lg:px-8 mb-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center space-x-1 bg-white/10 backdrop-blur-sm rounded-full p-1 max-w-2xl mx-auto">
              {[
                { id: 'theme', label: 'Theme Editor', icon: 'ri-palette-line' },
                { id: 'modules', label: 'Modules', icon: 'ri-apps-line' },
                { id: 'users', label: 'Users', icon: 'ri-group-line' },
                { id: 'analytics', label: 'Analytics', icon: 'ri-bar-chart-line' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-full transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <i className={`${tab.icon} text-sm`}></i>
                  <span className="font-medium text-sm">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Theme Editor Tab */}
        {activeTab === 'theme' && (
          <section className="px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Theme Controls */}
                <div className="space-y-6">
                  <Card className="p-6">
                    <h3 className="text-xl font-bold text-white mb-6">Color Scheme</h3>
                    
                    {/* Color Presets */}
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-300 mb-3">Quick Presets</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {colorPresets.map((preset, index) => (
                          <button
                            key={index}
                            onClick={() => applyColorPreset(preset)}
                            className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                          >
                            <div className="flex space-x-1">
                              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.primary }}></div>
                              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.secondary }}></div>
                              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.accent }}></div>
                            </div>
                            <span className="text-white font-medium">{preset.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Custom Colors */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Primary Color</label>
                        <div className="flex items-center space-x-3">
                          <input
                            type="color"
                            value={themeSettings.primaryColor}
                            onChange={(e) => handleThemeChange('primaryColor', e.target.value)}
                            className="w-12 h-10 rounded-lg border-2 border-white/20"
                          />
                          <input
                            type="text"
                            value={themeSettings.primaryColor}
                            onChange={(e) => handleThemeChange('primaryColor', e.target.value)}
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
                            onChange={(e) => handleThemeChange('secondaryColor', e.target.value)}
                            className="w-12 h-10 rounded-lg border-2 border-white/20"
                          />
                          <input
                            type="text"
                            value={themeSettings.secondaryColor}
                            onChange={(e) => handleThemeChange('secondaryColor', e.target.value)}
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
                            onChange={(e) => handleThemeChange('accentColor', e.target.value)}
                            className="w-12 h-10 rounded-lg border-2 border-white/20"
                          />
                          <input
                            type="text"
                            value={themeSettings.accentColor}
                            onChange={(e) => handleThemeChange('accentColor', e.target.value)}
                            className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h3 className="text-xl font-bold text-white mb-6">Typography & Layout</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Font Family</label>
                        <select
                          value={themeSettings.fontFamily}
                          onChange={(e) => handleThemeChange('fontFamily', e.target.value)}
                          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white pr-8"
                        >
                          <option value="Inter" className="bg-gray-800">Inter</option>
                          <option value="Satoshi" className="bg-gray-800">Satoshi</option>
                          <option value="Poppins" className="bg-gray-800">Poppins</option>
                          <option value="Roboto" className="bg-gray-800">Roboto</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Border Radius</label>
                        <select
                          value={themeSettings.borderRadius}
                          onChange={(e) => handleThemeChange('borderRadius', e.target.value)}
                          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white pr-8"
                        >
                          <option value="rounded-none" className="bg-gray-800">Sharp (0px)</option>
                          <option value="rounded-md" className="bg-gray-800">Small (6px)</option>
                          <option value="rounded-lg" className="bg-gray-800">Medium (8px)</option>
                          <option value="rounded-xl" className="bg-gray-800">Large (12px)</option>
                          <option value="rounded-2xl" className="bg-gray-800">Extra Large (16px)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Animation Speed</label>
                        <select
                          value={themeSettings.animationSpeed}
                          onChange={(e) => handleThemeChange('animationSpeed', e.target.value)}
                          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white pr-8"
                        >
                          <option value="slow" className="bg-gray-800">Slow</option>
                          <option value="normal" className="bg-gray-800">Normal</option>
                          <option value="fast" className="bg-gray-800">Fast</option>
                          <option value="none" className="bg-gray-800">No Animation</option>
                        </select>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Live Preview */}
                <div>
                  <Card className="p-6">
                    <h3 className="text-xl font-bold text-white mb-6">Live Preview</h3>
                    
                    <div className="space-y-4">
                      {/* Preview Card */}
                      <div 
                        className={`p-6 ${themeSettings.borderRadius} border-2 backdrop-blur-sm`}
                        style={{ 
                          backgroundColor: 'rgba(255,255,255,0.1)',
                          borderColor: themeSettings.primaryColor + '40'
                        }}
                      >
                        <h4 className="text-lg font-bold text-white mb-2" style={{ fontFamily: themeSettings.fontFamily }}>
                          Sample Card
                        </h4>
                        <p className="text-gray-300 mb-4" style={{ fontFamily: themeSettings.fontFamily }}>
                          This is how your content will look with the current theme settings.
                        </p>
                        
                        <div className="flex space-x-3">
                          <button 
                            className={`px-4 py-2 ${themeSettings.borderRadius} font-medium text-white transition-all`}
                            style={{ backgroundColor: themeSettings.primaryColor }}
                          >
                            Primary Button
                          </button>
                          <button 
                            className={`px-4 py-2 ${themeSettings.borderRadius} font-medium text-white transition-all`}
                            style={{ backgroundColor: themeSettings.secondaryColor }}
                          >
                            Secondary
                          </button>
                          <button 
                            className={`px-4 py-2 ${themeSettings.borderRadius} font-medium text-white transition-all`}
                            style={{ backgroundColor: themeSettings.accentColor }}
                          >
                            Accent
                          </button>
                        </div>
                      </div>

                      {/* Color Palette */}
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
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Modules Tab */}
        {activeTab === 'modules' && (
          <section className="px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Card className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Feature Modules</h3>
                <p className="text-gray-300 mb-8">Enable or disable features across different user roles</p>
                
                <div className="space-y-6">
                  {Object.entries(moduleSettings).map(([module, enabled]) => (
                    <div key={module} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          module === 'astrology' ? 'bg-purple-500/20' :
                          module === 'numerology' ? 'bg-blue-500/20' :
                          module === 'dreams' ? 'bg-indigo-500/20' :
                          module === 'compatibility' ? 'bg-pink-500/20' :
                          module === 'community' ? 'bg-green-500/20' :
                          'bg-yellow-500/20'
                        }`}>
                          <i className={`${
                            module === 'astrology' ? 'ri-star-line' :
                            module === 'numerology' ? 'ri-calculator-line' :
                            module === 'dreams' ? 'ri-moon-line' :
                            module === 'compatibility' ? 'ri-heart-line' :
                            module === 'community' ? 'ri-group-line' :
                            'ri-vip-crown-line'
                          } text-xl text-white`}></i>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-white capitalize">
                            {module.replace(/([A-Z])/g, ' $1').trim()}
                          </h4>
                          <p className="text-sm text-gray-300">
                            {module === 'astrology' && 'Zodiac signs, horoscopes, and astrological systems'}
                            {module === 'numerology' && 'Life path numbers and numerological insights'}
                            {module === 'dreams' && 'AI-powered dream analysis and interpretation'}
                            {module === 'compatibility' && 'Relationship and friendship compatibility'}
                            {module === 'community' && 'User discussions, events, and expert sessions'}
                            {module === 'premiumFeatures' && 'Advanced features for premium users'}
                          </p>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => handleModuleToggle(module)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          enabled ? 'bg-green-500' : 'bg-gray-600'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            enabled ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <section className="px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <Card className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">User Management</h3>
                  <Button variant="cosmic">
                    <i className="ri-user-add-line mr-2"></i>
                    Add User
                  </Button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-3 px-4 text-gray-300 font-medium">User</th>
                        <th className="text-left py-3 px-4 text-gray-300 font-medium">Role</th>
                        <th className="text-left py-3 px-4 text-gray-300 font-medium">Joined</th>
                        <th className="text-left py-3 px-4 text-gray-300 font-medium">Last Active</th>
                        <th className="text-left py-3 px-4 text-gray-300 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Premium', joined: '2024-01-15', active: '2 hours ago' },
                        { name: 'Michael Chen', email: 'michael@example.com', role: 'Free', joined: '2024-01-10', active: '1 day ago' },
                        { name: 'Emma Wilson', email: 'emma@example.com', role: 'Premium', joined: '2024-01-08', active: '3 hours ago' },
                        { name: 'David Brown', email: 'david@example.com', role: 'Guest', joined: '2024-01-20', active: '5 minutes ago' }
                      ].map((user, index) => (
                        <tr key={index} className="border-b border-white/5 hover:bg-white/5">
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-medium">{user.name.charAt(0)}</span>
                              </div>
                              <div>
                                <p className="text-white font-medium">{user.name}</p>
                                <p className="text-gray-400 text-sm">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              user.role === 'Premium' ? 'bg-yellow-500/20 text-yellow-300' :
                              user.role === 'Free' ? 'bg-blue-500/20 text-blue-300' :
                              'bg-gray-500/20 text-gray-300'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-gray-300">{user.joined}</td>
                          <td className="py-4 px-4 text-gray-300">{user.active}</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm">
                                <i className="ri-edit-line"></i>
                              </Button>
                              <Button variant="ghost" size="sm">
                                <i className="ri-delete-bin-line"></i>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <section className="px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="p-6">
                  <h3 className="text-xl font-bold text-white mb-6">User Growth</h3>
                  <div className="h-64 flex items-center justify-center bg-white/5 rounded-lg">
                    <p className="text-gray-400">Chart visualization would go here</p>
                  </div>
                </Card>
                
                <Card className="p-6">
                  <h3 className="text-xl font-bold text-white mb-6">Feature Usage</h3>
                  <div className="space-y-4">
                    {[
                      { feature: 'Zodiac Readings', usage: 85, color: 'bg-purple-500' },
                      { feature: 'Numerology', usage: 72, color: 'bg-blue-500' },
                      { feature: 'Dream Analysis', usage: 68, color: 'bg-indigo-500' },
                      { feature: 'Compatibility', usage: 91, color: 'bg-pink-500' },
                      { feature: 'Community', usage: 56, color: 'bg-green-500' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-gray-300">{item.feature}</span>
                        <div className="flex items-center space-x-3">
                          <div className="w-24 bg-gray-700 rounded-full h-2">
                            <div 
                              className={`${item.color} h-2 rounded-full`}
                              style={{ width: `${item.usage}%` }}
                            ></div>
                          </div>
                          <span className="text-white font-medium w-8">{item.usage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
