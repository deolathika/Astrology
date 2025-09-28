import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../../services/translation_service.dart';
import '../../services/database_service.dart';
import '../../models/user.dart';
import 'cosmic_profile_analysis_screen.dart';

class CompatibilityScreen extends StatefulWidget {
  const CompatibilityScreen({super.key});

  @override
  State<CompatibilityScreen> createState() => _CompatibilityScreenState();
}

class _CompatibilityScreenState extends State<CompatibilityScreen> with TickerProviderStateMixin {
  String _currentLanguage = 'en';
  late AnimationController _animationController;
  late Animation<double> _fadeAnimation;
  
  int _selectedTab = 0;
  final List<String> _tabs = ['Analysis', 'Matches', 'Insights', 'Tips'];
  
  // Mock compatibility data
  final Map<String, dynamic> _compatibilityData = {
    'overall': 92,
    'astrology': 95,
    'numerology': 88,
    'personality': 90,
    'communication': 85,
    'intimacy': 94,
    'friendship': 96,
    'longTerm': 89,
  };

  final List<Map<String, dynamic>> _compatibilityMatches = [
    {
      'id': '1',
      'name': 'Sarah Johnson',
      'age': 28,
      'zodiac': 'Leo',
      'numerology': 7,
      'overallCompatibility': 95,
      'image': '👩‍🦰',
      'location': 'New York, USA',
      'lastActive': '2 hours ago',
    },
    {
      'id': '2',
      'name': 'Michael Chen',
      'age': 32,
      'zodiac': 'Scorpio',
      'numerology': 3,
      'overallCompatibility': 88,
      'image': '👨‍💼',
      'location': 'Los Angeles, USA',
      'lastActive': '5 hours ago',
    },
  ];

  @override
  void initState() {
    super.initState();
    _currentLanguage = TranslationService.currentLanguage;
    
    _animationController = AnimationController(
      duration: const Duration(milliseconds: 1200),
      vsync: this,
    );
    _fadeAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _animationController, curve: Curves.easeInOut),
    );
    
    _animationController.forward();
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.deepSpaceBlack,
      appBar: AppBar(
        title: Text(TranslationService.translate('compatibility')),
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
            child: Column(
              children: [
                _buildTranslationBar(),
                _buildTabBar(),
                Expanded(
                  child: _buildTabContent(),
                ),
              ],
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
      margin: const EdgeInsets.all(16),
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

  Widget _buildTabBar() {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            AppTheme.electricViolet.withOpacity(0.1),
            AppTheme.cosmicPurple.withOpacity(0.1),
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: AppTheme.electricViolet.withOpacity(0.3),
          width: 1,
        ),
      ),
      child: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: Row(
          children: _tabs.asMap().entries.map((entry) {
            int index = entry.key;
            String tab = entry.value;
            bool isSelected = _selectedTab == index;
            
            return GestureDetector(
              onTap: () => setState(() => _selectedTab = index),
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                margin: const EdgeInsets.all(4),
                decoration: BoxDecoration(
                  gradient: isSelected
                      ? LinearGradient(
                          colors: [AppTheme.electricViolet, AppTheme.cosmicPurple],
                        )
                      : null,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Text(
                  tab,
                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                    color: isSelected ? Colors.white : AppTheme.starlightWhite,
                    fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                  ),
                ),
              ),
            );
          }).toList(),
        ),
      ),
    );
  }

  Widget _buildTabContent() {
    switch (_selectedTab) {
      case 0:
        return _buildAnalysisTab();
      case 1:
        return _buildMatchesTab();
      case 2:
        return _buildInsightsTab();
      case 3:
        return _buildTipsTab();
      default:
        return _buildAnalysisTab();
    }
  }

  Widget _buildAnalysisTab() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildOverallCompatibility(),
          const SizedBox(height: 24),
          _buildCompatibilityBreakdown(),
        ],
      ),
    );
  }

  Widget _buildOverallCompatibility() {
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
          Container(
            width: 100,
            height: 100,
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
            child: Center(
              child: Text(
                '${_compatibilityData['overall']}%',
                style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ),
          const SizedBox(height: 16),
          Text(
            'Overall Compatibility',
            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
              color: Colors.white,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            'Your cosmic connection is exceptionally strong!',
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
              color: Colors.white70,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }

  Widget _buildCompatibilityBreakdown() {
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
              Icon(Icons.analytics, color: AppTheme.celestialBlue, size: 24),
              const SizedBox(width: 8),
              Text(
                'Compatibility Breakdown',
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                  color: AppTheme.celestialBlue,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          _buildCompatibilityBar('Astrology', _compatibilityData['astrology'], AppTheme.electricViolet),
          const SizedBox(height: 12),
          _buildCompatibilityBar('Numerology', _compatibilityData['numerology'], AppTheme.supernovaGold),
          const SizedBox(height: 12),
          _buildCompatibilityBar('Personality', _compatibilityData['personality'], AppTheme.celestialBlue),
          const SizedBox(height: 12),
          _buildCompatibilityBar('Communication', _compatibilityData['communication'], AppTheme.auroraGreen),
          const SizedBox(height: 12),
          _buildCompatibilityBar('Intimacy', _compatibilityData['intimacy'], AppTheme.nebulaPink),
          const SizedBox(height: 12),
          _buildCompatibilityBar('Friendship', _compatibilityData['friendship'], AppTheme.cosmicOrange),
          const SizedBox(height: 12),
          _buildCompatibilityBar('Long-term', _compatibilityData['longTerm'], AppTheme.stellarTeal),
        ],
      ),
    );
  }

  Widget _buildCompatibilityBar(String label, int percentage, Color color) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              label,
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
          height: 8,
          decoration: BoxDecoration(
            color: AppTheme.stellarGray,
            borderRadius: BorderRadius.circular(4),
          ),
          child: FractionallySizedBox(
            alignment: Alignment.centerLeft,
            widthFactor: percentage / 100,
            child: Container(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [color, color.withOpacity(0.7)],
                ),
                borderRadius: BorderRadius.circular(4),
              ),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildMatchesTab() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildSectionHeader('Your Cosmic Matches', Icons.favorite, AppTheme.nebulaPink),
          const SizedBox(height: 16),
          ..._compatibilityMatches.map((match) => _buildMatchCard(match)).toList(),
        ],
      ),
    );
  }

  Widget _buildInsightsTab() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildSectionHeader('Compatibility Insights', Icons.lightbulb, AppTheme.supernovaGold),
          const SizedBox(height: 16),
          _buildInsightCard('Astrological Harmony', 'Your zodiac signs create a powerful cosmic connection.', 95, AppTheme.electricViolet),
          _buildInsightCard('Numerological Balance', 'Your life path numbers complement each other perfectly.', 88, AppTheme.supernovaGold),
          _buildInsightCard('Personality Match', 'Your personality traits align beautifully.', 90, AppTheme.celestialBlue),
        ],
      ),
    );
  }

  Widget _buildTipsTab() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildSectionHeader('Compatibility Tips', Icons.tips_and_updates, AppTheme.auroraGreen),
          const SizedBox(height: 16),
          _buildTipCard('Strengthen Your Bond', 'Practice daily meditation together to enhance your cosmic connection.', 'Spiritual', AppTheme.electricViolet),
          _buildTipCard('Communication Tips', 'Use active listening and express your feelings openly.', 'Communication', AppTheme.celestialBlue),
          _buildTipCard('Shared Activities', 'Explore astrology and numerology together.', 'Activities', AppTheme.supernovaGold),
        ],
      ),
    );
  }

  Widget _buildSectionHeader(String title, IconData icon, Color color) {
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
          Icon(icon, color: color, size: 24),
          const SizedBox(width: 12),
          Text(
            title,
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
              color: color,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildMatchCard(Map<String, dynamic> match) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            AppTheme.cosmicNavy.withOpacity(0.8),
            AppTheme.nebulaDark.withOpacity(0.8),
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: AppTheme.nebulaPink.withOpacity(0.3),
          width: 1,
        ),
        boxShadow: [
          BoxShadow(
            color: AppTheme.nebulaPink.withOpacity(0.1),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Row(
        children: [
          Container(
            width: 60,
            height: 60,
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [AppTheme.nebulaPink, AppTheme.cosmicOrange],
              ),
              shape: BoxShape.circle,
            ),
            child: Center(
              child: Text(
                match['image'],
                style: const TextStyle(fontSize: 24),
              ),
            ),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  match['name'],
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    color: AppTheme.starlightWhite,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  '${match['age']} • ${match['location']}',
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                    color: AppTheme.cosmicSilver,
                  ),
                ),
                const SizedBox(height: 8),
                Row(
                  children: [
                    _buildCompatibilityChip('${match['overallCompatibility']}%', AppTheme.nebulaPink),
                    const SizedBox(width: 8),
                    _buildZodiacChip(match['zodiac'], AppTheme.electricViolet),
                    const SizedBox(width: 8),
                    _buildNumerologyChip(match['numerology'], AppTheme.supernovaGold),
                  ],
                ),
                const SizedBox(height: 8),
                Text(
                  'Last active: ${match['lastActive']}',
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                    color: AppTheme.cosmicSilver.withOpacity(0.7),
                  ),
                ),
              ],
            ),
          ),
          Column(
            children: [
              GestureDetector(
                onTap: () => _viewProfile(match),
                child: Container(
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      colors: [AppTheme.nebulaPink, AppTheme.cosmicOrange],
                    ),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: const Icon(Icons.visibility, color: Colors.white, size: 16),
                ),
              ),
              const SizedBox(height: 8),
              GestureDetector(
                onTap: () => _startChat(match),
                child: Container(
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      colors: [AppTheme.auroraGreen, AppTheme.stellarTeal],
                    ),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: const Icon(Icons.chat, color: Colors.white, size: 16),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildInsightCard(String title, String description, int score, Color color) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            color.withOpacity(0.1),
            color.withOpacity(0.05),
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: color.withOpacity(0.3),
          width: 1,
        ),
      ),
      child: Row(
        children: [
          Container(
            width: 50,
            height: 50,
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [color, color.withOpacity(0.7)],
              ),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Icon(
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
                  title,
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    color: AppTheme.starlightWhite,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  description,
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                    color: AppTheme.cosmicSilver,
                  ),
                ),
              ],
            ),
          ),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [color, color.withOpacity(0.7)],
              ),
              borderRadius: BorderRadius.circular(20),
            ),
            child: Text(
              '$score%',
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

  Widget _buildTipCard(String title, String description, String category, Color color) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            color.withOpacity(0.1),
            color.withOpacity(0.05),
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: color.withOpacity(0.3),
          width: 1,
        ),
      ),
      child: Row(
        children: [
          Container(
            width: 50,
            height: 50,
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [color, color.withOpacity(0.7)],
              ),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Icon(
              Icons.lightbulb,
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
                  title,
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    color: AppTheme.starlightWhite,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  description,
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                    color: AppTheme.cosmicSilver,
                  ),
                ),
                const SizedBox(height: 8),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  decoration: BoxDecoration(
                    color: color.withOpacity(0.2),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Text(
                    category,
                    style: Theme.of(context).textTheme.bodySmall?.copyWith(
                      color: color,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCompatibilityChip(String text, Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: color.withOpacity(0.2),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: color.withOpacity(0.3)),
      ),
      child: Text(
        text,
        style: Theme.of(context).textTheme.bodySmall?.copyWith(
          color: color,
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }

  Widget _buildZodiacChip(String zodiac, Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: color.withOpacity(0.2),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: color.withOpacity(0.3)),
      ),
      child: Text(
        zodiac,
        style: Theme.of(context).textTheme.bodySmall?.copyWith(
          color: color,
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }

  Widget _buildNumerologyChip(int number, Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: color.withOpacity(0.2),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: color.withOpacity(0.3)),
      ),
      child: Text(
        'Num $number',
        style: Theme.of(context).textTheme.bodySmall?.copyWith(
          color: color,
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }

  // Action methods
  void _viewProfile(Map<String, dynamic> match) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => CosmicProfileAnalysisScreen(),
      ),
    );
  }

  void _startChat(Map<String, dynamic> match) {
    // Navigate to chat screen
    print('Starting chat with ${match['name']}');
  }
}