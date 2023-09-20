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

// 아영
export const selectedClothAtom = atom<string>({
  key: 'selectedClothAtom',
  default: '',
});
export const hoveredClothAtom = atom<string>({
  key: 'hoveredClothAtom',
  default: '',
});
