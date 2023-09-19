import {
  AxiosError, AxiosInstance,  AxiosResponse, InternalAxiosRequestConfig,
} from 'axios';

const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  // console.info(`[request] [${JSON.stringify(config)}]`);
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }

  return config;
};
const onRequestError = (error: AxiosError): Promise<AxiosError> =>
// console.error(`[request error] [${JSON.stringify(error)}]`);
  Promise.reject(error);
const onResponse = (response: AxiosResponse): AxiosResponse => response;
const onResponseError = (error: AxiosError): Promise<AxiosError> =>
  // console.error(`[response error] [${JSON.stringify(error)}]`);
  Promise.reject(error);
export default function interceptors(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}