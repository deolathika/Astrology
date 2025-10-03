import { DefaultSession, DefaultUser } from 'next-auth'
import { JWT, DefaultJWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name: string
      email: string
      role: string
      image?: string
    } & DefaultSession['user']
  }

  interface User extends DefaultUser {
    id: string
    name: string
    email: string
    role: string
    password?: string
    image?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string
    role: string
  }
}

export interface ExtendedUser {
  id: string
  name: string
  email: string
  role: string
  password?: string
  image?: string
  fullName?: string
  birthDate?: Date
  birthTime?: string
  birthPlace?: string
  latitude?: number
  longitude?: number
  timezone?: string
}
