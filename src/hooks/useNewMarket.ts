import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { newMarketApis } from '../apis/new';

export interface INewMarketItemProps {
  productImageUrls: Array<string>;
  productName: string;
  productPrice: number;
}
interface IResNewMarket {
  data: {
    lookidsProducts: Array<INewMarketItemProps>;
  };
}

interface IGetNewMarketDetail {
  data: {
    color: Array<string>;
    description: string;
    mainImageUrls: string;
    price: number;
    productName: string;
    sizeImageUrls: Array<string>;
    subImageUrls: Array<string>;
  };
}

interface IGetNewMarket {
  category: string | number;
  kidType: string | number;
  query: string;
}

export const useGetNewMarketList = (props: IGetNewMarket) => {
  return useQuery<IResNewMarket>(['newmarket-list'], async () => await newMarketApis.getNewMarketList(props), {
    retry: false,
  });
};
export const useGetNewMarketHotList = () => {
  return useQuery<IResNewMarket>(['newmarket-hot-list'], async () => await newMarketApis.getNewMarketHotList(), {
    retry: false,
  });
};

export const useGetNewMarketDetail = (marketProductId: number) => {
  return useQuery<IGetNewMarketDetail>(['newmarket-detail'], async () => await newMarketApis.getNewMarketDetail(marketProductId), { retry: false });
};
