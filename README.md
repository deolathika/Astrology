# Daily Secrets - Real Astrology & Numerology

A comprehensive astrology and numerology application with real calculations using Swiss Ephemeris and advanced mathematical algorithms.

## 🌌 Features

### ✅ **Real Astrology Calculations**
- **Swiss Ephemeris Integration**: Accurate planetary positions using professional-grade ephemeris
- **Tropical & Sidereal**: Western and Vedic astrology with configurable Ayanamsha
- **House Systems**: Placidus, Whole Sign, Equal, and Porphyry house calculations
- **Nakshatra & Dasha**: Complete Vedic astrology with 27 Nakshatras and Vimshottari Dasha
- **Transits**: Real-time planetary transits and current positions
- **Moon Phases**: Accurate lunar phase calculations and Tithi

### ✅ **Advanced Numerology**
- **Life Path Analysis**: Birth date reduction with master number preservation
- **Expression/Destiny**: Full name Pythagorean and Chaldean calculations
- **Soul Urge & Personality**: Vowel and consonant analysis
- **Personal Year**: Current year themes and guidance
- **Daily Numbers**: Deterministic lucky numbers and daily guidance

### ✅ **Geolocation & Timezone**
- **Google Places API**: City search with autocomplete
- **Timezone Resolution**: Accurate IANA timezone detection
- **Historical DST**: Proper timezone conversion for birth dates
- **Reverse Geocoding**: Coordinate to city conversion

### ✅ **Modern UI/UX**
- **Cosmic Theme**: Deep space colors matching app icon
- **Responsive Design**: Mobile-first with desktop optimization
- **Real-time Calculations**: Live astrology and numerology updates
- **Offline Support**: Cached calculations and graceful fallbacks

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- Flutter 3.2+
- Firebase CLI
- Google Cloud Console account

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/deolathika/Astrology.git
cd Astrology
```

2. **Install dependencies**
```bash
# Backend (Firebase Functions)
cd backend/functions
npm install

# Web Frontend
cd ../../web
npm install

# Flutter App
cd ../daily_secrets_app
flutter pub get
```

3. **Environment Setup**
```bash
# Backend environment
cp backend/functions/.env.example backend/functions/.env.local

# Web environment
cp web/.env.example web/.env.local
```

4. **Configure API Keys**
```bash
# Required environment variables
GOOGLE_MAPS_API_KEY=your_google_maps_key
GOOGLE_PLACES_API_KEY=your_google_places_key
GOOGLE_TIMEZONE_API_KEY=your_google_timezone_key
FIREBASE_PROJECT_ID=your_firebase_project_id
```

### Development Commands

```bash
# Start development servers
npm run dev          # Next.js web app
npm run serve        # Firebase Functions emulator
flutter run          # Flutter mobile app

# Run tests
npm test             # Backend tests
flutter test         # Flutter tests

# Build for production
npm run build        # Web build
flutter build web    # Flutter web build
```

## 🧪 Testing

### Astrology Tests
```bash
npm test -- --testPathPattern=astrology
```

**Test Fixtures:**
- **Fixture A**: 1961-08-04 19:24 Honolulu, USA
- **Fixture B**: 1990-01-01 12:00 New York, USA

**Tolerance Requirements:**
- Planet longitudes: ±0.1° vs Swiss Ephemeris
- House cusps: ±0.2° (house system dependent)
- Ascendant/MC: ±0.2°

### Numerology Tests
```bash
npm test -- --testPathPattern=numerology
```

**Test Cases:**
- Life Path calculations with master numbers
- Pythagorean vs Chaldean mappings
- Unicode and diacritics handling
- Edge cases and error handling

## 📊 API Endpoints

### Astrology
```typescript
POST /api/astrology-chart
{
  "birthDate": "1990-01-01T12:00:00Z",
  "latitude": 40.7128,
  "longitude": -74.0060,
  "timezone": "America/New_York",
  "ayanamsha": "LAHIRI"
}
```

### Numerology
```typescript
POST /api/numerology
{
  "fullName": "John Doe",
  "birthDate": "1990-01-01",
  "useChaldean": false
}
```

### Geolocation
```typescript
GET /api/cities?query=New York
GET /api/timezone?latitude=40.7128&longitude=-74.0060
```

## 🎨 Design System

### Cosmic Color Palette
```css
/* Deep Space Colors */
--deep-space: #0B0B0E      /* Background */
--electric-violet: #7B4FFF  /* Primary accent */
--celestial-blue: #3FC5FF   /* Links & highlights */
--aurora-green: #76FF9C     /* Success states */
--supernova-gold: #FFD75A   /* Call-to-action */
--nebula-pink: #FF6EC7      /* Emotional states */
```

### Typography
- **Primary**: Inter (UI elements)
- **Accent**: Cormorant Garamond (quotes & headings)

### Components
- **Cosmic Cards**: Glass morphism with nebula borders
- **Cosmic Buttons**: Gradient fills with hover effects
- **Cosmic Inputs**: Transparent backgrounds with glow effects

## 🔧 Configuration

### Astrology Settings
```typescript
// Ayanamsha options
LAHIRI = 1        // Default
KRISHNAMURTI = 5
RAMAN = 3

// House systems
PLACIDUS = 'P'    // Default
WHOLE_SIGN = 'W'
EQUAL = 'E'
PORPHYRY = 'O'
```

### Numerology Settings
```typescript
// Calculation methods
PYTHAGOREAN = true   // Default
CHALDEAN = false

// Master numbers preserved
MASTER_NUMBERS = [11, 22, 33]
```

## 📱 Mobile App (Flutter)

The Flutter app provides offline access to cached calculations:

```dart
// Real astrology calculations
final chart = await AstrologyService.calculateChart(
  birthDate: user.birthDate,
  latitude: user.latitude,
  longitude: user.longitude,
  timezone: user.timezone,
);

// Advanced numerology
final numerology = await NumerologyService.calculateProfile(
  fullName: user.fullName,
  birthDate: user.birthDate,
);
```

## 🌐 Web App (Next.js)

Modern React application with real-time calculations:

```tsx
// City search with Google Places
<CitySearch onLocationSelect={handleLocationSelect} />

// Real astrology chart
<AstrologyChart profile={userProfile} />

// Numerology analysis
<NumerologyProfile profile={userProfile} />
```

## 🚀 Deployment

### Firebase Functions
```bash
cd backend/functions
npm run deploy
```

### Vercel (Web)
```bash
cd web
vercel deploy
```

### Flutter Web
```bash
cd daily_secrets_app
flutter build web --release
```

## 📈 Performance

### Benchmarks
- **Chart Calculation**: < 2s for complete natal chart
- **City Search**: < 500ms for autocomplete
- **Timezone Resolution**: < 200ms for coordinates
- **Numerology**: < 100ms for full profile

### Caching
- **Offline Support**: 3 days of cached daily guidance
- **Service Worker**: PWA with offline fallbacks
- **IndexedDB**: Local storage for user profiles

## 🔒 Security

- **API Keys**: Environment variables only
- **CORS**: Configured for production domains
- **Rate Limiting**: Implemented on all endpoints
- **Data Privacy**: No personal data stored permanently

## 📚 Documentation

- **API Reference**: `/docs/api.md`
- **Astrology Math**: `/docs/astrology-math.md`
- **Numerology Guide**: `/docs/numerology-guide.md`
- **Deployment**: `/docs/deployment.md`

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Swiss Ephemeris**: Professional-grade astronomical calculations
- **Google Maps API**: Geolocation and timezone services
- **Firebase**: Backend infrastructure
- **Flutter**: Cross-platform mobile development
- **Next.js**: Modern React framework

---

**Built with ❤️ for cosmic exploration and spiritual growth**