import React, { useState } from 'react'
import { useAdminAuth } from '../hooks/useAdminAuth'
import './AdminLogin.css'

const AdminLogin = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAdminAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password)
      onLoginSuccess()
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <h1>Admin Login</h1>
        
        {error && <div className="admin-error">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="admin-form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <button type="submit" disabled={loading} className="admin-btn">
            {loading ? 'Cargando...' : 'Login'}
          </button>
        </form>

        <p className="admin-hint">Usa tus credenciales de admin</p>
      </div>
    </div>
  )
}

export default AdminLogin
