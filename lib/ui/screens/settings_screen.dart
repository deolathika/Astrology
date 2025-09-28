import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../../services/translation_service.dart';

class SettingsScreen extends StatefulWidget {
  const SettingsScreen({super.key});

  @override
  State<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  String _currentLanguage = 'en';
  bool _notificationsEnabled = true;
  bool _dailyGuidanceEnabled = true;
  bool _cosmicAlertsEnabled = true;
  bool _darkModeEnabled = false;

  @override
  void initState() {
    super.initState();
    _currentLanguage = TranslationService.currentLanguage;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.deepSpaceBlack,
      appBar: AppBar(
        title: Text(TranslationService.translate('settings')),
        backgroundColor: Colors.transparent,
        elevation: 0,
        foregroundColor: AppTheme.starlightWhite,
        actions: [
          IconButton(
            icon: const Icon(Icons.close),
            onPressed: () => Navigator.pop(context),
          ),
        ],
      ),
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [
              AppTheme.deepSpaceBlack,
              AppTheme.cosmicNavy,
              AppTheme.nebulaDark,
            ],
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
          ),
        ),
        child: SafeArea(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _buildTranslationSection(),
                const SizedBox(height: 24),
                _buildNotificationSection(),
                const SizedBox(height: 24),
                _buildAppearanceSection(),
                const SizedBox(height: 24),
                _buildPrivacySection(),
                const SizedBox(height: 24),
                _buildAboutSection(),
                const SizedBox(height: 100),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildTranslationSection() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            AppTheme.electricViolet.withOpacity(0.1),
            AppTheme.cosmicPurple.withOpacity(0.1),
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(
          color: AppTheme.electricViolet.withOpacity(0.3),
          width: 1.5,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(Icons.translate, color: AppTheme.electricViolet, size: 24),
              const SizedBox(width: 8),
              Text(
                TranslationService.translate('language_settings'),
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                  color: AppTheme.electricViolet,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Text(
            TranslationService.translate('select_language'),
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
              color: AppTheme.starlightWhite,
            ),
          ),
          const SizedBox(height: 12),
          DropdownButton<String>(
            value: _currentLanguage,
            dropdownColor: AppTheme.cosmicNavy,
            style: TextStyle(
              color: AppTheme.starlightWhite,
              fontSize: 16,
            ),
            underline: Container(),
            icon: Icon(Icons.keyboard_arrow_down, color: AppTheme.electricViolet),
            isExpanded: true,
            items: [
              DropdownMenuItem(
                value: 'en',
                child: Row(
                  children: [
                    Text('🇺🇸', style: TextStyle(fontSize: 20)),
                    const SizedBox(width: 8),
                    Text('English', style: TextStyle(color: AppTheme.starlightWhite)),
                  ],
                ),
              ),
              DropdownMenuItem(
                value: 'si',
                child: Row(
                  children: [
                    Text('🇱🇰', style: TextStyle(fontSize: 20)),
                    const SizedBox(width: 8),
                    Text('සිංහල', style: TextStyle(color: AppTheme.starlightWhite)),
                  ],
                ),
              ),
              DropdownMenuItem(
                value: 'ta',
                child: Row(
                  children: [
                    Text('🇱🇰', style: TextStyle(fontSize: 20)),
                    const SizedBox(width: 8),
                    Text('தமிழ்', style: TextStyle(color: AppTheme.starlightWhite)),
                  ],
                ),
              ),
              DropdownMenuItem(
                value: 'hi',
                child: Row(
                  children: [
                    Text('🇮🇳', style: TextStyle(fontSize: 20)),
                    const SizedBox(width: 8),
                    Text('हिन्दी', style: TextStyle(color: AppTheme.starlightWhite)),
                  ],
                ),
              ),
            ],
            onChanged: (String? newLanguage) {
              if (newLanguage != null) {
                setState(() {
                  _currentLanguage = newLanguage;
                });
                TranslationService.setLanguage(newLanguage);
              }
            },
          ),
        ],
      ),
    );
  }

  Widget _buildNotificationSection() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            AppTheme.celestialBlue.withOpacity(0.1),
            AppTheme.cosmicCyan.withOpacity(0.1),
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(
          color: AppTheme.celestialBlue.withOpacity(0.3),
          width: 1.5,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(Icons.notifications, color: AppTheme.celestialBlue, size: 24),
              const SizedBox(width: 8),
              Text(
                TranslationService.translate('notifications'),
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                  color: AppTheme.celestialBlue,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          _buildSwitchTile(
            TranslationService.translate('enable_notifications'),
            TranslationService.translate('enable_notifications_description'),
            _notificationsEnabled,
            (value) => setState(() => _notificationsEnabled = value),
            AppTheme.celestialBlue,
          ),
          const SizedBox(height: 12),
          _buildSwitchTile(
            TranslationService.translate('daily_guidance'),
            TranslationService.translate('daily_guidance_description'),
            _dailyGuidanceEnabled,
            (value) => setState(() => _dailyGuidanceEnabled = value),
            AppTheme.cosmicCyan,
          ),
          const SizedBox(height: 12),
          _buildSwitchTile(
            TranslationService.translate('cosmic_alerts'),
            TranslationService.translate('cosmic_alerts_description'),
            _cosmicAlertsEnabled,
            (value) => setState(() => _cosmicAlertsEnabled = value),
            AppTheme.stellarTeal,
          ),
        ],
      ),
    );
  }

  Widget _buildAppearanceSection() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            AppTheme.supernovaGold.withOpacity(0.1),
            AppTheme.stellarYellow.withOpacity(0.1),
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(
          color: AppTheme.supernovaGold.withOpacity(0.3),
          width: 1.5,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(Icons.palette, color: AppTheme.supernovaGold, size: 24),
              const SizedBox(width: 8),
              Text(
                TranslationService.translate('appearance'),
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                  color: AppTheme.supernovaGold,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          _buildSwitchTile(
            TranslationService.translate('dark_mode'),
            TranslationService.translate('dark_mode_description'),
            _darkModeEnabled,
            (value) => setState(() => _darkModeEnabled = value),
            AppTheme.supernovaGold,
          ),
          const SizedBox(height: 16),
          Text(
            TranslationService.translate('theme_colors'),
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
              color: AppTheme.starlightWhite,
              fontWeight: FontWeight.w600,
            ),
          ),
          const SizedBox(height: 12),
          Row(
            children: [
              _buildColorOption(AppTheme.electricViolet, 'Electric Violet'),
              const SizedBox(width: 12),
              _buildColorOption(AppTheme.celestialBlue, 'Celestial Blue'),
              const SizedBox(width: 12),
              _buildColorOption(AppTheme.supernovaGold, 'Supernova Gold'),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildColorOption(Color color, String name) {
    return GestureDetector(
      onTap: () {
        // Handle color selection
      },
      child: Container(
        width: 50,
        height: 50,
        decoration: BoxDecoration(
          color: color,
          shape: BoxShape.circle,
          border: Border.all(
            color: AppTheme.starlightWhite,
            width: 2,
          ),
        ),
        child: Icon(
          Icons.check,
          color: Colors.white,
          size: 20,
        ),
      ),
    );
  }

  Widget _buildPrivacySection() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            AppTheme.auroraGreen.withOpacity(0.1),
            AppTheme.stellarTeal.withOpacity(0.1),
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(
          color: AppTheme.auroraGreen.withOpacity(0.3),
          width: 1.5,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(Icons.privacy_tip, color: AppTheme.auroraGreen, size: 24),
              const SizedBox(width: 8),
              Text(
                TranslationService.translate('privacy'),
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                  color: AppTheme.auroraGreen,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          _buildSettingsTile(
            TranslationService.translate('data_usage'),
            TranslationService.translate('data_usage_description'),
            Icons.data_usage,
            AppTheme.auroraGreen,
            () {},
          ),
          const SizedBox(height: 12),
          _buildSettingsTile(
            TranslationService.translate('location_permissions'),
            TranslationService.translate('location_permissions_description'),
            Icons.location_on,
            AppTheme.stellarTeal,
            () {},
          ),
          const SizedBox(height: 12),
          _buildSettingsTile(
            TranslationService.translate('analytics'),
            TranslationService.translate('analytics_description'),
            Icons.analytics,
            AppTheme.cosmicCyan,
            () {},
          ),
        ],
      ),
    );
  }

  Widget _buildAboutSection() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            AppTheme.nebulaPink.withOpacity(0.1),
            AppTheme.cosmicOrange.withOpacity(0.1),
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(
          color: AppTheme.nebulaPink.withOpacity(0.3),
          width: 1.5,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(Icons.info, color: AppTheme.nebulaPink, size: 24),
              const SizedBox(width: 8),
              Text(
                TranslationService.translate('about'),
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                  color: AppTheme.nebulaPink,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          _buildSettingsTile(
            TranslationService.translate('app_version'),
            '1.0.0',
            Icons.info_outline,
            AppTheme.nebulaPink,
            () {},
          ),
          const SizedBox(height: 12),
          _buildSettingsTile(
            TranslationService.translate('terms_conditions'),
            TranslationService.translate('terms_conditions_description'),
            Icons.description,
            AppTheme.cosmicOrange,
            () {},
          ),
          const SizedBox(height: 12),
          _buildSettingsTile(
            TranslationService.translate('privacy_policy'),
            TranslationService.translate('privacy_policy_description'),
            Icons.security,
            AppTheme.stellarYellow,
            () {},
          ),
          const SizedBox(height: 12),
          _buildSettingsTile(
            TranslationService.translate('contact_support'),
            TranslationService.translate('contact_support_description'),
            Icons.support_agent,
            AppTheme.auroraGreen,
            () {},
          ),
        ],
      ),
    );
  }

  Widget _buildSwitchTile(String title, String description, bool value, Function(bool) onChanged, Color color) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: color.withOpacity(0.3)),
      ),
      child: Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                    color: AppTheme.starlightWhite,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                Text(
                  description,
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                    color: AppTheme.starlightWhite.withOpacity(0.7),
                  ),
                ),
              ],
            ),
          ),
          Switch(
            value: value,
            onChanged: onChanged,
            activeColor: color,
            activeTrackColor: color.withOpacity(0.3),
            inactiveThumbColor: AppTheme.stellarGray,
            inactiveTrackColor: AppTheme.stellarGray.withOpacity(0.3),
          ),
        ],
      ),
    );
  }

  Widget _buildSettingsTile(String title, String subtitle, IconData icon, Color color, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: color.withOpacity(0.1),
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: color.withOpacity(0.3)),
        ),
        child: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: color.withOpacity(0.2),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Icon(icon, color: color, size: 20),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      color: AppTheme.starlightWhite,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  Text(
                    subtitle,
                    style: Theme.of(context).textTheme.bodySmall?.copyWith(
                      color: AppTheme.starlightWhite.withOpacity(0.7),
                    ),
                  ),
                ],
              ),
            ),
            Icon(
              Icons.arrow_forward_ios,
              color: color,
              size: 16,
            ),
          ],
        ),
      ),
    );
  }
}