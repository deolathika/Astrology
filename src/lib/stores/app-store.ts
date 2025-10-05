/**
 * Zustand App Store
 * Centralized state management for the Daily Secrets app
 */

import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

// Types
export interface User {
  id: string
  name: string | null
  email: string
  role: string
  image: string | null
}

export interface Profile {
  id: string
  userId: string
  name: string
  birthDate: string
  birthTime: string
  placeLabel: string
  lat: number
  lng: number
  tzIana: string
  systemPref: string
  localePref: string
  privacy: string
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'system'
  language: string
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
  }
  privacy: {
    profile: 'public' | 'private' | 'friends'
    analytics: boolean
    marketing: boolean
  }
}

export interface AppState {
  // User state
  user: User | null
  profile: Profile | null
  settings: UserSettings | null
  
  // UI state
  theme: 'light' | 'dark'
  sidebarOpen: boolean
  loading: boolean
  
  // Actions
  setUser: (user: User | null) => void
  setProfile: (profile: Profile | null) => void
  setSettings: (settings: UserSettings | null) => void
  setTheme: (theme: 'light' | 'dark') => void
  setSidebarOpen: (open: boolean) => void
  setLoading: (loading: boolean) => void
  
  // Auth actions
  login: (user: User, profile?: Profile) => void
  logout: () => void
  
  // Profile actions
  updateProfile: (profile: Partial<Profile>) => void
  updateSettings: (settings: Partial<UserSettings>) => void
}

// Default settings
const defaultSettings: UserSettings = {
  theme: 'system',
  language: 'en',
  notifications: {
    email: true,
    push: true,
    sms: false
  },
  privacy: {
    profile: 'private',
    analytics: true,
    marketing: false
  }
}

// Create the store
export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        user: null,
        profile: null,
        settings: defaultSettings,
        theme: 'light',
        sidebarOpen: false,
        loading: false,

        // User actions
        setUser: (user) => set({ user }),
        setProfile: (profile) => set({ profile }),
        setSettings: (settings) => set({ settings }),

        // UI actions
        setTheme: (theme) => set({ theme }),
        setSidebarOpen: (open) => set({ sidebarOpen: open }),
        setLoading: (loading) => set({ loading }),

        // Auth actions
        login: (user, profile) => set({ 
          user, 
          profile: profile || null,
          loading: false 
        }),
        
        logout: () => set({ 
          user: null, 
          profile: null, 
          settings: defaultSettings,
          loading: false 
        }),

        // Profile actions
        updateProfile: (profile) => set((state) => ({
          profile: state.profile ? { ...state.profile, ...profile } : null
        })),
        
        updateSettings: (settings) => set((state) => ({
          settings: state.settings ? { ...state.settings, ...settings } : null
        }))
      }),
      {
        name: 'daily-secrets-store',
        partialize: (state) => ({
          user: state.user,
          profile: state.profile,
          settings: state.settings,
          theme: state.theme
        })
      }
    ),
    {
      name: 'daily-secrets-store'
    }
  )
)

// Selectors for better performance
export const useUser = () => useAppStore((state) => state.user)
export const useProfile = () => useAppStore((state) => state.profile)
export const useSettings = () => useAppStore((state) => state.settings)
export const useTheme = () => useAppStore((state) => state.theme)
export const useSidebarOpen = () => useAppStore((state) => state.sidebarOpen)
export const useLoading = () => useAppStore((state) => state.loading)

// Action selectors
export const useAuthActions = () => useAppStore((state) => ({
  login: state.login,
  logout: state.logout
}))

export const useProfileActions = () => useAppStore((state) => ({
  updateProfile: state.updateProfile,
  updateSettings: state.updateSettings
}))

export const useUIActions = () => useAppStore((state) => ({
  setTheme: state.setTheme,
  setSidebarOpen: state.setSidebarOpen,
  setLoading: state.setLoading
}))

