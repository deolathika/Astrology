
import { useState } from 'react';
import Navigation from '../../components/feature/Navigation';
import StarfieldBackground from '../../components/feature/StarfieldBackground';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';

export default function Community() {
  const [userRole, setUserRole] = useState<'guest' | 'premium' | 'admin'>('guest');
  const [activeTab, setActiveTab] = useState('discussions');
  const [showContactModal, setShowContactModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState<any>(null);

  const discussions = [
    {
      id: 1,
      title: 'Mercury Retrograde Effects - Share Your Experiences',
      author: 'CosmicSeeker',
      avatar: 'ri-star-line',
      replies: 23,
      likes: 45,
      time: '2 hours ago',
      category: 'Astrology',
      preview: 'Has anyone else been experiencing communication issues during this Mercury retrograde? I\'ve had so many misunderstandings...'
    },
    {
      id: 2,
      title: 'Life Path Number 7 - Spiritual Journey',
      author: 'NumerologyMaster',
      avatar: 'ri-magic-line',
      replies: 18,
      likes: 32,
      time: '4 hours ago',
      category: 'Numerology',
      preview: 'Fellow 7s, how has your spiritual journey been unfolding? I\'m curious about your experiences with meditation and...'
    },
    {
      id: 3,
      title: 'Recurring Dream About Flying - Need Interpretation',
      author: 'DreamWalker',
      avatar: 'ri-flight-takeoff-line',
      replies: 12,
      likes: 28,
      time: '6 hours ago',
      category: 'Dreams',
      preview: 'I keep having this dream where I\'m flying over my childhood home. The feeling is so vivid and peaceful...'
    },
    {
      id: 4,
      title: 'Scorpio-Pisces Compatibility Success Story',
      author: 'WaterSignLove',
      avatar: 'ri-heart-line',
      replies: 35,
      likes: 67,
      time: '8 hours ago',
      category: 'Compatibility',
      preview: 'Just wanted to share our journey as a Scorpio-Pisces couple. We\'ve been together for 5 years now and...'
    }
  ];

  const events = [
    {
      id: 1,
      title: 'Full Moon Meditation Circle',
      date: '2024-01-20',
      time: '8:00 PM EST',
      participants: 45,
      type: 'Virtual',
      description: 'Join us for a guided meditation under the full moon energy'
    },
    {
      id: 2,
      title: 'Numerology Workshop: Finding Your Purpose',
      date: '2024-01-22',
      time: '7:00 PM EST',
      participants: 28,
      type: 'Virtual',
      description: 'Learn advanced numerology techniques to discover your life purpose'
    },
    {
      id: 3,
      title: 'Dream Sharing Circle',
      date: '2024-01-25',
      time: '9:00 PM EST',
      participants: 32,
      type: 'Virtual',
      description: 'Share and interpret dreams in a supportive community setting'
    }
  ];

  const experts = [
    {
      id: 1,
      name: 'Luna Starweaver',
      specialty: 'Vedic Astrology',
      avatar: 'ri-moon-line',
      rating: 4.9,
      sessions: 1250,
      online: true,
      description: 'Master of Vedic astrology with 15+ years of experience'
    },
    {
      id: 2,
      name: 'Marcus Numeris',
      specialty: 'Numerology',
      avatar: 'ri-calculator-line',
      rating: 4.8,
      sessions: 890,
      online: false,
      description: 'Expert numerologist specializing in life path analysis'
    },
    {
      id: 3,
      name: 'Aria Dreamkeeper',
      specialty: 'Dream Analysis',
      avatar: 'ri-cloud-line',
      rating: 4.9,
      sessions: 675,
      online: true,
      description: 'Certified dream analyst and lucid dreaming instructor'
    }
  ];

  const handleContactExpert = (expert: any) => {
    setSelectedExpert(expert);
    setShowContactModal(true);
  };

  const handleSendMessage = (expert: any) => {
    setSelectedExpert(expert);
    setShowMessageModal(true);
  };

  const handleSubmitMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    try {
      const response = await fetch('https://readdy.ai/api/form/expert_message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData as any).toString()
      });
      
      if (response.ok) {
        alert('Message sent successfully! The expert will respond soon.');
        setShowMessageModal(false);
        form.reset();
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      alert('Error sending message. Please try again.');
    }
  };

  const handleSubmitAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    try {
      const response = await fetch('https://readdy.ai/api/form/expert_appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData as any).toString()
      });
      
      if (response.ok) {
        alert('Appointment request submitted successfully! The expert will contact you soon.');
        setShowContactModal(false);
        form.reset();
      } else {
        alert('Failed to submit appointment request. Please try again.');
      }
    } catch (error) {
      alert('Error submitting appointment request. Please try again.');
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
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Cosmic Community
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Connect with fellow seekers, share experiences, and grow together on your cosmic journey
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

        {/* Community Stats */}
        <section className="px-4 sm:px-6 lg:px-8 mb-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="p-6 text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">12,847</div>
                <p className="text-gray-300">Community Members</p>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">3,256</div>
                <p className="text-gray-300">Active Discussions</p>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">847</div>
                <p className="text-gray-300">Expert Readings</p>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-3xl font-bold text-orange-400 mb-2">156</div>
                <p className="text-gray-300">Live Events</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="px-4 sm:px-6 lg:px-8 mb-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-center space-x-1 bg-white/10 backdrop-blur-sm rounded-full p-1">
              {[
                { id: 'discussions', label: 'Discussions', icon: 'ri-chat-3-line' },
                { id: 'events', label: 'Events', icon: 'ri-calendar-event-line' },
                { id: 'experts', label: 'Experts', icon: 'ri-star-line' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
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

        {/* Discussions Tab */}
        {activeTab === 'discussions' && (
          <section className="px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white">Community Discussions</h2>
                <Button variant="cosmic">
                  <i className="ri-add-line mr-2"></i>
                  Start Discussion
                </Button>
              </div>

              <div className="space-y-4">
                {discussions.map((discussion) => (
                  <Card key={discussion.id} className="p-6 hover:bg-white/15">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-5

00 to-pink-500 rounded-full flex items-center justify-center">
                        <i className={`${discussion.avatar} text-lg text-white`}></i>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-white hover:text-purple-300 cursor-pointer">
                            {discussion.title}
                          </h3>
                          <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                            {discussion.category}
                          </span>
                        </div>
                        
                        <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                          {discussion.preview}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <span>by {discussion.author}</span>
                            <span>{discussion.time}</span>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center space-x-1 text-gray-400">
                              <i className="ri-chat-3-line"></i>
                              <span>{discussion.replies}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-gray-400">
                              <i className="ri-heart-line"></i>
                              <span>{discussion.likes}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <section className="px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white">Upcoming Events</h2>
                <Button variant="cosmic">
                  <i className="ri-calendar-event-line mr-2"></i>
                  Create Event
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                  <Card key={event.id} className="p-6">
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">
                          {event.type}
                        </span>
                        <span className="text-sm text-gray-400">{event.participants} attending</span>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">{event.title}</h3>
                      <p className="text-gray-300 text-sm mb-4">{event.description}</p>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-300">
                        <i className="ri-calendar-line text-purple-400"></i>
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-300">
                        <i className="ri-time-line text-purple-400"></i>
                        <span>{event.time}</span>
                      </div>
                    </div>
                    
                    <Button variant="primary" className="w-full">
                      <i className="ri-calendar-check-line mr-2"></i>
                      Join Event
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Experts Tab */}
        {activeTab === 'experts' && (
          <section className="px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white">Community Experts</h2>
                <Button variant="cosmic">
                  <i className="ri-search-line mr-2"></i>
                  Find Expert
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {experts.map((expert) => (
                  <Card key={expert.id} className="p-6 text-center">
                    <div className="mb-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <i className={`${expert.avatar} text-2xl text-white`}></i>
                      </div>
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold text-white">{expert.name}</h3>
                        <div className={`w-3 h-3 rounded-full ${expert.online ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                      </div>
                      <p className="text-purple-300 font-medium mb-2">{expert.specialty}</p>
                      <p className="text-gray-300 text-sm mb-4">{expert.description}</p>
                    </div>
                    
                    <div className="flex items-center justify-center space-x-4 mb-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <i className="ri-star-fill text-yellow-400"></i>
                        <span className="text-white">{expert.rating}</span>
                      </div>
                      <div className="text-gray-400">
                        {expert.sessions} sessions
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Button 
                        variant="primary" 
                        className="w-full"
                        onClick={() => handleContactExpert(expert)}
                      >
                        <i className="ri-calendar-line mr-2"></i>
                        Book Session
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="w-full"
                        onClick={() => handleSendMessage(expert)}
                      >
                        <i className="ri-chat-3-line mr-2"></i>
                        Send Message
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Premium Community Features */}
        {userRole === 'guest' && (
          <section className="px-4 sm:px-6 lg:px-8 mt-16">
            <div className="max-w-4xl mx-auto">
              <Card className="p-8 text-center border-2 border-gradient-to-r from-gold-400 to-yellow-500">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="ri-group-line text-3xl text-white"></i>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Join Premium Community</h3>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                  Access exclusive expert sessions, private groups, priority event access, and personalized cosmic guidance
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="text-center">
                    <i className="ri-vip-crown-line text-2xl text-purple-400 mb-2"></i>
                    <p className="text-white font-medium">Expert Sessions</p>
                  </div>
                  <div className="text-center">
                    <i className="ri-group-2-line text-2xl text-purple-400 mb-2"></i>
                    <p className="text-white font-medium">Private Groups</p>
                  </div>
                  <div className="text-center">
                    <i className="ri-calendar-event-line text-2xl text-purple-400 mb-2"></i>
                    <p className="text-white font-medium">Priority Access</p>
                  </div>
                </div>
                <Button variant="cosmic" size="lg" className="px-8">
                  <i className="ri-vip-crown-line mr-2"></i>
                  Upgrade to Premium
                </Button>
              </Card>
            </div>
          </section>
        )}

        {/* Send Message Modal */}
        {showMessageModal && selectedExpert && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Send Message</h3>
                  <button
                    onClick={() => setShowMessageModal(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <i className="ri-close-line text-xl"></i>
                  </button>
                </div>

                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <i className={`${selectedExpert.avatar} text-2xl text-white`}></i>
                  </div>
                  <h4 className="text-lg font-semibold text-white">{selectedExpert.name}</h4>
                  <p className="text-purple-300">{selectedExpert.specialty}</p>
                  <div className="flex items-center justify-center space-x-2 mt-2">
                    <div className={`w-2 h-2 rounded-full ${selectedExpert.online ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                    <span className="text-sm text-gray-400">
                      {selectedExpert.online ? 'Online now' : 'Offline'}
                    </span>
                  </div>
                </div>

                <form id="expert-message-form" data-readdy-form onSubmit={handleSubmitMessage} className="space-y-4">
                  <input type="hidden" name="expert_name" value={selectedExpert.name} />
                  <input type="hidden" name="expert_specialty" value={selectedExpert.specialty} />
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Your Name *</label>
                    <input
                      type="text"
                      name="sender_name"
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="sender_email"
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Subject *</label>
                    <input
                      type="text"
                      name="message_subject"
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                      placeholder="What's this message about?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Message *</label>
                    <textarea
                      name="message_content"
                      rows={5}
                      required
                      maxLength={500}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none text-sm"
                      placeholder="Write your message to the expert..."
                    ></textarea>
                    <p className="text-xs text-gray-400 mt-1">Maximum 500 characters</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Message Priority</label>
                    <select
                      name="message_priority"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm pr-8"
                    >
                      <option value="normal" className="bg-gray-800">Normal</option>
                      <option value="urgent" className="bg-gray-800">Urgent</option>
                      <option value="low" className="bg-gray-800">Low Priority</option>
                    </select>
                  </div>

                  <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-xl p-4">
                    <div className="flex items-start space-x-3">
                      <i className="ri-information-line text-blue-400 text-lg mt-0.5"></i>
                      <div>
                        <p className="text-sm text-blue-200 font-medium mb-1">Response Time</p>
                        <p className="text-xs text-blue-300">
                          {selectedExpert.online 
                            ? 'Typically responds within 1-2 hours when online'
                            : 'Typically responds within 24 hours'
                          }
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <Button
                      type="button"
                      variant="ghost"
                      className="flex-1"
                      onClick={() => setShowMessageModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" variant="cosmic" className="flex-1">
                      <i className="ri-send-plane-line mr-2"></i>
                      Send Message
                    </Button>
                  </div>
                </form>
              </div>
            </Card>
          </div>
        )}

        {/* Contact Expert Modal */}
        {showContactModal && selectedExpert && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Book Session</h3>
                  <button
                    onClick={() => setShowContactModal(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <i className="ri-close-line text-xl"></i>
                  </button>
                </div>

                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <i className={`${selectedExpert.avatar} text-2xl text-white`}></i>
                  </div>
                  <h4 className="text-lg font-semibold text-white">{selectedExpert.name}</h4>
                  <p className="text-purple-300">{selectedExpert.specialty}</p>
                </div>

                <form id="expert-appointment-form" data-readdy-form onSubmit={handleSubmitAppointment} className="space-y-4">
                  <input type="hidden" name="expert_name" value={selectedExpert.name} />
                  <input type="hidden" name="expert_specialty" value={selectedExpert.specialty} />
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Your Name *</label>
                    <input
                      type="text"
                      name="client_name"
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="client_email"
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="client_phone"
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Date *</label>
                    <input
                      type="date"
                      name="preferred_date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm pr-8"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Time *</label>
                    <select
                      name="preferred_time"
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm pr-8"
                    >
                      <option value="" className="bg-gray-800">Select time</option>
                      <option value="09:00" className="bg-gray-800">9:00 AM</option>
                      <option value="10:00" className="bg-gray-800">10:00 AM</option>
                      <option value="11:00" className="bg-gray-800">11:00 AM</option>
                      <option value="12:00" className="bg-gray-800">12:00 PM</option>
                      <option value="13:00" className="bg-gray-800">1:00 PM</option>
                      <option value="14:00" className="bg-gray-800">2:00 PM</option>
                      <option value="15:00" className="bg-gray-800">3:00 PM</option>
                      <option value="16:00" className="bg-gray-800">4:00 PM</option>
                      <option value="17:00" className="bg-gray-800">5:00 PM</option>
                      <option value="18:00" className="bg-gray-800">6:00 PM</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Session Type *</label>
                    <select
                      name="session_type"
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm pr-8"
                    >
                      <option value="" className="bg-gray-800">Select session type</option>
                      <option value="30min" className="bg-gray-800">30 minutes - $75</option>
                      <option value="60min" className="bg-gray-800">60 minutes - $125</option>
                      <option value="90min" className="bg-gray-800">90 minutes - $175</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">What would you like to discuss?</label>
                    <textarea
                      name="session_topic"
                      rows={3}
                      maxLength={500}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none text-sm"
                      placeholder="Briefly describe what you'd like to explore in your session..."
                    ></textarea>
                    <p className="text-xs text-gray-400 mt-1">Maximum 500 characters</p>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <Button
                      type="button"
                      variant="ghost"
                      className="flex-1"
                      onClick={() => setShowContactModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" variant="cosmic" className="flex-1">
                      <i className="ri-calendar-check-line mr-2"></i>
                      Book Session
                    </Button>
                  </div>
                </form>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
