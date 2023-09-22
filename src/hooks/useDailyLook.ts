import { UseInfiniteQueryOptions, useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { IGetDailylookProps, IPostDailylookProps, dailyLookApis } from '../apis/dailylook';
import { IDailylookList } from '../pages/DailyLook';

interface DailyLookData {
  length: number;
}
export interface IDailylookDetail {
  data: {
    age: number;
    description: string;
    hashTag: string;
    height: number;
    imageUrls: [string];
    purchaseInfos: [
      {
        brand: string;
        description: string;
        link: string;
      },
    ];
    sex: string;
    user: {
      name: string;
      userId: string;
    };
    weight: number;
  };
}
interface ApiProps {
  data: {
    dailyLooks: Array<IDailylookList>;
  };
}
export const useGetDailylookList = (props: IGetDailylookProps) => {
  return useQuery<ApiProps>(['dailylook-list'], async () => await dailyLookApis.getDailyLookList(props), { retry: false });
};
export const useGetDailylookDetail = (dailyfoodId: number) => {
  return useQuery<IDailylookDetail>(['dailylook-detail'], async () => await dailyLookApis.getDailyLookDetail(dailyfoodId), { retry: false });
};
export const usePostDailylook = () => {
  const queryClinet = useQueryClient();
  return useMutation((data: IPostDailylookProps) => dailyLookApis.postDailyLook(data), {
    onSuccess: () => {
      queryClinet.invalidateQueries(['dailylook-list']);
    },
  });
};
