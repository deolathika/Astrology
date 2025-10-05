import { describe, it, expect } from '@jest/globals'
import { PythagoreanNumerology } from '@/lib/numerology/engines'

describe('Pythagorean Numerology', () => {
  describe('Life Path Calculation', () => {
    it('should calculate life path number correctly', () => {
      const result = PythagoreanNumerology.calculateLifePath('1990-05-15')
      
      expect(result).toBeDefined()
      expect(result.number).toBeGreaterThanOrEqual(1)
      expect(result.number).toBeLessThanOrEqual(9)
      expect(result.meaning).toBeDefined()
      expect(result.traits).toBeDefined()
      expect(result.challenges).toBeDefined()
      expect(result.strengths).toBeDefined()
    })

    it('should handle master numbers', () => {
      const result = PythagoreanNumerology.calculateLifePath('1990-11-11')
      
      expect(result).toBeDefined()
      expect(result.number).toBeGreaterThanOrEqual(1)
      expect(result.number).toBeLessThanOrEqual(33)
    })

    it('should validate birth date format', () => {
      expect(() => {
        PythagoreanNumerology.calculateLifePath('invalid-date')
      }).toThrow()
    })
  })

  describe('Destiny Number Calculation', () => {
    it('should calculate destiny number correctly', () => {
      const result = PythagoreanNumerology.calculateDestiny('John Doe')
      
      expect(result).toBeDefined()
      expect(result.number).toBeGreaterThanOrEqual(1)
      expect(result.number).toBeLessThanOrEqual(9)
      expect(result.meaning).toBeDefined()
      expect(result.purpose).toBeDefined()
      expect(result.talents).toBeDefined()
      expect(result.expression).toBeDefined()
    })

    it('should handle empty names', () => {
      const result = PythagoreanNumerology.calculateDestiny('')
      
      expect(result).toBeDefined()
      expect(result.number).toBe(0)
    })

    it('should handle special characters', () => {
      const result = PythagoreanNumerology.calculateDestiny('John-Doe O\'Connor')
      
      expect(result).toBeDefined()
      expect(result.number).toBeGreaterThanOrEqual(1)
      expect(result.number).toBeLessThanOrEqual(9)
    })
  })

  describe('Number Reduction', () => {
    it('should reduce numbers to single digits', () => {
      const result = PythagoreanNumerology['reduceToSingleDigit'](123)
      expect(result).toBe(6) // 1+2+3 = 6
    })

    it('should handle master numbers', () => {
      const result = PythagoreanNumerology['reduceToSingleDigit'](11)
      expect(result).toBe(11) // Master number
    })

    it('should reduce large numbers', () => {
      const result = PythagoreanNumerology['reduceToSingleDigit'](999)
      expect(result).toBe(9) // 9+9+9 = 27, 2+7 = 9
    })
  })

  describe('Letter Value Mapping', () => {
    it('should map letters to correct values', () => {
      const letterValues = PythagoreanNumerology['letterValues']
      
      expect(letterValues['A']).toBe(1)
      expect(letterValues['B']).toBe(2)
      expect(letterValues['C']).toBe(3)
      expect(letterValues['D']).toBe(4)
      expect(letterValues['E']).toBe(5)
      expect(letterValues['F']).toBe(6)
      expect(letterValues['G']).toBe(7)
      expect(letterValues['H']).toBe(8)
      expect(letterValues['I']).toBe(9)
    })

    it('should handle all alphabet letters', () => {
      const letterValues = PythagoreanNumerology['letterValues']
      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      
      for (const letter of alphabet) {
        expect(letterValues[letter]).toBeDefined()
        expect(letterValues[letter]).toBeGreaterThanOrEqual(1)
        expect(letterValues[letter]).toBeLessThanOrEqual(9)
      }
    })
  })
})

