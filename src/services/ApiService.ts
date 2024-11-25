import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.axiosInstance.interceptors.request.use(
      async (config) => {
        const token = await this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  private async getToken(): Promise<string | null> {
    try {
      const token = await AsyncStorage.getItem('authToken');
      return token;
    } catch (error) {
      console.error("Erro ao obter o token:", error);
      return null;
    }
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.get<T>(url, config);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  public async post<T, R>(url: string, data: T, config?: AxiosRequestConfig): Promise<R> {
    try {
      const response: AxiosResponse<R> = await this.axiosInstance.post<R>(url, data, config);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  public async put<T, R>(url: string, data: T, config?: AxiosRequestConfig): Promise<R> {
    try {
      const response: AxiosResponse<R> = await this.axiosInstance.put<R>(url, data, config);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.delete<T>(url, config);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  private handleError(error: any) {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 401) {
        return Promise.reject('Unauthorized');
      } else {
        return Promise.reject(data);
      }
    } else if (error.request) {
      return Promise.reject('No response from server');
    } else {
      return Promise.reject('Request error');
    }
  }
}

export default ApiService;
