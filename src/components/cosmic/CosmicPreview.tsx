/**
 * Cosmic Theme Preview Component
 * Front-end Design System Expert + UI/UX Engineer
 * 
 * Preview layout showcasing the cosmic theme components
 * Demonstrates the modern cosmic design system
 */

import React from 'react'
import CosmicButton from './CosmicButton'
import CosmicCard from './CosmicCard'
import CosmicInput from './CosmicInput'
import CosmicLayout from './CosmicLayout'

const CosmicPreview: React.FC = () => {
  return (
    <CosmicLayout variant="nebula" size="lg" background="nebula">
      <div className="cosmic-container max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold cosmic-text-gradient mb-4 cosmic-animate-fade-in">
            Daily Secrets
          </h1>
          <p className="text-xl text-cosmic-text-secondary cosmic-animate-slide-up">
            Modern Cosmic Theme Preview
          </p>
        </div>

        {/* Buttons Section */}
        <CosmicCard variant="glass" size="lg" className="mb-8">
          <h2 className="text-2xl font-semibold text-cosmic-gold mb-6">Cosmic Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <CosmicButton variant="primary" size="md">
              Primary Button
            </CosmicButton>
            <CosmicButton variant="secondary" size="md">
              Secondary Button
            </CosmicButton>
            <CosmicButton variant="ghost" size="md">
              Ghost Button
            </CosmicButton>
            <CosmicButton variant="premium" size="md">
              Premium Button
            </CosmicButton>
          </div>
        </CosmicCard>

        {/* Cards Section */}
        <div className="cosmic-grid cosmic-grid-3 mb-8">
          <CosmicCard variant="default" size="md" glow>
            <h3 className="text-lg font-semibold text-cosmic-gold mb-3">Default Card</h3>
            <p className="text-cosmic-text-secondary">
              This is a default cosmic card with subtle glow effects and smooth transitions.
            </p>
          </CosmicCard>

          <CosmicCard variant="glass" size="md" floating>
            <h3 className="text-lg font-semibold text-cosmic-blue mb-3">Glass Card</h3>
            <p className="text-cosmic-text-secondary">
              This is a glass card with backdrop blur and floating animation.
            </p>
          </CosmicCard>

          <CosmicCard variant="premium" size="md" glow>
            <h3 className="text-lg font-semibold text-cosmic-gold mb-3">Premium Card</h3>
            <p className="text-cosmic-text-secondary">
              This is a premium card with gold accents and cosmic glow effects.
            </p>
          </CosmicCard>
        </div>

        {/* Inputs Section */}
        <CosmicCard variant="nebula" size="lg" className="mb-8">
          <h2 className="text-2xl font-semibold text-cosmic-gold mb-6">Cosmic Inputs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CosmicInput
              variant="default"
              size="md"
              label="Default Input"
              placeholder="Enter your text here"
              helperText="This is a default cosmic input"
            />
            <CosmicInput
              variant="glass"
              size="md"
              label="Glass Input"
              placeholder="Glass effect input"
              helperText="This input has a glass effect"
            />
            <CosmicInput
              variant="premium"
              size="md"
              label="Premium Input"
              placeholder="Premium gold input"
              helperText="This input has premium styling"
            />
            <CosmicInput
              variant="default"
              size="md"
              label="Error Input"
              placeholder="This input has an error"
              error
              errorMessage="This field is required"
            />
          </div>
        </CosmicCard>

        {/* Features Grid */}
        <div className="cosmic-grid cosmic-grid-2 mb-8">
          <CosmicCard variant="premium" size="lg" glow>
            <div className="text-center">
              <div className="w-16 h-16 bg-cosmic-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-cosmic-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-cosmic-gold mb-2">Astrology</h3>
              <p className="text-cosmic-text-secondary">
                Advanced astrology calculations with cosmic precision and beautiful visualizations.
              </p>
            </div>
          </CosmicCard>

          <CosmicCard variant="glass" size="lg" floating>
            <div className="text-center">
              <div className="w-16 h-16 bg-cosmic-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-cosmic-blue" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-cosmic-blue mb-2">Numerology</h3>
              <p className="text-cosmic-text-secondary">
                Deep numerology insights with cosmic energy and spiritual guidance.
              </p>
            </div>
          </CosmicCard>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-cosmic-text-muted">
            ✨ Modern Cosmic Theme by Daily Secrets ✨
          </p>
        </div>
      </div>
    </CosmicLayout>
  )
}

export default CosmicPreview
