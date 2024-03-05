import axios, { AxiosError } from "axios";
import { API_ROOT } from "../lib/endpoints";

/**
 * HTTP client
 * 
 * @exports httpClient
 */
export const httpClient = axios.create({
  baseURL: API_ROOT,
});

/**
 * Request interceptor
 * 
 */
httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);