import { atom } from 'recoil';
import { Option } from '../components/Dropdown/component';

// 갱태
export const modalStatus = atom({
  key: 'modalStatus',
  default: false,
});
export const selectedGenderAtom = atom<Option | null>({
  key: 'selectedGenderAtom',
  default: null,
});
export const selectedHeightAtom = atom<Option | null>({
  key: 'selectedHeightAtom',
  default: null,
});
export const selectedWeightAtom = atom<Option | null>({
  key: 'selectedWeightAtom',
  default: null,
});
export const selectedSeasonsAtom = atom<Option | null>({
  key: 'selectedSeasonsAtom',
  default: null,
});
export const selectedCategoryAtom = atom<Option | null>({
  key: 'selectedCategoryAtom',
  default: null,
});
export const selectedTargetAtom = atom<Option | null>({
  key: 'selectedTargetAtom',
  default: null,
});

// 아영
export const selectedClothAtom = atom<string>({
  key: 'selectedClothAtom',
  default: '',
});

export const hoveredClothAtom = atom<string>({
  key: 'hoveredClothAtom',
  default: '',
});

export interface modalGatherProps {
  closetQuestion: boolean;
  closetBody: boolean;
  closetCart: boolean;
}
export const modalGatherAtom = atom<modalGatherProps>({
  key: 'modalGatherAtom',
  default: {
    closetQuestion: false,
    closetBody: false,
    closetCart: false,
  },
});

export interface simpleModalProps {
  simplePopup: boolean;
  content: string[][];
  onClick: () => void;
  btnContent: string;
}
export const simpleModalAtom = atom<simpleModalProps>({
  key: 'simpleModalAtom',
  default: { simplePopup: false, content: [[]], onClick: () => '', btnContent: '' },
});

export interface wearArrayProps {
  clothId: string;
  position: [number, number, number];
  img: any;
  scale: [number, number];
}
export const wearArrayAtom = atom<wearArrayProps[]>({
  key: 'wearArrayAtom',
  default: [],
});
