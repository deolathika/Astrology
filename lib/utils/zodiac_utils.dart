/// Utility functions for zodiac calculations and astrology-related operations
class ZodiacUtils {
  /// Calculates the Western zodiac sign based on birth date
  /// 
  /// [birthDate] - DateTime object representing the birth date
  /// Returns the zodiac sign as a String
  static String getWesternZodiacSign(DateTime birthDate) {
    final month = birthDate.month;
    final day = birthDate.day;
    
    // Define zodiac sign date ranges
    if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) {
      return 'Aries';
    } else if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) {
      return 'Taurus';
    } else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) {
      return 'Gemini';
    } else if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) {
      return 'Cancer';
    } else if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) {
      return 'Leo';
    } else if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) {
      return 'Virgo';
    } else if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) {
      return 'Libra';
    } else if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) {
      return 'Scorpio';
    } else if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) {
      return 'Sagittarius';
    } else if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) {
      return 'Capricorn';
    } else if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) {
      return 'Aquarius';
    } else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
      return 'Pisces';
    }
    
    // This should never happen, but return a default
    return 'Unknown';
  }

  /// Calculates the Western zodiac sign from a date string in dd-mm-yyyy format
  /// 
  /// [dateString] - String in format "dd-mm-yyyy"
  /// Returns the zodiac sign as a String
  /// Throws FormatException if the date string is invalid
  static String getWesternZodiacSignFromString(String dateString) {
    try {
      final parts = dateString.split('-');
      if (parts.length != 3) {
        throw FormatException('Invalid date format. Expected dd-mm-yyyy');
      }
      
      final day = int.parse(parts[0]);
      final month = int.parse(parts[1]);
      final year = int.parse(parts[2]);
      
      // Validate date values
      if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1900 || year > 2100) {
        throw FormatException('Invalid date values');
      }
      
      final birthDate = DateTime(year, month, day);
      
      // Check if the date is valid (e.g., Feb 30 would be invalid)
      if (birthDate.day != day || birthDate.month != month || birthDate.year != year) {
        throw FormatException('Invalid date');
      }
      
      return getWesternZodiacSign(birthDate);
    } catch (e) {
      if (e is FormatException) {
        rethrow;
      }
      throw FormatException('Invalid date string: $dateString');
    }
  }

  /// Gets zodiac sign information including symbol, element, and traits
  static Map<String, dynamic> getZodiacInfo(String zodiacSign) {
    final zodiacData = {
      'Aries': {
        'symbol': '♈',
        'element': 'Fire',
        'quality': 'Cardinal',
        'rulingPlanet': 'Mars',
        'traits': ['Energetic', 'Courageous', 'Independent', 'Impulsive'],
        'colors': ['Red', 'Scarlet', 'Crimson'],
        'luckyNumbers': [1, 8, 17],
        'description': 'The first sign of the zodiac, Aries represents new beginnings and leadership.',
      },
      'Taurus': {
        'symbol': '♉',
        'element': 'Earth',
        'quality': 'Fixed',
        'rulingPlanet': 'Venus',
        'traits': ['Reliable', 'Patient', 'Practical', 'Stubborn'],
        'colors': ['Green', 'Pink', 'Light Blue'],
        'luckyNumbers': [2, 6, 9, 12, 24],
        'description': 'Taurus represents stability, beauty, and the pleasures of life.',
      },
      'Gemini': {
        'symbol': '♊',
        'element': 'Air',
        'quality': 'Mutable',
        'rulingPlanet': 'Mercury',
        'traits': ['Versatile', 'Expressive', 'Curious', 'Nervous'],
        'colors': ['Yellow', 'Silver', 'Gray'],
        'luckyNumbers': [5, 7, 14, 23],
        'description': 'Gemini represents communication, learning, and adaptability.',
      },
      'Cancer': {
        'symbol': '♋',
        'element': 'Water',
        'quality': 'Cardinal',
        'rulingPlanet': 'Moon',
        'traits': ['Loyal', 'Emotional', 'Intuitive', 'Moody'],
        'colors': ['White', 'Silver', 'Pearl'],
        'luckyNumbers': [2, 7, 11, 16, 20, 25],
        'description': 'Cancer represents home, family, and emotional security.',
      },
      'Leo': {
        'symbol': '♌',
        'element': 'Fire',
        'quality': 'Fixed',
        'rulingPlanet': 'Sun',
        'traits': ['Creative', 'Passionate', 'Generous', 'Arrogant'],
        'colors': ['Gold', 'Orange', 'Yellow'],
        'luckyNumbers': [1, 3, 10, 19],
        'description': 'Leo represents creativity, self-expression, and leadership.',
      },
      'Virgo': {
        'symbol': '♍',
        'element': 'Earth',
        'quality': 'Mutable',
        'rulingPlanet': 'Mercury',
        'traits': ['Analytical', 'Practical', 'Reliable', 'Perfectionist'],
        'colors': ['Navy Blue', 'Brown', 'Beige'],
        'luckyNumbers': [5, 14, 15, 23, 32],
        'description': 'Virgo represents service, health, and attention to detail.',
      },
      'Libra': {
        'symbol': '♎',
        'element': 'Air',
        'quality': 'Cardinal',
        'rulingPlanet': 'Venus',
        'traits': ['Diplomatic', 'Fair-minded', 'Social', 'Indecisive'],
        'colors': ['Pink', 'Green', 'Light Blue'],
        'luckyNumbers': [6, 9, 15, 24],
        'description': 'Libra represents balance, harmony, and relationships.',
      },
      'Scorpio': {
        'symbol': '♏',
        'element': 'Water',
        'quality': 'Fixed',
        'rulingPlanet': 'Pluto',
        'traits': ['Passionate', 'Resourceful', 'Brave', 'Jealous'],
        'colors': ['Scarlet', 'Red', 'Rust'],
        'luckyNumbers': [4, 5, 8, 9, 10, 11, 21, 27],
        'description': 'Scorpio represents transformation, mystery, and intensity.',
      },
      'Sagittarius': {
        'symbol': '♐',
        'element': 'Fire',
        'quality': 'Mutable',
        'rulingPlanet': 'Jupiter',
        'traits': ['Adventurous', 'Independent', 'Philosophical', 'Impatient'],
        'colors': ['Purple', 'Deep Blue', 'Turquoise'],
        'luckyNumbers': [3, 9, 12, 21],
        'description': 'Sagittarius represents adventure, philosophy, and expansion.',
      },
      'Capricorn': {
        'symbol': '♑',
        'element': 'Earth',
        'quality': 'Cardinal',
        'rulingPlanet': 'Saturn',
        'traits': ['Responsible', 'Disciplined', 'Self-controlled', 'Pessimistic'],
        'colors': ['Brown', 'Black', 'Dark Green'],
        'luckyNumbers': [8, 10, 13, 17, 22, 26],
        'description': 'Capricorn represents ambition, discipline, and achievement.',
      },
      'Aquarius': {
        'symbol': '♒',
        'element': 'Air',
        'quality': 'Fixed',
        'rulingPlanet': 'Uranus',
        'traits': ['Progressive', 'Independent', 'Humanitarian', 'Unpredictable'],
        'colors': ['Light Blue', 'Silver', 'Aqua'],
        'luckyNumbers': [4, 7, 11, 22, 29],
        'description': 'Aquarius represents innovation, humanitarianism, and independence.',
      },
      'Pisces': {
        'symbol': '♓',
        'element': 'Water',
        'quality': 'Mutable',
        'rulingPlanet': 'Neptune',
        'traits': ['Compassionate', 'Artistic', 'Intuitive', 'Escapist'],
        'colors': ['Sea Green', 'Aqua', 'Sea Foam'],
        'luckyNumbers': [3, 9, 12, 15, 18, 24],
        'description': 'Pisces represents spirituality, compassion, and imagination.',
      },
    };

    return zodiacData[zodiacSign] ?? {};
  }

  /// Calculates life path number from birth date
  static int calculateLifePathNumber(DateTime birthDate) {
    int sum = birthDate.day + birthDate.month + birthDate.year;
    while (sum > 9) {
      sum = sum.toString().split('').map(int.parse).reduce((a, b) => a + b);
    }
    return sum;
  }

  /// Formats date for display
  static String formatDate(DateTime date) {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return '${months[date.month - 1]} ${date.day}, ${date.year}';
  }
}
