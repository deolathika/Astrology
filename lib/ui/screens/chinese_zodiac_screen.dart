import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../../services/database_service.dart';
import '../../models/user.dart';
import '../../utils/chinese_zodiac_utils.dart';

class ChineseZodiacScreen extends StatefulWidget {
  const ChineseZodiacScreen({super.key});

  @override
  State<ChineseZodiacScreen> createState() => _ChineseZodiacScreenState();
}

class _ChineseZodiacScreenState extends State<ChineseZodiacScreen> {
  User? currentUser;
  String? chineseZodiac;
  String? chineseElement;
  Map<String, dynamic> chineseInfo = {};

  @override
  void initState() {
    super.initState();
    _loadUserData();
  }

  void _loadUserData() {
    currentUser = DatabaseService.getCurrentUser();
    if (currentUser != null) {
      setState(() {
        chineseZodiac = ChineseZodiacUtils.getChineseZodiacSign(currentUser!.dateOfBirth);
        chineseElement = ChineseZodiacUtils.getChineseElement(currentUser!.dateOfBirth);
        chineseInfo = ChineseZodiacUtils.getChineseZodiacInfo(chineseZodiac ?? '');
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    if (currentUser == null) {
      return Scaffold(
        backgroundColor: AppTheme.cream,
        appBar: AppBar(
          title: const Text('Chinese Zodiac'),
          backgroundColor: Colors.transparent,
          elevation: 0,
        ),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(
                Icons.person_outline,
                size: 80,
                color: AppTheme.mysticalPurple.withOpacity(0.5),
              ),
              const SizedBox(height: 24),
              Text(
                'Profile Required',
                style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                  color: Colors.black87,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 16),
              Text(
                'Please complete your profile to view Chinese astrology insights.',
                style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                  color: Colors.black87.withOpacity(0.7),
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 32),
              ElevatedButton(
                onPressed: () => Navigator.pop(context),
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppTheme.mysticalPurple,
                  foregroundColor: Colors.white,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(16),
                  ),
                  padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 16),
                ),
                child: const Text('Go to Profile'),
              ),
            ],
          ),
        ),
      );
    }

    return Scaffold(
      backgroundColor: AppTheme.cream,
      appBar: AppBar(
        title: const Text('Chinese Zodiac'),
        backgroundColor: Colors.transparent,
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Chinese Zodiac Animal Card
            _buildChineseZodiacCard(),
            const SizedBox(height: 24),

            // Five Elements Card
            _buildFiveElementsCard(),
            const SizedBox(height: 24),

            // Personality Traits Card
            _buildPersonalityCard(),
            const SizedBox(height: 24),

            // Lucky Elements Card
            _buildLuckyElementsCard(),
            const SizedBox(height: 24),

            // Career & Compatibility Card
            _buildCareerCompatibilityCard(),
          ],
        ),
      ),
    );
  }

  Widget _buildChineseZodiacCard() {
    return Card(
      elevation: 4,
      shadowColor: AppTheme.mysticalPurple.withOpacity(0.2),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20),
      ),
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
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
                    _getChineseZodiacEmoji(chineseZodiac ?? ''),
                    style: const TextStyle(fontSize: 24),
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Chinese Zodiac Animal',
                        style: Theme.of(context).textTheme.labelLarge?.copyWith(
                          color: Colors.black87,
                        ),
                      ),
                      Text(
                        chineseZodiac ?? 'Unknown',
                        style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                          fontWeight: FontWeight.bold,
                          color: AppTheme.mysticalPurple,
                        ),
                      ),
                      if (chineseInfo['chineseName'] != null)
                        Text(
                          chineseInfo['chineseName'],
                          style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                            color: Colors.black87.withOpacity(0.7),
                            fontStyle: FontStyle.italic,
                          ),
                        ),
                    ],
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),
            if (chineseInfo.isNotEmpty) ...[
              Row(
                children: [
                  Expanded(
                    child: _buildInfoItem('Element', chineseElement ?? 'Unknown'),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: _buildInfoItem('Year Born', currentUser!.dateOfBirth.year.toString()),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: AppTheme.lavender.withOpacity(0.3),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Text(
                  chineseInfo['description'] ?? 'Chinese zodiac information',
                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                    color: Colors.black87,
                    fontStyle: FontStyle.italic,
                  ),
                  textAlign: TextAlign.center,
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }

  Widget _buildFiveElementsCard() {
    return Card(
      elevation: 4,
      shadowColor: AppTheme.cosmicPink.withOpacity(0.2),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20),
      ),
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: AppTheme.cosmicPink.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: const Icon(
                    Icons.whatshot,
                    color: AppTheme.cosmicPink,
                    size: 24,
                  ),
                ),
                const SizedBox(width: 16),
                Text(
                  'Five Elements (Wu Xing)',
                  style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                    fontWeight: FontWeight.bold,
                    color: Colors.black87,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [
                    _getElementColor(chineseElement ?? ''),
                    _getElementColor(chineseElement ?? '').withOpacity(0.3),
                  ],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                borderRadius: BorderRadius.circular(16),
              ),
              child: Column(
                children: [
                  Text(
                    chineseElement ?? 'Unknown',
                    style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    _getElementDescription(chineseElement ?? ''),
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      color: Colors.white,
                    ),
                    textAlign: TextAlign.center,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildPersonalityCard() {
    if (chineseInfo.isEmpty) return const SizedBox.shrink();

    return Card(
      elevation: 4,
      shadowColor: AppTheme.softBlue.withOpacity(0.2),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20),
      ),
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: AppTheme.softBlue.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: const Icon(
                    Icons.psychology,
                    color: AppTheme.softBlue,
                    size: 24,
                  ),
                ),
                const SizedBox(width: 16),
                Text(
                  'Personality Traits',
                  style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                    fontWeight: FontWeight.bold,
                    color: Colors.black87,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),
            _buildTraitsSection('Strengths', chineseInfo['strengths'] ?? []),
            const SizedBox(height: 16),
            _buildTraitsSection('Weaknesses', chineseInfo['weaknesses'] ?? []),
            const SizedBox(height: 16),
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppTheme.softBlue.withOpacity(0.1),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Text(
                chineseInfo['personality'] ?? 'Personality information',
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: Colors.black87,
                  fontStyle: FontStyle.italic,
                ),
                textAlign: TextAlign.center,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildLuckyElementsCard() {
    if (chineseInfo.isEmpty) return const SizedBox.shrink();

    return Card(
      elevation: 4,
      shadowColor: AppTheme.lavender.withOpacity(0.2),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20),
      ),
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: AppTheme.lavender.withOpacity(0.3),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: const Icon(
                    Icons.star,
                    color: AppTheme.mysticalPurple,
                    size: 24,
                  ),
                ),
                const SizedBox(width: 16),
                Text(
                  'Lucky Elements',
                  style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                    fontWeight: FontWeight.bold,
                    color: Colors.black87,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),
            Row(
              children: [
                Expanded(
                  child: _buildLuckyItem('Colors', chineseInfo['colors'] ?? []),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: _buildLuckyItem('Numbers', chineseInfo['luckyNumbers'] ?? []),
                ),
              ],
            ),
            const SizedBox(height: 16),
            Row(
              children: [
                Expanded(
                  child: _buildLuckyItem('Days', chineseInfo['luckyDays'] ?? []),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: _buildLuckyItem('Gemstone', [chineseInfo['gemstone'] ?? '']),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildCareerCompatibilityCard() {
    if (chineseInfo.isEmpty) return const SizedBox.shrink();

    return Card(
      elevation: 4,
      shadowColor: AppTheme.mysticalPurple.withOpacity(0.2),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20),
      ),
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: AppTheme.mysticalPurple.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: const Icon(
                    Icons.work,
                    color: AppTheme.mysticalPurple,
                    size: 24,
                  ),
                ),
                const SizedBox(width: 16),
                Text(
                  'Career & Compatibility',
                  style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                    fontWeight: FontWeight.bold,
                    color: Colors.black87,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),
            _buildTraitsSection('Best Career Matches', chineseInfo['career']?.split(', ') ?? []),
            const SizedBox(height: 16),
            Row(
              children: [
                Expanded(
                  child: _buildCompatibilityItem('Best Matches', chineseInfo['bestMatches'] ?? []),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: _buildCompatibilityItem('Worst Matches', chineseInfo['worstMatches'] ?? []),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTraitsSection(String title, List<dynamic> traits) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: Theme.of(context).textTheme.labelLarge?.copyWith(
            color: AppTheme.mysticalPurple,
            fontWeight: FontWeight.w600,
          ),
        ),
        const SizedBox(height: 8),
        Container(
          width: double.infinity,
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: AppTheme.lavender.withOpacity(0.2),
            borderRadius: BorderRadius.circular(12),
          ),
          child: Text(
            traits.join(', '),
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
              color: Colors.black87,
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildLuckyItem(String title, List<dynamic> items) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppTheme.lavender.withOpacity(0.2),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        children: [
          Text(
            title,
            style: Theme.of(context).textTheme.labelMedium?.copyWith(
              color: AppTheme.mysticalPurple,
              fontWeight: FontWeight.w600,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            items.join(', '),
            style: Theme.of(context).textTheme.bodySmall?.copyWith(
              color: Colors.black87,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }

  Widget _buildCompatibilityItem(String title, List<dynamic> matches) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppTheme.mysticalPurple.withOpacity(0.1),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        children: [
          Text(
            title,
            style: Theme.of(context).textTheme.labelMedium?.copyWith(
              color: AppTheme.mysticalPurple,
              fontWeight: FontWeight.w600,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            matches.join(', '),
            style: Theme.of(context).textTheme.bodySmall?.copyWith(
              color: Colors.black87,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }

  Widget _buildInfoItem(String label, String value) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: AppTheme.lavender.withOpacity(0.3),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Column(
        children: [
          Text(
            label,
            style: Theme.of(context).textTheme.bodySmall?.copyWith(
              color: Colors.black87,
              fontWeight: FontWeight.w500,
            ),
          ),
          const SizedBox(height: 4),
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

  String _getChineseZodiacEmoji(String zodiac) {
    const emojis = {
      'Rat': '🐭',
      'Ox': '🐂',
      'Tiger': '🐅',
      'Rabbit': '🐰',
      'Dragon': '🐲',
      'Snake': '🐍',
      'Horse': '🐴',
      'Goat': '🐐',
      'Monkey': '🐵',
      'Rooster': '🐓',
      'Dog': '🐕',
      'Pig': '🐷',
    };
    return emojis[zodiac] ?? '🌟';
  }

  Color _getElementColor(String element) {
    switch (element.toLowerCase()) {
      case 'wood': return Colors.green;
      case 'fire': return Colors.red;
      case 'earth': return Colors.brown;
      case 'metal': return Colors.grey;
      case 'water': return Colors.blue;
      default: return AppTheme.mysticalPurple;
    }
  }

  String _getElementDescription(String element) {
    switch (element.toLowerCase()) {
      case 'wood': return 'Growth, creativity, and flexibility';
      case 'fire': return 'Passion, energy, and leadership';
      case 'earth': return 'Stability, patience, and nurturing';
      case 'metal': return 'Strength, determination, and precision';
      case 'water': return 'Wisdom, adaptability, and flow';
      default: return 'Element characteristics';
    }
  }
}
