import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../../models/expert_profile.dart';
import 'expert_profile_screen.dart';

class PremiumSubscriptionScreen extends StatefulWidget {
  const PremiumSubscriptionScreen({super.key});

  @override
  State<PremiumSubscriptionScreen> createState() => _PremiumSubscriptionScreenState();
}

class _PremiumSubscriptionScreenState extends State<PremiumSubscriptionScreen> {
  final List<ExpertProfile> _experts = [
    ExpertProfile(
      id: '1',
      name: 'Dr. Luna Starlight',
      title: 'Master Astrologer & Numerologist',
      specialization: 'Vedic Astrology, Numerology',
      bio: 'With over 20 years of experience in Vedic astrology and numerology, Dr. Luna has helped thousands of people discover their cosmic path. She combines ancient wisdom with modern insights to provide profound guidance.',
      imageUrl: 'https://via.placeholder.com/150',
      certifications: ['Certified Vedic Astrologer', 'Master Numerologist', 'Spiritual Counselor'],
      specialties: ['Vedic Astrology', 'Numerology', 'Spiritual Guidance', 'Life Path Analysis'],
      experienceYears: 20,
      rating: 4.9,
      totalReadings: 5000,
      languages: 'English, Hindi, Sanskrit',
      availability: 'Mon-Fri: 9AM-6PM',
      consultationPrice: 150.0,
      isAvailable: true,
      services: ['Birth Chart Analysis', 'Numerology Reading', 'Spiritual Counseling', 'Life Guidance'],
      education: 'PhD in Vedic Studies, Master in Numerology',
      achievements: ['Published Author', 'International Speaker', 'Award-Winning Astrologer'],
    ),
    ExpertProfile(
      id: '2',
      name: 'Master Orion Cosmic',
      title: 'Western Astrologer & Tarot Reader',
      specialization: 'Western Astrology, Tarot',
      bio: 'Master Orion is a renowned Western astrologer with 15 years of experience. He specializes in psychological astrology and uses tarot cards to provide deep insights into your life journey.',
      imageUrl: 'https://via.placeholder.com/150',
      certifications: ['Certified Western Astrologer', 'Master Tarot Reader', 'Psychological Astrologer'],
      specialties: ['Western Astrology', 'Tarot Reading', 'Psychological Analysis', 'Relationship Guidance'],
      experienceYears: 15,
      rating: 4.8,
      totalReadings: 3500,
      languages: 'English, French, Spanish',
      availability: 'Tue-Sat: 10AM-7PM',
      consultationPrice: 120.0,
      isAvailable: true,
      services: ['Natal Chart Reading', 'Tarot Consultation', 'Relationship Analysis', 'Career Guidance'],
      education: 'Master in Astrology, Certified Tarot Reader',
      achievements: ['International Recognition', 'Published Researcher', 'Mentor to New Astrologers'],
    ),
    ExpertProfile(
      id: '3',
      name: 'Sage Celeste Wisdom',
      title: 'Numerologist & Life Coach',
      specialization: 'Numerology, Life Coaching',
      bio: 'Sage Celeste is a master numerologist and life coach who has dedicated her life to helping people understand their life path numbers and unlock their potential through numerology.',
      imageUrl: 'https://via.placeholder.com/150',
      certifications: ['Master Numerologist', 'Certified Life Coach', 'Spiritual Counselor'],
      specialties: ['Numerology', 'Life Coaching', 'Personal Development', 'Spiritual Growth'],
      experienceYears: 18,
      rating: 4.9,
      totalReadings: 4000,
      languages: 'English, Italian, Portuguese',
      availability: 'Mon-Thu: 8AM-5PM',
      consultationPrice: 100.0,
      isAvailable: true,
      services: ['Numerology Reading', 'Life Coaching', 'Personal Development', 'Spiritual Guidance'],
      education: 'Master in Numerology, Certified Life Coach',
      achievements: ['Best Numerologist Award', 'Published Author', 'International Speaker'],
    ),
    ExpertProfile(
      id: '4',
      name: 'Professor Cosmic Harmony',
      title: 'Astro-Numerologist & Researcher',
      specialization: 'Advanced Numerology, Astrology',
      bio: 'Professor Cosmic is a leading researcher in the field of astro-numerology, combining both disciplines to provide comprehensive cosmic guidance. With a PhD in Metaphysics, he brings academic rigor to spiritual practice.',
      imageUrl: 'https://via.placeholder.com/150',
      certifications: ['PhD in Metaphysics', 'Master Astrologer', 'Advanced Numerologist'],
      specialties: ['Advanced Numerology', 'Astro-Numerology', 'Research', 'Academic Guidance'],
      experienceYears: 25,
      rating: 4.9,
      totalReadings: 6000,
      languages: 'English, German, Latin',
      availability: 'Mon-Wed-Fri: 9AM-4PM',
      consultationPrice: 200.0,
      isAvailable: true,
      services: ['Advanced Numerology', 'Astro-Numerology', 'Research Consultation', 'Academic Guidance'],
      education: 'PhD in Metaphysics, Master in Astrology',
      achievements: ['Published Researcher', 'Academic Awards', 'International Recognition'],
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Premium Subscription'),
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
              _buildSubscriptionPlans(),
              const SizedBox(height: 32),
              _buildExpertSection(),
              const SizedBox(height: 32),
              _buildFeaturesSection(),
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
            Icons.diamond,
            size: 60,
            color: AppTheme.starlightWhite,
          ),
          const SizedBox(height: 16),
          Text(
            'Premium Subscription',
            style: TextStyle(
              fontSize: 28,
              fontWeight: FontWeight.bold,
              color: AppTheme.starlightWhite,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            'Unlock the full power of cosmic wisdom',
            style: TextStyle(
              fontSize: 16,
              color: AppTheme.starlightWhite.withOpacity(0.9),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSubscriptionPlans() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Choose Your Plan',
          style: TextStyle(
            fontSize: 24,
            fontWeight: FontWeight.bold,
            color: AppTheme.starlightWhite,
          ),
        ),
        const SizedBox(height: 16),
        Row(
          children: [
            Expanded(
              child: _buildPlanCard(
                'Monthly',
                '\$19.99',
                '/month',
                AppTheme.celestialBlue,
                [
                  'Daily cosmic guidance',
                  'Basic numerology',
                  'Community access',
                  'Expert consultations',
                ],
                true,
              ),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: _buildPlanCard(
                'Yearly',
                '\$199.99',
                '/year',
                AppTheme.supernovaGold,
                [
                  'Everything in Monthly',
                  'Advanced astrology charts',
                  'Premium numerology reports',
                  'Priority expert access',
                  'Exclusive content',
                ],
                false,
                isPopular: true,
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildPlanCard(
    String title,
    String price,
    String period,
    Color color,
    List<String> features,
    bool isMonthly, {
    bool isPopular = false,
  }) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [color.withOpacity(0.1), color.withOpacity(0.05)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: isPopular ? AppTheme.supernovaGold : color.withOpacity(0.3),
          width: isPopular ? 2 : 1,
        ),
        boxShadow: isPopular
            ? [
                BoxShadow(
                  color: AppTheme.supernovaGold.withOpacity(0.3),
                  blurRadius: 10,
                  offset: const Offset(0, 5),
                ),
              ]
            : null,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (isPopular)
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
              decoration: BoxDecoration(
                color: AppTheme.supernovaGold,
                borderRadius: BorderRadius.circular(12),
              ),
              child: Text(
                'MOST POPULAR',
                style: TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.bold,
                  color: AppTheme.deepSpaceBlack,
                ),
              ),
            ),
          if (isPopular) const SizedBox(height: 12),
          Text(
            title,
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
              color: color,
            ),
          ),
          const SizedBox(height: 8),
          Row(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Text(
                price,
                style: TextStyle(
                  fontSize: 32,
                  fontWeight: FontWeight.bold,
                  color: AppTheme.starlightWhite,
                ),
              ),
              Text(
                period,
                style: TextStyle(
                  fontSize: 16,
                  color: AppTheme.starlightWhite.withOpacity(0.7),
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          ...features.map((feature) => Padding(
            padding: const EdgeInsets.only(bottom: 8),
            child: Row(
              children: [
                Icon(
                  Icons.check_circle,
                  color: color,
                  size: 16,
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    feature,
                    style: TextStyle(
                      fontSize: 14,
                      color: AppTheme.starlightWhite.withOpacity(0.9),
                    ),
                  ),
                ),
              ],
            ),
          )),
          const SizedBox(height: 20),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton(
              onPressed: () {
                // Handle subscription
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: color,
                foregroundColor: AppTheme.deepSpaceBlack,
                padding: const EdgeInsets.symmetric(vertical: 12),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
              ),
              child: Text(
                'Subscribe Now',
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildExpertSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Meet Our Expert Astrologers & Numerologists',
          style: TextStyle(
            fontSize: 24,
            fontWeight: FontWeight.bold,
            color: AppTheme.starlightWhite,
          ),
        ),
        const SizedBox(height: 16),
        Text(
          'Get personalized guidance from certified professionals',
          style: TextStyle(
            fontSize: 16,
            color: AppTheme.starlightWhite.withOpacity(0.8),
          ),
        ),
        const SizedBox(height: 20),
        ..._experts.map((expert) => _buildExpertCard(expert)).toList(),
      ],
    );
  }

  Widget _buildExpertCard(ExpertProfile expert) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            AppTheme.electricViolet.withOpacity(0.1),
            AppTheme.electricViolet.withOpacity(0.05)
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppTheme.electricViolet.withOpacity(0.3)),
      ),
      child: Row(
        children: [
          CircleAvatar(
            radius: 40,
            backgroundColor: AppTheme.electricViolet.withOpacity(0.2),
            child: Icon(
              Icons.person,
              size: 40,
              color: AppTheme.electricViolet,
            ),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  expert.name,
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: AppTheme.starlightWhite,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  expert.title,
                  style: TextStyle(
                    fontSize: 14,
                    color: AppTheme.electricViolet,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  expert.bio,
                  style: TextStyle(
                    fontSize: 14,
                    color: AppTheme.starlightWhite.withOpacity(0.8),
                    height: 1.4,
                  ),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
                const SizedBox(height: 8),
                Row(
                  children: [
                    Icon(Icons.star, color: AppTheme.supernovaGold, size: 16),
                    const SizedBox(width: 4),
                    Text(
                      expert.rating.toString(),
                      style: TextStyle(
                        fontSize: 14,
                        color: AppTheme.starlightWhite,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    const SizedBox(width: 16),
                    Text(
                      '${expert.experienceYears} years exp',
                      style: TextStyle(
                        fontSize: 14,
                        color: AppTheme.starlightWhite.withOpacity(0.7),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
          Column(
            children: [
              Text(
                '\$${expert.consultationPrice.toInt()}',
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                  color: AppTheme.supernovaGold,
                ),
              ),
              Text(
                'per session',
                style: TextStyle(
                  fontSize: 12,
                  color: AppTheme.starlightWhite.withOpacity(0.7),
                ),
              ),
              const SizedBox(height: 8),
              ElevatedButton(
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => ExpertProfileScreen(expert: expert),
                    ),
                  );
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppTheme.electricViolet,
                  foregroundColor: AppTheme.starlightWhite,
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
                child: const Text('View Profile'),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildFeaturesSection() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            AppTheme.auroraGreen.withOpacity(0.1),
            AppTheme.auroraGreen.withOpacity(0.05)
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppTheme.auroraGreen.withOpacity(0.3)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Premium Features',
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
              color: AppTheme.auroraGreen,
            ),
          ),
          const SizedBox(height: 16),
          _buildFeatureItem('Detailed Astrological Charts', Icons.analytics),
          _buildFeatureItem('Comprehensive Numerology Reports', Icons.calculate),
          _buildFeatureItem('Expert Consultations', Icons.people),
          _buildFeatureItem('Personalized Daily Guidance', Icons.auto_awesome),
          _buildFeatureItem('Advanced Compatibility Analysis', Icons.favorite),
          _buildFeatureItem('Exclusive Content & Insights', Icons.diamond),
          _buildFeatureItem('Priority Customer Support', Icons.support_agent),
          _buildFeatureItem('Offline Access to Readings', Icons.download),
        ],
      ),
    );
  }

  Widget _buildFeatureItem(String title, IconData icon) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Row(
        children: [
          Icon(icon, color: AppTheme.auroraGreen, size: 20),
          const SizedBox(width: 12),
          Expanded(
            child: Text(
              title,
              style: TextStyle(
                fontSize: 16,
                color: AppTheme.starlightWhite,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
