'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Home, 
  Star, 
  User, 
  Calculator, 
  Moon, 
  Heart, 
  Users, 
  Bell, 
  Settings, 
  Menu, 
  X,
  LogOut,
  Crown,
  Sparkles,
  BarChart3,
  Calendar,
  FileText,
  FlaskConical,
  Zap,
  Globe,
  Smartphone,
  ChevronDown,
  Search,
  // Dragon, // Not available in lucide-react
  Plus,
  Eye,
  BookOpen,
  Target,
  Award,
  Shield,
  Database,
  Lock,
  Unlock,
  TrendingUp,
  Activity,
  Compass,
  Brain,
  Sun,
  Diamond,
  Gift,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  PieChart,
  TrendingDown,
  Cloud,
  Server,
  Key,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  Share2,
  Download,
  RefreshCw,
  Filter,
  Grid,
  List,
  Volume2,
  Battery,
  Wifi,
  Monitor,
  Tablet,
  ChevronUp,
  Minus,
  Info,
  Scale,
  Wallet,
  Clock,
  Target as TargetIcon,
  Gift as GiftIcon,
  BookOpen as BookIcon,
  Calculator as CalcIcon,
  Brain as BrainIcon,
  Compass as CompassIcon,
  Crown as CrownIcon,
  Diamond as DiamondIcon,
  Eye as EyeIcon,
  Sun as SunIcon
} from 'lucide-react'

interface UltimateAppLayoutProps {
  children: React.ReactNode
  user?: any
}

export function UltimateAppLayout({ children, user }: UltimateAppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [userData, setUserData] = useState<any>(null)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
    
    // Load user data from localStorage
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUserData(JSON.parse(storedUser))
      } catch (error) {
        console.error('Error parsing user data:', error)
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('userData')
    localStorage.removeItem('userSubscription')
    router.push('/')
  }

  const getNavigationCategories = () => {
    return [
      {
        id: 'core',
        title: 'Core Features',
        description: 'Essential daily cosmic guidance',
        icon: Sparkles,
        color: 'text-indigo-600',
        bgColor: 'bg-indigo-50',
        items: [
          {
            id: 'home',
            title: 'Home Dashboard',
            description: 'Your cosmic overview',
            icon: Home,
            route: '/main',
            color: 'text-indigo-600',
            bgColor: 'bg-indigo-50',
            status: 'active',
            capabilities: {
              free: ['Basic dashboard', 'Limited features'],
              premium: ['Full dashboard', 'All features', 'Customization'],
              admin: ['Admin dashboard', 'All features', 'System management']
            }
          },
          {
            id: 'today',
            title: "Today's Secret",
            description: 'Personalized daily cosmic guidance',
            icon: Star,
            route: '/today',
            color: 'text-violet-600',
            bgColor: 'bg-violet-50',
            status: 'active',
            capabilities: {
              free: ['Basic guidance (3/day)', 'Simple lucky numbers'],
              premium: ['Unlimited guidance', 'Advanced features', 'Share functionality'],
              admin: ['All features', 'Custom algorithms', 'Analytics']
            }
          },
          {
            id: 'profile',
            title: 'Cosmic Profile',
            description: 'Your complete astrological profile',
            icon: User,
            route: '/profile',
            color: 'text-emerald-600',
            bgColor: 'bg-emerald-50',
            status: 'active',
            capabilities: {
              free: ['Basic profile', 'Simple readings'],
              premium: ['Detailed profile', 'Advanced readings', 'Export data'],
              admin: ['Full profile', 'All readings', 'Data management']
            }
          }
        ]
      },
      {
        id: 'astrology',
        title: 'Astrology Systems',
        description: 'Multiple zodiac systems and calculations',
        icon: Moon,
        color: 'text-purple-600',
        bgColor: 'bg-purple-50',
        items: [
          {
            id: 'western-astrology',
            title: 'Western Astrology',
            description: 'Traditional tropical astrology',
            icon: Sun,
            route: '/astrology/western',
            color: 'text-orange-600',
            bgColor: 'bg-orange-50',
            status: 'active',
            capabilities: {
              free: ['Basic readings'],
              premium: ['Advanced readings', 'Transits', 'Progressions'],
              admin: ['All features', 'Custom calculations']
            }
          },
          {
            id: 'vedic-astrology',
            title: 'Vedic Astrology',
            description: 'Sidereal astrology with Nakshatras',
            icon: Compass,
            route: '/astrology/vedic',
            color: 'text-red-600',
            bgColor: 'bg-red-50',
            status: 'active',
            capabilities: {
              free: ['Basic readings'],
              premium: ['Advanced readings', 'Dasha periods', 'Remedies'],
              admin: ['All features', 'Custom calculations']
            }
          },
          {
            id: 'chinese-astrology',
            title: 'Chinese Astrology',
            description: '12-year cycle with elements',
            icon: Star, // Replaced Dragon with Star
            route: '/astrology/chinese',
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-50',
            status: 'active',
            capabilities: {
              free: ['Basic readings'],
              premium: ['Advanced readings', 'Compatibility', 'Feng Shui'],
              admin: ['All features', 'Custom calculations']
            }
          },
          {
            id: 'sri-lankan-astrology',
            title: 'Sri Lankan Astrology',
            description: 'Traditional Sinhala astrology',
            icon: Globe,
            route: '/astrology/sri-lankan',
            color: 'text-green-600',
            bgColor: 'bg-green-50',
            status: 'active',
            capabilities: {
              free: ['Basic readings'],
              premium: ['Advanced readings', 'Cultural context', 'Local traditions'],
              admin: ['All features', 'Custom calculations']
            }
          }
        ]
      },
      {
        id: 'numerology',
        title: 'Numerology Systems',
        description: 'Advanced numerology calculations',
        icon: Calculator,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        items: [
          {
            id: 'pythagorean',
            title: 'Pythagorean Numerology',
            description: 'Standard Western numerology',
            icon: Calculator,
            route: '/numerology/pythagorean',
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
            status: 'active',
            capabilities: {
              free: ['Basic calculations'],
              premium: ['Advanced calculations', 'Compatibility', 'Forecasting'],
              admin: ['All features', 'Custom algorithms']
            }
          },
          {
            id: 'chaldean',
            title: 'Chaldean Numerology',
            description: 'Ancient Babylonian numerology',
            icon: Brain,
            route: '/numerology/chaldean',
            color: 'text-indigo-600',
            bgColor: 'bg-indigo-50',
            status: 'active',
            capabilities: {
              free: ['Basic calculations'],
              premium: ['Advanced calculations', 'Master numbers', 'Karmic debt'],
              admin: ['All features', 'Custom algorithms']
            }
          },
          {
            id: 'compatibility',
            title: 'Numerology Compatibility',
            description: 'Relationship compatibility analysis',
            icon: Heart,
            route: '/numerology/compatibility',
            color: 'text-pink-600',
            bgColor: 'bg-pink-50',
            status: 'active',
            capabilities: {
              free: ['Basic compatibility'],
              premium: ['Advanced compatibility', 'Multiple systems', 'Detailed reports'],
              admin: ['All features', 'Custom algorithms']
            }
          }
        ]
      },
      {
        id: 'ai-features',
        title: 'AI & Advanced Features',
        description: 'AI-powered insights and analysis',
        icon: Brain,
        color: 'text-cyan-600',
        bgColor: 'bg-cyan-50',
        items: [
          {
            id: 'dream-analysis',
            title: 'Dream Analysis',
            description: 'AI-powered dream interpretation',
            icon: BookOpen,
            route: '/dreams',
            color: 'text-purple-600',
            bgColor: 'bg-purple-50',
            status: 'active',
            capabilities: {
              free: ['Basic analysis'],
              premium: ['Advanced AI analysis', 'Symbol interpretation', 'Pattern recognition'],
              admin: ['All features', 'Custom AI models']
            }
          },
          {
            id: 'ai-guidance',
            title: 'AI Guidance',
            description: 'Personalized AI cosmic guidance',
            icon: Sparkles,
            route: '/ai-guidance',
            color: 'text-cyan-600',
            bgColor: 'bg-cyan-50',
            status: 'active',
            capabilities: {
              free: ['Basic guidance'],
              premium: ['Advanced AI guidance', 'Personalized insights', 'Predictive analysis'],
              admin: ['All features', 'Custom AI models']
            }
          },
          {
            id: 'offline-ai',
            title: 'Offline AI',
            description: 'Local AI processing',
            icon: Cloud,
            route: '/offline-ai',
            color: 'text-gray-600',
            bgColor: 'bg-gray-50',
            status: 'active',
            capabilities: {
              free: ['Basic offline features'],
              premium: ['Advanced offline AI', 'Local processing', 'Privacy-focused'],
              admin: ['All features', 'Custom AI models']
            }
          }
        ]
      },
      {
        id: 'community',
        title: 'Community & Social',
        description: 'Connect with fellow cosmic explorers',
        icon: Users,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        items: [
          {
            id: 'community-chat',
            title: 'Community Chat',
            description: 'Safe emoji-only community interaction',
            icon: MessageCircle,
            route: '/community',
            color: 'text-green-600',
            bgColor: 'bg-green-50',
            status: 'active',
            capabilities: {
              free: ['Basic chat'],
              premium: ['Advanced chat', 'Moderation tools', 'Custom rooms'],
              admin: ['All features', 'Moderation tools', 'Analytics']
            }
          },
          {
            id: 'compatibility-matching',
            title: 'Compatibility Matching',
            description: 'Find cosmic connections',
            icon: Heart,
            route: '/compatibility',
            color: 'text-pink-600',
            bgColor: 'bg-pink-50',
            status: 'active',
            capabilities: {
              free: ['Basic matching'],
              premium: ['Advanced matching', 'Detailed compatibility', 'Multiple systems'],
              admin: ['All features', 'Matching algorithms', 'Analytics']
            }
          },
          {
            id: 'sharing',
            title: 'Share & Export',
            description: 'Share your cosmic insights',
            icon: Share2,
            route: '/sharing',
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
            status: 'active',
            capabilities: {
              free: ['Basic sharing'],
              premium: ['Advanced sharing', 'Custom formats', 'Social integration'],
              admin: ['All features', 'Analytics', 'Content management']
            }
          }
        ]
      },
      {
        id: 'premium',
        title: 'Premium Features',
        description: 'Advanced features for premium users',
        icon: Crown,
        color: 'text-amber-600',
        bgColor: 'bg-amber-50',
        items: [
          {
            id: 'advanced-astrology',
            title: 'Advanced Astrology',
            description: 'Deep cosmic insights with multiple systems',
            icon: Sparkles,
            route: '/premium/astrology',
            color: 'text-amber-600',
            bgColor: 'bg-amber-50',
            status: 'active',
            capabilities: {
              free: ['Not available'],
              premium: ['All advanced features', 'Multiple systems', 'Custom calculations'],
              admin: ['All features', 'System management']
            }
          },
          {
            id: 'cosmic-calendar',
            title: 'Cosmic Calendar',
            description: 'Astrological events and cosmic timing',
            icon: Calendar,
            route: '/premium/calendar',
            color: 'text-purple-600',
            bgColor: 'bg-purple-50',
            status: 'active',
            capabilities: {
              free: ['Not available'],
              premium: ['Full calendar', 'Event notifications', 'Custom events'],
              admin: ['All features', 'Event management']
            }
          },
          {
            id: 'data-export',
            title: 'Data Export',
            description: 'Export your cosmic data and insights',
            icon: Download,
            route: '/premium/export',
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
            status: 'active',
            capabilities: {
              free: ['Not available'],
              premium: ['Full data export', 'Multiple formats', 'Scheduled exports'],
              admin: ['All features', 'Bulk exports']
            }
          }
        ]
      },
      {
        id: 'admin',
        title: 'Admin Features',
        description: 'System administration and management',
        icon: Settings,
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        items: [
          {
            id: 'user-management',
            title: 'User Management',
            description: 'Manage all users and their accounts',
            icon: Users,
            route: '/admin/users',
            color: 'text-red-600',
            bgColor: 'bg-red-50',
            status: 'active',
            capabilities: {
              free: ['Not available'],
              premium: ['Not available'],
              admin: ['Full user management', 'Role assignment', 'Account management']
            }
          },
          {
            id: 'system-analytics',
            title: 'System Analytics',
            description: 'Monitor application performance and usage',
            icon: BarChart3,
            route: '/admin/analytics',
            color: 'text-orange-600',
            bgColor: 'bg-orange-50',
            status: 'active',
            capabilities: {
              free: ['Not available'],
              premium: ['Not available'],
              admin: ['Full analytics', 'Performance monitoring', 'Usage statistics']
            }
          },
          {
            id: 'content-management',
            title: 'Content Management',
            description: 'Manage cosmic content and articles',
            icon: FileText,
            route: '/admin/content',
            color: 'text-green-600',
            bgColor: 'bg-green-50',
            status: 'active',
            capabilities: {
              free: ['Not available'],
              premium: ['Not available'],
              admin: ['Content management', 'Article editing', 'Media management']
            }
          },
          {
            id: 'qa-testing',
            title: 'QA Testing',
            description: 'Quality assurance and testing tools',
            icon: FlaskConical,
            route: '/admin/qa',
            color: 'text-purple-600',
            bgColor: 'bg-purple-50',
            status: 'active',
            capabilities: {
              free: ['Not available'],
              premium: ['Not available'],
              admin: ['Testing tools', 'Quality assurance', 'Bug tracking']
            }
          }
        ]
      }
    ]
  }

  const getFilteredCategories = () => {
    const categories = getNavigationCategories()
    
    if (!searchQuery) return categories
    
    return categories.map(category => ({
      ...category,
      items: category.items.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(category => category.items.length > 0)
  }

  const getThemeClasses = () => {
    if (!userData) return {
      card: 'bg-white border border-gray-200',
      button: 'bg-indigo-600 text-white',
      text: 'text-gray-900',
      accent: 'text-indigo-600',
      background: 'bg-gradient-to-br from-slate-50 to-gray-100'
    }
    
    switch (userData.role) {
      case 'premium':
        return {
          card: 'bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200',
          button: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white',
          text: 'text-amber-900',
          accent: 'text-amber-600',
          background: 'bg-gradient-to-br from-amber-50 to-orange-100'
        }
      case 'admin':
        return {
          card: 'bg-gradient-to-br from-slate-800 to-gray-800 border-2 border-pink-500',
          button: 'bg-gradient-to-r from-pink-500 to-red-500 text-white',
          text: 'text-slate-100',
          accent: 'text-pink-400',
          background: 'bg-gradient-to-br from-slate-900 to-gray-900'
        }
      default:
        return {
          card: 'bg-white border border-gray-200',
          button: 'bg-indigo-600 text-white',
          text: 'text-gray-900',
          accent: 'text-indigo-600',
          background: 'bg-gradient-to-br from-slate-50 to-gray-100'
        }
    }
  }

  const theme = getThemeClasses()

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  const filteredCategories = getFilteredCategories()

  return (
    <div className={`min-h-screen ${theme.background} transition-all duration-300`}>
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div 
        initial={{ x: -320 }}
        animate={{ x: sidebarOpen ? 0 : -320 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className={`
          fixed inset-y-0 left-0 z-50 w-80 ${theme.card} shadow-xl transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:inset-0
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Daily Secrets</h1>
                <p className="text-sm text-gray-500 capitalize">{userData?.role || 'Guest'}</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Search */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* User Info */}
          {userData && (
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">
                    {userData.name?.charAt(0) || userData.email?.charAt(0) || 'U'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {userData.name || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {userData.email}
                  </p>
                  <div className="flex items-center mt-1">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      userData.role === 'admin' ? 'bg-pink-100 text-pink-800' :
                      userData.role === 'premium' ? 'bg-amber-100 text-amber-800' :
                      'bg-indigo-100 text-indigo-800'
                    }`}>
                      {userData.role === 'admin' && <Crown className="w-3 h-3 mr-1" />}
                      {userData.role === 'premium' && <Star className="w-3 h-3 mr-1" />}
                      {userData.role?.charAt(0).toUpperCase() + userData.role?.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex-1 px-4 py-6 space-y-4 overflow-y-auto">
            {filteredCategories.map((category) => (
              <div key={category.id} className="space-y-2">
                <button
                  onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
                  className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <category.icon className={`w-5 h-5 ${category.color}`} />
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900">{category.title}</h3>
                      <p className="text-xs text-gray-500">{category.description}</p>
                    </div>
                  </div>
                  {activeCategory === category.id ? (
                    <ChevronUp className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  )}
                </button>

                <AnimatePresence>
                  {activeCategory === category.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-1 ml-8"
                    >
                      {category.items.map((item) => {
                        const isActive = pathname === item.route
                        const Icon = item.icon
                        const userRole = userData?.role || 'user'
                        const capabilities = item.capabilities[userRole as keyof typeof item.capabilities] || []
                        
                        return (
                          <Link
                            key={item.id}
                            href={item.route}
                            className={`
                              flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 group
                              ${isActive 
                                ? 'bg-indigo-100 text-indigo-700 border-r-2 border-indigo-500' 
                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                              }
                            `}
                            onClick={() => setSidebarOpen(false)}
                          >
                            <Icon className="w-5 h-5" />
                            <div className="flex-1">
                              <span className="font-medium">{item.title}</span>
                              <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                              {capabilities.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {capabilities.slice(0, 2).map((capability, index) => (
                                    <span
                                      key={index}
                                      className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600"
                                    >
                                      {capability}
                                    </span>
                                  ))}
                                  {capabilities.length > 2 && (
                                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                                      +{capabilities.length - 2} more
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          </Link>
                        )
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            {userData && (
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="lg:pl-80">
        {/* Top bar */}
        <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="ml-4 lg:ml-0">
                <h1 className="text-2xl font-bold text-gray-900">
                  {pathname === '/main' ? 'Dashboard' :
                   pathname === '/premium' ? 'Premium Features' :
                   pathname === '/admin' ? 'Admin Panel' :
                   'Daily Secrets'}
                </h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-400 hover:text-gray-600">
                <Bell className="w-6 h-6" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User menu */}
              {userData && (
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {userData.name?.charAt(0) || userData.email?.charAt(0) || 'U'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
