'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  MessageCircle, 
  Heart, 
  Star, 
  Share2, 
  Plus,
  Search,
  Filter,
  TrendingUp,
  Calendar,
  MapPin
} from 'lucide-react'
import { CosmicNavigation } from '@/components/cosmic-navigation'

const communityPosts = [
  {
    id: 1,
    user: {
      name: 'Cosmic Explorer',
      avatar: '🌟',
      level: 'Stellar Navigator'
    },
    content: 'Just had the most amazing dream about flying through the cosmos! The interpretation was spot on - I\'m feeling so connected to the universe today ✨',
    timestamp: '2 hours ago',
    likes: 24,
    comments: 8,
    shares: 3,
    tags: ['dreams', 'cosmic', 'flying']
  },
  {
    id: 2,
    user: {
      name: 'Stellar Seeker',
      avatar: '🔮',
      level: 'Cosmic Master'
    },
    content: 'My numerology reading revealed that today is my lucky day! The numbers 7 and 14 keep appearing everywhere. Anyone else experiencing this?',
    timestamp: '4 hours ago',
    likes: 18,
    comments: 12,
    shares: 5,
    tags: ['numerology', 'lucky', 'numbers']
  },
  {
    id: 3,
    user: {
      name: 'Moon Child',
      avatar: '🌙',
      level: 'Stellar Navigator'
    },
    content: 'The full moon energy is incredible tonight! Perfect time for manifestation and setting intentions. What are you manifesting this lunar cycle?',
    timestamp: '6 hours ago',
    likes: 31,
    comments: 15,
    shares: 8,
    tags: ['fullmoon', 'manifestation', 'intentions']
  }
]

const trendingTopics = [
  { name: 'Full Moon Energy', posts: 156, icon: '🌕' },
  { name: 'Numerology Insights', posts: 89, icon: '🔢' },
  { name: 'Dream Interpretation', posts: 67, icon: '💭' },
  { name: 'Cosmic Guidance', posts: 134, icon: '✨' },
  { name: 'Zodiac Compatibility', posts: 78, icon: '💕' }
]

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState('feed')
  const [searchQuery, setSearchQuery] = useState('')

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
              Cosmic Community
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-stellar-gray-light"
            >
              Connect with fellow cosmic explorers and share your journey
            </motion.p>
          </div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="cosmic-card max-w-4xl mx-auto mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stellar-gray-light" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search community posts..."
                  className="cosmic-input w-full pl-12"
                />
              </div>
              <button className="cosmic-button flex items-center space-x-2 px-6">
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
            </div>
          </motion.div>

          <div className="max-w-6xl mx-auto grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Tabs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex space-x-4 mb-8"
              >
                <button
                  onClick={() => setActiveTab('feed')}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                    activeTab === 'feed'
                      ? 'bg-electric-violet text-white'
                      : 'bg-cosmic-navy text-stellar-gray-light hover:text-electric-violet'
                  }`}
                >
                  Feed
                </button>
                <button
                  onClick={() => setActiveTab('trending')}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                    activeTab === 'trending'
                      ? 'bg-electric-violet text-white'
                      : 'bg-cosmic-navy text-stellar-gray-light hover:text-electric-violet'
                  }`}
                >
                  Trending
                </button>
                <button
                  onClick={() => setActiveTab('nearby')}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                    activeTab === 'nearby'
                      ? 'bg-electric-violet text-white'
                      : 'bg-cosmic-navy text-stellar-gray-light hover:text-electric-violet'
                  }`}
                >
                  Nearby
                </button>
              </motion.div>

              {/* Posts */}
              <div className="space-y-6">
                {communityPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="cosmic-card"
                  >
                    {/* Post Header */}
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="text-2xl">{post.user.avatar}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-starlight-white font-semibold">
                            {post.user.name}
                          </h3>
                          <span className="text-xs bg-supernova-gold text-deep-space px-2 py-1 rounded-full">
                            {post.user.level}
                          </span>
                        </div>
                        <p className="text-stellar-gray-light text-sm">{post.timestamp}</p>
                      </div>
                    </div>

                    {/* Post Content */}
                    <p className="text-starlight-white mb-4 leading-relaxed">
                      {post.content}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-electric-violet/20 text-electric-violet px-2 py-1 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Post Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-electric-violet/20">
                      <div className="flex items-center space-x-6">
                        <button className="flex items-center space-x-2 text-stellar-gray-light hover:text-nebula-red transition-colors">
                          <Heart className="w-5 h-5" />
                          <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-stellar-gray-light hover:text-electric-violet transition-colors">
                          <MessageCircle className="w-5 h-5" />
                          <span>{post.comments}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-stellar-gray-light hover:text-supernova-gold transition-colors">
                          <Share2 className="w-5 h-5" />
                          <span>{post.shares}</span>
                        </button>
                      </div>
                      <button className="text-stellar-gray-light hover:text-electric-violet transition-colors">
                        <Star className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Create Post */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="cosmic-card"
              >
                <button className="w-full cosmic-button flex items-center justify-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>Create Post</span>
                </button>
              </motion.div>

              {/* Trending Topics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="cosmic-card"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <TrendingUp className="w-6 h-6 text-electric-violet" />
                  <h3 className="text-lg font-bold text-starlight-white">
                    Trending Topics
                  </h3>
                </div>
                
                <div className="space-y-3">
                  {trendingTopics.map((topic, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-xl bg-cosmic-navy/50 hover:bg-cosmic-navy/70 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{topic.icon}</span>
                        <div>
                          <div className="text-starlight-white font-semibold text-sm">
                            {topic.name}
                          </div>
                          <div className="text-stellar-gray-light text-xs">
                            {topic.posts} posts
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Community Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="cosmic-card"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <Users className="w-6 h-6 text-supernova-gold" />
                  <h3 className="text-lg font-bold text-starlight-white">
                    Community Stats
                  </h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-stellar-gray-light">Active Members</span>
                    <span className="text-starlight-white font-semibold">2,847</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stellar-gray-light">Posts Today</span>
                    <span className="text-starlight-white font-semibold">156</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stellar-gray-light">Online Now</span>
                    <span className="text-aurora-green font-semibold">342</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Bottom spacing for navigation */}
        <div className="h-24" />

        {/* Cosmic Navigation */}
        <CosmicNavigation />
      </div>
    </div>
  )
}
