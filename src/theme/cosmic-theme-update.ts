/**
 * Daily Secrets - Modern Cosmic Theme Update
 * Front-end Design System Expert + UI/UX Engineer
 * 
 * Modern cosmic energy theme with nebula glow effects
 * Preserves 100% of existing functionality while enhancing visual appeal
 */

export const cosmicTheme = {
  // === COLOR PALETTE ===
  colors: {
    // Primary Cosmic Colors
    cosmic: {
      violet: '#3a0069',
      violetLight: '#5a1a89',
      violetDark: '#2a0049',
      gold: '#FFD700',
      goldLight: '#FFE55C',
      goldDark: '#B8860B',
      blue: '#8BD8E6',
      blueLight: '#A8E6F5',
      blueDark: '#6BC5D4',
      silver: '#C0C0C0',
      silverLight: '#E0E0E0',
      silverDark: '#A0A0A0',
    },
    
    // Semantic Colors
    primary: {
      50: '#f3f0ff',
      100: '#e9e4ff',
      200: '#d6ccff',
      300: '#b8a6ff',
      400: '#9571ff',
      500: '#7c3aed',
      600: '#6d28d9',
      700: '#5b21b6',
      800: '#4c1d95',
      900: '#3a0069',
    },
    
    secondary: {
      50: '#fefce8',
      100: '#fef9c3',
      200: '#fef08a',
      300: '#fde047',
      400: '#facc15',
      500: '#FFD700',
      600: '#ca8a04',
      700: '#a16207',
      800: '#854d0e',
      900: '#713f12',
    },
    
    // Background Colors
    background: {
      primary: '#0a0a0f',
      secondary: '#1a1a2e',
      tertiary: '#16213e',
      card: 'rgba(255, 255, 255, 0.05)',
      glass: 'rgba(255, 255, 255, 0.1)',
    },
    
    // Text Colors
    text: {
      primary: '#ffffff',
      secondary: '#e0e0e0',
      muted: '#a0a0a0',
      accent: '#FFD700',
    },
    
    // Status Colors
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },

  // === TYPOGRAPHY ===
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      display: ['Orbitron', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
    },
    
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
  },

  // === SPACING ===
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
  },

  // === BORDER RADIUS ===
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },

  // === SHADOWS ===
  boxShadow: {
    cosmic: '0 0 20px rgba(139, 216, 230, 0.3)',
    cosmicGlow: '0 0 40px rgba(255, 215, 0, 0.4)',
    nebula: '0 0 60px rgba(58, 0, 105, 0.6)',
    glass: '0 8px 32px rgba(0, 0, 0, 0.3)',
    card: '0 4px 16px rgba(0, 0, 0, 0.2)',
    button: '0 4px 12px rgba(255, 215, 0, 0.3)',
  },

  // === GRADIENTS ===
  gradients: {
    cosmic: 'linear-gradient(135deg, #3a0069 0%, #8BD8E6 50%, #FFD700 100%)',
    nebula: 'linear-gradient(45deg, #1a1a2e 0%, #16213e 50%, #0a0a0f 100%)',
    gold: 'linear-gradient(135deg, #FFD700 0%, #FFE55C 100%)',
    silver: 'linear-gradient(135deg, #C0C0C0 0%, #E0E0E0 100%)',
    glass: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    button: 'linear-gradient(135deg, #FFD700 0%, #C0C0C0 100%)',
    card: 'linear-gradient(135deg, rgba(58, 0, 105, 0.1) 0%, rgba(139, 216, 230, 0.1) 100%)',
  },

  // === ANIMATIONS ===
  animations: {
    fadeIn: {
      '0%': { opacity: '0', transform: 'translateY(20px)' },
      '100%': { opacity: '1', transform: 'translateY(0)' },
    },
    slideUp: {
      '0%': { opacity: '0', transform: 'translateY(30px)' },
      '100%': { opacity: '1', transform: 'translateY(0)' },
    },
    glow: {
      '0%, 100%': { boxShadow: '0 0 20px rgba(139, 216, 230, 0.3)' },
      '50%': { boxShadow: '0 0 40px rgba(255, 215, 0, 0.6)' },
    },
    pulse: {
      '0%, 100%': { transform: 'scale(1)' },
      '50%': { transform: 'scale(1.05)' },
    },
    shimmer: {
      '0%': { backgroundPosition: '-200% 0' },
      '100%': { backgroundPosition: '200% 0' },
    },
    float: {
      '0%, 100%': { transform: 'translateY(0px)' },
      '50%': { transform: 'translateY(-10px)' },
    },
  },

  // === TRANSITIONS ===
  transitions: {
    fast: 'all 0.15s ease-in-out',
    normal: 'all 0.3s ease-in-out',
    slow: 'all 0.5s ease-in-out',
    bounce: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },

  // === BREAKPOINTS ===
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
}

// === COMPONENT STYLES ===
export const componentStyles = {
  // Button Styles
  button: {
    base: `
      relative overflow-hidden
      px-6 py-3 rounded-xl
      font-medium text-sm
      transition-all duration-300 ease-in-out
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
    `,
    primary: `
      bg-gradient-to-r from-cosmic-gold to-cosmic-silver
      text-cosmic-violet-dark
      shadow-button
      hover:shadow-cosmicGlow
      hover:scale-105
      active:scale-95
    `,
    secondary: `
      bg-cosmic-glass
      text-cosmic-gold
      border border-cosmic-gold/30
      backdrop-blur-sm
      hover:border-cosmic-gold
      hover:bg-cosmic-gold/10
    `,
    ghost: `
      text-cosmic-gold
      hover:bg-cosmic-gold/10
      hover:text-cosmic-gold-light
    `,
  },

  // Card Styles
  card: {
    base: `
      bg-cosmic-card
      backdrop-blur-sm
      border border-white/10
      rounded-2xl
      shadow-card
      hover:shadow-cosmic
      transition-all duration-300
    `,
    glass: `
      bg-cosmic-glass
      backdrop-blur-md
      border border-white/20
      rounded-2xl
      shadow-glass
    `,
    premium: `
      bg-gradient-to-br from-cosmic-gold/10 to-cosmic-silver/10
      border border-cosmic-gold/30
      rounded-2xl
      shadow-cosmicGlow
    `,
  },

  // Input Styles
  input: {
    base: `
      w-full px-4 py-3
      bg-cosmic-glass
      border border-white/20
      rounded-xl
      text-white placeholder-white/60
      focus:border-cosmic-gold
      focus:ring-2 focus:ring-cosmic-gold/20
      transition-all duration-300
      backdrop-blur-sm
    `,
    error: `
      border-red-500
      focus:border-red-500
      focus:ring-red-500/20
    `,
  },

  // Navigation Styles
  navigation: {
    base: `
      bg-cosmic-background-secondary/80
      backdrop-blur-md
      border-b border-white/10
      sticky top-0 z-50
    `,
    item: `
      px-4 py-2 rounded-lg
      text-white/80
      hover:text-cosmic-gold
      hover:bg-cosmic-gold/10
      transition-all duration-300
    `,
    active: `
      text-cosmic-gold
      bg-cosmic-gold/10
      shadow-cosmic
    `,
  },

  // Modal Styles
  modal: {
    overlay: `
      fixed inset-0
      bg-black/50
      backdrop-blur-sm
      z-50
      flex items-center justify-center
      p-4
    `,
    content: `
      bg-cosmic-background-secondary
      border border-white/20
      rounded-2xl
      shadow-glass
      max-w-md w-full
      p-6
    `,
  },

  // Badge Styles
  badge: {
    base: `
      inline-flex items-center px-3 py-1
      rounded-full text-xs font-medium
    `,
    premium: `
      bg-gradient-to-r from-cosmic-gold to-cosmic-silver
      text-cosmic-violet-dark
    `,
    free: `
      bg-cosmic-glass
      text-cosmic-blue
      border border-cosmic-blue/30
    `,
  },
}

// === UTILITY CLASSES ===
export const utilityClasses = {
  // Cosmic Effects
  cosmicGlow: 'shadow-cosmicGlow animate-glow',
  nebulaBg: 'bg-gradient-to-br from-cosmic-violet via-cosmic-blue to-cosmic-gold',
  glassEffect: 'bg-cosmic-glass backdrop-blur-md border border-white/20',
  
  // Animations
  fadeIn: 'animate-fadeIn',
  slideUp: 'animate-slideUp',
  float: 'animate-float',
  shimmer: 'animate-shimmer',
  
  // Text Effects
  gradientText: 'bg-gradient-to-r from-cosmic-gold to-cosmic-silver bg-clip-text text-transparent',
  cosmicText: 'text-cosmic-gold',
  
  // Layout
  cosmicContainer: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  cosmicGrid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
  
  // Spacing
  cosmicPadding: 'p-6 lg:p-8',
  cosmicMargin: 'm-4 lg:m-6',
}

// === RESPONSIVE DESIGN ===
export const responsiveDesign = {
  mobile: {
    container: 'px-4 py-6',
    text: 'text-sm',
    button: 'px-4 py-2 text-sm',
    card: 'p-4',
    grid: 'grid-cols-1 gap-4',
  },
  tablet: {
    container: 'px-6 py-8',
    text: 'text-base',
    button: 'px-6 py-3 text-base',
    card: 'p-6',
    grid: 'grid-cols-2 gap-6',
  },
  desktop: {
    container: 'px-8 py-12',
    text: 'text-lg',
    button: 'px-8 py-4 text-lg',
    card: 'p-8',
    grid: 'grid-cols-3 gap-8',
  },
}

// === DARK/LIGHT MODE ===
export const themeModes = {
  dark: {
    background: 'bg-cosmic-background-primary',
    text: 'text-white',
    card: 'bg-cosmic-card',
    border: 'border-white/10',
  },
  light: {
    background: 'bg-white',
    text: 'text-gray-900',
    card: 'bg-white/90',
    border: 'border-gray-200',
  },
}

// === EXPORT CONFIGURATION ===
export const cosmicThemeConfig = {
  theme: cosmicTheme,
  components: componentStyles,
  utilities: utilityClasses,
  responsive: responsiveDesign,
  modes: themeModes,
}

export default cosmicThemeConfig

