# 🌟 Daily Secrets - Cosmic Guidance App

A comprehensive Flutter-based astrology and spiritual guidance application that provides personalized daily insights, community features, and multi-cultural astrological systems.

## ✨ Features

### 🔮 AI-Powered Daily Guidance
- **Country/Sign Aware Content** - Personalized quotes based on location and zodiac
- **Multi-Language Support** - English, Sinhala, and Tamil integration
- **Long-form Daily Quotes** - Expandable 3-paragraph guidance with reactions
- **Interactive Elements** - Tap to react with emojis (✨😊🙏💖)

### 🌍 Multi-Cultural Astrology Systems
- **Western Zodiac** - Traditional 12-sign system
- **Sri Lankan Astrology** - Cultural adaptations with Sinhala translations
- **Vedic Astrology** - Indian Rashi and Nakshatra system
- **Chinese Zodiac** - 12 animals with Five Elements
- **Compatibility Analysis** - Multi-system relationship insights

### 👥 Community Features
- **Believer Matchmaking** - Connect with like-minded souls
- **Profile Cards** - Zodiac signs, vibe tags, energy levels
- **Connection System** - Request connections with consent
- **Emoji Chat** - Curated positive emojis and stickers

### 📱 Enhanced User Experience
- **Light/Dark Theme** - Smooth transitions with auto-detection
- **Animated Card Borders** - Gradient strokes with slow pan effects
- **Micro-interactions** - Haptic feedback and smooth animations
- **Responsive Design** - Works perfectly on all devices

### 🔔 Notifications & Sharing
- **Daily Secret Alerts** - Personalized guidance notifications
- **WhatsApp Integration** - Primary sharing for Sri Lankan users
- **Multi-platform Sharing** - Instagram, Twitter, Copy, Save
- **Special Day Alerts** - Festival and cosmic event notifications

## 🚀 Getting Started

### Prerequisites
- Flutter SDK (latest stable version)
- Dart SDK
- Web browser for web deployment

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/daily-secrets-app.git
   cd daily-secrets-app
   ```

2. **Install dependencies**
   ```bash
   flutter pub get
   ```

3. **Generate required files**
   ```bash
   flutter packages pub run build_runner build --delete-conflicting-outputs
   ```

4. **Run the app**
   ```bash
   # For web
   flutter run -d web-server --web-port=8080
   
   # For mobile
   flutter run
   ```

### Build for Production

```bash
# Web build
flutter build web

# Android build
flutter build apk --release

# iOS build
flutter build ios --release
```

## 🏗️ Architecture

### Project Structure
```
lib/
├── models/                 # Data models
│   └── user.dart          # User profile model
├── services/              # Business logic
│   ├── database_service.dart
│   └── ai_content_service.dart
├── ui/
│   ├── screens/           # UI screens
│   │   ├── enhanced_home_screen.dart
│   │   ├── community_screen.dart
│   │   ├── notifications_screen.dart
│   │   └── ...
│   └── theme/             # App theming
│       └── app_theme.dart
└── utils/                 # Utility functions
    ├── zodiac_utils.dart
    ├── vedic_zodiac_utils.dart
    ├── chinese_zodiac_utils.dart
    └── sri_lankan_zodiac_utils.dart
```

### Key Components

- **AI Content Service** - Generates personalized daily content
- **Database Service** - Local storage with Hive
- **Theme Service** - Light/dark mode management
- **Zodiac Utils** - Multi-system astrology calculations

## 🌟 Special Features

### Sri Lankan Cultural Integration
- **Sinhala Language Support** - Complete localization
- **Cultural Context** - Traditional Sri Lankan astrology
- **Lucky Elements** - Colors, stones, directions, times
- **Career Guidance** - Sinhala language career advice

### Example: July 25, 1991
- **Western:** Leo ♌ (සිංහ)
- **Sri Lankan:** Kumba ♒ (කුම්භ) - Special case handling
- **Dream Analysis:** Available with philosophical meanings
- **Cultural Context:** Sri Lankan lucky elements and career guidance

## 🎨 Design System

### Color Palette
- **Primary:** Mystical Purple (#DDA0DD)
- **Secondary:** Cosmic Pink (#FFB6C1)
- **Accent:** Soft Blue (#B0E0E6)
- **Background:** Cream (#F5F5DC)
- **Text:** Cosmic Dark (#2C3E50)

### Dark Mode
- **Background:** Dark Blue (#1A1A2E)
- **Surface:** Dark Purple (#16213E)
- **Primary:** Dark Purple (#8B5CF6)
- **Secondary:** Dark Pink (#EC4899)

## 📊 Performance

- **Tree-shaking:** 99.2% font reduction
- **Fast Loading:** Optimized build with minimal assets
- **Smooth Animations:** 60fps transitions and effects
- **Responsive:** Works on all device sizes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Flutter team for the amazing framework
- Hive for local storage
- Material Design for UI components
- Sri Lankan astrology traditions for cultural integration

## 📞 Support

For support, email support@dailysecrets.app or join our Discord community.

---

**Made with ❤️ for the cosmic community** ✨