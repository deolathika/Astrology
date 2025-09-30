'use client'

import { motion } from 'framer-motion'
import { 
  Heart, Users, Star, Globe, Shield, ArrowRight, BookOpen
} from 'lucide-react'
import { CosmicNavigation } from '@/components/cosmic-navigation'
import { Breadcrumbs } from '@/components/breadcrumbs'

const teamMembers = [
  {
    name: 'Dr. Sarah Chen',
    role: 'Lead Astrologer & Founder',
    expertise: 'Vedic & Western Astrology',
    experience: '15+ years',
    image: '/team/sarah.jpg',
    bio: 'Dr. Sarah Chen is a renowned astrologer with over 15 years of experience in both Vedic and Western astrology. She holds a PhD in Astronomy and has helped thousands of people understand their cosmic blueprint.'
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Numerology Expert',
    expertise: 'Pythagorean & Chaldean Systems',
    experience: '12+ years',
    image: '/team/marcus.jpg',
    bio: 'Marcus is a certified numerologist specializing in both Pythagorean and Chaldean systems. His unique approach combines ancient wisdom with modern psychology.'
  },
  {
    name: 'Dr. Priya Sharma',
    role: 'Vedic Astrology Specialist',
    expertise: 'Nakshatra & Dasha Systems',
    experience: '18+ years',
    image: '/team/priya.jpg',
    bio: 'Dr. Priya Sharma is a third-generation Vedic astrologer from India, specializing in Nakshatra analysis and Dasha systems. She brings authentic traditional knowledge to our platform.'
  },
  {
    name: 'Alex Thompson',
    role: 'AI & Technology Lead',
    expertise: 'Machine Learning & Astrology',
    experience: '10+ years',
    image: '/team/alex.jpg',
    bio: 'Alex combines his background in AI and machine learning with a deep passion for astrology, creating innovative tools that make cosmic wisdom accessible to everyone.'
  }
]

const values = [
  {
    icon: Heart,
    title: 'Authentic Wisdom',
    description: 'We combine ancient astrological and numerological traditions with modern scientific understanding to provide accurate, meaningful guidance.'
  },
  {
    icon: Shield,
    title: 'Privacy & Security',
    description: 'Your personal data and cosmic information are protected with enterprise-grade security. We never share your information without consent.'
  },
  {
    icon: Globe,
    title: 'Global Community',
    description: 'We serve users worldwide, respecting cultural differences while providing universal cosmic insights that transcend boundaries.'
  },
  {
    icon: Star,
    title: 'Personalized Guidance',
    description: 'Every reading is tailored to your unique birth chart and life circumstances, ensuring relevant and actionable insights.'
  }
]

const milestones = [
  {
    year: '2020',
    title: 'Daily Secrets Founded',
    description: 'Started with a vision to make authentic astrology and numerology accessible to everyone.'
  },
  {
    year: '2021',
    title: 'First 10,000 Users',
    description: 'Reached our first major milestone with users from over 50 countries.'
  },
  {
    year: '2022',
    title: 'AI Integration',
    description: 'Launched our AI-powered cosmic guidance system for personalized daily insights.'
  },
  {
    year: '2023',
    title: 'Community Features',
    description: 'Introduced cosmic community features for users to connect and share experiences.'
  },
  {
    year: '2024',
    title: 'Premium Services',
    description: 'Launched comprehensive premium services with advanced features and expert consultations.'
  }
]

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-6">
          <Breadcrumbs />
          <div className="flex items-center space-x-4 mt-4">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">About Daily Secrets</h1>
              <p className="text-slate-600 mt-1">Discover the story behind your cosmic journey</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Mission Statement */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-900 mb-6">Our Mission</h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            At Daily Secrets, we believe that everyone deserves access to authentic cosmic wisdom. 
            Our mission is to democratize astrology and numerology by combining ancient traditions 
            with modern technology, making personalized cosmic guidance accessible, accurate, and meaningful 
            for people from all walks of life.
          </p>
        </motion.section>

        {/* Values */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="text-center p-6 bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{value.title}</h3>
                <p className="text-slate-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Team */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="h-48 bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                  <Users className="w-16 h-16 text-white opacity-80" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-1">{member.name}</h3>
                  <p className="text-violet-600 font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-slate-600 mb-3">{member.expertise} • {member.experience}</p>
                  <p className="text-sm text-slate-500">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Timeline */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-violet-500 to-purple-600 rounded-full"></div>
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                className={`relative flex items-center mb-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="text-violet-600 font-bold text-lg mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">{milestone.title}</h3>
                    <p className="text-slate-600">{milestone.description}</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-violet-600 rounded-full border-4 border-white shadow-lg"></div>
                <div className="w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-12 text-white"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Cosmic Journey?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users who have discovered their cosmic potential with Daily Secrets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-violet-600 px-8 py-3 rounded-xl font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center space-x-2"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-violet-600 transition-colors flex items-center justify-center space-x-2"
            >
              <span>Learn More</span>
              <BookOpen className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.section>
      </div>

      <CosmicNavigation />
    </div>
  )
}
