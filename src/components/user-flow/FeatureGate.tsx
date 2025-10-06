/**
 * Feature Gate Component
 * Full-Stack Engineer + UX Flow Designer
 * 
 * Controls access to premium features with upgrade prompts
 */

import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { userFlowManager } from '@/lib/user-flow/UserFlowManager'
import Button from '@/components/readdy/Button'
import Card from '@/components/readdy/Card'

interface FeatureGateProps {
  feature: string
  children: React.ReactNode
  fallback?: React.ReactNode
  showUpgradePrompt?: boolean
}

export const FeatureGate: React.FC<FeatureGateProps> = ({
  feature,
  children,
  fallback,
  showUpgradePrompt = true
}) => {
  const { data: session } = useSession()
  const [showModal, setShowModal] = useState(false)
  
  const userRole = session?.user?.role || 'guest'
  const canAccess = userFlowManager.canAccessFeature(userRole, feature)
  const needsUpgrade = userFlowManager.needsUpgrade(userRole, feature)
  const teaser = userFlowManager.getFeatureTeaser(feature)

  // If user can access feature, show content
  if (canAccess) {
    return <>{children}</>
  }

  // If user needs upgrade and we should show prompt
  if (needsUpgrade && showUpgradePrompt) {
    return (
      <>
        {fallback || (
          <div className="relative">
            {/* Blurred content overlay */}
            <div className="filter blur-sm pointer-events-none">
              {children}
            </div>
            
            {/* Upgrade prompt overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <Card variant="premium" size="md" className="max-w-md mx-4">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-cosmic-gold mb-2">
                    {teaser.title}
                  </h3>
                  <p className="text-cosmic-text-secondary mb-4">
                    {teaser.description}
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    {teaser.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center text-sm text-cosmic-text-secondary">
                        <span className="w-2 h-2 bg-cosmic-gold rounded-full mr-3"></span>
                        {benefit}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex gap-3">
                    <Button
                      variant="premium"
                      size="md"
                      onClick={() => setShowModal(true)}
                    >
                      {teaser.cta}
                    </Button>
                    <Button
                      variant="ghost"
                      size="md"
                      onClick={() => setShowModal(false)}
                    >
                      Maybe Later
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
        
        {/* Upgrade Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card variant="premium" size="lg" className="max-w-2xl">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-cosmic-gold mb-4">
                  Upgrade to Premium
                </h2>
                <p className="text-cosmic-text-secondary mb-6">
                  Unlock all cosmic features and get unlimited access to your spiritual journey.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-cosmic-gold mb-3">
                      Premium Features
                    </h3>
                    <ul className="space-y-2 text-sm text-cosmic-text-secondary">
                      <li>• Unlimited daily insights</li>
                      <li>• AI dream analysis</li>
                      <li>• Cosmic AI chat</li>
                      <li>• Premium dashboard</li>
                      <li>• PDF report export</li>
                      <li>• Social story creation</li>
                      <li>• Full compatibility reports</li>
                    </ul>
                  </div>
                  
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-cosmic-gold mb-3">
                      Pricing
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-cosmic-bg-glass rounded-lg">
                        <span className="text-cosmic-text-secondary">Monthly</span>
                        <span className="text-cosmic-gold font-bold">$9.99</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-cosmic-bg-glass rounded-lg">
                        <span className="text-cosmic-text-secondary">Yearly</span>
                        <span className="text-cosmic-gold font-bold">$99.99</span>
                        <span className="text-xs text-cosmic-blue">Save 17%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3 justify-center">
                  <Button
                    variant="premium"
                    size="lg"
                    onClick={() => {
                      // Handle upgrade logic
                      window.location.href = '/subscription'
                    }}
                  >
                    Upgrade Now
                  </Button>
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </>
    )
  }

  // If user cannot access and no upgrade prompt, show fallback
  return <>{fallback || <div>Feature not available</div>}</>
}

export default FeatureGate

