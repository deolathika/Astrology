import { useState } from 'react';
import Navigation from '../../../components/feature/Navigation';
import StarfieldBackground from '../../../components/feature/StarfieldBackground';
import Card from '../../../components/base/Card';
import Button from '../../../components/base/Button';

export default function ProfileHelp() {
  const [userRole, setUserRole] = useState<'guest' | 'free' | 'premium' | 'admin'>('free');
  const [activeTab, setActiveTab] = useState('faq');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const helpTabs = [
    { id: 'faq', label: 'FAQ', icon: 'ri-question-line' },
    { id: 'guides', label: 'Guides', icon: 'ri-book-line' },
    { id: 'contact', label: 'Contact', icon: 'ri-customer-service-line' },
    { id: 'feedback', label: 'Feedback', icon: 'ri-feedback-line' }
  ];

  const faqCategories = [
    { id: 'all', label: 'All Topics' },
    { id: 'account', label: 'Account' },
    { id: 'billing', label: 'Billing' },
    { id: 'readings', label: 'Readings' },
    { id: 'technical', label: 'Technical' }
  ];

  const faqs = [
    {
      id: 1,
      category: 'account',
      question: 'How do I update my birth information?',
      answer: 'You can update your birth information by going to your Profile page and clicking the "Edit" button. Make sure to enter accurate birth date, time, and location for the most precise readings.',
      helpful: 24,
      tags: ['profile', 'birth chart', 'accuracy']
    },
    {
      id: 2,
      category: 'readings',
      question: 'What\'s the difference between Western and Vedic astrology?',
      answer: 'Western astrology uses the tropical zodiac based on seasons, while Vedic astrology uses the sidereal zodiac based on star positions. Both systems offer valuable insights but may show different results for the same person.',
      helpful: 18,
      tags: ['astrology', 'systems', 'western', 'vedic']
    },
    {
      id: 3,
      category: 'billing',
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your subscription at any time from the Billing section in your profile. Your premium features will remain active until the end of your current billing period.',
      helpful: 32,
      tags: ['subscription', 'cancel', 'billing']
    },
    {
      id: 4,
      category: 'technical',
      question: 'Why are my dream analyses not saving?',
      answer: 'Make sure you\'re logged in and have a stable internet connection. If the problem persists, try clearing your browser cache or contact our support team.',
      helpful: 12,
      tags: ['dreams', 'saving', 'technical']
    },
    {
      id: 5,
      category: 'readings',
      question: 'How accurate are the AI-powered readings?',
      answer: 'Our AI combines traditional astrological knowledge with modern algorithms to provide personalized insights. While highly sophisticated, remember that astrology is a tool for guidance and self-reflection.',
      helpful: 28,
      tags: ['ai', 'accuracy', 'readings']
    },
    {
      id: 6,
      category: 'account',
      question: 'How do I change my email address?',
      answer: 'Currently, email changes must be done through our support team for security reasons. Please contact us with your current and new email addresses.',
      helpful: 15,
      tags: ['email', 'account', 'security']
    }
  ];

  const guides = [
    {
      id: 1,
      title: 'Getting Started with Daily Secrets',
      description: 'Learn the basics of navigating your cosmic journey',
      duration: '5 min read',
      difficulty: 'Beginner',
      icon: 'ri-rocket-line',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      title: 'Understanding Your Birth Chart',
      description: 'Deep dive into the components of your natal chart',
      duration: '12 min read',
      difficulty: 'Intermediate',
      icon: 'ri-star-line',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 3,
      title: 'Dream Analysis Techniques',
      description: 'Master the art of interpreting your dreams',
      duration: '8 min read',
      difficulty: 'Beginner',
      icon: 'ri-moon-line',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      id: 4,
      title: 'Numerology Calculations',
      description: 'Calculate and understand your personal numbers',
      duration: '10 min read',
      difficulty: 'Intermediate',
      icon: 'ri-calculator-line',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 5,
      title: 'Compatibility Insights',
      description: 'Explore cosmic connections with others',
      duration: '6 min read',
      difficulty: 'Beginner',
      icon: 'ri-heart-line',
      color: 'from-pink-500 to-red-500'
    },
    {
      id: 6,
      title: 'Advanced Astrology Systems',
      description: 'Compare Western, Vedic, Chinese, and other systems',
      duration: '15 min read',
      difficulty: 'Advanced',
      icon: 'ri-compass-3-line',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen relative">
      <StarfieldBackground />
      <Navigation userRole={userRole} />
      
      <div className="relative z-10 pt-20 pb-12">
        {/* Header */}
        <section className="px-4 sm:px-6 lg:px-8 mb-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Help & Support
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Find answers, learn new skills, and get the support you need for your cosmic journey
              </p>
            </div>
          </div>
        </section>

        {/* Help Navigation */}
        <section className="px-4 sm:px-6 lg:px-8 mb-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-center space-x-1 bg-white/10 backdrop-blur-sm rounded-full p-1 overflow-x-auto">
              {helpTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-full transition-all duration-300 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <i className={`${tab.icon} text-sm`}></i>
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Help Content */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            
            {/* FAQ Tab */}
            {activeTab === 'faq' && (
              <div className="space-y-8">
                {/* Search and Filter */}
                <Card className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    <div className="relative flex-1 max-w-md">
                      <input
                        type="text"
                        placeholder="Search FAQ..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-3 pl-10 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                      />
                      <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    </div>

                    <div className="flex items-center space-x-4">
                      <span className="text-gray-300 text-sm">Category:</span>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm pr-8"
                      >
                        {faqCategories.map((category) => (
                          <option key={category.id} value={category.id} className="bg-gray-800">
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </Card>

                {/* FAQ List */}
                <div className="space-y-4">
                  {filteredFaqs.length === 0 ? (
                    <Card className="p-12 text-center">
                      <i className="ri-question-line text-6xl text-gray-400 mb-4"></i>
                      <h3 className="text-xl font-bold text-white mb-2">No FAQs Found</h3>
                      <p className="text-gray-400 mb-6">Try adjusting your search or category filter</p>
                      <Button variant="primary" onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}>
                        <i className="ri-refresh-line mr-2"></i>
                        Clear Filters
                      </Button>
                    </Card>
                  ) : (
                    filteredFaqs.map((faq) => (
                      <Card key={faq.id} className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-lg font-bold text-white pr-4">{faq.question}</h3>
                          <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs capitalize">
                            {faq.category}
                          </span>
                        </div>
                        
                        <p className="text-gray-300 mb-4 leading-relaxed">{faq.answer}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {faq.tags.map((tag, index) => (
                              <span key={index} className="px-2 py-1 bg-gray-600/30 text-gray-300 rounded text-xs">
                                {tag}
                              </span>
                            ))}
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-400">
                              <i className="ri-thumb-up-line mr-1"></i>
                              {faq.helpful} helpful
                            </span>
                            <div className="flex space-x-2">
                              <button className="text-green-400 hover:text-green-300 transition-colors">
                                <i className="ri-thumb-up-line"></i>
                              </button>
                              <button className="text-red-400 hover:text-red-300 transition-colors">
                                <i className="ri-thumb-down-line"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Guides Tab */}
            {activeTab === 'guides' && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-4">Learning Guides</h2>
                  <p className="text-gray-300">Master the cosmic arts with our comprehensive guides</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {guides.map((guide) => (
                    <Card key={guide.id} className="p-6 hover:scale-105 transition-transform duration-300">
                      <div className={`w-16 h-16 bg-gradient-to-r ${guide.color} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                        <i className={`${guide.icon} text-2xl text-white`}></i>
                      </div>
                      
                      <h3 className="text-lg font-bold text-white mb-2 text-center">{guide.title}</h3>
                      <p className="text-gray-300 text-sm mb-4 text-center">{guide.description}</p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                        <span>{guide.duration}</span>
                        <span className={`px-2 py-1 rounded-full ${
                          guide.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-300' :
                          guide.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-300' :
                          'bg-red-500/20 text-red-300'
                        }`}>
                          {guide.difficulty}
                        </span>
                      </div>
                      
                      <Button variant="primary" size="sm" className="w-full">
                        <i className="ri-book-open-line mr-2"></i>
                        Read Guide
                      </Button>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Tab */}
            {activeTab === 'contact' && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-4">Contact Support</h2>
                  <p className="text-gray-300">Get personalized help from our cosmic support team</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Contact Form */}
                  <Card className="p-8">
                    <h3 className="text-xl font-bold text-white mb-6">Send us a Message</h3>
                    
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                        <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 pr-8">
                          <option value="" className="bg-gray-800">Select a topic</option>
                          <option value="account" className="bg-gray-800">Account Issues</option>
                          <option value="billing" className="bg-gray-800">Billing Questions</option>
                          <option value="technical" className="bg-gray-800">Technical Problems</option>
                          <option value="readings" className="bg-gray-800">Reading Questions</option>
                          <option value="other" className="bg-gray-800">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Priority</label>
                        <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 pr-8">
                          <option value="low" className="bg-gray-800">Low</option>
                          <option value="medium" className="bg-gray-800">Medium</option>
                          <option value="high" className="bg-gray-800">High</option>
                          <option value="urgent" className="bg-gray-800">Urgent</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                        <textarea
                          rows={6}
                          placeholder="Describe your issue or question in detail..."
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                        ></textarea>
                      </div>

                      <Button variant="cosmic" className="w-full">
                        <i className="ri-send-plane-line mr-2"></i>
                        Send Message
                      </Button>
                    </form>
                  </Card>

                  {/* Contact Options */}
                  <div className="space-y-6">
                    <Card className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                          <i className="ri-mail-line text-xl text-white"></i>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">Email Support</h3>
                          <p className="text-gray-300 text-sm">support@dailysecrets.com</p>
                          <p className="text-gray-400 text-xs">Response within 24 hours</p>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                          <i className="ri-chat-3-line text-xl text-white"></i>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">Live Chat</h3>
                          <p className="text-gray-300 text-sm">Available 9 AM - 6 PM EST</p>
                          <p className="text-gray-400 text-xs">Monday to Friday</p>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                          <i className="ri-community-line text-xl text-white"></i>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">Community Forum</h3>
                          <p className="text-gray-300 text-sm">Connect with other users</p>
                          <p className="text-gray-400 text-xs">Get help from the community</p>
                        </div>
                      </div>
                    </Card>

                    {/* Response Times */}
                    <Card className="p-6">
                      <h3 className="text-lg font-bold text-white mb-4">Response Times</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">General Questions</span>
                          <span className="text-green-400">24 hours</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Technical Issues</span>
                          <span className="text-yellow-400">12 hours</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Billing Problems</span>
                          <span className="text-orange-400">6 hours</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Urgent Issues</span>
                          <span className="text-red-400">2 hours</span>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            )}

            {/* Feedback Tab */}
            {activeTab === 'feedback' && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-4">Share Your Feedback</h2>
                  <p className="text-gray-300">Help us improve your cosmic experience</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Feedback Form */}
                  <Card className="p-8">
                    <h3 className="text-xl font-bold text-white mb-6">Tell us what you think</h3>
                    
                    <form className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Overall Experience</label>
                        <div className="flex items-center space-x-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              className="text-2xl text-yellow-400 hover:text-yellow-300 transition-colors"
                            >
                              <i className="ri-star-fill"></i>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">What do you like most?</label>
                        <textarea
                          rows={3}
                          placeholder="Tell us what you love about Daily Secrets..."
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                        ></textarea>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">What could we improve?</label>
                        <textarea
                          rows={3}
                          placeholder="Share your suggestions for improvement..."
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                        ></textarea>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Feature Requests</label>
                        <textarea
                          rows={3}
                          placeholder="What new features would you like to see?"
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                        ></textarea>
                      </div>

                      <Button variant="cosmic" className="w-full">
                        <i className="ri-heart-line mr-2"></i>
                        Submit Feedback
                      </Button>
                    </form>
                  </Card>

                  {/* Feedback Stats */}
                  <div className="space-y-6">
                    <Card className="p-6">
                      <h3 className="text-lg font-bold text-white mb-4">Community Feedback</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Overall Rating</span>
                          <div className="flex items-center space-x-2">
                            <div className="flex space-x-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <i key={star} className="ri-star-fill text-yellow-400 text-sm"></i>
                              ))}
                            </div>
                            <span className="text-white font-medium">4.8</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Total Reviews</span>
                          <span className="text-white font-medium">2,847</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">This Month</span>
                          <span className="text-green-400 font-medium">+156</span>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6">
                      <h3 className="text-lg font-bold text-white mb-4">Recent Improvements</h3>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <i className="ri-check-line text-green-400 mt-1"></i>
                          <div>
                            <p className="text-white text-sm">Enhanced dream analysis accuracy</p>
                            <p className="text-gray-400 text-xs">Based on user feedback</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <i className="ri-check-line text-green-400 mt-1"></i>
                          <div>
                            <p className="text-white text-sm">Added city location selector</p>
                            <p className="text-gray-400 text-xs">Requested by community</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <i className="ri-check-line text-green-400 mt-1"></i>
                          <div>
                            <p className="text-white text-sm">Improved mobile experience</p>
                            <p className="text-gray-400 text-xs">Performance optimization</p>
                          </div>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6">
                      <h3 className="text-lg font-bold text-white mb-4">Coming Soon</h3>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <i className="ri-time-line text-purple-400 mt-1"></i>
                          <div>
                            <p className="text-white text-sm">Advanced compatibility matching</p>
                            <p className="text-gray-400 text-xs">In development</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <i className="ri-time-line text-purple-400 mt-1"></i>
                          <div>
                            <p className="text-white text-sm">Voice-guided meditations</p>
                            <p className="text-gray-400 text-xs">Coming Q2 2024</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <i className="ri-time-line text-purple-400 mt-1"></i>
                          <div>
                            <p className="text-white text-sm">Mobile app release</p>
                            <p className="text-gray-400 text-xs">Beta testing soon</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}