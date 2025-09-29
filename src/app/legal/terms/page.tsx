'use client'

import { motion } from 'framer-motion'
import { 
  Shield, 
  FileText, 
  Lock, 
  Users, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info
} from 'lucide-react'
import { CosmicNavigation } from '@/components/cosmic-navigation'

const sections = [
  {
    id: 'acceptance',
    title: 'Acceptance of Terms',
    content: `By accessing and using Daily Secrets ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.`
  },
  {
    id: 'description',
    title: 'Service Description',
    content: `Daily Secrets is a cosmic guidance platform that provides personalized astrology, numerology, and spiritual insights. Our services include but are not limited to: daily guidance, birth chart analysis, numerology calculations, dream interpretation, expert consultations, and community features.`
  },
  {
    id: 'user-accounts',
    title: 'User Accounts',
    content: `To access certain features of the Service, you may be required to create an account. You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.`
  },
  {
    id: 'privacy',
    title: 'Privacy and Data Protection',
    content: `We are committed to protecting your privacy. Our Privacy Policy explains how we collect, use, and protect your information when you use our Service. By using our Service, you agree to the collection and use of information in accordance with our Privacy Policy.`
  },
  {
    id: 'prohibited-uses',
    title: 'Prohibited Uses',
    content: `You may not use our Service for any unlawful purpose or to solicit others to perform unlawful acts. You may not violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances. You may not transmit any worms, viruses, or any code of a destructive nature.`
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual Property Rights',
    content: `The Service and its original content, features, and functionality are and will remain the exclusive property of Daily Secrets and its licensors. The Service is protected by copyright, trademark, and other laws.`
  },
  {
    id: 'disclaimers',
    title: 'Disclaimers',
    content: `The information provided through our Service is for entertainment and educational purposes only. We do not guarantee the accuracy, completeness, or usefulness of any information on the Service. Astrology and numerology are not scientifically proven methods of prediction.`
  },
  {
    id: 'limitation-liability',
    title: 'Limitation of Liability',
    content: `In no event shall Daily Secrets, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.`
  },
  {
    id: 'termination',
    title: 'Termination',
    content: `We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.`
  },
  {
    id: 'governing-law',
    title: 'Governing Law',
    content: `These Terms shall be interpreted and governed by the laws of the State of California, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.`
  },
  {
    id: 'changes',
    title: 'Changes to Terms',
    content: `We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.`
  },
  {
    id: 'contact',
    title: 'Contact Information',
    content: `If you have any questions about these Terms, please contact us at legal@dailysecrets.com or through our support channels.`
  }
]

export default function TermsPage() {
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
              <FileText className="w-10 h-10 text-electric-violet" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-bold text-cosmic-gradient-text mb-4"
            >
              Terms of Service
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-stellar-gray-light text-lg max-w-3xl mx-auto"
            >
              Please read these terms carefully before using our Service. By using Daily Secrets, 
              you agree to be bound by these terms and conditions.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-stellar-gray-light text-sm mt-4"
            >
              Last updated: {new Date().toLocaleDateString()}
            </motion.div>
          </div>

          {/* Important Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="cosmic-card mb-12 border-l-4 border-electric-violet"
          >
            <div className="flex items-start space-x-4">
              <AlertTriangle className="w-6 h-6 text-electric-violet flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-starlight-white mb-2">
                  Important Notice
                </h3>
                <p className="text-stellar-gray-light">
                  Our Service provides cosmic guidance for entertainment and educational purposes only. 
                  We do not guarantee the accuracy of predictions or advice. Please use your own judgment 
                  and consult with qualified professionals for important life decisions.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Terms Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="cosmic-card"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-electric-violet/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-electric-violet" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-cosmic-gradient-text mb-4">
                      {section.title}
                    </h2>
                    <p className="text-stellar-gray-light leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Key Points Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="cosmic-card mt-12"
          >
            <h2 className="text-2xl font-bold text-cosmic-gradient-text mb-6 text-center">
              Key Points Summary
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-starlight-white mb-3 flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-aurora-green" />
                  <span>What You Can Do</span>
                </h3>
                <ul className="space-y-2 text-stellar-gray-light">
                  <li>• Use our Service for personal cosmic guidance</li>
                  <li>• Connect with certified astrologers and numerologists</li>
                  <li>• Participate in our community features</li>
                  <li>• Access educational content and resources</li>
                  <li>• Cancel your subscription at any time</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-starlight-white mb-3 flex items-center space-x-2">
                  <XCircle className="w-5 h-5 text-nebula-red" />
                  <span>What You Cannot Do</span>
                </h3>
                <ul className="space-y-2 text-stellar-gray-light">
                  <li>• Use our Service for illegal activities</li>
                  <li>• Share false or misleading information</li>
                  <li>• Violate others' privacy or rights</li>
                  <li>• Attempt to hack or damage our systems</li>
                  <li>• Resell or redistribute our content</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="cosmic-card mt-12"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-electric-violet/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Info className="w-8 h-8 text-electric-violet" />
              </div>
              <h2 className="text-2xl font-bold text-cosmic-gradient-text mb-4">
                Questions About These Terms?
              </h2>
              <p className="text-stellar-gray-light mb-6">
                If you have any questions about these Terms of Service, please don't hesitate to contact us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:legal@dailysecrets.com"
                  className="cosmic-button px-6 py-3 flex items-center justify-center space-x-2"
                >
                  <span>Email Legal Team</span>
                </a>
                <a
                  href="/contact"
                  className="bg-cosmic-navy border border-electric-violet/30 text-electric-violet rounded-xl px-6 py-3 hover:bg-electric-violet/10 transition-all flex items-center justify-center space-x-2"
                >
                  <span>Contact Support</span>
                </a>
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
