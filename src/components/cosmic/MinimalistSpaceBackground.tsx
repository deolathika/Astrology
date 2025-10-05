'use client'

import React, { useEffect, useRef } from 'react'

const MinimalistSpaceBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current

    // Create minimal star field
    const createStars = () => {
      const starCount = 50 // Reduced from 200 for minimalism
      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div')
        star.className = 'cosmic-star-minimal'
        star.style.left = Math.random() * 100 + '%'
        star.style.top = Math.random() * 100 + '%'
        star.style.animationDelay = Math.random() * 12 + 's'
        star.style.animationDuration = (Math.random() * 6 + 12) + 's'
        container.appendChild(star)
      }
    }

    // Create subtle nebula
    const createNebula = () => {
      for (let i = 0; i < 2; i++) {
        const nebula = document.createElement('div')
        nebula.style.position = 'absolute'
        nebula.style.width = Math.random() * 100 + 50 + 'px'
        nebula.style.height = nebula.style.width
        nebula.style.left = Math.random() * 80 + 10 + '%'
        nebula.style.top = Math.random() * 80 + 10 + '%'
        nebula.style.background = `radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%)`
        nebula.style.borderRadius = '50%'
        nebula.style.filter = 'blur(1px)'
        nebula.style.animation = `nebulaDriftMinimal ${200 + Math.random() * 100}s ease-in-out infinite`
        nebula.style.animationDelay = i * 30 + 's'
        container.appendChild(nebula)
      }
    }

    // Initialize minimal elements
    createStars()
    createNebula()

    // Cleanup function
    return () => {
      if (container) {
        container.innerHTML = ''
      }
    }
  }, [])

  return (
    <div className="cosmic-minimalist-bg" ref={containerRef}>
      {/* Base space background is handled by CSS */}
    </div>
  )
}

export default MinimalistSpaceBackground
