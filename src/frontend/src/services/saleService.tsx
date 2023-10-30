import AsyncStorage from "@react-native-async-storage/async-storage";
import { useApi } from "../hooks/useApi"
import { NegotiationForm } from "../types/NegotiationForm";

export const saleService = {
  create: async (form: NegotiationForm) => {
    const token = await AsyncStorage.getItem('authToken')
    const json = JSON.stringify(form)
    const response = await useApi.post("/sales/create", json, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      }
    })
    return response;
  }
}