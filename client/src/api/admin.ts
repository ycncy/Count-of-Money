import { Coin } from '../types';
import { clientApi } from './client-api';

export const fetchAllCoinsFromApi = async () => {
  return clientApi
    .get<Coin>(`/coins/AllFromApi`)
    .then((response) => response.data);
};

export const addToLocalApi = async (id: number) => {
  console.log(id);
  return clientApi
    .post(`/coins/`, { coinApiId: id })
    .then((response) => response.data);
};

// For Admin
export const addToFavouritesCoins = async (coinId: number): Promise<Coin> => {
  return clientApi
    .post<any>(`/coins`, {
      coinApiId: coinId,
    })
    .then((response) => response.data);
};

export const deleteFavoriteCoins = async (id: number) => {
  console.log(id);
  return clientApi
    .delete(`/favorites/coins/${id}`)
    .then((response) => response.data);
};
