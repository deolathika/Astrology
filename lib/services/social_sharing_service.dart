import 'dart:io';
import 'dart:typed_data';
import 'dart:ui' as ui;
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:share_plus/share_plus.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:path_provider/path_provider.dart';

/// Social Sharing Service for WhatsApp, Instagram, and other platforms
class SocialSharingService {
  
  /// Share to WhatsApp
  static Future<void> shareToWhatsApp({
    required String text,
    String? imagePath,
    String? phoneNumber,
  }) async {
    try {
      String url = 'whatsapp://send';
      
      if (phoneNumber != null) {
        url += '?phone=$phoneNumber';
      }
      
      if (text.isNotEmpty) {
        url += phoneNumber != null ? '&text=' : '?text=';
        url += Uri.encodeComponent(text);
      }
      
      final uri = Uri.parse(url);
      if (await canLaunchUrl(uri)) {
        await launchUrl(uri);
      } else {
        // Fallback to generic sharing
        await Share.share(text);
      }
    } catch (e) {
      // Fallback to generic sharing
      await Share.share(text);
    }
  }
  
  /// Share to Instagram Story
  static Future<void> shareToInstagramStory({
    required String imagePath,
    String? backgroundImagePath,
    String? stickerImagePath,
    String? topColor,
    String? bottomColor,
  }) async {
    try {
      // Instagram Stories sharing (iOS/Android)
      if (Platform.isIOS) {
        await _shareToInstagramStoryIOS(
          imagePath: imagePath,
          backgroundImagePath: backgroundImagePath,
          stickerImagePath: stickerImagePath,
          topColor: topColor,
          bottomColor: bottomColor,
        );
      } else if (Platform.isAndroid) {
        await _shareToInstagramStoryAndroid(imagePath);
      }
    } catch (e) {
      // Fallback to generic sharing
      await Share.shareXFiles([XFile(imagePath)]);
    }
  }
  
  /// Share to Instagram Feed
  static Future<void> shareToInstagramFeed({
    required String imagePath,
    String? caption,
  }) async {
    try {
      if (Platform.isIOS) {
        await _shareToInstagramFeedIOS(imagePath: imagePath, caption: caption);
      } else if (Platform.isAndroid) {
        await _shareToInstagramFeedAndroid(imagePath: imagePath, caption: caption);
      }
    } catch (e) {
      // Fallback to generic sharing
      await Share.shareXFiles([XFile(imagePath)], text: caption);
    }
  }
  
  /// Share to Twitter/X
  static Future<void> shareToTwitter({
    required String text,
    String? imagePath,
    List<String>? hashtags,
  }) async {
    try {
      String url = 'https://twitter.com/intent/tweet?text=';
      url += Uri.encodeComponent(text);
      
      if (hashtags != null && hashtags.isNotEmpty) {
        url += '&hashtags=${hashtags.join(',')}';
      }
      
      final uri = Uri.parse(url);
      if (await canLaunchUrl(uri)) {
        await launchUrl(uri, mode: LaunchMode.externalApplication);
      } else {
        // Fallback to generic sharing
        await Share.share(text);
      }
    } catch (e) {
      await Share.share(text);
    }
  }
  
  /// Share to Facebook
  static Future<void> shareToFacebook({
    required String text,
    String? imagePath,
    String? url,
  }) async {
    try {
      String fbUrl = 'https://www.facebook.com/sharer/sharer.php?u=';
      if (url != null) {
        fbUrl += Uri.encodeComponent(url);
      }
      
      final uri = Uri.parse(fbUrl);
      if (await canLaunchUrl(uri)) {
        await launchUrl(uri, mode: LaunchMode.externalApplication);
      } else {
        // Fallback to generic sharing
        await Share.share(text);
      }
    } catch (e) {
      await Share.share(text);
    }
  }
  
  /// Share to Telegram
  static Future<void> shareToTelegram({
    required String text,
    String? imagePath,
    String? username,
  }) async {
    try {
      String url = 'https://t.me/share/url?url=&text=';
      url += Uri.encodeComponent(text);
      
      if (username != null) {
        url += '&to=$username';
      }
      
      final uri = Uri.parse(url);
      if (await canLaunchUrl(uri)) {
        await launchUrl(uri, mode: LaunchMode.externalApplication);
      } else {
        // Fallback to generic sharing
        await Share.share(text);
      }
    } catch (e) {
      await Share.share(text);
    }
  }
  
  /// Share to LinkedIn
  static Future<void> shareToLinkedIn({
    required String text,
    String? url,
  }) async {
    try {
      String linkedinUrl = 'https://www.linkedin.com/sharing/share-offsite/?url=';
      if (url != null) {
        linkedinUrl += Uri.encodeComponent(url);
      }
      
      final uri = Uri.parse(linkedinUrl);
      if (await canLaunchUrl(uri)) {
        await launchUrl(uri, mode: LaunchMode.externalApplication);
      } else {
        // Fallback to generic sharing
        await Share.share(text);
      }
    } catch (e) {
      await Share.share(text);
    }
  }
  
  /// Share to Pinterest
  static Future<void> shareToPinterest({
    required String imageUrl,
    required String description,
    String? boardId,
  }) async {
    try {
      String pinterestUrl = 'https://pinterest.com/pin/create/button/?url=';
      pinterestUrl += Uri.encodeComponent(imageUrl);
      pinterestUrl += '&description=${Uri.encodeComponent(description)}';
      
      if (boardId != null) {
        pinterestUrl += '&board_id=$boardId';
      }
      
      final uri = Uri.parse(pinterestUrl);
      if (await canLaunchUrl(uri)) {
        await launchUrl(uri, mode: LaunchMode.externalApplication);
      } else {
        // Fallback to generic sharing
        await Share.share(description);
      }
    } catch (e) {
      await Share.share(description);
    }
  }
  
  /// Share to Reddit
  static Future<void> shareToReddit({
    required String text,
    String? subreddit,
  }) async {
    try {
      String redditUrl = 'https://reddit.com/submit?text=';
      redditUrl += Uri.encodeComponent(text);
      
      if (subreddit != null) {
        redditUrl += '&sr=$subreddit';
      }
      
      final uri = Uri.parse(redditUrl);
      if (await canLaunchUrl(uri)) {
        await launchUrl(uri, mode: LaunchMode.externalApplication);
      } else {
        // Fallback to generic sharing
        await Share.share(text);
      }
    } catch (e) {
      await Share.share(text);
    }
  }
  
  /// Share to Email
  static Future<void> shareToEmail({
    required String subject,
    required String body,
    List<String>? recipients,
  }) async {
    try {
      String url = 'mailto:';
      
      if (recipients != null && recipients.isNotEmpty) {
        url += recipients.join(',');
      }
      
      url += '?subject=${Uri.encodeComponent(subject)}';
      url += '&body=${Uri.encodeComponent(body)}';
      
      final uri = Uri.parse(url);
      if (await canLaunchUrl(uri)) {
        await launchUrl(uri);
      } else {
        // Fallback to generic sharing
        await Share.share(body, subject: subject);
      }
    } catch (e) {
      await Share.share(body, subject: subject);
    }
  }
  
  /// Share to SMS
  static Future<void> shareToSMS({
    required String text,
    String? phoneNumber,
  }) async {
    try {
      String url = 'sms:';
      
      if (phoneNumber != null) {
        url += phoneNumber;
      }
      
      url += '?body=${Uri.encodeComponent(text)}';
      
      final uri = Uri.parse(url);
      if (await canLaunchUrl(uri)) {
        await launchUrl(uri);
      } else {
        // Fallback to generic sharing
        await Share.share(text);
      }
    } catch (e) {
      await Share.share(text);
    }
  }
  
  /// Share to Copy Link
  static Future<void> copyToClipboard({
    required String text,
    String? url,
  }) async {
    try {
      final clipboardData = ClipboardData(text: url ?? text);
      await Clipboard.setData(clipboardData);
      
      // Show success message
      // You can use a snackbar or toast here
    } catch (e) {
      // Handle error
    }
  }
  
  /// Generate shareable image
  static Future<String> generateShareableImage({
    required Widget widget,
    required String fileName,
    Size? size,
  }) async {
    try {
      // Create a RenderRepaintBoundary
      final RenderRepaintBoundary boundary = RenderRepaintBoundary();
      
      // Create a RenderView
      final RenderView renderView = RenderView(
        child: boundary,
        configuration: ViewConfiguration.fromView(ui.PlatformDispatcher.instance.views.first),
        view: ui.PlatformDispatcher.instance.views.first,
      );
      
      // Render the widget
      final RenderObject? renderObject = widget.createRenderObject(null);
      if (renderObject != null) {
        boundary.child = renderObject;
      }
      
      // Wait for the next frame
      await Future.delayed(const Duration(milliseconds: 100));
      
      // Capture the image
      final ui.Image image = await boundary.toImage(pixelRatio: 3.0);
      final ByteData? byteData = await image.toByteData(format: ui.ImageByteFormat.png);
      
      if (byteData != null) {
        // Save to temporary directory
        final Directory tempDir = await getTemporaryDirectory();
        final String filePath = '${tempDir.path}/$fileName.png';
        final File file = File(filePath);
        await file.writeAsBytes(byteData.buffer.asUint8List());
        return filePath;
      }
      
      throw Exception('Failed to generate image');
    } catch (e) {
      throw Exception('Failed to generate shareable image: $e');
    }
  }
  
  /// Generate daily guidance share card
  static Future<String> generateDailyGuidanceCard({
    required String guidance,
    required String sign,
    required String date,
    required Color primaryColor,
    required Color secondaryColor,
  }) async {
    // This would generate a beautiful share card
    // For now, return a placeholder
    return 'placeholder_image_path';
  }
  
  /// Generate compatibility share card
  static Future<String> generateCompatibilityCard({
    required String person1Name,
    required String person2Name,
    required int compatibilityScore,
    required List<String> strengths,
  }) async {
    // This would generate a compatibility share card
    return 'placeholder_compatibility_image_path';
  }
  
  /// Generate dream interpretation share card
  static Future<String> generateDreamCard({
    required String dreamTitle,
    required List<String> meanings,
    required String reframe,
  }) async {
    // This would generate a dream interpretation share card
    return 'placeholder_dream_image_path';
  }
  
  /// Get sharing statistics
  static Future<Map<String, int>> getSharingStats() async {
    // This would track sharing statistics
    return {
      'whatsapp': 0,
      'instagram': 0,
      'twitter': 0,
      'facebook': 0,
      'telegram': 0,
      'linkedin': 0,
      'pinterest': 0,
      'reddit': 0,
      'email': 0,
      'sms': 0,
      'copy': 0,
    };
  }
  
  // Private helper methods for platform-specific sharing
  
  static Future<void> _shareToInstagramStoryIOS({
    required String imagePath,
    String? backgroundImagePath,
    String? stickerImagePath,
    String? topColor,
    String? bottomColor,
  }) async {
    // iOS Instagram Stories sharing implementation
    // This would use the Instagram Stories API
  }
  
  static Future<void> _shareToInstagramStoryAndroid(String imagePath) async {
    // Android Instagram Stories sharing implementation
    // This would use the Instagram Stories API
  }
  
  static Future<void> _shareToInstagramFeedIOS({
    required String imagePath,
    String? caption,
  }) async {
    // iOS Instagram Feed sharing implementation
  }
  
  static Future<void> _shareToInstagramFeedAndroid({
    required String imagePath,
    String? caption,
  }) async {
    // Android Instagram Feed sharing implementation
  }
}

/// Share content types
enum ShareContentType {
  dailyGuidance,
  compatibility,
  dreamInterpretation,
  community,
  profile,
}

/// Share platform types
enum SharePlatform {
  whatsapp,
  instagram,
  twitter,
  facebook,
  telegram,
  linkedin,
  pinterest,
  reddit,
  email,
  sms,
  copy,
  generic,
}

/// Share options configuration
class ShareOptions {
  final String text;
  final String? imagePath;
  final String? url;
  final List<String>? hashtags;
  final String? phoneNumber;
  final String? email;
  final String? subject;
  final String? caption;
  final Map<String, String>? customData;
  
  const ShareOptions({
    required this.text,
    this.imagePath,
    this.url,
    this.hashtags,
    this.phoneNumber,
    this.email,
    this.subject,
    this.caption,
    this.customData,
  });
}

