'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Inbox, 
  Star, 
  Moon, 
  Heart, 
  Brain, 
  MessageCircle, 
  Calendar,
  User,
  Settings,
  BarChart3,
  Sparkles
} from 'lucide-react'
import CosmicButton from '@/components/cosmic/CosmicButton'
import { cn } from '@/lib/utils'

interface EmptyStateProps {
  title?: string
  description?: string
  icon?: React.ReactNode
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No data found',
  description = 'There\'s nothing to show here yet.',
  icon,
  action,
  className
}) => {
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
        className="w-16 h-16 bg-violet-800/50 rounded-full flex items-center justify-center mb-4"
      >
        {icon || <Inbox className="w-8 h-8 text-violet-400" />}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-2"
      >
        <h3 className="text-lg font-semibold text-violet-200">{title}</h3>
        <p className="text-violet-400 max-w-md">{description}</p>
      </motion.div>
      
      {action && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <CosmicButton
            onClick={action.onClick}
            variant="primary"
            size="md"
            icon={<Sparkles className="w-4 h-4" />}
          >
            {action.label}
          </CosmicButton>
        </motion.div>
      )}
    </motion.div>
  )
}

export default EmptyState
