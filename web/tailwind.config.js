/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Cosmic Color Palette - Matching App Icon
        'deep-space': '#0B0B0E',      // Deep space black background
        'electric-violet': '#7B4FFF',  // Electric violet accent
        'celestial-blue': '#3FC5FF',   // Celestial blue links
        'aurora-green': '#76FF9C',     // Aurora green success
        'supernova-gold': '#FFD75A',   // Supernova gold CTA
        'nebula-pink': '#FF6EC7',      // Nebula pink emotions
        
        // Cosmic Gradients
        'cosmic-primary': {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d6ff',
          300: '#a5b8ff',
          400: '#7B4FFF',
          500: '#5a2ddb',
          600: '#4c1fb8',
          700: '#3f1a96',
          800: '#35177a',
          900: '#2d1563',
        },
        'cosmic-secondary': {
          50: '#f0fdff',
          100: '#ccf7fe',
          200: '#99f5fd',
          300: '#3FC5FF',
          400: '#0ea5e9',
          500: '#0284c7',
          600: '#0369a1',
          700: '#075985',
          800: '#0c4a6e',
          900: '#0f3a5c',
        }
      },
      fontFamily: {
        'cosmic': ['Inter', 'system-ui', 'sans-serif'],
        'cosmic-accent': ['Cormorant Garamond', 'serif'],
      },
      animation: {
        'cosmic-glow': 'cosmic-glow 2s ease-in-out infinite alternate',
        'nebula-shift': 'nebula-shift 8s ease-in-out infinite',
        'star-twinkle': 'star-twinkle 3s ease-in-out infinite',
        'cosmic-float': 'cosmic-float 6s ease-in-out infinite',
      },
      keyframes: {
        'cosmic-glow': {
          '0%': { boxShadow: '0 0 20px rgba(123, 79, 255, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(123, 79, 255, 0.6)' },
        },
        'nebula-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'star-twinkle': {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
        'cosmic-float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(135deg, #7B4FFF 0%, #3FC5FF 50%, #FFD75A 100%)',
        'nebula-gradient': 'linear-gradient(45deg, #0B0B0E 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #0B0B0E 100%)',
        'deep-space': 'radial-gradient(ellipse at center, #1a1a2e 0%, #0B0B0E 100%)',
      },
      backdropBlur: {
        'cosmic': '20px',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
