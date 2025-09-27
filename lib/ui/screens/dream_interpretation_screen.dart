import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../../services/database_service.dart';
import '../../models/user.dart';
import '../../utils/dream_interpretation_utils.dart';
import '../../utils/zodiac_utils.dart';

class DreamInterpretationScreen extends StatefulWidget {
  const DreamInterpretationScreen({super.key});

  @override
  State<DreamInterpretationScreen> createState() => _DreamInterpretationScreenState();
}

class _DreamInterpretationScreenState extends State<DreamInterpretationScreen> {
  User? currentUser;
  String selectedSymbol = 'water';
  String dreamDescription = '';
  Map<String, dynamic>? dreamAnalysis;
  bool isLoading = false;

  final List<String> dreamSymbols = [
    'water', 'fire', 'snake', 'bird', 'tree', 'mountain', 'house', 'road'
  ];

  @override
  void initState() {
    super.initState();
    _loadUser();
  }

  void _loadUser() {
    currentUser = DatabaseService.getCurrentUser();
    if (currentUser != null) {
      _analyzeDream();
    }
  }

  void _analyzeDream() {
    if (currentUser == null) return;
    
    setState(() {
      isLoading = true;
    });

    final zodiacSign = ZodiacUtils.getWesternZodiacSign(currentUser!.dateOfBirth);
    final analysis = DreamInterpretationUtils.getComprehensiveDreamAnalysis(
      dreamSymbol: selectedSymbol,
      zodiacSign: zodiacSign,
      dreamDate: DateTime.now(),
      dreamDescription: dreamDescription,
    );

    setState(() {
      dreamAnalysis = analysis;
      isLoading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.cream,
      appBar: AppBar(
        title: const Text('Dream Interpretation'),
        backgroundColor: Colors.transparent,
        elevation: 0,
      ),
      body: currentUser == null
          ? Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    Icons.person_outline,
                    size: 64,
                    color: AppTheme.mysticalPurple.withOpacity(0.5),
                  ),
                  const SizedBox(height: 16),
                  Text(
                    'Please complete your profile to access dream interpretation.',
                    style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                      color: AppTheme.cosmicDark,
                    ),
                    textAlign: TextAlign.center,
                  ),
                ],
              ),
            )
          : SingleChildScrollView(
              padding: const EdgeInsets.all(20.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Header
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
                          'Dream Interpretation ✨',
                          style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 8),
                        Text(
                          'Discover the hidden meanings in your dreams',
                          style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                            color: Colors.white70,
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 24),

                  // Dream Symbol Selection
                  _buildSymbolSelection(),
                  const SizedBox(height: 24),

                  // Dream Description
                  _buildDreamDescription(),
                  const SizedBox(height: 24),

                  // Analysis Button
                  _buildAnalysisButton(),
                  const SizedBox(height: 24),

                  // Dream Analysis Results
                  if (dreamAnalysis != null) _buildDreamAnalysis(),
                ],
              ),
            ),
    );
  }

  Widget _buildSymbolSelection() {
    return Card(
      elevation: 4,
      shadowColor: AppTheme.mysticalPurple.withOpacity(0.2),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Select Dream Symbol',
              style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                fontWeight: FontWeight.bold,
                color: AppTheme.cosmicDark,
              ),
            ),
            const SizedBox(height: 16),
            Wrap(
              spacing: 12,
              runSpacing: 12,
              children: dreamSymbols.map((symbol) {
                final isSelected = selectedSymbol == symbol;
                return GestureDetector(
                  onTap: () {
                    setState(() {
                      selectedSymbol = symbol;
                    });
                    _analyzeDream();
                  },
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                    decoration: BoxDecoration(
                      color: isSelected ? AppTheme.mysticalPurple : AppTheme.lavender.withOpacity(0.3),
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(
                        color: isSelected ? AppTheme.mysticalPurple : AppTheme.lavender,
                        width: 2,
                      ),
                    ),
                    child: Text(
                      symbol.toUpperCase(),
                      style: TextStyle(
                        color: isSelected ? Colors.white : AppTheme.cosmicDark,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                );
              }).toList(),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildDreamDescription() {
    return Card(
      elevation: 4,
      shadowColor: AppTheme.cosmicPink.withOpacity(0.2),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Describe Your Dream',
              style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                fontWeight: FontWeight.bold,
                color: AppTheme.cosmicDark,
              ),
            ),
            const SizedBox(height: 16),
            TextField(
              maxLines: 4,
              decoration: InputDecoration(
                hintText: 'Describe your dream in detail...',
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                  borderSide: BorderSide.none,
                ),
                filled: true,
                fillColor: AppTheme.lavender.withOpacity(0.3),
              ),
              onChanged: (value) {
                setState(() {
                  dreamDescription = value;
                });
              },
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildAnalysisButton() {
    return SizedBox(
      width: double.infinity,
      child: ElevatedButton(
        onPressed: isLoading ? null : _analyzeDream,
        style: ElevatedButton.styleFrom(
          backgroundColor: AppTheme.mysticalPurple,
          foregroundColor: Colors.white,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
          padding: const EdgeInsets.symmetric(vertical: 16),
        ),
        child: isLoading
            ? const SizedBox(
                width: 24,
                height: 24,
                child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2),
              )
            : const Text(
                'Analyze Dream',
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
              ),
      ),
    );
  }

  Widget _buildDreamAnalysis() {
    if (dreamAnalysis == null) return const SizedBox();

    final interpretation = dreamAnalysis!['interpretation'];
    final philosophicalMeaning = dreamAnalysis!['philosophical_meaning'];
    final meditationGuidance = dreamAnalysis!['meditation_guidance'];
    final actionAdvice = dreamAnalysis!['action_advice'];

    return Column(
      children: [
        // General Interpretation
        _buildAnalysisCard(
          'Dream Interpretation',
          interpretation['general_meaning'] ?? '',
          Icons.psychology,
          AppTheme.mysticalPurple,
        ),
        const SizedBox(height: 16),

        // Zodiac-Specific Meaning
        _buildAnalysisCard(
          'Your Zodiac Meaning',
          interpretation['zodiac_meaning'] ?? '',
          Icons.star,
          AppTheme.cosmicPink,
        ),
        const SizedBox(height: 16),

        // Philosophical Meaning
        _buildAnalysisCard(
          'Philosophical Meaning',
          philosophicalMeaning,
          Icons.lightbulb,
          AppTheme.softBlue,
        ),
        const SizedBox(height: 16),

        // Meditation Guidance
        _buildAnalysisCard(
          'Meditation Guidance',
          meditationGuidance,
          Icons.self_improvement,
          AppTheme.lavender,
        ),
        const SizedBox(height: 16),

        // Action Advice
        _buildAnalysisCard(
          'Action Advice',
          actionAdvice,
          Icons.directions,
          AppTheme.mysticalPurple,
        ),
        const SizedBox(height: 16),

        // Cultural Context
        _buildAnalysisCard(
          'Cultural Context',
          interpretation['cultural_context'] ?? '',
          Icons.public,
          AppTheme.cosmicPink,
        ),
      ],
    );
  }

  Widget _buildAnalysisCard(String title, String content, IconData icon, Color color) {
    return Card(
      elevation: 4,
      shadowColor: color.withOpacity(0.2),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(icon, color: color, size: 24),
                const SizedBox(width: 12),
                Text(
                  title,
                  style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                    fontWeight: FontWeight.bold,
                    color: AppTheme.cosmicDark,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),
            Text(
              content,
              style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                color: AppTheme.cosmicDark,
                height: 1.6,
              ),
            ),
          ],
        ),
      ),
    );
  }
}


