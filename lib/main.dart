import 'package:flutter/material.dart';
import 'ui/screens/enhanced_home_screen.dart';
import 'ui/theme/app_theme.dart';
import 'services/database_service.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
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
      home: const EnhancedHomeScreen(),
      debugShowCheckedModeBanner: false,
    );
  }
}