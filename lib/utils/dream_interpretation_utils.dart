/// Dream Interpretation Utility Functions
/// 
/// This class provides comprehensive dream interpretation and philosophy features including:
/// - Dream symbol analysis
/// - Philosophical meanings
/// - Cultural interpretations (Sri Lankan context)
/// - Zodiac-based dream guidance
class DreamInterpretationUtils {
  /// Dream symbols and their meanings
  static const Map<String, Map<String, dynamic>> dreamSymbols = {
    'water': {
      'general': 'Emotions, cleansing, life, purification',
      'philosophy': 'Water represents the flow of life and emotional states. It symbolizes purification and renewal.',
      'sinhala': 'ජලය - චිත්තවේග, පිරිසිදු කිරීම, ජීවිතය',
      'zodiac_meaning': {
        'Cancer': 'Deep emotional connection and intuition',
        'Pisces': 'Spiritual cleansing and renewal',
        'Scorpio': 'Transformation and rebirth',
      },
    },
    'fire': {
      'general': 'Passion, energy, transformation, destruction',
      'philosophy': 'Fire represents the inner flame of passion and the power of transformation.',
      'sinhala': 'ගිනි - උද්යෝගය, පරිවර්තනය, බලය',
      'zodiac_meaning': {
        'Aries': 'New beginnings and leadership',
        'Leo': 'Creative expression and confidence',
        'Sagittarius': 'Adventure and exploration',
      },
    },
    'snake': {
      'general': 'Transformation, healing, wisdom, danger',
      'philosophy': 'Snakes represent the cycle of life, death, and rebirth. They symbolize wisdom and transformation.',
      'sinhala': 'සර්පයා - පරිවර්තනය, සුවය, ඥානය',
      'zodiac_meaning': {
        'Scorpio': 'Deep transformation and healing',
        'Sagittarius': 'Wisdom and higher learning',
        'Capricorn': 'Ambition and achievement',
      },
    },
    'bird': {
      'general': 'Freedom, spirituality, messages, hope',
      'philosophy': 'Birds represent the connection between earth and sky, material and spiritual.',
      'sinhala': 'පක්ෂියා - නිදහස, ආධ්‍යාත්මිකත්වය, ප්‍රතික්ෂා',
      'zodiac_meaning': {
        'Aquarius': 'Innovation and freedom',
        'Gemini': 'Communication and messages',
        'Libra': 'Balance and harmony',
      },
    },
    'tree': {
      'general': 'Growth, stability, connection, life',
      'philosophy': 'Trees represent the connection between heaven and earth, growth and stability.',
      'sinhala': 'ගස - වර්ධනය, ස්ථාවරත්වය, සම්බන්ධතා',
      'zodiac_meaning': {
        'Taurus': 'Stability and growth',
        'Virgo': 'Service and nurturing',
        'Capricorn': 'Achievement and structure',
      },
    },
    'mountain': {
      'general': 'Challenges, achievement, stability, goals',
      'philosophy': 'Mountains represent life\'s challenges and the journey to achieve goals.',
      'sinhala': 'පර්වතය - අභියෝග, ඉලක්ක, ස්ථාවරත්වය',
      'zodiac_meaning': {
        'Capricorn': 'Ambition and achievement',
        'Aries': 'Leadership and challenges',
        'Leo': 'Confidence and success',
      },
    },
    'house': {
      'general': 'Self, security, family, inner world',
      'philosophy': 'Houses represent the self and the inner world of thoughts and emotions.',
      'sinhala': 'ගෙය - ආත්මය, ආරක්ෂාව, පවුල',
      'zodiac_meaning': {
        'Cancer': 'Home and family',
        'Taurus': 'Security and comfort',
        'Virgo': 'Organization and health',
      },
    },
    'road': {
      'general': 'Journey, life path, decisions, direction',
      'philosophy': 'Roads represent the journey of life and the choices we make.',
      'sinhala': 'මාර්ගය - ජීවිත ගමන, තීරණ, දිශාව',
      'zodiac_meaning': {
        'Sagittarius': 'Adventure and exploration',
        'Gemini': 'Communication and learning',
        'Aquarius': 'Innovation and progress',
      },
    },
  };

  /// Dream interpretation based on zodiac signs
  static Map<String, dynamic> getDreamInterpretation(String dreamSymbol, String zodiacSign) {
    final symbolData = dreamSymbols[dreamSymbol.toLowerCase()];
    if (symbolData == null) return {};

    return {
      'symbol': dreamSymbol,
      'general_meaning': symbolData['general'],
      'philosophy': symbolData['philosophy'],
      'sinhala_meaning': symbolData['sinhala'],
      'zodiac_meaning': symbolData['zodiac_meaning']?[zodiacSign] ?? 'General interpretation applies',
      'advice': _getDreamAdvice(dreamSymbol, zodiacSign),
      'cultural_context': _getCulturalContext(dreamSymbol),
    };
  }

  /// Get dream advice based on zodiac sign
  static String _getDreamAdvice(String dreamSymbol, String zodiacSign) {
    const adviceMap = {
      'water': {
        'Cancer': 'Pay attention to your emotions and intuition. This dream suggests emotional healing.',
        'Pisces': 'Your spiritual side is calling. Focus on meditation and inner peace.',
        'Scorpio': 'A major transformation is coming. Embrace change and growth.',
        'default': 'Water dreams suggest emotional cleansing and renewal.',
      },
      'fire': {
        'Aries': 'Your passion is awakening. Take action on your goals.',
        'Leo': 'Your creative energy is strong. Express yourself boldly.',
        'Sagittarius': 'Adventure awaits. Be open to new experiences.',
        'default': 'Fire dreams indicate passion and transformation.',
      },
      'snake': {
        'Scorpio': 'Embrace transformation. Old patterns are changing.',
        'Sagittarius': 'Seek wisdom and higher knowledge.',
        'Capricorn': 'Your ambitions are within reach. Stay focused.',
        'default': 'Snake dreams suggest transformation and healing.',
      },
    };

    final symbolAdvice = adviceMap[dreamSymbol.toLowerCase()];
    return symbolAdvice?[zodiacSign] ?? symbolAdvice?['default'] ?? 'Trust your intuition and inner wisdom.';
  }

  /// Get cultural context for dream symbols
  static String _getCulturalContext(String dreamSymbol) {
    const culturalContext = {
      'water': 'In Sri Lankan culture, water is sacred and represents purity. Water dreams often indicate spiritual cleansing.',
      'fire': 'Fire is considered a purifying element in Sri Lankan tradition. Fire dreams suggest inner transformation.',
      'snake': 'In Sri Lankan folklore, snakes are often associated with wisdom and protection. Snake dreams may indicate guidance.',
      'bird': 'Birds are messengers in Sri Lankan culture. Bird dreams often bring important messages.',
      'tree': 'Trees are sacred in Sri Lankan tradition. Tree dreams suggest growth and connection to nature.',
      'mountain': 'Mountains represent spiritual elevation in Sri Lankan culture. Mountain dreams suggest spiritual growth.',
      'house': 'Houses represent family and security in Sri Lankan culture. House dreams focus on family matters.',
      'road': 'Roads represent life\'s journey in Sri Lankan philosophy. Road dreams suggest life direction.',
    };

    return culturalContext[dreamSymbol.toLowerCase()] ?? 'Dreams are messages from the subconscious mind.';
  }

  /// Get comprehensive dream analysis
  static Map<String, dynamic> getComprehensiveDreamAnalysis({
    required String dreamSymbol,
    required String zodiacSign,
    required DateTime dreamDate,
    String? dreamDescription,
  }) {
    final interpretation = getDreamInterpretation(dreamSymbol, zodiacSign);
    
    return {
      'dream_symbol': dreamSymbol,
      'zodiac_sign': zodiacSign,
      'dream_date': dreamDate,
      'interpretation': interpretation,
      'philosophical_meaning': _getPhilosophicalMeaning(dreamSymbol),
      'lucky_elements': _getLuckyElementsForDream(dreamSymbol, zodiacSign),
      'meditation_guidance': _getMeditationGuidance(dreamSymbol, zodiacSign),
      'action_advice': _getActionAdvice(dreamSymbol, zodiacSign),
    };
  }

  /// Get philosophical meaning of dream symbols
  static String _getPhilosophicalMeaning(String dreamSymbol) {
    const philosophicalMeanings = {
      'water': 'Water in dreams represents the flow of consciousness and the fluid nature of reality. It teaches us about adaptability and emotional intelligence.',
      'fire': 'Fire symbolizes the inner light of consciousness and the transformative power of awareness. It represents the burning away of ignorance.',
      'snake': 'Snakes represent the kundalini energy and the awakening of consciousness. They symbolize the cycle of death and rebirth.',
      'bird': 'Birds represent the soul\'s journey and the connection between earthly and divine realms. They symbolize freedom and transcendence.',
      'tree': 'Trees represent the connection between heaven and earth, the material and spiritual. They symbolize growth and stability.',
      'mountain': 'Mountains represent the spiritual journey and the challenges of enlightenment. They symbolize the path to higher consciousness.',
      'house': 'Houses represent the self and the inner world. They symbolize the structure of consciousness and the home of the soul.',
      'road': 'Roads represent the journey of life and the choices that shape our destiny. They symbolize the path of dharma.',
    };

    return philosophicalMeanings[dreamSymbol.toLowerCase()] ?? 'Dreams are windows into the soul\'s journey.';
  }

  /// Get lucky elements for dream-based guidance
  static Map<String, dynamic> _getLuckyElementsForDream(String dreamSymbol, String zodiacSign) {
    const luckyElements = {
      'water': {
        'colors': ['Blue', 'Silver', 'White'],
        'stones': ['Aquamarine', 'Moonstone', 'Pearl'],
        'directions': ['North', 'West'],
        'times': ['Night', 'Early Morning'],
      },
      'fire': {
        'colors': ['Red', 'Orange', 'Gold'],
        'stones': ['Ruby', 'Carnelian', 'Topaz'],
        'directions': ['South', 'East'],
        'times': ['Noon', 'Evening'],
      },
      'snake': {
        'colors': ['Green', 'Black', 'Gold'],
        'stones': ['Emerald', 'Onyx', 'Citrine'],
        'directions': ['Southeast', 'Southwest'],
        'times': ['Dawn', 'Dusk'],
      },
    };

    return luckyElements[dreamSymbol.toLowerCase()] ?? {
      'colors': ['White', 'Silver'],
      'stones': ['Clear Quartz', 'Amethyst'],
      'directions': ['North'],
      'times': ['Morning'],
    };
  }

  /// Get meditation guidance based on dream
  static String _getMeditationGuidance(String dreamSymbol, String zodiacSign) {
    const meditationGuidance = {
      'water': 'Meditate near water or visualize flowing water. Focus on emotional healing and purification.',
      'fire': 'Practice fire meditation or visualize a warm, golden light. Focus on passion and transformation.',
      'snake': 'Practice kundalini meditation or visualize energy rising through your spine. Focus on transformation.',
      'bird': 'Meditate in nature or visualize flying. Focus on freedom and spiritual connection.',
      'tree': 'Practice tree meditation or visualize roots and branches. Focus on grounding and growth.',
      'mountain': 'Meditate on a mountain or visualize climbing. Focus on goals and achievement.',
      'house': 'Practice home meditation or visualize a safe space. Focus on security and family.',
      'road': 'Meditate on your life path or visualize a journey. Focus on direction and purpose.',
    };

    return meditationGuidance[dreamSymbol.toLowerCase()] ?? 'Meditate on the meaning of your dream and trust your inner wisdom.';
  }

  /// Get action advice based on dream
  static String _getActionAdvice(String dreamSymbol, String zodiacSign) {
    const actionAdvice = {
      'water': 'Pay attention to your emotions. Consider water-based activities like swimming or meditation.',
      'fire': 'Channel your passion into creative projects. Take bold action on your goals.',
      'snake': 'Embrace transformation. Let go of old patterns and welcome new growth.',
      'bird': 'Seek freedom and new experiences. Communicate your thoughts and feelings.',
      'tree': 'Focus on growth and stability. Nurture your relationships and goals.',
      'mountain': 'Set ambitious goals and work steadily toward them. Don\'t give up on challenges.',
      'house': 'Focus on home and family. Create a safe and comfortable environment.',
      'road': 'Make important decisions about your life direction. Trust your path.',
    };

    return actionAdvice[dreamSymbol.toLowerCase()] ?? 'Reflect on your dream and take inspired action.';
  }

  /// Get dream journal entry template
  static Map<String, dynamic> getDreamJournalTemplate() {
    return {
      'date': DateTime.now(),
      'dream_description': '',
      'emotions_felt': '',
      'symbols_noticed': [],
      'interpretation': '',
      'philosophical_meaning': '',
      'action_plan': '',
      'gratitude': '',
    };
  }

  /// Format dream date in Sri Lankan style
  static String formatDreamDate(DateTime date) {
    const months = [
      'ජනවාරි', 'පෙබරවාරි', 'මාර්තු', 'අප්‍රේල්', 'මැයි', 'ජුනි',
      'ජූලි', 'අගෝස්තු', 'සැප්තැම්බර්', 'ඔක්තෝබර්', 'නොවැම්බර්', 'දෙසැම්බර්'
    ];
    
    return '${date.day} ${months[date.month - 1]}, ${date.year}';
  }
}



