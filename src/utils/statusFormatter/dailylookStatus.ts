interface ISeason {
  AUTUMN: string;
  SPRING: string;
  SUMMER: string;
  WINTER: string;
}

export const Season: ISeason = {
  AUTUMN: 'AUTUMN',
  SPRING: 'SPRING',
  SUMMER: 'SUMMER',
  WINTER: 'WINTER',
};


interface IGender {
  BOY: string;
  GIRL: string;
}

export const Gender: IGender = {
  BOY: 'BOY',
  GIRL: 'GIRL',
};
interface ITarget {
  BOY: string;
  GIRL: string;
  BABY: string;
}

export const Target: ITarget = {
  BOY: 'BOY',
  GIRL: 'GIRL',
  BABY: 'BABY',
};

interface ISaleStatus {
  DONE: string;
  SALE: string;
}

export const saleStatus: ISaleStatus = {
  DONE: 'DONE',
  SALE: 'SALE',
};
interface ICategory {
  ACCESSORY: string;
  BOTTOM: string;
  ETC: string;
  OUTER: string;
  SHOES: string;
  TOP: string;
}
interface IHeight {
  HEIGHT_110: string;
  HEIGHT_70: string;
  HEIGHT_71_90: string;
  HEIGHT_91_110: string;
}
interface IWeight {
  WEIGHT_10: string;
  WEIGHT_11_15: string;
  WEIGHT_16_20: string;
  WEIGHT_21_25: string;
  WEIGHT_26_30: string;
  WEIGHT_30: string;
}

export const Category: ICategory = {
  ACCESSORY: 'ACCESSORY',
  BOTTOM: 'BOTTOM',
  ETC: 'ETC',
  OUTER: 'OUTER',
  SHOES: 'SHOES',
  TOP: 'TOP',
};

export const Height: IHeight = {
  HEIGHT_110: 'HEIGHT_110',
  HEIGHT_70: 'HEIGHT_70',
  HEIGHT_71_90: 'HEIGHT_71_90',
  HEIGHT_91_110: 'HEIGHT_91_110',
};
export const Weight: IWeight = {
  WEIGHT_10: 'WEIGHT_10',
  WEIGHT_11_15: 'WEIGHT_11_15',
  WEIGHT_16_20: 'WEIGHT_16_20',
  WEIGHT_21_25: 'WEIGHT_21_25',
  WEIGHT_26_30: 'WEIGHT_26_30',
  WEIGHT_30: 'WEIGHT_30',
};
