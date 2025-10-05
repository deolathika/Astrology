/**
 * Community Post Card Component
 * Displays user posts with interactions
 */

'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  MoreHorizontal, 
  Flag,
  Star,
  ThumbsUp,
  Bookmark
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
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

interface PostCardProps {
  post: Post
  onLike?: (postId: string) => void
  onComment?: (postId: string) => void
  onShare?: (postId: string) => void
  onBookmark?: (postId: string) => void
  onReport?: (postId: string) => void
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  onLike,
  onComment,
  onShare,
  onBookmark,
  onReport
}) => {
  const [showActions, setShowActions] = useState(false)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'insight': return '💡'
      case 'question': return '❓'
      case 'experience': return '✨'
      case 'discussion': return '💬'
      default: return '📝'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'insight': return 'from-yellow-400 to-orange-400'
      case 'question': return 'from-blue-400 to-cyan-400'
      case 'experience': return 'from-purple-400 to-pink-400'
      case 'discussion': return 'from-green-400 to-emerald-400'
      default: return 'from-gray-400 to-slate-400'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/90 transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
            {post.author.avatar ? (
              <img 
                src={post.author.avatar} 
                alt={post.author.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              post.author.name.charAt(0).toUpperCase()
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
              {post.author.isVerified && (
                <Star className="w-4 h-4 text-blue-500" />
              )}
            </div>
            <p className="text-sm text-gray-600">
              {post.author.zodiacSign && `${post.author.zodiacSign} • `}
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${getTypeColor(post.type)} text-white text-sm font-medium`}>
            {getTypeIcon(post.type)} {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
          </div>
          
          <button
            onClick={() => setShowActions(!showActions)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <MoreHorizontal className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
          {post.content}
        </p>
        
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Images */}
      {post.images && post.images.length > 0 && (
        <div className="grid grid-cols-2 gap-2 mb-4">
          {post.images.slice(0, 4).map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Post image ${index + 1}`}
              className="w-full h-32 object-cover rounded-lg"
            />
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center gap-6">
          <CosmicButton
            onClick={() => onLike?.(post.id)}
            variant={post.isLiked ? 'primary' : 'ghost'}
            size="sm"
            icon={<Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />}
          >
            {post.likes}
          </CosmicButton>
          
          <CosmicButton
            onClick={() => onComment?.(post.id)}
            variant="ghost"
            size="sm"
            icon={<MessageCircle className="w-4 h-4" />}
          >
            {post.comments}
          </CosmicButton>
          
          <CosmicButton
            onClick={() => onShare?.(post.id)}
            variant="ghost"
            size="sm"
            icon={<Share2 className="w-4 h-4" />}
          >
            {post.shares}
          </CosmicButton>
        </div>
        
        <CosmicButton
          onClick={() => onBookmark?.(post.id)}
          variant={post.isBookmarked ? 'primary' : 'ghost'}
          size="sm"
          icon={<Bookmark className={`w-4 h-4 ${post.isBookmarked ? 'fill-current' : ''}`} />}
        />
      </div>

      {/* Action Menu */}
      {showActions && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-10"
        >
          <button
            onClick={() => onReport?.(post.id)}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left"
          >
            <Flag className="w-4 h-4" />
            Report
          </button>
        </motion.div>
      )}
    </motion.div>
  )
}

export default PostCard
