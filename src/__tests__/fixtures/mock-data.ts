export const mockUser = {
  id: 'test-user-123',
  name: 'Test User',
  email: 'test@example.com',
  role: 'USER',
  image: null,
  createdAt: new Date('2024-01-01T00:00:00Z'),
  updatedAt: new Date('2024-01-15T10:30:00Z')
}

export const mockProfile = {
  id: 'test-profile-123',
  userId: 'test-user-123',
  fullName: 'Test User',
  birthDate: new Date('1990-01-15'),
  birthTime: '14:30',
  birthPlace: 'New York, US',
  latitude: 40.7128,
  longitude: -74.0060,
  timezone: 'America/New_York',
  zodiacSign: 'Capricorn',
  system: 'western',
  createdAt: new Date('2024-01-01T00:00:00Z'),
  updatedAt: new Date('2024-01-15T10:30:00Z')
}

export const mockAstrologyData = {
  zodiacSign: 'Capricorn',
  planetaryPositions: [
    { name: 'Sun', longitude: 285.5, latitude: 0, distance: 1, speed: 0 },
    { name: 'Moon', longitude: 45.2, latitude: 2.1, distance: 0.0025, speed: 0 },
    { name: 'Mercury', longitude: 290.1, latitude: 1.2, distance: 0.5, speed: 0 },
    { name: 'Venus', longitude: 280.3, latitude: 0.8, distance: 0.7, speed: 0 },
    { name: 'Mars', longitude: 295.7, latitude: -0.5, distance: 1.5, speed: 0 },
    { name: 'Jupiter', longitude: 310.2, latitude: -1.0, distance: 5, speed: 0 },
    { name: 'Saturn', longitude: 320.5, latitude: -1.5, distance: 9.5, speed: 0 },
    { name: 'Uranus', longitude: 330.8, latitude: -0.2, distance: 19, speed: 0 },
    { name: 'Neptune', longitude: 340.1, latitude: 0.1, distance: 30, speed: 0 },
    { name: 'Pluto', longitude: 350.4, latitude: 1.5, distance: 39, speed: 0 },
    { name: 'North Node', longitude: 290.0, latitude: 0, distance: 0, speed: 0 },
    { name: 'South Node', longitude: 110.0, latitude: 0, distance: 0, speed: 0 }
  ],
  houseCusps: [
    { house: 1, longitude: 285.5 },
    { house: 2, longitude: 315.2 },
    { house: 3, longitude: 345.8 },
    { house: 4, longitude: 15.4 },
    { house: 5, longitude: 45.1 },
    { house: 6, longitude: 75.7 },
    { house: 7, longitude: 105.5 },
    { house: 8, longitude: 135.2 },
    { house: 9, longitude: 165.8 },
    { house: 10, longitude: 195.4 },
    { house: 11, longitude: 225.1 },
    { house: 12, longitude: 255.7 }
  ]
}

export const mockNumerologyData = {
  lifePathNumber: 7,
  expressionNumber: 3,
  soulUrgeNumber: 9,
  personalityNumber: 6,
  birthdayNumber: 6,
  maturityNumber: 4,
  currentNameNumber: 3,
  masterNumbers: [],
  luckyNumbers: [3, 7, 9],
  dailyNumber: 5
}

export const mockCountries = [
  { name: 'United States', code: 'US', capital: 'Washington D.C.', timezone: 'America/New_York', coordinates: { latitude: 37.0902, longitude: -95.7129 } },
  { name: 'Sri Lanka', code: 'LK', capital: 'Colombo', timezone: 'Asia/Colombo', coordinates: { latitude: 7.8731, longitude: 80.7718 } },
  { name: 'India', code: 'IN', capital: 'New Delhi', timezone: 'Asia/Kolkata', coordinates: { latitude: 20.5937, longitude: 78.9629 } },
  { name: 'United Kingdom', code: 'GB', capital: 'London', timezone: 'Europe/London', coordinates: { latitude: 55.3781, longitude: -3.4360 } },
  { name: 'Australia', code: 'AU', capital: 'Canberra', timezone: 'Australia/Sydney', coordinates: { latitude: -25.2744, longitude: 133.7751 } }
]

export const mockCities = [
  { name: 'New York', countryCode: 'US', coordinates: { latitude: 40.7128, longitude: -74.0060 }, timezone: 'America/New_York', population: 8419000, isCapital: false },
  { name: 'Los Angeles', countryCode: 'US', coordinates: { latitude: 34.0522, longitude: -118.2437 }, timezone: 'America/Los_Angeles', population: 3898000, isCapital: false },
  { name: 'Colombo', countryCode: 'LK', coordinates: { latitude: 6.9271, longitude: 79.8612 }, timezone: 'Asia/Colombo', population: 752993, isCapital: true },
  { name: 'Kandy', countryCode: 'LK', coordinates: { latitude: 7.2906, longitude: 80.6337 }, timezone: 'Asia/Colombo', population: 125400, isCapital: false },
  { name: 'Mumbai', countryCode: 'IN', coordinates: { latitude: 19.0760, longitude: 72.8777 }, timezone: 'Asia/Kolkata', population: 20411000, isCapital: false },
  { name: 'Delhi', countryCode: 'IN', coordinates: { latitude: 28.7041, longitude: 77.1025 }, timezone: 'Asia/Kolkata', population: 31181000, isCapital: true }
]

export const mockValidationResult = {
  isValid: true,
  errors: [],
  warnings: [],
  data: {
    fullName: 'Test User',
    email: 'test@example.com',
    birthDate: '1990-01-15',
    birthTime: '14:30',
    birthPlace: {
      country: 'US',
      city: 'New York',
      latitude: 40.7128,
      longitude: -74.0060,
      timezone: 'America/New_York'
    },
    utcDateTime: new Date('1990-01-15T19:30:00.000Z'),
    julianDay: 2447891.3125,
    siderealTime: 285.5,
    zodiacSigns: {
      western: 'Capricorn',
      vedic: 'Sagittarius',
      chinese: 'Snake',
      sriLankan: 'Makara'
    }
  }
}

export const mockAPIResponse = {
  success: true,
  data: {
    user: mockUser,
    profile: mockProfile,
    astrology: mockAstrologyData,
    numerology: mockNumerologyData
  }
}

export const mockErrorResponse = {
  success: false,
  error: 'Test error message',
  details: 'Detailed error information'
}
