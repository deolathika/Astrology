'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CosmicNavigation } from '@/components/cosmic-navigation'
import { MessageCircle, CheckCircle, AlertCircle, Send, Mail, Globe, Clock, Phone, Users, Star, Calendar } from 'lucide-react'

const contactMethods = [
  {
    icon: MessageCircle,
    title: 'Live Chat',
    description: 'Get instant help from our support team',
    availability: '24/7 Available',
    response: 'Immediate',
    color: 'electric-violet'
  },
  {
    icon: Mail,
    title: 'Email Support',
    description: 'Send us a detailed message',
    availability: '24/7 Available',
    response: 'Within 2 hours',
    color: 'supernova-gold'
  },
  {
    icon: Phone,
    title: 'Phone Support',
    description: 'Speak directly with our team',
    availability: 'Mon-Fri 9AM-6PM PST',
    response: 'Immediate',
    color: 'aurora-green'
  }
]

const supportTopics = [
  {
    title: 'General Support',
    description: 'Account issues, billing questions, technical problems',
    icon: Users,
    color: 'electric-violet'
  },
  {
    title: 'Cosmic Guidance',
    description: 'Questions about astrology, numerology, or readings',
    icon: Star,
    color: 'supernova-gold'
  },
  {
    title: 'Expert Consultations',
    description: 'Booking, scheduling, or consultation-related issues',
    icon: Calendar,
    color: 'aurora-green'
  },
  {
    title: 'Technical Issues',
    description: 'App problems, login issues, or feature bugs',
    icon: Globe,
    color: 'stellar-pink'
  }
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    topic: 'general'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        topic: 'general'
      })
    }, 2000)
  }

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
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-20 h-20 bg-electric-violet/20 rounded-2xl flex items-center justify-center mx-auto mb-6"
            >
              <MessageCircle className="w-10 h-10 text-electric-violet" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-bold text-cosmic-gradient-text mb-4"
            >
              Contact Us
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-stellar-gray-light text-lg max-w-3xl mx-auto"
            >
              We're here to help with your cosmic journey. Reach out to us through any of the methods below, 
              and we'll get back to you as soon as possible.
            </motion.p>
          </div>

          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            {contactMethods.map((method, index) => {
              const Icon = method.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="cosmic-card text-center"
                >
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                    method.color === 'electric-violet' ? 'bg-electric-violet/20' :
                    method.color === 'supernova-gold' ? 'bg-supernova-gold/20' :
                    'bg-aurora-green/20'
                  }`}>
                    <Icon className={`w-8 h-8 ${
                      method.color === 'electric-violet' ? 'text-electric-violet' :
                      method.color === 'supernova-gold' ? 'text-supernova-gold' :
                      'text-aurora-green'
                    }`} />
                  </div>
                  <h3 className="text-xl font-bold text-starlight-white mb-2">{method.title}</h3>
                  <p className="text-stellar-gray-light mb-4">{method.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="text-stellar-gray-light">
                      <strong>Availability:</strong> {method.availability}
                    </div>
                    <div className="text-stellar-gray-light">
                      <strong>Response Time:</strong> {method.response}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Support Topics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="cosmic-card mb-12"
          >
            <h2 className="text-2xl font-bold text-cosmic-gradient-text mb-6 text-center">
              How Can We Help?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {supportTopics.map((topic, index) => {
                const Icon = topic.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="bg-cosmic-navy/50 rounded-xl p-6 border border-electric-violet/20"
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        topic.color === 'electric-violet' ? 'bg-electric-violet/20' :
                        topic.color === 'supernova-gold' ? 'bg-supernova-gold/20' :
                        topic.color === 'aurora-green' ? 'bg-aurora-green/20' :
                        'bg-stellar-pink/20'
                      }`}>
                        <Icon className={`w-6 h-6 ${
                          topic.color === 'electric-violet' ? 'text-electric-violet' :
                          topic.color === 'supernova-gold' ? 'text-supernova-gold' :
                          topic.color === 'aurora-green' ? 'text-aurora-green' :
                          'text-stellar-pink'
                        }`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-starlight-white mb-2">
                          {topic.title}
                        </h3>
                        <p className="text-stellar-gray-light text-sm">
                          {topic.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="cosmic-card"
          >
            <h2 className="text-2xl font-bold text-cosmic-gradient-text mb-6 text-center">
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-stellar-gray-light text-sm font-semibold mb-3">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="cosmic-input w-full"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-stellar-gray-light text-sm font-semibold mb-3">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="cosmic-input w-full"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-stellar-gray-light text-sm font-semibold mb-3">
                  Topic
                </label>
                <select
                  value={formData.topic}
                  onChange={(e) => handleInputChange('topic', e.target.value)}
                  className="cosmic-input w-full"
                >
                  <option value="general">General Support</option>
                  <option value="cosmic">Cosmic Guidance</option>
                  <option value="experts">Expert Consultations</option>
                  <option value="technical">Technical Issues</option>
                  <option value="billing">Billing Questions</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-stellar-gray-light text-sm font-semibold mb-3">
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  className="cosmic-input w-full"
                  placeholder="Brief description of your inquiry"
                  required
                />
              </div>

              <div>
                <label className="block text-stellar-gray-light text-sm font-semibold mb-3">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className="cosmic-input w-full h-32 resize-none"
                  placeholder="Please provide as much detail as possible about your inquiry..."
                  required
                />
              </div>

              {/* Submit Status */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-2 text-aurora-green"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Message sent successfully! We'll get back to you soon.</span>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-2 text-nebula-red"
                >
                  <AlertCircle className="w-5 h-5" />
                  <span>Failed to send message. Please try again.</span>
                </motion.div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="cosmic-button w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Additional Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="cosmic-card mt-12"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold text-cosmic-gradient-text mb-6">
                Other Ways to Reach Us
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-electric-violet/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-6 h-6 text-electric-violet" />
                  </div>
                  <h3 className="text-lg font-semibold text-starlight-white mb-2">Email</h3>
                  <p className="text-stellar-gray-light">support@dailysecrets.com</p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-supernova-gold/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-6 h-6 text-supernova-gold" />
                  </div>
                  <h3 className="text-lg font-semibold text-starlight-white mb-2">Social Media</h3>
                  <p className="text-stellar-gray-light">@dailysecrets</p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-aurora-green/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-6 h-6 text-aurora-green" />
                  </div>
                  <h3 className="text-lg font-semibold text-starlight-white mb-2">Response Time</h3>
                  <p className="text-stellar-gray-light">Within 2 hours</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom spacing for navigation */}
        <div className="h-24" />

        {/* Cosmic Navigation */}
        <CosmicNavigation />
      </div>
    </div>
  )
}
