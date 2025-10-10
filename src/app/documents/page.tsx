'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  FileText, 
  Download, 
  Eye, 
  BookOpen, 
  Star, 
  ArrowLeft,
  ExternalLink,
  Calendar,
  User,
  Globe
} from 'lucide-react'
import Card from '@/components/readdy/Card'
import Button from '@/components/readdy/Button'
import Navigation from '@/components/readdy/Navigation'
import StarfieldBackground from '@/components/readdy/StarfieldBackground'

interface Document {
  id: string
  title: string
  description: string
  type: 'guide' | 'feature' | 'tutorial' | 'reference'
  category: string
  icon: React.ReactNode
  url: string
  size: string
  lastUpdated: string
  isPublic: boolean
}

export default function DocumentsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const documents: Document[] = [
    {
      id: 'features-guide',
      title: 'Complete Features Guide',
      description: 'Comprehensive breakdown of all Daily Secrets features, user tiers, and capabilities',
      type: 'guide',
      category: 'User Guide',
      icon: <BookOpen className="w-6 h-6" />,
      url: '/features-documentation.html',
      size: '25 KB',
      lastUpdated: '2024-01-15',
      isPublic: true
    },
    {
      id: 'astrology-guide',
      title: 'Astrology Systems Guide',
      description: 'Detailed guide to all 8 astrology systems including Western, Vedic, Chinese, and more',
      type: 'guide',
      category: 'Astrology',
      icon: <Star className="w-6 h-6" />,
      url: '/documents/astrology-guide.pdf',
      size: '2.1 MB',
      lastUpdated: '2024-01-10',
      isPublic: true
    },
    {
      id: 'user-manual',
      title: 'User Manual',
      description: 'Step-by-step guide to using Daily Secrets for beginners and advanced users',
      type: 'tutorial',
      category: 'User Guide',
      icon: <User className="w-6 h-6" />,
      url: '/documents/user-manual.pdf',
      size: '1.8 MB',
      lastUpdated: '2024-01-12',
      isPublic: true
    },
    {
      id: 'api-reference',
      title: 'API Reference',
      description: 'Technical documentation for developers and advanced users',
      type: 'reference',
      category: 'Technical',
      icon: <FileText className="w-6 h-6" />,
      url: '/documents/api-reference.pdf',
      size: '3.2 MB',
      lastUpdated: '2024-01-08',
      isPublic: false
    }
  ]

  const categories = [
    { id: 'all', name: 'All Documents', count: documents.length },
    { id: 'User Guide', name: 'User Guides', count: documents.filter(d => d.category === 'User Guide').length },
    { id: 'Astrology', name: 'Astrology', count: documents.filter(d => d.category === 'Astrology').length },
    { id: 'Technical', name: 'Technical', count: documents.filter(d => d.category === 'Technical').length }
  ]

  const filteredDocuments = documents.filter(doc => {
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'guide': return 'text-blue-400 bg-blue-500/20'
      case 'tutorial': return 'text-green-400 bg-green-500/20'
      case 'reference': return 'text-purple-400 bg-purple-500/20'
      case 'feature': return 'text-orange-400 bg-orange-500/20'
      default: return 'text-gray-400 bg-gray-500/20'
    }
  }

  const handleDownload = (url: string, filename: string) => {
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

  return (
    <div className="min-h-screen relative main-content">
      {/* Starfield Background */}
      <StarfieldBackground />
      
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative z-10 pt-16">
        {/* Header */}
        <section className="text-center py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <Link href="/" className="inline-flex items-center text-cosmic hover:text-white transition-colors mb-6">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-cosmic">
              Documents & Resources
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Access guides, tutorials, and reference materials to get the most out of Daily Secrets
            </p>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <Card className="p-6 cosmic-glow">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search documents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cosmic"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? 'cosmic' : 'secondary'}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      {category.name} ({category.count})
                    </Button>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Documents Grid */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDocuments.map((doc) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="p-6 cosmic-glow h-full flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-cosmic">
                          {doc.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">{doc.title}</h3>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(doc.type)}`}>
                            {doc.type}
                          </span>
                        </div>
                      </div>
                      {!doc.isPublic && (
                        <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">
                          Premium
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-300 text-sm mb-4 flex-1">{doc.description}</p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                      <span className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {doc.lastUpdated}
                      </span>
                      <span>{doc.size}</span>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="flex-1"
                        onClick={() => handlePreview(doc.url)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button
                        variant="cosmic"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleDownload(doc.url, `${doc.title}.pdf`)}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            {filteredDocuments.length === 0 && (
              <Card className="p-12 text-center cosmic-glow">
                <div className="text-6xl mb-4">📄</div>
                <h3 className="text-2xl font-bold text-white mb-2">No Documents Found</h3>
                <p className="text-gray-300">Try adjusting your search or filter criteria</p>
              </Card>
            )}
          </div>
        </section>

        {/* Quick Access */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <Card className="p-8 cosmic-glow">
              <h2 className="text-2xl font-bold text-center mb-8 text-cosmic">Quick Access</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Button
                  variant="cosmic"
                  size="lg"
                  className="flex flex-col items-center p-6 h-auto"
                  onClick={() => handlePreview('/features-documentation.html')}
                >
                  <BookOpen className="w-8 h-8 mb-3" />
                  <span className="font-semibold">Features Guide</span>
                  <span className="text-sm opacity-80">Complete Overview</span>
                </Button>
                
                <Button
                  variant="secondary"
                  size="lg"
                  className="flex flex-col items-center p-6 h-auto"
                  onClick={() => window.location.href = '/main'}
                >
                  <User className="w-8 h-8 mb-3" />
                  <span className="font-semibold">User Dashboard</span>
                  <span className="text-sm opacity-80">Your Personal Space</span>
                </Button>
                
                <Button
                  variant="secondary"
                  size="lg"
                  className="flex flex-col items-center p-6 h-auto"
                  onClick={() => window.location.href = '/astrology'}
                >
                  <Star className="w-8 h-8 mb-3" />
                  <span className="font-semibold">Astrology</span>
                  <span className="text-sm opacity-80">Explore Systems</span>
                </Button>
                
                <Button
                  variant="secondary"
                  size="lg"
                  className="flex flex-col items-center p-6 h-auto"
                  onClick={() => window.location.href = '/support'}
                >
                  <Globe className="w-8 h-8 mb-3" />
                  <span className="font-semibold">Support</span>
                  <span className="text-sm opacity-80">Get Help</span>
                </Button>
              </div>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}
