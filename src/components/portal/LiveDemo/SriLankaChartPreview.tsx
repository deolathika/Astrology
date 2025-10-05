/**
 * Sri Lanka Chart Preview Component
 * SVG Sri Lankan astrology chart demo
 */

'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Calendar, Star, AlertCircle } from 'lucide-react'

// Sample Sri Lankan chart data for demo
const sampleChartData = {
  houses: [
    { number: 1, sign: 'Aries', degree: 0, cusp: 'Ascendant' },
    { number: 2, sign: 'Taurus', degree: 30, cusp: '2nd House' },
    { number: 3, sign: 'Gemini', degree: 60, cusp: '3rd House' },
    { number: 4, sign: 'Cancer', degree: 90, cusp: 'IC' },
    { number: 5, sign: 'Leo', degree: 120, cusp: '5th House' },
    { number: 6, sign: 'Virgo', degree: 150, cusp: '6th House' },
    { number: 7, sign: 'Libra', degree: 180, cusp: 'Descendant' },
    { number: 8, sign: 'Scorpio', degree: 210, cusp: '8th House' },
    { number: 9, sign: 'Sagittarius', degree: 240, cusp: '9th House' },
    { number: 10, sign: 'Capricorn', degree: 270, cusp: 'MC' },
    { number: 11, sign: 'Aquarius', degree: 300, cusp: '11th House' },
    { number: 12, sign: 'Pisces', degree: 330, cusp: '12th House' }
  ],
  planets: [
    { name: 'Sun', sign: 'Leo', degree: 15.5, house: 5 },
    { name: 'Moon', sign: 'Cancer', degree: 8.2, house: 4 },
    { name: 'Mercury', sign: 'Virgo', degree: 3.7, house: 6 },
    { name: 'Venus', sign: 'Libra', degree: 12.1, house: 7 },
    { name: 'Mars', sign: 'Aries', degree: 22.1, house: 1 },
    { name: 'Jupiter', sign: 'Sagittarius', degree: 18.9, house: 9 },
    { name: 'Saturn', sign: 'Capricorn', degree: 7.3, house: 10 }
  ]
}

const SriLankanChartSVG = () => {
  const centerX = 150
  const centerY = 150
  const radius = 120

  return (
    <svg width="300" height="300" viewBox="0 0 300 300" className="mx-auto">
      {/* Outer Circle */}
      <circle
        cx={centerX}
        cy={centerY}
        r={radius}
        fill="none"
        stroke="#6D28D9"
        strokeWidth="2"
      />
      
      {/* Inner Circle */}
      <circle
        cx={centerX}
        cy={centerY}
        r={radius - 20}
        fill="none"
        stroke="#E5E7EB"
        strokeWidth="1"
      />
      
      {/* House Lines */}
      {sampleChartData.houses.map((house, index) => {
        const angle = (index * 30) * (Math.PI / 180)
        const x1 = centerX + Math.cos(angle) * (radius - 20)
        const y1 = centerY + Math.sin(angle) * (radius - 20)
        const x2 = centerX + Math.cos(angle) * radius
        const y2 = centerY + Math.sin(angle) * radius
        
        return (
          <line
            key={house.number}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#6D28D9"
            strokeWidth="1"
          />
        )
      })}
      
      {/* House Numbers */}
      {sampleChartData.houses.map((house, index) => {
        const angle = (index * 30 + 15) * (Math.PI / 180)
        const x = centerX + Math.cos(angle) * (radius - 40)
        const y = centerY + Math.sin(angle) * (radius - 40)
        
        return (
          <text
            key={house.number}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-xs font-medium fill-gray-700"
          >
            {house.number}
          </text>
        )
      })}
      
      {/* Planets */}
      {sampleChartData.planets.map((planet, index) => {
        const angle = (planet.degree) * (Math.PI / 180)
        const x = centerX + Math.cos(angle) * (radius - 60)
        const y = centerY + Math.sin(angle) * (radius - 60)
        
        return (
          <g key={planet.name}>
            <circle
              cx={x}
              cy={y}
              r="4"
              fill="#F59E0B"
              stroke="#FFFFFF"
              strokeWidth="1"
            />
            <text
              x={x}
              y={y + 15}
              textAnchor="middle"
              className="text-xs font-medium fill-gray-700"
            >
              {planet.name}
            </text>
          </g>
        )
      })}
      
      {/* Center Point */}
      <circle
        cx={centerX}
        cy={centerY}
        r="3"
        fill="#6D28D9"
      />
    </svg>
  )
}

export function SriLankaChartPreview() {
  const [birthDate, setBirthDate] = useState('')
  const [birthTime, setBirthTime] = useState('')
  const [birthPlace, setBirthPlace] = useState('')
  const [isCalculating, setIsCalculating] = useState(false)
  const [chartData, setChartData] = useState<any>(null)

  const handleCalculate = async () => {
    if (!birthDate || !birthPlace) return

    setIsCalculating(true)
    
    // Simulate calculation delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    try {
      // For demo purposes, use sample data
      setChartData(sampleChartData)
    } catch (error) {
      console.error('Error calculating Sri Lankan chart:', error)
    } finally {
      setIsCalculating(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-sm font-medium text-gray-700">
          <MapPin className="w-4 h-4" />
          <span>Enter your birth details</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Birth Date</label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-colors"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Birth Time</label>
            <input
              type="time"
              value={birthTime}
              onChange={(e) => setBirthTime(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-colors"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Birth Place</label>
            <input
              type="text"
              value={birthPlace}
              onChange={(e) => setBirthPlace(e.target.value)}
              placeholder="City, Country"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-colors"
            />
          </div>
        </div>
        
        <button
          onClick={handleCalculate}
          disabled={!birthDate || !birthPlace || isCalculating}
          className="w-full portal-btn portal-btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isCalculating ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Calculating Chart...</span>
            </div>
          ) : (
            'Generate Sri Lankan Chart'
          )}
        </button>
      </div>

      {/* Result Section */}
      {chartData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="portal-card p-6"
        >
          <div className="text-center">
            {/* Chart SVG */}
            <div className="mb-6">
              <SriLankanChartSVG />
            </div>

            {/* Chart Info */}
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Star className="w-5 h-5 text-violet-600" />
                <span className="text-lg font-semibold text-gray-900">Sri Lankan Birth Chart</span>
              </div>

              {/* House Information */}
              <div className="bg-gradient-to-r from-violet-50 to-sky-50 rounded-lg p-4 mb-4">
                <h4 className="text-sm font-medium text-violet-700 mb-3">House System</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-gray-600">
                  {chartData.houses.slice(0, 8).map((house: any) => (
                    <div key={house.number} className="text-center">
                      <div className="font-medium">{house.number}H</div>
                      <div>{house.sign}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Planet Information */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-4 mb-4">
                <h4 className="text-sm font-medium text-amber-700 mb-3">Planetary Positions</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-gray-600">
                  {chartData.planets.slice(0, 6).map((planet: any) => (
                    <div key={planet.name} className="text-center">
                      <div className="font-medium">{planet.name}</div>
                      <div>{planet.sign}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cultural Context */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-emerald-700 mb-2">Sri Lankan Astrology</h4>
                <p className="text-xs text-gray-600">
                  Traditional Sri Lankan astrology combines Vedic principles with local cultural 
                  interpretations, offering unique insights into personality and life path.
                </p>
              </div>
            </div>

            {/* Demo Notice */}
            <div className="mt-4 text-xs text-gray-500 bg-amber-50 border border-amber-200 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-3 h-3 text-amber-600" />
                <span className="font-medium text-amber-800">Demo Mode</span>
              </div>
              <p className="mt-1 text-amber-700">
                This is a preview. Get detailed Sri Lankan chart analysis, cultural interpretations, 
                and personalized insights in the full app.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Instructions */}
      {!chartData && (
        <div className="text-center text-sm text-gray-500">
          <p>Enter your birth details above to generate a Sri Lankan astrology chart.</p>
        </div>
      )}
    </div>
  )
}
