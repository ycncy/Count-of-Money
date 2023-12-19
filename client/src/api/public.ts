import { Coin } from '../types';
import { LocalCoin } from '../services/coins/public/public.coins.interfaces';
import { clientApi } from './client-api';

export const getPaginationCoins = async (link: string) => {
    return clientApi
    .get<Coin>(link)
    .then((response) => {
        return response.data;
    });
}

export const getAllCoins = async () => {
  return clientApi
  .get<Coin>("/coins/allFromApi")
  .then((response) => {
    console.log(response.data);
    return response.data;
  });
}

export const getAllLocalCoins = async () => {
  return clientApi
  .get<LocalCoin[]>("/coins")
  .then((response) => response.data);
}