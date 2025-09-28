import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../../services/comprehensive_numerology_service.dart';
import '../../services/translation_service.dart';
import '../../models/user.dart';
import '../../utils/zodiac_utils.dart';
import '../../utils/vedic_zodiac_utils.dart';
import '../../utils/chinese_zodiac_utils.dart';
import '../../utils/sri_lankan_zodiac_utils.dart';
import '../components/breadcrumb_navigation.dart';

class FullAnalysisScreen extends StatefulWidget {
  final User user;
  final String? selectedSystem;
  final String? selectedSign;

  const FullAnalysisScreen({
    super.key,
    required this.user,
    this.selectedSystem,
    this.selectedSign,
  });

  @override
  State<FullAnalysisScreen> createState() => _FullAnalysisScreenState();
}

class _FullAnalysisScreenState extends State<FullAnalysisScreen> with TickerProviderStateMixin {
  late TabController _tabController;
  Map<String, dynamic>? _numerologyAnalysis;
  Map<String, dynamic>? _astrologyAnalysis;
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
    _loadAnalysis();
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  Future<void> _loadAnalysis() async {
    try {
      // Load comprehensive numerology analysis
      final lifePathAnalysis = ComprehensiveNumerologyService.calculateLifePathAnalysis(
        widget.user.dateOfBirth, 
        widget.user.fullName
      );
      
      final destinyAnalysis = ComprehensiveNumerologyService.calculateDestinyAnalysis(widget.user.fullName);
      final soulUrgeAnalysis = ComprehensiveNumerologyService.calculateSoulUrgeAnalysis(widget.user.fullName);
      final personalityAnalysis = ComprehensiveNumerologyService.calculatePersonalityAnalysis(widget.user.fullName);
      final personalYearAnalysis = ComprehensiveNumerologyService.calculatePersonalYearAnalysis(
        widget.user.dateOfBirth, 
        DateTime.now().year
      );
      final successBlueprint = ComprehensiveNumerologyService.generateSuccessBlueprint(
        widget.user.fullName, 
        widget.user.dateOfBirth
      );

      // Load comprehensive astrology analysis
      final westernSign = ZodiacUtils.getWesternZodiacSign(widget.user.dateOfBirth);
      final chineseSign = ChineseZodiacUtils.getChineseZodiacSign(widget.user.dateOfBirth);
      final sriLankanSign = SriLankanZodiacUtils.getSriLankanZodiacSign(widget.user.dateOfBirth);

      setState(() {
        _numerologyAnalysis = {
          'life_path': lifePathAnalysis,
          'destiny': destinyAnalysis,
          'soul_urge': soulUrgeAnalysis,
          'personality': personalityAnalysis,
          'personal_year': personalYearAnalysis,
          'success_blueprint': successBlueprint,
        };
        
        _astrologyAnalysis = {
          'western_sign': westernSign,
          'chinese_sign': chineseSign,
          'sri_lankan_sign': sriLankanSign,
          'western_info': ZodiacUtils.getZodiacInfo(westernSign),
          'chinese_info': ChineseZodiacUtils.getChineseZodiacInfo(chineseSign),
          'sri_lankan_info': SriLankanZodiacUtils.getSriLankanZodiacInfo(sriLankanSign),
        };
        
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          TranslationService.translate('full_analysis'),
          style: const TextStyle(color: AppTheme.starlightWhite),
        ),
        backgroundColor: AppTheme.deepSpaceBlack,
        foregroundColor: AppTheme.starlightWhite,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: AppTheme.starlightWhite),
          onPressed: () => Navigator.pop(context),
        ),
        bottom: TabBar(
          controller: _tabController,
          labelColor: AppTheme.supernovaGold,
          unselectedLabelColor: AppTheme.starlightWhite.withOpacity(0.7),
          indicatorColor: AppTheme.supernovaGold,
          tabs: [
            Tab(
              icon: const Icon(Icons.star),
              text: TranslationService.translate('astrology'),
            ),
            Tab(
              icon: const Icon(Icons.calculate),
              text: TranslationService.translate('numerology'),
            ),
          ],
        ),
      ),
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [AppTheme.deepSpaceBlack, AppTheme.darkBackground],
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
          ),
        ),
        child: Column(
          children: [
            // Breadcrumb Navigation
            Padding(
              padding: const EdgeInsets.all(16),
              child: BreadcrumbNavigation(
                items: BreadcrumbConfigs.fullAnalysisBreadcrumb(() {
                  Navigator.pop(context);
                }),
              ),
            ),
            // Main Content
            Expanded(
              child: _isLoading
                  ? const Center(
                      child: CircularProgressIndicator(
                        color: AppTheme.supernovaGold,
                      ),
                    )
                  : TabBarView(
                      controller: _tabController,
                      children: [
                        _buildAstrologyTab(),
                        _buildNumerologyTab(),
                      ],
                    ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildAstrologyTab() {
    if (_astrologyAnalysis == null) {
      return const Center(
        child: Text(
          'Failed to load astrology data',
          style: TextStyle(color: AppTheme.starlightWhite),
        ),
      );
    }

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildAstrologySystemCard(
            'Western Astrology',
            _astrologyAnalysis!['western_sign'],
            _astrologyAnalysis!['western_info'],
            AppTheme.electricViolet,
          ),
          const SizedBox(height: 16),
          _buildAstrologySystemCard(
            'Chinese Astrology',
            _astrologyAnalysis!['chinese_sign'],
            _astrologyAnalysis!['chinese_info'],
            AppTheme.nebulaPink,
          ),
          const SizedBox(height: 16),
          _buildAstrologySystemCard(
            'Sri Lankan Astrology',
            _astrologyAnalysis!['sri_lankan_sign'],
            _astrologyAnalysis!['sri_lankan_info'],
            AppTheme.celestialBlue,
          ),
        ],
      ),
    );
  }

  Widget _buildAstrologySystemCard(String title, String sign, Map<String, dynamic> info, Color color) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [color.withOpacity(0.1), color.withOpacity(0.05)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: color.withOpacity(0.3)),
        boxShadow: [
          BoxShadow(
            color: color.withOpacity(0.1),
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
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: color.withOpacity(0.2),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Text(
                  _getZodiacSymbol(sign),
                  style: const TextStyle(fontSize: 24, color: AppTheme.starlightWhite),
                ),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      title,
                      style: const TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: AppTheme.starlightWhite,
                      ),
                    ),
                    Text(
                      sign,
                      style: TextStyle(
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                        color: color,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          if (info['description'] != null) ...[
            Text(
              'Description',
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
                color: color,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              info['description'],
              style: const TextStyle(
                color: AppTheme.starlightWhite,
                height: 1.5,
              ),
            ),
            const SizedBox(height: 16),
          ],
          if (info['traits'] != null) ...[
            Text(
              'Key Traits',
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
                color: color,
              ),
            ),
            const SizedBox(height: 8),
            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: (info['traits'] as List).map((trait) => Container(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                decoration: BoxDecoration(
                  color: color.withOpacity(0.2),
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Text(
                  trait,
                  style: const TextStyle(color: AppTheme.starlightWhite),
                ),
              )).toList(),
            ),
            const SizedBox(height: 16),
          ],
          if (info['compatibility'] != null) ...[
            Text(
              'Compatibility',
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
                color: color,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              info['compatibility'],
              style: const TextStyle(
                color: AppTheme.starlightWhite,
                height: 1.5,
              ),
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildNumerologyTab() {
    if (_numerologyAnalysis == null) {
      return const Center(
        child: Text(
          'Failed to load numerology data',
          style: TextStyle(color: AppTheme.starlightWhite),
        ),
      );
    }

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildNumerologyCard(
            'Life Path Number',
            _numerologyAnalysis!['life_path'],
            AppTheme.supernovaGold,
            Icons.route,
          ),
          const SizedBox(height: 16),
          _buildNumerologyCard(
            'Destiny Number',
            _numerologyAnalysis!['destiny'],
            AppTheme.auroraGreen,
            Icons.star,
          ),
          const SizedBox(height: 16),
          _buildNumerologyCard(
            'Soul Urge Number',
            _numerologyAnalysis!['soul_urge'],
            AppTheme.nebulaPink,
            Icons.favorite,
          ),
          const SizedBox(height: 16),
          _buildNumerologyCard(
            'Personality Number',
            _numerologyAnalysis!['personality'],
            AppTheme.celestialBlue,
            Icons.person,
          ),
          const SizedBox(height: 16),
          _buildSuccessBlueprintCard(),
        ],
      ),
    );
  }

  Widget _buildNumerologyCard(String title, Map<String, dynamic> analysis, Color color, IconData icon) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [color.withOpacity(0.1), color.withOpacity(0.05)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: color.withOpacity(0.3)),
        boxShadow: [
          BoxShadow(
            color: color.withOpacity(0.1),
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
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: color.withOpacity(0.2),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Icon(icon, color: AppTheme.starlightWhite, size: 24),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      title,
                      style: const TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: AppTheme.starlightWhite,
                      ),
                    ),
                    Text(
                      '${analysis['number']} - ${analysis['meaning']}',
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w600,
                        color: color,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          if (analysis['core_traits'] != null) ...[
            Text(
              'Core Traits',
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
                color: color,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              analysis['core_traits'],
              style: const TextStyle(
                color: AppTheme.starlightWhite,
                height: 1.5,
              ),
            ),
            const SizedBox(height: 16),
          ],
          if (analysis['challenges'] != null) ...[
            Text(
              'Challenges',
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
                color: color,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              analysis['challenges'],
              style: const TextStyle(
                color: AppTheme.starlightWhite,
                height: 1.5,
              ),
            ),
            const SizedBox(height: 16),
          ],
          if (analysis['opportunities'] != null) ...[
            Text(
              'Opportunities',
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
                color: color,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              analysis['opportunities'],
              style: const TextStyle(
                color: AppTheme.starlightWhite,
                height: 1.5,
              ),
            ),
            const SizedBox(height: 16),
          ],
          if (analysis['advice'] != null) ...[
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: color.withOpacity(0.1),
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: color.withOpacity(0.3)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Cosmic Guidance',
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.bold,
                      color: color,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    analysis['advice'],
                    style: const TextStyle(
                      color: AppTheme.starlightWhite,
                      height: 1.5,
                      fontStyle: FontStyle.italic,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildSuccessBlueprintCard() {
    final blueprint = _numerologyAnalysis!['success_blueprint'];
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [AppTheme.supernovaGold.withOpacity(0.1), AppTheme.auroraGreen.withOpacity(0.1)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: AppTheme.supernovaGold.withOpacity(0.3)),
        boxShadow: [
          BoxShadow(
            color: AppTheme.supernovaGold.withOpacity(0.1),
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
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: AppTheme.supernovaGold.withOpacity(0.2),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: const Icon(Icons.auto_awesome, color: AppTheme.starlightWhite, size: 24),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Text(
                  blueprint['title'],
                  style: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: AppTheme.starlightWhite,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Text(
            blueprint['overview'],
            style: const TextStyle(
              color: AppTheme.starlightWhite,
              height: 1.5,
            ),
          ),
          const SizedBox(height: 16),
          if (blueprint['key_strengths'] != null) ...[
            Text(
              'Key Strengths',
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
                color: AppTheme.supernovaGold,
              ),
            ),
            const SizedBox(height: 8),
            ...(blueprint['key_strengths'] as List).map((strength) => Padding(
              padding: const EdgeInsets.only(bottom: 4),
              child: Row(
                children: [
                  const Text('• ', style: TextStyle(color: AppTheme.starlightWhite)),
                  Expanded(
                    child: Text(
                      strength,
                      style: const TextStyle(color: AppTheme.starlightWhite),
                    ),
                  ),
                ],
              ),
            )),
            const SizedBox(height: 16),
          ],
          if (blueprint['actionable_steps'] != null) ...[
            Text(
              'Actionable Steps',
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
                color: AppTheme.supernovaGold,
              ),
            ),
            const SizedBox(height: 8),
            ...(blueprint['actionable_steps'] as List).map((step) => Padding(
              padding: const EdgeInsets.only(bottom: 4),
              child: Row(
                children: [
                  const Text('• ', style: TextStyle(color: AppTheme.starlightWhite)),
                  Expanded(
                    child: Text(
                      step,
                      style: const TextStyle(color: AppTheme.starlightWhite),
                    ),
                  ),
                ],
              ),
            )),
          ],
        ],
      ),
    );
  }

  String _getZodiacSymbol(String sign) {
    const symbols = {
      'Aries': '♈',
      'Taurus': '♉',
      'Gemini': '♊',
      'Cancer': '♋',
      'Leo': '♌',
      'Virgo': '♍',
      'Libra': '♎',
      'Scorpio': '♏',
      'Sagittarius': '♐',
      'Capricorn': '♑',
      'Aquarius': '♒',
      'Pisces': '♓',
    };
    return symbols[sign] ?? '♈';
  }
}
