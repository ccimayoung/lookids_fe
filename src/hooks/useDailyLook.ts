import {  UseInfiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query';
import { dailyLookApis } from '../apis/dailylook';


interface DailyLookData{
  length:number
}

export const useGetDailyfoodList = () => {
  const queryKey = ['daily_look'];

  const queryFn :UseInfiniteQueryOptions<DailyLookData[], string[]>['queryFn']  = async ({ pageParam = 1 }: { pageParam?: number }) => {
    // pageParam은 페이지 번호를 나타냅니다. 초기에는 1로 시작하며 스크롤 시에 페이지 번호를 증가시킵니다.
    const response = await dailyLookApis.getDailyLookList(pageParam);
    // API 응답 데이터를 DailyLookData 배열로 변환
    const data: DailyLookData[] = response.data; // 데이터를 추출하여 배열로 변환
    return data;
  };

  const queryConfig: Omit<UseInfiniteQueryOptions<DailyLookData[], unknown, DailyLookData[], DailyLookData[], string[]>, 'queryFn' | 'queryKey'> = {
    getNextPageParam: (lastPage) => {
      // 이 함수에서 다음 페이지 번호를 계산합니다.
      // 예를 들어, 마지막 페이지에서 가져온 데이터의 길이가 0 또는 음수면 null을 반환하여 더 이상 데이터가 없음을 나타냅니다.
      // 그렇지 않으면 다음 페이지 번호를 반환합니다.
      const lastPageData = lastPage[lastPage.length - 1];
      if (lastPageData.length === 0) {
        return null; // 더 이상 데이터가 없음
      }
      return lastPage.length + 1; // 다음 페이지 번호 계산
    },
  };

  return useInfiniteQuery(queryKey, queryFn, queryConfig);
};