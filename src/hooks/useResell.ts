import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { IGetResllkProps, IPostReslllookProps, resellApis } from '../apis/resell';

interface IResellList {
  data: {
    resellProductResponse: [
      {
        productImage: string;
        productName: string;
        productPrice: number;
        sellerNickname: string;
        userId: number;
      },
    ];
  };
}

export const useGetResellList = (props: IGetResllkProps) => {
  return useQuery<IResellList>(['resll-list'], async () => await resellApis.getResellList(props), {
    retry: false,
  });
};

export const usePostResell = () => {
  const queryClinet = useQueryClient();
  return useMutation((data: IPostReslllookProps) => resellApis.postResell(data), {
    onSuccess: () => {
      queryClinet.invalidateQueries(['resll-list']);
    },
  });
};
