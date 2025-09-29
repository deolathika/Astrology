'use client'

/**
 * WhatsApp Share Component
 * Optimized for WhatsApp sharing with Sri Lankan context
 */

import { motion } from 'framer-motion'
interface WhatsAppShareProps {
  content: {
    title: string
    description: string
    zodiacSign?: string
    lifePath?: number
    date?: string
    type: 'daily_guidance' | 'dream_interpretation' | 'compatibility' | 'numerology'
  }
  onShare?: () => void
}

export function WhatsAppShare({ content, onShare }: WhatsAppShareProps) {
  const [copied, setCopied] = useState(false)

  const formatWhatsAppMessage = () => {
    const emoji = getTypeEmoji(content.type)
    const dateStr = content.date ? `\n📅 ${content.date}` : ''
    const zodiacStr = content.zodiacSign ? `\n♈ ${content.zodiacSign}` : ''
    const lifePathStr = content.lifePath ? `\n🔢 Life Path ${content.lifePath}` : ''
    
    return `${emoji} *${content.title}*

${content.description}${dateStr}${zodiacStr}${lifePathStr}

✨ *Daily Secrets* - Your cosmic journey awaits!
🌐 https://dailysecrets.com`
  }

  const getTypeEmoji = (type: string) => {
    switch (type) {
      case 'daily_guidance':
        return '☀️'
      case 'dream_interpretation':
        return '🌙'
      case 'compatibility':
        return '💕'
      case 'numerology':
        return '🔢'
      default:
        return '✨'
    }
  }

  const shareToWhatsApp = () => {
    const message = formatWhatsAppMessage()
    const encodedMessage = encodeURIComponent(message)
    const url = `https://wa.me/?text=${encodedMessage}`
    
    window.open(url, '_blank')
    onShare?.()
  }

  const copyMessage = async () => {
    try {
      const message = formatWhatsAppMessage()
      await navigator.clipboard.writeText(message)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      }
  }

  return (
    <div className="space-y-4">
      {/* WhatsApp Preview */}
      <motion.div
        className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-green-500 rounded-full">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-starlight-white">WhatsApp Share</h3>
            <p className="text-sm text-stellar-gray-light">Optimized for Sri Lankan users</p>
          </div>
        </div>

        <div className="bg-stellar-gray/20 rounded-lg p-4 mb-4">
          <pre className="text-sm text-starlight-white whitespace-pre-wrap font-sans">
            {formatWhatsAppMessage()}
          </pre>
        </div>

        <div className="flex gap-3">
          <button
            onClick={shareToWhatsApp}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200"
          >
            <MessageCircle className="w-4 h-4" />
            Share on WhatsApp
          </button>
          <button
            onClick={copyMessage}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-stellar-gray hover:bg-stellar-gray/80 text-starlight-white rounded-lg transition-colors duration-200"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </motion.div>

      {/* Quick Share Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={shareToWhatsApp}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-400 rounded-lg transition-colors duration-200"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </button>
        <button
          onClick={copyMessage}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-stellar-gray/20 hover:bg-stellar-gray/30 border border-stellar-gray/30 text-stellar-gray-light rounded-lg transition-colors duration-200"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied!' : 'Copy Text'}
        </button>
      </div>
    </div>
  )
}
