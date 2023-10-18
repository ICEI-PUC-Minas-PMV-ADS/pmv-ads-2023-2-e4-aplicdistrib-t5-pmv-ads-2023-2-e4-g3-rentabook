import axios from 'axios';


export const useApi = axios.create(
  {
    baseURL: process.env.RENTABOOK_API,
    headers: {
      'Content-Type': 'application/json',
    }
  }
)