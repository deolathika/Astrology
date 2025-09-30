'use client'

/**
 * Share Card Component
 * Generates beautiful shareable cards for social media
 */

import { motion } from 'framer-motion'
import { Share2, Download, Sun, Moon, Heart, Star, Sparkles } from 'lucide-react'
interface ShareCardProps {
  content: {
    title: string
    description: string
    zodiacSign?: string
    lifePath?: number
    date?: string
    type: 'daily_guidance' | 'dream_interpretation' | 'compatibility' | 'numerology'
  }
  onShare?: () => void
  onDownload?: () => void
}

export function ShareCard({ content, onShare, onDownload }: ShareCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const getCardStyle = () => {
    const baseStyle = "relative overflow-hidden rounded-2xl p-8 text-starlight-white"
    
    switch (content.type) {
      case 'daily_guidance':
        return `${baseStyle} bg-gradient-to-br from-electric-violet via-cosmic-purple to-stellar-pink`
      case 'dream_interpretation':
        return `${baseStyle} bg-gradient-to-br from-celestial-blue via-cosmic-cyan to-stellar-teal`
      case 'compatibility':
        return `${baseStyle} bg-gradient-to-br from-supernova-gold via-stellar-yellow to-cosmic-orange`
      case 'numerology':
        return `${baseStyle} bg-gradient-to-br from-aurora-green via-stellar-teal to-celestial-blue`
      default:
        return `${baseStyle} bg-gradient-to-br from-electric-violet to-cosmic-purple`
    }
  }

  const getIcon = () => {
    switch (content.type) {
      case 'daily_guidance':
        return <Sun className="w-8 h-8" />
      case 'dream_interpretation':
        return <Moon className="w-8 h-8" />
      case 'compatibility':
        return <Heart className="w-8 h-8" />
      case 'numerology':
        return <Star className="w-8 h-8" />
      default:
        return <Sparkles className="w-8 h-8" />
    }
  }

  const downloadCard = async () => {
    if (!cardRef.current) return

    try {
      // This would require html2canvas or similar library
      // For now, we'll just trigger the download callback
      onDownload?.()
    } catch (error) {
      }
  }

  return (
    <div className="space-y-4">
      {/* Share Card Preview */}
      <motion.div
        ref={cardRef}
        className={getCardStyle()}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4">
            {getIcon()}
          </div>
          <div className="absolute bottom-4 left-4">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            {getIcon()}
            <div>
              <h3 className="text-xl font-bold">{content.title}</h3>
              {content.date && (
                <p className="text-sm opacity-80">{content.date}</p>
              )}
            </div>
          </div>

          <p className="text-lg leading-relaxed mb-6">
            {content.description}
          </p>

          {/* Footer Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm opacity-80">
              {content.zodiacSign && (
                <span>♈ {content.zodiacSign}</span>
              )}
              {content.lifePath && (
                <span>Life Path {content.lifePath}</span>
              )}
            </div>
            <div className="text-sm opacity-60">
              Daily Secrets
            </div>
          </div>
        </div>

        {/* Hover Overlay */}
        <motion.div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex gap-2">
            <button
              onClick={onShare}
              className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={downloadCard}
              className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
            >
              <Download className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={onShare}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-electric-violet hover:bg-electric-violet/90 text-starlight-white rounded-lg transition-colors duration-200"
        >
          <Share2 className="w-4 h-4" />
          Share Card
        </button>
        <button
          onClick={downloadCard}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-stellar-gray hover:bg-stellar-gray/80 text-starlight-white rounded-lg transition-colors duration-200"
        >
          <Download className="w-4 h-4" />
          Download
        </button>
      </div>
    </div>
  )
}
