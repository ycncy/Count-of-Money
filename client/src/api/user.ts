import { clientApi } from './client-api';
import { Profile, News } from '../types';

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
