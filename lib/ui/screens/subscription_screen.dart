import 'package:flutter/material.dart';
import '../../services/payment_service.dart';
import '../../services/analytics_service.dart';
import '../theme/app_theme.dart';

class SubscriptionScreen extends StatefulWidget {
  const SubscriptionScreen({super.key});

  @override
  State<SubscriptionScreen> createState() => _SubscriptionScreenState();
}

class _SubscriptionScreenState extends State<SubscriptionScreen> {
  String? _selectedPlan;
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    _selectedPlan = 'premium'; // Default selection
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.cream,
      appBar: AppBar(
        title: const Text('Choose Your Plan'),
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Header
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                gradient: AppTheme.cosmicGradient,
                borderRadius: BorderRadius.circular(20),
              ),
              child: Column(
                children: [
                  Icon(
                    Icons.star,
                    size: 48,
                    color: Colors.white,
                  ),
                  const SizedBox(height: 12),
                  Text(
                    'Unlock Your Cosmic Potential',
                    style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Get personalized insights, detailed analysis, and exclusive cosmic content',
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      color: Colors.white70,
                    ),
                    textAlign: TextAlign.center,
                  ),
                ],
              ),
            ),
            
            const SizedBox(height: 24),
            
            // Subscription Plans
            Text(
              'Choose Your Plan',
              style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                fontWeight: FontWeight.bold,
                color: Colors.black87,
              ),
            ),
            const SizedBox(height: 16),
            
            ...PaymentService.getSubscriptionPlans().entries.map((entry) {
              final planId = entry.key;
              final plan = entry.value;
              final isSelected = _selectedPlan == planId;
              
              return GestureDetector(
                onTap: () {
                  setState(() {
                    _selectedPlan = planId;
                  });
                },
                child: Container(
                  margin: const EdgeInsets.only(bottom: 12),
                  padding: const EdgeInsets.all(20),
                  decoration: BoxDecoration(
                    gradient: isSelected 
                        ? LinearGradient(
                            colors: [AppTheme.electricViolet, AppTheme.celestialBlue],
                          )
                        : LinearGradient(
                            colors: [
                              Colors.grey[100]!,
                              Colors.grey[50]!,
                            ],
                          ),
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(
                      color: isSelected 
                          ? AppTheme.electricViolet 
                          : Colors.grey[300]!,
                      width: isSelected ? 2 : 1,
                    ),
                    boxShadow: isSelected ? [
                      BoxShadow(
                        color: AppTheme.electricViolet.withOpacity(0.3),
                        blurRadius: 10,
                        offset: const Offset(0, 4),
                      ),
                    ] : null,
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Expanded(
                            child: Text(
                              plan['name'],
                              style: Theme.of(context).textTheme.titleLarge?.copyWith(
                                fontWeight: FontWeight.bold,
                                color: isSelected ? Colors.white : Colors.black87,
                              ),
                            ),
                          ),
                          Text(
                            '\$${plan['price']}/${plan['interval']}',
                            style: Theme.of(context).textTheme.titleLarge?.copyWith(
                              fontWeight: FontWeight.bold,
                              color: isSelected ? Colors.white : AppTheme.electricViolet,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 12),
                      ...(plan['features'] as List<String>).map((feature) {
                        return Padding(
                          padding: const EdgeInsets.only(bottom: 8),
                          child: Row(
                            children: [
                              Icon(
                                Icons.check_circle,
                                color: isSelected ? Colors.white : AppTheme.electricViolet,
                                size: 20,
                              ),
                              const SizedBox(width: 12),
                              Expanded(
                                child: Text(
                                  feature,
                                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                                    color: isSelected ? Colors.white70 : Colors.black87,
                                  ),
                                ),
                              ),
                            ],
                          ),
                        );
                      }).toList(),
                    ],
                  ),
                ),
              );
            }).toList(),
            
            const SizedBox(height: 24),
            
            // Subscribe Button
            SizedBox(
              width: double.infinity,
              height: 56,
              child: ElevatedButton(
                onPressed: _isLoading ? null : _handleSubscription,
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppTheme.electricViolet,
                  foregroundColor: Colors.white,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(16),
                  ),
                  elevation: 8,
                ),
                child: _isLoading
                    ? const CircularProgressIndicator(color: Colors.white)
                    : Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const Icon(Icons.payment, size: 24),
                          const SizedBox(width: 12),
                          Text(
                            'Subscribe Now',
                            style: Theme.of(context).textTheme.titleMedium?.copyWith(
                              fontWeight: FontWeight.bold,
                              color: Colors.white,
                            ),
                          ),
                        ],
                      ),
              ),
            ),
            
            const SizedBox(height: 16),
            
            // Terms and Privacy
            Text(
              'By subscribing, you agree to our Terms of Service and Privacy Policy. Subscription will be charged to your payment method.',
              style: Theme.of(context).textTheme.bodySmall?.copyWith(
                color: Colors.grey[600],
              ),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }

  Future<void> _handleSubscription() async {
    if (_selectedPlan == null) return;
    
    setState(() {
      _isLoading = true;
    });
    
    try {
      // Track subscription attempt
      await AnalyticsService.trackSubscription(
        planId: _selectedPlan!,
        price: PaymentService.getSubscriptionPlans()[_selectedPlan!]!['price'],
        currency: 'USD',
        eventType: 'started',
      );
      
      // Simulate payment processing
      await Future.delayed(const Duration(seconds: 2));
      
      // Show success message
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Successfully subscribed to ${PaymentService.getSubscriptionPlans()[_selectedPlan!]!['name']}!'),
            backgroundColor: AppTheme.auroraGreen,
          ),
        );
        
        // Navigate back
        Navigator.pop(context);
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Subscription failed: $e'),
            backgroundColor: Colors.red,
          ),
        );
      }
    } finally {
      if (mounted) {
        setState(() {
          _isLoading = false;
        });
      }
    }
  }
}
