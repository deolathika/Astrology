# 🚀 Daily Secrets App - Complete Setup Guide

## ✅ **GitHub Repository Status**
- **Repository**: https://github.com/deolathika/Astrology.git
- **Status**: ✅ All changes pushed successfully
- **Latest Commit**: Complete app with authentication, AI services, and social sharing

## 🔧 **Environment Setup Instructions**

### **1. Prerequisites Installation**

#### **Install Node.js (Required)**
```bash
# Download and install Node.js 18+ from:
# https://nodejs.org/en/download/

# Verify installation
node --version  # Should show v18+ or higher
npm --version   # Should show v8+ or higher
```

#### **Install Git (if not already installed)**
```bash
# macOS (using Homebrew)
brew install git

# Or download from: https://git-scm.com/downloads
```

### **2. Clone and Setup Project**

```bash
# Clone the repository
git clone https://github.com/deolathika/Astrology.git
cd Astrology

# Install all dependencies
npm install

# This will install all required packages:
# - Next.js 14, React 18, TypeScript
# - Tailwind CSS, Framer Motion, Radix UI
# - NextAuth.js, Prisma, Firebase
# - OpenAI, Google Gemini, and more
```

### **3. Environment Configuration**

#### **Copy Environment Template**
```bash
# Copy the production environment template
cp env.production.example .env.local

# Edit the file with your API keys
nano .env.local
# or
code .env.local
```

#### **Required Environment Variables**

**🔑 Essential API Keys (Get these first):**

1. **Google OAuth** (for authentication)
   - Go to: https://console.developers.google.com/
   - Create OAuth 2.0 credentials
   - Add `http://localhost:8120` to authorized origins

2. **OpenAI API** (for AI content generation)
   - Go to: https://platform.openai.com/api-keys
   - Create new API key

3. **Google Gemini API** (alternative AI service)
   - Go to: https://makersuite.google.com/app/apikey
   - Create new API key

4. **Google Maps API** (for location services)
   - Go to: https://console.cloud.google.com/
   - Enable Maps JavaScript API
   - Create API key

5. **Firebase** (for push notifications)
   - Go to: https://console.firebase.google.com/
   - Create new project
   - Enable Cloud Messaging

#### **Environment File Template**
```env
# Application
NODE_ENV=development
NEXT_PUBLIC_APP_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:8120
NEXT_PUBLIC_APP_NAME="Daily Secrets"

# Database (Optional for development)
DATABASE_URL="postgresql://user:password@host:port/database?schema=public"

# NextAuth.js
NEXTAUTH_URL=http://localhost:8120
NEXTAUTH_SECRET=your-secret-key-here

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Email Server (Optional)
EMAIL_SERVER=smtp://user:password@smtp.example.com:587
EMAIL_FROM=noreply@dailysecrets.com

# AI Services
OPENAI_API_KEY=your-openai-api-key
GEMINI_API_KEY=your-gemini-api-key

# Firebase (Optional)
FIREBASE_SERVER_KEY=your-firebase-server-key
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key

# Stripe (Optional for payments)
STRIPE_SECRET_KEY=your-stripe-secret-key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key

# Analytics (Optional)
SENTRY_DSN=your-sentry-dsn
```

### **4. Start Development Server**

```bash
# Start the development server
npm run dev

# Alternative: Start with hot reload
npm run dev:hot

# Alternative: Start on different port
npm run dev -- -p 3000
```

### **5. Verify Installation**

#### **Check Server Status**
```bash
# Check if server is running
curl http://localhost:8120

# Should return HTTP 200 with HTML content
```

#### **Open in Browser**
- **Main App**: http://localhost:8120
- **Onboarding**: http://localhost:8120/onboarding
- **Sign In**: http://localhost:8120/auth/signin

## 🎯 **Quick Start (Minimal Setup)**

If you want to get started quickly without all API keys:

```bash
# 1. Clone and install
git clone https://github.com/deolathika/Astrology.git
cd Astrology
npm install

# 2. Create minimal .env.local
echo "NODE_ENV=development" > .env.local
echo "NEXT_PUBLIC_APP_URL=http://localhost:8120" >> .env.local
echo "NEXTAUTH_SECRET=your-secret-key-here" >> .env.local

# 3. Start server
npm run dev
```

**Note**: Some features (AI, authentication, maps) won't work without proper API keys, but the basic app will load.

## 🔧 **Troubleshooting**

### **Common Issues**

#### **"command not found: npm"**
```bash
# Install Node.js from https://nodejs.org
# Restart terminal after installation
```

#### **Port 8120 already in use**
```bash
# Kill process using port 8120
lsof -ti:8120 | xargs kill -9

# Or use different port
npm run dev -- -p 3000
```

#### **Module not found errors**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### **Build errors**
```bash
# Check TypeScript errors
npm run type-check

# Check linting errors
npm run lint

# Clean build
npm run clean
npm run build
```

### **Development Commands**

```bash
# Development
npm run dev          # Start dev server
npm run dev:hot      # Start with hot reload
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
npm run test         # Run tests
npm run clean        # Clean build artifacts

# Database (if using Prisma)
npx prisma generate  # Generate Prisma client
npx prisma db push   # Push schema to database
npx prisma studio   # Open database GUI
```

## 🌐 **Production Deployment**

### **Vercel Deployment (Recommended)**

1. **Connect to Vercel**
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

2. **Set Environment Variables in Vercel Dashboard**
   - Go to your project in Vercel dashboard
   - Navigate to Settings > Environment Variables
   - Add all your API keys from `.env.local`

### **Other Deployment Options**

- **Netlify**: Connect GitHub repo and deploy
- **Railway**: Deploy with database included
- **DigitalOcean**: VPS deployment
- **AWS**: EC2 or Lambda deployment

## 📱 **Mobile Testing**

### **PWA Features**
- **Install**: Add to home screen on mobile
- **Offline**: Works without internet
- **Push Notifications**: Real-time updates
- **Responsive**: Optimized for all screen sizes

### **Mobile URLs**
- **Local Network**: http://[your-ip]:8120
- **Production**: https://your-domain.com

## 🎉 **Success Checklist**

- [ ] Node.js 18+ installed
- [ ] Repository cloned successfully
- [ ] Dependencies installed (`npm install`)
- [ ] Environment variables configured
- [ ] Development server running (`npm run dev`)
- [ ] App accessible at http://localhost:8120
- [ ] Onboarding flow working
- [ ] All features functional

## 🆘 **Need Help?**

### **Common Solutions**
1. **Restart terminal** after installing Node.js
2. **Clear cache**: `npm run clean && npm install`
3. **Check ports**: `lsof -i :8120`
4. **Verify Node version**: `node --version`

### **Support Resources**
- **GitHub Issues**: https://github.com/deolathika/Astrology/issues
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Vercel Docs**: https://vercel.com/docs

---

## 🌟 **Your Cosmic App is Ready!**

**Repository**: https://github.com/deolathika/Astrology.git
**Local URL**: http://localhost:8120
**Status**: ✅ All components implemented and ready for development

**Next Steps**: Add your API keys and start building your cosmic astrology empire! ✨
