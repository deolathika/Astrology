'use client'

import React from 'react'

interface CosmicNebulaBackgroundProps {
  children?: React.ReactNode
  className?: string
}

const CosmicNebulaBackground: React.FC<CosmicNebulaBackgroundProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`cosmic-nebula-bg ${className}`}>
      {/* Main Nebula Swirl */}
      <div className="cosmic-nebula-swirl"></div>
      
      {/* Secondary Nebula Layer */}
      <div className="cosmic-nebula-layer"></div>
      
      {/* Accent Nebula Layer */}
      <div className="cosmic-nebula-accent"></div>
      
      {/* Gold Nebula Highlights */}
      <div className="cosmic-nebula-gold"></div>
      
      {/* Cosmic Filaments */}
      <div className="cosmic-filaments"></div>
      
      {/* Cosmic Dust Particles */}
      <div className="cosmic-dust"></div>
      
      {/* Cosmic Energy Pulses */}
      <div className="cosmic-energy"></div>
      
      {/* Content */}
      {children}
    </div>
  )
}

export default CosmicNebulaBackground

