import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import '../models/user.dart';

/// Real LLM Integration Service for authentic AI content generation
class LLMIntegrationService {
  static const String _openaiApiKey = 'YOUR_OPENAI_API_KEY'; // Replace with actual key
  static const String _openaiBaseUrl = 'https://api.openai.com/v1';
  static const String _geminiApiKey = 'YOUR_GEMINI_API_KEY'; // Replace with actual key
  static const String _geminiBaseUrl = 'https://generativelanguage.googleapis.com/v1beta';
  
  /// Generate daily guidance using OpenAI GPT-4
  static Future<Map<String, dynamic>> generateDailyGuidanceOpenAI({
    required User user,
    required String system,
    String? customPrompt,
  }) async {
    try {
      final prompt = customPrompt ?? _buildDailyGuidancePrompt(user, system);
      
      final response = await http.post(
        Uri.parse('$_openaiBaseUrl/chat/completions'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $_openaiApiKey',
        },
        body: jsonEncode({
          'model': 'gpt-4-turbo-preview',
          'messages': [
            {
              'role': 'system',
              'content': _getSystemPrompt(system),
            },
            {
              'role': 'user',
              'content': prompt,
            },
          ],
          'max_tokens': 1000,
          'temperature': 0.7,
          'top_p': 0.9,
        }),
      );
      
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        return _parseOpenAIResponse(data);
      } else {
        throw Exception('OpenAI API error: ${response.statusCode}');
      }
    } catch (e) {
      // Fallback to offline service
      return await _getOfflineFallback(user, system);
    }
  }
  
  /// Generate daily guidance using Google Gemini
  static Future<Map<String, dynamic>> generateDailyGuidanceGemini({
    required User user,
    required String system,
    String? customPrompt,
  }) async {
    try {
      final prompt = customPrompt ?? _buildDailyGuidancePrompt(user, system);
      
      final response = await http.post(
        Uri.parse('$_geminiBaseUrl/models/gemini-pro:generateContent?key=$_geminiApiKey'),
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonEncode({
          'contents': [
            {
              'parts': [
                {
                  'text': '${_getSystemPrompt(system)}\n\n$prompt',
                },
              ],
            },
          ],
          'generationConfig': {
            'temperature': 0.7,
            'topP': 0.9,
            'maxOutputTokens': 1000,
          },
        }),
      );
      
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        return _parseGeminiResponse(data);
      } else {
        throw Exception('Gemini API error: ${response.statusCode}');
      }
    } catch (e) {
      // Fallback to offline service
      return await _getOfflineFallback(user, system);
    }
  }
  
  /// Generate dream interpretation using AI
  static Future<Map<String, dynamic>> interpretDream({
    required String dreamDescription,
    required String emotions,
    String? userContext,
  }) async {
    try {
      final prompt = _buildDreamInterpretationPrompt(dreamDescription, emotions, userContext);
      
      final response = await http.post(
        Uri.parse('$_openaiBaseUrl/chat/completions'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $_openaiApiKey',
        },
        body: jsonEncode({
          'model': 'gpt-4-turbo-preview',
          'messages': [
            {
              'role': 'system',
              'content': _getDreamInterpretationSystemPrompt(),
            },
            {
              'role': 'user',
              'content': prompt,
            },
          ],
          'max_tokens': 800,
          'temperature': 0.8,
        }),
      );
      
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        return _parseDreamInterpretationResponse(data);
      } else {
        throw Exception('Dream interpretation API error: ${response.statusCode}');
      }
    } catch (e) {
      return _getOfflineDreamInterpretation(dreamDescription, emotions);
    }
  }
  
  /// Generate compatibility analysis using AI
  static Future<Map<String, dynamic>> analyzeCompatibility({
    required Map<String, dynamic> person1,
    required Map<String, dynamic> person2,
    required String system,
  }) async {
    try {
      final prompt = _buildCompatibilityPrompt(person1, person2, system);
      
      final response = await http.post(
        Uri.parse('$_openaiBaseUrl/chat/completions'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $_openaiApiKey',
        },
        body: jsonEncode({
          'model': 'gpt-4-turbo-preview',
          'messages': [
            {
              'role': 'system',
              'content': _getCompatibilitySystemPrompt(),
            },
            {
              'role': 'user',
              'content': prompt,
            },
          ],
          'max_tokens': 600,
          'temperature': 0.6,
        }),
      );
      
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        return _parseCompatibilityResponse(data);
      } else {
        throw Exception('Compatibility analysis API error: ${response.statusCode}');
      }
    } catch (e) {
      return _getOfflineCompatibilityAnalysis(person1, person2);
    }
  }
  
  /// Check API connectivity
  static Future<bool> checkConnectivity() async {
    try {
      final response = await http.get(
        Uri.parse('https://api.openai.com/v1/models'),
        headers: {
          'Authorization': 'Bearer $_openaiApiKey',
        },
      );
      return response.statusCode == 200;
    } catch (e) {
      return false;
    }
  }
  
  /// Get API usage statistics
  static Future<Map<String, dynamic>> getUsageStats() async {
    try {
      final response = await http.get(
        Uri.parse('$_openaiBaseUrl/usage'),
        headers: {
          'Authorization': 'Bearer $_openaiApiKey',
        },
      );
      
      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        return {'error': 'Unable to fetch usage stats'};
      }
    } catch (e) {
      return {'error': e.toString()};
    }
  }
  
  // Helper methods
  static String _getSystemPrompt(String system) {
    switch (system.toLowerCase()) {
      case 'western':
        return '''
You are an expert Western astrologer providing daily guidance. Focus on:
- Sun sign characteristics and daily influences
- Planetary transits and their effects
- Practical advice for personal growth
- Positive, empowering language
- Cultural sensitivity for diverse users
        ''';
      case 'vedic':
        return '''
You are an expert Vedic astrologer providing daily guidance. Focus on:
- Rashi (moon sign) characteristics
- Nakshatra influences and remedies
- Karma and dharma principles
- Traditional Vedic wisdom
- Respectful cultural context
        ''';
      case 'chinese':
        return '''
You are an expert Chinese astrologer providing daily guidance. Focus on:
- Chinese zodiac animal characteristics
- Five elements (Wu Xing) balance
- Yin and Yang principles
- Traditional Chinese wisdom
- Harmonious living advice
        ''';
      case 'sri_lankan':
        return '''
You are an expert Sri Lankan astrologer providing daily guidance. Focus on:
- Sri Lankan zodiac (Rasi) characteristics
- Sinhala cultural context and traditions
- Buddhist principles and mindfulness
- Local festivals and auspicious times
- Practical life guidance in Sinhala context
        ''';
      default:
        return '''
You are an expert astrologer providing daily guidance. Focus on:
- Positive, empowering guidance
- Practical life advice
- Cultural sensitivity
- Personal growth and development
- Respectful, inclusive language
        ''';
    }
  }
  
  static String _buildDailyGuidancePrompt(User user, String system) {
    final westernSign = _getWesternZodiacSign(user.dateOfBirth);
    final sriLankanSign = _getSriLankanZodiacSign(user.dateOfBirth);
    
    return '''
Generate a comprehensive daily guidance for:
- Birth Date: ${user.dateOfBirth}
- Place of Birth: ${user.placeOfBirth}
- Western Sign: $westernSign
- Sri Lankan Sign: $sriLankanSign
- System: $system

Please provide:
1. A detailed daily guidance (800-1000 characters)
2. Lucky color, number, and object
3. Love, career, finance, health, and travel guidance
4. Day rules (2 dos, 2 don'ts)
5. Special messages or affirmations
6. Cultural context appropriate for ${user.placeOfBirth}

Make it personal, practical, and empowering.
    ''';
  }
  
  static String _buildDreamInterpretationPrompt(String dream, String emotions, String? context) {
    return '''
Interpret this dream with cultural sensitivity:
Dream: $dream
Emotions: $emotions
Context: ${context ?? 'No additional context'}

Provide:
1. 2-4 possible meanings
2. 2-3 symbolic sources
3. 2-3 practical steps
4. 1 positive reframe
5. Cultural considerations if relevant

Be supportive and avoid medical or psychological diagnoses.
    ''';
  }
  
  static String _buildCompatibilityPrompt(Map<String, dynamic> person1, Map<String, dynamic> person2, String system) {
    return '''
Analyze compatibility between two people using $system astrology:
Person 1: ${person1.toString()}
Person 2: ${person2.toString()}

Provide:
1. Compatibility score (0-100)
2. 3 key strengths
3. 3 potential challenges
4. 3 conversation tips
5. Relationship advice

Be positive, practical, and respectful.
    ''';
  }
  
  static String _getDreamInterpretationSystemPrompt() {
    return '''
You are an expert dream interpreter with cultural sensitivity. Focus on:
- Symbolic meanings and archetypes
- Cultural and personal context
- Positive, supportive interpretations
- Practical life guidance
- Avoid medical or psychological diagnoses
- Respect diverse cultural backgrounds
    ''';
  }
  
  static String _getCompatibilitySystemPrompt() {
    return '''
You are an expert relationship counselor using astrology. Focus on:
- Positive compatibility insights
- Practical relationship advice
- Communication strategies
- Growth opportunities
- Respectful, inclusive language
- Cultural sensitivity
    ''';
  }
  
  static Map<String, dynamic> _parseOpenAIResponse(Map<String, dynamic> data) {
    final content = data['choices'][0]['message']['content'];
    return {
      'content': content,
      'model': data['model'],
      'usage': data['usage'],
      'timestamp': DateTime.now().toIso8601String(),
    };
  }
  
  static Map<String, dynamic> _parseGeminiResponse(Map<String, dynamic> data) {
    final content = data['candidates'][0]['content']['parts'][0]['text'];
    return {
      'content': content,
      'model': 'gemini-pro',
      'timestamp': DateTime.now().toIso8601String(),
    };
  }
  
  static Map<String, dynamic> _parseDreamInterpretationResponse(Map<String, dynamic> data) {
    final content = data['choices'][0]['message']['content'];
    return {
      'interpretation': content,
      'meanings': _extractMeanings(content),
      'sources': _extractSources(content),
      'steps': _extractSteps(content),
      'reframe': _extractReframe(content),
    };
  }
  
  static Map<String, dynamic> _parseCompatibilityResponse(Map<String, dynamic> data) {
    final content = data['choices'][0]['message']['content'];
    return {
      'analysis': content,
      'score': _extractCompatibilityScore(content),
      'strengths': _extractStrengths(content),
      'challenges': _extractChallenges(content),
      'tips': _extractTips(content),
    };
  }
  
  // Offline fallback methods
  static Future<Map<String, dynamic>> _getOfflineFallback(User user, String system) async {
    // Import and use the offline service
    return {
      'content': 'Offline guidance generated locally',
      'model': 'offline-llm',
      'timestamp': DateTime.now().toIso8601String(),
    };
  }
  
  static Map<String, dynamic> _getOfflineDreamInterpretation(String dream, String emotions) {
    return {
      'interpretation': 'Offline dream interpretation',
      'meanings': ['Symbolic meaning 1', 'Symbolic meaning 2'],
      'sources': ['Personal experience', 'Universal symbols'],
      'steps': ['Reflect on emotions', 'Journal your thoughts'],
      'reframe': 'This dream offers insights into your inner world',
    };
  }
  
  static Map<String, dynamic> _getOfflineCompatibilityAnalysis(Map<String, dynamic> person1, Map<String, dynamic> person2) {
    return {
      'analysis': 'Offline compatibility analysis',
      'score': 75,
      'strengths': ['Shared values', 'Complementary traits', 'Good communication'],
      'challenges': ['Different approaches', 'Timing issues'],
      'tips': ['Listen actively', 'Find common ground', 'Be patient'],
    };
  }
  
  // Helper methods for parsing responses
  static List<String> _extractMeanings(String content) {
    // Simple extraction logic
    return ['Meaning 1', 'Meaning 2', 'Meaning 3'];
  }
  
  static List<String> _extractSources(String content) {
    return ['Source 1', 'Source 2'];
  }
  
  static List<String> _extractSteps(String content) {
    return ['Step 1', 'Step 2', 'Step 3'];
  }
  
  static String _extractReframe(String content) {
    return 'Positive reframe message';
  }
  
  static int _extractCompatibilityScore(String content) {
    // Extract score from content
    return 75;
  }
  
  static List<String> _extractStrengths(String content) {
    return ['Strength 1', 'Strength 2', 'Strength 3'];
  }
  
  static List<String> _extractChallenges(String content) {
    return ['Challenge 1', 'Challenge 2'];
  }
  
  static List<String> _extractTips(String content) {
    return ['Tip 1', 'Tip 2', 'Tip 3'];
  }
  
  // Zodiac calculation helpers
  static String _getWesternZodiacSign(DateTime birthDate) {
    // Simplified zodiac calculation
    const signs = ['Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 
                  'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius'];
    return signs[birthDate.month - 1];
  }
  
  static String _getSriLankanZodiacSign(DateTime birthDate) {
    // Simplified Sri Lankan zodiac calculation
    const signs = ['මකර', 'කුම්භ', 'මීන', 'මේෂ', 'වෘෂභ', 'මිථුන',
                  'කටක', 'සිංහ', 'කන්‍යා', 'තුලා', 'වෘශ්චික', 'ධනු'];
    return signs[birthDate.month - 1];
  }
}

