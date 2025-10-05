'use client'

import React from 'react'
import Link from 'next/link'
import { Sparkles, Mail, Twitter, Instagram, Facebook, MessageCircle } from 'lucide-react'

const footerLinks = {
  product: [
    { name: 'Features', href: '/portal/features' },
    { name: 'Zodiac', href: '/portal/zodiac' },
    { name: 'Numerology', href: '/portal/numerology' },
    { name: 'Compatibility', href: '/portal/compatibility' },
    { name: 'Dreams', href: '/portal/dreams' },
    { name: 'Sri Lankan', href: '/portal/sri-lanka-astrology' },
  ],
  company: [
    { name: 'About', href: '/portal/about' },
    { name: 'Pricing', href: '/portal/pricing' },
    { name: 'Community', href: '/portal/community' },
    { name: 'Contact', href: 'mailto:hello@dailysecrets.app' },
  ],
  legal: [
    { name: 'Terms', href: '/portal/legal/terms' },
    { name: 'Privacy', href: '/portal/legal/privacy' },
    { name: 'FAQ', href: '/portal/legal/faq' },
  ],
  social: [
    { name: 'Twitter', href: 'https://twitter.com/dailysecrets', icon: Twitter },
    { name: 'Instagram', href: 'https://instagram.com/dailysecrets', icon: Instagram },
    { name: 'Facebook', href: 'https://facebook.com/dailysecrets', icon: Facebook },
    { name: 'WhatsApp', href: 'https://wa.me/1234567890', icon: MessageCircle },
  ]
}

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Daily Secrets</span>
            </div>
            <p className="portal-body-sm text-gray-400 mb-6">
              Discover your cosmic destiny with personalized astrology, numerology, and dream analysis.
            </p>
            <div className="flex space-x-4">
              {footerLinks.social.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="portal-heading-4 text-white mb-4">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="portal-body-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="portal-heading-4 text-white mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="portal-body-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="portal-heading-4 text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="portal-body-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="portal-body-sm text-gray-400">
              © 2024 Daily Secrets. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <a
                href="mailto:hello@dailysecrets.app"
                className="flex items-center space-x-2 portal-body-sm text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>hello@dailysecrets.app</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
