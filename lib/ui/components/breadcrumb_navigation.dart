import 'package:flutter/material.dart';
import '../../services/translation_service.dart';
import '../theme/app_theme.dart';

class BreadcrumbNavigation extends StatelessWidget {
  final List<BreadcrumbItem> items;
  final VoidCallback? onBack;

  const BreadcrumbNavigation({
    super.key,
    required this.items,
    this.onBack,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      decoration: BoxDecoration(
        gradient: AppTheme.electricCardGradient,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: AppTheme.electricViolet.withOpacity(0.3),
          width: 1,
        ),
      ),
      child: Row(
        children: [
          if (onBack != null) ...[
            GestureDetector(
              onTap: onBack,
              child: Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: AppTheme.electricViolet.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Icon(
                  Icons.arrow_back,
                  color: AppTheme.electricViolet,
                  size: 20,
                ),
              ),
            ),
            const SizedBox(width: 12),
          ],
          Expanded(
            child: SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Row(
                children: items.asMap().entries.map((entry) {
                  final index = entry.key;
                  final item = entry.value;
                  final isLast = index == items.length - 1;
                  
                  return Row(
                    children: [
                      GestureDetector(
                        onTap: item.onTap,
                        child: Container(
                          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                          decoration: BoxDecoration(
                            color: isLast 
                                ? AppTheme.electricViolet.withOpacity(0.2)
                                : Colors.transparent,
                            borderRadius: BorderRadius.circular(16),
                          ),
                          child: Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              if (item.icon != null) ...[
                                Icon(
                                  item.icon,
                                  size: 16,
                                  color: isLast ? AppTheme.electricViolet : AppTheme.stellarGray,
                                ),
                                const SizedBox(width: 4),
                              ],
                              Text(
                                item.label,
                                style: TextStyle(
                                  fontSize: 14,
                                  fontWeight: isLast ? FontWeight.bold : FontWeight.normal,
                                  color: isLast ? AppTheme.electricViolet : AppTheme.stellarGray,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                      if (!isLast) ...[
                        const SizedBox(width: 8),
                        Icon(
                          Icons.chevron_right,
                          size: 16,
                          color: AppTheme.stellarGray.withOpacity(0.5),
                        ),
                        const SizedBox(width: 8),
                      ],
                    ],
                  );
                }).toList(),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class BreadcrumbItem {
  final String label;
  final IconData? icon;
  final VoidCallback? onTap;

  const BreadcrumbItem({
    required this.label,
    this.icon,
    this.onTap,
  });
}

// Predefined breadcrumb configurations
class BreadcrumbConfigs {
  static List<BreadcrumbItem> homeBreadcrumb() {
    return [
      BreadcrumbItem(
        label: TranslationService.translate('home'),
        icon: Icons.home,
      ),
    ];
  }

  static List<BreadcrumbItem> fullAnalysisBreadcrumb(VoidCallback onHomeTap) {
    return [
      BreadcrumbItem(
        label: TranslationService.translate('home'),
        icon: Icons.home,
        onTap: onHomeTap,
      ),
      BreadcrumbItem(
        label: TranslationService.translate('full_analysis'),
        icon: Icons.auto_awesome,
      ),
    ];
  }

  static List<BreadcrumbItem> astrologyBreadcrumb(VoidCallback onHomeTap, VoidCallback onAnalysisTap) {
    return [
      BreadcrumbItem(
        label: TranslationService.translate('home'),
        icon: Icons.home,
        onTap: onHomeTap,
      ),
      BreadcrumbItem(
        label: TranslationService.translate('full_analysis'),
        icon: Icons.auto_awesome,
        onTap: onAnalysisTap,
      ),
      BreadcrumbItem(
        label: TranslationService.translate('astrology'),
        icon: Icons.star,
      ),
    ];
  }

  static List<BreadcrumbItem> numerologyBreadcrumb(VoidCallback onHomeTap, VoidCallback onAnalysisTap) {
    return [
      BreadcrumbItem(
        label: TranslationService.translate('home'),
        icon: Icons.home,
        onTap: onHomeTap,
      ),
      BreadcrumbItem(
        label: TranslationService.translate('full_analysis'),
        icon: Icons.auto_awesome,
        onTap: onAnalysisTap,
      ),
      BreadcrumbItem(
        label: TranslationService.translate('numerology'),
        icon: Icons.calculate,
      ),
    ];
  }

  static List<BreadcrumbItem> communityBreadcrumb(VoidCallback onHomeTap) {
    return [
      BreadcrumbItem(
        label: TranslationService.translate('home'),
        icon: Icons.home,
        onTap: onHomeTap,
      ),
      BreadcrumbItem(
        label: TranslationService.translate('community'),
        icon: Icons.people,
      ),
    ];
  }

  static List<BreadcrumbItem> compatibilityBreadcrumb(VoidCallback onHomeTap) {
    return [
      BreadcrumbItem(
        label: TranslationService.translate('home'),
        icon: Icons.home,
        onTap: onHomeTap,
      ),
      BreadcrumbItem(
        label: TranslationService.translate('compatibility'),
        icon: Icons.favorite,
      ),
    ];
  }

  static List<BreadcrumbItem> dreamsBreadcrumb(VoidCallback onHomeTap) {
    return [
      BreadcrumbItem(
        label: TranslationService.translate('home'),
        icon: Icons.home,
        onTap: onHomeTap,
      ),
      BreadcrumbItem(
        label: TranslationService.translate('dreams'),
        icon: Icons.psychology,
      ),
    ];
  }

  static List<BreadcrumbItem> profileBreadcrumb(VoidCallback onHomeTap) {
    return [
      BreadcrumbItem(
        label: TranslationService.translate('home'),
        icon: Icons.home,
        onTap: onHomeTap,
      ),
      BreadcrumbItem(
        label: TranslationService.translate('profile'),
        icon: Icons.person,
      ),
    ];
  }

  static List<BreadcrumbItem> settingsBreadcrumb(VoidCallback onHomeTap) {
    return [
      BreadcrumbItem(
        label: TranslationService.translate('home'),
        icon: Icons.home,
        onTap: onHomeTap,
      ),
      BreadcrumbItem(
        label: TranslationService.translate('settings'),
        icon: Icons.settings,
      ),
    ];
  }
}
