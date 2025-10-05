/**
 * 🌌 Daily Secrets - Guest Dashboard Page
 * Limited content access for guests with upgrade prompts
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  Calculator, 
  Heart, 
  Lock, 
  Sparkles,
  ArrowRight,
  Eye,
  EyeOff,
  Zap,
  Droplets,
  Wind,
  Leaf
} from 'lucide-react';

interface DailyInsight {
  id: string;
  type: 'astrology' | 'numerology' | 'quote';
  content: string;
  isPremium: boolean;
  zodiacSign?: string;
  lifePathNumber?: number;
}

interface GuestDashboardProps {
  user?: any;
  insights?: DailyInsight[];
  onSignUp?: () => void;
  onSignIn?: () => void;
  onUpgrade?: () => void;
}

const GuestDashboard: React.FC<GuestDashboardProps> = ({
  user,
  insights = [],
  onSignUp,
  onSignIn,
  onUpgrade
}) => {
  const [showPremiumContent, setShowPremiumContent] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState<DailyInsight | null>(null);
  const [mood, setMood] = useState<'fire' | 'water' | 'air' | 'earth'>('fire');

  // Sample insights for guests
  const sampleInsights: DailyInsight[] = [
    {
      id: '1',
      type: 'astrology',
      content: 'Today brings opportunities for growth and new beginnings. The cosmic energy supports your creative endeavors.',
      isPremium: false,
      zodiacSign: 'Gemini'
    },
    {
      id: '2',
      type: 'numerology',
      content: 'Your life path number reveals a natural ability to inspire others. Focus on your communication skills today.',
      isPremium: true,
      lifePathNumber: 3
    },
    {
      id: '3',
      type: 'quote',
      content: 'The stars whisper secrets to those who listen with their hearts.',
      isPremium: false
    }
  ];

  const displayInsights = insights.length > 0 ? insights : sampleInsights;

  // Mood icons
  const moodIcons = {
    fire: <Zap className="w-5 h-5" />,
    water: <Droplets className="w-5 h-5" />,
    air: <Wind className="w-5 h-5" />,
    earth: <Leaf className="w-5 h-5" />
  };

  // Handle insight click
  const handleInsightClick = (insight: DailyInsight) => {
    if (insight.isPremium) {
      setSelectedInsight(insight);
    } else {
      // Show full content for free insights
      setSelectedInsight(insight);
    }
  };

  // Handle upgrade prompt
  const handleUpgradePrompt = () => {
    onUpgrade?.();
  };

  return (
    <div className="guest-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <div className="welcome-section">
            <h1 className="welcome-title">
              Welcome to Daily Secrets
            </h1>
            <p className="welcome-subtitle">
              Discover your cosmic destiny with personalized astrology and numerology insights
            </p>
          </div>
          
          <div className="auth-actions">
            <button
              className="auth-button primary"
              onClick={onSignUp}
            >
              <Sparkles className="button-icon" />
              Sign Up Free
            </button>
            <button
              className="auth-button secondary"
              onClick={onSignIn}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>

      {/* Daily Insights */}
      <div className="insights-section">
        <div className="section-header">
          <h2 className="section-title">
            <Star className="title-icon" />
            Today's Cosmic Insights
          </h2>
          <div className="mood-indicator">
            {moodIcons[mood]}
            <span className="mood-text">{mood} Energy</span>
          </div>
        </div>

        <div className="insights-grid">
          {displayInsights.map((insight) => (
            <motion.div
              key={insight.id}
              className={`insight-card ${insight.isPremium ? 'premium' : 'free'}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleInsightClick(insight)}
            >
              <div className="insight-header">
                <div className="insight-type">
                  {insight.type === 'astrology' && <Star className="type-icon" />}
                  {insight.type === 'numerology' && <Calculator className="type-icon" />}
                  {insight.type === 'quote' && <Heart className="type-icon" />}
                  <span className="type-text">
                    {insight.type.charAt(0).toUpperCase() + insight.type.slice(1)}
                  </span>
                </div>
                {insight.isPremium && (
                  <div className="premium-badge">
                    <Lock className="badge-icon" />
                    Premium
                  </div>
                )}
              </div>

              <div className="insight-content">
                {insight.isPremium ? (
                  <div className="premium-content">
                    <div className="blurred-text">
                      {insight.content}
                    </div>
                    <div className="premium-overlay">
                      <Lock className="overlay-icon" />
                      <span className="overlay-text">Premium Content</span>
                    </div>
                  </div>
                ) : (
                  <div className="free-content">
                    {insight.content}
                  </div>
                )}
              </div>

              {insight.isPremium && (
                <div className="upgrade-prompt">
                  <button
                    className="upgrade-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUpgradePrompt();
                    }}
                  >
                    <ArrowRight className="button-icon" />
                    Upgrade to Unlock
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Feature Preview */}
      <div className="features-section">
        <div className="section-header">
          <h2 className="section-title">
            <Sparkles className="title-icon" />
            Unlock Your Cosmic Potential
          </h2>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <Star className="w-8 h-8" />
            </div>
            <h3 className="feature-title">Advanced Astrology</h3>
            <p className="feature-description">
              Complete birth chart analysis with multiple astrology systems
            </p>
            <div className="feature-benefits">
              <span className="benefit">Western Zodiac</span>
              <span className="benefit">Vedic Astrology</span>
              <span className="benefit">Chinese Zodiac</span>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Calculator className="w-8 h-8" />
            </div>
            <h3 className="feature-title">Numerology Mastery</h3>
            <p className="feature-description">
              Deep numerology insights with Pythagorean and Chaldean systems
            </p>
            <div className="feature-benefits">
              <span className="benefit">Life Path Numbers</span>
              <span className="benefit">Destiny Numbers</span>
              <span className="benefit">Master Numbers</span>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="feature-title">AI-Powered Insights</h3>
            <p className="feature-description">
              Personalized guidance powered by advanced AI technology
            </p>
            <div className="feature-benefits">
              <span className="benefit">Dream Analysis</span>
              <span className="benefit">Cosmic Chat</span>
              <span className="benefit">Personalized Reports</span>
            </div>
          </div>
        </div>
      </div>

      {/* Upgrade CTA */}
      <div className="upgrade-cta">
        <div className="cta-content">
          <h2 className="cta-title">
            Ready to Unlock Your Cosmic Destiny?
          </h2>
          <p className="cta-description">
            Join thousands of users who have discovered their true potential through Daily Secrets
          </p>
          <div className="cta-actions">
            <button
              className="cta-button primary"
              onClick={onSignUp}
            >
              <Sparkles className="button-icon" />
              Start Your Journey
            </button>
            <button
              className="cta-button secondary"
              onClick={onUpgrade}
            >
              View Premium Features
            </button>
          </div>
        </div>
      </div>

      {/* Insight Modal */}
      <AnimatePresence>
        {selectedInsight && (
          <motion.div
            className="insight-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedInsight(null)}
          >
            <motion.div
              className="insight-modal"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3 className="modal-title">
                  {selectedInsight.type.charAt(0).toUpperCase() + selectedInsight.type.slice(1)} Insight
                </h3>
                <button
                  className="modal-close"
                  onClick={() => setSelectedInsight(null)}
                >
                  ×
                </button>
              </div>
              
              <div className="modal-content">
                {selectedInsight.isPremium ? (
                  <div className="premium-modal-content">
                    <div className="premium-lock">
                      <Lock className="lock-icon" />
                      <h4>Premium Content</h4>
                      <p>This insight is available to premium members only.</p>
                      <button
                        className="upgrade-button"
                        onClick={onUpgrade}
                      >
                        <ArrowRight className="button-icon" />
                        Upgrade to Unlock
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="free-modal-content">
                    <p>{selectedInsight.content}</p>
                    {selectedInsight.zodiacSign && (
                      <div className="insight-meta">
                        <span className="meta-label">Zodiac Sign:</span>
                        <span className="meta-value">{selectedInsight.zodiacSign}</span>
                      </div>
                    )}
                    {selectedInsight.lifePathNumber && (
                      <div className="insight-meta">
                        <span className="meta-label">Life Path Number:</span>
                        <span className="meta-value">{selectedInsight.lifePathNumber}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .guest-dashboard {
          min-height: 100vh;
          background: var(--mood-background, var(--color-cosmic-deepSpace));
          color: var(--color-neutral-white);
        }

        .dashboard-header {
          background: linear-gradient(135deg, var(--mood-primary, var(--color-semantic-primary)), var(--mood-secondary, var(--color-semantic-secondary)));
          padding: 4rem 2rem;
          text-align: center;
        }

        .header-content {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }

        .welcome-title {
          font-size: var(--font-size-5xl);
          font-weight: var(--font-weight-bold);
          margin: 0;
          background: linear-gradient(45deg, var(--color-neutral-white), var(--mood-accent, var(--color-semantic-accent)));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .welcome-subtitle {
          font-size: var(--font-size-xl);
          color: var(--color-neutral-gray200);
          margin: 0;
          max-width: 600px;
        }

        .auth-actions {
          display: flex;
          gap: 1rem;
        }

        .auth-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          border-radius: var(--border-radius-lg);
          font-weight: var(--font-weight-semibold);
          cursor: pointer;
          transition: all var(--duration-normal) var(--easing-cosmic);
          border: none;
        }

        .auth-button.primary {
          background: var(--color-neutral-white);
          color: var(--mood-primary, var(--color-semantic-primary));
        }

        .auth-button.primary:hover {
          background: var(--color-neutral-gray100);
          transform: translateY(-2px);
        }

        .auth-button.secondary {
          background: transparent;
          color: var(--color-neutral-white);
          border: 2px solid var(--color-neutral-white);
        }

        .auth-button.secondary:hover {
          background: var(--color-neutral-white);
          color: var(--mood-primary, var(--color-semantic-primary));
        }

        .button-icon {
          width: 1.25rem;
          height: 1.25rem;
        }

        .insights-section,
        .features-section {
          padding: 4rem 2rem;
          max-width: 1280px;
          margin: 0 auto;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .section-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: var(--font-size-3xl);
          font-weight: var(--font-weight-bold);
          margin: 0;
        }

        .title-icon {
          width: 2rem;
          height: 2rem;
          color: var(--mood-primary, var(--color-semantic-primary));
        }

        .mood-indicator {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: var(--mood-surface, var(--color-cosmic-cosmicNavy));
          border-radius: var(--border-radius-lg);
          color: var(--mood-primary, var(--color-semantic-primary));
        }

        .insights-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .insight-card {
          background: var(--mood-surface, var(--color-cosmic-cosmicNavy));
          border: 1px solid var(--color-cosmic-stellarGray);
          border-radius: var(--border-radius-xl);
          padding: 1.5rem;
          cursor: pointer;
          transition: all var(--duration-normal) var(--easing-cosmic);
          position: relative;
          overflow: hidden;
        }

        .insight-card:hover {
          border-color: var(--mood-primary, var(--color-semantic-primary));
          box-shadow: var(--shadow-cosmic);
        }

        .insight-card.premium {
          border-color: var(--mood-accent, var(--color-semantic-accent));
        }

        .insight-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .insight-type {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--mood-primary, var(--color-semantic-primary));
        }

        .type-icon {
          width: 1.25rem;
          height: 1.25rem;
        }

        .premium-badge {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.25rem 0.75rem;
          background: var(--mood-accent, var(--color-semantic-accent));
          color: var(--color-neutral-white);
          border-radius: var(--border-radius-full);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-semibold);
        }

        .badge-icon {
          width: 0.75rem;
          height: 0.75rem;
        }

        .insight-content {
          margin-bottom: 1rem;
        }

        .premium-content {
          position: relative;
        }

        .blurred-text {
          filter: blur(4px);
          user-select: none;
          pointer-events: none;
        }

        .premium-overlay {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          color: var(--mood-accent, var(--color-semantic-accent));
        }

        .overlay-icon {
          width: 2rem;
          height: 2rem;
        }

        .free-content {
          color: var(--color-neutral-white);
          line-height: var(--line-height-relaxed);
        }

        .upgrade-prompt {
          margin-top: 1rem;
        }

        .upgrade-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: var(--mood-primary, var(--color-semantic-primary));
          color: var(--color-neutral-white);
          border: none;
          border-radius: var(--border-radius-lg);
          font-weight: var(--font-weight-semibold);
          cursor: pointer;
          transition: all var(--duration-normal) var(--easing-cosmic);
        }

        .upgrade-button:hover {
          background: var(--mood-secondary, var(--color-semantic-secondary));
          transform: translateY(-2px);
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .feature-card {
          background: var(--mood-surface, var(--color-cosmic-cosmicNavy));
          border: 1px solid var(--color-cosmic-stellarGray);
          border-radius: var(--border-radius-xl);
          padding: 2rem;
          text-align: center;
          transition: all var(--duration-normal) var(--easing-cosmic);
        }

        .feature-card:hover {
          border-color: var(--mood-primary, var(--color-semantic-primary));
          transform: translateY(-4px);
        }

        .feature-icon {
          display: flex;
          justify-content: center;
          margin-bottom: 1rem;
          color: var(--mood-primary, var(--color-semantic-primary));
        }

        .feature-title {
          font-size: var(--font-size-xl);
          font-weight: var(--font-weight-bold);
          margin: 0 0 1rem 0;
        }

        .feature-description {
          color: var(--color-neutral-gray300);
          margin-bottom: 1.5rem;
          line-height: var(--line-height-relaxed);
        }

        .feature-benefits {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          justify-content: center;
        }

        .benefit {
          padding: 0.25rem 0.75rem;
          background: var(--mood-primary, var(--color-semantic-primary));
          color: var(--color-neutral-white);
          border-radius: var(--border-radius-full);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-medium);
        }

        .upgrade-cta {
          background: linear-gradient(135deg, var(--mood-primary, var(--color-semantic-primary)), var(--mood-secondary, var(--color-semantic-secondary)));
          padding: 4rem 2rem;
          text-align: center;
        }

        .cta-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .cta-title {
          font-size: var(--font-size-4xl);
          font-weight: var(--font-weight-bold);
          margin: 0 0 1rem 0;
          color: var(--color-neutral-white);
        }

        .cta-description {
          font-size: var(--font-size-lg);
          color: var(--color-neutral-gray200);
          margin: 0 0 2rem 0;
        }

        .cta-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        .cta-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          border-radius: var(--border-radius-lg);
          font-weight: var(--font-weight-semibold);
          cursor: pointer;
          transition: all var(--duration-normal) var(--easing-cosmic);
          border: none;
        }

        .cta-button.primary {
          background: var(--color-neutral-white);
          color: var(--mood-primary, var(--color-semantic-primary));
        }

        .cta-button.primary:hover {
          background: var(--color-neutral-gray100);
          transform: translateY(-2px);
        }

        .cta-button.secondary {
          background: transparent;
          color: var(--color-neutral-white);
          border: 2px solid var(--color-neutral-white);
        }

        .cta-button.secondary:hover {
          background: var(--color-neutral-white);
          color: var(--mood-primary, var(--color-semantic-primary));
        }

        .insight-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: var(--z-index-modal);
          padding: 2rem;
        }

        .insight-modal {
          background: var(--mood-surface, var(--color-cosmic-cosmicNavy));
          border-radius: var(--border-radius-xl);
          max-width: 500px;
          width: 100%;
          max-height: 80vh;
          overflow-y: auto;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid var(--color-cosmic-stellarGray);
        }

        .modal-title {
          font-size: var(--font-size-xl);
          font-weight: var(--font-weight-bold);
          margin: 0;
        }

        .modal-close {
          background: none;
          border: none;
          color: var(--color-neutral-gray400);
          font-size: var(--font-size-2xl);
          cursor: pointer;
          padding: 0.5rem;
        }

        .modal-content {
          padding: 1.5rem;
        }

        .premium-modal-content {
          text-align: center;
        }

        .premium-lock {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .lock-icon {
          width: 3rem;
          height: 3rem;
          color: var(--mood-accent, var(--color-semantic-accent));
        }

        .free-modal-content {
          color: var(--color-neutral-white);
          line-height: var(--line-height-relaxed);
        }

        .insight-meta {
          display: flex;
          gap: 0.5rem;
          margin-top: 1rem;
          padding: 0.75rem;
          background: var(--color-cosmic-deepSpace);
          border-radius: var(--border-radius-lg);
        }

        .meta-label {
          font-weight: var(--font-weight-semibold);
          color: var(--mood-primary, var(--color-semantic-primary));
        }

        .meta-value {
          color: var(--color-neutral-white);
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .dashboard-header {
            padding: 2rem 1rem;
          }

          .welcome-title {
            font-size: var(--font-size-3xl);
          }

          .welcome-subtitle {
            font-size: var(--font-size-lg);
          }

          .auth-actions {
            flex-direction: column;
            width: 100%;
          }

          .auth-button {
            width: 100%;
            justify-content: center;
          }

          .insights-section,
          .features-section {
            padding: 2rem 1rem;
          }

          .insights-grid,
          .features-grid {
            grid-template-columns: 1fr;
          }

          .upgrade-cta {
            padding: 2rem 1rem;
          }

          .cta-title {
            font-size: var(--font-size-2xl);
          }

          .cta-actions {
            flex-direction: column;
          }

          .cta-button {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default GuestDashboard;

