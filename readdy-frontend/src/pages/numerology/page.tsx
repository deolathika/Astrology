
import { useState } from 'react';
import Navigation from '../../components/feature/Navigation';
import StarfieldBackground from '../../components/feature/StarfieldBackground';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';
import PremiumModal from '../../components/ui/PremiumModal';
import { numerologyMeanings, calculateLifePath, calculatePersonalYear } from '../../mocks/numerologyData';

export default function Numerology() {
  const [userRole, setUserRole] = useState<'guest' | 'premium' | 'admin'>('guest');
  const [birthDate, setBirthDate] = useState('');
  const [lifePath, setLifePath] = useState<number | null>(null);
  const [personalYear, setPersonalYear] = useState<number | null>(null);
  const [selectedNumber, setSelectedNumber] = useState<number>(1);
  const [showAllFeaturesModal, setShowAllFeaturesModal] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showNameAnalysisModal, setShowNameAnalysisModal] = useState(false);

  // Name Analysis State
  const [fullName, setFullName] = useState('');
  const [nameAnalysisResult, setNameAnalysisResult] = useState<any>(null);

  const handleCalculate = () => {
    if (birthDate) {
      const lifePathNumber = calculateLifePath(birthDate);
      const personalYearNumber = calculatePersonalYear(birthDate, new Date().getFullYear());
      setLifePath(lifePathNumber);
      setPersonalYear(personalYearNumber);
    }
  };

  const handleExploreAllFeatures = () => {
    if (userRole === 'guest') {
      setShowPremiumModal(true);
    } else {
      setShowAllFeaturesModal(true);
    }
  };

  const handleTryNameAnalysis = () => {
    if (userRole === 'guest') {
      setShowPremiumModal(true);
    } else {
      setShowNameAnalysisModal(true);
    }
  };

  const handleUpgrade = (plan: 'monthly' | 'annual') => {
    setUserRole('premium');
    setShowPremiumModal(false);
    
    const successToast = document.createElement('div');
    successToast.className = 'fixed top-24 right-6 z-50 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg shadow-2xl flex items-center space-x-2 animate-pulse';
    successToast.innerHTML = '<i class="ri-vip-crown-line"></i><span>Welcome to Premium! All numerology features unlocked.</span>';
    document.body.appendChild(successToast);
    setTimeout(() => document.body.removeChild(successToast), 4000);
  };

  // Name Numerology Calculation Functions
  const calculateNameNumber = (name: string): number => {
    const letterValues: { [key: string]: number } = {
      'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
      'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 6, 'P': 7, 'Q': 8, 'R': 9,
      'S': 1, 'T': 2, 'U': 3, 'V': 4, 'W': 5, 'X': 6, 'Y': 7, 'Z': 8
    };

    let sum = 0;
    for (const char of name.toUpperCase().replace(/[^A-Z]/g, '')) {
      sum += letterValues[char] || 0;
    }

    // Reduce to single digit (except master numbers)
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    }

    return sum;
  };

  const calculateExpressionNumber = (fullName: string): number => {
    return calculateNameNumber(fullName);
  };

  const calculateSoulUrgeNumber = (fullName: string): number => {
    const vowels = fullName.toUpperCase().replace(/[^AEIOU]/g, '');
    return calculateNameNumber(vowels);
  };

  const calculatePersonalityNumber = (fullName: string): number => {
    const consonants = fullName.toUpperCase().replace(/[AEIOU\s]/g, '');
    return calculateNameNumber(consonants);
  };

  const analyzeFullName = () => {
    if (!fullName.trim()) return;

    const expressionNumber = calculateExpressionNumber(fullName);
    const soulUrgeNumber = calculateSoulUrgeNumber(fullName);
    const personalityNumber = calculatePersonalityNumber(fullName);

    const result = {
      fullName: fullName.trim(),
      expressionNumber,
      soulUrgeNumber,
      personalityNumber,
      expressionMeaning: numerologyMeanings[expressionNumber as keyof typeof numerologyMeanings] || numerologyMeanings[1],
      soulUrgeMeaning: numerologyMeanings[soulUrgeNumber as keyof typeof numerologyMeanings] || numerologyMeanings[1],
      personalityMeaning: numerologyMeanings[personalityNumber as keyof typeof numerologyMeanings] || numerologyMeanings[1],
      analysis: generateNameAnalysis(expressionNumber, soulUrgeNumber, personalityNumber, fullName)
    };

    setNameAnalysisResult(result);
  };

  const generateNameAnalysis = (expression: number, soulUrge: number, personality: number, name: string) => {
    const firstName = name.split(' ')[0];
    
    return {
      overview: `${firstName}, your name carries powerful numerological vibrations that shape your life path and personality. The combination of Expression ${expression}, Soul Urge ${soulUrge}, and Personality ${personality} creates a unique cosmic signature that influences your destiny.`,
      strengths: [
        `Natural ${numerologyMeanings[expression as keyof typeof numerologyMeanings]?.traits[0].toLowerCase()} abilities from your Expression Number`,
        `Deep ${numerologyMeanings[soulUrge as keyof typeof numerologyMeanings]?.traits[1].toLowerCase()} desires driving your soul's purpose`,
        `${numerologyMeanings[personality as keyof typeof numerologyMeanings]?.traits[0]} personality that others immediately recognize`
      ],
      challenges: [
        `Balancing your ${numerologyMeanings[expression as keyof typeof numerologyMeanings]?.element.toLowerCase()} expression energy`,
        `Aligning outer personality with inner soul urge desires`,
        `Managing the intensity of multiple numerological influences`
      ],
      guidance: `Focus on integrating your ${numerologyMeanings[expression as keyof typeof numerologyMeanings]?.title.toLowerCase()} expression with your ${numerologyMeanings[soulUrge as keyof typeof numerologyMeanings]?.title.toLowerCase()} soul purpose. Your ${numerologyMeanings[personality as keyof typeof numerologyMeanings]?.title.toLowerCase()} personality is the bridge between your inner and outer worlds.`
    };
  };

  const numbers = Object.keys(numerologyMeanings).map(Number);

  const advancedFeatures = [
    {
      id: 'name-analysis',
      title: 'Name Numerology Analysis',
      description: 'Discover the hidden power in your name with comprehensive analysis of expression, soul urge, and personality numbers.',
      icon: 'ri-user-heart-line',
      color: 'from-pink-500 to-rose-500',
      features: ['Expression Number', 'Soul Urge Number', 'Personality Number', 'Hidden Passion Number'],
      demo: 'Calculate the numerological value of any name and reveal personality traits, life purpose, and hidden talents.',
      action: handleTryNameAnalysis
    },
    {
      id: 'compatibility',
      title: 'Numerology Compatibility',
      description: 'Analyze relationship compatibility using life path numbers, expression numbers, and cosmic connections.',
      icon: 'ri-heart-2-line',
      color: 'from-red-500 to-pink-500',
      features: ['Life Path Compatibility', 'Expression Harmony', 'Challenge Numbers', 'Relationship Cycles'],
      demo: 'Compare two birth dates to reveal compatibility percentage, relationship strengths, and potential challenges.'
    },
    {
      id: 'yearly-forecast',
      title: 'Personal Year Forecasts',
      description: 'Get detailed yearly predictions and monthly breakdowns based on your personal numerology cycles.',
      icon: 'ri-calendar-check-line',
      color: 'from-blue-500 to-cyan-500',
      features: ['9-Year Cycles', 'Monthly Themes', 'Peak Periods', 'Challenge Months'],
      demo: 'Understand what each year brings and plan important decisions during favorable numerological periods.'
    },
    {
      id: 'master-numbers',
      title: 'Master Numbers Analysis',
      description: 'Explore the powerful vibrations of master numbers 11, 22, and 33 and their spiritual significance.',
      icon: 'ri-star-s-line',
      color: 'from-purple-500 to-indigo-500',
      features: ['Master Number 11', 'Master Number 22', 'Master Number 33', 'Spiritual Path'],
      demo: 'Discover if you carry master number energy and learn how to harness these powerful spiritual vibrations.'
    },
    {
      id: 'karmic-debt',
      title: 'Karmic Debt Numbers',
      description: 'Identify and understand karmic debt numbers 13, 14, 16, and 19 in your numerology chart.',
      icon: 'ri-refresh-line',
      color: 'from-orange-500 to-red-500',
      features: ['Karmic Debt 13', 'Karmic Debt 14', 'Karmic Debt 16', 'Karmic Debt 19'],
      demo: 'Learn about past-life influences and how to transform karmic challenges into spiritual growth.'
    },
    {
      id: 'business-numerology',
      title: 'Business & Career Numerology',
      description: 'Optimize business names, launch dates, and career decisions using numerological principles.',
      icon: 'ri-briefcase-line',
      color: 'from-green-500 to-emerald-500',
      features: ['Business Name Analysis', 'Launch Date Selection', 'Career Path Guidance', 'Success Numbers'],
      demo: 'Find the perfect business name and timing for maximum success based on numerological harmony.'
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
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Numerology Insights
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Discover the hidden meanings in numbers and unlock your personal cosmic code
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
                      <h3 className="text-lg font-bold text-white">Advanced Numerology Features</h3>
                      <p className="text-gray-300 text-sm">Unlock detailed calculations, compatibility analysis, and yearly forecasts</p>
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

        {/* Calculator Section */}
        <section className="px-4 sm:px-6 lg:px-8 mb-12">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">Personal Numerology Calculator</h2>
              
              <div className="max-w-md mx-auto mb-8">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Enter your birth date
                </label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <Button 
                  variant="cosmic" 
                  className="w-full mt-4"
                  onClick={handleCalculate}
                  disabled={!birthDate}
                >
                  <i className="ri-calculator-line mr-2"></i>
                  Calculate My Numbers
                </Button>
              </div>

              {/* Results */}
              {lifePath !== null && personalYear !== null && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Life Path Number */}
                  <Card className="p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                    <div className="text-center">
                      <div 
                        className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold text-white"
                        style={{ backgroundColor: numerologyMeanings[lifePath as keyof typeof numerologyMeanings]?.color }}
                      >
                        {lifePath}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Life Path Number</h3>
                      <h4 className="text-lg text-purple-300 mb-3">
                        {numerologyMeanings[lifePath as keyof typeof numerologyMeanings]?.title}
                      </h4>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {numerologyMeanings[lifePath as keyof typeof numerologyMeanings]?.description}
                      </p>
                    </div>
                  </Card>

                  {/* Personal Year */}
                  <Card className="p-6 bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
                    <div className="text-center">
                      <div 
                        className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold text-white"
                        style={{ backgroundColor: numerologyMeanings[personalYear as keyof typeof numerologyMeanings]?.color }}
                      >
                        {personalYear}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Personal Year {new Date().getFullYear()}</h3>
                      <h4 className="text-lg text-blue-300 mb-3">
                        {numerologyMeanings[personalYear as keyof typeof numerologyMeanings]?.title}
                      </h4>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        This year focuses on the energy of {numerologyMeanings[personalYear as keyof typeof numerologyMeanings]?.title.toLowerCase()}.
                      </p>
                    </div>
                  </Card>
                </div>
              )}
            </Card>
          </div>
        </section>

        {/* Number Meanings */}
        <section className="px-4 sm:px-6 lg:px-8 mb-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Numerology Number Meanings</h2>
            
            {/* Number Selector */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {numbers.map((num) => (
                <button
                  key={num}
                  onClick={() => setSelectedNumber(num)}
                  className={`w-12 h-12 rounded-full font-bold transition-all duration-300 ${
                    selectedNumber === num
                      ? 'text-white scale-110 shadow-lg'
                      : 'text-gray-400 hover:text-white hover:scale-105'
                  }`}
                  style={{ 
                    backgroundColor: selectedNumber === num 
                      ? numerologyMeanings[num as keyof typeof numerologyMeanings]?.color 
                      : 'rgba(255,255,255,0.1)' 
                  }}
                >
                  {num}
                </button>
              ))}
            </div>

            {/* Selected Number Details */}
            <div className="max-w-4xl mx-auto">
              <Card className="p-8">
                <div className="text-center mb-8">
                  <div 
                    className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl font-bold text-white shadow-2xl"
                    style={{ backgroundColor: numerologyMeanings[selectedNumber as keyof typeof numerologyMeanings]?.color }}
                  >
                    {selectedNumber}
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {numerologyMeanings[selectedNumber as keyof typeof numerologyMeanings]?.title}
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
                    {numerologyMeanings[selectedNumber as keyof typeof numerologyMeanings]?.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Key Traits */}
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-4">Key Traits</h4>
                    <div className="space-y-2">
                      {numerologyMeanings[selectedNumber as keyof typeof numerologyMeanings]?.traits.map((trait, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: numerologyMeanings[selectedNumber as keyof typeof numerologyMeanings]?.color }}
                          ></div>
                          <span className="text-gray-300">{trait}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Element & Color */}
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-4">Cosmic Properties</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Element:</span>
                        <span className="text-white font-medium">
                          {numerologyMeanings[selectedNumber as keyof typeof numerologyMeanings]?.element}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Color:</span>
                        <div className="flex items-center space-x-2">
                          <div 
                            className="w-6 h-6 rounded-full border-2 border-white/20"
                            style={{ backgroundColor: numerologyMeanings[selectedNumber as keyof typeof numerologyMeanings]?.color }}
                          ></div>
                          <span className="text-white font-medium">
                            {numerologyMeanings[selectedNumber as keyof typeof numerologyMeanings]?.color}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Advanced Numerology Features */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className={`p-8 text-center ${userRole === 'guest' ? 'border-2 border-yellow-500/30 bg-gradient-to-r from-yellow-500/10 to-orange-500/10' : ''}`}>
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-calculator-line text-3xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Complete Numerology Experience</h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Access detailed numerology reports, compatibility analysis, name numerology, and personalized yearly forecasts
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <i className="ri-file-text-line text-2xl text-purple-400 mb-2"></i>
                  <p className="text-white font-medium">Detailed Reports</p>
                </div>
                <div className="text-center">
                  <i className="ri-user-heart-line text-2xl text-purple-400 mb-2"></i>
                  <p className="text-white font-medium">Name Analysis</p>
                </div>
                <div className="text-center">
                  <i className="ri-calendar-check-line text-2xl text-purple-400 mb-2"></i>
                  <p className="text-white font-medium">Yearly Forecasts</p>
                </div>
              </div>
              <Button variant="cosmic" size="lg" className="px-8" onClick={handleExploreAllFeatures}>
                <i className={`${userRole === 'guest' ? 'ri-vip-crown-line' : 'ri-calculator-line'} mr-2`}></i>
                {userRole === 'guest' ? 'Unlock Premium Features' : 'Explore All Features'}
              </Button>
            </Card>
          </div>
        </section>

        {/* Premium Modal */}
        <PremiumModal 
          isOpen={showPremiumModal}
          onClose={() => setShowPremiumModal(false)}
          onUpgrade={handleUpgrade}
        />

        {/* Name Analysis Modal */}
        {showNameAnalysisModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowNameAnalysisModal(false)}></div>
            <div className="relative bg-gradient-to-br from-purple-900/95 to-indigo-900/95 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-purple-900/90 to-indigo-900/90 backdrop-blur-lg border-b border-white/10 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Name Numerology Analysis</h2>
                    <p className="text-gray-300">Discover the hidden power and meaning in your name</p>
                  </div>
                  <button
                    onClick={() => setShowNameAnalysisModal(false)}
                    className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
                  >
                    <i className="ri-close-line text-2xl"></i>
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* Name Input Section */}
                <div className="mb-8">
                  <Card className="p-6">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="ri-user-heart-line text-2xl text-white"></i>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Enter Your Full Name</h3>
                      <p className="text-gray-300">Include first, middle, and last names for complete analysis</p>
                    </div>

                    <div className="max-w-md mx-auto">
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g., John Michael Smith"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-center text-lg"
                      />
                      <Button 
                        variant="cosmic" 
                        className="w-full mt-4"
                        onClick={analyzeFullName}
                        disabled={!fullName.trim()}
                      >
                        <i className="ri-search-line mr-2"></i>
                        Analyze My Name
                      </Button>
                    </div>
                  </Card>
                </div>

                {/* Analysis Results */}
                {nameAnalysisResult && (
                  <div className="space-y-6">
                    {/* Overview */}
                    <Card className="p-6">
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                        <i className="ri-user-star-line mr-2 text-pink-400"></i>
                        Personal Analysis for {nameAnalysisResult.fullName}
                      </h3>
                      <p className="text-gray-200 leading-relaxed">{nameAnalysisResult.analysis.overview}</p>
                    </Card>

                    {/* Core Numbers */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Expression Number */}
                      <Card className="p-6 text-center">
                        <div 
                          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white"
                          style={{ backgroundColor: nameAnalysisResult.expressionMeaning.color }}
                        >
                          {nameAnalysisResult.expressionNumber}
                        </div>
                        <h4 className="text-lg font-bold text-white mb-2">Expression Number</h4>
                        <h5 className="text-pink-300 mb-3">{nameAnalysisResult.expressionMeaning.title}</h5>
                        <p className="text-gray-300 text-sm">Your life's purpose and natural talents</p>
                      </Card>

                      {/* Soul Urge Number */}
                      <Card className="p-6 text-center">
                        <div 
                          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white"
                          style={{ backgroundColor: nameAnalysisResult.soulUrgeMeaning.color }}
                        >
                          {nameAnalysisResult.soulUrgeNumber}
                        </div>
                        <h4 className="text-lg font-bold text-white mb-2">Soul Urge Number</h4>
                        <h5 className="text-blue-300 mb-3">{nameAnalysisResult.soulUrgeMeaning.title}</h5>
                        <p className="text-gray-300 text-sm">Your heart's deepest desires and motivations</p>
                      </Card>

                      {/* Personality Number */}
                      <Card className="p-6 text-center">
                        <div 
                          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white"
                          style={{ backgroundColor: nameAnalysisResult.personalityMeaning.color }}
                        >
                          {nameAnalysisResult.personalityNumber}
                        </div>
                        <h4 className="text-lg font-bold text-white mb-2">Personality Number</h4>
                        <h5 className="text-green-300 mb-3">{nameAnalysisResult.personalityMeaning.title}</h5>
                        <p className="text-gray-300 text-sm">How others perceive you at first meeting</p>
                      </Card>
                    </div>

                    {/* Detailed Insights */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Strengths */}
                      <Card className="p-6">
                        <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                          <i className="ri-star-line mr-2 text-yellow-400"></i>
                          Your Strengths
                        </h4>
                        <div className="space-y-3">
                          {nameAnalysisResult.analysis.strengths.map((strength: string, index: number) => (
                            <div key={index} className="flex items-start space-x-3">
                              <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <i className="ri-check-line text-green-400 text-xs"></i>
                              </div>
                              <span className="text-gray-200 text-sm">{strength}</span>
                            </div>
                          ))}
                        </div>
                      </Card>

                      {/* Challenges */}
                      <Card className="p-6">
                        <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                          <i className="ri-focus-3-line mr-2 text-orange-400"></i>
                          Growth Areas
                        </h4>
                        <div className="space-y-3">
                          {nameAnalysisResult.analysis.challenges.map((challenge: string, index: number) => (
                            <div key={index} className="flex items-start space-x-3">
                              <div className="w-6 h-6 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <i className="ri-arrow-up-line text-orange-400 text-xs"></i>
                              </div>
                              <span className="text-gray-200 text-sm">{challenge}</span>
                            </div>
                          ))}
                        </div>
                      </Card>
                    </div>

                    {/* Guidance */}
                    <Card className="p-6">
                      <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                        <i className="ri-compass-3-line mr-2 text-purple-400"></i>
                        Cosmic Guidance
                      </h4>
                      <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-4">
                        <p className="text-gray-200 leading-relaxed">{nameAnalysisResult.analysis.guidance}</p>
                      </div>
                    </Card>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Button variant="cosmic" className="flex-1">
                        <i className="ri-download-line mr-2"></i>
                        Download Full Report
                      </Button>
                      <Button variant="secondary" className="flex-1">
                        <i className="ri-share-line mr-2"></i>
                        Share Analysis
                      </Button>
                      <Button variant="primary" className="flex-1">
                        <i className="ri-bookmark-line mr-2"></i>
                        Save to Profile
                      </Button>
                    </div>
                  </div>
                )}

                {/* Sample Analysis for Demo */}
                {!nameAnalysisResult && (
                  <div className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                      <i className="ri-lightbulb-line mr-2 text-yellow-400"></i>
                      What You'll Discover
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
                      <div>
                        <h5 className="font-semibold text-white mb-2">Expression Number</h5>
                        <p>Your life's purpose, natural talents, and the path you're meant to follow</p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-white mb-2">Soul Urge Number</h5>
                        <p>Your heart's deepest desires, inner motivations, and what truly fulfills you</p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-white mb-2">Personality Number</h5>
                        <p>How others perceive you, your outer personality, and first impressions</p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-white mb-2">Cosmic Guidance</h5>
                        <p>Personalized insights for aligning your name energy with your life purpose</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* All Features Modal */}
        {showAllFeaturesModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowAllFeaturesModal(false)}></div>
            <div className="relative bg-gradient-to-br from-purple-900/95 to-indigo-900/95 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-purple-900/90 to-indigo-900/90 backdrop-blur-lg border-b border-white/10 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Advanced Numerology Features</h2>
                    <p className="text-gray-300">Unlock the complete power of numbers in your life</p>
                  </div>
                  <button
                    onClick={() => setShowAllFeaturesModal(false)}
                    className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
                  >
                    <i className="ri-close-line text-2xl"></i>
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {advancedFeatures.map((feature) => (
                    <Card key={feature.id} className="p-6 hover:bg-white/10 transition-all duration-300">
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                          <i className={`${feature.icon} text-xl text-white`}></i>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                          <p className="text-gray-300 text-sm mb-4 leading-relaxed">{feature.description}</p>
                          
                          {/* Features List */}
                          <div className="grid grid-cols-2 gap-2 mb-4">
                            {feature.features.map((item, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                <div className={`w-2 h-2 bg-gradient-to-r ${feature.color} rounded-full`}></div>
                                <span className="text-gray-400 text-xs">{item}</span>
                              </div>
                            ))}
                          </div>

                          {/* Demo Description */}
                          <div className="bg-white/5 rounded-lg p-3 mb-4">
                            <p className="text-gray-300 text-xs leading-relaxed">{feature.demo}</p>
                          </div>

                          <Button 
                            variant="primary" 
                            size="sm" 
                            className="w-full"
                            onClick={feature.action || (() => {})}
                          >
                            <i className="ri-play-line mr-2"></i>
                            Try {feature.title}
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Master Class Section */}
                <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-8 mb-8">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="ri-graduation-cap-line text-3xl text-white"></i>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Numerology Master Class</h3>
                    <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
                      Join our comprehensive numerology course and become a certified numerologist. Learn advanced techniques, 
                      interpretation methods, and how to provide professional readings.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white mb-1">12</div>
                        <div className="text-gray-300 text-sm">Modules</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white mb-1">50+</div>
                        <div className="text-gray-300 text-sm">Lessons</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white mb-1">Certificate</div>
                        <div className="text-gray-300 text-sm">Included</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white mb-1">Lifetime</div>
                        <div className="text-gray-300 text-sm">Access</div>
                      </div>
                    </div>

                    <Button variant="cosmic" size="lg">
                      <i className="ri-book-open-line mr-2"></i>
                      Start Master Class
                    </Button>
                  </div>
                </div>

                {/* Quick Access Tools */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="secondary" className="p-4 h-auto flex-col">
                    <i className="ri-calculator-2-line text-2xl mb-2"></i>
                    <span className="font-medium">Quick Calculator</span>
                    <span className="text-xs text-gray-400">Instant number calculations</span>
                  </Button>
                  <Button variant="secondary" className="p-4 h-auto flex-col">
                    <i className="ri-file-download-line text-2xl mb-2"></i>
                    <span className="font-medium">Generate Report</span>
                    <span className="text-xs text-gray-400">Comprehensive PDF reports</span>
                  </Button>
                  <Button variant="secondary" className="p-4 h-auto flex-col">
                    <i className="ri-calendar-event-line text-2xl mb-2"></i>
                    <span className="font-medium">Book Consultation</span>
                    <span className="text-xs text-gray-400">Expert numerologist session</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
