import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../../models/user.dart';
import '../../services/database_service.dart';
import 'chat_screen.dart';

class EnhancedCommunityScreen extends StatefulWidget {
  const EnhancedCommunityScreen({super.key});

  @override
  State<EnhancedCommunityScreen> createState() => _EnhancedCommunityScreenState();
}

class _EnhancedCommunityScreenState extends State<EnhancedCommunityScreen>
    with TickerProviderStateMixin {
  late TabController _tabController;
  late AnimationController _animationController;
  late Animation<double> _fadeAnimation;

  List<CommunityProfile> _discoverProfiles = [];
  List<CommunityProfile> _cosmicMatches = [];
  List<CommunityProfile> _connections = [];
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
    _animationController = AnimationController(
      duration: const Duration(milliseconds: 800),
      vsync: this,
    );
    _fadeAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _animationController, curve: Curves.easeInOut),
    );
    _loadCommunityData();
  }

  @override
  void dispose() {
    _tabController.dispose();
    _animationController.dispose();
    super.dispose();
  }

  Future<void> _loadCommunityData() async {
    setState(() => _isLoading = true);
    
    // Generate dummy community profiles
    _discoverProfiles = _generateDummyProfiles();
    _cosmicMatches = _generateCosmicMatches();
    _connections = _generateConnections();
    
    await Future.delayed(const Duration(seconds: 1));
    _animationController.forward();
    setState(() => _isLoading = false);
  }

  List<CommunityProfile> _generateDummyProfiles() {
    return [
      CommunityProfile(
        id: '1',
        name: 'Sarah Chen',
        age: 28,
        zodiacSign: 'Scorpio',
        location: 'Colombo, Sri Lanka',
        bio: 'Passionate about astrology and spiritual growth. Love connecting with like-minded souls.',
        interests: ['Astrology', 'Meditation', 'Yoga', 'Nature'],
        compatibility: 85,
        isOnline: true,
        lastSeen: DateTime.now().subtract(const Duration(minutes: 5)),
      ),
      CommunityProfile(
        id: '2',
        name: 'Raj Patel',
        age: 32,
        zodiacSign: 'Leo',
        location: 'Mumbai, India',
        bio: 'Vedic astrology enthusiast. Always seeking cosmic connections and meaningful conversations.',
        interests: ['Vedic Astrology', 'Philosophy', 'Music', 'Travel'],
        compatibility: 78,
        isOnline: false,
        lastSeen: DateTime.now().subtract(const Duration(hours: 2)),
      ),
      CommunityProfile(
        id: '3',
        name: 'Emma Wilson',
        age: 25,
        zodiacSign: 'Pisces',
        location: 'New York, USA',
        bio: 'Dream interpreter and moon child. Finding magic in everyday moments.',
        interests: ['Dreams', 'Moon Phases', 'Art', 'Poetry'],
        compatibility: 92,
        isOnline: true,
        lastSeen: DateTime.now().subtract(const Duration(minutes: 1)),
      ),
      CommunityProfile(
        id: '4',
        name: 'Akira Tanaka',
        age: 30,
        zodiacSign: 'Virgo',
        location: 'Tokyo, Japan',
        bio: 'Zen practitioner exploring the intersection of Eastern wisdom and modern life.',
        interests: ['Zen', 'Numerology', 'Tea Ceremony', 'Minimalism'],
        compatibility: 88,
        isOnline: false,
        lastSeen: DateTime.now().subtract(const Duration(hours: 4)),
      ),
    ];
  }

  List<CommunityProfile> _generateCosmicMatches() {
    return [
      CommunityProfile(
        id: '5',
        name: 'Luna Rodriguez',
        age: 27,
        zodiacSign: 'Cancer',
        location: 'Barcelona, Spain',
        bio: 'Cosmic artist and energy healer. Creating beauty through celestial inspiration.',
        interests: ['Energy Healing', 'Art', 'Crystals', 'Moon Rituals'],
        compatibility: 95,
        isOnline: true,
        lastSeen: DateTime.now().subtract(const Duration(minutes: 3)),
      ),
      CommunityProfile(
        id: '6',
        name: 'Kai Johnson',
        age: 29,
        zodiacSign: 'Aquarius',
        location: 'Melbourne, Australia',
        bio: 'Futuristic thinker exploring consciousness and cosmic connections.',
        interests: ['Consciousness', 'Technology', 'Astrology', 'Innovation'],
        compatibility: 90,
        isOnline: true,
        lastSeen: DateTime.now().subtract(const Duration(minutes: 10)),
      ),
    ];
  }

  List<CommunityProfile> _generateConnections() {
    return [
      CommunityProfile(
        id: '7',
        name: 'Maya Singh',
        age: 26,
        zodiacSign: 'Sagittarius',
        location: 'Delhi, India',
        bio: 'Adventure seeker and spiritual explorer. Always ready for cosmic conversations.',
        interests: ['Adventure', 'Spirituality', 'Travel', 'Philosophy'],
        compatibility: 82,
        isOnline: true,
        lastSeen: DateTime.now().subtract(const Duration(minutes: 2)),
        connectionStatus: 'Connected',
      ),
    ];
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.surfaceLight,
      body: SafeArea(
        child: Column(
          children: [
            _buildHeader(),
            _buildTabBar(),
            Expanded(
              child: _isLoading ? _buildLoadingView() : _buildTabBarView(),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            AppTheme.electricViolet.withOpacity(0.1),
            AppTheme.celestialBlue.withOpacity(0.1),
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
      ),
      child: Row(
        children: [
          Icon(Icons.people, color: AppTheme.electricViolet, size: 32),
          const SizedBox(width: 12),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Cosmic Community',
                style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                  fontWeight: FontWeight.bold,
                  color: AppTheme.electricViolet,
                ),
              ),
              Text(
                'Connect with like-minded souls',
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: Colors.black87.withOpacity(0.7),
                ),
              ),
            ],
          ),
          const Spacer(),
          IconButton(
            onPressed: () {},
            icon: Icon(Icons.search, color: AppTheme.electricViolet),
          ),
        ],
      ),
    );
  }

  Widget _buildTabBar() {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.1),
        borderRadius: BorderRadius.circular(25),
        border: Border.all(color: AppTheme.electricViolet.withOpacity(0.2)),
      ),
      child: TabBar(
        controller: _tabController,
        indicator: BoxDecoration(
          color: AppTheme.electricViolet,
          borderRadius: BorderRadius.circular(25),
        ),
        labelColor: Colors.white,
        unselectedLabelColor: AppTheme.electricViolet,
        labelStyle: const TextStyle(fontWeight: FontWeight.w600),
        tabs: const [
          Tab(text: 'Discover'),
          Tab(text: 'Cosmic Match'),
          Tab(text: 'Connections'),
        ],
      ),
    );
  }

  Widget _buildLoadingView() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          CircularProgressIndicator(color: AppTheme.electricViolet),
          const SizedBox(height: 16),
          Text(
            'Loading cosmic connections...',
            style: Theme.of(context).textTheme.bodyLarge?.copyWith(
              color: Colors.black87.withOpacity(0.7),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTabBarView() {
    return FadeTransition(
      opacity: _fadeAnimation,
      child: TabBarView(
        controller: _tabController,
        children: [
          _buildDiscoverView(),
          _buildCosmicMatchView(),
          _buildConnectionsView(),
        ],
      ),
    );
  }

  Widget _buildDiscoverView() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Discover Cosmic Souls',
            style: Theme.of(context).textTheme.titleLarge?.copyWith(
              fontWeight: FontWeight.bold,
              color: AppTheme.electricViolet,
            ),
          ),
          const SizedBox(height: 16),
          ..._discoverProfiles.map((profile) => _buildProfileCard(profile, 'discover')),
        ],
      ),
    );
  }

  Widget _buildCosmicMatchView() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Your Cosmic Matches',
            style: Theme.of(context).textTheme.titleLarge?.copyWith(
              fontWeight: FontWeight.bold,
              color: AppTheme.supernovaGold,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            'High compatibility based on your cosmic profile',
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
              color: Colors.black87.withOpacity(0.7),
            ),
          ),
          const SizedBox(height: 16),
          ..._cosmicMatches.map((profile) => _buildProfileCard(profile, 'cosmic')),
        ],
      ),
    );
  }

  Widget _buildConnectionsView() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Your Connections',
            style: Theme.of(context).textTheme.titleLarge?.copyWith(
              fontWeight: FontWeight.bold,
              color: AppTheme.auroraGreen,
            ),
          ),
          const SizedBox(height: 16),
          ..._connections.map((profile) => _buildProfileCard(profile, 'connection')),
        ],
      ),
    );
  }

  Widget _buildProfileCard(CommunityProfile profile, String type) {
    Color cardColor;
    Color borderColor;
    IconData icon;
    
    switch (type) {
      case 'cosmic':
        cardColor = AppTheme.supernovaGold.withOpacity(0.1);
        borderColor = AppTheme.supernovaGold;
        icon = Icons.star;
        break;
      case 'connection':
        cardColor = AppTheme.auroraGreen.withOpacity(0.1);
        borderColor = AppTheme.auroraGreen;
        icon = Icons.check_circle;
        break;
      default:
        cardColor = AppTheme.electricViolet.withOpacity(0.1);
        borderColor = AppTheme.electricViolet;
        icon = Icons.person;
    }

    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: cardColor,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: borderColor.withOpacity(0.3), width: 1.5),
        boxShadow: [
          BoxShadow(
            color: borderColor.withOpacity(0.1),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              CircleAvatar(
                radius: 25,
                backgroundColor: borderColor.withOpacity(0.2),
                child: Text(
                  profile.name[0],
                  style: TextStyle(
                    color: borderColor,
                    fontWeight: FontWeight.bold,
                    fontSize: 20,
                  ),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Text(
                          profile.name,
                          style: Theme.of(context).textTheme.titleMedium?.copyWith(
                            fontWeight: FontWeight.bold,
                            color: Colors.black87,
                          ),
                        ),
                        const SizedBox(width: 8),
                        if (profile.isOnline)
                          Container(
                            width: 8,
                            height: 8,
                            decoration: BoxDecoration(
                              color: AppTheme.auroraGreen,
                              shape: BoxShape.circle,
                            ),
                          ),
                      ],
                    ),
                    Text(
                      '${profile.age} • ${profile.zodiacSign} • ${profile.location}',
                      style: Theme.of(context).textTheme.bodySmall?.copyWith(
                        color: Colors.black87.withOpacity(0.7),
                      ),
                    ),
                  ],
                ),
              ),
              if (type == 'cosmic' || type == 'discover')
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  decoration: BoxDecoration(
                    color: borderColor.withOpacity(0.2),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Text(
                    '${profile.compatibility}%',
                    style: TextStyle(
                      color: borderColor,
                      fontWeight: FontWeight.bold,
                      fontSize: 12,
                    ),
                  ),
                ),
            ],
          ),
          const SizedBox(height: 12),
          Text(
            profile.bio,
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
              color: Colors.black87,
              height: 1.4,
            ),
          ),
          const SizedBox(height: 12),
          Wrap(
            spacing: 8,
            runSpacing: 4,
            children: profile.interests.map((interest) => Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
              decoration: BoxDecoration(
                color: borderColor.withOpacity(0.1),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Text(
                interest,
                style: TextStyle(
                  color: borderColor,
                  fontSize: 12,
                  fontWeight: FontWeight.w500,
                ),
              ),
            )).toList(),
          ),
          const SizedBox(height: 16),
          Row(
            children: [
              if (type == 'connection')
                Expanded(
                  child: ElevatedButton.icon(
                    onPressed: () => _openChat(profile),
                    icon: Icon(Icons.chat, size: 18),
                    label: Text('Chat'),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppTheme.auroraGreen,
                      foregroundColor: Colors.white,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                    ),
                  ),
                )
              else
                Expanded(
                  child: ElevatedButton.icon(
                    onPressed: () => _sendConnectionRequest(profile),
                    icon: Icon(Icons.person_add, size: 18),
                    label: Text('Connect'),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: borderColor,
                      foregroundColor: Colors.white,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                    ),
                  ),
                ),
              const SizedBox(width: 12),
              IconButton(
                onPressed: () => _viewProfile(profile),
                icon: Icon(Icons.visibility, color: borderColor),
              ),
            ],
          ),
        ],
      ),
    );
  }

  void _openChat(CommunityProfile profile) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => ChatScreen(profile: profile),
      ),
    );
  }

  void _sendConnectionRequest(CommunityProfile profile) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Connection request sent to ${profile.name}'),
        backgroundColor: AppTheme.electricViolet,
      ),
    );
  }

  void _viewProfile(CommunityProfile profile) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(profile.name),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Age: ${profile.age}'),
            Text('Zodiac: ${profile.zodiacSign}'),
            Text('Location: ${profile.location}'),
            const SizedBox(height: 8),
            Text('Bio: ${profile.bio}'),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Close'),
          ),
        ],
      ),
    );
  }
}

class CommunityProfile {
  final String id;
  final String name;
  final int age;
  final String zodiacSign;
  final String location;
  final String bio;
  final List<String> interests;
  final int compatibility;
  final bool isOnline;
  final DateTime lastSeen;
  final String? connectionStatus;

  CommunityProfile({
    required this.id,
    required this.name,
    required this.age,
    required this.zodiacSign,
    required this.location,
    required this.bio,
    required this.interests,
    required this.compatibility,
    required this.isOnline,
    required this.lastSeen,
    this.connectionStatus,
  });
}
