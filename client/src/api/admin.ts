import { Coin } from '../types';
import { clientApi } from './client-api';

export const fetchAllCoinsFromApi = async () => {
  return clientApi
    .post<Coin>(`/coins/AllFromApi`)
    .then((response) => response.data);
};

export const addToLocalApi = async (id: number) => {
  console.log(id)
  return clientApi
    .post(`/coins/`,{coinApiId: id})
    .then((response) => response.data);
};
