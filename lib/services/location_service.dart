import 'package:flutter/material.dart';

class LocationService {
  static const Map<String, List<String>> countries = {
    'Sri Lanka': [
      'Colombo', 'Kandy', 'Galle', 'Jaffna', 'Negombo', 'Anuradhapura',
      'Trincomalee', 'Batticaloa', 'Kurunegala', 'Matara', 'Ratnapura',
      'Badulla', 'Kalutara', 'Chilaw', 'Nuwara Eliya', 'Polonnaruwa',
      'Mannar', 'Vavuniya', 'Monaragala', 'Hambantota'
    ],
    'India': [
      'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad',
      'Pune', 'Ahmedabad', 'Jaipur', 'Surat', 'Lucknow', 'Kanpur',
      'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri',
      'Patna', 'Vadodara'
    ],
    'United States': [
      'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix',
      'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose',
      'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'Charlotte',
      'San Francisco', 'Indianapolis', 'Seattle', 'Denver', 'Washington'
    ],
    'United Kingdom': [
      'London', 'Birmingham', 'Manchester', 'Glasgow', 'Liverpool',
      'Leeds', 'Sheffield', 'Edinburgh', 'Bristol', 'Leicester',
      'Coventry', 'Cardiff', 'Belfast', 'Nottingham', 'Newcastle',
      'Brighton', 'Hull', 'Plymouth', 'Stoke-on-Trent', 'Wolverhampton'
    ],
    'Australia': [
      'Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast',
      'Newcastle', 'Canberra', 'Sunshine Coast', 'Wollongong', 'Hobart',
      'Geelong', 'Townsville', 'Cairns', 'Darwin', 'Toowoomba', 'Ballarat',
      'Bendigo', 'Albury', 'Launceston'
    ],
    'Canada': [
      'Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton',
      'Ottawa', 'Winnipeg', 'Quebec City', 'Hamilton', 'Kitchener',
      'London', 'Victoria', 'Halifax', 'Oshawa', 'Windsor', 'Saskatoon',
      'Regina', 'Sherbrooke', 'Kelowna', 'Barrie'
    ],
    'Germany': [
      'Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt', 'Stuttgart',
      'Düsseldorf', 'Dortmund', 'Essen', 'Leipzig', 'Bremen', 'Dresden',
      'Hannover', 'Nuremberg', 'Duisburg', 'Bochum', 'Wuppertal', 'Bielefeld',
      'Bonn', 'Münster'
    ],
    'France': [
      'Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes',
      'Strasbourg', 'Montpellier', 'Bordeaux', 'Lille', 'Rennes',
      'Reims', 'Le Havre', 'Saint-Étienne', 'Toulon', 'Grenoble',
      'Dijon', 'Angers', 'Nîmes', 'Villeurbanne'
    ],
    'Japan': [
      'Tokyo', 'Yokohama', 'Osaka', 'Nagoya', 'Sapporo', 'Fukuoka',
      'Kobe', 'Kawasaki', 'Kyoto', 'Saitama', 'Hiroshima', 'Sendai',
      'Chiba', 'Kitakyushu', 'Sakai', 'Niigata', 'Hamamatsu', 'Kumamoto',
      'Sagamihara', 'Okayama'
    ],
    'China': [
      'Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Tianjin', 'Wuhan',
      'Dongguan', 'Chengdu', 'Nanjing', 'Chongqing', 'Hangzhou', 'Qingdao',
      'Dalian', 'Jinan', 'Shenyang', 'Xiamen', 'Fuzhou', 'Changsha',
      'Zhengzhou', 'Kunming'
    ]
  };

  static List<String> getCountries() {
    return countries.keys.toList()..sort();
  }

  static List<String> getCitiesForCountry(String country) {
    return countries[country] ?? [];
  }

  static String getCountryCode(String country) {
    const countryCodes = {
      'Sri Lanka': 'LK',
      'India': 'IN',
      'United States': 'US',
      'United Kingdom': 'GB',
      'Australia': 'AU',
      'Canada': 'CA',
      'Germany': 'DE',
      'France': 'FR',
      'Japan': 'JP',
      'China': 'CN',
    };
    return countryCodes[country] ?? 'LK';
  }

  static String getTimezoneForCity(String country, String city) {
    // Simplified timezone mapping - in a real app, you'd use a proper timezone database
    const timezoneMap = {
      'Sri Lanka': 'Asia/Colombo',
      'India': 'Asia/Kolkata',
      'United States': {
        'New York': 'America/New_York',
        'Los Angeles': 'America/Los_Angeles',
        'Chicago': 'America/Chicago',
        'Houston': 'America/Chicago',
        'Phoenix': 'America/Phoenix',
      },
      'United Kingdom': 'Europe/London',
      'Australia': {
        'Sydney': 'Australia/Sydney',
        'Melbourne': 'Australia/Melbourne',
        'Brisbane': 'Australia/Brisbane',
        'Perth': 'Australia/Perth',
      },
      'Canada': {
        'Toronto': 'America/Toronto',
        'Vancouver': 'America/Vancouver',
        'Montreal': 'America/Montreal',
      },
      'Germany': 'Europe/Berlin',
      'France': 'Europe/Paris',
      'Japan': 'Asia/Tokyo',
      'China': 'Asia/Shanghai',
    };

    final timezone = timezoneMap[country];
    if (timezone is String) {
      return timezone;
    } else if (timezone is Map<String, String>) {
      return timezone[city] ?? timezone.values.first;
    }
    return 'Asia/Colombo'; // Default fallback
  }

  static Map<String, dynamic> getLocationData(String country, String city) {
    return {
      'country': country,
      'city': city,
      'countryCode': getCountryCode(country),
      'timezone': getTimezoneForCity(country, city),
      'coordinates': _getCoordinates(country, city),
    };
  }

  static Map<String, double> _getCoordinates(String country, String city) {
    // Simplified coordinates - in a real app, you'd use a geocoding service
    const coordinates = {
      'Sri Lanka': {
        'Colombo': {'lat': 6.9271, 'lng': 79.8612},
        'Kandy': {'lat': 7.2906, 'lng': 80.6337},
        'Galle': {'lat': 6.0329, 'lng': 80.2170},
        'Jaffna': {'lat': 9.6615, 'lng': 80.0255},
      },
      'India': {
        'Mumbai': {'lat': 19.0760, 'lng': 72.8777},
        'Delhi': {'lat': 28.7041, 'lng': 77.1025},
        'Chennai': {'lat': 13.0827, 'lng': 80.2707},
        'Kolkata': {'lat': 22.5726, 'lng': 88.3639},
      },
      'United States': {
        'New York': {'lat': 40.7128, 'lng': -74.0060},
        'Los Angeles': {'lat': 34.0522, 'lng': -118.2437},
        'Chicago': {'lat': 41.8781, 'lng': -87.6298},
      },
    };

    final countryCoords = coordinates[country];
    if (countryCoords != null && countryCoords[city] != null) {
      return countryCoords[city]!;
    }
    
    // Default coordinates for Sri Lanka
    return {'lat': 6.9271, 'lng': 79.8612};
  }
}
