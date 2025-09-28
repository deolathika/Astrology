import 'package:flutter/material.dart';

class AppTheme {
  // 🌌 COSMIC COLOR PALETTE - GALACTIC THEME 🌌
  
  // Deep Space Colors
  static const Color deepSpaceBlack = Color(0xFF0A0A0F);     // Deepest space
  static const Color cosmicNavy = Color(0xFF1A1A2E);         // Space navy
  static const Color stellarGray = Color(0xFF2D2D3A);        // Stellar gray
  static const Color nebulaDark = Color(0xFF16213E);          // Nebula dark
  
  // Electric Cosmic Colors
  static const Color electricViolet = Color(0xFF7B4FFF);      // Electric violet
  static const Color cosmicPurple = Color(0xFF9D4EDD);        // Cosmic purple
  static const Color stellarPink = Color(0xFFFF6EC7);          // Stellar pink
  static const Color nebulaPink = Color(0xFFEC4899);           // Nebula pink
  
  // Celestial Colors
  static const Color celestialBlue = Color(0xFF3FC5FF);       // Celestial blue
  static const Color cosmicCyan = Color(0xFF00D4FF);          // Cosmic cyan
  static const Color stellarTeal = Color(0xFF00F5FF);         // Stellar teal
  static const Color auroraGreen = Color(0xFF76FF9C);          // Aurora green
  
  // Supernova Colors
  static const Color supernovaGold = Color(0xFFFFD75A);       // Supernova gold
  static const Color stellarYellow = Color(0xFFFFE066);        // Stellar yellow
  static const Color cosmicOrange = Color(0xFFFF8C42);        // Cosmic orange
  static const Color nebulaRed = Color(0xFFFF4757);            // Nebula red
  
  // Surface Colors
  static const Color starlightWhite = Color(0xFFF8F9FA);       // Starlight white
  static const Color cosmicSilver = Color(0xFFE9ECEF);         // Cosmic silver
  static const Color stellarGrayLight = Color(0xFFDEE2E6);     // Stellar gray light
  
  // Legacy compatibility (mapped to cosmic colors)
  static const Color brandYellow = supernovaGold;
  static const Color brandWhite = starlightWhite;
  static const Color brandPurple = electricViolet;
  static const Color surfaceLight = starlightWhite;
  static const Color surfaceDark = cosmicNavy;
  static const Color lavender = cosmicSilver;
  static const Color cream = stellarGrayLight;
  static const Color softBlue = celestialBlue;
  static const Color mysticalPurple = cosmicPurple;
  static const Color cosmicPink = stellarPink;
  static const Color cosmicDark = stellarGray;
  
  // Dark mode colors (enhanced cosmic)
  static const Color darkBackground = deepSpaceBlack;
  static const Color darkSurface = cosmicNavy;
  static const Color darkPurple = electricViolet;
  static const Color darkPink = stellarPink;
  static const Color darkBlue = celestialBlue;

  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      colorScheme: ColorScheme.fromSeed(
        seedColor: electricViolet,
        brightness: Brightness.light,
        primary: electricViolet,
        secondary: supernovaGold,
        tertiary: stellarPink,
        surface: starlightWhite,
        background: starlightWhite,
        onPrimary: starlightWhite,
        onSecondary: deepSpaceBlack,
        onTertiary: starlightWhite,
        onSurface: stellarGray,
        onBackground: stellarGray,
      ),
      scaffoldBackgroundColor: starlightWhite,
      textTheme: const TextTheme(
        headlineLarge: TextStyle(
          fontSize: 32,
          fontWeight: FontWeight.bold,
          color: stellarGray,
          letterSpacing: -0.5,
        ),
        headlineMedium: TextStyle(
          fontSize: 24,
          fontWeight: FontWeight.w600,
          color: stellarGray,
          letterSpacing: -0.25,
        ),
        headlineSmall: TextStyle(
          fontSize: 20,
          fontWeight: FontWeight.w600,
          color: stellarGray,
        ),
        bodyLarge: TextStyle(
          fontSize: 16,
          color: stellarGray,
          height: 1.5,
        ),
        bodyMedium: TextStyle(
          fontSize: 14,
          color: stellarGray,
          height: 1.4,
        ),
        labelLarge: TextStyle(
          fontSize: 14,
          fontWeight: FontWeight.w600,
          color: stellarGray,
        ),
      ),
      cardTheme: CardTheme(
        elevation: 12,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(24),
        ),
        color: starlightWhite,
        shadowColor: electricViolet.withOpacity(0.3),
        margin: const EdgeInsets.all(8),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          elevation: 8,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(20),
          ),
          padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 16),
          backgroundColor: electricViolet,
          foregroundColor: starlightWhite,
          shadowColor: electricViolet.withOpacity(0.4),
          textStyle: const TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
      appBarTheme: const AppBarTheme(
        elevation: 0,
        backgroundColor: starlightWhite,
        foregroundColor: stellarGray,
        titleTextStyle: TextStyle(
          fontSize: 20,
          fontWeight: FontWeight.w600,
          color: stellarGray,
        ),
        centerTitle: true,
      ),
    );
  }

  // 🌌 COSMIC GRADIENTS - GALACTIC BACKGROUNDS 🌌
  
  // Primary Cosmic Gradients
  static const LinearGradient cosmicGradient = LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [electricViolet, supernovaGold, stellarPink],
    stops: [0.0, 0.5, 1.0],
  );

  static const LinearGradient nebulaGradient = LinearGradient(
    begin: Alignment.topCenter,
    end: Alignment.bottomCenter,
    colors: [celestialBlue, stellarTeal, auroraGreen],
    stops: [0.0, 0.5, 1.0],
  );

  static const LinearGradient stellarGradient = LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [cosmicPurple, stellarPink, nebulaPink],
    stops: [0.0, 0.5, 1.0],
  );

  static const LinearGradient supernovaGradient = LinearGradient(
    begin: Alignment.topCenter,
    end: Alignment.bottomCenter,
    colors: [supernovaGold, stellarYellow, cosmicOrange],
    stops: [0.0, 0.5, 1.0],
  );

  // Background Gradients
  static const LinearGradient spaceGradient = LinearGradient(
    begin: Alignment.topCenter,
    end: Alignment.bottomCenter,
    colors: [starlightWhite, cosmicSilver],
  );

  static const LinearGradient deepSpaceGradient = LinearGradient(
    begin: Alignment.topCenter,
    end: Alignment.bottomCenter,
    colors: [deepSpaceBlack, cosmicNavy, stellarGray],
  );

  // Card Gradients
  static const LinearGradient cosmicCardGradient = LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [starlightWhite, cosmicSilver],
  );

  static LinearGradient get electricCardGradient => LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [electricViolet.withOpacity(0.1), stellarPink.withOpacity(0.1)],
  );

  static LinearGradient get celestialCardGradient => LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [celestialBlue.withOpacity(0.1), auroraGreen.withOpacity(0.1)],
  );

  static LinearGradient get supernovaCardGradient => LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [supernovaGold.withOpacity(0.1), cosmicOrange.withOpacity(0.1)],
  );

  static ThemeData get darkTheme {
    return ThemeData(
      useMaterial3: true,
      colorScheme: ColorScheme.fromSeed(
        seedColor: electricViolet,
        brightness: Brightness.dark,
        primary: electricViolet,
        secondary: supernovaGold,
        tertiary: stellarPink,
        surface: cosmicNavy,
        background: deepSpaceBlack,
        onPrimary: starlightWhite,
        onSecondary: deepSpaceBlack,
        onTertiary: starlightWhite,
        onSurface: starlightWhite,
        onBackground: starlightWhite,
      ),
      scaffoldBackgroundColor: deepSpaceBlack,
      textTheme: const TextTheme(
        headlineLarge: TextStyle(
          fontSize: 32,
          fontWeight: FontWeight.bold,
          color: starlightWhite,
          letterSpacing: -0.5,
        ),
        headlineMedium: TextStyle(
          fontSize: 24,
          fontWeight: FontWeight.w600,
          color: starlightWhite,
          letterSpacing: -0.25,
        ),
        headlineSmall: TextStyle(
          fontSize: 20,
          fontWeight: FontWeight.w600,
          color: starlightWhite,
        ),
        bodyLarge: TextStyle(
          fontSize: 16,
          color: cosmicSilver,
          height: 1.5,
        ),
        bodyMedium: TextStyle(
          fontSize: 14,
          color: cosmicSilver,
          height: 1.4,
        ),
        labelLarge: TextStyle(
          fontSize: 14,
          fontWeight: FontWeight.w600,
          color: starlightWhite,
        ),
      ),
      cardTheme: CardTheme(
        elevation: 12,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(24),
        ),
        color: cosmicNavy,
        shadowColor: electricViolet.withOpacity(0.3),
        margin: const EdgeInsets.all(8),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          elevation: 8,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(20),
          ),
          padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 16),
          backgroundColor: electricViolet,
          foregroundColor: starlightWhite,
          shadowColor: electricViolet.withOpacity(0.4),
          textStyle: const TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
      appBarTheme: const AppBarTheme(
        elevation: 0,
        backgroundColor: deepSpaceBlack,
        foregroundColor: starlightWhite,
        titleTextStyle: TextStyle(
          fontSize: 20,
          fontWeight: FontWeight.w600,
          color: starlightWhite,
        ),
        centerTitle: true,
      ),
    );
  }

  // 🌙 DARK MODE COSMIC GRADIENTS 🌙
  
  static const LinearGradient darkCosmicGradient = LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [electricViolet, stellarPink, celestialBlue],
    stops: [0.0, 0.5, 1.0],
  );

  static const LinearGradient darkNebulaGradient = LinearGradient(
    begin: Alignment.topCenter,
    end: Alignment.bottomCenter,
    colors: [deepSpaceBlack, cosmicNavy, stellarGray],
    stops: [0.0, 0.5, 1.0],
  );

  static const LinearGradient darkStellarGradient = LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [cosmicPurple, stellarPink, nebulaPink],
    stops: [0.0, 0.5, 1.0],
  );

  static const LinearGradient darkSupernovaGradient = LinearGradient(
    begin: Alignment.topCenter,
    end: Alignment.bottomCenter,
    colors: [supernovaGold, stellarYellow, cosmicOrange],
    stops: [0.0, 0.5, 1.0],
  );
}





