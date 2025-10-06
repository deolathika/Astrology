
import { useState } from 'react';
import Navigation from '../../components/feature/Navigation';
import StarfieldBackground from '../../components/feature/StarfieldBackground';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';

export default function Dreams() {
  const [userRole, setUserRole] = useState<'guest' | 'premium' | 'admin'>('guest');
  const [dreamText, setDreamText] = useState('');
  const [dreamAnalysis, setDreamAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const dreamSymbols = [
    { symbol: 'ri-moon-line', name: 'Moon', meaning: 'Intuition, femininity, cycles' },
    { symbol: 'ri-drop-line', name: 'Water', meaning: 'Emotions, subconscious, cleansing' },
    { symbol: 'ri-fire-line', name: 'Fire', meaning: 'Passion, transformation, energy' },
    { symbol: 'ri-flight-takeoff-line', name: 'Butterfly', meaning: 'Transformation, rebirth, soul' },
    { symbol: 'ri-bug-line', name: 'Snake', meaning: 'Wisdom, healing, renewal' },
    { symbol: 'ri-home-line', name: 'House', meaning: 'Self, security, family' },
    { symbol: 'ri-plane-line', name: 'Flying', meaning: 'Freedom, ambition, escape' },
    { symbol: 'ri-tree-line', name: 'Tree', meaning: 'Growth, stability, life force' }
  ];

  const recentDreams = [
    {
      id: 1,
      title: 'Flying Over Mountains',
      date: '2024-01-15',
      symbols: ['ri-plane-line', 'ri-mountain-line', 'ri-cloud-line'],
      mood: 'Liberating'
    },
    {
      id: 2,
      title: 'Ocean Waves',
      date: '2024-01-14',
      symbols: ['ri-drop-line', 'ri-shell-line', 'ri-moon-line'],
      mood: 'Peaceful'
    },
    {
      id: 3,
      title: 'Forest Journey',
      date: '2024-01-13',
      symbols: ['ri-tree-line', 'ri-flight-takeoff-line', 'ri-flower-line'],
      mood: 'Mystical'
    }
  ];

  const analyzeDream = async () => {
    if (!dreamText.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const analysis = {
        mainTheme: 'Transformation and Growth',
        emotionalTone: 'Hopeful with underlying anxiety',
        symbols: [
          { symbol: 'ri-drop-line', meaning: 'Your subconscious emotions are surfacing', significance: 'High' },
          { symbol: 'ri-flight-takeoff-line', meaning: 'You are undergoing a personal transformation', significance: 'Very High' },
          { symbol: 'ri-moon-line', meaning: 'Trust your intuition in current decisions', significance: 'Medium' }
        ],
        interpretation: 'This dream suggests you are in a period of significant personal growth. The recurring water imagery indicates deep emotional processing, while the butterfly symbolizes your readiness for transformation. Your subconscious is encouraging you to embrace change.',
        guidance: 'Focus on meditation and journaling to better understand your inner transformation. Trust the process and be patient with yourself.',
        lucidDreamTips: [
          'Practice reality checks throughout the day',
          'Keep a dream journal by your bedside',
          'Set intention before sleep to become lucid'
        ]
      };
      
      setDreamAnalysis(analysis);
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen relative">
      <StarfieldBackground />
      <Navigation userRole={userRole} />
      
      <div className="relative z-10 pt-20 pb-12">
        {/* Header */}
        <section className="px-4 sm:px-6 lg:px-8 mb-12">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Dream Analysis
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Unlock the hidden messages in your dreams with AI-powered cosmic insights
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

        {/* Dream Input */}
        <section className="px-4 sm:px-6 lg:px-8 mb-12">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">Share Your Dream</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Describe your dream in detail
                </label>
                <textarea
                  value={dreamText}
                  onChange={(e) => setDreamText(e.target.value)}
                  placeholder="I dreamed I was flying over a vast ocean under a full moon..."
                  className="w-full h-32 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  maxLength={500}
                />
                <div className="text-right text-sm text-gray-400 mt-1">
                  {dreamText.length}/500 characters
                </div>
              </div>

              <div className="text-center">
                <Button 
                  variant="cosmic" 
                  size="lg"
                  onClick={analyzeDream}
                  disabled={!dreamText.trim() || isAnalyzing}
                  className="px-8"
                >
                  <i className="ri-magic-line mr-2"></i>
                  {isAnalyzing ? 'Analyzing Dream...' : 'Analyze Dream'}
                </Button>
              </div>
            </Card>
          </div>
        </section>

        {/* Dream Analysis Result */}
        {dreamAnalysis && (
          <section className="px-4 sm:px-6 lg:px-8 mb-12">
            <div className="max-w-6xl mx-auto">
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-white mb-8 text-center">Your Dream Analysis</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Main Analysis */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Main Theme</h3>
                      <p className="text-purple-300 font-medium">{dreamAnalysis.mainTheme}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Emotional Tone</h3>
                      <p className="text-blue-300 font-medium">{dreamAnalysis.emotionalTone}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Interpretation</h3>
                      <p className="text-gray-300 leading-relaxed">{dreamAnalysis.interpretation}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Cosmic Guidance</h3>
                      <p className="text-green-300 leading-relaxed">{dreamAnalysis.guidance}</p>
                    </div>
                  </div>

                  {/* Symbols & Tips */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Dream Symbols</h3>
                      <div className="space-y-3">
                        {dreamAnalysis.symbols.map((item: any, index: number) => (
                          <div key={index} className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                              <i className={`${item.symbol} text-sm text-white`}></i>
                            </div>
                            <div className="flex-1">
                              <p className="text-white font-medium">{item.meaning}</p>
                              <span className={`inline-block px-2 py-1 rounded-full text-xs mt-1 ${
                                item.significance === 'Very High' ? 'bg-red-500/20 text-red-300' :
                                item.significance === 'High' ? 'bg-orange-500/20 text-orange-300' :
                                'bg-yellow-500/20 text-yellow-300'
                              }`}>
                                {item.significance} Significance
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Lucid Dream Tips</h3>
                      <div className="space-y-2">
                        {dreamAnalysis.lucidDreamTips.map((tip: string, index: number) => (
                          <div key={index} className="flex items-center space-x-2">
                            <i className="ri-lightbulb-line text-yellow-400"></i>
                            <span className="text-gray-300 text-sm">{tip}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* Dream Symbols Guide */}
        <section className="px-4 sm:px-6 lg:px-8 mb-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Common Dream Symbols</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {dreamSymbols.map((item, index) => (
                <Card key={index} className="p-4 text-center hover:scale-105">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <i className={`${item.symbol} text-lg text-white`}></i>
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-1">{item.name}</h4>
                  <p className="text-xs text-gray-300">{item.meaning}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Dreams */}
        <section className="px-4 sm:px-6 lg:px-8 mb-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Your Dream Journal</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentDreams.map((dream) => (
                <Card key={dream.id} className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">{dream.title}</h3>
                    <span className="text-sm text-gray-400">{dream.date}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-4">
                    {dream.symbols.map((symbol, index) => (
                      <div key={index} className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                        <i className={`${symbol} text-sm text-white`}></i>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-purple-300">{dream.mood}</span>
                    <Button variant="ghost" size="sm">
                      <i className="ri-eye-line mr-1"></i>
                      View
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Advanced Dream Features */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-moon-line text-3xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Complete Dream Analysis Experience</h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Access detailed AI dream interpretation, lucid dreaming guides, dream pattern analysis, and personalized dream journals
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <i className="ri-brain-line text-2xl text-purple-400 mb-2"></i>
                  <p className="text-white font-medium">AI Deep Analysis</p>
                </div>
                <div className="text-center">
                  <i className="ri-book-open-line text-2xl text-purple-400 mb-2"></i>
                  <p className="text-white font-medium">Dream Journal</p>
                </div>
                <div className="text-center">
                  <i className="ri-lightbulb-line text-2xl text-purple-400 mb-2"></i>
                  <p className="text-white font-medium">Lucid Dream Training</p>
                </div>
              </div>
              <Button variant="cosmic" size="lg" className="px-8">
                <i className="ri-moon-line mr-2"></i>
                Explore All Features
              </Button>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
