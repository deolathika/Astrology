
import { useState } from 'react';
import Navigation from '../../components/feature/Navigation';
import StarfieldBackground from '../../components/feature/StarfieldBackground';
import ZodiacCard from '../../components/feature/ZodiacCard';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';
import VedicModal from './components/VedicModal';
import PremiumModal from '../../components/ui/PremiumModal';
import { zodiacSigns } from '../../mocks/zodiacData';

export default function Zodiac() {
  const [selectedSystem, setSelectedSystem] = useState('western');
  const [userRole, setUserRole] = useState<'guest' | 'premium' | 'admin'>('guest');
  const [showSriLankanModal, setShowSriLankanModal] = useState(false);
  const [showVedicModal, setShowVedicModal] = useState(false);
  const [showWesternModal, setShowWesternModal] = useState(false);
  const [showChineseModal, setShowChineseModal] = useState(false);
  const [showHybridModal, setShowHybridModal] = useState(false);
  const [showAllFeaturesModal, setShowAllFeaturesModal] = useState(false);
  const [showSystemStatusModal, setShowSystemStatusModal] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [selectedSystemForStatus, setSelectedSystemForStatus] = useState('');

  const astrologySystems = [
    { 
      id: 'western', 
      name: 'Western', 
      description: 'Traditional Western astrology based on tropical zodiac',
      status: 'active',
      accuracy: '94%',
      lastUpdate: '2 hours ago',
      features: ['Tropical Zodiac', '12 Houses', 'Planetary Aspects', 'Transit Analysis']
    },
    { 
      id: 'vedic', 
      name: 'Vedic', 
      description: 'Ancient Indian astrology using sidereal zodiac',
      status: 'active',
      accuracy: '96%',
      lastUpdate: '1 hour ago',
      features: ['Sidereal Zodiac', '27 Nakshatras', 'Dasha System', 'Divisional Charts']
    },
    { 
      id: 'chinese', 
      name: 'Chinese', 
      description: '12-year cycle based on lunar calendar',
      status: 'active',
      accuracy: '92%',
      lastUpdate: '3 hours ago',
      features: ['12 Animals', '5 Elements', 'Four Pillars', 'Lunar Calendar']
    },
    { 
      id: 'sri-lankan', 
      name: 'Sri Lankan', 
      description: 'Traditional Sri Lankan astrological system',
      status: 'active',
      accuracy: '95%',
      lastUpdate: '1 hour ago',
      features: ['Porondam Matching', 'Muhurtha Timing', 'Nakshatra Analysis', 'Ayurvedic Integration']
    },
    { 
      id: 'hybrid', 
      name: 'Hybrid AI', 
      description: 'AI-powered combination of all systems',
      status: 'active',
      accuracy: '98%',
      lastUpdate: '30 minutes ago',
      features: ['Multi-System Synthesis', 'AI Predictions', 'Machine Learning', 'Personalized Insights']
    }
  ];

  const handleUnlockReading = () => {
    if (userRole === 'guest') {
      setShowPremiumModal(true);
    }
  };

  const handleUpgrade = (plan: 'monthly' | 'annual') => {
    // Simulate upgrade process
    setUserRole('premium');
    setShowPremiumModal(false);
    
    // Show success message
    const successToast = document.createElement('div');
    successToast.className = 'fixed top-24 right-6 z-50 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg shadow-2xl flex items-center space-x-2 animate-pulse';
    successToast.innerHTML = '<i class="ri-vip-crown-line"></i><span>Welcome to Premium! All features unlocked.</span>';
    document.body.appendChild(successToast);
    setTimeout(() => document.body.removeChild(successToast), 4000);
  };

  const handleSriLankanClick = () => {
    if (userRole === 'guest') {
      setShowPremiumModal(true);
    } else {
      setShowSriLankanModal(true);
    }
  };

  const handleVedicClick = () => {
    if (userRole === 'guest') {
      setShowPremiumModal(true);
    } else {
      setShowVedicModal(true);
    }
  };

  const handleWesternClick = () => {
    if (userRole === 'guest') {
      setShowPremiumModal(true);
    } else {
      setShowWesternModal(true);
    }
  };

  const handleChineseClick = () => {
    if (userRole === 'guest') {
      setShowPremiumModal(true);
    } else {
      setShowChineseModal(true);
    }
  };

  const handleHybridClick = () => {
    if (userRole === 'guest') {
      setShowPremiumModal(true);
    } else {
      setShowHybridModal(true);
    }
  };

  const handleSystemClick = (systemId: string) => {
    if (systemId === 'sri-lankan') {
      handleSriLankanClick();
    } else if (systemId === 'vedic') {
      handleVedicClick();
    } else if (systemId === 'western') {
      handleWesternClick();
    } else if (systemId === 'chinese') {
      handleChineseClick();
    } else if (systemId === 'hybrid') {
      handleHybridClick();
    } else {
      if (userRole === 'guest') {
        setShowPremiumModal(true);
      } else {
        setSelectedSystem(systemId);
      }
    }
  };

  const handleCardClick = (systemId: string) => {
    handleSystemClick(systemId);
  };

  const handleExploreAllFeatures = () => {
    if (userRole === 'guest') {
      setShowPremiumModal(true);
    } else {
      setShowAllFeaturesModal(true);
    }
  };

  const handleAvailableClick = (systemId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    if (userRole === 'guest') {
      setShowPremiumModal(true);
    } else {
      setSelectedSystemForStatus(systemId);
      setShowSystemStatusModal(true);
    }
  };

  return (
    <div className="min-h-screen relative">
      <StarfieldBackground />
      <Navigation userRole={userRole} />
      
      <div className="relative z-10 pt-20 pb-12">
        {/* Header */}
        <section className="px-4 sm:px-6 lg:px-8 mb-12">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              Astrology Insights
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Explore the cosmic wisdom of multiple astrological traditions
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

        {/* Premium Access Notice for Guests */}
        {userRole === 'guest' && (
          <section className="px-4 sm:px-6 lg:px-8 mb-8">
            <div className="max-w-4xl mx-auto">
              <Card className="p-6 border-2 border-yellow-500/30 bg-gradient-to-r from-yellow-500/10 to-orange-500/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <i className="ri-vip-crown-line text-xl text-white"></i>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Premium Features Available</h3>
                      <p className="text-gray-300 text-sm">Unlock detailed readings and all astrology systems</p>
                    </div>
                  </div>
                  <Button variant="cosmic" onClick={() => setShowPremiumModal(true)}>
                    <i className="ri-rocket-line mr-2"></i>
                    Upgrade Now
                  </Button>
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* Astrology Systems */}
        <section className="px-4 sm:px-6 lg:px-8 mb-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Choose Your Astrological System</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
              {astrologySystems.map((system) => (
                <Card
                  key={system.id}
                  className={`p-4 cursor-pointer transition-all duration-300 relative ${
                    selectedSystem === system.id 
                      ? 'ring-2 ring-purple-400 bg-purple-500/20' 
                      : 'hover:bg-white/15 hover:scale-105 hover:shadow-2xl'
                  } ${userRole === 'guest' ? 'opacity-75' : ''}`}
                  onClick={() => handleCardClick(system.id)}
                >
                  {userRole === 'guest' && (
                    <div className="absolute top-2 right-2">
                      <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                        <i className="ri-lock-line text-xs text-white"></i>
                      </div>
                    </div>
                  )}
                  <h3 className="text-lg font-semibold text-white mb-2">{system.name}</h3>
                  <p 
                    className="text-sm text-gray-300 cursor-pointer hover:text-purple-300 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSystemClick(system.id);
                    }}
                  >
                    {system.description}
                  </p>
                  <div className="mt-2">
                    <button
                      onClick={(e) => handleAvailableClick(system.id, e)}
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs transition-all duration-200 cursor-pointer ${
                        userRole === 'guest' 
                          ? 'bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30 hover:text-yellow-200'
                          : 'bg-green-500/20 text-green-300 hover:bg-green-500/30 hover:text-green-200'
                      }`}
                    >
                      <i className={`${userRole === 'guest' ? 'ri-lock-line' : 'ri-check-line'} mr-1`}></i>
                      {userRole === 'guest' ? 'Premium' : 'Available'}
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Premium Modal */}
        <PremiumModal 
          isOpen={showPremiumModal}
          onClose={() => setShowPremiumModal(false)}
          onUpgrade={handleUpgrade}
        />

        {/* System Status Modal */}
        {showSystemStatusModal && selectedSystemForStatus && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowSystemStatusModal(false)}></div>
            <div className="relative bg-gradient-to-br from-purple-900/95 to-indigo-900/95 backdrop-blur-lg rounded-2xl border border-white/20 p-8 max-w-md w-full mx-4 shadow-2xl">
              <button
                onClick={() => setShowSystemStatusModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <i className="ri-close-line text-xl"></i>
              </button>

              {(() => {
                const system = astrologySystems.find(s => s.id === selectedSystemForStatus);
                if (!system) return null;

                return (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="ri-check-line text-2xl text-white"></i>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2">{system.name} System Status</h3>
                    <p className="text-green-300 mb-6">Fully operational and ready to serve</p>

                    {/* System Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-white/10 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-white mb-1">{system.accuracy}</div>
                        <div className="text-sm text-gray-400">Accuracy Rate</div>
                      </div>
                      <div className="bg-white/10 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-white mb-1">
                          <i className="ri-pulse-line text-green-400"></i>
                        </div>
                        <div className="text-sm text-gray-400">System Health</div>
                      </div>
                    </div>

                    {/* Last Update */}
                    <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-xl p-4 mb-6">
                      <div className="flex items-center justify-center space-x-2 text-green-300">
                        <i className="ri-time-line"></i>
                        <span className="text-sm">Last updated: {system.lastUpdate}</span>
                      </div>
                    </div>

                    {/* Available Features */}
                    <div className="text-left mb-6">
                      <h4 className="text-lg font-semibold text-white mb-3 text-center">Available Features</h4>
                      <div className="space-y-2">
                        {system.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center">
                              <i className="ri-check-line text-green-400 text-xs"></i>
                            </div>
                            <span className="text-gray-200 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <Button 
                        variant="cosmic" 
                        className="w-full" 
                        onClick={() => {
                          setSelectedSystem(system.id);
                          setShowSystemStatusModal(false);
                        }}
                      >
                        <i className="ri-rocket-line mr-2"></i>
                        Use {system.name} System
                      </Button>
                      <Button 
                        variant="secondary" 
                        className="w-full" 
                        onClick={() => {
                          handleSystemClick(system.id);
                          setShowSystemStatusModal(false);
                        }}
                      >
                        <i className="ri-information-line mr-2"></i>
                        Learn More
                      </Button>
                      <Button variant="ghost" className="w-full" onClick={() => setShowSystemStatusModal(false)}>
                        Close
                      </Button>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* Western Astrology Modal */}
        {showWesternModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowWesternModal(false)}></div>
            <div className="relative bg-gradient-to-br from-purple-900/95 to-indigo-900/95 backdrop-blur-lg rounded-2xl border border-white/20 p-8 max-w-2xl w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setShowWesternModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <i className="ri-close-line text-xl"></i>
              </button>

              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-star-line text-3xl text-white"></i>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">Western Astrology</h3>
                <p className="text-purple-300">The Foundation of Modern Astrology</p>
              </div>

              <div className="space-y-6">
                {/* Overview */}
                <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-6">
                  <h4 className="text-xl font-semibold text-white mb-3 flex items-center">
                    <i className="ri-book-open-line mr-2 text-purple-400"></i>
                    Classical Foundation
                  </h4>
                  <p className="text-gray-200 leading-relaxed">
                    Western astrology, rooted in ancient Babylonian and Greek traditions, uses the tropical zodiac system based on the Earth's relationship to the Sun. This system divides the year into 12 equal segments of 30 degrees each, starting with the Spring Equinox as 0° Aries.
                  </p>
                </div>

                {/* Key Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-xl p-4">
                    <h5 className="font-semibold text-white mb-2 flex items-center">
                      <i className="ri-sun-line mr-2 text-yellow-400"></i>
                      Tropical Zodiac
                    </h5>
                    <p className="text-sm text-gray-300">Based on Earth's relationship to the Sun</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 rounded-xl p-4">
                    <h5 className="font-semibold text-white mb-2 flex items-center">
                      <i className="ri-fire-line mr-2 text-red-400"></i>
                      Four Elements
                    </h5>
                    <p className="text-sm text-gray-300">Fire, Earth, Air, and Water representing different energy types</p>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 rounded-xl p-4">
                    <h5 className="font-semibold text-white mb-2 flex items-center">
                      <i className="ri-home-line mr-2 text-orange-400"></i>
                      Twelve Houses
                    </h5>
                    <p className="text-sm text-gray-300">Life areas from identity to spirituality and transformation</p>
                  </div>
                  <div className="bg-gradient-to-br from-red-600/20 to-pink-600/20 rounded-xl p-4">
                    <h5 className="font-semibold text-white mb-2 flex items-center">
                      <i className="ri-planet-line mr-2 text-purple-400"></i>
                      Planetary Aspects
                    </h5>
                    <p className="text-sm text-gray-300">Angular relationships between planets creating dynamic influences</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button variant="cosmic" className="flex-1" onClick={() => { setSelectedSystem('western'); setShowWesternModal(false); }}>
                    <i className="ri-star-line mr-2"></i>
                    Explore Western System
                  </Button>
                  <Button variant="secondary" className="flex-1" onClick={() => setShowWesternModal(false)}>
                    <i className="ri-bookmark-line mr-2"></i>
                    Learn More Later
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sri Lankan Astrology Modal */}
        {showSriLankanModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowSriLankanModal(false)}></div>
            <div className="relative bg-gradient-to-br from-purple-900/95 to-indigo-900/95 backdrop-blur-lg rounded-2xl border border-white/20 p-8 max-w-2xl w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setShowSriLankanModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <i className="ri-close-line text-xl"></i>
              </button>

              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-ancient-gate-line text-3xl text-white"></i>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">Sri Lankan Astrology</h3>
                <p className="text-purple-300">Ancient Wisdom of the Pearl Island</p>
              </div>

              <div className="space-y-6">
                {/* Overview */}
                <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-6">
                  <h4 className="text-xl font-semibold text-white mb-3 flex items-center">
                    <i className="ri-book-open-line mr-2 text-purple-400"></i>
                    Ancient Heritage
                  </h4>
                  <p className="text-gray-200 leading-relaxed">
                    Sri Lankan astrology, known as "Jyotisha Shastra," combines ancient Vedic principles with unique local traditions developed over 2,500 years. This system integrates Buddhist philosophy with Hindu astrological concepts, creating a distinctive approach to cosmic interpretation.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button variant="cosmic" className="flex-1" onClick={() => { setSelectedSystem('sri-lankan'); setShowSriLankanModal(false); }}>
                    <i className="ri-compass-3-line mr-2"></i>
                    Explore Sri Lankan System
                  </Button>
                  <Button variant="secondary" className="flex-1" onClick={() => setShowSriLankanModal(false)}>
                    <i className="ri-bookmark-line mr-2"></i>
                    Learn More Later
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Vedic Modal */}
        <VedicModal 
          isOpen={showVedicModal}
          onClose={() => setShowVedicModal(false)}
          onSelect={() => setSelectedSystem('vedic')}
        />

        {/* System Info */}
        <section className="px-4 sm:px-6 lg:px-8 mb-12">
          <div className="max-w-4xl mx-auto">
            <Card className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <i className="ri-star-line text-xl text-white"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {astrologySystems.find(s => s.id === selectedSystem)?.name} Astrology
                  </h3>
                  <p className="text-gray-300">
                    {astrologySystems.find(s => s.id === selectedSystem)?.description}
                  </p>
                </div>
              </div>
              
              {selectedSystem === 'western' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="text-center">
                    <h4 className="font-semibold text-white mb-2">Tropical Zodiac</h4>
                    <p className="text-sm text-gray-300">Based on Earth's relationship to the Sun</p>
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold text-white mb-2">12 Signs</h4>
                    <p className="text-sm text-gray-300">Each representing 30° of the ecliptic</p>
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold text-white mb-2">4 Elements</h4>
                    <p className="text-sm text-gray-300">Fire, Earth, Air, and Water</p>
                  </div>
                </div>
              )}

              {selectedSystem === 'vedic' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="text-center">
                    <h4 className="font-semibold text-white mb-2">Sidereal Zodiac</h4>
                    <p className="text-sm text-gray-300">Based on fixed star positions</p>
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold text-white mb-2">27 Nakshatras</h4>
                    <p className="text-sm text-gray-300">Lunar mansions for detailed analysis</p>
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold text-white mb-2">Dasha System</h4>
                    <p className="text-sm text-gray-300">Planetary periods and timing</p>
                  </div>
                </div>
              )}

              {selectedSystem === 'sri-lankan' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="text-center">
                    <h4 className="font-semibold text-white mb-2">Lunar Calendar</h4>
                    <p className="text-sm text-gray-300">Traditional Sinhala calendar system</p>
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold text-white mb-2">Porondam</h4>
                    <p className="text-sm text-gray-300">Compatibility matching system</p>
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold text-white mb-2">Muhurtha</h4>
                    <p className="text-sm text-gray-300">Auspicious timing selection</p>
                  </div>
                </div>
              )}

              {selectedSystem === 'chinese' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="text-center">
                    <h4 className="font-semibold text-white mb-2">12 Animals</h4>
                    <p className="text-sm text-gray-300">Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Goat, Monkey, Rooster, Dog, Pig</p>
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold text-white mb-2">5 Elements</h4>
                    <p className="text-sm text-gray-300">Wood, Fire, Earth, Metal, Water</p>
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold text-white mb-2">Lunar Calendar</h4>
                    <p className="text-sm text-gray-300">Based on moon phases and cycles</p>
                  </div>
                </div>
              )}

              {selectedSystem === 'hybrid' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="text-center">
                    <h4 className="font-semibold text-white mb-2">AI Integration</h4>
                    <p className="text-sm text-gray-300">Machine learning enhanced predictions</p>
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold text-white mb-2">Multi-System</h4>
                    <p className="text-sm text-gray-300">Combines all astrological traditions</p>
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold text-white mb-2">Personalized</h4>
                    <p className="text-sm text-gray-300">Adapts to your unique cosmic profile</p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </section>

        {/* Zodiac Signs Grid */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">Today's Readings</h2>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm">
                  <i className="ri-calendar-line mr-2"></i>
                  {new Date().toLocaleDateString()}
                </Button>
                <Button variant="secondary" size="sm">
                  <i className="ri-refresh-line mr-2"></i>
                  Refresh
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {zodiacSigns.map((sign) => (
                <ZodiacCard
                  key={sign.sign}
                  {...sign}
                  userRole={userRole}
                  onUnlockReading={handleUnlockReading}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Advanced Features */}
        <section className="px-4 sm:px-6 lg:px-8 mt-16">
          <div className="max-w-4xl mx-auto">
            <Card className={`p-8 text-center ${userRole === 'guest' ? 'border-2 border-yellow-500/30 bg-gradient-to-r from-yellow-500/10 to-orange-500/10' : ''}`}>
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-star-line text-3xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Complete Astrology Experience</h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Access all 5 astrological systems, detailed birth chart analysis, compatibility reports, and personalized daily guidance
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <i className="ri-star-line text-2xl text-purple-400 mb-2"></i>
                  <p className="text-white font-medium">5 Astrology Systems</p>
                </div>
                <div className="text-center">
                  <i className="ri-pie-chart-line text-2xl text-purple-400 mb-2"></i>
                  <p className="text-white font-medium">Birth Chart Analysis</p>
                </div>
                <div className="text-center">
                  <i className="ri-heart-line text-2xl text-purple-400 mb-2"></i>
                  <p className="text-white font-medium">Compatibility Reports</p>
                </div>
              </div>
              <Button 
                variant="cosmic" 
                size="lg" 
                className="px-8" 
                onClick={handleExploreAllFeatures}
              >
                <i className={`${userRole === 'guest' ? 'ri-vip-crown-line' : 'ri-star-line'} mr-2`}></i>
                {userRole === 'guest' ? 'Unlock Premium Features' : 'Explore All Features'}
              </Button>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
