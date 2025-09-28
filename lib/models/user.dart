import 'package:hive/hive.dart';

part 'user.g.dart';

@HiveType(typeId: 0)
class User extends HiveObject {
  @HiveField(0)
  String fullName;

  @HiveField(1)
  DateTime dateOfBirth;

  @HiveField(2)
  DateTime? timeOfBirth;

  @HiveField(3)
  String placeOfBirth;

  User({
    required this.fullName,
    required this.dateOfBirth,
    this.timeOfBirth,
    required this.placeOfBirth,
  });

  Map<String, dynamic> toJson() {
    return {
      'fullName': fullName,
      'dateOfBirth': dateOfBirth.toIso8601String(),
      'timeOfBirth': timeOfBirth?.toIso8601String(),
      'placeOfBirth': placeOfBirth,
    };
  }

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      fullName: json['fullName'],
      dateOfBirth: DateTime.parse(json['dateOfBirth']),
      timeOfBirth: json['timeOfBirth'] != null 
          ? DateTime.parse(json['timeOfBirth']) 
          : null,
      placeOfBirth: json['placeOfBirth'],
    );
  }
}








