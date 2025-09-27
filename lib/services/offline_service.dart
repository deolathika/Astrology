import 'dart:convert';
import 'dart:math';
import '../models/user.dart';
import '../utils/zodiac_utils.dart';
import '../utils/sri_lankan_zodiac_utils.dart';

/// Offline Service for local LLM fallback and caching
class OfflineService {
  static final Random _random = Random();
  static bool _isOffline = false;
  static final Map<String, dynamic> _cache = {};

  /// Check if device is offline
  static bool get isOffline => _isOffline;

  /// Set offline status
  static void setOfflineStatus(bool offline) {
    _isOffline = offline;
  }

  /// Generate offline daily content using local LLM simulation
  static Future<Map<String, dynamic>> generateOfflineContent(User user) async {
    // Simulate local LLM processing delay
    await Future.delayed(const Duration(milliseconds: 500));
    
    final westernSign = ZodiacUtils.getWesternZodiacSign(user.dateOfBirth);
    final sriLankanSign = SriLankanZodiacUtils.getSriLankanZodiacSign(user.dateOfBirth);
    
    // Generate extended long-form guidance (800-1000 chars)
    final extendedGuidance = _generateExtendedGuidance(westernSign, sriLankanSign, user.placeOfBirth);
    
    return {
      'meta': {
        'system_used': 'offline_llm',
        'primary_sign': westernSign,
        'secondary_signs': [sriLankanSign],
        'locale_final': _getLocaleFromPlace(user.placeOfBirth),
        'city_display': user.placeOfBirth,
        'responsibility_banner': true,
      },
      'today_card': {
        'title': 'Your Daily Cosmic Guidance',
        'quote': extendedGuidance,
        'lucky_color': _getLuckyColor(westernSign),
        'lucky_number': ZodiacUtils.calculateLifePathNumber(user.dateOfBirth),
        'lucky_object': _getLuckyObject(westernSign),
        'love': _generateLoveGuidance(westernSign),
        'career': _generateCareerGuidance(westernSign),
        'finances': _generateFinanceGuidance(westernSign),
        'health': _generateHealthGuidance(westernSign),
        'travel': _generateTravelGuidance(westernSign),
        'affirmation': _generateAffirmation(westernSign),
        'extended_explanation': {
          'positives': _generatePositives(westernSign),
          'cautions': _generateCautions(westernSign),
          'why_this_matters': _generateWhyThisMatters(westernSign),
        },
      },
      'day_rules': {
        'dos': _generateDos(westernSign),
        'donts': _generateDonts(westernSign),
      },
      'astro_highlights': {
        'western_transits': _generateWesternTransits(westernSign),
        'vedic_cues': _generateVedicCues(sriLankanSign),
        'moon_phase': _getMoonPhase(),
        'tithi_or_muhurta': _getTithi(),
      },
      'special_messages': _generateSpecialMessages(),
      'mood_fix': {
        'detected': _random.nextBool(),
        'micro_actions': _generateMicroActions(),
        'reassurance': _generateReassurance(),
      },
      'numerology': {
        'day_number': _getDayNumber(),
        'meaning': _getNumerologyMeaning(),
        'micro_hint': _getMicroHint(),
      },
      'popups': _generatePopups(),
      'share_card': {
        'caption': 'Discover your daily cosmic guidance with Daily Secrets ✨',
        'hashtags': ['#DailySecrets', '#Astrology', '#Guidance', '#CosmicWisdom'],
      },
      'map_view': {
        'birthplace': {
          'city': user.placeOfBirth,
          'country': _getCountryFromPlace(user.placeOfBirth),
        },
      },
    };
  }

  /// Generate extended long-form guidance (800-1000 characters)
  static String _generateExtendedGuidance(String westernSign, String sriLankanSign, String placeOfBirth) {
    final isSriLankan = placeOfBirth.toLowerCase().contains('sri lanka') || 
                       placeOfBirth.toLowerCase().contains('colombo') ||
                       placeOfBirth.toLowerCase().contains('kandy');
    
    if (isSriLankan) {
      return _generateSriLankanExtendedGuidance(sriLankanSign);
    } else {
      return _generateWesternExtendedGuidance(westernSign);
    }
  }

  /// Generate Sri Lankan extended guidance
  static String _generateSriLankanExtendedGuidance(String sign) {
    final guidance = {
      'Aries': 'අද ඔබේ ධෛර්යය ඔබේ ගමනේ මගපෙන්වන්න. මේෂ රාශියේ බලය අද ඔබේ අතේ ඇත. නායකත්වය ගෙන ඔබේ අභිලාෂයන් සාක්ෂාත් කර ගන්න. අද ඔබේ උද්යෝගය අන්‍යයන්ට ද ආශ්වාදයක් වේවා. ඔබේ ධෛර්යය අන්‍යයන්ට ද බලය ලබා දෙන්න. අද ඔබේ ගමනේ ධෛර්යය සහ නායකත්වය අන්‍යයන්ට ආශ්වාදයක් වේවා. ඔබේ අභ්‍යන්තර බලය භාවිතා කර ඔබේ අභිලාෂයන් සාක්ෂාත් කර ගන්න. අද ඔබේ ගමනේ ධෛර්යය සහ නායකත්වය අන්‍යයන්ට ආශ්වාදයක් වේවා. ඔබේ අභ්‍යන්තර බලය භාවිතා කර ඔබේ අභිලාෂයන් සාක්ෂාත් කර ගන්න.',
      'Taurus': 'අද ස්ථිර ගමනක් ගමන් කරන්න. වෘෂභ රාශියේ ස්ථිරතාවය අද ඔබේ ගමනේ පදනම වේ. ඔබේ අධිෂ්ඨානය අද ඔබට සාර්ථකත්වය ගෙන එනු ඇත. අද ඔබේ භෞතික සුවය සහ සෞන්දර්යයට වටිනාකම දෙන්න. සරල දේවල් තුළ සතුට සොයා ගන්න. අද ඔබේ ගමනේ ස්ථිරතාවය සහ ඉවසීම අන්‍යයන්ට ආශ්වාදයක් වේවා. ඔබේ අධිෂ්ඨානය සහ වගකීම් ගතිකම් අද ඔබේ ගමනේ බලය වේ. අද ඔබේ ගමනේ ස්ථිරතාවය සහ ඉවසීම අන්‍යයන්ට ආශ්වාදයක් වේවා. ඔබේ අධිෂ්ඨානය සහ වගකීම් ගතිකම් අද ඔබේ ගමනේ බලය වේ.',
      'Gemini': 'අද ඔබේ බුද්ධිය සහ සන්නිවේදනය අන්‍යයන්ට උපකාර වේවා. මිථුන රාශියේ අනුවර්තනය අද ඔබේ ගමනේ යුගලය වේ. නව අදහස් සහ අත්දැකීම් සොයා ගන්න. අද ඔබේ කුතුහලය ඔබේ ගමනේ මගපෙන්වන්න. නව දැනුම සහ අත්දැකීම් සොයා ගන්න. අද ඔබේ ගමනේ බුද්ධිය සහ සන්නිවේදනය අන්‍යයන්ට උපකාර වේවා. ඔබේ දැනුම බෙදා ගන්න. අද ඔබේ ගමනේ බුද්ධිය සහ සන්නිවේදනය අන්‍යයන්ට උපකාර වේවා. ඔබේ දැනුම බෙදා ගන්න.',
    };
    
    return guidance[sign] ?? guidance['Aries']!;
  }

  /// Generate Western extended guidance
  static String _generateWesternExtendedGuidance(String sign) {
    final guidance = {
      'Aries': 'Today your courage will guide your path through new challenges. The fire within you burns bright, channeling this energy into positive action. Your pioneering spirit is at its peak, leading with confidence and determination. Embrace new opportunities with your inner strength, as your enthusiasm will inspire others around you. Your natural leadership qualities will shine today, helping you overcome any obstacles that come your way. Trust in your abilities and take bold steps forward, as the universe supports your ambitious nature.',
      'Taurus': 'Your steady approach will bring stability and success to your endeavors today. The earth beneath your feet supports your journey, providing a solid foundation for your goals. Your practical wisdom and patient nature will serve you well, allowing you to make thoughtful decisions. Take time to appreciate the beauty around you, finding joy in simple pleasures and meaningful connections. Your reliable nature will be valued by others, and your determination will help you achieve your long-term objectives. Trust in your methodical approach and stay grounded in your values.',
      'Gemini': 'Your curiosity opens new doors of opportunity and learning today. Your adaptability is your greatest strength, allowing you to navigate changing circumstances with ease. Embrace communication and intellectual pursuits, as your wit and intelligence will serve you well. Share your knowledge generously with others, as your insights can help solve problems and inspire new ideas. Your versatility makes you valuable in any situation, and your natural charm helps build meaningful connections. Stay open to new experiences and trust in your ability to learn and grow.',
    };
    
    return guidance[sign] ?? guidance['Aries']!;
  }

  /// Generate love guidance
  static String _generateLoveGuidance(String sign) {
    final loveGuidance = {
      'Aries': 'Your passionate nature draws others to you today. Express your feelings openly and honestly.',
      'Taurus': 'Your steady love provides security and comfort to your partner. Show appreciation for the little things.',
      'Gemini': 'Communication is key in your relationships today. Share your thoughts and listen actively.',
    };
    
    return loveGuidance[sign] ?? 'Trust in the power of love and connection today.';
  }

  /// Generate career guidance
  static String _generateCareerGuidance(String sign) {
    final careerGuidance = {
      'Aries': 'Your leadership skills are recognized today. Take initiative on important projects.',
      'Taurus': 'Your practical approach brings stability to your work. Focus on long-term goals.',
      'Gemini': 'Your communication skills open new opportunities. Network and share your ideas.',
    };
    
    return careerGuidance[sign] ?? 'Your professional skills shine today. Take initiative in your work.';
  }

  /// Generate finance guidance
  static String _generateFinanceGuidance(String sign) {
    return 'Your financial intuition guides you today. Make wise decisions and trust your instincts.';
  }

  /// Generate health guidance
  static String _generateHealthGuidance(String sign) {
    return 'Your body needs gentle care today. Listen to its signals and take time to rest.';
  }

  /// Generate travel guidance
  static String _generateTravelGuidance(String sign) {
    return 'Your adventurous spirit calls today. Explore new horizons and embrace new experiences.';
  }

  /// Generate affirmation
  static String _generateAffirmation(String sign) {
    final affirmations = {
      'Aries': 'I am courageous and ready to lead.',
      'Taurus': 'I am stable and grounded in my values.',
      'Gemini': 'I am curious and open to new ideas.',
    };
    
    return affirmations[sign] ?? 'I trust in my journey and embrace new possibilities.';
  }

  /// Generate positives
  static List<String> _generatePositives(String sign) {
    return [
      'Your natural strengths are amplified today',
      'Opportunities for growth are abundant',
      'Your positive energy attracts good fortune',
    ];
  }

  /// Generate cautions
  static List<String> _generateCautions(String sign) {
    return [
      'Avoid rushing important decisions',
      'Take time to consider all options',
      'Don\'t ignore your intuition',
    ];
  }

  /// Generate why this matters
  static String _generateWhyThisMatters(String sign) {
    return 'Today\'s energy supports your personal growth and helps you align with your true purpose.';
  }

  /// Generate dos
  static List<String> _generateDos(String sign) {
    return [
      'Trust your intuition',
      'Express gratitude',
      'Take time for self-care',
      'Connect with nature',
    ];
  }

  /// Generate donts
  static List<String> _generateDonts(String sign) {
    return [
      'Don\'t rush important decisions',
      'Avoid negative self-talk',
      'Don\'t ignore your feelings',
      'Avoid unnecessary conflicts',
    ];
  }

  /// Generate Western transits
  static List<String> _generateWesternTransits(String sign) {
    return [
      'Sun in ${sign} brings focus and energy',
      'Moon influences emotional well-being',
      'Mercury enhances communication',
    ];
  }

  /// Generate Vedic cues
  static List<String> _generateVedicCues(String sign) {
    return [
      'Rashi influences your emotional nature',
      'Nakshatra provides deeper insights',
      'Planetary positions affect your day',
    ];
  }

  /// Get moon phase
  static String _getMoonPhase() {
    final phases = ['New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous', 'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent'];
    return phases[_random.nextInt(phases.length)];
  }

  /// Get tithi
  static String _getTithi() {
    final tithis = ['Purnima', 'Krishna Paksha', 'Shukla Paksha', 'Amavasya'];
    return tithis[_random.nextInt(tithis.length)];
  }

  /// Generate special messages
  static List<String> _generateSpecialMessages() {
    final messages = [
      'The universe is aligning in your favor today',
      'Your positive energy attracts good fortune',
      'Today holds a special message just for you',
    ];
    
    return messages.take(2).toList();
  }

  /// Generate micro actions
  static List<String> _generateMicroActions() {
    return [
      'Take 5 deep breaths',
      'Listen to your favorite song',
      'Step outside for fresh air',
      'Write down 3 things you\'re grateful for',
    ];
  }

  /// Generate reassurance
  static String _generateReassurance() {
    return 'You are stronger than you know. This feeling will pass.';
  }

  /// Get day number
  static int _getDayNumber() {
    return DateTime.now().day;
  }

  /// Get numerology meaning
  static String _getNumerologyMeaning() {
    return 'Today\'s number brings balance and harmony to your life.';
  }

  /// Get micro hint
  static String _getMicroHint() {
    return 'Pay attention to the small details today.';
  }

  /// Generate popups
  static List<String> _generatePopups() {
    return [
      'Remember to stay hydrated today',
      'Take breaks to rest your eyes',
      'Connect with a loved one',
    ];
  }

  /// Get lucky color
  static String _getLuckyColor(String sign) {
    final colors = ['Red', 'Blue', 'Green', 'Purple', 'Gold', 'Silver', 'Orange', 'Pink'];
    return colors[_random.nextInt(colors.length)];
  }

  /// Get lucky object
  static String _getLuckyObject(String sign) {
    final objects = ['Crystal', 'Flower', 'Stone', 'Feather', 'Shell', 'Leaf', 'Coin', 'Key'];
    return objects[_random.nextInt(objects.length)];
  }

  /// Get locale from place
  static String _getLocaleFromPlace(String place) {
    final placeLower = place.toLowerCase();
    if (placeLower.contains('sri lanka') || placeLower.contains('colombo')) {
      return 'si-LK';
    } else if (placeLower.contains('india') || placeLower.contains('delhi')) {
      return 'hi-IN';
    } else {
      return 'en-US';
    }
  }

  /// Get country from place
  static String _getCountryFromPlace(String place) {
    final placeLower = place.toLowerCase();
    if (placeLower.contains('sri lanka') || placeLower.contains('colombo')) {
      return 'Sri Lanka';
    } else if (placeLower.contains('india') || placeLower.contains('delhi')) {
      return 'India';
    } else {
      return 'Unknown';
    }
  }

  /// Cache content for offline use
  static void cacheContent(String key, Map<String, dynamic> content) {
    _cache[key] = content;
  }

  /// Get cached content
  static Map<String, dynamic>? getCachedContent(String key) {
    return _cache[key];
  }

  /// Clear cache
  static void clearCache() {
    _cache.clear();
  }
}

