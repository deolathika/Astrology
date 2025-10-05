'use client'

import React from 'react'
import { useAppStore } from '@/lib/stores/app-store'
import { Button } from '@/components/atoms/Button'
import { Badge } from '@/components/atoms/Badge'
import { trackEvent } from '@/lib/monitoring/analytics'

interface WorkflowStep {
  id: string
  title: string
  description: string
  icon: string
  completed: boolean
  action?: () => void
  href?: string
}

interface UserWorkflowProps {
  userRole: string
  onStepComplete: (stepId: string) => void
}

export function UserWorkflow({ userRole, onStepComplete }: UserWorkflowProps) {
  const { user, profile } = useAppStore()

  // Define workflows based on user role
  const getWorkflowSteps = (role: string): WorkflowStep[] => {
    const baseSteps: WorkflowStep[] = [
      {
        id: 'profile-setup',
        title: 'Complete Your Profile',
        description: 'Add your birth details for personalized readings',
        icon: '👤',
        completed: !!profile,
        href: '/profile/setup'
      },
      {
        id: 'first-reading',
        title: 'Get Your First Reading',
        description: 'Discover your cosmic blueprint with astrology or numerology',
        icon: '🔮',
        completed: false,
        href: '/astrology'
      },
      {
        id: 'dream-journal',
        title: 'Start Dream Journal',
        description: 'Record your first dream for interpretation',
        icon: '🌙',
        completed: false,
        href: '/dreams'
      }
    ]

    switch (role) {
      case 'admin':
        return [
          ...baseSteps,
          {
            id: 'admin-dashboard',
            title: 'Access Admin Panel',
            description: 'Manage users, content, and system settings',
            icon: '⚙️',
            completed: false,
            href: '/admin'
          },
          {
            id: 'analytics-review',
            title: 'Review Analytics',
            description: 'Monitor user engagement and system performance',
            icon: '📊',
            completed: false,
            href: '/admin/analytics'
          }
        ]
      
      case 'premium':
        return [
          ...baseSteps,
          {
            id: 'advanced-readings',
            title: 'Access Advanced Readings',
            description: 'Unlock premium astrology and numerology features',
            icon: '⭐',
            completed: false,
            href: '/premium'
          },
          {
            id: 'compatibility-matching',
            title: 'Find Cosmic Matches',
            description: 'Discover compatible partners based on cosmic data',
            icon: '💫',
            completed: false,
            href: '/matches'
          }
        ]
      
      case 'user':
      default:
        return [
          ...baseSteps,
          {
            id: 'explore-features',
            title: 'Explore All Features',
            description: 'Try different cosmic tools and readings',
            icon: '🌟',
            completed: false,
            href: '/explore'
          },
          {
            id: 'upgrade-account',
            title: 'Consider Premium',
            description: 'Unlock advanced features and unlimited readings',
            icon: '💎',
            completed: false,
            href: '/pricing'
          }
        ]
    }
  }

  const workflowSteps = getWorkflowSteps(userRole)
  const completedSteps = workflowSteps.filter(step => step.completed).length
  const totalSteps = workflowSteps.length
  const progressPercentage = (completedSteps / totalSteps) * 100

  const handleStepClick = (step: WorkflowStep) => {
    trackEvent('workflow_step_clicked', {
      step_id: step.id,
      user_role: userRole,
      user_id: user?.id
    })
    
    if (step.href) {
      window.location.href = step.href
    } else if (step.action) {
      step.action()
    }
  }

  return (
    <div className="bg-card p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-primary">Your Cosmic Journey</h2>
          <p className="text-muted-foreground">
            Complete these steps to unlock your full cosmic potential
          </p>
        </div>
        <Badge variant="secondary" className="text-sm">
          {completedSteps}/{totalSteps} Complete
        </Badge>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Progress</span>
          <span>{Math.round(progressPercentage)}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-electric-violet to-cosmic-purple h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Workflow Steps */}
      <div className="space-y-4">
        {workflowSteps.map((step, index) => (
          <div
            key={step.id}
            className={`flex items-center p-4 rounded-lg border transition-all duration-200 ${
              step.completed
                ? 'bg-green-50 border-green-200 text-green-800'
                : 'bg-muted/50 border-border hover:bg-muted cursor-pointer'
            }`}
            onClick={() => !step.completed && handleStepClick(step)}
          >
            <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
              <span className="text-2xl">{step.icon}</span>
            </div>
            
            <div className="flex-grow">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{step.title}</h3>
                {step.completed && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    ✓ Complete
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
            </div>

            {!step.completed && (
              <div className="flex-shrink-0 ml-4">
                <Button variant="outline" size="sm">
                  {step.href ? 'Go' : 'Start'}
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Role-specific tips */}
      <div className="mt-6 p-4 bg-gradient-to-r from-celestial-blue/10 to-cosmic-cyan/10 rounded-lg">
        <h4 className="font-semibold text-primary mb-2">
          {userRole === 'admin' && 'Admin Tips'}
          {userRole === 'premium' && 'Premium Benefits'}
          {userRole === 'user' && 'Getting Started Tips'}
        </h4>
        <p className="text-sm text-muted-foreground">
          {userRole === 'admin' && 'Use the admin panel to monitor system health, manage users, and review analytics for insights.'}
          {userRole === 'premium' && 'You have access to advanced readings, unlimited dream interpretations, and priority support.'}
          {userRole === 'user' && 'Start with your profile setup, then explore basic readings before considering premium features.'}
        </p>
      </div>
    </div>
  )
}

