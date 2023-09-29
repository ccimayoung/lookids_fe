import axios from 'axios';

export const base = 'http://49.50.165.8:8080';

// 옷 타입별로 불러오기
export const closetClothListApi = () => {
  return axios.get(`${base}/closet/closet-info`);
};

// 자녀 데이터 저장
export const postKidInfoApi = (params: FormData) => {
  console.log(params);
  return axios.post(`${base}/closet/kid-info`, params);
};
