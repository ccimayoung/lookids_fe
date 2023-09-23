import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { IGetResllkProps, IPostReslllookProps, resellApis } from '../apis/resell';

interface IResellList {
  data: {
    resellProductResponse: [
      {
        resellProductId:number;
        productImage: string;
        productName: string;
        productPrice: number;
        sellerNickname: string;
        userId: number;
      },
    ];
  };
}


interface IUserName{
  'name': string;
  'userId': number;
}

interface IPurchaseInfos{
  'brand': string,
  'description': string,
  'link': string
}
interface IResellDetail {
  data: {
    'age': number,
    'description': string,
    'hashTag': Array<string>,
    'height': number,
    'id': number,
    'imageUrls': Array<string>,
    'purchaseInfos': Array<IPurchaseInfos>,
    'sex': string,
    'user':IUserName
    'weight': number
  }
}

export const useGetResellList = (props: IGetResllkProps) => {
  return useQuery<IResellList>(['resll-list'], async () => await resellApis.getResellList(props), {
    retry: false,
  });
};
export const useGetResellDetail = (props: number) => {
  return useQuery<IResellDetail>(['resll-detail'], async () => await resellApis.getResellDetail(props), {
    retry: false,
  });
};

export const usePostResell = () => {
  const queryClinet = useQueryClient();
  return useMutation((data: FormData) => resellApis.postResell(data), {
    onSuccess: () => {
      queryClinet.invalidateQueries(['resll-list']);
    },
  });
};
export const usePhotoEngine = () => {
  const queryClinet = useQueryClient();
  return useMutation((data: FormData) => resellApis.searchPhoto(data), {
    onSuccess: () => {
      queryClinet.invalidateQueries(['resll-list']);
    },
  });
};
