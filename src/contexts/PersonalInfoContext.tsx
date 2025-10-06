'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface PersonalInfo {
  name: string
  birthDate: string
  birthTime: string
  birthLocation: string
  latitude?: number
  longitude?: number
  timezone?: string
}

interface ZodiacInfo {
  name: string
  element: string
  modality: string
  description: string
  traits: string[]
}

interface PersonalInfoContextType {
  personalInfo: PersonalInfo | null
  zodiacInfo: ZodiacInfo | null
  updatePersonalInfo: (info: PersonalInfo) => void
  updateZodiacInfo: (info: ZodiacInfo) => void
  clearPersonalInfo: () => void
  isPersonalized: boolean
}

const PersonalInfoContext = createContext<PersonalInfoContextType | undefined>(undefined)

export function PersonalInfoProvider({ children }: { children: ReactNode }) {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null)
  const [zodiacInfo, setZodiacInfo] = useState<ZodiacInfo | null>(null)

  // Load from localStorage on mount
  useEffect(() => {
    const storedPersonalInfo = localStorage.getItem('personalInfo')
    const storedZodiacInfo = localStorage.getItem('zodiacInfo')
    
    if (storedPersonalInfo) {
      setPersonalInfo(JSON.parse(storedPersonalInfo))
    }
    if (storedZodiacInfo) {
      setZodiacInfo(JSON.parse(storedZodiacInfo))
    }
  }, [])

  const updatePersonalInfo = (info: PersonalInfo) => {
    setPersonalInfo(info)
    localStorage.setItem('personalInfo', JSON.stringify(info))
  }

  const updateZodiacInfo = (info: ZodiacInfo) => {
    setZodiacInfo(info)
    localStorage.setItem('zodiacInfo', JSON.stringify(info))
  }

  const clearPersonalInfo = () => {
    setPersonalInfo(null)
    setZodiacInfo(null)
    localStorage.removeItem('personalInfo')
    localStorage.removeItem('zodiacInfo')
  }

  const isPersonalized = !!(personalInfo && zodiacInfo)

  return (
    <PersonalInfoContext.Provider value={{
      personalInfo,
      zodiacInfo,
      updatePersonalInfo,
      updateZodiacInfo,
      clearPersonalInfo,
      isPersonalized
    }}>
      {children}
    </PersonalInfoContext.Provider>
  )
}

export function usePersonalInfo() {
  const context = useContext(PersonalInfoContext)
  if (context === undefined) {
    throw new Error('usePersonalInfo must be used within a PersonalInfoProvider')
  }
  return context
}
