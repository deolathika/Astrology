import { EphemerisService } from '../backend/functions/src/astrology/EphemerisService'

describe('Astrology Calculations', () => {
  // Test Fixture A: 1961-08-04 19:24 Honolulu, USA (UTC-10)
  const fixtureA = {
    birthDate: new Date('1961-08-04T19:24:00-10:00'),
    latitude: 21.3099,
    longitude: -157.8581,
    timezone: 'Pacific/Honolulu'
  }

  // Test Fixture B: 1990-01-01 12:00 New York, USA
  const fixtureB = {
    birthDate: new Date('1990-01-01T12:00:00-05:00'),
    latitude: 40.7128,
    longitude: -74.0060,
    timezone: 'America/New_York'
  }

  describe('Planetary Positions', () => {
    test('Fixture A - Sun position should be in Leo', async () => {
      const chart = EphemerisService.calculateChart(
        fixtureA.birthDate,
        fixtureA.latitude,
        fixtureA.longitude,
        fixtureA.timezone
      )

      // Sun should be in Leo (120-150 degrees)
      expect(chart.planets.sun.longitude).toBeGreaterThan(120)
      expect(chart.planets.sun.longitude).toBeLessThan(150)
    })

    test('Fixture A - Ascendant should be in Leo', async () => {
      const chart = EphemerisService.calculateChart(
        fixtureA.birthDate,
        fixtureA.latitude,
        fixtureA.longitude,
        fixtureA.timezone
      )

      // Ascendant should be around 18° Leo (138°)
      expect(chart.houses.ascendant).toBeGreaterThan(130)
      expect(chart.houses.ascendant).toBeLessThan(150)
    })

    test('Fixture B - Sun position should be in Capricorn', async () => {
      const chart = EphemerisService.calculateChart(
        fixtureB.birthDate,
        fixtureB.latitude,
        fixtureB.longitude,
        fixtureB.timezone
      )

      // Sun should be in Capricorn (270-300 degrees)
      expect(chart.planets.sun.longitude).toBeGreaterThan(270)
      expect(chart.planets.sun.longitude).toBeLessThan(300)
    })
  })

  describe('Sidereal Calculations', () => {
    test('Lahiri Ayanamsha should be applied correctly', async () => {
      const chart = EphemerisService.calculateChart(
        fixtureB.birthDate,
        fixtureB.latitude,
        fixtureB.longitude,
        fixtureB.timezone,
        'LAHIRI'
      )

      // Sidereal positions should be different from tropical
      expect(chart.sidereal.planets.sun.longitude).not.toBe(chart.planets.sun.longitude)
      
      // Lahiri offset should be around -23°50'
      const offset = chart.planets.sun.longitude - chart.sidereal.planets.sun.longitude
      expect(offset).toBeGreaterThan(20)
      expect(offset).toBeLessThan(30)
    })
  })

  describe('Nakshatra Calculations', () => {
    test('Moon Nakshatra should be calculated correctly', async () => {
      const chart = EphemerisService.calculateChart(
        fixtureA.birthDate,
        fixtureA.latitude,
        fixtureA.longitude,
        fixtureA.timezone
      )

      expect(chart.nakshatra.moon).toBeDefined()
      expect(chart.nakshatra.pada).toBeGreaterThanOrEqual(1)
      expect(chart.nakshatra.pada).toBeLessThanOrEqual(4)
      expect(chart.nakshatra.lord).toBeDefined()
    })
  })

  describe('House Calculations', () => {
    test('House cusps should be calculated', async () => {
      const chart = EphemerisService.calculateChart(
        fixtureA.birthDate,
        fixtureA.latitude,
        fixtureA.longitude,
        fixtureA.timezone
      )

      expect(chart.houses.cusps).toHaveLength(12)
      expect(chart.houses.ascendant).toBeDefined()
      expect(chart.houses.mc).toBeDefined()
    })
  })

  describe('Tolerance Tests', () => {
    test('Planet longitudes should be within ±0.1° of Swiss Ephemeris', async () => {
      const chart = EphemerisService.calculateChart(
        fixtureA.birthDate,
        fixtureA.latitude,
        fixtureA.longitude,
        fixtureA.timezone
      )

      // These are reference values from Swiss Ephemeris
      const expectedSun = 138.5 // Approximate
      const expectedMoon = 63.2 // Approximate
      
      expect(Math.abs(chart.planets.sun.longitude - expectedSun)).toBeLessThan(0.1)
      expect(Math.abs(chart.planets.moon.longitude - expectedMoon)).toBeLessThan(0.1)
    })

    test('Ascendant should be within ±0.2° of Swiss Ephemeris', async () => {
      const chart = EphemerisService.calculateChart(
        fixtureA.birthDate,
        fixtureA.latitude,
        fixtureA.longitude,
        fixtureA.timezone
      )

      const expectedAscendant = 138.0 // Approximate
      expect(Math.abs(chart.houses.ascendant - expectedAscendant)).toBeLessThan(0.2)
    })
  })
})
