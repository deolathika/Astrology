import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../../services/translation_service.dart';
import '../../services/database_service.dart';
import '../../models/user.dart';
import '../../services/simple_numerology_service.dart';

class CosmicProfileAnalysisScreen extends StatefulWidget {
  const CosmicProfileAnalysisScreen({super.key});

  @override
  State<CosmicProfileAnalysisScreen> createState() => _CosmicProfileAnalysisScreenState();
}

class _CosmicProfileAnalysisScreenState extends State<CosmicProfileAnalysisScreen> with TickerProviderStateMixin {
  User? currentUser;
  String _currentLanguage = 'en';
  late AnimationController _animationController;
  late Animation<double> _fadeAnimation;
  late AnimationController _pulseController;
  late Animation<double> _pulseAnimation;

  @override
  void initState() {
    super.initState();
    currentUser = DatabaseService.getCurrentUser();
    
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
    
    _animationController.forward();
    _pulseController.repeat(reverse: true);
  }

  @override
  void dispose() {
    _animationController.dispose();
    _pulseController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.deepSpaceBlack,
      appBar: AppBar(
        title: Text(TranslationService.translate('cosmic_profile_analysis')),
        backgroundColor: Colors.transparent,
        elevation: 0,
        foregroundColor: AppTheme.starlightWhite,
        actions: [
          IconButton(
            icon: const Icon(Icons.close),
            onPressed: () => Navigator.pop(context),
          ),
        ],
      ),
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
                  const SizedBox(height: 24),
                  _buildProfileHeader(),
                  const SizedBox(height: 24),
                  _buildAstrologyAnalysis(),
                  const SizedBox(height: 24),
                  _buildNumerologyAnalysis(),
                  const SizedBox(height: 24),
                  _buildPersonalityAnalysis(),
                  const SizedBox(height: 24),
                  _buildLifePathAnalysis(),
                  const SizedBox(height: 24),
                  _buildCompatibilityAnalysis(),
                  const SizedBox(height: 24),
                  _buildRecommendations(),
                  const SizedBox(height: 100),
                ],
              ),
            ),
          ),
        ),
      ),
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

  Widget _buildProfileHeader() {
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
          AnimatedBuilder(
            animation: _pulseAnimation,
            builder: (context, child) {
              return Transform.scale(
                scale: _pulseAnimation.value,
                child: Container(
                  width: 80,
                  height: 80,
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      colors: [AppTheme.supernovaGold, AppTheme.stellarYellow],
                    ),
                    shape: BoxShape.circle,
                    boxShadow: [
                      BoxShadow(
                        color: AppTheme.supernovaGold.withOpacity(0.5),
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
          const SizedBox(height: 16),
          Text(
            TranslationService.translate('complete_cosmic_analysis'),
            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
              color: Colors.white,
              fontWeight: FontWeight.bold,
            ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 8),
          Text(
            '${currentUser?.fullName ?? TranslationService.translate('cosmic_explorer')}',
            style: Theme.of(context).textTheme.titleLarge?.copyWith(
              color: Colors.white70,
              fontWeight: FontWeight.w600,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            TranslationService.translate('cosmic_analysis_description'),
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
              color: Colors.white70,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }

  Widget _buildAstrologyAnalysis() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            AppTheme.electricViolet.withOpacity(0.1),
            AppTheme.cosmicPurple.withOpacity(0.1),
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(
          color: AppTheme.electricViolet.withOpacity(0.3),
          width: 1.5,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(Icons.auto_awesome, color: AppTheme.electricViolet, size: 24),
              const SizedBox(width: 8),
              Text(
                TranslationService.translate('astrology_analysis'),
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                  color: AppTheme.electricViolet,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          _buildAstrologyCard('Western', 'Aries', '♈', AppTheme.electricViolet),
          const SizedBox(height: 12),
          _buildAstrologyCard('Vedic', 'Mesha', '♈', AppTheme.cosmicPurple),
          const SizedBox(height: 12),
          _buildAstrologyCard('Chinese', 'Dragon', '🐉', AppTheme.nebulaPink),
          const SizedBox(height: 12),
          _buildAstrologyCard('Sri Lankan', 'Aries', '♈', AppTheme.auroraGreen),
        ],
      ),
    );
  }

  Widget _buildAstrologyCard(String system, String sign, String symbol, Color color) {
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
      child: Row(
        children: [
          Text(
            symbol,
            style: const TextStyle(fontSize: 24),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  system,
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                    color: color,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                Text(
                  sign,
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    color: AppTheme.starlightWhite,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                Text(
                  TranslationService.translate('${system.toLowerCase()}_description'),
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                    color: AppTheme.starlightWhite.withOpacity(0.7),
                  ),
                ),
              ],
            ),
          ),
          Icon(
            Icons.arrow_forward_ios,
            color: color,
            size: 16,
          ),
        ],
      ),
    );
  }

  Widget _buildNumerologyAnalysis() {
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
              Icon(Icons.calculate, color: AppTheme.supernovaGold, size: 24),
              const SizedBox(width: 8),
              Text(
                TranslationService.translate('numerology_analysis'),
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
                child: _buildNumerologyCard(
                  TranslationService.translate('life_path'),
                  _calculateLifePathNumber(),
                  TranslationService.translate('life_path_description'),
                  AppTheme.supernovaGold,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _buildNumerologyCard(
                  TranslationService.translate('destiny'),
                  _calculateDestinyNumber(),
                  TranslationService.translate('destiny_description'),
                  AppTheme.stellarYellow,
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Row(
            children: [
              Expanded(
                child: _buildNumerologyCard(
                  TranslationService.translate('soul_urge'),
                  _calculateSoulUrgeNumber(),
                  TranslationService.translate('soul_urge_description'),
                  AppTheme.cosmicOrange,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _buildNumerologyCard(
                  TranslationService.translate('personality'),
                  _calculatePersonalityNumber(),
                  TranslationService.translate('personality_description'),
                  AppTheme.nebulaRed,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildNumerologyCard(String title, int number, String description, Color color) {
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
            number.toString(),
            style: Theme.of(context).textTheme.headlineMedium?.copyWith(
              color: color,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            title,
            style: Theme.of(context).textTheme.titleSmall?.copyWith(
              color: AppTheme.starlightWhite,
              fontWeight: FontWeight.w600,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            description,
            style: Theme.of(context).textTheme.bodySmall?.copyWith(
              color: AppTheme.starlightWhite.withOpacity(0.7),
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }

  Widget _buildPersonalityAnalysis() {
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
              Icon(Icons.psychology, color: AppTheme.celestialBlue, size: 24),
              const SizedBox(width: 8),
              Text(
                TranslationService.translate('personality_analysis'),
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                  color: AppTheme.celestialBlue,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          _buildPersonalityTrait('Leadership', 85, AppTheme.electricViolet),
          const SizedBox(height: 8),
          _buildPersonalityTrait('Creativity', 92, AppTheme.nebulaPink),
          const SizedBox(height: 8),
          _buildPersonalityTrait('Intuition', 78, AppTheme.auroraGreen),
          const SizedBox(height: 8),
          _buildPersonalityTrait('Communication', 88, AppTheme.supernovaGold),
        ],
      ),
    );
  }

  Widget _buildPersonalityTrait(String trait, int percentage, Color color) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              trait,
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                color: AppTheme.starlightWhite,
                fontWeight: FontWeight.w600,
              ),
            ),
            Text(
              '$percentage%',
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                color: color,
                fontWeight: FontWeight.bold,
              ),
            ),
          ],
        ),
        const SizedBox(height: 4),
        Container(
          height: 6,
          decoration: BoxDecoration(
            color: AppTheme.stellarGray,
            borderRadius: BorderRadius.circular(3),
          ),
          child: FractionallySizedBox(
            alignment: Alignment.centerLeft,
            widthFactor: percentage / 100,
            child: Container(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [color, color.withOpacity(0.7)],
                ),
                borderRadius: BorderRadius.circular(3),
              ),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildLifePathAnalysis() {
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
              Icon(Icons.route, color: AppTheme.auroraGreen, size: 24),
              const SizedBox(width: 8),
              Text(
                TranslationService.translate('life_path_analysis'),
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                  color: AppTheme.auroraGreen,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Text(
            TranslationService.translate('life_path_insights'),
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
              color: AppTheme.starlightWhite,
              height: 1.5,
            ),
          ),
          const SizedBox(height: 16),
          _buildLifePathPhase('Childhood (0-12)', 'Foundation building and learning'),
          const SizedBox(height: 8),
          _buildLifePathPhase('Youth (13-25)', 'Identity formation and exploration'),
          const SizedBox(height: 8),
          _buildLifePathPhase('Adulthood (26-50)', 'Career and relationship development'),
          const SizedBox(height: 8),
          _buildLifePathPhase('Maturity (51+)', 'Wisdom and legacy building'),
        ],
      ),
    );
  }

  Widget _buildLifePathPhase(String phase, String description) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: AppTheme.auroraGreen.withOpacity(0.1),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppTheme.auroraGreen.withOpacity(0.3)),
      ),
      child: Row(
        children: [
          Container(
            width: 8,
            height: 8,
            decoration: BoxDecoration(
              color: AppTheme.auroraGreen,
              shape: BoxShape.circle,
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  phase,
                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                    color: AppTheme.starlightWhite,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                Text(
                  description,
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                    color: AppTheme.starlightWhite.withOpacity(0.7),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCompatibilityAnalysis() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            AppTheme.nebulaPink.withOpacity(0.1),
            AppTheme.cosmicOrange.withOpacity(0.1),
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(
          color: AppTheme.nebulaPink.withOpacity(0.3),
          width: 1.5,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(Icons.favorite, color: AppTheme.nebulaPink, size: 24),
              const SizedBox(width: 8),
              Text(
                TranslationService.translate('compatibility_analysis'),
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                  color: AppTheme.nebulaPink,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          _buildCompatibilityCard('Fire Signs', 'Aries, Leo, Sagittarius', 95, AppTheme.nebulaRed),
          const SizedBox(height: 8),
          _buildCompatibilityCard('Air Signs', 'Gemini, Libra, Aquarius', 88, AppTheme.celestialBlue),
          const SizedBox(height: 8),
          _buildCompatibilityCard('Water Signs', 'Cancer, Scorpio, Pisces', 82, AppTheme.cosmicCyan),
          const SizedBox(height: 8),
          _buildCompatibilityCard('Earth Signs', 'Taurus, Virgo, Capricorn', 75, AppTheme.auroraGreen),
        ],
      ),
    );
  }

  Widget _buildCompatibilityCard(String signType, String signs, int compatibility, Color color) {
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
      child: Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  signType,
                  style: Theme.of(context).textTheme.titleSmall?.copyWith(
                    color: color,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                Text(
                  signs,
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                    color: AppTheme.starlightWhite.withOpacity(0.8),
                  ),
                ),
              ],
            ),
          ),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
            decoration: BoxDecoration(
              color: color,
              borderRadius: BorderRadius.circular(20),
            ),
            child: Text(
              '$compatibility%',
              style: Theme.of(context).textTheme.bodySmall?.copyWith(
                color: Colors.white,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildRecommendations() {
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
              Icon(Icons.lightbulb, color: AppTheme.cosmicPurple, size: 24),
              const SizedBox(width: 8),
              Text(
                TranslationService.translate('cosmic_recommendations'),
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                  color: AppTheme.cosmicPurple,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          _buildRecommendationItem(
            TranslationService.translate('daily_practice'),
            TranslationService.translate('daily_practice_description'),
            Icons.self_improvement,
            AppTheme.auroraGreen,
          ),
          const SizedBox(height: 12),
          _buildRecommendationItem(
            TranslationService.translate('career_guidance'),
            TranslationService.translate('career_guidance_description'),
            Icons.work,
            AppTheme.supernovaGold,
          ),
          const SizedBox(height: 12),
          _buildRecommendationItem(
            TranslationService.translate('relationship_advice'),
            TranslationService.translate('relationship_advice_description'),
            Icons.favorite,
            AppTheme.nebulaPink,
          ),
        ],
      ),
    );
  }

  Widget _buildRecommendationItem(String title, String description, IconData icon, Color color) {
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
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: color.withOpacity(0.2),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Icon(icon, color: color, size: 20),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: Theme.of(context).textTheme.titleSmall?.copyWith(
                    color: AppTheme.starlightWhite,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  description,
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                    color: AppTheme.starlightWhite.withOpacity(0.8),
                  ),
                ),
              ],
            ),
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
    return 7;
  }

  int _calculateDestinyNumber() {
    if (currentUser?.fullName != null) {
      return SimpleNumerologyService.calculateDestinyNumber(currentUser!.fullName);
    }
    return 3;
  }

  int _calculateSoulUrgeNumber() {
    if (currentUser?.fullName != null) {
      return SimpleNumerologyService.calculateSoulUrgeNumber(currentUser!.fullName);
    }
    return 9;
  }

  int _calculatePersonalityNumber() {
    if (currentUser?.fullName != null) {
      return SimpleNumerologyService.calculatePersonalityNumber(currentUser!.fullName);
    }
    return 5;
  }
}
