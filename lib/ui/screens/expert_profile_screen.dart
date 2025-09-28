import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../../models/expert_profile.dart';

class ExpertProfileScreen extends StatefulWidget {
  final ExpertProfile expert;

  const ExpertProfileScreen({super.key, required this.expert});

  @override
  State<ExpertProfileScreen> createState() => _ExpertProfileScreenState();
}

class _ExpertProfileScreenState extends State<ExpertProfileScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.expert.name),
        backgroundColor: AppTheme.deepSpaceBlack,
        foregroundColor: AppTheme.starlightWhite,
      ),
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [AppTheme.deepSpaceBlack, AppTheme.darkBackground],
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
          ),
        ),
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _buildExpertHeader(),
              const SizedBox(height: 32),
              _buildExpertInfo(),
              const SizedBox(height: 32),
              _buildSpecialties(),
              const SizedBox(height: 32),
              _buildServices(),
              const SizedBox(height: 32),
              _buildCertifications(),
              const SizedBox(height: 32),
              _buildAvailability(),
              const SizedBox(height: 32),
              _buildBookingSection(),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildExpertHeader() {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        gradient: AppTheme.cosmicGradient,
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color: AppTheme.electricViolet.withOpacity(0.3),
            blurRadius: 20,
            offset: const Offset(0, 10),
          ),
        ],
      ),
      child: Column(
        children: [
          CircleAvatar(
            radius: 60,
            backgroundColor: AppTheme.starlightWhite.withOpacity(0.2),
            child: Icon(
              Icons.person,
              size: 60,
              color: AppTheme.starlightWhite,
            ),
          ),
          const SizedBox(height: 16),
          Text(
            widget.expert.name,
            style: TextStyle(
              fontSize: 28,
              fontWeight: FontWeight.bold,
              color: AppTheme.starlightWhite,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            widget.expert.title,
            style: TextStyle(
              fontSize: 18,
              color: AppTheme.electricViolet,
              fontWeight: FontWeight.w600,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            widget.expert.specialization,
            style: TextStyle(
              fontSize: 16,
              color: AppTheme.starlightWhite.withOpacity(0.9),
            ),
          ),
          const SizedBox(height: 16),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(Icons.star, color: AppTheme.supernovaGold, size: 20),
              const SizedBox(width: 8),
              Text(
                widget.expert.rating.toString(),
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                  color: AppTheme.starlightWhite,
                ),
              ),
              const SizedBox(width: 16),
              Text(
                '${widget.expert.totalReadings} readings',
                style: TextStyle(
                  fontSize: 16,
                  color: AppTheme.starlightWhite.withOpacity(0.8),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildExpertInfo() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [AppTheme.celestialBlue.withOpacity(0.1), AppTheme.celestialBlue.withOpacity(0.05)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppTheme.celestialBlue.withOpacity(0.3)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'About ${widget.expert.name}',
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
              color: AppTheme.celestialBlue,
            ),
          ),
          const SizedBox(height: 16),
          Text(
            widget.expert.bio,
            style: TextStyle(
              fontSize: 16,
              color: AppTheme.starlightWhite.withOpacity(0.9),
              height: 1.6,
            ),
          ),
          const SizedBox(height: 16),
          Row(
            children: [
              Icon(Icons.school, color: AppTheme.celestialBlue, size: 20),
              const SizedBox(width: 8),
              Text(
                'Education: ${widget.expert.education}',
                style: TextStyle(
                  fontSize: 14,
                  color: AppTheme.starlightWhite.withOpacity(0.8),
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Row(
            children: [
              Icon(Icons.work, color: AppTheme.celestialBlue, size: 20),
              const SizedBox(width: 8),
              Text(
                'Experience: ${widget.expert.experienceYears} years',
                style: TextStyle(
                  fontSize: 14,
                  color: AppTheme.starlightWhite.withOpacity(0.8),
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Row(
            children: [
              Icon(Icons.language, color: AppTheme.celestialBlue, size: 20),
              const SizedBox(width: 8),
              Text(
                'Languages: ${widget.expert.languages}',
                style: TextStyle(
                  fontSize: 14,
                  color: AppTheme.starlightWhite.withOpacity(0.8),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildSpecialties() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [AppTheme.supernovaGold.withOpacity(0.1), AppTheme.supernovaGold.withOpacity(0.05)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppTheme.supernovaGold.withOpacity(0.3)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Specialties',
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
              color: AppTheme.supernovaGold,
            ),
          ),
          const SizedBox(height: 16),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: widget.expert.specialties.map((specialty) => Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
              decoration: BoxDecoration(
                color: AppTheme.supernovaGold.withOpacity(0.2),
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: AppTheme.supernovaGold.withOpacity(0.3)),
              ),
              child: Text(
                specialty,
                style: TextStyle(
                  fontSize: 14,
                  color: AppTheme.starlightWhite,
                  fontWeight: FontWeight.w600,
                ),
              ),
            )).toList(),
          ),
        ],
      ),
    );
  }

  Widget _buildServices() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [AppTheme.nebulaPink.withOpacity(0.1), AppTheme.nebulaPink.withOpacity(0.05)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppTheme.nebulaPink.withOpacity(0.3)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Services Offered',
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
              color: AppTheme.nebulaPink,
            ),
          ),
          const SizedBox(height: 16),
          ...widget.expert.services.map((service) => Padding(
            padding: const EdgeInsets.symmetric(vertical: 4),
            child: Row(
              children: [
                Icon(Icons.check_circle, color: AppTheme.nebulaPink, size: 16),
                const SizedBox(width: 8),
                Text(
                  service,
                  style: TextStyle(
                    fontSize: 16,
                    color: AppTheme.starlightWhite.withOpacity(0.9),
                  ),
                ),
              ],
            ),
          )),
        ],
      ),
    );
  }

  Widget _buildCertifications() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [AppTheme.auroraGreen.withOpacity(0.1), AppTheme.auroraGreen.withOpacity(0.05)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppTheme.auroraGreen.withOpacity(0.3)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Certifications & Achievements',
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
              color: AppTheme.auroraGreen,
            ),
          ),
          const SizedBox(height: 16),
          ...widget.expert.certifications.map((cert) => Padding(
            padding: const EdgeInsets.symmetric(vertical: 4),
            child: Row(
              children: [
                Icon(Icons.verified, color: AppTheme.auroraGreen, size: 16),
                const SizedBox(width: 8),
                Text(
                  cert,
                  style: TextStyle(
                    fontSize: 16,
                    color: AppTheme.starlightWhite.withOpacity(0.9),
                  ),
                ),
              ],
            ),
          )),
          const SizedBox(height: 12),
          ...widget.expert.achievements.map((achievement) => Padding(
            padding: const EdgeInsets.symmetric(vertical: 4),
            child: Row(
              children: [
                Icon(Icons.emoji_events, color: AppTheme.supernovaGold, size: 16),
                const SizedBox(width: 8),
                Text(
                  achievement,
                  style: TextStyle(
                    fontSize: 16,
                    color: AppTheme.starlightWhite.withOpacity(0.9),
                  ),
                ),
              ],
            ),
          )),
        ],
      ),
    );
  }

  Widget _buildAvailability() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [AppTheme.electricViolet.withOpacity(0.1), AppTheme.electricViolet.withOpacity(0.05)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppTheme.electricViolet.withOpacity(0.3)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Availability',
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
              color: AppTheme.electricViolet,
            ),
          ),
          const SizedBox(height: 16),
          Row(
            children: [
              Icon(Icons.schedule, color: AppTheme.electricViolet, size: 20),
              const SizedBox(width: 8),
              Text(
                widget.expert.availability,
                style: TextStyle(
                  fontSize: 16,
                  color: AppTheme.starlightWhite.withOpacity(0.9),
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Row(
            children: [
              Icon(
                widget.expert.isAvailable ? Icons.check_circle : Icons.cancel,
                color: widget.expert.isAvailable ? AppTheme.auroraGreen : AppTheme.nebulaPink,
                size: 20,
              ),
              const SizedBox(width: 8),
              Text(
                widget.expert.isAvailable ? 'Currently Available' : 'Currently Unavailable',
                style: TextStyle(
                  fontSize: 16,
                  color: AppTheme.starlightWhite.withOpacity(0.9),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildBookingSection() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [AppTheme.supernovaGold.withOpacity(0.1), AppTheme.supernovaGold.withOpacity(0.05)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppTheme.supernovaGold.withOpacity(0.3)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Book a Consultation',
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
              color: AppTheme.supernovaGold,
            ),
          ),
          const SizedBox(height: 16),
          Row(
            children: [
              Text(
                'Price: ',
                style: TextStyle(
                  fontSize: 18,
                  color: AppTheme.starlightWhite,
                ),
              ),
              Text(
                '\$${widget.expert.consultationPrice.toInt()}',
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                  color: AppTheme.supernovaGold,
                ),
              ),
              Text(
                ' per session',
                style: TextStyle(
                  fontSize: 16,
                  color: AppTheme.starlightWhite.withOpacity(0.8),
                ),
              ),
            ],
          ),
          const SizedBox(height: 20),
          Row(
            children: [
              Expanded(
                child: ElevatedButton.icon(
                  onPressed: widget.expert.isAvailable ? () {
                    // Handle booking
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(
                        content: Text('Booking consultation with ${widget.expert.name}'),
                        backgroundColor: AppTheme.auroraGreen,
                      ),
                    );
                  } : null,
                  icon: const Icon(Icons.calendar_today),
                  label: const Text('Book Now'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppTheme.supernovaGold,
                    foregroundColor: AppTheme.deepSpaceBlack,
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: ElevatedButton.icon(
                  onPressed: () {
                    // Handle message
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(
                        content: Text('Messaging ${widget.expert.name}'),
                        backgroundColor: AppTheme.celestialBlue,
                      ),
                    );
                  },
                  icon: const Icon(Icons.message),
                  label: const Text('Message'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppTheme.celestialBlue,
                    foregroundColor: AppTheme.starlightWhite,
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
