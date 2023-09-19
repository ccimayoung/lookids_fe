import baseUrl from '../utils/axios/baseUrl';

export const dailyLookApis ={
  getDailyLookList:async(pageParam:number)=> await baseUrl.get(`/${pageParam}`)
};