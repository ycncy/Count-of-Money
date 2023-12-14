import Axios from "../../api.service";
import {LocalCoin} from "../../coins/public/public.coins.interfaces";

export const addUserFavorite = async (coinId: number) => {
    const response = await Axios.post(`/favorites/coins/${coinId}`);
    return response.data;
}

export const deleteUserFavorite = async (coinId: number) => {
    const response = await Axios.delete(`/favorites/coins/${coinId}`);
    return response.data;
}

export const getUserFavorites = async (): Promise<LocalCoin[]> => {
    const response = await Axios.get<LocalCoin[]>(`/favorites/users`);
    return response.data;
}

export const getDefaultFavorites = async (): Promise<LocalCoin[]> => {
    const response = await Axios.get<LocalCoin[]>(`/favorites/default`);
    return response.data;
}

export const publicFavoritesService = {
    addUserFavorite,
    deleteUserFavorite,
    getUserFavorites,
    getDefaultFavorites
}