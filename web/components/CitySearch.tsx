'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, MapPin, Clock } from 'lucide-react'
import axios from 'axios'

interface LocationData {
  city: string
  country: string
  latitude: number
  longitude: number
  timezone: string
  placeId: string
}

interface CitySearchProps {
  onLocationSelect: (location: LocationData) => void
}

export default function CitySearch({ onLocationSelect }: CitySearchProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<LocationData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null)
  
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (query.length < 2) {
      setResults([])
      setShowResults(false)
      return
    }

    // Debounce search
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(async () => {
      await searchCities(query)
    }, 300)
  }, [query])

  const searchCities = async (searchQuery: string) => {
    setIsLoading(true)
    try {
      const response = await axios.get('/api/cities', {
        params: { query: searchQuery }
      })
      
      setResults(response.data.data || [])
      setShowResults(true)
    } catch (error) {
      console.error('Error searching cities:', error)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleLocationSelect = (location: LocationData) => {
    setSelectedLocation(location)
    setQuery(`${location.city}, ${location.country}`)
    setShowResults(false)
    onLocationSelect(location)
  }

  const handleInputFocus = () => {
    if (results.length > 0) {
      setShowResults(true)
    }
  }

  const handleInputBlur = () => {
    // Delay hiding results to allow for click events
    setTimeout(() => setShowResults(false), 200)
  }

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          className="cosmic-input pl-10 pr-4"
          placeholder="Search for your birth city..."
        />
        
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showResults && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white/10 backdrop-blur-cosmic border border-electric-violet/20 rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto cosmic-scrollbar"
          >
            {results.map((location, index) => (
              <motion.div
                key={location.placeId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleLocationSelect(location)}
                className="p-4 hover:bg-white/10 cursor-pointer border-b border-white/10 last:border-b-0 transition-colors duration-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-electric-violet/20 rounded-lg flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-electric-violet" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">
                      {location.city}
                    </p>
                    <p className="text-white/60 text-sm truncate">
                      {location.country}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-1 text-white/50 text-xs">
                    <Clock className="w-3 h-3" />
                    <span>{location.timezone}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {selectedLocation && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 p-3 bg-electric-violet/10 border border-electric-violet/20 rounded-lg"
        >
          <div className="flex items-center space-x-2 text-sm">
            <MapPin className="w-4 h-4 text-electric-violet" />
            <span className="text-white/90">
              Selected: {selectedLocation.city}, {selectedLocation.country}
            </span>
            <span className="text-white/60">
              ({selectedLocation.latitude.toFixed(4)}, {selectedLocation.longitude.toFixed(4)})
            </span>
          </div>
        </motion.div>
      )}
    </div>
  )
}
