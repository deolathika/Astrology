
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../base/Button';

interface NavigationProps {
  userRole?: 'guest' | 'premium' | 'admin';
  onMagicClick?: () => void;
}

export default function Navigation({ userRole = 'guest', onMagicClick }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: 'ri-home-4-line' },
    { path: '/zodiac', label: 'Astrology', icon: 'ri-star-line' },
    { path: '/numerology', label: 'Numerology', icon: 'ri-calculator-line' },
    { path: '/compatibility', label: 'Compatibility', icon: 'ri-heart-line' },
    { path: '/dreams', label: 'Dreams', icon: 'ri-moon-line' },
    { path: '/community', label: 'Community', icon: 'ri-group-line' },
  ];

  const adminItems = [
    { path: '/admin', label: 'Admin', icon: 'ri-settings-3-line' },
  ];

  const profileMenuItems = [
    { path: '/profile', label: 'My Profile', icon: 'ri-user-line' },
    { path: '/profile/settings', label: 'Settings', icon: 'ri-settings-4-line' },
    { path: '/profile/documents', label: 'Documents', icon: 'ri-file-text-line' },
    { path: '/profile/billing', label: 'Billing', icon: 'ri-bank-card-line' },
    { path: '/profile/help', label: 'Help & Support', icon: 'ri-question-line' },
  ];

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      type: 'cosmic',
      title: 'Mercury Retrograde Alert',
      message: 'Mercury enters retrograde today. Be cautious with communication and technology.',
      time: '2 hours ago',
      icon: 'ri-planet-line',
      color: 'from-purple-500 to-pink-500',
      unread: true
    },
    {
      id: 2,
      type: 'daily',
      title: 'Your Daily Reading is Ready',
      message: 'Discover what the stars have aligned for you today.',
      time: '4 hours ago',
      icon: 'ri-star-line',
      color: 'from-blue-500 to-cyan-500',
      unread: true
    },
    {
      id: 3,
      type: 'compatibility',
      title: 'New Compatibility Match',
      message: 'You have a 92% compatibility with Leo rising signs.',
      time: '1 day ago',
      icon: 'ri-heart-line',
      color: 'from-pink-500 to-red-500',
      unread: false
    },
    {
      id: 4,
      type: 'community',
      title: 'Dream Analysis Response',
      message: 'Sarah commented on your dream interpretation request.',
      time: '2 days ago',
      icon: 'ri-chat-3-line',
      color: 'from-green-500 to-emerald-500',
      unread: false
    },
    {
      id: 5,
      type: 'system',
      title: 'Full Moon Approaching',
      message: 'The full moon in Scorpio is approaching. Prepare for intense energy.',
      time: '3 days ago',
      icon: 'ri-moon-line',
      color: 'from-indigo-500 to-purple-500',
      unread: false
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleFavoritesClick = () => {
    // This will be handled by the parent component
    if (onMagicClick) {
      onMagicClick();
    }
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const closeProfileDropdown = () => {
    setIsProfileDropdownOpen(false);
  };

  const handleNotificationClick = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const closeNotifications = () => {
    setIsNotificationOpen(false);
  };

  const markAsRead = (notificationId: number) => {
    // In a real app, this would update the notification status
    console.log('Marking notification as read:', notificationId);
  };

  const markAllAsRead = () => {
    // In a real app, this would mark all notifications as read
    console.log('Marking all notifications as read');
  };

  return (
    <>
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-violet-900/90 via-indigo-900/90 to-purple-900/90 backdrop-blur-lg border-b border-white/10">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                <i className="ri-star-fill text-white text-lg"></i>
              </div>
              <span className="text-xl font-bold text-white" style={{ fontFamily: '"Pacifico", serif' }}>
                Daily Secrets
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'bg-white/20 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <i className={`${item.icon} text-sm`}></i>
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              ))}
              {userRole === 'admin' && adminItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'bg-white/20 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <i className={`${item.icon} text-sm`}></i>
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              ))}
            </div>

            {/* Right Side Controls */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                <i className={`${isDarkMode ? 'ri-sun-line' : 'ri-moon-line'} text-lg`}></i>
              </button>

              {/* Language Switch */}
              <div className="relative">
                <button className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors">
                  <i className="ri-global-line text-lg"></i>
                </button>
              </div>

              {/* Notifications */}
              <div className="relative">
                <button 
                  onClick={handleNotificationClick}
                  className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors relative"
                >
                  <i className="ri-notification-3-line text-lg"></i>
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-medium">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {isNotificationOpen && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-gradient-to-br from-purple-900/95 to-indigo-900/95 backdrop-blur-lg rounded-xl border border-white/20 shadow-2xl max-h-96 overflow-hidden">
                    {/* Header */}
                    <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
                      <h3 className="text-white font-semibold">Cosmic Notifications</h3>
                      <div className="flex items-center space-x-2">
                        {unreadCount > 0 && (
                          <button
                            onClick={markAllAsRead}
                            className="text-xs text-purple-300 hover:text-purple-200 transition-colors"
                          >
                            Mark all read
                          </button>
                        )}
                        <button
                          onClick={closeNotifications}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          <i className="ri-close-line"></i>
                        </button>
                      </div>
                    </div>

                    {/* Notifications List */}
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="px-4 py-8 text-center">
                          <i className="ri-notification-off-line text-4xl text-gray-400 mb-2"></i>
                          <p className="text-gray-400">No notifications yet</p>
                          <p className="text-sm text-gray-500">We'll notify you when something cosmic happens</p>
                        </div>
                      ) : (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`px-4 py-3 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer ${
                              notification.unread ? 'bg-white/5' : ''
                            }`}
                            onClick={() => markAsRead(notification.id)}
                          >
                            <div className="flex items-start space-x-3">
                              <div className={`w-10 h-10 bg-gradient-to-r ${notification.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                                <i className={`${notification.icon} text-white text-sm`}></i>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                  <h4 className={`text-sm font-medium ${notification.unread ? 'text-white' : 'text-gray-300'}`}>
                                    {notification.title}
                                  </h4>
                                  {notification.unread && (
                                    <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                                  )}
                                </div>
                                <p className="text-xs text-gray-400 mb-1 line-clamp-2">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-gray-500">{notification.time}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Footer */}
                    <div className="px-4 py-3 border-t border-white/10 text-center">
                      <button className="text-sm text-purple-300 hover:text-purple-200 transition-colors">
                        <i className="ri-settings-4-line mr-1"></i>
                        Notification Settings
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={handleProfileClick}
                  className="flex items-center space-x-2 p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
                    <i className="ri-user-line text-white text-sm"></i>
                  </div>
                  <span className="hidden sm:block text-sm text-gray-300 capitalize">{userRole}</span>
                  <i className={`ri-arrow-down-s-line text-sm transition-transform duration-200 ${isProfileDropdownOpen ? 'rotate-180' : ''}`}></i>
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-gradient-to-br from-purple-900/95 to-indigo-900/95 backdrop-blur-lg rounded-xl border border-white/20 shadow-2xl py-2">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-white/10">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
                          <i className="ri-user-line text-white"></i>
                        </div>
                        <div>
                          <p className="text-white font-medium">John Doe</p>
                          <p className="text-sm text-gray-400">john.doe@example.com</p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      {profileMenuItems.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={closeProfileDropdown}
                          className={`flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 transition-colors ${
                            location.pathname === item.path ? 'bg-white/10 text-white' : ''
                          }`}
                        >
                          <i className={`${item.icon} text-lg`}></i>
                          <span className="font-medium">{item.label}</span>
                        </Link>
                      ))}
                    </div>

                    {/* Role Switcher */}
                    <div className="px-4 py-3 border-t border-white/10">
                      <p className="text-xs text-gray-400 mb-2">Switch Role</p>
                      <div className="flex space-x-1">
                        {(['guest', 'premium', 'admin'] as const).map((role) => (
                          <button
                            key={role}
                            onClick={() => {
                              // This would typically update user role in parent component
                              closeProfileDropdown();
                            }}
                            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                              userRole === role
                                ? 'bg-purple-500 text-white'
                                : 'bg-white/10 text-gray-300 hover:bg-white/20'
                            }`}
                          >
                            {role.charAt(0).toUpperCase() + role.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Sign Out */}
                    <div className="px-4 py-2 border-t border-white/10">
                      <button className="flex items-center space-x-3 w-full px-0 py-2 text-red-400 hover:text-red-300 transition-colors">
                        <i className="ri-logout-box-line text-lg"></i>
                        <span className="font-medium">Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                <i className={`${isMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-lg`}></i>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/50 backdrop-blur-lg border-t border-white/10">
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'bg-white/20 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <i className={`${item.icon} text-lg`}></i>
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
              {userRole === 'admin' && adminItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'bg-white/20 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <i className={`${item.icon} text-lg`}></i>
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}

              {/* Mobile Profile Menu */}
              <div className="border-t border-white/10 pt-4 mt-4">
                {profileMenuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      location.pathname === item.path
                        ? 'bg-white/20 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <i className={`${item.icon} text-lg`}></i>
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Click outside to close dropdowns */}
        {(isProfileDropdownOpen || isNotificationOpen) && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => {
              closeProfileDropdown();
              closeNotifications();
            }}
          ></div>
        )}
      </nav>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3">
        <Button 
          variant="cosmic" 
          className="rounded-full w-14 h-14 shadow-2xl hover:scale-110 transition-transform duration-300" 
          onClick={onMagicClick}
        >
          <i className="ri-magic-line text-xl"></i>
        </Button>
        <Button 
          variant="primary" 
          className="rounded-full w-12 h-12"
          onClick={handleFavoritesClick}
        >
          <i className="ri-heart-line text-lg"></i>
        </Button>
      </div>
    </>
  );
}
