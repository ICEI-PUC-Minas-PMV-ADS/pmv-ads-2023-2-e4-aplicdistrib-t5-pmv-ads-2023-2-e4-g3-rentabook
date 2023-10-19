import axios from 'axios';
import env from 'react-dotenv';

export const useApi = axios.create(
  {
    baseURL: env.API,
  }
)