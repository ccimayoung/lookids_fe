export const seasonFormatted = (season: string | undefined) => {
  switch (season) {
    case 'AUTUMN':
      return '가을';
    case 'SPRING':
      return '봄';
    case 'SUMMER':
      return '여름';
    case 'WINTER':
      return '겨울';
    default:
      break;
  }
};

export const genderFormatted = (gender: string | undefined) => {
  switch (gender) {
    case 'BOY':
      return '남';
    case 'GIRL':
      return '여';
    default:
      break;
  }
};
export const targetFormatted = (gender: string | undefined) => {
  switch (gender) {
    case 'BOY':
      return '키즈(남)';
    case 'GIRL':
      return '키즈(여)';
    case 'BABY':
      return '베이비';
    default:
      break;
  }
};
export const saleStatusFormatted = (gender: string | undefined) => {
  switch (gender) {
    case 'DONE':
      return '판매완료';
    case 'SALE':
      return '여';
    default:
      break;
  }
};
export const genderReverseFormatted = (gender: string | undefined) => {
  switch (gender) {
    case '남':
      return 'BOY';
    case '여':
      return 'GIRL';
    default:
      break;
  }
};

export const categoryFormatted = (category: string | undefined) => {
  switch (category) {
    case 'ACCESSORY':
      return '악세서리';
    case 'BOTTOM':
      return '하의';
    case 'ETC':
      return '기타';
    case 'OUTER':
      return '아우터';
    case 'SHOES':
      return '신발';
    case 'TOP':
      return '상의';
    default:
      break;
  }
};
