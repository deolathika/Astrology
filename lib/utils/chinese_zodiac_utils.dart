/// Chinese Zodiac Utility Functions
/// 
/// This class provides comprehensive Chinese astrology calculations including:
/// - Chinese zodiac animal sign calculations
/// - Five elements (Wu Xing) calculations
/// - Chinese zodiac compatibility
/// - Chinese zodiac information and traits
class ChineseZodiacUtils {
  /// Chinese zodiac animals with their years
  static const Map<String, List<int>> chineseAnimals = {
    'Rat': [1924, 1936, 1948, 1960, 1972, 1984, 1996, 2008, 2020, 2032],
    'Ox': [1925, 1937, 1949, 1961, 1973, 1985, 1997, 2009, 2021, 2033],
    'Tiger': [1926, 1938, 1950, 1962, 1974, 1986, 1998, 2010, 2022, 2034],
    'Rabbit': [1927, 1939, 1951, 1963, 1975, 1987, 1999, 2011, 2023, 2035],
    'Dragon': [1928, 1940, 1952, 1964, 1976, 1988, 2000, 2012, 2024, 2036],
    'Snake': [1929, 1941, 1953, 1965, 1977, 1989, 2001, 2013, 2025, 2037],
    'Horse': [1930, 1942, 1954, 1966, 1978, 1990, 2002, 2014, 2026, 2038],
    'Goat': [1931, 1943, 1955, 1967, 1979, 1991, 2003, 2015, 2027, 2039],
    'Monkey': [1932, 1944, 1956, 1968, 1980, 1992, 2004, 2016, 2028, 2040],
    'Rooster': [1933, 1945, 1957, 1969, 1981, 1993, 2005, 2017, 2029, 2041],
    'Dog': [1934, 1946, 1958, 1970, 1982, 1994, 2006, 2018, 2030, 2042],
    'Pig': [1935, 1947, 1959, 1971, 1983, 1995, 2007, 2019, 2031, 2043],
  };

  /// Five elements (Wu Xing) with their years
  static const Map<String, List<int>> fiveElements = {
    'Wood': [1924, 1925, 1934, 1935, 1944, 1945, 1954, 1955, 1964, 1965, 1974, 1975, 1984, 1985, 1994, 1995, 2004, 2005, 2014, 2015, 2024, 2025],
    'Fire': [1926, 1927, 1936, 1937, 1946, 1947, 1956, 1957, 1966, 1967, 1976, 1977, 1986, 1987, 1996, 1997, 2006, 2007, 2016, 2017, 2026, 2027],
    'Earth': [1928, 1929, 1938, 1939, 1948, 1949, 1958, 1959, 1968, 1969, 1978, 1979, 1988, 1989, 1998, 1999, 2008, 2009, 2018, 2019, 2028, 2029],
    'Metal': [1930, 1931, 1940, 1941, 1950, 1951, 1960, 1961, 1970, 1971, 1980, 1981, 1990, 1991, 2000, 2001, 2010, 2011, 2020, 2021, 2030, 2031],
    'Water': [1932, 1933, 1942, 1943, 1952, 1953, 1962, 1963, 1972, 1973, 1982, 1983, 1992, 1993, 2002, 2003, 2012, 2013, 2022, 2023, 2032, 2033],
  };

  /// Calculates the Chinese zodiac animal sign based on birth year
  static String getChineseZodiacSign(DateTime birthDate) {
    final year = birthDate.year;
    
    // Handle Chinese New Year (usually between Jan 21 - Feb 20)
    final chineseNewYear = _getChineseNewYear(year);
    final isBeforeChineseNewYear = birthDate.isBefore(chineseNewYear);
    final actualYear = isBeforeChineseNewYear ? year - 1 : year;
    
    for (final entry in chineseAnimals.entries) {
      if (entry.value.contains(actualYear)) {
        return entry.key;
      }
    }
    
    return 'Unknown';
  }

  /// Gets the Chinese New Year date for a given year
  static DateTime _getChineseNewYear(int year) {
    // Simplified calculation - real implementation would use precise lunar calendar
    // Chinese New Year typically falls between January 21 and February 20
    final baseDate = DateTime(year, 1, 21);
    final dayOffset = (year - 1900) % 19 * 11 % 30;
    return baseDate.add(Duration(days: dayOffset));
  }

  /// Calculates the Five Elements (Wu Xing) based on birth year
  static String getChineseElement(DateTime birthDate) {
    final year = birthDate.year;
    
    for (final entry in fiveElements.entries) {
      if (entry.value.contains(year)) {
        return entry.key;
      }
    }
    
    return 'Unknown';
  }

  /// Gets comprehensive Chinese zodiac information
  static Map<String, dynamic> getChineseZodiacInfo(String animalSign) {
    final chineseData = {
      'Rat': {
        'animal': 'Rat',
        'chineseName': '鼠 (Shǔ)',
        'element': getChineseElement(DateTime.now()),
        'personality': 'Intelligent, adaptable, quick-witted, charming',
        'strengths': ['Intelligent', 'Adaptable', 'Quick-witted', 'Charming', 'Artistic'],
        'weaknesses': ['Manipulative', 'Greedy', 'Selfish', 'Critical'],
        'colors': ['Blue', 'Gold', 'Green'],
        'luckyNumbers': [2, 3, 6, 8],
        'luckyDays': ['Monday', 'Wednesday'],
        'bestMatches': ['Dragon', 'Monkey', 'Ox'],
        'worstMatches': ['Horse', 'Goat'],
        'career': 'Business, politics, entertainment, writing',
        'description': 'Rats are intelligent and adaptable. They are quick-witted, charming, and have a natural ability to find opportunities in any situation.',
        'famousPeople': ['William Shakespeare', 'George Washington', 'Prince Charles'],
      },
      'Ox': {
        'animal': 'Ox',
        'chineseName': '牛 (Niú)',
        'element': getChineseElement(DateTime.now()),
        'personality': 'Diligent, dependable, strong, determined',
        'strengths': ['Diligent', 'Dependable', 'Strong', 'Determined', 'Patient'],
        'weaknesses': ['Stubborn', 'Conservative', 'Rigid'],
        'colors': ['Yellow', 'Green', 'Blue'],
        'luckyNumbers': [1, 4, 6, 9],
        'luckyDays': ['Tuesday', 'Thursday'],
        'bestMatches': ['Snake', 'Rooster', 'Rat'],
        'worstMatches': ['Goat', 'Horse'],
        'career': 'Farming, engineering, medicine, law',
        'description': 'Oxen are diligent and dependable. They are strong, determined, and have a natural ability to work hard and achieve their goals.',
        'famousPeople': ['Napoleon Bonaparte', 'Walt Disney', 'Barack Obama'],
      },
      'Tiger': {
        'animal': 'Tiger',
        'chineseName': '虎 (Hǔ)',
        'element': getChineseElement(DateTime.now()),
        'personality': 'Brave, confident, competitive, unpredictable',
        'strengths': ['Brave', 'Confident', 'Competitive', 'Passionate', 'Charismatic'],
        'weaknesses': ['Impulsive', 'Aggressive', 'Stubborn'],
        'colors': ['Orange', 'Red', 'Gold'],
        'luckyNumbers': [1, 3, 4, 7],
        'luckyDays': ['Monday', 'Friday'],
        'bestMatches': ['Horse', 'Dog', 'Dragon'],
        'worstMatches': ['Monkey', 'Snake'],
        'career': 'Leadership, sports, military, entertainment',
        'description': 'Tigers are brave and confident. They are competitive, passionate, and have a natural charisma that draws others to them.',
        'famousPeople': ['Leonardo DiCaprio', 'Tom Cruise', 'Marilyn Monroe'],
      },
      'Rabbit': {
        'animal': 'Rabbit',
        'chineseName': '兔 (Tù)',
        'element': getChineseElement(DateTime.now()),
        'personality': 'Gentle, quiet, elegant, alert, quick',
        'strengths': ['Gentle', 'Quiet', 'Elegant', 'Alert', 'Quick'],
        'weaknesses': ['Timid', 'Overly cautious', 'Moody'],
        'colors': ['Pink', 'Red', 'Purple'],
        'luckyNumbers': [3, 4, 6, 9],
        'luckyDays': ['Monday', 'Friday'],
        'bestMatches': ['Goat', 'Pig', 'Dog'],
        'worstMatches': ['Rooster', 'Rat'],
        'career': 'Arts, education, healthcare, counseling',
        'description': 'Rabbits are gentle and quiet. They are elegant, alert, and have a natural ability to sense danger and avoid conflict.',
        'famousPeople': ['Albert Einstein', 'Angelina Jolie', 'Johnny Depp'],
      },
      'Dragon': {
        'animal': 'Dragon',
        'chineseName': '龙 (Lóng)',
        'element': getChineseElement(DateTime.now()),
        'personality': 'Ambitious, brave, passionate, confident',
        'strengths': ['Ambitious', 'Brave', 'Passionate', 'Confident', 'Charismatic'],
        'weaknesses': ['Arrogant', 'Impatient', 'Intolerant'],
        'colors': ['Gold', 'Silver', 'Gray'],
        'luckyNumbers': [1, 6, 7, 8],
        'luckyDays': ['Monday', 'Sunday'],
        'bestMatches': ['Rat', 'Monkey', 'Rooster'],
        'worstMatches': ['Dog', 'Dragon'],
        'career': 'Leadership, politics, entertainment, business',
        'description': 'Dragons are ambitious and brave. They are passionate, confident, and have a natural charisma that makes them natural leaders.',
        'famousPeople': ['Bruce Lee', 'Martin Luther King Jr.', 'Florence Nightingale'],
      },
      'Snake': {
        'animal': 'Snake',
        'chineseName': '蛇 (Shé)',
        'element': getChineseElement(DateTime.now()),
        'personality': 'Wise, intuitive, mysterious, elegant',
        'strengths': ['Wise', 'Intuitive', 'Mysterious', 'Elegant', 'Determined'],
        'weaknesses': ['Jealous', 'Suspicious', 'Lazy'],
        'colors': ['Red', 'Black', 'Yellow'],
        'luckyNumbers': [2, 8, 9, 12],
        'luckyDays': ['Tuesday', 'Thursday'],
        'bestMatches': ['Ox', 'Rooster', 'Monkey'],
        'worstMatches': ['Pig', 'Tiger'],
        'career': 'Philosophy, psychology, research, medicine',
        'description': 'Snakes are wise and intuitive. They are mysterious, elegant, and have a natural ability to understand the deeper meanings of life.',
        'famousPeople': ['Abraham Lincoln', 'Muhammad Ali', 'Oprah Winfrey'],
      },
      'Horse': {
        'animal': 'Horse',
        'chineseName': '马 (Mǎ)',
        'element': getChineseElement(DateTime.now()),
        'personality': 'Active, energetic, independent, impatient',
        'strengths': ['Active', 'Energetic', 'Independent', 'Adventurous', 'Optimistic'],
        'weaknesses': ['Impatient', 'Restless', 'Selfish'],
        'colors': ['Brown', 'Yellow', 'Green'],
        'luckyNumbers': [2, 3, 7, 8],
        'luckyDays': ['Tuesday', 'Thursday'],
        'bestMatches': ['Tiger', 'Dog', 'Goat'],
        'worstMatches': ['Rat', 'Ox'],
        'career': 'Sports, travel, journalism, sales',
        'description': 'Horses are active and energetic. They are independent, adventurous, and have a natural love for freedom and movement.',
        'famousPeople': ['Neil Armstrong', 'Kobe Bryant', 'Clint Eastwood'],
      },
      'Goat': {
        'animal': 'Goat',
        'chineseName': '羊 (Yáng)',
        'element': getChineseElement(DateTime.now()),
        'personality': 'Gentle, calm, artistic, compassionate',
        'strengths': ['Gentle', 'Calm', 'Artistic', 'Compassionate', 'Creative'],
        'weaknesses': ['Indecisive', 'Pessimistic', 'Worrier'],
        'colors': ['Green', 'Red', 'Purple'],
        'luckyNumbers': [2, 7, 8, 9],
        'luckyDays': ['Wednesday', 'Sunday'],
        'bestMatches': ['Rabbit', 'Pig', 'Horse'],
        'worstMatches': ['Ox', 'Dog'],
        'career': 'Arts, healthcare, education, social work',
        'description': 'Goats are gentle and calm. They are artistic, compassionate, and have a natural ability to create beauty and harmony.',
        'famousPeople': ['Mick Jagger', 'Julia Roberts', 'Orlando Bloom'],
      },
      'Monkey': {
        'animal': 'Monkey',
        'chineseName': '猴 (Hóu)',
        'element': getChineseElement(DateTime.now()),
        'personality': 'Clever, intelligent, mischievous, curious',
        'strengths': ['Clever', 'Intelligent', 'Mischievous', 'Curious', 'Adaptable'],
        'weaknesses': ['Arrogant', 'Jealous', 'Suspicious'],
        'colors': ['White', 'Blue', 'Gold'],
        'luckyNumbers': [4, 6, 7, 9],
        'luckyDays': ['Wednesday', 'Sunday'],
        'bestMatches': ['Rat', 'Dragon', 'Snake'],
        'worstMatches': ['Tiger', 'Pig'],
        'career': 'Technology, entertainment, writing, research',
        'description': 'Monkeys are clever and intelligent. They are mischievous, curious, and have a natural ability to solve problems and entertain others.',
        'famousPeople': ['Leonardo da Vinci', 'Tom Hanks', 'Will Smith'],
      },
      'Rooster': {
        'animal': 'Rooster',
        'chineseName': '鸡 (Jī)',
        'element': getChineseElement(DateTime.now()),
        'personality': 'Honest, hardworking, punctual, confident',
        'strengths': ['Honest', 'Hardworking', 'Punctual', 'Confident', 'Practical'],
        'weaknesses': ['Critical', 'Rigid', 'Impatient'],
        'colors': ['Gold', 'Brown', 'Yellow'],
        'luckyNumbers': [5, 7, 8, 10],
        'luckyDays': ['Tuesday', 'Thursday'],
        'bestMatches': ['Ox', 'Snake', 'Dragon'],
        'worstMatches': ['Rabbit', 'Dog'],
        'career': 'Management, journalism, law, medicine',
        'description': 'Roosters are honest and hardworking. They are punctual, confident, and have a natural ability to organize and lead others.',
        'famousPeople': ['Benjamin Franklin', 'Elton John', 'Catherine Zeta-Jones'],
      },
      'Dog': {
        'animal': 'Dog',
        'chineseName': '狗 (Gǒu)',
        'element': getChineseElement(DateTime.now()),
        'personality': 'Loyal, honest, intelligent, courageous',
        'strengths': ['Loyal', 'Honest', 'Intelligent', 'Courageous', 'Faithful'],
        'weaknesses': ['Stubborn', 'Critical', 'Worrier'],
        'colors': ['Red', 'Green', 'Purple'],
        'luckyNumbers': [3, 4, 9, 11],
        'luckyDays': ['Tuesday', 'Saturday'],
        'bestMatches': ['Tiger', 'Horse', 'Rabbit'],
        'worstMatches': ['Dragon', 'Goat'],
        'career': 'Law enforcement, healthcare, social work, teaching',
        'description': 'Dogs are loyal and honest. They are intelligent, courageous, and have a natural ability to protect and serve others.',
        'famousPeople': ['Winston Churchill', 'Mother Teresa', 'Donald Trump'],
      },
      'Pig': {
        'animal': 'Pig',
        'chineseName': '猪 (Zhū)',
        'element': getChineseElement(DateTime.now()),
        'personality': 'Generous, diligent, optimistic, honest',
        'strengths': ['Generous', 'Diligent', 'Optimistic', 'Honest', 'Compassionate'],
        'weaknesses': ['Naive', 'Gullible', 'Materialistic'],
        'colors': ['Yellow', 'Gray', 'Brown'],
        'luckyNumbers': [2, 5, 8, 12],
        'luckyDays': ['Tuesday', 'Saturday'],
        'bestMatches': ['Rabbit', 'Goat', 'Tiger'],
        'worstMatches': ['Snake', 'Monkey'],
        'career': 'Healthcare, education, social work, hospitality',
        'description': 'Pigs are generous and diligent. They are optimistic, honest, and have a natural ability to bring joy and comfort to others.',
        'famousPeople': ['Ernest Hemingway', 'Hillary Clinton', 'Arnold Schwarzenegger'],
      },
    };

    return chineseData[animalSign] ?? {};
  }

  /// Gets Chinese zodiac compatibility between two animal signs
  static Map<String, dynamic> getChineseCompatibility(String animal1, String animal2) {
    final compatibilityData = {
      'excellent': [
        ['Rat', 'Dragon'], ['Rat', 'Monkey'], ['Ox', 'Snake'], ['Ox', 'Rooster'],
        ['Tiger', 'Horse'], ['Tiger', 'Dog'], ['Rabbit', 'Goat'], ['Rabbit', 'Pig'],
        ['Dragon', 'Rat'], ['Dragon', 'Monkey'], ['Snake', 'Ox'], ['Snake', 'Rooster'],
        ['Horse', 'Tiger'], ['Horse', 'Dog'], ['Goat', 'Rabbit'], ['Goat', 'Pig'],
        ['Monkey', 'Rat'], ['Monkey', 'Dragon'], ['Rooster', 'Ox'], ['Rooster', 'Snake'],
        ['Dog', 'Tiger'], ['Dog', 'Horse'], ['Pig', 'Rabbit'], ['Pig', 'Goat'],
      ],
      'good': [
        ['Rat', 'Ox'], ['Rat', 'Snake'], ['Ox', 'Rat'], ['Ox', 'Rooster'],
        ['Tiger', 'Dragon'], ['Tiger', 'Pig'], ['Rabbit', 'Dragon'], ['Rabbit', 'Dog'],
        ['Dragon', 'Tiger'], ['Dragon', 'Snake'], ['Snake', 'Dragon'], ['Snake', 'Monkey'],
        ['Horse', 'Goat'], ['Horse', 'Tiger'], ['Goat', 'Horse'], ['Goat', 'Rabbit'],
        ['Monkey', 'Snake'], ['Monkey', 'Dragon'], ['Rooster', 'Snake'], ['Rooster', 'Ox'],
        ['Dog', 'Rabbit'], ['Dog', 'Tiger'], ['Pig', 'Tiger'], ['Pig', 'Rabbit'],
      ],
      'moderate': [
        ['Rat', 'Tiger'], ['Rat', 'Horse'], ['Ox', 'Tiger'], ['Ox', 'Goat'],
        ['Tiger', 'Rat'], ['Tiger', 'Ox'], ['Rabbit', 'Snake'], ['Rabbit', 'Monkey'],
        ['Dragon', 'Horse'], ['Dragon', 'Goat'], ['Snake', 'Rabbit'], ['Snake', 'Goat'],
        ['Horse', 'Rat'], ['Horse', 'Snake'], ['Goat', 'Ox'], ['Goat', 'Snake'],
        ['Monkey', 'Horse'], ['Monkey', 'Goat'], ['Rooster', 'Horse'], ['Rooster', 'Goat'],
        ['Dog', 'Snake'], ['Dog', 'Goat'], ['Pig', 'Snake'], ['Pig', 'Goat'],
      ],
      'challenging': [
        ['Rat', 'Horse'], ['Rat', 'Goat'], ['Ox', 'Horse'], ['Ox', 'Goat'],
        ['Tiger', 'Monkey'], ['Tiger', 'Snake'], ['Rabbit', 'Rooster'], ['Rabbit', 'Rat'],
        ['Dragon', 'Dog'], ['Dragon', 'Goat'], ['Snake', 'Tiger'], ['Snake', 'Pig'],
        ['Horse', 'Rat'], ['Horse', 'Ox'], ['Goat', 'Ox'], ['Goat', 'Dog'],
        ['Monkey', 'Tiger'], ['Monkey', 'Pig'], ['Rooster', 'Rabbit'], ['Rooster', 'Dog'],
        ['Dog', 'Dragon'], ['Dog', 'Rooster'], ['Pig', 'Snake'], ['Pig', 'Monkey'],
      ],
    };

    // Check compatibility level
    for (final level in compatibilityData.keys) {
      for (final pair in compatibilityData[level]!) {
        if ((pair[0] == animal1 && pair[1] == animal2) || 
            (pair[0] == animal2 && pair[1] == animal1)) {
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
      'advice': 'Consider consulting a Chinese astrology expert for detailed analysis',
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
      case 'excellent': return 'These animals have excellent compatibility with natural harmony and mutual understanding.';
      case 'good': return 'These animals have good compatibility with potential for a harmonious relationship.';
      case 'moderate': return 'These animals have moderate compatibility with some challenges but potential for growth.';
      case 'challenging': return 'These animals may face challenges but can work together with understanding and effort.';
      default: return 'Compatibility analysis not available.';
    }
  }

  static String _getCompatibilityAdvice(String level) {
    switch (level) {
      case 'excellent': return 'This is a naturally harmonious combination. Focus on communication and shared goals.';
      case 'good': return 'This combination has good potential. Work on understanding each other\'s differences.';
      case 'moderate': return 'This combination requires patience and understanding. Focus on common ground.';
      case 'challenging': return 'This combination may require extra effort. Focus on mutual respect and communication.';
      default: return 'Consider consulting a Chinese astrology expert for detailed compatibility analysis.';
    }
  }

  /// Gets the current year's Chinese zodiac animal
  static String getCurrentYearAnimal() {
    return getChineseZodiacSign(DateTime.now());
  }

  /// Gets the current year's Chinese element
  static String getCurrentYearElement() {
    return getChineseElement(DateTime.now());
  }

  /// Formats Chinese zodiac information for display
  static String formatChineseZodiacInfo(String animalSign, String element) {
    return '$animalSign ($element)';
  }

  /// Gets lucky colors for a Chinese zodiac sign
  static List<String> getLuckyColors(String animalSign) {
    final info = getChineseZodiacInfo(animalSign);
    return List<String>.from(info['colors'] ?? []);
  }

  /// Gets lucky numbers for a Chinese zodiac sign
  static List<int> getLuckyNumbers(String animalSign) {
    final info = getChineseZodiacInfo(animalSign);
    return List<int>.from(info['luckyNumbers'] ?? []);
  }

  /// Gets best career matches for a Chinese zodiac sign
  static List<String> getBestCareers(String animalSign) {
    final info = getChineseZodiacInfo(animalSign);
    final careerString = info['career'] ?? '';
    return careerString.split(', ').map((e) => e.trim()).toList();
  }
}

