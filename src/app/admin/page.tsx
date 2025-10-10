'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FileText, 
  Presentation, 
  BarChart, 
  Users, 
  DollarSign, 
  Shield, 
  Download, 
  Eye,
  Star,
  TrendingUp,
  Globe,
  Smartphone,
  Zap,
  Target,
  Award,
  BookOpen,
  Settings,
  Database,
  Cloud,
  Lock,
  CheckCircle,
  ArrowRight,
  ExternalLink
} from 'lucide-react'
import Card from '@/components/readdy/Card'
import Button from '@/components/readdy/Button'
import Navigation from '@/components/readdy/Navigation'
import StarfieldBackground from '@/components/readdy/StarfieldBackground'

interface Document {
  id: string
  title: string
  description: string
  type: 'pitch' | 'technical' | 'business' | 'legal'
  icon: React.ReactNode
  downloadUrl?: string
  previewUrl?: string
  lastUpdated: string
  size: string
}

export default function AdminPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const documents: Document[] = [
    {
      id: 'pitch-deck',
      title: 'Product Pitch Deck',
      description: 'Comprehensive presentation for investors and partners showcasing Daily Secrets vision, features, and market opportunity',
      type: 'pitch',
      icon: <Presentation className="w-6 h-6" />,
      downloadUrl: '/admin/documents/pitch-deck.pdf',
      previewUrl: '/admin/preview/pitch-deck',
      lastUpdated: '2024-01-15',
      size: '2.4 MB'
    },
    {
      id: 'business-plan',
      title: 'Business Plan & Strategy',
      description: 'Detailed business plan including market analysis, revenue models, and growth strategies',
      type: 'business',
      icon: <BarChart className="w-6 h-6" />,
      downloadUrl: '/admin/documents/business-plan.pdf',
      previewUrl: '/admin/preview/business-plan',
      lastUpdated: '2024-01-14',
      size: '3.1 MB'
    },
    {
      id: 'technical-specs',
      title: 'Technical Specifications',
      description: 'Complete technical documentation including architecture, APIs, security, and scalability',
      type: 'technical',
      icon: <Database className="w-6 h-6" />,
      downloadUrl: '/admin/documents/technical-specs.pdf',
      previewUrl: '/admin/preview/technical-specs',
      lastUpdated: '2024-01-13',
      size: '4.2 MB'
    },
    {
      id: 'product-overview',
      title: 'Product Overview & Features',
      description: 'Detailed product features, user journey, and competitive analysis',
      type: 'pitch',
      icon: <Star className="w-6 h-6" />,
      downloadUrl: '/admin/documents/product-overview.pdf',
      previewUrl: '/admin/preview/product-overview',
      lastUpdated: '2024-01-12',
      size: '1.8 MB'
    },
    {
      id: 'market-analysis',
      title: 'Market Analysis Report',
      description: 'Comprehensive market research including target audience, competitors, and market size',
      type: 'business',
      icon: <TrendingUp className="w-6 h-6" />,
      downloadUrl: '/admin/documents/market-analysis.pdf',
      previewUrl: '/admin/preview/market-analysis',
      lastUpdated: '2024-01-11',
      size: '2.7 MB'
    },
    {
      id: 'revenue-model',
      title: 'Revenue Model & Pricing',
      description: 'Detailed revenue streams, pricing strategy, and financial projections',
      type: 'business',
      icon: <DollarSign className="w-6 h-6" />,
      downloadUrl: '/admin/documents/revenue-model.pdf',
      previewUrl: '/admin/preview/revenue-model',
      lastUpdated: '2024-01-10',
      size: '1.5 MB'
    },
    {
      id: 'security-compliance',
      title: 'Security & Compliance',
      description: 'Security measures, data protection, GDPR compliance, and privacy policies',
      type: 'legal',
      icon: <Shield className="w-6 h-6" />,
      downloadUrl: '/admin/documents/security-compliance.pdf',
      previewUrl: '/admin/preview/security-compliance',
      lastUpdated: '2024-01-09',
      size: '2.1 MB'
    },
    {
      id: 'partnership-proposal',
      title: 'Partnership Proposal Template',
      description: 'Template for partnership proposals with different types of partners',
      type: 'pitch',
      icon: <Users className="w-6 h-6" />,
      downloadUrl: '/admin/documents/partnership-proposal.pdf',
      previewUrl: '/admin/preview/partnership-proposal',
      lastUpdated: '2024-01-08',
      size: '1.2 MB'
    },
    {
      id: 'demo-script',
      title: 'Demo Script & Walkthrough',
      description: 'Step-by-step demo script for client presentations and product demonstrations',
      type: 'pitch',
      icon: <Eye className="w-6 h-6" />,
      downloadUrl: '/admin/documents/demo-script.pdf',
      previewUrl: '/admin/preview/demo-script',
      lastUpdated: '2024-01-07',
      size: '0.8 MB'
    },
    {
      id: 'legal-documents',
      title: 'Legal Documents & Contracts',
      description: 'Terms of service, privacy policy, user agreements, and legal templates',
      type: 'legal',
      icon: <FileText className="w-6 h-6" />,
      downloadUrl: '/admin/documents/legal-documents.pdf',
      previewUrl: '/admin/preview/legal-documents',
      lastUpdated: '2024-01-06',
      size: '3.5 MB'
    }
  ]

  const handleDownload = (url: string, filename: string) => {
    // Create a temporary link to download the file
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handlePreview = (url: string) => {
    window.open(url, '_blank')
  }

  const categories = [
    { id: 'all', name: 'All Documents', count: documents.length },
    { id: 'pitch', name: 'Pitch Documents', count: documents.filter(d => d.type === 'pitch').length },
    { id: 'business', name: 'Business Plans', count: documents.filter(d => d.type === 'business').length },
    { id: 'technical', name: 'Technical Docs', count: documents.filter(d => d.type === 'technical').length },
    { id: 'legal', name: 'Legal Documents', count: documents.filter(d => d.type === 'legal').length }
  ]

  const filteredDocuments = documents.filter(doc => {
    const matchesCategory = selectedCategory === 'all' || doc.type === selectedCategory
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'pitch': return 'text-purple-400 bg-purple-500/20'
      case 'business': return 'text-green-400 bg-green-500/20'
      case 'technical': return 'text-blue-400 bg-blue-500/20'
      case 'legal': return 'text-orange-400 bg-orange-500/20'
      default: return 'text-gray-400 bg-gray-500/20'
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
              Admin Dashboard
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Client & Partner Documentation Center
            </p>
            <div className="flex items-center justify-center gap-4 text-gray-400">
              <Shield className="w-5 h-5" />
              <span className="text-lg">Secure Access Only</span>
              <Lock className="w-5 h-5 ml-4" />
              <span className="text-lg">Confidential Documents</span>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
          >
            <Card className="p-6 text-center cosmic-glow">
              <FileText className="w-8 h-8 mx-auto mb-3 text-purple-400" />
              <div className="text-2xl font-bold text-white mb-1">{documents.length}</div>
              <div className="text-gray-300">Total Documents</div>
            </Card>
            <Card className="p-6 text-center cosmic-glow">
              <Users className="w-8 h-8 mx-auto mb-3 text-green-400" />
              <div className="text-2xl font-bold text-white mb-1">50+</div>
              <div className="text-gray-300">Active Partners</div>
            </Card>
            <Card className="p-6 text-center cosmic-glow">
              <DollarSign className="w-8 h-8 mx-auto mb-3 text-blue-400" />
              <div className="text-2xl font-bold text-white mb-1">$2.5M</div>
              <div className="text-gray-300">Revenue Target</div>
            </Card>
            <Card className="p-6 text-center cosmic-glow">
              <TrendingUp className="w-8 h-8 mx-auto mb-3 text-orange-400" />
              <div className="text-2xl font-bold text-white mb-1">150%</div>
              <div className="text-gray-300">Growth Rate</div>
            </Card>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Card className="p-6 cosmic-glow">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search documents..."
                    className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? 'cosmic' : 'secondary'}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className="whitespace-nowrap"
                    >
                      {category.name} ({category.count})
                    </Button>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Documents Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredDocuments.map((doc, index) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 cosmic-glow hover:scale-105 transition-transform">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-purple-400">
                        {doc.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{doc.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(doc.type)}`}>
                          {doc.type.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                    {doc.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                    <span>Updated: {doc.lastUpdated}</span>
                    <span>{doc.size}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    {doc.previewUrl && (
                      <Button
                        variant="secondary"
                        size="sm"
                        className="flex-1"
                        onClick={() => handlePreview(doc.previewUrl!)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                    )}
                    {doc.downloadUrl && (
                      <Button
                        variant="cosmic"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleDownload(doc.downloadUrl!, `${doc.title}.pdf`)}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12"
          >
            <Card className="p-8 cosmic-glow">
              <h2 className="text-2xl font-bold text-center mb-8 text-cosmic">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Button
                  variant="cosmic"
                  size="lg"
                  className="flex flex-col items-center p-6 h-auto"
                  onClick={() => handleDownload('/admin/documents/pitch-deck.pdf', 'Pitch Deck.pdf')}
                >
                  <Presentation className="w-8 h-8 mb-3" />
                  <span className="font-semibold">Pitch Deck</span>
                  <span className="text-sm opacity-80">Investor Presentation</span>
                </Button>
                
                <Button
                  variant="secondary"
                  size="lg"
                  className="flex flex-col items-center p-6 h-auto"
                  onClick={() => handleDownload('/admin/documents/business-plan.pdf', 'Business Plan.pdf')}
                >
                  <BarChart className="w-8 h-8 mb-3" />
                  <span className="font-semibold">Business Plan</span>
                  <span className="text-sm opacity-80">Strategy & Analysis</span>
                </Button>
                
                <Button
                  variant="secondary"
                  size="lg"
                  className="flex flex-col items-center p-6 h-auto"
                  onClick={() => handleDownload('/admin/documents/technical-specs.pdf', 'Technical Specs.pdf')}
                >
                  <Database className="w-8 h-8 mb-3" />
                  <span className="font-semibold">Tech Specs</span>
                  <span className="text-sm opacity-80">Technical Details</span>
                </Button>
                
                <Button
                  variant="secondary"
                  size="lg"
                  className="flex flex-col items-center p-6 h-auto"
                  onClick={() => handleDownload('/admin/documents/partnership-proposal.pdf', 'Partnership Proposal.pdf')}
                >
                  <Users className="w-8 h-8 mb-3" />
                  <span className="font-semibold">Partnership</span>
                  <span className="text-sm opacity-80">Partner Proposals</span>
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}