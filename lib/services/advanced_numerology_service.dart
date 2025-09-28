
/// Advanced Numerology Service with comprehensive calculations
class AdvancedNumerologyService {
  
  /// Calculate Life Path Number (enhanced)
  static int calculateLifePathNumber(DateTime birthDate) {
    int day = birthDate.day;
    int month = birthDate.month;
    int year = birthDate.year;
    
    int daySum = _reduceToSingleDigit(day);
    int monthSum = _reduceToSingleDigit(month);
    int yearSum = _reduceToSingleDigit(year);
    
    int total = daySum + monthSum + yearSum;
    return _reduceToSingleDigit(total);
  }

  /// Calculate Expression Number (Destiny Number)
  static int calculateExpressionNumber(String fullName) {
    String cleanName = fullName.replaceAll(RegExp(r'[^a-zA-Z]'), '').toUpperCase();
    int sum = 0;
    
    for (int i = 0; i < cleanName.length; i++) {
      sum += _getLetterValue(cleanName[i]);
    }
    
    return _reduceToSingleDigit(sum);
  }

  /// Calculate Soul Urge Number (Heart's Desire)
  static int calculateSoulUrgeNumber(String fullName) {
    String vowels = _extractVowels(fullName);
    int sum = 0;
    
    for (int i = 0; i < vowels.length; i++) {
      sum += _getLetterValue(vowels[i]);
    }
    
    return _reduceToSingleDigit(sum);
  }

  /// Calculate Personality Number
  static int calculatePersonalityNumber(String fullName) {
    String consonants = _extractConsonants(fullName);
    int sum = 0;
    
    for (int i = 0; i < consonants.length; i++) {
      sum += _getLetterValue(consonants[i]);
    }
    
    return _reduceToSingleDigit(sum);
  }

  /// Calculate Birthday Number
  static int calculateBirthdayNumber(DateTime birthDate) {
    return _reduceToSingleDigit(birthDate.day);
  }

  /// Calculate Personal Year Number
  static int calculatePersonalYearNumber(DateTime birthDate, int year) {
    int day = birthDate.day;
    int month = birthDate.month;
    
    int daySum = _reduceToSingleDigit(day);
    int monthSum = _reduceToSingleDigit(month);
    int yearSum = _reduceToSingleDigit(year);
    
    int total = daySum + monthSum + yearSum;
    return _reduceToSingleDigit(total);
  }

  /// Calculate Master Numbers (11, 22, 33)
  static bool isMasterNumber(int number) {
    return number == 11 || number == 22 || number == 33;
  }

  /// Calculate Karmic Debt Numbers
  static List<int> getKarmicDebtNumbers(String fullName) {
    String cleanName = fullName.replaceAll(RegExp(r'[^a-zA-Z]'), '').toUpperCase();
    List<int> karmicNumbers = [];
    
    for (int i = 0; i < cleanName.length; i++) {
      int value = _getLetterValue(cleanName[i]);
      if (value == 13 || value == 14 || value == 16 || value == 19) {
        karmicNumbers.add(value);
      }
    }
    
    return karmicNumbers.toSet().toList();
  }

  /// Calculate Pinnacle Numbers
  static Map<String, int> calculatePinnacleNumbers(DateTime birthDate) {
    int day = birthDate.day;
    int month = birthDate.month;
    int year = birthDate.year;
    
    int firstPinnacle = _reduceToSingleDigit(day + month);
    int secondPinnacle = _reduceToSingleDigit(day + year);
    int thirdPinnacle = _reduceToSingleDigit(firstPinnacle + secondPinnacle);
    int fourthPinnacle = _reduceToSingleDigit(month + year);
    
    return {
      'first': firstPinnacle,
      'second': secondPinnacle,
      'third': thirdPinnacle,
      'fourth': fourthPinnacle,
    };
  }

  /// Calculate Numerology Compatibility
  static Map<String, dynamic> calculateCompatibility(
    Map<String, int> person1Numbers,
    Map<String, int> person2Numbers,
  ) {
    int compatibility = 0;
    List<String> strengths = [];
    List<String> challenges = [];
    
    // Life Path compatibility
    if (person1Numbers['lifePath'] == person2Numbers['lifePath']) {
      compatibility += 30;
      strengths.add('Same Life Path - Deep understanding');
    } else if (_areCompatibleNumbers(person1Numbers['lifePath']!, person2Numbers['lifePath']!)) {
      compatibility += 20;
      strengths.add('Compatible Life Paths');
    } else {
      challenges.add('Different Life Path approaches');
    }
    
    // Expression Number compatibility
    if (person1Numbers['expression'] == person2Numbers['expression']) {
      compatibility += 25;
      strengths.add('Similar life purposes');
    }
    
    // Soul Urge compatibility
    if (person1Numbers['soulUrge'] == person2Numbers['soulUrge']) {
      compatibility += 25;
      strengths.add('Compatible heart desires');
    }
    
    // Birthday compatibility
    int birthdayDiff = (person1Numbers['birthday']! - person2Numbers['birthday']!).abs();
    if (birthdayDiff <= 2) {
      compatibility += 20;
      strengths.add('Compatible personalities');
    }
    
    return {
      'compatibility_score': compatibility.clamp(0, 100),
      'strengths': strengths,
      'challenges': challenges,
      'recommendation': _getCompatibilityRecommendation(compatibility),
    };
  }

  /// Get comprehensive numerology reading
  static Map<String, dynamic> getComprehensiveReading({
    required String fullName,
    required DateTime birthDate,
    int? currentYear,
  }) {
    currentYear ??= DateTime.now().year;
    
    int lifePath = calculateLifePathNumber(birthDate);
    int expression = calculateExpressionNumber(fullName);
    int soulUrge = calculateSoulUrgeNumber(fullName);
    int personality = calculatePersonalityNumber(fullName);
    int birthday = calculateBirthdayNumber(birthDate);
    int personalYear = calculatePersonalYearNumber(birthDate, currentYear);
    
    List<int> karmicDebt = getKarmicDebtNumbers(fullName);
    Map<String, int> pinnacles = calculatePinnacleNumbers(birthDate);
    
    return {
      'life_path': {
        'number': lifePath,
        'meaning': _getLifePathMeaning(lifePath),
        'is_master': isMasterNumber(lifePath),
      },
      'expression': {
        'number': expression,
        'meaning': _getExpressionMeaning(expression),
        'is_master': isMasterNumber(expression),
      },
      'soul_urge': {
        'number': soulUrge,
        'meaning': _getSoulUrgeMeaning(soulUrge),
        'is_master': isMasterNumber(soulUrge),
      },
      'personality': {
        'number': personality,
        'meaning': _getPersonalityMeaning(personality),
        'is_master': isMasterNumber(personality),
      },
      'birthday': {
        'number': birthday,
        'meaning': _getBirthdayMeaning(birthday),
      },
      'personal_year': {
        'number': personalYear,
        'year': currentYear,
        'meaning': _getPersonalYearMeaning(personalYear),
      },
      'karmic_debt': {
        'numbers': karmicDebt,
        'meaning': _getKarmicDebtMeaning(karmicDebt),
      },
      'pinnacles': pinnacles,
      'summary': _generateNumerologySummary({
        'lifePath': lifePath,
        'expression': expression,
        'soulUrge': soulUrge,
        'personality': personality,
        'birthday': birthday,
        'personalYear': personalYear,
      }),
    };
  }

  // Helper methods
  static int _reduceToSingleDigit(int number) {
    while (number > 9 && number != 11 && number != 22 && number != 33) {
      int sum = 0;
      while (number > 0) {
        sum += number % 10;
        number ~/= 10;
      }
      number = sum;
    }
    return number;
  }

  static int _getLetterValue(String letter) {
    Map<String, int> letterValues = {
      'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
      'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 6, 'P': 7, 'Q': 8, 'R': 9,
      'S': 1, 'T': 2, 'U': 3, 'V': 4, 'W': 5, 'X': 6, 'Y': 7, 'Z': 8,
    };
    return letterValues[letter] ?? 0;
  }

  static String _extractVowels(String name) {
    return name.replaceAll(RegExp(r'[^AEIOU]'), '').toUpperCase();
  }

  static String _extractConsonants(String name) {
    return name.replaceAll(RegExp(r'[AEIOU]'), '').toUpperCase();
  }

  static bool _areCompatibleNumbers(int num1, int num2) {
    // Compatible number pairs
    List<List<int>> compatiblePairs = [
      [1, 5, 7],
      [2, 4, 8],
      [3, 6, 9],
      [11, 22, 33],
    ];
    
    for (List<int> pair in compatiblePairs) {
      if (pair.contains(num1) && pair.contains(num2)) {
        return true;
      }
    }
    return false;
  }

  static String _getCompatibilityRecommendation(int score) {
    if (score >= 80) return 'Excellent compatibility - strong foundation';
    if (score >= 60) return 'Good compatibility - some areas to work on';
    if (score >= 40) return 'Moderate compatibility - requires effort';
    return 'Challenging compatibility - needs understanding and patience';
  }

  // Meaning interpretations
  static String _getLifePathMeaning(int number) {
    Map<int, String> meanings = {
      1: 'Natural leader, independent, pioneering spirit',
      2: 'Cooperative, diplomatic, peacemaker',
      3: 'Creative, expressive, optimistic',
      4: 'Practical, organized, hardworking',
      5: 'Adventurous, freedom-loving, versatile',
      6: 'Nurturing, responsible, family-oriented',
      7: 'Spiritual, analytical, seeker of truth',
      8: 'Ambitious, material success, authority',
      9: 'Humanitarian, compassionate, wise',
      11: 'Intuitive, inspirational, spiritual teacher',
      22: 'Master builder, practical visionary',
      33: 'Master teacher, compassionate healer',
    };
    return meanings[number] ?? 'Unique spiritual path';
  }

  static String _getExpressionMeaning(int number) {
    Map<int, String> meanings = {
      1: 'Natural born leader with strong willpower',
      2: 'Diplomatic and cooperative nature',
      3: 'Creative and artistic expression',
      4: 'Practical and methodical approach',
      5: 'Versatile and freedom-loving',
      6: 'Nurturing and responsible nature',
      7: 'Spiritual and analytical mind',
      8: 'Ambitious and material success',
      9: 'Humanitarian and compassionate',
      11: 'Intuitive and inspirational',
      22: 'Master builder and visionary',
      33: 'Master teacher and healer',
    };
    return meanings[number] ?? 'Unique expression of talents';
  }

  static String _getSoulUrgeMeaning(int number) {
    Map<int, String> meanings = {
      1: 'Desire for independence and leadership',
      2: 'Need for partnership and harmony',
      3: 'Craving for creative expression',
      4: 'Desire for security and stability',
      5: 'Need for freedom and adventure',
      6: 'Desire to nurture and care for others',
      7: 'Need for spiritual understanding',
      8: 'Desire for material success',
      9: 'Need to serve humanity',
      11: 'Desire for spiritual enlightenment',
      22: 'Need to build something lasting',
      33: 'Desire to heal and teach others',
    };
    return meanings[number] ?? 'Unique soul purpose';
  }

  static String _getPersonalityMeaning(int number) {
    Map<int, String> meanings = {
      1: 'Confident and assertive personality',
      2: 'Gentle and diplomatic nature',
      3: 'Charming and creative personality',
      4: 'Reliable and practical nature',
      5: 'Dynamic and adventurous personality',
      6: 'Caring and responsible nature',
      7: 'Mysterious and analytical personality',
      8: 'Ambitious and authoritative nature',
      9: 'Wise and compassionate personality',
      11: 'Intuitive and inspiring nature',
      22: 'Visionary and practical personality',
      33: 'Healing and teaching nature',
    };
    return meanings[number] ?? 'Unique personality traits';
  }

  static String _getBirthdayMeaning(int number) {
    Map<int, String> meanings = {
      1: 'Natural leadership abilities',
      2: 'Cooperative and diplomatic nature',
      3: 'Creative and expressive personality',
      4: 'Practical and organized approach',
      5: 'Adventurous and freedom-loving',
      6: 'Nurturing and responsible nature',
      7: 'Spiritual and analytical mind',
      8: 'Ambitious and material success',
      9: 'Humanitarian and compassionate',
    };
    return meanings[number] ?? 'Unique personal traits';
  }

  static String _getPersonalYearMeaning(int number) {
    Map<int, String> meanings = {
      1: 'New beginnings and fresh starts',
      2: 'Cooperation and partnership focus',
      3: 'Creative expression and communication',
      4: 'Hard work and building foundations',
      5: 'Change and adventure',
      6: 'Family and responsibility focus',
      7: 'Spiritual growth and introspection',
      8: 'Material success and achievement',
      9: 'Completion and humanitarian service',
    };
    return meanings[number] ?? 'Unique year energy';
  }

  static String _getKarmicDebtMeaning(List<int> numbers) {
    if (numbers.isEmpty) return 'No karmic debt numbers present';
    
    Map<int, String> meanings = {
      13: 'Karmic debt of laziness and lack of focus',
      14: 'Karmic debt of misuse of freedom',
      16: 'Karmic debt of ego and pride',
      19: 'Karmic debt of abuse of power',
    };
    
    List<String> meaningsList = numbers.map((n) => meanings[n] ?? 'Unknown karmic debt').toList();
    return 'Karmic lessons: ${meaningsList.join(', ')}';
  }

  static String _generateNumerologySummary(Map<String, int> numbers) {
    return '''
Your numerology reveals a ${_getLifePathMeaning(numbers['lifePath']!)} with a ${_getExpressionMeaning(numbers['expression']!)}. 
Your heart desires ${_getSoulUrgeMeaning(numbers['soulUrge']!)} and you present yourself as ${_getPersonalityMeaning(numbers['personality']!)}. 
This year brings ${_getPersonalYearMeaning(numbers['personalYear']!)} energy.
    '''.trim();
  }
}


