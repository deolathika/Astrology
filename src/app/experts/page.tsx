'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Star, 
  Users, 
  Calendar, 
  MessageCircle, 
  Clock, 
  Award, 
  Globe, 
  Heart,
  ChevronDown,
  ChevronUp,
  Filter,
  Search,
  BookOpen,
  Shield,
  Zap
} from 'lucide-react'
import { CosmicNavigation } from '@/components/cosmic-navigation'
const experts = [
  {
    id: 1,
    name: 'Dr. Sarah Chen',
    title: 'Master Astrologer',
    specialization: 'Vedic Astrology',
    experience: '15 years',
    rating: 4.9,
    reviews: 1247,
    price: 75,
    languages: ['English', 'Chinese'],
    availability: 'Available',
    image: '/api/placeholder/150/150',
    bio: 'Renowned Vedic astrologer with 15 years of experience. Specializes in relationship compatibility and career guidance.',
    specialties: ['Vedic Astrology', 'Relationship Compatibility', 'Career Guidance', 'Life Path Analysis'],
    certifications: ['Certified Vedic Astrologer', 'Jyotish Acharya'],
    responseTime: '2 hours',
    successRate: '98%'
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    title: 'Numerology Expert',
    specialization: 'Pythagorean Numerology',
    experience: '12 years',
    rating: 4.8,
    reviews: 892,
    price: 60,
    languages: ['English', 'Spanish'],
    availability: 'Available',
    image: '/api/placeholder/150/150',
    bio: 'Expert in Pythagorean and Chaldean numerology systems. Helps clients understand their life path and destiny numbers.',
    specialties: ['Pythagorean Numerology', 'Chaldean Numerology', 'Life Path Analysis', 'Destiny Numbers'],
    certifications: ['Certified Numerologist', 'Master of Numbers'],
    responseTime: '1 hour',
    successRate: '96%'
  },
  {
    id: 3,
    name: 'Priya Sharma',
    title: 'Cosmic Counselor',
    specialization: 'Western Astrology',
    experience: '18 years',
    rating: 4.9,
    reviews: 1563,
    price: 85,
    languages: ['English', 'Hindi', 'Tamil'],
    availability: 'Available',
    image: '/api/placeholder/150/150',
    bio: 'International astrologer specializing in Western astrology and dream interpretation. Published author and cosmic counselor.',
    specialties: ['Western Astrology', 'Dream Interpretation', 'Birth Chart Analysis', 'Transit Predictions'],
    certifications: ['Certified Astrologer', 'Dream Analysis Expert'],
    responseTime: '3 hours',
    successRate: '99%'
  },
  {
    id: 4,
    name: 'Dr. James Wilson',
    title: 'Astro-Numerologist',
    specialization: 'Combined Systems',
    experience: '20 years',
    rating: 5.0,
    reviews: 2103,
    price: 100,
    languages: ['English'],
    availability: 'Available',
    image: '/api/placeholder/150/150',
    bio: 'Pioneer in combining astrology and numerology for comprehensive cosmic guidance. PhD in Metaphysical Sciences.',
    specialties: ['Combined Astrology & Numerology', 'Advanced Chart Analysis', 'Predictive Astrology', 'Spiritual Guidance'],
    certifications: ['PhD Metaphysical Sciences', 'Master Astrologer', 'Certified Numerologist'],
    responseTime: '4 hours',
    successRate: '99%'
  },
  {
    id: 5,
    name: 'Luna Martinez',
    title: 'Dream Interpreter',
    specialization: 'Dream Analysis',
    experience: '10 years',
    rating: 4.7,
    reviews: 634,
    price: 45,
    languages: ['English', 'Spanish'],
    availability: 'Available',
    image: '/api/placeholder/150/150',
    bio: 'Specialized in dream interpretation and subconscious analysis. Combines traditional methods with modern psychology.',
    specialties: ['Dream Interpretation', 'Subconscious Analysis', 'Symbolism', 'Psychological Astrology'],
    certifications: ['Dream Analysis Specialist', 'Psychology Degree'],
    responseTime: '1 hour',
    successRate: '94%'
  },
  {
    id: 6,
    name: 'Master Raj Kumar',
    title: 'Vedic Scholar',
    specialization: 'Traditional Vedic',
    experience: '25 years',
    rating: 4.9,
    reviews: 1876,
    price: 90,
    languages: ['English', 'Hindi', 'Sanskrit'],
    availability: 'Available',
    image: '/api/placeholder/150/150',
    bio: 'Traditional Vedic astrologer from India. Expert in ancient techniques and spiritual guidance.',
    specialties: ['Traditional Vedic', 'Muhurta', 'Gemstone Therapy', 'Spiritual Guidance'],
    certifications: ['Jyotish Acharya', 'Vedic Scholar'],
    responseTime: '6 hours',
    successRate: '97%'
  }
]

const specializations = [
  'All Specializations',
  'Vedic Astrology',
  'Western Astrology',
  'Numerology',
  'Dream Interpretation',
  'Combined Systems',
  'Traditional Vedic'
]

const priceRanges = [
  'All Prices',
  '$0 - $50',
  '$50 - $75',
  '$75 - $100',
  '$100+'
]

export default function ExpertsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSpecialization, setSelectedSpecialization] = useState('All Specializations')
  const [selectedPriceRange, setSelectedPriceRange] = useState('All Prices')
  const [sortBy, setSortBy] = useState('rating')

  const filteredExperts = experts.filter(expert => {
    const matchesSearch = expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expert.specialization.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecialization = selectedSpecialization === 'All Specializations' ||
                                 expert.specialization === selectedSpecialization
    const matchesPrice = selectedPriceRange === 'All Prices' ||
                         (selectedPriceRange === '$0 - $50' && expert.price <= 50) ||
                         (selectedPriceRange === '$50 - $75' && expert.price > 50 && expert.price <= 75) ||
                         (selectedPriceRange === '$75 - $100' && expert.price > 75 && expert.price <= 100) ||
                         (selectedPriceRange === '$100+' && expert.price > 100)
    
    return matchesSearch && matchesSpecialization && matchesPrice
  })

  const handleBookConsultation = (expertId: number) => {
    // Implement booking logic
  }

  const handleSendMessage = (expertId: number) => {
    // Implement messaging logic
  }

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
          {/* Header */}
          <div className="text-center mb-8">
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-cosmic-gradient-text mb-4"
            >
              Cosmic Experts Directory
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-stellar-gray-light"
            >
              Connect with certified astrologers and numerologists for personalized guidance
            </motion.p>
          </div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="cosmic-card mb-8"
          >
            <div className="grid md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stellar-gray w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search experts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="cosmic-input pl-10 w-full"
                />
              </div>

              {/* Specialization Filter */}
              <select
                value={selectedSpecialization}
                onChange={(e) => setSelectedSpecialization(e.target.value)}
                className="cosmic-input w-full"
              >
                {specializations.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>

              {/* Price Range Filter */}
              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="cosmic-input w-full"
              >
                {priceRanges.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>

              {/* Sort By */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="cosmic-input w-full"
              >
                <option value="rating">Sort by Rating</option>
                <option value="price">Sort by Price</option>
                <option value="experience">Sort by Experience</option>
                <option value="reviews">Sort by Reviews</option>
              </select>
            </div>
          </motion.div>

          {/* Experts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExperts.map((expert, index) => (
              <motion.div
                key={expert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="cosmic-card"
              >
                {/* Expert Header */}
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-16 h-16 bg-electric-violet/20 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-electric-violet" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-starlight-white">{expert.name}</h3>
                    <p className="text-electric-violet font-semibold">{expert.title}</p>
                    <p className="text-stellar-gray-light text-sm">{expert.specialization}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 mb-1">
                      <Star className="w-4 h-4 text-supernova-gold fill-current" />
                      <span className="text-starlight-white font-semibold">{expert.rating}</span>
                    </div>
                    <div className="text-stellar-gray-light text-sm">{expert.reviews} reviews</div>
                  </div>
                </div>

                {/* Expert Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-stellar-gray-light">Experience:</span>
                    <span className="text-starlight-white">{expert.experience}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stellar-gray-light">Price:</span>
                    <span className="text-supernova-gold font-semibold">${expert.price}/session</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stellar-gray-light">Response Time:</span>
                    <span className="text-starlight-white">{expert.responseTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stellar-gray-light">Success Rate:</span>
                    <span className="text-aurora-green font-semibold">{expert.successRate}</span>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-stellar-gray-light text-sm mb-4 line-clamp-3">
                  {expert.bio}
                </p>

                {/* Specialties */}
                <div className="mb-4">
                  <h4 className="text-starlight-white font-semibold mb-2">Specialties:</h4>
                  <div className="flex flex-wrap gap-2">
                    {expert.specialties.slice(0, 3).map((specialty, specIndex) => (
                      <span
                        key={specIndex}
                        className="bg-electric-violet/20 text-electric-violet px-2 py-1 rounded-lg text-xs"
                      >
                        {specialty}
                      </span>
                    ))}
                    {expert.specialties.length > 3 && (
                      <span className="text-stellar-gray-light text-xs">
                        +{expert.specialties.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Languages */}
                <div className="mb-6">
                  <h4 className="text-starlight-white font-semibold mb-2">Languages:</h4>
                  <div className="flex flex-wrap gap-2">
                    {expert.languages.map((language, langIndex) => (
                      <span
                        key={langIndex}
                        className="bg-cosmic-navy/50 text-stellar-gray-light px-2 py-1 rounded-lg text-xs"
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleBookConsultation(expert.id)}
                    className="flex-1 cosmic-button flex items-center justify-center space-x-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book</span>
                  </button>
                  <button
                    onClick={() => handleSendMessage(expert.id)}
                    className="flex-1 bg-cosmic-navy border border-electric-violet/30 text-electric-violet rounded-xl px-4 py-2 hover:bg-electric-violet/10 transition-all flex items-center justify-center space-x-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Message</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {filteredExperts.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="w-24 h-24 bg-stellar-gray/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-stellar-gray" />
              </div>
              <h3 className="text-xl font-bold text-starlight-white mb-2">No Experts Found</h3>
              <p className="text-stellar-gray-light">
                Try adjusting your search criteria to find the perfect cosmic guide.
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Bottom spacing for navigation */}
        <div className="h-24" />

        {/* Cosmic Navigation */}
        <CosmicNavigation />
      </div>
    </div>
  )
}
