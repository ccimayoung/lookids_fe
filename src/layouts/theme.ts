import { DefaultTheme } from 'styled-components';

export const grey = {
  0: '#FFFFFF', // white
  8: '#F5F5F5', // grey 8
  7: '#E4E3E7', // grey 7
  6: '#D5D4D9', // grey 6
  5: '#BDBAC1', // grey 5
  4: '#88888E', // grey 4
  3: '#5F5E62', // grey 3
  2: '#343337', // grey 2
  1: '#1D1C21', // grey 1
};

export const neutral = {
  0: '#FFFFFF',
  1: '#EEEEEE',
  2: '#C0C0C0',
  3: '#77777C',
  4: '#1A1A1A',
};

// Blue
export const blue = {
  100: '#EFF2FE',
  500: '#3478F6',
};

// Red
export const red = {
  100: '#FFEAEA',
  500: '#EA1A21',
};
export const orange = {
  100: '#FFD1A3',
  500: '#FF8100',
};

// Yellow
export const yellow = {
  1: '#FFF6C2',
  2: '#FFF09D',
  3: '#FFE55A',
  4: '#FFD600',
};

// Green
export const green = {
  100: '#F2FBF6',
  300: '#C1FF3D',
  500: '#2AC769',
};

// Purple
export const purple = {
  100: '#F5F2FF',
  500: '#5A1EFF',
  600: '#000046',
};
export const pink = {
  100: '#FFDEE0',
  300: '#FFCBCB',
  500: '#FF0FA0',
  600: '#000046',
};

export const brown = {
  1: '#EEDBC0',
  2: '#a7866a',
};

export const etc = {
  kakao: '#FFE812',
  naver: '#4FA42B',
};

const colors = {
  grey,
  blue,
  neutral,
  red,
  yellow,
  green,
  purple,
  pink,
  brown,
  etc,
};

const Theme: DefaultTheme = {
  colors,
};

export default Theme;
// Grey
