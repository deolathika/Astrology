import 'dart:convert';
import 'package:hive_flutter/hive_flutter.dart';

/// Wallet Service for balance and payment management
class WalletService {
  static const String _walletBoxName = 'walletBox';
  static Box<Map>? _walletBox;

  /// Initialize wallet service
  static Future<void> init() async {
    _walletBox = await Hive.openBox<Map>(_walletBoxName);
  }

  /// Get wallet box
  static Box<Map> get walletBox {
    if (_walletBox == null) {
      throw Exception('Wallet not initialized. Call WalletService.init() first.');
    }
    return _walletBox!;
  }

  /// Get current balance
  static double getBalance() {
    final balance = walletBox.get('balance', defaultValue: 0.0);
    return balance is double ? balance : 0.0;
  }

  /// Set balance
  static Future<void> setBalance(double amount) async {
    await walletBox.put('balance', amount);
  }

  /// Add money to wallet
  static Future<void> addMoney(double amount) async {
    final currentBalance = getBalance();
    await setBalance(currentBalance + amount);
  }

  /// Deduct money from wallet
  static Future<bool> deductMoney(double amount) async {
    final currentBalance = getBalance();
    if (currentBalance >= amount) {
      await setBalance(currentBalance - amount);
      return true;
    }
    return false;
  }

  /// Get transaction history
  static List<Map<String, dynamic>> getTransactionHistory() {
    final history = walletBox.get('transactions', defaultValue: <Map>[]);
    return List<Map<String, dynamic>>.from(history);
  }

  /// Add transaction
  static Future<void> addTransaction({
    required String type,
    required double amount,
    required String description,
    required String status,
  }) async {
    final transaction = {
      'id': DateTime.now().millisecondsSinceEpoch.toString(),
      'type': type,
      'amount': amount,
      'description': description,
      'status': status,
      'timestamp': DateTime.now().toIso8601String(),
    };

    final history = getTransactionHistory();
    history.insert(0, transaction);
    
    // Keep only last 50 transactions
    if (history.length > 50) {
      history.removeRange(50, history.length);
    }
    
    await walletBox.put('transactions', history);
  }

  /// Get preset amounts for adding money
  static List<double> getPresetAmounts() {
    return [100.0, 250.0, 500.0, 1000.0, 2500.0, 5000.0];
  }

  /// Process payment (placeholder for future integration)
  static Future<Map<String, dynamic>> processPayment({
    required double amount,
    required String paymentMethod,
    required String description,
  }) async {
    // Simulate payment processing
    await Future.delayed(const Duration(seconds: 2));
    
    // For now, just add to wallet (in real app, integrate with payment gateway)
    await addMoney(amount);
    await addTransaction(
      type: 'credit',
      amount: amount,
      description: description,
      status: 'completed',
    );
    
    return {
      'success': true,
      'transaction_id': DateTime.now().millisecondsSinceEpoch.toString(),
      'message': 'Payment processed successfully',
    };
  }

  /// Get wallet summary
  static Map<String, dynamic> getWalletSummary() {
    final balance = getBalance();
    final history = getTransactionHistory();
    
    double totalSpent = 0.0;
    double totalEarned = 0.0;
    
    for (final transaction in history) {
      final amount = transaction['amount'] as double;
      if (transaction['type'] == 'debit') {
        totalSpent += amount;
      } else if (transaction['type'] == 'credit') {
        totalEarned += amount;
      }
    }
    
    return {
      'balance': balance,
      'total_earned': totalEarned,
      'total_spent': totalSpent,
      'transaction_count': history.length,
      'last_transaction': history.isNotEmpty ? history.first : null,
    };
  }

  /// Get spending categories
  static List<Map<String, dynamic>> getSpendingCategories() {
    return [
      {
        'name': 'Daily Guidance',
        'amount': 0.0,
        'color': 0xFF6E3CBC,
        'icon': '🔮',
      },
      {
        'name': 'Premium Features',
        'amount': 0.0,
        'color': 0xFFF5C242,
        'icon': '⭐',
      },
      {
        'name': 'Community',
        'amount': 0.0,
        'color': 0xFF3B82F6,
        'icon': '👥',
      },
      {
        'name': 'Dreams',
        'amount': 0.0,
        'color': 0xFFEC4899,
        'icon': '🌙',
      },
    ];
  }

  /// Get recent transactions
  static List<Map<String, dynamic>> getRecentTransactions({int limit = 10}) {
    final history = getTransactionHistory();
    return history.take(limit).toList();
  }

  /// Search transactions
  static List<Map<String, dynamic>> searchTransactions(String query) {
    final history = getTransactionHistory();
    return history.where((transaction) {
      final description = transaction['description'] as String;
      return description.toLowerCase().contains(query.toLowerCase());
    }).toList();
  }

  /// Get monthly spending
  static Map<String, double> getMonthlySpending() {
    final history = getTransactionHistory();
    final now = DateTime.now();
    final monthlySpending = <String, double>{};
    
    for (final transaction in history) {
      if (transaction['type'] == 'debit') {
        final timestamp = DateTime.parse(transaction['timestamp']);
        if (timestamp.year == now.year && timestamp.month == now.month) {
          final monthKey = '${now.year}-${now.month.toString().padLeft(2, '0')}';
          final amount = transaction['amount'] as double;
          monthlySpending[monthKey] = (monthlySpending[monthKey] ?? 0.0) + amount;
        }
      }
    }
    
    return monthlySpending;
  }

  /// Export wallet data
  static Map<String, dynamic> exportWalletData() {
    return {
      'balance': getBalance(),
      'transactions': getTransactionHistory(),
      'summary': getWalletSummary(),
      'exported_at': DateTime.now().toIso8601String(),
    };
  }

  /// Import wallet data
  static Future<void> importWalletData(Map<String, dynamic> data) async {
    if (data.containsKey('balance')) {
      await setBalance(data['balance'] as double);
    }
    
    if (data.containsKey('transactions')) {
      final transactions = List<Map<String, dynamic>>.from(data['transactions']);
      await walletBox.put('transactions', transactions);
    }
  }

  /// Clear wallet data
  static Future<void> clearWalletData() async {
    await walletBox.clear();
  }

  /// Close wallet service
  static Future<void> close() async {
    await _walletBox?.close();
  }
}


