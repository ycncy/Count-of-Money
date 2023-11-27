import { clientApi } from "./client-api";
import { Profile, News } from "../types";

export const getMe = async () => {
  return clientApi
    .get<Profile>(`/users/profile`)
    .then((response) => response.data);
};

export const getNews = async () => {
  return clientApi
    .get<News[]>(`/articles`)
    .then((response) => response.data);
}