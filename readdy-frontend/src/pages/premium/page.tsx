import { useState } from 'react';
import Navigation from '../../components/feature/Navigation';
import CosmicBackground from '../../components/ui/CosmicBackground';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';

export default function Premium() {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('annual');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState<any>(null);

  const plans = [
    {
      id: 'monthly' as const,
      name: 'Cosmic Explorer',
      price: '$9.99',
      period: '/month',
      originalPrice: null,
      savings: null,
      popular: false,
      description: 'Perfect for discovering your cosmic potential',
      features: [
        'Unlimited daily horoscopes',
        'All 5 astrology systems',
        'Advanced numerology calculations',
        'AI dream analysis & interpretation',
        'Compatibility reports',
        'Community access & discussions',
        'Personal cosmic journal',
        'Mobile app access'
      ],
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'annual' as const,
      name: 'Cosmic Master',
      price: '$99.99',
      period: '/year',
      originalPrice: '$119.88',
      savings: 'Save $19.89',
      popular: true,
      description: 'Ultimate cosmic wisdom and guidance',
      features: [
        'Everything in Cosmic Explorer',
        'Priority expert consultations',
        'Advanced birth chart analysis',
        'Personalized cosmic calendar',
        'Exclusive premium content',
        'Early access to new features',
        'Custom astrology reports',
        'One-on-one cosmic guidance',
        'Premium community access',
        'Advanced compatibility matching'
      ],
      color: 'from-yellow-400 to-orange-500'
    }
  ];

  const experts = [
    {
      id: 1,
      name: 'Dr. Luna Starweaver',
      title: 'Master Astrologer & Numerologist',
      specialty: 'Vedic Astrology, Life Path Guidance',
      image: 'https://readdy.ai/api/search-image?query=professional%20female%20astrologer%20with%20mystical%20cosmic%20background%2C%20serene%20wise%20expression%2C%20wearing%20elegant%20celestial%20jewelry%2C%20soft%20ethereal%20lighting%2C%20portrait%20photography%20style%2C%20peaceful%20aura&width=400&height=400&seq=expert1&orientation=squarish',
      rating: 4.9,
      sessions: 2847,
      experience: '15+ years',
      languages: ['English', 'Sanskrit', 'Hindi'],
      certifications: ['Certified Vedic Astrologer', 'Numerology Master', 'Spiritual Life Coach'],
      achievements: ['Published Author', 'International Speaker', 'Featured Expert'],
      availability: 'Available Today',
      hourlyRate: '$120',
      about: 'Dr. Luna combines ancient Vedic wisdom with modern psychological insights to provide transformative guidance. Her intuitive approach helps clients discover their true purpose and navigate life\'s challenges with cosmic clarity.',
      services: [
        'Birth Chart Analysis',
        'Life Path Consultation',
        'Relationship Compatibility',
        'Career Guidance',
        'Spiritual Awakening'
      ]
    },
    {
      id: 2,
      name: 'Master Chen Wei',
      title: 'Chinese Astrology & I-Ching Expert',
      specialty: 'Chinese Zodiac, Feng Shui, I-Ching',
      image: 'https://readdy.ai/api/search-image?query=wise%20male%20chinese%20astrology%20master%20in%20traditional%20elegant%20robes%2C%20peaceful%20serene%20expression%2C%20ancient%20wisdom%20in%20eyes%2C%20soft%20golden%20lighting%2C%20traditional%20chinese%20background%2C%20portrait%20photography&width=400&height=400&seq=expert2&orientation=squarish',
      rating: 4.8,
      sessions: 1923,
      experience: '20+ years',
      languages: ['English', 'Mandarin', 'Cantonese'],
      certifications: ['Master of Chinese Astrology', 'Feng Shui Consultant', 'I-Ching Scholar'],
      achievements: ['Temple Trained', 'Ancient Lineage', 'Cultural Ambassador'],
      availability: 'Available Tomorrow',
      hourlyRate: '$150',
      about: 'Master Chen brings authentic Chinese astrological traditions to modern seekers. Trained in ancient temples, he offers profound insights through the Chinese zodiac, I-Ching divination, and Feng Shui principles.',
      services: [
        'Chinese Zodiac Reading',
        'I-Ching Consultation',
        'Feng Shui Analysis',
        'Energy Balancing',
        'Fortune Timing'
      ]
    },
    {
      id: 3,
      name: 'Aria Moonchild',
      title: 'Dream Oracle & Intuitive Guide',
      specialty: 'Dream Analysis, Tarot, Intuitive Healing',
      image: 'https://readdy.ai/api/search-image?query=mystical%20female%20dream%20interpreter%20with%20ethereal%20flowing%20appearance%2C%20long%20flowing%20hair%2C%20cosmic%20celestial%20jewelry%2C%20dreamy%20purple%20cosmic%20background%2C%20soft%20magical%20lighting%2C%20enchanting%20aura&width=400&height=400&seq=expert3&orientation=squarish',
      rating: 4.9,
      sessions: 3156,
      experience: '12+ years',
      languages: ['English', 'French', 'Spanish'],
      certifications: ['Certified Dream Analyst', 'Tarot Master', 'Reiki Healer'],
      achievements: ['Psychic Medium', 'Published Dream Guide', 'Healing Practitioner'],
      availability: 'Available Now',
      hourlyRate: '$100',
      about: 'Aria specializes in unlocking the mysteries of the subconscious mind through dream interpretation and intuitive guidance. Her empathetic approach helps clients understand their inner wisdom and spiritual messages.',
      services: [
        'Dream Interpretation',
        'Tarot Reading',
        'Intuitive Guidance',
        'Spiritual Healing',
        'Past Life Regression'
      ]
    },
    {
      id: 4,
      name: 'Professor David Cosmos',
      title: 'Western Astrology & Psychology Expert',
      specialty: 'Psychological Astrology, Relationship Counseling',
      image: 'https://readdy.ai/api/search-image?query=distinguished%20male%20astrology%20professor%20with%20kind%20wise%20expression%2C%20wearing%20professional%20attire%2C%20cosmic%20star%20charts%20in%20background%2C%20warm%20intelligent%20lighting%2C%20academic%20portrait%20style&width=400&height=400&seq=expert4&orientation=squarish',
      rating: 4.7,
      sessions: 1654,
      experience: '18+ years',
      languages: ['English', 'German', 'Italian'],
      certifications: ['PhD in Psychology', 'Certified Astrologer', 'Relationship Counselor'],
      achievements: ['University Professor', 'Research Published', 'Conference Speaker'],
      availability: 'Available This Week',
      hourlyRate: '$130',
      about: 'Professor Cosmos bridges the gap between astrology and psychology, offering scientifically-informed cosmic guidance. His academic approach provides deep insights into personality, relationships, and life patterns.',
      services: [
        'Psychological Astrology',
        'Relationship Analysis',
        'Personality Profiling',
        'Life Coaching',
        'Academic Consultation'
      ]
    },
    {
      id: 5,
      name: 'Priya Devi',
      title: 'Sri Lankan Astrology Specialist',
      specialty: 'Traditional Sri Lankan Astrology, Ayurveda',
      image: 'https://readdy.ai/api/search-image?query=beautiful%20sri%20lankan%20female%20astrologer%20in%20traditional%20elegant%20sari%2C%20serene%20peaceful%20expression%2C%20traditional%20sri%20lankan%20temple%20background%2C%20warm%20golden%20lighting%2C%20cultural%20portrait%20photography&width=400&height=400&seq=expert5&orientation=squarish',
      rating: 4.8,
      sessions: 987,
      experience: '10+ years',
      languages: ['English', 'Sinhala', 'Tamil'],
      certifications: ['Traditional Astrology Master', 'Ayurveda Practitioner', 'Cultural Heritage Keeper'],
      achievements: ['Temple Blessed', 'Cultural Ambassador', 'Healing Practitioner'],
      availability: 'Available Today',
      hourlyRate: '$90',
      about: 'Priya preserves the ancient wisdom of Sri Lankan astrology, combining traditional practices with holistic healing. Her gentle approach honors cultural traditions while providing practical modern guidance.',
      services: [
        'Sri Lankan Astrology',
        'Ayurvedic Consultation',
        'Cultural Guidance',
        'Holistic Healing',
        'Traditional Remedies'
      ]
    },
    {
      id: 6,
      name: 'Marcus Stellaris',
      title: 'Hybrid AI-Enhanced Astrologer',
      specialty: 'AI-Powered Cosmic Analysis, Future Trends',
      image: 'https://readdy.ai/api/search-image?query=modern%20male%20astrologer%20with%20futuristic%20cosmic%20technology%20background%2C%20confident%20innovative%20expression%2C%20digital%20holographic%20elements%2C%20blue%20tech%20lighting%2C%20contemporary%20portrait%20style&width=400&height=400&seq=expert6&orientation=squarish',
      rating: 4.6,
      sessions: 756,
      experience: '8+ years',
      languages: ['English', 'Japanese', 'Korean'],
      certifications: ['AI Technology Specialist', 'Data Astrologer', 'Future Trends Analyst'],
      achievements: ['Tech Innovation Award', 'AI Pioneer', 'Future Visionary'],
      availability: 'Available 24/7',
      hourlyRate: '$110',
      about: 'Marcus represents the future of astrology, combining traditional wisdom with cutting-edge AI technology. His innovative approach provides unprecedented accuracy and insights into cosmic patterns and future trends.',
      services: [
        'AI-Enhanced Readings',
        'Future Trend Analysis',
        'Data-Driven Insights',
        'Technology Integration',
        'Predictive Modeling'
      ]
    }
  ];

  const premiumFeatures = [
    {
      category: 'Astrology & Readings',
      icon: 'ri-star-line',
      color: 'from-purple-500 to-pink-500',
      features: [
        'Access to all 5 astrology systems (Western, Vedic, Chinese, Sri Lankan, Hybrid AI)',
        'Unlimited daily, weekly, and monthly horoscopes',
        'Detailed birth chart analysis with house interpretations',
        'Transit predictions and cosmic event notifications',
        'Personalized lucky numbers, colors, and timing',
        'Advanced compatibility analysis for relationships'
      ]
    },
    {
      category: 'Numerology & Calculations',
      icon: 'ri-calculator-line',
      color: 'from-blue-500 to-cyan-500',
      features: [
        'Complete numerology profile (Life Path, Destiny, Soul Urge, Personality)',
        'Personal year, month, and day calculations',
        'Name analysis and optimization suggestions',
        'Business name numerology for entrepreneurs',
        'Address and phone number cosmic analysis',
        'Numerological compatibility matching'
      ]
    },
    {
      category: 'Dreams & Subconscious',
      icon: 'ri-moon-line',
      color: 'from-indigo-500 to-purple-500',
      features: [
        'AI-powered dream analysis with detailed interpretations',
        'Dream symbol dictionary with personal meanings',
        'Recurring dream pattern analysis',
        'Lucid dreaming guidance and techniques',
        'Dream journal with cosmic insights',
        'Subconscious message decoding'
      ]
    },
    {
      category: 'Community & Experts',
      icon: 'ri-group-line',
      color: 'from-green-500 to-emerald-500',
      features: [
        'Priority access to expert consultations',
        'Exclusive premium community discussions',
        'Live cosmic events and workshops',
        'Direct messaging with certified experts',
        'Group sessions and cosmic circles',
        'Early access to new features and content'
      ]
    }
  ];

  const handleBookExpert = (expert: any) => {
    setSelectedExpert(expert);
    setShowBookingModal(true);
  };

  const handleUpgrade = (plan: 'monthly' | 'annual') => {
    // In a real app, this would integrate with payment processing
    console.log('Upgrading to:', plan);
    alert(`Upgrading to ${plan} plan! This would integrate with payment processing.`);
  };

  return (
    <div className="min-h-screen relative">
      <CosmicBackground />
      <Navigation userRole="guest" />
      
      <div className="relative z-10 pt-20 pb-12">
        {/* Hero Section */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-7xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                  Unlock Your
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
                  Cosmic Potential
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Join thousands of seekers discovering their destiny through premium cosmic insights, expert guidance, and advanced spiritual tools
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">50K+</div>
                <div className="text-gray-300">Happy Members</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">4.9★</div>
                <div className="text-gray-300">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">24/7</div>
                <div className="text-gray-300">Expert Support</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">100%</div>
                <div className="text-gray-300">Privacy Protected</div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Choose Your Cosmic Journey</h2>
              <p className="text-gray-300 text-lg">Start with a 7-day free trial, cancel anytime</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {plans.map((plan) => (
                <Card 
                  key={plan.id}
                  className={`p-8 cursor-pointer transition-all duration-300 ${
                    selectedPlan === plan.id 
                      ? 'ring-2 ring-purple-400 bg-white/15 scale-105' 
                      : 'hover:bg-white/10 hover:scale-102'
                  } ${plan.popular ? 'relative' : ''}`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                        ⭐ Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-8">
                    <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <i className="ri-vip-crown-fill text-2xl text-white"></i>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-gray-300 mb-4">{plan.description}</p>
                    
                    <div className="flex items-baseline justify-center mb-2">
                      <span className="text-5xl font-bold text-white">{plan.price}</span>
                      <span className="text-gray-400 ml-2 text-lg">{plan.period}</span>
                    </div>
                    
                    {plan.originalPrice && (
                      <div className="text-center mb-2">
                        <span className="text-gray-400 line-through text-sm">{plan.originalPrice}</span>
                      </div>
                    )}
                    
                    {plan.savings && (
                      <span className="text-green-400 text-sm font-medium bg-green-400/10 px-3 py-1 rounded-full">
                        {plan.savings}
                      </span>
                    )}
                  </div>

                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <i className="ri-check-line text-white text-sm"></i>
                        </div>
                        <span className="text-gray-200">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="text-center">
                    <div className={`w-8 h-8 rounded-full border-2 mx-auto mb-4 ${
                      selectedPlan === plan.id
                        ? 'bg-purple-500 border-purple-500'
                        : 'border-gray-400'
                    }`}>
                      {selectedPlan === plan.id && (
                        <i className="ri-check-line text-white flex items-center justify-center h-full"></i>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Upgrade Button */}
            <div className="text-center">
              <Button 
                variant="cosmic" 
                size="lg" 
                className="px-16 py-4 text-xl mb-4"
                onClick={() => handleUpgrade(selectedPlan)}
              >
                <i className="ri-rocket-line mr-3"></i>
                Start 7-Day Free Trial
              </Button>
              <p className="text-gray-400 text-sm">
                No commitment • Cancel anytime • Secure payment with Stripe
              </p>
            </div>
          </div>
        </section>

        {/* Premium Features */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Premium Features</h2>
              <p className="text-gray-300 text-lg">Everything you need for your cosmic journey</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {premiumFeatures.map((category, index) => (
                <Card key={index} className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center`}>
                      <i className={`${category.icon} text-xl text-white`}></i>
                    </div>
                    <h3 className="text-xl font-bold text-white">{category.category}</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {category.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0 mt-2"></div>
                        <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Meet Our Experts */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Meet Our Cosmic Experts</h2>
              <p className="text-gray-300 text-lg">World-class astrologers, numerologists, and spiritual guides</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {experts.map((expert) => (
                <Card key={expert.id} className="p-6 expert-card">
                  <div className="text-center mb-6">
                    <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-purple-400/30">
                      <img 
                        src={expert.image} 
                        alt={expert.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-1">{expert.name}</h3>
                    <p className="text-purple-300 text-sm mb-2">{expert.title}</p>
                    <p className="text-gray-400 text-sm mb-4">{expert.specialty}</p>
                    
                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-300 mb-4">
                      <div className="flex items-center space-x-1">
                        <i className="ri-star-fill text-yellow-400"></i>
                        <span>{expert.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <i className="ri-user-line"></i>
                        <span>{expert.sessions.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <i className="ri-time-line"></i>
                        <span>{expert.experience}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="text-white font-medium mb-2">About</h4>
                      <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">{expert.about}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-medium mb-2">Specialties</h4>
                      <div className="flex flex-wrap gap-2">
                        {expert.services.slice(0, 3).map((service, index) => (
                          <span key={index} className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Rate: {expert.hourlyRate}/hour</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        expert.availability.includes('Now') 
                          ? 'bg-green-500/20 text-green-300' 
                          : 'bg-yellow-500/20 text-yellow-300'
                      }`}>
                        {expert.availability}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button 
                      variant="cosmic" 
                      className="w-full"
                      onClick={() => handleBookExpert(expert)}
                    >
                      <i className="ri-calendar-line mr-2"></i>
                      Book Consultation
                    </Button>
                    <Button variant="ghost" className="w-full text-sm">
                      <i className="ri-chat-3-line mr-2"></i>
                      Message Expert
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">What Our Members Say</h2>
              <p className="text-gray-300 text-lg">Real stories from our cosmic community</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Sarah M.',
                  role: 'Life Coach',
                  rating: 5,
                  text: 'Daily Secrets transformed my understanding of myself. The expert consultations are incredibly insightful and have guided me through major life decisions.',
                  avatar: 'https://readdy.ai/api/search-image?query=happy%20professional%20woman%20smiling%2C%20confident%20expression%2C%20modern%20portrait%20photography%2C%20warm%20lighting%2C%20business%20casual%20attire&width=200&height=200&seq=testimonial1&orientation=squarish'
                },
                {
                  name: 'Michael R.',
                  role: 'Entrepreneur',
                  rating: 5,
                  text: 'The numerology insights helped me choose the perfect business name and timing for my startup launch. The ROI has been incredible!',
                  avatar: 'https://readdy.ai/api/search-image?query=successful%20male%20entrepreneur%20smiling%2C%20confident%20business%20portrait%2C%20professional%20attire%2C%20modern%20office%20background%2C%20natural%20lighting&width=200&height=200&seq=testimonial2&orientation=squarish'
                },
                {
                  name: 'Emma L.',
                  role: 'Artist',
                  rating: 5,
                  text: 'The dream analysis feature is amazing! It helped me understand recurring dreams and unlock creative inspiration I never knew I had.',
                  avatar: 'https://readdy.ai/api/search-image?query=creative%20female%20artist%20smiling%2C%20artistic%20bohemian%20style%2C%20colorful%20background%2C%20natural%20lighting%2C%20creative%20portrait%20photography&width=200&height=200&seq=testimonial3&orientation=squarish'
                }
              ].map((testimonial, index) => (
                <Card key={index} className="p-6 text-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <i key={i} className="ri-star-fill text-yellow-400"></i>
                    ))}
                  </div>
                  
                  <p className="text-gray-300 mb-4 leading-relaxed">"{testimonial.text}"</p>
                  
                  <div>
                    <p className="text-white font-medium">{testimonial.name}</p>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-300 text-lg">Everything you need to know about premium membership</p>
            </div>

            <div className="space-y-6">
              {[
                {
                  question: 'What\'s included in the free trial?',
                  answer: 'Your 7-day free trial includes full access to all premium features: unlimited readings, expert consultations, advanced charts, and community access. No credit card required to start.'
                },
                {
                  question: 'Can I cancel anytime?',
                  answer: 'Yes! You can cancel your subscription at any time from your account settings. There are no cancellation fees or long-term commitments.'
                },
                {
                  question: 'How accurate are the readings?',
                  answer: 'Our readings combine traditional astrological wisdom with modern AI technology and are reviewed by certified experts. We maintain a 94% accuracy rating based on user feedback.'
                },
                {
                  question: 'Are expert consultations included?',
                  answer: 'Premium members get priority booking and discounted rates for expert consultations. The first 30-minute session is included with annual plans.'
                },
                {
                  question: 'Is my personal information secure?',
                  answer: 'Absolutely. We use bank-level encryption and never share your personal information. Your cosmic data is completely private and secure.'
                },
                {
                  question: 'What payment methods do you accept?',
                  answer: 'We accept all major credit cards, PayPal, Apple Pay, and Google Pay through our secure Stripe payment processing.'
                }
              ].map((faq, index) => (
                <Card key={index} className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                  <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="p-12 bg-gradient-to-br from-purple-600/20 to-pink-600/20">
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Unlock Your Cosmic Destiny?
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Join thousands of seekers who have transformed their lives through cosmic wisdom. 
                Start your journey today with a risk-free 7-day trial.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Button 
                  variant="cosmic" 
                  size="lg" 
                  className="px-12 py-4 text-xl"
                  onClick={() => handleUpgrade(selectedPlan)}
                >
                  <i className="ri-rocket-line mr-3"></i>
                  Start Free Trial
                </Button>
                <Button variant="ghost" size="lg" className="px-8">
                  <i className="ri-question-line mr-2"></i>
                  Contact Support
                </Button>
              </div>
              
              <p className="text-gray-400 text-sm mt-6">
                ✨ 7-day free trial • 💳 No credit card required • 🔒 Cancel anytime
              </p>
            </Card>
          </div>
        </section>
      </div>

      {/* Expert Booking Modal */}
      {showBookingModal && selectedExpert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowBookingModal(false)}></div>
          <div className="relative bg-gradient-to-br from-purple-900/95 to-indigo-900/95 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Book Consultation</h3>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>

              <div className="flex items-center space-x-4 mb-8">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <img 
                    src={selectedExpert.image} 
                    alt={selectedExpert.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">{selectedExpert.name}</h4>
                  <p className="text-purple-300">{selectedExpert.specialty}</p>
                  <p className="text-gray-400 text-sm">{selectedExpert.hourlyRate}/hour</p>
                </div>
              </div>

              <div className="text-center py-12">
                <i className="ri-calendar-check-line text-6xl text-purple-400 mb-4"></i>
                <h4 className="text-xl font-bold text-white mb-4">Booking System Coming Soon</h4>
                <p className="text-gray-300 mb-6">
                  We're building an amazing booking experience for you. 
                  In the meantime, upgrade to premium to get priority access when it launches!
                </p>
                <Button variant="cosmic" onClick={() => setShowBookingModal(false)}>
                  <i className="ri-vip-crown-line mr-2"></i>
                  Upgrade to Premium
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}