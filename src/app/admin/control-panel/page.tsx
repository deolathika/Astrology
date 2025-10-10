'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Database, Server, Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import CosmicCard from '@/components/ui/CosmicCard';
import CosmicButton from '@/components/ui/CosmicButton';

const ControlPanel: React.FC = () => {
  const [systemStatus] = useState({
    database: 'healthy',
    api: 'healthy',
    cache: 'warning',
    auth: 'healthy'
  });

  const systemChecks = [
    {
      name: 'Database Connection',
      status: systemStatus.database,
      description: 'SQLite database connectivity',
      icon: Database
    },
    {
      name: 'API Services',
      status: systemStatus.api,
      description: 'REST API endpoints',
      icon: Server
    },
    {
      name: 'Cache System',
      status: systemStatus.cache,
      description: 'Redis cache performance',
      icon: Database
    },
    {
      name: 'Authentication',
      status: systemStatus.auth,
      description: 'NextAuth.js services',
      icon: Shield
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'error': return <AlertTriangle className="w-5 h-5 text-red-400" />;
      default: return <AlertTriangle className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            System Control Panel
          </h1>
          <p className="text-violet-300 text-lg">
            Monitor and manage system health
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* System Status */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <CosmicCard>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Settings className="w-6 h-6 mr-2" />
                  System Status
                </h2>
                <div className="space-y-4">
                  {systemChecks.map((check, index) => (
                    <motion.div
                      key={check.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-violet-800/30 rounded-lg"
                    >
                      <div className="flex items-center">
                        <check.icon className="w-5 h-5 text-violet-400 mr-3" />
                        <div>
                          <div className="text-white font-medium">{check.name}</div>
                          <div className="text-violet-300 text-sm">{check.description}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {getStatusIcon(check.status)}
                        <span className={`ml-2 font-medium ${getStatusColor(check.status)}`}>
                          {check.status}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CosmicCard>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <CosmicCard>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Quick Actions
                </h2>
                <div className="space-y-4">
                  <CosmicButton
                    variant="gradient"
                    size="lg"
                    className="w-full"
                    onClick={() => {
                      // Clear cache functionality
                      // Implementation would go here
                    }}
                  >
                    Clear Cache
                  </CosmicButton>
                  <CosmicButton
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={() => {
                      // Restart services functionality
                      // Implementation would go here
                    }}
                  >
                    Restart Services
                  </CosmicButton>
                  <CosmicButton
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={() => {
                      // Backup database functionality
                      // Implementation would go here
                    }}
                  >
                    Backup Database
                  </CosmicButton>
                  <CosmicButton
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={() => {
                      // Update system functionality
                      // Implementation would go here
                    }}
                  >
                    Update System
                  </CosmicButton>
                </div>
              </div>
            </CosmicCard>
          </motion.div>
        </div>

        {/* System Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <CosmicCard>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-6">
                System Metrics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold-400">2.1s</div>
                  <div className="text-violet-300">Avg Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold-400">45%</div>
                  <div className="text-violet-300">CPU Usage</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold-400">1.2GB</div>
                  <div className="text-violet-300">Memory Usage</div>
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

export default ControlPanel;