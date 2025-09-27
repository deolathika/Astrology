import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../theme/app_theme.dart';
import '../../services/database_service.dart';
import '../../services/ai_content_service.dart';
import '../../models/user.dart';
import '../../utils/zodiac_utils.dart';
import 'user_profile_screen.dart';
import 'vedic_zodiac_screen.dart';
import 'chinese_zodiac_screen.dart';
import 'sri_lankan_zodiac_screen.dart';
import 'compatibility_screen.dart';
import 'dream_interpretation_screen.dart';
import 'community_screen.dart';
import 'notifications_screen.dart';

class EnhancedHomeScreen extends StatefulWidget {
  const EnhancedHomeScreen({super.key});

  @override
  State<EnhancedHomeScreen> createState() => _EnhancedHomeScreenState();
}

class _EnhancedHomeScreenState extends State<EnhancedHomeScreen> with TickerProviderStateMixin {
  User? currentUser;
  DailyContent? dailyContent;
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
      dailyContent = await AIContentService.generateDailyContent(currentUser!);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.cream,
      body: SafeArea(
        child: _isLoading
            ? const Center(child: CircularProgressIndicator(color: AppTheme.mysticalPurple))
            : currentUser == null
                ? _buildWelcomeScreen()
                : _buildMainContent(),
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
                color: AppTheme.mysticalPurple.withOpacity(0.1),
                borderRadius: BorderRadius.circular(20),
              ),
              child: Icon(
                Icons.star_outline,
                size: 64,
                color: AppTheme.mysticalPurple,
              ),
            ),
            const SizedBox(height: 32),
            Text(
              'Welcome to Daily Secrets',
              style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                fontWeight: FontWeight.bold,
                color: AppTheme.cosmicDark,
              ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 16),
            Text(
              'Discover your cosmic guidance and unlock the secrets of the universe',
              style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                color: AppTheme.cosmicDark.withOpacity(0.7),
              ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 32),
            ElevatedButton(
              onPressed: () => Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => const UserProfileScreen()),
              ).then((_) => _loadUser()),
              style: ElevatedButton.styleFrom(
                backgroundColor: AppTheme.mysticalPurple,
                foregroundColor: Colors.white,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 16),
              ),
              child: const Text('Create Your Profile'),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildMainContent() {
    if (dailyContent == null) return const SizedBox();

    return FadeTransition(
      opacity: _fadeAnimation,
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildHeader(),
            const SizedBox(height: 24),
            _buildDailyQuote(),
            const SizedBox(height: 24),
            _buildLuckyTrio(),
            const SizedBox(height: 24),
            _buildDayRules(),
            const SizedBox(height: 24),
            _buildMoodFix(),
            const SizedBox(height: 24),
            _buildSpecialMessages(),
            const SizedBox(height: 24),
            _buildGuidanceTabs(),
            const SizedBox(height: 24),
            _buildShareRow(),
            const SizedBox(height: 24),
            _buildResponsibilityBanner(),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader() {
    return Row(
      children: [
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Good ${_getTimeOfDay()}',
                style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                  color: AppTheme.cosmicDark,
                ),
              ),
              Text(
                currentUser!.fullName,
                style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                  color: AppTheme.mysticalPurple,
                ),
              ),
            ],
          ),
        ),
        Container(
          padding: const EdgeInsets.all(12),
          decoration: BoxDecoration(
            color: AppTheme.mysticalPurple.withOpacity(0.1),
            borderRadius: BorderRadius.circular(12),
          ),
          child: Text(
            _getZodiacSymbol(dailyContent!.westernSign),
            style: const TextStyle(fontSize: 24),
          ),
        ),
      ],
    );
  }

  Widget _buildDailyQuote() {
    return AnimatedContainer(
      duration: const Duration(milliseconds: 300),
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            AppTheme.mysticalPurple.withOpacity(0.1),
            AppTheme.cosmicPink.withOpacity(0.1),
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(
          color: AppTheme.mysticalPurple.withOpacity(0.2),
          width: 1.5,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(Icons.format_quote, color: AppTheme.mysticalPurple, size: 28),
              const SizedBox(width: 8),
              Text(
                'Daily Guidance',
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  fontWeight: FontWeight.bold,
                  color: AppTheme.mysticalPurple,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Text(
            dailyContent!.quote,
            style: Theme.of(context).textTheme.bodyLarge?.copyWith(
              color: AppTheme.cosmicDark,
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
              const Spacer(),
              if (dailyContent!.quote.length > 200)
                TextButton(
                  onPressed: () {
                    setState(() {
                      _isExpanded = !_isExpanded;
                    });
                  },
                  child: Text(_isExpanded ? 'Read Less' : 'Read More'),
                ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildReactionButton(String emoji) {
    return GestureDetector(
      onTap: () {
        HapticFeedback.lightImpact();
        _showReactionAnimation(emoji);
      },
      child: Container(
        padding: const EdgeInsets.all(8),
        decoration: BoxDecoration(
          color: AppTheme.lavender.withOpacity(0.3),
          borderRadius: BorderRadius.circular(20),
        ),
        child: Text(emoji, style: const TextStyle(fontSize: 20)),
      ),
    );
  }

  void _showReactionAnimation(String emoji) {
    // Simple animation for reaction
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('$emoji Thank you for your reaction!'),
        duration: const Duration(seconds: 1),
        backgroundColor: AppTheme.mysticalPurple,
      ),
    );
  }

  Widget _buildLuckyTrio() {
    return Row(
      children: [
        Expanded(
          child: _buildLuckyItem(
            'Color',
            dailyContent!.luckyColor,
            Icons.palette,
            AppTheme.cosmicPink,
          ),
        ),
        const SizedBox(width: 16),
        Expanded(
          child: _buildLuckyItem(
            'Number',
            dailyContent!.luckyNumber.toString(),
            Icons.numbers,
            AppTheme.softBlue,
          ),
        ),
        const SizedBox(width: 16),
        Expanded(
          child: _buildLuckyItem(
            'Object',
            dailyContent!.luckyObject,
            Icons.star,
            AppTheme.lavender,
          ),
        ),
      ],
    );
  }

  Widget _buildLuckyItem(String label, String value, IconData icon, Color color) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: color.withOpacity(0.3)),
      ),
      child: Column(
        children: [
          Icon(icon, color: color, size: 24),
          const SizedBox(height: 8),
          Text(
            label,
            style: Theme.of(context).textTheme.bodySmall?.copyWith(
              color: AppTheme.cosmicDark.withOpacity(0.7),
            ),
          ),
          const SizedBox(height: 4),
          Text(
            value,
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
              fontWeight: FontWeight.bold,
              color: color,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDayRules() {
    return Container(
      padding: const EdgeInsets.all(20),
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
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Today\'s Rules',
            style: Theme.of(context).textTheme.titleLarge?.copyWith(
              fontWeight: FontWeight.bold,
              color: AppTheme.cosmicDark,
            ),
          ),
          const SizedBox(height: 16),
          Row(
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      '✅ Do',
                      style: Theme.of(context).textTheme.titleMedium?.copyWith(
                        color: Colors.green,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 8),
                    ...dailyContent!.dayRules.dos.map((rule) => Padding(
                      padding: const EdgeInsets.only(bottom: 4),
                      child: Text('• $rule', style: Theme.of(context).textTheme.bodyMedium),
                    )),
                  ],
                ),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      '⛔ Don\'t',
                      style: Theme.of(context).textTheme.titleMedium?.copyWith(
                        color: Colors.red,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 8),
                    ...dailyContent!.dayRules.donts.map((rule) => Padding(
                      padding: const EdgeInsets.only(bottom: 4),
                      child: Text('• $rule', style: Theme.of(context).textTheme.bodyMedium),
                    )),
                  ],
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildMoodFix() {
    if (!dailyContent!.moodFix.detected) return const SizedBox();

    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            AppTheme.softBlue.withOpacity(0.1),
            AppTheme.lavender.withOpacity(0.1),
          ],
        ),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: AppTheme.softBlue.withOpacity(0.3)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(Icons.favorite, color: AppTheme.softBlue, size: 24),
              const SizedBox(width: 8),
              Text(
                'Mood Fix',
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                  color: AppTheme.softBlue,
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Text(
            dailyContent!.moodFix.reassurance,
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
              color: AppTheme.cosmicDark,
            ),
          ),
          const SizedBox(height: 12),
          ElevatedButton(
            onPressed: () => _showMoodFixActions(),
            style: ElevatedButton.styleFrom(
              backgroundColor: AppTheme.softBlue,
              foregroundColor: Colors.white,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            ),
            child: const Text('Try Micro-Actions'),
          ),
        ],
      ),
    );
  }

  void _showMoodFixActions() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Mood Fix Actions'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: dailyContent!.moodFix.microActions.map((action) => ListTile(
            leading: const Icon(Icons.check_circle, color: AppTheme.softBlue),
            title: Text(action),
            onTap: () {
              Navigator.pop(context);
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(content: Text('Great! You completed: $action')),
              );
            },
          )).toList(),
        ),
      ),
    );
  }

  Widget _buildSpecialMessages() {
    if (dailyContent!.specialMessages.isEmpty) return const SizedBox();

    return Column(
      children: dailyContent!.specialMessages.map((message) => Container(
        margin: const EdgeInsets.only(bottom: 12),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: AppTheme.cosmicPink.withOpacity(0.1),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: AppTheme.cosmicPink.withOpacity(0.3)),
        ),
        child: Row(
          children: [
            Icon(Icons.star, color: AppTheme.cosmicPink, size: 20),
            const SizedBox(width: 12),
            Expanded(
              child: Text(
                message,
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: AppTheme.cosmicDark,
                ),
              ),
            ),
          ],
        ),
      )).toList(),
    );
  }

  Widget _buildGuidanceTabs() {
    return DefaultTabController(
      length: 5,
      child: Column(
        children: [
          TabBar(
            isScrollable: true,
            labelColor: AppTheme.mysticalPurple,
            unselectedLabelColor: AppTheme.cosmicDark.withOpacity(0.6),
            indicatorColor: AppTheme.mysticalPurple,
            tabs: const [
              Tab(text: 'Love'),
              Tab(text: 'Career'),
              Tab(text: 'Finances'),
              Tab(text: 'Health'),
              Tab(text: 'Travel'),
            ],
          ),
          const SizedBox(height: 16),
          SizedBox(
            height: 120,
            child: TabBarView(
              children: [
                _buildGuidanceCard(dailyContent!.guidance.love, Icons.favorite),
                _buildGuidanceCard(dailyContent!.guidance.career, Icons.work),
                _buildGuidanceCard(dailyContent!.guidance.finances, Icons.account_balance_wallet),
                _buildGuidanceCard(dailyContent!.guidance.health, Icons.health_and_safety),
                _buildGuidanceCard(dailyContent!.guidance.travel, Icons.travel_explore),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildGuidanceCard(String text, IconData icon) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppTheme.lavender.withOpacity(0.3),
        borderRadius: BorderRadius.circular(16),
      ),
      child: Row(
        children: [
          Icon(icon, color: AppTheme.mysticalPurple, size: 24),
          const SizedBox(width: 12),
          Expanded(
            child: Text(
              text,
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                color: AppTheme.cosmicDark,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildShareRow() {
    return Container(
      padding: const EdgeInsets.all(20),
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
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Share Your Daily Secret',
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
              fontWeight: FontWeight.bold,
              color: AppTheme.cosmicDark,
            ),
          ),
          const SizedBox(height: 16),
          Row(
            children: [
              _buildShareButton('WhatsApp', Icons.message, AppTheme.cosmicPink),
              const SizedBox(width: 12),
              _buildShareButton('Instagram', Icons.camera_alt, AppTheme.softBlue),
              const SizedBox(width: 12),
              _buildShareButton('Twitter', Icons.share, AppTheme.lavender),
              const SizedBox(width: 12),
              _buildShareButton('Copy', Icons.copy, AppTheme.mysticalPurple),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildShareButton(String label, IconData icon, Color color) {
    return Expanded(
      child: GestureDetector(
        onTap: () => _handleShare(label),
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 12),
          decoration: BoxDecoration(
            color: color.withOpacity(0.1),
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: color.withOpacity(0.3)),
          ),
          child: Column(
            children: [
              Icon(icon, color: color, size: 20),
              const SizedBox(height: 4),
              Text(
                label,
                style: Theme.of(context).textTheme.bodySmall?.copyWith(
                  color: color,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  void _handleShare(String platform) {
    final content = dailyContent!.shareCard;
    final message = '${content.caption}\n\n${content.hashtags.join(' ')}';
    
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Sharing to $platform: $message'),
        duration: const Duration(seconds: 2),
      ),
    );
  }

  Widget _buildResponsibilityBanner() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppTheme.cream,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppTheme.cosmicDark.withOpacity(0.2)),
      ),
      child: Row(
        children: [
          Icon(Icons.info_outline, color: AppTheme.cosmicDark.withOpacity(0.7), size: 20),
          const SizedBox(width: 12),
          Expanded(
            child: Text(
              'Daily Secrets is for entertainment and guidance only. Always trust your own judgment and consult professionals for important decisions.',
              style: Theme.of(context).textTheme.bodySmall?.copyWith(
                color: AppTheme.cosmicDark.withOpacity(0.7),
                fontStyle: FontStyle.italic,
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

  Widget _buildNavItem(IconData icon, String label, bool isActive) {
    return GestureDetector(
      onTap: () => _handleNavigation(label),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        decoration: BoxDecoration(
          color: isActive ? AppTheme.mysticalPurple.withOpacity(0.1) : Colors.transparent,
          borderRadius: BorderRadius.circular(12),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              icon,
              color: isActive ? AppTheme.mysticalPurple : AppTheme.cosmicDark.withOpacity(0.6),
              size: 24,
            ),
            const SizedBox(height: 4),
            Text(
              label,
              style: Theme.of(context).textTheme.bodySmall?.copyWith(
                color: isActive ? AppTheme.mysticalPurple : AppTheme.cosmicDark.withOpacity(0.6),
                fontWeight: isActive ? FontWeight.bold : FontWeight.normal,
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _handleNavigation(String label) {
    switch (label) {
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
    }
  }

  String _getTimeOfDay() {
    final hour = DateTime.now().hour;
    if (hour < 12) return 'Morning';
    if (hour < 17) return 'Afternoon';
    return 'Evening';
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
