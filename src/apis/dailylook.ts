import { AxiosRequestConfig } from 'axios';
import baseUrl from '../utils/axios/baseUrl';

interface IPurchaseInfoProps{
  'brand': string;
  'description': string;
  'link': string;
}
export interface IPostDailylookProps{
  'age': number;
  'category': string[];
  'description': string;
  'hashTag': Array<string> | undefined;
  'height': number;
  'imageUrls': Array<File>;
  'purchaseInfos': Array<IPurchaseInfoProps>;
  'season': string[];
  'sex': string;
  'weight': number;
}

export const dailyLookApis = {
  getDailyLookList: async () => {
    return await baseUrl.get('/daily/clothes?category=BOTTOM&height=40&season=SUMMER&sex=BOY&weigh=80&page=0&pageSize=40');
  },
  getDailyLookDetail: async (dailyfoodId:number) => {
    return await baseUrl.get(`/daily/clothes/${dailyfoodId}`);
  },
  postDailyLook: async (data:IPostDailylookProps) => {
    return await baseUrl.get('/daily/clothes',{
      data:data
    });
  },
};
