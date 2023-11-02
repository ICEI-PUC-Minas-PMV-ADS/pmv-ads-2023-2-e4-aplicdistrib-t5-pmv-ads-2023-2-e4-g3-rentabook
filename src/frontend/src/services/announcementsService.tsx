import AsyncStorage from "@react-native-async-storage/async-storage";
import { useApi } from "../hooks/useApi";
import { AnnouncementView } from './../pages/MyAnnouncements/components/AnnouncementView';

export const announcementsService = {

  getAnnouncements: async (city: string | null, bookId: string | null, rent: boolean | null, trade: boolean | null, sale: boolean | null, sort: string | null, page: number | null) => {
    let query = `/announcements/find`
    if (city != null || bookId != null || rent != null || trade != null || sale != null || sort != null || page != null) {
      query = query + "?"
    }
    if (city != null) {
      query = query + `city=${city}&`
    }
    if (bookId != null && bookId != "") {
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
    if (sort != null && sort != "") {
      query = query + `${sort}&`
    }
    if (page != null) {
      query = query + `page=${page}&`
    }
    const response = await useApi.get(query)
    return response.data;
  },

  getMyOwnAnnouncements: async (page: number | null) => {
    let query = "/announcements/own";
    if (page) { query += `?page=${page}`; }

    const token = await AsyncStorage.getItem('authToken');
    const response = await useApi.get(query, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  },

  createAnnouncement: async ({
    bookId,
    description,
    images,
    valueForSale,
    valueForRent,
    locationId,
    rent,
    trade,
    sale,
  }: {
    bookId: string,
    description: string,
    images: string[],
    valueForSale?: string | null,
    valueForRent?: string | null,
    locationId: string,
    rent: boolean,
    trade: boolean,
    sale: boolean,
  }) => {
    const body = {
      bookId,
      description,
      images,
      valueForSale,
      valueForRent,
      locationId,
      rent,
      trade,
      sale,
    };
    const jsonBody = JSON.stringify(body);
    const token = await AsyncStorage.getItem('authToken');
    const response = await useApi.post("/announcements/new", jsonBody, {
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json; chatset=utf-8",
      }
    });
    return response.data;
  },

  updateAnnouncement: async (announcementId: string, {
    bookId,
    description,
    images,
    valueForSale,
    valueForRent,
    locationId,
    rent,
    trade,
    sale,
  }: {
    bookId: string,
    description: string,
    images: string[],
    valueForSale?: string | null,
    valueForRent?: string | null,
    locationId: string,
    rent: boolean,
    trade: boolean,
    sale: boolean,
  }) => {
    const body = {
      bookId,
      description,
      images,
      valueForSale,
      valueForRent,
      locationId,
      rent,
      trade,
      sale,
    };
    const jsonBody = JSON.stringify(body);
    const token = await AsyncStorage.getItem('authToken');
    const response = await useApi.post(`/announcements/${announcementId}`, jsonBody, {
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json; chatset=utf-8",
      }
    });
    return response.data;
  },

  getAnnouncementById: async (announcementId: string) => {
    const token = await AsyncStorage.getItem('authToken');
    const response = await useApi.get(`/announcements/clean/${announcementId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json; chatset=utf-8",
      }
    });
    return response.data;
  },

  uploadImage: async (formData: FormData) => {
    const token = await AsyncStorage.getItem('authToken');
    const response = await useApi.post(`/image/upload`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "multipart/form-data; chatset=utf-8",
      }
    });
    return response.data;
  },
}