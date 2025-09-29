'use client'

import { motion } from 'framer-motion'
import { CosmicNavigation } from '@/components/cosmic-navigation'
import { Shield, CheckCircle, Lock, Key, Globe } from 'lucide-react'

const sections = [
  {
    id: 'introduction',
    title: 'Introduction',
    content: `At Daily Secrets, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Service.`
  },
  {
    id: 'information-collection',
    title: 'Information We Collect',
    content: `We collect information you provide directly to us, such as when you create an account, use our services, or contact us. This may include your name, email address, birth information, cosmic preferences, and any other information you choose to provide.`
  },
  {
    id: 'usage-information',
    title: 'Usage Information',
    content: `We automatically collect certain information about your use of our Service, including your IP address, browser type, device information, pages visited, time spent on pages, and other usage statistics.`
  },
  {
    id: 'cookies-tracking',
    title: 'Cookies and Tracking Technologies',
    content: `We use cookies, web beacons, and similar tracking technologies to enhance your experience, analyze usage patterns, and provide personalized content. You can control cookie settings through your browser preferences.`
  },
  {
    id: 'information-use',
    title: 'How We Use Your Information',
    content: `We use your information to provide, maintain, and improve our Service, process transactions, send you communications, personalize your experience, and ensure the security of our platform.`
  },
  {
    id: 'information-sharing',
    title: 'Information Sharing and Disclosure',
    content: `We do not sell, trade, or rent your personal information to third parties. We may share your information only in specific circumstances, such as with your consent, to comply with legal obligations, or to protect our rights.`
  },
  {
    id: 'data-security',
    title: 'Data Security',
    content: `We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.`
  },
  {
    id: 'data-retention',
    title: 'Data Retention',
    content: `We retain your personal information for as long as necessary to provide our Service, comply with legal obligations, resolve disputes, and enforce our agreements. You may request deletion of your data at any time.`
  },
  {
    id: 'your-rights',
    title: 'Your Rights and Choices',
    content: `You have the right to access, update, delete, or restrict the processing of your personal information. You may also opt out of certain communications and data processing activities.`
  },
  {
    id: 'third-party-services',
    title: 'Third-Party Services',
    content: `Our Service may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to read their privacy policies.`
  },
  {
    id: 'children-privacy',
    title: 'Children\'s Privacy',
    content: `Our Service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware of such collection, we will take steps to delete the information.`
  },
  {
    id: 'international-transfers',
    title: 'International Data Transfers',
    content: `Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.`
  },
  {
    id: 'changes-policy',
    title: 'Changes to This Privacy Policy',
    content: `We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.`
  },
  {
    id: 'contact-us',
    title: 'Contact Us',
    content: `If you have any questions about this Privacy Policy or our privacy practices, please contact us at privacy@dailysecrets.com or through our support channels.`
  }
]

const dataTypes = [
  {
    name: 'Personal Information',
    description: 'Name, email, birth details, cosmic preferences',
    retention: 'Until account deletion',
    icon: Users
  },
  {
    name: 'Usage Data',
    description: 'App usage, interactions, preferences',
    retention: '2 years',
    icon: Eye
  },
  {
    name: 'Cosmic Data',
    description: 'Birth charts, readings, interpretations',
    retention: 'Until account deletion',
    icon: Database
  },
  {
    name: 'Communication Data',
    description: 'Messages, consultations, support tickets',
    retention: '3 years',
    icon: Mail
  }
]

export default function PrivacyPage() {
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
              <Shield className="w-10 h-10 text-electric-violet" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-bold text-cosmic-gradient-text mb-4"
            >
              Privacy Policy
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-stellar-gray-light text-lg max-w-3xl mx-auto"
            >
              Your privacy is important to us. This policy explains how we collect, use, 
              and protect your personal information when you use Daily Secrets.
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

          {/* Privacy Commitment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="cosmic-card mb-12 border-l-4 border-aurora-green"
          >
            <div className="flex items-start space-x-4">
              <CheckCircle className="w-6 h-6 text-aurora-green flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-starlight-white mb-2">
                  Our Privacy Commitment
                </h3>
                <p className="text-stellar-gray-light">
                  We are committed to protecting your privacy and ensuring the security of your cosmic data. 
                  We never sell your personal information and only use it to provide you with the best possible 
                  cosmic guidance experience.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Data Types We Collect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="cosmic-card mb-12"
          >
            <h2 className="text-2xl font-bold text-cosmic-gradient-text mb-6 text-center">
              Types of Data We Collect
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {dataTypes.map((dataType, index) => {
                const Icon = dataType.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="bg-cosmic-navy/50 rounded-xl p-6 border border-electric-violet/20"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-electric-violet/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-electric-violet" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-starlight-white mb-2">
                          {dataType.name}
                        </h3>
                        <p className="text-stellar-gray-light text-sm mb-3">
                          {dataType.description}
                        </p>
                        <div className="text-stellar-gray-light text-xs">
                          <strong>Retention:</strong> {dataType.retention}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Privacy Sections */}
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
                    <Lock className="w-5 h-5 text-electric-violet" />
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

          {/* Your Rights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="cosmic-card mt-12"
          >
            <h2 className="text-2xl font-bold text-cosmic-gradient-text mb-6 text-center">
              Your Privacy Rights
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-starlight-white mb-3 flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-aurora-green" />
                  <span>What You Can Do</span>
                </h3>
                <ul className="space-y-2 text-stellar-gray-light">
                  <li>• Access your personal data</li>
                  <li>• Update or correct your information</li>
                  <li>• Delete your account and data</li>
                  <li>• Opt out of marketing communications</li>
                  <li>• Request data portability</li>
                  <li>• Object to certain data processing</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-starlight-white mb-3 flex items-center space-x-2">
                  <Key className="w-5 h-5 text-electric-violet" />
                  <span>How to Exercise Your Rights</span>
                </h3>
                <ul className="space-y-2 text-stellar-gray-light">
                  <li>• Contact us at privacy@dailysecrets.com</li>
                  <li>• Use your account settings</li>
                  <li>• Submit a data request form</li>
                  <li>• Contact our support team</li>
                  <li>• Use our self-service tools</li>
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
                <Globe className="w-8 h-8 text-electric-violet" />
              </div>
              <h2 className="text-2xl font-bold text-cosmic-gradient-text mb-4">
                Questions About Privacy?
              </h2>
              <p className="text-stellar-gray-light mb-6">
                If you have any questions about this Privacy Policy or our privacy practices, 
                please don't hesitate to contact us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:privacy@dailysecrets.com"
                  className="cosmic-button px-6 py-3 flex items-center justify-center space-x-2"
                >
                  <span>Email Privacy Team</span>
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
