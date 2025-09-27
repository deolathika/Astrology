import 'package:hive_flutter/hive_flutter.dart';
import '../models/user.dart';

class DatabaseService {
  static const String _userBoxName = 'userBox';
  static Box<User>? _userBox;

  static Future<void> init() async {
    await Hive.initFlutter();
    Hive.registerAdapter(UserAdapter());
    _userBox = await Hive.openBox<User>(_userBoxName);
  }

  static Box<User> get userBox {
    if (_userBox == null) {
      throw Exception('Database not initialized. Call DatabaseService.init() first.');
    }
    return _userBox!;
  }

  static Future<void> saveUser(User user) async {
    await userBox.put('current_user', user);
  }

  static User? getCurrentUser() {
    return userBox.get('current_user');
  }

  static Future<void> deleteUser() async {
    await userBox.delete('current_user');
  }

  static Future<void> close() async {
    await _userBox?.close();
  }
}





