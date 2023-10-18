import axios from 'axios';


export const useApi = axios.create(
  {
    baseURL: '',
    headers: {
      'Content-Type': 'application/json',
    }
  }
)