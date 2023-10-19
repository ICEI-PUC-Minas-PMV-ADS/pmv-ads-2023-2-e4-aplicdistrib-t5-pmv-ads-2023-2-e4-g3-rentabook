import { useApi } from "../hooks/useApi";
import { LoginForm } from "../types/LoginForm";
import { RegisterForm } from "../types/RegisterForm";
import AsyncStorage from '@react-native-async-storage/async-storage';


export const userService = {
  login: async (form: LoginForm) => {
    const json = JSON.stringify(form)
    const response = await useApi.post("/login", json, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  }, // NÃO USAR ESSA FUNÇÃO DIRETAMENTE, USE O AUTHCONTEXT

  signup: async (form: RegisterForm) => {
    const json = JSON.stringify(form)
    const response = await useApi.post("/register", json, {
      headers: {
        'Content-Type': 'application/json'
      },
    });
    return response.data;
  },// NÃO USAR ESSA FUNÇÃO DIRETAMENTE, USE O AUTHCONTEXT

  getPrivateUser: async () => {
    const token = await AsyncStorage.getItem('authToken')
    const response = await useApi.get("/user", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return response.data;
  },

  logout: async () => {
    const body = JSON.stringify({})
    const token = await AsyncStorage.getItem('authToken')
    const response = await useApi.post("/leave", body, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    return response;
  }, // NÃO USAR ESSA FUNÇÃO DIRETAMENTE, USE O AUTHCONTEXT
}