import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from 'react'

const ADMIN_LOGIN = 'pocai'
const ADMIN_PASSWORD = '@Grafica1525'
const ADMIN_SESSION_KEY = 'grafica-pedreira-admin-session'

type AdminAuthContextValue = {
  isAuthenticated: boolean
  login: (login: string, password: string) => boolean
  logout: () => void
}

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null)

export const AdminAuthProvider = ({ children }: PropsWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    setIsAuthenticated(window.localStorage.getItem(ADMIN_SESSION_KEY) === 'true')
  }, [])

  const value = useMemo<AdminAuthContextValue>(
    () => ({
      isAuthenticated,
      login: (login, password) => {
        const canEnter = login.trim().toLowerCase() === ADMIN_LOGIN && password === ADMIN_PASSWORD

        if (canEnter) {
          window.localStorage.setItem(ADMIN_SESSION_KEY, 'true')
          setIsAuthenticated(true)
        }

        return canEnter
      },
      logout: () => {
        window.localStorage.removeItem(ADMIN_SESSION_KEY)
        setIsAuthenticated(false)
      },
    }),
    [isAuthenticated],
  )

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
}

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext)

  if (!context) {
    throw new Error('useAdminAuth must be used inside AdminAuthProvider')
  }

  return context
}
