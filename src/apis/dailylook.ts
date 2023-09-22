import { AxiosRequestConfig } from 'axios';
import baseUrl from '../utils/axios/baseUrl';

interface IPurchaseInfoProps {
  brand: string;
  description: string;
  link: string;
}
export interface IPostDailylookProps {
  age: number;
  category: string;
  description: string;
  hashTag: Array<string> | undefined;
  height: number;
  imageUrls: Array<string>;
  purchaseInfos: Array<IPurchaseInfoProps>;
  season: string;
  sex: string;
  userId: number;
  weight: number;
}
export interface IGetDailylookProps {
  height: string | number | undefined;
  category: number | string | undefined;
  season: number | string | undefined;
  sex: number | string | undefined;
  weigh: number | string | undefined;
}
export const dailyLookApis = {
  getDailyLookList: async (props: IGetDailylookProps) => {
    return await baseUrl.get(
      `/daily/clothes?category=${props.category || ''}&height=${props.height || ''}&season=${props.season || ''}&sex=${props.sex || ''}&weigh=${
        props.weigh || ''
      }&page=0&pageSize=200`,
    );
  },
  getDailyLookDetail: async (dailyfoodId: number) => {
    return await baseUrl.get(`/daily/clothes/${dailyfoodId}`);
  },
  postDailyLook: async (data: IPostDailylookProps) => {
    return await baseUrl.post('/daily/clothes', data);
  },
};
