import axios, { AxiosRequestConfig } from 'axios';

export default class NyxxFetch {
  async get<T>(url: string, options?: AxiosRequestConfig) {
    return axios.get<T>(url, options);
  }

  async post<T>(url: string, data: any, options?: AxiosRequestConfig) {
    return axios.post<T>(url, data, options);
  }
}
