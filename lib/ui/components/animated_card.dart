import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class AnimatedCard extends StatefulWidget {
  final Widget child;
  final VoidCallback? onTap;
  final Color? glowColor;
  final bool enableRipple;
  final bool enableParallax;
  final double? width;
  final double? height;
  final EdgeInsets? padding;
  final BorderRadius? borderRadius;

  const AnimatedCard({
    super.key,
    required this.child,
    this.onTap,
    this.glowColor,
    this.enableRipple = true,
    this.enableParallax = false,
    this.width,
    this.height,
    this.padding,
    this.borderRadius,
  });

  @override
  State<AnimatedCard> createState() => _AnimatedCardState();
}

class _AnimatedCardState extends State<AnimatedCard>
    with TickerProviderStateMixin {
  late AnimationController _scaleController;
  late AnimationController _glowController;
  late AnimationController _rippleController;
  
  late Animation<double> _scaleAnimation;
  late Animation<double> _glowAnimation;
  late Animation<double> _rippleAnimation;
  
  bool _isPressed = false;
  bool _isHovered = false;
  Offset? _rippleCenter;

  @override
  void initState() {
    super.initState();
    
    _scaleController = AnimationController(
      duration: const Duration(milliseconds: 180),
      vsync: this,
    );
    
    _glowController = AnimationController(
      duration: const Duration(milliseconds: 300),
      vsync: this,
    );
    
    _rippleController = AnimationController(
      duration: const Duration(milliseconds: 600),
      vsync: this,
    );
    
    _scaleAnimation = Tween<double>(
      begin: 1.0,
      end: 1.02,
    ).animate(CurvedAnimation(
      parent: _scaleController,
      curve: Curves.easeOut,
    ));
    
    _glowAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _glowController,
      curve: Curves.easeOut,
    ));
    
    _rippleAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _rippleController,
      curve: Curves.easeOut,
    ));
  }

  @override
  void dispose() {
    _scaleController.dispose();
    _glowController.dispose();
    _rippleController.dispose();
    super.dispose();
  }

  void _handleTapDown(TapDownDetails details) {
    if (!mounted) return;
    
    setState(() {
      _isPressed = true;
      _rippleCenter = details.localPosition;
    });
    
    _scaleController.forward();
    _glowController.forward();
    
    if (widget.enableRipple) {
      _rippleController.forward().then((_) {
        _rippleController.reset();
      });
    }
  }

  void _handleTapUp(TapUpDetails details) {
    _handleTapEnd();
  }

  void _handleTapCancel() {
    _handleTapEnd();
  }

  void _handleTapEnd() {
    if (!mounted) return;
    
    setState(() {
      _isPressed = false;
    });
    
    _scaleController.reverse();
    _glowController.reverse();
  }

  void _handleTap() {
    if (widget.onTap != null) {
      widget.onTap!();
    }
  }

  @override
  Widget build(BuildContext context) {
    final glowColor = widget.glowColor ?? AppTheme.mysticalPurple;
    
    return GestureDetector(
      onTapDown: _handleTapDown,
      onTapUp: _handleTapUp,
      onTapCancel: _handleTapCancel,
      onTap: _handleTap,
      child: AnimatedBuilder(
        animation: Listenable.merge([
          _scaleAnimation,
          _glowAnimation,
          _rippleAnimation,
        ]),
        builder: (context, child) {
          return Transform.scale(
            scale: _scaleAnimation.value,
            child: Container(
              width: widget.width,
              height: widget.height,
              decoration: BoxDecoration(
                borderRadius: widget.borderRadius ?? BorderRadius.circular(24),
                boxShadow: [
                  // Base shadow
                  BoxShadow(
                    color: AppTheme.cosmicDark.withOpacity(0.1),
                    blurRadius: 8,
                    offset: const Offset(0, 4),
                  ),
                  // Glow effect
                  if (_glowAnimation.value > 0)
                    BoxShadow(
                      color: glowColor.withOpacity(0.3 * _glowAnimation.value),
                      blurRadius: 20 * _glowAnimation.value,
                      spreadRadius: 2 * _glowAnimation.value,
                    ),
                ],
              ),
              child: Stack(
                children: [
                  // Main content
                  Container(
                    padding: widget.padding ?? const EdgeInsets.all(20),
                    decoration: BoxDecoration(
                      color: AppTheme.starlightWhite,
                      borderRadius: widget.borderRadius ?? BorderRadius.circular(24),
                      border: Border.all(
                        color: glowColor.withOpacity(0.2 * _glowAnimation.value),
                        width: 1.5,
                      ),
                    ),
                    child: widget.child,
                  ),
                  // Ripple effect
                  if (widget.enableRipple && _rippleCenter != null)
                    Positioned.fill(
                      child: ClipRRect(
                        borderRadius: widget.borderRadius ?? BorderRadius.circular(24),
                        child: CustomPaint(
                          painter: RipplePainter(
                            center: _rippleCenter!,
                            progress: _rippleAnimation.value,
                            color: glowColor.withOpacity(0.3),
                          ),
                        ),
                      ),
                    ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}

class RipplePainter extends CustomPainter {
  final Offset center;
  final double progress;
  final Color color;

  RipplePainter({
    required this.center,
    required this.progress,
    required this.color,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = color.withOpacity((1.0 - progress) * 0.6)
      ..style = PaintingStyle.fill;

    final radius = progress * (size.width + size.height) / 2;
    
    canvas.drawCircle(center, radius, paint);
  }

  @override
  bool shouldRepaint(RipplePainter oldDelegate) {
    return oldDelegate.progress != progress ||
           oldDelegate.center != center ||
           oldDelegate.color != color;
  }
}

class GlowingBorderCard extends StatefulWidget {
  final Widget child;
  final Color? borderColor;
  final double borderWidth;
  final BorderRadius? borderRadius;
  final bool enableAnimation;

  const GlowingBorderCard({
    super.key,
    required this.child,
    this.borderColor,
    this.borderWidth = 2.0,
    this.borderRadius,
    this.enableAnimation = true,
  });

  @override
  State<GlowingBorderCard> createState() => _GlowingBorderCardState();
}

class _GlowingBorderCardState extends State<GlowingBorderCard>
    with TickerProviderStateMixin {
  late AnimationController _animationController;
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    
    _animationController = AnimationController(
      duration: const Duration(seconds: 3),
      vsync: this,
    );
    
    _animation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _animationController,
      curve: Curves.linear,
    ));
    
    if (widget.enableAnimation) {
      _animationController.repeat();
    }
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final borderColor = widget.borderColor ?? AppTheme.mysticalPurple;
    
    return AnimatedBuilder(
      animation: _animation,
      builder: (context, child) {
        return Container(
          decoration: BoxDecoration(
            borderRadius: widget.borderRadius ?? BorderRadius.circular(24),
            gradient: LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: [
                borderColor.withOpacity(0.3 + 0.2 * _animation.value),
                borderColor.withOpacity(0.1 + 0.1 * _animation.value),
                borderColor.withOpacity(0.3 + 0.2 * (1.0 - _animation.value)),
              ],
              stops: [
                0.0,
                0.5,
                1.0,
              ],
            ),
          ),
          child: Container(
            margin: EdgeInsets.all(widget.borderWidth),
            decoration: BoxDecoration(
              color: AppTheme.starlightWhite,
              borderRadius: widget.borderRadius ?? BorderRadius.circular(24),
            ),
            child: widget.child,
          ),
        );
      },
    );
  }
}

class ParallaxCard extends StatefulWidget {
  final Widget child;
  final double parallaxFactor;
  final bool enableParallax;

  const ParallaxCard({
    super.key,
    required this.child,
    this.parallaxFactor = 0.5,
    this.enableParallax = true,
  });

  @override
  State<ParallaxCard> createState() => _ParallaxCardState();
}

class _ParallaxCardState extends State<ParallaxCard> {
  double _offset = 0.0;

  @override
  Widget build(BuildContext context) {
    return NotificationListener<ScrollNotification>(
      onNotification: (notification) {
        if (widget.enableParallax && notification is ScrollUpdateNotification) {
          setState(() {
            _offset += notification.scrollDelta! * widget.parallaxFactor;
          });
        }
        return false;
      },
      child: Transform.translate(
        offset: Offset(0, _offset),
        child: widget.child,
      ),
    );
  }
}


