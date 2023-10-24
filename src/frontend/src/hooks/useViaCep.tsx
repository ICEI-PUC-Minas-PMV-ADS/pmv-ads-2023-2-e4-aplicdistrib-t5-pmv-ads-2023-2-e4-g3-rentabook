import axios from 'axios';
import { VIA_CEP } from '@env'
import { ViaCep } from '../types/ViaCep';

export const useViaCep = async (cep: string) => {
  const response = await axios.get(VIA_CEP + `/${cep}/json`)
  const data: ViaCep = response.data
  return data
}
