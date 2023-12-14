import Axios from "../../api.service";

export const addDefaultFavorite = async (coinId: number) => {
    const response = await Axios.post(`/favorites/default/coins/${coinId}`);
    return response.data;
}

export const deleteDefaultFavorite = async (coinId: number) => {
    const response = await Axios.delete(`/favorites/default/coins/${coinId}`);
    return response.data;
}

export const adminFavoritesService = {
    addDefaultFavorite,
    deleteDefaultFavorite
}