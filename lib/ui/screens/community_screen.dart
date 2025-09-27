import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../../services/database_service.dart';
import '../../models/user.dart';

class CommunityScreen extends StatefulWidget {
  const CommunityScreen({super.key});

  @override
  State<CommunityScreen> createState() => _CommunityScreenState();
}

class _CommunityScreenState extends State<CommunityScreen> with TickerProviderStateMixin {
  late TabController _tabController;
  List<CommunityProfile> _discoverProfiles = [];
  List<CommunityProfile> _connections = [];
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
    _loadCommunityData();
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  Future<void> _loadCommunityData() async {
    // Simulate loading community data
    await Future.delayed(const Duration(seconds: 1));
    
    setState(() {
      _discoverProfiles = _generateMockProfiles();
      _connections = _generateMockConnections();
      _isLoading = false;
    });
  }

  List<CommunityProfile> _generateMockProfiles() {
    return [
      CommunityProfile(
        id: '1',
        name: 'Sarah',
        age: 28,
        zodiacSign: 'Leo',
        location: 'Colombo, Sri Lanka',
        vibeTags: ['Spiritual', 'Creative', 'Adventurous'],
        about: 'Love exploring ancient wisdom and connecting with like-minded souls',
        energy: 'High',
        savedQuotes: ['The stars guide us home', 'Trust the universe'],
        isOnline: true,
      ),
      CommunityProfile(
        id: '2',
        name: 'Raj',
        age: 32,
        zodiacSign: 'Scorpio',
        location: 'Kandy, Sri Lanka',
        vibeTags: ['Mystical', 'Deep', 'Intuitive'],
        about: 'Seeker of cosmic truths and spiritual connections',
        energy: 'Medium',
        savedQuotes: ['Magic is real', 'Listen to your soul'],
        isOnline: false,
      ),
      CommunityProfile(
        id: '3',
        name: 'Priya',
        age: 25,
        zodiacSign: 'Pisces',
        location: 'Galle, Sri Lanka',
        vibeTags: ['Empathetic', 'Artistic', 'Dreamy'],
        about: 'Artist and dream interpreter, passionate about healing',
        energy: 'High',
        savedQuotes: ['Dreams are messages', 'Art heals the soul'],
        isOnline: true,
      ),
      CommunityProfile(
        id: '4',
        name: 'David',
        age: 30,
        zodiacSign: 'Aquarius',
        location: 'Negombo, Sri Lanka',
        vibeTags: ['Innovative', 'Humanitarian', 'Independent'],
        about: 'Tech-savvy spiritualist building bridges between worlds',
        energy: 'Medium',
        savedQuotes: ['Technology meets spirituality', 'Innovation for good'],
        isOnline: true,
      ),
    ];
  }

  List<CommunityProfile> _generateMockConnections() {
    return [
      CommunityProfile(
        id: '5',
        name: 'Maya',
        age: 27,
        zodiacSign: 'Cancer',
        location: 'Colombo, Sri Lanka',
        vibeTags: ['Nurturing', 'Intuitive', 'Family-oriented'],
        about: 'Moon child who loves nurturing others and creating safe spaces',
        energy: 'High',
        savedQuotes: ['Home is where the heart is', 'Nurture your inner child'],
        isOnline: true,
        connectionStatus: 'Connected',
      ),
    ];
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.cream,
      appBar: AppBar(
        title: const Text('Community'),
        backgroundColor: Colors.transparent,
        elevation: 0,
        bottom: TabBar(
          controller: _tabController,
          labelColor: AppTheme.mysticalPurple,
          unselectedLabelColor: AppTheme.cosmicDark.withOpacity(0.6),
          indicatorColor: AppTheme.mysticalPurple,
          tabs: const [
            Tab(text: 'Discover'),
            Tab(text: 'Connections'),
          ],
        ),
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator(color: AppTheme.mysticalPurple))
          : TabBarView(
              controller: _tabController,
              children: [
                _buildDiscoverTab(),
                _buildConnectionsTab(),
              ],
            ),
    );
  }

  Widget _buildDiscoverTab() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildFilters(),
          const SizedBox(height: 20),
          _buildProfilesGrid(),
        ],
      ),
    );
  }

  Widget _buildFilters() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppTheme.starlightWhite,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: AppTheme.mysticalPurple.withOpacity(0.1),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Find Your Cosmic Match',
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
              fontWeight: FontWeight.bold,
              color: AppTheme.cosmicDark,
            ),
          ),
          const SizedBox(height: 12),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: [
              _buildFilterChip('All Signs', true),
              _buildFilterChip('Fire Signs', false),
              _buildFilterChip('Water Signs', false),
              _buildFilterChip('Earth Signs', false),
              _buildFilterChip('Air Signs', false),
              _buildFilterChip('Online Now', false),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildFilterChip(String label, bool isSelected) {
    return GestureDetector(
      onTap: () {
        // Handle filter selection
      },
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        decoration: BoxDecoration(
          color: isSelected ? AppTheme.mysticalPurple : AppTheme.lavender.withOpacity(0.3),
          borderRadius: BorderRadius.circular(20),
          border: Border.all(
            color: isSelected ? AppTheme.mysticalPurple : AppTheme.lavender,
          ),
        ),
        child: Text(
          label,
          style: Theme.of(context).textTheme.bodySmall?.copyWith(
            color: isSelected ? Colors.white : AppTheme.cosmicDark,
            fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
          ),
        ),
      ),
    );
  }

  Widget _buildProfilesGrid() {
    return GridView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        crossAxisSpacing: 16,
        mainAxisSpacing: 16,
        childAspectRatio: 0.8,
      ),
      itemCount: _discoverProfiles.length,
      itemBuilder: (context, index) {
        final profile = _discoverProfiles[index];
        return _buildProfileCard(profile, isConnection: false);
      },
    );
  }

  Widget _buildConnectionsTab() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Your Cosmic Connections',
            style: Theme.of(context).textTheme.titleLarge?.copyWith(
              fontWeight: FontWeight.bold,
              color: AppTheme.cosmicDark,
            ),
          ),
          const SizedBox(height: 20),
          if (_connections.isEmpty)
            _buildEmptyConnections()
          else
            _buildConnectionsList(),
        ],
      ),
    );
  }

  Widget _buildEmptyConnections() {
    return Center(
      child: Column(
        children: [
          Icon(
            Icons.people_outline,
            size: 64,
            color: AppTheme.cosmicDark.withOpacity(0.3),
          ),
          const SizedBox(height: 16),
          Text(
            'No connections yet',
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
              color: AppTheme.cosmicDark.withOpacity(0.7),
            ),
          ),
          const SizedBox(height: 8),
          Text(
            'Start discovering like-minded souls in the Discover tab',
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
              color: AppTheme.cosmicDark.withOpacity(0.5),
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }

  Widget _buildConnectionsList() {
    return Column(
      children: _connections.map((profile) => _buildConnectionCard(profile)).toList(),
    );
  }

  Widget _buildProfileCard(CommunityProfile profile, {required bool isConnection}) {
    return GestureDetector(
      onTap: () => _showProfileDetails(profile),
      child: Container(
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
            // Profile Image Placeholder
            Container(
              height: 120,
              decoration: BoxDecoration(
                color: AppTheme.mysticalPurple.withOpacity(0.1),
                borderRadius: const BorderRadius.only(
                  topLeft: Radius.circular(20),
                  topRight: Radius.circular(20),
                ),
              ),
              child: Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      _getZodiacSymbol(profile.zodiacSign),
                      style: const TextStyle(fontSize: 32),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      profile.zodiacSign,
                      style: Theme.of(context).textTheme.titleSmall?.copyWith(
                        color: AppTheme.mysticalPurple,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Expanded(
                        child: Text(
                          profile.name,
                          style: Theme.of(context).textTheme.titleMedium?.copyWith(
                            fontWeight: FontWeight.bold,
                            color: AppTheme.cosmicDark,
                          ),
                        ),
                      ),
                      if (profile.isOnline)
                        Container(
                          width: 8,
                          height: 8,
                          decoration: const BoxDecoration(
                            color: Colors.green,
                            shape: BoxShape.circle,
                          ),
                        ),
                    ],
                  ),
                  const SizedBox(height: 4),
                  Text(
                    '${profile.age} • ${profile.location}',
                    style: Theme.of(context).textTheme.bodySmall?.copyWith(
                      color: AppTheme.cosmicDark.withOpacity(0.7),
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    profile.about,
                    style: Theme.of(context).textTheme.bodySmall?.copyWith(
                      color: AppTheme.cosmicDark.withOpacity(0.8),
                    ),
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                  const SizedBox(height: 8),
                  Wrap(
                    spacing: 4,
                    runSpacing: 4,
                    children: profile.vibeTags.take(2).map((tag) => Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                      decoration: BoxDecoration(
                        color: AppTheme.lavender.withOpacity(0.3),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Text(
                        tag,
                        style: Theme.of(context).textTheme.bodySmall?.copyWith(
                          color: AppTheme.mysticalPurple,
                          fontSize: 10,
                        ),
                      ),
                    )).toList(),
                  ),
                  const SizedBox(height: 12),
                  if (isConnection)
                    _buildConnectionActions(profile)
                  else
                    _buildDiscoverActions(profile),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildConnectionCard(CommunityProfile profile) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppTheme.starlightWhite,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: AppTheme.mysticalPurple.withOpacity(0.1),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Row(
        children: [
          Container(
            width: 50,
            height: 50,
            decoration: BoxDecoration(
              color: AppTheme.mysticalPurple.withOpacity(0.1),
              borderRadius: BorderRadius.circular(25),
            ),
            child: Center(
              child: Text(
                _getZodiacSymbol(profile.zodiacSign),
                style: const TextStyle(fontSize: 20),
              ),
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  profile.name,
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.bold,
                    color: AppTheme.cosmicDark,
                  ),
                ),
                Text(
                  '${profile.zodiacSign} • ${profile.location}',
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                    color: AppTheme.cosmicDark.withOpacity(0.7),
                  ),
                ),
              ],
            ),
          ),
          _buildConnectionActions(profile),
        ],
      ),
    );
  }

  Widget _buildDiscoverActions(CommunityProfile profile) {
    return Row(
      children: [
        Expanded(
          child: ElevatedButton(
            onPressed: () => _requestConnection(profile),
            style: ElevatedButton.styleFrom(
              backgroundColor: AppTheme.mysticalPurple,
              foregroundColor: Colors.white,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              padding: const EdgeInsets.symmetric(vertical: 8),
            ),
            child: const Text('Connect'),
          ),
        ),
        const SizedBox(width: 8),
        IconButton(
          onPressed: () => _showProfileDetails(profile),
          icon: const Icon(Icons.info_outline),
          color: AppTheme.mysticalPurple,
        ),
      ],
    );
  }

  Widget _buildConnectionActions(CommunityProfile profile) {
    return Row(
      children: [
        IconButton(
          onPressed: () => _startChat(profile),
          icon: const Icon(Icons.chat),
          color: AppTheme.mysticalPurple,
        ),
        IconButton(
          onPressed: () => _showProfileDetails(profile),
          icon: const Icon(Icons.person),
          color: AppTheme.mysticalPurple,
        ),
      ],
    );
  }

  void _showProfileDetails(CommunityProfile profile) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => DraggableScrollableSheet(
        initialChildSize: 0.7,
        maxChildSize: 0.9,
        minChildSize: 0.5,
        builder: (context, scrollController) => Container(
          decoration: const BoxDecoration(
            color: AppTheme.starlightWhite,
            borderRadius: BorderRadius.only(
              topLeft: Radius.circular(20),
              topRight: Radius.circular(20),
            ),
          ),
          child: SingleChildScrollView(
            controller: scrollController,
            padding: const EdgeInsets.all(20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Center(
                  child: Container(
                    width: 60,
                    height: 4,
                    decoration: BoxDecoration(
                      color: AppTheme.cosmicDark.withOpacity(0.3),
                      borderRadius: BorderRadius.circular(2),
                    ),
                  ),
                ),
                const SizedBox(height: 20),
                Row(
                  children: [
                    Container(
                      width: 80,
                      height: 80,
                      decoration: BoxDecoration(
                        color: AppTheme.mysticalPurple.withOpacity(0.1),
                        borderRadius: BorderRadius.circular(40),
                      ),
                      child: Center(
                        child: Text(
                          _getZodiacSymbol(profile.zodiacSign),
                          style: const TextStyle(fontSize: 32),
                        ),
                      ),
                    ),
                    const SizedBox(width: 16),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            profile.name,
                            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                              fontWeight: FontWeight.bold,
                              color: AppTheme.cosmicDark,
                            ),
                          ),
                          Text(
                            '${profile.age} • ${profile.zodiacSign}',
                            style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                              color: AppTheme.mysticalPurple,
                            ),
                          ),
                          Text(
                            profile.location,
                            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                              color: AppTheme.cosmicDark.withOpacity(0.7),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 24),
                Text(
                  'About',
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.bold,
                    color: AppTheme.cosmicDark,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  profile.about,
                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                    color: AppTheme.cosmicDark,
                  ),
                ),
                const SizedBox(height: 16),
                Text(
                  'Vibe Tags',
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.bold,
                    color: AppTheme.cosmicDark,
                  ),
                ),
                const SizedBox(height: 8),
                Wrap(
                  spacing: 8,
                  runSpacing: 8,
                  children: profile.vibeTags.map((tag) => Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                    decoration: BoxDecoration(
                      color: AppTheme.lavender.withOpacity(0.3),
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: Text(
                      tag,
                      style: Theme.of(context).textTheme.bodySmall?.copyWith(
                        color: AppTheme.mysticalPurple,
                      ),
                    ),
                  )).toList(),
                ),
                const SizedBox(height: 16),
                Text(
                  'Saved Quotes',
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.bold,
                    color: AppTheme.cosmicDark,
                  ),
                ),
                const SizedBox(height: 8),
                ...profile.savedQuotes.map((quote) => Container(
                  margin: const EdgeInsets.only(bottom: 8),
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: AppTheme.cream,
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: AppTheme.lavender.withOpacity(0.3)),
                  ),
                  child: Text(
                    '"$quote"',
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      color: AppTheme.cosmicDark,
                      fontStyle: FontStyle.italic,
                    ),
                  ),
                )),
                const SizedBox(height: 20),
                Row(
                  children: [
                    Expanded(
                      child: ElevatedButton(
                        onPressed: () {
                          Navigator.pop(context);
                          _requestConnection(profile);
                        },
                        style: ElevatedButton.styleFrom(
                          backgroundColor: AppTheme.mysticalPurple,
                          foregroundColor: Colors.white,
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                          padding: const EdgeInsets.symmetric(vertical: 16),
                        ),
                        child: const Text('Request Connection'),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  void _requestConnection(CommunityProfile profile) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Connection request sent to ${profile.name}'),
        backgroundColor: AppTheme.mysticalPurple,
      ),
    );
  }

  void _startChat(CommunityProfile profile) {
    // Navigate to chat screen
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Starting chat with ${profile.name}'),
        backgroundColor: AppTheme.mysticalPurple,
      ),
    );
  }

  String _getZodiacSymbol(String sign) {
    const symbols = {
      'Aries': '♈',
      'Taurus': '♉',
      'Gemini': '♊',
      'Cancer': '♋',
      'Leo': '♌',
      'Virgo': '♍',
      'Libra': '♎',
      'Scorpio': '♏',
      'Sagittarius': '♐',
      'Capricorn': '♑',
      'Aquarius': '♒',
      'Pisces': '♓',
    };
    return symbols[sign] ?? '♈';
  }
}

class CommunityProfile {
  final String id;
  final String name;
  final int age;
  final String zodiacSign;
  final String location;
  final List<String> vibeTags;
  final String about;
  final String energy;
  final List<String> savedQuotes;
  final bool isOnline;
  final String? connectionStatus;

  CommunityProfile({
    required this.id,
    required this.name,
    required this.age,
    required this.zodiacSign,
    required this.location,
    required this.vibeTags,
    required this.about,
    required this.energy,
    required this.savedQuotes,
    required this.isOnline,
    this.connectionStatus,
  });
}
