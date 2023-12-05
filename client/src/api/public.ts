import { Coin, LocalCoin } from "../types";
import { clientApi } from "./client-api";

export const getAllCoins = async () => {
  return clientApi
  .get<Coin>("/coins/allFromApi")
  .then((response) => response.data);
}

export const getAllLocalCoins = async () => {
  return clientApi
  .get<LocalCoin[]>("/coins")
  .then((response) => response.data);
}