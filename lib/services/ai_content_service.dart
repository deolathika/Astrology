import 'dart:math';
import '../models/user.dart';
import '../utils/zodiac_utils.dart';
import '../utils/chinese_zodiac_utils.dart';
import '../utils/sri_lankan_zodiac_utils.dart';

/// AI Content Service for generating personalized daily content
class AIContentService {
  static final Random _random = Random();

  /// Generates comprehensive daily content based on user profile and location
  static Future<DailyContent> generateDailyContent(User user) async {
    final now = DateTime.now();
    final westernSign = ZodiacUtils.getWesternZodiacSign(user.dateOfBirth);
    final sriLankanSign = SriLankanZodiacUtils.getSriLankanZodiacSign(user.dateOfBirth);
    final chineseSign = ChineseZodiacUtils.getChineseZodiacSign(user.dateOfBirth);
    
    // Determine primary system based on country
    final primarySystem = _getPrimarySystem(user.placeOfBirth);
    
    return DailyContent(
      date: now,
      user: user,
      primarySystem: primarySystem,
      westernSign: westernSign,
      sriLankanSign: sriLankanSign,
      chineseSign: chineseSign,
      quote: _generateDailyQuote(westernSign, sriLankanSign, chineseSign, primarySystem),
      luckyColor: _getLuckyColor(westernSign, sriLankanSign),
      luckyNumber: _getLuckyNumber(user.dateOfBirth),
      luckyObject: _getLuckyObject(westernSign, sriLankanSign),
      dayRules: _generateDayRules(westernSign, sriLankanSign, primarySystem),
      guidance: _generateGuidance(westernSign, sriLankanSign, primarySystem),
      specialMessages: _generateSpecialMessages(now, westernSign, sriLankanSign),
      moodFix: _generateMoodFix(westernSign, sriLankanSign),
      shareCard: _generateShareCard(westernSign, sriLankanSign, primarySystem),
    );
  }

  /// Determines primary astrology system based on country
  static String _getPrimarySystem(String placeOfBirth) {
    final place = placeOfBirth.toLowerCase();
    if (place.contains('sri lanka') || place.contains('colombo') || place.contains('kandy')) {
      return 'sri_lankan';
    } else if (place.contains('india') || place.contains('delhi') || place.contains('mumbai')) {
      return 'vedic';
    } else if (place.contains('china') || place.contains('beijing') || place.contains('shanghai')) {
      return 'chinese';
    } else {
      return 'western';
    }
  }

  /// Generates personalized daily quote
  static String _generateDailyQuote(String westernSign, String sriLankanSign, String chineseSign, String primarySystem) {
    final quotes = _getQuotesForSystem(primarySystem, westernSign, sriLankanSign, chineseSign);
    return quotes[_random.nextInt(quotes.length)];
  }

  /// Gets quotes based on primary system
  static List<String> _getQuotesForSystem(String system, String westernSign, String sriLankanSign, String chineseSign) {
    switch (system) {
      case 'sri_lankan':
        return _getSriLankanQuotes(sriLankanSign);
      case 'vedic':
        return _getVedicQuotes(westernSign);
      case 'chinese':
        return _getChineseQuotes(chineseSign);
      default:
        return _getWesternQuotes(westernSign);
    }
  }

  /// Sri Lankan quotes with cultural context - Extended long-form guidance
  static List<String> _getSriLankanQuotes(String sign) {
    final quotes = {
      'Aries': [
        'අද ඔබේ ධෛර්යය ඔබේ ගමනේ මගපෙන්වන්න. නව අභියෝග ගෙන එන අවස්ථාවලදී ඔබේ අභ්‍යන්තර බලය භාවිතා කරන්න. මේෂ රාශියේ බලය අද ඔබේ අතේ ඇත. නායකත්වය ගෙන ඔබේ අභිලාෂයන් සාක්ෂාත් කර ගන්න. අද ඔබේ උද්යෝගය අන්‍යයන්ට ද ආශ්වාදයක් වේවා. ඔබේ ධෛර්යය අන්‍යයන්ට ද බලය ලබා දෙන්න. අද ඔබේ ගමනේ ධෛර්යය සහ නායකත්වය අන්‍යයන්ට ආශ්වාදයක් වේවා. ඔබේ අභ්‍යන්තර බලය භාවිතා කර ඔබේ අභිලාෂයන් සාක්ෂාත් කර ගන්න. අද ඔබේ ගමනේ ධෛර්යය සහ නායකත්වය අන්‍යයන්ට ආශ්වාදයක් වේවා. ඔබේ අභ්‍යන්තර බලය භාවිතා කර ඔබේ අභිලාෂයන් සාක්ෂාත් කර ගන්න.',
        'මේෂ රාශියේ බලය අද ඔබේ අතේ ඇත. නායකත්වය ගෙන ඔබේ අභිලාෂයන් සාක්ෂාත් කර ගන්න. අද ඔබේ උද්යෝගය අන්‍යයන්ට ද ආශ්වාදයක් වේවා. ඔබේ ධෛර්යය අන්‍යයන්ට ද බලය ලබා දෙන්න. අද ඔබේ ගමනේ ධෛර්යය සහ නායකත්වය අන්‍යයන්ට ආශ්වාදයක් වේවා. ඔබේ අභ්‍යන්තර බලය භාවිතා කර ඔබේ අභිලාෂයන් සාක්ෂාත් කර ගන්න. අද ඔබේ ගමනේ ධෛර්යය සහ නායකත්වය අන්‍යයන්ට ආශ්වාදයක් වේවා. ඔබේ අභ්‍යන්තර බලය භාවිතා කර ඔබේ අභිලාෂයන් සාක්ෂාත් කර ගන්න.',
        'අද ඔබේ උද්යෝගය අන්‍යයන්ට ද ආශ්වාදයක් වේවා. ඔබේ ධෛර්යය අන්‍යයන්ට ද බලය ලබා දෙන්න. අද ඔබේ ගමනේ ධෛර්යය සහ නායකත්වය අන්‍යයන්ට ආශ්වාදයක් වේවා. ඔබේ අභ්‍යන්තර බලය භාවිතා කර ඔබේ අභිලාෂයන් සාක්ෂාත් කර ගන්න. අද ඔබේ ගමනේ ධෛර්යය සහ නායකත්වය අන්‍යයන්ට ආශ්වාදයක් වේවා. ඔබේ අභ්‍යන්තර බලය භාවිතා කර ඔබේ අභිලාෂයන් සාක්ෂාත් කර ගන්න.',
      ],
      'Taurus': [
        'අද ස්ථිර ගමනක් ගමන් කරන්න. ඔබේ ඉවසීම සහ වගකීම් ගතිකම් අද ඔබට වැදගත් වනු ඇත.',
        'වෘෂභ රාශියේ ස්ථිරතාවය අද ඔබේ ගමනේ පදනම වේ. ඔබේ අධිෂ්ඨානය අද ඔබට සාර්ථකත්වය ගෙන එනු ඇත.',
        'අද ඔබේ භෞතික සුවය සහ සෞන්දර්යයට වටිනාකම දෙන්න. සරල දේවල් තුළ සතුට සොයා ගන්න.',
      ],
      'Gemini': [
        'අද ඔබේ බුද්ධිය සහ සන්නිවේදනය අන්‍යයන්ට උපකාර වේවා. ඔබේ දැනුම බෙදා ගන්න.',
        'මිථුන රාශියේ අනුවර්තනය අද ඔබේ ගමනේ යුගලය වේ. නව අදහස් සහ අත්දැකීම් සොයා ගන්න.',
        'අද ඔබේ කුතුහලය ඔබේ ගමනේ මගපෙන්වන්න. නව දැනුම සහ අත්දැකීම් සොයා ගන්න.',
      ],
      'Cancer': [
        'අද ඔබේ ස්නේහය සහ ආරක්ෂණය ඔබේ පවුලට උපකාර වේවා. ඔබේ ගෘහස්ථ ජීවිතය සුභම්ය වේවා.',
        'කර්කටක රාශියේ චිත්තවේගීය ගැඹුර අද ඔබේ ගමනේ බලය වේ. ඔබේ අභ්‍යන්තර හැඟීම් අවබෝධ කර ගන්න.',
        'අද ඔබේ ගෘහස්ථ සුවය සහ පවුල් සම්බන්ධතා වැදගත් වේ. ඔබේ ආදරණීයයන් සමඟ කාලය ගත කරන්න.',
      ],
      'Leo': [
        'අද ඔබේ ආත්මවිශ්වාසය සහ නායකත්වය අන්‍යයන්ට ආශ්වාදයක් වේවා. ඔබේ බලය අන්‍යයන්ට ද බලය ලබා දෙන්න.',
        'සිංහ රාශියේ ආත්මවිශ්වාසය අද ඔබේ ගමනේ බලය වේ. ඔබේ අභිලාෂයන් සාක්ෂාත් කර ගන්න.',
        'අද ඔබේ නිර්මාණශීලිත්වය සහ උදාරත්වය අන්‍යයන්ට ආශ්වාදයක් වේවා. ඔබේ අභිලාෂයන් සාක්ෂාත් කර ගන්න.',
      ],
      'Virgo': [
        'අද ඔබේ විධිමත් ගමන සහ සේවාමය ගතිකම් අන්‍යයන්ට උපකාර වේවා. ඔබේ සාක්ෂිකත්වය අන්‍යයන්ට ද උපකාර වේවා.',
        'කන්‍යා රාශියේ සාක්ෂිකත්වය අද ඔබේ ගමනේ බලය වේ. ඔබේ විධිමත් ගමන සාර්ථකත්වය ගෙන එනු ඇත.',
        'අද ඔබේ විශ්ලේෂණාත්මක හැකියාවන් අන්‍යයන්ට උපකාර වේවා. ඔබේ දැනුම බෙදා ගන්න.',
      ],
      'Libra': [
        'අද ඔබේ සමතුලිත ගමන සහ සාධාරණත්වය අන්‍යයන්ට උපකාර වේවා. ඔබේ සාමය අන්‍යයන්ට ද සාමය ලබා දෙන්න.',
        'තුලා රාශියේ සමතුලිතතාවය අද ඔබේ ගමනේ බලය වේ. ඔබේ සාධාරණත්වය අන්‍යයන්ට ද සාධාරණත්වය ලබා දෙන්න.',
        'අද ඔබේ සම්බන්ධතා සහ සාමය වැදගත් වේ. ඔබේ ආදරණීයයන් සමඟ සම්බන්ධතා ගොඩනඟන්න.',
      ],
      'Scorpio': [
        'අද ඔබේ තීව්‍ර ගමන සහ පරිවර්තනය අන්‍යයන්ට උපකාර වේවා. ඔබේ බලය අන්‍යයන්ට ද බලය ලබා දෙන්න.',
        'වෘශ්චික රාශියේ තීව්‍රතාවය අද ඔබේ ගමනේ බලය වේ. ඔබේ පරිවර්තනය සාර්ථකත්වය ගෙන එනු ඇත.',
        'අද ඔබේ ගැඹුරු අවබෝධය සහ බලය අන්‍යයන්ට උපකාර වේවා. ඔබේ අභ්‍යන්තර බලය භාවිතා කරන්න.',
      ],
      'Sagittarius': [
        'අද ඔබේ සාක්ෂික ගමන සහ දර්ශනවාදී අදහස් අන්‍යයන්ට උපකාර වේවා. ඔබේ දැනුම බෙදා ගන්න.',
        'ධනු රාශියේ සාක්ෂිකත්වය අද ඔබේ ගමනේ බලය වේ. ඔබේ දර්ශනවාදී අදහස් සාර්ථකත්වය ගෙන එනු ඇත.',
        'අද ඔබේ නිදහස සහ සංචාරක ගතිකම් අන්‍යයන්ට ආශ්වාදයක් වේවා. ඔබේ අත්දැකීම් බෙදා ගන්න.',
      ],
      'Capricorn': [
        'අද ඔබේ අධිෂ්ඨානශීලී ගමන සහ වගකීම් අන්‍යයන්ට උපකාර වේවා. ඔබේ සාක්ෂිකත්වය අන්‍යයන්ට ද උපකාර වේවා.',
        'මකර රාශියේ අධිෂ්ඨානශීලීත්වය අද ඔබේ ගමනේ බලය වේ. ඔබේ වගකීම් සාර්ථකත්වය ගෙන එනු ඇත.',
        'අද ඔබේ ප්‍රායෝගික ගමන සහ අධ්‍යාපනය අන්‍යයන්ට උපකාර වේවා. ඔබේ දැනුම බෙදා ගන්න.',
      ],
      'Aquarius': [
        'අද ඔබේ නවෝත්පාදන ගමන සහ ස්වාධීන ගතිකම් අන්‍යයන්ට උපකාර වේවා. ඔබේ අදහස් බෙදා ගන්න.',
        'කුම්භ රාශියේ නවෝත්පාදන අද ඔබේ ගමනේ බලය වේ. ඔබේ ස්වාධීන ගතිකම් සාර්ථකත්වය ගෙන එනු ඇත.',
        'අද ඔබේ මානව හිතකාමී ගමන සහ ප්‍රගතිශීලී අදහස් අන්‍යයන්ට උපකාර වේවා. ඔබේ අදහස් බෙදා ගන්න.',
      ],
      'Pisces': [
        'අද ඔබේ කරුණාවන්ත ගමන සහ කලාත්මක ගතිකම් අන්‍යයන්ට උපකාර වේවා. ඔබේ අනුකම්පාව අන්‍යයන්ට ද අනුකම්පාව ලබා දෙන්න.',
        'මීන රාශියේ කරුණාවන්තත්වය අද ඔබේ ගමනේ බලය වේ. ඔබේ කලාත්මක ගතිකම් සාර්ථකත්වය ගෙන එනු ඇත.',
        'අද ඔබේ අභ්‍යන්තර ගමන සහ ආධ්‍යාත්මික ගතිකම් අන්‍යයන්ට උපකාර වේවා. ඔබේ අභ්‍යන්තර සුවය සොයා ගන්න.',
      ],
    };
    return quotes[sign] ?? ['අද ඔබේ ගමන සුභම්ය වේවා. ඔබේ අභිලාෂයන් සාක්ෂාත් කර ගන්න.'];
  }

  /// Western quotes
  static List<String> _getWesternQuotes(String sign) {
    final quotes = {
      'Aries': [
        'Today your courage will guide your path. Embrace new challenges with your inner strength.',
        'Your pioneering spirit is at its peak today. Lead with confidence and determination.',
        'The fire within you burns bright today. Channel this energy into positive action.',
      ],
      'Taurus': [
        'Your steady approach will bring stability today. Trust in your practical wisdom.',
        'The earth beneath your feet supports your journey. Stay grounded and patient.',
        'Your appreciation for beauty will bring joy today. Find pleasure in simple things.',
      ],
      'Gemini': [
        'Your curiosity opens new doors today. Embrace learning and communication.',
        'Your adaptability is your greatest strength today. Stay flexible and open-minded.',
        'Your wit and intelligence will serve you well today. Share your knowledge generously.',
      ],
      'Cancer': [
        'Your emotional intelligence guides you today. Trust your intuition and nurture others.',
        'Your protective nature brings comfort to those around you today. Lead with your heart.',
        'Your connection to home and family strengthens you today. Cherish these bonds.',
      ],
      'Leo': [
        'Your natural leadership shines today. Inspire others with your confidence and warmth.',
        'Your creative energy flows freely today. Express yourself boldly and authentically.',
        'Your generous spirit touches others today. Share your light with the world.',
      ],
      'Virgo': [
        'Your attention to detail serves you well today. Trust in your analytical mind.',
        'Your service to others brings fulfillment today. Help where you can.',
        'Your practical wisdom guides your decisions today. Stay organized and focused.',
      ],
      'Libra': [
        'Your sense of balance brings harmony today. Seek fairness in all interactions.',
        'Your diplomatic nature helps resolve conflicts today. Be the peacemaker.',
        'Your appreciation for beauty enhances your day today. Surround yourself with lovely things.',
      ],
      'Scorpio': [
        'Your intensity transforms situations today. Embrace change and renewal.',
        'Your depth of understanding helps others today. Trust your insights.',
        'Your passion drives you forward today. Channel this energy constructively.',
      ],
      'Sagittarius': [
        'Your optimism opens new horizons today. Embrace adventure and learning.',
        'Your philosophical nature brings wisdom today. Share your insights with others.',
        'Your freedom-loving spirit guides you today. Explore new possibilities.',
      ],
      'Capricorn': [
        'Your determination builds success today. Stay focused on your long-term goals.',
        'Your practical approach solves problems today. Trust in your methodical nature.',
        'Your ambition drives you forward today. Take steady steps toward your dreams.',
      ],
      'Aquarius': [
        'Your innovative thinking brings fresh perspectives today. Embrace your uniqueness.',
        'Your humanitarian nature serves others today. Work for the greater good.',
        'Your independence allows you to think freely today. Trust your unconventional ideas.',
      ],
      'Pisces': [
        'Your compassion touches others today. Lead with your heart and intuition.',
        'Your artistic nature brings beauty today. Express yourself creatively.',
        'Your empathy helps you understand others today. Be gentle with yourself and others.',
      ],
    };
    return quotes[sign] ?? ['Today brings new opportunities. Trust in your journey and embrace the possibilities.'];
  }

  /// Vedic quotes
  static List<String> _getVedicQuotes(String sign) {
    return _getWesternQuotes(sign); // For now, using Western quotes
  }

  /// Chinese quotes
  static List<String> _getChineseQuotes(String sign) {
    return _getWesternQuotes(sign); // For now, using Western quotes
  }

  /// Gets lucky color based on signs
  static String _getLuckyColor(String westernSign, String sriLankanSign) {
    final colors = ['Red', 'Blue', 'Green', 'Purple', 'Gold', 'Silver', 'Orange', 'Pink'];
    return colors[_random.nextInt(colors.length)];
  }

  /// Gets lucky number based on birth date
  static int _getLuckyNumber(DateTime birthDate) {
    return ZodiacUtils.calculateLifePathNumber(birthDate);
  }

  /// Gets lucky object based on signs
  static String _getLuckyObject(String westernSign, String sriLankanSign) {
    final objects = ['Crystal', 'Flower', 'Stone', 'Feather', 'Shell', 'Leaf', 'Coin', 'Key'];
    return objects[_random.nextInt(objects.length)];
  }

  /// Generates day rules (dos and don'ts)
  static DayRules _generateDayRules(String westernSign, String sriLankanSign, String primarySystem) {
    final dos = [
      'Trust your intuition and inner wisdom - the cosmic energy supports your natural instincts today',
      'Express gratitude for the abundance in your life - this opens doors to even more blessings',
      'Take time for self-care and spiritual practices - your soul needs nourishment',
      'Connect with nature and the elements - earth energy will ground and center you',
      'Practice mindfulness and present-moment awareness - the universe has messages for you',
      'Be kind to yourself and others - compassion creates positive energy that returns to you',
      'Embrace new opportunities that align with your highest good - the stars are opening doors',
      'Listen to your heart and follow your authentic path - your soul knows the way',
      'Engage in creative activities that bring you joy - artistic expression heals and uplifts',
      'Communicate openly and honestly with loved ones - authentic connection is your strength',
    ];
    
    final donts = [
      'Don\'t rush important decisions - take time to consider all aspects and trust your timing',
      'Avoid negative self-talk and limiting beliefs - you are worthy of love and success',
      'Don\'t ignore your feelings and emotions - they are valuable guidance from your soul',
      'Avoid unnecessary conflicts and drama - peace and harmony serve your highest good',
      'Don\'t overcommit yourself or people-please - boundaries protect your energy',
      'Avoid toxic environments and negative influences - surround yourself with positive energy',
      'Don\'t suppress your emotions or pretend everything is fine - authentic expression is healing',
      'Avoid making assumptions about others\' intentions - ask for clarification when needed',
      'Don\'t compare yourself to others - your journey is unique and perfectly timed',
      'Avoid holding onto grudges or past hurts - forgiveness frees your heart and soul',
    ];

    return DayRules(
      dos: [dos[_random.nextInt(dos.length)], dos[_random.nextInt(dos.length)]],
      donts: [donts[_random.nextInt(donts.length)], donts[_random.nextInt(donts.length)]],
    );
  }

  /// Generates guidance for different areas
  static Guidance _generateGuidance(String westernSign, String sriLankanSign, String primarySystem) {
    return Guidance(
      love: 'Your heart is open to new connections today. The cosmic energy supports emotional vulnerability and authentic expression. Trust in the power of love to transform your relationships. Venus aligns with your sign, bringing harmony and understanding to your closest bonds. This is an ideal time for deep conversations and meaningful connections.',
      career: 'Your professional skills shine brightly today. The stars favor leadership and innovation in your work. Take initiative on projects that showcase your unique talents. Mercury\'s influence enhances your communication skills, making this perfect for presentations or important meetings. Trust your instincts when making career decisions.',
      finances: 'Your financial intuition is heightened today. The cosmic energy supports wise money management and investment decisions. Venus brings opportunities for financial growth through creative endeavors. Avoid impulsive spending and focus on long-term stability. Consider consulting with a financial advisor about new investment opportunities.',
      health: 'Your body needs gentle care and attention today. Listen to its signals and honor your physical needs. The moon\'s influence suggests focusing on emotional well-being as it affects your physical health. Consider gentle exercise, meditation, or spending time in nature. Pay attention to stress levels and take breaks when needed.',
      travel: 'Your adventurous spirit calls for exploration today. The cosmic energy supports new experiences and cultural exchanges. Whether it\'s a local adventure or planning a future journey, the stars align for meaningful travel experiences. Trust your instincts about destinations and timing. Travel may bring unexpected opportunities for growth.',
    );
  }

  /// Generates special messages for the day
  static List<String> _generateSpecialMessages(DateTime date, String westernSign, String sriLankanSign) {
    final messages = <String>[];
    
    // Check for special days
    if (date.month == 1 && date.day == 1) {
      messages.add('Happy New Year! A fresh start brings new possibilities.');
    } else if (date.month == 12 && date.day == 25) {
      messages.add('Merry Christmas! Joy and peace surround you today.');
    } else if (date.month == 2 && date.day == 14) {
      messages.add('Happy Valentine\'s Day! Love is in the air.');
    }
    
    // Add random special message
    final specialMessages = [
      'The universe is aligning in your favor today.',
      'Your positive energy attracts good fortune.',
      'Today holds a special message just for you.',
      'The stars are smiling upon you today.',
    ];
    
    if (messages.length < 2) {
      messages.add(specialMessages[_random.nextInt(specialMessages.length)]);
    }
    
    return messages.take(2).toList();
  }

  /// Generates mood fix suggestions
  static MoodFix _generateMoodFix(String westernSign, String sriLankanSign) {
    final microActions = [
      'Take 5 deep breaths',
      'Listen to your favorite song',
      'Step outside for fresh air',
      'Write down 3 things you\'re grateful for',
      'Stretch your body gently',
      'Call a loved one',
      'Look at something beautiful',
      'Practice a moment of silence',
    ];
    
    return MoodFix(
      detected: _random.nextBool(),
      microActions: [microActions[_random.nextInt(microActions.length)]],
      reassurance: 'You are stronger than you know. This feeling will pass.',
    );
  }

  /// Generates share card content
  static ShareCard _generateShareCard(String westernSign, String sriLankanSign, String primarySystem) {
    return ShareCard(
      caption: 'Discover your daily cosmic guidance with Daily Secrets ✨',
      hashtags: ['#DailySecrets', '#Astrology', '#Guidance', '#CosmicWisdom', '#SpiritualJourney'],
    );
  }
}

/// Data models for AI content
class DailyContent {
  final DateTime date;
  final User user;
  final String primarySystem;
  final String westernSign;
  final String sriLankanSign;
  final String chineseSign;
  final String quote;
  final String luckyColor;
  final int luckyNumber;
  final String luckyObject;
  final DayRules dayRules;
  final Guidance guidance;
  final List<String> specialMessages;
  final MoodFix moodFix;
  final ShareCard shareCard;

  DailyContent({
    required this.date,
    required this.user,
    required this.primarySystem,
    required this.westernSign,
    required this.sriLankanSign,
    required this.chineseSign,
    required this.quote,
    required this.luckyColor,
    required this.luckyNumber,
    required this.luckyObject,
    required this.dayRules,
    required this.guidance,
    required this.specialMessages,
    required this.moodFix,
    required this.shareCard,
  });
}

class DayRules {
  final List<String> dos;
  final List<String> donts;

  DayRules({required this.dos, required this.donts});
}

class Guidance {
  final String love;
  final String career;
  final String finances;
  final String health;
  final String travel;

  Guidance({
    required this.love,
    required this.career,
    required this.finances,
    required this.health,
    required this.travel,
  });
}

class MoodFix {
  final bool detected;
  final List<String> microActions;
  final String reassurance;

  MoodFix({
    required this.detected,
    required this.microActions,
    required this.reassurance,
  });
}

class ShareCard {
  final String caption;
  final List<String> hashtags;

  ShareCard({required this.caption, required this.hashtags});
}
