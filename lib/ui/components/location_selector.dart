import 'package:flutter/material.dart';
import '../../services/translation_service.dart';
import '../../services/location_service.dart';

class LocationSelector extends StatefulWidget {
  final String? selectedCountry;
  final String? selectedCity;
  final Function(String country, String city) onLocationChanged;

  const LocationSelector({
    super.key,
    this.selectedCountry,
    this.selectedCity,
    required this.onLocationChanged,
  });

  @override
  State<LocationSelector> createState() => _LocationSelectorState();
}

class _LocationSelectorState extends State<LocationSelector> {
  String? _selectedCountry;
  String? _selectedCity;
  List<String> _availableCities = [];

  @override
  void initState() {
    super.initState();
    _selectedCountry = widget.selectedCountry;
    _selectedCity = widget.selectedCity;
    _loadCities();
  }

  void _loadCities() {
    if (_selectedCountry != null) {
      _availableCities = LocationService.getCitiesForCountry(_selectedCountry!);
    }
  }

  void _notifyLocationChanged() {
    if (_selectedCountry != null && _selectedCity != null) {
      widget.onLocationChanged(_selectedCountry!, _selectedCity!);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Country Dropdown
        _buildDropdown(
          label: TranslationService.translate('country'),
          value: _selectedCountry,
          items: LocationService.getCountries(),
          onChanged: (String? newCountry) {
            setState(() {
              _selectedCountry = newCountry;
              _selectedCity = null;
              _availableCities = newCountry != null 
                  ? LocationService.getCitiesForCountry(newCountry)
                  : [];
            });
            _notifyLocationChanged();
          },
          icon: Icons.public,
          enabled: true,
        ),
        
        const SizedBox(height: 16),
        
        // City Dropdown
        _buildDropdown(
          label: TranslationService.translate('city'),
          value: _selectedCity,
          items: _availableCities,
          onChanged: _availableCities.isEmpty 
              ? (String? newCity) {
                  // Do nothing when no cities available
                }
              : (String? newCity) {
                  setState(() {
                    _selectedCity = newCity;
                  });
                  _notifyLocationChanged();
                },
          icon: Icons.location_city,
          enabled: _availableCities.isNotEmpty,
        ),
      ],
    );
  }

  Widget _buildDropdown({
    required String label,
    required String? value,
    required List<String> items,
    required Function(String?) onChanged,
    required IconData icon,
    required bool enabled,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: Theme.of(context).textTheme.labelLarge?.copyWith(
            color: Colors.black87,
            fontWeight: FontWeight.w600,
          ),
        ),
        const SizedBox(height: 8),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
          decoration: BoxDecoration(
            color: enabled ? Colors.grey[100] : Colors.grey[200],
            borderRadius: BorderRadius.circular(12),
            border: Border.all(
              color: enabled ? Colors.grey[300]! : Colors.grey[400]!,
            ),
          ),
          child: DropdownButton<String>(
            value: value,
            items: items.map((String item) {
              return DropdownMenuItem<String>(
                value: item,
                child: ConstrainedBox(
                  constraints: const BoxConstraints(
                    maxWidth: 200, // Limit dropdown item width
                  ),
                  child: Text(
                    item,
                    style: TextStyle(
                      color: enabled ? Colors.black87 : Colors.grey[600],
                    ),
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
              );
            }).toList(),
            onChanged: enabled ? onChanged : null,
            icon: Icon(
              Icons.keyboard_arrow_down,
              color: enabled ? Colors.grey[600] : Colors.grey[400],
            ),
            underline: Container(),
            isExpanded: true,
            hint: Text(
              'Select $label',
              style: TextStyle(
                color: Colors.grey[600],
              ),
            ),
            // Add dropdown menu properties to control overflow
            dropdownColor: Colors.white,
            menuMaxHeight: 200, // Limit dropdown height
            itemHeight: 48, // Set consistent item height
            selectedItemBuilder: (BuildContext context) {
              return items.map<Widget>((String item) {
                return Container(
                  constraints: const BoxConstraints(
                    maxWidth: 200,
                  ),
                  child: Text(
                    item,
                    style: TextStyle(
                      color: enabled ? Colors.black87 : Colors.grey[600],
                    ),
                    overflow: TextOverflow.ellipsis,
                  ),
                );
              }).toList();
            },
          ),
        ),
      ],
    );
  }
}