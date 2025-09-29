'use client'

import { motion } from 'framer-motion'
import { Palette, Hash, Gift, HelpCircle } from 'lucide-react'

interface LuckyTrioCardProps {
  user?: any
}

export function LuckyTrioCard({ user }: LuckyTrioCardProps) {
  const [showExplanation, setShowExplanation] = useState(false)

  const luckyTrio = {
    color: {
      name: 'Cosmic Purple',
      hex: '#7B4FFF',
      meaning: 'Spiritual transformation and higher consciousness'
    },
    number: {
      value: 7,
      meaning: 'Divine wisdom and inner knowing'
    },
    object: {
      name: 'Crystal Sphere',
      meaning: 'Clarity of vision and cosmic connection'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="cosmic-card"
      style={{
        background: 'linear-gradient(135deg, rgba(255, 215, 90, 0.1) 0%, rgba(255, 140, 66, 0.1) 100%)',
        borderColor: 'rgba(255, 215, 90, 0.3)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-supernova-gold/20 rounded-lg">
            <Gift className="w-6 h-6 text-supernova-gold" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-supernova-gold">Lucky Trio</h3>
            <p className="text-sm text-stellar-gray-light">Your cosmic lucky elements for today</p>
          </div>
        </div>
        <button
          onClick={() => setShowExplanation(!showExplanation)}
          className="p-2 bg-cosmic-navy/30 text-stellar-gray-light rounded-lg hover:bg-cosmic-navy/50 transition-colors"
        >
          <HelpCircle className="w-5 h-5" />
        </button>
      </div>

      {/* Lucky Trio Items */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Lucky Color */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-4 bg-cosmic-navy/30 rounded-lg text-center"
        >
          <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ backgroundColor: luckyTrio.color.hex }}>
            <Palette className="w-6 h-6 text-white" />
          </div>
          <h4 className="font-semibold text-starlight-white mb-1">{luckyTrio.color.name}</h4>
          <p className="text-sm text-stellar-gray-light">{luckyTrio.color.hex}</p>
        </motion.div>

        {/* Lucky Number */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-4 bg-cosmic-navy/30 rounded-lg text-center"
        >
          <div className="w-12 h-12 mx-auto mb-3 bg-electric-violet/20 rounded-full flex items-center justify-center">
            <Hash className="w-6 h-6 text-electric-violet" />
          </div>
          <h4 className="font-semibold text-starlight-white mb-1">Number {luckyTrio.number.value}</h4>
          <p className="text-sm text-stellar-gray-light">Divine wisdom</p>
        </motion.div>

        {/* Lucky Object */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-4 bg-cosmic-navy/30 rounded-lg text-center"
        >
          <div className="w-12 h-12 mx-auto mb-3 bg-celestial-blue/20 rounded-full flex items-center justify-center">
            <Gift className="w-6 h-6 text-celestial-blue" />
          </div>
          <h4 className="font-semibold text-starlight-white mb-1">{luckyTrio.object.name}</h4>
          <p className="text-sm text-stellar-gray-light">Cosmic connection</p>
        </motion.div>
      </div>

      {/* Explanation */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-cosmic-navy/20 rounded-lg p-4"
      >
        <h4 className="text-sm font-semibold text-supernova-gold mb-2">Why these elements?</h4>
        <div className="space-y-2 text-sm text-stellar-gray-light">
          <p><span className="text-supernova-gold">Color:</span> {luckyTrio.color.meaning}</p>
          <p><span className="text-electric-violet">Number:</span> {luckyTrio.number.meaning}</p>
          <p><span className="text-celestial-blue">Object:</span> {luckyTrio.object.meaning}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}
