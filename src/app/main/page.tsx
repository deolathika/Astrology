'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { UltimateAppLayout } from '@/components/layouts/UltimateAppLayout'
import { UltimateDashboard } from '@/components/dashboard/UltimateDashboard'

export default function MainDashboard() {
  const [user, setUser] = useState<any>(null)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      router.push('/')
    }
  }, [router])

  if (!mounted || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <UltimateAppLayout user={user}>
      <UltimateDashboard user={user} />
    </UltimateAppLayout>
  )
}