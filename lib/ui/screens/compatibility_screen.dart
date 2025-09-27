import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../../services/database_service.dart';
import '../../models/user.dart';
import '../../utils/zodiac_utils.dart';
import '../../utils/vedic_zodiac_utils.dart';
import '../../utils/chinese_zodiac_utils.dart';
import '../../utils/sri_lankan_zodiac_utils.dart';

class CompatibilityScreen extends StatefulWidget {
  const CompatibilityScreen({super.key});

  @override
  State<CompatibilityScreen> createState() => _CompatibilityScreenState();
}

class _CompatibilityScreenState extends State<CompatibilityScreen>
    with TickerProviderStateMixin {
  User? currentUser;
  String? partnerName;
  DateTime? partnerBirthDate;
  TimeOfDay? partnerBirthTime;
  String? partnerPlaceOfBirth;
  
  String? currentUserWesternSign;
  String? currentUserVedicRashi;
  String? currentUserChineseZodiac;
  String? currentUserSriLankanSign;
  
  String? partnerWesternSign;
  String? partnerVedicRashi;
  String? partnerChineseZodiac;
  String? partnerSriLankanSign;
  
  Map<String, dynamic> westernCompatibility = {};
  Map<String, dynamic> vedicCompatibility = {};
  Map<String, dynamic> chineseCompatibility = {};
  Map<String, dynamic> sriLankanCompatibility = {};
  
  late AnimationController _animationController;
  late Animation<double> _fadeAnimation;
  late Animation<Offset> _slideAnimation;
  
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    _loadCurrentUser();
    _setupAnimations();
  }

  void _setupAnimations() {
    _animationController = AnimationController(
      duration: const Duration(milliseconds: 1200),
      vsync: this,
    );
    
    _fadeAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _animationController,
      curve: Curves.easeInOut,
    ));
    
    _slideAnimation = Tween<Offset>(
      begin: const Offset(0, 0.3),
      end: Offset.zero,
    ).animate(CurvedAnimation(
      parent: _animationController,
      curve: Curves.easeOutCubic,
    ));
  }

  void _loadCurrentUser() {
    currentUser = DatabaseService.getCurrentUser();
    if (currentUser != null) {
      setState(() {
        currentUserWesternSign = ZodiacUtils.getWesternZodiacSign(currentUser!.dateOfBirth);
        currentUserVedicRashi = VedicZodiacUtils.getVedicRashi(
          currentUser!.dateOfBirth,
          birthTime: currentUser!.timeOfBirth != null
              ? TimeOfDay.fromDateTime(currentUser!.timeOfBirth!)
              : null,
          placeOfBirth: currentUser!.placeOfBirth,
        );
        currentUserChineseZodiac = ChineseZodiacUtils.getChineseZodiacSign(currentUser!.dateOfBirth);
        currentUserSriLankanSign = SriLankanZodiacUtils.getSriLankanZodiacSign(currentUser!.dateOfBirth);
      });
    }
  }

  void _calculateCompatibility() {
    if (partnerBirthDate == null) return;
    
    setState(() {
      _isLoading = true;
    });
    
    // Calculate partner's zodiac signs
    partnerWesternSign = ZodiacUtils.getWesternZodiacSign(partnerBirthDate!);
    partnerVedicRashi = VedicZodiacUtils.getVedicRashi(
      partnerBirthDate!,
      birthTime: partnerBirthTime,
      placeOfBirth: partnerPlaceOfBirth ?? '',
    );
    partnerChineseZodiac = ChineseZodiacUtils.getChineseZodiacSign(partnerBirthDate!);
    partnerSriLankanSign = SriLankanZodiacUtils.getSriLankanZodiacSign(partnerBirthDate!);
    
    // Calculate compatibility
    westernCompatibility = _getWesternCompatibility();
    vedicCompatibility = VedicZodiacUtils.getVedicCompatibility(
      currentUserVedicRashi ?? '', 
      partnerVedicRashi ?? '',
    );
    chineseCompatibility = ChineseZodiacUtils.getChineseCompatibility(
      currentUserChineseZodiac ?? '', 
      partnerChineseZodiac ?? '',
    );
    sriLankanCompatibility = SriLankanZodiacUtils.getSriLankanCompatibility(
      currentUserSriLankanSign ?? '', 
      partnerSriLankanSign ?? '',
    );
    
    _animationController.forward();
    
    setState(() {
      _isLoading = false;
    });
  }

  Map<String, dynamic> _getWesternCompatibility() {
    // Simplified Western compatibility
    const compatiblePairs = [
      ['Aries', 'Leo'], ['Aries', 'Sagittarius'], ['Aries', 'Gemini'], ['Aries', 'Aquarius'],
      ['Taurus', 'Virgo'], ['Taurus', 'Capricorn'], ['Taurus', 'Cancer'], ['Taurus', 'Pisces'],
      ['Gemini', 'Libra'], ['Gemini', 'Aquarius'], ['Gemini', 'Aries'], ['Gemini', 'Leo'],
      ['Cancer', 'Scorpio'], ['Cancer', 'Pisces'], ['Cancer', 'Taurus'], ['Cancer', 'Virgo'],
      ['Leo', 'Aries'], ['Leo', 'Sagittarius'], ['Leo', 'Gemini'], ['Leo', 'Libra'],
      ['Virgo', 'Taurus'], ['Virgo', 'Capricorn'], ['Virgo', 'Cancer'], ['Virgo', 'Scorpio'],
      ['Libra', 'Gemini'], ['Libra', 'Aquarius'], ['Libra', 'Leo'], ['Libra', 'Sagittarius'],
      ['Scorpio', 'Cancer'], ['Scorpio', 'Pisces'], ['Scorpio', 'Virgo'], ['Scorpio', 'Capricorn'],
      ['Sagittarius', 'Aries'], ['Sagittarius', 'Leo'], ['Sagittarius', 'Libra'], ['Sagittarius', 'Aquarius'],
      ['Capricorn', 'Taurus'], ['Capricorn', 'Virgo'], ['Capricorn', 'Scorpio'], ['Capricorn', 'Pisces'],
      ['Aquarius', 'Gemini'], ['Aquarius', 'Libra'], ['Aquarius', 'Aries'], ['Aquarius', 'Sagittarius'],
      ['Pisces', 'Cancer'], ['Pisces', 'Scorpio'], ['Pisces', 'Taurus'], ['Pisces', 'Capricorn'],
    ];
    
    bool isCompatible = compatiblePairs.any((pair) => 
        (pair[0] == currentUserWesternSign && pair[1] == partnerWesternSign) ||
        (pair[0] == partnerWesternSign && pair[1] == currentUserWesternSign));
    
    return {
      'compatible': isCompatible,
      'score': isCompatible ? 80 : 45,
      'description': isCompatible 
          ? 'These signs have good compatibility'
          : 'These signs may face some challenges',
      'advice': isCompatible
          ? 'Focus on communication and understanding'
          : 'Work on patience and mutual respect',
    };
  }

  Future<void> _selectPartnerBirthDate() async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: partnerBirthDate ?? DateTime.now(),
      firstDate: DateTime(1900),
      lastDate: DateTime.now(),
      builder: (context, child) {
        return Theme(
          data: Theme.of(context).copyWith(
            colorScheme: ColorScheme.light(
              primary: AppTheme.mysticalPurple,
              onPrimary: Colors.white,
              onSurface: AppTheme.cosmicDark,
            ),
            textButtonTheme: TextButtonThemeData(
              style: TextButton.styleFrom(
                foregroundColor: AppTheme.mysticalPurple,
              ),
            ),
          ),
          child: child!,
        );
      },
    );
    if (picked != null && picked != partnerBirthDate) {
      setState(() {
        partnerBirthDate = picked;
      });
    }
  }

  Future<void> _selectPartnerBirthTime() async {
    final TimeOfDay? picked = await showTimePicker(
      context: context,
      initialTime: partnerBirthTime ?? TimeOfDay.now(),
      builder: (context, child) {
        return Theme(
          data: Theme.of(context).copyWith(
            colorScheme: ColorScheme.light(
              primary: AppTheme.mysticalPurple,
              onPrimary: Colors.white,
              onSurface: AppTheme.cosmicDark,
            ),
            textButtonTheme: TextButtonThemeData(
              style: TextButton.styleFrom(
                foregroundColor: AppTheme.mysticalPurple,
              ),
            ),
          ),
          child: child!,
        );
      },
    );
    if (picked != null && picked != partnerBirthTime) {
      setState(() {
        partnerBirthTime = picked;
      });
    }
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (currentUser == null) {
      return _buildNoProfileScreen();
    }

    return Scaffold(
      backgroundColor: AppTheme.cream,
      appBar: AppBar(
        title: const Text('Compatibility Analysis'),
        backgroundColor: Colors.transparent,
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildPartnerInputCard(),
            const SizedBox(height: 24),
            if (partnerBirthDate != null) ...[
              _buildCompatibilityResults(),
            ],
          ],
        ),
      ),
    );
  }

  Widget _buildNoProfileScreen() {
    return Scaffold(
      backgroundColor: AppTheme.cream,
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
              'Please complete your profile to use compatibility analysis.',
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

  Widget _buildPartnerInputCard() {
    return Container(
      decoration: BoxDecoration(
        color: AppTheme.starlightWhite,
        borderRadius: BorderRadius.circular(24),
        boxShadow: [
          BoxShadow(
            color: AppTheme.mysticalPurple.withOpacity(0.1),
            blurRadius: 20,
            offset: const Offset(0, 8),
          ),
        ],
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
                    Icons.favorite,
                    color: AppTheme.mysticalPurple,
                    size: 24,
                  ),
                ),
                const SizedBox(width: 16),
                Text(
                  'Partner Information',
                  style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                    fontWeight: FontWeight.bold,
                    color: AppTheme.cosmicDark,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 24),
            TextFormField(
              decoration: InputDecoration(
                labelText: 'Partner\'s Name',
                hintText: 'Enter partner\'s name',
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                  borderSide: BorderSide.none,
                ),
                filled: true,
                fillColor: AppTheme.lavender.withOpacity(0.3),
                prefixIcon: Icon(Icons.person_outline, color: AppTheme.mysticalPurple),
              ),
              onChanged: (value) {
                setState(() {
                  partnerName = value;
                });
              },
            ),
            const SizedBox(height: 20),
            InkWell(
              onTap: _selectPartnerBirthDate,
              child: InputDecorator(
                decoration: InputDecoration(
                  labelText: 'Partner\'s Birth Date',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12),
                    borderSide: BorderSide.none,
                  ),
                  filled: true,
                  fillColor: AppTheme.lavender.withOpacity(0.3),
                  prefixIcon: Icon(Icons.calendar_today_outlined, color: AppTheme.mysticalPurple),
                ),
                child: Text(
                  partnerBirthDate != null
                      ? '${partnerBirthDate!.day}/${partnerBirthDate!.month}/${partnerBirthDate!.year}'
                      : 'Select partner\'s birth date',
                  style: TextStyle(
                    color: partnerBirthDate != null
                        ? AppTheme.cosmicDark
                        : AppTheme.cosmicDark.withOpacity(0.6),
                  ),
                ),
              ),
            ),
            const SizedBox(height: 20),
            InkWell(
              onTap: _selectPartnerBirthTime,
              child: InputDecorator(
                decoration: InputDecoration(
                  labelText: 'Partner\'s Birth Time (Optional)',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12),
                    borderSide: BorderSide.none,
                  ),
                  filled: true,
                  fillColor: AppTheme.lavender.withOpacity(0.3),
                  prefixIcon: Icon(Icons.access_time_outlined, color: AppTheme.mysticalPurple),
                ),
                child: Text(
                  partnerBirthTime != null
                      ? partnerBirthTime!.format(context)
                      : 'Select partner\'s birth time (optional)',
                  style: TextStyle(
                    color: partnerBirthTime != null
                        ? AppTheme.cosmicDark
                        : AppTheme.cosmicDark.withOpacity(0.6),
                  ),
                ),
              ),
            ),
            const SizedBox(height: 20),
            TextFormField(
              decoration: InputDecoration(
                labelText: 'Partner\'s Place of Birth (Optional)',
                hintText: 'Enter partner\'s place of birth',
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                  borderSide: BorderSide.none,
                ),
                filled: true,
                fillColor: AppTheme.lavender.withOpacity(0.3),
                prefixIcon: Icon(Icons.location_on_outlined, color: AppTheme.mysticalPurple),
              ),
              onChanged: (value) {
                setState(() {
                  partnerPlaceOfBirth = value;
                });
              },
            ),
            const SizedBox(height: 24),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: partnerBirthDate != null ? _calculateCompatibility : null,
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppTheme.mysticalPurple,
                  foregroundColor: Colors.white,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(16),
                  ),
                  padding: const EdgeInsets.symmetric(vertical: 16),
                ),
                child: _isLoading
                    ? const SizedBox(
                        width: 24,
                        height: 24,
                        child: CircularProgressIndicator(
                          color: Colors.white,
                          strokeWidth: 2,
                        ),
                      )
                    : const Text('Calculate Compatibility'),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildCompatibilityResults() {
    return FadeTransition(
      opacity: _fadeAnimation,
      child: SlideTransition(
        position: _slideAnimation,
        child: Column(
          children: [
            _buildCompatibilityCard('Western Zodiac', currentUserWesternSign, partnerWesternSign, westernCompatibility, AppTheme.mysticalPurple),
            const SizedBox(height: 16),
            _buildCompatibilityCard('Vedic Zodiac', currentUserVedicRashi, partnerVedicRashi, vedicCompatibility, AppTheme.cosmicPink),
            const SizedBox(height: 16),
            _buildCompatibilityCard('Chinese Zodiac', currentUserChineseZodiac, partnerChineseZodiac, chineseCompatibility, AppTheme.softBlue),
            const SizedBox(height: 16),
            _buildCompatibilityCard('Sri Lankan Zodiac', currentUserSriLankanSign, partnerSriLankanSign, sriLankanCompatibility, AppTheme.lavender),
            const SizedBox(height: 24),
            _buildOverallCompatibilityCard(),
          ],
        ),
      ),
    );
  }

  Widget _buildCompatibilityCard(String title, String? sign1, String? sign2, Map<String, dynamic> compatibility, Color color) {
    return Container(
      decoration: BoxDecoration(
        color: AppTheme.starlightWhite,
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color: color.withOpacity(0.1),
            blurRadius: 15,
            offset: const Offset(0, 5),
          ),
        ],
      ),
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    color: color.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Icon(
                    Icons.star,
                    color: color,
                    size: 20,
                  ),
                ),
                const SizedBox(width: 12),
                Text(
                  title,
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.bold,
                    color: AppTheme.cosmicDark,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),
            Row(
              children: [
                Expanded(
                  child: _buildSignDisplay(sign1 ?? 'Unknown', color),
                ),
                const SizedBox(width: 16),
                Icon(
                  Icons.favorite,
                  color: color,
                  size: 24,
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: _buildSignDisplay(sign2 ?? 'Unknown', color),
                ),
              ],
            ),
            const SizedBox(height: 16),
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: color.withOpacity(0.1),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'Compatibility Score',
                        style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                          color: AppTheme.cosmicDark,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      Text(
                        '${compatibility['score'] ?? 0}%',
                        style: Theme.of(context).textTheme.titleLarge?.copyWith(
                          color: color,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  LinearProgressIndicator(
                    value: (compatibility['score'] ?? 0) / 100,
                    backgroundColor: color.withOpacity(0.2),
                    valueColor: AlwaysStoppedAnimation<Color>(color),
                  ),
                  const SizedBox(height: 12),
                  Text(
                    compatibility['description'] ?? 'Compatibility information',
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      color: AppTheme.cosmicDark,
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

  Widget _buildSignDisplay(String sign, Color color) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: color.withOpacity(0.3),
          width: 1,
        ),
      ),
      child: Text(
        sign,
        style: Theme.of(context).textTheme.bodyMedium?.copyWith(
          color: color,
          fontWeight: FontWeight.w600,
        ),
        textAlign: TextAlign.center,
      ),
    );
  }

  Widget _buildOverallCompatibilityCard() {
    final scores = [
      westernCompatibility['score'] ?? 0,
      vedicCompatibility['score'] ?? 0,
      chineseCompatibility['score'] ?? 0,
      sriLankanCompatibility['score'] ?? 0,
    ];
    final overallScore = scores.reduce((a, b) => a + b) / scores.length;
    
    return Container(
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            AppTheme.mysticalPurple,
            AppTheme.cosmicPink,
            AppTheme.softBlue,
          ],
        ),
        borderRadius: BorderRadius.circular(24),
        boxShadow: [
          BoxShadow(
            color: AppTheme.mysticalPurple.withOpacity(0.3),
            blurRadius: 20,
            offset: const Offset(0, 8),
          ),
        ],
      ),
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          children: [
            Text(
              'Overall Compatibility',
              style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                color: Colors.white,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 16),
            Text(
              '${overallScore.round()}%',
              style: Theme.of(context).textTheme.headlineLarge?.copyWith(
                color: Colors.white,
                fontWeight: FontWeight.bold,
                fontSize: 48,
              ),
            ),
            const SizedBox(height: 16),
            Text(
              _getOverallCompatibilityDescription(overallScore),
              style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                color: Colors.white70,
              ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 20),
            LinearProgressIndicator(
              value: overallScore / 100,
              backgroundColor: Colors.white.withOpacity(0.3),
              valueColor: const AlwaysStoppedAnimation<Color>(Colors.white),
            ),
          ],
        ),
      ),
    );
  }

  String _getOverallCompatibilityDescription(double score) {
    if (score >= 80) {
      return 'Excellent compatibility! You two are meant to be together.';
    } else if (score >= 60) {
      return 'Good compatibility! With understanding and effort, you can build a strong relationship.';
    } else if (score >= 40) {
      return 'Moderate compatibility. Patience and communication will be key to your relationship.';
    } else {
      return 'Challenging compatibility. Focus on mutual respect and understanding.';
    }
  }
}
