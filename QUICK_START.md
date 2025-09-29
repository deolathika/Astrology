# 🚀 Daily Secrets App - Quick Start Guide

## ✅ **GitHub Repository Status**
- **Repository**: https://github.com/deolathika/Astrology.git
- **Status**: ✅ All changes pushed successfully
- **Latest Commit**: Complete app with all features

## 🔧 **Get Your App Running (Step-by-Step)**

### **Step 1: Install Node.js**
```bash
# Download and install Node.js 18+ from:
# https://nodejs.org/en/download/

# After installation, verify:
node --version  # Should show v18+ or higher
npm --version   # Should show v8+ or higher
```

### **Step 2: Clone and Setup**
```bash
# Open Terminal/Command Prompt and run:
git clone https://github.com/deolathika/Astrology.git
cd Astrology

# Install all dependencies
npm install
```

### **Step 3: Environment Setup**
```bash
# Copy environment template
cp env.production.example .env.local

# Edit the file with your API keys (optional for basic functionality)
nano .env.local
# or
code .env.local
```

### **Step 4: Start Development Server**
```bash
# Start the development server
npm run dev

# The server will start on http://localhost:8120
```

## 🌐 **Working URLs (Once Server is Running)**

### **Main Application URLs**
- **🏠 Home**: http://localhost:8120
- **📝 Onboarding**: http://localhost:8120/onboarding
- **🔐 Sign In**: http://localhost:8120/auth/signin
- **👤 Profile**: http://localhost:8120/profile
- **🌍 Community**: http://localhost:8120/community
- **💫 Dreams**: http://localhost:8120/dreams
- **💕 Compatibility**: http://localhost:8120/compatibility
- **⭐ Premium**: http://localhost:8120/premium

### **API Endpoints**
- **🔮 Astrology**: http://localhost:8120/api/astrology/calculate
- **🔢 Numerology**: http://localhost:8120/api/numerology/calculate
- **📅 Today's Guidance**: http://localhost:8120/api/today
- **🔔 Notifications**: http://localhost:8120/api/notifications/send

## 🎯 **Quick Test (Minimal Setup)**

If you want to test the app quickly without API keys:

```bash
# 1. Create minimal environment file
echo "NODE_ENV=development" > .env.local
echo "NEXT_PUBLIC_APP_URL=http://localhost:8120" >> .env.local
echo "NEXTAUTH_SECRET=your-secret-key-here" >> .env.local

# 2. Start server
npm run dev
```

**Note**: Some features (AI, authentication, maps) won't work without proper API keys, but the basic app will load and show the cosmic UI.

## 🔧 **Troubleshooting**

### **If you get "command not found: npm"**
1. **Install Node.js** from https://nodejs.org
2. **Restart your terminal** after installation
3. **Verify installation**: `node --version` and `npm --version`

### **If port 8120 is already in use**
```bash
# Kill process using port 8120
lsof -ti:8120 | xargs kill -9

# Or use different port
npm run dev -- -p 3000
# Then visit: http://localhost:3000
```

### **If you get module errors**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📱 **Mobile Testing**

### **Local Network Access**
```bash
# Find your IP address
ifconfig | grep "inet " | grep -v 127.0.0.1

# Access from mobile: http://[your-ip]:8120
# Example: http://192.168.1.100:8120
```

### **PWA Features**
- **Install**: Add to home screen on mobile
- **Offline**: Works without internet
- **Push Notifications**: Real-time updates
- **Responsive**: Optimized for all screen sizes

## 🎨 **App Features You'll See**

### **🌌 Cosmic UI**
- Deep space theme with electric violet colors
- Smooth animations powered by Framer Motion
- Responsive design for all devices
- Dark mode cosmic experience

### **🌍 Multi-Language Support**
- English, Sinhala, Tamil, Hindi, Chinese
- Language switcher in the app
- Localized content and UI

### **🔮 Astrology Systems**
- Western Zodiac (traditional)
- Vedic Zodiac (ancient Indian)
- Chinese Zodiac (year-based)
- Sri Lankan Zodiac (custom)

### **🔢 Numerology Features**
- Life Path Numbers
- Destiny Numbers
- Soul Urge & Personality
- Master Numbers (11, 22, 33)

### **🤖 AI-Powered Features**
- Daily guidance generation
- Dream interpretation
- Compatibility analysis
- Personalized cosmic insights

### **📱 Social Sharing**
- WhatsApp sharing
- Instagram stories
- Twitter posts
- Facebook sharing
- Copy link functionality

## 🚀 **Production Deployment**

### **Vercel Deployment (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### **Environment Variables for Production**
Set these in your Vercel dashboard:
- `NEXT_PUBLIC_APP_URL`
- `NEXTAUTH_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `OPENAI_API_KEY`
- `GEMINI_API_KEY`
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

## 🎉 **Success Checklist**

- [ ] Node.js 18+ installed
- [ ] Repository cloned successfully
- [ ] Dependencies installed (`npm install`)
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
- **GitHub Repository**: https://github.com/deolathika/Astrology.git
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Vercel Docs**: https://vercel.com/docs

---

## 🌟 **Your Cosmic App is Ready!**

**Repository**: https://github.com/deolathika/Astrology.git
**Local URL**: http://localhost:8120 (after running `npm run dev`)
**Status**: ✅ All components implemented and ready for development

**Next Steps**: 
1. Install Node.js from https://nodejs.org
2. Clone the repository
3. Run `npm install`
4. Run `npm run dev`
5. Visit http://localhost:8120

**Your Daily Secrets astrology app is complete and ready to guide users on their cosmic journey!** ✨