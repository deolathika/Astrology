'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Star, ArrowLeft, Home } from 'lucide-react'

export function AuthNavigation() {
  const pathname = usePathname()

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 p-4">
      <div className="flex items-center justify-between">
        <Link 
          href="/" 
          className="flex items-center space-x-2 text-slate-700 hover:text-violet-600 transition-colors"
        >
          <Star className="w-6 h-6" />
          <span className="font-bold text-lg">Daily Secrets</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          {pathname !== '/auth/login' && (
            <Link 
              href="/auth/login"
              className="text-slate-600 hover:text-violet-600 transition-colors flex items-center space-x-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Login</span>
            </Link>
          )}
          
          <Link 
            href="/"
            className="text-slate-600 hover:text-violet-600 transition-colors flex items-center space-x-1"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
