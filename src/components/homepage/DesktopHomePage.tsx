'use client'

import React, { useState, useEffect } from 'react'
import { 
  Sparkles, 
  Star, 
  Moon, 
  Heart, 
  Users, 
  Calculator,
  Crown,
  Clock,
  MapPin,
  Search,
  Filter,
  RefreshCw,
  ChevronRight,
  Lock,
  TrendingUp,
  Award,
  Activity,
  BarChart3,
  Calendar,
  Target,
  BookOpen,
  Globe,
  Zap,
  Shield
} from 'lucide-react'
import Link from 'next/link'
import { useResponsive } from '@/hooks/useDevice'
import ResponsiveGrid, { ResponsiveCard, ResponsiveButton, ResponsiveText } from '@/components/responsive/ResponsiveGrid'

interface DesktopHomePageProps {
  user?: any
  onTrackEvent?: (event: string, properties?: any) => void
  onTrackFeatureUsage?: (feature: string, action: string) => void
}

export default function DesktopHomePage({ user, onTrackEvent, onTrackFeatureUsage }: DesktopHomePageProps) {
  const responsive = useResponsive()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedElement, setSelectedElement] = useState('ALL')
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const quickActions = [
    {
      icon: Star,
      title: 'Today\'s Horoscope',
      description: 'Get your personalized daily reading',
      href: '/zodiac',
      gradient: 'from-purple-500 to-blue-500',
      badge: 'Popular'
    },
    {
      icon: Calculator,
      title: 'Numerology',
      description: 'Calculate your life path number',
      href: '/numerology',
      gradient: 'from-blue-500 to-cyan-500',
      badge: 'New'
    },
    {
      icon: Moon,
      title: 'Dream Analysis',
      description: 'AI-powered dream interpretation',
      href: '/dreams',
      gradient: 'from-indigo-500 to-purple-500',
      badge: 'AI'
    },
    {
      icon: Heart,
      title: 'Compatibility',
      description: 'Check relationship compatibility',
      href: '/compatibility',
      gradient: 'from-pink-500 to-rose-500',
      badge: 'Hot'
    }
  ]

  const cosmicFeatures = [
    {
      icon: Star,
      title: '5 Astrology Systems',
      description: 'Western, Vedic, Chinese, Sri Lankan, and Hybrid astrology systems.',
      href: '/zodiac',
      gradient: 'from-purple-500 to-blue-500',
      stats: '12 Signs'
    },
    {
      icon: Calculator,
      title: 'Numerology Insights',
      description: 'Discover your life path, destiny number, and personal year cycles.',
      href: '/numerology',
      gradient: 'from-blue-500 to-cyan-500',
      stats: '9 Numbers'
    },
    {
      icon: Moon,
      title: 'AI Dream Analysis',
      description: 'Unlock the hidden meanings in your dreams with AI guidance.',
      href: '/dreams',
      gradient: 'from-indigo-500 to-purple-500',
      stats: 'AI Powered'
    },
    {
      icon: Heart,
      title: 'Compatibility',
      description: 'Discover your cosmic connections with friends, family, and partners.',
      href: '/compatibility',
      gradient: 'from-pink-500 to-rose-500',
      stats: '100% Match'
    },
    {
      icon: Users,
      title: 'Cosmic Community',
      description: 'Connect with fellow seekers and share your cosmic journey.',
      href: '/community',
      gradient: 'from-emerald-500 to-teal-500',
      stats: '10K+ Users'
    },
    {
      icon: Crown,
      title: 'Premium Insights',
      description: 'Unlock detailed readings, personalized guidance, and exclusive features.',
      href: '/premium',
      gradient: 'from-amber-500 to-orange-500',
      stats: 'Premium Only'
    }
  ]

  const zodiacSigns = [
    { name: 'Aries', dates: 'Mar 21 - Apr 19', element: 'FIRE', mood: 'Energetic', luckyNumber: '7', symbol: '♈' },
    { name: 'Taurus', dates: 'Apr 20 - May 20', element: 'EARTH', mood: 'Grounded', luckyNumber: '14', symbol: '♉' },
    { name: 'Gemini', dates: 'May 21 - Jun 20', element: 'AIR', mood: 'Curious', luckyNumber: '3', symbol: '♊' },
    { name: 'Cancer', dates: 'Jun 21 - Jul 22', element: 'WATER', mood: 'Intuitive', luckyNumber: '21', symbol: '♋' },
    { name: 'Leo', dates: 'Jul 23 - Aug 22', element: 'FIRE', mood: 'Confident', luckyNumber: '8', symbol: '♌' },
    { name: 'Virgo', dates: 'Aug 23 - Sep 22', element: 'EARTH', mood: 'Analytical', luckyNumber: '12', symbol: '♍' },
    { name: 'Libra', dates: 'Sep 23 - Oct 22', element: 'AIR', mood: 'Harmonious', luckyNumber: '6', symbol: '♎' },
    { name: 'Scorpio', dates: 'Oct 23 - Nov 21', element: 'WATER', mood: 'Intense', luckyNumber: '9', symbol: '♏' },
    { name: 'Sagittarius', dates: 'Nov 22 - Dec 21', element: 'FIRE', mood: 'Adventurous', luckyNumber: '15', symbol: '♐' },
    { name: 'Capricorn', dates: 'Dec 22 - Jan 19', element: 'EARTH', mood: 'Determined', luckyNumber: '10', symbol: '♑' },
    { name: 'Aquarius', dates: 'Jan 20 - Feb 18', element: 'AIR', mood: 'Innovative', luckyNumber: '11', symbol: '♒' },
    { name: 'Pisces', dates: 'Feb 19 - Mar 20', element: 'WATER', mood: 'Compassionate', luckyNumber: '2', symbol: '♓' }
  ]

  const getElementColor = (element: string) => {
    switch (element) {
      case 'FIRE': return 'bg-orange-500'
      case 'EARTH': return 'bg-green-500'
      case 'AIR': return 'bg-blue-400'
      case 'WATER': return 'bg-blue-600'
      default: return 'bg-gray-500'
    }
  }

  const filteredZodiacSigns = zodiacSigns.filter(sign => {
    const matchesSearch = sign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         sign.mood.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesElement = selectedElement === 'ALL' || sign.element === selectedElement
    return matchesSearch && matchesElement
  })

  const handleRefresh = async () => {
    setIsRefreshing(true)
    onTrackEvent?.('refresh_data')
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsRefreshing(false)
  }

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
        </div>
        <ResponsiveText variant="h1" className="text-white mb-4">
          Daily Secrets
        </ResponsiveText>
        <ResponsiveText variant="body" className="text-white/80 max-w-3xl mx-auto mb-8">
          {user ? `Welcome back, ${user.name}!` : 'Welcome to Daily Secrets!'} Discover your cosmic journey with AI-powered insights and personalized guidance.
        </ResponsiveText>
        
        {/* Status Bar */}
        <div className="flex items-center justify-center space-x-6 mb-8">
          <div className="flex items-center space-x-2 text-white/60">
            <Clock className="w-5 h-5" />
            <span>{currentTime.toLocaleTimeString()}</span>
          </div>
          <div className="w-1 h-1 bg-white/30 rounded-full"></div>
          <div className="flex items-center space-x-2 text-white/60">
            <MapPin className="w-5 h-5" />
            <span>New York, NY</span>
          </div>
          <div className="w-1 h-1 bg-white/30 rounded-full"></div>
          <div className="flex items-center space-x-2 text-white/60">
            <span className="text-sm">Premium User</span>
          </div>
        </div>

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link href="/zodiac">
            <ResponsiveButton 
              variant="primary" 
              size="lg"
              onClick={() => onTrackFeatureUsage?.('horoscope', 'cta_click')}
            >
              <Star className="w-5 h-5 mr-2" />
              Get My Horoscope
            </ResponsiveButton>
          </Link>
          
          {user?.subscription === 'premium' ? (
            <ResponsiveButton 
              variant="outline" 
              size="lg"
              onClick={() => onTrackFeatureUsage?.('premium_dashboard', 'access')}
            >
              <Crown className="w-5 h-5 mr-2" />
              Premium Dashboard
            </ResponsiveButton>
          ) : (
            <Link href="/premium">
              <ResponsiveButton 
                variant="outline" 
                size="lg"
                onClick={() => onTrackFeatureUsage?.('premium', 'cta_click')}
              >
                <Crown className="w-5 h-5 mr-2" />
                Go Premium
              </ResponsiveButton>
            </Link>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <ResponsiveText variant="h2" className="text-white mb-6">
          Quick Actions
        </ResponsiveText>
        <ResponsiveGrid mobileCols={2} tabletCols={4} desktopCols={4} gap="md">
          {quickActions.map((action, index) => (
            <Link key={index} href={action.href}>
              <ResponsiveCard 
                className="hover:glass-strong group"
                onClick={() => onTrackFeatureUsage?.(action.title.toLowerCase().replace(' ', '_'), 'quick_action')}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${action.gradient} rounded-lg flex items-center justify-center`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded-full">
                    {action.badge}
                  </span>
                </div>
                <ResponsiveText variant="h4" className="text-white mb-2">
                  {action.title}
                </ResponsiveText>
                <ResponsiveText variant="body" className="text-white/70 mb-4">
                  {action.description}
                </ResponsiveText>
                <div className="flex items-center text-blue-400 text-sm group-hover:text-blue-300">
                  <span>Explore</span>
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </ResponsiveCard>
            </Link>
          ))}
        </ResponsiveGrid>
      </div>

      {/* Zodiac Signs with Search */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <ResponsiveText variant="h2" className="text-white">
            Zodiac Signs
          </ResponsiveText>
          <button 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="glass-button px-4 py-2 text-sm flex items-center space-x-2"
          >
            {isRefreshing ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
            <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
          </button>
        </div>

        {/* Search and Filter */}
        <div className="glass-card p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
              <input
                type="text"
                placeholder="Search zodiac signs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full glass-input pl-10 pr-4 py-3"
              />
            </div>
            
            <div className="flex items-center space-x-3">
              <Filter className="w-5 h-5 text-white/60" />
              <select
                value={selectedElement}
                onChange={(e) => setSelectedElement(e.target.value)}
                className="glass-input px-4 py-3"
              >
                <option value="ALL">All Elements</option>
                <option value="FIRE">Fire</option>
                <option value="EARTH">Earth</option>
                <option value="AIR">Air</option>
                <option value="WATER">Water</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-white/60 text-sm mb-4">
          Showing {filteredZodiacSigns.length} of {zodiacSigns.length} signs
        </div>

        <ResponsiveGrid mobileCols={2} tabletCols={3} desktopCols={6} gap="md">
          {filteredZodiacSigns.map((sign, index) => (
            <ResponsiveCard key={index} className="text-center hover:glass-strong">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4 text-xl">
                {sign.symbol}
              </div>
              <ResponsiveText variant="h4" className="text-white mb-2">
                {sign.name}
              </ResponsiveText>
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white ${getElementColor(sign.element)} mb-3`}>
                {sign.element}
              </div>
              <ResponsiveText variant="body" className="text-white/70 mb-2">
                {sign.mood}
              </ResponsiveText>
              <ResponsiveText variant="caption" className="text-white/60 mb-4">
                Lucky: {sign.luckyNumber}
              </ResponsiveText>
              <ResponsiveButton 
                variant="secondary" 
                size="sm" 
                fullWidth
                onClick={() => onTrackFeatureUsage?.('zodiac_sign', 'view')}
              >
                <Lock className="w-4 h-4 mr-2" />
                Unlock
              </ResponsiveButton>
            </ResponsiveCard>
          ))}
        </ResponsiveGrid>
      </div>

      {/* Features */}
      <div>
        <ResponsiveText variant="h2" className="text-white mb-6">
          All Features
        </ResponsiveText>
        <ResponsiveGrid mobileCols={1} tabletCols={2} desktopCols={3} gap="md">
          {cosmicFeatures.map((feature, index) => (
            <Link key={index} href={feature.href}>
              <ResponsiveCard className="hover:glass-strong group">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-lg flex items-center justify-center`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">
                    {feature.stats}
                  </span>
                </div>
                <ResponsiveText variant="h4" className="text-white mb-2">
                  {feature.title}
                </ResponsiveText>
                <ResponsiveText variant="body" className="text-white/70 mb-4">
                  {feature.description}
                </ResponsiveText>
                <div className="flex items-center text-blue-400 text-sm group-hover:text-blue-300">
                  <span>Explore</span>
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </ResponsiveCard>
            </Link>
          ))}
        </ResponsiveGrid>
      </div>

      {/* Daily Quote */}
      <ResponsiveCard className="text-center p-8">
        <blockquote className="text-xl font-medium text-white mb-4">
          "The cosmos is within us. We are made of star-stuff."
        </blockquote>
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <div className="w-2 h-2 bg-white/30 rounded-full"></div>
          <div className="w-2 h-2 bg-white/30 rounded-full"></div>
        </div>
      </ResponsiveCard>
    </div>
  )
}
