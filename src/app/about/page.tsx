'use client'

import { motion } from 'framer-motion'
import { CosmicNavigation } from '@/components/cosmic-navigation'
import { Target, Star, Users, MessageCircle, Calendar, Globe, Heart, Shield } from 'lucide-react'

const teamMembers = [
  {
    name: 'Dr. Sarah Chen',
    role: 'Founder & Lead Astrologer',
    bio: 'PhD in Metaphysical Sciences with 20+ years of experience in Vedic and Western astrology.',
    image: '/api/placeholder/200/200',
    specialties: ['Vedic Astrology', 'Relationship Compatibility', 'Career Guidance']
  },
  {
    name: 'Michael Rodriguez',
    role: 'Chief Technology Officer',
    bio: 'Software engineer and numerology expert, passionate about making cosmic wisdom accessible through technology.',
    image: '/api/placeholder/200/200',
    specialties: ['Numerology', 'Technology', 'Data Analysis']
  },
  {
    name: 'Priya Sharma',
    role: 'Head of Cosmic Research',
    bio: 'International astrologer and published author, specializing in dream interpretation and spiritual guidance.',
    image: '/api/placeholder/200/200',
    specialties: ['Dream Interpretation', 'Spiritual Guidance', 'Research']
  },
  {
    name: 'James Wilson',
    role: 'Lead Numerologist',
    bio: 'Master numerologist with expertise in Pythagorean and Chaldean systems, helping clients understand their life path.',
    image: '/api/placeholder/200/200',
    specialties: ['Pythagorean Numerology', 'Chaldean Numerology', 'Life Path Analysis']
  }
]

const values = [
  {
    icon: Heart,
    title: 'Compassionate Guidance',
    description: 'We provide empathetic, non-judgmental cosmic guidance that respects your unique journey and beliefs.'
  },
  {
    icon: Shield,
    title: 'Privacy & Security',
    description: 'Your personal data and cosmic insights are protected with bank-level security and strict privacy controls.'
  },
  {
    icon: Star,
    title: 'Authentic Wisdom',
    description: 'We combine ancient cosmic wisdom with modern technology to provide accurate, meaningful insights.'
  },
  {
    icon: Users,
    title: 'Community First',
    description: 'We believe in the power of community and connection, fostering a supportive cosmic community.'
  }
]

const achievements = [
  {
    number: '500K+',
    label: 'Happy Users',
    description: 'People who have discovered their cosmic potential'
  },
  {
    number: '50+',
    label: 'Expert Astrologers',
    description: 'Certified professionals in our network'
  },
  {
    number: '1M+',
    label: 'Readings Given',
    description: 'Personalized cosmic insights delivered'
  },
  {
    number: '98%',
    label: 'Satisfaction Rate',
    description: 'Users who love our cosmic guidance'
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-deep-space">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-deep-space via-cosmic-navy to-nebula-dark" />
      <div className="absolute inset-0 bg-cosmic-pattern opacity-30" />
      
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-4 py-8"
        >
          {/* Hero Section */}
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold text-cosmic-gradient-text mb-6"
            >
              About Daily Secrets
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-stellar-gray-light text-lg max-w-3xl mx-auto leading-relaxed"
            >
              We are passionate about making cosmic wisdom accessible to everyone. Our mission is to help you 
              discover your unique cosmic potential through personalized astrology, numerology, and spiritual guidance.
            </motion.p>
          </div>

          {/* Mission & Vision */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid md:grid-cols-2 gap-8 mb-16"
          >
            <div className="cosmic-card">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-electric-violet/20 rounded-2xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-electric-violet" />
                </div>
                <h2 className="text-2xl font-bold text-cosmic-gradient-text">Our Mission</h2>
              </div>
              <p className="text-stellar-gray-light leading-relaxed">
                To democratize cosmic wisdom by making authentic astrology and numerology accessible, 
                affordable, and personalized for everyone, regardless of their background or beliefs.
              </p>
            </div>

            <div className="cosmic-card">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-supernova-gold/20 rounded-2xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-supernova-gold" />
                </div>
                <h2 className="text-2xl font-bold text-cosmic-gradient-text">Our Vision</h2>
              </div>
              <p className="text-stellar-gray-light leading-relaxed">
                A world where everyone has access to personalized cosmic guidance that helps them 
                navigate life's challenges and discover their true potential.
              </p>
            </div>
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-cosmic-gradient-text mb-4">Our Values</h2>
              <p className="text-stellar-gray-light text-lg">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="cosmic-card text-center"
                  >
                    <div className="w-16 h-16 bg-electric-violet/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-electric-violet" />
                    </div>
                    <h3 className="text-xl font-bold text-starlight-white mb-3">{value.title}</h3>
                    <p className="text-stellar-gray-light">{value.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Team */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-cosmic-gradient-text mb-4">Meet Our Team</h2>
              <p className="text-stellar-gray-light text-lg">
                The cosmic experts behind Daily Secrets
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="cosmic-card text-center"
                >
                  <div className="w-24 h-24 bg-electric-violet/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-12 h-12 text-electric-violet" />
                  </div>
                  <h3 className="text-xl font-bold text-starlight-white mb-2">{member.name}</h3>
                  <p className="text-electric-violet font-semibold mb-3">{member.role}</p>
                  <p className="text-stellar-gray-light text-sm mb-4">{member.bio}</p>
                  <div className="space-y-2">
                    {member.specialties.map((specialty, specIndex) => (
                      <span
                        key={specIndex}
                        className="inline-block bg-cosmic-navy/50 text-stellar-gray-light px-3 py-1 rounded-lg text-xs mr-2 mb-2"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="cosmic-card mb-16"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-cosmic-gradient-text mb-4">Our Impact</h2>
              <p className="text-stellar-gray-light text-lg">
                Numbers that reflect our commitment to cosmic guidance
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-cosmic-gradient-text mb-2">
                    {achievement.number}
                  </div>
                  <div className="text-starlight-white font-semibold mb-1">
                    {achievement.label}
                  </div>
                  <div className="text-stellar-gray-light text-sm">
                    {achievement.description}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="cosmic-card"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-cosmic-gradient-text mb-4">Get in Touch</h2>
              <p className="text-stellar-gray-light text-lg">
                We'd love to hear from you and help with your cosmic journey
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-electric-violet/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-6 h-6 text-electric-violet" />
                </div>
                <h3 className="text-lg font-semibold text-starlight-white mb-2">Email Support</h3>
                <p className="text-stellar-gray-light">support@dailysecrets.com</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-supernova-gold/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-supernova-gold" />
                </div>
                <h3 className="text-lg font-semibold text-starlight-white mb-2">Live Chat</h3>
                <p className="text-stellar-gray-light">Available 24/7</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-aurora-green/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-6 h-6 text-aurora-green" />
                </div>
                <h3 className="text-lg font-semibold text-starlight-white mb-2">Social Media</h3>
                <p className="text-stellar-gray-light">@dailysecrets</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom spacing for navigation */}
        <div className="h-24" />

        {/* Cosmic Navigation */}
        <CosmicNavigation />
      </div>
    </div>
  )
}
