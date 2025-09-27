import 'lib/utils/zodiac_utils.dart';
import 'lib/utils/sri_lankan_zodiac_utils.dart';

void main() {
  final birthDate = DateTime(1991, 7, 25);
  print('Birth Date: July 25, 1991');
  print('Western Zodiac: ${ZodiacUtils.getWesternZodiacSign(birthDate)}');
  print('Sri Lankan Zodiac: ${SriLankanZodiacUtils.getSriLankanZodiacSign(birthDate)}');
  
  final westernInfo = ZodiacUtils.getZodiacInfo(ZodiacUtils.getWesternZodiacSign(birthDate));
  print('Western Symbol: ${westernInfo["symbol"]}');
  
  final sriLankanInfo = SriLankanZodiacUtils.getSriLankanZodiacInfo(SriLankanZodiacUtils.getSriLankanZodiacSign(birthDate));
  print('Sri Lankan Sinhala: ${sriLankanInfo["sinhalaName"]}');
}

