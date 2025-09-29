# 🌟 Daily Secrets - Real Astrology & Numerology App

A comprehensive astrology and numerology application built with **Next.js 14**, **React 18**, and **TypeScript**, featuring a cosmic-themed UI with multi-language support.

## ✨ Features

### 🌌 **Cosmic UI/UX**
- **Deep Space Theme**: Electric violet, celestial blue, supernova gold color palette
- **Smooth Animations**: Framer Motion powered cosmic animations
- **Responsive Design**: Mobile-first with desktop optimization
- **Dark Mode**: Immersive cosmic experience

### 🌍 **Multi-Language Support**
- **English** - Complete translations
- **සිංහල (Sinhala)** - Full Sinhala translations
- **தமிழ் (Tamil)** - Complete Tamil translations
- **हिन्दी (Hindi)** - Full Hindi translations
- **中文 (Chinese)** - Complete Chinese translations

### 🔮 **Astrology Systems**
- **Western Zodiac** - Traditional astrology
- **Vedic Zodiac** - Ancient Indian astrology
- **Chinese Zodiac** - Year-based calculations
- **Sri Lankan Zodiac** - Custom implementation

### 🔢 **Numerology Features**
- **Life Path Numbers** - Birth date calculations
- **Destiny Numbers** - Full name analysis
- **Soul Urge & Personality** - Vowel/consonant analysis
- **Master Numbers** - 11, 22, 33 support

### 🚀 **Modern Tech Stack**
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Vercel** - Production deployment

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm 8+
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/deolathika/Astrology.git
cd Astrology
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
# Copy environment template
cp env.production.example .env.local

# Edit .env.local with your API keys
```

4. **Start development server**
```bash
# Development environment
npm run dev

# Or with hot reload
npm run dev:hot
```

## 🔧 Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (port 8120) |
| `npm run dev:hot` | Start with hot reload |
| `npm run build` | Build for production |
| `npm run build:dev` | Build for development |
| `npm run build:prod` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript checks |
| `npm run test` | Run tests |
| `npm run clean` | Clean build artifacts |

### Environment Configuration

#### Development Environment (`.env.local`)
```env
NODE_ENV=development
NEXT_PUBLIC_APP_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:8120
NEXT_PUBLIC_API_URL=http://localhost:3001/api
# Add your development API keys
```

#### Production Environment
```env
NODE_ENV=production
NEXT_PUBLIC_APP_ENV=production
NEXT_PUBLIC_APP_URL=https://daily-secrets-app.vercel.app
NEXT_PUBLIC_API_URL=https://daily-secrets-api.vercel.app/api
# Add your production API keys
```

## 🌐 Deployment

### Vercel Deployment

1. **Connect to Vercel**
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

2. **Environment Variables**
Set the following in Vercel dashboard:
- `NEXT_PUBLIC_APP_ENV`
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_OPENAI_API_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- And other API keys

### GitHub Actions

The project includes automated CI/CD workflows:

- **Development**: Deploys to Vercel preview on `develop` branch
- **Production**: Deploys to Vercel production on `main` branch

## 🎨 Design System

### Cosmic Color Palette
```css
/* Deep Space Colors */
--deep-space: #0A0A0F
--cosmic-navy: #1A1A2E
--stellar-gray: #2D2D3A
--nebula-dark: #16213E

/* Electric Cosmic Colors */
--electric-violet: #7B4FFF
--cosmic-purple: #9D4EDD
--stellar-pink: #FF6EC7
--nebula-pink: #EC4899

/* Celestial Colors */
--celestial-blue: #3FC5FF
--cosmic-cyan: #00D4FF
--stellar-teal: #00F5FF
--aurora-green: #76FF9C

/* Supernova Colors */
--supernova-gold: #FFD75A
--stellar-yellow: #FFE066
--cosmic-orange: #FF8C42
--nebula-red: #FF4757
```

### Components
- **Cosmic Cards**: Glass morphism with nebula borders
- **Cosmic Buttons**: Gradient fills with hover effects
- **Cosmic Inputs**: Transparent backgrounds with glow effects
- **Cosmic Navigation**: Bottom navigation with cosmic styling

## 📱 Mobile Support

### Progressive Web App (PWA)
- **Service Worker**: Offline functionality
- **App Manifest**: Installable web app
- **Push Notifications**: Web push notifications
- **Responsive Design**: Mobile-optimized interface

### Mobile Features
- Touch-friendly navigation
- Swipe gestures
- Mobile-optimized animations
- Responsive cosmic cards

## 🔒 Security

### Data Protection
- **Environment Variables**: Secure API key management
- **HTTPS**: All communications encrypted
- **CORS**: Configured for production domains
- **Rate Limiting**: API rate limiting protection

### Privacy
- **No Data Storage**: No personal data stored permanently
- **Local Storage**: User preferences only
- **GDPR Compliance**: European data protection compliance

## 🧪 Testing

### Test Commands
```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Coverage
- Unit tests for components
- Integration tests for features
- E2E tests for user flows

## 📊 Performance

### Optimization
- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js Image component
- **Bundle Analysis**: Webpack bundle analyzer
- **Lighthouse**: 90+ performance score

### Metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3s

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** - React framework
- **Vercel** - Deployment platform
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

---

## 🌟 **Your Cosmic Journey Awaits!**

**Visit the app**: [http://localhost:8120](http://localhost:8120)

**Production**: [Coming Soon]**

**Built with ❤️ for cosmic exploration and spiritual growth** ✨
