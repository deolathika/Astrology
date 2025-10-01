'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { AlertCircle, ArrowLeft, Home, RefreshCw } from 'lucide-react'

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'Configuration':
        return {
          title: 'Server Configuration Error',
          message: 'There is a problem with the server configuration. Please try again later.',
          icon: AlertCircle
        }
      case 'AccessDenied':
        return {
          title: 'Access Denied',
          message: 'You do not have permission to sign in.',
          icon: AlertCircle
        }
      case 'Verification':
        return {
          title: 'Verification Error',
          message: 'The verification token has expired or has already been used.',
          icon: AlertCircle
        }
      case 'OAuthSignin':
        return {
          title: 'OAuth Sign In Error',
          message: 'There was an error with the OAuth provider. Please try again.',
          icon: AlertCircle
        }
      case 'OAuthCallback':
        return {
          title: 'OAuth Callback Error',
          message: 'There was an error with the OAuth callback. Please try again.',
          icon: AlertCircle
        }
      case 'OAuthCreateAccount':
        return {
          title: 'Account Creation Error',
          message: 'Could not create account with OAuth provider. Please try again.',
          icon: AlertCircle
        }
      case 'EmailCreateAccount':
        return {
          title: 'Email Account Error',
          message: 'Could not create account with email. Please try again.',
          icon: AlertCircle
        }
      case 'Callback':
        return {
          title: 'Callback Error',
          message: 'There was an error with the callback. Please try again.',
          icon: AlertCircle
        }
      case 'OAuthAccountNotLinked':
        return {
          title: 'Account Not Linked',
          message: 'This email is already associated with another account. Please sign in with your original provider.',
          icon: AlertCircle
        }
      case 'EmailSignin':
        return {
          title: 'Email Sign In Error',
          message: 'There was an error sending the sign in email. Please try again.',
          icon: AlertCircle
        }
      case 'CredentialsSignin':
        return {
          title: 'Invalid Credentials',
          message: 'The email or password you entered is incorrect. Please try again.',
          icon: AlertCircle
        }
      case 'SessionRequired':
        return {
          title: 'Session Required',
          message: 'You must be signed in to access this page.',
          icon: AlertCircle
        }
      default:
        return {
          title: 'Authentication Error',
          message: 'An unexpected error occurred. Please try again.',
          icon: AlertCircle
        }
    }
  }

  const errorInfo = getErrorMessage(error)
  const Icon = errorInfo.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-2xl flex items-center justify-center">
            <Icon className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Authentication Error</h1>
          <p className="text-slate-600">Something went wrong during sign in</p>
        </div>

        {/* Error Card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <div className="text-center mb-6">
            <div className="w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <Icon className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">{errorInfo.title}</h2>
            <p className="text-slate-600">{errorInfo.message}</p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <motion.button
              onClick={() => window.location.reload()}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Try Again
            </motion.button>

            <Link
              href="/auth/signin"
              className="w-full bg-slate-100 text-slate-700 py-3 px-6 rounded-lg font-semibold hover:bg-slate-200 transition-all duration-200 flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Sign In
            </Link>

            <Link
              href="/"
              className="w-full bg-slate-50 text-slate-600 py-3 px-6 rounded-lg font-medium hover:bg-slate-100 transition-all duration-200 flex items-center justify-center"
            >
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </Link>
          </div>

          {/* Error Details */}
          {error && (
            <div className="mt-6 p-4 bg-slate-50 rounded-lg">
              <h3 className="text-sm font-medium text-slate-700 mb-2">Error Code:</h3>
              <code className="text-sm text-slate-600 bg-slate-100 px-2 py-1 rounded">
                {error}
              </code>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}


