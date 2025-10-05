'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, Shield, Users, Globe, Zap } from 'lucide-react';
import CosmicCard from '@/components/ui/CosmicCard';

const AboutUs: React.FC = () => {
  const features = [
    {
      icon: Star,
      title: 'Astrological Accuracy',
      description: 'Powered by Swiss Ephemeris and NASA data for precise calculations'
    },
    {
      icon: Heart,
      title: 'Personalized Guidance',
      description: 'AI-powered insights tailored to your unique astrological profile'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your data is encrypted and never shared with third parties'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Connect with like-minded individuals on their spiritual journey'
    },
    {
      icon: Globe,
      title: 'Multi-Cultural',
      description: 'Supporting Western, Vedic, Sri Lankan, and Chinese astrology systems'
    },
    {
      icon: Zap,
      title: 'Real-Time Updates',
      description: 'Daily insights and guidance updated with current planetary positions'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-white mb-6">
            About Daily Secrets
          </h1>
          <p className="text-xl text-violet-300 max-w-3xl mx-auto">
            Discover the cosmic wisdom that guides your life through personalized astrology, 
            numerology, and AI-powered spiritual guidance.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <CosmicCard>
            <div className="p-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-lg text-violet-300 leading-relaxed">
                To make ancient wisdom accessible through modern technology, helping people 
                understand their cosmic blueprint and navigate life with greater awareness 
                and purpose. We believe that everyone deserves access to personalized 
                spiritual guidance that respects their cultural background and personal journey.
              </p>
            </div>
          </CosmicCard>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            What Makes Us Special
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <CosmicCard className="h-full">
                  <div className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-gold-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-violet-300">
                      {feature.description}
                    </p>
                  </div>
                </CosmicCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-16"
        >
          <CosmicCard>
            <div className="p-8">
              <h2 className="text-3xl font-bold text-white text-center mb-8">
                Our Team
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-xl font-semibold text-white mb-2">Astrology Experts</h3>
                  <p className="text-violet-300">Certified astrologers with decades of experience</p>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-xl font-semibold text-white mb-2">AI Engineers</h3>
                  <p className="text-violet-300">Cutting-edge AI and machine learning specialists</p>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-xl font-semibold text-white mb-2">Cultural Advisors</h3>
                  <p className="text-violet-300">Experts in diverse spiritual and cultural traditions</p>
                </div>
              </div>
            </div>
          </CosmicCard>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <CosmicCard>
            <div className="p-8">
              <h2 className="text-3xl font-bold text-white text-center mb-8">
                Our Values
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Accuracy & Authenticity</h3>
                  <p className="text-violet-300 mb-6">
                    We use the most accurate astronomical data available, including Swiss Ephemeris 
                    and NASA JPL data, to ensure our calculations are precise and reliable.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Cultural Respect</h3>
                  <p className="text-violet-300 mb-6">
                    We honor and support multiple astrological traditions, from Western to Vedic, 
                    Sri Lankan to Chinese, ensuring everyone feels represented and respected.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Privacy & Security</h3>
                  <p className="text-violet-300 mb-6">
                    Your personal data and spiritual journey are sacred. We use enterprise-grade 
                    encryption and never share your information with third parties.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Accessibility</h3>
                  <p className="text-violet-300 mb-6">
                    Spiritual guidance should be accessible to everyone. We offer free basic 
                    features and affordable premium options to ensure no one is left behind.
                  </p>
                </div>
              </div>
            </div>
          </CosmicCard>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;