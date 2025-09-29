/**
 * OpenAI Integration Service for Daily Secrets App
 * Provides real AI content generation for cosmic guidance
 */

export interface AIContentRequest {
  userProfile: {
    name: string
    birthDate: string
    zodiacSign: string
    lifePath: number
    location: string
    language: string
  }
  contentType: 'daily_guidance' | 'dream_interpretation' | 'compatibility' | 'numerology_insight'
  context?: string
  length?: 'short' | 'medium' | 'long'
}

export interface AIContentResponse {
  content: string
  source: 'openai' | 'gemini' | 'offline'
  tokens: number
  cost: number
  timestamp: Date
}

export class OpenAIService {
  private apiKey: string
  private baseUrl: string
  private model: string

  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY || ''
    this.baseUrl = 'https://api.openai.com/v1'
    this.model = 'gpt-4'
  }

  /**
   * Generate daily cosmic guidance
   */
  async generateDailyGuidance(request: AIContentRequest): Promise<AIContentResponse> {
    const prompt = this.buildDailyGuidancePrompt(request)
    
    try {
      const response = await this.callOpenAI(prompt)
      return {
        content: response.content,
        source: 'openai',
        tokens: response.usage?.total_tokens || 0,
        cost: this.calculateCost(response.usage?.total_tokens || 0),
        timestamp: new Date()
      }
    } catch (error) {
      console.error('OpenAI API error:', error)
      // Fallback to offline content
      return this.getOfflineContent(request)
    }
  }

  /**
   * Interpret dreams using AI
   */
  async interpretDream(request: AIContentRequest): Promise<AIContentResponse> {
    const prompt = this.buildDreamInterpretationPrompt(request)
    
    try {
      const response = await this.callOpenAI(prompt)
      return {
        content: response.content,
        source: 'openai',
        tokens: response.usage?.total_tokens || 0,
        cost: this.calculateCost(response.usage?.total_tokens || 0),
        timestamp: new Date()
      }
    } catch (error) {
      console.error('OpenAI API error:', error)
      return this.getOfflineContent(request)
    }
  }

  /**
   * Generate compatibility analysis
   */
  async generateCompatibility(request: AIContentRequest): Promise<AIContentResponse> {
    const prompt = this.buildCompatibilityPrompt(request)
    
    try {
      const response = await this.callOpenAI(prompt)
      return {
        content: response.content,
        source: 'openai',
        tokens: response.usage?.total_tokens || 0,
        cost: this.calculateCost(response.usage?.total_tokens || 0),
        timestamp: new Date()
      }
    } catch (error) {
      console.error('OpenAI API error:', error)
      return this.getOfflineContent(request)
    }
  }

  /**
   * Call OpenAI API
   */
  private async callOpenAI(prompt: string) {
    if (!this.apiKey) {
      throw new Error('OpenAI API key not configured')
    }

    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: 'You are a wise cosmic counselor providing authentic, personalized astrology and numerology guidance. Always be positive, supportive, and culturally sensitive.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      })
    })

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`)
    }

    return await response.json()
  }

  /**
   * Build daily guidance prompt
   */
  private buildDailyGuidancePrompt(request: AIContentRequest): string {
    const { userProfile, context } = request
    const today = new Date().toLocaleDateString()
    
    return `Generate personalized daily cosmic guidance for ${userProfile.name}, a ${userProfile.zodiacSign} with Life Path ${userProfile.lifePath} from ${userProfile.location}.

Date: ${today}
Language: ${userProfile.language}

Context: ${context || 'General daily guidance'}

Please provide:
1. A warm, personalized greeting
2. Today's cosmic energy and how it affects them
3. Specific guidance for love, career, and personal growth
4. Lucky numbers and colors
5. A positive affirmation

Keep it authentic, supportive, and culturally appropriate for ${userProfile.location}. Length: 800-1000 characters.`
  }

  /**
   * Build dream interpretation prompt
   */
  private buildDreamInterpretationPrompt(request: AIContentRequest): string {
    const { userProfile, context } = request
    
    return `Interpret this dream for ${userProfile.name}, a ${userProfile.zodiacSign} with Life Path ${userProfile.lifePath}:

Dream: ${context}

Please provide:
1. Symbolic meaning of key dream elements
2. Emotional significance
3. Spiritual message
4. Practical guidance
5. What the dream reveals about their current life situation

Be supportive, insightful, and culturally sensitive. Length: 600-800 characters.`
  }

  /**
   * Build compatibility prompt
   */
  private buildCompatibilityPrompt(request: AIContentRequest): string {
    const { userProfile, context } = request
    
    return `Analyze the compatibility between ${userProfile.name} (${userProfile.zodiacSign}, Life Path ${userProfile.lifePath}) and their partner based on:

Partner details: ${context}

Please provide:
1. Overall compatibility score and explanation
2. Strengths in their relationship
3. Potential challenges
4. Advice for harmony
5. Best ways to communicate and connect

Be positive, realistic, and helpful. Length: 700-900 characters.`
  }

  /**
   * Get offline fallback content
   */
  private getOfflineContent(request: AIContentRequest): AIContentResponse {
    const offlineContent = this.generateOfflineContent(request)
    
    return {
      content: offlineContent,
      source: 'offline',
      tokens: 0,
      cost: 0,
      timestamp: new Date()
    }
  }

  /**
   * Generate offline content as fallback
   */
  private generateOfflineContent(request: AIContentRequest): string {
    const { userProfile, contentType } = request
    const today = new Date()
    const dayOfWeek = today.getDay()
    
    const templates = {
      daily_guidance: `Dear ${userProfile.name}, today's cosmic energy brings new opportunities for growth. As a ${userProfile.zodiacSign}, you're naturally inclined toward ${this.getZodiacTraits(userProfile.zodiacSign)}. Your Life Path ${userProfile.lifePath} suggests focusing on ${this.getLifePathFocus(userProfile.lifePath)}. The universe supports your journey today.`,
      
      dream_interpretation: `Your dream reveals important insights about your current life path. The symbols you encountered represent ${this.getDreamSymbols()}. This suggests you're processing ${this.getDreamMeaning()}. Trust your intuition and pay attention to recurring themes.`,
      
      compatibility: `Your cosmic connection shows strong potential for harmony. Your ${userProfile.zodiacSign} energy complements your partner's energy well. Focus on communication and understanding each other's needs.`,
      
      numerology_insight: `Your Life Path ${userProfile.lifePath} reveals your soul's purpose. You're here to ${this.getLifePathPurpose(userProfile.lifePath)}. Trust in your natural abilities and follow your heart's calling.`
    }
    
    return templates[contentType] || templates.daily_guidance
  }

  /**
   * Helper methods for offline content
   */
  private getZodiacTraits(sign: string): string {
    const traits: { [key: string]: string } = {
      'Aries': 'leadership and initiative',
      'Taurus': 'stability and determination',
      'Gemini': 'communication and adaptability',
      'Cancer': 'nurturing and intuition',
      'Leo': 'creativity and confidence',
      'Virgo': 'service and attention to detail',
      'Libra': 'harmony and balance',
      'Scorpio': 'transformation and depth',
      'Sagittarius': 'adventure and wisdom',
      'Capricorn': 'ambition and structure',
      'Aquarius': 'innovation and humanitarianism',
      'Pisces': 'compassion and spirituality'
    }
    return traits[sign] || 'unique cosmic energy'
  }

  private getLifePathFocus(number: number): string {
    const focuses: { [key: number]: string } = {
      1: 'leadership and independence',
      2: 'cooperation and harmony',
      3: 'creativity and self-expression',
      4: 'stability and hard work',
      5: 'freedom and adventure',
      6: 'service and responsibility',
      7: 'spirituality and wisdom',
      8: 'material success and authority',
      9: 'humanitarianism and completion'
    }
    return focuses[number] || 'your unique path'
  }

  private getDreamSymbols(): string {
    const symbols = ['transformation', 'new beginnings', 'hidden wisdom', 'emotional healing', 'spiritual growth']
    return symbols[Math.floor(Math.random() * symbols.length)]
  }

  private getDreamMeaning(): string {
    const meanings = ['important life changes', 'unresolved emotions', 'spiritual guidance', 'creative inspiration', 'relationship insights']
    return meanings[Math.floor(Math.random() * meanings.length)]
  }

  private getLifePathPurpose(number: number): string {
    const purposes: { [key: number]: string } = {
      1: 'lead and inspire others',
      2: 'bring peace and cooperation',
      3: 'express creativity and joy',
      4: 'build solid foundations',
      5: 'explore and experience freedom',
      6: 'serve and nurture others',
      7: 'seek spiritual wisdom',
      8: 'achieve material success',
      9: 'help humanity evolve'
    }
    return purposes[number] || 'fulfill your unique destiny'
  }

  /**
   * Calculate API cost
   */
  private calculateCost(tokens: number): number {
    // GPT-4 pricing: $0.03 per 1K tokens
    return (tokens / 1000) * 0.03
  }

  /**
   * Check if OpenAI is available
   */
  isAvailable(): boolean {
    return !!this.apiKey
  }
}

// Export singleton instance
export const openaiService = new OpenAIService()
