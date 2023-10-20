import { useApi } from "../hooks/useApi";

export const announcementsService = {
  getAnnouncements: async (city?: string, bookId?: string, rent?: boolean, trade?: boolean, sale?: boolean, sort?: string, page?: number) => {
    let query = `/announcements/find?`
    if (city) {
      query = query + `city=${city}&`
    }
    if (bookId) {
      query = query + `bookId=${bookId}&`
    }
    if (rent) {
      query = query + `rent=${rent}&`
    }
    if (trade) {
      query = query + `trade=${trade}&`
    }
    if (sale) {
      query = query + `sale=${sale}&`
    }
    if (sort) {
      query = query + `sort=${sort}&`
    }
    if (page) {
      query = query + `page=${page}&`
    }
    const response = await useApi.get(query)
    return response;
  }
}