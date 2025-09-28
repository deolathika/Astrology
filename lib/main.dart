import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'ui/screens/onboarding_screen.dart';
import 'ui/screens/enhanced_home_screen.dart';
import 'ui/screens/simple_cosmic_home_screen.dart';
import 'ui/theme/app_theme.dart';
import 'services/analytics_service.dart';
import 'services/notification_service.dart';
import 'services/payment_service.dart';
import 'firebase_options.dart';
import 'services/database_service.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Initialize services
  await DatabaseService.init();
  
  runApp(const DailySecretsApp());
}

class DailySecretsApp extends StatelessWidget {
  const DailySecretsApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Daily Secrets',
      theme: AppTheme.lightTheme,
      darkTheme: AppTheme.darkTheme,
      themeMode: ThemeMode.system,
      home: const SimpleCosmicHomeScreen(),
      debugShowCheckedModeBanner: false,
    );
  }
}

class AppHomeScreen extends StatelessWidget {
  const AppHomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    // Check if user has a profile
    final user = DatabaseService.getCurrentUser();
    
    if (user != null) {
      // User has a profile, go to main app
      return const EnhancedHomeScreen();
    } else {
      // No profile, start onboarding
      return const OnboardingScreen();
    }
  }
}