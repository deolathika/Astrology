'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  Sparkles, 
  Star, 
  Moon, 
  Heart, 
  Calculator,
  Users,
  Settings,
  Bell,
  Search,
  Sun,
  ChevronDown,
  User,
  Crown,
  Shield,
  Zap,
  Target,
  BookOpen,
  Calendar,
  TrendingUp,
  Activity,
  Globe,
  MapPin,
  Clock,
  Lock,
  Unlock,
  Mail,
  Phone,
  MessageCircle,
  Share2,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Github,
  Linkedin,
  ArrowRight,
  CheckCircle,
  Award,
  Star as StarIcon,
  Heart as HeartIcon,
  Globe as GlobeIcon
} from 'lucide-react'
import { useResponsive } from '@/hooks/useDevice'

export default function OptimizedFooter() {
  const responsive = useResponsive()
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false)
  const [email, setEmail] = useState('')

  const footerSections = [
    {
      title: 'Features',
      links: [
        { name: 'Daily Horoscope', href: '/zodiac', icon: Star },
        { name: 'Dream Analysis', href: '/dreams', icon: Moon },
        { name: 'Love Compatibility', href: '/compatibility', icon: Heart },
        { name: 'Numerology', href: '/numerology', icon: Calculator },
        { name: 'Community', href: '/community', icon: Users }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Blog', href: '/blog', icon: BookOpen },
        { name: 'Help Center', href: '/help', icon: Target },
        { name: 'API Docs', href: '/api', icon: Settings },
        { name: 'Tutorials', href: '/tutorials', icon: BookOpen },
        { name: 'FAQ', href: '/faq', icon: MessageCircle }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about', icon: Users },
        { name: 'Careers', href: '/careers', icon: TrendingUp },
        { name: 'Press', href: '/press', icon: Globe },
        { name: 'Contact', href: '/contact', icon: Mail },
        { name: 'Partners', href: '/partners', icon: Heart }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/privacy', icon: Shield },
        { name: 'Terms of Service', href: '/terms', icon: BookOpen },
        { name: 'Cookie Policy', href: '/cookies', icon: Settings },
        { name: 'GDPR', href: '/gdpr', icon: Shield },
        { name: 'Accessibility', href: '/accessibility', icon: Target }
      ]
    }
  ]

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: Facebook, color: 'hover:text-blue-400' },
    { name: 'Twitter', href: '#', icon: Twitter, color: 'hover:text-blue-400' },
    { name: 'Instagram', href: '#', icon: Instagram, color: 'hover:text-pink-400' },
    { name: 'YouTube', href: '#', icon: Youtube, color: 'hover:text-red-400' },
    { name: 'GitHub', href: '#', icon: Github, color: 'hover:text-gray-400' },
    { name: 'LinkedIn', href: '#', icon: Linkedin, color: 'hover:text-blue-400' }
  ]

  const stats = [
    { number: '50K+', label: 'Active Users', icon: Users },
    { number: '1M+', label: 'Readings Given', icon: Star },
    { number: '98%', label: 'Accuracy Rate', icon: Award },
    { number: '24/7', label: 'Available', icon: Clock }
  ]

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      // Handle newsletter subscription
      console.log('Newsletter subscription:', email)
      setEmail('')
      setIsNewsletterOpen(false)
    }
  }

  // Mobile Footer
  if (responsive.isMobile) {
    return (
      <footer className="glass-nav border-t border-white/10">
        <div className="container mx-auto px-4 py-8">
          {/* Logo and Description */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Daily Secrets</h3>
            <p className="text-white/70 text-sm mb-4">
              Your personalized cosmic journey with AI-powered insights
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-white/70 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Quick Links */}
          <div className="mb-8">
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {footerSections[0].links.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors py-2"
                >
                  <link.icon className="w-4 h-4" />
                  <span className="text-sm">{link.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="mb-8">
            <h4 className="text-white font-semibold mb-4">Follow Us</h4>
            <div className="flex justify-center space-x-4">
              {socialLinks.slice(0, 4).map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`w-10 h-10 glass-button flex items-center justify-center text-white/70 ${social.color} transition-colors`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="glass-card p-4 mb-8">
            <h4 className="text-white font-semibold mb-2">Stay Updated</h4>
            <p className="text-white/70 text-sm mb-4">
              Get the latest cosmic insights delivered to your inbox
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 glass-input px-3 py-2 text-sm"
                required
              />
              <button
                type="submit"
                className="glass-button px-4 py-2 text-sm"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Copyright */}
          <div className="text-center text-white/60 text-sm">
            <p>&copy; 2024 Daily Secrets. All rights reserved.</p>
            <div className="flex justify-center space-x-4 mt-2">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    )
  }

  // Desktop Footer
  return (
    <footer className="glass-nav border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Daily Secrets</h3>
                <p className="text-white/60 text-sm">Cosmic Insights</p>
              </div>
            </div>
            <p className="text-white/70 text-sm mb-6">
              Your personalized cosmic journey with AI-powered insights, daily horoscopes, and spiritual guidance.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-lg font-bold text-white">{stat.number}</div>
                  <div className="text-white/70 text-xs">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-white font-semibold mb-3">Follow Us</h4>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`w-10 h-10 glass-button flex items-center justify-center text-white/70 ${social.color} transition-colors`}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="text-white font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors group"
                    >
                      <link.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span className="text-sm">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-2">Stay Connected</h3>
            <p className="text-white/70 mb-6">
              Get the latest cosmic insights, spiritual guidance, and exclusive content delivered to your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 glass-input px-4 py-3 rounded-l-lg"
                required
              />
              <button
                type="submit"
                className="glass-button bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-6 py-3 rounded-r-lg font-medium flex items-center space-x-2"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
            <p className="text-white/60 text-xs mt-3">
              Join 10,000+ cosmic seekers. Unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-white/60 text-sm">
              <p>&copy; 2024 Daily Secrets. All rights reserved.</p>
              <p className="mt-1">Made with ❤️ for cosmic seekers worldwide</p>
            </div>
            
            <div className="flex items-center space-x-6">
              <Link href="/privacy" className="text-white/60 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-white/60 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-white/60 hover:text-white text-sm transition-colors">
                Contact Us
              </Link>
              <div className="flex items-center space-x-2 text-white/60 text-sm">
                <GlobeIcon className="w-4 h-4" />
                <span>English</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
