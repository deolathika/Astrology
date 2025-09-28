import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../../services/database_service.dart';
import '../../services/translation_service.dart';
import '../../models/user.dart';
import 'user_profile_screen.dart';
import 'vedic_zodiac_screen.dart';
import 'chinese_zodiac_screen.dart';
import 'sri_lankan_zodiac_screen.dart';
import 'compatibility_screen.dart';
import 'dream_interpretation_screen.dart';
import 'notifications_screen.dart';
import 'settings_screen.dart';
import 'cosmic_profile_analysis_screen.dart';
import 'community_screen.dart';
import 'compatibility_screen.dart';
import 'dream_interpretation_screen.dart';

class SimpleCosmicHomeScreen extends StatefulWidget {
  const SimpleCosmicHomeScreen({super.key});

  @override
  State<SimpleCosmicHomeScreen> createState() => _SimpleCosmicHomeScreenState();
}

class _SimpleCosmicHomeScreenState extends State<SimpleCosmicHomeScreen> with TickerProviderStateMixin {
  User? currentUser;
  bool _isLoading = true;
  String _currentLanguage = 'en';
  late AnimationController _animationController;
  late Animation<double> _fadeAnimation;
  late AnimationController _pulseController;
  late Animation<double> _pulseAnimation;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      duration: const Duration(milliseconds: 1200),
      vsync: this,
    );
    _fadeAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _animationController, curve: Curves.easeInOut),
    );
    
    _pulseController = AnimationController(
      duration: const Duration(seconds: 2),
      vsync: this,
    );
    _pulseAnimation = Tween<double>(begin: 0.8, end: 1.2).animate(
      CurvedAnimation(parent: _pulseController, curve: Curves.easeInOut),
    );
    
    _loadUser();
    _animationController.forward();
    _pulseController.repeat(reverse: true);
  }

  @override
  void dispose() {
    _animationController.dispose();
    _pulseController.dispose();
    super.dispose();
  }

  Future<void> _loadUser() async {
    currentUser = DatabaseService.getCurrentUser();
    setState(() {
      _isLoading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return Scaffold(
        backgroundColor: AppTheme.deepSpaceBlack,
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              AnimatedBuilder(
                animation: _pulseAnimation,
                builder: (context, child) {
                  return Transform.scale(
                    scale: _pulseAnimation.value,
                    child: Container(
                      width: 80,
                      height: 80,
                      decoration: BoxDecoration(
                        gradient: AppTheme.cosmicGradient,
                        shape: BoxShape.circle,
                        boxShadow: [
                          BoxShadow(
                            color: AppTheme.electricViolet.withOpacity(0.5),
                            blurRadius: 20,
                            spreadRadius: 5,
                          ),
                        ],
                      ),
                      child: const Icon(
                        Icons.star,
                        color: Colors.white,
                        size: 40,
                      ),
                    ),
                  );
                },
              ),
              const SizedBox(height: 24),
              Text(
                TranslationService.translate('loading_cosmic_journey'),
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  color: AppTheme.starlightWhite,
                  fontWeight: FontWeight.w600,
                ),
              ),
              const SizedBox(height: 16),
              const CircularProgressIndicator(
                valueColor: AlwaysStoppedAnimation<Color>(AppTheme.electricViolet),
              ),
            ],
          ),
        ),
      );
    }

    return Scaffold(
      backgroundColor: AppTheme.deepSpaceBlack,
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [
              AppTheme.deepSpaceBlack,
              AppTheme.cosmicNavy,
              AppTheme.nebulaDark,
            ],
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
          ),
        ),
        child: SafeArea(
          child: FadeTransition(
            opacity: _fadeAnimation,
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _buildTranslationBar(),
                  const SizedBox(height: 16),
                  _buildCosmicHeader(),
                  const SizedBox(height: 24),
                  _buildDailyGuidance(),
                  const SizedBox(height: 24),
                  _buildCosmicProfile(),
                  const SizedBox(height: 24),
                  _buildZodiacSystems(),
                  const SizedBox(height: 24),
                  _buildNumerologySection(),
                  const SizedBox(height: 24),
                  _buildQuickActions(),
                  const SizedBox(height: 100), // Bottom padding for navigation
                ],
              ),
            ),
          ),
        ),
      ),
      bottomNavigationBar: _buildCosmicNavigation(),
    );
  }

  Widget _buildTranslationBar() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            AppTheme.electricViolet.withOpacity(0.1),
            AppTheme.cosmicPurple.withOpacity(0.1),
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: AppTheme.electricViolet.withOpacity(0.3),
          width: 1,
        ),
      ),
      child: Row(
        children: [
          Icon(Icons.translate, color: AppTheme.electricViolet, size: 20),
          const SizedBox(width: 8),
          Text(
            TranslationService.translate('language'),
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
              color: AppTheme.electricViolet,
              fontWeight: FontWeight.w600,
            ),
          ),
          const Spacer(),
          DropdownButton<String>(
            value: _currentLanguage,
            dropdownColor: AppTheme.cosmicNavy,
            style: TextStyle(
              color: AppTheme.starlightWhite,
              fontSize: 14,
            ),
            underline: Container(),
            icon: Icon(Icons.keyboard_arrow_down, color: AppTheme.electricViolet),
            items: [
              DropdownMenuItem(
                value: 'en',
                child: Text('English', style: TextStyle(color: AppTheme.starlightWhite)),
              ),
              DropdownMenuItem(
                value: 'si',
                child: Text('සිංහල', style: TextStyle(color: AppTheme.starlightWhite)),
              ),
              DropdownMenuItem(
                value: 'ta',
                child: Text('தமிழ்', style: TextStyle(color: AppTheme.starlightWhite)),
              ),
              DropdownMenuItem(
                value: 'hi',
                child: Text('हिन्दी', style: TextStyle(color: AppTheme.starlightWhite)),
              ),
              DropdownMenuItem(
                value: 'zh',
                child: Text('中文', style: TextStyle(color: AppTheme.starlightWhite)),
              ),
            ],
            onChanged: (String? newLanguage) {
              if (newLanguage != null) {
                setState(() {
                  _currentLanguage = newLanguage;
                });
                TranslationService.setLanguage(newLanguage);
              }
            },
          ),
        ],
      ),
    );
  }

  Widget _buildCosmicHeader() {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        gradient: AppTheme.cosmicGradient,
        borderRadius: BorderRadius.circular(24),
        boxShadow: [
          BoxShadow(
            color: AppTheme.electricViolet.withOpacity(0.3),
            blurRadius: 20,
            offset: const Offset(0, 8),
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
                  color: Colors.white.withOpacity(0.2),
                  borderRadius: BorderRadius.circular(16),
                ),
                child: const Icon(
                  Icons.star,
                  color: Colors.white,
                  size: 24,
                ),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      TranslationService.translate('welcome_cosmic_journey'),
                      style: Theme.of(context).textTheme.titleLarge?.copyWith(
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      currentUser?.fullName ?? TranslationService.translate('cosmic_explorer'),
                      style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                        color: Colors.white70,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Text(
            TranslationService.translate('discover_cosmic_secrets'),
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
              color: Colors.white70,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }

  Widget _buildDailyGuidance() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            AppTheme.celestialBlue.withOpacity(0.1),
            AppTheme.cosmicCyan.withOpacity(0.1),
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(
          color: AppTheme.celestialBlue.withOpacity(0.3),
          width: 1.5,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(Icons.auto_awesome, color: AppTheme.celestialBlue, size: 24),
              const SizedBox(width: 8),
              Text(
                TranslationService.translate('daily_cosmic_guidance'),
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                  color: AppTheme.celestialBlue,
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Text(
            TranslationService.translate('daily_guidance_text'),
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
              color: AppTheme.starlightWhite,
              height: 1.5,
            ),
          ),
          const SizedBox(height: 12),
          Row(
            children: [
              Icon(Icons.favorite, color: AppTheme.nebulaPink, size: 16),
              const SizedBox(width: 8),
              Text(
                TranslationService.translate('lucky_numbers'),
                style: Theme.of(context).textTheme.bodySmall?.copyWith(
                  color: AppTheme.starlightWhite.withOpacity(0.8),
                ),
              ),
              const Spacer(),
              Icon(Icons.star, color: AppTheme.supernovaGold, size: 16),
              const SizedBox(width: 8),
              Text(
                TranslationService.translate('cosmic_energy_high'),
                style: Theme.of(context).textTheme.bodySmall?.copyWith(
                  color: AppTheme.starlightWhite.withOpacity(0.8),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildCosmicProfile() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            AppTheme.supernovaGold.withOpacity(0.1),
            AppTheme.stellarYellow.withOpacity(0.1),
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(
          color: AppTheme.supernovaGold.withOpacity(0.3),
          width: 1.5,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(Icons.person, color: AppTheme.supernovaGold, size: 24),
              const SizedBox(width: 8),
              Text(
                TranslationService.translate('your_cosmic_profile'),
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                  color: AppTheme.supernovaGold,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Row(
            children: [
              Expanded(
                child: _buildProfileCard('Western', 'Aries', '♈', AppTheme.electricViolet),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _buildProfileCard('Chinese', 'Dragon', '🐉', AppTheme.cosmicOrange),
              ),
            ],
          ),
                  const SizedBox(height: 12),
                  Row(
                    children: [
                      Expanded(
                        child: _buildProfileCard('Vedic', 'Mesha', '♈', AppTheme.nebulaPink),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: _buildProfileCard('Sri Lankan', 'Aries', '♈', AppTheme.auroraGreen),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  GestureDetector(
                    onTap: () => Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => const CosmicProfileAnalysisScreen()),
                    ),
                    child: Container(
                      width: double.infinity,
                      padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 16),
                      decoration: BoxDecoration(
                        gradient: LinearGradient(
                          colors: [AppTheme.supernovaGold, AppTheme.stellarYellow],
                        ),
                        borderRadius: BorderRadius.circular(12),
                        boxShadow: [
                          BoxShadow(
                            color: AppTheme.supernovaGold.withOpacity(0.3),
                            blurRadius: 8,
                            offset: const Offset(0, 4),
                          ),
                        ],
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const Icon(Icons.analytics, color: Colors.white, size: 20),
                          const SizedBox(width: 8),
                          Text(
                            TranslationService.translate('full_analysis'),
                            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
        ],
      ),
    );
  }

  Widget _buildProfileCard(String system, String sign, String symbol, Color color) {
    return GestureDetector(
      onTap: () => _showZodiacDetails(system, sign, color),
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [color.withOpacity(0.1), color.withOpacity(0.05)],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: color.withOpacity(0.3)),
        ),
        child: Column(
          children: [
            Text(
              symbol,
              style: const TextStyle(fontSize: 24),
            ),
            const SizedBox(height: 8),
            Text(
              system,
              style: Theme.of(context).textTheme.bodySmall?.copyWith(
                color: color,
                fontWeight: FontWeight.w600,
              ),
            ),
            Text(
              sign,
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                color: AppTheme.starlightWhite,
                fontWeight: FontWeight.bold,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildZodiacSystems() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            AppTheme.cosmicPurple.withOpacity(0.1),
            AppTheme.stellarPink.withOpacity(0.1),
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(
          color: AppTheme.cosmicPurple.withOpacity(0.3),
          width: 1.5,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(Icons.auto_awesome, color: AppTheme.cosmicPurple, size: 24),
              const SizedBox(width: 8),
              Text(
                TranslationService.translate('explore_zodiac_systems'),
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                  color: AppTheme.cosmicPurple,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Row(
            children: [
              Expanded(
                child: _buildZodiacCard('Western', '♈♉♊♋♌♍', AppTheme.electricViolet, () {
                  Navigator.push(context, MaterialPageRoute(builder: (context) => const VedicZodiacScreen()));
                }),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _buildZodiacCard('Vedic', '♈♉♊♋♌♍', AppTheme.nebulaPink, () {
                  Navigator.push(context, MaterialPageRoute(builder: (context) => const VedicZodiacScreen()));
                }),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Row(
            children: [
              Expanded(
                child: _buildZodiacCard('Chinese', '🐀🐂🐅🐇🐉🐍', AppTheme.cosmicOrange, () {
                  Navigator.push(context, MaterialPageRoute(builder: (context) => const ChineseZodiacScreen()));
                }),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _buildZodiacCard('Sri Lankan', '♈♉♊♋♌♍', AppTheme.auroraGreen, () {
                  Navigator.push(context, MaterialPageRoute(builder: (context) => const SriLankanZodiacScreen()));
                }),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildZodiacCard(String title, String symbols, Color color, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [color.withOpacity(0.1), color.withOpacity(0.05)],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: color.withOpacity(0.3)),
        ),
        child: Column(
          children: [
            Text(
              symbols,
              style: const TextStyle(fontSize: 20),
            ),
            const SizedBox(height: 8),
            Text(
              title,
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                color: color,
                fontWeight: FontWeight.bold,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildNumerologySection() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            AppTheme.auroraGreen.withOpacity(0.1),
            AppTheme.stellarTeal.withOpacity(0.1),
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(
          color: AppTheme.auroraGreen.withOpacity(0.3),
          width: 1.5,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(Icons.calculate, color: AppTheme.auroraGreen, size: 24),
              const SizedBox(width: 8),
              Text(
                TranslationService.translate('numerology_insights'),
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                  color: AppTheme.auroraGreen,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Row(
            children: [
              Expanded(
                child: _buildNumerologyCard('Life Path', '7', AppTheme.auroraGreen),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _buildNumerologyCard('Destiny', '3', AppTheme.stellarTeal),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Row(
            children: [
              Expanded(
                child: _buildNumerologyCard('Soul Urge', '9', AppTheme.cosmicCyan),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _buildNumerologyCard('Personality', '5', AppTheme.celestialBlue),
              ),
            ],
          ),
          const SizedBox(height: 16),
          GestureDetector(
            onTap: _showDetailedNumerology,
            child: Container(
              width: double.infinity,
              padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 16),
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [AppTheme.auroraGreen, AppTheme.stellarTeal],
                ),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Icon(Icons.analytics, color: Colors.white, size: 20),
                  const SizedBox(width: 8),
                  Text(
                    TranslationService.translate('complete_numerology_analysis'),
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildNumerologyCard(String label, String number, Color color) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [color.withOpacity(0.1), color.withOpacity(0.05)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: color.withOpacity(0.3)),
      ),
      child: Column(
        children: [
          Text(
            number,
            style: Theme.of(context).textTheme.headlineMedium?.copyWith(
              color: color,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            label,
            style: Theme.of(context).textTheme.bodySmall?.copyWith(
              color: AppTheme.starlightWhite,
              fontWeight: FontWeight.w600,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildQuickActions() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            AppTheme.nebulaRed.withOpacity(0.1),
            AppTheme.cosmicOrange.withOpacity(0.1),
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(
          color: AppTheme.nebulaRed.withOpacity(0.3),
          width: 1.5,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(Icons.flash_on, color: AppTheme.nebulaRed, size: 24),
              const SizedBox(width: 8),
              Text(
                TranslationService.translate('quick_actions'),
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                  color: AppTheme.nebulaRed,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Row(
            children: [
              Expanded(
                child: _buildActionCard(TranslationService.translate('dreams'), Icons.nights_stay, AppTheme.nebulaRed, () {
                  Navigator.push(context, MaterialPageRoute(builder: (context) => const DreamInterpretationScreen()));
                }),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _buildActionCard(TranslationService.translate('compatibility'), Icons.favorite, AppTheme.cosmicOrange, () {
                  Navigator.push(context, MaterialPageRoute(builder: (context) => const CompatibilityScreen()));
                }),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Row(
            children: [
              Expanded(
                child: _buildActionCard(TranslationService.translate('profile'), Icons.person, AppTheme.stellarYellow, () {
                  Navigator.push(context, MaterialPageRoute(builder: (context) => const UserProfileScreen()));
                }),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _buildActionCard(TranslationService.translate('settings'), Icons.settings, AppTheme.cosmicSilver, () {
                  Navigator.push(context, MaterialPageRoute(builder: (context) => const SettingsScreen()));
                }),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildActionCard(String title, IconData icon, Color color, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [color.withOpacity(0.1), color.withOpacity(0.05)],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: color.withOpacity(0.3)),
        ),
        child: Column(
          children: [
            Icon(icon, color: color, size: 24),
            const SizedBox(height: 8),
            Text(
              title,
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                color: AppTheme.starlightWhite,
                fontWeight: FontWeight.w600,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildCosmicNavigation() {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 16),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            AppTheme.cosmicNavy,
            AppTheme.stellarGray,
          ],
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
        ),
        boxShadow: [
          BoxShadow(
            color: AppTheme.electricViolet.withOpacity(0.2),
            blurRadius: 10,
            offset: const Offset(0, -2),
          ),
        ],
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          _buildNavItem(Icons.home, TranslationService.translate('home'), true),
          _buildNavItem(Icons.people, TranslationService.translate('community'), false),
          _buildNavItem(Icons.favorite, TranslationService.translate('compatibility'), false),
          _buildNavItem(Icons.nights_stay, TranslationService.translate('dreams'), false),
          _buildNavItem(Icons.person, TranslationService.translate('profile'), false),
          _buildNavItem(Icons.settings, TranslationService.translate('settings'), false),
        ],
      ),
    );
  }

  Widget _buildNavItem(IconData icon, String label, bool isSelected) {
    return GestureDetector(
      onTap: () {
        _handleNavigation(label);
      },
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: isSelected 
                  ? AppTheme.electricViolet.withOpacity(0.2)
                  : Colors.transparent,
              borderRadius: BorderRadius.circular(12),
            ),
            child: Icon(
              icon,
              color: isSelected ? AppTheme.electricViolet : AppTheme.cosmicSilver,
              size: 24,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            label,
            style: Theme.of(context).textTheme.bodySmall?.copyWith(
              color: isSelected ? AppTheme.electricViolet : AppTheme.cosmicSilver,
              fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
            ),
          ),
        ],
      ),
    );
  }

  void _showZodiacDetails(String system, String sign, Color color) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: AppTheme.cosmicNavy,
        title: Text(
          '$system - $sign',
          style: const TextStyle(color: AppTheme.starlightWhite),
        ),
        content: Text(
          'Detailed information about your $system zodiac sign: $sign',
          style: const TextStyle(color: AppTheme.starlightWhite),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text(
              'Close',
              style: TextStyle(color: AppTheme.electricViolet),
            ),
          ),
        ],
      ),
    );
  }

  void _showDetailedNumerology() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: AppTheme.cosmicNavy,
        title: const Text(
          'Complete Numerology Analysis',
          style: TextStyle(color: AppTheme.starlightWhite),
        ),
        content: const Text(
          'Your complete numerology analysis with detailed insights about your life path, destiny, soul urge, and personality numbers.',
          style: TextStyle(color: AppTheme.starlightWhite),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text(
              'Close',
              style: TextStyle(color: AppTheme.electricViolet),
            ),
          ),
        ],
      ),
    );
  }

  void _handleNavigation(String label) {
    switch (label) {
      case 'Home':
        // Already on home
        break;
      case 'Community':
        Navigator.push(context, MaterialPageRoute(builder: (context) => const CommunityScreen()));
        break;
      case 'Compatibility':
        Navigator.push(context, MaterialPageRoute(builder: (context) => const CompatibilityScreen()));
        break;
      case 'Dreams':
        Navigator.push(context, MaterialPageRoute(builder: (context) => const DreamInterpretationScreen()));
        break;
      case 'Profile':
        Navigator.push(context, MaterialPageRoute(builder: (context) => const UserProfileScreen()));
        break;
      case 'Settings':
        Navigator.push(context, MaterialPageRoute(builder: (context) => const SettingsScreen()));
        break;
    }
  }
}
