'use client'

import { useState } from 'react'

export default function TestSimplePage() {
  const [message, setMessage] = useState('Testing...')

  return (
    <div className="min-h-screen bg-deep-space flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Simple Test Page</h1>
        <p className="text-gray-300 mb-4">{message}</p>
        <button 
          onClick={() => setMessage('Button clicked!')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Click Me
        </button>
      </div>
    </div>
  )
}

