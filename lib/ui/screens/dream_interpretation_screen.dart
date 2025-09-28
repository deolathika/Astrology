import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../../services/translation_service.dart';
import '../../services/database_service.dart';
import '../../models/user.dart';

class DreamInterpretationScreen extends StatefulWidget {
  const DreamInterpretationScreen({super.key});

  @override
  State<DreamInterpretationScreen> createState() => _DreamInterpretationScreenState();
}

class _DreamInterpretationScreenState extends State<DreamInterpretationScreen> with TickerProviderStateMixin {
  String _currentLanguage = 'en';
  late AnimationController _animationController;
  late Animation<double> _fadeAnimation;
  
  int _selectedTab = 0;
  final List<String> _tabs = ['Interpret', 'Dreams', 'Symbols', 'Journal'];
  
  final TextEditingController _dreamController = TextEditingController();
  final List<Map<String, dynamic>> _dreamHistory = [];
  
  // Mock dream symbols data
  final List<Map<String, dynamic>> _dreamSymbols = [
    {
      'symbol': 'Water',
      'meaning': 'Emotions, cleansing, renewal',
      'category': 'Elements',
      'color': AppTheme.celestialBlue,
      'icon': Icons.water_drop,
    },
    {
      'symbol': 'Flying',
      'meaning': 'Freedom, liberation',
      'category': 'Actions',
      'color': AppTheme.auroraGreen,
      'icon': Icons.flight,
    },
    {
      'symbol': 'Animals',
      'meaning': 'Instincts, nature, guidance',
      'category': 'Creatures',
      'color': AppTheme.supernovaGold,
      'icon': Icons.pets,
    },
    {
      'symbol': 'House',
      'meaning': 'Self, security, family',
      'category': 'Places',
      'color': AppTheme.electricViolet,
      'icon': Icons.home,
    },
    {
      'symbol': 'Death',
      'meaning': 'Transformation, endings, rebirth',
      'category': 'Themes',
      'color': AppTheme.nebulaPink,
      'icon': Icons.auto_awesome,
    },
  ];

  final List<Map<String, dynamic>> _dreamHistoryData = [
    {
      'id': '1',
      'title': 'Flying Over Ocean',
      'date': '2024-01-10',
      'description': 'I was flying over a vast ocean, feeling completely free and peaceful.',
      'interpretation': 'This dream suggests you are experiencing emotional freedom and spiritual growth.',
      'symbols': ['Flying', 'Water', 'Freedom'],
      'mood': 'Peaceful',
      'color': AppTheme.celestialBlue,
    },
    {
      'id': '2',
      'title': 'Lost in Forest',
      'date': '2024-01-08',
      'description': 'I was lost in a dark forest, but then I found a glowing path that led me home.',
      'interpretation': 'This dream indicates you were feeling lost but have found your way through inner guidance.',
      'symbols': ['Forest', 'Path', 'Light'],
      'mood': 'Hopeful',
      'color': AppTheme.auroraGreen,
    },
    {
      'id': '3',
      'title': 'Meeting Ancestors',
      'date': '2024-01-05',
      'description': 'I met my ancestors in a beautiful garden, and they gave me wisdom and blessings.',
      'interpretation': 'This dream shows connection to your roots and receiving spiritual guidance from your lineage.',
      'symbols': ['Ancestors', 'Garden', 'Wisdom'],
      'mood': 'Blessed',
      'color': AppTheme.supernovaGold,
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
    
    _animationController.forward();
  }

  @override
  void dispose() {
    _animationController.dispose();
    _dreamController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.deepSpaceBlack,
      appBar: AppBar(
        title: Text(TranslationService.translate('dreams')),
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
        return _buildInterpretTab();
      case 1:
        return _buildDreamsTab();
      case 2:
        return _buildSymbolsTab();
      case 3:
        return _buildJournalTab();
      default:
        return _buildInterpretTab();
    }
  }

  Widget _buildInterpretTab() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildSectionHeader('Dream Interpretation', Icons.auto_awesome, AppTheme.electricViolet),
          const SizedBox(height: 16),
          _buildDreamInput(),
          const SizedBox(height: 24),
          _buildInterpretationResult(),
        ],
      ),
    );
  }

  Widget _buildDreamsTab() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildSectionHeader('Your Dream History', Icons.history, AppTheme.celestialBlue),
          const SizedBox(height: 16),
          ..._dreamHistoryData.map((dream) => _buildDreamCard(dream)).toList(),
        ],
      ),
    );
  }

  Widget _buildSymbolsTab() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildSectionHeader('Dream Symbols', Icons.psychology, AppTheme.supernovaGold),
          const SizedBox(height: 16),
          ..._dreamSymbols.map((symbol) => _buildSymbolCard(symbol)).toList(),
        ],
      ),
    );
  }

  Widget _buildJournalTab() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildSectionHeader('Dream Journal', Icons.book, AppTheme.auroraGreen),
          const SizedBox(height: 16),
          _buildJournalEntry(),
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

  Widget _buildDreamInput() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            AppTheme.cosmicNavy.withOpacity(0.8),
            AppTheme.nebulaDark.withOpacity(0.8),
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(20),
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
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Describe Your Dream',
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
              color: AppTheme.starlightWhite,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 12),
          TextField(
            controller: _dreamController,
            maxLines: 5,
            style: TextStyle(color: AppTheme.starlightWhite),
            decoration: InputDecoration(
              hintText: 'Write your dream in detail...',
              hintStyle: TextStyle(color: AppTheme.cosmicSilver),
              filled: true,
              fillColor: AppTheme.stellarGray.withOpacity(0.1),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(12),
                borderSide: BorderSide(color: AppTheme.electricViolet.withOpacity(0.3)),
              ),
              enabledBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(12),
                borderSide: BorderSide(color: AppTheme.electricViolet.withOpacity(0.3)),
              ),
              focusedBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(12),
                borderSide: BorderSide(color: AppTheme.electricViolet, width: 2),
              ),
            ),
          ),
          const SizedBox(height: 16),
          GestureDetector(
            onTap: _interpretDream,
            child: Container(
              width: double.infinity,
              padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 16),
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [AppTheme.electricViolet, AppTheme.cosmicPurple],
                ),
                borderRadius: BorderRadius.circular(12),
                boxShadow: [
                  BoxShadow(
                    color: AppTheme.electricViolet.withOpacity(0.3),
                    blurRadius: 8,
                    offset: const Offset(0, 4),
                  ),
                ],
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Icon(Icons.auto_awesome, color: Colors.white, size: 20),
                  const SizedBox(width: 8),
                  Text(
                    'Interpret Dream',
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildInterpretationResult() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            AppTheme.supernovaGold.withOpacity(0.1),
            AppTheme.stellarYellow.withOpacity(0.1),
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(
          color: AppTheme.supernovaGold.withOpacity(0.3),
          width: 1,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(Icons.lightbulb, color: AppTheme.supernovaGold, size: 24),
              const SizedBox(width: 8),
              Text(
                'Dream Interpretation',
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  color: AppTheme.supernovaGold,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Text(
            'Your dream reveals deep insights about your subconscious mind and spiritual journey. The symbols and themes suggest you are experiencing a period of transformation and growth.',
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
              color: AppTheme.starlightWhite,
              height: 1.5,
            ),
          ),
          const SizedBox(height: 16),
          _buildSymbolAnalysis(),
        ],
      ),
    );
  }

  Widget _buildSymbolAnalysis() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Key Symbols:',
          style: Theme.of(context).textTheme.titleSmall?.copyWith(
            color: AppTheme.supernovaGold,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 8),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: [
            _buildSymbolChip('Transformation', AppTheme.electricViolet),
            _buildSymbolChip('Growth', AppTheme.auroraGreen),
            _buildSymbolChip('Guidance', AppTheme.celestialBlue),
            _buildSymbolChip('Freedom', AppTheme.supernovaGold),
          ],
        ),
      ],
    );
  }

  Widget _buildSymbolChip(String symbol, Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(
        color: color.withOpacity(0.2),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: color.withOpacity(0.3)),
      ),
      child: Text(
        symbol,
        style: Theme.of(context).textTheme.bodySmall?.copyWith(
          color: color,
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }

  Widget _buildDreamCard(Map<String, dynamic> dream) {
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
          color: dream['color'].withOpacity(0.3),
          width: 1,
        ),
        boxShadow: [
          BoxShadow(
            color: dream['color'].withOpacity(0.1),
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
              Container(
                width: 40,
                height: 40,
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    colors: [dream['color'], dream['color'].withOpacity(0.7)],
                  ),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Icon(
                  Icons.auto_awesome,
                  color: Colors.white,
                  size: 20,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      dream['title'],
                      style: Theme.of(context).textTheme.titleMedium?.copyWith(
                        color: AppTheme.starlightWhite,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    Text(
                      dream['date'],
                      style: Theme.of(context).textTheme.bodySmall?.copyWith(
                        color: AppTheme.cosmicSilver,
                      ),
                    ),
                  ],
                ),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: dream['color'].withOpacity(0.2),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Text(
                  dream['mood'],
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                    color: dream['color'],
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Text(
            dream['description'],
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
              color: AppTheme.starlightWhite,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            dream['interpretation'],
            style: Theme.of(context).textTheme.bodySmall?.copyWith(
              color: AppTheme.cosmicSilver,
              fontStyle: FontStyle.italic,
            ),
          ),
          const SizedBox(height: 12),
          Wrap(
            spacing: 4,
            runSpacing: 4,
            children: (dream['symbols'] as List<String>).map((symbol) {
              return Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: dream['color'].withOpacity(0.2),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Text(
                  symbol,
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                    color: dream['color'],
                    fontWeight: FontWeight.bold,
                  ),
                ),
              );
            }).toList(),
          ),
        ],
      ),
    );
  }

  Widget _buildSymbolCard(Map<String, dynamic> symbol) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            symbol['color'].withOpacity(0.1),
            symbol['color'].withOpacity(0.05),
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: symbol['color'].withOpacity(0.3),
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
                colors: [symbol['color'], symbol['color'].withOpacity(0.7)],
              ),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Icon(
              symbol['icon'],
              color: Colors.white,
              size: 24,
            ),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  symbol['symbol'],
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    color: AppTheme.starlightWhite,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  symbol['meaning'],
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                    color: AppTheme.cosmicSilver,
                  ),
                ),
                const SizedBox(height: 8),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  decoration: BoxDecoration(
                    color: symbol['color'].withOpacity(0.2),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Text(
                    symbol['category'],
                    style: Theme.of(context).textTheme.bodySmall?.copyWith(
                      color: symbol['color'],
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildJournalEntry() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            AppTheme.auroraGreen.withOpacity(0.1),
            AppTheme.stellarTeal.withOpacity(0.1),
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(
          color: AppTheme.auroraGreen.withOpacity(0.3),
          width: 1,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Dream Journal Entry',
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
              color: AppTheme.auroraGreen,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 16),
          TextField(
            maxLines: 8,
            style: TextStyle(color: AppTheme.starlightWhite),
            decoration: InputDecoration(
              hintText: 'Write about your dream experience, emotions, and insights...',
              hintStyle: TextStyle(color: AppTheme.cosmicSilver),
              filled: true,
              fillColor: AppTheme.stellarGray.withOpacity(0.1),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(12),
                borderSide: BorderSide(color: AppTheme.auroraGreen.withOpacity(0.3)),
              ),
              enabledBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(12),
                borderSide: BorderSide(color: AppTheme.auroraGreen.withOpacity(0.3)),
              ),
              focusedBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(12),
                borderSide: BorderSide(color: AppTheme.auroraGreen, width: 2),
              ),
            ),
          ),
          const SizedBox(height: 16),
          Row(
            children: [
              Expanded(
                child: GestureDetector(
                  onTap: _saveJournalEntry,
                  child: Container(
                    padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 16),
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        colors: [AppTheme.auroraGreen, AppTheme.stellarTeal],
                      ),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Text(
                      'Save Entry',
                      style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                      ),
                      textAlign: TextAlign.center,
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: GestureDetector(
                  onTap: _clearJournalEntry,
                  child: Container(
                    padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 16),
                    decoration: BoxDecoration(
                      color: AppTheme.stellarGray.withOpacity(0.2),
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: AppTheme.stellarGray.withOpacity(0.3)),
                    ),
                    child: Text(
                      'Clear',
                      style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                        color: AppTheme.stellarGray,
                        fontWeight: FontWeight.bold,
                      ),
                      textAlign: TextAlign.center,
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

  // Action methods
  void _interpretDream() {
    if (_dreamController.text.isNotEmpty) {
      // Add interpretation logic here
      print('Interpreting dream: ${_dreamController.text}');
    }
  }

  void _saveJournalEntry() {
    // Save journal entry logic
    print('Saving journal entry');
  }

  void _clearJournalEntry() {
    // Clear journal entry logic
    print('Clearing journal entry');
  }
}