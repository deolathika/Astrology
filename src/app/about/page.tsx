import React from 'react';
import { Metadata } from 'next';
import CosmicCard from '@/components/ui/CosmicCard';
import SkipLink from '@/components/accessibility/SkipLink';

export const metadata: Metadata = {
  title: 'About Us - Daily Secrets',
  description: 'Learn about Daily Secrets, the premier multi-system astrology and numerology platform providing accurate cosmic guidance.',
  keywords: 'about, astrology, numerology, cosmic guidance, spiritual wisdom',
};

const AboutPage: React.FC = () => {
  return (
    <>
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gold-400 to-silver-400 bg-clip-text text-transparent">
              About Daily Secrets
            </h1>
            <p className="text-xl text-violet-300">
              Your Gateway to Cosmic Wisdom and Spiritual Enlightenment
            </p>
          </div>

          {/* Mission Statement */}
          <CosmicCard className="mb-8" variant="glass" glow>
            <h2 className="text-2xl font-semibold mb-4 text-gold-400">Our Mission</h2>
            <p className="text-violet-200 mb-4">
              Daily Secrets is dedicated to providing accurate, culturally-sensitive astrological and numerological guidance 
              through cutting-edge technology and traditional wisdom. We bridge the gap between ancient cosmic knowledge 
              and modern digital accessibility.
            </p>
            <p className="text-violet-200">
              Our platform combines Swiss Ephemeris precision with NASA/JPL validation to deliver the most accurate 
              astronomical calculations available, while respecting and honoring diverse cultural traditions and belief systems.
            </p>
          </CosmicCard>

          {/* What We Do */}
          <CosmicCard className="mb-8" variant="neon">
            <h2 className="text-2xl font-semibold mb-4 text-gold-400">What We Do</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-blue-400">Astrological Services</h3>
                <ul className="list-disc list-inside text-violet-200 space-y-2">
                  <li>Western Astrology (Tropical Zodiac)</li>
                  <li>Vedic Astrology (Sidereal Zodiac)</li>
                  <li>Chinese Astrology (12-Year Animal Cycle)</li>
                  <li>Sri Lankan Traditional Astrology</li>
                  <li>Birth Chart Analysis</li>
                  <li>Transit Interpretations</li>
                  <li>Compatibility Analysis</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-blue-400">Numerological Services</h3>
                <ul className="list-disc list-inside text-violet-200 space-y-2">
                  <li>Pythagorean Numerology</li>
                  <li>Chaldean Numerology</li>
                  <li>Chinese Numerology</li>
                  <li>Life Path Analysis</li>
                  <li>Destiny Number Calculations</li>
                  <li>Soul Urge Interpretations</li>
                  <li>Compatibility Numerology</li>
                </ul>
              </div>
            </div>
          </CosmicCard>

          {/* Technology */}
          <CosmicCard className="mb-8" variant="gradient">
            <h2 className="text-2xl font-semibold mb-4 text-gold-400">Our Technology</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-blue-400">Astronomical Accuracy</h3>
                <p className="text-violet-200">
                  Swiss Ephemeris integration with ±0.1° tolerance and NASA/JPL real-time validation 
                  ensures the highest accuracy in all calculations.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-blue-400">AI Integration</h3>
                <p className="text-violet-200">
                  Local AI processing with WebLLM and Transformers.js for personalized insights, 
                  dream analysis, and cosmic guidance.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-blue-400">Cultural Sensitivity</h3>
                <p className="text-violet-200">
                  Multi-language support and region-aware interpretations that respect 
                  diverse cultural traditions and belief systems.
                </p>
              </div>
            </div>
          </CosmicCard>

          {/* Team */}
          <CosmicCard className="mb-8" variant="glass">
            <h2 className="text-2xl font-semibold mb-4 text-gold-400">Our Team</h2>
            <p className="text-violet-200 mb-4">
              Daily Secrets is built by a diverse team of astrologers, numerologists, software engineers, 
              and cultural experts who share a passion for making cosmic wisdom accessible to everyone.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-blue-400">Astrological Experts</h3>
                <p className="text-violet-200">
                  Certified astrologers with decades of experience in Western, Vedic, Chinese, 
                  and Sri Lankan astrological traditions.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-blue-400">Technology Team</h3>
                <p className="text-violet-200">
                  Full-stack developers and AI specialists focused on creating intuitive, 
                  accessible, and accurate cosmic guidance tools.
                </p>
              </div>
            </div>
          </CosmicCard>

          {/* Values */}
          <CosmicCard className="mb-8" variant="neon">
            <h2 className="text-2xl font-semibold mb-4 text-gold-400">Our Values</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-blue-400">Accuracy</h3>
                <p className="text-violet-200">
                  We prioritize scientific accuracy in all astronomical calculations while 
                  maintaining respect for traditional wisdom and cultural interpretations.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-blue-400">Accessibility</h3>
                <p className="text-violet-200">
                  Our platform is designed to be accessible to users of all abilities, 
                  with comprehensive internationalization and cultural adaptation.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-blue-400">Privacy</h3>
                <p className="text-violet-200">
                  We respect your privacy and provide complete data control, including 
                  export and deletion options for all personal information.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-blue-400">Cultural Respect</h3>
                <p className="text-violet-200">
                  We honor and preserve the integrity of diverse astrological and 
                  numerological traditions from around the world.
                </p>
              </div>
            </div>
          </CosmicCard>

          {/* Contact */}
          <CosmicCard variant="gradient">
            <h2 className="text-2xl font-semibold mb-4 text-gold-400">Get in Touch</h2>
            <p className="text-violet-200 mb-4">
              Have questions about Daily Secrets? We'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="/contact" 
                className="btn bg-gold-400 text-violet-900 hover:bg-gold-500 transition-colors"
              >
                Contact Us
              </a>
              <a 
                href="/faq" 
                className="btn bg-violet-800/50 text-violet-200 hover:bg-violet-700/50 transition-colors"
              >
                FAQ
              </a>
            </div>
          </CosmicCard>
        </div>
      </div>
    </>
  );
};

export default AboutPage;