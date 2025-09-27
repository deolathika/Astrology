import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class Breadcrumbs extends StatelessWidget {
  final List<BreadcrumbItem> items;
  final VoidCallback? onTap;
  final Color? textColor;
  final Color? activeColor;
  final Color? separatorColor;

  const Breadcrumbs({
    super.key,
    required this.items,
    this.onTap,
    this.textColor,
    this.activeColor,
    this.separatorColor,
  });

  @override
  Widget build(BuildContext context) {
    if (items.isEmpty) return const SizedBox.shrink();

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: Row(
        children: [
          for (int i = 0; i < items.length; i++) ...[
            if (i > 0) ...[
              const SizedBox(width: 8),
              Icon(
                Icons.chevron_right,
                size: 16,
                color: separatorColor ?? AppTheme.cosmicDark.withOpacity(0.5),
              ),
              const SizedBox(width: 8),
            ],
            _buildBreadcrumbItem(context, items[i], i == items.length - 1),
          ],
        ],
      ),
    );
  }

  Widget _buildBreadcrumbItem(BuildContext context, BreadcrumbItem item, bool isLast) {
    final isActive = isLast;
    final color = isActive 
        ? (activeColor ?? AppTheme.mysticalPurple)
        : (textColor ?? AppTheme.cosmicDark.withOpacity(0.7));

    return GestureDetector(
      onTap: isActive ? null : item.onTap,
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (item.icon != null) ...[
            Icon(
              item.icon,
              size: 16,
              color: color,
            ),
            const SizedBox(width: 4),
          ],
          Text(
            item.label,
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
              color: color,
              fontWeight: isActive ? FontWeight.w600 : FontWeight.normal,
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

class BreadcrumbBuilder {
  static List<BreadcrumbItem> home() {
    return [
      const BreadcrumbItem(
        label: 'Home',
        icon: Icons.home,
      ),
    ];
  }

  static List<BreadcrumbItem> profile() {
    return [
      const BreadcrumbItem(
        label: 'Home',
        icon: Icons.home,
      ),
      const BreadcrumbItem(
        label: 'Profile',
        icon: Icons.person,
      ),
    ];
  }

  static List<BreadcrumbItem> editProfile() {
    return [
      const BreadcrumbItem(
        label: 'Home',
        icon: Icons.home,
      ),
      const BreadcrumbItem(
        label: 'Profile',
        icon: Icons.person,
      ),
      const BreadcrumbItem(
        label: 'Edit',
        icon: Icons.edit,
      ),
    ];
  }

  static List<BreadcrumbItem> community() {
    return [
      const BreadcrumbItem(
        label: 'Home',
        icon: Icons.home,
      ),
      const BreadcrumbItem(
        label: 'Community',
        icon: Icons.people,
      ),
    ];
  }

  static List<BreadcrumbItem> compatibility() {
    return [
      const BreadcrumbItem(
        label: 'Home',
        icon: Icons.home,
      ),
      const BreadcrumbItem(
        label: 'Compatibility',
        icon: Icons.favorite,
      ),
    ];
  }

  static List<BreadcrumbItem> dreams() {
    return [
      const BreadcrumbItem(
        label: 'Home',
        icon: Icons.home,
      ),
      const BreadcrumbItem(
        label: 'Dreams',
        icon: Icons.nightlight_round,
      ),
    ];
  }

  static List<BreadcrumbItem> wallet() {
    return [
      const BreadcrumbItem(
        label: 'Home',
        icon: Icons.home,
      ),
      const BreadcrumbItem(
        label: 'Wallet',
        icon: Icons.account_balance_wallet,
      ),
    ];
  }

  static List<BreadcrumbItem> notifications() {
    return [
      const BreadcrumbItem(
        label: 'Home',
        icon: Icons.home,
      ),
      const BreadcrumbItem(
        label: 'Notifications',
        icon: Icons.notifications,
      ),
    ];
  }

  static List<BreadcrumbItem> settings() {
    return [
      const BreadcrumbItem(
        label: 'Home',
        icon: Icons.home,
      ),
      const BreadcrumbItem(
        label: 'Settings',
        icon: Icons.settings,
      ),
    ];
  }
}

class AnimatedBreadcrumbs extends StatefulWidget {
  final List<BreadcrumbItem> items;
  final VoidCallback? onTap;
  final Color? textColor;
  final Color? activeColor;
  final Color? separatorColor;
  final Duration animationDuration;

  const AnimatedBreadcrumbs({
    super.key,
    required this.items,
    this.onTap,
    this.textColor,
    this.activeColor,
    this.separatorColor,
    this.animationDuration = const Duration(milliseconds: 300),
  });

  @override
  State<AnimatedBreadcrumbs> createState() => _AnimatedBreadcrumbsState();
}

class _AnimatedBreadcrumbsState extends State<AnimatedBreadcrumbs>
    with TickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: widget.animationDuration,
      vsync: this,
    );
    _animation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _controller,
      curve: Curves.easeOut,
    ));
    _controller.forward();
  }

  @override
  void didUpdateWidget(AnimatedBreadcrumbs oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.items != widget.items) {
      _controller.reset();
      _controller.forward();
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _animation,
      builder: (context, child) {
        return Opacity(
          opacity: _animation.value,
          child: Transform.translate(
            offset: Offset(0, 20 * (1 - _animation.value)),
            child: Breadcrumbs(
              items: widget.items,
              onTap: widget.onTap,
              textColor: widget.textColor,
              activeColor: widget.activeColor,
              separatorColor: widget.separatorColor,
            ),
          ),
        );
      },
    );
  }
}

