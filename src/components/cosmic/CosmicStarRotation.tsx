'use client'

import React, { useEffect, useRef } from 'react'

interface CosmicStarRotationProps {
  size?: 'small' | 'medium' | 'large'
  color?: 'gold' | 'blue' | 'purple' | 'multi'
  className?: string
}

const CosmicStarRotation: React.FC<CosmicStarRotationProps> = ({ 
  size = 'medium', 
  color = 'gold',
  className = '' 
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !particlesRef.current) return

    // Create floating particles
    const createParticles = () => {
      const particleCount = 6
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div')
        particle.className = 'cosmic-star-particle'
        particle.style.animationDelay = Math.random() * 20 + 's'
        particlesRef.current?.appendChild(particle)
      }
    }

    // Initialize effects
    createParticles()

    // Cleanup function
    return () => {
      if (particlesRef.current) {
        particlesRef.current.innerHTML = ''
      }
    }
  }, [])

  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24',
    large: 'w-32 h-32'
  }

  const colorClasses = {
    gold: 'cosmic-star-gold',
    blue: 'cosmic-star-blue',
    purple: 'cosmic-star-purple',
    multi: 'cosmic-star-multi'
  }

  return (
    <div className={`cosmic-star-container ${sizeClasses[size]} ${className}`} ref={containerRef}>
      {/* Main Star */}
      <div className={`cosmic-star ${colorClasses[color]}`}></div>
      
      {/* Orbiting Stars */}
      <div className="cosmic-star-orbit"></div>
      
      {/* Inner Orbiting Stars */}
      <div className="cosmic-star-inner-orbit"></div>
      
      {/* Star Rays */}
      <div className="cosmic-star-rays"></div>
      
      {/* Star Glow */}
      <div className="cosmic-star-glow"></div>
      
      {/* Floating Particles */}
      <div className="cosmic-star-particles" ref={particlesRef}></div>
      
      {/* Constellation */}
      <div className="cosmic-star-constellation"></div>
    </div>
  )
}

export default CosmicStarRotation
