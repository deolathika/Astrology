'use client'

import { Component, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class OptimizedErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center p-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-16 h-16 mb-4 rounded-full bg-red-500/10 flex items-center justify-center"
          >
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </motion.div>
          
          <h2 className="text-xl font-semibold text-stellar-gray-light mb-2">
            Something went wrong
          </h2>
          
          <p className="text-stellar-gray-light/70 mb-6 max-w-md">
            We encountered an error while loading your cosmic guidance. 
            Don't worry, the stars are still aligned in your favor.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={this.handleRetry}
            className="flex items-center space-x-2 px-6 py-3 bg-electric-violet text-white rounded-lg hover:bg-electric-violet/80 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </motion.button>
          
          {this.state.error && (
            <details className="mt-4 text-left">
              <summary className="cursor-pointer text-stellar-gray-light/50 text-sm">
                Technical Details
              </summary>
              <pre className="mt-2 p-3 bg-cosmic-navy/30 rounded text-xs text-stellar-gray-light/70 overflow-auto">
                {this.state.error.message}
              </pre>
            </details>
          )}
        </motion.div>
      )
    }

    return this.props.children
  }
}
