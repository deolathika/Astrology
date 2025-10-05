'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AppLayout } from '@/components/layouts/AppLayout'
import { 
  Star, 
  Moon, 
  Heart, 
  Calculator, 
  Users, 
  Bell, 
  Settings,
  Crown,
  Sparkles,
  BarChart3,
  Calendar,
  FileText,
  FlaskConical,
  Zap,
  Globe,
  Smartphone,
  ArrowRight,
  CheckCircle,
  X,
  Plus,
  Eye,
  BookOpen,
  Target,
  Award,
  Shield,
  Database,
  Lock,
  Unlock
} from 'lucide-react'

export default function FeaturesPage() {
  const [user, setUser] = useState<any>(null)
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      router.push('/')
    }
  }, [router])

  const getFeaturesByRole = () => {
    const allFeatures = [
      {
        id: 'daily-insights',
        name: 'Daily Insights',
        description: 'Personalized daily cosmic guidance and predictions',
        icon: Star,
        category: 'basic',
        roles: ['user', 'premium', 'admin'],
        status: 'active'
      },
      {
        id: 'numerology',
        name: 'Numerology Analysis',
        description: 'Discover your life path, destiny, and soul urge numbers',
        icon: Calculator,
        category: 'basic',
        roles: ['user', 'premium', 'admin'],
        status: 'active'
      },
      {
        id: 'zodiac-insights',
        name: 'Zodiac Insights',
        description: 'Explore your astrological profile and cosmic influences',
        icon: Moon,
        category: 'basic',
        roles: ['user', 'premium', 'admin'],
        status: 'active'
      },
      {
        id: 'dream-analysis',
        name: 'Dream Analysis',
        description: 'Record and analyze your dreams for deeper understanding',
        icon: Heart,
        category: 'basic',
        roles: ['user', 'premium', 'admin'],
        status: 'active'
      },
      {
        id: 'compatibility',
        name: 'Compatibility Check',
        description: 'Discover cosmic compatibility with friends and partners',
        icon: Heart,
        category: 'basic',
        roles: ['user', 'premium', 'admin'],
        status: 'active'
      },
      {
        id: 'community',
        name: 'Community',
        description: 'Connect with fellow cosmic explorers',
        icon: Users,
        category: 'social',
        roles: ['user', 'premium', 'admin'],
        status: 'active'
      },
      {
        id: 'notifications',
        name: 'Notifications',
        description: 'Stay updated with cosmic events and insights',
        icon: Bell,
        category: 'system',
        roles: ['user', 'premium', 'admin'],
        status: 'active'
      },
      {
        id: 'settings',
        name: 'Settings',
        description: 'Customize your cosmic experience',
        icon: Settings,
        category: 'system',
        roles: ['user', 'premium', 'admin'],
        status: 'active'
      },
      {
        id: 'advanced-astrology',
        name: 'Advanced Astrology',
        description: 'Deep cosmic insights with multiple zodiac systems',
        icon: Sparkles,
        category: 'premium',
        roles: ['premium', 'admin'],
        status: 'active'
      },
      {
        id: 'ai-dream-analysis',
        name: 'AI Dream Analysis',
        description: 'AI-powered dream interpretation and insights',
        icon: BookOpen,
        category: 'premium',
        roles: ['premium', 'admin'],
        status: 'active'
      },
      {
        id: 'cosmic-calendar',
        name: 'Cosmic Calendar',
        description: 'Astrological events and cosmic timing',
        icon: Calendar,
        category: 'premium',
        roles: ['premium', 'admin'],
        status: 'active'
      },
      {
        id: 'data-export',
        name: 'Data Export',
        description: 'Export your cosmic data and insights',
        icon: FileText,
        category: 'premium',
        roles: ['premium', 'admin'],
        status: 'active'
      },
      {
        id: 'user-management',
        name: 'User Management',
        description: 'Manage all users and their accounts',
        icon: Users,
        category: 'admin',
        roles: ['admin'],
        status: 'active'
      },
      {
        id: 'system-analytics',
        name: 'System Analytics',
        description: 'Monitor application performance and usage',
        icon: BarChart3,
        category: 'admin',
        roles: ['admin'],
        status: 'active'
      },
      {
        id: 'content-management',
        name: 'Content Management',
        description: 'Manage cosmic content and articles',
        icon: FileText,
        category: 'admin',
        roles: ['admin'],
        status: 'active'
      },
      {
        id: 'qa-testing',
        name: 'QA Testing',
        description: 'Quality assurance and testing tools',
        icon: FlaskConical,
        category: 'admin',
        roles: ['admin'],
        status: 'active'
      }
    ]

    return allFeatures.filter(feature => 
      feature.roles.includes(user?.role || 'user')
    )
  }

  const getFeaturesByCategory = (category: string) => {
    return getFeaturesByRole().filter(feature => 
      category === 'all' || feature.category === category
    )
  }

  const getThemeClasses = () => {
    switch (user?.role) {
      case 'premium':
        return {
          card: 'bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200',
          button: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white',
          text: 'text-amber-900',
          accent: 'text-amber-600'
        }
      case 'admin':
        return {
          card: 'bg-gradient-to-br from-slate-800 to-gray-800 border-2 border-pink-500',
          button: 'bg-gradient-to-r from-pink-500 to-red-500 text-white',
          text: 'text-slate-100',
          accent: 'text-pink-400'
        }
      default:
        return {
          card: 'bg-white border border-gray-200',
          button: 'bg-indigo-600 text-white',
          text: 'text-gray-900',
          accent: 'text-indigo-600'
        }
    }
  }

  const theme = getThemeClasses()

  if (!mounted || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <AppLayout user={user}>
      <div className="space-y-8">
        {/* Header */}
        <div className={`${theme.card} rounded-xl p-8 shadow-lg`}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-3xl font-bold ${theme.text} mb-2`}>
                Available Features
              </h1>
              <p className={`text-lg ${theme.text} opacity-80`}>
                Explore all the cosmic features available to {user.role} users
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center`}>
                <span className="text-white text-xl font-bold">
                  {user.name?.charAt(0) || user.email?.charAt(0) || 'U'}
                </span>
              </div>
              <div>
                <p className={`font-semibold ${theme.text}`}>{user.name || 'User'}</p>
                <p className={`text-sm ${theme.text} opacity-70 capitalize`}>{user.role}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {['all', 'basic', 'social', 'system', 'premium', 'admin'].map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === category
                  ? `${theme.button} text-white`
                  : `${theme.text} bg-gray-100 hover:bg-gray-200`
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getFeaturesByCategory(activeTab).map((feature) => {
            const Icon = feature.icon
            const isAvailable = feature.roles.includes(user?.role || 'user')
            
            return (
              <div
                key={feature.id}
                className={`${theme.card} rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${
                  isAvailable ? 'opacity-100' : 'opacity-50'
                }`}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    isAvailable ? 'bg-gradient-to-r from-indigo-500 to-purple-600' : 'bg-gray-300'
                  }`}>
                    <Icon className={`w-6 h-6 ${isAvailable ? 'text-white' : 'text-gray-500'}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold ${theme.text}`}>{feature.name}</h3>
                    <div className="flex items-center space-x-2">
                      {isAvailable ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <X className="w-4 h-4 text-red-500" />
                      )}
                      <span className={`text-xs ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                        {isAvailable ? 'Available' : 'Not Available'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className={`text-sm ${theme.text} opacity-80 mb-4`}>
                  {feature.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    feature.category === 'premium' ? 'bg-amber-100 text-amber-800' :
                    feature.category === 'admin' ? 'bg-pink-100 text-pink-800' :
                    'bg-indigo-100 text-indigo-800'
                  }`}>
                    {feature.category}
                  </span>
                  
                  {isAvailable ? (
                    <button className={`${theme.button} px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity`}>
                      <Eye className="w-4 h-4 mr-2" />
                      Access
                    </button>
                  ) : (
                    <button 
                      disabled
                      className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-300 text-gray-500 cursor-not-allowed"
                    >
                      <Lock className="w-4 h-4 mr-2" />
                      Locked
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Feature Statistics */}
        <div className={`${theme.card} rounded-xl p-8 shadow-lg`}>
          <h2 className={`text-2xl font-bold ${theme.text} mb-6`}>Feature Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className={`text-3xl font-bold ${theme.accent} mb-2`}>
                {getFeaturesByRole().length}
              </div>
              <p className={`text-sm ${theme.text} opacity-70`}>Total Features</p>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold ${theme.accent} mb-2`}>
                {getFeaturesByRole().filter(f => f.status === 'active').length}
              </div>
              <p className={`text-sm ${theme.text} opacity-70`}>Active Features</p>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold ${theme.accent} mb-2`}>
                {Math.round((getFeaturesByRole().filter(f => f.status === 'active').length / getFeaturesByRole().length) * 100)}%
              </div>
              <p className={`text-sm ${theme.text} opacity-70`}>Availability</p>
            </div>
          </div>
        </div>

        {/* Upgrade Information */}
        {user?.role === 'user' && (
          <div className={`${theme.card} rounded-xl p-8 shadow-lg`}>
            <div className="flex items-center space-x-3 mb-4">
              <Crown className={`w-8 h-8 ${theme.accent}`} />
              <h2 className={`text-2xl font-bold ${theme.text}`}>Unlock Premium Features</h2>
            </div>
            <p className={`text-lg ${theme.text} opacity-80 mb-6`}>
              Upgrade to Premium to access advanced astrology, AI dream analysis, cosmic calendar, and more!
            </p>
            <button className={`${theme.button} px-6 py-3 rounded-lg text-lg font-semibold hover:opacity-90 transition-opacity`}>
              <Crown className="w-5 h-5 mr-2" />
              Upgrade to Premium
            </button>
          </div>
        )}
      </div>
    </AppLayout>
  )
}
