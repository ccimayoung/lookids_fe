import { atom } from 'recoil';
import { Option } from '../../../components/Dropdown/component';

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
export const selectedSalesStatusAtom = atom<Option | null>({
  key: 'selectedSalesStatusAtom',
  default: null,
});
