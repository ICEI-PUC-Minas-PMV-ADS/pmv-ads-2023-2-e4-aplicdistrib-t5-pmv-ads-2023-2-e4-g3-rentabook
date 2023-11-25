import axios from 'axios';
import { API } from '@env'
import { Platform } from 'react-native';

export const useApi = axios.create(
  {
    baseURL: Platform.OS === 'web' ? API : "http://10.0.2.2:8080",
  }
)