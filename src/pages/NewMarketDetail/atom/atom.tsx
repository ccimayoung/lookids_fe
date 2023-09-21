import { atom } from 'recoil';
import { Option } from '../../../components/Dropdown/component';

export const selectedColorAtom = atom<Option | null>({
  key: 'selectedColorAtom',
  default: null,
});
export const selectedSizeAtom = atom<Option | null>({
  key: 'selectedSizeAtom',
  default: null,
});
