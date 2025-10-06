
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../../components/feature/Navigation';
import StarfieldBackground from '../../components/feature/StarfieldBackground';
import ZodiacCard from '../../components/feature/ZodiacCard';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';
import { zodiacSigns, astrologyQuotes } from '../../mocks/zodiacData';
import { numerologyMeanings, calculateLifePath, calculatePersonalYear } from '../../mocks/numerologyData';

interface PersonalInfo {
  fullName: string;
  birthday: string;
  birthTime: string;
  birthPlace: string;
  zodiacSign: string;
  astrologySystem: string;
  lifePathNumber: number;
  personalYear: number;
}

interface LocationInfo {
  city: string;
  country: string;
  flag: string;
  timezone: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export default function Home() {
  const [userRole, setUserRole] = useState<'guest' | 'premium' | 'admin'>('guest');
  const [currentQuote, setCurrentQuote] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showSecretModal, setShowSecretModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showMagicModal, setShowMagicModal] = useState(false);
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showJournalModal, setShowJournalModal] = useState(false);
  const [showPersonalInfoModal, setShowPersonalInfoModal] = useState(false);
  const [showNewsletterModal, setShowNewsletterModal] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [journalEntries, setJournalEntries] = useState<any[]>([]);
  const [currentJournalEntry, setCurrentJournalEntry] = useState<any>(null);
  const [isLocationDetected, setIsLocationDetected] = useState(false);
  const navigate = useNavigate();

  // Enhanced Personal Information State
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: 'John Doe',
    birthday: '1990-03-25',
    birthTime: '14:30',
    birthPlace: 'New York, United States',
    zodiacSign: 'Aries',
    astrologySystem: 'western',
    lifePathNumber: 7,
    personalYear: 3
  });

  // Auto-detected location based on personal info
  const [location, setLocation] = useState<LocationInfo>({
    city: 'New York',
    country: 'United States',
    flag: '🇺🇸',
    timezone: 'America/New_York',
    coordinates: { lat: 40.7128, lng: -74.0060 }
  });

  // Comprehensive Global City Database with coordinates - EXPANDED
  const cityDatabase = [
    // North America - United States
    { city: 'New York', country: 'United States', flag: '🇺🇸', timezone: 'America/New_York', coordinates: { lat: 40.7128, lng: -74.0060 } },
    { city: 'Los Angeles', country: 'United States', flag: '🇺🇸', timezone: 'America/Los_Angeles', coordinates: { lat: 34.0522, lng: -118.2437 } },
    { city: 'Chicago', country: 'United States', flag: '🇺🇸', timezone: 'America/Chicago', coordinates: { lat: 41.8781, lng: -87.6298 } },
    { city: 'Houston', country: 'United States', flag: '🇺🇸', timezone: 'America/Chicago', coordinates: { lat: 29.7604, lng: -95.3698 } },
    { city: 'Miami', country: 'United States', flag: '🇺🇸', timezone: 'America/New_York', coordinates: { lat: 25.7617, lng: -80.1918 } },
    { city: 'San Francisco', country: 'United States', flag: '🇺🇸', timezone: 'America/Los_Angeles', coordinates: { lat: 37.7749, lng: -122.4194 } },
    { city: 'Seattle', country: 'United States', flag: '🇺🇸', timezone: 'America/Los_Angeles', coordinates: { lat: 47.6062, lng: -122.3321 } },
    { city: 'Denver', country: 'United States', flag: '🇺🇸', timezone: 'America/Denver', coordinates: { lat: 39.7392, lng: -104.9903 } },
    { city: 'Las Vegas', country: 'United States', flag: '🇺🇸', timezone: 'America/Los_Angeles', coordinates: { lat: 36.1699, lng: -115.1398 } },
    { city: 'Atlanta', country: 'United States', flag: '🇺🇸', timezone: 'America/New_York', coordinates: { lat: 33.7490, lng: -84.3880 } },
    { city: 'Boston', country: 'United States', flag: '🇺🇸', timezone: 'America/New_York', coordinates: { lat: 42.3601, lng: -71.0589 } },
    { city: 'Philadelphia', country: 'United States', flag: '🇺🇸', timezone: 'America/New_York', coordinates: { lat: 39.9526, lng: -75.1652 } },
    { city: 'Phoenix', country: 'United States', flag: '🇺🇸', timezone: 'America/Phoenix', coordinates: { lat: 33.4484, lng: -112.0740 } },
    { city: 'Dallas', country: 'United States', flag: '🇺🇸', timezone: 'America/Chicago', coordinates: { lat: 32.7767, lng: -96.7970 } },
    { city: 'San Diego', country: 'United States', flag: '🇺🇸', timezone: 'America/Los_Angeles', coordinates: { lat: 32.7157, lng: -117.1611 } },
    { city: 'Austin', country: 'United States', flag: '🇺🇸', timezone: 'America/Chicago', coordinates: { lat: 30.2672, lng: -97.7431 } },
    { city: 'Nashville', country: 'United States', flag: '🇺🇸', timezone: 'America/Chicago', coordinates: { lat: 36.1627, lng: -86.7816 } },
    { city: 'Portland', country: 'United States', flag: '🇺🇸', timezone: 'America/Los_Angeles', coordinates: { lat: 45.5152, lng: -122.6784 } },
    { city: 'Orlando', country: 'United States', flag: '🇺🇸', timezone: 'America/New_York', coordinates: { lat: 28.5383, lng: -81.3792 } },
    { city: 'Tampa', country: 'United States', flag: '🇺🇸', timezone: 'America/New_York', coordinates: { lat: 27.9506, lng: -82.4572 } },

    // Canada
    { city: 'Toronto', country: 'Canada', flag: '🇨🇦', timezone: 'America/Toronto', coordinates: { lat: 43.6532, lng: -79.3832 } },
    { city: 'Vancouver', country: 'Canada', flag: '🇨🇦', timezone: 'America/Vancouver', coordinates: { lat: 49.2827, lng: -123.1207 } },
    { city: 'Montreal', country: 'Canada', flag: '🇨🇦', timezone: 'America/Montreal', coordinates: { lat: 45.5017, lng: -73.5673 } },
    { city: 'Calgary', country: 'Canada', flag: '🇨🇦', timezone: 'America/Edmonton', coordinates: { lat: 51.0447, lng: -114.0719 } },
    { city: 'Ottawa', country: 'Canada', flag: '🇨🇦', timezone: 'America/Toronto', coordinates: { lat: 45.4215, lng: -75.6972 } },
    { city: 'Edmonton', country: 'Canada', flag: '🇨🇦', timezone: 'America/Edmonton', coordinates: { lat: 53.5461, lng: -113.4938 } },
    { city: 'Winnipeg', country: 'Canada', flag: '🇨🇦', timezone: 'America/Winnipeg', coordinates: { lat: 49.8951, lng: -97.1384 } },
    { city: 'Quebec City', country: 'Canada', flag: '🇨🇦', timezone: 'America/Montreal', coordinates: { lat: 46.8139, lng: -71.2080 } },

    // Mexico
    { city: 'Mexico City', country: 'Mexico', flag: '🇲🇽', timezone: 'America/Mexico_City', coordinates: { lat: 19.4326, lng: -99.1332 } },
    { city: 'Guadalajara', country: 'Mexico', flag: '🇲🇽', timezone: 'America/Mexico_City', coordinates: { lat: 20.6597, lng: -103.3496 } },
    { city: 'Monterrey', country: 'Mexico', flag: '🇲🇽', timezone: 'America/Monterrey', coordinates: { lat: 25.6866, lng: -100.3161 } },
    { city: 'Cancun', country: 'Mexico', flag: '🇲🇽', timezone: 'America/Cancun', coordinates: { lat: 21.1619, lng: -86.8515 } },
    { city: 'Tijuana', country: 'Mexico', flag: '🇲🇽', timezone: 'America/Tijuana', coordinates: { lat: 32.5149, lng: -117.0382 } },

    // Europe - United Kingdom
    { city: 'London', country: 'United Kingdom', flag: '🇬🇧', timezone: 'Europe/London', coordinates: { lat: 51.5074, lng: -0.1278 } },
    { city: 'Manchester', country: 'United Kingdom', flag: '🇬🇧', timezone: 'Europe/London', coordinates: { lat: 53.4808, lng: -2.2426 } },
    { city: 'Edinburgh', country: 'United Kingdom', flag: '🇬🇧', timezone: 'Europe/London', coordinates: { lat: 55.9533, lng: -3.1883 } },
    { city: 'Birmingham', country: 'United Kingdom', flag: '🇬🇧', timezone: 'Europe/London', coordinates: { lat: 52.4862, lng: -1.8904 } },
    { city: 'Liverpool', country: 'United Kingdom', flag: '🇬🇧', timezone: 'Europe/London', coordinates: { lat: 53.4084, lng: -2.9916 } },
    { city: 'Glasgow', country: 'United Kingdom', flag: '🇬🇧', timezone: 'Europe/London', coordinates: { lat: 55.8642, lng: -4.2518 } },
    { city: 'Bristol', country: 'United Kingdom', flag: '🇬🇧', timezone: 'Europe/London', coordinates: { lat: 51.4545, lng: -2.5879 } },

    // France
    { city: 'Paris', country: 'France', flag: '🇫🇷', timezone: 'Europe/Paris', coordinates: { lat: 48.8566, lng: 2.3522 } },
    { city: 'Lyon', country: 'France', flag: '🇫🇷', timezone: 'Europe/Paris', coordinates: { lat: 45.7640, lng: 4.8357 } },
    { city: 'Marseille', country: 'France', flag: '🇫🇷', timezone: 'Europe/Paris', coordinates: { lat: 43.2965, lng: 5.3698 } },
    { city: 'Nice', country: 'France', flag: '🇫🇷', timezone: 'Europe/Paris', coordinates: { lat: 43.7102, lng: 7.2620 } },
    { city: 'Toulouse', country: 'France', flag: '🇫🇷', timezone: 'Europe/Paris', coordinates: { lat: 43.6047, lng: 1.4442 } },
    { city: 'Bordeaux', country: 'France', flag: '🇫🇷', timezone: 'Europe/Paris', coordinates: { lat: 44.8378, lng: -0.5792 } },

    // Germany
    { city: 'Berlin', country: 'Germany', flag: '🇩🇪', timezone: 'Europe/Berlin', coordinates: { lat: 52.5200, lng: 13.4050 } },
    { city: 'Munich', country: 'Germany', flag: '🇩🇪', timezone: 'Europe/Berlin', coordinates: { lat: 48.1351, lng: 11.5820 } },
    { city: 'Hamburg', country: 'Germany', flag: '🇩🇪', timezone: 'Europe/Berlin', coordinates: { lat: 53.5511, lng: 9.9937 } },
    { city: 'Frankfurt', country: 'Germany', flag: '🇩🇪', timezone: 'Europe/Berlin', coordinates: { lat: 50.1109, lng: 8.6821 } },
    { city: 'Cologne', country: 'Germany', flag: '🇩🇪', timezone: 'Europe/Berlin', coordinates: { lat: 50.9375, lng: 6.9603 } },
    { city: 'Stuttgart', country: 'Germany', flag: '🇩🇪', timezone: 'Europe/Berlin', coordinates: { lat: 48.7758, lng: 9.1829 } },

    // Italy
    { city: 'Rome', country: 'Italy', flag: '🇮🇹', timezone: 'Europe/Rome', coordinates: { lat: 41.9028, lng: 12.4964 } },
    { city: 'Milan', country: 'Italy', flag: '🇮🇹', timezone: 'Europe/Rome', coordinates: { lat: 45.4642, lng: 9.1900 } },
    { city: 'Naples', country: 'Italy', flag: '🇮🇹', timezone: 'Europe/Rome', coordinates: { lat: 40.8518, lng: 14.2681 } },
    { city: 'Florence', country: 'Italy', flag: '🇮🇹', timezone: 'Europe/Rome', coordinates: { lat: 43.7696, lng: 11.2558 } },
    { city: 'Venice', country: 'Italy', flag: '🇮🇹', timezone: 'Europe/Rome', coordinates: { lat: 45.4408, lng: 12.3155 } },
    { city: 'Turin', country: 'Italy', flag: '🇮🇹', timezone: 'Europe/Rome', coordinates: { lat: 45.0703, lng: 7.6869 } },

    // Spain
    { city: 'Madrid', country: 'Spain', flag: '🇪🇸', timezone: 'Europe/Madrid', coordinates: { lat: 40.4168, lng: -3.7038 } },
    { city: 'Barcelona', country: 'Spain', flag: '🇪🇸', timezone: 'Europe/Madrid', coordinates: { lat: 41.3851, lng: 2.1734 } },
    { city: 'Valencia', country: 'Spain', flag: '🇪🇸', timezone: 'Europe/Madrid', coordinates: { lat: 39.4699, lng: -0.3763 } },
    { city: 'Seville', country: 'Spain', flag: '🇪🇸', timezone: 'Europe/Madrid', coordinates: { lat: 37.3891, lng: -5.9845 } },
    { city: 'Bilbao', country: 'Spain', flag: '🇪🇸', timezone: 'Europe/Madrid', coordinates: { lat: 43.2627, lng: -2.9253 } },

    // Netherlands
    { city: 'Amsterdam', country: 'Netherlands', flag: '🇳🇱', timezone: 'Europe/Amsterdam', coordinates: { lat: 52.3676, lng: 4.9041 } },
    { city: 'Rotterdam', country: 'Netherlands', flag: '🇳🇱', timezone: 'Europe/Amsterdam', coordinates: { lat: 51.9244, lng: 4.4777 } },
    { city: 'The Hague', country: 'Netherlands', flag: '🇳🇱', timezone: 'Europe/Amsterdam', coordinates: { lat: 52.0705, lng: 4.3007 } },
    { city: 'Utrecht', country: 'Netherlands', flag: '🇳🇱', timezone: 'Europe/Amsterdam', coordinates: { lat: 52.0907, lng: 5.1214 } },

    // Nordic Countries
    { city: 'Stockholm', country: 'Sweden', flag: '🇸🇪', timezone: 'Europe/Stockholm', coordinates: { lat: 59.3293, lng: 18.0686 } },
    { city: 'Gothenburg', country: 'Sweden', flag: '🇸🇪', timezone: 'Europe/Stockholm', coordinates: { lat: 57.7089, lng: 11.9746 } },
    { city: 'Copenhagen', country: 'Denmark', flag: '🇩🇰', timezone: 'Europe/Copenhagen', coordinates: { lat: 55.6761, lng: 12.5683 } },
    { city: 'Oslo', country: 'Norway', flag: '🇳🇴', timezone: 'Europe/Oslo', coordinates: { lat: 59.9139, lng: 10.7522 } },
    { city: 'Bergen', country: 'Norway', flag: '🇳🇴', timezone: 'Europe/Oslo', coordinates: { lat: 60.3913, lng: 5.3221 } },
    { city: 'Helsinki', country: 'Finland', flag: '🇫🇮', timezone: 'Europe/Helsinki', coordinates: { lat: 60.1699, lng: 24.9384 } },
    { city: 'Reykjavik', country: 'Iceland', flag: '🇮🇸', timezone: 'Atlantic/Reykjavik', coordinates: { lat: 64.1466, lng: -21.9426 } },

    // Central Europe
    { city: 'Vienna', country: 'Austria', flag: '🇦🇹', timezone: 'Europe/Vienna', coordinates: { lat: 48.2082, lng: 16.3738 } },
    { city: 'Zurich', country: 'Switzerland', flag: '🇨🇭', timezone: 'Europe/Zurich', coordinates: { lat: 47.3769, lng: 8.5417 } },
    { city: 'Geneva', country: 'Switzerland', flag: '🇨🇭', timezone: 'Europe/Zurich', coordinates: { lat: 46.2044, lng: 6.1432 } },
    { city: 'Brussels', country: 'Belgium', flag: '🇧🇪', timezone: 'Europe/Brussels', coordinates: { lat: 50.8503, lng: 4.3517 } },
    { city: 'Dublin', country: 'Ireland', flag: '🇮🇪', timezone: 'Europe/Dublin', coordinates: { lat: 53.3498, lng: -6.2603 } },
    { city: 'Luxembourg', country: 'Luxembourg', flag: '🇱🇺', timezone: 'Europe/Luxembourg', coordinates: { lat: 49.6116, lng: 6.1319 } },

    // Eastern Europe
    { city: 'Moscow', country: 'Russia', flag: '🇷🇺', timezone: 'Europe/Moscow', coordinates: { lat: 55.7558, lng: 37.6176 } },
    { city: 'St. Petersburg', country: 'Russia', flag: '🇷🇺', timezone: 'Europe/Moscow', coordinates: { lat: 59.9311, lng: 30.3609 } },
    { city: 'Warsaw', country: 'Poland', flag: '🇵🇱', timezone: 'Europe/Warsaw', coordinates: { lat: 52.2297, lng: 21.0122 } },
    { city: 'Krakow', country: 'Poland', flag: '🇵🇱', timezone: 'Europe/Warsaw', coordinates: { lat: 50.0647, lng: 19.9450 } },
    { city: 'Prague', country: 'Czech Republic', flag: '🇨🇿', timezone: 'Europe/Prague', coordinates: { lat: 50.0755, lng: 14.4378 } },
    { city: 'Budapest', country: 'Hungary', flag: '🇭🇺', timezone: 'Europe/Budapest', coordinates: { lat: 47.4979, lng: 19.0402 } },
    { city: 'Bucharest', country: 'Romania', flag: '🇷🇴', timezone: 'Europe/Bucharest', coordinates: { lat: 44.4268, lng: 26.1025 } },
    { city: 'Sofia', country: 'Bulgaria', flag: '🇧🇬', timezone: 'Europe/Sofia', coordinates: { lat: 42.6977, lng: 23.3219 } },
    { city: 'Kiev', country: 'Ukraine', flag: '🇺🇦', timezone: 'Europe/Kiev', coordinates: { lat: 50.4501, lng: 30.5234 } },

    // Southern Europe
    { city: 'Athens', country: 'Greece', flag: '🇬🇷', timezone: 'Europe/Athens', coordinates: { lat: 37.9838, lng: 23.7275 } },
    { city: 'Lisbon', country: 'Portugal', flag: '🇵🇹', timezone: 'Europe/Lisbon', coordinates: { lat: 38.7223, lng: -9.1393 } },
    { city: 'Porto', country: 'Portugal', flag: '🇵🇹', timezone: 'Europe/Lisbon', coordinates: { lat: 41.1579, lng: -8.6291 } },
    { city: 'Istanbul', country: 'Turkey', flag: '🇹🇷', timezone: 'Europe/Istanbul', coordinates: { lat: 41.0082, lng: 28.9784 } },
    { city: 'Ankara', country: 'Turkey', flag: '🇹🇷', timezone: 'Europe/Istanbul', coordinates: { lat: 39.9334, lng: 32.8597 } },

    // Asia - East Asia
    { city: 'Tokyo', country: 'Japan', flag: '🇯🇵', timezone: 'Asia/Tokyo', coordinates: { lat: 35.6762, lng: 139.6503 } },
    { city: 'Osaka', country: 'Japan', flag: '🇯🇵', timezone: 'Asia/Tokyo', coordinates: { lat: 34.6937, lng: 135.5023 } },
    { city: 'Kyoto', country: 'Japan', flag: '🇯🇵', timezone: 'Asia/Tokyo', coordinates: { lat: 35.0116, lng: 135.7681 } },
    { city: 'Yokohama', country: 'Japan', flag: '🇯🇵', timezone: 'Asia/Tokyo', coordinates: { lat: 35.4437, lng: 139.6380 } },
    { city: 'Nagoya', country: 'Japan', flag: '🇯🇵', timezone: 'Asia/Tokyo', coordinates: { lat: 35.1815, lng: 136.9066 } },

    // China
    { city: 'Shanghai', country: 'China', flag: '🇨🇳', timezone: 'Asia/Shanghai', coordinates: { lat: 31.2304, lng: 121.4737 } },
    { city: 'Beijing', country: 'China', flag: '🇨🇳', timezone: 'Asia/Shanghai', coordinates: { lat: 39.9042, lng: 116.4074 } },
    { city: 'Guangzhou', country: 'China', flag: '🇨🇳', timezone: 'Asia/Shanghai', coordinates: { lat: 23.1291, lng: 113.2644 } },
    { city: 'Shenzhen', country: 'China', flag: '🇨🇳', timezone: 'Asia/Shanghai', coordinates: { lat: 22.5431, lng: 114.0579 } },
    { city: 'Chengdu', country: 'China', flag: '🇨🇳', timezone: 'Asia/Shanghai', coordinates: { lat: 30.5728, lng: 104.0668 } },
    { city: 'Hangzhou', country: 'China', flag: '🇨🇳', timezone: 'Asia/Shanghai', coordinates: { lat: 30.2741, lng: 120.1551 } },
    { city: 'Nanjing', country: 'China', flag: '🇨🇳', timezone: 'Asia/Shanghai', coordinates: { lat: 32.0603, lng: 118.7969 } },

    // Hong Kong & Taiwan
    { city: 'Hong Kong', country: 'Hong Kong', flag: '🇭🇰', timezone: 'Asia/Hong_Kong', coordinates: { lat: 22.3193, lng: 114.1694 } },
    { city: 'Taipei', country: 'Taiwan', flag: '🇹🇼', timezone: 'Asia/Taipei', coordinates: { lat: 25.0330, lng: 121.5654 } },

    // South Korea
    { city: 'Seoul', country: 'South Korea', flag: '🇰🇷', timezone: 'Asia/Seoul', coordinates: { lat: 37.5665, lng: 126.9780 } },
    { city: 'Busan', country: 'South Korea', flag: '🇰🇷', timezone: 'Asia/Seoul', coordinates: { lat: 35.1796, lng: 129.0756 } },
    { city: 'Incheon', country: 'South Korea', flag: '🇰🇷', timezone: 'Asia/Seoul', coordinates: { lat: 37.4563, lng: 126.7052 } },

    // Southeast Asia
    { city: 'Singapore', country: 'Singapore', flag: '🇸🇬', timezone: 'Asia/Singapore', coordinates: { lat: 1.3521, lng: 103.8198 } },
    { city: 'Bangkok', country: 'Thailand', flag: '🇹🇭', timezone: 'Asia/Bangkok', coordinates: { lat: 13.7563, lng: 100.5018 } },
    { city: 'Phuket', country: 'Thailand', flag: '🇹🇭', timezone: 'Asia/Bangkok', coordinates: { lat: 7.8804, lng: 98.3923 } },
    { city: 'Chiang Mai', country: 'Thailand', flag: '🇹🇭', timezone: 'Asia/Bangkok', coordinates: { lat: 18.7883, lng: 98.9853 } },
    { city: 'Jakarta', country: 'Indonesia', flag: '🇮🇩', timezone: 'Asia/Jakarta', coordinates: { lat: -6.2088, lng: 106.8456 } },
    { city: 'Bali', country: 'Indonesia', flag: '🇮🇩', timezone: 'Asia/Makassar', coordinates: { lat: -8.3405, lng: 115.0920 } },
    { city: 'Surabaya', country: 'Indonesia', flag: '🇮🇩', timezone: 'Asia/Jakarta', coordinates: { lat: -7.2575, lng: 112.7521 } },
    { city: 'Manila', country: 'Philippines', flag: '🇵🇭', timezone: 'Asia/Manila', coordinates: { lat: 14.5995, lng: 120.9842 } },
    { city: 'Cebu', country: 'Philippines', flag: '🇵🇭', timezone: 'Asia/Manila', coordinates: { lat: 10.3157, lng: 123.8854 } },
    { city: 'Kuala Lumpur', country: 'Malaysia', flag: '🇲🇾', timezone: 'Asia/Kuala_Lumpur', coordinates: { lat: 3.1390, lng: 101.6869 } },
    { city: 'George Town', country: 'Malaysia', flag: '🇲🇾', timezone: 'Asia/Kuala_Lumpur', coordinates: { lat: 5.4164, lng: 100.3327 } },
    { city: 'Ho Chi Minh City', country: 'Vietnam', flag: '🇻🇳', timezone: 'Asia/Ho_Chi_Minh', coordinates: { lat: 10.8231, lng: 106.6297 } },
    { city: 'Hanoi', country: 'Vietnam', flag: '🇻🇳', timezone: 'Asia/Ho_Chi_Minh', coordinates: { lat: 21.0285, lng: 105.8542 } },

    // South Asia - India
    { city: 'Mumbai', country: 'India', flag: '🇮🇳', timezone: 'Asia/Kolkata', coordinates: { lat: 19.0760, lng: 72.8777 } },
    { city: 'Delhi', country: 'India', flag: '🇮🇳', timezone: 'Asia/Kolkata', coordinates: { lat: 28.7041, lng: 77.1025 } },
    { city: 'Bangalore', country: 'India', flag: '🇮🇳', timezone: 'Asia/Kolkata', coordinates: { lat: 12.9716, lng: 77.5946 } },
    { city: 'Chennai', country: 'India', flag: '🇮🇳', timezone: 'Asia/Kolkata', coordinates: { lat: 13.0827, lng: 80.2707 } },
    { city: 'Kolkata', country: 'India', flag: '🇮🇳', timezone: 'Asia/Kolkata', coordinates: { lat: 22.5726, lng: 88.3639 } },
    { city: 'Hyderabad', country: 'India', flag: '🇮🇳', timezone: 'Asia/Kolkata', coordinates: { lat: 17.3850, lng: 78.4867 } },
    { city: 'Pune', country: 'India', flag: '🇮🇳', timezone: 'Asia/Kolkata', coordinates: { lat: 18.5204, lng: 73.8567 } },
    { city: 'Ahmedabad', country: 'India', flag: '🇮🇳', timezone: 'Asia/Kolkata', coordinates: { lat: 23.0225, lng: 72.5714 } },
    { city: 'Jaipur', country: 'India', flag: '🇮🇳', timezone: 'Asia/Kolkata', coordinates: { lat: 26.9124, lng: 75.7873 } },
    { city: 'Goa', country: 'India', flag: '🇮🇳', timezone: 'Asia/Kolkata', coordinates: { lat: 15.2993, lng: 74.1240 } },

    // Other South Asian Countries
    { city: 'Colombo', country: 'Sri Lanka', flag: '🇱🇰', timezone: 'Asia/Colombo', coordinates: { lat: 6.9271, lng: 79.8612 } },
    { city: 'Kandy', country: 'Sri Lanka', flag: '🇱🇰', timezone: 'Asia/Colombo', coordinates: { lat: 7.2906, lng: 80.6337 } },
    { city: 'Kathmandu', country: 'Nepal', flag: '🇳🇵', timezone: 'Asia/Kathmandu', coordinates: { lat: 27.7172, lng: 85.3240 } },
    { city: 'Dhaka', country: 'Bangladesh', flag: '🇧🇩', timezone: 'Asia/Dhaka', coordinates: { lat: 23.8103, lng: 90.4125 } },
    { city: 'Karachi', country: 'Pakistan', flag: '🇵🇰', timezone: 'Asia/Karachi', coordinates: { lat: 24.8607, lng: 67.0011 } },
    { city: 'Lahore', country: 'Pakistan', flag: '🇵🇰', timezone: 'Asia/Karachi', coordinates: { lat: 31.5204, lng: 74.3587 } },
    { city: 'Islamabad', country: 'Pakistan', flag: '🇵🇰', timezone: 'Asia/Karachi', coordinates: { lat: 33.7294, lng: 73.0931 } },

    // Middle East
    { city: 'Dubai', country: 'United Arab Emirates', flag: '🇦🇪', timezone: 'Asia/Dubai', coordinates: { lat: 25.2048, lng: 55.2708 } },
    { city: 'Abu Dhabi', country: 'United Arab Emirates', flag: '🇦🇪', timezone: 'Asia/Dubai', coordinates: { lat: 24.2539, lng: 54.3773 } },
    { city: 'Doha', country: 'Qatar', flag: '🇶🇦', timezone: 'Asia/Qatar', coordinates: { lat: 25.2854, lng: 51.5310 } },
    { city: 'Kuwait City', country: 'Kuwait', flag: '🇰🇼', timezone: 'Asia/Kuwait', coordinates: { lat: 29.3759, lng: 47.9774 } },
    { city: 'Riyadh', country: 'Saudi Arabia', flag: '🇸🇦', timezone: 'Asia/Riyadh', coordinates: { lat: 24.7136, lng: 46.6753 } },
    { city: 'Jeddah', country: 'Saudi Arabia', flag: '🇸🇦', timezone: 'Asia/Riyadh', coordinates: { lat: 21.4858, lng: 39.1925 } },
    { city: 'Tel Aviv', country: 'Israel', flag: '🇮🇱', timezone: 'Asia/Jerusalem', coordinates: { lat: 32.0853, lng: 34.7818 } },
    { city: 'Jerusalem', country: 'Israel', flag: '🇮🇱', timezone: 'Asia/Jerusalem', coordinates: { lat: 31.7683, lng: 35.2137 } },
    { city: 'Beirut', country: 'Lebanon', flag: '🇱🇧', timezone: 'Asia/Beirut', coordinates: { lat: 33.8938, lng: 35.5018 } },
    { city: 'Amman', country: 'Jordan', flag: '🇯🇴', timezone: 'Asia/Amman', coordinates: { lat: 31.9454, lng: 35.9284 } },

    // Oceania - Australia
    { city: 'Sydney', country: 'Australia', flag: '🇦🇺', timezone: 'Australia/Sydney', coordinates: { lat: -33.8688, lng: 151.2093 } },
    { city: 'Melbourne', country: 'Australia', flag: '🇦🇺', timezone: 'Australia/Melbourne', coordinates: { lat: -37.8136, lng: 144.9631 } },
    { city: 'Brisbane', country: 'Australia', flag: '🇦🇺', timezone: 'Australia/Brisbane', coordinates: { lat: -27.4698, lng: 153.0251 } },
    { city: 'Perth', country: 'Australia', flag: '🇦🇺', timezone: 'Australia/Perth', coordinates: { lat: -31.9505, lng: 115.8605 } },
    { city: 'Adelaide', country: 'Australia', flag: '🇦🇺', timezone: 'Australia/Adelaide', coordinates: { lat: -34.9285, lng: 138.6007 } },
    { city: 'Gold Coast', country: 'Australia', flag: '🇦🇺', timezone: 'Australia/Brisbane', coordinates: { lat: -28.0167, lng: 153.4000 } },
    { city: 'Canberra', country: 'Australia', flag: '🇦🇺', timezone: 'Australia/Sydney', coordinates: { lat: -35.2809, lng: 149.1300 } },
    { city: 'Darwin', country: 'Australia', flag: '🇦🇺', timezone: 'Australia/Darwin', coordinates: { lat: -12.4634, lng: 130.8456 } },

    // New Zealand
    { city: 'Auckland', country: 'New Zealand', flag: '🇳🇿', timezone: 'Pacific/Auckland', coordinates: { lat: -36.8485, lng: 174.7633 } },
    { city: 'Wellington', country: 'New Zealand', flag: '🇳🇿', timezone: 'Pacific/Auckland', coordinates: { lat: -41.2865, lng: 174.7762 } },
    { city: 'Christchurch', country: 'New Zealand', flag: '🇳🇿', timezone: 'Pacific/Auckland', coordinates: { lat: -43.5321, lng: 172.6362 } },
    { city: 'Hamilton', country: 'New Zealand', flag: '🇳🇿', timezone: 'Pacific/Auckland', coordinates: { lat: -37.7870, lng: 175.2793 } },

    // South America - Brazil
    { city: 'São Paulo', country: 'Brazil', flag: '🇧🇷', timezone: 'America/Sao_Paulo', coordinates: { lat: -23.5558, lng: -46.6396 } },
    { city: 'Rio de Janeiro', country: 'Brazil', flag: '🇧🇷', timezone: 'America/Sao_Paulo', coordinates: { lat: -22.9068, lng: -43.1729 } },
    { city: 'Brasília', country: 'Brazil', flag: '🇧🇷', timezone: 'America/Sao_Paulo', coordinates: { lat: -15.8267, lng: -47.9218 } },
    { city: 'Salvador', country: 'Brazil', flag: '🇧🇷', timezone: 'America/Bahia', coordinates: { lat: -12.9714, lng: -38.5014 } },
    { city: 'Fortaleza', country: 'Brazil', flag: '🇧🇷', timezone: 'America/Fortaleza', coordinates: { lat: -3.7319, lng: -38.5267 } },
    { city: 'Belo Horizonte', country: 'Brazil', flag: '🇧🇷', timezone: 'America/Sao_Paulo', coordinates: { lat: -19.9191, lng: -43.9386 } },
    { city: 'Manaus', country: 'Brazil', flag: '🇧🇷', timezone: 'America/Manaus', coordinates: { lat: -3.1190, lng: -60.0217 } },

    // Argentina
    { city: 'Buenos Aires', country: 'Argentina', flag: '🇦🇷', timezone: 'America/Argentina/Buenos_Aires', coordinates: { lat: -34.6118, lng: -58.3960 } },
    { city: 'Córdoba', country: 'Argentina', flag: '🇦🇷', timezone: 'America/Argentina/Cordoba', coordinates: { lat: -31.4201, lng: -64.1888 } },
    { city: 'Rosario', country: 'Argentina', flag: '🇦🇷', timezone: 'America/Argentina/Buenos_Aires', coordinates: { lat: -32.9442, lng: -60.6505 } },
    { city: 'Mendoza', country: 'Argentina', flag: '🇦🇷', timezone: 'America/Argentina/Mendoza', coordinates: { lat: -32.8895, lng: -68.8458 } },

    // Other South American Countries
    { city: 'Lima', country: 'Peru', flag: '🇵🇪', timezone: 'America/Lima', coordinates: { lat: -12.0464, lng: -77.0428 } },
    { city: 'Cusco', country: 'Peru', flag: '🇵🇪', timezone: 'America/Lima', coordinates: { lat: -13.5319, lng: -71.9675 } },
    { city: 'Bogotá', country: 'Colombia', flag: '🇨🇴', timezone: 'America/Bogota', coordinates: { lat: 4.7110, lng: -74.0721 } },
    { city: 'Medellín', country: 'Colombia', flag: '🇨🇴', timezone: 'America/Bogota', coordinates: { lat: 6.2442, lng: -75.5812 } },
    { city: 'Cartagena', country: 'Colombia', flag: '🇨🇴', timezone: 'America/Bogota', coordinates: { lat: 10.3910, lng: -75.4794 } },
    { city: 'Santiago', country: 'Chile', flag: '🇨🇱', timezone: 'America/Santiago', coordinates: { lat: -33.4489, lng: -70.6693 } },
    { city: 'Valparaíso', country: 'Chile', flag: '🇨🇱', timezone: 'America/Santiago', coordinates: { lat: -33.0472, lng: -71.6127 } },
    { city: 'Caracas', country: 'Venezuela', flag: '🇻🇪', timezone: 'America/Caracas', coordinates: { lat: 10.4806, lng: -66.9036 } },
    { city: 'Quito', country: 'Ecuador', flag: '🇪🇨', timezone: 'America/Guayaquil', coordinates: { lat: -0.1807, lng: -78.4678 } },
    { city: 'Guayaquil', country: 'Ecuador', flag: '🇪🇨', timezone: 'America/Guayaquil', coordinates: { lat: -2.1709, lng: -79.9224 } },
    { city: 'La Paz', country: 'Bolivia', flag: '🇧🇴', timezone: 'America/La_Paz', coordinates: { lat: -16.5000, lng: -68.1193 } },
    { city: 'Santa Cruz', country: 'Bolivia', flag: '🇧🇴', timezone: 'America/La_Paz', coordinates: { lat: -17.8146, lng: -63.1561 } },
    { city: 'Montevideo', country: 'Uruguay', flag: '🇺🇾', timezone: 'America/Montevideo', coordinates: { lat: -34.9011, lng: -56.1645 } },
    { city: 'Asunción', country: 'Paraguay', flag: '🇵🇾', timezone: 'America/Asuncion', coordinates: { lat: -25.2637, lng: -57.5759 } },

    // Africa - North Africa
    { city: 'Cairo', country: 'Egypt', flag: '🇪🇬', timezone: 'Africa/Cairo', coordinates: { lat: 30.0444, lng: 31.2357 } },
    { city: 'Alexandria', country: 'Egypt', flag: '🇪🇬', timezone: 'Africa/Cairo', coordinates: { lat: 31.2001, lng: 29.9187 } },
    { city: 'Casablanca', country: 'Morocco', flag: '🇲🇦', timezone: 'Africa/Casablanca', coordinates: { lat: 33.5731, lng: -7.5898 } },
    { city: 'Marrakech', country: 'Morocco', flag: '🇲🇦', timezone: 'Africa/Casablanca', coordinates: { lat: 31.6295, lng: -7.9811 } },
    { city: 'Rabat', country: 'Morocco', flag: '🇲🇦', timezone: 'Africa/Casablanca', coordinates: { lat: 34.0209, lng: -6.8416 } },
    { city: 'Algiers', country: 'Algeria', flag: '🇩🇿', timezone: 'Africa/Algiers', coordinates: { lat: 36.7538, lng: 3.0588 } },
    { city: 'Tunis', country: 'Tunisia', flag: '🇹🇳', timezone: 'Africa/Tunis', coordinates: { lat: 36.8065, lng: 10.1815 } },
    { city: 'Tripoli', country: 'Libya', flag: '🇱🇾', timezone: 'Africa/Tripoli', coordinates: { lat: 32.8872, lng: 13.1913 } },

    // Sub-Saharan Africa
    { city: 'Cape Town', country: 'South Africa', flag: '🇿🇦', timezone: 'Africa/Johannesburg', coordinates: { lat: -33.9249, lng: 18.4241 } },
    { city: 'Johannesburg', country: 'South Africa', flag: '🇿🇦', timezone: 'Africa/Johannesburg', coordinates: { lat: -26.2041, lng: 28.0473 } },
    { city: 'Durban', country: 'South Africa', flag: '🇿🇦', timezone: 'Africa/Johannesburg', coordinates: { lat: -29.8587, lng: 31.0218 } },
    { city: 'Pretoria', country: 'South Africa', flag: '🇿🇦', timezone: 'Africa/Johannesburg', coordinates: { lat: -25.7479, lng: 28.2293 } },
    { city: 'Lagos', country: 'Nigeria', flag: '🇳🇬', timezone: 'Africa/Lagos', coordinates: { lat: 6.5244, lng: 3.3792 } },
    { city: 'Abuja', country: 'Nigeria', flag: '🇳🇬', timezone: 'Africa/Lagos', coordinates: { lat: 9.0765, lng: 7.3986 } },
    { city: 'Kano', country: 'Nigeria', flag: '🇳🇬', timezone: 'Africa/Lagos', coordinates: { lat: 12.0022, lng: 8.5920 } },
    { city: 'Nairobi', country: 'Kenya', flag: '🇰🇪', timezone: 'Africa/Nairobi', coordinates: { lat: -1.2921, lng: 36.8219 } },
    { city: 'Mombasa', country: 'Kenya', flag: '🇰🇪', timezone: 'Africa/Nairobi', coordinates: { lat: -4.0435, lng: 39.6682 } },
    { city: 'Accra', country: 'Ghana', flag: '🇬🇭', timezone: 'Africa/Accra', coordinates: { lat: 5.6037, lng: -0.1870 } },
    { city: 'Kumasi', country: 'Ghana', flag: '🇬🇭', timezone: 'Africa/Accra', coordinates: { lat: 6.6885, lng: -1.6244 } },
    { city: 'Addis Ababa', country: 'Ethiopia', flag: '🇪🇹', timezone: 'Africa/Addis_Ababa', coordinates: { lat: 9.1450, lng: 40.4897 } },
    { city: 'Dar es Salaam', country: 'Tanzania', flag: '🇹🇿', timezone: 'Africa/Dar_es_Salaam', coordinates: { lat: -6.7924, lng: 39.2083 } },
    { city: 'Dodoma', country: 'Tanzania', flag: '🇹🇿', timezone: 'Africa/Dar_es_Salaam', coordinates: { lat: -6.1630, lng: 35.7516 } },
    { city: 'Kampala', country: 'Uganda', flag: '🇺🇬', timezone: 'Africa/Kampala', coordinates: { lat: 0.3476, lng: 32.5825 } },
    { city: 'Kigali', country: 'Rwanda', flag: '🇷🇼', timezone: 'Africa/Kigali', coordinates: { lat: -1.9441, lng: 30.0619 } },
    { city: 'Lusaka', country: 'Zambia', flag: '🇿🇲', timezone: 'Africa/Lusaka', coordinates: { lat: -15.3875, lng: 28.3228 } },
    { city: 'Harare', country: 'Zimbabwe', flag: '🇿🇼', timezone: 'Africa/Harare', coordinates: { lat: -17.8252, lng: 31.0335 } },
    { city: 'Maputo', country: 'Mozambique', flag: '🇲🇿', timezone: 'Africa/Maputo', coordinates: { lat: -25.9692, lng: 32.5732 } },
    { city: 'Luanda', country: 'Angola', flag: '🇦🇴', timezone: 'Africa/Luanda', coordinates: { lat: -8.8390, lng: 13.2894 } },
    { city: 'Kinshasa', country: 'Democratic Republic of Congo', flag: '🇨🇩', timezone: 'Africa/Kinshasa', coordinates: { lat: -4.4419, lng: 15.2663 } },
    { city: 'Dakar', country: 'Senegal', flag: '🇸🇳', timezone: 'Africa/Dakar', coordinates: { lat: 14.7167, lng: -17.4677 } },
    { city: 'Abidjan', country: 'Ivory Coast', flag: '🇨🇮', timezone: 'Africa/Abidjan', coordinates: { lat: 5.3600, lng: -4.0083 } },
    { city: 'Bamako', country: 'Mali', flag: '🇲🇱', timezone: 'Africa/Bamako', coordinates: { lat: 12.6392, lng: -8.0029 } }
  ];

  const [filteredCities, setFilteredCities] = useState(cityDatabase);
  const [citySearch, setCitySearch] = useState('');

  /*** AUTO-LOCATION DETECTION ***/
  useEffect(() => {
    // Auto-detect location based on personal info birth place
    if (personalInfo.birthPlace && !isLocationDetected) {
      const birthPlaceParts = personalInfo.birthPlace.split(',').map(part => part.trim());
      if (birthPlaceParts.length >= 2) {
        const cityName = birthPlaceParts[0];
        const countryName = birthPlaceParts[birthPlaceParts.length - 1];
        
        // Find matching location in database
        const matchedLocation = cityDatabase.find(loc => 
          loc.city.toLowerCase().includes(cityName.toLowerCase()) ||
          loc.country.toLowerCase().includes(countryName.toLowerCase())
        );
        
        if (matchedLocation) {
          setLocation(matchedLocation);
          setIsLocationDetected(true);
        }
      }
    }
    
    // Fallback: Try browser geolocation API
    if (!isLocationDetected && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          
          // Find closest city based on coordinates
          let closestCity = cityDatabase[0];
          let minDistance = Number.MAX_VALUE;
          
          cityDatabase.forEach(city => {
            if (city.coordinates) {
              const distance = Math.sqrt(
                Math.pow(city.coordinates.lat - latitude, 2) + 
                Math.pow(city.coordinates.lng - longitude, 2)
              );
              if (distance < minDistance) {
                minDistance = distance;
                closestCity = city;
              }
            }
          });
          
          if (minDistance < 5) { // Within ~5 degrees
            setLocation(closestCity);
            setIsLocationDetected(true);
          }
        },
        (error) => {
          console.log('Geolocation error:', error);
          // Keep default location
        },
        { timeout: 5000, enableHighAccuracy: false }
      );
    }
  }, [personalInfo.birthPlace, isLocationDetected]);

  /*** TIME & QUOTE INTERVALS ***/
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const quoteTimer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % astrologyQuotes.length);
    }, 5000);

    return () => {
      clearInterval(timer);
      clearInterval(quoteTimer);
    };
  }, []);

  // Filter cities based on search
  useEffect(() => {
    if (citySearch.trim() === '') {
      setFilteredCities(cityDatabase);
    } else {
      const filtered = cityDatabase.filter(item =>
        item.city.toLowerCase().includes(citySearch.toLowerCase()) ||
        item.country.toLowerCase().includes(citySearch.toLowerCase())
      );
      setFilteredCities(filtered);
    }
  }, [citySearch]);

  // Calculate derived values from personal info
  useEffect(() => {
    const lifePathNumber = calculateLifePath(personalInfo.birthday);
    const personalYear = calculatePersonalYear(personalInfo.birthday.replace(/-/g, '/'), new Date().getFullYear());
    const zodiacSign = calculateZodiacSign(personalInfo.birthday);
    
    setPersonalInfo(prev => ({
      ...prev,
      lifePathNumber,
      personalYear,
      zodiacSign: zodiacSign || prev.zodiacSign
    }));
  }, [personalInfo.birthday]);

  const handleFavoriteToggle = (signName: string) => {
    setFavorites(prev => 
      prev.includes(signName) 
        ? prev.filter(f => f !== signName)
        : [...prev, signName]
    );
  };

  const handleFavoritesClick = () => {
    setShowFavoritesModal(true);
  };

  const handleLocationClick = () => {
    setShowLocationModal(true);
    setCitySearch('');
    setFilteredCities(cityDatabase);
  };

  const handleCitySelect = (selectedLocation: LocationInfo) => {
    setLocation(selectedLocation);
    setShowLocationModal(false);
    setCitySearch('');
    setIsLocationDetected(true);
  };

  const handlePersonalInfoClick = () => {
    setShowPersonalInfoModal(true);
  };

  const handleNewsletterClick = () => {
    setShowNewsletterModal(true);
  };

  /*** Get current zodiac sign based on personal info ***/
  const todaySign =
    zodiacSigns.find((sign) => sign.sign === personalInfo.zodiacSign) || zodiacSigns[0];

  const astrologySystemOptions = [
    { id: 'western', name: 'Western' },
    { id: 'vedic', name: 'Vedic' },
    { id: 'chinese', name: 'Chinese' },
    { id: 'sri-lankan', name: 'Sri Lankan' },
    { id: 'hybrid', name: 'Hybrid AI' },
  ];

  // Calculate zodiac sign based on birthday
  const calculateZodiacSign = (birthday: string): string => {
    try {
      const date = new Date(birthday);
      if (isNaN(date.getTime())) return '';

      const month = date.getMonth() + 1;
      const day = date.getDate();

      if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
      if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
      if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
      if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
      if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
      if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
      if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
      if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
      if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
      if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';
      if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
      if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return 'Pisces';

      return '';
    } catch {
      return '';
    }
  };

  /*** Daily secret generator ***/
  const generateDailySecret = () => {
    const secrets = [
      {
        title: 'Cosmic Alignment',
        message: `${personalInfo.fullName}, the planets align to bring unexpected opportunities your way today. Your ${personalInfo.zodiacSign} energy is particularly strong, creating perfect conditions for manifestation after 3 PM.`,
        icon: 'ri-planet-line',
        color: 'from-purple-500 to-pink-500',
      },
      {
        title: 'Intuitive Insight',
        message: `Your Life Path ${personalInfo.lifePathNumber} intuition is heightened today, ${personalInfo.fullName}. Trust that first instinct when making important decisions – your ${personalInfo.zodiacSign} wisdom is guided by cosmic forces.`,
        icon: 'ri-eye-line',
        color: 'from-blue-500 to-cyan-500',
      },
      {
        title: 'Energy Shift',
        message: `A powerful energy shift occurs around sunset in ${location.city}. As a ${personalInfo.zodiacSign}, use this Personal Year ${personalInfo.personalYear} energy for meditation and setting new intentions.`,
        icon: 'ri-flashlight-line',
        color: 'from-orange-500 to-red-500',
      },
      {
        title: 'Connection Portal',
        message: `Someone from your past may reach out today, ${personalInfo.fullName}. Your ${personalInfo.zodiacSign} charm combined with Life Path ${personalInfo.lifePathNumber} wisdom creates perfect conditions for meaningful conversations.`,
        icon: 'ri-links-line',
        color: 'from-green-500 to-emerald-5 0',
      },
    ];

    return secrets[Math.floor(Math.random() * secrets.length)];
  };

  const dailySecret = generateDailySecret();

  const handleUnlockReading = () => {
    setShowUpgradeModal(true);
  };

  const handleExploreZodiac = () => {
    navigate('/zodiac');
  };

  const handleExploreSystems = () => {
    navigate('/zodiac');
  };

  const handleMagicClick = () => {
    setShowMagicModal(true);
  };

  const generateMagicInsight = () => {
    // Ensure we have valid numerology data with fallback
    const currentNumerology = numerologyMeanings[personalInfo.lifePathNumber as keyof typeof numerologyMeanings] || numerologyMeanings[1];
    
    const insights = [
      {
        title: 'Cosmic Synchronicity',
        message: `${personalInfo.fullName}, your ${personalInfo.zodiacSign} energy and Life Path ${personalInfo.lifePathNumber} are creating perfect synchronicity. The universe is aligning to bring you meaningful encounters within 24 hours.`,
        icon: 'ri-magic-line',
        color: 'from-purple-500 via-pink-500 to-orange-400',
        action: 'Trust the cosmic signs',
      },
      {
        title: 'Numerological Power',
        message: `Your Life Path ${personalInfo.lifePathNumber} (${currentNumerology.title}) energy is amplified today. This Personal Year ${personalInfo.personalYear} brings perfect timing for manifesting your deepest desires.`,
        icon: 'ri-flashlight-line',
        color: 'from-yellow-400 via-orange-500 to-red-500',
        action: `Focus your ${currentNumerology.traits[0].toLowerCase()} intentions`,
      },
      {
        title: 'Astrological Awakening',
        message: `${personalInfo.fullName}, your ${personalInfo.zodiacSign} third eye is opening to new possibilities. Dreams and meditation will reveal important guidance for your spiritual journey from ${location.city}.`,
        icon: 'ri-eye-line',
        color: 'from-indigo-500 via-purple-500 to-pink-500',
        action: `Listen to your ${personalInfo.zodiacSign} inner voice`,
      },
      {
        title: 'Personal Transformation',
        message: `This Personal Year ${personalInfo.personalYear} is dissolving old patterns from your Life Path ${personalInfo.lifePathNumber} journey. Embrace the ${personalInfo.zodiacSign} transformation ahead, ${personalInfo.fullName}.`,
        icon: 'ri-refresh-line',
        color: 'from-green-400 via-blue-500 to-purple-500',
        action: 'Let go and flow with cosmic energy',
      },
    ];

    return insights[Math.floor(Math.random() * insights.length)];
  };

  const magicInsight = generateMagicInsight();

  // Journal functions
  const handleSaveToJournal = (entry: any) => {
    const journalEntry = {
      id: Date.now(),
      date: new Date().toISOString(),
      type: entry.type || 'reading',
      title: entry.title,
      content: entry.content,
      icon: entry.icon,
      color: entry.color,
      metadata: { ...entry.metadata, personalInfo: { ...personalInfo }, location: { ...location } }
    };
    
    setCurrentJournalEntry(journalEntry);
    setShowJournalModal(true);
  };

  const handleConfirmSaveToJournal = () => {
    if (currentJournalEntry) {
      setJournalEntries(prev => [currentJournalEntry, ...prev]);
      setShowJournalModal(false);
      setCurrentJournalEntry(null);
      
      const successToast = document.createElement('div');
      successToast.className = 'fixed top-24 right-6 z-50 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg shadow-2xl flex items-center space-x-2 animate-pulse';
      successToast.innerHTML = '<i className="ri-check-line"></i><span>Saved to Journal!</span>';
      document.body.appendChild(successToast);
      setTimeout(() => document.body.removeChild(successToast), 3000);
    }
  };

  const handleViewJournal = () => {
    navigate('/profile/documents');
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    try {
      const response = await fetch('https://readdy.ai/api/form/d3hmtplsoafcrsrcpt8g', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData as any).toString()
      });
      
      if (response.ok) {
        setShowNewsletterModal(false);
        form.reset();
        
        const successToast = document.createElement('div');
        successToast.className = 'fixed top-24 right-6 z-50 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg shadow-2xl flex items-center space-x-2 animate-pulse';
        successToast.innerHTML = '<i className="ri-check-line"></i><span>Successfully subscribed to cosmic insights!</span>';
        document.body.appendChild(successToast);
        setTimeout(() => document.body.removeChild(successToast), 3000);
      } else {
        alert('Failed to subscribe. Please try again.');
      }
    } catch {
      alert('Error subscribing. Please try again.');
    }
  };

  // Get current numerology data with proper fallback
  const currentNumerology = numerologyMeanings[personalInfo.lifePathNumber as keyof typeof numerologyMeanings] || numerologyMeanings[1];

  return (
    <div className="min-h-screen relative">
      <StarfieldBackground />
      <Navigation userRole={userRole} onMagicClick={handleMagicClick} />

      <div className="relative z-10 pt-20 pb-12">
        {/* Newsletter Modal */}
        {showNewsletterModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowNewsletterModal(false)}></div>
            <div className="relative bg-gradient-to-br from-purple-900/95 to-indigo-900/95 backdrop-blur-lg rounded-2xl border border-white/20 p-8 max-w-md w-full mx-4 shadow-2xl">
              <button
                onClick={() => setShowNewsletterModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <i className="ri-close-line text-xl"></i>
              </button>

              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-mail-line text-2xl text-white"></i>
                </div>
                <h3 className="text-2xl font-bold text-white">Daily Cosmic Insights</h3>
                <p className="text-gray-300">Get personalized daily horoscopes and cosmic guidance</p>
              </div>

              <form id="newsletter-form" data-readdy-form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="subscriber_name"
                    required
                    defaultValue={personalInfo.fullName}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="subscriber_email"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Zodiac Sign</label>
                  <input
                    type="text"
                    name="zodiac_sign"
                    defaultValue={personalInfo.zodiacSign}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-5 text-sm"
                    placeholder="Your zodiac sign"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Content</label>
                  <select
                    name="content_preference"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm pr-8"
                  >
                    <option value="all" className="bg-gray-800">All cosmic content</option>
                    <option value="astrology" className="bg-gray-800">Astrology only</option>
                    <option value="numerology" className="bg-gray-800">Numerology only</option>
                    <option value="dreams" className="bg-gray-800">Dream analysis</option>
                  </select>
                </div>

                <div className="flex space-x-3 mt-6">
                  <Button variant="ghost" className="flex-1" onClick={() => setShowNewsletterModal(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="cosmic" className="flex-1">
                    <i className="ri-mail-send-line mr-2"></i>
                    Subscribe
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Personal Info Modal */}
        {showPersonalInfoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowPersonalInfoModal(false)}></div>
            <div className="relative bg-gradient-to-br from-purple-900/95 to-indigo-900/95 backdrop-blur-lg rounded-2xl border border-white/20 p-8 max-w-2xl w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setShowPersonalInfoModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <i className="ri-close-line text-xl"></i>
              </button>

              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-user-settings-line text-2xl text-white"></i>
                </div>
                <h3 className="text-2xl font-bold text-white">Personal Information</h3>
                <p className="text-gray-300">Update your cosmic profile for personalized insights</p>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={personalInfo.fullName}
                      onChange={(e) => setPersonalInfo({...personalInfo, fullName: e.target.value})}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Birthday</label>
                    <input
                      type="date"
                      value={personalInfo.birthday}
                      onChange={(e) => setPersonalInfo({...personalInfo, birthday: e.target.value})}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Birth Time</label>
                    <input
                      type="time"
                      value={personalInfo.birthTime}
                      onChange={(e) => setPersonalInfo({...personalInfo, birthTime: e.target.value})}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Birth Place</label>
                    <input
                      type="text"
                      value={personalInfo.birthPlace}
                      onChange={(e) => setPersonalInfo({...personalInfo, birthPlace: e.target.value})}
                      placeholder="City, Country"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Astrology System</label>
                  <select
                    value={personalInfo.astrologySystem}
                    onChange={(e) => setPersonalInfo({...personalInfo, astrologySystem: e.target.value})}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 pr-8"
                  >
                    {astrologySystemOptions.map((option) => (
                      <option key={option.id} value={option.id} className="bg-gray-800">
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Display calculated values */}
                <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-6">
                  <h4 className="text-white font-semibold mb-4">Calculated Cosmic Profile</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-sm text-gray-400">Zodiac Sign</p>
                      <p className="text-lg font-semibold text-white">{personalInfo.zodiacSign}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Life Path Number</p>
                      <p className="text-lg font-semibold text-white">{personalInfo.lifePathNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Personal Year</p>
                      <p className="text-lg font-semibold text-white">{personalInfo.personalYear}</p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button variant="cosmic" className="flex-1" onClick={() => setShowPersonalInfoModal(false)}>
                    <i className="ri-save-line mr-2"></i>
                    Save Changes
                  </Button>
                  <Button variant="ghost" className="flex-1" onClick={() => setShowPersonalInfoModal(false)}>
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Favorites Modal */}
        {showFavoritesModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowFavoritesModal(false)}></div>
            <div className="relative bg-gradient-to-br from-purple-900/95 to-indigo-900/95 backdrop-blur-lg rounded-2xl border border-white/20 p-8 max-w-2xl w-full mx-4 shadow-2xl max-h-[80vh] overflow-y-auto">
              <button
                onClick={() => setShowFavoritesModal(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 bg-white/20 text-gray-400 hover:text-red-400 hover:bg-white/30"
              >
                <i className="ri-close-line text-xl"></i>
              </button>

              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-heart-fill text-2xl text-white"></i>
                </div>
                <h3 className="text-2xl font-bold text-white">Your Favorites</h3>
                <p className="text-gray-300">Zodiac signs you've marked as favorites</p>
              </div>

              {favorites.length === 0 ? (
                <div className="text-center py-8">
                  <i className="ri-heart-line text-4xl text-gray-400 mb-2"></i>
                  <p className="text-gray-400">No favorites yet. Click the heart icon on zodiac cards to add them!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {favorites.map((signName) => {
                    const sign = zodiacSigns.find(s => s.sign === signName);
                    if (!sign) return null;
                    return (
                      <div key={signName} className="bg-white/10 rounded-lg p-4 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                            <i className={`${sign.icon} text-lg text-white`}></i>
                          </div>
                          <div>
                            <h4 className="text-white font-medium">{sign.sign}</h4>
                            <p className="text-sm text-gray-400">{sign.dateRange}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleFavoriteToggle(sign.sign)}
                          className="text-red-500 hover:text-red-300 transition-colors"
                        >
                          <i className="ri-heart-fill text-lg"></i>
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="mt-6 text-center">
                <Button variant="ghost" onClick={() => setShowFavoritesModal(false)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Magic Insight Modal */}
        {showMagicModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowMagicModal(false)}></div>
            <div className="relative bg-gradient-to-br from-purple-900/95 to-indigo-900/95 backdrop-blur-lg rounded-2xl border border-white/20 p-8 max-w-md w-full mx-4 shadow-2xl">
              <button
                onClick={() => setShowMagicModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <i className="ri-close-line text-xl"></i>
              </button>

              <div className="text-center">
                <div className={`w-20 h-20 bg-gradient-to-r ${magicInsight.color} rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse`}>
                  <i className={`${magicInsight.icon} text-3xl text-white`}></i>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4">{magicInsight.title}</h3>
                <p className="text-gray-200 leading-relaxed mb-6">{magicInsight.message}</p>

                <div className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-xl p-4 mb-6">
                  <p className="text-sm text-purple-200 font-medium">
                    <i className="ri-lightbulb-line mr-2"></i>
                    Cosmic Action: {magicInsight.action}
                  </p>
                </div>

                <div className="flex items-center justify-center space-x-4 mb-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-400">Magic Level</p>
                    <div className="flex space-x-1 mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <i key={star} className="ri-star-fill text-yellow-400 text-sm"></i>
                      ))}
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-400">Duration</p>
                    <p className="text-lg font-semibold text-white">24h</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button variant="cosmic" className="w-full" onClick={() => setShowMagicModal(false)}>
                    <i className="ri-heart-line mr-2"></i>
                    Embrace the Magic
                  </Button>
                  <Button variant="ghost" className="w-full" onClick={() => setShowMagicModal(false)}>
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                Daily Secrets
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Welcome {personalInfo.fullName}, unlock the mysteries of the cosmos with AI‑guided astrology, numerology, and personalized insights
              </p>
              <p className="text-lg text-purple-300 mb-8">
                Your cosmic profile: {personalInfo.zodiacSign} • Life Path {personalInfo.lifePathNumber} • Personal Year {personalInfo.personalYear}
              </p>

              {/* Current Time & Location with Personal Info */}
              <div className="flex items-center justify-center space-x-6 mb-8">
                <div className="flex items-center space-x-2 text-gray-300">
                  <i className="ri-time-line text-lg"></i>
                  <span>{currentTime.toLocaleTimeString()}</span>
                </div>
                <button 
                  onClick={handleLocationClick}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  <i className="ri-map-pin-line text-lg"></i>
                  <span>{location.city}, {location.country}</span>
                  <span className="text-lg">{location.flag}</span>
                  <i className="ri-arrow-down-s-line text-sm"></i>
                </button>
                <button 
                  onClick={handlePersonalInfoClick}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  <i className="ri-user-settings-line text-lg"></i>
                  <span>Personal Info</span>
                  <i className="ri-arrow-down-s-line text-sm"></i>
                </button>
              </div>

              {/* Role Selector */}
              <div className="flex items-center justify-center space-x-4 mb-8">
                <span className="text-gray-400">Experience as:</span>
                {(['guest', 'premium', 'admin'] as const).map((role) => (
                  <Button
                    key={role}
                    variant={userRole === role ? 'cosmic' : 'ghost'}
                    size="sm"
                    onClick={() => setUserRole(role)}
                  >
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </Button>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Button variant="cosmic" size="lg" className="px-8" onClick={() => setShowSecretModal(true)}>
                  <i className="ri-magic-line mr-2"></i>
                  Reveal Today's Secret
                </Button>
                <Button variant="secondary" size="lg" className="px-8" onClick={handleExploreZodiac}>
                  <i className="ri-star-line mr-2"></i>
                  Explore Astrology
                </Button>
                <Button variant="primary" size="lg" className="px-8" onClick={handleNewsletterClick}>
                  <i className="ri-mail-line mr-2"></i>
                  Daily Insights
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Personalized Daily Overview */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Today's Astrology Reading */}
              <Card className="p-8">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">Your {personalInfo.zodiacSign} Energy Today</h2>
                  <p className="text-gray-300">Personalized for {personalInfo.fullName} in {location.city}</p>
                </div>

                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className={`${todaySign.icon} text-3xl text-white`}></i>
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed text-center">
                  {todaySign.prediction.replace('Today brings', `${personalInfo.fullName}, today brings`)}
                </p>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-400">Element</p>
                    <p className="text-lg font-semibold text-white capitalize">{todaySign.element}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-400">Mood</p>
                    <p className="text-lg font-semibold text-white">{todaySign.mood}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-400">Lucky Number</p>
                    <p className="text-lg font-semibold text-white">{todaySign.luckyNumber}</p>
                  </div>
                </div>

                <Button 
                  variant="primary" 
                  className="w-full"
                  onClick={() => handleSaveToJournal({
                    type: 'daily-astrology',
                    title: `${personalInfo.zodiacSign} Energy Reading`,
                    content: todaySign.prediction,
                    icon: todaySign.icon,
                    color: 'from-purple-500 to-pink-500',
                    metadata: {
                      sign: personalInfo.zodiacSign,
                      element: todaySign.element,
                      mood: todaySign.mood,
                      luckyNumber: todaySign.luckyNumber,
                      system: personalInfo.astrologySystem
                    }
                  })}
                >
                  <i className="ri-bookmark-line mr-2"></i>
                  Save to Journal
                </Button>
              </Card>

              {/* Today's Numerology Insight */}
              <Card className="p-8">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">Life Path {personalInfo.lifePathNumber} Guidance</h2>
                  <p className="text-gray-300">Personal Year {personalInfo.personalYear} • {currentNumerology.title}</p>
                </div>

                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl font-bold text-white">{personalInfo.lifePathNumber}</span>
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed text-center">
                  {personalInfo.fullName}, as a {currentNumerology.title}, your {currentNumerology.traits[0].toLowerCase()} nature is perfectly aligned with today's cosmic energy. This Personal Year {personalInfo.personalYear} amplifies your natural {currentNumerology.traits[1].toLowerCase()} abilities.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-400">Element</p>
                    <p className="text-lg font-semibold text-white">{currentNumerology.element}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-400">Core Trait</p>
                    <p className="text-lg font-semibold text-white">{currentNumerology.traits[0]}</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-xl p-4 mb-6">
                  <h4 className="text-white font-medium mb-2">Key Traits</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentNumerology.traits.map((trait, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full">
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>

                <Button 
                  variant="primary" 
                  className="w-full"
                  onClick={() => handleSaveToJournal({
                    type: 'daily-numerology',
                    title: `Life Path ${personalInfo.lifePathNumber} Guidance`,
                    content: `${currentNumerology.title} energy guidance for Personal Year ${personalInfo.personalYear}`,
                    icon: 'ri-calculator-line',
                    color: 'from-blue-500 to-cyan-500',
                    metadata: {
                      lifePathNumber: personalInfo.lifePathNumber,
                      personalYear: personalInfo.personalYear,
                      traits: currentNumerology.traits,
                      element: currentNumerology.element
                    }
                  })}
                >
                  <i className="ri-bookmark-line mr-2"></i>
                  Save to Journal
                </Button>
              </Card>
            </div>
          </div>
        </section>

        {/* Enhanced Daily Cosmic Summary */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-6xl mx-auto">
            <Card className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">Your Complete Cosmic Overview</h2>
                <p className="text-gray-300">Personalized insights for {personalInfo.fullName} • {new Date().toLocaleDateString()}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="text-center p-4 bg-purple-500/10 rounded-xl">
                  <i className="ri-star-line text-3xl text-purple-400 mb-2"></i>
                  <h3 className="text-white font-semibold mb-1">Zodiac Energy</h3>
                  <p className="text-purple-200 font-medium">{personalInfo.zodiacSign}</p>
                  <p className="text-sm text-gray-400">{todaySign.element} • {todaySign.mood}</p>
                </div>

                <div className="text-center p-4 bg-blue-500/10 rounded-xl">
                  <i className="ri-calculator-line text-3xl text-blue-400 mb-2"></i>
                  <h3 className="text-white font-semibold mb-1">Life Path</h3>
                  <p className="text-blue-200 font-medium">Number {personalInfo.lifePathNumber}</p>
                  <p className="text-sm text-gray-400">{currentNumerology.title}</p>
                </div>

                <div className="text-center p-4 bg-green-500/10 rounded-xl">
                  <i className="ri-calendar-line text-3xl text-green-400 mb-2"></i>
                  <h3 className="text-white font-semibold mb-1">Personal Year</h3>
                  <p className="text-green-200 font-medium">Year {personalInfo.personalYear}</p>
                  <p className="text-sm text-gray-400">Current cycle energy</p>
                </div>

                <div className="text-center p-4 bg-orange-500/10 rounded-xl">
                  <i className="ri-map-pin-line text-3xl text-orange-400 mb-2"></i>
                  <h3 className="text-white font-semibold mb-1">Location</h3>
                  <p className="text-orange-200 font-medium">{location.city}</p>
                  <p className="text-sm text-gray-400">{location.country} {location.flag}</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold text-white mb-4">Today's Cosmic Alignment</h3>
                <p className="text-gray-200 leading-relaxed">
                  {personalInfo.fullName}, your {personalInfo.zodiacSign} energy combined with Life Path {personalInfo.lifePathNumber} creates a powerful cosmic alignment today in {location.city}. 
                  This Personal Year {personalInfo.personalYear} brings {currentNumerology.traits[0].toLowerCase()} opportunities that align perfectly with your {todaySign.element} element nature. 
                  The stars suggest focusing on {currentNumerology.traits[1].toLowerCase()} activities between {new Date(Date.now() + 6*60*60*1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} and sunset.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button variant="cosmic" onClick={() => navigate('/numerology')}>
                  <i className="ri-calculator-line mr-2"></i>
                  Explore Numerology
                </Button>
                <Button variant="primary" onClick={() => navigate('/compatibility')}>
                  <i className="ri-heart-line mr-2"></i>
                  Check Compatibility
                </Button>
                <Button variant="secondary" onClick={() => navigate('/dreams')}>
                  <i className="ri-moon-line mr-2"></i>
                  Analyze Dreams
                </Button>
              </div>
            </Card>
          </div>
        </section>

        {/* Location Selection Modal with comprehensive cities */}
        {showLocationModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowLocationModal(false)}></div>
            <div className="relative bg-gradient-to-br from-purple-900/95 to-indigo-900/95 backdrop-blur-lg rounded-2xl border border-white/20 p-8 max-w-2xl w-full mx-4 shadow-2xl max-h-[80vh] overflow-hidden">
              <button
                onClick={() => setShowLocationModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <i className="ri-close-line text-xl"></i>
              </button>

              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-global-line text-2xl text-white"></i>
                </div>
                <h3 className="text-2xl font-bold text-white">Select Your Location</h3>
                <p className="text-gray-300">Choose your city for accurate cosmic timing and personalized insights</p>
              </div>

              {/* Search Input */}
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search city or country..."
                    value={citySearch}
                    onChange={(e) => setCitySearch(e.target.value)}
                    className="w-full px-4 py-3 pl-10 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                </div>
                <p className="text-sm text-gray-400 mt-2">{filteredCities.length} cities available worldwide</p>
              </div>

              {/* Cities List */}
              <div className="max-h-96 overflow-y-auto space-y-1">
                {filteredCities.length === 0 ? (
                  <div className="text-center py-8">
                    <i className="ri-map-pin-line text-4xl text-gray-400 mb-2"></i>
                    <p className="text-gray-400">No cities found</p>
                  </div>
                ) : (
                  filteredCities.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleCitySelect(item)}
                      className="w-full flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-left group"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{item.flag}</span>
                        <div>
                          <p className="text-white font-medium group-hover:text-purple-200">{item.city}</p>
                          <p className="text-sm text-gray-400">{item.country}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        {location.city === item.city && location.country === item.country && (
                          <i className="ri-check-line text-green-400"></i>
                        )}
                        <p className="text-xs text-gray-500">{item.timezone}</p>
                      </div>
                    </button>
                  ))
                )}
              </div>

              <div className="mt-6 text-center">
                <Button variant="ghost" onClick={() => setShowLocationModal(false)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Daily Secret Modal */}
        {showSecretModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowSecretModal(false)}></div>
            <div className="relative bg-gradient-to-br from-purple-900/90 to-indigo-900/90 backdrop-blur-lg rounded-2xl border border-white/20 p-8 max-w-md w-full mx-4 shadow-2xl">
              <button
                onClick={() => setShowSecretModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <i className="ri-close-line text-xl"></i>
              </button>

              <div className="text-center">
                <div className={`w-16 h-16 bg-gradient-to-r ${dailySecret.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <i className={`${dailySecret.icon} text-2xl text-white`}></i>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4">{dailySecret.title}</h3>
                <p className="text-gray-200 leading-relaxed mb-6">{dailySecret.message}</p>

                <div className="flex items-center justify-center space-x-4 mb-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-400">Today's Energy</p>
                    <p className="text-lg font-semibold text-white">High</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-400">Best Time</p>
                    <p className="text-lg font-semibold text-white">3-6 PM</p>
                  </div>
                </div>

                {userRole === 'guest' ? (
                  <div className="space-y-3">
                    <Button variant="cosmic" className="w-full" onClick={handleUnlockReading}>
                      <i className="ri-vip-crown-line mr-2"></i>
                      Unlock Full Reading
                    </Button>
                    <Button variant="ghost" className="w-full" onClick={() => setShowSecretModal(false)}>
                      Close
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Button 
                      variant="primary" 
                      className="w-full"
                      onClick={() => {
                        handleSaveToJournal({
                          type: 'daily-secret',
                          title: dailySecret.title,
                          content: dailySecret.message,
                          icon: dailySecret.icon,
                          color: dailySecret.color,
                          metadata: {
                            energy: 'High',
                            bestTime: '3-6 PM',
                            date: new Date().toDateString()
                          }
                        });
                        setShowSecretModal(false);
                      }}
                    >
                      <i className="ri-bookmark-line mr-2"></i>
                      Save to Journal
                    </Button>
                    <Button variant="ghost" className="w-full" onClick={() => setShowSecretModal(false)}>
                      Close
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Journal Save Modal */}
        {showJournalModal && currentJournalEntry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowJournalModal(false)}></div>
            <div className="relative bg-gradient-to-br from-purple-900/95 to-indigo-900/95 backdrop-blur-lg rounded-2xl border border-white/20 p-8 max-w-md w-full mx-4 shadow-2xl">
              <button
                onClick={() => setShowJournalModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <i className="ri-close-line text-xl"></i>
              </button>

              <div className="text-center">
                <div className={`w-16 h-16 bg-gradient-to-r ${currentJournalEntry.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <i className={`${currentJournalEntry.icon} text-2xl text-white`}></i>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4">Save to Journal</h3>
                <p className="text-gray-300 mb-6">Add this cosmic insight to your personal journal?</p>

                <div className="bg-white/10 rounded-xl p-4 mb-6 text-left">
                  <h4 className="text-white font-semibold mb-2">{currentJournalEntry.title}</h4>
                  <p className="text-gray-200 text-sm leading-relaxed">{currentJournalEntry.content}</p>
                  <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
                    <span>{new Date().toLocaleDateString()}</span>
                    <span className="capitalize">{currentJournalEntry.type.replace('-', ' ')}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button variant="cosmic" className="w-full" onClick={handleConfirmSaveToJournal}>
                    <i className="ri-save-line mr-2"></i>
                    Save to Journal
                  </Button>
                  <div className="flex space-x-3">
                    <Button variant="secondary" className="flex-1" onClick={handleViewJournal}>
                      <i className="ri-file-text-line mr-2"></i>
                      View Journal
                    </Button>
                    <Button variant="ghost" className="flex-1" onClick={() => setShowJournalModal(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Premium Upgrade Modal */}
        {showUpgradeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowUpgradeModal(false)}></div>
            <div className="relative bg-gradient-to-br from-purple-900/95 to-indigo-900/95 backdrop-blur-lg rounded-2xl border border-white/20 p-8 max-w-lg w-full mx-4 shadow-2xl">
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <i className="ri-close-line text-xl"></i>
              </button>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="ri-vip-crown-fill text-3xl text-white"></i>
                </div>

                <h3 className="text-3xl font-bold text-white mb-4">Unlock Premium Insights</h3>
                <p className="text-gray-200 leading-relaxed mb-8">
                  Get access to detailed cosmic readings, personalized guidance, and exclusive features that reveal the deeper mysteries of your destiny.
                </p>

                {/* Premium Features */}
                <div className="grid grid-cols-1 gap-4 mb-8 text-left">
                  {[
                    'Detailed daily horoscopes for all signs',
                    'AI‑powered dream analysis & interpretation',
                    'Complete numerology calculations',
                    'Compatibility readings & insights',
                    'Personal cosmic journal & history',
                  ].map((feature) => (
                    <div key={feature} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                        <i className="ri-check-line text-white text-sm"></i>
                      </div>
                      <span className="text-gray-200">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Pricing */}
                <div className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-xl p-6 mb-6">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <span className="text-2xl font-bold text-white">$9.99</span>
                    <span className="text-gray-300">/month</span>
                  </div>
                  <p className="text-sm text-gray-300">Cancel anytime • 7‑day free trial</p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    variant="cosmic"
                    className="w-full text-lg py-4"
                    onClick={() => {
                      setShowUpgradeModal(false);
                      setUserRole('premium');
                    }}
                  >
                    <i className="ri-rocket-line mr-2"></i>
                    Start Free Trial
                  </Button>
                  <Button variant="ghost" className="w-full" onClick={() => setShowUpgradeModal(false)}>
                    Maybe Later
                  </Button>
                </div>

                <p className="text-xs text-gray-400 mt-4">
                  By continuing, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Featured Daily Reading */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Your Personal Cosmic Energy</h2>
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-5 0 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className={`${todaySign.icon} text-3xl text-white`}></i>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {todaySign.sign} Energy for {personalInfo.fullName}
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">{todaySign.prediction}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-sm text-gray-400">Element</p>
                  <p className="text-lg font-semibold text-white capitalize">{todaySign.element}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-400">Mood</p>
                  <p className="text-lg font-semibold text-white">{todaySign.mood}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-400">Lucky Number</p>
                  <p className="text-lg font-semibold text-white">{todaySign.luckyNumber}</p>
                </div>
              </div>

              <Button 
                variant="primary"
                onClick={() => handleSaveToJournal({
                  type: 'daily-reading',
                  title: `${todaySign.sign} Energy Reading`,
                  content: todaySign.prediction,
                  icon: todaySign.icon,
                  color: 'from-purple-500 to-pink-500',
                  metadata: {
                    sign: todaySign.sign,
                    element: todaySign.element,
                    mood: todaySign.mood,
                    luckyNumber: todaySign.luckyNumber,
                    dateRange: todaySign.dateRange
                  }
                })}
              >
                <i className="ri-bookmark-line mr-2"></i>
                Save to Journal
              </Button>
            </Card>
          </div>
        </section>

        {/* Zodiac Grid */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">All Zodiac Signs</h2>
              <p className="text-gray-300">Discover what the stars have in store for each sign today</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {zodiacSigns.map((sign) => (
                <div key={sign.sign} className="relative">
                  <ZodiacCard 
                    {...sign} 
                    userRole={userRole} 
                    onUnlockReading={() => handleUnlockReading()}
                    onSaveToJournal={(entry) => handleSaveToJournal(entry)}
                  />
                  <button
                    onClick={() => handleFavoriteToggle(sign.sign)}
                    className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      favorites.includes(sign.sign)
                        ? 'bg-red-500 text-white scale-110'
                        : 'bg-white/20 text-gray-400 hover:text-red-400 hover:bg-white/30'
                    }`}
                  >
                    <i className={`${favorites.includes(sign.sign) ? 'ri-heart-fill' : 'ri-heart-line'} text-sm`}></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Cosmic Features</h2>
              <p className="text-gray-300">Explore the full spectrum of cosmic wisdom</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Astrology Systems */}
              <Card className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-star-line text-2xl text-white"></i>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">5 Astrology Systems</h3>
                <p className="text-gray-300 mb-4">
                  Western, Vedic, Chinese, Sri Lankan, and Hybrid astrology systems
                </p>
                <Button variant="primary" size="sm" onClick={handleExploreSystems}>
                  Explore Systems
                </Button>
              </Card>

              {/* Numerology */}
              <Card className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-calculator-line text-2xl text-white"></i>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Numerology Insights</h3>
                <p className="text-gray-300 mb-4">
                  Discover your life path, destiny number, and personal year cycles
                </p>
                <Button variant="primary" size="sm" onClick={() => navigate('/numerology')}>
                  Calculate Numbers
                </Button>
              </Card>

              {/* AI Dreams */}
              <Card className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-moon-line text-2xl text-white"></i>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">AI Dream Analysis</h3>
                <p className="text-gray-300 mb-4">
                  Unlock the hidden meanings in your dreams with AI guidance
                </p>
                <Button variant="primary" size="sm" onClick={() => navigate('/dreams')}>
                  Analyze Dreams
                </Button>
              </Card>

              {/* Compatibility */}
              <Card className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-heart-line text-2xl text-white"></i>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Compatibility</h3>
                <p className="text-gray-300 mb-4">
                  Discover your cosmic connections with friends, family, and partners
                </p>
                <Button variant="primary" size="sm" onClick={() => navigate('/compatibility')}>
                  Check Compatibility
                </Button>
              </Card>

              {/* Community */}
              <Card className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-group-line text-2xl text-white"></i>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Cosmic Community</h3>
                <p className="text-gray-300 mb-4">
                  Connect with fellow seekers and share your cosmic journey
                </p>
                <Button variant="primary" size="sm" onClick={() => navigate('/community')}>
                  Join Community
                </Button>
              </Card>

              {/* Profile & Settings */}
              <Card className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-user-settings-line text-2xl text-white"></i>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Personal Profile</h3>
                <p className="text-gray-300 mb-4">
                  Track your cosmic journey and manage your spiritual progress
                </p>
                <Button variant="primary" size="sm" onClick={() => navigate('/profile')}>
                  View Profile
                </Button>
              </Card>
            </div>
          </div>
        </section>

        {/* Cosmic Quote */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="p-8">
              <i className="ri-double-quotes-l text-4xl text-purple-400 mb-4"></i>
              <blockquote className="text-xl md:text-2xl text-white font-medium mb-4 leading-relaxed">
                {astrologyQuotes[currentQuote]}
              </blockquote>
              <div className="flex justify-center space-x-2">
                {astrologyQuotes.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentQuote ? 'bg-purple-400' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </Card>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-black/30 backdrop-blur-sm border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400 mb-2">© 2024 Daily Secrets. Guided by the cosmos, powered by AI.</p>
            <a
              href="https://readdy.ai/?origin=logo"
              className="text-purple-400 hover:text-purple-300 transition-colors text-sm"
            >
              Powered by Readdy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
