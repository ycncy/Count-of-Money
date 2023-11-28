import { Coin } from "../types";
import { clientApi } from "./client-api";

export const getAllCoins = async () => {
  return clientApi
  .get<Coin[]>("/cryptos/allFromApi")
  .then((response) => response.data);
}