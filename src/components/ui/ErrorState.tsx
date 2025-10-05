'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  AlertCircle, 
  RefreshCw, 
  Wifi, 
  WifiOff,
  Server,
  Database,
  Shield,
  Sparkles
} from 'lucide-react'
import CosmicButton from '@/components/cosmic/CosmicButton'
import { cn } from '@/lib/utils'

interface ErrorStateProps {
  title?: string
  description?: string
  error?: Error | string
  onRetry?: () => void
  showRetry?: boolean
  className?: string
}

const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  description = 'We encountered an error while loading your data.',
  error,
  onRetry,
  showRetry = true,
  className
}) => {
  const [isRetrying, setIsRetrying] = useState(false)

  const handleRetry = async () => {
    if (!onRetry) return
    
    setIsRetrying(true)
    try {
      await onRetry()
    } finally {
      setIsRetrying(false)
    }
  }

  const getErrorIcon = (error: Error | string | undefined) => {
    if (typeof error === 'string') {
      if (error.includes('network') || error.includes('fetch')) {
        return <WifiOff className="w-8 h-8 text-red-400" />
      }
      if (error.includes('server') || error.includes('500')) {
        return <Server className="w-8 h-8 text-red-400" />
      }
      if (error.includes('database') || error.includes('connection')) {
        return <Database className="w-8 h-8 text-red-400" />
      }
    }
    return <AlertCircle className="w-8 h-8 text-red-400" />
  }

  const getErrorType = (error: Error | string | undefined) => {
    if (typeof error === 'string') {
      if (error.includes('network') || error.includes('fetch')) {
        return 'Network Error'
      }
      if (error.includes('server') || error.includes('500')) {
        return 'Server Error'
      }
      if (error.includes('database') || error.includes('connection')) {
        return 'Database Error'
      }
    }
    return 'Unknown Error'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex flex-col items-center justify-center p-8 space-y-4 text-center",
        className
      )}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-16 h-16 bg-red-900/20 rounded-full flex items-center justify-center mb-4"
      >
        {getErrorIcon(error)}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-2"
      >
        <h3 className="text-lg font-semibold text-red-400">{title}</h3>
        <p className="text-violet-400 max-w-md">{description}</p>
        
        {error && (
          <div className="mt-4 p-3 bg-red-900/20 rounded-lg border border-red-700/50">
            <p className="text-sm text-red-300 font-medium">
              {getErrorType(error)}
            </p>
            <p className="text-xs text-red-400 mt-1">
              {typeof error === 'string' ? error : error.message}
            </p>
          </div>
        )}
      </motion.div>
      
      {showRetry && onRetry && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex space-x-3"
        >
          <CosmicButton
            onClick={handleRetry}
            variant="primary"
            size="md"
            icon={<RefreshCw className={cn("w-4 h-4", isRetrying && "animate-spin")} />}
            disabled={isRetrying}
          >
            {isRetrying ? 'Retrying...' : 'Try Again'}
          </CosmicButton>
          
          <CosmicButton
            onClick={() => window.location.reload()}
            variant="ghost"
            size="md"
            icon={<Shield className="w-4 h-4" />}
          >
            Reload Page
          </CosmicButton>
        </motion.div>
      )}
    </motion.div>
  )
}

export default ErrorState
