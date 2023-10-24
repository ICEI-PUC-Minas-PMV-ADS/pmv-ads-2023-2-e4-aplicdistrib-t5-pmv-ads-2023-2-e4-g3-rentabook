import { useApi } from "../hooks/useApi"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const addressService = {
  getPrivateAddress: async (id: string) => {
    const token = await AsyncStorage.getItem('authToken')
    const response = await useApi.get('/address/' + id, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return response.data
  }
}