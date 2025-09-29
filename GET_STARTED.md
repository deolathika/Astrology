# 🚀 Daily Secrets App - Complete Setup Guide

## ✅ **Current Status**
- **Repository**: https://github.com/deolathika/Astrology.git
- **Status**: ✅ All code pushed to GitHub
- **Next Step**: Get the app running locally

## 🔧 **Step-by-Step Setup Process**

### **Step 1: Install Node.js (REQUIRED)**

#### **Download Node.js**
1. **Go to**: https://nodejs.org
2. **Download**: Node.js 18+ (LTS version recommended)
3. **Install**: Follow the installation wizard
4. **Restart**: Your terminal/command prompt after installation

#### **Verify Installation**
```bash
# Open Terminal/Command Prompt and run:
node --version
# Should show: v18.x.x or higher

npm --version
# Should show: v8.x.x or higher
```

### **Step 2: Clone Your Repository**

#### **Open Terminal/Command Prompt**
```bash
# Navigate to your desired directory
cd /path/to/your/projects

# Clone your repository
git clone https://github.com/deolathika/Astrology.git

# Navigate into the project
cd Astrology
```

#### **Verify Repository**
```bash
# Check if all files are present
ls -la

# You should see:
# - src/ directory
# - package.json
# - next.config.js
# - tailwind.config.js
# - prisma/ directory
# - public/ directory
```

### **Step 3: Install Dependencies**

#### **Install All Required Packages**
```bash
# Install all dependencies
npm install

# This will install:
# - Next.js 14, React 18, TypeScript
# - Tailwind CSS, Framer Motion, Radix UI
# - NextAuth.js, Prisma, Firebase
# - OpenAI, Google Gemini, and more
```

#### **Verify Installation**
```bash
# Check if node_modules exists
ls node_modules

# Check package.json scripts
npm run --help
```

### **Step 4: Environment Configuration**

#### **Create Environment File**
```bash
# Copy the production template
cp env.production.example .env.local

# Edit the file
nano .env.local
# or
code .env.local
# or
notepad .env.local
```

#### **Minimal Environment Setup (For Testing)**
```bash
# Create minimal .env.local for basic functionality
cat > .env.local << EOF
NODE_ENV=development
NEXT_PUBLIC_APP_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:8120
NEXT_PUBLIC_APP_NAME="Daily Secrets"
NEXTAUTH_SECRET=your-secret-key-here
EOF
```

#### **Full Environment Setup (For Complete Features)**
```bash
# Copy the full template
cp env.production.example .env.local

# Edit with your API keys:
# - Google OAuth (for authentication)
# - OpenAI API (for AI content)
# - Google Maps API (for location services)
# - Firebase (for notifications)
```

### **Step 5: Start Development Server**

#### **Start the Server**
```bash
# Start development server
npm run dev

# Alternative: Start with hot reload
npm run dev:hot

# Alternative: Start on different port
npm run dev -- -p 3000
```

#### **Expected Output**
```
✓ Ready in 2.3s
✓ Local:        http://localhost:8120
✓ Network:      http://192.168.x.x:8120
```

### **Step 6: Open Your Browser**

#### **Main Application URLs**
- **🏠 Home**: http://localhost:8120
- **📝 Onboarding**: http://localhost:8120/onboarding
- **🔐 Sign In**: http://localhost:8120/auth/signin
- **👤 Profile**: http://localhost:8120/profile
- **🌍 Community**: http://localhost:8120/community
- **💫 Dreams**: http://localhost:8120/dreams
- **💕 Compatibility**: http://localhost:8120/compatibility
- **⭐ Premium**: http://localhost:8120/premium

#### **API Endpoints**
- **🔮 Astrology**: http://localhost:8120/api/astrology/calculate
- **🔢 Numerology**: http://localhost:8120/api/numerology/calculate
- **📅 Today's Guidance**: http://localhost:8120/api/today
- **🔔 Notifications**: http://localhost:8120/api/notifications/send

## 🎯 **Quick Test Commands**

### **Test Server Status**
```bash
# Check if server is running
curl http://localhost:8120

# Should return HTML content
```

### **Test Port Usage**
```bash
# Check what's using port 8120
lsof -i :8120

# Kill process if needed
lsof -ti:8120 | xargs kill -9
```

### **Test Dependencies**
```bash
# Check if all packages are installed
npm list --depth=0

# Check for missing packages
npm audit
```

## 🔧 **Troubleshooting Common Issues**

### **Issue 1: "command not found: npm"**
**Solution:**
1. **Install Node.js** from https://nodejs.org
2. **Restart terminal** after installation
3. **Verify**: `node --version` and `npm --version`

### **Issue 2: Port 8120 already in use**
**Solution:**
```bash
# Kill process using port 8120
lsof -ti:8120 | xargs kill -9

# Or use different port
npm run dev -- -p 3000
# Then visit: http://localhost:3000
```

### **Issue 3: Module not found errors**
**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### **Issue 4: Build errors**
**Solution:**
```bash
# Check TypeScript errors
npm run type-check

# Check linting errors
npm run lint

# Clean build
npm run clean
npm run build
```

### **Issue 5: Environment variables not working**
**Solution:**
```bash
# Check if .env.local exists
ls -la .env.local

# Check environment variables
cat .env.local

# Restart server after changing .env.local
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

## 🎨 **What You'll See in Your App**

### **🌌 Cosmic UI Features**
- ✅ Deep space theme with electric violet colors
- ✅ Smooth animations powered by Framer Motion
- ✅ Responsive design for all devices
- ✅ Dark mode cosmic experience

### **🌍 Multi-Language Support**
- ✅ English, Sinhala, Tamil, Hindi, Chinese
- ✅ Language switcher in the app
- ✅ Localized content and UI

### **🔮 Astrology Systems**
- ✅ Western Zodiac (traditional)
- ✅ Vedic Zodiac (ancient Indian)
- ✅ Chinese Zodiac (year-based)
- ✅ Sri Lankan Zodiac (custom)

### **🔢 Numerology Features**
- ✅ Life Path Numbers
- ✅ Destiny Numbers
- ✅ Soul Urge & Personality
- ✅ Master Numbers (11, 22, 33)

### **🤖 AI-Powered Features**
- ✅ Daily guidance generation
- ✅ Dream interpretation
- ✅ Compatibility analysis
- ✅ Personalized cosmic insights

### **📱 Social Sharing**
- ✅ WhatsApp sharing
- ✅ Instagram stories
- ✅ Twitter posts
- ✅ Facebook sharing
- ✅ Copy link functionality

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
1. **Install Node.js** from https://nodejs.org
2. **Clone the repository**: `git clone https://github.com/deolathika/Astrology.git`
3. **Install dependencies**: `npm install`
4. **Start server**: `npm run dev`
5. **Visit**: http://localhost:8120

**Your Daily Secrets astrology app is complete and ready to guide users on their cosmic journey!** ✨
