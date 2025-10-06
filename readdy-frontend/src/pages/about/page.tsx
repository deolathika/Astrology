import Navigation from '../../components/feature/Navigation';
import CosmicBackground from '../../components/ui/CosmicBackground';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';

export default function About() {
  const team = [
    {
      name: 'Dr. Celestia Nova',
      role: 'Founder & Chief Astrologer',
      image: 'https://readdy.ai/api/search-image?query=professional%20female%20founder%20with%20cosmic%20background%2C%20confident%20wise%20expression%2C%20elegant%20business%20attire%2C%20warm%20lighting%2C%20leadership%20portrait%20photography&width=400&height=400&seq=founder&orientation=squarish',
      bio: 'With over 20 years of experience in astrology and spiritual guidance, Dr. Nova founded Daily Secrets to make cosmic wisdom accessible to everyone.',
      specialties: ['Vedic Astrology', 'Spiritual Leadership', 'AI Integration']
    },
    {
      name: 'Marcus Chen',
      role: 'Head of Technology',
      image: 'https://readdy.ai/api/search-image?query=professional%20male%20tech%20leader%20with%20modern%20background%2C%20innovative%20expression%2C%20smart%20casual%20attire%2C%20natural%20lighting%2C%20technology%20portrait&width=400&height=400&seq=tech-lead&orientation=squarish',
      bio: 'Former Google engineer who combines cutting-edge AI with ancient wisdom to create revolutionary cosmic insights.',
      specialties: ['AI Development', 'Data Science', 'User Experience']
    },
    {
      name: 'Luna Starweaver',
      role: 'Community Director',
      image: 'https://readdy.ai/api/search-image?query=friendly%20female%20community%20manager%20with%20warm%20expression%2C%20approachable%20smile%2C%20creative%20background%2C%20soft%20lighting%2C%20community%20portrait&width=400&height=400&seq=community&orientation=squarish',
      bio: 'Passionate about building connections and fostering growth within our cosmic community of seekers and practitioners.',
      specialties: ['Community Building', 'Content Strategy', 'User Engagement']
    }
  ];

  const values = [
    {
      icon: 'ri-heart-line',
      title: 'Authenticity',
      description: 'We honor ancient wisdom while embracing modern innovation, staying true to both tradition and progress.',
      color: 'from-pink-500 to-red-500'
    },
    {
      icon: 'ri-shield-check-line',
      title: 'Privacy',
      description: 'Your cosmic journey is personal. We protect your data with the highest security standards.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: 'ri-lightbulb-line',
      title: 'Innovation',
      description: 'We continuously evolve our platform with cutting-edge AI while respecting timeless spiritual principles.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: 'ri-group-line',
      title: 'Community',
      description: 'We believe in the power of shared wisdom and support each other on our cosmic journeys.',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const milestones = [
    {
      year: '2020',
      title: 'The Vision',
      description: 'Daily Secrets was born from a vision to democratize cosmic wisdom and make it accessible to everyone.'
    },
    {
      year: '2021',
      title: 'AI Integration',
      description: 'We became the first platform to successfully integrate AI with traditional astrological practices.'
    },
    {
      year: '2022',
      title: 'Global Expansion',
      description: 'Launched support for multiple astrological systems including Vedic, Chinese, and Sri Lankan traditions.'
    },
    {
      year: '2023',
      title: 'Expert Network',
      description: 'Built a network of certified experts from around the world to provide personalized guidance.'
    },
    {
      year: '2024',
      title: 'Community Growth',
      description: 'Reached 50,000+ active members and launched advanced community features.'
    }
  ];

  return (
    <div className="min-h-screen relative">
      <CosmicBackground />
      <Navigation userRole="guest" />
      
      <div className="relative z-10 pt-20 pb-12">
        {/* Hero Section */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                About Daily Secrets
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              We're on a mission to bridge ancient cosmic wisdom with modern technology, 
              making spiritual insights accessible to seekers worldwide.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
          </div>
        </section>

        {/* Our Story */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    Daily Secrets began as a personal journey of discovery. Our founder, Dr. Celestia Nova, 
                    spent decades studying various astrological traditions around the world, from the ancient 
                    temples of India to the mystical practices of Sri Lanka.
                  </p>
                  <p>
                    She realized that while cosmic wisdom had the power to transform lives, it remained 
                    inaccessible to many due to complexity, cost, and cultural barriers. This sparked the 
                    vision for Daily Secrets - a platform that would democratize spiritual insights.
                  </p>
                  <p>
                    Today, we combine the authenticity of traditional practices with the precision of 
                    modern AI, creating a unique experience that honors the past while embracing the future.
                  </p>
                </div>
              </div>
              <div>
                <Card className="p-8 text-center">
                  <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className="ri-star-fill text-4xl text-white"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                  <p className="text-gray-300 leading-relaxed">
                    To empower individuals on their spiritual journey by providing accurate, 
                    accessible, and personalized cosmic insights that inspire growth, 
                    self-discovery, and meaningful connections.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Our Values</h2>
              <p className="text-gray-300 text-lg">The principles that guide everything we do</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="p-6 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <i className={`${value.icon} text-2xl text-white`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{value.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Meet Our Team</h2>
              <p className="text-gray-300 text-lg">The passionate individuals behind Daily Secrets</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="p-6 text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-purple-400/30">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-purple-300 mb-4">{member.role}</p>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">{member.bio}</p>
                  
                  <div className="flex flex-wrap justify-center gap-2">
                    {member.specialties.map((specialty, i) => (
                      <span key={i} className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Our Journey */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Our Journey</h2>
              <p className="text-gray-300 text-lg">Key milestones in our cosmic evolution</p>
            </div>

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">{milestone.year}</span>
                    </div>
                  </div>
                  <Card className="flex-1 p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{milestone.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{milestone.description}</p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-6xl mx-auto">
            <Card className="p-12 bg-gradient-to-br from-purple-600/20 to-pink-600/20">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">Our Impact</h2>
                <p className="text-gray-300 text-lg">Numbers that reflect our growing cosmic community</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">50K+</div>
                  <div className="text-gray-300">Active Members</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">1M+</div>
                  <div className="text-gray-300">Readings Generated</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">25+</div>
                  <div className="text-gray-300">Expert Astrologers</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">150+</div>
                  <div className="text-gray-300">Countries Served</div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Technology */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Technology Meets Tradition</h2>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    We believe that technology should enhance, not replace, traditional wisdom. 
                    Our AI systems are trained on thousands of years of astrological knowledge, 
                    validated by certified experts from various traditions.
                  </p>
                  <p>
                    Every reading combines algorithmic precision with human insight, ensuring 
                    accuracy while maintaining the personal touch that makes cosmic guidance meaningful.
                  </p>
                  <p>
                    Our platform supports multiple astrological systems, recognizing that different 
                    cultures have developed unique and valuable approaches to understanding cosmic influences.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-6 text-center">
                  <i className="ri-brain-line text-3xl text-purple-400 mb-3"></i>
                  <h3 className="text-lg font-bold text-white mb-2">AI-Powered</h3>
                  <p className="text-gray-300 text-sm">Advanced algorithms trained on cosmic patterns</p>
                </Card>
                <Card className="p-6 text-center">
                  <i className="ri-user-heart-line text-3xl text-pink-400 mb-3"></i>
                  <h3 className="text-lg font-bold text-white mb-2">Expert Validated</h3>
                  <p className="text-gray-300 text-sm">Reviewed by certified astrologers</p>
                </Card>
                <Card className="p-6 text-center">
                  <i className="ri-global-line text-3xl text-blue-400 mb-3"></i>
                  <h3 className="text-lg font-bold text-white mb-2">Multi-Cultural</h3>
                  <p className="text-gray-300 text-sm">Supporting diverse astrological traditions</p>
                </Card>
                <Card className="p-6 text-center">
                  <i className="ri-shield-check-line text-3xl text-green-400 mb-3"></i>
                  <h3 className="text-lg font-bold text-white mb-2">Secure & Private</h3>
                  <p className="text-gray-300 text-sm">Your cosmic data is protected</p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Join Us */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="p-12 bg-gradient-to-br from-purple-600/20 to-pink-600/20">
              <h2 className="text-4xl font-bold text-white mb-6">
                Join Our Cosmic Community
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Whether you're just beginning your spiritual journey or you're a seasoned seeker, 
                Daily Secrets welcomes you to explore the mysteries of the cosmos with us.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Button variant="cosmic" size="lg" className="px-12">
                  <i className="ri-rocket-line mr-3"></i>
                  Start Your Journey
                </Button>
                <Button variant="ghost" size="lg" className="px-8">
                  <i className="ri-mail-line mr-2"></i>
                  Contact Us
                </Button>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}