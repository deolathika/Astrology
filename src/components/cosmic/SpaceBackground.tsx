'use client'

import React, { useEffect, useRef } from 'react'

const SpaceBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current

    // Create star field
    const createStars = () => {
      const starCount = 200
      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div')
        star.className = 'cosmic-star'
        star.style.left = Math.random() * 100 + '%'
        star.style.top = Math.random() * 100 + '%'
        star.style.width = Math.random() * 3 + 1 + 'px'
        star.style.height = star.style.width
        star.style.backgroundColor = [
          'var(--star-blue)',
          'var(--star-white)',
          'var(--star-yellow)',
          'var(--star-red)',
          'var(--star-purple)'
        ][Math.floor(Math.random() * 5)]
        star.style.animationDelay = Math.random() * 8 + 's'
        star.style.animationDuration = (Math.random() * 8 + 6) + 's'
        container.appendChild(star)
      }
    }

    // Create planets
    const createPlanets = () => {
      const planets = [
        { name: 'mercury', size: 8, distance: 15, color: 'var(--planet-mercury)' },
        { name: 'venus', size: 12, distance: 25, color: 'var(--planet-venus)' },
        { name: 'earth', size: 14, distance: 35, color: 'var(--planet-earth)' },
        { name: 'mars', size: 10, distance: 45, color: 'var(--planet-mars)' },
        { name: 'jupiter', size: 20, distance: 60, color: 'var(--planet-jupiter)' },
        { name: 'saturn', size: 18, distance: 75, color: 'var(--planet-saturn)' }
      ]

      planets.forEach((planet, index) => {
        // Create orbit
        const orbit = document.createElement('div')
        orbit.className = 'cosmic-planet-orbit'
        orbit.style.width = planet.distance * 2 + 'px'
        orbit.style.height = planet.distance * 2 + 'px'
        orbit.style.left = '50%'
        orbit.style.top = '50%'
        orbit.style.marginLeft = -planet.distance + 'px'
        orbit.style.marginTop = -planet.distance + 'px'
        orbit.style.animationDelay = index * 2 + 's'
        container.appendChild(orbit)

        // Create planet
        const planetElement = document.createElement('div')
        planetElement.className = `cosmic-planet cosmic-planet-${planet.name}`
        planetElement.style.width = planet.size + 'px'
        planetElement.style.height = planet.size + 'px'
        planetElement.style.left = planet.distance + 'px'
        planetElement.style.top = '50%'
        planetElement.style.marginTop = -planet.size / 2 + 'px'
        planetElement.style.animationDelay = index * 3 + 's'
        orbit.appendChild(planetElement)
      })
    }

    // Create zodiac signs
    const createZodiacSigns = () => {
      const zodiacSigns = [
        'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
        'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
      ]

      const zodiacRing = document.createElement('div')
      zodiacRing.className = 'cosmic-zodiac-ring'
      zodiacRing.style.width = '300px'
      zodiacRing.style.height = '300px'
      zodiacRing.style.left = '50%'
      zodiacRing.style.top = '50%'
      zodiacRing.style.marginLeft = '-150px'
      zodiacRing.style.marginTop = '-150px'
      container.appendChild(zodiacRing)

      zodiacSigns.forEach((sign, index) => {
        const signElement = document.createElement('div')
        signElement.className = `cosmic-zodiac-sign cosmic-zodiac-${sign}`
        signElement.style.left = '50%'
        signElement.style.top = '50%'
        signElement.style.marginLeft = '-10px'
        signElement.style.marginTop = '-10px'
        signElement.style.transform = `rotate(${index * 30}deg) translateX(150px)`
        signElement.style.animationDelay = index * 1.5 + 's'
        zodiacRing.appendChild(signElement)
      })
    }

    // Create nebula
    const createNebula = () => {
      for (let i = 0; i < 3; i++) {
        const nebula = document.createElement('div')
        nebula.className = 'cosmic-nebula'
        nebula.style.width = Math.random() * 200 + 100 + 'px'
        nebula.style.height = nebula.style.width
        nebula.style.left = Math.random() * 80 + 10 + '%'
        nebula.style.top = Math.random() * 80 + 10 + '%'
        nebula.style.animationDelay = i * 60 + 's'
        container.appendChild(nebula)
      }
    }

    // Create cosmic dust
    const createDust = () => {
      for (let i = 0; i < 50; i++) {
        const dust = document.createElement('div')
        dust.className = 'cosmic-dust'
        dust.style.left = Math.random() * 100 + '%'
        dust.style.top = '100%'
        dust.style.animationDelay = Math.random() * 40 + 's'
        dust.style.animationDuration = (Math.random() * 40 + 40) + 's'
        container.appendChild(dust)
      }
    }

    // Create cosmic sweep
    const createSweep = () => {
      const sweep = document.createElement('div')
      sweep.className = 'cosmic-sweep'
      sweep.style.top = Math.random() * 80 + 10 + '%'
      sweep.style.animationDelay = Math.random() * 30 + 's'
      container.appendChild(sweep)
    }

    // Initialize all elements
    createStars()
    createPlanets()
    createZodiacSigns()
    createNebula()
    createDust()
    createSweep()

    // Cleanup function
    return () => {
      if (container) {
        container.innerHTML = ''
      }
    }
  }, [])

  return (
    <div className="cosmic-space-bg" ref={containerRef}>
      {/* Base space background is handled by CSS */}
    </div>
  )
}

export default SpaceBackground

