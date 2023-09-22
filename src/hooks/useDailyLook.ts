import { UseInfiniteQueryOptions, useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { IPostDailylookProps, dailyLookApis } from '../apis/dailylook';
import { IDailylookList } from '../pages/DailyLook';

interface DailyLookData {
  length: number;
}
interface ApiProps {
  data: {
     dailyLooks: Array<IDailylookList>;
  };
}
export const useGetDailylookList = () => {
  return useQuery<ApiProps>(['dailylook-list'], async () => await dailyLookApis.getDailyLookList(), {});
};
export const useGetDailylookDetail = (dailyfoodId:number) => {
  return useQuery<ApiProps>(['dailylook-detail'], async () => await dailyLookApis.getDailyLookDetail(dailyfoodId), {});
};
export const usePostDailylook = () => {
  const queryClinet = useQueryClient();
  return useMutation(
    (data: IPostDailylookProps) => dailyLookApis.postDailyLook(data),
    {
      onSuccess: () => {
        queryClinet.invalidateQueries(['dailylook-list']);
      },
    }
  );
};
