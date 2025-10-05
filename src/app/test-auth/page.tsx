'use client'

import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

export default function TestAuthPage() {
  const { data: session, status } = useSession()

  useEffect(() => {
    console.log('Session status:', status)
    console.log('Session data:', session)
  }, [session, status])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading session...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 flex items-center justify-center p-8">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-white mb-6">Authentication Test</h1>
        
        <div className="space-y-4">
          <div className="bg-white/5 rounded-lg p-4">
            <h2 className="text-xl font-semibold text-white mb-2">Session Status</h2>
            <p className="text-violet-200">{status}</p>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4">
            <h2 className="text-xl font-semibold text-white mb-2">Session Data</h2>
            <pre className="text-violet-200 text-sm overflow-auto">
              {JSON.stringify(session, null, 2)}
            </pre>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4">
            <h2 className="text-xl font-semibold text-white mb-2">Next Steps</h2>
            <p className="text-violet-200">
              If you see this page without errors, the SessionProvider is working correctly!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}