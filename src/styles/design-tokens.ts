/**
 * Design Tokens - Clean Minimal
 * Centralized design system for Daily Secrets
 */

export const tokens = {
  colors: {
    // Base colors - Minimalist palette
    bg: "#FFFFFF",
    surface: "#F8FAFC",
    text: "#1E293B",
    textMuted: "#64748B",
    textLight: "#94A3B8",
    
    // Accent colors - Soft gradients
    gradFrom: "#3B82F6",
    gradVia: "#8B5CF6", 
    gradTo: "#06B6D4",
    
    // Semantic colors
    primary: "#3B82F6",
    secondary: "#8B5CF6",
    accent: "#06B6D4",
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
    
    // Neutral palette
    gray: {
      50: "#F9FAFB",
      100: "#F3F4F6",
      200: "#E5E7EB",
      300: "#D1D5DB",
      400: "#9CA3AF",
      500: "#6B7280",
      600: "#4B5563",
      700: "#374151",
      800: "#1F2937",
      900: "#111827"
    }
  },
  
  radius: {
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24
  },
  
  shadow: {
    sm: "0 4px 16px rgba(17,24,39,0.05)",
    md: "0 8px 30px rgba(17,24,39,0.06)",
    lg: "0 12px 40px rgba(17,24,39,0.08)",
    glow: "0 0 20px rgba(109,40,217,0.15)"
  },
  
  spacing: {
    sectionY: "py-12 md:py-16",
    gap: "gap-6 md:gap-8",
    container: "max-w-7xl mx-auto px-4",
    card: "p-6 md:p-8"
  },
  
  typography: {
    font: "'Inter Tight', 'Plus Jakarta Sans', system-ui, sans-serif",
    fontMono: "'JetBrains Mono', 'Fira Code', monospace",
    
    // Font sizes
    xs: "0.75rem",    // 12px
    sm: "0.875rem",   // 14px
    base: "1rem",     // 16px
    lg: "1.125rem",   // 18px
    xl: "1.25rem",    // 20px
    "2xl": "1.5rem",  // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
    "5xl": "3rem",    // 48px
    
    // Font weights
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  },
  
  motion: {
    duration: 0.2,
    easing: "easeOut",
    spring: { type: "spring", stiffness: 300, damping: 30 }
  },
  
  breakpoints: {
    sm: "640px",
    md: "768px", 
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px"
  }
}

export const themePresets = {
  celestialBright: {
    name: "Celestial Bright",
    colors: {
      bg: "#FFFFFF",
      surface: "#F8FAFC",
      text: "#1E293B",
      textMuted: "#64748B",
      primary: "#3B82F6",
      secondary: "#8B5CF6",
      accent: "#06B6D4"
    }
  },
  
  cosmicNight: {
    name: "Cosmic Night",
    colors: {
      bg: "#0F0F23",
      surface: "#1A1A2E",
      text: "#FFFFFF",
      textMuted: "#A1A1AA",
      primary: "#8B5CF6",
      secondary: "#06B6D4",
      accent: "#10B981"
    }
  },
  
  serenePastel: {
    name: "Serene Pastel",
    colors: {
      bg: "#FEFEFE",
      surface: "#F8FAFC",
      text: "#1F2937",
      textMuted: "#6B7280",
      primary: "#A78BFA",
      secondary: "#60A5FA",
      accent: "#34D399"
    }
  }
}

export const componentTokens = {
  button: {
    height: {
      sm: "2rem",    // 32px
      md: "2.5rem",  // 40px
      lg: "3rem"     // 48px
    },
    padding: {
      sm: "0.5rem 1rem",
      md: "0.75rem 1.5rem", 
      lg: "1rem 2rem"
    }
  },
  
  card: {
    padding: "1.5rem",
    borderRadius: "1.25rem", // 20px
    shadow: "0 8px 30px rgba(17,24,39,0.06)"
  },
  
  input: {
    height: "2.75rem", // 44px
    padding: "0.75rem 1rem",
    borderRadius: "0.75rem" // 12px
  }
}

export default tokens
