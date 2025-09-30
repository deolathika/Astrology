/**
 * Google Maps Integration for Daily Secrets App
 * Provides location services, timezone detection, and place search
 */

export interface LocationData {
  latitude: number
  longitude: number
  address: string
  city: string
  country: string
  timezone: string
  utcOffset: number
}

export interface PlaceResult {
  placeId: string
  name: string
  address: string
  location: {
    lat: number
    lng: number
  }
  types: string[]
}

export class GoogleMapsService {
  private map: google.maps.Map | null = null
  private placesService: google.maps.places.PlacesService | null = null
  private geocoder: google.maps.Geocoder | null = null
  private timezoneService: google.maps.TimeZoneService | null = null
  private isInitialized = false

  constructor() {
    this.initialize()
  }

  private async initialize() {
    try {
      // Initialize Google Maps services
      if (typeof window !== 'undefined' && window.google) {
        this.geocoder = new google.maps.Geocoder()
        this.timezoneService = new google.maps.TimeZoneService()
        this.isInitialized = true
      }
    } catch (error) {
      }
  }

  /**
   * Get location data from coordinates
   */
  async getLocationFromCoords(lat: number, lng: number): Promise<LocationData | null> {
    if (!this.isInitialized || !this.geocoder) {
      await this.initialize()
    }

    try {
      const response = await this.geocoder!.geocode({
        location: { lat, lng }
      })

      if (response.results.length === 0) {
        return null
      }

      const result = response.results[0]
      const addressComponents = result.address_components

      // Extract address components
      const city = this.getAddressComponent(addressComponents, 'locality') || 
                  this.getAddressComponent(addressComponents, 'administrative_area_level_1')
      const country = this.getAddressComponent(addressComponents, 'country')

      // Get timezone
      const timezone = await this.getTimezone(lat, lng)

      return {
        latitude: lat,
        longitude: lng,
        address: result.formatted_address,
        city: city || '',
        country: country || '',
        timezone: timezone.timeZoneId,
        utcOffset: timezone.rawOffset / 3600
      }
    } catch (error) {
      return null
    }
  }

  /**
   * Get coordinates from address
   */
  async getCoordsFromAddress(address: string): Promise<LocationData | null> {
    if (!this.isInitialized || !this.geocoder) {
      await this.initialize()
    }

    try {
      const response = await this.geocoder!.geocode({
        address
      })

      if (response.results.length === 0) {
        return null
      }

      const result = response.results[0]
      const location = result.geometry.location
      const lat = location.lat()
      const lng = location.lng()

      return this.getLocationFromCoords(lat, lng)
    } catch (error) {
      return null
    }
  }

  /**
   * Search for places
   */
  async searchPlaces(query: string, location?: { lat: number; lng: number }): Promise<PlaceResult[]> {
    if (!this.isInitialized) {
      await this.initialize()
    }

    try {
      const request: google.maps.places.PlaceSearchRequest = {
        query,
        fields: ['place_id', 'name', 'formatted_address', 'geometry', 'types']
      }

      if (location) {
        request.location = new google.maps.LatLng(location.lat, location.lng)
        request.radius = 50000 // 50km radius
      }

      const service = new google.maps.places.PlacesService(document.createElement('div'))
      
      return new Promise((resolve, reject) => {
        service.textSearch(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            const places: PlaceResult[] = results.map(result => ({
              placeId: result.place_id!,
              name: result.name!,
              address: result.formatted_address!,
              location: {
                lat: result.geometry!.location!.lat(),
                lng: result.geometry!.location!.lng()
              },
              types: result.types || []
            }))
            resolve(places)
          } else {
            reject(new Error(`Places search failed: ${status}`))
          }
        })
      })
    } catch (error) {
      return []
    }
  }

  /**
   * Get place details
   */
  async getPlaceDetails(placeId: string): Promise<google.maps.places.PlaceResult | null> {
    if (!this.isInitialized) {
      await this.initialize()
    }

    try {
      const service = new google.maps.places.PlacesService(document.createElement('div'))
      
      return new Promise((resolve, reject) => {
        service.getDetails({
          placeId,
          fields: ['place_id', 'name', 'formatted_address', 'geometry', 'types', 'website', 'phone_number']
        }, (result, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && result) {
            resolve(result)
          } else {
            reject(new Error(`Place details failed: ${status}`))
          }
        })
      })
    } catch (error) {
      return null
    }
  }

  /**
   * Get timezone for coordinates
   */
  async getTimezone(lat: number, lng: number): Promise<{
    timeZoneId: string
    timeZoneName: string
    rawOffset: number
  }> {
    if (!this.isInitialized || !this.timezoneService) {
      await this.initialize()
    }

    try {
      return new Promise((resolve, reject) => {
        this.timezoneService!.getTimezone({
          location: new google.maps.LatLng(lat, lng),
          timestamp: Date.now() / 1000
        }, (result, status) => {
          if (status === google.maps.TimeZoneStatus.OK && result) {
            resolve({
              timeZoneId: result.timeZoneId,
              timeZoneName: result.timeZoneName,
              rawOffset: result.rawOffset
            })
          } else {
            reject(new Error(`Timezone lookup failed: ${status}`))
          }
        })
      })
    } catch (error) {
      return {
        timeZoneId: 'UTC',
        timeZoneName: 'UTC',
        rawOffset: 0
      }
    }
  }

  /**
   * Get current location
   */
  async getCurrentLocation(): Promise<LocationData | null> {
    if (!navigator.geolocation) {
      throw new Error('Geolocation is not supported by this browser')
    }

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        })
      })

      const lat = position.coords.latitude
      const lng = position.coords.longitude

      return this.getLocationFromCoords(lat, lng)
    } catch (error) {
      return null
    }
  }

  /**
   * Watch location changes
   */
  watchLocation(
    onLocationUpdate: (location: LocationData) => void,
    onError: (error: GeolocationPositionError) => void
  ): number {
    if (!navigator.geolocation) {
      throw new Error('Geolocation is not supported by this browser')
    }

    return navigator.geolocation.watchPosition(
      async (position) => {
        const lat = position.coords.latitude
        const lng = position.coords.longitude
        const location = await this.getLocationFromCoords(lat, lng)
        if (location) {
          onLocationUpdate(location)
        }
      },
      onError,
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    )
  }

  /**
   * Stop watching location
   */
  stopWatchingLocation(watchId: number): void {
    navigator.geolocation.clearWatch(watchId)
  }

  /**
   * Calculate distance between two points
   */
  calculateDistance(
    point1: { lat: number; lng: number },
    point2: { lat: number; lng: number }
  ): number {
    const R = 6371 // Earth's radius in kilometers
    const dLat = this.toRadians(point2.lat - point1.lat)
    const dLng = this.toRadians(point2.lng - point1.lng)
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.toRadians(point1.lat)) * Math.cos(this.toRadians(point2.lat)) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2)
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    
    return R * c
  }

  /**
   * Get address component from address components array
   */
  private getAddressComponent(
    components: google.maps.GeocoderAddressComponent[],
    type: string
  ): string | null {
    const component = components.find(comp => comp.types.includes(type))
    return component ? component.long_name : null
  }

  /**
   * Convert degrees to radians
   */
  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180)
  }
}

// Export singleton instance
export const googleMapsService = new GoogleMapsService()
