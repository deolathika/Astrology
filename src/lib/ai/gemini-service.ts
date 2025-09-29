/**
 * Google Gemini Integration Service for Daily Secrets App
 * Alternative AI provider for cosmic content generation
 */

export interface GeminiContentRequest {
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

export interface GeminiContentResponse {
  content: string
  source: 'gemini' | 'offline'
  tokens: number
  cost: number
  timestamp: Date
}

export class GeminiService {
  private apiKey: string
  private baseUrl: string
  private model: string

  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY || ''
    this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta'
    this.model = 'gemini-pro'
  }

  /**
   * Generate daily cosmic guidance using Gemini
   */
  async generateDailyGuidance(request: GeminiContentRequest): Promise<GeminiContentResponse> {
    const prompt = this.buildDailyGuidancePrompt(request)
    
    try {
      const response = await this.callGemini(prompt)
      return {
        content: response.content,
        source: 'gemini',
        tokens: response.usageMetadata?.totalTokenCount || 0,
        cost: this.calculateCost(response.usageMetadata?.totalTokenCount || 0),
        timestamp: new Date()
      }
    } catch (error) {
      console.error('Gemini API error:', error)
      return this.getOfflineContent(request)
    }
  }

  /**
   * Interpret dreams using Gemini
   */
  async interpretDream(request: GeminiContentRequest): Promise<GeminiContentResponse> {
    const prompt = this.buildDreamInterpretationPrompt(request)
    
    try {
      const response = await this.callGemini(prompt)
      return {
        content: response.content,
        source: 'gemini',
        tokens: response.usageMetadata?.totalTokenCount || 0,
        cost: this.calculateCost(response.usageMetadata?.totalTokenCount || 0),
        timestamp: new Date()
      }
    } catch (error) {
      console.error('Gemini API error:', error)
      return this.getOfflineContent(request)
    }
  }

  /**
   * Generate compatibility analysis using Gemini
   */
  async generateCompatibility(request: GeminiContentRequest): Promise<GeminiContentResponse> {
    const prompt = this.buildCompatibilityPrompt(request)
    
    try {
      const response = await this.callGemini(prompt)
      return {
        content: response.content,
        source: 'gemini',
        tokens: response.usageMetadata?.totalTokenCount || 0,
        cost: this.calculateCost(response.usageMetadata?.totalTokenCount || 0),
        timestamp: new Date()
      }
    } catch (error) {
      console.error('Gemini API error:', error)
      return this.getOfflineContent(request)
    }
  }

  /**
   * Call Gemini API
   */
  private async callGemini(prompt: string) {
    if (!this.apiKey) {
      throw new Error('Gemini API key not configured')
    }

    const response = await fetch(`${this.baseUrl}/models/${this.model}:generateContent?key=${this.apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1000,
        },
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          }
        ]
      })
    })

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`)
    }

    const data = await response.json()
    return {
      content: data.candidates?.[0]?.content?.parts?.[0]?.text || '',
      usageMetadata: data.usageMetadata
    }
  }

  /**
   * Build daily guidance prompt for Gemini
   */
  private buildDailyGuidancePrompt(request: GeminiContentRequest): string {
    const { userProfile, context } = request
    const today = new Date().toLocaleDateString()
    
    return `You are a wise cosmic counselor. Generate personalized daily cosmic guidance for ${userProfile.name}, a ${userProfile.zodiacSign} with Life Path ${userProfile.lifePath} from ${userProfile.location}.

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
   * Build dream interpretation prompt for Gemini
   */
  private buildDreamInterpretationPrompt(request: GeminiContentRequest): string {
    const { userProfile, context } = request
    
    return `You are a skilled dream interpreter. Interpret this dream for ${userProfile.name}, a ${userProfile.zodiacSign} with Life Path ${userProfile.lifePath}:

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
   * Build compatibility prompt for Gemini
   */
  private buildCompatibilityPrompt(request: GeminiContentRequest): string {
    const { userProfile, context } = request
    
    return `You are an expert in relationship compatibility. Analyze the compatibility between ${userProfile.name} (${userProfile.zodiacSign}, Life Path ${userProfile.lifePath}) and their partner based on:

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
  private getOfflineContent(request: GeminiContentRequest): GeminiContentResponse {
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
  private generateOfflineContent(request: GeminiContentRequest): string {
    const { userProfile, contentType } = request
    const today = new Date()
    
    const templates = {
      daily_guidance: `Dear ${userProfile.name}, today's cosmic energy brings new opportunities for growth. As a ${userProfile.zodiacSign}, you're naturally inclined toward leadership and initiative. Your Life Path ${userProfile.lifePath} suggests focusing on your unique path. The universe supports your journey today.`,
      
      dream_interpretation: `Your dream reveals important insights about your current life path. The symbols you encountered represent transformation and new beginnings. This suggests you're processing important life changes. Trust your intuition and pay attention to recurring themes.`,
      
      compatibility: `Your cosmic connection shows strong potential for harmony. Your ${userProfile.zodiacSign} energy complements your partner's energy well. Focus on communication and understanding each other's needs.`,
      
      numerology_insight: `Your Life Path ${userProfile.lifePath} reveals your soul's purpose. You're here to fulfill your unique destiny. Trust in your natural abilities and follow your heart's calling.`
    }
    
    return templates[contentType] || templates.daily_guidance
  }

  /**
   * Calculate API cost
   */
  private calculateCost(tokens: number): number {
    // Gemini pricing: Free tier available, $0.0005 per 1K tokens for paid tier
    return (tokens / 1000) * 0.0005
  }

  /**
   * Check if Gemini is available
   */
  isAvailable(): boolean {
    return !!this.apiKey
  }
}

// Export singleton instance
export const geminiService = new GeminiService()
