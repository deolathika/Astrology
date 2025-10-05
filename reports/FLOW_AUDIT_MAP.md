# Daily Secrets - Frontend Flow Audit Map

## 📊 **SITE MAP & ROUTES**

### **Core Routes**
```
/                           → Home Page (Landing)
/astrology                  → Zodiac System
/numerology                 → Numerology Module
/compatibility              → Compatibility System
/dreams                     → Dream Analysis
/community                  → Community Features
/profile                    → Profile & Settings
/admin                      → Admin Dashboard
```

### **Authentication Routes**
```
/auth/signin                → Sign In
/auth/signup                → Sign Up
/auth/signout               → Sign Out
```

### **User-Specific Routes**
```
/dashboard                  → Guest Dashboard
/premium                    → Premium Dashboard
/admin                      → Admin Dashboard
```

---

## 🔄 **DATA FLOW ANALYSIS**

### **API → Hook → Component → Page Flow**

#### **1. Home Page (`/`)**
- **API Endpoints**: `/api/today`, `/api/guest/insights`
- **Data Hooks**: `useSession()`, `useState()`, `useEffect()`
- **Components**: `HomePage`, `LoginForm`, `Starfield`
- **State Management**: Local state for user session, quotes carousel
- **Role Gating**: Redirects based on user role (admin → /admin, premium → /premium, guest → /dashboard)

#### **2. Astrology Page (`/astrology`)**
- **API Endpoints**: `/api/astro/complete-analysis`, `/api/astro/natal`, `/api/astro/transits`
- **Data Hooks**: `useState()`, `useEffect()`, `useSession()`
- **Components**: `AstrologyPage`, `BirthDataForm`, `AstrologyResult`
- **State Management**: Form data, calculation results, loading states
- **Role Gating**: Full access for all authenticated users

#### **3. Numerology Page (`/numerology`)**
- **API Endpoints**: `/api/user/numerology`, `/api/numerology/enhanced`
- **Data Hooks**: `useState()`, `useEffect()`, `useSession()`
- **Components**: `NumerologyPage`, `NumerologyForm`, `NumerologyResult`
- **State Management**: Form data, calculation results, daily insights
- **Role Gating**: Full access for all authenticated users

#### **4. Compatibility Page (`/compatibility`)**
- **API Endpoints**: `/api/user/compatibility`
- **Data Hooks**: `useState()`, `useEffect()`, `useSession()`
- **Components**: `CompatibilityPage`, `PersonDataForm`, `CompatibilityResult`
- **State Management**: Two-person form data, compatibility scores
- **Role Gating**: Full access for all authenticated users

#### **5. Dreams Page (`/dreams`)**
- **API Endpoints**: `/api/dreams/analyze`, `/api/dreams/journal`
- **Data Hooks**: `useState()`, `useEffect()`, `useSession()`
- **Components**: `DreamsPage`, `DreamInput`, `DreamJournal`
- **State Management**: Dream entries, analysis results, journal list
- **Role Gating**: Premium feature with teaser for free users

#### **6. Community Page (`/community`)**
- **API Endpoints**: `/api/community/chat`, `/api/community/posts`
- **Data Hooks**: `useState()`, `useEffect()`, `useSession()`
- **Components**: `CommunityPage`, `CommunityPost`, `EmojiChat`
- **State Management**: Posts, messages, user interactions
- **Role Gating**: Premium feature with teaser for free users

#### **7. Profile Page (`/profile`)**
- **API Endpoints**: `/api/user/profile`, `/api/user/settings`
- **Data Hooks**: `useState()`, `useEffect()`, `useSession()`
- **Components**: `ProfilePage`, `ProfileForm`, `SettingsPanel`
- **State Management**: User profile data, settings, theme preferences
- **Role Gating**: Full access for all authenticated users

#### **8. Admin Page (`/admin`)**
- **API Endpoints**: `/api/admin/stats`, `/api/admin/users`, `/api/admin/theme`
- **Data Hooks**: `useState()`, `useEffect()`, `useSession()`
- **Components**: `AdminPage`, `AdminStats`, `ThemeEditor`
- **State Management**: Admin data, user management, theme settings
- **Role Gating**: Admin only access

---

## 👥 **ROLE-BASED ACCESS MATRIX**

### **Guest Users**
- ✅ **Home Page**: Full access with cosmic theme
- ✅ **Astrology**: Basic calculations, limited features
- ✅ **Numerology**: Basic calculations, limited features
- ✅ **Compatibility**: Basic compatibility, limited insights
- ❌ **Dreams**: Teaser only, "Unlock Premium" prompt
- ❌ **Community**: Teaser only, "Unlock Premium" prompt
- ✅ **Profile**: Basic profile management
- ❌ **Admin**: No access

### **Premium Users**
- ✅ **Home Page**: Full access with personalized content
- ✅ **Astrology**: Full access to all systems
- ✅ **Numerology**: Full access to all calculations
- ✅ **Compatibility**: Full access to all insights
- ✅ **Dreams**: Full access to AI analysis
- ✅ **Community**: Full access to all features
- ✅ **Profile**: Full access to all settings
- ❌ **Admin**: No access

### **Admin Users**
- ✅ **All Pages**: Full access to all features
- ✅ **Admin Dashboard**: Full access to system management
- ✅ **Theme Editor**: Full access to theme customization
- ✅ **User Management**: Full access to user administration

---

## 🚨 **MISSING STATES & BROKEN TRANSITIONS**

### **Loading States**
- ❌ **Home Page**: No loading state for daily insights
- ❌ **Astrology**: No loading state for calculations
- ❌ **Numerology**: No loading state for calculations
- ❌ **Compatibility**: No loading state for compatibility checks
- ❌ **Dreams**: No loading state for AI analysis
- ❌ **Community**: No loading state for posts/messages
- ❌ **Profile**: No loading state for profile updates
- ❌ **Admin**: No loading state for admin data

### **Empty States**
- ❌ **Home Page**: No empty state for missing daily insights
- ❌ **Astrology**: No empty state for missing birth data
- ❌ **Numerology**: No empty state for missing calculations
- ❌ **Compatibility**: No empty state for missing partner data
- ❌ **Dreams**: No empty state for empty dream journal
- ❌ **Community**: No empty state for no posts/messages
- ❌ **Profile**: No empty state for missing profile data
- ❌ **Admin**: No empty state for missing admin data

### **Error States**
- ❌ **Home Page**: No error state for failed API calls
- ❌ **Astrology**: No error state for calculation failures
- ❌ **Numerology**: No error state for calculation failures
- ❌ **Compatibility**: No error state for compatibility failures
- ❌ **Dreams**: No error state for AI analysis failures
- ❌ **Community**: No error state for failed posts/messages
- ❌ **Profile**: No error state for profile update failures
- ❌ **Admin**: No error state for admin operation failures

### **Navigation Issues**
- ❌ **AppShell**: Not consistently wrapping all pages
- ❌ **Breadcrumbs**: Not showing on all pages
- ❌ **Active Route**: Not highlighting current page
- ❌ **Back Navigation**: Not preserving scroll position
- ❌ **Keyboard Navigation**: Not fully accessible

### **Role Gating Issues**
- ❌ **Premium Teasers**: Not consistently implemented
- ❌ **Feature Gates**: Not preventing data fetch for locked features
- ❌ **Upgrade Prompts**: Not showing appropriate CTAs
- ❌ **Content Blurring**: Not consistently applied

### **Form Validation**
- ❌ **Birth Data**: No validation for date/time/place
- ❌ **Name Input**: No validation for numerology
- ❌ **Partner Data**: No validation for compatibility
- ❌ **Dream Input**: No validation for dream content
- ❌ **Profile Data**: No validation for user information

### **API Integration Issues**
- ❌ **Error Handling**: No consistent error handling
- ❌ **Retry Logic**: No retry mechanism for failed requests
- ❌ **Loading Indicators**: No loading states for API calls
- ❌ **Data Caching**: No caching for repeated requests
- ❌ **Offline Support**: No offline functionality

---

## 🎯 **COMPONENT DEPENDENCIES**

### **Shared Components**
- ✅ **CosmicCard**: Used across all pages
- ✅ **CosmicButton**: Used across all pages
- ✅ **CosmicInput**: Used across all pages
- ✅ **UserFlowRouter**: Used for role-based routing
- ✅ **FeatureGate**: Used for premium feature gating

### **Page-Specific Components**
- ❌ **BirthDataForm**: Not reusable across astrology/compatibility
- ❌ **NumerologyForm**: Not reusable across numerology
- ❌ **DreamInput**: Not reusable across dreams
- ❌ **CommunityPost**: Not reusable across community
- ❌ **ProfileForm**: Not reusable across profile

### **Layout Components**
- ❌ **AppShell**: Not consistently used
- ❌ **Navbar**: Not consistently used
- ❌ **Sidebar**: Not consistently used
- ❌ **Breadcrumbs**: Not consistently used
- ❌ **Footer**: Not consistently used

---

## 🔧 **RECOMMENDED FIXES**

### **1. Navigation & Shell**
- Implement consistent AppShell across all pages
- Add proper breadcrumb navigation
- Highlight active routes
- Preserve scroll position on back navigation
- Add keyboard navigation support

### **2. Role Gating & Teasers**
- Implement consistent `withTeaser()` HOC
- Add proper premium feature gating
- Show appropriate upgrade prompts
- Prevent data fetch for locked features
- Apply consistent content blurring

### **3. States & Guards**
- Add Loading states for all API calls
- Add Empty states for missing data
- Add Error states for failed operations
- Implement retry logic for failed requests
- Add form validation for all inputs

### **4. Page-by-Page Fixes**
- **Home**: Add loading state for daily insights
- **Astrology**: Add loading state for calculations
- **Numerology**: Add loading state for calculations
- **Compatibility**: Add loading state for compatibility checks
- **Dreams**: Add loading state for AI analysis
- **Community**: Add loading state for posts/messages
- **Profile**: Add loading state for profile updates
- **Admin**: Add loading state for admin data

### **5. i18n & Accessibility**
- Implement consistent i18n across all pages
- Add proper ARIA labels and roles
- Ensure keyboard navigation support
- Add focus management for modals
- Implement proper color contrast

### **6. Performance**
- Add lazy loading for heavy components
- Implement proper caching for API calls
- Add preloading for critical resources
- Optimize bundle size
- Add service worker for offline support

---

## 📋 **NEXT STEPS**

1. **Implement AppShell** across all pages
2. **Add Loading/Empty/Error states** for all data-driven components
3. **Implement consistent role gating** with teasers
4. **Add form validation** for all inputs
5. **Implement proper error handling** for all API calls
6. **Add accessibility features** for all components
7. **Implement i18n** with missing keys report
8. **Add performance optimizations** for all pages
9. **Test all user flows** across different roles
10. **Generate comprehensive test coverage**

---

## 🎯 **ACCEPTANCE CRITERIA**

- ✅ All routes reachable from AppShell
- ✅ Breadcrumbs correct on all pages
- ✅ Role gating/teasers consistent
- ✅ No premium data leaks
- ✅ Each page has Loading/Empty/Error states
- ✅ Profile edits persist and reflect in header
- ✅ Admin theme page operational
- ✅ i18n scaffolded with missing-keys report
- ✅ Lighthouse: LCP ≤ 2s, CLS ≤ 0.05
- ✅ Basic a11y checks pass

---

*Generated on: ${new Date().toISOString()}*
*Total Routes: 8*
*Total Components: 25+*
*Total API Endpoints: 20+*
*Missing States: 24*
*Broken Transitions: 12*
