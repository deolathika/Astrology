import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class TermsConditionsScreen extends StatelessWidget {
  const TermsConditionsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Terms & Conditions'),
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
                '1. Acceptance of Terms',
                Icons.check_circle,
                AppTheme.auroraGreen,
                'By accessing and using Daily Secrets, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.',
              ),
              const SizedBox(height: 24),
              _buildSection(
                '2. Use License',
                Icons.security,
                AppTheme.celestialBlue,
                'Permission is granted to temporarily download one copy of Daily Secrets for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:\n\n• Modify or copy the materials\n• Use the materials for any commercial purpose or for any public display\n• Attempt to reverse engineer any software contained in the application\n• Remove any copyright or other proprietary notations from the materials',
              ),
              const SizedBox(height: 24),
              _buildSection(
                '3. Disclaimer',
                Icons.warning,
                AppTheme.supernovaGold,
                'The materials on Daily Secrets are provided on an \'as is\' basis. Daily Secrets makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.',
              ),
              const SizedBox(height: 24),
              _buildSection(
                '4. Limitations',
                Icons.block,
                AppTheme.nebulaPink,
                'In no event shall Daily Secrets or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Daily Secrets, even if Daily Secrets or an authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.',
              ),
              const SizedBox(height: 24),
              _buildSection(
                '5. Accuracy of Materials',
                Icons.verified,
                AppTheme.electricViolet,
                'The materials appearing on Daily Secrets could include technical, typographical, or photographic errors. Daily Secrets does not warrant that any of the materials on its website are accurate, complete, or current. Daily Secrets may make changes to the materials contained on its website at any time without notice. However, Daily Secrets does not make any commitment to update the materials.',
              ),
              const SizedBox(height: 24),
              _buildSection(
                '6. Links',
                Icons.link,
                AppTheme.auroraGreen,
                'Daily Secrets has not reviewed all of the sites linked to our website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Daily Secrets of the site. Use of any such linked website is at the user\'s own risk.',
              ),
              const SizedBox(height: 24),
              _buildSection(
                '7. Modifications',
                Icons.edit,
                AppTheme.celestialBlue,
                'Daily Secrets may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.',
              ),
              const SizedBox(height: 24),
              _buildSection(
                '8. Governing Law',
                Icons.gavel,
                AppTheme.supernovaGold,
                'These terms and conditions are governed by and construed in accordance with the laws of the United States and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.',
              ),
              const SizedBox(height: 24),
              _buildSection(
                '9. Privacy Policy',
                Icons.privacy_tip,
                AppTheme.nebulaPink,
                'Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our service. By using our service, you agree to the collection and use of information in accordance with this policy.',
              ),
              const SizedBox(height: 24),
              _buildSection(
                '10. Contact Information',
                Icons.contact_support,
                AppTheme.electricViolet,
                'If you have any questions about these Terms and Conditions, please contact us at:\n\nEmail: legal@dailysecrets.com\nPhone: +1 (555) 123-4567\nAddress: 123 Cosmic Street, Universe City, UC 12345',
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
            Icons.description,
            size: 60,
            color: AppTheme.starlightWhite,
          ),
          const SizedBox(height: 16),
          Text(
            'Terms & Conditions',
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
