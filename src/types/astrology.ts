/**
 * 🌌 Daily Secrets - Astrology API Types
 * Type definitions for NASA and Swiss Ephemeris responses
 */

// NASA Horizons API Response Types
export interface BodyCoords {
  longitude: number;
  latitude: number;
  distance?: number;
  magnitude?: number;
}

export interface NASAResponse {
  sun: BodyCoords;
  moon: BodyCoords;
  planets: {
    mercury: BodyCoords;
    venus: BodyCoords;
    mars: BodyCoords;
    jupiter: BodyCoords;
    saturn: BodyCoords;
    uranus: BodyCoords;
    neptune: BodyCoords;
  };
  timestamp: string;
  observer: {
    latitude: number;
    longitude: number;
    elevation: number;
  };
}

// Swiss Ephemeris Response Types
export interface SwissPlanetData {
  name: string;
  longitude: number;
  latitude: number;
  distance: number;
  speed: number;
  magnitude: number;
  phase?: number;
}

export interface SwissResponse {
  planets: SwissPlanetData[];
  houses: Array<{
    number: number;
    longitude: number;
    latitude: number;
  }>;
  aspects: Array<{
    planet1: string;
    planet2: string;
    aspect: string;
    orb: number;
    exact: boolean;
  }>;
  timestamp: string;
  location: {
    latitude: number;
    longitude: number;
    timezone: string;
  };
}

// Combined Astrology Data Type
export interface AstrologyData {
  nasa?: NASAResponse;
  swiss?: SwissResponse;
  calculated?: {
    ascendant: number;
    midheaven: number;
    sunSign: string;
    moonSign: string;
    risingSign: string;
  };
  metadata: {
    source: 'nasa' | 'swiss' | 'combined';
    accuracy: 'high' | 'medium' | 'low';
    lastUpdated: string;
  };
}

// Error Response Types
export interface AstrologyError {
  code: string;
  message: string;
  details?: string;
  timestamp: string;
  source: 'nasa' | 'swiss' | 'calculation';
}

// Mock Response Types for Testing
export interface MockNASAResponse extends Partial<NASAResponse> {
  _mock: true;
  _source: 'test';
}

export interface MockSwissResponse extends Partial<SwissResponse> {
  _mock: true;
  _source: 'test';
}
