'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

interface UseOptimizedFetchOptions {
  enabled?: boolean
  refetchInterval?: number
  cacheTime?: number
  retryCount?: number
}

interface FetchState<T> {
  data: T | null
  loading: boolean
  error: Error | null
  refetch: () => void
}

export function useOptimizedFetch<T>(
  url: string,
  options: UseOptimizedFetchOptions = {}
): FetchState<T> {
  const {
    enabled = true,
    refetchInterval,
    cacheTime = 300000, // 5 minutes
    retryCount = 3
  } = options

  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  
  const cacheRef = useRef<Map<string, { data: T; timestamp: number }>>(new Map())
  const retryCountRef = useRef(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const fetchData = useCallback(async () => {
    if (!enabled) return

    // Check cache first
    const cached = cacheRef.current.get(url)
    if (cached && Date.now() - cached.timestamp < cacheTime) {
      setData(cached.data)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      
      // Cache the result
      cacheRef.current.set(url, { data: result, timestamp: Date.now() })
      
      setData(result)
      retryCountRef.current = 0
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error')
      setError(error)
      
      // Retry logic
      if (retryCountRef.current < retryCount) {
        retryCountRef.current++
        setTimeout(() => {
          fetchData()
        }, Math.pow(2, retryCountRef.current) * 1000) // Exponential backoff
      }
    } finally {
      setLoading(false)
    }
  }, [url, enabled, cacheTime, retryCount])

  const refetch = useCallback(() => {
    retryCountRef.current = 0
    cacheRef.current.delete(url)
    fetchData()
  }, [url, fetchData])

  useEffect(() => {
    if (enabled) {
      fetchData()
    }

    // Set up interval refetch if specified
    if (refetchInterval && enabled) {
      intervalRef.current = setInterval(fetchData, refetchInterval)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [fetchData, enabled, refetchInterval])

  return {
    data,
    loading,
    error,
    refetch
  }
}
