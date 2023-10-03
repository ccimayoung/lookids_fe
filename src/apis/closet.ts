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

// 자녀 데이터 불러오기
export const getKidInfoApi = () => {
  // console.log(params);
  return axios.get(`${base}/closet/kid-info`);
};

// 내 코디 불러오기
export const getCodyApi = () => {
  // console.log(params);
  return axios.get(`${base}/closet/my-style`);
};

// 내 코디 저장하기
export const postCodyApi = (params: FormData) => {
  console.log(params);
  return axios.post(`${base}/closet/my-style`, params);
};
