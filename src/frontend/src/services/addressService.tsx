import { useApi } from "../hooks/useApi"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { PrivateAddress } from "../types/PrivateAddress"

export const addressService = {
  getPrivateAddress: async (id: string) => {
    const token = await AsyncStorage.getItem('authToken')
    const response = await useApi.get('/address/' + id, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return response.data
  },
  
  savePrivateAddress: async (form: PrivateAddress) => {
    const token = await AsyncStorage.getItem('authToken')
    const json = JSON.stringify(form)
    const response =  await useApi.post("/address", json, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
    return response.data
  },

  updatePrivateAddress: async (form: PrivateAddress) => {
    const token = await AsyncStorage.getItem('authToken')
    const json = JSON.stringify(form)
    const response =  await useApi.post("/address", json, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
    return response.data
  },

  deletePrivateAddress: async (id: string) => {
    const token = await AsyncStorage.getItem('authToken')
    const response =  await useApi.delete(`/address/${id}`,{
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
    return response.data
  }
}

