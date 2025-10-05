'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import CosmicNebulaBackground from '@/components/cosmic/CosmicNebulaBackground'
import { useQuery } from '@tanstack/react-query'

export default function UserCompatibilityPage() {
  const [user, setUser] = useState<any>(null)
  const [mounted, setMounted] = useState(false)
  const [partnerName, setPartnerName] = useState('')
  const [partnerBirthDate, setPartnerBirthDate] = useState('')
  const [isCalculating, setIsCalculating] = useState(false)
  const [compatibilityResult, setCompatibilityResult] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      if (userData.role !== 'user') {
        router.push('/main')
        return
      }
      setUser(userData)
    } else {
      router.push('/')
    }
  }, [router])

  const handleCompatibilityCheck = async () => {
    if (!partnerName || !partnerBirthDate) {
      alert('Please fill in both partner name and birth date')
      return
    }

    setIsCalculating(true)
    try {
      const response = await fetch('/api/user/compatibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          partnerName: partnerName,
          partnerBirthDate: partnerBirthDate
        })
      })
      
      if (!response.ok) throw new Error('Failed to check compatibility')
      const data = await response.json()
      setCompatibilityResult(data.data)
    } catch (error) {
      console.error('Compatibility check error:', error)
      alert('Failed to check compatibility. Please try again.')
    } finally {
      setIsCalculating(false)
    }
  }

  if (!mounted || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center cosmic-minimalist-modern-bg">
        <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen cosmic-minimalist-modern-bg relative overflow-hidden">
      <CosmicNebulaBackground />

      {/* Navigation */}
      <nav className="cosmic-nav-minimalist-modern fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/user" className="logo">
                Daily Secrets
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-white/80">Welcome, {user.name || user.email}</span>
              <button
                onClick={() => {
                  localStorage.removeItem('user')
                  router.push('/')
                }}
                className="cosmic-btn-minimalist-modern"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-12 fade-in-minimalist-modern">
            <h1 className="cosmic-hero-title-minimalist-modern">
              Compatibility Check
            </h1>
            <p className="cosmic-hero-subtitle-minimalist-modern">
              Discover your cosmic connection with someone special
            </p>
          </div>

          {/* Compatibility Form */}
          <div className="cosmic-card-minimalist-modern p-6">
            <h2 className="card-title mb-6">Enter Partner Details</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Partner's Name
                </label>
                <input
                  type="text"
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  placeholder="Enter partner's name"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Partner's Birth Date
                </label>
                <input
                  type="date"
                  value={partnerBirthDate}
                  onChange={(e) => setPartnerBirthDate(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <button
                onClick={handleCompatibilityCheck}
                disabled={isCalculating || !partnerName || !partnerBirthDate}
                className="w-full cosmic-btn-minimalist-modern disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCalculating ? 'Calculating Compatibility...' : 'Check Compatibility'}
              </button>
            </div>

            {/* Compatibility Results */}
            {compatibilityResult && (
              <div className="mt-8 p-6 bg-white/5 rounded-lg border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-4">Compatibility Results</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl mb-2">💕</div>
                    <h4 className="font-semibold text-white mb-2">Overall Compatibility</h4>
                    <div className="text-3xl font-bold text-pink-400 mb-2">
                      {compatibilityResult.overallScore || '85%'}
                    </div>
                    <p className="text-sm text-white/80">
                      {compatibilityResult.overallDescription || 'Great cosmic connection!'}
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-4xl mb-2">⚡</div>
                    <h4 className="font-semibold text-white mb-2">Energy Match</h4>
                    <div className="text-3xl font-bold text-yellow-400 mb-2">
                      {compatibilityResult.energyMatch || 'High'}
                    </div>
                    <p className="text-sm text-white/80">
                      {compatibilityResult.energyDescription || 'Strong energetic connection'}
                    </p>
                  </div>
                </div>
                
                {compatibilityResult.insights && (
                  <div className="mt-6">
                    <h4 className="font-semibold text-white mb-3">Cosmic Insights</h4>
                    <div className="space-y-2 text-sm text-white/80">
                      {compatibilityResult.insights.map((insight: string, index: number) => (
                        <div key={index} className="flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          <span>{insight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Back to Dashboard */}
            <div className="mt-8 text-center">
              <Link href="/user" className="cosmic-btn-minimalist-modern">
                ← Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="cosmic-footer-minimalist-modern relative z-20 mt-12">
        <p>&copy; {new Date().getFullYear()} Daily Secrets. All rights reserved.</p>
      </footer>
    </div>
  )
}

