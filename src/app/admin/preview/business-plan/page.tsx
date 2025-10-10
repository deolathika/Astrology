'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Target, 
  Shield,
  Zap,
  Star,
  CheckCircle,
  Download,
  ExternalLink
} from 'lucide-react'
import Card from '@/components/readdy/Card'
import Button from '@/components/readdy/Button'
import Navigation from '@/components/readdy/Navigation'
import StarfieldBackground from '@/components/readdy/StarfieldBackground'

export default function BusinessPlanPreview() {
  const [activeSection, setActiveSection] = useState('executive-summary')

  const sections = [
    { id: 'executive-summary', title: 'Executive Summary', icon: <Star className="w-5 h-5" /> },
    { id: 'market-analysis', title: 'Market Analysis', icon: <BarChart className="w-5 h-5" /> },
    { id: 'business-model', title: 'Business Model', icon: <DollarSign className="w-5 h-5" /> },
    { id: 'financial-projections', title: 'Financial Projections', icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'marketing-strategy', title: 'Marketing Strategy', icon: <Target className="w-5 h-5" /> },
    { id: 'operations', title: 'Operations Plan', icon: <Zap className="w-5 h-5" /> },
    { id: 'risk-analysis', title: 'Risk Analysis', icon: <Shield className="w-5 h-5" /> },
    { id: 'team', title: 'Team & Organization', icon: <Users className="w-5 h-5" /> }
  ]

  const renderContent = () => {
    switch (activeSection) {
      case 'executive-summary':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center mb-8 text-purple-400">Executive Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 cosmic-glow">
                <h3 className="text-xl font-semibold mb-4 text-white">Company Overview</h3>
                <p className="text-gray-300 mb-4">
                  Daily Secrets is a revolutionary platform that combines astrology, numerology, and dream analysis 
                  into a unified, personalized experience. We leverage advanced AI and machine learning to provide 
                  users with accurate, personalized cosmic insights.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Founded:</span>
                    <span className="text-white">2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Headquarters:</span>
                    <span className="text-white">Global (Remote)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Team Size:</span>
                    <span className="text-white">15+ Experts</span>
                  </div>
                </div>
              </Card>
              <Card className="p-6 cosmic-glow">
                <h3 className="text-xl font-semibold mb-4 text-white">Key Highlights</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    Advanced AI-powered personalization
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    Privacy-first approach
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    Global market opportunity
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    Scalable technology platform
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        )

      case 'market-analysis':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center mb-8 text-blue-400">Market Analysis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 cosmic-glow">
                <h3 className="text-xl font-semibold mb-4 text-white">Market Size</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Global Astrology Market</span>
                    <span className="text-2xl font-bold text-green-400">$2.2B</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Numerology Market</span>
                    <span className="text-2xl font-bold text-blue-400">$1.8B</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Digital Wellness</span>
                    <span className="text-2xl font-bold text-purple-400">$4.4B</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Total Addressable Market</span>
                    <span className="text-2xl font-bold text-orange-400">$8.4B</span>
                  </div>
                </div>
              </Card>
              <Card className="p-6 cosmic-glow">
                <h3 className="text-xl font-semibold mb-4 text-white">Target Demographics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Age Group:</span>
                    <span className="text-white">18-45 years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Gender:</span>
                    <span className="text-white">70% Female, 30% Male</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Income:</span>
                    <span className="text-white">$30K+ annually</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Tech Adoption:</span>
                    <span className="text-white">High</span>
                  </div>
                </div>
              </Card>
            </div>
            <Card className="p-6 cosmic-glow">
              <h3 className="text-xl font-semibold mb-4 text-white">Market Trends</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">+25%</div>
                  <div className="text-gray-300">Mobile App Usage Growth</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">+40%</div>
                  <div className="text-gray-300">Personalization Demand</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">+30%</div>
                  <div className="text-gray-300">Wellness Spending</div>
                </div>
              </div>
            </Card>
          </div>
        )

      case 'business-model':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center mb-8 text-green-400">Business Model</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 cosmic-glow text-center">
                <h3 className="text-xl font-semibold mb-3 text-white">Freemium Model</h3>
                <div className="text-3xl font-bold text-green-400 mb-2">$0</div>
                <p className="text-gray-300 text-sm mb-4">Basic features, limited access</p>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Basic astrology readings</li>
                  <li>• Limited numerology</li>
                  <li>• Basic compatibility</li>
                  <li>• Ads supported</li>
                </ul>
              </Card>
              <Card className="p-6 cosmic-glow text-center">
                <h3 className="text-xl font-semibold mb-3 text-white">Premium Subscription</h3>
                <div className="text-3xl font-bold text-blue-400 mb-2">$9.99/mo</div>
                <p className="text-gray-300 text-sm mb-4">Full access, advanced features</p>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Advanced astrology</li>
                  <li>• Complete numerology</li>
                  <li>• Dream analysis</li>
                  <li>• No ads</li>
                </ul>
              </Card>
              <Card className="p-6 cosmic-glow text-center">
                <h3 className="text-xl font-semibold mb-3 text-white">Pro Subscription</h3>
                <div className="text-3xl font-bold text-purple-400 mb-2">$19.99/mo</div>
                <p className="text-gray-300 text-sm mb-4">Professional tools, API access</p>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• All premium features</li>
                  <li>• API access</li>
                  <li>• Priority support</li>
                  <li>• Advanced analytics</li>
                </ul>
              </Card>
            </div>
            <Card className="p-6 cosmic-glow">
              <h3 className="text-xl font-semibold mb-4 text-white">Revenue Streams</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-purple-400">Primary Revenue</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Subscription fees (80%)</li>
                    <li>• Premium features (15%)</li>
                    <li>• API licensing (5%)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-blue-400">Secondary Revenue</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Affiliate partnerships</li>
                    <li>• Sponsored content</li>
                    <li>• Data insights (anonymized)</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        )

      case 'financial-projections':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center mb-8 text-orange-400">Financial Projections</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 cosmic-glow">
                <h3 className="text-xl font-semibold mb-4 text-white">Revenue Projections</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Year 1</span>
                    <span className="text-2xl font-bold text-green-400">$500K</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Year 2</span>
                    <span className="text-2xl font-bold text-blue-400">$2.5M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Year 3</span>
                    <span className="text-2xl font-bold text-purple-400">$8M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Year 5</span>
                    <span className="text-2xl font-bold text-orange-400">$25M</span>
                  </div>
                </div>
              </Card>
              <Card className="p-6 cosmic-glow">
                <h3 className="text-xl font-semibold mb-4 text-white">Key Metrics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Customer Acquisition Cost</span>
                    <span className="text-lg font-bold text-green-400">$15</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Lifetime Value</span>
                    <span className="text-lg font-bold text-blue-400">$180</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Churn Rate</span>
                    <span className="text-lg font-bold text-purple-400">5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Gross Margin</span>
                    <span className="text-lg font-bold text-orange-400">85%</span>
                  </div>
                </div>
              </Card>
            </div>
            <Card className="p-6 cosmic-glow">
              <h3 className="text-xl font-semibold mb-4 text-white">Funding Requirements</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">$500K</div>
                  <div className="text-gray-300">Seed Round</div>
                  <div className="text-sm text-gray-400">Product development</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">$2M</div>
                  <div className="text-gray-300">Series A</div>
                  <div className="text-sm text-gray-400">Market expansion</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">$5M</div>
                  <div className="text-gray-300">Series B</div>
                  <div className="text-sm text-gray-400">Global scaling</div>
                </div>
              </div>
            </Card>
          </div>
        )

      case 'marketing-strategy':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center mb-8 text-pink-400">Marketing Strategy</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 cosmic-glow">
                <h3 className="text-xl font-semibold mb-4 text-white">Digital Marketing</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    Social media campaigns (Instagram, TikTok)
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-400" />
                    Influencer partnerships
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-purple-400" />
                    SEO optimization
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-orange-400" />
                    Content marketing
                  </li>
                </ul>
              </Card>
              <Card className="p-6 cosmic-glow">
                <h3 className="text-xl font-semibold mb-4 text-white">Partnership Strategy</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    Wellness app integrations
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-400" />
                    Astrology communities
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-purple-400" />
                    Spiritual influencers
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-orange-400" />
                    App store partnerships
                  </li>
                </ul>
              </Card>
            </div>
            <Card className="p-6 cosmic-glow">
              <h3 className="text-xl font-semibold mb-4 text-white">Customer Acquisition Channels</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400 mb-2">40%</div>
                  <div className="text-gray-300">Organic Search</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400 mb-2">25%</div>
                  <div className="text-gray-300">Social Media</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400 mb-2">20%</div>
                  <div className="text-gray-300">Referrals</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-400 mb-2">15%</div>
                  <div className="text-gray-300">Paid Ads</div>
                </div>
              </div>
            </Card>
          </div>
        )

      case 'operations':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center mb-8 text-cyan-400">Operations Plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 cosmic-glow">
                <h3 className="text-xl font-semibold mb-4 text-white">Technology Stack</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    Next.js 14 (Frontend)
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-400" />
                    Node.js (Backend)
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-purple-400" />
                    PostgreSQL (Database)
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-orange-400" />
                    AWS (Cloud Infrastructure)
                  </li>
                </ul>
              </Card>
              <Card className="p-6 cosmic-glow">
                <h3 className="text-xl font-semibold mb-4 text-white">Development Process</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    Agile methodology
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-400" />
                    CI/CD pipeline
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-purple-400" />
                    Automated testing
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-orange-400" />
                    Security audits
                  </li>
                </ul>
              </Card>
            </div>
            <Card className="p-6 cosmic-glow">
              <h3 className="text-xl font-semibold mb-4 text-white">Scalability Plan</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400 mb-2">10K</div>
                  <div className="text-gray-300">Users (Month 1)</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400 mb-2">100K</div>
                  <div className="text-gray-300">Users (Month 6)</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400 mb-2">1M</div>
                  <div className="text-gray-300">Users (Year 1)</div>
                </div>
              </div>
            </Card>
          </div>
        )

      case 'risk-analysis':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center mb-8 text-red-400">Risk Analysis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 cosmic-glow">
                <h3 className="text-xl font-semibold mb-4 text-white">Market Risks</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-red-400">•</span>
                    <span>Competition from established players</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400">•</span>
                    <span>Market saturation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400">•</span>
                    <span>Economic downturn impact</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400">•</span>
                    <span>Regulatory changes</span>
                  </li>
                </ul>
              </Card>
              <Card className="p-6 cosmic-glow">
                <h3 className="text-xl font-semibold mb-4 text-white">Technical Risks</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-red-400">•</span>
                    <span>Data security breaches</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400">•</span>
                    <span>System scalability issues</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400">•</span>
                    <span>Third-party dependencies</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400">•</span>
                    <span>Technology obsolescence</span>
                  </li>
                </ul>
              </Card>
            </div>
            <Card className="p-6 cosmic-glow">
              <h3 className="text-xl font-semibold mb-4 text-white">Mitigation Strategies</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-green-400">Risk Mitigation</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Diversified revenue streams</li>
                    <li>• Strong security protocols</li>
                    <li>• Regular security audits</li>
                    <li>• Backup systems</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-blue-400">Contingency Plans</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Emergency response procedures</li>
                    <li>• Data recovery protocols</li>
                    <li>• Alternative technology stacks</li>
                    <li>• Insurance coverage</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        )

      case 'team':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center mb-8 text-indigo-400">Team & Organization</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 cosmic-glow">
                <h3 className="text-xl font-semibold mb-4 text-white">Core Team</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-300">CEO & Founder</span>
                    <span className="text-white">1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">CTO & Co-founder</span>
                    <span className="text-white">1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Lead Developers</span>
                    <span className="text-white">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Astrology Experts</span>
                    <span className="text-white">2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Marketing Team</span>
                    <span className="text-white">2</span>
                  </div>
                </div>
              </Card>
              <Card className="p-6 cosmic-glow">
                <h3 className="text-xl font-semibold mb-4 text-white">Advisory Board</h3>
                <div className="space-y-3 text-gray-300">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    Tech industry veteran
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-400" />
                    Astrology expert
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-purple-400" />
                    Marketing specialist
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-orange-400" />
                    Legal advisor
                  </div>
                </div>
              </Card>
            </div>
            <Card className="p-6 cosmic-glow">
              <h3 className="text-xl font-semibold mb-4 text-white">Organizational Structure</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400 mb-2">15</div>
                  <div className="text-gray-300">Current Team Size</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400 mb-2">25</div>
                  <div className="text-gray-300">Target Year 1</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400 mb-2">50</div>
                  <div className="text-gray-300">Target Year 2</div>
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
              Business Plan
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Comprehensive Business Strategy & Analysis
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
                onClick={() => window.open('/admin/documents/business-plan.pdf', '_blank')}
              >
                <Download className="w-6 h-6 mr-3" />
                Download Full Business Plan
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="px-8 py-4"
                onClick={() => window.open('mailto:contact@dailysecrets.app', '_blank')}
              >
                <ExternalLink className="w-6 h-6 mr-3" />
                Contact for Investment
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
