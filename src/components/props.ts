export interface divProps {
  $titleWidth?: string;
  $contentSize?: string;
  $cGap?: string;
}

export interface titleAndSelectBoxProps {
  $title?: string;
  $titleWidth?: string;
  $writeAble?: boolean;
  $list: string[];
  $content: string;
  $contentSize?: string;
}

export interface clothCategoryListProps {
  topList: oneClothProps[];
  bottomList: oneClothProps[];
  outerList: oneClothProps[];
  shoesList: oneClothProps[];
  accessoryList: oneClothProps[];
  etcList: oneClothProps[];
}

export interface oneClothProps {
  clothId: string;
  colorList: { color: string; img: string }[];
  scaleList: { scale: [number, number]; size: string }[];
  type: string;
}
