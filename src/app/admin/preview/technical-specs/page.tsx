'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Database, 
  Server, 
  Shield, 
  Zap, 
  Globe,
  Lock,
  Cloud,
  Code,
  Settings,
  CheckCircle,
  ArrowRight,
  Download,
  ExternalLink
} from 'lucide-react'
import Card from '@/components/readdy/Card'
import Button from '@/components/readdy/Button'
import Navigation from '@/components/readdy/Navigation'
import StarfieldBackground from '@/components/readdy/StarfieldBackground'

export default function TechnicalSpecsPreview() {
  const [activeSection, setActiveSection] = useState('architecture')

  const sections = [
    { id: 'architecture', title: 'System Architecture', icon: <Database className="w-5 h-5" /> },
    { id: 'tech-stack', title: 'Technology Stack', icon: <Code className="w-5 h-5" /> },
    { id: 'security', title: 'Security & Privacy', icon: <Shield className="w-5 h-5" /> },
    { id: 'scalability', title: 'Scalability', icon: <Zap className="w-5 h-5" /> },
    { id: 'apis', title: 'APIs & Integration', icon: <Globe className="w-5 h-5" /> },
    { id: 'deployment', title: 'Deployment', icon: <Cloud className="w-5 h-5" /> }
  ]

  const renderContent = () => {
    switch (activeSection) {
      case 'architecture':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center mb-8 text-blue-400">System Architecture</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 cosmic-glow">
                <h3 className="text-xl font-semibold mb-4 text-white">Frontend Architecture</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    Next.js 14 with App Router
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-400" />
                    React 18 with TypeScript
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-purple-400" />
                    Tailwind CSS for styling
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-orange-400" />
                    Framer Motion for animations
                  </li>
                </ul>
              </Card>
              <Card className="p-6 cosmic-glow">
                <h3 className="text-xl font-semibold mb-4 text-white">Backend Architecture</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    Node.js with Express
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-400" />
                    PostgreSQL database
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-purple-400" />
                    Redis for caching
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-orange-400" />
                    AWS S3 for file storage
                  </li>
                </ul>
              </Card>
            </div>
            <Card className="p-6 cosmic-glow">
              <h3 className="text-xl font-semibold mb-4 text-white">System Diagram</h3>
              <div className="text-center text-gray-300">
                <div className="bg-gray-800 rounded-lg p-8 border-2 border-dashed border-gray-600">
                  <Server className="w-16 h-16 mx-auto mb-4 text-blue-400" />
                  <div className="text-lg font-semibold mb-2">Microservices Architecture</div>
                  <div className="text-sm">Load Balancer → API Gateway → Services → Database</div>
                </div>
              </div>
            </Card>
          </div>
        )

      case 'tech-stack':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center mb-8 text-green-400">Technology Stack</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 cosmic-glow">
                <h3 className="text-xl font-semibold mb-4 text-white">Frontend</h3>
                <div className="space-y-3 text-gray-300">
                  <div className="flex justify-between">
                    <span>Next.js</span>
                    <span className="text-green-400">14.2.33</span>
                  </div>
                  <div className="flex justify-between">
                    <span>React</span>
                    <span className="text-blue-400">18.2.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>TypeScript</span>
                    <span className="text-purple-400">5.0.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tailwind CSS</span>
                    <span className="text-orange-400">3.4.0</span>
                  </div>
                </div>
              </Card>
              <Card className="p-6 cosmic-glow">
                <h3 className="text-xl font-semibold mb-4 text-white">Backend</h3>
                <div className="space-y-3 text-gray-300">
                  <div className="flex justify-between">
                    <span>Node.js</span>
                    <span className="text-green-400">20.0.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Express</span>
                    <span className="text-blue-400">4.18.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>PostgreSQL</span>
                    <span className="text-purple-400">15.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Redis</span>
                    <span className="text-orange-400">7.0.0</span>
                  </div>
                </div>
              </Card>
              <Card className="p-6 cosmic-glow">
                <h3 className="text-xl font-semibold mb-4 text-white">Cloud & DevOps</h3>
                <div className="space-y-3 text-gray-300">
                  <div className="flex justify-between">
                    <span>AWS</span>
                    <span className="text-green-400">Latest</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Docker</span>
                    <span className="text-blue-400">24.0.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Kubernetes</span>
                    <span className="text-purple-400">1.28.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>CI/CD</span>
                    <span className="text-orange-400">GitHub Actions</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )

      case 'security':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center mb-8 text-red-400">Security & Privacy</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 cosmic-glow">
                <h3 className="text-xl font-semibold mb-4 text-white">Data Protection</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center gap-3">
                    <Lock className="w-5 h-5 text-green-400" />
                    End-to-end encryption
                  </li>
                  <li className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-blue-400" />
                    GDPR compliance
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-purple-400" />
                    Data anonymization
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-orange-400" />
                    Secure data storage
                  </li>
                </ul>
              </Card>
              <Card className="p-6 cosmic-glow">
                <h3 className="text-xl font-semibold mb-4 text-white">Authentication</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    OAuth 2.0 integration
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-400" />
                    JWT tokens
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-purple-400" />
                    Multi-factor authentication
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-orange-400" />
                    Session management
                  </li>
                </ul>
              </Card>
            </div>
            <Card className="p-6 cosmic-glow">
              <h3 className="text-xl font-semibold mb-4 text-white">Security Certifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Shield className="w-12 h-12 mx-auto mb-3 text-green-400" />
                  <div className="font-semibold text-white">SOC 2</div>
                  <div className="text-sm text-gray-300">Type II Certified</div>
                </div>
                <div className="text-center">
                  <Lock className="w-12 h-12 mx-auto mb-3 text-blue-400" />
                  <div className="font-semibold text-white">ISO 27001</div>
                  <div className="text-sm text-gray-300">Information Security</div>
                </div>
                <div className="text-center">
                  <CheckCircle className="w-12 h-12 mx-auto mb-3 text-purple-400" />
                  <div className="font-semibold text-white">GDPR</div>
                  <div className="text-sm text-gray-300">Compliant</div>
                </div>
              </div>
            </Card>
          </div>
        )

      case 'scalability':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center mb-8 text-purple-400">Scalability</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 cosmic-glow">
                <h3 className="text-xl font-semibold mb-4 text-white">Performance Metrics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Response Time</span>
                    <span className="text-2xl font-bold text-green-400">&lt; 200ms</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Throughput</span>
                    <span className="text-2xl font-bold text-blue-400">10K req/s</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Uptime</span>
                    <span className="text-2xl font-bold text-purple-400">99.9%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Concurrent Users</span>
                    <span className="text-2xl font-bold text-orange-400">100K+</span>
                  </div>
                </div>
              </Card>
              <Card className="p-6 cosmic-glow">
                <h3 className="text-xl font-semibold mb-4 text-white">Auto-scaling</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    Horizontal pod autoscaling
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-400" />
                    Load balancing
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-purple-400" />
                    Database sharding
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-orange-400" />
                    CDN integration
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        )

      case 'apis':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center mb-8 text-orange-400">APIs & Integration</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 cosmic-glow">
                <h3 className="text-xl font-semibold mb-4 text-white">REST API</h3>
                <div className="space-y-3 text-gray-300">
                  <div className="flex justify-between">
                    <span>Base URL</span>
                    <span className="text-green-400">api.dailysecrets.app</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Version</span>
                    <span className="text-blue-400">v1</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Authentication</span>
                    <span className="text-purple-400">Bearer Token</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rate Limit</span>
                    <span className="text-orange-400">1000/hour</span>
                  </div>
                </div>
              </Card>
              <Card className="p-6 cosmic-glow">
                <h3 className="text-xl font-semibold mb-4 text-white">WebSocket</h3>
                <div className="space-y-3 text-gray-300">
                  <div className="flex justify-between">
                    <span>Real-time Updates</span>
                    <span className="text-green-400">✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Live Notifications</span>
                    <span className="text-blue-400">✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Chat Support</span>
                    <span className="text-purple-400">✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Live Analytics</span>
                    <span className="text-orange-400">✓</span>
                  </div>
                </div>
              </Card>
            </div>
            <Card className="p-6 cosmic-glow">
              <h3 className="text-xl font-semibold mb-4 text-white">Third-party Integrations</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <Globe className="w-12 h-12 mx-auto mb-3 text-green-400" />
                  <div className="font-semibold text-white">Payment</div>
                  <div className="text-sm text-gray-300">Stripe, PayPal</div>
                </div>
                <div className="text-center">
                  <Cloud className="w-12 h-12 mx-auto mb-3 text-blue-400" />
                  <div className="font-semibold text-white">Storage</div>
                  <div className="text-sm text-gray-300">AWS S3</div>
                </div>
                <div className="text-center">
                  <Settings className="w-12 h-12 mx-auto mb-3 text-purple-400" />
                  <div className="font-semibold text-white">Analytics</div>
                  <div className="text-sm text-gray-300">Google Analytics</div>
                </div>
                <div className="text-center">
                  <Shield className="w-12 h-12 mx-auto mb-3 text-orange-400" />
                  <div className="font-semibold text-white">Security</div>
                  <div className="text-sm text-gray-300">Auth0</div>
                </div>
              </div>
            </Card>
          </div>
        )

      case 'deployment':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center mb-8 text-cyan-400">Deployment</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 cosmic-glow">
                <h3 className="text-xl font-semibold mb-4 text-white">Infrastructure</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center gap-3">
                    <Cloud className="w-5 h-5 text-green-400" />
                    AWS EKS (Kubernetes)
                  </li>
                  <li className="flex items-center gap-3">
                    <Server className="w-5 h-5 text-blue-400" />
                    Auto-scaling groups
                  </li>
                  <li className="flex items-center gap-3">
                    <Database className="w-5 h-5 text-purple-400" />
                    RDS PostgreSQL
                  </li>
                  <li className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-orange-400" />
                    Redis ElastiCache
                  </li>
                </ul>
              </Card>
              <Card className="p-6 cosmic-glow">
                <h3 className="text-xl font-semibold mb-4 text-white">CI/CD Pipeline</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    GitHub Actions
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-400" />
                    Docker containers
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-purple-400" />
                    Automated testing
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-orange-400" />
                    Blue-green deployment
                  </li>
                </ul>
              </Card>
            </div>
            <Card className="p-6 cosmic-glow">
              <h3 className="text-xl font-semibold mb-4 text-white">Monitoring & Logging</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Zap className="w-12 h-12 mx-auto mb-3 text-green-400" />
                  <div className="font-semibold text-white">Performance</div>
                  <div className="text-sm text-gray-300">New Relic, DataDog</div>
                </div>
                <div className="text-center">
                  <Shield className="w-12 h-12 mx-auto mb-3 text-blue-400" />
                  <div className="font-semibold text-white">Security</div>
                  <div className="text-sm text-gray-300">AWS CloudTrail</div>
                </div>
                <div className="text-center">
                  <Database className="w-12 h-12 mx-auto mb-3 text-purple-400" />
                  <div className="font-semibold text-white">Logs</div>
                  <div className="text-sm text-gray-300">ELK Stack</div>
                </div>
              </div>
            </Card>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen relative main-content">
      <StarfieldBackground />
      {/* Floating cosmic particles */}
      <div className="cosmic-particle"></div>
      <div className="cosmic-particle"></div>
      <div className="cosmic-particle"></div>
      <div className="cosmic-particle"></div>
      <div className="cosmic-particle"></div>
      <Navigation />

      <main className="relative z-10 pt-16">
        <div className="max-w-7xl mx-auto p-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Technical Specifications
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Complete Technical Documentation & Architecture
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <Card className="p-6 cosmic-glow sticky top-24">
                <h3 className="text-lg font-semibold mb-4 text-white">Sections</h3>
                <div className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                        activeSection === section.id
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-400'
                          : 'text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      {section.icon}
                      <span className="text-sm">{section.title}</span>
                    </button>
                  ))}
                </div>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-8 cosmic-glow min-h-[600px]">
                  {renderContent()}
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-12 text-center">
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button
                variant="cosmic"
                size="lg"
                className="px-8 py-4"
                onClick={() => window.open('/admin/documents/technical-specs.pdf', '_blank')}
              >
                <Download className="w-6 h-6 mr-3" />
                Download Full Technical Specs
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="px-8 py-4"
                onClick={() => window.open('mailto:tech@dailysecrets.app', '_blank')}
              >
                <ExternalLink className="w-6 h-6 mr-3" />
                Contact Technical Team
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}