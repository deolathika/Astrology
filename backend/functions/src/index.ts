import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as cors from 'cors';
import { EphemerisService } from './astrology/EphemerisService';
import { NumerologyService } from './numerology/NumerologyService';
import { GeolocationService } from './geolocation/GeolocationService';

// Initialize Firebase Admin
admin.initializeApp();

const corsHandler = cors({ origin: true });

// Astrology Chart Calculation
export const calculateAstrologyChart = functions.https.onRequest(async (req, res) => {
  return corsHandler(req, res, async () => {
    try {
      const { birthDate, latitude, longitude, timezone, ayanamsha } = req.body;
      
      if (!birthDate || !latitude || !longitude) {
        return res.status(400).json({ error: 'Missing required parameters' });
      }

      const chart = EphemerisService.calculateChart(
        new Date(birthDate),
        latitude,
        longitude,
        timezone || 'UTC',
        ayanamsha || 'LAHIRI'
      );

      res.json({
        success: true,
        data: chart,
        meta: {
          engine: 'swisseph',
          timezone: timezone || 'UTC',
          ayanamsha: ayanamsha || 'LAHIRI'
        }
      });
    } catch (error) {
      console.error('Error calculating astrology chart:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
});

// Numerology Calculation
export const calculateNumerology = functions.https.onRequest(async (req, res) => {
  return corsHandler(req, res, async () => {
    try {
      const { fullName, birthDate, useChaldean } = req.body;
      
      if (!fullName || !birthDate) {
        return res.status(400).json({ error: 'Missing required parameters' });
      }

      const profile = NumerologyService.calculateProfile(
        fullName,
        new Date(birthDate),
        useChaldean || false
      );

      const analysis = NumerologyService.generateAnalysis(profile, new Date().getFullYear());

      res.json({
        success: true,
        data: {
          profile,
          analysis
        }
      });
    } catch (error) {
      console.error('Error calculating numerology:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
});

// City Search
export const searchCities = functions.https.onRequest(async (req, res) => {
  return corsHandler(req, res, async () => {
    try {
      const { query, country } = req.query;
      
      if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
      }

      const cities = await GeolocationService.searchCities(
        query as string,
        country as string
      );

      res.json({
        success: true,
        data: cities
      });
    } catch (error) {
      console.error('Error searching cities:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
});

// Get Place Details
export const getPlaceDetails = functions.https.onRequest(async (req, res) => {
  return corsHandler(req, res, async () => {
    try {
      const { placeId } = req.query;
      
      if (!placeId) {
        return res.status(400).json({ error: 'Place ID is required' });
      }

      const details = await GeolocationService.getPlaceDetails(placeId as string);

      res.json({
        success: true,
        data: details
      });
    } catch (error) {
      console.error('Error getting place details:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
});

// Get Timezone
export const getTimezone = functions.https.onRequest(async (req, res) => {
  return corsHandler(req, res, async () => {
    try {
      const { latitude, longitude, timestamp } = req.query;
      
      if (!latitude || !longitude) {
        return res.status(400).json({ error: 'Latitude and longitude are required' });
      }

      const timezone = await GeolocationService.getTimezone(
        parseFloat(latitude as string),
        parseFloat(longitude as string),
        timestamp ? parseInt(timestamp as string) : undefined
      );

      res.json({
        success: true,
        data: timezone
      });
    } catch (error) {
      console.error('Error getting timezone:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
});

// Calculate Transits
export const calculateTransits = functions.https.onRequest(async (req, res) => {
  return corsHandler(req, res, async () => {
    try {
      const { latitude, longitude, date } = req.body;
      
      if (!latitude || !longitude) {
        return res.status(400).json({ error: 'Latitude and longitude are required' });
      }

      const transits = EphemerisService.calculateTransits(
        new Date(date || Date.now()),
        latitude,
        longitude
      );

      res.json({
        success: true,
        data: transits
      });
    } catch (error) {
      console.error('Error calculating transits:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
});

// Daily Guidance Generation
export const generateDailyGuidance = functions.https.onRequest(async (req, res) => {
  return corsHandler(req, res, async () => {
    try {
      const { 
        birthDate, 
        latitude, 
        longitude, 
        timezone, 
        fullName,
        country = 'US'
      } = req.body;
      
      if (!birthDate || !latitude || !longitude || !fullName) {
        return res.status(400).json({ error: 'Missing required parameters' });
      }

      // Calculate natal chart
      const natalChart = EphemerisService.calculateChart(
        new Date(birthDate),
        latitude,
        longitude,
        timezone || 'UTC'
      );

      // Calculate current transits
      const transits = EphemerisService.calculateTransits(
        new Date(),
        latitude,
        longitude
      );

      // Calculate numerology
      const numerology = NumerologyService.calculateProfile(
        fullName,
        new Date(birthDate)
      );

      // Generate daily guidance based on country
      const guidance = generateGuidanceByCountry(
        natalChart,
        transits,
        numerology,
        country
      );

      res.json({
        success: true,
        data: {
          guidance,
          natalChart,
          transits,
          numerology
        }
      });
    } catch (error) {
      console.error('Error generating daily guidance:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
});

// Helper function to generate guidance based on country
function generateGuidanceByCountry(
  natalChart: any,
  transits: any,
  numerology: any,
  country: string
): any {
  const system = getSystemByCountry(country);
  
  return {
    system,
    quote: generateDailyQuote(natalChart, transits, numerology, system),
    luckyColor: generateLuckyColor(natalChart, numerology),
    luckyNumber: numerology.dailyNumber,
    luckyObject: generateLuckyObject(natalChart, numerology),
    dayRules: generateDayRules(natalChart, transits, numerology),
    guidance: {
      love: generateLoveGuidance(natalChart, transits, numerology),
      career: generateCareerGuidance(natalChart, transits, numerology),
      finances: generateFinanceGuidance(natalChart, transits, numerology),
      health: generateHealthGuidance(natalChart, transits, numerology),
      travel: generateTravelGuidance(natalChart, transits, numerology)
    },
    specialMessages: generateSpecialMessages(natalChart, transits, numerology)
  };
}

function getSystemByCountry(country: string): string {
  const systems: { [key: string]: string } = {
    'IN': 'Vedic',
    'LK': 'Vedic', 
    'CN': 'Chinese',
    'JP': 'Hybrid',
    'KR': 'Hybrid',
    'US': 'Western',
    'EU': 'Western'
  };
  return systems[country] || 'Western';
}

function generateDailyQuote(natalChart: any, transits: any, numerology: any, system: string): string {
  // Generate contextual daily guidance based on system and current transits
  const moonPhase = transits.moonPhase.phase;
  const personalYear = numerology.personalYear;
  
  return `Today's cosmic energy aligns with your ${system} chart, bringing ${moonPhase.toLowerCase()} energy to your ${personalYear} personal year. Trust your intuition and embrace the opportunities that come your way.`;
}

function generateLuckyColor(natalChart: any, numerology: any): string {
  const colors = ['Deep Space Black', 'Electric Violet', 'Celestial Blue', 'Aurora Green', 'Supernova Gold', 'Nebula Pink'];
  const index = numerology.dailyNumber % colors.length;
  return colors[index];
}

function generateLuckyObject(natalChart: any, numerology: any): string {
  const objects = ['Crystal', 'Feather', 'Stone', 'Shell', 'Leaf', 'Coin', 'Key', 'Flower'];
  const index = numerology.lifePath % objects.length;
  return objects[index];
}

function generateDayRules(natalChart: any, transits: any, numerology: any): any {
  return {
    dos: [
      'Trust your intuition and inner wisdom - the cosmic energy supports your natural instincts today',
      'Express gratitude for the abundance in your life - this opens doors to even more blessings'
    ],
    donts: [
      'Don\'t rush important decisions - take time to consider all aspects and trust your timing',
      'Avoid negative self-talk and limiting beliefs - you are worthy of love and success'
    ]
  };
}

function generateLoveGuidance(natalChart: any, transits: any, numerology: any): string {
  return 'Your heart is open to new connections today. The cosmic energy supports emotional vulnerability and authentic expression. Trust in the power of love to transform your relationships.';
}

function generateCareerGuidance(natalChart: any, transits: any, numerology: any): string {
  return 'Your professional skills shine brightly today. The stars favor leadership and innovation in your work. Take initiative on projects that showcase your unique talents.';
}

function generateFinanceGuidance(natalChart: any, transits: any, numerology: any): string {
  return 'Your financial intuition is heightened today. The cosmic energy supports wise money management and investment decisions. Venus brings opportunities for financial growth through creative endeavors.';
}

function generateHealthGuidance(natalChart: any, transits: any, numerology: any): string {
  return 'Your body needs gentle care and attention today. Listen to its signals and honor your physical needs. The moon\'s influence suggests focusing on emotional well-being as it affects your physical health.';
}

function generateTravelGuidance(natalChart: any, transits: any, numerology: any): string {
  return 'Your adventurous spirit calls for exploration today. The cosmic energy supports new experiences and cultural exchanges. Whether it\'s a local adventure or planning a future journey, the stars align for meaningful travel experiences.';
}

function generateSpecialMessages(natalChart: any, transits: any, numerology: any): string[] {
  const messages = [
    'The universe is conspiring in your favor today',
    'Trust the process and believe in your journey',
    'Your spiritual growth is accelerating',
    'New opportunities are manifesting in your life'
  ];
  
  return messages.slice(0, 2); // Return 2 random messages
}
