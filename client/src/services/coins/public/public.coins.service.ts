import Axios from "../../api.service";
import {CoinHistory, LocalCoin} from "./public.coins.interfaces";
import {Granularity} from "../../../types";

export const getLocalCoinsByListId = async (coinsIds: number): Promise<LocalCoin[]> => {
  const response = await Axios.get(`/coins`, {
    params: {
      cmids: coinsIds,
    },
  });
  return response.data;
};

export const getLocalCoins = async (): Promise<LocalCoin[]> => {
    const response = await Axios.get(`/coins`);
    return response.data;
};

export const getHistory = async (coinId: number, granularity: Granularity): Promise<CoinHistory>=>  {
    const response = await Axios.get(`/coins/${coinId}/history/${granularity}`);
    return response.data;
}

export const publicCoinsService = {
    getLocalCoinsByListId,
    getLocalCoins,
    getHistory
}