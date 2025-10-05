/**
 * 🌌 Daily Secrets - Mood AI Layer Component
 * Intelligent mood detection and adaptive theming
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Zap, 
  Droplets, 
  Wind, 
  Leaf,
  Activity,
  Heart,
  Eye,
  Settings
} from 'lucide-react';

interface MoodData {
  mood: 'fire' | 'water' | 'air' | 'earth';
  confidence: number;
  reasoning: string;
  timestamp: Date;
  sources: string[];
}

interface UserInteraction {
  type: 'click' | 'scroll' | 'hover' | 'focus' | 'input';
  element: string;
  timestamp: Date;
  duration?: number;
  intensity?: number;
}

interface AstrologicalData {
  currentPlanets: Array<{
    name: string;
    sign: string;
    element: 'fire' | 'water' | 'air' | 'earth';
    strength: number;
  }>;
  lunarPhase: string;
  currentTransits: Array<{
    planet: string;
    aspect: string;
    intensity: number;
  }>;
}

// Element types for mood analysis
type ElementKind = "fire" | "water" | "air" | "earth";

interface AnalysisResult {
  fire: number;
  water: number;
  air: number;
  earth: number;
}

interface User {
  id: string;
  role: string;
  preferences?: Record<string, any>;
}

interface MoodAILayerProps {
  user?: User;
  astrologicalData?: AstrologicalData;
  onMoodChange?: (mood: ElementKind) => void;
  onMoodData?: (data: MoodData) => void;
  enabled?: boolean;
  sensitivity?: 'low' | 'medium' | 'high';
  privacyMode?: boolean;
}

const MoodAILayer: React.FC<MoodAILayerProps> = ({
  user,
  astrologicalData,
  onMoodChange,
  onMoodData,
  enabled = true,
  sensitivity = 'medium',
  privacyMode = false
}) => {
  const [currentMood, setCurrentMood] = useState<'fire' | 'water' | 'air' | 'earth'>('fire');
  const [moodData, setMoodData] = useState<MoodData | null>(null);
  const [interactions, setInteractions] = useState<UserInteraction[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showMoodIndicator, setShowMoodIndicator] = useState(false);
  const [moodHistory, setMoodHistory] = useState<MoodData[]>([]);

  // Mood detection sensitivity
  const sensitivityThresholds = {
    low: 0.8,
    medium: 0.6,
    high: 0.4
  };

  // Track user interactions
  const trackInteraction = useCallback((interaction: UserInteraction) => {
    if (!enabled || privacyMode) return;

    setInteractions(prev => {
      const newInteractions = [...prev, interaction];
      // Keep only last 50 interactions
      return newInteractions.slice(-50);
    });
  }, [enabled, privacyMode]);

  // Analyze mood from interactions
  const analyzeMood = useCallback(async () => {
    if (!enabled || privacyMode || interactions.length < 5) return;

    setIsAnalyzing(true);

    try {
      // Analyze interaction patterns
      const interactionAnalysis = analyzeInteractionPatterns(interactions);
      
      // Analyze astrological influences
      const astrologicalAnalysis = analyzeAstrologicalInfluences(astrologicalData);
      
      // Combine analyses
      const combinedAnalysis = combineAnalyses(interactionAnalysis, astrologicalAnalysis);
      
      // Determine mood
      const mood = determineMood(combinedAnalysis);
      
      // Create mood data
      const newMoodData: MoodData = {
        mood: mood.mood,
        confidence: mood.confidence,
        reasoning: mood.reasoning,
        timestamp: new Date(),
        sources: mood.sources
      };

      setMoodData(newMoodData);
      setMoodHistory(prev => [...prev, newMoodData].slice(-10));
      
      // Update current mood if confidence is high enough
      if (mood.confidence >= sensitivityThresholds[sensitivity]) {
        setCurrentMood(mood.mood);
        onMoodChange?.(mood.mood);
        onMoodData?.(newMoodData);
      }

      // Show mood indicator
      setShowMoodIndicator(true);
      setTimeout(() => setShowMoodIndicator(false), 3000);

    } catch (error) {
      console.error('Mood analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  }, [enabled, privacyMode, interactions, astrologicalData, sensitivity, onMoodChange, onMoodData]);

  // Analyze interaction patterns
  const analyzeInteractionPatterns = (interactions: UserInteraction[]): AnalysisResult => {
    const patterns: AnalysisResult = {
      fire: 0,
      water: 0,
      air: 0,
      earth: 0
    };

    interactions.forEach(interaction => {
      switch (interaction.type) {
        case 'click':
          if (interaction.intensity && interaction.intensity > 0.7) {
            patterns.fire += 1; // Fire
          }
          break;
        case 'scroll':
          if (interaction.duration && interaction.duration > 1000) {
            patterns.water += 1; // Water
          }
          break;
        case 'hover':
          if (interaction.duration && interaction.duration < 200) {
            patterns.air += 1; // Air
          }
          break;
        case 'focus':
          patterns.earth += 1; // Earth
          break;
      }
    });

    return patterns;
  };

  // Analyze astrological influences
  const analyzeAstrologicalInfluences = (data?: AstrologicalData) => {
    if (!data) return { fire: 0, water: 0, air: 0, earth: 0 };

    const influences = { fire: 0, water: 0, air: 0, earth: 0 };

    data.currentPlanets.forEach(planet => {
      influences[planet.element] += planet.strength;
    });

    return influences;
  };

  // Combine analyses
  const combineAnalyses = (interactionAnalysis: AnalysisResult, astrologicalAnalysis: AnalysisResult): AnalysisResult => {
    const combined: AnalysisResult = {
      fire: (interactionAnalysis.fire + astrologicalAnalysis.fire) / 2,
      water: (interactionAnalysis.water + astrologicalAnalysis.water) / 2,
      air: (interactionAnalysis.air + astrologicalAnalysis.air) / 2,
      earth: (interactionAnalysis.earth + astrologicalAnalysis.earth) / 2
    };

    return combined;
  };

  // Determine mood from analysis
  const determineMood = (analysis: AnalysisResult): MoodData => {
    const values = Object.values(analysis);
    const maxValue = Math.max(...values);
    const dominantElement = Object.keys(analysis).find(key => analysis[key as keyof AnalysisResult] === maxValue) as ElementKind;
    
    const confidence = maxValue / Math.max(...values);
    
    const reasoning = generateReasoning(dominantElement, analysis);
    const sources = ['interactions', 'astrological'];

    return {
      mood: dominantElement,
      confidence,
      reasoning,
      timestamp: new Date(),
      sources
    };
  };

  // Generate reasoning for mood
  const generateReasoning = (mood: ElementKind, analysis: AnalysisResult): string => {
    const reasons: Record<ElementKind, string> = {
      fire: 'High energy interactions and Mars influence detected',
      water: 'Flowing interactions and lunar influence detected',
      air: 'Quick, analytical interactions and Mercury influence detected',
      earth: 'Stable, focused interactions and Venus influence detected'
    };

    return reasons[mood] || 'Mood detected from user behavior patterns';
  };

  // Set up event listeners
  useEffect(() => {
    if (!enabled || privacyMode) return;

    const handleClick = (e: MouseEvent) => {
      trackInteraction({
        type: 'click',
        element: (e.target as HTMLElement).tagName,
        timestamp: new Date(),
        intensity: e.detail > 1 ? 0.8 : 0.5
      });
    };

    const handleScroll = (e: Event) => {
      trackInteraction({
        type: 'scroll',
        element: 'window',
        timestamp: new Date(),
        duration: 100
      });
    };

    const handleHover = (e: MouseEvent) => {
      trackInteraction({
        type: 'hover',
        element: (e.target as HTMLElement).tagName,
        timestamp: new Date(),
        duration: 50
      });
    };

    const handleFocus = (e: FocusEvent) => {
      trackInteraction({
        type: 'focus',
        element: (e.target as HTMLElement).tagName,
        timestamp: new Date()
      });
    };

    // Add event listeners
    document.addEventListener('click', handleClick);
    document.addEventListener('scroll', handleScroll);
    document.addEventListener('mouseover', handleHover);
    document.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseover', handleHover);
      document.removeEventListener('focus', handleFocus);
    };
  }, [enabled, privacyMode, trackInteraction]);

  // Analyze mood periodically
  useEffect(() => {
    if (!enabled || privacyMode) return;

    const interval = setInterval(() => {
      if (interactions.length >= 5) {
        analyzeMood();
      }
    }, 30000); // Analyze every 30 seconds

    return () => clearInterval(interval);
  }, [enabled, privacyMode, interactions, analyzeMood]);

  // Mood indicator component
  const MoodIndicator = () => (
    <AnimatePresence>
      {showMoodIndicator && moodData && (
        <motion.div
          className="mood-indicator"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mood-indicator-content">
            <div className="mood-icon">
              {currentMood === 'fire' && <Zap className="w-6 h-6" />}
              {currentMood === 'water' && <Droplets className="w-6 h-6" />}
              {currentMood === 'air' && <Wind className="w-6 h-6" />}
              {currentMood === 'earth' && <Leaf className="w-6 h-6" />}
            </div>
            <div className="mood-info">
              <div className="mood-name">
                {currentMood.charAt(0).toUpperCase() + currentMood.slice(1)} Mood
              </div>
              <div className="mood-confidence">
                {Math.round(moodData.confidence * 100)}% confidence
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Mood selector component
  const MoodSelector = () => (
    <div className="mood-selector">
      <div className="mood-options">
        {(['fire', 'water', 'air', 'earth'] as const).map((mood) => (
          <button
            key={mood}
            className={`mood-option ${currentMood === mood ? 'active' : ''}`}
            onClick={() => {
              setCurrentMood(mood);
              onMoodChange?.(mood);
            }}
          >
            {mood === 'fire' && <Zap className="w-5 h-5" />}
            {mood === 'water' && <Droplets className="w-5 h-5" />}
            {mood === 'air' && <Wind className="w-5 h-5" />}
            {mood === 'earth' && <Leaf className="w-5 h-5" />}
            <span className="mood-label">{mood}</span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Mood Indicator */}
      <MoodIndicator />

      {/* Mood Selector */}
      <MoodSelector />

      {/* Analysis Status */}
      {isAnalyzing && (
        <div className="mood-analysis-status">
          <Activity className="w-4 h-4 animate-spin" />
          <span>Analyzing mood...</span>
        </div>
      )}

      <style jsx>{`
        .mood-indicator {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: var(--z-index-toast);
          background: var(--mood-surface, var(--color-cosmic-cosmicNavy));
          border: 1px solid var(--mood-primary, var(--color-semantic-primary));
          border-radius: var(--border-radius-lg);
          padding: 1rem;
          box-shadow: var(--shadow-lg);
        }

        .mood-indicator-content {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .mood-icon {
          color: var(--mood-primary, var(--color-semantic-primary));
        }

        .mood-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .mood-name {
          font-weight: var(--font-weight-semibold);
          color: var(--color-neutral-white);
        }

        .mood-confidence {
          font-size: var(--font-size-sm);
          color: var(--color-neutral-gray300);
        }

        .mood-selector {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: var(--z-index-tooltip);
        }

        .mood-options {
          display: flex;
          gap: 0.5rem;
          background: var(--mood-surface, var(--color-cosmic-cosmicNavy));
          border-radius: var(--border-radius-lg);
          padding: 0.5rem;
          box-shadow: var(--shadow-lg);
        }

        .mood-option {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          padding: 0.5rem;
          border-radius: var(--border-radius-md);
          background: transparent;
          color: var(--color-neutral-gray300);
          border: none;
          cursor: pointer;
          transition: all var(--duration-normal) var(--easing-cosmic);
        }

        .mood-option:hover {
          background: var(--mood-primary, var(--color-semantic-primary));
          color: var(--color-neutral-white);
        }

        .mood-option.active {
          background: var(--mood-primary, var(--color-semantic-primary));
          color: var(--color-neutral-white);
        }

        .mood-label {
          font-size: var(--font-size-xs);
          text-transform: capitalize;
        }

        .mood-analysis-status {
          position: fixed;
          bottom: 20px;
          left: 20px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--mood-surface, var(--color-cosmic-cosmicNavy));
          color: var(--color-neutral-white);
          padding: 0.5rem 1rem;
          border-radius: var(--border-radius-lg);
          font-size: var(--font-size-sm);
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .mood-indicator {
            top: 10px;
            right: 10px;
            padding: 0.75rem;
          }

          .mood-selector {
            bottom: 10px;
            right: 10px;
          }

          .mood-options {
            flex-direction: column;
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .mood-indicator {
            transition: none;
          }

          .mood-option {
            transition: none;
          }
        }
      `}</style>
    </>
  );
};

export default MoodAILayer;

