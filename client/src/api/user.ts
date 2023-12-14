import { clientApi } from './client-api';
import {
    Profile,
    News,
    Coin,
    CoinHistory,
    VictoryDataPoint,
    DefaultFav,
    CoinData,
    RawCoins, CoinHistoryWithSymbol, Granularity,
} from '../types';

export const getMe = async () => {
  return clientApi
    .get<Profile>(`/users/profile`)
    .then((response) => response.data);
};

export const getNews = async (search: string) => {
  return clientApi
    .get<News[]>(`/articles?news=${encodeURIComponent(search)}`)
    .then((response) => response.data);
};

export const editUser = async (data: Profile) => {
  return clientApi
    .put<Profile>(`/users/${data.id}`, data)
    .then((response) => response.data);
};

export const getOneCoinHistory = async (
  id: number,
  granularity: Granularity
): Promise<CoinHistoryWithSymbol> => {
  try {
    const response = await clientApi.get<CoinHistory>(
      `/coins/${id}/history/${granularity}`
    );
    const data = response.data;
    const dataPoints = transformToVictoryFormat(data);
    return {
      symbol: data.symbol,
      dataPoints
    };
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return { symbol: "", dataPoints: [] };
  }
};

function transformToVictoryFormat(data: CoinHistory): VictoryDataPoint[] {
  return data.datetimes.map((datetime, index) => ({
    x: new Date(datetime),
    open: data.open[index],
    close: data.close[index],
    high: data.high[index],
    low: data.low[index],
    volume: data.volume[index],
  }));
}

export const getLocalCoins = async () => {
  return clientApi.get<RawCoins[]>(`/coins`).then((response) => response.data);
};

export const addToFavouritesCoins = async (coinId: number) => {
  return clientApi
    .post<any>(`/favorites/coins/${coinId}`)
    .then((response) => response.data);
};

export const getUserFav = async (userId: number) => {
  return clientApi
    .get<DefaultFav[]>(`/favorites/users/${userId}`)
    .then((response) => response.data);
};

export const removeFromFavouritesCoins = async (coinId: number) => {
  return clientApi
    .delete(`/favorites/coins/${coinId}`)
    .then((response) => {
      console.log(response);
      return response.data;
    });
};

export const addToUserKeywords = async (body: any) => {
  return clientApi
    .post<any>(`/users/keywords/`, body)
    .then((response) => response.data);
};

