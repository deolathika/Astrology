import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class ResponsiveLayout extends StatelessWidget {
  final Widget mobile;
  final Widget? tablet;
  final Widget? desktop;
  final bool showBottomNavigation;
  final int currentIndex;
  final Function(int)? onNavigationTap;

  const ResponsiveLayout({
    super.key,
    required this.mobile,
    this.tablet,
    this.desktop,
    this.showBottomNavigation = true,
    this.currentIndex = 0,
    this.onNavigationTap,
  });

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        if (constraints.maxWidth >= 1200) {
          // Desktop layout
          return _buildDesktopLayout(context);
        } else if (constraints.maxWidth >= 768) {
          // Tablet layout
          return _buildTabletLayout(context);
        } else {
          // Mobile layout
          return _buildMobileLayout(context);
        }
      },
    );
  }

  Widget _buildMobileLayout(BuildContext context) {
    return Scaffold(
      body: mobile,
      bottomNavigationBar: showBottomNavigation
          ? _buildBottomNavigation(context)
          : null,
    );
  }

  Widget _buildTabletLayout(BuildContext context) {
    return Scaffold(
      body: Row(
        children: [
          // Side navigation for tablet
          Container(
            width: 200,
            decoration: BoxDecoration(
              color: Theme.of(context).scaffoldBackgroundColor,
              border: Border(
                right: BorderSide(
                  color: Colors.grey.withOpacity(0.2),
                  width: 1,
                ),
              ),
            ),
            child: _buildSideNavigation(context),
          ),
          // Main content
          Expanded(
            child: tablet ?? mobile,
          ),
        ],
      ),
    );
  }

  Widget _buildDesktopLayout(BuildContext context) {
    return Scaffold(
      body: Row(
        children: [
          // Side navigation for desktop
          Container(
            width: 250,
            decoration: BoxDecoration(
              color: Theme.of(context).scaffoldBackgroundColor,
              border: Border(
                right: BorderSide(
                  color: Colors.grey.withOpacity(0.2),
                  width: 1,
                ),
              ),
            ),
            child: _buildSideNavigation(context),
          ),
          // Main content
          Expanded(
            child: desktop ?? tablet ?? mobile,
          ),
        ],
      ),
    );
  }

  Widget _buildBottomNavigation(BuildContext context) {
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

  Widget _buildSideNavigation(BuildContext context) {
    return Column(
      children: [
        // Logo
        Padding(
          padding: const EdgeInsets.all(20),
          child: Row(
            children: [
              Icon(
                Icons.star,
                color: AppTheme.brandPurple,
                size: 32,
              ),
              const SizedBox(width: 12),
              Text(
                'Daily Secrets',
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  fontWeight: FontWeight.bold,
                  color: AppTheme.brandPurple,
                ),
              ),
            ],
          ),
        ),
        
        const Divider(),
        
        // Navigation items
        Expanded(
          child: ListView(
            padding: const EdgeInsets.symmetric(vertical: 8),
            children: [
              _buildSideNavItem(
                context,
                icon: Icons.home_rounded,
                label: 'Home',
                index: 0,
                isActive: currentIndex == 0,
              ),
              _buildSideNavItem(
                context,
                icon: Icons.people_rounded,
                label: 'Community',
                index: 1,
                isActive: currentIndex == 1,
              ),
              _buildSideNavItem(
                context,
                icon: Icons.favorite_rounded,
                label: 'Compatibility',
                index: 2,
                isActive: currentIndex == 2,
              ),
              _buildSideNavItem(
                context,
                icon: Icons.nightlight_round,
                label: 'Dreams',
                index: 3,
                isActive: currentIndex == 3,
              ),
              _buildSideNavItem(
                context,
                icon: Icons.person_rounded,
                label: 'Profile',
                index: 4,
                isActive: currentIndex == 4,
              ),
              const Divider(),
              _buildSideNavItem(
                context,
                icon: Icons.account_balance_wallet,
                label: 'Wallet',
                index: 5,
                isActive: currentIndex == 5,
              ),
              _buildSideNavItem(
                context,
                icon: Icons.settings,
                label: 'Settings',
                index: 6,
                isActive: currentIndex == 6,
              ),
            ],
          ),
        ),
      ],
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
      onTap: () => onNavigationTap?.call(index),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
        decoration: BoxDecoration(
          color: isActive 
              ? AppTheme.brandPurple.withOpacity(0.1)
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
                    ? AppTheme.brandPurple
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
                    ? AppTheme.brandPurple
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

  Widget _buildSideNavItem(
    BuildContext context, {
    required IconData icon,
    required String label,
    required int index,
    required bool isActive,
  }) {
    return GestureDetector(
      onTap: () => onNavigationTap?.call(index),
      child: Container(
        margin: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        decoration: BoxDecoration(
          color: isActive 
              ? AppTheme.brandPurple.withOpacity(0.1)
              : Colors.transparent,
          borderRadius: BorderRadius.circular(8),
        ),
        child: Row(
          children: [
            Icon(
              icon,
              size: 20,
              color: isActive 
                  ? AppTheme.brandPurple
                  : Theme.of(context).iconTheme.color?.withOpacity(0.6),
            ),
            const SizedBox(width: 12),
            Text(
              label,
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                color: isActive 
                    ? AppTheme.brandPurple
                    : Theme.of(context).textTheme.bodyMedium?.color?.withOpacity(0.8),
                fontWeight: isActive ? FontWeight.w600 : FontWeight.normal,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class ResponsiveGrid extends StatelessWidget {
  final List<Widget> children;
  final int crossAxisCount;
  final double childAspectRatio;
  final double spacing;
  final double runSpacing;

  const ResponsiveGrid({
    super.key,
    required this.children,
    this.crossAxisCount = 2,
    this.childAspectRatio = 1.0,
    this.spacing = 8.0,
    this.runSpacing = 8.0,
  });

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        int columns = crossAxisCount;
        
        if (constraints.maxWidth >= 1200) {
          columns = 4;
        } else if (constraints.maxWidth >= 768) {
          columns = 3;
        } else if (constraints.maxWidth >= 480) {
          columns = 2;
        } else {
          columns = 1;
        }
        
        return GridView.count(
          crossAxisCount: columns,
          childAspectRatio: childAspectRatio,
          crossAxisSpacing: spacing,
          mainAxisSpacing: runSpacing,
          children: children,
        );
      },
    );
  }
}

class ResponsiveText extends StatelessWidget {
  final String text;
  final TextStyle? style;
  final TextAlign? textAlign;
  final int? maxLines;
  final TextOverflow? overflow;

  const ResponsiveText(
    this.text, {
    super.key,
    this.style,
    this.textAlign,
    this.maxLines,
    this.overflow,
  });

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        double fontSize = 16;
        
        if (constraints.maxWidth >= 1200) {
          fontSize = 18;
        } else if (constraints.maxWidth >= 768) {
          fontSize = 17;
        } else {
          fontSize = 16;
        }
        
        return Text(
          text,
          style: style?.copyWith(fontSize: fontSize) ?? 
                 Theme.of(context).textTheme.bodyMedium?.copyWith(fontSize: fontSize),
          textAlign: textAlign,
          maxLines: maxLines,
          overflow: overflow,
        );
      },
    );
  }
}


