import 'package:flutter_test/flutter_test.dart';
import 'package:daily_secrets_app/utils/zodiac_utils.dart';

void main() {
  group('ZodiacUtils Tests', () {
    group('getWesternZodiacSign', () {
      test('should return Aries for March 21st', () {
        final date = DateTime(1990, 3, 21);
        expect(ZodiacUtils.getWesternZodiacSign(date), equals('Aries'));
      });

      test('should return Aries for April 19th', () {
        final date = DateTime(1990, 4, 19);
        expect(ZodiacUtils.getWesternZodiacSign(date), equals('Aries'));
      });

      test('should return Taurus for April 20th', () {
        final date = DateTime(1990, 4, 20);
        expect(ZodiacUtils.getWesternZodiacSign(date), equals('Taurus'));
      });

      test('should return Taurus for May 20th', () {
        final date = DateTime(1990, 5, 20);
        expect(ZodiacUtils.getWesternZodiacSign(date), equals('Taurus'));
      });

      test('should return Gemini for May 21st', () {
        final date = DateTime(1990, 5, 21);
        expect(ZodiacUtils.getWesternZodiacSign(date), equals('Gemini'));
      });

      test('should return Cancer for June 21st', () {
        final date = DateTime(1990, 6, 21);
        expect(ZodiacUtils.getWesternZodiacSign(date), equals('Cancer'));
      });

      test('should return Leo for July 23rd', () {
        final date = DateTime(1990, 7, 23);
        expect(ZodiacUtils.getWesternZodiacSign(date), equals('Leo'));
      });

      test('should return Virgo for August 23rd', () {
        final date = DateTime(1990, 8, 23);
        expect(ZodiacUtils.getWesternZodiacSign(date), equals('Virgo'));
      });

      test('should return Libra for September 23rd', () {
        final date = DateTime(1990, 9, 23);
        expect(ZodiacUtils.getWesternZodiacSign(date), equals('Libra'));
      });

      test('should return Scorpio for October 23rd', () {
        final date = DateTime(1990, 10, 23);
        expect(ZodiacUtils.getWesternZodiacSign(date), equals('Scorpio'));
      });

      test('should return Sagittarius for November 22nd', () {
        final date = DateTime(1990, 11, 22);
        expect(ZodiacUtils.getWesternZodiacSign(date), equals('Sagittarius'));
      });

      test('should return Capricorn for December 22nd', () {
        final date = DateTime(1990, 12, 22);
        expect(ZodiacUtils.getWesternZodiacSign(date), equals('Capricorn'));
      });

      test('should return Capricorn for January 19th', () {
        final date = DateTime(1990, 1, 19);
        expect(ZodiacUtils.getWesternZodiacSign(date), equals('Capricorn'));
      });

      test('should return Aquarius for January 20th', () {
        final date = DateTime(1990, 1, 20);
        expect(ZodiacUtils.getWesternZodiacSign(date), equals('Aquarius'));
      });

      test('should return Aquarius for February 18th', () {
        final date = DateTime(1990, 2, 18);
        expect(ZodiacUtils.getWesternZodiacSign(date), equals('Aquarius'));
      });

      test('should return Pisces for February 19th', () {
        final date = DateTime(1990, 2, 19);
        expect(ZodiacUtils.getWesternZodiacSign(date), equals('Pisces'));
      });

      test('should return Pisces for March 20th', () {
        final date = DateTime(1990, 3, 20);
        expect(ZodiacUtils.getWesternZodiacSign(date), equals('Pisces'));
      });

      // Edge cases
      test('should handle leap year correctly', () {
        final leapYearDate = DateTime(2020, 2, 29);
        expect(ZodiacUtils.getWesternZodiacSign(leapYearDate), equals('Pisces'));
      });

      test('should handle different years correctly', () {
        final date2000 = DateTime(2000, 3, 21);
        final date2023 = DateTime(2023, 3, 21);
        expect(ZodiacUtils.getWesternZodiacSign(date2000), equals('Aries'));
        expect(ZodiacUtils.getWesternZodiacSign(date2023), equals('Aries'));
      });
    });

    group('getWesternZodiacSignFromString', () {
      test('should parse valid date string correctly', () {
        expect(ZodiacUtils.getWesternZodiacSignFromString('21-03-1990'), equals('Aries'));
        expect(ZodiacUtils.getWesternZodiacSignFromString('20-04-1990'), equals('Taurus'));
        expect(ZodiacUtils.getWesternZodiacSignFromString('21-05-1990'), equals('Gemini'));
      });

      test('should handle edge cases correctly', () {
        expect(ZodiacUtils.getWesternZodiacSignFromString('21-03-2000'), equals('Aries'));
        expect(ZodiacUtils.getWesternZodiacSignFromString('29-02-2020'), equals('Pisces')); // Leap year
      });

      test('should throw FormatException for invalid format', () {
        expect(
          () => ZodiacUtils.getWesternZodiacSignFromString('21/03/1990'),
          throwsA(isA<FormatException>()),
        );
        expect(
          () => ZodiacUtils.getWesternZodiacSignFromString('21-03'),
          throwsA(isA<FormatException>()),
        );
        expect(
          () => ZodiacUtils.getWesternZodiacSignFromString('invalid-date'),
          throwsA(isA<FormatException>()),
        );
      });

      test('should throw FormatException for invalid date values', () {
        expect(
          () => ZodiacUtils.getWesternZodiacSignFromString('32-03-1990'),
          throwsA(isA<FormatException>()),
        );
        expect(
          () => ZodiacUtils.getWesternZodiacSignFromString('21-13-1990'),
          throwsA(isA<FormatException>()),
        );
      });
    });

    group('getZodiacInfo', () {
      test('should return correct info for Aries', () {
        final info = ZodiacUtils.getZodiacInfo('Aries');
        expect(info['symbol'], equals('♈'));
        expect(info['element'], equals('Fire'));
        expect(info['rulingPlanet'], equals('Mars'));
        expect(info['traits'], contains('Energetic'));
      });

      test('should return correct info for Leo', () {
        final info = ZodiacUtils.getZodiacInfo('Leo');
        expect(info['symbol'], equals('♌'));
        expect(info['element'], equals('Fire'));
        expect(info['rulingPlanet'], equals('Sun'));
        expect(info['traits'], contains('Creative'));
      });

      test('should return empty map for unknown sign', () {
        final info = ZodiacUtils.getZodiacInfo('Unknown');
        expect(info, isEmpty);
      });
    });

    group('calculateLifePathNumber', () {
      test('should calculate life path number correctly', () {
        expect(ZodiacUtils.calculateLifePathNumber(DateTime(1990, 3, 21)), equals(7));
        expect(ZodiacUtils.calculateLifePathNumber(DateTime(1985, 12, 25)), equals(6));
        expect(ZodiacUtils.calculateLifePathNumber(DateTime(2000, 1, 1)), equals(4));
      });

      test('should handle master numbers correctly', () {
        expect(ZodiacUtils.calculateLifePathNumber(DateTime(1999, 9, 9)), equals(1));
        expect(ZodiacUtils.calculateLifePathNumber(DateTime(1988, 8, 8)), equals(6));
      });
    });

    group('formatDate', () {
      test('should format date correctly', () {
        expect(ZodiacUtils.formatDate(DateTime(1990, 3, 21)), equals('March 21, 1990'));
        expect(ZodiacUtils.formatDate(DateTime(2000, 12, 31)), equals('December 31, 2000'));
        expect(ZodiacUtils.formatDate(DateTime(2023, 1, 1)), equals('January 1, 2023'));
      });
    });
  });
}
