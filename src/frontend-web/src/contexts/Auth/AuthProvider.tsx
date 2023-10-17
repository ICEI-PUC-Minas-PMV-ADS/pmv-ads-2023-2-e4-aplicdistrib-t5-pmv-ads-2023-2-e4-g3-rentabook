import { useState, useEffect } from 'react'
import { PrivateUser } from "../../types/PrivateUser";
import { AuthContext } from "./AuthContext";
import { LoginForm } from '../../types/LoginForm';
import { userService } from '../../services/userService';
import Login from '../../pages/Login';

export const AuthProvider = ({ children }: { children: JSX.Element }) => {

  const [user, setUser] = useState<PrivateUser | null>(null)

  useEffect(() => {
    const validarToken = async () => {
      const tokenLocalStorage = localStorage.getItem('authToken')
      if (tokenLocalStorage) {
        const userData = await userService.getPrivateUser().catch(e => {
          alert('Sessão expirada!')
          localStorage.removeItem('authToken')
          setUser(null)
        })
        if (userData.id) {
          setUser(userData)
        }
      }
    }
    validarToken()
  }, []);

  const login = async (form: LoginForm) => {
    const data = await userService.login(form)
    if (data.token) {
      setToken(data.token)
      const userData = await userService.getPrivateUser()
      setUser(userData)
      return true;
    }
    return false;
  }

  const logout = async () => {
    await userService.logout()
    setUser(null)
  }

  const setToken = (token: string) => {
    localStorage.setItem('authToken', token)
  }



  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

