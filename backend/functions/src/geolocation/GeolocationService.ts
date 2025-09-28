import axios from 'axios';

export interface LocationData {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
  placeId: string;
}

export interface TimezoneData {
  timezoneId: string;
  offset: number;
  dstOffset: number;
  rawOffset: number;
}

export class GeolocationService {
  private static readonly GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
  private static readonly GOOGLE_TIMEZONE_API_KEY = process.env.GOOGLE_TIMEZONE_API_KEY;

  /**
   * Search for cities using Google Places API
   */
  static async searchCities(query: string, country?: string): Promise<LocationData[]> {
    try {
      const response = await axios.get('https://maps.googleapis.com/maps/api/place/autocomplete/json', {
        params: {
          input: query,
          types: '(cities)',
          key: this.GOOGLE_PLACES_API_KEY,
          components: country ? `country:${country}` : undefined
        }
      });

      const predictions = response.data.predictions || [];
      const locations: LocationData[] = [];

      for (const prediction of predictions.slice(0, 10)) {
        try {
          const details = await this.getPlaceDetails(prediction.place_id);
          if (details) {
            locations.push(details);
          }
        } catch (error) {
          console.error(`Error getting details for ${prediction.place_id}:`, error);
        }
      }

      return locations;
    } catch (error) {
      console.error('Error searching cities:', error);
      return [];
    }
  }

  /**
   * Get detailed information about a specific place
   */
  static async getPlaceDetails(placeId: string): Promise<LocationData | null> {
    try {
      const response = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
        params: {
          place_id: placeId,
          fields: 'name,formatted_address,geometry,address_components',
          key: this.GOOGLE_PLACES_API_KEY
        }
      });

      const result = response.data.result;
      if (!result) return null;

      const geometry = result.geometry;
      const addressComponents = result.address_components || [];
      
      const city = this.extractCityName(addressComponents);
      const country = this.extractCountryName(addressComponents);
      const timezone = await this.getTimezone(geometry.location.lat, geometry.location.lng);

      return {
        city,
        country,
        latitude: geometry.location.lat,
        longitude: geometry.location.lng,
        timezone: timezone.timezoneId,
        placeId
      };
    } catch (error) {
      console.error('Error getting place details:', error);
      return null;
    }
  }

  /**
   * Get timezone information for coordinates
   */
  static async getTimezone(latitude: number, longitude: number, timestamp?: number): Promise<TimezoneData> {
    try {
      const response = await axios.get('https://maps.googleapis.com/maps/api/timezone/json', {
        params: {
          location: `${latitude},${longitude}`,
          timestamp: timestamp || Math.floor(Date.now() / 1000),
          key: this.GOOGLE_TIMEZONE_API_KEY
        }
      });

      const result = response.data;
      return {
        timezoneId: result.timeZoneId,
        offset: result.rawOffset,
        dstOffset: result.dstOffset,
        rawOffset: result.rawOffset
      };
    } catch (error) {
      console.error('Error getting timezone:', error);
      // Fallback to UTC
      return {
        timezoneId: 'UTC',
        offset: 0,
        dstOffset: 0,
        rawOffset: 0
      };
    }
  }

  /**
   * Convert local time to UTC using timezone
   */
  static convertToUTC(
    localDate: Date,
    timezone: string,
    latitude: number,
    longitude: number
  ): Date {
    try {
      // Use moment-timezone for accurate conversion
      const moment = require('moment-timezone');
      
      // Create a moment object in the local timezone
      const localMoment = moment.tz(localDate, timezone);
      
      // Convert to UTC
      const utcMoment = localMoment.utc();
      
      return utcMoment.toDate();
    } catch (error) {
      console.error('Error converting to UTC:', error);
      // Fallback to simple offset calculation
      return this.calculateUTCOffset(localDate, timezone);
    }
  }

  /**
   * Get historical timezone data for birth date
   */
  static async getHistoricalTimezone(
    latitude: number,
    longitude: number,
    birthDate: Date
  ): Promise<TimezoneData> {
    try {
      const timestamp = Math.floor(birthDate.getTime() / 1000);
      return await this.getTimezone(latitude, longitude, timestamp);
    } catch (error) {
      console.error('Error getting historical timezone:', error);
      return {
        timezoneId: 'UTC',
        offset: 0,
        dstOffset: 0,
        rawOffset: 0
      };
    }
  }

  /**
   * Reverse geocode coordinates to get city information
   */
  static async reverseGeocode(latitude: number, longitude: number): Promise<LocationData | null> {
    try {
      const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          latlng: `${latitude},${longitude}`,
          key: this.GOOGLE_PLACES_API_KEY
        }
      });

      const results = response.data.results;
      if (!results || results.length === 0) return null;

      const result = results[0];
      const addressComponents = result.address_components || [];
      
      const city = this.extractCityName(addressComponents);
      const country = this.extractCountryName(addressComponents);
      const timezone = await this.getTimezone(latitude, longitude);

      return {
        city,
        country,
        latitude,
        longitude,
        timezone: timezone.timezoneId,
        placeId: result.place_id || ''
      };
    } catch (error) {
      console.error('Error reverse geocoding:', error);
      return null;
    }
  }

  private static extractCityName(addressComponents: any[]): string {
    const cityComponent = addressComponents.find(component => 
      component.types.includes('locality') || 
      component.types.includes('administrative_area_level_2')
    );
    return cityComponent ? cityComponent.long_name : 'Unknown City';
  }

  private static extractCountryName(addressComponents: any[]): string {
    const countryComponent = addressComponents.find(component => 
      component.types.includes('country')
    );
    return countryComponent ? countryComponent.long_name : 'Unknown Country';
  }

  private static calculateUTCOffset(localDate: Date, timezone: string): Date {
    // Simplified UTC conversion - in production, use a proper timezone library
    const offset = this.getTimezoneOffset(timezone);
    const utcTime = localDate.getTime() - (offset * 60 * 1000);
    return new Date(utcTime);
  }

  private static getTimezoneOffset(timezone: string): number {
    // Simplified timezone offset calculation
    const offsets: { [key: string]: number } = {
      'UTC': 0,
      'America/New_York': -5,
      'America/Chicago': -6,
      'America/Denver': -7,
      'America/Los_Angeles': -8,
      'Europe/London': 0,
      'Europe/Paris': 1,
      'Asia/Tokyo': 9,
      'Asia/Shanghai': 8,
      'Asia/Kolkata': 5.5,
      'Asia/Colombo': 5.5,
      'Australia/Sydney': 10
    };
    
    return offsets[timezone] || 0;
  }
}
