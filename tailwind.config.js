/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 🌌 COSMIC COLOR PALETTE - GALACTIC THEME 🌌
        
        // Deep Space Colors
        'deep-space': '#0A0A0F',     // Deepest space
        'cosmic-navy': '#1A1A2E',     // Space navy
        'stellar-gray': '#2D2D3A',    // Stellar gray
        'nebula-dark': '#16213E',     // Nebula dark
        
        // Electric Cosmic Colors
        'electric-violet': '#7B4FFF',  // Electric violet
        'cosmic-purple': '#9D4EDD',   // Cosmic purple
        'stellar-pink': '#FF6EC7',     // Stellar pink
        'nebula-pink': '#EC4899',      // Nebula pink
        
        // Celestial Colors
        'celestial-blue': '#3FC5FF',   // Celestial blue
        'cosmic-cyan': '#00D4FF',      // Cosmic cyan
        'stellar-teal': '#00F5FF',     // Stellar teal
        'aurora-green': '#76FF9C',     // Aurora green
        
        // Supernova Colors
        'supernova-gold': '#FFD75A',   // Supernova gold
        'stellar-yellow': '#FFE066',   // Stellar yellow
        'cosmic-orange': '#FF8C42',    // Cosmic orange
        'nebula-red': '#FF4757',       // Nebula red
        
        // Surface Colors
        'starlight-white': '#F8F9FA',  // Starlight white
        'cosmic-silver': '#E9ECEF',    // Cosmic silver
        'stellar-gray-light': '#DEE2E6', // Stellar gray light
        
        // Legacy compatibility
        'brand-yellow': '#FFD75A',
        'brand-white': '#F8F9FA',
        'brand-purple': '#7B4FFF',
        'surface-light': '#F8F9FA',
        'surface-dark': '#1A1A2E',
        'lavender': '#E9ECEF',
        'cream': '#DEE2E6',
        'soft-blue': '#3FC5FF',
        'mystical-purple': '#9D4EDD',
        'cosmic-pink': '#FF6EC7',
        'cosmic-dark': '#2D2D3A',
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(135deg, #7B4FFF 0%, #FFD75A 50%, #FF6EC7 100%)',
        'nebula-gradient': 'linear-gradient(180deg, #3FC5FF 0%, #00F5FF 50%, #76FF9C 100%)',
        'stellar-gradient': 'linear-gradient(135deg, #9D4EDD 0%, #FF6EC7 50%, #EC4899 100%)',
        'supernova-gradient': 'linear-gradient(180deg, #FFD75A 0%, #FFE066 50%, #FF8C42 100%)',
        'space-gradient': 'linear-gradient(180deg, #F8F9FA 0%, #E9ECEF 100%)',
        'deep-space-gradient': 'linear-gradient(180deg, #0A0A0F 0%, #1A1A2E 50%, #2D2D3A 100%)',
        'cosmic-card-gradient': 'linear-gradient(135deg, #F8F9FA 0%, #E9ECEF 100%)',
      },
      animation: {
        'pulse-cosmic': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-cosmic': 'bounce 1s infinite',
        'spin-cosmic': 'spin 3s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #7B4FFF' },
          '100%': { boxShadow: '0 0 20px #7B4FFF, 0 0 30px #7B4FFF' },
        },
      },
      fontFamily: {
        'cosmic': ['Inter', 'system-ui', 'sans-serif'],
        'accent': ['Cormorant Garamond', 'serif'],
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
