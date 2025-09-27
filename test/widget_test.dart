// This is a basic Flutter widget test.
//
// To perform an interaction with a widget in your test, use the WidgetTester
// utility in the flutter_test package. For example, you can send tap and scroll
// gestures. You can also use WidgetTester to find child widgets in the widget
// tree, read text, and verify that the values of widget properties are correct.

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:daily_secrets_app/utils/zodiac_utils.dart';

void main() {
  testWidgets('Zodiac calculation test', (WidgetTester tester) async {
    // Test zodiac calculation directly
    final ariesDate = DateTime(1990, 3, 21);
    final zodiacSign = ZodiacUtils.getWesternZodiacSign(ariesDate);
    
    expect(zodiacSign, equals('Aries'));
    
    // Test zodiac info
    final zodiacInfo = ZodiacUtils.getZodiacInfo('Aries');
    expect(zodiacInfo['symbol'], equals('♈'));
    expect(zodiacInfo['element'], equals('Fire'));
  });
}
