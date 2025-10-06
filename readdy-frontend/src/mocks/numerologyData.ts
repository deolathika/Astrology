
export const numerologyMeanings = {
  1: {
    title: 'The Leader',
    description: 'Independent, pioneering, and ambitious. Natural born leaders who forge their own path.',
    traits: ['Leadership', 'Independence', 'Innovation', 'Determination'],
    color: '#FF6B6B',
    element: 'Fire'
  },
  2: {
    title: 'The Peacemaker',
    description: 'Cooperative, diplomatic, and sensitive. Masters of harmony and partnership.',
    traits: ['Cooperation', 'Diplomacy', 'Sensitivity', 'Partnership'],
    color: '#4ECDC4',
    element: 'Water'
  },
  3: {
    title: 'The Creative',
    description: 'Expressive, optimistic, and artistic. Natural communicators and entertainers.',
    traits: ['Creativity', 'Communication', 'Optimism', 'Artistic'],
    color: '#45B7D1',
    element: 'Air'
  },
  4: {
    title: 'The Builder',
    description: 'Practical, reliable, and hardworking. Masters of organization and stability.',
    traits: ['Stability', 'Organization', 'Reliability', 'Hard work'],
    color: '#96CEB4',
    element: 'Earth'
  },
  5: {
    title: 'The Explorer',
    description: 'Adventurous, freedom-loving, and versatile. Seekers of new experiences.',
    traits: ['Adventure', 'Freedom', 'Versatility', 'Curiosity'],
    color: '#FFEAA7',
    element: 'Fire'
  },
  6: {
    title: 'The Nurturer',
    description: 'Caring, responsible, and family-oriented. Natural healers and protectors.',
    traits: ['Nurturing', 'Responsibility', 'Healing', 'Protection'],
    color: '#DDA0DD',
    element: 'Earth'
  },
  7: {
    title: 'The Seeker',
    description: 'Spiritual, analytical, and introspective. Seekers of truth and wisdom.',
    traits: ['Spirituality', 'Analysis', 'Wisdom', 'Introspection'],
    color: '#A29BFE',
    element: 'Water'
  },
  8: {
    title: 'The Achiever',
    description: 'Ambitious, material-focused, and powerful. Masters of the material world.',
    traits: ['Ambition', 'Power', 'Material success', 'Authority'],
    color: '#FD79A8',
    element: 'Earth'
  },
  9: {
    title: 'The Humanitarian',
    description: 'Compassionate, generous, and universal. Servants of humanity and higher causes.',
    traits: ['Compassion', 'Generosity', 'Universal love', 'Service'],
    color: '#FDCB6E',
    element: 'Fire'
  }
};

export const calculateLifePath = (birthDate: string): number => {
  const digits = birthDate.replace(/\D/g, '');
  let sum = digits.split('').reduce((acc, digit) => acc + parseInt(digit), 0);
  
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
  }
  
  return sum > 9 ? 9 : sum;
};

export const calculatePersonalYear = (birthDate: string, currentYear: number): number => {
  const [month, day] = birthDate.split('/').map(num => parseInt(num));
  const yearSum = currentYear.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
  let sum = month + day + yearSum;
  
  while (sum > 9) {
    sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
  }
  
  return sum;
};
