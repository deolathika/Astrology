'use client'

import React, { useState, useEffect } from 'react'
import { 
  Star, 
  Moon, 
  Sun, 
  Zap, 
  Heart, 
  Target, 
  Clock, 
  MapPin,
  TrendingUp,
  Award,
  Calendar,
  Sparkles,
  Activity,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react'

interface DailyInsightsProps {
  user?: any
  onTrackEvent?: (event: string, properties?: any) => void
}

export default function DailyInsights({ user, onTrackFeatureUsage }: DailyInsightsProps) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [insights, setInsights] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    // Simulate loading daily insights
    const loadInsights = async () => {
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Generate personalized insights based on time and user data
      const hour = new Date().getHours()
      const dayOfWeek = new Date().getDay()
      const zodiacSign = user?.profile?.zodiacSign || 'Aries'
      
      setInsights({
        energyLevel: Math.floor(Math.random() * 40) + 60, // 60-100%
        luckyColor: getLuckyColor(zodiacSign),
        bestTime: getBestTime(hour),
        mood: getMood(hour, dayOfWeek),
        luckyNumber: getLuckyNumber(zodiacSign),
        moonPhase: getMoonPhase(),
        compatibility: getCompatibilityScore(),
        advice: getDailyAdvice(hour, zodiacSign),
        warnings: getWarnings(hour, zodiacSign),
        opportunities: getOpportunities(dayOfWeek, zodiacSign)
      })
      
      setIsLoading(false)
    }
    
    loadInsights()
  }, [user])

  const getLuckyColor = (sign: string) => {
    const colors = {
      'Aries': 'Red',
      'Taurus': 'Green', 
      'Gemini': 'Yellow',
      'Cancer': 'Silver',
      'Leo': 'Gold',
      'Virgo': 'Brown',
      'Libra': 'Pink',
      'Scorpio': 'Black',
      'Sagittarius': 'Purple',
      'Capricorn': 'Dark Blue',
      'Aquarius': 'Blue',
      'Pisces': 'Sea Green'
    }
    return colors[sign as keyof typeof colors] || 'Blue'
  }

  const getBestTime = (hour: number) => {
    if (hour < 6) return '6-8 AM'
    if (hour < 12) return '10 AM-12 PM'
    if (hour < 18) return '2-4 PM'
    return '8-10 PM'
  }

  const getMood = (hour: number, dayOfWeek: number) => {
    const moods = ['Optimistic', 'Focused', 'Creative', 'Balanced', 'Energetic', 'Peaceful', 'Adventurous']
    return moods[dayOfWeek] || 'Balanced'
  }

  const getLuckyNumber = (sign: string) => {
    const numbers = {
      'Aries': 7, 'Taurus': 6, 'Gemini': 5, 'Cancer': 2, 'Leo': 1, 'Virgo': 3,
      'Libra': 6, 'Scorpio': 9, 'Sagittarius': 3, 'Capricorn': 8, 'Aquarius': 4, 'Pisces': 7
    }
    return numbers[sign as keyof typeof numbers] || 7
  }

  const getMoonPhase = () => {
    const phases = ['New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous', 'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent']
    return phases[Math.floor(Math.random() * phases.length)]
  }

  const getCompatibilityScore = () => {
    return Math.floor(Math.random() * 30) + 70 // 70-100%
  }

  const getDailyAdvice = (hour: number, sign: string) => {
    const advice = {
      morning: "Start your day with intention and gratitude. The morning energy is perfect for new beginnings.",
      afternoon: "This is your peak energy time. Focus on important tasks and make key decisions.",
      evening: "Take time to reflect on your day. Evening is perfect for planning tomorrow's success.",
      night: "Trust your intuition. Night time offers deep cosmic wisdom and dream guidance."
    }
    
    if (hour < 12) return advice.morning
    if (hour < 18) return advice.afternoon
    if (hour < 22) return advice.evening
    return advice.night
  }

  const getWarnings = (hour: number, sign: string) => {
    const warnings = [
      "Avoid making major financial decisions today",
      "Be cautious with new relationships",
      "Don't rush into important commitments",
      "Take care of your health today"
    ]
    return warnings[Math.floor(Math.random() * warnings.length)]
  }

  const getOpportunities = (dayOfWeek: number, sign: string) => {
    const opportunities = [
      "Great day for networking and meeting new people",
      "Perfect time to start a new project",
      "Excellent day for creative pursuits",
      "Ideal for spiritual growth and meditation",
      "Good day for physical activities and exercise"
    ]
    return opportunities[dayOfWeek] || opportunities[0]
  }

  if (isLoading) {
    return (
      <div className="glass-card p-6">
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
          <span className="ml-3 text-white">Loading your daily insights...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Main Insights Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-4 text-center">
          <Zap className="w-8 h-8 text-green-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white mb-1">{insights?.energyLevel}%</div>
          <div className="text-white/70 text-sm">Energy Level</div>
        </div>
        
        <div className="glass-card p-4 text-center">
          <Star className="w-8 h-8 text-purple-400 mx-auto mb-2" />
          <div className="text-lg font-bold text-white mb-1">{insights?.luckyColor}</div>
          <div className="text-white/70 text-sm">Lucky Color</div>
        </div>
        
        <div className="glass-card p-4 text-center">
          <Clock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
          <div className="text-lg font-bold text-white mb-1">{insights?.bestTime}</div>
          <div className="text-white/70 text-sm">Best Time</div>
        </div>
        
        <div className="glass-card p-4 text-center">
          <Sun className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
          <div className="text-lg font-bold text-white mb-1">{insights?.mood}</div>
          <div className="text-white/70 text-sm">Mood</div>
        </div>
      </div>

      {/* Detailed Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Daily Advice */}
        <div className="glass-card p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Sparkles className="w-6 h-6 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Daily Advice</h3>
          </div>
          <p className="text-white/80 text-sm leading-relaxed">
            {insights?.advice}
          </p>
        </div>

        {/* Moon Phase */}
        <div className="glass-card p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Moon className="w-6 h-6 text-indigo-400" />
            <h3 className="text-lg font-semibold text-white">Moon Phase</h3>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-2">{insights?.moonPhase}</div>
            <p className="text-white/70 text-sm">
              The lunar energy influences your emotions and intuition today.
            </p>
          </div>
        </div>

        {/* Opportunities */}
        <div className="glass-card p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Target className="w-6 h-6 text-green-400" />
            <h3 className="text-lg font-semibold text-white">Opportunities</h3>
          </div>
          <p className="text-white/80 text-sm leading-relaxed">
            {insights?.opportunities}
          </p>
        </div>

        {/* Warnings */}
        <div className="glass-card p-6">
          <div className="flex items-center space-x-3 mb-4">
            <AlertCircle className="w-6 h-6 text-orange-400" />
            <h3 className="text-lg font-semibold text-white">Be Mindful</h3>
          </div>
          <p className="text-white/80 text-sm leading-relaxed">
            {insights?.warnings}
          </p>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-4 text-center">
          <Heart className="w-6 h-6 text-pink-400 mx-auto mb-2" />
          <div className="text-xl font-bold text-white mb-1">{insights?.compatibility}%</div>
          <div className="text-white/70 text-sm">Love Compatibility</div>
        </div>
        
        <div className="glass-card p-4 text-center">
          <Award className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
          <div className="text-xl font-bold text-white mb-1">{insights?.luckyNumber}</div>
          <div className="text-white/70 text-sm">Lucky Number</div>
        </div>
        
        <div className="glass-card p-4 text-center">
          <Activity className="w-6 h-6 text-blue-400 mx-auto mb-2" />
          <div className="text-xl font-bold text-white mb-1">High</div>
          <div className="text-white/70 text-sm">Intuition Level</div>
        </div>
      </div>
    </div>
  )
}
