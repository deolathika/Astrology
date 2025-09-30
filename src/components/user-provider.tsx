'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id?: string
  fullName?: string
  email?: string
  birthDate?: string
  birthTime?: string
  birthPlace?: string
  latitude?: number
  longitude?: number
  timezone?: string
}

interface UserContextType {
  user: User | null
  loadUser: () => void
  saveUser: (userData: User) => void
  clearUser: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [mounted, setMounted] = useState(false)

  const loadUser = () => {
    try {
      if (typeof window !== 'undefined') {
        const savedUser = localStorage.getItem('daily-secrets-user')
        if (savedUser) {
          setUser(JSON.parse(savedUser))
        }
      }
    } catch (error) {
      }
  }

  const saveUser = (userData: User) => {
    try {
      setUser(userData)
      if (typeof window !== 'undefined') {
        localStorage.setItem('daily-secrets-user', JSON.stringify(userData))
      }
    } catch (error) {
      }
  }

  const clearUser = () => {
    try {
      setUser(null)
      if (typeof window !== 'undefined') {
        localStorage.removeItem('daily-secrets-user')
      }
    } catch (error) {
      }
  }

  useEffect(() => {
    setMounted(true)
    loadUser()
  }, [])

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <UserContext.Provider value={{ user, loadUser, saveUser, clearUser }}>
      {children}
    </UserContext.Provider>
  )
}
