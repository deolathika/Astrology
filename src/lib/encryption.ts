import crypto from 'crypto'

// Encryption configuration
const ALGORITHM = 'aes-256-gcm'
const KEY_LENGTH = 32
const IV_LENGTH = 16
const TAG_LENGTH = 16

// Get encryption key from environment
function getEncryptionKey(): Buffer {
  const key = process.env.ENCRYPTION_KEY
  if (!key) {
    throw new Error('ENCRYPTION_KEY environment variable is required')
  }
  
  // Ensure key is the correct length
  if (key.length !== KEY_LENGTH * 2) { // *2 because hex encoding
    throw new Error('ENCRYPTION_KEY must be 64 characters (32 bytes)')
  }
  
  return Buffer.from(key, 'hex')
}

// Encrypt sensitive data
export function encryptPII(data: string): string {
  try {
    const key = getEncryptionKey()
    const iv = crypto.randomBytes(IV_LENGTH)
    const cipher = crypto.createCipher(ALGORITHM, key)
    cipher.setAAD(Buffer.from('daily-secrets-pii', 'utf8'))
    
    let encrypted = cipher.update(data, 'utf8', 'hex')
    encrypted += cipher.final('hex')
    
    const tag = cipher.getAuthTag()
    
    // Combine IV + tag + encrypted data
    return iv.toString('hex') + tag.toString('hex') + encrypted
  } catch (error) {
    throw new Error(`Encryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

// Decrypt sensitive data
export function decryptPII(encryptedData: string): string {
  try {
    const key = getEncryptionKey()
    
    // Extract components
    const iv = Buffer.from(encryptedData.slice(0, IV_LENGTH * 2), 'hex')
    const tag = Buffer.from(encryptedData.slice(IV_LENGTH * 2, (IV_LENGTH + TAG_LENGTH) * 2), 'hex')
    const encrypted = encryptedData.slice((IV_LENGTH + TAG_LENGTH) * 2)
    
    const decipher = crypto.createDecipher(ALGORITHM, key)
    decipher.setAAD(Buffer.from('daily-secrets-pii', 'utf8'))
    decipher.setAuthTag(tag)
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    
    return decrypted
  } catch (error) {
    throw new Error(`Decryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

// Hash sensitive data for searching (one-way)
export function hashPII(data: string): string {
  const salt = process.env.HASH_SALT || 'daily-secrets-salt'
  return crypto.createHmac('sha256', salt).update(data).digest('hex')
}

// Mask PII for display
export function maskPII(data: string, type: 'email' | 'phone' | 'name' = 'email'): string {
  switch (type) {
    case 'email':
      const [local, domain] = data.split('@')
      return `${local.slice(0, 2)}***@${domain}`
    
    case 'phone':
      return data.replace(/(\d{3})\d{3}(\d{4})/, '$1***$2')
    
    case 'name':
      const parts = data.split(' ')
      return parts.map(part => part.slice(0, 1) + '*'.repeat(part.length - 1)).join(' ')
    
    default:
      return '*'.repeat(data.length)
  }
}

// Generate encryption key (for setup)
export function generateEncryptionKey(): string {
  return crypto.randomBytes(KEY_LENGTH).toString('hex')
}

// Validate encryption key format
export function validateEncryptionKey(key: string): boolean {
  return key.length === KEY_LENGTH * 2 && /^[0-9a-f]+$/i.test(key)
}


