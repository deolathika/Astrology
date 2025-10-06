/**
 * Cosmic Theme Preview Page
 * Front-end Design System Expert + UI/UX Engineer
 * 
 * Preview page showcasing the cosmic theme components
 * Demonstrates the modern cosmic design system
 */

import React from 'react'
import Card from '@/components/readdy/Card'

export default function CosmicPreviewPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <Card className="p-8 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Cosmic Preview</h1>
        <p className="text-gray-300">This page is under development.</p>
      </Card>
    </div>
  )
}

