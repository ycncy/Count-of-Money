import { Coin } from "../types";
import { clientApi } from "./client-api";

export const fetchAllCoinsFromApi = async () => {
  return clientApi
    .post<Coin[]>(`/cryptos/AllFromApi`)
    .then((response) => response.data);
};

export const addToLocalApi = async (id: number) => {
  return clientApi
    .post(`/cryptos/addToLocalApi/${id}`)
    .then((response) => response.data);
}