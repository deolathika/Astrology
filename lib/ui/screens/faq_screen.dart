import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class FAQScreen extends StatefulWidget {
  const FAQScreen({super.key});

  @override
  State<FAQScreen> createState() => _FAQScreenState();
}

class _FAQScreenState extends State<FAQScreen> {
  final List<FAQItem> _faqs = [
    FAQItem(
      question: 'What is Daily Secrets?',
      answer: 'Daily Secrets is a comprehensive cosmic guidance platform that combines astrology, numerology, and spiritual wisdom to provide personalized insights and daily guidance. We help you understand your cosmic blueprint and navigate life with ancient wisdom and modern technology.',
      isExpanded: false,
    ),
    FAQItem(
      question: 'How accurate are the readings?',
      answer: 'Our readings are based on established astrological and numerological principles, combined with advanced algorithms and expert knowledge. While we strive for accuracy, it\'s important to remember that cosmic guidance is meant to be a tool for self-reflection and growth, not absolute predictions.',
      isExpanded: false,
    ),
    FAQItem(
      question: 'Do I need to provide my exact birth time?',
      answer: 'For the most accurate astrological readings, your exact birth time is helpful but not always required. We can provide meaningful insights with just your birth date and place. For premium features, we recommend providing your complete birth information.',
      isExpanded: false,
    ),
    FAQItem(
      question: 'Is my personal information secure?',
      answer: 'Absolutely. We take your privacy seriously and use industry-standard encryption to protect your data. Your personal information is never shared with third parties without your consent, and you can delete your account and data at any time.',
      isExpanded: false,
    ),
    FAQItem(
      question: 'What\'s the difference between free and premium features?',
      answer: 'Free features include basic daily guidance, simple numerology calculations, and community access. Premium features include detailed astrological charts, comprehensive numerology reports, expert consultations, personalized readings, and advanced cosmic insights.',
      isExpanded: false,
    ),
    FAQItem(
      question: 'How do I cancel my subscription?',
      answer: 'You can cancel your subscription at any time through your account settings or by contacting our support team. Your premium features will remain active until the end of your current billing period.',
      isExpanded: false,
    ),
    FAQItem(
      question: 'Can I get a refund?',
      answer: 'We offer a 30-day money-back guarantee for new subscribers. If you\'re not satisfied with your premium experience, contact our support team within 30 days of your first payment for a full refund.',
      isExpanded: false,
    ),
    FAQItem(
      question: 'How often is the content updated?',
      answer: 'Our daily guidance is updated every day with fresh cosmic insights. Our astrological data is continuously updated, and we regularly add new features and content based on user feedback and cosmic events.',
      isExpanded: false,
    ),
    FAQItem(
      question: 'Can I use Daily Secrets offline?',
      answer: 'Some features are available offline, including your saved readings and basic numerology calculations. For the most current cosmic guidance and community features, an internet connection is required.',
      isExpanded: false,
    ),
    FAQItem(
      question: 'How do I contact support?',
      answer: 'You can reach our support team through the Contact Us section in the app, email us at support@dailysecrets.com, or call us at +1 (555) 123-4567. We typically respond within 24 hours.',
      isExpanded: false,
    ),
    FAQItem(
      question: 'Is Daily Secrets available in other languages?',
      answer: 'Currently, Daily Secrets is available in English. We\'re working on adding support for Spanish, French, German, and other major languages. Stay tuned for updates!',
      isExpanded: false,
    ),
    FAQItem(
      question: 'Can I share my readings with others?',
      answer: 'Yes! You can share your daily guidance, numerology reports, and cosmic insights with friends and family through social media, messaging apps, or email. Sharing helps spread cosmic wisdom and positive energy.',
      isExpanded: false,
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('FAQ'),
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
              ..._faqs.map((faq) => _buildFAQItem(faq)).toList(),
              const SizedBox(height: 32),
              _buildContactSection(),
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
            Icons.help_outline,
            size: 60,
            color: AppTheme.starlightWhite,
          ),
          const SizedBox(height: 16),
          Text(
            'Frequently Asked Questions',
            style: TextStyle(
              fontSize: 28,
              fontWeight: FontWeight.bold,
              color: AppTheme.starlightWhite,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            'Find answers to common questions',
            style: TextStyle(
              fontSize: 16,
              color: AppTheme.starlightWhite.withOpacity(0.9),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildFAQItem(FAQItem faq) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            AppTheme.celestialBlue.withOpacity(0.1),
            AppTheme.celestialBlue.withOpacity(0.05)
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppTheme.celestialBlue.withOpacity(0.3)),
      ),
      child: ExpansionTile(
        title: Text(
          faq.question,
          style: TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.bold,
            color: AppTheme.starlightWhite,
          ),
        ),
        iconColor: AppTheme.celestialBlue,
        collapsedIconColor: AppTheme.celestialBlue,
        backgroundColor: Colors.transparent,
        collapsedBackgroundColor: Colors.transparent,
        onExpansionChanged: (bool expanded) {
          setState(() {
            faq.isExpanded = expanded;
          });
        },
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
            child: Text(
              faq.answer,
              style: TextStyle(
                fontSize: 14,
                color: AppTheme.starlightWhite.withOpacity(0.9),
                height: 1.6,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildContactSection() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            AppTheme.supernovaGold.withOpacity(0.1),
            AppTheme.supernovaGold.withOpacity(0.05)
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppTheme.supernovaGold.withOpacity(0.3)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(Icons.contact_support, color: AppTheme.supernovaGold, size: 24),
              const SizedBox(width: 12),
              Text(
                'Still have questions?',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                  color: AppTheme.supernovaGold,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Text(
            'If you can\'t find the answer you\'re looking for, our support team is here to help!',
            style: TextStyle(
              fontSize: 16,
              color: AppTheme.starlightWhite.withOpacity(0.9),
            ),
          ),
          const SizedBox(height: 16),
          Row(
            children: [
              Expanded(
                child: ElevatedButton.icon(
                  onPressed: () {
                    // Navigate to contact us
                  },
                  icon: const Icon(Icons.email),
                  label: const Text('Contact Us'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppTheme.supernovaGold,
                    foregroundColor: AppTheme.deepSpaceBlack,
                    padding: const EdgeInsets.symmetric(vertical: 12),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: ElevatedButton.icon(
                  onPressed: () {
                    // Navigate to live chat
                  },
                  icon: const Icon(Icons.chat),
                  label: const Text('Live Chat'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppTheme.celestialBlue,
                    foregroundColor: AppTheme.starlightWhite,
                    padding: const EdgeInsets.symmetric(vertical: 12),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class FAQItem {
  final String question;
  final String answer;
  bool isExpanded;

  FAQItem({
    required this.question,
    required this.answer,
    required this.isExpanded,
  });
}
