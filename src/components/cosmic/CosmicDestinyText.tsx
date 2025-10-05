'use client'

import React, { useEffect, useRef } from 'react'

interface CosmicDestinyTextProps {
  children: React.ReactNode
  className?: string
}

const CosmicDestinyText: React.FC<CosmicDestinyTextProps> = ({ children, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const starsRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !starsRef.current || !particlesRef.current) return

    // Create floating stars
    const createStars = () => {
      const starCount = 6
      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div')
        star.className = 'cosmic-destiny-star'
        starsRef.current?.appendChild(star)
      }
    }

    // Create floating particles
    const createParticles = () => {
      const particleCount = 8
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div')
        particle.className = 'cosmic-destiny-particle'
        particle.style.left = Math.random() * 100 + '%'
        particle.style.top = Math.random() * 100 + '%'
        particle.style.animationDelay = Math.random() * 25 + 's'
        particlesRef.current?.appendChild(particle)
      }
    }

    // Initialize effects
    createStars()
    createParticles()

    // Cleanup function
    return () => {
      if (starsRef.current) {
        starsRef.current.innerHTML = ''
      }
      if (particlesRef.current) {
        particlesRef.current.innerHTML = ''
      }
    }
  }, [])

  return (
    <div className={`cosmic-destiny-container ${className}`} ref={containerRef}>
      {/* Glow Ring */}
      <div className="cosmic-destiny-ring"></div>
      
      {/* Main Text with Effects */}
      <div className="cosmic-destiny-text cosmic-destiny-shimmer cosmic-destiny-pulse">
        {children}
      </div>
      
      {/* Floating Stars */}
      <div className="cosmic-destiny-stars" ref={starsRef}></div>
      
      {/* Floating Particles */}
      <div className="cosmic-destiny-particles" ref={particlesRef}></div>
    </div>
  )
}

export default CosmicDestinyText

