import { useState, useEffect } from 'react'
import { PrivateUser } from "../../types/PrivateUser";
import { AuthContext } from "./AuthContext";
import { LoginForm } from '../../types/LoginForm';
import { userService } from '../../services/userService';
import { RegisterForm } from '../../types/RegisterForm';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthProvider = ({ children }: { children: JSX.Element }) => {

  const [user, setUser] = useState<PrivateUser | null>(null)

  useEffect(() => {
    const validarToken = async () => {
      const tokenLocalStorage = await AsyncStorage.getItem('authToken')
      if (tokenLocalStorage) {
        const userData = await userService.getPrivateUser().catch(e => {
          alert('Sessão expirada!')
          AsyncStorage.removeItem('authToken')
          setUser(null)
        })
        if (userData) {
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
    const data = await userService.logout()
    if (data.status == 200) {
      setUser(null)
      await AsyncStorage.removeItem('authToken')
      return true
    }
    return false
  }

  const signup = async (form: RegisterForm) => {
    const data = await userService.signup(form)
    if (data.token) {
      setToken(data.token)
      const userData = await userService.getPrivateUser()
      setUser(userData)
      return true;
    }
    return false;
  }

  const setToken = (token: string) => {
    AsyncStorage.setItem('authToken', token)
  }



  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  )
}

