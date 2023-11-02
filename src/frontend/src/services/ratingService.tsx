import AsyncStorage from "@react-native-async-storage/async-storage"
import { useApi } from "../hooks/useApi"
import { RatingForm } from "../types/RatingForm"

export const ratingService = {
  getAllByAnnouncementId: async (id: string, page: number | null) => {
    let link = `/rating/announcement/${id}`
    if (page != null) {
      link = link + `?page=${page}`
    }
    const response = await useApi.get(link)
    return response.data
  },

  createRating: async (form: RatingForm) => {
    const token = await AsyncStorage.getItem('authToken')
    const json = JSON.stringify(form)
    const response = await useApi.post("/rating", json, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    return response;
  }
}