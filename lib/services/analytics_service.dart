import 'package:firebase_analytics/firebase_analytics.dart';
import 'package:firebase_core/firebase_core.dart';
import '../models/user.dart';

/// Firebase Analytics Service for tracking user behavior and app performance
class AnalyticsService {
  static FirebaseAnalytics? _analytics;
  static FirebaseAnalyticsObserver? _observer;
  
  /// Initialize Firebase Analytics
  static Future<void> initialize() async {
    try {
      await Firebase.initializeApp();
      _analytics = FirebaseAnalytics.instance;
      _observer = FirebaseAnalyticsObserver(analytics: _analytics!);
      
      // Set default parameters
      await _analytics!.setDefaultEventParameters({
        'app_version': '1.0.0',
        'platform': 'web',
      });
      
      print('Firebase Analytics initialized successfully');
    } catch (e) {
      print('Failed to initialize Firebase Analytics: $e');
    }
  }
  
  /// Get analytics observer for navigation tracking
  static FirebaseAnalyticsObserver? get observer => _observer;
  
  /// Track user registration
  static Future<void> trackUserRegistration({
    required String method,
    required String userId,
  }) async {
    await _analytics?.logSignUp(signUpMethod: method);
    await _analytics?.setUserId(id: userId);
  }
  
  /// Track user login
  static Future<void> trackUserLogin({
    required String method,
    required String userId,
  }) async {
    await _analytics?.logLogin(loginMethod: method);
    await _analytics?.setUserId(id: userId);
  }
  
  /// Track screen views
  static Future<void> trackScreenView({
    required String screenName,
    String? screenClass,
  }) async {
    await _analytics?.logScreenView(
      screenName: screenName,
      screenClass: screenClass,
    );
  }
  
  /// Track astrology feature usage
  static Future<void> trackAstrologyFeature({
    required String feature,
    required String zodiacSign,
    required String system,
  }) async {
    await _analytics?.logEvent(
      name: 'astrology_feature_used',
      parameters: {
        'feature_name': feature,
        'zodiac_sign': zodiacSign,
        'astrology_system': system,
        'timestamp': DateTime.now().millisecondsSinceEpoch,
      },
    );
  }
  
  /// Track numerology calculations
  static Future<void> trackNumerologyCalculation({
    required String calculationType,
    required int result,
    required String userInput,
  }) async {
    await _analytics?.logEvent(
      name: 'numerology_calculation',
      parameters: {
        'calculation_type': calculationType,
        'result': result,
        'input_length': userInput.length,
        'timestamp': DateTime.now().millisecondsSinceEpoch,
      },
    );
  }
  
  /// Track dream interpretation
  static Future<void> trackDreamInterpretation({
    required String dreamType,
    required int dreamLength,
    required bool hasSymbols,
  }) async {
    await _analytics?.logEvent(
      name: 'dream_interpretation',
      parameters: {
        'dream_type': dreamType,
        'dream_length': dreamLength,
        'has_symbols': hasSymbols,
        'timestamp': DateTime.now().millisecondsSinceEpoch,
      },
    );
  }
  
  /// Track subscription events
  static Future<void> trackSubscription({
    required String planId,
    required double price,
    required String currency,
    required String eventType, // 'started', 'completed', 'cancelled'
  }) async {
    await _analytics?.logEvent(
      name: 'subscription_$eventType',
      parameters: {
        'plan_id': planId,
        'price': price,
        'currency': currency,
        'timestamp': DateTime.now().millisecondsSinceEpoch,
      },
    );
  }
  
  /// Track social sharing
  static Future<void> trackSocialShare({
    required String platform,
    required String contentType,
    required String contentId,
  }) async {
    await _analytics?.logEvent(
      name: 'social_share',
      parameters: {
        'platform': platform,
        'content_type': contentType,
        'content_id': contentId,
        'timestamp': DateTime.now().millisecondsSinceEpoch,
      },
    );
  }
  
  /// Track user engagement
  static Future<void> trackUserEngagement({
    required String engagementType,
    required int duration,
    required String feature,
  }) async {
    await _analytics?.logEvent(
      name: 'user_engagement',
      parameters: {
        'engagement_type': engagementType,
        'duration_seconds': duration,
        'feature': feature,
        'timestamp': DateTime.now().millisecondsSinceEpoch,
      },
    );
  }
  
  /// Track app performance
  static Future<void> trackAppPerformance({
    required String metric,
    required double value,
    required String unit,
  }) async {
    await _analytics?.logEvent(
      name: 'app_performance',
      parameters: {
        'metric_name': metric,
        'metric_value': value,
        'metric_unit': unit,
        'timestamp': DateTime.now().millisecondsSinceEpoch,
      },
    );
  }
  
  /// Track errors
  static Future<void> trackError({
    required String errorType,
    required String errorMessage,
    required String screen,
  }) async {
    await _analytics?.logEvent(
      name: 'app_error',
      parameters: {
        'error_type': errorType,
        'error_message': errorMessage,
        'screen': screen,
        'timestamp': DateTime.now().millisecondsSinceEpoch,
      },
    );
  }
  
  /// Set user properties
  static Future<void> setUserProperties({
    required String userId,
    String? zodiacSign,
    String? birthMonth,
    String? subscriptionPlan,
    String? country,
  }) async {
    await _analytics?.setUserId(id: userId);
    
    if (zodiacSign != null) {
      await _analytics?.setUserProperty(name: 'zodiac_sign', value: zodiacSign);
    }
    if (birthMonth != null) {
      await _analytics?.setUserProperty(name: 'birth_month', value: birthMonth);
    }
    if (subscriptionPlan != null) {
      await _analytics?.setUserProperty(name: 'subscription_plan', value: subscriptionPlan);
    }
    if (country != null) {
      await _analytics?.setUserProperty(name: 'country', value: country);
    }
  }
}
