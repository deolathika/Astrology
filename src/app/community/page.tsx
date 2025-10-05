/**
 * Community Page
 * Social features and user interactions
 */

'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Plus, 
  Search, 
  Filter, 
  TrendingUp, 
  Users, 
  MessageCircle,
  Star,
  Heart,
  Sparkles
} from 'lucide-react'
import AppShell from '@/components/layout/AppShell'
import PostCard from '@/components/community/PostCard'
import CosmicButton from '@/components/cosmic/CosmicButton'

interface Post {
  id: string
  author: {
    id: string
    name: string
    avatar?: string
    zodiacSign?: string
    isVerified?: boolean
  }
  content: string
  images?: string[]
  likes: number
  comments: number
  shares: number
  isLiked: boolean
  isBookmarked: boolean
  createdAt: string
  tags?: string[]
  type: 'insight' | 'question' | 'experience' | 'discussion'
}

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(true)

  // Mock data - in real app, this would come from API
  useEffect(() => {
    const mockPosts: Post[] = [
      {
        id: '1',
        author: {
          id: 'user1',
          name: 'Sarah Chen',
          zodiacSign: 'Pisces',
          isVerified: true
        },
        content: 'Just had the most incredible dream about flying over the ocean. The water was so clear I could see the stars reflected in it. Anyone else have dreams like this? 🌊✨',
        likes: 24,
        comments: 8,
        shares: 3,
        isLiked: false,
        isBookmarked: false,
        createdAt: '2024-01-15T10:30:00Z',
        tags: ['dreams', 'water', 'flying'],
        type: 'experience'
      },
      {
        id: '2',
        author: {
          id: 'user2',
          name: 'Marcus Johnson',
          zodiacSign: 'Leo'
        },
        content: 'My numerology reading said I\'m a life path 7, and honestly it explains SO much about my introspective nature and love for spiritual exploration. Anyone else a 7?',
        likes: 18,
        comments: 12,
        shares: 5,
        isLiked: true,
        isBookmarked: true,
        createdAt: '2024-01-15T08:15:00Z',
        tags: ['numerology', 'life-path-7', 'spiritual'],
        type: 'insight'
      },
      {
        id: '3',
        author: {
          id: 'user3',
          name: 'Elena Rodriguez',
          zodiacSign: 'Scorpio',
          isVerified: true
        },
        content: 'Question for the community: How do you handle Mercury retrograde? I feel like everything is going wrong this week! 😅',
        likes: 31,
        comments: 25,
        shares: 7,
        isLiked: false,
        isBookmarked: false,
        createdAt: '2024-01-14T16:45:00Z',
        tags: ['mercury-retrograde', 'help', 'astrology'],
        type: 'question'
      }
    ]

    setTimeout(() => {
      setPosts(mockPosts)
      setIsLoading(false)
    }, 1000)
  }, [])

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked, 
            likes: post.isLiked ? post.likes - 1 : post.likes + 1 
          }
        : post
    ))
  }

  const handleBookmark = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, isBookmarked: !post.isBookmarked }
        : post
    ))
  }

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesFilter = filterType === 'all' || post.type === filterType
    
    return matchesSearch && matchesFilter
  })

  const filterTypes = [
    { id: 'all', label: 'All Posts', icon: MessageCircle },
    { id: 'insight', label: 'Insights', icon: Sparkles },
    { id: 'question', label: 'Questions', icon: TrendingUp },
    { id: 'experience', label: 'Experiences', icon: Heart },
    { id: 'discussion', label: 'Discussions', icon: Users }
  ]

  return (
    <AppShell>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Cosmic Community
              </h1>
              <p className="text-gray-600 mt-2">
                Connect with fellow cosmic explorers and share your journey
              </p>
            </div>
            
            <CosmicButton
              variant="premium"
              size="lg"
              icon={<Plus className="w-5 h-5" />}
            >
              Share Your Story
            </CosmicButton>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Search */}
            <div className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Search Posts</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search community..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Filter by Type</h3>
              <div className="space-y-2">
                {filterTypes.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setFilterType(filter.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      filterType === filter.id
                        ? 'bg-purple-100 text-purple-700'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <filter.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{filter.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Community Stats */}
            <div className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Community Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Members</span>
                  <span className="font-semibold text-purple-600">2,847</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Posts Today</span>
                  <span className="font-semibold text-purple-600">156</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Discussions</span>
                  <span className="font-semibold text-purple-600">89</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-3"
          >
            {isLoading ? (
              <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl p-6 animate-pulse">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-300 rounded w-24"></div>
                        <div className="h-3 bg-gray-300 rounded w-32"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-300 rounded w-full"></div>
                      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredPosts.length === 0 ? (
                  <div className="text-center py-12">
                    <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts found</h3>
                    <p className="text-gray-600 mb-6">
                      {searchQuery ? 'Try adjusting your search terms' : 'Be the first to share something with the community!'}
                    </p>
                    <CosmicButton variant="primary" size="lg">
                      Create First Post
                    </CosmicButton>
                  </div>
                ) : (
                  filteredPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <PostCard
                        post={post}
                        onLike={handleLike}
                        onBookmark={handleBookmark}
                        onComment={(postId) => console.log('Comment on post:', postId)}
                        onShare={(postId) => console.log('Share post:', postId)}
                        onReport={(postId) => console.log('Report post:', postId)}
                      />
                    </motion.div>
                  ))
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AppShell>
  )
}