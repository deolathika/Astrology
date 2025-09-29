'use client'

import { motion } from 'framer-motion'
interface DayRulesCardProps {
  user?: any
}

export function DayRulesCard({ user }: DayRulesCardProps) {
  const dayRules = {
    do: [
      'Trust your intuition and follow your inner guidance',
      'Take time for meditation and spiritual reflection',
      'Express gratitude for the cosmic blessings in your life',
      'Connect with nature and the natural rhythms of the earth'
    ],
    dont: [
      'Make hasty decisions without consulting your higher self',
      'Ignore the subtle signs and synchronicities around you',
      'Dismiss the wisdom of your dreams and inner visions',
      'Rush through important conversations or connections'
    ]
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="cosmic-card"
      style={{
        background: 'linear-gradient(135deg, rgba(255, 71, 87, 0.1) 0%, rgba(255, 140, 66, 0.1) 100%)',
        borderColor: 'rgba(255, 71, 87, 0.3)',
      }}
    >
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-nebula-red/20 rounded-lg">
          <Lightbulb className="w-6 h-6 text-nebula-red" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-nebula-red">Day Rules</h3>
          <p className="text-sm text-stellar-gray-light">Cosmic guidance for today's actions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Do's */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <CheckCircle className="w-5 h-5 text-celestial-blue" />
            <h4 className="text-lg font-semibold text-celestial-blue">Do</h4>
          </div>
          <div className="space-y-3">
            {dayRules.do.map((rule, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-3 p-3 bg-celestial-blue/10 rounded-lg"
              >
                <div className="w-2 h-2 bg-celestial-blue rounded-full mt-2 flex-shrink-0" />
                <p className="text-sm text-starlight-white">{rule}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Don'ts */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <XCircle className="w-5 h-5 text-nebula-red" />
            <h4 className="text-lg font-semibold text-nebula-red">Don't</h4>
          </div>
          <div className="space-y-3">
            {dayRules.dont.map((rule, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-3 p-3 bg-nebula-red/10 rounded-lg"
              >
                <div className="w-2 h-2 bg-nebula-red rounded-full mt-2 flex-shrink-0" />
                <p className="text-sm text-starlight-white">{rule}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Cosmic Tip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 p-4 bg-supernova-gold/10 rounded-lg border border-supernova-gold/20"
      >
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-supernova-gold mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-semibold text-supernova-gold mb-1">Cosmic Tip</h4>
            <p className="text-sm text-stellar-gray-light">
              These rules are based on today's planetary alignments and your personal numerology. 
              Following them will help you align with the cosmic flow and maximize your potential.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
