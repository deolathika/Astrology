'use client'

import { useState, useEffect } from 'react'

interface DeviceInfo {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isTouch: boolean
  screenWidth: number
  screenHeight: number
  orientation: 'portrait' | 'landscape'
  deviceType: 'mobile' | 'tablet' | 'desktop'
  userAgent: string
}

export function useDevice(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isTouch: false,
    screenWidth: 1024,
    screenHeight: 768,
    orientation: 'landscape',
    deviceType: 'desktop',
    userAgent: ''
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const updateDeviceInfo = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const userAgent = navigator.userAgent

      // Device type detection
      const isMobile = width < 768
      const isTablet = width >= 768 && width < 1024
      const isDesktop = width >= 1024
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const orientation = height > width ? 'portrait' : 'landscape'

      let deviceType: 'mobile' | 'tablet' | 'desktop' = 'desktop'
      if (isMobile) deviceType = 'mobile'
      else if (isTablet) deviceType = 'tablet'

      setDeviceInfo({
        isMobile,
        isTablet,
        isDesktop,
        isTouch,
        screenWidth: width,
        screenHeight: height,
        orientation,
        deviceType,
        userAgent
      })
    }

    // Initial detection
    updateDeviceInfo()

    // Listen for resize events
    window.addEventListener('resize', updateDeviceInfo)
    window.addEventListener('orientationchange', updateDeviceInfo)

    return () => {
      window.removeEventListener('resize', updateDeviceInfo)
      window.removeEventListener('orientationchange', updateDeviceInfo)
    }
  }, [])

  return deviceInfo
}

export function useResponsive() {
  const device = useDevice()

  return {
    // Breakpoint helpers
    isXs: device.screenWidth < 480,
    isSm: device.screenWidth >= 480 && device.screenWidth < 640,
    isMd: device.screenWidth >= 640 && device.screenWidth < 768,
    isLg: device.screenWidth >= 768 && device.screenWidth < 1024,
    isXl: device.screenWidth >= 1024 && device.screenWidth < 1280,
    is2Xl: device.screenWidth >= 1280,

    // Device specific
    isMobile: device.isMobile,
    isTablet: device.isTablet,
    isDesktop: device.isDesktop,
    isTouch: device.isTouch,

    // Layout helpers
    shouldShowSidebar: device.isDesktop,
    shouldShowBottomNav: device.isMobile,
    shouldUseCompactLayout: device.isMobile,
    shouldUseGridLayout: device.isTablet || device.isDesktop,

    // Spacing helpers
    getSpacing: (mobile: number, tablet: number, desktop: number) => {
      if (device.isMobile) return mobile
      if (device.isTablet) return tablet
      return desktop
    },

    // Grid helpers
    getGridCols: (mobile: number, tablet: number, desktop: number) => {
      if (device.isMobile) return mobile
      if (device.isTablet) return tablet
      return desktop
    }
  }
}
