/// Simple Numerology Service
class SimpleNumerologyService {
  
  /// Calculate Life Path Number
  static int calculateLifePathNumber(DateTime birthDate) {
    int day = birthDate.day;
    int month = birthDate.month;
    int year = birthDate.year;
    
    int lifePath = day + month + year;
    
    while (lifePath > 9 && lifePath != 11 && lifePath != 22 && lifePath != 33) {
      int sum = 0;
      while (lifePath > 0) {
        sum += lifePath % 10;
        lifePath ~/= 10;
      }
      lifePath = sum;
    }
    
    return lifePath;
  }

  /// Calculate Destiny Number
  static int calculateDestinyNumber(String fullName) {
    String name = fullName.toUpperCase().replaceAll(' ', '');
    int sum = 0;
    
    for (int i = 0; i < name.length; i++) {
      String char = name[i];
      if (char.codeUnitAt(0) >= 65 && char.codeUnitAt(0) <= 90) {
        sum += (char.codeUnitAt(0) - 64);
      }
    }
    
    while (sum > 9 && sum != 11 && sum != 22 && sum != 33) {
      int newSum = 0;
      while (sum > 0) {
        newSum += sum % 10;
        sum ~/= 10;
      }
      sum = newSum;
    }
    
    return sum;
  }

  /// Calculate Soul Urge Number
  static int calculateSoulUrgeNumber(String fullName) {
    String name = fullName.toUpperCase().replaceAll(' ', '');
    int sum = 0;
    
    for (int i = 0; i < name.length; i++) {
      String char = name[i];
      if (char.codeUnitAt(0) >= 65 && char.codeUnitAt(0) <= 90) {
        if ('AEIOU'.contains(char)) {
          sum += (char.codeUnitAt(0) - 64);
        }
      }
    }
    
    while (sum > 9 && sum != 11 && sum != 22 && sum != 33) {
      int newSum = 0;
      while (sum > 0) {
        newSum += sum % 10;
        sum ~/= 10;
      }
      sum = newSum;
    }
    
    return sum;
  }

  /// Calculate Personality Number
  static int calculatePersonalityNumber(String fullName) {
    String name = fullName.toUpperCase().replaceAll(' ', '');
    int sum = 0;
    
    for (int i = 0; i < name.length; i++) {
      String char = name[i];
      if (char.codeUnitAt(0) >= 65 && char.codeUnitAt(0) <= 90) {
        if (!'AEIOU'.contains(char)) {
          sum += (char.codeUnitAt(0) - 64);
        }
      }
    }
    
    while (sum > 9 && sum != 11 && sum != 22 && sum != 33) {
      int newSum = 0;
      while (sum > 0) {
        newSum += sum % 10;
        sum ~/= 10;
      }
      sum = newSum;
    }
    
    return sum;
  }
}
