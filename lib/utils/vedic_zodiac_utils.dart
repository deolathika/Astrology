import 'package:flutter/material.dart';

/// Vedic Zodiac (Indian Astrology) Utility Functions
/// 
/// This class provides comprehensive Vedic astrology calculations including:
/// - Rashi (Moon sign) calculations
/// - Nakshatra (lunar mansion) calculations
/// - Planetary positions
/// - Vedic zodiac information and traits
class VedicZodiacUtils {
  /// Vedic zodiac signs (Rashi) with their Sanskrit names
  static const Map<String, String> vedicSigns = {
    'Aries': 'Mesha',
    'Taurus': 'Vrishabha', 
    'Gemini': 'Mithuna',
    'Cancer': 'Karka',
    'Leo': 'Simha',
    'Virgo': 'Kanya',
    'Libra': 'Tula',
    'Scorpio': 'Vrishchika',
    'Sagittarius': 'Dhanu',
    'Capricorn': 'Makara',
    'Aquarius': 'Kumbha',
    'Pisces': 'Meena',
  };

  /// Nakshatras (lunar mansions) with their rulers
  static const Map<String, Map<String, dynamic>> nakshatras = {
    'Ashwini': {'ruler': 'Ketu', 'symbol': 'Horse Head', 'deity': 'Ashwini Kumaras'},
    'Bharani': {'ruler': 'Venus', 'symbol': 'Vagina', 'deity': 'Yama'},
    'Krittika': {'ruler': 'Sun', 'symbol': 'Razor', 'deity': 'Agni'},
    'Rohini': {'ruler': 'Moon', 'symbol': 'Cart', 'deity': 'Brahma'},
    'Mrigashira': {'ruler': 'Mars', 'symbol': 'Deer Head', 'deity': 'Soma'},
    'Ardra': {'ruler': 'Rahu', 'symbol': 'Teardrop', 'deity': 'Rudra'},
    'Punarvasu': {'ruler': 'Jupiter', 'symbol': 'Bow', 'deity': 'Aditi'},
    'Pushya': {'ruler': 'Saturn', 'symbol': 'Flower', 'deity': 'Brihaspati'},
    'Ashlesha': {'ruler': 'Mercury', 'symbol': 'Serpent', 'deity': 'Nagas'},
    'Magha': {'ruler': 'Ketu', 'symbol': 'Throne', 'deity': 'Pitrs'},
    'Purva Phalguni': {'ruler': 'Venus', 'symbol': 'Hammock', 'deity': 'Bhaga'},
    'Uttara Phalguni': {'ruler': 'Sun', 'symbol': 'Fig Tree', 'deity': 'Aryaman'},
    'Hasta': {'ruler': 'Moon', 'symbol': 'Hand', 'deity': 'Savitar'},
    'Chitra': {'ruler': 'Mars', 'symbol': 'Pearl', 'deity': 'Vishwakarma'},
    'Swati': {'ruler': 'Rahu', 'symbol': 'Sword', 'deity': 'Vayu'},
    'Vishakha': {'ruler': 'Jupiter', 'symbol': 'Archway', 'deity': 'Indra-Agni'},
    'Anuradha': {'ruler': 'Saturn', 'symbol': 'Lotus', 'deity': 'Mitra'},
    'Jyeshtha': {'ruler': 'Mercury', 'symbol': 'Earring', 'deity': 'Indra'},
    'Mula': {'ruler': 'Ketu', 'symbol': 'Root', 'deity': 'Nirriti'},
    'Purva Ashadha': {'ruler': 'Venus', 'symbol': 'Fan', 'deity': 'Apas'},
    'Uttara Ashadha': {'ruler': 'Sun', 'symbol': 'Elephant Tusk', 'deity': 'Vishvedevas'},
    'Shravana': {'ruler': 'Moon', 'symbol': 'Ear', 'deity': 'Vishnu'},
    'Dhanishtha': {'ruler': 'Mars', 'symbol': 'Drum', 'deity': 'Vasus'},
    'Shatabhisha': {'ruler': 'Rahu', 'symbol': '100 Stars', 'deity': 'Varuna'},
    'Purva Bhadrapada': {'ruler': 'Jupiter', 'symbol': 'Sword', 'deity': 'Aja Ekapada'},
    'Uttara Bhadrapada': {'ruler': 'Saturn', 'symbol': 'Snake', 'deity': 'Ahir Budhnya'},
    'Revati': {'ruler': 'Mercury', 'symbol': 'Fish', 'deity': 'Pushan'},
  };

  /// Calculates the Vedic Rashi (Moon sign) based on birth date
  /// Note: This is a simplified calculation. For accurate results, 
  /// you would need to use astronomical calculations with precise birth time and location
  static String getVedicRashi(DateTime birthDate, {TimeOfDay? birthTime, String? placeOfBirth}) {
    // For now, we'll use a simplified calculation based on Western zodiac
    // In a real implementation, you would use astronomical libraries
    final westernSign = _getWesternSignForVedic(birthDate);
    return vedicSigns[westernSign] ?? 'Unknown';
  }

  /// Gets the Western zodiac sign for Vedic calculation
  static String _getWesternSignForVedic(DateTime birthDate) {
    final month = birthDate.month;
    final day = birthDate.day;

    if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return 'Aries';
    if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return 'Taurus';
    if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return 'Gemini';
    if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return 'Cancer';
    if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return 'Leo';
    if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return 'Virgo';
    if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return 'Libra';
    if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return 'Scorpio';
    if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return 'Sagittarius';
    if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) return 'Capricorn';
    if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return 'Aquarius';
    if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) return 'Pisces';
    
    return 'Unknown';
  }

  /// Calculates the Nakshatra (lunar mansion) based on birth date
  /// This is a simplified calculation - real implementation would need precise astronomical data
  static String getNakshatra(DateTime birthDate, {TimeOfDay? birthTime, String? placeOfBirth}) {
    // Simplified nakshatra calculation based on date
    // In reality, this requires complex astronomical calculations
    final dayOfYear = birthDate.difference(DateTime(birthDate.year, 1, 1)).inDays;
    final nakshatraIndex = (dayOfYear * 27 / 365).floor() % 27;
    final nakshatraNames = nakshatras.keys.toList();
    return nakshatraNames[nakshatraIndex];
  }

  /// Gets comprehensive Vedic zodiac information
  static Map<String, dynamic> getVedicZodiacInfo(String rashi) {
    final vedicData = {
      'Mesha': {
        'sanskritName': 'Mesha',
        'englishName': 'Aries',
        'element': 'Fire',
        'quality': 'Cardinal',
        'ruler': 'Mars',
        'symbol': 'Ram',
        'bodyPart': 'Head',
        'colors': ['Red', 'Crimson'],
        'gemstone': 'Red Coral',
        'luckyNumbers': [1, 8, 17],
        'traits': 'Courageous, pioneering, energetic, impulsive, leadership qualities',
        'description': 'Mesha natives are natural leaders with fiery energy. They are courageous, pioneering, and always ready to take on new challenges.',
        'compatibleRashis': ['Simha', 'Dhanu', 'Mithuna'],
        'incompatibleRashis': ['Karka', 'Tula', 'Makara'],
      },
      'Vrishabha': {
        'sanskritName': 'Vrishabha',
        'englishName': 'Taurus',
        'element': 'Earth',
        'quality': 'Fixed',
        'ruler': 'Venus',
        'symbol': 'Bull',
        'bodyPart': 'Face',
        'colors': ['Green', 'Pink'],
        'gemstone': 'Diamond',
        'luckyNumbers': [2, 4, 6, 11, 20],
        'traits': 'Stable, patient, practical, sensual, determined',
        'description': 'Vrishabha natives are known for their stability and patience. They are practical, sensual, and have a strong connection to material comforts.',
        'compatibleRashis': ['Kanya', 'Makara', 'Meena'],
        'incompatibleRashis': ['Vrishchika', 'Kumbha', 'Mesha'],
      },
      'Mithuna': {
        'sanskritName': 'Mithuna',
        'englishName': 'Gemini',
        'element': 'Air',
        'quality': 'Mutable',
        'ruler': 'Mercury',
        'symbol': 'Twins',
        'bodyPart': 'Arms',
        'colors': ['Yellow', 'Light Green'],
        'gemstone': 'Emerald',
        'luckyNumbers': [5, 7, 14, 23],
        'traits': 'Intellectual, communicative, adaptable, curious, versatile',
        'description': 'Mithuna natives are intellectual and communicative. They are adaptable, curious, and have a natural gift for learning and teaching.',
        'compatibleRashis': ['Tula', 'Kumbha', 'Mesha'],
        'incompatibleRashis': ['Dhanu', 'Meena', 'Vrishabha'],
      },
      'Karka': {
        'sanskritName': 'Karka',
        'englishName': 'Cancer',
        'element': 'Water',
        'quality': 'Cardinal',
        'ruler': 'Moon',
        'symbol': 'Crab',
        'bodyPart': 'Chest',
        'colors': ['Silver', 'White'],
        'gemstone': 'Pearl',
        'luckyNumbers': [2, 7, 11, 20],
        'traits': 'Emotional, intuitive, protective, nurturing, family-oriented',
        'description': 'Karka natives are deeply emotional and intuitive. They are protective, nurturing, and have a strong connection to family and home.',
        'compatibleRashis': ['Vrishchika', 'Meena', 'Vrishabha'],
        'incompatibleRashis': ['Makara', 'Kumbha', 'Mithuna'],
      },
      'Simha': {
        'sanskritName': 'Simha',
        'englishName': 'Leo',
        'element': 'Fire',
        'quality': 'Fixed',
        'ruler': 'Sun',
        'symbol': 'Lion',
        'bodyPart': 'Heart',
        'colors': ['Gold', 'Orange'],
        'gemstone': 'Ruby',
        'luckyNumbers': [1, 3, 10, 19],
        'traits': 'Confident, generous, creative, dramatic, leadership qualities',
        'description': 'Simha natives are natural leaders with a regal presence. They are confident, generous, and have a natural flair for drama and creativity.',
        'compatibleRashis': ['Mesha', 'Dhanu', 'Karka'],
        'incompatibleRashis': ['Kanya', 'Tula', 'Vrishchika'],
      },
      'Kanya': {
        'sanskritName': 'Kanya',
        'englishName': 'Virgo',
        'element': 'Earth',
        'quality': 'Mutable',
        'ruler': 'Mercury',
        'symbol': 'Virgin',
        'bodyPart': 'Abdomen',
        'colors': ['Gray', 'Beige'],
        'gemstone': 'Emerald',
        'luckyNumbers': [5, 14, 23],
        'traits': 'Analytical, practical, hardworking, detail-oriented, service-minded',
        'description': 'Kanya natives are analytical and practical. They are hardworking, detail-oriented, and have a strong desire to be of service to others.',
        'compatibleRashis': ['Vrishabha', 'Makara', 'Simha'],
        'incompatibleRashis': ['Dhanu', 'Meena', 'Karka'],
      },
      'Tula': {
        'sanskritName': 'Tula',
        'englishName': 'Libra',
        'element': 'Air',
        'quality': 'Cardinal',
        'ruler': 'Venus',
        'symbol': 'Scales',
        'bodyPart': 'Kidneys',
        'colors': ['Pink', 'Green'],
        'gemstone': 'Diamond',
        'luckyNumbers': [6, 15, 24],
        'traits': 'Diplomatic, charming, artistic, relationship-oriented, balanced',
        'description': 'Tula natives are diplomatic and charming. They are artistic, relationship-oriented, and have a natural ability to create harmony and balance.',
        'compatibleRashis': ['Mithuna', 'Kumbha', 'Kanya'],
        'incompatibleRashis': ['Mesha', 'Karka', 'Vrishabha'],
      },
      'Vrishchika': {
        'sanskritName': 'Vrishchika',
        'englishName': 'Scorpio',
        'element': 'Water',
        'quality': 'Fixed',
        'ruler': 'Mars',
        'symbol': 'Scorpion',
        'bodyPart': 'Genitals',
        'colors': ['Black', 'Red'],
        'gemstone': 'Red Coral',
        'luckyNumbers': [9, 18, 27],
        'traits': 'Intense, passionate, mysterious, transformative, powerful',
        'description': 'Vrishchika natives are intense and passionate. They are mysterious, transformative, and have a powerful presence that can be both magnetic and intimidating.',
        'compatibleRashis': ['Karka', 'Meena', 'Vrishabha'],
        'incompatibleRashis': ['Dhanu', 'Kumbha', 'Mithuna'],
      },
      'Dhanu': {
        'sanskritName': 'Dhanu',
        'englishName': 'Sagittarius',
        'element': 'Fire',
        'quality': 'Mutable',
        'ruler': 'Jupiter',
        'symbol': 'Archer',
        'bodyPart': 'Thighs',
        'colors': ['Purple', 'Dark Blue'],
        'gemstone': 'Yellow Sapphire',
        'luckyNumbers': [3, 12, 21],
        'traits': 'Adventurous, philosophical, optimistic, freedom-loving, wise',
        'description': 'Dhanu natives are adventurous and philosophical. They are optimistic, freedom-loving, and have a natural wisdom that comes from their love of learning and exploration.',
        'compatibleRashis': ['Mesha', 'Simha', 'Tula'],
        'incompatibleRashis': ['Kanya', 'Vrishchika', 'Karka'],
      },
      'Makara': {
        'sanskritName': 'Makara',
        'englishName': 'Capricorn',
        'element': 'Earth',
        'quality': 'Cardinal',
        'ruler': 'Saturn',
        'symbol': 'Crocodile',
        'bodyPart': 'Knees',
        'colors': ['Brown', 'Gray'],
        'gemstone': 'Blue Sapphire',
        'luckyNumbers': [4, 8, 13, 22],
        'traits': 'Ambitious, disciplined, responsible, practical, determined',
        'description': 'Makara natives are ambitious and disciplined. They are responsible, practical, and have a strong determination to achieve their goals through hard work and perseverance.',
        'compatibleRashis': ['Vrishabha', 'Kanya', 'Vrishchika'],
        'incompatibleRashis': ['Mesha', 'Karka', 'Simha'],
      },
      'Kumbha': {
        'sanskritName': 'Kumbha',
        'englishName': 'Aquarius',
        'element': 'Air',
        'quality': 'Fixed',
        'ruler': 'Saturn',
        'symbol': 'Water Bearer',
        'bodyPart': 'Ankles',
        'colors': ['Blue', 'Silver'],
        'gemstone': 'Blue Sapphire',
        'luckyNumbers': [4, 7, 11, 22],
        'traits': 'Innovative, independent, humanitarian, progressive, original',
        'description': 'Kumbha natives are innovative and independent. They are humanitarian, progressive, and have a natural ability to think outside the box and bring about positive change.',
        'compatibleRashis': ['Mithuna', 'Tula', 'Dhanu'],
        'incompatibleRashis': ['Vrishabha', 'Karka', 'Kanya'],
      },
      'Meena': {
        'sanskritName': 'Meena',
        'englishName': 'Pisces',
        'element': 'Water',
        'quality': 'Mutable',
        'ruler': 'Jupiter',
        'symbol': 'Fish',
        'bodyPart': 'Feet',
        'colors': ['Sea Green', 'Violet'],
        'gemstone': 'Yellow Sapphire',
        'luckyNumbers': [3, 7, 12, 21],
        'traits': 'Compassionate, artistic, intuitive, spiritual, empathetic',
        'description': 'Meena natives are compassionate and artistic. They are intuitive, spiritual, and have a natural empathy that allows them to connect deeply with others and the world around them.',
        'compatibleRashis': ['Karka', 'Vrishchika', 'Kumbha'],
        'incompatibleRashis': ['Mithuna', 'Kanya', 'Simha'],
      },
    };

    return vedicData[rashi] ?? {};
  }

  /// Gets Nakshatra information
  static Map<String, dynamic> getNakshatraInfo(String nakshatraName) {
    return nakshatras[nakshatraName] ?? {};
  }

  /// Calculates planetary positions (simplified)
  /// In a real implementation, this would use astronomical calculations
  static Map<String, dynamic> getPlanetaryPositions(DateTime birthDate, {String? placeOfBirth}) {
    // This is a placeholder - real implementation would use Swiss Ephemeris or similar
    return {
      'Sun': {'sign': _getWesternSignForVedic(birthDate), 'degree': 15.0},
      'Moon': {'sign': _getWesternSignForVedic(birthDate), 'degree': 25.0},
      'Mars': {'sign': _getWesternSignForVedic(birthDate), 'degree': 5.0},
      'Mercury': {'sign': _getWesternSignForVedic(birthDate), 'degree': 20.0},
      'Jupiter': {'sign': _getWesternSignForVedic(birthDate), 'degree': 10.0},
      'Venus': {'sign': _getWesternSignForVedic(birthDate), 'degree': 30.0},
      'Saturn': {'sign': _getWesternSignForVedic(birthDate), 'degree': 8.0},
      'Rahu': {'sign': _getWesternSignForVedic(birthDate), 'degree': 12.0},
      'Ketu': {'sign': _getWesternSignForVedic(birthDate), 'degree': 18.0},
    };
  }

  /// Gets Vedic compatibility between two rashis
  static Map<String, dynamic> getVedicCompatibility(String rashi1, String rashi2) {
    final compatibilityData = {
      'excellent': [
        ['Mesha', 'Simha'], ['Mesha', 'Dhanu'], ['Mesha', 'Mithuna'],
        ['Vrishabha', 'Kanya'], ['Vrishabha', 'Makara'], ['Vrishabha', 'Meena'],
        ['Mithuna', 'Tula'], ['Mithuna', 'Kumbha'], ['Mithuna', 'Mesha'],
        ['Karka', 'Vrishchika'], ['Karka', 'Meena'], ['Karka', 'Vrishabha'],
        ['Simha', 'Mesha'], ['Simha', 'Dhanu'], ['Simha', 'Karka'],
        ['Kanya', 'Vrishabha'], ['Kanya', 'Makara'], ['Kanya', 'Simha'],
        ['Tula', 'Mithuna'], ['Tula', 'Kumbha'], ['Tula', 'Kanya'],
        ['Vrishchika', 'Karka'], ['Vrishchika', 'Meena'], ['Vrishchika', 'Vrishabha'],
        ['Dhanu', 'Mesha'], ['Dhanu', 'Simha'], ['Dhanu', 'Tula'],
        ['Makara', 'Vrishabha'], ['Makara', 'Kanya'], ['Makara', 'Vrishchika'],
        ['Kumbha', 'Mithuna'], ['Kumbha', 'Tula'], ['Kumbha', 'Dhanu'],
        ['Meena', 'Karka'], ['Meena', 'Vrishchika'], ['Meena', 'Kumbha'],
      ],
      'good': [
        ['Mesha', 'Kanya'], ['Mesha', 'Tula'], ['Vrishabha', 'Mithuna'],
        ['Vrishabha', 'Tula'], ['Mithuna', 'Kanya'], ['Mithuna', 'Vrishchika'],
        ['Karka', 'Mithuna'], ['Karka', 'Kanya'], ['Simha', 'Tula'],
        ['Simha', 'Vrishchika'], ['Kanya', 'Mithuna'], ['Kanya', 'Karka'],
        ['Tula', 'Vrishabha'], ['Tula', 'Karka'], ['Vrishchika', 'Mithuna'],
        ['Vrishchika', 'Kanya'], ['Dhanu', 'Kanya'], ['Dhanu', 'Vrishchika'],
        ['Makara', 'Mithuna'], ['Makara', 'Tula'], ['Kumbha', 'Vrishabha'],
        ['Kumbha', 'Karka'], ['Meena', 'Mithuna'], ['Meena', 'Tula'],
      ],
      'moderate': [
        ['Mesha', 'Vrishabha'], ['Mesha', 'Karka'], ['Mesha', 'Vrishchika'],
        ['Mesha', 'Makara'], ['Vrishabha', 'Mesha'], ['Vrishabha', 'Simha'],
        ['Vrishabha', 'Dhanu'], ['Mithuna', 'Simha'], ['Mithuna', 'Makara'],
        ['Mithuna', 'Meena'], ['Karka', 'Mesha'], ['Karka', 'Simha'],
        ['Karka', 'Dhanu'], ['Simha', 'Vrishabha'], ['Simha', 'Kumbha'],
        ['Kanya', 'Dhanu'], ['Kanya', 'Kumbha'], ['Tula', 'Simha'],
        ['Tula', 'Dhanu'], ['Vrishchika', 'Simha'], ['Vrishchika', 'Dhanu'],
        ['Dhanu', 'Vrishabha'], ['Dhanu', 'Kumbha'], ['Makara', 'Mesha'],
        ['Makara', 'Dhanu'], ['Kumbha', 'Simha'], ['Kumbha', 'Meena'],
        ['Meena', 'Vrishabha'], ['Meena', 'Dhanu'],
      ],
      'challenging': [
        ['Mesha', 'Meena'], ['Vrishabha', 'Vrishchika'], ['Vrishabha', 'Kumbha'],
        ['Mithuna', 'Karka'], ['Karka', 'Makara'], ['Karka', 'Kumbha'],
        ['Simha', 'Kanya'], ['Simha', 'Meena'], ['Kanya', 'Tula'],
        ['Kanya', 'Vrishchika'], ['Tula', 'Makara'], ['Tula', 'Meena'],
        ['Vrishchika', 'Tula'], ['Vrishchika', 'Makara'], ['Dhanu', 'Karka'],
        ['Dhanu', 'Meena'], ['Makara', 'Karka'], ['Makara', 'Kumbha'],
        ['Kumbha', 'Vrishabha'], ['Kumbha', 'Vrishchika'], ['Meena', 'Mesha'],
        ['Meena', 'Kanya'],
      ],
    };

    // Check compatibility level
    for (final level in compatibilityData.keys) {
      for (final pair in compatibilityData[level]!) {
        if ((pair[0] == rashi1 && pair[1] == rashi2) || 
            (pair[0] == rashi2 && pair[1] == rashi1)) {
          return {
            'level': level,
            'score': _getCompatibilityScore(level),
            'description': _getCompatibilityDescription(level),
            'advice': _getCompatibilityAdvice(level),
          };
        }
      }
    }

    return {
      'level': 'unknown',
      'score': 50,
      'description': 'Compatibility information not available',
      'advice': 'Consider consulting a Vedic astrologer for detailed analysis',
    };
  }

  static int _getCompatibilityScore(String level) {
    switch (level) {
      case 'excellent': return 90;
      case 'good': return 75;
      case 'moderate': return 60;
      case 'challenging': return 40;
      default: return 50;
    }
  }

  static String _getCompatibilityDescription(String level) {
    switch (level) {
      case 'excellent': return 'These signs have excellent compatibility with natural harmony and understanding.';
      case 'good': return 'These signs have good compatibility with potential for a harmonious relationship.';
      case 'moderate': return 'These signs have moderate compatibility with some challenges but potential for growth.';
      case 'challenging': return 'These signs may face challenges but can work with understanding and effort.';
      default: return 'Compatibility analysis not available.';
    }
  }

  static String _getCompatibilityAdvice(String level) {
    switch (level) {
      case 'excellent': return 'This is a naturally harmonious combination. Focus on communication and shared goals.';
      case 'good': return 'This combination has good potential. Work on understanding each other\'s differences.';
      case 'moderate': return 'This combination requires patience and understanding. Focus on common ground.';
      case 'challenging': return 'This combination may require extra effort. Focus on mutual respect and communication.';
      default: return 'Consider consulting a Vedic astrologer for detailed compatibility analysis.';
    }
  }

  /// Formats Vedic date information
  static String formatVedicDate(DateTime date) {
    const months = [
      'Chaitra', 'Vaishakha', 'Jyaishtha', 'Ashadha', 'Shravana', 'Bhadrapada',
      'Ashwin', 'Kartika', 'Margashirsha', 'Pausha', 'Magha', 'Phalguna'
    ];
    
    // Simplified calculation - real implementation would use proper Vedic calendar
    final monthIndex = (date.month - 1) % 12;
    return '${date.day} ${months[monthIndex]}, ${date.year}';
  }
}
