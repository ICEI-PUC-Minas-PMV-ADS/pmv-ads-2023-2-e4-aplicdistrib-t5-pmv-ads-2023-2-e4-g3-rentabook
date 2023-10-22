import { useApi } from "../hooks/useApi"

export const bookService = {
  searchBook: async (search: string) => {
    let formatedSearch = search.replace(" ", "+")
    const link = "/public/books/find?search=" + formatedSearch
    const response = await useApi.get(link)
    return response.data
  }
}