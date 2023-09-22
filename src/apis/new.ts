import baseUrl from '../utils/axios/baseUrl';

export interface IResNewMarket {
  lookidsProducts: [
    {
      productImageUrls: Array<string>;
      productName: string;
      productPrice: number;
    },
  ];
}

interface IGetNewMarket {
  category: string | number;
  kidType: string | number;
  query: string;
}

export const newMarketApis = {
  getNewMarketList: async (props: IGetNewMarket) => {
    return await baseUrl.get(`/new?category=${props.category || ''}&kidType=${props.kidType || ''}&query=${props.query || ''}&page=0&pageSize=200`);
  },
  getNewMarketHotList: async () => {
    return await baseUrl.get('/new/hot?page=0&pageSize=200');
  },
  getNewMarketDetail: async (marketProductId: number) => {
    return await baseUrl.get(`/new/${marketProductId}`);
  },
};
