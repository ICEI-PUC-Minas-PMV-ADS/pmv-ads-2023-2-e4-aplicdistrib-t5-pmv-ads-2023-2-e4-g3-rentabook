import axios from 'axios';
import { API } from '@env'

export const useApi = axios.create(
  {
    baseURL: API,
  }
)