import {  UseInfiniteQueryOptions, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { dailyLookApis } from '../apis/dailylook';
import { IDailylookList } from '../pages/DailyLook';


interface DailyLookData{
  length:number
}
interface ApiProps {
  data:Array<IDailylookList>
}
export const useGetDailyfoodList = () => {
  return useQuery<ApiProps>(['dailylook-list'],async ()=>await dailyLookApis.getDailyLookList(),{
    
  });
};