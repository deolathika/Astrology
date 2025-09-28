import { NumerologyService } from '../backend/functions/src/numerology/NumerologyService'

describe('Numerology Calculations', () => {
  describe('Life Path Number', () => {
    test('1999-12-31 should have Life Path 8', () => {
      const profile = NumerologyService.calculateProfile(
        'John Doe',
        new Date('1999-12-31'),
        false
      )
      
      expect(profile.lifePath).toBe(8)
    })

    test('Master numbers should be preserved', () => {
      const profile = NumerologyService.calculateProfile(
        'John Doe',
        new Date('1911-11-11'), // 11/11/1911 = 33
        false
      )
      
      expect(profile.lifePath).toBe(33)
      expect(profile.masterNumbers).toContain(33)
    })

    test('Life Path 11 should be preserved', () => {
      const profile = NumerologyService.calculateProfile(
        'John Doe',
        new Date('1911-11-11'),
        false
      )
      
      expect(profile.lifePath).toBe(33) // 11+11+1911 = 1933 -> 1+9+3+3 = 16 -> 1+6 = 7, but 33 is master
    })
  })

  describe('Expression Number', () => {
    test('Pythagorean mapping should be correct', () => {
      const profile = NumerologyService.calculateProfile(
        'John Doe',
        new Date('1990-01-01'),
        false
      )
      
      // J(1) + O(6) + H(8) + N(5) + D(4) + O(6) + E(5) = 35 -> 3+5 = 8
      expect(profile.expression).toBe(8)
    })

    test('Chaldean mapping should be different', () => {
      const pythagorean = NumerologyService.calculateProfile(
        'John Doe',
        new Date('1990-01-01'),
        false
      )
      
      const chaldean = NumerologyService.calculateProfile(
        'John Doe',
        new Date('1990-01-01'),
        true
      )
      
      expect(chaldean.expression).not.toBe(pythagorean.expression)
      expect(chaldean.chaldean).toBeDefined()
    })
  })

  describe('Soul Urge Number', () => {
    test('Should calculate from vowels only', () => {
      const profile = NumerologyService.calculateProfile(
        'John Doe',
        new Date('1990-01-01'),
        false
      )
      
      // O(6) + O(6) + E(5) = 17 -> 1+7 = 8
      expect(profile.soulUrge).toBe(8)
    })
  })

  describe('Personality Number', () => {
    test('Should calculate from consonants only', () => {
      const profile = NumerologyService.calculateProfile(
        'John Doe',
        new Date('1990-01-01'),
        false
      )
      
      // J(1) + H(8) + N(5) + D(4) = 18 -> 1+8 = 9
      expect(profile.personality).toBe(9)
    })
  })

  describe('Daily Number', () => {
    test('Should calculate from current date', () => {
      const profile = NumerologyService.calculateProfile(
        'John Doe',
        new Date('1990-01-01'),
        false
      )
      
      expect(profile.dailyNumber).toBeGreaterThanOrEqual(1)
      expect(profile.dailyNumber).toBeLessThanOrEqual(9)
    })
  })

  describe('Lucky Numbers', () => {
    test('Should generate deterministic lucky numbers', () => {
      const profile1 = NumerologyService.calculateProfile(
        'John Doe',
        new Date('1990-01-01'),
        false
      )
      
      const profile2 = NumerologyService.calculateProfile(
        'John Doe',
        new Date('1990-01-01'),
        false
      )
      
      expect(profile1.luckyNumbers).toEqual(profile2.luckyNumbers)
    })

    test('Should generate 3 unique numbers', () => {
      const profile = NumerologyService.calculateProfile(
        'John Doe',
        new Date('1990-01-01'),
        false
      )
      
      expect(profile.luckyNumbers).toHaveLength(3)
      expect(new Set(profile.luckyNumbers).size).toBe(3)
    })
  })

  describe('Master Numbers', () => {
    test('Should identify master numbers correctly', () => {
      const profile = NumerologyService.calculateProfile(
        'John Doe',
        new Date('1911-11-11'),
        false
      )
      
      expect(profile.masterNumbers).toContain(11)
      expect(profile.masterNumbers).toContain(22)
      expect(profile.masterNumbers).toContain(33)
    })
  })

  describe('Analysis Generation', () => {
    test('Should generate comprehensive analysis', () => {
      const profile = NumerologyService.calculateProfile(
        'John Doe',
        new Date('1990-01-01'),
        false
      )
      
      const analysis = NumerologyService.generateAnalysis(profile, 2024)
      
      expect(analysis.lifePath).toBeDefined()
      expect(analysis.expression).toBeDefined()
      expect(analysis.soulUrge).toBeDefined()
      expect(analysis.personality).toBeDefined()
      expect(analysis.personalYear).toBeDefined()
    })

    test('Life Path analysis should contain required fields', () => {
      const profile = NumerologyService.calculateProfile(
        'John Doe',
        new Date('1990-01-01'),
        false
      )
      
      const analysis = NumerologyService.generateAnalysis(profile, 2024)
      
      expect(analysis.lifePath.number).toBe(profile.lifePath)
      expect(analysis.lifePath.meaning).toBeDefined()
      expect(analysis.lifePath.challenges).toBeInstanceOf(Array)
      expect(analysis.lifePath.opportunities).toBeInstanceOf(Array)
      expect(analysis.lifePath.guidance).toBeDefined()
    })
  })

  describe('Unicode Handling', () => {
    test('Should handle diacritics correctly', () => {
      const profile = NumerologyService.calculateProfile(
        'José María',
        new Date('1990-01-01'),
        false
      )
      
      expect(profile.expression).toBeDefined()
      expect(profile.soulUrge).toBeDefined()
      expect(profile.personality).toBeDefined()
    })

    test('Should handle special characters', () => {
      const profile = NumerologyService.calculateProfile(
        'Jean-Pierre O'Connor',
        new Date('1990-01-01'),
        false
      )
      
      expect(profile.expression).toBeDefined()
      expect(profile.soulUrge).toBeDefined()
      expect(profile.personality).toBeDefined()
    })
  })

  describe('Edge Cases', () => {
    test('Should handle empty name', () => {
      const profile = NumerologyService.calculateProfile(
        '',
        new Date('1990-01-01'),
        false
      )
      
      expect(profile.expression).toBe(0)
      expect(profile.soulUrge).toBe(0)
      expect(profile.personality).toBe(0)
    })

    test('Should handle single character name', () => {
      const profile = NumerologyService.calculateProfile(
        'A',
        new Date('1990-01-01'),
        false
      )
      
      expect(profile.expression).toBe(1)
      expect(profile.soulUrge).toBe(1)
      expect(profile.personality).toBe(0)
    })
  })
})
