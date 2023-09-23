import axios from 'axios';

export const base = 'http://49.50.165.8:8080';

// 옷 타입별로 불러오기
export const closetClothListApi = () => {
  return axios.get(`${base}/closet/closet-info`);
};
