import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../../services/database_service.dart';
import '../../models/user.dart';
import '../../utils/zodiac_utils.dart';
import 'user_profile_screen.dart';
import 'vedic_zodiac_screen.dart';
import 'chinese_zodiac_screen.dart';
import 'sri_lankan_zodiac_screen.dart';
import 'compatibility_screen.dart';
import 'dream_interpretation_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  User? currentUser;

  @override
  void initState() {
    super.initState();
    _loadUser();
  }

  void _loadUser() {
    currentUser = DatabaseService.getCurrentUser();
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.cream,
      appBar: AppBar(
        title: const Text('Daily Secrets'),
        backgroundColor: Colors.transparent,
        elevation: 0,
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Welcome Section
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(24),
                decoration: BoxDecoration(
                  gradient: AppTheme.cosmicGradient,
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      currentUser != null 
                          ? 'Welcome back, ${currentUser!.fullName}! ✨'
                          : 'Welcome to Daily Secrets ✨',
                      style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      currentUser != null 
                          ? 'Born on ${ZodiacUtils.formatDate(currentUser!.dateOfBirth)}'
                          : 'Discover your cosmic guidance',
                      style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                        color: Colors.white70,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 32),

              // Zodiac Sign Card (if user has profile)
              if (currentUser != null) ...[
                _buildZodiacCard(context),
                const SizedBox(height: 24),
              ],

              // Cards Grid
              Expanded(
                child: GridView.count(
                  crossAxisCount: 2,
                  crossAxisSpacing: 16,
                  mainAxisSpacing: 16,
                  childAspectRatio: 1.0,
                  children: [
                    _buildSecretCard(
                      context,
                      'Western Zodiac',
                      Icons.star_outline,
                      AppTheme.mysticalPurple,
                      () => _navigateToScreen(context, 'Western Zodiac'),
                    ),
                    _buildSecretCard(
                      context,
                      'Vedic Zodiac',
                      Icons.auto_awesome,
                      AppTheme.cosmicPink,
                      () => Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => const VedicZodiacScreen(),
                        ),
                      ),
                    ),
                    _buildSecretCard(
                      context,
                      'Chinese Zodiac',
                      Icons.pets,
                      AppTheme.softBlue,
                      () => Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => const ChineseZodiacScreen(),
                        ),
                      ),
                    ),
                    _buildSecretCard(
                      context,
                      'Sri Lankan Zodiac',
                      Icons.flag,
                      AppTheme.lavender,
                      () => Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => const SriLankanZodiacScreen(),
                        ),
                      ),
                    ),
                    _buildSecretCard(
                      context,
                      'Compatibility',
                      Icons.favorite,
                      AppTheme.mysticalPurple,
                      () => Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => const CompatibilityScreen(),
                        ),
                      ),
                    ),
                    _buildSecretCard(
                      context,
                      'Dream Interpretation',
                      Icons.psychology,
                      AppTheme.softBlue,
                      () => Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => const DreamInterpretationScreen(),
                        ),
                      ),
                    ),
                    _buildSecretCard(
                      context,
                      'Profile',
                      Icons.person_outline,
                      AppTheme.cosmicPink,
                      () => Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => const UserProfileScreen(),
                        ),
                      ).then((_) => _loadUser()),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildSecretCard(
    BuildContext context,
    String title,
    IconData icon,
    Color color,
    VoidCallback onTap,
  ) {
    return Container(
      decoration: BoxDecoration(
        color: AppTheme.starlightWhite,
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color: color.withOpacity(0.1),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          borderRadius: BorderRadius.circular(20),
          onTap: onTap,
          child: Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: color.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Icon(
                    icon,
                    size: 32,
                    color: color,
                  ),
                ),
                const SizedBox(height: 16),
                Text(
                  title,
                  style: Theme.of(context).textTheme.labelLarge?.copyWith(
                    fontWeight: FontWeight.w600,
                    color: Colors.black87,
                  ),
                  textAlign: TextAlign.center,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildZodiacCard(BuildContext context) {
    final zodiacSign = ZodiacUtils.getWesternZodiacSign(currentUser!.dateOfBirth);
    final zodiacInfo = ZodiacUtils.getZodiacInfo(zodiacSign);
    final lifePathNumber = ZodiacUtils.calculateLifePathNumber(currentUser!.dateOfBirth);

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: AppTheme.starlightWhite,
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color: AppTheme.mysticalPurple.withOpacity(0.1),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        children: [
          Row(
            children: [
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: AppTheme.mysticalPurple.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Text(
                  zodiacInfo['symbol'] ?? '♈',
                  style: const TextStyle(fontSize: 24),
                ),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Your Western Sign',
                      style: Theme.of(context).textTheme.labelLarge?.copyWith(
                        color: Colors.black87,
                      ),
                    ),
                    Text(
                      zodiacSign,
                      style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                        fontWeight: FontWeight.bold,
                        color: AppTheme.mysticalPurple,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Row(
            children: [
              Expanded(
                child: _buildZodiacInfoItem(
                  context,
                  'Element',
                  zodiacInfo['element'] ?? 'Unknown',
                  Icons.whatshot,
                ),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: _buildZodiacInfoItem(
                  context,
                  'Ruling Planet',
                  zodiacInfo['rulingPlanet'] ?? 'Unknown',
                  Icons.star,
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Row(
            children: [
              Expanded(
                child: _buildZodiacInfoItem(
                  context,
                  'Life Path',
                  lifePathNumber.toString(),
                  Icons.numbers,
                ),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: _buildZodiacInfoItem(
                  context,
                  'Quality',
                  zodiacInfo['quality'] ?? 'Unknown',
                  Icons.category,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: AppTheme.cream,
              borderRadius: BorderRadius.circular(12),
            ),
            child: Text(
              zodiacInfo['description'] ?? 'Your zodiac sign information',
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                color: Colors.black87,
                fontStyle: FontStyle.italic,
              ),
              textAlign: TextAlign.center,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildZodiacInfoItem(BuildContext context, String label, String value, IconData icon) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: AppTheme.lavender.withOpacity(0.3),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Column(
        children: [
          Icon(icon, color: AppTheme.mysticalPurple, size: 16),
          const SizedBox(height: 4),
          Text(
            label,
            style: Theme.of(context).textTheme.bodySmall?.copyWith(
              color: Colors.black87,
              fontWeight: FontWeight.w500,
            ),
          ),
          Text(
            value,
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
              color: Colors.black87,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }

  void _navigateToScreen(BuildContext context, String screenName) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Navigating to $screenName'),
        backgroundColor: AppTheme.mysticalPurple,
        duration: const Duration(seconds: 1),
      ),
    );
  }
}
