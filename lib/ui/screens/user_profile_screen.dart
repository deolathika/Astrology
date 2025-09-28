import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../models/user.dart';
import '../../services/database_service.dart';
import '../../services/translation_service.dart';
import '../theme/app_theme.dart';
import '../components/location_selector.dart';
import '../../services/location_service.dart';
import 'enhanced_home_screen.dart';

class UserProfileScreen extends StatefulWidget {
  const UserProfileScreen({super.key});

  @override
  State<UserProfileScreen> createState() => _UserProfileScreenState();
}

class _UserProfileScreenState extends State<UserProfileScreen> {
  final _formKey = GlobalKey<FormState>();
  final _fullNameController = TextEditingController();
  final _placeOfBirthController = TextEditingController();
  
  DateTime? _selectedDate;
  TimeOfDay? _selectedTime;
  bool _isLoading = false;
  String? _selectedCountry;
  String? _selectedCity;
  String _currentLanguage = 'en';

  @override
  void initState() {
    super.initState();
    _loadExistingUser();
  }

  void _loadExistingUser() {
    final user = DatabaseService.getCurrentUser();
    if (user != null) {
      _fullNameController.text = user.fullName;
      _placeOfBirthController.text = user.placeOfBirth;
      _selectedDate = user.dateOfBirth;
      _selectedTime = user.timeOfBirth != null 
          ? TimeOfDay.fromDateTime(user.timeOfBirth!)
          : null;
    }
  }

  Future<void> _selectDate() async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: _selectedDate ?? DateTime.now(),
      firstDate: DateTime(1900),
      lastDate: DateTime.now(),
    );
    if (picked != null && picked != _selectedDate) {
      setState(() {
        _selectedDate = picked;
      });
    }
  }

  Future<void> _selectTime() async {
    final TimeOfDay? picked = await showTimePicker(
      context: context,
      initialTime: _selectedTime ?? TimeOfDay.now(),
    );
    if (picked != null && picked != _selectedTime) {
      setState(() {
        _selectedTime = picked;
      });
    }
  }

  String? _validateFullName(String? value) {
    if (value == null || value.trim().isEmpty) {
      return 'Full name is required';
    }
    if (value.trim().length < 2) {
      return 'Full name must be at least 2 characters';
    }
    return null;
  }

  String? _validatePlaceOfBirth(String? value) {
    if (value == null || value.trim().isEmpty) {
      return 'Place of birth is required';
    }
    if (value.trim().length < 2) {
      return 'Place of birth must be at least 2 characters';
    }
    return null;
  }

  String? _validateDateOfBirth() {
    if (_selectedDate == null) {
      return 'Date of birth is required';
    }
    if (_selectedDate!.isAfter(DateTime.now())) {
      return 'Date of birth cannot be in the future';
    }
    return null;
  }

  Future<void> _saveUser() async {
    if (!_formKey.currentState!.validate()) {
      return;
    }

    if (_validateDateOfBirth() != null) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(_validateDateOfBirth()!)),
      );
      return;
    }

    setState(() {
      _isLoading = true;
    });

    try {
      // Get location data if available
      String placeOfBirth = _placeOfBirthController.text.trim();
      if (_selectedCountry != null && _selectedCity != null) {
        final locationData = LocationService.getLocationData(_selectedCountry!, _selectedCity!);
        placeOfBirth = '${_selectedCity}, ${_selectedCountry}';
      }

      final user = User(
        fullName: _fullNameController.text.trim(),
        dateOfBirth: _selectedDate!,
        timeOfBirth: _selectedTime != null 
            ? DateTime(
                _selectedDate!.year,
                _selectedDate!.month,
                _selectedDate!.day,
                _selectedTime!.hour,
                _selectedTime!.minute,
              )
            : null,
        placeOfBirth: placeOfBirth,
      );

      await DatabaseService.saveUser(user);

      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Profile saved successfully!'),
            backgroundColor: Colors.green,
          ),
        );
        // Navigate to the main app instead of just popping
        Navigator.of(context).pushReplacement(
          MaterialPageRoute(
            builder: (context) => const EnhancedHomeScreen(),
          ),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Error saving profile: $e'),
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

  @override
  void dispose() {
    _fullNameController.dispose();
    _placeOfBirthController.dispose();
    super.dispose();
  }

  Widget _buildTranslationBar() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            AppTheme.electricViolet.withOpacity(0.1),
            AppTheme.cosmicPurple.withOpacity(0.1),
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: AppTheme.electricViolet.withOpacity(0.3),
          width: 1,
        ),
      ),
      child: Row(
        children: [
          Icon(Icons.translate, color: AppTheme.electricViolet, size: 20),
          const SizedBox(width: 8),
          Text(
            TranslationService.translate('language'),
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
              color: AppTheme.electricViolet,
              fontWeight: FontWeight.w600,
            ),
          ),
          const Spacer(),
          DropdownButton<String>(
            value: _currentLanguage,
            dropdownColor: AppTheme.cosmicNavy,
            style: TextStyle(
              color: AppTheme.starlightWhite,
              fontSize: 14,
            ),
            underline: Container(),
            icon: Icon(Icons.keyboard_arrow_down, color: AppTheme.electricViolet),
            items: [
              DropdownMenuItem(
                value: 'en',
                child: Text('English', style: TextStyle(color: AppTheme.starlightWhite)),
              ),
              DropdownMenuItem(
                value: 'si',
                child: Text('සිංහල', style: TextStyle(color: AppTheme.starlightWhite)),
              ),
              DropdownMenuItem(
                value: 'ta',
                child: Text('தமிழ்', style: TextStyle(color: AppTheme.starlightWhite)),
              ),
              DropdownMenuItem(
                value: 'hi',
                child: Text('हिन्दी', style: TextStyle(color: AppTheme.starlightWhite)),
              ),
            ],
            onChanged: (String? newLanguage) {
              if (newLanguage != null) {
                setState(() {
                  _currentLanguage = newLanguage;
                });
                TranslationService.setLanguage(newLanguage);
              }
            },
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.cream,
      appBar: AppBar(
        title: Text(TranslationService.translate('profile')),
        backgroundColor: Colors.transparent,
        elevation: 0,
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.fromLTRB(20, 20, 20, 100), // Added bottom padding
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                _buildTranslationBar(),
                const SizedBox(height: 20),
                // Header Card
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
                        Icons.person_outline,
                        size: 48,
                        color: Colors.white,
                      ),
                      const SizedBox(height: 12),
                      Text(
                        'Complete Your Profile',
                        style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        'Help us personalize your cosmic experience',
                        style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                          color: Colors.white70,
                        ),
                        textAlign: TextAlign.center,
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 24),

                // Form Card
                Container(
                  padding: const EdgeInsets.all(24),
                  decoration: BoxDecoration(
                    color: AppTheme.starlightWhite,
                    borderRadius: BorderRadius.circular(20),
                    boxShadow: [
                      BoxShadow(
                        color: AppTheme.mysticalPurple.withOpacity(0.1),
                        blurRadius: 10,
                        offset: const Offset(0, 4),
                      ),
                    ],
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Personal Information',
                        style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                          fontWeight: FontWeight.w700,
                          color: Colors.black87,
                        ),
                      ),
                      const SizedBox(height: 24),
                      
                      // Full Name Field
                      TextFormField(
                        controller: _fullNameController,
                        style: const TextStyle(color: Colors.black87),
                        decoration: const InputDecoration(
                          labelText: 'Full Name *',
                          hintText: 'Enter your full name',
                          border: OutlineInputBorder(),
                          prefixIcon: Icon(Icons.person_outline),
                          labelStyle: TextStyle(color: Colors.black87),
                          hintStyle: TextStyle(color: Colors.grey),
                        ),
                        validator: _validateFullName,
                        textCapitalization: TextCapitalization.words,
                        inputFormatters: [
                          FilteringTextInputFormatter.allow(RegExp(r'[a-zA-Z\s]')),
                        ],
                      ),
                      const SizedBox(height: 20),
                      
                      // Date of Birth Field
                      InkWell(
                        onTap: _selectDate,
                        child: InputDecorator(
                          decoration: const InputDecoration(
                            labelText: 'Date of Birth *',
                            border: OutlineInputBorder(),
                            prefixIcon: Icon(Icons.calendar_today_outlined),
                          ),
                          child: Text(
                            _selectedDate != null
                                ? '${_selectedDate!.day}/${_selectedDate!.month}/${_selectedDate!.year}'
                                : 'Select date of birth',
                            style: TextStyle(
                              color: _selectedDate != null 
                                  ? Colors.black87 
                                  : Colors.grey[600],
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(height: 20),
                      
                      // Time of Birth Field (Optional)
                      InkWell(
                        onTap: _selectTime,
                        child: InputDecorator(
                          decoration: const InputDecoration(
                            labelText: 'Time of Birth (Optional)',
                            border: OutlineInputBorder(),
                            prefixIcon: Icon(Icons.access_time_outlined),
                          ),
                          child: Text(
                            _selectedTime != null
                                ? _selectedTime!.format(context)
                                : 'Select time of birth (optional)',
                            style: TextStyle(
                              color: _selectedTime != null 
                                  ? Colors.black87 
                                  : Colors.grey[600],
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(height: 20),
                      
                      // Place of Birth Field
                      TextFormField(
                        controller: _placeOfBirthController,
                        style: const TextStyle(color: Colors.black87),
                        decoration: const InputDecoration(
                          labelText: 'Place of Birth *',
                          hintText: 'Enter your place of birth',
                          border: OutlineInputBorder(),
                          prefixIcon: Icon(Icons.location_on_outlined),
                          labelStyle: TextStyle(color: Colors.black87),
                          hintStyle: TextStyle(color: Colors.grey),
                        ),
                        validator: _validatePlaceOfBirth,
                        textCapitalization: TextCapitalization.words,
                        inputFormatters: [
                          FilteringTextInputFormatter.allow(RegExp(r'[a-zA-Z\s]')),
                        ],
                      ),
                      const SizedBox(height: 24),
                      
                      // Location Selector
                      Container(
                        constraints: const BoxConstraints(
                          maxHeight: 200, // Limit height to prevent overflow
                        ),
                        child: LocationSelector(
                          selectedCountry: _selectedCountry,
                          selectedCity: _selectedCity,
                          onLocationChanged: (String country, String city) {
                            setState(() {
                              _selectedCountry = country;
                              _selectedCity = city;
                            });
                          },
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 24),
                
                // Save Button
                ElevatedButton(
                  onPressed: _isLoading ? null : _saveUser,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppTheme.mysticalPurple,
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(16),
                    ),
                  ),
                  child: _isLoading 
                      ? const SizedBox(
                          height: 20,
                          width: 20,
                          child: CircularProgressIndicator(
                            strokeWidth: 2,
                            valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                          ),
                        )
                      : const Text(
                          'Save Profile',
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}








