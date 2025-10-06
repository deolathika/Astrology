'use client'

import React from 'react'
import Link from 'next/link'
import { 
  Instagram, 
  MessageCircle, 
  Twitter, 
  Facebook,
  Sparkles,
  Mail,
  Phone,
  MapPin,
  Heart,
  Star,
  Shield,
  Award
} from 'lucide-react'

const socialLinks = [
  { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-400' },
  { name: 'WhatsApp', icon: MessageCircle, href: '#', color: 'hover:text-green-400' },
  { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-blue-400' },
  { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-blue-500' },
]

const footerLinks = [
  { name: 'About', href: '/about' },
  { name: 'Terms', href: '/terms' },
  { name: 'Privacy', href: '/privacy' },
  { name: 'Contact', href: '/contact' },
]

const featureLinks = [
  { name: 'Zodiac Signs', href: '/zodiac' },
  { name: 'Numerology', href: '/numerology' },
  { name: 'Compatibility', href: '/compatibility' },
  { name: 'Dream Analysis', href: '/dreams' },
]

const supportLinks = [
  { name: 'Help Center', href: '/help' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Community', href: '/community' },
  { name: 'Premium', href: '/premium' },
]

const companyLinks = [
  { name: 'Careers', href: '/careers' },
  { name: 'Press', href: '/press' },
  { name: 'Partners', href: '/partners' },
  { name: 'Blog', href: '/blog' },
]

export default function Footer() {
  return (
    <footer className="glass-footer">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <span className="text-3xl font-bold text-gradient">
                Daily Secrets
              </span>
            </div>
            <p className="text-body text-secondary leading-relaxed">
              Discover your personal journey through astrology, numerology, and dream analysis with the most accurate insights and beautiful interface.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className={`w-12 h-12 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all duration-300 text-white ${social.color} group`}
                >
                  <social.icon className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                </Link>
              ))}
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-4 pt-4">
              <div className="flex items-center space-x-2 text-caption text-muted">
                <Shield className="w-4 h-4" />
                <span>Secure</span>
              </div>
              <div className="flex items-center space-x-2 text-caption text-muted">
                <Award className="w-4 h-4" />
                <span>Trusted</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-subtitle text-white mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-body text-secondary hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-subtitle text-white mb-6">Features</h3>
            <ul className="space-y-4">
              {featureLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-body text-secondary hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Company */}
          <div>
            <h3 className="text-subtitle text-white mb-6">Support</h3>
            <ul className="space-y-4 mb-8">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-body text-secondary hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-subtitle text-white mb-6">Company</h3>
            <ul className="space-y-4">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-body text-secondary hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-white/10 mt-16 pt-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-title text-white mb-4">Stay Updated</h3>
            <p className="text-body text-secondary mb-8">
              Get the latest cosmic insights and updates delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="glass-input flex-1"
              />
              <button className="glass-button px-8 py-3">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-6 mb-4 md:mb-0">
            <p className="text-caption text-muted">
              © 2024 Daily Secrets. All rights reserved.
            </p>
            <div className="flex items-center space-x-2 text-caption text-muted">
              <Heart className="w-4 h-4 text-red-400" />
              <span>Made with love</span>
            </div>
          </div>
          <div className="flex space-x-8">
            <Link href="/privacy" className="text-caption text-muted hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-caption text-muted hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-caption text-muted hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}