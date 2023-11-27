import axios from "axios";

export const clientApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

clientApi.interceptors.request.use(async (config) => {
  
  const accessToken = localStorage.getItem("token");
  const requestConfig = config;
  if (accessToken && requestConfig.headers) {
    requestConfig.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return requestConfig;
});