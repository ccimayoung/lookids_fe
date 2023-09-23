import { AxiosRequestConfig } from 'axios';
import baseUrl from '../utils/axios/baseUrl';

interface IPurchaseInfoProps {
  brand: string;
  description: string;
  link: string;
}
export interface IPostReslllookProps {
  productImage: string | number | undefined;
  productName: string | number | undefined;
  productPrice: string | number | undefined;
  sellerNickname: string | number | undefined;
  userId: string | number | undefined;
}
export interface IGetResllkProps {
  saleStatus: string | number | undefined;
  category: number | string | undefined;
  searchKeyword: number | string | undefined;
  target: number | string | undefined;
}
export const resellApis = {
  getResellList: async (props: IGetResllkProps) => {
    return await baseUrl.get(
      `/resell/products?category=${props.category || ''}&saleStatus=${props.saleStatus || ''}&target=${props.target || ''}&searchKeyword=${
        props.searchKeyword || ''
      }&page=0&pageSize=200`,
    );
  },
  getResellDetail: async (dailyfoodId: number) => {
    return await baseUrl.get(`/daily/clothes/${dailyfoodId}`);
  },
  postResell: async (data: IPostReslllookProps) => {
    return await baseUrl.post('/resell/products', data);
  },
  searchPhoto: async (data: FormData) => {
    return await baseUrl.post('/resell/products/image-search', data);
  },
};
