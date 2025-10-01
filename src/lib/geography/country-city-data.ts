/**
 * Comprehensive Country and City Data
 * Includes coordinates, timezones, and major cities for birth place selection
 */

export interface Country {
  code: string
  name: string
  continent: string
  timezone: string
  coordinates: {
    latitude: number
    longitude: number
  }
  cities: City[]
}

export interface City {
  name: string
  country: string
  coordinates: {
    latitude: number
    longitude: number
  }
  timezone: string
  population?: number
  isCapital?: boolean
}

export const COUNTRIES: Country[] = [
  {
    code: 'LK',
    name: 'Sri Lanka',
    continent: 'Asia',
    timezone: 'Asia/Colombo',
    coordinates: { latitude: 7.8731, longitude: 80.7718 },
    cities: [
      { name: 'Colombo', country: 'Sri Lanka', coordinates: { latitude: 6.9271, longitude: 79.8612 }, timezone: 'Asia/Colombo', population: 752993, isCapital: true },
      { name: 'Kandy', country: 'Sri Lanka', coordinates: { latitude: 7.2906, longitude: 80.6337 }, timezone: 'Asia/Colombo', population: 125400 },
      { name: 'Galle', country: 'Sri Lanka', coordinates: { latitude: 6.0329, longitude: 80.2170 }, timezone: 'Asia/Colombo', population: 93118 },
      { name: 'Jaffna', country: 'Sri Lanka', coordinates: { latitude: 9.6615, longitude: 80.0255 }, timezone: 'Asia/Colombo', population: 88138 },
      { name: 'Anuradhapura', country: 'Sri Lanka', coordinates: { latitude: 8.3114, longitude: 80.4037 }, timezone: 'Asia/Colombo', population: 63208 }
    ]
  },
  {
    code: 'IN',
    name: 'India',
    continent: 'Asia',
    timezone: 'Asia/Kolkata',
    coordinates: { latitude: 20.5937, longitude: 78.9629 },
    cities: [
      { name: 'New Delhi', country: 'India', coordinates: { latitude: 28.6139, longitude: 77.2090 }, timezone: 'Asia/Kolkata', population: 32971791, isCapital: true },
      { name: 'Mumbai', country: 'India', coordinates: { latitude: 19.0760, longitude: 72.8777 }, timezone: 'Asia/Kolkata', population: 12478447 },
      { name: 'Bangalore', country: 'India', coordinates: { latitude: 12.9716, longitude: 77.5946 }, timezone: 'Asia/Kolkata', population: 8436675 },
      { name: 'Chennai', country: 'India', coordinates: { latitude: 13.0827, longitude: 80.2707 }, timezone: 'Asia/Kolkata', population: 4646732 },
      { name: 'Kolkata', country: 'India', coordinates: { latitude: 22.5726, longitude: 88.3639 }, timezone: 'Asia/Kolkata', population: 4486679 }
    ]
  },
  {
    code: 'US',
    name: 'United States',
    continent: 'North America',
    timezone: 'America/New_York',
    coordinates: { latitude: 39.8283, longitude: -98.5795 },
    cities: [
      { name: 'New York', country: 'United States', coordinates: { latitude: 40.7128, longitude: -74.0060 }, timezone: 'America/New_York', population: 8336817 },
      { name: 'Los Angeles', country: 'United States', coordinates: { latitude: 34.0522, longitude: -118.2437 }, timezone: 'America/Los_Angeles', population: 3979576 },
      { name: 'Chicago', country: 'United States', coordinates: { latitude: 41.8781, longitude: -87.6298 }, timezone: 'America/Chicago', population: 2693976 },
      { name: 'Houston', country: 'United States', coordinates: { latitude: 29.7604, longitude: -95.3698 }, timezone: 'America/Chicago', population: 2320268 },
      { name: 'Phoenix', country: 'United States', coordinates: { latitude: 33.4484, longitude: -112.0740 }, timezone: 'America/Phoenix', population: 1608139 }
    ]
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    continent: 'Europe',
    timezone: 'Europe/London',
    coordinates: { latitude: 55.3781, longitude: -3.4360 },
    cities: [
      { name: 'London', country: 'United Kingdom', coordinates: { latitude: 51.5074, longitude: -0.1278 }, timezone: 'Europe/London', population: 8982000, isCapital: true },
      { name: 'Birmingham', country: 'United Kingdom', coordinates: { latitude: 52.4862, longitude: -1.8904 }, timezone: 'Europe/London', population: 1141816 },
      { name: 'Manchester', country: 'United Kingdom', coordinates: { latitude: 53.4808, longitude: -2.2426 }, timezone: 'Europe/London', population: 547627 },
      { name: 'Liverpool', country: 'United Kingdom', coordinates: { latitude: 53.4084, longitude: -2.9916 }, timezone: 'Europe/London', population: 494814 },
      { name: 'Leeds', country: 'United Kingdom', coordinates: { latitude: 53.8008, longitude: -1.5491 }, timezone: 'Europe/London', population: 474632 }
    ]
  },
  {
    code: 'AU',
    name: 'Australia',
    continent: 'Oceania',
    timezone: 'Australia/Sydney',
    coordinates: { latitude: -25.2744, longitude: 133.7751 },
    cities: [
      { name: 'Sydney', country: 'Australia', coordinates: { latitude: -33.8688, longitude: 151.2093 }, timezone: 'Australia/Sydney', population: 5312163 },
      { name: 'Melbourne', country: 'Australia', coordinates: { latitude: -37.8136, longitude: 144.9631 }, timezone: 'Australia/Melbourne', population: 5078193 },
      { name: 'Brisbane', country: 'Australia', coordinates: { latitude: -27.4698, longitude: 153.0251 }, timezone: 'Australia/Brisbane', population: 2514184 },
      { name: 'Perth', country: 'Australia', coordinates: { latitude: -31.9505, longitude: 115.8605 }, timezone: 'Australia/Perth', population: 2089710 },
      { name: 'Adelaide', country: 'Australia', coordinates: { latitude: -34.9285, longitude: 138.6007 }, timezone: 'Australia/Adelaide', population: 1351640 }
    ]
  },
  {
    code: 'CA',
    name: 'Canada',
    continent: 'North America',
    timezone: 'America/Toronto',
    coordinates: { latitude: 56.1304, longitude: -106.3468 },
    cities: [
      { name: 'Toronto', country: 'Canada', coordinates: { latitude: 43.6532, longitude: -79.3832 }, timezone: 'America/Toronto', population: 2930000 },
      { name: 'Vancouver', country: 'Canada', coordinates: { latitude: 49.2827, longitude: -123.1207 }, timezone: 'America/Vancouver', population: 675218 },
      { name: 'Montreal', country: 'Canada', coordinates: { latitude: 45.5017, longitude: -73.5673 }, timezone: 'America/Montreal', population: 1780000 },
      { name: 'Calgary', country: 'Canada', coordinates: { latitude: 51.0447, longitude: -114.0719 }, timezone: 'America/Edmonton', population: 1300000 },
      { name: 'Ottawa', country: 'Canada', coordinates: { latitude: 45.4215, longitude: -75.6972 }, timezone: 'America/Toronto', population: 1017449, isCapital: true }
    ]
  },
  {
    code: 'DE',
    name: 'Germany',
    continent: 'Europe',
    timezone: 'Europe/Berlin',
    coordinates: { latitude: 51.1657, longitude: 10.4515 },
    cities: [
      { name: 'Berlin', country: 'Germany', coordinates: { latitude: 52.5200, longitude: 13.4050 }, timezone: 'Europe/Berlin', population: 3669491, isCapital: true },
      { name: 'Hamburg', country: 'Germany', coordinates: { latitude: 53.5511, longitude: 9.9937 }, timezone: 'Europe/Berlin', population: 1899160 },
      { name: 'Munich', country: 'Germany', coordinates: { latitude: 48.1351, longitude: 11.5820 }, timezone: 'Europe/Berlin', population: 1484226 },
      { name: 'Cologne', country: 'Germany', coordinates: { latitude: 50.9375, longitude: 6.9603 }, timezone: 'Europe/Berlin', population: 1085664 },
      { name: 'Frankfurt', country: 'Germany', coordinates: { latitude: 50.1109, longitude: 8.6821 }, timezone: 'Europe/Berlin', population: 753056 }
    ]
  },
  {
    code: 'FR',
    name: 'France',
    continent: 'Europe',
    timezone: 'Europe/Paris',
    coordinates: { latitude: 46.2276, longitude: 2.2137 },
    cities: [
      { name: 'Paris', country: 'France', coordinates: { latitude: 48.8566, longitude: 2.3522 }, timezone: 'Europe/Paris', population: 2161000, isCapital: true },
      { name: 'Marseille', country: 'France', coordinates: { latitude: 43.2965, longitude: 5.3698 }, timezone: 'Europe/Paris', population: 868277 },
      { name: 'Lyon', country: 'France', coordinates: { latitude: 45.7640, longitude: 4.8357 }, timezone: 'Europe/Paris', population: 515695 },
      { name: 'Toulouse', country: 'France', coordinates: { latitude: 43.6047, longitude: 1.4442 }, timezone: 'Europe/Paris', population: 479553 },
      { name: 'Nice', country: 'France', coordinates: { latitude: 43.7102, longitude: 7.2620 }, timezone: 'Europe/Paris', population: 340017 }
    ]
  },
  {
    code: 'JP',
    name: 'Japan',
    continent: 'Asia',
    timezone: 'Asia/Tokyo',
    coordinates: { latitude: 36.2048, longitude: 138.2529 },
    cities: [
      { name: 'Tokyo', country: 'Japan', coordinates: { latitude: 35.6762, longitude: 139.6503 }, timezone: 'Asia/Tokyo', population: 13929286, isCapital: true },
      { name: 'Osaka', country: 'Japan', coordinates: { latitude: 34.6937, longitude: 135.5023 }, timezone: 'Asia/Tokyo', population: 2691185 },
      { name: 'Kyoto', country: 'Japan', coordinates: { latitude: 35.0116, longitude: 135.7681 }, timezone: 'Asia/Tokyo', population: 1464890 },
      { name: 'Yokohama', country: 'Japan', coordinates: { latitude: 35.4437, longitude: 139.6380 }, timezone: 'Asia/Tokyo', population: 3726167 },
      { name: 'Nagoya', country: 'Japan', coordinates: { latitude: 35.1815, longitude: 136.9066 }, timezone: 'Asia/Tokyo', population: 2305000 }
    ]
  },
  {
    code: 'CN',
    name: 'China',
    continent: 'Asia',
    timezone: 'Asia/Shanghai',
    coordinates: { latitude: 35.8617, longitude: 104.1954 },
    cities: [
      { name: 'Beijing', country: 'China', coordinates: { latitude: 39.9042, longitude: 116.4074 }, timezone: 'Asia/Shanghai', population: 21540000, isCapital: true },
      { name: 'Shanghai', country: 'China', coordinates: { latitude: 31.2304, longitude: 121.4737 }, timezone: 'Asia/Shanghai', population: 24280000 },
      { name: 'Guangzhou', country: 'China', coordinates: { latitude: 23.1291, longitude: 113.2644 }, timezone: 'Asia/Shanghai', population: 14904400 },
      { name: 'Shenzhen', country: 'China', coordinates: { latitude: 22.5431, longitude: 114.0579 }, timezone: 'Asia/Shanghai', population: 12528373 },
      { name: 'Chengdu', country: 'China', coordinates: { latitude: 30.5728, longitude: 104.0668 }, timezone: 'Asia/Shanghai', population: 16580000 }
    ]
  }
]

export class GeographyService {
  /**
   * Get all countries
   */
  static getCountries(): Country[] {
    return COUNTRIES
  }

  /**
   * Get country by code
   */
  static getCountryByCode(code: string): Country | null {
    return COUNTRIES.find(country => country.code === code) || null
  }

  /**
   * Get cities by country code
   */
  static getCitiesByCountry(countryCode: string): City[] {
    const country = this.getCountryByCode(countryCode)
    return country ? country.cities : []
  }

  /**
   * Get city by name and country
   */
  static getCityByName(cityName: string, countryCode: string): City | null {
    const cities = this.getCitiesByCountry(countryCode)
    return cities.find(city => city.name.toLowerCase() === cityName.toLowerCase()) || null
  }

  /**
   * Search cities by name
   */
  static searchCities(query: string, countryCode?: string): City[] {
    const searchQuery = query.toLowerCase()
    let cities: City[] = []

    if (countryCode) {
      cities = this.getCitiesByCountry(countryCode)
    } else {
      cities = COUNTRIES.flatMap(country => country.cities)
    }

    return cities.filter(city => 
      city.name.toLowerCase().includes(searchQuery)
    ).slice(0, 10) // Limit to 10 results
  }

  /**
   * Get coordinates for a city
   */
  static getCityCoordinates(cityName: string, countryCode: string): { latitude: number; longitude: number } | null {
    const city = this.getCityByName(cityName, countryCode)
    return city ? city.coordinates : null
  }

  /**
   * Get timezone for a city
   */
  static getCityTimezone(cityName: string, countryCode: string): string | null {
    const city = this.getCityByName(cityName, countryCode)
    return city ? city.timezone : null
  }

  /**
   * Calculate distance between two coordinates
   */
  static calculateDistance(
    lat1: number, lon1: number,
    lat2: number, lon2: number
  ): number {
    const R = 6371 // Earth's radius in kilometers
    const dLat = this.toRadians(lat2 - lat1)
    const dLon = this.toRadians(lon2 - lon1)
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  /**
   * Convert degrees to radians
   */
  private static toRadians(degrees: number): number {
    return degrees * (Math.PI / 180)
  }

  /**
   * Get nearest city to coordinates
   */
  static getNearestCity(latitude: number, longitude: number): City | null {
    let nearestCity: City | null = null
    let minDistance = Infinity

    for (const country of COUNTRIES) {
      for (const city of country.cities) {
        const distance = this.calculateDistance(
          latitude, longitude,
          city.coordinates.latitude, city.coordinates.longitude
        )
        if (distance < minDistance) {
          minDistance = distance
          nearestCity = city
        }
      }
    }

    return nearestCity
  }
}
