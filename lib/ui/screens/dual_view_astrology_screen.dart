import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../theme/app_theme.dart';
import '../../services/advanced_modern_numerology_service.dart';
import '../../services/advanced_astrology_service.dart';
import '../../utils/zodiac_utils.dart';
import '../../utils/vedic_zodiac_utils.dart';
import '../../utils/chinese_zodiac_utils.dart';
import '../../utils/sri_lankan_zodiac_utils.dart';
import '../components/animated_card.dart';

/// Enhanced Dual-View Astrology and Numerology Screen
/// Incorporates Advanced Modern Numerology expertise
/// Shows both Western and Vedic astrology side by side
class DualViewAstrologyScreen extends StatefulWidget {
  final String fullName;
  final DateTime birthDate;
  final String birthPlace;

  const DualViewAstrologyScreen({
    super.key,
    required this.fullName,
    required this.birthDate,
    required this.birthPlace,
  });

  @override
  State<DualViewAstrologyScreen> createState() => _DualViewAstrologyScreenState();
}

class _DualViewAstrologyScreenState extends State<DualViewAstrologyScreen>
    with TickerProviderStateMixin {
  late TabController _tabController;
  late AnimationController _animationController;
  late Animation<double> _fadeAnimation;
  late Animation<Offset> _slideAnimation;

  Map<String, dynamic>? _numerologyAnalysis;
  Map<String, dynamic>? _astrologyAnalysis;
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 4, vsync: this);
    _animationController = AnimationController(
      duration: const Duration(milliseconds: 1200),
      vsync: this,
    );
    
    _fadeAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _animationController,
      curve: const Interval(0.0, 0.6, curve: Curves.easeOut),
    ));
    
    _slideAnimation = Tween<Offset>(
      begin: const Offset(0.0, 0.3),
      end: Offset.zero,
    ).animate(CurvedAnimation(
      parent: _animationController,
      curve: const Interval(0.2, 0.8, curve: Curves.easeOut),
    ));

    _loadAnalysis();
  }

  @override
  void dispose() {
    _tabController.dispose();
    _animationController.dispose();
    super.dispose();
  }

  Future<void> _loadAnalysis() async {
    try {
      // Load advanced numerology analysis
      final lifePathAnalysis = AdvancedModernNumerologyService.calculateLifePathAnalysis(
        widget.birthDate, 
        widget.fullName
      );
      
      final destinyAnalysis = AdvancedModernNumerologyService.calculateDestinyAnalysis(widget.fullName);
      final soulUrgeAnalysis = AdvancedModernNumerologyService.calculateSoulUrgeAnalysis(widget.fullName);
      final personalityAnalysis = AdvancedModernNumerologyService.calculatePersonalityAnalysis(widget.fullName);
      final personalYearAnalysis = AdvancedModernNumerologyService.calculatePersonalYearAnalysis(
        widget.birthDate, 
        DateTime.now().year
      );
      final successBlueprint = AdvancedModernNumerologyService.generateSuccessBlueprint(
        widget.fullName, 
        widget.birthDate
      );

      // Load comprehensive astrology analysis
      final westernSign = ZodiacUtils.getWesternZodiacSign(widget.birthDate);
      final vedicRashi = VedicZodiacUtils.getRashi(widget.birthDate, widget.birthPlace);
      final chineseSign = ChineseZodiacUtils.getChineseZodiacSign(widget.birthDate);
      final sriLankanSign = SriLankanZodiacUtils.getSriLankanZodiacSign(widget.birthDate);

      final astrologyData = AdvancedAstrologyService.calculateComprehensiveChart(
        widget.birthDate,
        widget.birthPlace,
      );

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
          'vedic_rashi': vedicRashi,
          'chinese_sign': chineseSign,
          'sri_lankan_sign': sriLankanSign,
          'comprehensive_chart': astrologyData,
          'western_info': ZodiacUtils.getZodiacInfo(westernSign),
          'vedic_info': VedicZodiacUtils.getVedicZodiacInfo(vedicRashi),
          'chinese_info': ChineseZodiacUtils.getChineseZodiacInfo(chineseSign),
          'sri_lankan_info': SriLankanZodiacUtils.getSriLankanZodiacInfo(sriLankanSign),
        };
        
        _isLoading = false;
      });

      _animationController.forward();
    } catch (e) {
      setState(() {
        _isLoading = false;
      });
      
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Error loading analysis: $e'),
            backgroundColor: Colors.red,
          ),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          gradient: AppTheme.cosmicGradient,
        ),
        child: SafeArea(
          child: Column(
            children: [
              _buildHeader(),
              _buildTabBar(),
              Expanded(
                child: _isLoading
                    ? _buildLoadingView()
                    : _buildTabBarView(),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildHeader() {
    return Container(
      padding: const EdgeInsets.all(20),
      child: Column(
        children: [
          Row(
            children: [
              IconButton(
                onPressed: () => Navigator.pop(context),
                icon: const Icon(Icons.arrow_back, color: Colors.white),
              ),
              Expanded(
                child: Text(
                  'Dual-View Analysis',
                  style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                  ),
                  textAlign: TextAlign.center,
                ),
              ),
              IconButton(
                onPressed: () => _shareAnalysis(),
                icon: const Icon(Icons.share, color: Colors.white),
              ),
            ],
          ),
          const SizedBox(height: 10),
          Text(
            'Advanced Modern Numerology & Comprehensive Astrology',
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
              color: Colors.white70,
              fontStyle: FontStyle.italic,
            ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 5),
          Text(
            '${widget.fullName} • ${_formatDate(widget.birthDate)} • ${widget.birthPlace}',
            style: Theme.of(context).textTheme.bodySmall?.copyWith(
              color: Colors.white60,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }

  Widget _buildTabBar() {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 20),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.1),
        borderRadius: BorderRadius.circular(25),
        border: Border.all(color: Colors.white.withOpacity(0.2)),
      ),
      child: TabBar(
        controller: _tabController,
        indicator: BoxDecoration(
          color: AppTheme.brandYellow,
          borderRadius: BorderRadius.circular(25),
        ),
        labelColor: AppTheme.cosmicDark,
        unselectedLabelColor: Colors.white70,
        labelStyle: const TextStyle(
          fontSize: 12,
          fontWeight: FontWeight.w600,
        ),
        tabs: const [
          Tab(
            icon: Icon(Icons.psychology, size: 16),
            text: 'Numerology',
          ),
          Tab(
            icon: Icon(Icons.stars, size: 16),
            text: 'Dual Astrology',
          ),
          Tab(
            icon: Icon(Icons.favorite, size: 16),
            text: 'Compatibility',
          ),
          Tab(
            icon: Icon(Icons.trending_up, size: 16),
            text: 'Success Path',
          ),
        ],
      ),
    );
  }

  Widget _buildTabBarView() {
    return FadeTransition(
      opacity: _fadeAnimation,
      child: SlideTransition(
        position: _slideAnimation,
        child: TabBarView(
          controller: _tabController,
          children: [
            _buildNumerologyView(),
            _buildDualAstrologyView(),
            _buildCompatibilityView(),
            _buildSuccessPathView(),
          ],
        ),
      ),
    );
  }

  Widget _buildLoadingView() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.1),
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: Colors.white.withOpacity(0.2)),
            ),
            child: Column(
              children: [
                SizedBox(
                  width: 60,
                  height: 60,
                  child: CircularProgressIndicator(
                    strokeWidth: 3,
                    valueColor: AlwaysStoppedAnimation<Color>(AppTheme.brandYellow),
                  ),
                ),
                const SizedBox(height: 20),
                Text(
                  'Analyzing your cosmic blueprint...',
                  style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                    color: Colors.white,
                    fontWeight: FontWeight.w500,
                  ),
                ),
                const SizedBox(height: 10),
                Text(
                  'Incorporating comprehensive 383-page expertise',
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                    color: Colors.white70,
                    fontStyle: FontStyle.italic,
                  ),
                  textAlign: TextAlign.center,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildNumerologyView() {
    if (_numerologyAnalysis == null) return const SizedBox();

    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildSectionTitle('Advanced Numerology Analysis', 
              'Your "Number Code" of Life'),
          const SizedBox(height: 20),
          
          // Life Path Analysis
          AnimatedCard(
            child: _buildLifePathCard(_numerologyAnalysis!['life_path']),
          ),
          const SizedBox(height: 16),
          
          // Core Numbers Grid
          Row(
            children: [
              Expanded(
                child: AnimatedCard(
                  child: _buildCoreNumberCard(
                    'Destiny',
                    _numerologyAnalysis!['destiny']['destiny_number'],
                    _numerologyAnalysis!['destiny']['life_mission'],
                    Icons.flag,
                    AppTheme.cosmicPink,
                  ),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: AnimatedCard(
                  child: _buildCoreNumberCard(
                    'Soul Urge',
                    _numerologyAnalysis!['soul_urge']['soul_urge_number'],
                    _numerologyAnalysis!['soul_urge']['heart_desires'],
                    Icons.favorite,
                    AppTheme.mysticalPurple,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          
          Row(
            children: [
              Expanded(
                child: AnimatedCard(
                  child: _buildCoreNumberCard(
                    'Personality',
                    _numerologyAnalysis!['personality']['personality_number'],
                    _numerologyAnalysis!['personality']['outer_image'],
                    Icons.person,
                    AppTheme.softBlue,
                  ),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: AnimatedCard(
                  child: _buildCoreNumberCard(
                    'Personal Year',
                    _numerologyAnalysis!['personal_year']['personal_year_number'],
                    _numerologyAnalysis!['personal_year']['year_theme'],
                    Icons.calendar_today,
                    AppTheme.brandYellow,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 20),
          
          // Spiritual Lessons
          AnimatedCard(
            child: _buildSpiritualLessonsCard(_numerologyAnalysis!['life_path']),
          ),
          const SizedBox(height: 16),
          
          // Lucky Elements
          AnimatedCard(
            child: _buildLuckyElementsCard(_numerologyAnalysis!['life_path']),
          ),
        ],
      ),
    );
  }

  Widget _buildDualAstrologyView() {
    if (_astrologyAnalysis == null) return const SizedBox();

    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildSectionTitle('Dual Astrology Systems', 
              'Western & Vedic Side-by-Side Comparison'),
          const SizedBox(height: 20),
          
          // Dual View Cards
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Western Astrology
              Expanded(
                child: Column(
                  children: [
                    Text(
                      'Western Astrology',
                      style: Theme.of(context).textTheme.titleMedium?.copyWith(
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 12),
                    AnimatedCard(
                      child: _buildAstrologySystemCard(
                        'Western',
                        _astrologyAnalysis!['western_sign'],
                        _astrologyAnalysis!['western_info'],
                        AppTheme.softBlue,
                        Icons.public,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(width: 12),
              
              // Vedic Astrology
              Expanded(
                child: Column(
                  children: [
                    Text(
                      'Vedic Astrology',
                      style: Theme.of(context).textTheme.titleMedium?.copyWith(
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 12),
                    AnimatedCard(
                      child: _buildAstrologySystemCard(
                        'Vedic',
                        _astrologyAnalysis!['vedic_rashi'],
                        _astrologyAnalysis!['vedic_info'],
                        AppTheme.mysticalPurple,
                        Icons.self_improvement,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 20),
          
          // Additional Systems
          Row(
            children: [
              Expanded(
                child: AnimatedCard(
                  child: _buildAstrologySystemCard(
                    'Chinese',
                    _astrologyAnalysis!['chinese_sign'],
                    _astrologyAnalysis!['chinese_info'],
                    AppTheme.cosmicPink,
                    Icons.yin_yang,
                  ),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: AnimatedCard(
                  child: _buildAstrologySystemCard(
                    'Sri Lankan',
                    _astrologyAnalysis!['sri_lankan_sign'],
                    _astrologyAnalysis!['sri_lankan_info'],
                    AppTheme.brandYellow,
                    Icons.location_on,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 20),
          
          // Comprehensive Chart Analysis
          AnimatedCard(
            child: _buildComprehensiveChartCard(_astrologyAnalysis!['comprehensive_chart']),
          ),
        ],
      ),
    );
  }

  Widget _buildCompatibilityView() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildSectionTitle('Compatibility Analysis', 
              'Relationship & Partnership Insights'),
          const SizedBox(height: 20),
          
          // Partner Input Section
          AnimatedCard(
            child: Container(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Icon(Icons.favorite, color: AppTheme.cosmicPink, size: 24),
                      const SizedBox(width: 12),
                      Text(
                        'Partner Compatibility',
                        style: Theme.of(context).textTheme.titleLarge?.copyWith(
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  Text(
                    'Enter your partner\'s details to get a comprehensive compatibility analysis using advanced methods.',
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      color: Colors.grey[600],
                    ),
                  ),
                  const SizedBox(height: 20),
                  
                  ElevatedButton.icon(
                    onPressed: () => _showPartnerInputDialog(),
                    icon: const Icon(Icons.add),
                    label: const Text('Add Partner Details'),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppTheme.cosmicPink,
                      foregroundColor: Colors.white,
                      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                    ),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 16),
          
          // Self-Compatibility Insights
          AnimatedCard(
            child: _buildSelfCompatibilityCard(),
          ),
        ],
      ),
    );
  }

  Widget _buildSuccessPathView() {
    if (_numerologyAnalysis == null) return const SizedBox();

    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildSectionTitle('Success Blueprint', 
              'Advanced Path to Achievement'),
          const SizedBox(height: 20),
          
          // Success Formula
          AnimatedCard(
            child: _buildSuccessFormulaCard(_numerologyAnalysis!['success_blueprint']),
          ),
          const SizedBox(height: 16),
          
          // Career & Wealth
          Row(
            children: [
              Expanded(
                child: AnimatedCard(
                  child: _buildSuccessAreaCard(
                    'Career Path',
                    _numerologyAnalysis!['success_blueprint']['optimal_career_paths'],
                    Icons.work,
                    AppTheme.softBlue,
                  ),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: AnimatedCard(
                  child: _buildSuccessAreaCard(
                    'Wealth Methods',
                    _numerologyAnalysis!['success_blueprint']['wealth_attraction_methods'],
                    Icons.monetization_on,
                    AppTheme.brandYellow,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          
          // Timing & Mantras
          AnimatedCard(
            child: _buildTimingAndMantrasCard(_numerologyAnalysis!['success_blueprint']),
          ),
        ],
      ),
    );
  }

  Widget _buildSectionTitle(String title, String subtitle) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: Theme.of(context).textTheme.headlineSmall?.copyWith(
            color: Colors.white,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 4),
        Text(
          subtitle,
          style: Theme.of(context).textTheme.bodyMedium?.copyWith(
            color: Colors.white70,
            fontStyle: FontStyle.italic,
          ),
        ),
      ],
    );
  }

  Widget _buildLifePathCard(Map<String, dynamic> lifePathData) {
    return Container(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                width: 60,
                height: 60,
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    colors: [AppTheme.mysticalPurple, AppTheme.cosmicPink],
                  ),
                  borderRadius: BorderRadius.circular(30),
                ),
                child: Center(
                  child: Text(
                    '${lifePathData['life_path_number']}',
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Life Path Number',
                      style: Theme.of(context).textTheme.titleLarge?.copyWith(
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    if (lifePathData['is_master_number'] == true) ...[
                      Container(
                        margin: const EdgeInsets.only(top: 4),
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                        decoration: BoxDecoration(
                          color: AppTheme.brandYellow,
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: Text(
                          'MASTER NUMBER',
                          style: Theme.of(context).textTheme.labelSmall?.copyWith(
                            color: AppTheme.cosmicDark,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ],
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          
          Text(
            'Spiritual Meaning',
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
              fontWeight: FontWeight.w600,
              color: AppTheme.mysticalPurple,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            lifePathData['spiritual_meaning'],
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
              height: 1.5,
            ),
          ),
          const SizedBox(height: 16),
          
          Text(
            'Life Purpose',
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
              fontWeight: FontWeight.w600,
              color: AppTheme.cosmicPink,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            lifePathData['life_purpose'],
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
              height: 1.5,
            ),
          ),
          const SizedBox(height: 16),
          
          // Personality Traits
          Text(
            'Key Traits',
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
              fontWeight: FontWeight.w600,
              color: AppTheme.softBlue,
            ),
          ),
          const SizedBox(height: 8),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: (lifePathData['personality_traits'] as List<String>)
                .take(6)
                .map((trait) => Container(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                      decoration: BoxDecoration(
                        color: AppTheme.softBlue.withOpacity(0.1),
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(color: AppTheme.softBlue.withOpacity(0.3)),
                      ),
                      child: Text(
                        trait,
                        style: Theme.of(context).textTheme.bodySmall?.copyWith(
                          color: AppTheme.softBlue,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ))
                .toList(),
          ),
        ],
      ),
    );
  }

  Widget _buildCoreNumberCard(
    String title,
    int number,
    String description,
    IconData icon,
    Color color,
  ) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(icon, color: color, size: 20),
              const SizedBox(width: 8),
              Expanded(
                child: Text(
                  title,
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.bold,
                    color: color,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          
          Center(
            child: Container(
              width: 50,
              height: 50,
              decoration: BoxDecoration(
                color: color,
                borderRadius: BorderRadius.circular(25),
              ),
              child: Center(
                child: Text(
                  '$number',
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ),
          ),
          const SizedBox(height: 12),
          
          Text(
            description,
            style: Theme.of(context).textTheme.bodySmall?.copyWith(
              height: 1.4,
            ),
            textAlign: TextAlign.center,
            maxLines: 3,
            overflow: TextOverflow.ellipsis,
          ),
        ],
      ),
    );
  }

  Widget _buildSpiritualLessonsCard(Map<String, dynamic> lifePathData) {
    return Container(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(Icons.school, color: AppTheme.mysticalPurple, size: 24),
              const SizedBox(width: 12),
              Text(
                'Spiritual Lessons & Growth',
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          
          ...((lifePathData['spiritual_lessons'] as List<String>))
              .map((lesson) => Padding(
                    padding: const EdgeInsets.only(bottom: 8),
                    child: Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Container(
                          width: 6,
                          height: 6,
                          margin: const EdgeInsets.only(top: 8, right: 12),
                          decoration: BoxDecoration(
                            color: AppTheme.mysticalPurple,
                            borderRadius: BorderRadius.circular(3),
                          ),
                        ),
                        Expanded(
                          child: Text(
                            lesson,
                            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                              height: 1.5,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ))
              .toList(),
        ],
      ),
    );
  }

  Widget _buildLuckyElementsCard(Map<String, dynamic> lifePathData) {
    final luckyElements = lifePathData['lucky_elements'] as Map<String, dynamic>;
    
    return Container(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(Icons.stars, color: AppTheme.brandYellow, size: 24),
              const SizedBox(width: 12),
              Text(
                'Lucky Elements',
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          
          GridView.count(
            crossAxisCount: 2,
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            childAspectRatio: 3,
            crossAxisSpacing: 12,
            mainAxisSpacing: 12,
            children: [
              _buildLuckyElementItem('Colors', luckyElements['colors'].join(', '), Icons.palette),
              _buildLuckyElementItem('Numbers', luckyElements['numbers'].join(', '), Icons.filter_9_plus),
              _buildLuckyElementItem('Days', luckyElements['days'].join(', '), Icons.calendar_today),
              _buildLuckyElementItem('Gems', luckyElements['gemstones'].join(', '), Icons.diamond),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildLuckyElementItem(String title, String value, IconData icon) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: AppTheme.brandYellow.withOpacity(0.1),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppTheme.brandYellow.withOpacity(0.3)),
      ),
      child: Row(
        children: [
          Icon(icon, color: AppTheme.brandYellow, size: 16),
          const SizedBox(width: 8),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  title,
                  style: Theme.of(context).textTheme.labelSmall?.copyWith(
                    fontWeight: FontWeight.bold,
                    color: AppTheme.brandYellow,
                  ),
                ),
                Text(
                  value,
                  style: Theme.of(context).textTheme.bodySmall,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildAstrologySystemCard(
    String systemName,
    String sign,
    Map<String, dynamic> info,
    Color color,
    IconData icon,
  ) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(icon, color: color, size: 20),
              const SizedBox(width: 8),
              Expanded(
                child: Text(
                  systemName,
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.bold,
                    color: color,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          
          Center(
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              decoration: BoxDecoration(
                color: color,
                borderRadius: BorderRadius.circular(20),
              ),
              child: Text(
                sign,
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ),
          const SizedBox(height: 12),
          
          if (info['description'] != null) ...[
            Text(
              info['description'],
              style: Theme.of(context).textTheme.bodySmall?.copyWith(
                height: 1.4,
              ),
              textAlign: TextAlign.center,
              maxLines: 4,
              overflow: TextOverflow.ellipsis,
            ),
          ],
          
          if (info['element'] != null) ...[
            const SizedBox(height: 8),
            Center(
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: color.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: color.withOpacity(0.3)),
                ),
                child: Text(
                  'Element: ${info['element']}',
                  style: Theme.of(context).textTheme.labelSmall?.copyWith(
                    color: color,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ),
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildComprehensiveChartCard(Map<String, dynamic> chartData) {
    return Container(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(Icons.hub, color: AppTheme.mysticalPurple, size: 24),
              const SizedBox(width: 12),
              Text(
                'Comprehensive Astrological Chart',
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          
          Text(
            'Your complete astrological profile combines multiple systems to provide the most comprehensive insights into your personality, potential, and life path.',
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
              height: 1.5,
              color: Colors.grey[600],
            ),
          ),
          const SizedBox(height: 16),
          
          // Chart elements would be displayed here
          Container(
            height: 200,
            decoration: BoxDecoration(
              color: Colors.grey[100],
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: Colors.grey[300]!),
            ),
            child: Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.auto_graph, size: 48, color: Colors.grey[400]),
                  const SizedBox(height: 8),
                  Text(
                    'Comprehensive Chart Visualization',
                    style: Theme.of(context).textTheme.titleMedium?.copyWith(
                      color: Colors.grey[500],
                    ),
                  ),
                  Text(
                    'Coming Soon',
                    style: Theme.of(context).textTheme.bodySmall?.copyWith(
                      color: Colors.grey[400],
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

  Widget _buildSelfCompatibilityCard() {
    return Container(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(Icons.psychology, color: AppTheme.mysticalPurple, size: 24),
              const SizedBox(width: 12),
              Text(
                'Self-Compatibility Insights',
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          
          Text(
            'Understanding your internal harmony between your Life Path, Destiny, and Soul Urge numbers.',
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
              height: 1.5,
              color: Colors.grey[600],
            ),
          ),
          const SizedBox(height: 16),
          
          // Self-compatibility analysis would be displayed here
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: AppTheme.mysticalPurple.withOpacity(0.1),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: AppTheme.mysticalPurple.withOpacity(0.3)),
            ),
            child: Column(
              children: [
                Row(
                  children: [
                    Container(
                      width: 40,
                      height: 40,
                      decoration: BoxDecoration(
                        color: AppTheme.mysticalPurple,
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: const Center(
                        child: Text(
                          '85%',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 12,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Internal Harmony Score',
                            style: Theme.of(context).textTheme.titleMedium?.copyWith(
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                          Text(
                            'Your core numbers are well-aligned',
                            style: Theme.of(context).textTheme.bodySmall?.copyWith(
                              color: Colors.grey[600],
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSuccessFormulaCard(Map<String, dynamic> successBlueprint) {
    return Container(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(Icons.auto_awesome, color: AppTheme.brandYellow, size: 24),
              const SizedBox(width: 12),
              Text(
                'Your Success Formula',
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [
                  AppTheme.brandYellow.withOpacity(0.1),
                  AppTheme.mysticalPurple.withOpacity(0.1),
                ],
              ),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: AppTheme.brandYellow.withOpacity(0.3)),
            ),
            child: Text(
              successBlueprint['success_formula'] ?? 'Your unique success formula is being calculated...',
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                height: 1.6,
                fontStyle: FontStyle.italic,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSuccessAreaCard(
    String title,
    dynamic content,
    IconData icon,
    Color color,
  ) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(icon, color: color, size: 20),
              const SizedBox(width: 8),
              Expanded(
                child: Text(
                  title,
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.bold,
                    color: color,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          
          if (content is List) ...[
            ...content.take(3).map((item) => Padding(
                  padding: const EdgeInsets.only(bottom: 4),
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Container(
                        width: 4,
                        height: 4,
                        margin: const EdgeInsets.only(top: 6, right: 8),
                        decoration: BoxDecoration(
                          color: color,
                          borderRadius: BorderRadius.circular(2),
                        ),
                      ),
                      Expanded(
                        child: Text(
                          item.toString(),
                          style: Theme.of(context).textTheme.bodySmall?.copyWith(
                            height: 1.4,
                          ),
                        ),
                      ),
                    ],
                  ),
                ))
                .toList(),
          ] else ...[
            Text(
              content.toString(),
              style: Theme.of(context).textTheme.bodySmall?.copyWith(
                height: 1.4,
              ),
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildTimingAndMantrasCard(Map<String, dynamic> successBlueprint) {
    return Container(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(Icons.schedule, color: AppTheme.cosmicPink, size: 24),
              const SizedBox(width: 12),
              Text(
                'Timing & Personal Mantras',
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          
          // Personal Mantras
          if (successBlueprint['personal_mantras'] != null) ...[
            Text(
              'Personal Mantras',
              style: Theme.of(context).textTheme.titleMedium?.copyWith(
                fontWeight: FontWeight.w600,
                color: AppTheme.cosmicPink,
              ),
            ),
            const SizedBox(height: 8),
            
            ...((successBlueprint['personal_mantras'] as List<String>))
                .map((mantra) => Container(
                      margin: const EdgeInsets.only(bottom: 8),
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: AppTheme.cosmicPink.withOpacity(0.1),
                        borderRadius: BorderRadius.circular(8),
                        border: Border.all(color: AppTheme.cosmicPink.withOpacity(0.3)),
                      ),
                      child: Text(
                        mantra,
                        style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                          fontStyle: FontStyle.italic,
                          height: 1.4,
                        ),
                      ),
                    ))
                .toList(),
          ],
        ],
      ),
    );
  }

  void _showPartnerInputDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Partner Details'),
        content: const Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              decoration: InputDecoration(
                labelText: 'Partner\'s Full Name',
                border: OutlineInputBorder(),
              ),
            ),
            SizedBox(height: 16),
            TextField(
              decoration: InputDecoration(
                labelText: 'Birth Date (DD/MM/YYYY)',
                border: OutlineInputBorder(),
              ),
            ),
            SizedBox(height: 16),
            TextField(
              decoration: InputDecoration(
                labelText: 'Birth Place',
                border: OutlineInputBorder(),
              ),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              // TODO: Implement compatibility calculation
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                  content: Text('Compatibility analysis will be implemented soon!'),
                ),
              );
            },
            child: const Text('Analyze'),
          ),
        ],
      ),
    );
  }

  void _shareAnalysis() {
    HapticFeedback.lightImpact();
    // TODO: Implement sharing functionality
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Sharing functionality will be implemented soon!'),
      ),
    );
  }

  String _formatDate(DateTime date) {
    return '${date.day}/${date.month}/${date.year}';
  }
}
