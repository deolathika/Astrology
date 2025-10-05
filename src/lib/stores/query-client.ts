/**
 * React Query Client Configuration
 * Centralized query client setup for server state management
 */

import { QueryClient } from '@tanstack/react-query'

// Query client configuration
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache time
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes (formerly cacheTime)
      
      // Retry configuration
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors
        if (error?.status >= 400 && error?.status < 500) {
          return false
        }
        // Retry up to 3 times for other errors
        return failureCount < 3
      },
      
      // Refetch configuration
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: true,
    },
    mutations: {
      // Retry mutations once on failure
      retry: 1,
    },
  },
})

// Query keys for consistent caching
export const queryKeys = {
  // User queries
  user: ['user'] as const,
  userProfile: (userId: string) => ['user', userId, 'profile'] as const,
  userSettings: (userId: string) => ['user', userId, 'settings'] as const,
  
  // Profile queries
  profile: (userId: string) => ['profile', userId] as const,
  profiles: ['profiles'] as const,
  
  // Astrology queries
  astrologyReadings: (userId: string, type?: string) => 
    ['astrology', userId, type].filter(Boolean),
  natalChart: (userId: string) => ['astrology', userId, 'natal'] as const,
  transits: (userId: string) => ['astrology', userId, 'transits'] as const,
  
  // Numerology queries
  numerologyReadings: (userId: string, type?: string) => 
    ['numerology', userId, type].filter(Boolean),
  numerologyCore: (userId: string) => ['numerology', userId, 'core'] as const,
  
  // Dashboard queries
  dashboard: (userId: string) => ['dashboard', userId] as const,
  personalizedDashboard: (userId: string) => ['dashboard', userId, 'personalized'] as const,
  
  // Dreams queries
  dreams: (userId: string) => ['dreams', userId] as const,
  dreamAnalysis: (userId: string, dreamId: string) => ['dreams', userId, dreamId] as const,
  
  // Matches queries
  matches: (userId: string) => ['matches', userId] as const,
  compatibility: (userId: string, partnerId: string) => ['compatibility', userId, partnerId] as const,
  
  // Notifications queries
  notifications: (userId: string) => ['notifications', userId] as const,
  
  // Analytics queries
  analytics: (userId: string) => ['analytics', userId] as const,
  userAnalytics: (userId: string) => ['analytics', userId, 'user'] as const,
  
  // Admin queries
  adminUsers: ['admin', 'users'] as const,
  adminStats: ['admin', 'stats'] as const,
  adminAnalytics: ['admin', 'analytics'] as const,
}

// Query invalidation helpers
export const invalidateQueries = {
  // User-related queries
  user: (userId: string) => {
    queryClient.invalidateQueries({ queryKey: queryKeys.userProfile(userId) })
    queryClient.invalidateQueries({ queryKey: queryKeys.userSettings(userId) })
  },
  
  // Profile-related queries
  profile: (userId: string) => {
    queryClient.invalidateQueries({ queryKey: queryKeys.profile(userId) })
    queryClient.invalidateQueries({ queryKey: queryKeys.dashboard(userId) })
  },
  
  // Astrology-related queries
  astrology: (userId: string) => {
    queryClient.invalidateQueries({ queryKey: queryKeys.astrologyReadings(userId) })
    queryClient.invalidateQueries({ queryKey: queryKeys.natalChart(userId) })
    queryClient.invalidateQueries({ queryKey: queryKeys.transits(userId) })
  },
  
  // Numerology-related queries
  numerology: (userId: string) => {
    queryClient.invalidateQueries({ queryKey: queryKeys.numerologyReadings(userId) })
    queryClient.invalidateQueries({ queryKey: queryKeys.numerologyCore(userId) })
  },
  
  // Dashboard queries
  dashboard: (userId: string) => {
    queryClient.invalidateQueries({ queryKey: queryKeys.dashboard(userId) })
    queryClient.invalidateQueries({ queryKey: queryKeys.personalizedDashboard(userId) })
  },
  
  // All user queries
  allUserQueries: (userId: string) => {
    queryClient.invalidateQueries({ queryKey: [userId] })
  }
}

// Prefetch helpers
export const prefetchQueries = {
  // Prefetch user profile
  userProfile: async (userId: string) => {
    await queryClient.prefetchQuery({
      queryKey: queryKeys.userProfile(userId),
      queryFn: () => fetch(`/api/users/profile`).then(res => res.json()),
      staleTime: 1000 * 60 * 10, // 10 minutes
    })
  },
  
  // Prefetch dashboard data
  dashboard: async (userId: string) => {
    await queryClient.prefetchQuery({
      queryKey: queryKeys.dashboard(userId),
      queryFn: () => fetch(`/api/dashboard/personalized`).then(res => res.json()),
      staleTime: 1000 * 60 * 5, // 5 minutes
    })
  }
}
