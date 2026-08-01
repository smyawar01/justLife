import axios, { AxiosRequestConfig } from 'axios';
import { ApiResponse, FetchOptions } from '@/core/networking/types/common';

const BASE_URL = process.env.API_BASE_URL;
const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST;
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-rapidapi-host': RAPIDAPI_HOST,
    'x-rapidapi-key': RAPIDAPI_KEY,
  },
});

export async function httpGet<T>(
  endpoint: string,
  options?: FetchOptions & { params?: Record<string, any> }
): Promise<ApiResponse<T>> {
  try {
    const config: AxiosRequestConfig = {
      headers: options?.headers,
      params: options?.params,
    };

    const response = await axiosInstance.get<T>(endpoint, config);

    return {
      data: response.data,
      error: null,
      status: response.status,
    };
  } catch (err: any) {
    const errorMessage =
      err?.response?.data?.message || err?.message || 'Network request failed';
    return {
      data: null,
      error: errorMessage,
      status: err?.response?.status || 500,
    };
  }
}
