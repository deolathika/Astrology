/**
 * UI Policies for Daily Secrets App
 * Defines consistent navigation, styling, and interaction patterns
 */

export interface UIPolicy {
  navigation: NavigationPolicy
  styling: StylingPolicy
  interactions: InteractionPolicy
  accessibility: AccessibilityPolicy
  mobile: MobilePolicy
}

export interface NavigationPolicy {
  breadcrumbs: boolean
  backButton: boolean
  progressIndicators: boolean
  skipOptions: boolean
  confirmationDialogs: boolean
}

export interface StylingPolicy {
  colorScheme: 'light' | 'dark' | 'auto'
  primaryColor: string
  accentColor: string
  fontFamily: string
  borderRadius: 'sm' | 'md' | 'lg' | 'xl'
  shadows: 'none' | 'sm' | 'md' | 'lg' | 'xl'
}

export interface InteractionPolicy {
  animations: boolean
  hapticFeedback: boolean
  soundEffects: boolean
  autoSave: boolean
  confirmations: boolean
}

export interface AccessibilityPolicy {
  highContrast: boolean
  largeText: boolean
  screenReader: boolean
  keyboardNavigation: boolean
  focusIndicators: boolean
}

export interface MobilePolicy {
  touchTargets: 'small' | 'medium' | 'large'
  gestureNavigation: boolean
  swipeActions: boolean
  pullToRefresh: boolean
  bottomNavigation: boolean
}

// Default UI Policies
export const defaultUIPolicies: UIPolicy = {
  navigation: {
    breadcrumbs: true,
    backButton: true,
    progressIndicators: true,
    skipOptions: true,
    confirmationDialogs: true
  },
  styling: {
    colorScheme: 'auto',
    primaryColor: 'indigo',
    accentColor: 'violet',
    fontFamily: 'Inter',
    borderRadius: 'lg',
    shadows: 'md'
  },
  interactions: {
    animations: true,
    hapticFeedback: true,
    soundEffects: false,
    autoSave: true,
    confirmations: true
  },
  accessibility: {
    highContrast: false,
    largeText: false,
    screenReader: true,
    keyboardNavigation: true,
    focusIndicators: true
  },
  mobile: {
    touchTargets: 'medium',
    gestureNavigation: true,
    swipeActions: true,
    pullToRefresh: true,
    bottomNavigation: true
  }
}

// Feature-specific policies
export const featurePolicies = {
  onboarding: {
    ...defaultUIPolicies,
    navigation: {
      ...defaultUIPolicies.navigation,
      progressIndicators: true,
      skipOptions: true
    },
    mobile: {
      ...defaultUIPolicies.mobile,
      touchTargets: 'large',
      gestureNavigation: false
    }
  },
  home: {
    ...defaultUIPolicies,
    navigation: {
      ...defaultUIPolicies.navigation,
      breadcrumbs: false,
      progressIndicators: false
    },
    mobile: {
      ...defaultUIPolicies.mobile,
      bottomNavigation: true,
      swipeActions: true
    }
  },
  profile: {
    ...defaultUIPolicies,
    navigation: {
      ...defaultUIPolicies.navigation,
      breadcrumbs: true,
      backButton: true
    },
    interactions: {
      ...defaultUIPolicies.interactions,
      autoSave: true,
      confirmations: true
    }
  },
  community: {
    ...defaultUIPolicies,
    interactions: {
      ...defaultUIPolicies.interactions,
      hapticFeedback: true,
      soundEffects: true
    },
    mobile: {
      ...defaultUIPolicies.mobile,
      gestureNavigation: true,
      swipeActions: true
    }
  }
}

// Navigation patterns
export const navigationPatterns = {
  onboarding: {
    type: 'linear',
    allowBack: true,
    allowSkip: true,
    showProgress: true,
    maxSteps: 8
  },
  main: {
    type: 'tabbed',
    tabs: ['home', 'today', 'profile', 'community', 'settings'],
    allowDeepLinking: true
  },
  profile: {
    type: 'hierarchical',
    allowBreadcrumbs: true,
    allowBack: true
  }
}

// Mobile-specific policies
export const mobilePolicies = {
  touchTargets: {
    small: '32px',
    medium: '44px',
    large: '48px'
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px'
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px'
  }
}

// Accessibility policies
export const accessibilityPolicies = {
  colorContrast: {
    normal: '4.5:1',
    large: '3:1'
  },
  focusIndicators: {
    outline: '2px solid rgb(99 102 241)',
    outlineOffset: '2px'
  },
  screenReader: {
    skipLinks: true,
    landmarks: true,
    altText: true
  }
}

// Animation policies
export const animationPolicies = {
  duration: {
    fast: '150ms',
    normal: '250ms',
    slow: '350ms'
  },
  easing: {
    ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)'
  },
  reducedMotion: {
    respect: true,
    fallback: 'none'
  }
}

// Error handling policies
export const errorPolicies = {
  userFriendly: true,
  retryOptions: true,
  fallbackUI: true,
  logging: true,
  reporting: true
}

// Performance policies
export const performancePolicies = {
  lazyLoading: true,
  imageOptimization: true,
  codeSplitting: true,
  caching: true,
  compression: true
}

// Security policies
export const securityPolicies = {
  contentSecurityPolicy: true,
  xssProtection: true,
  clickjackingProtection: true,
  secureHeaders: true
}

export function getUIPolicy(feature: keyof typeof featurePolicies): UIPolicy {
  return featurePolicies[feature] || defaultUIPolicies
}

export function applyUIPolicy(policy: UIPolicy): void {
  // Apply CSS custom properties based on policy
  const root = document.documentElement
  
  // Color scheme
  root.style.setProperty('--color-scheme', policy.styling.colorScheme)
  
  // Touch targets
  root.style.setProperty('--touch-target-size', mobilePolicies.touchTargets[policy.mobile.touchTargets])
  
  // Animations
  if (!policy.interactions.animations) {
    root.style.setProperty('--animation-duration', '0ms')
  }
  
  // Accessibility
  if (policy.accessibility.highContrast) {
    root.classList.add('high-contrast')
  }
  
  if (policy.accessibility.largeText) {
    root.classList.add('large-text')
  }
}

export function validateUIPolicy(policy: UIPolicy): string[] {
  const errors: string[] = []
  
  // Validate navigation
  if (policy.navigation.breadcrumbs && !policy.navigation.backButton) {
    errors.push('Breadcrumbs require back button to be enabled')
  }
  
  // Validate mobile
  if (policy.mobile.touchTargets === 'small' && policy.accessibility.largeText) {
    errors.push('Large text requires larger touch targets')
  }
  
  // Validate interactions
  if (policy.interactions.hapticFeedback && !policy.mobile.gestureNavigation) {
    errors.push('Haptic feedback requires gesture navigation')
  }
  
  return errors
}
