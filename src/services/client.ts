import axios, { AxiosError } from "axios";
import { API_ROOT } from "../lib/endpoints";

export const httpClient = axios.create({
  baseURL: API_ROOT,
});

httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);