import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../components/animated_card.dart';

class EnhancedBottomNavigation extends StatelessWidget {
  final int currentIndex;
  final Function(int) onTap;

  const EnhancedBottomNavigation({
    super.key,
    required this.currentIndex,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Theme.of(context).scaffoldBackgroundColor,
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
            blurRadius: 10,
            offset: const Offset(0, -2),
          ),
        ],
      ),
      child: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _buildNavItem(
                context,
                icon: Icons.home_rounded,
                label: 'Home',
                index: 0,
                isActive: currentIndex == 0,
              ),
              _buildNavItem(
                context,
                icon: Icons.people_rounded,
                label: 'Community',
                index: 1,
                isActive: currentIndex == 1,
              ),
              _buildNavItem(
                context,
                icon: Icons.favorite_rounded,
                label: 'Compatibility',
                index: 2,
                isActive: currentIndex == 2,
              ),
              _buildNavItem(
                context,
                icon: Icons.nightlight_round,
                label: 'Dreams',
                index: 3,
                isActive: currentIndex == 3,
              ),
              _buildNavItem(
                context,
                icon: Icons.person_rounded,
                label: 'Profile',
                index: 4,
                isActive: currentIndex == 4,
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildNavItem(
    BuildContext context, {
    required IconData icon,
    required String label,
    required int index,
    required bool isActive,
  }) {
    return GestureDetector(
      onTap: () => onTap(index),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
        decoration: BoxDecoration(
          color: isActive 
              ? AppTheme.mysticalPurple.withOpacity(0.1)
              : Colors.transparent,
          borderRadius: BorderRadius.circular(12),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            AnimatedContainer(
              duration: const Duration(milliseconds: 200),
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: isActive 
                    ? AppTheme.mysticalPurple
                    : Colors.transparent,
                borderRadius: BorderRadius.circular(8),
              ),
              child: Icon(
                icon,
                size: 20,
                color: isActive 
                    ? Colors.white
                    : Theme.of(context).iconTheme.color?.withOpacity(0.6),
              ),
            ),
            const SizedBox(height: 4),
            Text(
              label,
              style: Theme.of(context).textTheme.bodySmall?.copyWith(
                color: isActive 
                    ? AppTheme.mysticalPurple
                    : Theme.of(context).textTheme.bodySmall?.color?.withOpacity(0.6),
                fontWeight: isActive ? FontWeight.w600 : FontWeight.normal,
                fontSize: 10,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class EnhancedAppBar extends StatelessWidget implements PreferredSizeWidget {
  final String title;
  final List<Widget>? actions;
  final Widget? leading;
  final bool showBreadcrumbs;
  final List<BreadcrumbItem>? breadcrumbs;

  const EnhancedAppBar({
    super.key,
    required this.title,
    this.actions,
    this.leading,
    this.showBreadcrumbs = false,
    this.breadcrumbs,
  });

  @override
  Widget build(BuildContext context) {
    return AppBar(
      elevation: 0,
      backgroundColor: Colors.transparent,
      foregroundColor: Theme.of(context).textTheme.titleLarge?.color,
      title: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: Theme.of(context).textTheme.titleLarge?.copyWith(
              fontWeight: FontWeight.bold,
            ),
          ),
          if (showBreadcrumbs && breadcrumbs != null) ...[
            const SizedBox(height: 4),
            Breadcrumbs(
              items: breadcrumbs!,
              textColor: Theme.of(context).textTheme.bodySmall?.color,
              activeColor: AppTheme.mysticalPurple,
            ),
          ],
        ],
      ),
      leading: leading,
      actions: [
        ...?actions,
        const SizedBox(width: 8),
      ],
    );
  }

  @override
  Size get preferredSize => Size.fromHeight(
    showBreadcrumbs ? 100 : 56,
  );
}

class EnhancedDrawer extends StatelessWidget {
  final VoidCallback? onProfileTap;
  final VoidCallback? onWalletTap;
  final VoidCallback? onOrdersTap;
  final VoidCallback? onSettingsTap;
  final VoidCallback? onBlogTap;
  final VoidCallback? onContactTap;
  final VoidCallback? onPrivacyTap;
  final VoidCallback? onTermsTap;
  final VoidCallback? onLogoutTap;

  const EnhancedDrawer({
    super.key,
    this.onProfileTap,
    this.onWalletTap,
    this.onOrdersTap,
    this.onSettingsTap,
    this.onBlogTap,
    this.onContactTap,
    this.onPrivacyTap,
    this.onTermsTap,
    this.onLogoutTap,
  });

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: Column(
        children: [
          // Header
          Container(
            height: 200,
            decoration: const BoxDecoration(
              gradient: AppTheme.cosmicGradient,
            ),
            child: SafeArea(
              child: Padding(
                padding: const EdgeInsets.all(20),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Container(
                          width: 60,
                          height: 60,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            color: Colors.white.withOpacity(0.2),
                          ),
                          child: const Icon(
                            Icons.person,
                            color: Colors.white,
                            size: 30,
                          ),
                        ),
                        const SizedBox(width: 16),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                'Welcome back!',
                                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              Text(
                                'Your cosmic journey continues',
                                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                                  color: Colors.white70,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ),
          
          // Menu items
          Expanded(
            child: ListView(
              padding: EdgeInsets.zero,
              children: [
                _buildMenuItem(
                  context,
                  icon: Icons.account_balance_wallet,
                  title: 'Wallet',
                  subtitle: 'Manage your balance',
                  onTap: onWalletTap,
                ),
                _buildMenuItem(
                  context,
                  icon: Icons.shopping_bag,
                  title: 'Orders',
                  subtitle: 'View your orders',
                  onTap: onOrdersTap,
                ),
                _buildMenuItem(
                  context,
                  icon: Icons.settings,
                  title: 'Settings',
                  subtitle: 'App preferences',
                  onTap: onSettingsTap,
                ),
                _buildMenuItem(
                  context,
                  icon: Icons.article,
                  title: 'Blog',
                  subtitle: 'Latest articles',
                  onTap: onBlogTap,
                ),
                _buildMenuItem(
                  context,
                  icon: Icons.contact_support,
                  title: 'Contact',
                  subtitle: 'Get help & support',
                  onTap: onContactTap,
                ),
                _buildMenuItem(
                  context,
                  icon: Icons.privacy_tip,
                  title: 'Privacy Policy',
                  subtitle: 'Data protection',
                  onTap: onPrivacyTap,
                ),
                _buildMenuItem(
                  context,
                  icon: Icons.description,
                  title: 'Terms of Service',
                  subtitle: 'User agreement',
                  onTap: onTermsTap,
                ),
                const Divider(),
                _buildMenuItem(
                  context,
                  icon: Icons.logout,
                  title: 'Logout',
                  subtitle: 'Sign out of your account',
                  onTap: onLogoutTap,
                  isDestructive: true,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildMenuItem(
    BuildContext context, {
    required IconData icon,
    required String title,
    required String subtitle,
    required VoidCallback? onTap,
    bool isDestructive = false,
  }) {
    return ListTile(
      leading: Container(
        width: 40,
        height: 40,
        decoration: BoxDecoration(
          color: isDestructive 
              ? Colors.red.withOpacity(0.1)
              : AppTheme.mysticalPurple.withOpacity(0.1),
          borderRadius: BorderRadius.circular(8),
        ),
        child: Icon(
          icon,
          color: isDestructive 
              ? Colors.red
              : AppTheme.mysticalPurple,
          size: 20,
        ),
      ),
      title: Text(
        title,
        style: Theme.of(context).textTheme.titleMedium?.copyWith(
          fontWeight: FontWeight.w600,
          color: isDestructive ? Colors.red : null,
        ),
      ),
      subtitle: Text(
        subtitle,
        style: Theme.of(context).textTheme.bodySmall?.copyWith(
          color: Theme.of(context).textTheme.bodySmall?.color?.withOpacity(0.7),
        ),
      ),
      onTap: onTap,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(8),
      ),
    );
  }
}

class NotificationBell extends StatefulWidget {
  final int notificationCount;
  final VoidCallback? onTap;

  const NotificationBell({
    super.key,
    this.notificationCount = 0,
    this.onTap,
  });

  @override
  State<NotificationBell> createState() => _NotificationBellState();
}

class _NotificationBellState extends State<NotificationBell>
    with TickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 500),
      vsync: this,
    );
    _animation = Tween<double>(
      begin: 1.0,
      end: 1.2,
    ).animate(CurvedAnimation(
      parent: _controller,
      curve: Curves.elasticOut,
    ));
  }

  @override
  void didUpdateWidget(NotificationBell oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.notificationCount > oldWidget.notificationCount) {
      _controller.forward().then((_) {
        _controller.reverse();
      });
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: widget.onTap,
      child: AnimatedBuilder(
        animation: _animation,
        builder: (context, child) {
          return Transform.scale(
            scale: _animation.value,
            child: Stack(
              children: [
                Container(
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    color: Colors.grey[100],
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Icon(
                    Icons.notifications_outlined,
                    color: Theme.of(context).iconTheme.color,
                    size: 24,
                  ),
                ),
                if (widget.notificationCount > 0)
                  Positioned(
                    right: 0,
                    top: 0,
                    child: Container(
                      padding: const EdgeInsets.all(4),
                      decoration: BoxDecoration(
                        color: AppTheme.mysticalPurple,
                        borderRadius: BorderRadius.circular(10),
                      ),
                      constraints: const BoxConstraints(
                        minWidth: 20,
                        minHeight: 20,
                      ),
                      child: Text(
                        widget.notificationCount > 99 
                            ? '99+' 
                            : widget.notificationCount.toString(),
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 12,
                          fontWeight: FontWeight.bold,
                        ),
                        textAlign: TextAlign.center,
                      ),
                    ),
                  ),
              ],
            ),
          );
        },
      ),
    );
  }
}

class ThemeToggle extends StatefulWidget {
  final VoidCallback? onToggle;

  const ThemeToggle({
    super.key,
    this.onToggle,
  });

  @override
  State<ThemeToggle> createState() => _ThemeToggleState();
}

class _ThemeToggleState extends State<ThemeToggle>
    with TickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 300),
      vsync: this,
    );
    _animation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _controller,
      curve: Curves.easeInOut,
    ));
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    
    return GestureDetector(
      onTap: () {
        _controller.forward().then((_) {
          _controller.reverse();
        });
        widget.onToggle?.call();
      },
      child: AnimatedBuilder(
        animation: _animation,
        builder: (context, child) {
          return Container(
            width: 50,
            height: 30,
            decoration: BoxDecoration(
              color: isDark ? AppTheme.mysticalPurple : Colors.grey[300],
              borderRadius: BorderRadius.circular(15),
            ),
            child: Stack(
              children: [
                AnimatedPositioned(
                  duration: const Duration(milliseconds: 300),
                  curve: Curves.easeInOut,
                  left: isDark ? 20 : 2,
                  top: 2,
                  child: Container(
                    width: 26,
                    height: 26,
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(13),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withOpacity(0.2),
                          blurRadius: 4,
                          offset: const Offset(0, 2),
                        ),
                      ],
                    ),
                    child: Icon(
                      isDark ? Icons.dark_mode : Icons.light_mode,
                      size: 16,
                      color: isDark ? AppTheme.mysticalPurple : Colors.orange,
                    ),
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}


