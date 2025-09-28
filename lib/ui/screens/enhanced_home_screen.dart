import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../../services/database_service.dart';
import '../../services/ai_content_service.dart';
import '../../services/translation_service.dart';
import '../../services/simple_numerology_service.dart';
import '../../models/user.dart';
import 'user_profile_screen.dart';
import 'vedic_zodiac_screen.dart';
import 'chinese_zodiac_screen.dart';
import 'sri_lankan_zodiac_screen.dart';
import 'compatibility_screen.dart';
import 'dream_interpretation_screen.dart';
import 'notifications_screen.dart';
import 'settings_screen.dart';
import '../components/location_selector.dart';

class EnhancedHomeScreen extends StatefulWidget {
  const EnhancedHomeScreen({super.key});

  @override
  State<EnhancedHomeScreen> createState() => _EnhancedHomeScreenState();
}

class _EnhancedHomeScreenState extends State<EnhancedHomeScreen> with TickerProviderStateMixin {
  User? currentUser;
  bool _isLoading = true;
  bool _isExpanded = false;
  late AnimationController _animationController;
  late Animation<double> _fadeAnimation;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      duration: const Duration(milliseconds: 800),
      vsync: this,
    );
    _fadeAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _animationController, curve: Curves.easeInOut),
    );
    _loadUser();
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  Future<void> _loadUser() async {
    currentUser = DatabaseService.getCurrentUser();
    if (currentUser != null) {
      await _generateDailyContent();
    }
    setState(() {
      _isLoading = false;
    });
    _animationController.forward();
  }

  Future<void> _generateDailyContent() async {
    if (currentUser != null) {
      // Generate daily content using AI service
      // This will be implemented with the AI content service
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [
              AppTheme.starlightWhite,
              AppTheme.cosmicSilver.withOpacity(0.3),
              AppTheme.electricViolet.withOpacity(0.05),
            ],
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            stops: const [0.0, 0.6, 1.0],
          ),
        ),
        child: SafeArea(
          child: _isLoading
              ? Center(
                  child: CircularProgressIndicator(
                    color: AppTheme.electricViolet,
                    strokeWidth: 3,
                  ),
                )
              : currentUser == null
                  ? _buildWelcomeScreen()
                  : _buildMainContent(),
        ),
      ),
      bottomNavigationBar: _buildBottomNavigation(),
    );
  }

  Widget _buildWelcomeScreen() {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(32.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                gradient: AppTheme.cosmicGradient,
                borderRadius: BorderRadius.circular(30),
                boxShadow: [
                  BoxShadow(
                    color: AppTheme.electricViolet.withOpacity(0.3),
                    blurRadius: 20,
                    offset: const Offset(0, 10),
                  ),
                ],
              ),
              child: Icon(
                Icons.auto_awesome,
                size: 80,
                color: AppTheme.starlightWhite,
              ),
            ),
            const SizedBox(height: 32),
            Text(
              '🌌 Welcome to Daily Secrets 🌌',
              style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                fontWeight: FontWeight.bold,
                color: AppTheme.stellarGray,
                fontSize: 28,
              ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 20),
            Text(
              'Discover your cosmic guidance and unlock the secrets of the universe',
              style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                color: AppTheme.stellarGray.withOpacity(0.8),
                fontSize: 16,
              ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 40),
            Container(
              decoration: BoxDecoration(
                gradient: AppTheme.cosmicGradient,
                borderRadius: BorderRadius.circular(25),
                boxShadow: [
                  BoxShadow(
                    color: AppTheme.electricViolet.withOpacity(0.4),
                    blurRadius: 15,
                    offset: const Offset(0, 8),
                  ),
                ],
              ),
              child: ElevatedButton(
                onPressed: () => Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const UserProfileScreen()),
                ).then((_) => _loadUser()),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.transparent,
                  shadowColor: Colors.transparent,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(25)),
                  padding: const EdgeInsets.symmetric(horizontal: 40, vertical: 20),
                ),
                child: Text(
                  '✨ Create Your Cosmic Profile ✨',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: AppTheme.starlightWhite,
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildMainContent() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildHeader(),
          const SizedBox(height: 24),
          _buildDailyQuote(),
          const SizedBox(height: 24),
          _buildZodiacInfo(),
          const SizedBox(height: 24),
          _buildGuidanceTabs(),
        ],
      ),
    );
  }

  Widget _buildHeader() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            AppTheme.deepSpaceBlack.withOpacity(0.1),
            AppTheme.electricViolet.withOpacity(0.05),
          ],
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
        ),
        borderRadius: BorderRadius.circular(24),
        border: Border.all(
          color: AppTheme.electricViolet.withOpacity(0.2),
          width: 1,
        ),
      ),
      child: Column(
        children: [
          // Modern Minimalist Top Bar
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              // Home Icon
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: AppTheme.electricViolet.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(
                    color: AppTheme.electricViolet.withOpacity(0.3),
                    width: 1,
                  ),
                ),
                child: Icon(
                  Icons.home_rounded,
                  color: AppTheme.electricViolet,
                  size: 24,
                ),
              ),
              
              // Language Selector (Minimalist)
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                decoration: BoxDecoration(
                  color: AppTheme.starlightWhite.withOpacity(0.9),
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(
                    color: AppTheme.electricViolet.withOpacity(0.3),
                    width: 1,
                  ),
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Icon(
                      Icons.language_rounded,
                      color: AppTheme.electricViolet,
                      size: 18,
                    ),
                    const SizedBox(width: 8),
                    Text(
                      'English',
                      style: TextStyle(
                        color: AppTheme.stellarGray,
                        fontWeight: FontWeight.w600,
                        fontSize: 14,
                      ),
                    ),
                  ],
                ),
              ),
              
              // Zodiac Icon
              GestureDetector(
                onTap: () => _showZodiacProfile(),
                child: Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    gradient: AppTheme.cosmicGradient,
                    borderRadius: BorderRadius.circular(16),
                    boxShadow: [
                      BoxShadow(
                        color: AppTheme.electricViolet.withOpacity(0.3),
                        blurRadius: 8,
                        offset: const Offset(0, 4),
                      ),
                    ],
                  ),
                  child: Text(
                    '♈',
                    style: const TextStyle(
                      fontSize: 24,
                      color: AppTheme.starlightWhite,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),
            ],
          ),
          
          const SizedBox(height: 20),
          
          // Welcome Message
          Column(
            children: [
              Text(
                'Good Morning',
                style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                  color: AppTheme.stellarGray,
                  fontWeight: FontWeight.w500,
                ),
              ),
              const SizedBox(height: 4),
              Text(
                currentUser?.fullName ?? 'User',
                style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                  color: AppTheme.electricViolet,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildDailyQuote() {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        gradient: AppTheme.electricCardGradient,
        borderRadius: BorderRadius.circular(24),
        border: Border.all(
          color: AppTheme.electricViolet.withOpacity(0.3),
          width: 2,
        ),
        boxShadow: [
          BoxShadow(
            color: AppTheme.electricViolet.withOpacity(0.2),
            blurRadius: 15,
            offset: const Offset(0, 8),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(Icons.format_quote, color: AppTheme.electricViolet, size: 28),
              const SizedBox(width: 8),
              Text(
                '✨ Daily Cosmic Guidance ✨',
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  fontWeight: FontWeight.bold,
                  color: AppTheme.electricViolet,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Text(
            'Your heart is open to new connections today. The cosmic energy supports emotional vulnerability and authentic expression. Trust in the power of love to transform your relationships.',
            style: Theme.of(context).textTheme.bodyLarge?.copyWith(
              color: AppTheme.stellarGray,
              height: 1.6,
              fontStyle: FontStyle.italic,
            ),
          ),
          const SizedBox(height: 16),
          Row(
            children: [
              _buildReactionButton('✨'),
              const SizedBox(width: 8),
              _buildReactionButton('😊'),
              const SizedBox(width: 8),
              _buildReactionButton('🙏'),
              const SizedBox(width: 8),
              _buildReactionButton('💖'),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildZodiacInfo() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            AppTheme.electricViolet.withOpacity(0.1),
            AppTheme.celestialBlue.withOpacity(0.1),
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(
          color: AppTheme.electricViolet.withOpacity(0.3),
          width: 1.5,
        ),
        boxShadow: [
          BoxShadow(
            color: AppTheme.electricViolet.withOpacity(0.1),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(Icons.star, color: AppTheme.supernovaGold, size: 28),
              const SizedBox(width: 8),
              Text(
                'Your Cosmic Profile',
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  fontWeight: FontWeight.bold,
                  color: AppTheme.electricViolet,
                ),
              ),
              const Spacer(),
              GestureDetector(
                onTap: () => _navigateToDetailedAnalysis(),
                child: Container(
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    color: AppTheme.electricViolet.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        'Full Analysis',
                        style: Theme.of(context).textTheme.bodySmall?.copyWith(
                          color: AppTheme.electricViolet,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      const SizedBox(width: 4),
                      Icon(Icons.arrow_forward_ios, color: AppTheme.electricViolet, size: 12),
                    ],
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            'Tap individual cards for zodiac details • Full Analysis for complete numerology',
            style: Theme.of(context).textTheme.bodySmall?.copyWith(
              color: Colors.black87.withOpacity(0.7),
              fontStyle: FontStyle.italic,
            ),
          ),
          const SizedBox(height: 16),
          // Zodiac Cards Row 1
          Row(
            children: [
              Expanded(
                child: _buildZodiacCard(
                  'Western',
                  'Aries',
                  '♈',
                  AppTheme.electricViolet,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _buildZodiacCard(
                  'Sri Lankan',
                  'Aries',
                  '♈',
                  AppTheme.celestialBlue,
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          // Zodiac Cards Row 2
          Row(
            children: [
              Expanded(
                child: _buildZodiacCard(
                  'Chinese',
                  'Rat',
                  '🐀',
                  AppTheme.nebulaPink,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _buildZodiacCard(
                  'Primary',
                  'WESTERN',
                  '⭐',
                  AppTheme.supernovaGold,
                ),
              ),
            ],
          ),
          const SizedBox(height: 24),
          _buildNumerologySection(),
        ],
      ),
    );
  }

  Widget _buildNumerologySection() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            AppTheme.supernovaGold.withOpacity(0.1),
            AppTheme.auroraGreen.withOpacity(0.1),
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(16),
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
              Icon(Icons.calculate, color: AppTheme.supernovaGold, size: 24),
              const SizedBox(width: 8),
              Text(
                TranslationService.translate('numerology_insights'),
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                  color: AppTheme.supernovaGold,
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Row(
            children: [
              Expanded(
                child: _buildNumerologyCard(
                  TranslationService.translate('life_path'),
                  _calculateLifePathNumber(),
                  Icons.route,
                  AppTheme.supernovaGold,
                ),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: _buildNumerologyCard(
                  TranslationService.translate('destiny'),
                  _calculateDestinyNumber(),
                  Icons.star,
                  AppTheme.auroraGreen,
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Row(
            children: [
              Expanded(
                child: _buildNumerologyCard(
                  TranslationService.translate('soul_urge'),
                  _calculateSoulUrgeNumber(),
                  Icons.favorite,
                  AppTheme.nebulaPink,
                ),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: _buildNumerologyCard(
                  TranslationService.translate('personality'),
                  _calculatePersonalityNumber(),
                  Icons.person,
                  AppTheme.celestialBlue,
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          GestureDetector(
            onTap: () => _showDetailedNumerology(),
            child: Container(
              width: double.infinity,
              padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 16),
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [AppTheme.supernovaGold, AppTheme.auroraGreen],
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
                  Icon(Icons.analytics, color: Colors.white, size: 20),
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

  Widget _buildNumerologyCard(String label, int number, IconData icon, Color color) {
    return GestureDetector(
      onTap: () => _showIndividualNumerologyDetails(label, number),
      child: Container(
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: color.withOpacity(0.1),
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: color.withOpacity(0.3)),
          boxShadow: [
            BoxShadow(
              color: color.withOpacity(0.1),
              blurRadius: 8,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Column(
          children: [
            Icon(icon, color: color, size: 20),
            const SizedBox(height: 4),
            Text(
              label,
              style: Theme.of(context).textTheme.bodySmall?.copyWith(
                color: AppTheme.stellarGray,
                fontWeight: FontWeight.w600,
              ),
            ),
            const SizedBox(height: 2),
            Text(
              number.toString(),
              style: Theme.of(context).textTheme.titleSmall?.copyWith(
                color: color,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 4),
            Icon(
              Icons.touch_app,
              size: 12,
              color: color.withOpacity(0.6),
            ),
          ],
        ),
      ),
    );
  }

  void _showIndividualNumerologyDetails(String label, int number) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('$label Number: $number'),
        content: Text('Detailed information about your $label number $number'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Close'),
          ),
        ],
      ),
    );
  }

  Widget _buildZodiacCard(String system, String sign, String symbol, Color color) {
    return GestureDetector(
      onTap: () => _showZodiacSummary(system, sign, color),
      child: Container(
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: color.withOpacity(0.1),
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: color.withOpacity(0.3)),
          boxShadow: [
            BoxShadow(
              color: color.withOpacity(0.1),
              blurRadius: 8,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Column(
          children: [
            Text(
              symbol,
              style: TextStyle(fontSize: 20, color: color),
            ),
            const SizedBox(height: 4),
            Text(
              system,
              style: Theme.of(context).textTheme.bodySmall?.copyWith(
                color: AppTheme.stellarGray,
                fontWeight: FontWeight.w600,
              ),
            ),
            const SizedBox(height: 2),
            Text(
              sign,
              style: Theme.of(context).textTheme.titleSmall?.copyWith(
                color: color,
                fontWeight: FontWeight.bold,
              ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 4),
            Icon(
              Icons.touch_app,
              size: 12,
              color: color.withOpacity(0.6),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildGuidanceTabs() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            AppTheme.celestialBlue.withOpacity(0.1),
            AppTheme.electricViolet.withOpacity(0.1),
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
              Icon(Icons.psychology, color: AppTheme.celestialBlue, size: 28),
              const SizedBox(width: 8),
              Text(
                'Cosmic Guidance',
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  fontWeight: FontWeight.bold,
                  color: AppTheme.celestialBlue,
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            'Detailed insights for each area of your life',
            style: Theme.of(context).textTheme.bodySmall?.copyWith(
              color: Colors.black87.withOpacity(0.7),
              fontStyle: FontStyle.italic,
            ),
          ),
          const SizedBox(height: 20),
          DefaultTabController(
            length: 5,
            child: Column(
              children: [
                TabBar(
                  isScrollable: true,
                  labelColor: AppTheme.celestialBlue,
                  unselectedLabelColor: Colors.black87.withOpacity(0.6),
                  indicatorColor: AppTheme.celestialBlue,
                  indicatorSize: TabBarIndicatorSize.tab,
                  tabs: const [
                    Tab(icon: Icon(Icons.favorite, size: 20), text: 'Love'),
                    Tab(icon: Icon(Icons.work, size: 20), text: 'Career'),
                    Tab(icon: Icon(Icons.account_balance_wallet, size: 20), text: 'Finances'),
                    Tab(icon: Icon(Icons.health_and_safety, size: 20), text: 'Health'),
                    Tab(icon: Icon(Icons.travel_explore, size: 20), text: 'Travel'),
                  ],
                ),
                const SizedBox(height: 16),
                SizedBox(
                  height: 250,
                  child: TabBarView(
                    children: [
                      _buildGuidanceCard(
                        'Your heart is open to new connections today. The cosmic energy supports emotional vulnerability and authentic expression.',
                        Icons.favorite, 
                        'Love & Relationships'
                      ),
                      _buildGuidanceCard(
                        'Your professional skills shine brightly today. The stars favor leadership and innovation in your work.',
                        Icons.work, 
                        'Career & Professional'
                      ),
                      _buildGuidanceCard(
                        'Your financial intuition is heightened today. The cosmic energy supports wise money management and investment decisions.',
                        Icons.account_balance_wallet, 
                        'Finances & Wealth'
                      ),
                      _buildGuidanceCard(
                        'Your body needs gentle care and attention today. Listen to its signals and honor your physical needs.',
                        Icons.health_and_safety, 
                        'Health & Wellness'
                      ),
                      _buildGuidanceCard(
                        'Your adventurous spirit calls for exploration today. The cosmic energy supports new experiences and cultural exchanges.',
                        Icons.travel_explore, 
                        'Travel & Adventure'
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildGuidanceCard(String text, IconData icon, String title) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            AppTheme.celestialBlue.withOpacity(0.1),
            AppTheme.electricViolet.withOpacity(0.1),
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(16),
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
              Icon(icon, color: AppTheme.celestialBlue, size: 24),
              const SizedBox(width: 12),
              Text(
                title,
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                  color: AppTheme.celestialBlue,
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Expanded(
            child: SingleChildScrollView(
              child: Text(
                text,
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: Colors.black87,
                  height: 1.5,
                ),
              ),
            ),
          ),
          const SizedBox(height: 12),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
            decoration: BoxDecoration(
              color: AppTheme.celestialBlue.withOpacity(0.1),
              borderRadius: BorderRadius.circular(20),
            ),
            child: Text(
              'Today\'s Focus',
              style: Theme.of(context).textTheme.bodySmall?.copyWith(
                color: AppTheme.celestialBlue,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildBottomNavigation() {
    return Container(
      decoration: BoxDecoration(
        color: AppTheme.starlightWhite,
        boxShadow: [
          BoxShadow(
            color: AppTheme.mysticalPurple.withOpacity(0.1),
            blurRadius: 10,
            offset: const Offset(0, -4),
          ),
        ],
      ),
      child: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _buildNavItem(Icons.home, 'Home', true),
              _buildNavItem(Icons.people, 'Community', false),
              _buildNavItem(Icons.favorite, 'Compatibility', false),
              _buildNavItem(Icons.psychology, 'Dreams', false),
              _buildNavItem(Icons.person, 'Profile', false),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildReactionButton(String emoji) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: AppTheme.stellarGrayLight.withOpacity(0.3),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Text(
        emoji,
        style: const TextStyle(fontSize: 18),
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
          Icon(
            icon,
            color: isSelected ? AppTheme.electricViolet : Colors.black87.withOpacity(0.6),
            size: 24,
          ),
          const SizedBox(height: 4),
          Text(
            label,
            style: Theme.of(context).textTheme.bodySmall?.copyWith(
              color: isSelected ? AppTheme.electricViolet : Colors.black87.withOpacity(0.6),
              fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
            ),
          ),
        ],
      ),
    );
  }

  void _navigateToDetailedAnalysis() {
    // Navigate to detailed analysis
    print('Navigate to detailed analysis');
  }

  void _showZodiacProfile() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Row(
          children: [
            Text(
              '♈',
              style: const TextStyle(fontSize: 24),
            ),
            const SizedBox(width: 8),
            Text(
              'Aries Profile',
              style: const TextStyle(fontSize: 18),
            ),
          ],
        ),
        content: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  gradient: AppTheme.cosmicGradient,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Column(
                  children: [
                    Text(
                      '♈',
                      style: const TextStyle(
                        fontSize: 48,
                        color: AppTheme.starlightWhite,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'Aries',
                      style: const TextStyle(
                        fontSize: 20,
                        color: AppTheme.starlightWhite,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      'Your Cosmic Identity',
                      style: TextStyle(
                        fontSize: 14,
                        color: AppTheme.starlightWhite.withOpacity(0.8),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16),
              Text(
                'This is your primary zodiac sign based on your birth date. Tap "Full Analysis" for detailed insights about your cosmic profile.',
                style: const TextStyle(height: 1.5),
              ),
            ],
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Close'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              _navigateToDetailedAnalysis();
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: AppTheme.electricViolet,
              foregroundColor: AppTheme.starlightWhite,
            ),
            child: const Text('Full Analysis'),
          ),
        ],
      ),
    );
  }

  void _showZodiacSummary(String system, String sign, Color color) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('$system - $sign'),
        content: Text('Detailed information about your $system zodiac sign: $sign'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Close'),
          ),
        ],
      ),
    );
  }

  // Numerology calculation methods
  int _calculateLifePathNumber() {
    if (currentUser?.dateOfBirth != null) {
      return SimpleNumerologyService.calculateLifePathNumber(currentUser!.dateOfBirth);
    }
    return 1;
  }

  int _calculateDestinyNumber() {
    if (currentUser?.fullName != null) {
      return SimpleNumerologyService.calculateDestinyNumber(currentUser!.fullName);
    }
    return 1;
  }

  int _calculateSoulUrgeNumber() {
    if (currentUser?.fullName != null) {
      return SimpleNumerologyService.calculateSoulUrgeNumber(currentUser!.fullName);
    }
    return 1;
  }

  int _calculatePersonalityNumber() {
    if (currentUser?.fullName != null) {
      return SimpleNumerologyService.calculatePersonalityNumber(currentUser!.fullName);
    }
    return 1;
  }

  void _showDetailedNumerology() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Complete Numerology Analysis'),
        content: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: [
              _buildNumerologyDetailCard('Life Path', _calculateLifePathNumber(), 'Your life purpose and path'),
              const SizedBox(height: 12),
              _buildNumerologyDetailCard('Destiny', _calculateDestinyNumber(), 'Your life mission and potential'),
              const SizedBox(height: 12),
              _buildNumerologyDetailCard('Soul Urge', _calculateSoulUrgeNumber(), 'Your heart\'s deepest desires'),
              const SizedBox(height: 12),
              _buildNumerologyDetailCard('Personality', _calculatePersonalityNumber(), 'How others see you'),
            ],
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Close'),
          ),
        ],
      ),
    );
  }

  Widget _buildNumerologyDetailCard(String title, int number, String description) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            AppTheme.supernovaGold.withOpacity(0.1),
            AppTheme.auroraGreen.withOpacity(0.1),
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: AppTheme.supernovaGold.withOpacity(0.3),
          width: 1,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Text(
                title,
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                  color: AppTheme.supernovaGold,
                ),
              ),
              const Spacer(),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                decoration: BoxDecoration(
                  color: AppTheme.supernovaGold,
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Text(
                  number.toString(),
                  style: const TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                    fontSize: 16,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            description,
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
              color: Colors.black87,
            ),
          ),
        ],
      ),
    );
  }

  String _getTruncatedQuote(String quote) {
    if (quote.length <= 200) return quote;
    return '${quote.substring(0, 200)}...';
  }

  String _getZodiacSymbol(String sign) {
    switch (sign) {
      case 'Aries': return '♈';
      case 'Taurus': return '♉';
      case 'Gemini': return '♊';
      case 'Cancer': return '♋';
      case 'Leo': return '♌';
      case 'Virgo': return '♍';
      case 'Libra': return '♎';
      case 'Scorpio': return '♏';
      case 'Sagittarius': return '♐';
      case 'Capricorn': return '♑';
      case 'Aquarius': return '♒';
      case 'Pisces': return '♓';
      case 'Rat': return '🐀';
      case 'Ox': return '🐂';
      case 'Tiger': return '🐅';
      case 'Rabbit': return '🐇';
      case 'Dragon': return '🐉';
      case 'Snake': return '🐍';
      case 'Horse': return '🐎';
      case 'Goat': return '🐐';
      case 'Monkey': return '🐒';
      case 'Rooster': return '🐓';
      case 'Dog': return '🐕';
      case 'Pig': return '🐖';
      default: return '⭐';
    }
  }

  String _getTimeOfDay() {
    final hour = DateTime.now().hour;
    if (hour < 12) {
      return 'Morning';
    } else if (hour < 17) {
      return 'Afternoon';
    } else if (hour < 21) {
      return 'Evening';
    } else {
      return 'Night';
    }
  }

  void _handleNavigation(String label) {
    switch (label) {
      case 'Home':
        // Already on home
        break;
      case 'Community':
        // Navigate to community
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