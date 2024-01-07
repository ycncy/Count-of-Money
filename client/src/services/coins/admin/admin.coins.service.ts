import Axios from '../../api.service';
import {
  ApiCoin,
  ApiCoinPaginated,
  CreateCoinDto,
  UpdateCoinDto,
} from './admin.coins.interfaces';

export const addApiCoinToDb = async (createCoinDto: CreateCoinDto) => {
  const response = await Axios.post(`/coins`, {
    ...createCoinDto,
  });
  return response.data;
};

export const updateLocalCoin = async (updateCoinDto: UpdateCoinDto) => {
  const response = await Axios.put(`/coins`, {
    ...updateCoinDto,
  });
  return response.data;
};

export const deleteLocalCoin = async (coinId: number) => {
  const response = await Axios.delete(`/coins/${coinId}`);
  return response.data;
};

export const addCoinsFromApi = async (): Promise<ApiCoin> => {
  const response = await Axios.post(`/coins/AllFromApi`);
  return response.data;
};

export const getCoinsFromApi = async (
  url: string
): Promise<ApiCoinPaginated> => {
  const response = await Axios.get<ApiCoinPaginated>(url);
  return response.data;
};

export const adminCoinsService = {
  addApiCoinToDb,
  updateLocalCoin,
  deleteLocalCoin,
  addCoinsFromApi,
  getCoinsFromApi,
};
