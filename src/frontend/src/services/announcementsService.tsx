import { useApi } from "../hooks/useApi";

export const announcementsService = {

  getAnnouncements: async (city: string | null, bookId: string | null, rent: boolean | null, trade: boolean | null, sale: boolean | null, sort: string | null, page: number | null) => {
    let query = `/announcements/find`
    if (city != null || bookId != null || rent != null || trade != null || sale != null || sort != null || page != null) {
      query = query + "?"
    }
    if (city != null) {
      query = query + `city=${city}&`
    }
    if (bookId != null) {
      query = query + `bookId=${bookId}&`
    }
    if (rent != null) {
      query = query + `rent=${rent}&`
    }
    if (trade != null) {
      query = query + `trade=${trade}&`
    }
    if (sale != null) {
      query = query + `sale=${sale}&`
    }
    if (sort != null) {
      query = query + `sort=${sort}&`
    }
    if (page != null) {
      query = query + `page=${page}&`
    }
    const response = await useApi.get(query)
    return response.data;
  }

}