import { Coin } from '../types';
import { clientApi } from './client-api';

// Favorite KeyWords for users

export const addToFavouritesKeyWords = async (keyWord: string) => {
  return clientApi
    .post(`/users/keywords`, { keyWord })
    .then((response) => response.data);
};

export const deleteFavoriteKeyWords = async (id: number) => {
  return clientApi
    .delete(`/users/keywords`, { data: { keyWordId: id } })
    .then((response) => response.data);
};
