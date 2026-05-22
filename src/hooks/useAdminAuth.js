import { useState, useEffect } from 'react'

const ADMIN_EMAIL = 'admin@tienda.com'
const ADMIN_PASSWORD = 'Admin123456'
const STORAGE_KEY = 'tienda-admin-user'

const loadUser = () => {
  if (typeof window === 'undefined') return null
  const stored = window.localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : null
}

export const useAdminAuth = () => {
  const [user, setUser] = useState(loadUser())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setUser(loadUser())
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    setError(null)
    setLoading(true)

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
          const userData = { email }
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(userData))
          setUser(userData)
          setLoading(false)
          resolve(userData)
        } else {
          const errorMessage = 'Credenciales inválidas. Usa admin@tienda.com / Admin123456'
          setError(errorMessage)
          setLoading(false)
          reject(new Error(errorMessage))
        }
      }, 500)
    })
  }

  const logout = async () => {
    window.localStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }

  return { user, loading, error, login, logout }
}
