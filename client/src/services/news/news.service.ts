import Axios from "../api.service";
import {NewsArticle} from "./news.interfaces";

export const getNews = async (keywords: string[]): Promise<NewsArticle[]> => {
    let response;
    if (keywords.length === 0) {
        response = await Axios.get<NewsArticle[]>("/news");
    }
    else {
        response = await Axios.get<NewsArticle[]>("/news", {params: {keywords}});
        return response.data;
    }
    return response.data;
}

export const newsService = {
    getNews,
}