/**
 * Accessibility Utilities
 * WCAG 2.1 AA compliance helpers
 */

export interface A11yOptions {
  skipToContent?: boolean
  focusManagement?: boolean
  screenReaderSupport?: boolean
  keyboardNavigation?: boolean
  colorContrast?: boolean
  reducedMotion?: boolean
}

export const defaultA11yOptions: A11yOptions = {
  skipToContent: true,
  focusManagement: true,
  screenReaderSupport: true,
  keyboardNavigation: true,
  colorContrast: true,
  reducedMotion: true
}

/**
 * Generate ARIA labels for screen readers
 */
export function generateAriaLabel(text: string, context?: string): string {
  if (context) {
    return `${text}, ${context}`
  }
  return text
}

/**
 * Create focus trap for modals and dropdowns
 */
export function createFocusTrap(container: HTMLElement): () => void {
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  
  const firstElement = focusableElements[0] as HTMLElement
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement
  
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    }
  }
  
  container.addEventListener('keydown', handleKeyDown)
  firstElement?.focus()
  
  return () => {
    container.removeEventListener('keydown', handleKeyDown)
  }
}

/**
 * Announce changes to screen readers
 */
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
  const announcement = document.createElement('div')
  announcement.setAttribute('aria-live', priority)
  announcement.setAttribute('aria-atomic', 'true')
  announcement.className = 'sr-only'
  announcement.textContent = message
  
  document.body.appendChild(announcement)
  
  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Get high contrast mode preference
 */
export function prefersHighContrast(): boolean {
  return window.matchMedia('(prefers-contrast: high)').matches
}

/**
 * Get color scheme preference
 */
export function prefersColorScheme(): 'light' | 'dark' | 'no-preference' {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }
  if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light'
  }
  return 'no-preference'
}

/**
 * Calculate color contrast ratio
 */
export function getContrastRatio(color1: string, color2: string): number {
  const getLuminance = (color: string): number => {
    const rgb = hexToRgb(color)
    if (!rgb) return 0
    
    const { r, g, b } = rgb
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    })
    
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
  }
  
  const lum1 = getLuminance(color1)
  const lum2 = getLuminance(color2)
  const brightest = Math.max(lum1, lum2)
  const darkest = Math.min(lum1, lum2)
  
  return (brightest + 0.05) / (darkest + 0.05)
}

/**
 * Check if color combination meets WCAG AA standards
 */
export function meetsWCAGAA(foreground: string, background: string): boolean {
  const ratio = getContrastRatio(foreground, background)
  return ratio >= 4.5 // WCAG AA standard for normal text
}

/**
 * Check if color combination meets WCAG AAA standards
 */
export function meetsWCAGAAA(foreground: string, background: string): boolean {
  const ratio = getContrastRatio(foreground, background)
  return ratio >= 7 // WCAG AAA standard for normal text
}

/**
 * Convert hex color to RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

/**
 * Generate accessible color palette
 */
export function generateAccessiblePalette(baseColor: string): {
  primary: string
  secondary: string
  accent: string
  background: string
  surface: string
  text: string
  textSecondary: string
} {
  // This would contain logic to generate accessible color combinations
  // For now, returning a basic palette
  return {
    primary: baseColor,
    secondary: adjustColor(baseColor, 20),
    accent: adjustColor(baseColor, -20),
    background: '#ffffff',
    surface: '#f8f9fa',
    text: '#000000',
    textSecondary: '#6c757d'
  }
}

/**
 * Adjust color brightness
 */
function adjustColor(color: string, amount: number): string {
  const rgb = hexToRgb(color)
  if (!rgb) return color
  
  const { r, g, b } = rgb
  const newR = Math.max(0, Math.min(255, r + amount))
  const newG = Math.max(0, Math.min(255, g + amount))
  const newB = Math.max(0, Math.min(255, b + amount))
  
  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`
}

/**
 * Keyboard navigation helpers
 */
export const keyboardKeys = {
  ENTER: 'Enter',
  SPACE: ' ',
  ESCAPE: 'Escape',
  TAB: 'Tab',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  HOME: 'Home',
  END: 'End',
  PAGE_UP: 'PageUp',
  PAGE_DOWN: 'PageDown'
} as const

/**
 * Handle keyboard navigation
 */
export function handleKeyboardNavigation(
  event: KeyboardEvent,
  options: {
    onEnter?: () => void
    onEscape?: () => void
    onArrowUp?: () => void
    onArrowDown?: () => void
    onArrowLeft?: () => void
    onArrowRight?: () => void
    onHome?: () => void
    onEnd?: () => void
  }
): void {
  switch (event.key) {
    case keyboardKeys.ENTER:
    case keyboardKeys.SPACE:
      options.onEnter?.()
      break
    case keyboardKeys.ESCAPE:
      options.onEscape?.()
      break
    case keyboardKeys.ARROW_UP:
      options.onArrowUp?.()
      break
    case keyboardKeys.ARROW_DOWN:
      options.onArrowDown?.()
      break
    case keyboardKeys.ARROW_LEFT:
      options.onArrowLeft?.()
      break
    case keyboardKeys.ARROW_RIGHT:
      options.onArrowRight?.()
      break
    case keyboardKeys.HOME:
      options.onHome?.()
      break
    case keyboardKeys.END:
      options.onEnd?.()
      break
  }
}
