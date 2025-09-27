import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../../services/database_service.dart';
import '../../models/user.dart';
import '../../utils/vedic_zodiac_utils.dart';

class VedicZodiacScreen extends StatefulWidget {
  const VedicZodiacScreen({super.key});

  @override
  State<VedicZodiacScreen> createState() => _VedicZodiacScreenState();
}

class _VedicZodiacScreenState extends State<VedicZodiacScreen> {
  User? currentUser;
  String? vedicRashi;
  String? nakshatra;
  Map<String, dynamic> vedicInfo = {};
  Map<String, dynamic> nakshatraInfo = {};
  Map<String, dynamic> planetaryPositions = {};

  @override
  void initState() {
    super.initState();
    _loadUserData();
  }

  void _loadUserData() {
    currentUser = DatabaseService.getCurrentUser();
    if (currentUser != null) {
      setState(() {
        vedicRashi = VedicZodiacUtils.getVedicRashi(
          currentUser!.dateOfBirth,
          birthTime: currentUser!.timeOfBirth != null
              ? TimeOfDay.fromDateTime(currentUser!.timeOfBirth!)
              : null,
          placeOfBirth: currentUser!.placeOfBirth,
        );
        nakshatra = VedicZodiacUtils.getNakshatra(
          currentUser!.dateOfBirth,
          birthTime: currentUser!.timeOfBirth != null
              ? TimeOfDay.fromDateTime(currentUser!.timeOfBirth!)
              : null,
          placeOfBirth: currentUser!.placeOfBirth,
        );
        vedicInfo = VedicZodiacUtils.getVedicZodiacInfo(vedicRashi ?? '');
        nakshatraInfo = VedicZodiacUtils.getNakshatraInfo(nakshatra ?? '');
        planetaryPositions = VedicZodiacUtils.getPlanetaryPositions(
          currentUser!.dateOfBirth,
          placeOfBirth: currentUser!.placeOfBirth,
        );
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    if (currentUser == null) {
      return Scaffold(
        backgroundColor: AppTheme.cream,
        appBar: AppBar(
          title: const Text('Vedic Zodiac'),
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
                  color: AppTheme.cosmicDark,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 16),
              Text(
                'Please complete your profile to view Vedic astrology insights.',
                style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                  color: AppTheme.cosmicDark.withOpacity(0.7),
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
        title: const Text('Vedic Zodiac'),
        backgroundColor: Colors.transparent,
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Vedic Rashi Card
            _buildVedicRashiCard(),
            const SizedBox(height: 24),

            // Nakshatra Card
            _buildNakshatraCard(),
            const SizedBox(height: 24),

            // Planetary Positions Card
            _buildPlanetaryPositionsCard(),
            const SizedBox(height: 24),

            // Vedic Traits Card
            _buildVedicTraitsCard(),
          ],
        ),
      ),
    );
  }

  Widget _buildVedicRashiCard() {
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
                    '♈',
                    style: const TextStyle(fontSize: 24),
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Vedic Rashi (Moon Sign)',
                        style: Theme.of(context).textTheme.labelLarge?.copyWith(
                          color: AppTheme.cosmicDark,
                        ),
                      ),
                      Text(
                        vedicRashi ?? 'Unknown',
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
            if (vedicInfo.isNotEmpty) ...[
              Row(
                children: [
                  Expanded(
                    child: _buildInfoItem('Element', vedicInfo['element'] ?? 'Unknown'),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: _buildInfoItem('Quality', vedicInfo['quality'] ?? 'Unknown'),
                  ),
                ],
              ),
              const SizedBox(height: 12),
              Row(
                children: [
                  Expanded(
                    child: _buildInfoItem('Ruler', vedicInfo['rulingPlanet'] ?? 'Unknown'),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: _buildInfoItem('Body Part', vedicInfo['bodyPart'] ?? 'Unknown'),
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
                  vedicInfo['description'] ?? 'Vedic astrology information',
                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                    color: AppTheme.cosmicDark,
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

  Widget _buildNakshatraCard() {
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
                    Icons.star,
                    color: AppTheme.cosmicPink,
                    size: 24,
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Nakshatra (Lunar Mansion)',
                        style: Theme.of(context).textTheme.labelLarge?.copyWith(
                          color: AppTheme.cosmicDark,
                        ),
                      ),
                      Text(
                        nakshatra ?? 'Unknown',
                        style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                          fontWeight: FontWeight.bold,
                          color: AppTheme.cosmicPink,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),
            if (nakshatraInfo.isNotEmpty) ...[
              Row(
                children: [
                  Expanded(
                    child: _buildInfoItem('Ruler', nakshatraInfo['ruler'] ?? 'Unknown'),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: _buildInfoItem('Symbol', nakshatraInfo['symbol'] ?? 'Unknown'),
                  ),
                ],
              ),
              const SizedBox(height: 12),
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: AppTheme.cosmicPink.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Text(
                  'Deity: ${nakshatraInfo['deity'] ?? 'Unknown'}',
                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                    color: AppTheme.cosmicDark,
                    fontWeight: FontWeight.w600,
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

  Widget _buildPlanetaryPositionsCard() {
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
                    Icons.public,
                    color: AppTheme.softBlue,
                    size: 24,
                  ),
                ),
                const SizedBox(width: 16),
                Text(
                  'Planetary Positions',
                  style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                    fontWeight: FontWeight.bold,
                    color: AppTheme.cosmicDark,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),
            ...planetaryPositions.entries.map((entry) {
              final planet = entry.key;
              final data = entry.value as Map<String, dynamic>;
              return Padding(
                padding: const EdgeInsets.only(bottom: 12),
                child: Row(
                  children: [
                    Expanded(
                      flex: 2,
                      child: Text(
                        planet,
                        style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                          fontWeight: FontWeight.w600,
                          color: AppTheme.cosmicDark,
                        ),
                      ),
                    ),
                    Expanded(
                      flex: 3,
                      child: Text(
                        '${data['sign']} ${data['degree']}°',
                        style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                          color: AppTheme.cosmicDark,
                        ),
                      ),
                    ),
                    Expanded(
                      flex: 2,
                      child: Text(
                        'House ${data['house']}',
                        style: Theme.of(context).textTheme.bodySmall?.copyWith(
                          color: AppTheme.cosmicDark.withOpacity(0.7),
                        ),
                      ),
                    ),
                  ],
                ),
              );
            }).toList(),
          ],
        ),
      ),
    );
  }

  Widget _buildVedicTraitsCard() {
    if (vedicInfo.isEmpty) return const SizedBox.shrink();

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
                    Icons.psychology,
                    color: AppTheme.mysticalPurple,
                    size: 24,
                  ),
                ),
                const SizedBox(width: 16),
                Text(
                  'Vedic Traits & Characteristics',
                  style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                    fontWeight: FontWeight.bold,
                    color: AppTheme.cosmicDark,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),
            _buildTraitsSection('Strengths', vedicInfo['traits'] ?? ''),
            const SizedBox(height: 16),
            _buildTraitsSection('Lucky Colors', (vedicInfo['colors'] as List?)?.join(', ') ?? ''),
            const SizedBox(height: 16),
            _buildTraitsSection('Lucky Numbers', (vedicInfo['luckyNumbers'] as List?)?.join(', ') ?? ''),
            const SizedBox(height: 16),
            _buildTraitsSection('Gemstone', vedicInfo['gemstone'] ?? ''),
          ],
        ),
      ),
    );
  }

  Widget _buildTraitsSection(String title, String content) {
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
            content,
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
              color: AppTheme.cosmicDark,
            ),
          ),
        ),
      ],
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
              color: AppTheme.cosmicDark,
              fontWeight: FontWeight.w500,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            value,
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
              color: AppTheme.cosmicDark,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }
}
