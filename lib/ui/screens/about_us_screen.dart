import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class AboutUsScreen extends StatelessWidget {
  const AboutUsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('About Us'),
        backgroundColor: AppTheme.deepSpaceBlack,
        foregroundColor: AppTheme.starlightWhite,
      ),
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [AppTheme.deepSpaceBlack, AppTheme.darkBackground],
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
          ),
        ),
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _buildHeader(),
              const SizedBox(height: 32),
              _buildMissionSection(),
              const SizedBox(height: 32),
              _buildVisionSection(),
              const SizedBox(height: 32),
              _buildValuesSection(),
              const SizedBox(height: 32),
              _buildTeamSection(),
              const SizedBox(height: 32),
              _buildStorySection(),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildHeader() {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        gradient: AppTheme.cosmicGradient,
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color: AppTheme.electricViolet.withOpacity(0.3),
            blurRadius: 20,
            offset: const Offset(0, 10),
          ),
        ],
      ),
      child: Column(
        children: [
          Icon(
            Icons.auto_awesome,
            size: 60,
            color: AppTheme.starlightWhite,
          ),
          const SizedBox(height: 16),
          Text(
            'Daily Secrets',
            style: TextStyle(
              fontSize: 32,
              fontWeight: FontWeight.bold,
              color: AppTheme.starlightWhite,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            'Your Gateway to Cosmic Wisdom',
            style: TextStyle(
              fontSize: 18,
              color: AppTheme.starlightWhite.withOpacity(0.9),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildMissionSection() {
    return _buildSection(
      'Our Mission',
      Icons.flag,
      AppTheme.supernovaGold,
      'To democratize access to cosmic wisdom and make astrology, numerology, and spiritual guidance available to everyone. We believe that everyone deserves to understand their cosmic blueprint and unlock their highest potential through ancient wisdom combined with modern technology.',
    );
  }

  Widget _buildVisionSection() {
    return _buildSection(
      'Our Vision',
      Icons.visibility,
      AppTheme.celestialBlue,
      'To become the world\'s leading platform for personalized cosmic guidance, connecting millions of people with their spiritual path, and creating a global community of conscious individuals who use cosmic wisdom to make better life decisions.',
    );
  }

  Widget _buildValuesSection() {
    return _buildSection(
      'Our Values',
      Icons.favorite,
      AppTheme.nebulaPink,
      '• Authenticity: We provide genuine, research-based cosmic guidance\n• Accessibility: Making cosmic wisdom available to everyone\n• Community: Building connections through shared spiritual journeys\n• Innovation: Combining ancient wisdom with modern technology\n• Respect: Honoring all spiritual traditions and beliefs',
    );
  }

  Widget _buildTeamSection() {
    return _buildSection(
      'Our Team',
      Icons.people,
      AppTheme.auroraGreen,
      'Our team consists of certified astrologers, numerologists, spiritual counselors, and technology experts who are passionate about making cosmic wisdom accessible. We combine decades of experience in traditional practices with cutting-edge technology to deliver personalized guidance.',
    );
  }

  Widget _buildStorySection() {
    return _buildSection(
      'Our Story',
      Icons.history_edu,
      AppTheme.electricViolet,
      'Daily Secrets was born from a simple belief: everyone deserves access to cosmic wisdom. Founded by a team of spiritual practitioners and technology innovators, we\'ve created a platform that makes ancient wisdom accessible through modern technology. Our journey continues as we help millions discover their cosmic path.',
    );
  }

  Widget _buildSection(String title, IconData icon, Color color, String content) {
    return Container(
      padding: const EdgeInsets.all(20),
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
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(icon, color: color, size: 24),
              const SizedBox(width: 12),
              Text(
                title,
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                  color: color,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Text(
            content,
            style: TextStyle(
              fontSize: 16,
              color: AppTheme.starlightWhite.withOpacity(0.9),
              height: 1.6,
            ),
          ),
        ],
      ),
    );
  }
}
