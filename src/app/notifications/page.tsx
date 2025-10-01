'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, Sparkles, Heart, Users, Settings, Clock, Check, X, ExternalLink, Filter } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface Notification {
  id: string
  type: 'guidance' | 'transit' | 'community' | 'system'
  title: string
  message: string
  timestamp: string
  read: boolean
  actionUrl?: string
  priority: 'low' | 'normal' | 'high'
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [activeTab, setActiveTab] = useState<'all' | 'guidance' | 'transit' | 'community' | 'system'>('all')
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    loadNotifications()
  }, [])

  const loadNotifications = () => {
    // Mock notifications
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'guidance',
        title: "Today's Cosmic Guidance",
        message: "Your daily guidance is ready! The stars align to bring clarity to your path today.",
        timestamp: '2024-01-15T08:00:00Z',
        read: false,
        actionUrl: '/today',
        priority: 'high'
      },
      {
        id: '2',
        type: 'transit',
        title: 'Transit Alert: Venus Square Mars',
        message: 'Venus is forming a square with Mars. This could bring tension in relationships.',
        timestamp: '2024-01-15T06:30:00Z',
        read: false,
        actionUrl: '/transits',
        priority: 'normal'
      },
      {
        id: '3',
        type: 'community',
        title: 'New Message from Alex',
        message: 'Alex sent you a cosmic emoji! 😊',
        timestamp: '2024-01-14T20:15:00Z',
        read: true,
        actionUrl: '/community',
        priority: 'normal'
      },
      {
        id: '4',
        type: 'system',
        title: 'Streak Reminder',
        message: "You've checked in 7 days in a row! Don't break the chain.",
        timestamp: '2024-01-14T19:00:00Z',
        read: true,
        actionUrl: '/home',
        priority: 'low'
      }
    ]

    setNotifications(mockNotifications)
    setUnreadCount(mockNotifications.filter(n => !n.read).length)
  }

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
    setUnreadCount(prev => Math.max(0, prev - 1))
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    )
    setUnreadCount(0)
    toast.success('All notifications marked as read')
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id))
    toast.success('Notification deleted')
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'guidance': return <Sparkles className="w-5 h-5" />
      case 'transit': return <Clock className="w-5 h-5" />
      case 'community': return <Users className="w-5 h-5" />
      case 'system': return <Settings className="w-5 h-5" />
      default: return <Bell className="w-5 h-5" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'guidance': return 'text-violet-500'
      case 'transit': return 'text-orange-500'
      case 'community': return 'text-blue-500'
      case 'system': return 'text-gray-500'
      default: return 'text-gray-500'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'normal': return 'bg-blue-100 text-blue-800'
      case 'low': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredNotifications = notifications.filter(notif => 
    activeTab === 'all' || notif.type === activeTab
  )

  const tabs = [
    { id: 'all', label: 'All', count: notifications.length },
    { id: 'guidance', label: 'Guidance', count: notifications.filter(n => n.type === 'guidance').length },
    { id: 'transit', label: 'Transits', count: notifications.filter(n => n.type === 'transit').length },
    { id: 'community', label: 'Community', count: notifications.filter(n => n.type === 'community').length },
    { id: 'system', label: 'System', count: notifications.filter(n => n.type === 'system').length }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-gray-800 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto py-8"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gradient-primary flex items-center">
              <Bell className="w-8 h-8 mr-3" />
              Notifications
            </h1>
            <p className="text-gray-600 mt-2">Stay updated with your cosmic journey</p>
          </div>
          <div className="flex items-center space-x-4">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="btn btn-secondary flex items-center"
              >
                <Check className="w-4 h-4 mr-2" />
                Mark All Read
              </button>
            )}
            <button className="btn btn-secondary flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-violet-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className="ml-2 px-2 py-1 bg-violet-100 text-violet-600 rounded-full text-xs">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="card p-8 text-center">
              <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
              <p className="text-gray-500">You're all caught up!</p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`card p-4 transition-all ${
                  !notification.read ? 'bg-violet-50 border-l-4 border-violet-500' : ''
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`${getNotificationColor(notification.type)} mt-1`}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {notification.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center space-x-4">
                          <span className="text-xs text-gray-500">
                            {new Date(notification.timestamp).toLocaleString()}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(notification.priority)}`}>
                            {notification.priority}
                          </span>
                          {!notification.read && (
                            <span className="w-2 h-2 bg-violet-500 rounded-full" />
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {notification.actionUrl && (
                          <button
                            onClick={() => {
                              markAsRead(notification.id)
                              window.location.href = notification.actionUrl!
                            }}
                            className="text-violet-600 hover:text-violet-800"
                            title="View"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        )}
                        
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="text-gray-400 hover:text-gray-600"
                            title="Mark as read"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        )}
                        
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="text-gray-400 hover:text-red-600"
                          title="Delete"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Notification Settings */}
        <div className="mt-8 card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Daily Guidance</h4>
                <p className="text-sm text-gray-600">Get your daily cosmic insights</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Transit Alerts</h4>
                <p className="text-sm text-gray-600">Important planetary transits</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Community Updates</h4>
                <p className="text-sm text-gray-600">Messages and connections</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
              </label>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}



