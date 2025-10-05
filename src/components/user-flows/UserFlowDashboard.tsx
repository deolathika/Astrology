'use client'

import React from 'react'
import Link from 'next/link'

interface UserFlowDashboardProps {
  user: any
}

export default function UserFlowDashboard({ user }: UserFlowDashboardProps) {
  const getUserFeatures = (role: string) => {
    switch (role) {
      case 'admin':
        return {
          title: 'Admin Dashboard',
          description: 'Full system access and management capabilities',
          features: [
            {
              icon: '👥',
              title: 'User Management',
              description: 'Manage all users, roles, and permissions',
              link: '/admin/users',
              color: 'from-red-500 to-pink-500'
            },
            {
              icon: '📊',
              title: 'System Analytics',
              description: 'View comprehensive system metrics and usage data',
              link: '/admin/analytics',
              color: 'from-blue-500 to-cyan-500'
            },
            {
              icon: '⚙️',
              title: 'System Configuration',
              description: 'Configure application settings and parameters',
              link: '/admin/settings',
              color: 'from-purple-500 to-indigo-500'
            },
            {
              icon: '🔧',
              title: 'Content Management',
              description: 'Manage cosmic content and user-generated data',
              link: '/admin/content',
              color: 'from-green-500 to-emerald-500'
            },
            {
              icon: '🧪',
              title: 'QA Testing',
              description: 'Test and validate cosmic calculations and features',
              link: '/admin/testing',
              color: 'from-yellow-500 to-orange-500'
            },
            {
              icon: '🎯',
              title: 'Accuracy Enhancement',
              description: 'Improve cosmic calculation accuracy and algorithms',
              link: '/admin/accuracy',
              color: 'from-teal-500 to-blue-500'
            }
          ]
        }
      
      case 'premium':
        return {
          title: 'Premium Dashboard',
          description: 'Enhanced cosmic features and unlimited access',
          features: [
            {
              icon: '🔮',
              title: 'Advanced Astrology',
              description: 'Detailed natal charts, transits, and cosmic insights',
              link: '/premium/astrology',
              color: 'from-purple-500 to-pink-500'
            },
            {
              icon: '🔢',
              title: 'Advanced Numerology',
              description: 'Comprehensive life path and destiny analysis',
              link: '/premium/numerology',
              color: 'from-blue-500 to-cyan-500'
            },
            {
              icon: '💭',
              title: 'AI Dream Analysis',
              description: 'Advanced AI-powered dream interpretation',
              link: '/premium/dreams',
              color: 'from-indigo-500 to-purple-500'
            },
            {
              icon: '💕',
              title: 'Compatibility Reports',
              description: 'Detailed relationship and compatibility analysis',
              link: '/premium/compatibility',
              color: 'from-pink-500 to-rose-500'
            },
            {
              icon: '📅',
              title: 'Personalized Calendar',
              description: 'Custom cosmic calendar with personalized insights',
              link: '/premium/calendar',
              color: 'from-green-500 to-emerald-500'
            },
            {
              icon: '🎯',
              title: 'Expert Consultations',
              description: 'One-on-one sessions with cosmic experts',
              link: '/premium/consultations',
              color: 'from-yellow-500 to-orange-500'
            },
            {
              icon: '📈',
              title: 'Unlimited Usage',
              description: 'No limits on cosmic insights and calculations',
              link: '/premium/insights',
              color: 'from-teal-500 to-blue-500'
            },
            {
              icon: '📊',
              title: 'Data Export',
              description: 'Export your cosmic data and insights',
              link: '/premium/export',
              color: 'from-gray-500 to-slate-500'
            }
          ]
        }
      
      case 'user':
      default:
        return {
          title: 'User Dashboard',
          description: 'Basic cosmic features and daily insights',
          features: [
            {
              icon: '🌅',
              title: 'Daily Insights',
              description: '3 daily cosmic insights and guidance',
              link: '/user/insights',
              color: 'from-yellow-500 to-orange-500'
            },
            {
              icon: '🔢',
              title: 'Basic Numerology',
              description: 'Life path number and basic numerological insights',
              link: '/user/numerology',
              color: 'from-blue-500 to-cyan-500'
            },
            {
              icon: '♈',
              title: 'Zodiac Information',
              description: 'Your zodiac sign and basic astrological info',
              link: '/user/zodiac',
              color: 'from-purple-500 to-pink-500'
            },
            {
              icon: '👥',
              title: 'Community Access',
              description: 'Connect with other cosmic enthusiasts',
              link: '/user/community',
              color: 'from-green-500 to-emerald-500'
            }
          ]
        }
    }
  }

  const userFeatures = getUserFeatures(user.role)

  return (
    <div className="space-y-8">
      {/* User Role Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">
          {userFeatures.title}
        </h2>
        <p className="text-white/70 text-lg">
          {userFeatures.description}
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userFeatures.features.map((feature, index) => (
          <div
            key={index}
            className="minimal-card minimal-scale-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="text-center">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="minimal-feature-title mb-3">
                {feature.title}
              </h3>
              <p className="minimal-feature-description mb-4">
                {feature.description}
              </p>
              <Link
                href={feature.link}
                className={`minimal-btn minimal-btn-primary w-full bg-gradient-to-r ${feature.color} hover:opacity-90 transition-all duration-300`}
              >
                Access Feature
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Role-specific additional info */}
      {user.role === 'premium' && (
        <div className="minimal-card mt-8">
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-4">✨ Premium Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white/80">
              <div>• Unlimited daily insights</div>
              <div>• Advanced cosmic calculations</div>
              <div>• Priority customer support</div>
              <div>• Exclusive cosmic content</div>
              <div>• Data export capabilities</div>
              <div>• Expert consultation access</div>
            </div>
          </div>
        </div>
      )}

      {user.role === 'admin' && (
        <div className="minimal-card mt-8">
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-4">🔧 Admin Capabilities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white/80">
              <div>• Full user management system</div>
              <div>• System performance monitoring</div>
              <div>• Content moderation tools</div>
              <div>• Advanced analytics dashboard</div>
              <div>• System configuration panel</div>
              <div>• Quality assurance tools</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

