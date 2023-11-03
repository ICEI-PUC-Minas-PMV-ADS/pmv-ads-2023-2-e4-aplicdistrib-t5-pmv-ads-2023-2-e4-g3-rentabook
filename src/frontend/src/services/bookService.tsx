import { useApi } from "../hooks/useApi"

export const bookService = {
  searchBook: async (search: string) => {
    let formatedSearch = search.replace(" ", "+")
    const link = "/public/books/find?search=" + formatedSearch
    const response = await useApi.get(link)
    return response.data
  },

  pageableSearchBook: async (search: string, page: number) => {
    let formatedSearch = search.replace(" ", "+")
    let link = "/public/books/find?search=" + formatedSearch
    if (page > 0) {
      link += `&page=${page}`;
    }
    const response = await useApi.get(link)
    return response.data
  }
}