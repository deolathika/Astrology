# 🌟 Daily Secrets - Real Astrology & Numerology App

A comprehensive astrology and numerology application built with **Next.js 14**, **React 18**, and **TypeScript**, featuring a cosmic-themed UI with multi-language support.

## ✨ Features

### 🌌 **Cosmic UI/UX**
- **Deep Space Theme**: Electric violet, celestial blue, supernova gold color palette
- **Smooth Animations**: Framer Motion powered cosmic animations
- **Responsive Design**: Mobile-first with desktop optimization
- **Dark Mode**: Immersive cosmic experience
- **Glassmorphism Design**: Modern translucent UI elements
- **Starfield Background**: Dynamic animated star background

### 🌍 **Multi-Language Support**
- **English** - Complete translations
- **සිංහල (Sinhala)** - Full Sinhala translations
- **தமிழ் (Tamil)** - Complete Tamil translations
- **हिन्दी (Hindi)** - Full Hindi translations
- **中文 (Chinese)** - Complete Chinese translations

### 🔮 **Advanced Astrology Systems**
- **Western Zodiac** - Traditional astrology with birth charts
- **Vedic Zodiac** - Ancient Indian astrology with detailed analysis
- **Chinese Zodiac** - Year-based calculations with element analysis
- **Sri Lankan Zodiac** - Custom implementation with Porondam
- **Hellenistic Astrology** - Ancient Greek methods
- **Medieval Astrology** - Historical techniques
- **Sidereal Astrology** - Star-based calculations
- **Interactive Birth Charts** - Clickable planetary positions
- **Transit Analysis** - Real-time planetary movements
- **Synastry Charts** - Relationship compatibility
- **Electional Astrology** - Optimal timing selection

### 🔢 **Advanced Numerology Systems**
- **Pythagorean Numerology** - Western number system
- **Chaldean Numerology** - Ancient Babylonian methods
- **Kabbalistic Numerology** - Hebrew letter values
- **Chinese Numerology** - Traditional Chinese system
- **Indian Vedic Numerology** - Ancient Indian calculations
- **Tamil South Indian System** - Regional numerology
- **Arabic Numerology** - Islamic number system
- **Life Path Numbers** - Birth date calculations
- **Destiny Numbers** - Full name analysis
- **Soul Urge & Personality** - Vowel/consonant analysis
- **Master Numbers** - 11, 22, 33 support
- **Karmic Debt Numbers** - Past life analysis
- **Personal Year/Month/Day** - Time-based calculations
- **Business Name Analysis** - Company numerology
- **Address Energy** - Location numerology
- **Phone Number Analysis** - Communication numerology

### 🎯 **New User Experience Features**
- **Welcome Page** - Beautiful onboarding with cosmic theme
- **Personal Information Collection** - Inline 3-step guided process
- **Global Location Database** - 300+ cities with coordinates
- **Automatic Zodiac Calculation** - Real-time sign detection
- **Personalized Homepage** - User-specific content and insights
- **Dream Analysis** - AI-powered dream interpretation
- **Compatibility Analysis** - Advanced relationship matching
- **Daily Insights Dashboard** - Personalized cosmic guidance
- **Community Features** - User profiles and interactions

### 🚀 **Modern Tech Stack**
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **React Context** - Global state management
- **Local Storage** - Data persistence
- **AI Integration** - OpenAI, Gemini, WebLLM
- **Vercel** - Production deployment

## 📱 Application Structure

### 🏠 **Core Pages**
- **Welcome Page** (`/welcome`) - Onboarding and introduction
- **Personal Information** (`/personal-info`) - Detailed user data collection
- **Homepage** (`/`) - Personalized dashboard with cosmic insights
- **Astrology** (`/astrology`) - Advanced astrology systems and charts
- **Numerology** (`/numerology`) - Multiple numerology calculation methods
- **Compatibility** (`/compatibility`) - Relationship analysis and matching
- **Dreams** (`/dreams`) - Dream analysis and interpretation
- **Community** (`/community`) - User interactions and sharing
- **Profile** (`/profile`) - User profile and settings
- **Insights** (`/insights`) - Daily cosmic guidance and insights

### 🔧 **Technical Architecture**
- **App Router** - Next.js 14 file-based routing
- **Component Library** - Reusable UI components
- **Context Providers** - Global state management
- **API Routes** - Server-side functionality
- **Middleware** - Request processing
- **Type Definitions** - TypeScript interfaces

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
| `npm run dev` | Start development server (port 3001) |
| `npm run dev:hot` | Start with hot reload |
| `npm run build` | Build for production |
| `npm run build:dev` | Build for development |
| `npm run build:prod` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript checks |
| `npm run test` | Run tests |
| `npm run clean` | Clean build artifacts |

### 🎯 **Development Features**
- **Hot Reload** - Instant updates during development
- **TypeScript** - Full type safety and IntelliSense
- **ESLint** - Code quality and consistency
- **Prettier** - Automatic code formatting
- **Husky** - Git hooks for quality assurance
- **Jest** - Unit and integration testing
- **Playwright** - End-to-end testing

### Environment Configuration

#### Development Environment (`.env.local`)
```env
NODE_ENV=development
NEXT_PUBLIC_APP_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3001
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# AI Integration
OPENAI_API_KEY=your_openai_api_key
GOOGLE_GEMINI_API_KEY=your_gemini_api_key

# Google Maps (Optional)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key

# Database (Optional)
DATABASE_URL=your_database_url

# Authentication (Optional)
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3001
```

#### Production Environment
```env
NODE_ENV=production
NEXT_PUBLIC_APP_ENV=production
NEXT_PUBLIC_APP_URL=https://daily-secrets-app.vercel.app
NEXT_PUBLIC_API_URL=https://daily-secrets-api.vercel.app/api

# AI Integration
OPENAI_API_KEY=your_production_openai_key
GOOGLE_GEMINI_API_KEY=your_production_gemini_key

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_production_google_maps_key

# Database
DATABASE_URL=your_production_database_url

# Authentication
NEXTAUTH_SECRET=your_production_nextauth_secret
NEXTAUTH_URL=https://daily-secrets-app.vercel.app
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

### 🚀 **Quick Access**
- **Development**: [http://localhost:3001](http://localhost:3001)
- **Welcome Page**: [http://localhost:3001/welcome](http://localhost:3001/welcome)
- **Personal Info**: [http://localhost:3001/personal-info](http://localhost:3001/personal-info)
- **Astrology**: [http://localhost:3001/astrology](http://localhost:3001/astrology)
- **Numerology**: [http://localhost:3001/numerology](http://localhost:3001/numerology)
- **Dreams**: [http://localhost:3001/dreams](http://localhost:3001/dreams)

### 🌐 **Production URLs**
- **Staging**: [Coming Soon]
- **Production**: [Coming Soon]

### 📱 **Mobile Support**
- **Progressive Web App** - Install on mobile devices
- **Responsive Design** - Optimized for all screen sizes
- **Touch Gestures** - Swipe and tap interactions
- **Offline Support** - Works without internet connection

**Built with ❤️ for cosmic exploration and spiritual growth** ✨
