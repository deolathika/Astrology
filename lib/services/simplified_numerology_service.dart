import 'package:flutter/material.dart';

class SimplifiedNumerologyService {
  // 🌟 COMPREHENSIVE NUMEROLOGY CALCULATIONS 🌟
  static Map<String, dynamic> calculateLifePathAnalysis(DateTime birthDate, String fullName) {
    final lifePath = _calculateLifePathNumber(birthDate);
    return {
      'life_path_number': lifePath,
      'life_purpose': _getLifePurpose(lifePath),
      'life_challenges': _getLifeChallenges(lifePath),
      'life_opportunities': _getLifeOpportunities(lifePath),
      'life_lessons': _getLifeLessons(lifePath),
      'life_strengths': _getLifeStrengths(lifePath),
      'life_guidance': _getLifeGuidance(lifePath),
    };
  }

  static Map<String, dynamic> calculateDestinyAnalysis(String fullName) {
    final destiny = _calculateDestinyNumber(fullName);
    return {
      'destiny_number': destiny,
      'life_mission': _getLifeMission(destiny),
      'career_path': _getCareerPath(destiny),
      'life_purpose': _getDestinyPurpose(destiny),
      'challenges': _getDestinyChallenges(destiny),
      'opportunities': _getDestinyOpportunities(destiny),
    };
  }

  static Map<String, dynamic> calculateSoulUrgeAnalysis(String fullName) {
    final soulUrge = _calculateSoulUrgeNumber(fullName);
    return {
      'soul_urge_number': soulUrge,
      'heart_desires': _getHeartDesires(soulUrge),
      'emotional_needs': _getEmotionalNeeds(soulUrge),
      'spiritual_yearnings': _getSpiritualYearnings(soulUrge),
      'inner_conflicts': _getInnerConflicts(soulUrge),
      'fulfillment_path': _getFulfillmentPath(soulUrge),
    };
  }

  static Map<String, dynamic> calculatePersonalityAnalysis(String fullName) {
    final personality = _calculatePersonalityNumber(fullName);
    return {
      'personality_number': personality,
      'outer_image': _getOuterImage(personality),
      'first_impression': _getFirstImpression(personality),
      'social_mask': _getSocialMask(personality),
      'interaction_style': _getInteractionStyle(personality),
      'hidden_aspects': _getHiddenAspects(personality),
    };
  }

  static Map<String, dynamic> calculatePersonalYearAnalysis(DateTime birthDate, int currentYear) {
    final personalYear = _calculatePersonalYear(birthDate, currentYear);
    return {
      'personal_year_number': personalYear,
      'year_theme': _getYearTheme(personalYear),
      'year_focus': _getYearFocus(personalYear),
      'year_challenges': _getYearChallenges(personalYear),
      'year_opportunities': _getYearOpportunities(personalYear),
      'year_guidance': _getYearGuidance(personalYear),
    };
  }

  static Map<String, dynamic> generateSuccessBlueprint(String fullName, DateTime birthDate) {
    final lifePath = _calculateLifePathNumber(birthDate);
    final destiny = _calculateDestinyNumber(fullName);
    final soulUrge = _calculateSoulUrgeNumber(fullName);
    
    return {
      'life_path': lifePath,
      'destiny': destiny,
      'soul_urge': soulUrge,
      'success_strategy': _getSuccessStrategy(lifePath, destiny, soulUrge),
      'key_strengths': _getKeyStrengths(lifePath, destiny, soulUrge),
      'growth_areas': _getGrowthAreas(lifePath, destiny, soulUrge),
      'action_steps': _getActionSteps(lifePath, destiny, soulUrge),
    };
  }

  static int _calculateLifePathNumber(DateTime birthDate) {
    int sum = birthDate.day + birthDate.month + birthDate.year;
    while (sum > 9 && sum != 11 && sum != 22 && sum != 33) {
      sum = sum.toString().split('').map(int.parse).reduce((a, b) => a + b);
    }
    return sum;
  }

  static int _calculateDestinyNumber(String fullName) {
    final name = fullName.replaceAll(' ', '').toLowerCase();
    int sum = 0;
    for (int i = 0; i < name.length; i++) {
      sum += _getLetterValue(name[i]);
    }
    while (sum > 9 && sum != 11 && sum != 22 && sum != 33) {
      sum = sum.toString().split('').map(int.parse).reduce((a, b) => a + b);
    }
    return sum;
  }

  static int _calculateSoulUrgeNumber(String fullName) {
    final vowels = fullName.replaceAll(' ', '').toLowerCase().replaceAll(RegExp(r'[^aeiou]'), '');
    int sum = 0;
    for (int i = 0; i < vowels.length; i++) {
      sum += _getLetterValue(vowels[i]);
    }
    while (sum > 9 && sum != 11 && sum != 22 && sum != 33) {
      sum = sum.toString().split('').map(int.parse).reduce((a, b) => a + b);
    }
    return sum;
  }

  static int _calculatePersonalityNumber(String fullName) {
    final consonants = fullName.replaceAll(' ', '').toLowerCase().replaceAll(RegExp(r'[aeiou]'), '');
    int sum = 0;
    for (int i = 0; i < consonants.length; i++) {
      sum += _getLetterValue(consonants[i]);
    }
    while (sum > 9 && sum != 11 && sum != 22 && sum != 33) {
      sum = sum.toString().split('').map(int.parse).reduce((a, b) => a + b);
    }
    return sum;
  }

  static int _calculatePersonalYear(DateTime birthDate, int currentYear) {
    int sum = birthDate.day + birthDate.month + currentYear;
    while (sum > 9 && sum != 11 && sum != 22 && sum != 33) {
      sum = sum.toString().split('').map(int.parse).reduce((a, b) => a + b);
    }
    return sum;
  }

  static int _getLetterValue(String letter) {
    const values = {
      'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9,
      'j': 1, 'k': 2, 'l': 3, 'm': 4, 'n': 5, 'o': 6, 'p': 7, 'q': 8, 'r': 9,
      's': 1, 't': 2, 'u': 3, 'v': 4, 'w': 5, 'x': 6, 'y': 7, 'z': 8
    };
    return values[letter] ?? 0;
  }

  static String _getLifePurpose(int number) {
    const purposes = {
      1: 'Leadership and innovation - you are here to lead and inspire others',
      2: 'Cooperation and harmony - you are here to bring people together',
      3: 'Creative expression and communication - you are here to inspire through art and words',
      4: 'Building foundations and stability - you are here to create lasting structures',
      5: 'Freedom and adventure - you are here to experience and share life\'s diversity',
      6: 'Nurturing and service - you are here to care for and support others',
      7: 'Spiritual wisdom and introspection - you are here to seek and share truth',
      8: 'Material success and authority - you are here to achieve and lead in business',
      9: 'Universal love and humanitarianism - you are here to serve humanity',
      11: 'Spiritual enlightenment and inspiration - you are here to inspire others spiritually',
      22: 'Master builder and practical idealism - you are here to manifest grand visions',
      33: 'Master teacher and spiritual healer - you are here to heal and teach humanity',
    };
    return purposes[number] ?? 'Your life purpose is unique and evolving';
  }

  static String _getLifeChallenges(int number) {
    const challenges = {
      1: 'Learning to lead without dominating, developing patience and humility',
      2: 'Balancing cooperation with personal needs, avoiding codependency',
      3: 'Focusing creative energy, avoiding superficiality and gossip',
      4: 'Maintaining flexibility while building stability, avoiding rigidity',
      5: 'Balancing freedom with responsibility, avoiding restlessness',
      6: 'Caring for others without losing yourself, avoiding perfectionism',
      7: 'Sharing wisdom without being judgmental, avoiding isolation',
      8: 'Using power wisely, avoiding materialism and control issues',
      9: 'Serving others without martyrdom, avoiding self-righteousness',
      11: 'Balancing spiritual ideals with practical reality',
      22: 'Managing grand visions with daily responsibilities',
      33: 'Balancing spiritual service with personal needs',
    };
    return challenges[number] ?? 'Your challenges are opportunities for growth';
  }

  static String _getLifeOpportunities(int number) {
    const opportunities = {
      1: 'Leadership roles, entrepreneurship, pioneering new ideas',
      2: 'Partnerships, diplomacy, healing professions, counseling',
      3: 'Arts, entertainment, communication, teaching, writing',
      4: 'Construction, organization, management, practical skills',
      5: 'Travel, sales, marketing, adventure, freedom-based careers',
      6: 'Teaching, healing, family, service, community work',
      7: 'Research, spirituality, analysis, investigation, healing',
      8: 'Business, finance, management, authority positions',
      9: 'Humanitarian work, healing, teaching, global service',
      11: 'Spiritual teaching, healing, inspiration, counseling',
      22: 'Large-scale projects, architecture, global impact',
      33: 'Spiritual healing, teaching, humanitarian leadership',
    };
    return opportunities[number] ?? 'Your opportunities are as vast as your potential';
  }

  static String _getLifeLessons(int number) {
    const lessons = {
      1: 'Independence, leadership, self-confidence, originality',
      2: 'Cooperation, patience, diplomacy, sensitivity',
      3: 'Self-expression, creativity, communication, joy',
      4: 'Discipline, organization, patience, hard work',
      5: 'Freedom, adaptability, versatility, communication',
      6: 'Responsibility, nurturing, service, balance',
      7: 'Spirituality, introspection, wisdom, analysis',
      8: 'Power, authority, material success, organization',
      9: 'Compassion, service, wisdom, completion',
      11: 'Intuition, inspiration, spiritual awareness',
      22: 'Practical idealism, large-scale thinking, manifestation',
      33: 'Spiritual service, healing, teaching, compassion',
    };
    return lessons[number] ?? 'Your lessons are unique to your soul\'s journey';
  }

  static String _getLifeStrengths(int number) {
    const strengths = {
      1: 'Leadership, independence, courage, innovation, determination',
      2: 'Cooperation, sensitivity, diplomacy, patience, intuition',
      3: 'Creativity, communication, optimism, artistic ability, humor',
      4: 'Reliability, organization, patience, practicality, determination',
      5: 'Versatility, adaptability, communication, freedom, adventure',
      6: 'Nurturing, responsibility, service, harmony, healing',
      7: 'Wisdom, spirituality, analysis, intuition, depth',
      8: 'Power, authority, organization, ambition, material success',
      9: 'Compassion, wisdom, service, humanitarianism, completion',
      11: 'Intuition, inspiration, spiritual awareness, healing',
      22: 'Practical idealism, large-scale thinking, manifestation',
      33: 'Spiritual service, healing, teaching, compassion',
    };
    return strengths[number] ?? 'Your strengths are as unique as your soul';
  }

  static String _getLifeGuidance(int number) {
    const guidance = {
      1: 'Trust your leadership abilities and take initiative in your life',
      2: 'Develop your intuitive and cooperative nature while maintaining balance',
      3: 'Express your creativity and use your communication gifts to inspire others',
      4: 'Build solid foundations and use your practical nature to create lasting success',
      5: 'Embrace change and use your versatility to experience life fully',
      6: 'Focus on service and use your nurturing nature to help others grow',
      7: 'Develop your spiritual awareness and share your wisdom with others',
      8: 'Use your power wisely and create material success through ethical means',
      9: 'Serve humanity and use your compassion to make a global impact',
      11: 'Trust your intuition and use your spiritual gifts to inspire others',
      22: 'Think big and use your practical idealism to manifest grand visions',
      33: 'Use your spiritual gifts to heal and teach humanity',
    };
    return guidance[number] ?? 'Your guidance comes from within - trust your inner wisdom';
  }

  static String _getLifeMission(int number) {
    const missions = {
      1: 'To lead and inspire others through your unique vision and courage',
      2: 'To bring harmony and cooperation to all your relationships and endeavors',
      3: 'To inspire others through your creative expression and communication',
      4: 'To build solid foundations and create lasting structures in the world',
      5: 'To experience and share the diversity of life through freedom and adventure',
      6: 'To nurture and support others in their growth and development',
      7: 'To seek and share spiritual truth and wisdom with humanity',
      8: 'To achieve material success and use your authority for the greater good',
      9: 'To serve humanity through compassion and universal love',
      11: 'To inspire others through your spiritual awareness and intuition',
      22: 'To manifest grand visions that serve humanity\'s highest good',
      33: 'To heal and teach humanity through your spiritual gifts',
    };
    return missions[number] ?? 'Your mission is to fulfill your unique soul purpose';
  }

  static String _getCareerPath(int number) {
    const careers = {
      1: 'Leadership roles, entrepreneurship, management, pioneering',
      2: 'Partnerships, counseling, healing, diplomacy, service',
      3: 'Arts, entertainment, communication, teaching, writing',
      4: 'Construction, organization, management, practical fields',
      5: 'Travel, sales, marketing, adventure, freedom-based work',
      6: 'Teaching, healing, family services, community work',
      7: 'Research, spirituality, analysis, investigation, healing',
      8: 'Business, finance, management, authority positions',
      9: 'Humanitarian work, healing, teaching, global service',
      11: 'Spiritual teaching, healing, inspiration, counseling',
      22: 'Large-scale projects, architecture, global impact',
      33: 'Spiritual healing, teaching, humanitarian leadership',
    };
    return careers[number] ?? 'Your career path is as unique as your talents';
  }

  static String _getDestinyPurpose(int number) {
    const purposes = {
      1: 'To be a pioneer and leader in your chosen field',
      2: 'To be a peacemaker and bring harmony to relationships',
      3: 'To be a creative inspiration and communicator',
      4: 'To be a builder and organizer of lasting structures',
      5: 'To be an adventurer and bring change and freedom',
      6: 'To be a nurturer and healer in your community',
      7: 'To be a seeker and teacher of spiritual wisdom',
      8: 'To be an achiever and leader in material success',
      9: 'To be a humanitarian and serve the greater good',
      11: 'To be a spiritual inspiration and intuitive guide',
      22: 'To be a master builder and manifest grand visions',
      33: 'To be a spiritual healer and teacher of humanity',
    };
    return purposes[number] ?? 'Your destiny purpose is to fulfill your soul\'s calling';
  }

  static String _getDestinyChallenges(int number) {
    const challenges = {
      1: 'Learning to lead without dominating others',
      2: 'Balancing cooperation with personal needs',
      3: 'Focusing creative energy and avoiding superficiality',
      4: 'Maintaining flexibility while building stability',
      5: 'Balancing freedom with responsibility',
      6: 'Caring for others without losing yourself',
      7: 'Sharing wisdom without being judgmental',
      8: 'Using power wisely and avoiding materialism',
      9: 'Serving others without martyrdom',
      11: 'Balancing spiritual ideals with practical reality',
      22: 'Managing grand visions with daily responsibilities',
      33: 'Balancing spiritual service with personal needs',
    };
    return challenges[number] ?? 'Your challenges are opportunities for growth';
  }

  static String _getDestinyOpportunities(int number) {
    const opportunities = {
      1: 'Leadership positions, entrepreneurship, pioneering new ideas',
      2: 'Partnerships, healing professions, diplomatic roles',
      3: 'Creative fields, communication, entertainment, teaching',
      4: 'Construction, organization, management, practical skills',
      5: 'Travel, sales, marketing, adventure, freedom-based careers',
      6: 'Teaching, healing, family services, community work',
      7: 'Research, spirituality, analysis, investigation',
      8: 'Business, finance, management, authority positions',
      9: 'Humanitarian work, healing, teaching, global service',
      11: 'Spiritual teaching, healing, inspiration, counseling',
      22: 'Large-scale projects, architecture, global impact',
      33: 'Spiritual healing, teaching, humanitarian leadership',
    };
    return opportunities[number] ?? 'Your opportunities are as vast as your potential';
  }

  static String _getHeartDesires(int number) {
    const desires = {
      1: 'To lead and inspire others, to be recognized for your achievements',
      2: 'To be loved and appreciated, to create harmony in relationships',
      3: 'To express yourself creatively, to be admired for your talents',
      4: 'To build something lasting, to be respected for your reliability',
      5: 'To be free and adventurous, to experience life\'s diversity',
      6: 'To nurture and care for others, to create a loving home',
      7: 'To understand life\'s mysteries, to find spiritual truth',
      8: 'To achieve material success, to have power and authority',
      9: 'To serve humanity, to make a positive impact on the world',
      11: 'To inspire others spiritually, to be a channel for divine wisdom',
      22: 'To manifest grand visions, to build something that serves humanity',
      33: 'To heal and teach humanity, to be a spiritual leader',
    };
    return desires[number] ?? 'Your heart desires are unique to your soul';
  }

  static String _getEmotionalNeeds(int number) {
    const needs = {
      1: 'Recognition, independence, respect, admiration',
      2: 'Love, appreciation, harmony, emotional security',
      3: 'Admiration, creative expression, joy, social connection',
      4: 'Stability, respect, security, emotional grounding',
      5: 'Freedom, variety, excitement, emotional stimulation',
      6: 'Love, nurturing, family connection, emotional security',
      7: 'Understanding, spiritual connection, emotional depth',
      8: 'Respect, power, emotional control, material security',
      9: 'Love for humanity, emotional fulfillment through service',
      11: 'Spiritual connection, emotional inspiration, divine love',
      22: 'Emotional fulfillment through grand achievements',
      33: 'Emotional fulfillment through spiritual service',
    };
    return needs[number] ?? 'Your emotional needs are as unique as your heart';
  }

  static String _getSpiritualYearnings(int number) {
    const yearnings = {
      1: 'To understand your divine purpose and lead others spiritually',
      2: 'To find unity with the divine and bring peace to the world',
      3: 'To express the divine through creativity and communication',
      4: 'To build a spiritual foundation and serve the divine order',
      5: 'To experience the divine through freedom and adventure',
      6: 'To serve the divine through love and nurturing',
      7: 'To know the divine through wisdom and spiritual understanding',
      8: 'To manifest the divine through material success and power',
      9: 'To serve the divine through universal love and compassion',
      11: 'To be a channel for divine inspiration and spiritual healing',
      22: 'To manifest divine will through grand spiritual projects',
      33: 'To be a divine healer and teacher of spiritual truth',
    };
    return yearnings[number] ?? 'Your spiritual yearnings are as deep as your soul';
  }

  static String _getInnerConflicts(int number) {
    const conflicts = {
      1: 'Between independence and the need for others',
      2: 'Between cooperation and personal needs',
      3: 'Between self-expression and social acceptance',
      4: 'Between stability and the need for change',
      5: 'Between freedom and responsibility',
      6: 'Between caring for others and self-care',
      7: 'Between spiritual seeking and practical reality',
      8: 'Between material success and spiritual values',
      9: 'Between personal needs and service to others',
      11: 'Between spiritual ideals and earthly limitations',
      22: 'Between grand visions and practical implementation',
      33: 'Between spiritual service and personal fulfillment',
    };
    return conflicts[number] ?? 'Your inner conflicts are opportunities for growth';
  }

  static String _getFulfillmentPath(int number) {
    const paths = {
      1: 'Through leadership, independence, and pioneering new ideas',
      2: 'Through cooperation, harmony, and service to others',
      3: 'Through creative expression, communication, and inspiration',
      4: 'Through building foundations, organization, and practical service',
      5: 'Through freedom, adventure, and experiencing life\'s diversity',
      6: 'Through nurturing, caring, and creating loving relationships',
      7: 'Through spiritual seeking, wisdom, and sharing truth',
      8: 'Through material success, power, and creating lasting impact',
      9: 'Through humanitarian service, compassion, and universal love',
      11: 'Through spiritual inspiration, healing, and divine connection',
      22: 'Through manifesting grand visions and practical idealism',
      33: 'Through spiritual healing, teaching, and serving humanity',
    };
    return paths[number] ?? 'Your fulfillment path is unique to your soul';
  }

  static String _getOuterImage(int number) {
    const images = {
      1: 'Confident, independent, leader-like, determined',
      2: 'Gentle, cooperative, diplomatic, sensitive',
      3: 'Creative, expressive, optimistic, charming',
      4: 'Reliable, practical, organized, disciplined',
      5: 'Adventurous, versatile, communicative, free-spirited',
      6: 'Nurturing, responsible, caring, harmonious',
      7: 'Wise, spiritual, analytical, introspective',
      8: 'Powerful, authoritative, ambitious, successful',
      9: 'Compassionate, wise, humanitarian, universal',
      11: 'Intuitive, inspiring, spiritual, enlightened',
      22: 'Visionary, practical, idealistic, masterful',
      33: 'Healing, teaching, spiritual, compassionate',
    };
    return images[number] ?? 'Your outer image reflects your inner essence';
  }

  static String _getFirstImpression(int number) {
    const impressions = {
      1: 'Strong, confident, natural leader',
      2: 'Gentle, kind, peacemaker',
      3: 'Creative, expressive, inspiring',
      4: 'Reliable, practical, trustworthy',
      5: 'Adventurous, exciting, free-spirited',
      6: 'Caring, nurturing, responsible',
      7: 'Wise, mysterious, spiritual',
      8: 'Powerful, successful, authoritative',
      9: 'Compassionate, wise, humanitarian',
      11: 'Inspiring, intuitive, spiritual',
      22: 'Visionary, practical, masterful',
      33: 'Healing, teaching, spiritual',
    };
    return impressions[number] ?? 'Your first impression is uniquely yours';
  }

  static String _getSocialMask(int number) {
    const masks = {
      1: 'The confident leader who may hide vulnerability',
      2: 'The peacemaker who may hide personal needs',
      3: 'The entertainer who may hide deeper emotions',
      4: 'The reliable worker who may hide creativity',
      5: 'The adventurer who may hide commitment fears',
      6: 'The nurturer who may hide personal needs',
      7: 'The wise one who may hide emotional needs',
      8: 'The achiever who may hide spiritual yearnings',
      9: 'The humanitarian who may hide personal desires',
      11: 'The spiritual guide who may hide human needs',
      22: 'The visionary who may hide practical concerns',
      33: 'The healer who may hide personal pain',
    };
    return masks[number] ?? 'Your social mask protects your authentic self';
  }

  static String _getInteractionStyle(int number) {
    const styles = {
      1: 'Direct, assertive, leading, inspiring',
      2: 'Cooperative, diplomatic, supportive, gentle',
      3: 'Expressive, creative, inspiring, communicative',
      4: 'Practical, organized, reliable, methodical',
      5: 'Versatile, adaptable, communicative, exciting',
      6: 'Nurturing, caring, supportive, responsible',
      7: 'Analytical, wise, introspective, spiritual',
      8: 'Authoritative, powerful, ambitious, successful',
      9: 'Compassionate, wise, humanitarian, universal',
      11: 'Inspiring, intuitive, spiritual, healing',
      22: 'Visionary, practical, idealistic, masterful',
      33: 'Healing, teaching, spiritual, compassionate',
    };
    return styles[number] ?? 'Your interaction style is uniquely yours';
  }

  static String _getHiddenAspects(int number) {
    const aspects = {
      1: 'Vulnerability, need for support, fear of failure',
      2: 'Personal needs, assertiveness, independence',
      3: 'Deeper emotions, seriousness, vulnerability',
      4: 'Creativity, flexibility, emotional expression',
      5: 'Commitment, stability, emotional depth',
      6: 'Personal needs, independence, self-care',
      7: 'Emotional needs, social connection, practicality',
      8: 'Spiritual yearnings, emotional vulnerability, humility',
      9: 'Personal desires, emotional needs, self-care',
      11: 'Human needs, emotional vulnerability, practical concerns',
      22: 'Personal limitations, emotional needs, spiritual humility',
      33: 'Personal pain, emotional vulnerability, human limitations',
    };
    return aspects[number] ?? 'Your hidden aspects are part of your wholeness';
  }

  static String _getYearTheme(int number) {
    const themes = {
      1: 'New beginnings, leadership, independence, fresh starts',
      2: 'Cooperation, partnerships, patience, harmony',
      3: 'Creativity, communication, self-expression, joy',
      4: 'Building foundations, hard work, stability, organization',
      5: 'Change, freedom, adventure, versatility',
      6: 'Responsibility, service, family, nurturing',
      7: 'Spiritual growth, introspection, wisdom, analysis',
      8: 'Material success, power, authority, achievement',
      9: 'Completion, service, humanitarianism, wisdom',
    };
    return themes[number] ?? 'Your year theme is unique to your journey';
  }

  static String _getYearFocus(int number) {
    const focuses = {
      1: 'Taking initiative, starting new projects, leading others',
      2: 'Building partnerships, developing patience, cooperation',
      3: 'Creative expression, communication, social connections',
      4: 'Building foundations, hard work, organization, stability',
      5: 'Embracing change, seeking freedom, adventure, versatility',
      6: 'Service to others, family responsibilities, nurturing',
      7: 'Spiritual growth, introspection, wisdom, analysis',
      8: 'Material success, power, authority, achievement',
      9: 'Completion, service, humanitarianism, wisdom',
    };
    return focuses[number] ?? 'Your year focus is aligned with your growth';
  }

  static String _getYearChallenges(int number) {
    const challenges = {
      1: 'Learning to lead without dominating, developing patience',
      2: 'Balancing cooperation with personal needs, avoiding codependency',
      3: 'Focusing creative energy, avoiding superficiality',
      4: 'Maintaining flexibility while building stability',
      5: 'Balancing freedom with responsibility, avoiding restlessness',
      6: 'Caring for others without losing yourself',
      7: 'Sharing wisdom without being judgmental',
      8: 'Using power wisely, avoiding materialism',
      9: 'Serving others without martyrdom',
    };
    return challenges[number] ?? 'Your year challenges are opportunities for growth';
  }

  static String _getYearOpportunities(int number) {
    const opportunities = {
      1: 'Leadership roles, new beginnings, pioneering projects',
      2: 'Partnerships, diplomatic roles, healing professions',
      3: 'Creative projects, communication, entertainment',
      4: 'Building projects, organization, practical skills',
      5: 'Travel, adventure, new experiences, freedom',
      6: 'Service opportunities, family growth, healing',
      7: 'Spiritual growth, research, wisdom, analysis',
      8: 'Business success, material achievement, power',
      9: 'Humanitarian work, service, global impact',
    };
    return opportunities[number] ?? 'Your year opportunities are as vast as your potential';
  }

  static String _getYearGuidance(int number) {
    const guidance = {
      1: 'Trust your leadership abilities and take initiative',
      2: 'Develop cooperation and patience in all relationships',
      3: 'Express your creativity and communicate with joy',
      4: 'Build solid foundations and work with determination',
      5: 'Embrace change and seek new experiences',
      6: 'Focus on service and nurturing others',
      7: 'Develop spiritual awareness and share wisdom',
      8: 'Use your power wisely and achieve material success',
      9: 'Serve humanity and share your compassion',
    };
    return guidance[number] ?? 'Your year guidance comes from your inner wisdom';
  }

  static String _getSuccessStrategy(int lifePath, int destiny, int soulUrge) {
    return 'Combine your life path leadership (${lifePath}) with your destiny mission (${destiny}) and your heart\'s desires (${soulUrge}) to create a unique success strategy that aligns with your soul purpose.';
  }

  static String _getKeyStrengths(int lifePath, int destiny, int soulUrge) {
    return 'Your key strengths combine your natural abilities (${lifePath}), your life mission (${destiny}), and your heart\'s calling (${soulUrge}) to create a powerful foundation for success.';
  }

  static String _getGrowthAreas(int lifePath, int destiny, int soulUrge) {
    return 'Your growth areas involve balancing your life path challenges (${lifePath}), your destiny obstacles (${destiny}), and your soul\'s inner conflicts (${soulUrge}) to achieve wholeness and success.';
  }

  static String _getActionSteps(int lifePath, int destiny, int soulUrge) {
    return 'Take action by: 1) Using your life path strengths (${lifePath}), 2) Following your destiny mission (${destiny}), 3) Honoring your heart\'s desires (${soulUrge}) to create a fulfilling and successful life.';
  }
}
