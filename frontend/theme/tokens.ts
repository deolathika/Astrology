/**
 * 🌌 Daily Secrets - Design Tokens
 * Generated from Readdy UI specifications
 */

export interface ColorPalette {
  // Cosmic Colors
  deepSpace: string;
  cosmicNavy: string;
  stellarGray: string;
  nebulaDark: string;
  electricViolet: string;
  cosmicPurple: string;
  stellarPink: string;
  nebulaPink: string;
  celestialBlue: string;
  cosmicCyan: string;
  stellarTeal: string;
  auroraGreen: string;
  supernovaGold: string;
  stellarYellow: string;
  cosmicOrange: string;
  nebulaRed: string;
}

export interface SemanticColors {
  primary: string;
  secondary: string;
  accent: string;
  success: string;
  warning: string;
  error: string;
  info: string;
}

export interface NeutralColors {
  white: string;
  gray50: string;
  gray100: string;
  gray200: string;
  gray300: string;
  gray400: string;
  gray500: string;
  gray600: string;
  gray700: string;
  gray800: string;
  gray900: string;
  black: string;
}

export interface TypographyConfig {
  fontFamilies: {
    primary: string[];
    heading: string[];
    mono: string[];
  };
  fontSizes: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    '5xl': string;
    '6xl': string;
  };
  fontWeights: {
    light: string;
    normal: string;
    medium: string;
    semibold: string;
    bold: string;
    extrabold: string;
    black: string;
  };
  lineHeights: {
    tight: string;
    snug: string;
    normal: string;
    relaxed: string;
    loose: string;
  };
}

export interface SpacingConfig {
  [key: string]: string;
}

export interface BorderRadiusConfig {
  [key: string]: string;
}

export interface ShadowConfig {
  [key: string]: string;
}

export interface AnimationConfig {
  durations: {
    fast: string;
    normal: string;
    slow: string;
  };
  easings: {
    linear: string;
    ease: string;
    easeIn: string;
    easeOut: string;
    easeInOut: string;
    cosmic: string;
  };
}

export interface BreakpointConfig {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

export interface ZIndexConfig {
  [key: string]: string;
}

export interface MoodTheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
}

export interface DesignTokens {
  colors: {
    cosmic: ColorPalette;
    semantic: SemanticColors;
    neutral: NeutralColors;
  };
  typography: TypographyConfig;
  spacing: SpacingConfig;
  borderRadius: BorderRadiusConfig;
  shadows: ShadowConfig;
  animations: AnimationConfig;
  breakpoints: BreakpointConfig;
  zIndex: ZIndexConfig;
  moodThemes: {
    fire: MoodTheme;
    water: MoodTheme;
    air: MoodTheme;
    earth: MoodTheme;
  };
}

export const designTokens: DesignTokens = {
  colors: {
    cosmic: {
      deepSpace: '#0A0A0F',
      cosmicNavy: '#1A1A2E',
      stellarGray: '#2D2D3A',
      nebulaDark: '#16213E',
      electricViolet: '#7B4FFF',
      cosmicPurple: '#9D4EDD',
      stellarPink: '#FF6EC7',
      nebulaPink: '#EC4899',
      celestialBlue: '#3FC5FF',
      cosmicCyan: '#00D4FF',
      stellarTeal: '#00F5FF',
      auroraGreen: '#76FF9C',
      supernovaGold: '#FFD75A',
      stellarYellow: '#FFE066',
      cosmicOrange: '#FF8C42',
      nebulaRed: '#FF4757',
    },
    semantic: {
      primary: '#7B4FFF',
      secondary: '#3FC5FF',
      accent: '#FFD75A',
      success: '#76FF9C',
      warning: '#FFE066',
      error: '#FF4757',
      info: '#00D4FF',
    },
    neutral: {
      white: '#FFFFFF',
      gray50: '#F8FAFC',
      gray100: '#F1F5F9',
      gray200: '#E2E8F0',
      gray300: '#CBD5E1',
      gray400: '#94A3B8',
      gray500: '#64748B',
      gray600: '#475569',
      gray700: '#334155',
      gray800: '#1E293B',
      gray900: '#0F172A',
      black: '#000000',
    },
  },
  typography: {
    fontFamilies: {
      primary: ['Inter', 'system-ui', 'sans-serif'],
      heading: ['Orbitron', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'Consolas', 'monospace'],
    },
    fontSizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
    },
    fontWeights: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    lineHeights: {
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    },
  },
  spacing: {
    '0': '0',
    '1': '0.25rem',
    '2': '0.5rem',
    '3': '0.75rem',
    '4': '1rem',
    '5': '1.25rem',
    '6': '1.5rem',
    '8': '2rem',
    '10': '2.5rem',
    '12': '3rem',
    '16': '4rem',
    '20': '5rem',
    '24': '6rem',
    '32': '8rem',
    '40': '10rem',
    '48': '12rem',
    '56': '14rem',
    '64': '16rem',
  },
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
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    cosmic: '0 0 20px rgba(123, 79, 255, 0.3), 0 0 40px rgba(123, 79, 255, 0.1)',
    nebula: '0 0 30px rgba(255, 110, 199, 0.4), 0 0 60px rgba(255, 110, 199, 0.2)',
  },
  animations: {
    durations: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easings: {
      linear: 'linear',
      ease: 'ease',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
      cosmic: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  zIndex: {
    hide: '-1',
    auto: 'auto',
    base: '0',
    docked: '10',
    dropdown: '1000',
    sticky: '1100',
    banner: '1200',
    overlay: '1300',
    modal: '1400',
    popover: '1500',
    skipLink: '1600',
    toast: '1700',
    tooltip: '1800',
  },
  moodThemes: {
    fire: {
      primary: '#FF8C42',
      secondary: '#FFD75A',
      accent: '#FF4757',
      background: '#1A0A0F',
      surface: '#2D1A1A',
    },
    water: {
      primary: '#3FC5FF',
      secondary: '#00D4FF',
      accent: '#00F5FF',
      background: '#0A0F1A',
      surface: '#1A2D3A',
    },
    air: {
      primary: '#94A3B8',
      secondary: '#CBD5E1',
      accent: '#E2E8F0',
      background: '#0F172A',
      surface: '#1E293B',
    },
    earth: {
      primary: '#76FF9C',
      secondary: '#00F5FF',
      accent: '#FFE066',
      background: '#0A1A0F',
      surface: '#1A2D1A',
    },
  },
};

// CSS Custom Properties Generator
export const generateCSSVariables = (tokens: DesignTokens, mood?: keyof typeof tokens.moodThemes) => {
  const variables: Record<string, string> = {};

  // Color variables
  Object.entries(tokens.colors.cosmic).forEach(([key, value]) => {
    variables[`--color-cosmic-${key}`] = value;
  });

  Object.entries(tokens.colors.semantic).forEach(([key, value]) => {
    variables[`--color-semantic-${key}`] = value;
  });

  Object.entries(tokens.colors.neutral).forEach(([key, value]) => {
    variables[`--color-neutral-${key}`] = value;
  });

  // Typography variables
  Object.entries(tokens.typography.fontSizes).forEach(([key, value]) => {
    variables[`--font-size-${key}`] = value;
  });

  Object.entries(tokens.typography.fontWeights).forEach(([key, value]) => {
    variables[`--font-weight-${key}`] = value;
  });

  Object.entries(tokens.typography.lineHeights).forEach(([key, value]) => {
    variables[`--line-height-${key}`] = value;
  });

  // Spacing variables
  Object.entries(tokens.spacing).forEach(([key, value]) => {
    variables[`--spacing-${key}`] = value;
  });

  // Border radius variables
  Object.entries(tokens.borderRadius).forEach(([key, value]) => {
    variables[`--border-radius-${key}`] = value;
  });

  // Shadow variables
  Object.entries(tokens.shadows).forEach(([key, value]) => {
    variables[`--shadow-${key}`] = value;
  });

  // Animation variables
  Object.entries(tokens.animations.durations).forEach(([key, value]) => {
    variables[`--duration-${key}`] = value;
  });

  Object.entries(tokens.animations.easings).forEach(([key, value]) => {
    variables[`--easing-${key}`] = value;
  });

  // Breakpoint variables
  Object.entries(tokens.breakpoints).forEach(([key, value]) => {
    variables[`--breakpoint-${key}`] = value;
  });

  // Z-index variables
  Object.entries(tokens.zIndex).forEach(([key, value]) => {
    variables[`--z-index-${key}`] = value;
  });

  // Mood theme variables
  if (mood && tokens.moodThemes[mood]) {
    const moodTheme = tokens.moodThemes[mood];
    Object.entries(moodTheme).forEach(([key, value]) => {
      variables[`--mood-${key}`] = value;
    });
  }

  return variables;
};

// Theme provider hook
export const useTheme = () => {
  return {
    tokens: designTokens,
    generateCSSVariables,
  };
};

export default designTokens;

