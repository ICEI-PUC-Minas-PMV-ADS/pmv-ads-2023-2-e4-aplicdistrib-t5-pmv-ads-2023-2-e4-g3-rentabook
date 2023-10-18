import { useApi } from "../hooks/useApi";
import axios from 'axios';
import { LoginForm } from "../types/LoginForm";
import { RegisterForm } from "../types/RegisterForm";

export const userService = {
  login: async (form: LoginForm) => {
    const json = JSON.stringify(form)
    const response = await useApi.post("/login", json);
    return response.data;
  }, // NÃO USAR ESSA FUNÇÃO DIRETAMENTE, USE O AUTHCONTEXT

  register: async (form: RegisterForm) => {
    const response = await useApi.post("/register", form);
    return response.data;
  },

  getPrivateUser: async () => {
    const token = localStorage.getItem('authToken')
    const response = await useApi.get("/user", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return response.data;
  },

  logout: async () => {
    const response = await useApi.post("/leave")
    return response.data;
  }, // NÃO USAR ESSA FUNÇÃO DIRETAMENTE, USE O AUTHCONTEXT
}