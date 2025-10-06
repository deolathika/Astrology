import { useState } from 'react';
import Button from '../base/Button';
import Card from '../base/Card';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade?: (plan: 'monthly' | 'annual') => void;
}

export default function PremiumModal({ isOpen, onClose, onUpgrade }: PremiumModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('monthly');

  if (!isOpen) return null;

  const plans = [
    {
      id: 'monthly' as const,
      name: 'Monthly',
      price: '$9.99',
      period: '/month',
      savings: null,
      popular: false,
      features: [
        'Unlimited daily readings',
        'All zodiac systems access',
        'Advanced numerology calculations',
        'Dream analysis & interpretation',
        'Compatibility reports',
        'Community access',
        'Expert consultations',
        'Personal cosmic journal'
      ]
    },
    {
      id: 'annual' as const,
      name: 'Annual',
      price: '$99.99',
      period: '/year',
      savings: 'Save 17%',
      popular: true,
      features: [
        'Everything in Monthly',
        'Priority expert support',
        'Advanced birth chart analysis',
        'Personalized cosmic calendar',
        'Exclusive premium content',
        'Early access to new features',
        'Custom astrology reports',
        'One-on-one cosmic guidance'
      ]
    }
  ];

  const experts = [
    {
      name: 'Dr. Luna Starweaver',
      specialty: 'Vedic Astrology & Numerology',
      image: 'https://readdy.ai/api/search-image?query=professional%20female%20astrologer%20with%20mystical%20cosmic%20background%2C%20serene%20expression%2C%20wearing%20elegant%20jewelry%2C%20soft%20lighting%2C%20portrait%20photography%20style&width=400&height=400&seq=expert1&orientation=squarish',
      rating: 4.9,
      sessions: 2847
    },
    {
      name: 'Master Chen Wei',
      specialty: 'Chinese Astrology & I-Ching',
      image: 'https://readdy.ai/api/search-image?query=wise%20male%20chinese%20astrology%20master%20in%20traditional%20robes%2C%20peaceful%20expression%2C%20ancient%20wisdom%2C%20soft%20golden%20lighting%2C%20portrait%20photography&width=400&height=400&seq=expert2&orientation=squarish',
      rating: 4.8,
      sessions: 1923
    },
    {
      name: 'Aria Moonchild',
      specialty: 'Dream Analysis & Tarot',
      image: 'https://readdy.ai/api/search-image?query=mystical%20female%20dream%20interpreter%20with%20ethereal%20appearance%2C%20flowing%20hair%2C%20cosmic%20jewelry%2C%20dreamy%20background%2C%20soft%20purple%20lighting&width=400&height=400&seq=expert3&orientation=squarish',
      rating: 4.9,
      sessions: 3156
    }
  ];

  const handleUpgrade = () => {
    if (onUpgrade) {
      onUpgrade(selectedPlan);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm" 
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="relative bg-gradient-to-br from-purple-900/95 to-indigo-900/95 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-900/90 to-indigo-900/90 backdrop-blur-lg border-b border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Unlock Your Cosmic Potential</h2>
              <p className="text-gray-300">Join thousands discovering their destiny through premium insights</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
            >
              <i className="ri-close-line text-2xl"></i>
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Plans Section */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Choose Your Cosmic Journey</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {plans.map((plan) => (
                <Card 
                  key={plan.id}
                  className={`p-6 cursor-pointer transition-all duration-300 ${
                    selectedPlan === plan.id 
                      ? 'ring-2 ring-purple-400 bg-white/15' 
                      : 'hover:bg-white/10'
                  } ${plan.popular ? 'relative' : ''}`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-1 rounded-full text-sm font-bold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h4 className="text-xl font-bold text-white mb-2">{plan.name}</h4>
                    <div className="flex items-baseline justify-center mb-2">
                      <span className="text-4xl font-bold text-white">{plan.price}</span>
                      <span className="text-gray-400 ml-1">{plan.period}</span>
                    </div>
                    {plan.savings && (
                      <span className="text-green-400 text-sm font-medium">{plan.savings}</span>
                    )}
                  </div>

                  <div className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <i className="ri-check-line text-white text-xs"></i>
                        </div>
                        <span className="text-gray-200 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <div className={`w-6 h-6 rounded-full border-2 mx-auto ${
                      selectedPlan === plan.id
                        ? 'bg-purple-500 border-purple-500'
                        : 'border-gray-400'
                    }`}>
                      {selectedPlan === plan.id && (
                        <i className="ri-check-line text-white text-sm flex items-center justify-center h-full"></i>
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
                className="px-12 py-4 text-xl"
                onClick={handleUpgrade}
              >
                <i className="ri-rocket-line mr-3"></i>
                Start Your Cosmic Journey
              </Button>
              <p className="text-gray-400 text-sm mt-3">
                7-day free trial • Cancel anytime • Secure payment
              </p>
            </div>
          </div>

          {/* Meet Our Experts Section */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Meet Our Cosmic Experts</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {experts.map((expert, index) => (
                <Card key={index} className="p-6 text-center expert-card">
                  <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4">
                    <img 
                      src={expert.image} 
                      alt={expert.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <h4 className="text-lg font-bold text-white mb-2">{expert.name}</h4>
                  <p className="text-purple-300 text-sm mb-3">{expert.specialty}</p>
                  
                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-300 mb-4">
                    <div className="flex items-center space-x-1">
                      <i className="ri-star-fill text-yellow-400"></i>
                      <span>{expert.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <i className="ri-user-line"></i>
                      <span>{expert.sessions.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <Button variant="primary" size="sm" className="w-full">
                    <i className="ri-calendar-line mr-2"></i>
                    Book Session
                  </Button>
                </Card>
              ))}
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-white mb-1">50K+</div>
                <div className="text-gray-300 text-sm">Happy Users</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white mb-1">4.9★</div>
                <div className="text-gray-300 text-sm">Average Rating</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white mb-1">24/7</div>
                <div className="text-gray-300 text-sm">Expert Support</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white mb-1">100%</div>
                <div className="text-gray-300 text-sm">Privacy Protected</div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 pt-6 border-t border-white/10">
            <p className="text-gray-400 text-sm">
              By upgrading, you agree to our 
              <a href="/legal/terms" className="text-purple-300 hover:text-purple-200 mx-1">Terms of Service</a>
              and 
              <a href="/legal/privacy" className="text-purple-300 hover:text-purple-200 mx-1">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}