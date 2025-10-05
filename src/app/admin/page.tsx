'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, BarChart3, Settings, Crown, Star, Calculator, Heart, Moon, MessageCircle } from 'lucide-react';
import CosmicCard from '@/components/ui/CosmicCard';
import CosmicButton from '@/components/ui/CosmicButton';

const AdminDashboard: React.FC = () => {
  const adminFeatures = [
    {
      title: 'User Management',
      description: 'Manage users, roles, and permissions',
      icon: Users,
      href: '/admin/users',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Analytics Dashboard',
      description: 'View usage statistics and insights',
      icon: BarChart3,
      href: '/admin/analytics',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'System Settings',
      description: 'Configure application settings',
      icon: Settings,
      href: '/admin/settings',
      color: 'from-purple-500 to-violet-500'
    },
    {
      title: 'Content Management',
      description: 'Manage astrology and numerology content',
      icon: Star,
      href: '/admin/content',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'Subscription Management',
      description: 'Manage premium subscriptions',
      icon: Crown,
      href: '/admin/subscriptions',
      color: 'from-pink-500 to-rose-500'
    },
    {
      title: 'System Health',
      description: 'Monitor system performance',
      icon: Shield,
      href: '/admin/health',
      color: 'from-red-500 to-pink-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Admin Dashboard
          </h1>
          <p className="text-violet-300 text-lg">
            Manage your Daily Secrets application
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <CosmicCard className="h-full">
                <div className="p-6">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-violet-300 mb-4">
                    {feature.description}
                  </p>
                  <CosmicButton
                    variant="gradient"
                    size="md"
                    className="w-full"
                    onClick={() => window.location.href = feature.href}
                  >
                    Access
                  </CosmicButton>
                </div>
              </CosmicCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12"
        >
          <CosmicCard>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-4">
                Quick Stats
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold-400">1,234</div>
                  <div className="text-violet-300">Total Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold-400">567</div>
                  <div className="text-violet-300">Premium Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold-400">89</div>
                  <div className="text-violet-300">Daily Active</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold-400">99.9%</div>
                  <div className="text-violet-300">Uptime</div>
                </div>
              </div>
            </div>
          </CosmicCard>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;