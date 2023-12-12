import {Coin} from '../types';
import {clientApi} from './client-api';

export const getAllUsers = async () => {
    return clientApi.get(`/users`).then((response) => response.data);
}

export const deleteUser = async (userId: number) => {
    return clientApi.delete(`/users/${userId}`).then((response) => response.data);
}

export const fetchAllCoinsFromApi = async () => {
    return clientApi
        .post<Coin>(`/coins/AllFromApi`)
        .then((response) => response.data);
};

export const addToLocal = async (coinId: number) => {
    return clientApi
        .post<any>(`/coins`, {
            coinApiId: coinId,
        })
        .then((response) => response.data);
};

export const deleteFromLocal = async (coinId: number) => {
    return clientApi
        .delete(`/coins/${coinId}`)
        .then((response) => {
            console.log(response.data);
            return response.data;
        });
};
