import Axios from "../../api.service";
import {CoinHistory, LocalCoin, LocalCoinInfo} from "./public.coins.interfaces";
import {Coin, Granularity} from "../../../types";

export const getLocalCoinsByListId = async (coinsIds: number): Promise<LocalCoin[]> => {
  const response = await Axios.get<LocalCoin[]>(`/coins`, {
    params: {
      cmids: coinsIds,
    },
  });
  return response.data;
};

export const getLocalCoinById = async (coinId: number): Promise<LocalCoinInfo> => {
    const response = await Axios.get<LocalCoinInfo>(`/coins/${coinId}`);
    return response.data;
}

export const getLocalCoins = async (): Promise<LocalCoin[]> => {
    const response = await Axios.get<LocalCoin[]>(`/coins`);
    return response.data;
};

export const getHistory = async (coinId: number, granularity: Granularity): Promise<CoinHistory>=>  {
    const response = await Axios.get<CoinHistory>(`/coins/${coinId}/history/${granularity}`);
    return response.data;
}

export const publicCoinsService = {
    getLocalCoinsByListId,
    getLocalCoins,
    getHistory,
    getLocalCoinById
}