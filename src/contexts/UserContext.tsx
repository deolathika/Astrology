'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  name: string
  email: string
  subscription: 'guest' | 'free' | 'premium' | 'admin'
  preferences: {
    astrologySystem: 'western' | 'vedic' | 'chinese' | 'sri_lankan' | 'hybrid'
    notifications: boolean
    theme: 'light' | 'dark' | 'auto'
    language: string
  }
  profile: {
    birthday: string
    birthTime: string
    birthLocation: string
    zodiacSign: string
    element: string
    moonSign: string
    risingSign: string
    lifePathNumber: number
  }
  activity: {
    lastActive: Date
    totalReadings: number
    favoriteFeatures: string[]
    readingHistory: any[]
  }
  achievements: {
    level: number
    points: number
    badges: string[]
    streak: number
  }
}

interface UserContextType {
  user: User | null
  isLoading: boolean
  updateUser: (updates: Partial<User>) => void
  updatePreferences: (preferences: Partial<User['preferences']>) => void
  updateProfile: (profile: Partial<User['profile']>) => void
  addAchievement: (badge: string, points: number) => void
  trackActivity: (activity: string) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading user data
    const loadUser = async () => {
      setIsLoading(true)
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Mock user data
        const mockUser: User = {
          id: 'user_123',
          name: 'John Doe',
          email: 'john@example.com',
          subscription: 'premium',
          preferences: {
            astrologySystem: 'western',
            notifications: true,
            theme: 'dark',
            language: 'en'
          },
          profile: {
            birthday: '1990-03-25',
            birthTime: '14:30',
            birthLocation: 'New York, NY',
            zodiacSign: 'Aries',
            element: 'Fire',
            moonSign: 'Leo',
            risingSign: 'Sagittarius',
            lifePathNumber: 7
          },
          activity: {
            lastActive: new Date(),
            totalReadings: 47,
            favoriteFeatures: ['horoscope', 'compatibility', 'dreams'],
            readingHistory: []
          },
          achievements: {
            level: 5,
            points: 1250,
            badges: ['first_reading', 'weekly_streak', 'explorer'],
            streak: 12
          }
        }
        
        setUser(mockUser)
      } catch (error) {
        console.error('Failed to load user data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [])

  const updateUser = (updates: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...updates } : null)
  }

  const updatePreferences = (preferences: Partial<User['preferences']>) => {
    setUser(prev => prev ? {
      ...prev,
      preferences: { ...prev.preferences, ...preferences }
    } : null)
  }

  const updateProfile = (profile: Partial<User['profile']>) => {
    setUser(prev => prev ? {
      ...prev,
      profile: { ...prev.profile, ...profile }
    } : null)
  }

  const addAchievement = (badge: string, points: number) => {
    setUser(prev => {
      if (!prev) return null
      
      const newBadges = prev.achievements.badges.includes(badge) 
        ? prev.achievements.badges 
        : [...prev.achievements.badges, badge]
      
      return {
        ...prev,
        achievements: {
          ...prev.achievements,
          badges: newBadges,
          points: prev.achievements.points + points,
          level: Math.floor((prev.achievements.points + points) / 250) + 1
        }
      }
    })
  }

  const trackActivity = (activity: string) => {
    setUser(prev => {
      if (!prev) return null
      
      return {
        ...prev,
        activity: {
          ...prev.activity,
          lastActive: new Date(),
          totalReadings: prev.activity.totalReadings + 1,
          readingHistory: [
            ...prev.activity.readingHistory.slice(-9), // Keep last 10
            { activity, timestamp: new Date() }
          ]
        }
      }
    })
  }

  return (
    <UserContext.Provider value={{
      user,
      isLoading,
      updateUser,
      updatePreferences,
      updateProfile,
      addAchievement,
      trackActivity
    }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
