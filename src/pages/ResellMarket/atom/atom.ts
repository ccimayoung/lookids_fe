import { atom } from 'recoil';
import { Option } from '../../../components/Dropdown/component';

export const modalResllStatus = atom({
  key: 'modalResllStatus',
  default: false,
});
export const selectedResllGenderAtom = atom<Option | null>({
  key: 'selectedResllGenderAtom',
  default: null,
});
export const selectedResllHeightAtom = atom<Option | null>({
  key: 'selectedResllHeightAtom',
  default: null,
});
export const selectedResllWeightAtom = atom<Option | null>({
  key: 'selectedResllWeightAtom',
  default: null,
});
export const selectedResllSeasonsAtom = atom<Option | null>({
  key: 'selectedResllSeasonsAtom',
  default: null,
});
export const selectedResllCategoryAtom = atom<Option | null>({
  key: 'selectedResllCategoryAtom',
  default: null,
});
export const selectedResllTargetAtom = atom<Option | null>({
  key: 'selectedResllTargetAtom',
  default: null,
});
export const selectedResllSalesStatusAtom = atom<Option | null>({
  key: 'selectedResllSalesStatusAtom',
  default: null,
});
