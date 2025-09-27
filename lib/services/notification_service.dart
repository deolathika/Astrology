import 'dart:convert';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/user.dart';

/// Comprehensive Notification Service
class NotificationService {
  static final FlutterLocalNotificationsPlugin _localNotifications = FlutterLocalNotificationsPlugin();
  static final FirebaseMessaging _firebaseMessaging = FirebaseMessaging.instance;
  
  /// Initialize notification service
  static Future<void> initialize() async {
    // Initialize local notifications
    const AndroidInitializationSettings androidSettings = AndroidInitializationSettings('@mipmap/ic_launcher');
    const DarwinInitializationSettings iosSettings = DarwinInitializationSettings(
      requestAlertPermission: true,
      requestBadgePermission: true,
      requestSoundPermission: true,
    );
    
    const InitializationSettings initSettings = InitializationSettings(
      android: androidSettings,
      iOS: iosSettings,
    );
    
    await _localNotifications.initialize(
      initSettings,
      onDidReceiveNotificationResponse: _onNotificationTapped,
    );
    
    // Request permissions
    await _requestPermissions();
    
    // Initialize Firebase messaging
    await _initializeFirebaseMessaging();
  }
  
  /// Request notification permissions
  static Future<void> _requestPermissions() async {
    // Android 13+ permission
    await _localNotifications
        .resolvePlatformSpecificImplementation<AndroidFlutterLocalNotificationsPlugin>()
        ?.requestNotificationsPermission();
    
    // iOS permission
    await _localNotifications
        .resolvePlatformSpecificImplementation<IOSFlutterLocalNotificationsPlugin>()
        ?.requestPermissions(
          alert: true,
          badge: true,
          sound: true,
        );
  }
  
  /// Initialize Firebase messaging
  static Future<void> _initializeFirebaseMessaging() async {
    // Request permission
    NotificationSettings settings = await _firebaseMessaging.requestPermission(
      alert: true,
      badge: true,
      sound: true,
    );
    
    if (settings.authorizationStatus == AuthorizationStatus.authorized) {
      // Get FCM token
      String? token = await _firebaseMessaging.getToken();
      await _saveFCMToken(token);
      
      // Listen to messages
      FirebaseMessaging.onMessage.listen(_handleForegroundMessage);
      FirebaseMessaging.onMessageOpenedApp.listen(_handleBackgroundMessage);
    }
  }
  
  /// Schedule daily guidance notification
  static Future<void> scheduleDailyGuidance({
    required User user,
    required int hour,
    required int minute,
  }) async {
    const AndroidNotificationDetails androidDetails = AndroidNotificationDetails(
      'daily_guidance',
      'Daily Guidance',
      channelDescription: 'Your daily cosmic guidance',
      importance: Importance.high,
      priority: Priority.high,
      icon: '@mipmap/ic_launcher',
      color: Color(0xFFFFDD12), // Brand yellow
    );
    
    const DarwinNotificationDetails iosDetails = DarwinNotificationDetails(
      presentAlert: true,
      presentBadge: true,
      presentSound: true,
    );
    
    const NotificationDetails details = NotificationDetails(
      android: androidDetails,
      iOS: iosDetails,
    );
    
    await _localNotifications.zonedSchedule(
      1,
      'Your Daily Secret is Ready! 🔮',
      'Discover your cosmic guidance for today',
      _nextInstanceOfTime(hour, minute),
      details,
      androidScheduleMode: AndroidScheduleMode.exactAllowWhileIdle,
      uiLocalNotificationDateInterpretation: UILocalNotificationDateInterpretation.absoluteTime,
    );
  }
  
  /// Schedule special day notification
  static Future<void> scheduleSpecialDayNotification({
    required String title,
    required String body,
    required DateTime date,
  }) async {
    const AndroidNotificationDetails androidDetails = AndroidNotificationDetails(
      'special_day',
      'Special Days',
      channelDescription: 'Astrological special days and events',
      importance: Importance.high,
      priority: Priority.high,
      icon: '@mipmap/ic_launcher',
      color: Color(0xFF6E3CBC), // Brand purple
    );
    
    const DarwinNotificationDetails iosDetails = DarwinNotificationDetails(
      presentAlert: true,
      presentBadge: true,
      presentSound: true,
    );
    
    const NotificationDetails details = NotificationDetails(
      android: androidDetails,
      iOS: iosDetails,
    );
    
    await _localNotifications.zonedSchedule(
      date.millisecondsSinceEpoch ~/ 1000,
      title,
      body,
      date,
      details,
      androidScheduleMode: AndroidScheduleMode.exactAllowWhileIdle,
      uiLocalNotificationDateInterpretation: UILocalNotificationDateInterpretation.absoluteTime,
    );
  }
  
  /// Schedule community notification
  static Future<void> scheduleCommunityNotification({
    required String title,
    required String body,
    required DateTime date,
  }) async {
    const AndroidNotificationDetails androidDetails = AndroidNotificationDetails(
      'community',
      'Community',
      channelDescription: 'Community updates and connections',
      importance: Importance.medium,
      priority: Priority.medium,
      icon: '@mipmap/ic_launcher',
      color: Color(0xFF3B82F6), // Blue
    );
    
    const DarwinNotificationDetails iosDetails = DarwinNotificationDetails(
      presentAlert: true,
      presentBadge: true,
      presentSound: true,
    );
    
    const NotificationDetails details = NotificationDetails(
      android: androidDetails,
      iOS: iosDetails,
    );
    
    await _localNotifications.zonedSchedule(
      date.millisecondsSinceEpoch ~/ 1000,
      title,
      body,
      date,
      details,
      androidScheduleMode: AndroidScheduleMode.exactAllowWhileIdle,
      uiLocalNotificationDateInterpretation: UILocalNotificationDateInterpretation.absoluteTime,
    );
  }
  
  /// Send immediate notification
  static Future<void> sendImmediateNotification({
    required String title,
    required String body,
    String? payload,
  }) async {
    const AndroidNotificationDetails androidDetails = AndroidNotificationDetails(
      'immediate',
      'Immediate Notifications',
      channelDescription: 'Immediate notifications and alerts',
      importance: Importance.high,
      priority: Priority.high,
      icon: '@mipmap/ic_launcher',
      color: Color(0xFFFFDD12),
    );
    
    const DarwinNotificationDetails iosDetails = DarwinNotificationDetails(
      presentAlert: true,
      presentBadge: true,
      presentSound: true,
    );
    
    const NotificationDetails details = NotificationDetails(
      android: androidDetails,
      iOS: iosDetails,
    );
    
    await _localNotifications.show(
      DateTime.now().millisecondsSinceEpoch ~/ 1000,
      title,
      body,
      details,
      payload: payload,
    );
  }
  
  /// Cancel all notifications
  static Future<void> cancelAllNotifications() async {
    await _localNotifications.cancelAll();
  }
  
  /// Cancel specific notification
  static Future<void> cancelNotification(int id) async {
    await _localNotifications.cancel(id);
  }
  
  /// Get pending notifications
  static Future<List<PendingNotificationRequest>> getPendingNotifications() async {
    return await _localNotifications.pendingNotificationRequests();
  }
  
  /// Handle notification tap
  static void _onNotificationTapped(NotificationResponse response) {
    // Handle notification tap based on payload
    final payload = response.payload;
    if (payload != null) {
      _handleNotificationPayload(payload);
    }
  }
  
  /// Handle foreground message
  static void _handleForegroundMessage(RemoteMessage message) {
    // Show local notification for foreground messages
    sendImmediateNotification(
      title: message.notification?.title ?? 'Daily Secrets',
      body: message.notification?.body ?? 'New message',
      payload: message.data.toString(),
    );
  }
  
  /// Handle background message
  static void _handleBackgroundMessage(RemoteMessage message) {
    // Handle background message
    _handleNotificationPayload(message.data.toString());
  }
  
  /// Handle notification payload
  static void _handleNotificationPayload(String payload) {
    try {
      final data = jsonDecode(payload);
      final type = data['type'] as String?;
      
      switch (type) {
        case 'daily_guidance':
          // Navigate to home screen
          break;
        case 'community':
          // Navigate to community screen
          break;
        case 'compatibility':
          // Navigate to compatibility screen
          break;
        case 'dreams':
          // Navigate to dreams screen
          break;
        default:
          // Navigate to home screen
          break;
      }
    } catch (e) {
      // Handle error
    }
  }
  
  /// Save FCM token
  static Future<void> _saveFCMToken(String? token) async {
    if (token != null) {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('fcm_token', token);
    }
  }
  
  /// Get FCM token
  static Future<String?> getFCMToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('fcm_token');
  }
  
  /// Schedule personalized notifications based on user preferences
  static Future<void> schedulePersonalizedNotifications(User user) async {
    // Daily guidance at user's preferred time
    await scheduleDailyGuidance(
      user: user,
      hour: 7, // Default 7 AM
      minute: 0,
    );
    
    // Special day notifications
    await scheduleSpecialDayNotification(
      title: 'Special Cosmic Day! ✨',
      body: 'Today holds special astrological significance for you',
      date: DateTime.now().add(const Duration(days: 1)),
    );
    
    // Community notifications
    await scheduleCommunityNotification(
      title: 'New Connection! 👥',
      body: 'Someone wants to connect with you',
      date: DateTime.now().add(const Duration(hours: 2)),
    );
  }
  
  /// Create notification channels (Android)
  static Future<void> createNotificationChannels() async {
    const AndroidNotificationChannel dailyChannel = AndroidNotificationChannel(
      'daily_guidance',
      'Daily Guidance',
      description: 'Your daily cosmic guidance',
      importance: Importance.high,
    );
    
    const AndroidNotificationChannel specialChannel = AndroidNotificationChannel(
      'special_day',
      'Special Days',
      description: 'Astrological special days and events',
      importance: Importance.high,
    );
    
    const AndroidNotificationChannel communityChannel = AndroidNotificationChannel(
      'community',
      'Community',
      description: 'Community updates and connections',
      importance: Importance.medium,
    );
    
    const AndroidNotificationChannel immediateChannel = AndroidNotificationChannel(
      'immediate',
      'Immediate Notifications',
      description: 'Immediate notifications and alerts',
      importance: Importance.high,
    );
    
    await _localNotifications
        .resolvePlatformSpecificImplementation<AndroidFlutterLocalNotificationsPlugin>()
        ?.createNotificationChannel(dailyChannel);
    
    await _localNotifications
        .resolvePlatformSpecificImplementation<AndroidFlutterLocalNotificationsPlugin>()
        ?.createNotificationChannel(specialChannel);
    
    await _localNotifications
        .resolvePlatformSpecificImplementation<AndroidFlutterLocalNotificationsPlugin>()
        ?.createNotificationChannel(communityChannel);
    
    await _localNotifications
        .resolvePlatformSpecificImplementation<AndroidFlutterLocalNotificationsPlugin>()
        ?.createNotificationChannel(immediateChannel);
  }
  
  /// Get notification settings
  static Future<Map<String, bool>> getNotificationSettings() async {
    final prefs = await SharedPreferences.getInstance();
    return {
      'daily_guidance': prefs.getBool('notify_daily_guidance') ?? true,
      'special_days': prefs.getBool('notify_special_days') ?? true,
      'community': prefs.getBool('notify_community') ?? true,
      'compatibility': prefs.getBool('notify_compatibility') ?? false,
      'dreams': prefs.getBool('notify_dreams') ?? false,
    };
  }
  
  /// Update notification settings
  static Future<void> updateNotificationSettings(Map<String, bool> settings) async {
    final prefs = await SharedPreferences.getInstance();
    for (final entry in settings.entries) {
      await prefs.setBool('notify_${entry.key}', entry.value);
    }
  }
  
  /// Send test notification
  static Future<void> sendTestNotification() async {
    await sendImmediateNotification(
      title: 'Test Notification 🔔',
      body: 'This is a test notification from Daily Secrets',
      payload: jsonEncode({'type': 'test'}),
    );
  }
}

/// Helper function to calculate next instance of time
TZDateTime _nextInstanceOfTime(int hour, int minute) {
  final now = TZDateTime.now(local);
  var scheduledDate = TZDateTime(local, now.year, now.month, now.day, hour, minute);
  
  if (scheduledDate.isBefore(now)) {
    scheduledDate = scheduledDate.add(const Duration(days: 1));
  }
  
  return scheduledDate;
}

