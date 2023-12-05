import { clientApi } from "./client-api";
import { Profile, News, Coin, CoinHistory, VictoryDataPoint } from "../types";

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
}

export const getOneCoinHistory = async (id: number): Promise<VictoryDataPoint[]> => {
  try {
    const response = await clientApi.get<CoinHistory>(`/coins/${id}/history/month`);
    const data = response.data;
    return transformToVictoryFormat(data);
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return [];
  }
}

function transformToVictoryFormat(data: CoinHistory): VictoryDataPoint[] {
  return data.datetimes.map((datetime, index) => ({
    x: new Date(datetime),
    open: data.open[index],
    close: data.close[index],
    high: data.high[index],
    low: data.low[index],
    volume: data.volume[index]
  }));
}