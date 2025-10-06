
import { useState } from 'react';
import Navigation from '../../components/feature/Navigation';
import StarfieldBackground from '../../components/feature/StarfieldBackground';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';

interface PersonalInfo {
  fullName: string;
  birthday: string;
  birthTime: string;
  zodiacSign: string;
  astrologySystem: string;
}

export default function Profile() {
  const [userRole, setUserRole] = useState<'guest' | 'free' | 'premium' | 'admin'>('free');
  const [activeTab, setActiveTab] = useState('overview');
  const [showPersonalInfoModal, setShowPersonalInfoModal] = useState(false);
  const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);

  // Personal Information State
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: 'John Doe',
    birthday: '1990-03-25',
    birthTime: '14:30',
    zodiacSign: 'Aries',
    astrologySystem: 'western',
  });

  const [tempPersonalInfo, setTempPersonalInfo] = useState<PersonalInfo>(personalInfo);

  const profileData = {
    name: personalInfo.fullName,
    email: 'john.doe@example.com',
    joinDate: '2024-01-15',
    zodiacSign: personalInfo.zodiacSign,
    lifePathNumber: 7,
    totalReadings: 45,
    favoriteSystem: 'Western',
    streak: 12
  };

  const recentActivity = [
    { type: 'reading', title: 'Daily Horoscope - Aries', date: '2024-01-20', icon: 'ri-star-line' },
    { type: 'dream', title: 'Dream Analysis: Flying Over Ocean', date: '2024-01-19', icon: 'ri-moon-line' },
    { type: 'compatibility', title: 'Compatibility Check: Aries & Leo', date: '2024-01-18', icon: 'ri-heart-line' },
    { type: 'numerology', title: 'Life Path Calculation', date: '2024-01-17', icon: 'ri-calculator-line' }
  ];

  const achievements = [
    { title: 'First Reading', description: 'Completed your first cosmic reading', icon: 'ri-star-fill', earned: true },
    { title: 'Dream Explorer', description: 'Analyzed 5 dreams', icon: 'ri-moon-fill', earned: true },
    { title: 'Cosmic Streak', description: '7 days of daily readings', icon: 'ri-fire-fill', earned: true },
    { title: 'Community Member', description: 'Joined the cosmic community', icon: 'ri-group-fill', earned: false },
    { title: 'Premium Explorer', description: 'Upgraded to premium', icon: 'ri-vip-crown-fill', earned: false },
    { title: 'Astrology Master', description: 'Explored all 5 systems', icon: 'ri-compass-3-fill', earned: false }
  ];

  const savedReadings = [
    { title: 'Mercury Retrograde Impact', date: '2024-01-15', type: 'Astrology', favorite: true },
    { title: 'Life Path 7 Deep Dive', date: '2024-01-12', type: 'Numerology', favorite: false },
    { title: 'Dream: Ocean Waves', date: '2024-01-10', type: 'Dreams', favorite: true },
    { title: 'Aries-Leo Compatibility', date: '2024-01-08', type: 'Compatibility', favorite: false }
  ];

  const astrologySystemOptions = [
    { id: 'western', name: 'Western' },
    { id: 'vedic', name: 'Vedic' },
    { id: 'chinese', name: 'Chinese' },
    { id: 'sri-lankan', name: 'Sri Lankan' },
    { id: 'hybrid', name: 'Hybrid AI' },
  ];

  // Calculate zodiac sign based on birthday
  const calculateZodiacSign = (birthday: string): string => {
    try {
      const date = new Date(birthday);
      if (isNaN(date.getTime())) return '';

      const month = date.getMonth() + 1; // 1‑12
      const day = date.getDate();

      // Aries: Mar 21 – Apr 19
      if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
      // Taurus: Apr 20 – May 20
      if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
      // Gemini: May 21 – Jun 20
      if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
      // Cancer: Jun 21 – Jul 22
      if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
      // Leo: Jul 23 – Aug 22
      if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
      // Virgo: Aug 23 – Sep 22
      if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
      // Libra: Sep 23 – Oct 22
      if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
      // Scorpio: Oct 23 – Nov 21
      if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
      // Sagittarius: Nov 22 – Dec 21
      if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
      // Capricorn: Dec 22 – Jan 19
      if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';
      // Aquarius: Jan 20 – Feb 18
      if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
      // Pisces: Feb 19 – Mar 20
      if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return 'Pisces';

      return '';
    } catch {
      return '';
    }
  };

  const handlePersonalInfoEdit = () => {
    setTempPersonalInfo(personalInfo);
    setIsEditingPersonalInfo(true);
    setShowPersonalInfoModal(true);
  };

  const handlePersonalInfoSave = () => {
    // Auto‑calculate zodiac sign if birthday changed
    const calculatedSign = calculateZodiacSign(tempPersonalInfo.birthday);
    const updatedInfo = { ...tempPersonalInfo, zodiacSign: calculatedSign };
    setPersonalInfo(updatedInfo);
    setIsEditingPersonalInfo(false);
    setShowPersonalInfoModal(false);
  };

  const handlePersonalInfoCancel = () => {
    setTempPersonalInfo(personalInfo);
    setIsEditingPersonalInfo(false);
    setShowPersonalInfoModal(false);
  };

  return (
    <div className="min-h-screen relative">
      <StarfieldBackground />
      <Navigation userRole={userRole} />
      
      <div className="relative z-10 pt-20 pb-12">
        {/* Header */}
        <section className="px-4 sm:px-6 lg:px-8 mb-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Your Cosmic Profile
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Track your spiritual journey and cosmic discoveries
              </p>
            </div>

            {/* Profile Header Card */}
            <Card className="p-8 mb-8">
              <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <i className="ri-user-line text-4xl text-white"></i>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{profileData.streak}</span>
                  </div>
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl font-bold text-white mb-2">{profileData.name}</h2>
                  <p className="text-gray-300 mb-4">{profileData.email}</p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    <div className="flex items-center space-x-2">
                      <i className="ri-star-line text-purple-400"></i>
                      <span className="text-gray-300">{profileData.zodiacSign}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <i className="ri-calculator-line text-blue-400"></i>
                      <span className="text-gray-300">Life Path {profileData.lifePathNumber}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <i className="ri-calendar-line text-green-400"></i>
                      <span className="text-gray-300">Since {profileData.joinDate}</span>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-1">{profileData.totalReadings}</div>
                  <p className="text-gray-300 text-sm">Total Readings</p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="px-4 sm:px-6 lg:px-8 mb-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-center space-x-1 bg-white/10 backdrop-blur-sm rounded-full p-1">
              {[
                { id: 'overview', label: 'Overview', icon: 'ri-dashboard-line' },
                { id: 'personal', label: 'Personal Info', icon: 'ri-user-settings-line' },
                { id: 'activity', label: 'Activity', icon: 'ri-history-line' },
                { id: 'achievements', label: 'Achievements', icon: 'ri-trophy-line' },
                { id: 'saved', label: 'Saved', icon: 'ri-bookmark-line' }
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

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <section className="px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-star-line text-xl text-white"></i>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{profileData.totalReadings}</div>
                  <p className="text-gray-300 text-sm">Total Readings</p>
                </Card>

                <Card className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-fire-line text-xl text-white"></i>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{profileData.streak}</div>
                  <p className="text-gray-300 text-sm">Day Streak</p>
                </Card>

                <Card className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-compass-3-line text-xl text-white"></i>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{profileData.favoriteSystem}</div>
                  <p className="text-gray-300 text-sm">Favorite System</p>
                </Card>

                <Card className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-trophy-line text-xl text-white"></i>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">3</div>
                  <p className="text-gray-300 text-sm">Achievements</p>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card className="p-6 mb-8">
                <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button variant="primary" className="w-full">
                    <i className="ri-star-line mr-2"></i>
                    Daily Reading
                  </Button>
                  <Button variant="primary" className="w-full">
                    <i className="ri-moon-line mr-2"></i>
                    Analyze Dream
                  </Button>
                  <Button variant="primary" className="w-full">
                    <i className="ri-calculator-line mr-2"></i>
                    Calculate Numbers
                  </Button>
                  <Button variant="primary" className="w-full">
                    <i className="ri-heart-line mr-2"></i>
                    Check Compatibility
                  </Button>
                </div>
              </Card>

              {/* Cosmic Insights */}
              <Card className="p-6">
                <h3 className="text-xl font-bold text-white mb-6">Your Cosmic Insights</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 bg-purple-500/10 rounded-lg">
                    <i className="ri-lightbulb-line text-2xl text-purple-400 mt-1"></i>
                    <div>
                      <h4 className="text-white font-medium mb-1">Spiritual Growth</h4>
                      <p className="text-gray-300 text-sm">Your Life Path 7 indicates a strong spiritual journey. Continue exploring meditation and inner wisdom.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 bg-blue-500/10 rounded-lg">
                    <i className="ri-compass-3-line text-2xl text-blue-400 mt-1"></i>
                    <div>
                      <h4 className="text-white font-medium mb-1">Astrological Focus</h4>
                      <p className="text-gray-300 text-sm">As an Aries, focus on leadership opportunities and new beginnings this month.</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* Personal Information Tab */}
        {activeTab === 'personal' && (
          <section className="px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">Personal Information</h2>
                  <Button variant="ghost" size="sm" onClick={handlePersonalInfoEdit}>
                    <i className="ri-edit-line mr-2"></i>
                    Edit
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <i className="ri-user-line text-xl text-white"></i>
                    </div>
                    <p className="text-sm text-gray-400 mb-1">Full Name</p>
                    <p className="text-white font-medium">{personalInfo.fullName}</p>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <i className="ri-calendar-line text-xl text-white"></i>
                    </div>
                    <p className="text-sm text-gray-400 mb-1">Birthday</p>
                    <p className="text-white font-medium">
                      {new Date(personalInfo.birthday).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <i className="ri-time-line text-xl text-white"></i>
                    </div>
                    <p className="text-sm text-gray-400 mb-1">Birth Time</p>
                    <p className="text-white font-medium">{personalInfo.birthTime}</p>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <i className="ri-star-line text-xl text-white"></i>
                    </div>
                    <p className="text-sm text-gray-400 mb-1">Zodiac Sign</p>
                    <p className="text-white font-medium">{personalInfo.zodiacSign}</p>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-400 mb-2">Astrology System</p>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {astrologySystemOptions.find((opt) => opt.id === personalInfo.astrologySystem)?.name}
                  </span>
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* Personal Info Edit Modal */}
        {showPersonalInfoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={handlePersonalInfoCancel}></div>
            <div className="relative bg-gradient-to-br from-purple-900/95 to-indigo-900/95 backdrop-blur-lg rounded-2xl border border-white/20 p-8 max-w-md w-full mx-4 shadow-2xl">
              <button
                onClick={handlePersonalInfoCancel}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <i className="ri-close-line text-xl"></i>
              </button>

              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-user-settings-line text-2xl text-white"></i>
                </div>
                <h3 className="text-2xl font-bold text-white">Edit Personal Info</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={tempPersonalInfo.fullName}
                    onChange={(e) => setTempPersonalInfo({...tempPersonalInfo, fullName: e.target.value})}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Birthday</label>
                  <input
                    type="date"
                    value={tempPersonalInfo.birthday}
                    onChange={(e) => setTempPersonalInfo({...tempPersonalInfo, birthday: e.target.value})}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Birth Time</label>
                  <input
                    type="time"
                    value={tempPersonalInfo.birthTime}
                    onChange={(e) => setTempPersonalInfo({...tempPersonalInfo, birthTime: e.target.value})}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Astrology System</label>
                  <select
                    value={tempPersonalInfo.astrologySystem}
                    onChange={(e) => setTempPersonalInfo({...tempPersonalInfo, astrologySystem: e.target.value})}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 pr-8"
                  >
                    {astrologySystemOptions.map((option) => (
                      <option key={option.id} value={option.id} className="bg-gray-800">
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <Button variant="cosmic" className="flex-1" onClick={handlePersonalInfoSave}>
                  <i className="ri-save-line mr-2"></i>
                  Save Changes
                </Button>
                <Button variant="ghost" className="flex-1" onClick={handlePersonalInfoCancel}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <section className="px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Card className="p-6">
                <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <i className={`${activity.icon} text-white`}></i>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-medium">{activity.title}</h4>
                        <p className="text-gray-400 text-sm">{activity.date}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <i className="ri-eye-line mr-1"></i>
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <section className="px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement, index) => (
                  <Card key={index} className={`p-6 text-center ${achievement.earned ? 'border-2 border-yellow-500/50' : 'opacity-60'}`}>
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                      achievement.earned 
                        ? 'bg-gradient-to-r from-yellow-500 to-orange-500' 
                        : 'bg-gray-600'
                    }`}>
                      <i className={`${achievement.icon} text-2xl text-white`}></i>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{achievement.title}</h3>
                    <p className="text-gray-300 text-sm mb-4">{achievement.description}</p>
                    {achievement.earned ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-300">
                        <i className="ri-check-line mr-1"></i>
                        Earned
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-gray-600/20 text-gray-400">
                        <i className="ri-lock-line mr-1"></i>
                        Locked
                      </span>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Saved Tab */}
        {activeTab === 'saved' && (
          <section className="px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Saved Readings</h3>
                  <Button variant="ghost" size="sm">
                    <i className="ri-filter-line mr-2"></i>
                    Filter
                  </Button>
                </div>
                <div className="space-y-4">
                  {savedReadings.map((reading, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="text-white font-medium">{reading.title}</h4>
                          {reading.favorite && (
                            <i className="ri-heart-fill text-red-400 text-sm"></i>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span>{reading.date}</span>
                          <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs">
                            {reading.type}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <i className="ri-share-line"></i>
                        </Button>
                        <Button variant="ghost" size="sm">
                          <i className="ri-eye-line"></i>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}