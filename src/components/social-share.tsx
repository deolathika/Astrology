'use client'

/**
 * Social Share Component
 * Provides sharing functionality for cosmic content
 */

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Share2, Sparkles, X, MessageCircle, Instagram, Twitter, Facebook } from 'lucide-react'
interface SocialShareProps {
  content?: {
    title: string
    description: string
    image?: string
    url?: string
  }
  title?: string
  text?: string
  url?: string
  onShare?: (platform: string) => void
}

export function SocialShare({ content, title, text, url, onShare }: SocialShareProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  // Handle both content object and individual props
  const shareUrl = content?.url || url || (typeof window !== 'undefined' ? window.location.href : '')
  const shareText = content ? `${content.title} - ${content.description}` : (text || title || '')

  const shareOptions = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-green-500',
      action: () => shareToWhatsApp()
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: Instagram,
      color: 'bg-pink-500',
      action: () => shareToInstagram()
    },
    {
      id: 'twitter',
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-blue-400',
      action: () => shareToTwitter()
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600',
      action: () => shareToFacebook()
    },
    {
      id: 'email',
      name: 'Email',
      icon: Mail,
      color: 'bg-gray-500',
      action: () => shareToEmail()
    },
    {
      id: 'copy',
      name: 'Copy Link',
      icon: copied ? Check : Copy,
      color: 'bg-purple-500',
      action: () => copyToClipboard()
    }
  ]

  const shareToWhatsApp = () => {
    const text = encodeURIComponent(shareText)
    const url = `https://wa.me/?text=${text}%20${encodeURIComponent(shareUrl)}`
    window.open(url, '_blank')
    onShare?.('whatsapp')
  }

  const shareToInstagram = () => {
    // Instagram doesn't support direct sharing, open in new tab
    window.open('https://www.instagram.com/', '_blank')
    onShare?.('instagram')
  }

  const shareToTwitter = () => {
    const text = encodeURIComponent(shareText)
    const url = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(shareUrl)}`
    window.open(url, '_blank')
    onShare?.('twitter')
  }

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    window.open(url, '_blank')
    onShare?.('facebook')
  }

  const shareToEmail = () => {
    const subject = encodeURIComponent(content.title)
    const body = encodeURIComponent(`${shareText}\n\n${shareUrl}`)
    const url = `mailto:?subject=${subject}&body=${body}`
    window.open(url)
    onShare?.('email')
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      onShare?.('copy')
    } catch (error) {
      }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2 bg-electric-violet hover:bg-electric-violet/90 text-starlight-white rounded-lg transition-colors duration-200"
      >
        <Share2 className="w-4 h-4" />
        Share
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-cosmic-navy/95 backdrop-blur-lg rounded-2xl p-6 border border-electric-violet/20 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-starlight-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-electric-violet" />
                  Share Your Cosmic Journey
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-stellar-gray-light hover:text-starlight-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                {shareOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => {
                      option.action()
                      setIsOpen(false)
                    }}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-stellar-gray/30 transition-colors duration-200 group"
                  >
                    <div className={`p-2 rounded-lg ${option.color} text-white`}>
                      <option.icon className="w-5 h-5" />
                    </div>
                    <span className="text-starlight-white font-medium group-hover:text-electric-violet transition-colors">
                      {option.name}
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-stellar-gray/30">
                <p className="text-sm text-stellar-gray-light text-center">
                  Share your cosmic insights with friends and family
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
