/**
 * Custom API Hooks
 * React Query hooks for API calls with proper error handling and caching
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys, invalidateQueries } from '@/lib/stores/query-client'
import { useAppStore } from '@/lib/stores/app-store'

// Types
interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

interface User {
  id: string
  name: string | null
  email: string
  role: string
  image: string | null
  createdAt: string
  updatedAt: string
}

interface Profile {
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
  createdAt: string
  updatedAt: string
}

interface DashboardData {
  user: User
  usage: {
    current: Record<string, number>
    limits: Record<string, number>
  }
  personalizedContent: {
    greeting: string
    zodiacSign: string
    system: string
    birthPlace: string
    todaysInsight: string
    luckyNumbers: number[]
    luckyColors: string[]
    compatibilitySuggestions?: any
  }
  availableFeatures: string[]
  adminData?: any
}

// API Functions
const apiCall = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Network error' }))
    throw new Error(error.error || `HTTP ${response.status}`)
  }

  return response.json()
}

// User Hooks
export const useUser = () => {
  return useQuery({
    queryKey: queryKeys.user,
    queryFn: () => apiCall<User>('/api/users/profile'),
    enabled: !!useAppStore.getState().user,
  })
}

export const useUserProfile = (userId: string) => {
  return useQuery({
    queryKey: queryKeys.userProfile(userId),
    queryFn: () => apiCall<Profile>(`/api/users/profile`),
    enabled: !!userId,
  })
}

export const useUserSettings = (userId: string) => {
  return useQuery({
    queryKey: queryKeys.userSettings(userId),
    queryFn: () => apiCall<any>(`/api/settings`),
    enabled: !!userId,
  })
}

// Generic API Hook
export const useApi = <T>(
  queryKey: string[],
  url: string,
  options?: {
    enabled?: boolean
    staleTime?: number
    refetchInterval?: number
  }
) => {
  return useQuery({
    queryKey,
    queryFn: () => apiCall<T>(url),
    enabled: options?.enabled ?? true,
    staleTime: options?.staleTime,
    refetchInterval: options?.refetchInterval,
  })
}

// Dashboard Hooks
export const useDashboard = (userId: string) => {
  return useQuery({
    queryKey: queryKeys.dashboard(userId),
    queryFn: () => apiCall<DashboardData>('/api/dashboard/personalized'),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

export const usePersonalizedDashboard = (userId: string) => {
  return useQuery({
    queryKey: queryKeys.personalizedDashboard(userId),
    queryFn: () => apiCall<DashboardData>('/api/dashboard/personalized'),
    enabled: !!userId,
    staleTime: 1000 * 60 * 2, // 2 minutes
  })
}

// Astrology Hooks
export const useAstrologyReadings = (userId: string, type?: string) => {
  return useQuery({
    queryKey: queryKeys.astrologyReadings(userId, type),
    queryFn: () => apiCall<any>(`/api/astro/natal?profileId=${userId}`),
    enabled: !!userId,
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}

export const useNatalChart = (userId: string) => {
  return useQuery({
    queryKey: queryKeys.natalChart(userId),
    queryFn: () => apiCall<any>(`/api/astro/natal?profileId=${userId}`),
    enabled: !!userId,
    staleTime: 1000 * 60 * 30, // 30 minutes
  })
}

export const useTransits = (userId: string) => {
  return useQuery({
    queryKey: queryKeys.transits(userId),
    queryFn: () => apiCall<any>(`/api/astro/transits?profileId=${userId}`),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

// Numerology Hooks
export const useNumerologyReadings = (userId: string, type?: string) => {
  return useQuery({
    queryKey: queryKeys.numerologyReadings(userId, type),
    queryFn: () => apiCall<any>(`/api/numerology/enhanced?profileId=${userId}`),
    enabled: !!userId,
    staleTime: 1000 * 60 * 15, // 15 minutes
  })
}

export const useNumerologyCore = (userId: string) => {
  return useQuery({
    queryKey: queryKeys.numerologyCore(userId),
    queryFn: () => apiCall<any>(`/api/numerology/core?profileId=${userId}`),
    enabled: !!userId,
    staleTime: 1000 * 60 * 30, // 30 minutes
  })
}

// Dreams Hooks
export const useDreams = (userId: string) => {
  return useQuery({
    queryKey: queryKeys.dreams(userId),
    queryFn: () => apiCall<any[]>(`/api/dreams?userId=${userId}`),
    enabled: !!userId,
  })
}

export const useDreamAnalysis = (userId: string, dreamId: string) => {
  return useQuery({
    queryKey: queryKeys.dreamAnalysis(userId, dreamId),
    queryFn: () => apiCall<any>(`/api/dreams/${dreamId}/analysis`),
    enabled: !!userId && !!dreamId,
  })
}

// Matches Hooks
export const useMatches = (userId: string) => {
  return useQuery({
    queryKey: queryKeys.matches(userId),
    queryFn: () => apiCall<any[]>(`/api/matches?userId=${userId}`),
    enabled: !!userId,
  })
}

export const useCompatibility = (userId: string, partnerId: string) => {
  return useQuery({
    queryKey: queryKeys.compatibility(userId, partnerId),
    queryFn: () => apiCall<any>(`/api/compatibility?userId=${userId}&partnerId=${partnerId}`),
    enabled: !!userId && !!partnerId,
  })
}

// Notifications Hooks
export const useNotifications = (userId: string) => {
  return useQuery({
    queryKey: queryKeys.notifications(userId),
    queryFn: () => apiCall<any[]>(`/api/notifications?userId=${userId}`),
    enabled: !!userId,
    refetchInterval: 1000 * 60 * 2, // Refetch every 2 minutes
  })
}

// Analytics Hooks
export const useUserAnalytics = (userId: string) => {
  return useQuery({
    queryKey: queryKeys.userAnalytics(userId),
    queryFn: () => apiCall<any>(`/api/analytics/user?userId=${userId}`),
    enabled: !!userId,
  })
}

// Mutation Hooks
export const useUpdateProfile = () => {
  const queryClient = useQueryClient()
  const updateProfile = useAppStore((state) => state.updateProfile)

  return useMutation({
    mutationFn: (data: Partial<Profile>) => 
      apiCall<Profile>('/api/users/profile', {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    onSuccess: (data) => {
      // Update local state
      updateProfile(data)
      
      // Invalidate related queries
      invalidateQueries.profile(data.userId)
      invalidateQueries.dashboard(data.userId)
    },
  })
}

export const useUpdateSettings = () => {
  const queryClient = useQueryClient()
  const updateSettings = useAppStore((state) => state.updateSettings)

  return useMutation({
    mutationFn: (data: any) => 
      apiCall<any>('/api/settings', {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    onSuccess: (data) => {
      // Update local state
      updateSettings(data)
      
      // Invalidate settings query
      queryClient.invalidateQueries({ queryKey: ['settings'] })
    },
  })
}

export const useCreateDream = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: any) => 
      apiCall<any>('/api/dreams', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: (data, variables) => {
      // Invalidate dreams query
      queryClient.invalidateQueries({ queryKey: queryKeys.dreams(variables.userId) })
    },
  })
}

export const useUpdateDream = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ dreamId, data }: { dreamId: string; data: any }) => 
      apiCall<any>(`/api/dreams/${dreamId}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    onSuccess: (data, variables) => {
      // Invalidate dreams query
      queryClient.invalidateQueries({ queryKey: queryKeys.dreams(variables.data.userId) })
    },
  })
}

export const useDeleteDream = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (dreamId: string) => 
      apiCall<any>(`/api/dreams/${dreamId}`, {
        method: 'DELETE',
      }),
    onSuccess: (data, dreamId) => {
      // Invalidate dreams query
      queryClient.invalidateQueries({ queryKey: ['dreams'] })
    },
  })
}

// Admin Hooks
export const useAdminUsers = () => {
  return useQuery({
    queryKey: queryKeys.adminUsers,
    queryFn: () => apiCall<any[]>('/api/admin/users'),
    enabled: useAppStore.getState().user?.role === 'admin',
  })
}

export const useAdminStats = () => {
  return useQuery({
    queryKey: queryKeys.adminStats,
    queryFn: () => apiCall<any>('/api/admin/stats'),
    enabled: useAppStore.getState().user?.role === 'admin',
  })
}

export const useAdminAnalytics = () => {
  return useQuery({
    queryKey: queryKeys.adminAnalytics,
    queryFn: () => apiCall<any>('/api/admin/analytics'),
    enabled: useAppStore.getState().user?.role === 'admin',
  })
}
