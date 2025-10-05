import { useQuery } from '@tanstack/react-query'

const apiCall = async <T>(url: string): Promise<T> => {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Network error' }))
    throw new Error(error.error || `HTTP ${response.status}`)
  }

  return response.json()
}

export function useDashboard(userId: string) {
  return useQuery({
    queryKey: ['dashboard', userId],
    queryFn: () => apiCall<any>(`/api/dashboard/personalized?userId=${userId}`),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
