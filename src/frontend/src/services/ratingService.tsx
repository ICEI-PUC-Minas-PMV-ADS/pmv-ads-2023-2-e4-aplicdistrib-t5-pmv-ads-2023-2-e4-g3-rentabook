import { useApi } from "../hooks/useApi"

export const ratingService = {
  getAllByAnnouncementId: async (id: string, page: number | null) => {
    let link = `/rating/announcement/${id}`
    if (page != null) {
      link = link + `?page=${page}`
    }
    const response = await useApi.get(link)
    return response.data
  }
}