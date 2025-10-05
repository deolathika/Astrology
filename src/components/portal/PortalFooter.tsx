/**
 * Portal Footer Component
 * Footer with legal links and social share
 */

'use client'

import React from 'react'
import Link from 'next/link'
import { 
  Sparkles, 
  Heart, 
  Mail, 
  Twitter, 
  Facebook, 
  Instagram,
  MessageCircle,
  Globe,
  Shield,
  FileText
} from 'lucide-react'

const footerSections = [
  {
    title: 'Features',
    links: [
      { name: 'Astrology', href: '/portal/zodiac' },
      { name: 'Numerology', href: '/portal/numerology' },
      { name: 'Compatibility', href: '/portal/compatibility' },
      { name: 'Dream Analysis', href: '/portal/dreams' },
      { name: 'Sri Lankan Astrology', href: '/portal/sri-lanka-astrology' }
    ]
  },
  {
    title: 'Community',
    links: [
      { name: 'Community Forum', href: '/portal/community' },
      { name: 'Expert Insights', href: '/portal/features' },
      { name: 'User Stories', href: '/portal/about' },
      { name: 'Events', href: '/portal/features' }
    ]
  },
  {
    title: 'Support',
    links: [
      { name: 'Help Center', href: '/portal/faq' },
      { name: 'Contact Us', href: '/portal/about' },
      { name: 'Bug Reports', href: '/portal/about' },
      { name: 'Feature Requests', href: '/portal/about' }
    ]
  },
  {
    title: 'Legal',
    links: [
      { name: 'Terms of Service', href: '/portal/legal/terms' },
      { name: 'Privacy Policy', href: '/portal/legal/privacy' },
      { name: 'Cookie Policy', href: '/portal/legal/privacy' },
      { name: 'DMCA', href: '/portal/legal/dmca' }
    ]
  }
]

const socialLinks = [
  { name: 'Twitter', href: '#', icon: Twitter },
  { name: 'Facebook', href: '#', icon: Facebook },
  { name: 'Instagram', href: '#', icon: Instagram },
  { name: 'WhatsApp', href: '#', icon: MessageCircle }
]

export function PortalFooter() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 portal-gradient-violet rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Daily Secrets</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Discover your cosmic secrets with personalized astrology, numerology, 
              and dream analysis. Your journey to self-discovery starts here.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-violet-600 transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-4 text-gray-400 text-sm">
              <span>© 2024 Daily Secrets. All rights reserved.</span>
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-red-400" />
                <span>Made with love for the cosmic community</span>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <Shield className="w-4 h-4" />
                <span>Secure</span>
              </div>
              <div className="flex items-center space-x-1">
                <Globe className="w-4 h-4" />
                <span>Global</span>
              </div>
              <div className="flex items-center space-x-1">
                <FileText className="w-4 h-4" />
                <span>Privacy First</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-lg font-semibold mb-2">Stay Connected</h3>
            <p className="text-gray-400 mb-4 text-sm">
              Get cosmic insights and updates delivered to your inbox.
            </p>
            <div className="flex space-x-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
              <button className="portal-btn portal-btn-primary px-6 py-2">
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
