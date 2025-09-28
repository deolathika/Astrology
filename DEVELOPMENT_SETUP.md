# 🌟 Daily Secrets App - Development Setup

## Quick Start

### Option 1: Using npm (Recommended)
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Option 2: Using Flutter directly
```bash
# Set Flutter PATH
export PATH="/Users/lathikadissanayaka/flutter/bin:$PATH"

# Get dependencies
flutter pub get

# Run development server
flutter run -d web-server --web-port=8120
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run dev:hot` | Start with hot reload enabled |
| `npm run build` | Build for production |
| `npm run clean` | Clean build artifacts |
| `npm run get` | Get Flutter dependencies |
| `npm run doctor` | Check Flutter installation |
| `npm run test` | Run Flutter tests |

## Development URLs

- **Main App**: http://localhost:8120
- **Alternative Ports**: 8119, 8118, 8117 (if multiple instances)

## Features

### ✅ Cosmic UI Theme
- Deep space color palette
- Electric violet, celestial blue, supernova gold
- Smooth animations and transitions
- Responsive design

### ✅ Multi-Language Support
- English, සිංහල, தமிழ், हिन्दी, 中文
- Real-time language switching
- Cultural adaptations

### ✅ Navigation System
- Home, Community, Compatibility, Dreams, Settings
- Cosmic-themed bottom navigation
- Smooth screen transitions

### ✅ Astrology & Numerology
- Western, Vedic, Chinese, Sri Lankan zodiac
- Life Path, Destiny, Soul Urge, Personality numbers
- Advanced calculations and insights

## Troubleshooting

### Flutter Not Found
```bash
# Add Flutter to PATH
export PATH="/Users/lathikadissanayaka/flutter/bin:$PATH"

# Verify installation
flutter --version
```

### Port Already in Use
```bash
# Kill existing processes
pkill -f "flutter.*8120"

# Or use different port
flutter run -d web-server --web-port=8121
```

### Dependencies Issues
```bash
# Clean and reinstall
flutter clean
flutter pub get
```

## Project Structure

```
daily_secrets_app/
├── lib/
│   ├── main.dart                    # App entry point
│   ├── models/                      # Data models
│   ├── services/                    # Business logic
│   ├── ui/
│   │   ├── screens/                 # Screen components
│   │   ├── components/              # Reusable components
│   │   └── theme/                   # App theming
│   └── utils/                       # Utility functions
├── data/                           # Static data files
├── backend/                        # Backend services
├── web/                           # Web components
├── scripts/                       # Build scripts
└── package.json                   # npm scripts
```

## Development Tips

1. **Hot Reload**: Use `npm run dev:hot` for faster development
2. **Debugging**: Open browser dev tools (F12) for debugging
3. **Responsive**: Test on different screen sizes
4. **Languages**: Test all language translations
5. **Navigation**: Ensure all navigation works properly

## Production Build

```bash
# Build for production
npm run build

# Files will be in build/web/
```

---

**🌟 Your cosmic astrology app is ready for development!** ✨
