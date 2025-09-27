import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import '../models/user.dart';

/// Payment Processing Service with Stripe integration
class PaymentService {
  static const String _stripeSecretKey = 'YOUR_STRIPE_SECRET_KEY'; // Replace with actual key
  static const String _stripePublishableKey = 'YOUR_STRIPE_PUBLISHABLE_KEY'; // Replace with actual key
  static const String _stripeBaseUrl = 'https://api.stripe.com/v1';
  
  /// Initialize payment service
  static Future<void> initialize() async {
    // Initialize payment service
    await _loadPaymentSettings();
  }
  
  /// Create payment intent
  static Future<Map<String, dynamic>> createPaymentIntent({
    required double amount,
    required String currency,
    required String description,
    Map<String, String>? metadata,
  }) async {
    try {
      final response = await http.post(
        Uri.parse('$_stripeBaseUrl/payment_intents'),
        headers: {
          'Authorization': 'Bearer $_stripeSecretKey',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: {
          'amount': (amount * 100).round().toString(), // Convert to cents
          'currency': currency,
          'description': description,
          'metadata': metadata != null ? jsonEncode(metadata) : null,
        },
      );
      
      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        throw Exception('Payment intent creation failed: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Payment intent creation error: $e');
    }
  }
  
  /// Process payment
  static Future<Map<String, dynamic>> processPayment({
    required String paymentIntentId,
    required String paymentMethodId,
  }) async {
    try {
      final response = await http.post(
        Uri.parse('$_stripeBaseUrl/payment_intents/$paymentIntentId/confirm'),
        headers: {
          'Authorization': 'Bearer $_stripeSecretKey',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: {
          'payment_method': paymentMethodId,
        },
      );
      
      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        throw Exception('Payment processing failed: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Payment processing error: $e');
    }
  }
  
  /// Create customer
  static Future<Map<String, dynamic>> createCustomer({
    required String email,
    required String name,
    Map<String, String>? metadata,
  }) async {
    try {
      final response = await http.post(
        Uri.parse('$_stripeBaseUrl/customers'),
        headers: {
          'Authorization': 'Bearer $_stripeSecretKey',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: {
          'email': email,
          'name': name,
          'metadata': metadata != null ? jsonEncode(metadata) : null,
        },
      );
      
      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        throw Exception('Customer creation failed: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Customer creation error: $e');
    }
  }
  
  /// Create subscription
  static Future<Map<String, dynamic>> createSubscription({
    required String customerId,
    required String priceId,
    Map<String, String>? metadata,
  }) async {
    try {
      final response = await http.post(
        Uri.parse('$_stripeBaseUrl/subscriptions'),
        headers: {
          'Authorization': 'Bearer $_stripeSecretKey',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: {
          'customer': customerId,
          'items': jsonEncode([{'price': priceId}]),
          'metadata': metadata != null ? jsonEncode(metadata) : null,
        },
      );
      
      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        throw Exception('Subscription creation failed: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Subscription creation error: $e');
    }
  }
  
  /// Cancel subscription
  static Future<Map<String, dynamic>> cancelSubscription({
    required String subscriptionId,
    bool immediately = false,
  }) async {
    try {
      final response = await http.post(
        Uri.parse('$_stripeBaseUrl/subscriptions/$subscriptionId'),
        headers: {
          'Authorization': 'Bearer $_stripeSecretKey',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: {
          'cancel_at_period_end': (!immediately).toString(),
        },
      );
      
      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        throw Exception('Subscription cancellation failed: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Subscription cancellation error: $e');
    }
  }
  
  /// Get payment history
  static Future<List<Map<String, dynamic>>> getPaymentHistory({
    String? customerId,
    int limit = 10,
  }) async {
    try {
      String url = '$_stripeBaseUrl/payment_intents?limit=$limit';
      if (customerId != null) {
        url += '&customer=$customerId';
      }
      
      final response = await http.get(
        Uri.parse(url),
        headers: {
          'Authorization': 'Bearer $_stripeSecretKey',
        },
      );
      
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        return List<Map<String, dynamic>>.from(data['data']);
      } else {
        throw Exception('Payment history retrieval failed: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Payment history retrieval error: $e');
    }
  }
  
  /// Get subscription details
  static Future<Map<String, dynamic>> getSubscription(String subscriptionId) async {
    try {
      final response = await http.get(
        Uri.parse('$_stripeBaseUrl/subscriptions/$subscriptionId'),
        headers: {
          'Authorization': 'Bearer $_stripeSecretKey',
        },
      );
      
      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        throw Exception('Subscription retrieval failed: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Subscription retrieval error: $e');
    }
  }
  
  /// Get customer details
  static Future<Map<String, dynamic>> getCustomer(String customerId) async {
    try {
      final response = await http.get(
        Uri.parse('$_stripeBaseUrl/customers/$customerId'),
        headers: {
          'Authorization': 'Bearer $_stripeSecretKey',
        },
      );
      
      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        throw Exception('Customer retrieval failed: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Customer retrieval error: $e');
    }
  }
  
  /// Create refund
  static Future<Map<String, dynamic>> createRefund({
    required String paymentIntentId,
    double? amount,
    String? reason,
  }) async {
    try {
      final body = <String, String>{
        'payment_intent': paymentIntentId,
      };
      
      if (amount != null) {
        body['amount'] = (amount * 100).round().toString();
      }
      
      if (reason != null) {
        body['reason'] = reason;
      }
      
      final response = await http.post(
        Uri.parse('$_stripeBaseUrl/refunds'),
        headers: {
          'Authorization': 'Bearer $_stripeSecretKey',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body,
      );
      
      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        throw Exception('Refund creation failed: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Refund creation error: $e');
    }
  }
  
  /// Get available products
  static Future<List<Map<String, dynamic>>> getAvailableProducts() async {
    try {
      final response = await http.get(
        Uri.parse('$_stripeBaseUrl/products?active=true'),
        headers: {
          'Authorization': 'Bearer $_stripeSecretKey',
        },
      );
      
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        return List<Map<String, dynamic>>.from(data['data']);
      } else {
        throw Exception('Products retrieval failed: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Products retrieval error: $e');
    }
  }
  
  /// Get available prices
  static Future<List<Map<String, dynamic>>> getAvailablePrices() async {
    try {
      final response = await http.get(
        Uri.parse('$_stripeBaseUrl/prices?active=true'),
        headers: {
          'Authorization': 'Bearer $_stripeSecretKey',
        },
      );
      
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        return List<Map<String, dynamic>>.from(data['data']);
      } else {
        throw Exception('Prices retrieval failed: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Prices retrieval error: $e');
    }
  }
  
  /// Save payment settings
  static Future<void> _loadPaymentSettings() async {
    final prefs = await SharedPreferences.getInstance();
    // Load payment settings from preferences
  }
  
  /// Save payment settings
  static Future<void> savePaymentSettings(Map<String, dynamic> settings) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('payment_settings', jsonEncode(settings));
  }
  
  /// Get payment settings
  static Future<Map<String, dynamic>> getPaymentSettings() async {
    final prefs = await SharedPreferences.getInstance();
    final settingsJson = prefs.getString('payment_settings');
    if (settingsJson != null) {
      return jsonDecode(settingsJson);
    }
    return {};
  }
  
  /// Validate payment method
  static Future<bool> validatePaymentMethod(String paymentMethodId) async {
    try {
      final response = await http.get(
        Uri.parse('$_stripeBaseUrl/payment_methods/$paymentMethodId'),
        headers: {
          'Authorization': 'Bearer $_stripeSecretKey',
        },
      );
      
      return response.statusCode == 200;
    } catch (e) {
      return false;
    }
  }
  
  /// Get payment statistics
  static Future<Map<String, dynamic>> getPaymentStatistics() async {
    try {
      final response = await http.get(
        Uri.parse('$_stripeBaseUrl/payment_intents?limit=100'),
        headers: {
          'Authorization': 'Bearer $_stripeSecretKey',
        },
      );
      
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        final payments = List<Map<String, dynamic>>.from(data['data']);
        
        double totalAmount = 0;
        int successfulPayments = 0;
        int failedPayments = 0;
        
        for (final payment in payments) {
          final amount = (payment['amount'] as int) / 100.0;
          totalAmount += amount;
          
          if (payment['status'] == 'succeeded') {
            successfulPayments++;
          } else {
            failedPayments++;
          }
        }
        
        return {
          'total_amount': totalAmount,
          'successful_payments': successfulPayments,
          'failed_payments': failedPayments,
          'total_payments': payments.length,
        };
      } else {
        throw Exception('Payment statistics retrieval failed: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Payment statistics retrieval error: $e');
    }
  }
}

/// Payment methods
enum PaymentMethod {
  card,
  bankTransfer,
  digitalWallet,
  cryptocurrency,
}

/// Payment status
enum PaymentStatus {
  pending,
  processing,
  succeeded,
  failed,
  canceled,
  refunded,
}

/// Subscription status
enum SubscriptionStatus {
  active,
  canceled,
  pastDue,
  incomplete,
  incompleteExpired,
  trialing,
}

/// Payment products
class PaymentProduct {
  final String id;
  final String name;
  final String description;
  final double price;
  final String currency;
  final String interval; // monthly, yearly, etc.
  final List<String> features;
  final bool isPopular;
  
  const PaymentProduct({
    required this.id,
    required this.name,
    required this.description,
    required this.price,
    required this.currency,
    required this.interval,
    required this.features,
    this.isPopular = false,
  });
}

/// Payment transaction
class PaymentTransaction {
  final String id;
  final double amount;
  final String currency;
  final PaymentStatus status;
  final DateTime createdAt;
  final String description;
  final Map<String, String>? metadata;
  
  const PaymentTransaction({
    required this.id,
    required this.amount,
    required this.currency,
    required this.status,
    required this.createdAt,
    required this.description,
    this.metadata,
  });
}

