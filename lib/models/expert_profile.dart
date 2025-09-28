class ExpertProfile {
  final String id;
  final String name;
  final String title;
  final String specialization;
  final String bio;
  final String imageUrl;
  final List<String> certifications;
  final List<String> specialties;
  final int experienceYears;
  final double rating;
  final int totalReadings;
  final String languages;
  final String availability;
  final double consultationPrice;
  final bool isAvailable;
  final List<String> services;
  final String education;
  final List<String> achievements;

  ExpertProfile({
    required this.id,
    required this.name,
    required this.title,
    required this.specialization,
    required this.bio,
    required this.imageUrl,
    required this.certifications,
    required this.specialties,
    required this.experienceYears,
    required this.rating,
    required this.totalReadings,
    required this.languages,
    required this.availability,
    required this.consultationPrice,
    required this.isAvailable,
    required this.services,
    required this.education,
    required this.achievements,
  });

  factory ExpertProfile.fromJson(Map<String, dynamic> json) {
    return ExpertProfile(
      id: json['id'] ?? '',
      name: json['name'] ?? '',
      title: json['title'] ?? '',
      specialization: json['specialization'] ?? '',
      bio: json['bio'] ?? '',
      imageUrl: json['imageUrl'] ?? '',
      certifications: List<String>.from(json['certifications'] ?? []),
      specialties: List<String>.from(json['specialties'] ?? []),
      experienceYears: json['experienceYears'] ?? 0,
      rating: (json['rating'] ?? 0.0).toDouble(),
      totalReadings: json['totalReadings'] ?? 0,
      languages: json['languages'] ?? '',
      availability: json['availability'] ?? '',
      consultationPrice: (json['consultationPrice'] ?? 0.0).toDouble(),
      isAvailable: json['isAvailable'] ?? false,
      services: List<String>.from(json['services'] ?? []),
      education: json['education'] ?? '',
      achievements: List<String>.from(json['achievements'] ?? []),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'title': title,
      'specialization': specialization,
      'bio': bio,
      'imageUrl': imageUrl,
      'certifications': certifications,
      'specialties': specialties,
      'experienceYears': experienceYears,
      'rating': rating,
      'totalReadings': totalReadings,
      'languages': languages,
      'availability': availability,
      'consultationPrice': consultationPrice,
      'isAvailable': isAvailable,
      'services': services,
      'education': education,
      'achievements': achievements,
    };
  }
}
