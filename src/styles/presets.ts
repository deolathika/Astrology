/**
 * Theme Presets - Celestial Bright Minimal
 * Predefined theme configurations for easy switching
 */

import { themePresets } from './design-tokens'

export type ThemePreset = keyof typeof themePresets

export const getThemeCSS = (preset: ThemePreset) => {
  const theme = themePresets[preset]
  
  return {
    '--color-bg': theme.colors.bg,
    '--color-surface': theme.colors.surface,
    '--color-text': theme.colors.text,
    '--color-text-muted': theme.colors.textMuted,
    '--color-primary': theme.colors.primary,
    '--color-secondary': theme.colors.secondary,
    '--color-accent': theme.colors.accent,
  } as React.CSSProperties
}

export const applyTheme = (preset: ThemePreset) => {
  const root = document.documentElement
  const cssVars = getThemeCSS(preset)
  
  Object.entries(cssVars).forEach(([key, value]) => {
    root.style.setProperty(key, value)
  })
  
  // Store theme preference
  localStorage.setItem('daily-secrets-theme', preset)
}

export const getStoredTheme = (): ThemePreset => {
  if (typeof window === 'undefined') return 'celestialBright'
  
  const stored = localStorage.getItem('daily-secrets-theme') as ThemePreset
  return stored && themePresets[stored] ? stored : 'celestialBright'
}

export const themeDescriptions = {
  celestialBright: {
    name: "Celestial Bright",
    description: "Clean, bright interface with cosmic gradients",
    preview: "Light background with purple-blue-green accents"
  },
  cosmicNight: {
    name: "Cosmic Night", 
    description: "Dark theme for night-time cosmic exploration",
    preview: "Dark background with vibrant cosmic colors"
  },
  serenePastel: {
    name: "Serene Pastel",
    description: "Soft, calming pastel color palette",
    preview: "Gentle pastels for a peaceful experience"
  }
}

export default themePresets
