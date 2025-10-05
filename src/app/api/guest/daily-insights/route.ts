/**
 * Guest Daily Insights API
 * Full-Stack Engineer + UX Flow Designer
 * 
 * Provides basic daily insights for guest users without authentication
 */

import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Get basic daily insights without requiring authentication
    const today = new Date()
    const dayOfWeek = today.getDay()
    const dayOfMonth = today.getDate()
    const month = today.getMonth() + 1

    // Basic astrology insight based on current date
    const astrologyInsight = getBasicAstrologyInsight(dayOfMonth, month)
    
    // Basic numerology insight based on current date
    const numerologyInsight = getBasicNumerologyInsight(dayOfMonth, month)
    
    // Basic cosmic guidance
    const guidance = getBasicCosmicGuidance(dayOfWeek)

    return NextResponse.json({
      success: true,
      data: {
        date: today.toISOString().split('T')[0],
        astrology: astrologyInsight,
        numerology: numerologyInsight,
        guidance: guidance,
        luckyNumbers: [dayOfMonth, month, dayOfMonth + month],
        luckyColors: ['Gold', 'Silver', 'Blue'],
        cosmicEnergy: 'High',
        moonPhase: getMoonPhase(today),
        planetaryHour: getPlanetaryHour(today)
      }
    })
  } catch (error) {
    console.error('Error fetching guest daily insights:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch daily insights' },
      { status: 500 }
    )
  }
}

function getBasicAstrologyInsight(day: number, month: number): string {
  const insights = [
    "The stars align in your favor today, bringing new opportunities for growth and transformation.",
    "Cosmic energy flows strongly through your chart, enhancing your natural intuition and wisdom.",
    "Today's planetary transits support your creative endeavors and spiritual development.",
    "The universe sends powerful messages through the stars, guiding you toward your destiny.",
    "Your astrological profile shows great potential for success in all areas of life today.",
    "Cosmic forces work in harmony with your personal energy, amplifying your natural gifts.",
    "The stars reveal a day of significant spiritual growth and personal transformation.",
    "Your astrological chart shows strong support for new beginnings and positive changes.",
    "Cosmic energy enhances your ability to manifest your dreams and achieve your goals.",
    "The universe aligns to support your highest good and spiritual evolution today."
  ]
  
  const index = (day + month) % insights.length
  return insights[index]
}

function getBasicNumerologyInsight(day: number, month: number): string {
  const lifePathNumber = calculateLifePath(day, month, new Date().getFullYear())
  
  const insights = {
    1: "Your Life Path 1 energy brings leadership qualities and the drive to achieve your goals.",
    2: "Your Life Path 2 energy emphasizes cooperation, diplomacy, and building meaningful relationships.",
    3: "Your Life Path 3 energy highlights creativity, self-expression, and joyful communication.",
    4: "Your Life Path 4 energy brings stability, hard work, and the ability to build solid foundations.",
    5: "Your Life Path 5 energy emphasizes freedom, adventure, and embracing life's changes.",
    6: "Your Life Path 6 energy focuses on nurturing, responsibility, and creating harmony in relationships.",
    7: "Your Life Path 7 energy brings spiritual depth, introspection, and the quest for truth.",
    8: "Your Life Path 8 energy emphasizes material success, authority, and the power of manifestation.",
    9: "Your Life Path 9 energy focuses on humanitarian service, wisdom, and spiritual completion."
  }
  
  return insights[lifePathNumber as keyof typeof insights] || "Your numerology reveals unique patterns and potentials for personal growth."
}

function getBasicCosmicGuidance(dayOfWeek: number): string {
  const guidance = [
    "Sunday: A day of rest and reflection. Connect with your spiritual self and recharge your energy.",
    "Monday: Focus on new beginnings and setting intentions for the week ahead.",
    "Tuesday: Channel your energy into productive activities and take decisive action.",
    "Wednesday: Communication and learning are highlighted. Share your knowledge with others.",
    "Thursday: Focus on expansion and growth. Seek opportunities for personal development.",
    "Friday: Nurture relationships and express gratitude for the blessings in your life.",
    "Saturday: Complete unfinished tasks and prepare for the new cycle ahead."
  ]
  
  return guidance[dayOfWeek]
}

function getMoonPhase(date: Date): string {
  // Simplified moon phase calculation
  const moonPhases = [
    "New Moon", "Waxing Crescent", "First Quarter", "Waxing Gibbous",
    "Full Moon", "Waning Gibbous", "Last Quarter", "Waning Crescent"
  ]
  
  const dayOfMonth = date.getDate()
  const phaseIndex = Math.floor(dayOfMonth / 4) % moonPhases.length
  return moonPhases[phaseIndex]
}

function getPlanetaryHour(date: Date): string {
  const hours = [
    "Sun", "Venus", "Mercury", "Moon", "Saturn", "Jupiter", "Mars"
  ]
  
  const dayOfWeek = date.getDay()
  const hour = date.getHours()
  const hourIndex = (dayOfWeek + hour) % hours.length
  return hours[hourIndex]
}

function calculateLifePath(day: number, month: number, year: number): number {
  let sum = day + month + year
  
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = Math.floor(sum / 10) + (sum % 10)
  }
  
  return sum
}
