/**
 * Community Features with Emoji Chat System
 * Provides safe, moderated community interaction
 */

export interface ChatMessage {
  id: string
  fromId: string
  toId: string
  body: string
  emojiOnly: boolean
  queued: boolean
  createdAt: string
  reactions: MessageReaction[]
  isModerated: boolean
}

export interface MessageReaction {
  emoji: string
  userId: string
  timestamp: string
}

export interface CommunityUser {
  id: string
  name: string
  avatar: string
  zodiacSign: string
  isOnline: boolean
  lastSeen: string
  consentGiven: boolean
  isBlocked: boolean
}

export interface ConsentData {
  userId: string
  chatEnabled: boolean
  profileVisible: boolean
  dataSharing: boolean
  marketingEmails: boolean
  timestamp: string
}

export class EmojiChatSystem {
  private messages: Map<string, ChatMessage[]> = new Map()
  private users: Map<string, CommunityUser> = new Map()
  private consent: Map<string, ConsentData> = new Map()
  private moderationQueue: ChatMessage[] = []
  
  // Allowed emojis for safe communication
  private allowedEmojis = [
    '😊', '😄', '😍', '🥰', '😘', '😉', '😎', '🤗', '🤔', '😌',
    '😴', '😋', '🤤', '😏', '😒', '😔', '😢', '😭', '😤', '😡',
    '🤯', '😱', '😨', '😰', '😳', '🤪', '😜', '😝', '🤨', '🧐',
    '🤓', '😇', '🤠', '🥳', '🤩', '😻', '🤗', '🤝', '👏', '🙌',
    '👍', '👎', '❤️', '💕', '💖', '💗', '💙', '💚', '💛', '🧡',
    '💜', '🖤', '🤍', '💔', '💯', '✨', '🌟', '⭐', '🌙', '☀️',
    '🌈', '🔥', '💧', '🌊', '🌱', '🌸', '🌺', '🌻', '🌷', '🌹',
    '🍀', '🌿', '🌾', '🌵', '🌲', '🌳', '🌴', '🌰', '🍎', '🍊',
    '🍋', '🍌', '🍉', '🍇', '🍓', '🍒', '🍑', '🥭', '🍍', '🥥',
    '🥝', '🍅', '🥕', '🌽', '🌶️', '🥒', '🥬', '🥦', '🍄', '🥜',
    '🌰', '🍞', '🥐', '🥖', '🥨', '🥯', '🧀', '🥚', '🍳', '🥞',
    '🧇', '🥓', '🥩', '🍗', '🍖', '🦴', '🌭', '🍔', '🍟', '🍕',
    '🥪', '🥙', '🌮', '🌯', '🥗', '🥘', '🍝', '🍜', '🍲', '🍛',
    '🍣', '🍱', '🥟', '🍤', '🍙', '🍚', '🍘', '🍥', '🥠', '🍢',
    '🍡', '🍧', '🍨', '🍦', '🥧', '🧁', '🍰', '🎂', '🍮', '🍭',
    '🍬', '🍫', '🍩', '🍪', '🌰', '🥜', '🍯', '🥛', '🍼', '☕',
    '🍵', '🥤', '🍶', '🍺', '🍻', '🥂', '🍷', '🥃', '🍸', '🍹',
    '🧊', '🥄', '🍴', '🍽️', '🥢', '🔪', '🏺', '🌍', '🌎', '🌏',
    '🌐', '🗺️', '🧭', '🏔️', '⛰️', '🌋', '🗻', '🏕️', '⛺', '🏠',
    '🏡', '🏘️', '🏚️', '🏗️', '🏭', '🏢', '🏬', '🏣', '🏤', '🏥',
    '🏦', '🏨', '🏪', '🏫', '🏩', '💒', '🏛️', '⛪', '🕌', '🕍',
    '🕋', '⛩️', '🛤️', '🛣️', '🗾', '🎑', '🏞️', '🌅', '🌄', '🌠',
    '🌌', '⛅', '⛈️', '🌤️', '🌦️', '🌧️', '⛈️', '🌩️', '🌨️', '❄️',
    '☃️', '⛄', '🌬️', '💨', '💧', '💦', '☔', '☂️', '🌊', '🌫️'
  ]

  /**
   * Send emoji message
   */
  async sendMessage(
    fromId: string,
    toId: string,
    emoji: string,
    consentGiven: boolean = false
  ): Promise<ChatMessage | null> {
    if (!consentGiven) {
      throw new Error('Consent required for community chat')
    }

    if (!this.isValidEmoji(emoji)) {
      throw new Error('Invalid emoji - only approved emojis allowed')
    }

    const message: ChatMessage = {
      id: this.generateId(),
      fromId,
      toId,
      body: emoji,
      emojiOnly: true,
      queued: false,
      createdAt: new Date().toISOString(),
      reactions: [],
      isModerated: false
    }

    // Add to moderation queue for review
    this.moderationQueue.push(message)
    
    // Auto-approve safe emojis
    if (this.isSafeEmoji(emoji)) {
      message.isModerated = true
      this.addMessageToChat(message)
    }

    return message
  }

  /**
   * Add reaction to message
   */
  async addReaction(
    messageId: string,
    userId: string,
    emoji: string
  ): Promise<boolean> {
    if (!this.isValidEmoji(emoji)) {
      return false
    }

    const message = this.findMessage(messageId)
    if (!message) return false

    // Remove existing reaction from this user
    message.reactions = message.reactions.filter(r => r.userId !== userId)
    
    // Add new reaction
    message.reactions.push({
      emoji,
      userId,
      timestamp: new Date().toISOString()
    })

    return true
  }

  /**
   * Get chat history between users
   */
  getChatHistory(userId1: string, userId2: string): ChatMessage[] {
    const chatKey = this.getChatKey(userId1, userId2)
    return this.messages.get(chatKey) || []
  }

  /**
   * Get online users
   */
  getOnlineUsers(): CommunityUser[] {
    return Array.from(this.users.values()).filter(user => user.isOnline)
  }

  /**
   * Update user consent
   */
  updateConsent(userId: string, consent: ConsentData): void {
    this.consent.set(userId, consent)
  }

  /**
   * Check if user has given consent
   */
  hasConsent(userId: string): boolean {
    const userConsent = this.consent.get(userId)
    return userConsent?.chatEnabled || false
  }

  /**
   * Discover potential connections
   */
  discoverConnections(userId: string, preferences: {
    zodiacSigns?: string[]
    maxDistance?: number
    ageRange?: [number, number]
  }): CommunityUser[] {
    const user = this.users.get(userId)
    if (!user) return []

    const allUsers = Array.from(this.users.values())
    return allUsers
      .filter(u => u.id !== userId && u.consentGiven && !u.isBlocked)
      .filter(u => {
        if (preferences.zodiacSigns && preferences.zodiacSigns.length > 0) {
          return preferences.zodiacSigns.includes(u.zodiacSign)
        }
        return true
      })
      .slice(0, 10) // Limit to 10 suggestions
  }

  /**
   * Moderate messages
   */
  moderateMessages(): ChatMessage[] {
    const approved: ChatMessage[] = []
    const rejected: ChatMessage[] = []

    for (const message of this.moderationQueue) {
      if (this.isSafeMessage(message)) {
        message.isModerated = true
        this.addMessageToChat(message)
        approved.push(message)
      } else {
        rejected.push(message)
      }
    }

    this.moderationQueue = []
    return approved
  }

  /**
   * Get moderation queue
   */
  getModerationQueue(): ChatMessage[] {
    return this.moderationQueue
  }

  /**
   * Block user
   */
  blockUser(userId: string, blockedUserId: string): void {
    const user = this.users.get(userId)
    if (user) {
      user.isBlocked = true
    }
  }

  /**
   * Report message
   */
  reportMessage(messageId: string, reason: string): void {
    const message = this.findMessage(messageId)
    if (message) {
      // Add to moderation queue for review
      this.moderationQueue.push(message)
    }
  }

  /**
   * Get community stats
   */
  getCommunityStats(): {
    totalUsers: number
    onlineUsers: number
    totalMessages: number
    pendingModeration: number
  } {
    const totalUsers = this.users.size
    const onlineUsers = Array.from(this.users.values()).filter(u => u.isOnline).length
    const totalMessages = Array.from(this.messages.values()).flat().length
    const pendingModeration = this.moderationQueue.length

    return {
      totalUsers,
      onlineUsers,
      totalMessages,
      pendingModeration
    }
  }

  // Private helper methods

  private isValidEmoji(emoji: string): boolean {
    return this.allowedEmojis.includes(emoji)
  }

  private isSafeEmoji(emoji: string): boolean {
    const safeEmojis = ['😊', '😄', '😍', '🥰', '😘', '😉', '😎', '🤗', '❤️', '💕', '💖', '💗', '💙', '💚', '💛', '🧡', '💜', '✨', '🌟', '⭐', '🌙', '☀️', '🌈', '🔥', '💧', '🌊', '🌱', '🌸', '🌺', '🌻', '🌷', '🌹', '🍀', '🌿', '🌾', '👍', '👏', '🙌', '🤝']
    return safeEmojis.includes(emoji)
  }

  private isSafeMessage(message: ChatMessage): boolean {
    return this.isSafeEmoji(message.body)
  }

  private addMessageToChat(message: ChatMessage): void {
    const chatKey = this.getChatKey(message.fromId, message.toId)
    const messages = this.messages.get(chatKey) || []
    messages.push(message)
    this.messages.set(chatKey, messages)
  }

  private getChatKey(userId1: string, userId2: string): string {
    return [userId1, userId2].sort().join('_')
  }

  private findMessage(messageId: string): ChatMessage | null {
    for (const messages of Array.from(this.messages.values())) {
      const message = messages.find((m: any) => m.id === messageId)
      if (message) return message
    }
    return null
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9)
  }
}

// Export singleton instance
export const emojiChatSystem = new EmojiChatSystem()



