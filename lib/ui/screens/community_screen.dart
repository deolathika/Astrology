import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../../services/translation_service.dart';
import '../../services/database_service.dart';
import '../../models/user.dart';
import 'cosmic_profile_analysis_screen.dart';

class CommunityScreen extends StatefulWidget {
  const CommunityScreen({super.key});

  @override
  State<CommunityScreen> createState() => _CommunityScreenState();
}

class _CommunityScreenState extends State<CommunityScreen> with TickerProviderStateMixin {
  String _currentLanguage = 'en';
  late AnimationController _animationController;
  late Animation<double> _fadeAnimation;
  late AnimationController _pulseController;
  late Animation<double> _pulseAnimation;
  
  int _selectedTab = 0;
  final List<String> _tabs = ['Discover', 'Matches', 'Groups', 'Events', 'Chat'];
  
  // Mock data for community features
  final List<Map<String, dynamic>> _discoverUsers = [
    {
      'id': '1',
      'name': 'Sarah Johnson',
      'age': 28,
      'location': 'New York, USA',
      'zodiac': 'Leo',
      'numerology': 7,
      'interests': ['Astrology', 'Meditation', 'Yoga'],
      'compatibility': 95,
      'image': '👩‍🦰',
      'isOnline': true,
    },
    {
      'id': '2',
      'name': 'Michael Chen',
      'age': 32,
      'location': 'Los Angeles, USA',
      'zodiac': 'Scorpio',
      'numerology': 3,
      'interests': ['Numerology', 'Tarot', 'Spirituality'],
      'compatibility': 88,
      'image': '👨‍💼',
      'isOnline': false,
    },
    {
      'id': '3',
      'name': 'Priya Sharma',
      'age': 25,
      'location': 'Mumbai, India',
      'zodiac': 'Pisces',
      'numerology': 9,
      'interests': ['Vedic Astrology', 'Dreams', 'Healing'],
      'compatibility': 92,
      'image': '👩‍🎨',
      'isOnline': true,
    },
  ];

  final List<Map<String, dynamic>> _matches = [
    {
      'id': '1',
      'name': 'Alex Thompson',
      'compatibility': 98,
      'zodiac': 'Aries',
      'numerology': 1,
      'lastMessage': 'The stars are perfectly aligned for us!',
      'timestamp': '2 hours ago',
      'image': '👨‍🚀',
    },
    {
      'id': '2',
      'name': 'Emma Wilson',
      'compatibility': 94,
      'zodiac': 'Gemini',
      'numerology': 5,
      'lastMessage': 'Your numerology reading was so accurate!',
      'timestamp': '5 hours ago',
      'image': '👩‍🔬',
    },
  ];

  final List<Map<String, dynamic>> _groups = [
    {
      'id': '1',
      'name': 'Cosmic Meditation Circle',
      'members': 156,
      'description': 'Daily meditation and cosmic energy sharing',
      'image': '🧘‍♀️',
      'isActive': true,
    },
    {
      'id': '2',
      'name': 'Astrology Study Group',
      'members': 89,
      'description': 'Learning and discussing astrology together',
      'image': '🔮',
      'isActive': true,
    },
    {
      'id': '3',
      'name': 'Numerology Masters',
      'members': 234,
      'description': 'Advanced numerology discussions and readings',
      'image': '🔢',
      'isActive': false,
    },
  ];

  final List<Map<String, dynamic>> _events = [
    {
      'id': '1',
      'title': 'Full Moon Meditation',
      'date': '2024-01-15',
      'time': '8:00 PM',
      'location': 'Virtual',
      'attendees': 45,
      'description': 'Join us for a powerful full moon meditation session',
      'image': '🌕',
    },
    {
      'id': '2',
      'title': 'Astrology Workshop',
      'date': '2024-01-20',
      'time': '2:00 PM',
      'location': 'Community Center',
      'attendees': 23,
      'description': 'Learn the basics of reading birth charts',
      'image': '⭐',
    },
  ];

  @override
  void initState() {
    super.initState();
    _currentLanguage = TranslationService.currentLanguage;
    
    _animationController = AnimationController(
      duration: const Duration(milliseconds: 1200),
      vsync: this,
    );
    _fadeAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _animationController, curve: Curves.easeInOut),
    );
    
    _pulseController = AnimationController(
      duration: const Duration(seconds: 2),
      vsync: this,
    );
    _pulseAnimation = Tween<double>(begin: 0.8, end: 1.2).animate(
      CurvedAnimation(parent: _pulseController, curve: Curves.easeInOut),
    );
    
    _animationController.forward();
    _pulseController.repeat(reverse: true);
  }

  @override
  void dispose() {
    _animationController.dispose();
    _pulseController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.deepSpaceBlack,
      appBar: AppBar(
        title: Text(TranslationService.translate('community')),
        backgroundColor: Colors.transparent,
        elevation: 0,
        foregroundColor: AppTheme.starlightWhite,
        actions: [
          IconButton(
            icon: const Icon(Icons.close),
            onPressed: () => Navigator.pop(context),
          ),
        ],
      ),
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [
              AppTheme.deepSpaceBlack,
              AppTheme.cosmicNavy,
              AppTheme.nebulaDark,
            ],
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
          ),
        ),
        child: SafeArea(
          child: FadeTransition(
            opacity: _fadeAnimation,
            child: Column(
              children: [
                _buildTranslationBar(),
                _buildTabBar(),
                Expanded(
                  child: _buildTabContent(),
                ),
              ],
            ),
          ),
        ),
      ),
    );
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
      margin: const EdgeInsets.all(16),
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

  Widget _buildTabBar() {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            AppTheme.electricViolet.withOpacity(0.1),
            AppTheme.cosmicPurple.withOpacity(0.1),
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: AppTheme.electricViolet.withOpacity(0.3),
          width: 1,
        ),
      ),
      child: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: Row(
          children: _tabs.asMap().entries.map((entry) {
            int index = entry.key;
            String tab = entry.value;
            bool isSelected = _selectedTab == index;
            
            return GestureDetector(
              onTap: () => setState(() => _selectedTab = index),
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                margin: const EdgeInsets.all(4),
                decoration: BoxDecoration(
                  gradient: isSelected
                      ? LinearGradient(
                          colors: [AppTheme.electricViolet, AppTheme.cosmicPurple],
                        )
                      : null,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Text(
                  tab,
                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                    color: isSelected ? Colors.white : AppTheme.starlightWhite,
                    fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                  ),
                ),
              ),
            );
          }).toList(),
        ),
      ),
    );
  }

  Widget _buildTabContent() {
    switch (_selectedTab) {
      case 0:
        return _buildDiscoverTab();
      case 1:
        return _buildMatchesTab();
      case 2:
        return _buildGroupsTab();
      case 3:
        return _buildEventsTab();
      case 4:
        return _buildChatTab();
      default:
        return _buildDiscoverTab();
    }
  }

  Widget _buildDiscoverTab() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildSectionHeader('Discover Cosmic Souls', Icons.explore, AppTheme.electricViolet),
          const SizedBox(height: 16),
          ..._discoverUsers.map((user) => _buildUserCard(user)).toList(),
        ],
      ),
    );
  }

  Widget _buildMatchesTab() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildSectionHeader('Your Cosmic Matches', Icons.favorite, AppTheme.nebulaPink),
          const SizedBox(height: 16),
          ..._matches.map((match) => _buildMatchCard(match)).toList(),
        ],
      ),
    );
  }

  Widget _buildGroupsTab() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildSectionHeader('Cosmic Groups', Icons.group, AppTheme.celestialBlue),
          const SizedBox(height: 16),
          ..._groups.map((group) => _buildGroupCard(group)).toList(),
        ],
      ),
    );
  }

  Widget _buildEventsTab() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildSectionHeader('Cosmic Events', Icons.event, AppTheme.supernovaGold),
          const SizedBox(height: 16),
          ..._events.map((event) => _buildEventCard(event)).toList(),
        ],
      ),
    );
  }

  Widget _buildChatTab() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildSectionHeader('Cosmic Conversations', Icons.chat, AppTheme.auroraGreen),
          const SizedBox(height: 16),
          _buildChatOverview(),
        ],
      ),
    );
  }

  Widget _buildSectionHeader(String title, IconData icon, Color color) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [color.withOpacity(0.1), color.withOpacity(0.05)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: color.withOpacity(0.3)),
      ),
      child: Row(
        children: [
          Icon(icon, color: color, size: 24),
          const SizedBox(width: 12),
          Text(
            title,
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
              color: color,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildUserCard(Map<String, dynamic> user) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            AppTheme.cosmicNavy.withOpacity(0.8),
            AppTheme.nebulaDark.withOpacity(0.8),
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: AppTheme.electricViolet.withOpacity(0.3),
          width: 1,
        ),
        boxShadow: [
          BoxShadow(
            color: AppTheme.electricViolet.withOpacity(0.1),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Row(
        children: [
          Stack(
            children: [
              Container(
                width: 60,
                height: 60,
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    colors: [AppTheme.electricViolet, AppTheme.cosmicPurple],
                  ),
                  shape: BoxShape.circle,
                ),
                child: Center(
                  child: Text(
                    user['image'],
                    style: const TextStyle(fontSize: 24),
                  ),
                ),
              ),
              if (user['isOnline'])
                Positioned(
                  right: 0,
                  bottom: 0,
                  child: Container(
                    width: 16,
                    height: 16,
                    decoration: BoxDecoration(
                      color: AppTheme.auroraGreen,
                      shape: BoxShape.circle,
                      border: Border.all(color: AppTheme.deepSpaceBlack, width: 2),
                    ),
                  ),
                ),
            ],
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  user['name'],
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    color: AppTheme.starlightWhite,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  '${user['age']} • ${user['location']}',
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                    color: AppTheme.cosmicSilver,
                  ),
                ),
                const SizedBox(height: 8),
                Row(
                  children: [
                    _buildZodiacChip(user['zodiac'], AppTheme.electricViolet),
                    const SizedBox(width: 8),
                    _buildNumerologyChip(user['numerology'], AppTheme.supernovaGold),
                    const SizedBox(width: 8),
                    _buildCompatibilityChip(user['compatibility'], AppTheme.auroraGreen),
                  ],
                ),
                const SizedBox(height: 8),
                Wrap(
                  spacing: 4,
                  runSpacing: 4,
                  children: (user['interests'] as List<String>).map((interest) {
                    return Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                      decoration: BoxDecoration(
                        color: AppTheme.electricViolet.withOpacity(0.2),
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(color: AppTheme.electricViolet.withOpacity(0.3)),
                      ),
                      child: Text(
                        interest,
                        style: Theme.of(context).textTheme.bodySmall?.copyWith(
                          color: AppTheme.electricViolet,
                          fontSize: 10,
                        ),
                      ),
                    );
                  }).toList(),
                ),
              ],
            ),
          ),
          Column(
            children: [
              GestureDetector(
                onTap: () => _showUserProfile(user),
                child: Container(
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      colors: [AppTheme.electricViolet, AppTheme.cosmicPurple],
                    ),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: const Icon(Icons.visibility, color: Colors.white, size: 16),
                ),
              ),
              const SizedBox(height: 8),
              GestureDetector(
                onTap: () => _startChat(user),
                child: Container(
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      colors: [AppTheme.auroraGreen, AppTheme.stellarTeal],
                    ),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: const Icon(Icons.chat, color: Colors.white, size: 16),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildMatchCard(Map<String, dynamic> match) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            AppTheme.nebulaPink.withOpacity(0.1),
            AppTheme.cosmicOrange.withOpacity(0.1),
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: AppTheme.nebulaPink.withOpacity(0.3),
          width: 1,
        ),
      ),
      child: Row(
        children: [
          Container(
            width: 50,
            height: 50,
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [AppTheme.nebulaPink, AppTheme.cosmicOrange],
              ),
              shape: BoxShape.circle,
            ),
            child: Center(
              child: Text(
                match['image'],
                style: const TextStyle(fontSize: 20),
              ),
            ),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  match['name'],
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    color: AppTheme.starlightWhite,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  match['lastMessage'],
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                    color: AppTheme.cosmicSilver,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  match['timestamp'],
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                    color: AppTheme.cosmicSilver.withOpacity(0.7),
                  ),
                ),
              ],
            ),
          ),
          Column(
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    colors: [AppTheme.nebulaPink, AppTheme.cosmicOrange],
                  ),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Text(
                  '${match['compatibility']}%',
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              const SizedBox(height: 8),
              GestureDetector(
                onTap: () => _openChat(match),
                child: Container(
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    color: AppTheme.nebulaPink.withOpacity(0.2),
                    borderRadius: BorderRadius.circular(8),
                    border: Border.all(color: AppTheme.nebulaPink.withOpacity(0.3)),
                  ),
                  child: const Icon(Icons.chat, color: AppTheme.nebulaPink, size: 16),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildGroupCard(Map<String, dynamic> group) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            AppTheme.celestialBlue.withOpacity(0.1),
            AppTheme.cosmicCyan.withOpacity(0.1),
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: AppTheme.celestialBlue.withOpacity(0.3),
          width: 1,
        ),
      ),
      child: Row(
        children: [
          Container(
            width: 50,
            height: 50,
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [AppTheme.celestialBlue, AppTheme.cosmicCyan],
              ),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Center(
              child: Text(
                group['image'],
                style: const TextStyle(fontSize: 20),
              ),
            ),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  group['name'],
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    color: AppTheme.starlightWhite,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  group['description'],
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                    color: AppTheme.cosmicSilver,
                  ),
                ),
                const SizedBox(height: 8),
                Row(
                  children: [
                    Icon(Icons.people, color: AppTheme.celestialBlue, size: 16),
                    const SizedBox(width: 4),
                    Text(
                      '${group['members']} members',
                      style: Theme.of(context).textTheme.bodySmall?.copyWith(
                        color: AppTheme.celestialBlue,
                      ),
                    ),
                    const SizedBox(width: 16),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                      decoration: BoxDecoration(
                        color: group['isActive'] 
                            ? AppTheme.auroraGreen.withOpacity(0.2)
                            : AppTheme.stellarGray.withOpacity(0.2),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Text(
                        group['isActive'] ? 'Active' : 'Inactive',
                        style: Theme.of(context).textTheme.bodySmall?.copyWith(
                          color: group['isActive'] ? AppTheme.auroraGreen : AppTheme.stellarGray,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
          GestureDetector(
            onTap: () => _joinGroup(group),
            child: Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [AppTheme.celestialBlue, AppTheme.cosmicCyan],
                ),
                borderRadius: BorderRadius.circular(8),
              ),
              child: const Icon(Icons.add, color: Colors.white, size: 16),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildEventCard(Map<String, dynamic> event) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            AppTheme.supernovaGold.withOpacity(0.1),
            AppTheme.stellarYellow.withOpacity(0.1),
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: AppTheme.supernovaGold.withOpacity(0.3),
          width: 1,
        ),
      ),
      child: Row(
        children: [
          Container(
            width: 50,
            height: 50,
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [AppTheme.supernovaGold, AppTheme.stellarYellow],
              ),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Center(
              child: Text(
                event['image'],
                style: const TextStyle(fontSize: 20),
              ),
            ),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  event['title'],
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    color: AppTheme.starlightWhite,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  event['description'],
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                    color: AppTheme.cosmicSilver,
                  ),
                ),
                const SizedBox(height: 8),
                Row(
                  children: [
                    Icon(Icons.schedule, color: AppTheme.supernovaGold, size: 16),
                    const SizedBox(width: 4),
                    Text(
                      '${event['date']} at ${event['time']}',
                      style: Theme.of(context).textTheme.bodySmall?.copyWith(
                        color: AppTheme.supernovaGold,
                      ),
                    ),
                    const SizedBox(width: 16),
                    Icon(Icons.location_on, color: AppTheme.supernovaGold, size: 16),
                    const SizedBox(width: 4),
                    Text(
                      event['location'],
                      style: Theme.of(context).textTheme.bodySmall?.copyWith(
                        color: AppTheme.supernovaGold,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 4),
                Row(
                  children: [
                    Icon(Icons.people, color: AppTheme.supernovaGold, size: 16),
                    const SizedBox(width: 4),
                    Text(
                      '${event['attendees']} attending',
                      style: Theme.of(context).textTheme.bodySmall?.copyWith(
                        color: AppTheme.supernovaGold,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
          GestureDetector(
            onTap: () => _joinEvent(event),
            child: Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [AppTheme.supernovaGold, AppTheme.stellarYellow],
                ),
                borderRadius: BorderRadius.circular(8),
              ),
              child: const Icon(Icons.event_available, color: Colors.white, size: 16),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildChatOverview() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            AppTheme.auroraGreen.withOpacity(0.1),
            AppTheme.stellarTeal.withOpacity(0.1),
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: AppTheme.auroraGreen.withOpacity(0.3),
          width: 1,
        ),
      ),
      child: Column(
        children: [
          Row(
            children: [
              Icon(Icons.chat_bubble, color: AppTheme.auroraGreen, size: 24),
              const SizedBox(width: 8),
              Text(
                'Active Conversations',
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  color: AppTheme.auroraGreen,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Text(
            'Start meaningful conversations with your cosmic matches!',
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
              color: AppTheme.starlightWhite,
            ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 16),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              _buildChatAction('New Chat', Icons.add_comment, AppTheme.auroraGreen),
              _buildChatAction('Group Chat', Icons.group_add, AppTheme.stellarTeal),
              _buildChatAction('Video Call', Icons.videocam, AppTheme.cosmicCyan),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildChatAction(String title, IconData icon, Color color) {
    return GestureDetector(
      onTap: () => _handleChatAction(title),
      child: Container(
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [color.withOpacity(0.1), color.withOpacity(0.05)],
          ),
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: color.withOpacity(0.3)),
        ),
        child: Column(
          children: [
            Icon(icon, color: color, size: 24),
            const SizedBox(height: 8),
            Text(
              title,
              style: Theme.of(context).textTheme.bodySmall?.copyWith(
                color: color,
                fontWeight: FontWeight.w600,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildZodiacChip(String zodiac, Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: color.withOpacity(0.2),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: color.withOpacity(0.3)),
      ),
      child: Text(
        zodiac,
        style: Theme.of(context).textTheme.bodySmall?.copyWith(
          color: color,
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }

  Widget _buildNumerologyChip(int number, Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: color.withOpacity(0.2),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: color.withOpacity(0.3)),
      ),
      child: Text(
        'Num $number',
        style: Theme.of(context).textTheme.bodySmall?.copyWith(
          color: color,
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }

  Widget _buildCompatibilityChip(int compatibility, Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: color.withOpacity(0.2),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: color.withOpacity(0.3)),
      ),
      child: Text(
        '$compatibility%',
        style: Theme.of(context).textTheme.bodySmall?.copyWith(
          color: color,
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }

  // Action methods
  void _showUserProfile(Map<String, dynamic> user) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => CosmicProfileAnalysisScreen(),
      ),
    );
  }

  void _startChat(Map<String, dynamic> user) {
    // Navigate to chat screen
    print('Starting chat with ${user['name']}');
  }

  void _openChat(Map<String, dynamic> match) {
    // Navigate to existing chat
    print('Opening chat with ${match['name']}');
  }

  void _joinGroup(Map<String, dynamic> group) {
    // Join group functionality
    print('Joining group: ${group['name']}');
  }

  void _joinEvent(Map<String, dynamic> event) {
    // Join event functionality
    print('Joining event: ${event['title']}');
  }

  void _handleChatAction(String action) {
    // Handle chat actions
    print('Chat action: $action');
  }
}