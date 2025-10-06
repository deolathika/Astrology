
import { useState } from 'react';
import Navigation from '../../components/feature/Navigation';
import StarfieldBackground from '../../components/feature/StarfieldBackground';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';
import { zodiacSigns } from '../../mocks/zodiacData';

export default function Compatibility() {
  const [userRole, setUserRole] = useState<'guest' | 'premium' | 'admin'>('guest');
  const [person1Sign, setPerson1Sign] = useState('');
  const [person2Sign, setPerson2Sign] = useState('');
  const [compatibilityResult, setCompatibilityResult] = useState<any>(null);
  const [showFeaturesModal, setShowFeaturesModal] = useState(false);

  const compatibilityData = {
    'Aries-Leo': { score: 95, description: 'A fiery and passionate match! Both signs share enthusiasm and love for adventure.', element: 'fire' },
    'Aries-Sagittarius': { score: 92, description: 'Dynamic duo with shared love for freedom and exploration.', element: 'fire' },
    'Taurus-Virgo': { score: 88, description: 'Grounded and practical partnership built on mutual respect and stability.', element: 'earth' },
    'Gemini-Libra': { score: 90, description: 'Intellectual connection with great communication and social harmony.', element: 'air' },
    'Cancer-Scorpio': { score: 94, description: 'Deep emotional bond with intuitive understanding and loyalty.', element: 'water' },
    'Leo-Sagittarius': { score: 89, description: 'Adventurous and optimistic pair with natural chemistry.', element: 'fire' },
    'Virgo-Capricorn': { score: 91, description: 'Practical and ambitious partnership focused on long-term goals.', element: 'earth' },
    'Libra-Aquarius': { score: 87, description: 'Harmonious and innovative connection with shared ideals.', element: 'air' },
    'Scorpio-Pisces': { score: 93, description: 'Mystical and intuitive bond with deep emotional understanding.', element: 'water' },
    'Capricorn-Taurus': { score: 86, description: 'Stable and reliable partnership built on trust and commitment.', element: 'earth' }
  };

  const calculateCompatibility = () => {
    if (person1Sign && person2Sign) {
      const key1 = `${person1Sign}-${person2Sign}`;
      const key2 = `${person2Sign}-${person1Sign}`;
      
      let result = compatibilityData[key1 as keyof typeof compatibilityData] || 
                   compatibilityData[key2 as keyof typeof compatibilityData];
      
      if (!result) {
        // Generate random compatibility for demo
        const score = Math.floor(Math.random() * 40) + 60; // 60-100
        result = {
          score,
          description: `${person1Sign} and ${person2Sign} create a unique cosmic connection with ${score}% compatibility.`,
          element: 'mixed'
        };
      }
      
      setCompatibilityResult({
        ...result,
        person1: person1Sign,
        person2: person2Sign
      });
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'from-green-500 to-emerald-500';
    if (score >= 80) return 'from-yellow-500 to-orange-500';
    if (score >= 70) return 'from-orange-500 to-red-500';
    return 'from-red-500 to-pink-500';
  };

  const handleExploreAllFeatures = () => {
    setShowFeaturesModal(true);
  };

  const advancedFeatures = [
    {
      id: 'synastry',
      title: 'Synastry Chart Analysis',
      description: 'Compare birth charts to reveal deep compatibility patterns and karmic connections',
      icon: 'ri-pie-chart-line',
      color: 'from-purple-500 to-pink-500',
      features: ['Planetary aspects', 'House overlays', 'Karmic indicators', 'Soul mate markers']
    },
    {
      id: 'composite',
      title: 'Composite Chart Reading',
      description: 'Discover the unique energy created when two souls unite in relationship',
      icon: 'ri-heart-2-line',
      color: 'from-pink-500 to-red-500',
      features: ['Relationship purpose', 'Shared goals', 'Challenges to overcome', 'Growth potential']
    },
    {
      id: 'timing',
      title: 'Relationship Timing',
      description: 'Understand the cosmic timing for love, commitment, and relationship milestones',
      icon: 'ri-calendar-event-line',
      color: 'from-blue-500 to-cyan-500',
      features: ['Best dates for proposals', 'Wedding timing', 'Relationship cycles', 'Renewal periods']
    },
    {
      id: 'elements',
      title: 'Elemental Harmony',
      description: 'Explore how Fire, Earth, Air, and Water elements interact in your relationship',
      icon: 'ri-fire-line',
      color: 'from-orange-500 to-red-500',
      features: ['Energy balance', 'Communication styles', 'Conflict resolution', 'Passion dynamics']
    },
    {
      id: 'numerology',
      title: 'Love Numerology',
      description: 'Calculate your relationship numbers and discover numerical compatibility',
      icon: 'ri-calculator-line',
      color: 'from-green-500 to-emerald-500',
      features: ['Life path compatibility', 'Destiny numbers', 'Soul urge harmony', 'Expression alignment']
    },
    {
      id: 'vedic',
      title: 'Vedic Compatibility',
      description: 'Ancient Indian astrology techniques for deep relationship analysis',
      icon: 'ri-ancient-gate-line',
      color: 'from-indigo-500 to-purple-500',
      features: ['Guna matching', 'Mangal dosha', 'Nadi compatibility', 'Varna harmony']
    }
  ];

  return (
    <div className="min-h-screen relative">
      <StarfieldBackground />
      <Navigation userRole={userRole} />
      
      <div className="relative z-10 pt-20 pb-12">
        {/* Header */}
        <section className="px-4 sm:px-6 lg:px-8 mb-12">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-pink-400 via-red-400 to-orange-400 bg-clip-text text-transparent">
              Cosmic Compatibility
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Discover your cosmic connections and explore the harmony between souls
            </p>

            {/* Role Selector */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <span className="text-gray-400">View as:</span>
              {(['guest', 'premium', 'admin'] as const).map((role) => (
                <Button
                  key={role}
                  variant={userRole === role ? 'cosmic' : 'ghost'}
                  size="sm"
                  onClick={() => setUserRole(role)}
                >
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Compatibility Calculator */}
        <section className="px-4 sm:px-6 lg:px-8 mb-12">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">Compatibility Calculator</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Person 1 */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    First Person's Zodiac Sign
                  </label>
                  <select
                    value={person1Sign}
                    onChange={(e) => setPerson1Sign(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-8"
                  >
                    <option value="">Select a sign</option>
                    {zodiacSigns.map((sign) => (
                      <option key={sign.sign} value={sign.sign} className="bg-gray-800">
                        {sign.icon} {sign.sign}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Person 2 */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Second Person's Zodiac Sign
                  </label>
                  <select
                    value={person2Sign}
                    onChange={(e) => setPerson2Sign(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-8"
                  >
                    <option value="">Select a sign</option>
                    {zodiacSigns.map((sign) => (
                      <option key={sign.sign} value={sign.sign} className="bg-gray-800">
                        {sign.icon} {sign.sign}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="text-center">
                <Button 
                  variant="cosmic" 
                  size="lg"
                  onClick={calculateCompatibility}
                  disabled={!person1Sign || !person2Sign}
                  className="px-8"
                >
                  <i className="ri-heart-line mr-2"></i>
                  Calculate Compatibility
                </Button>
              </div>
            </Card>
          </div>
        </section>

        {/* Compatibility Result */}
        {compatibilityResult && (
          <section className="px-4 sm:px-6 lg:px-8 mb-12">
            <div className="max-w-4xl mx-auto">
              <Card className="p-8 text-center">
                <div className="mb-8">
                  <div className="flex items-center justify-center space-x-4 mb-6">
                    <div className="text-6xl">
                      {zodiacSigns.find(s => s.sign === compatibilityResult.person1)?.icon}
                    </div>
                    <div className="text-4xl text-pink-400">
                      <i className="ri-heart-fill"></i>
                    </div>
                    <div className="text-6xl">
                      {zodiacSigns.find(s => s.sign === compatibilityResult.person2)?.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {compatibilityResult.person1} & {compatibilityResult.person2}
                  </h3>
                  
                  {/* Compatibility Score */}
                  <div className="mb-6">
                    <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r ${getScoreColor(compatibilityResult.score)} text-white text-2xl font-bold mb-4`}>
                      {compatibilityResult.score}%
                    </div>
                    <p className="text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
                      {compatibilityResult.description}
                    </p>
                  </div>
                </div>

                {/* Detailed Analysis */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <i className="ri-emotion-line text-3xl text-purple-400 mb-3"></i>
                    <h4 className="font-semibold text-white mb-2">Emotional Bond</h4>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                        style={{ width: `${Math.max(compatibilityResult.score - 10, 0)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <i className="ri-chat-3-line text-3xl text-blue-400 mb-3"></i>
                    <h4 className="font-semibold text-white mb-2">Communication</h4>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                        style={{ width: `${Math.max(compatibilityResult.score - 5, 0)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <i className="ri-rocket-line text-3xl text-orange-400 mb-3"></i>
                    <h4 className="font-semibold text-white mb-2">Adventure</h4>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full"
                        style={{ width: `${compatibilityResult.score}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <Button variant="primary" size="lg">
                  <i className="ri-file-download-line mr-2"></i>
                  Download Full Report
                </Button>
              </Card>
            </div>
          </section>
        )}

        {/* Compatibility Types */}
        <section className="px-4 sm:px-6 lg:px-8 mb-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Types of Compatibility</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-heart-fill text-2xl text-white"></i>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Romantic</h3>
                <p className="text-sm text-gray-300">Love and relationship compatibility</p>
              </Card>

              <Card className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-group-line text-2xl text-white"></i>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Friendship</h3>
                <p className="text-sm text-gray-300">Platonic bonds and social harmony</p>
              </Card>

              <Card className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-briefcase-line text-2xl text-white"></i>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Business</h3>
                <p className="text-sm text-gray-300">Professional partnerships</p>
              </Card>

              <Card className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-home-heart-line text-2xl text-white"></i>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Family</h3>
                <p className="text-sm text-gray-300">Family dynamics and bonds</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Advanced Compatibility Features */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-heart-line text-3xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Complete Compatibility Experience</h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Access detailed compatibility reports, synastry charts, composite analysis, and relationship timing guidance
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <i className="ri-pie-chart-line text-2xl text-purple-400 mb-2"></i>
                  <p className="text-white font-medium">Synastry Charts</p>
                </div>
                <div className="text-center">
                  <i className="ri-calendar-event-line text-2xl text-purple-400 mb-2"></i>
                  <p className="text-white font-medium">Relationship Timing</p>
                </div>
                <div className="text-center">
                  <i className="ri-file-text-line text-2xl text-purple-400 mb-2"></i>
                  <p className="text-white font-medium">Detailed Reports</p>
                </div>
              </div>
              <Button variant="cosmic" size="lg" className="px-8" onClick={handleExploreAllFeatures}>
                <i className="ri-heart-line mr-2"></i>
                Explore All Features
              </Button>
            </Card>
          </div>
        </section>

        {/* Advanced Features Modal */}
        {showFeaturesModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowFeaturesModal(false)}></div>
            <div className="relative bg-gradient-to-br from-purple-900/95 to-indigo-900/95 backdrop-blur-lg rounded-2xl border border-white/20 p-8 max-w-6xl w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setShowFeaturesModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
              >
                <i className="ri-close-line text-xl"></i>
              </button>

              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-heart-2-fill text-3xl text-white"></i>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">Advanced Compatibility Features</h3>
                <p className="text-purple-300">Unlock the deepest secrets of cosmic connections</p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {advancedFeatures.map((feature) => (
                  <div key={feature.id} className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-6 border border-white/10">
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mb-4`}>
                      <i className={`${feature.icon} text-2xl text-white`}></i>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-3">{feature.title}</h4>
                    <p className="text-gray-300 mb-4 leading-relaxed">{feature.description}</p>
                    <div className="space-y-2">
                      {feature.features.map((item, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                          <span className="text-sm text-gray-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Premium Benefits */}
              <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-6 mb-8">
                <h4 className="text-xl font-semibold text-white mb-4 text-center flex items-center justify-center">
                  <i className="ri-vip-crown-line mr-2 text-yellow-400"></i>
                  Premium Compatibility Suite
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center">
                    <i className="ri-star-line text-2xl text-yellow-400 mb-2"></i>
                    <p className="text-sm text-gray-300">Unlimited compatibility checks</p>
                  </div>
                  <div className="text-center">
                    <i className="ri-file-text-line text-2xl text-blue-400 mb-2"></i>
                    <p className="text-sm text-gray-300">Detailed PDF reports</p>
                  </div>
                  <div className="text-center">
                    <i className="ri-calendar-line text-2xl text-green-400 mb-2"></i>
                    <p className="text-sm text-gray-300">Relationship timing forecasts</p>
                  </div>
                  <div className="text-center">
                    <i className="ri-heart-pulse-line text-2xl text-red-400 mb-2"></i>
                    <p className="text-sm text-gray-300">Live compatibility updates</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="cosmic" className="flex-1" onClick={() => setShowFeaturesModal(false)}>
                  <i className="ri-rocket-line mr-2"></i>
                  Start Premium Trial
                </Button>
                <Button variant="secondary" className="flex-1" onClick={() => setShowFeaturesModal(false)}>
                  <i className="ri-bookmark-line mr-2"></i>
                  Learn More
                </Button>
                <Button variant="ghost" className="flex-1" onClick={() => setShowFeaturesModal(false)}>
                  <i className="ri-close-line mr-2"></i>
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
