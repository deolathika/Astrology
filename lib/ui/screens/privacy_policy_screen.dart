import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class PrivacyPolicyScreen extends StatelessWidget {
  const PrivacyPolicyScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Privacy Policy'),
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
              _buildSection(
                '1. Information We Collect',
                Icons.info,
                AppTheme.celestialBlue,
                'We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support. This may include:\n\n• Personal information (name, email, birth date, birth place)\n• Astrological and numerological data\n• Usage information and preferences\n• Communication data when you contact us',
              ),
              const SizedBox(height: 24),
              _buildSection(
                '2. How We Use Your Information',
                Icons.how_to_reg,
                AppTheme.auroraGreen,
                'We use the information we collect to:\n\n• Provide personalized astrological and numerological readings\n• Improve our services and develop new features\n• Send you relevant content and updates\n• Respond to your inquiries and provide customer support\n• Ensure the security and integrity of our platform',
              ),
              const SizedBox(height: 24),
              _buildSection(
                '3. Information Sharing',
                Icons.share,
                AppTheme.supernovaGold,
                'We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except:\n\n• To trusted service providers who assist us in operating our platform\n• When required by law or to protect our rights\n• In connection with a business transfer or acquisition\n• With your explicit consent for specific purposes',
              ),
              const SizedBox(height: 24),
              _buildSection(
                '4. Data Security',
                Icons.security,
                AppTheme.nebulaPink,
                'We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes:\n\n• Encryption of sensitive data\n• Secure data transmission\n• Regular security audits\n• Access controls and authentication',
              ),
              const SizedBox(height: 24),
              _buildSection(
                '5. Data Retention',
                Icons.schedule,
                AppTheme.electricViolet,
                'We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this privacy policy. You may request deletion of your data at any time, subject to certain legal and operational requirements.',
              ),
              const SizedBox(height: 24),
              _buildSection(
                '6. Your Rights',
                Icons.account_balance,
                AppTheme.auroraGreen,
                'You have the right to:\n\n• Access your personal information\n• Correct inaccurate data\n• Delete your account and data\n• Object to certain processing activities\n• Data portability\n• Withdraw consent where applicable',
              ),
              const SizedBox(height: 24),
              _buildSection(
                '7. Cookies and Tracking',
                Icons.cookie,
                AppTheme.celestialBlue,
                'We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns, and personalize content. You can control cookie settings through your browser preferences.',
              ),
              const SizedBox(height: 24),
              _buildSection(
                '8. Third-Party Services',
                Icons.link,
                AppTheme.supernovaGold,
                'Our service may contain links to third-party websites or integrate with third-party services. We are not responsible for the privacy practices of these external sites and encourage you to review their privacy policies.',
              ),
              const SizedBox(height: 24),
              _buildSection(
                '9. Children\'s Privacy',
                Icons.child_care,
                AppTheme.nebulaPink,
                'Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.',
              ),
              const SizedBox(height: 24),
              _buildSection(
                '10. International Transfers',
                Icons.public,
                AppTheme.electricViolet,
                'Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data in accordance with applicable privacy laws.',
              ),
              const SizedBox(height: 24),
              _buildSection(
                '11. Changes to This Policy',
                Icons.update,
                AppTheme.auroraGreen,
                'We may update this privacy policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date. Your continued use of our service constitutes acceptance of the updated policy.',
              ),
              const SizedBox(height: 24),
              _buildSection(
                '12. Contact Us',
                Icons.contact_support,
                AppTheme.celestialBlue,
                'If you have any questions about this privacy policy or our data practices, please contact us at:\n\nEmail: privacy@dailysecrets.com\nPhone: +1 (555) 123-4567\nAddress: 123 Cosmic Street, Universe City, UC 12345',
              ),
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
            Icons.privacy_tip,
            size: 60,
            color: AppTheme.starlightWhite,
          ),
          const SizedBox(height: 16),
          Text(
            'Privacy Policy',
            style: TextStyle(
              fontSize: 28,
              fontWeight: FontWeight.bold,
              color: AppTheme.starlightWhite,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            'Last updated: ${DateTime.now().toString().split(' ')[0]}',
            style: TextStyle(
              fontSize: 16,
              color: AppTheme.starlightWhite.withOpacity(0.9),
            ),
          ),
        ],
      ),
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
              Expanded(
                child: Text(
                  title,
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: color,
                  ),
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
