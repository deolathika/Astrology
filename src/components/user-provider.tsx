'use client'

interface User {
  id?: string
  fullName?: string
  email?: string
  birthDate?: string
  birthTime?: string
  birthPlace?: string
  latitude?: number
  longitude?: number
  timezone?: string
}

interface UserContextType {
  user: User | null
  loadUser: () => void
  saveUser: (userData: User) => void
  clearUser: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const loadUser = () => {
    try {
      const savedUser = localStorage.getItem('daily-secrets-user')
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
    } catch (error) {
      }
  }

  const saveUser = (userData: User) => {
    try {
      setUser(userData)
      localStorage.setItem('daily-secrets-user', JSON.stringify(userData))
    } catch (error) {
      }
  }

  const clearUser = () => {
    try {
      setUser(null)
      localStorage.removeItem('daily-secrets-user')
    } catch (error) {
      }
  }

  useEffect(() => {
    loadUser()
  }, [])

  return (
    <UserContext.Provider value={{ user, loadUser, saveUser, clearUser }}>
      {children}
    </UserContext.Provider>
  )
}
