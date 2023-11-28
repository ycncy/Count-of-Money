import { Coin, LocalCoin } from "../types";
import { clientApi } from "./client-api";

export const getAllCoins = async () => {
  return clientApi
  .get<Coin[]>("/cryptos/allFromApi")
  .then((response) => response.data);
}

export const getAllLocalCoins = async () => {
  return clientApi
  .get<LocalCoin[]>("/cryptos")
  .then((response) => response.data);
}