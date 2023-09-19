import { CSSProperties, ReactNode } from 'react';

export interface IIconProps {
  onClick?: () => void;
}
export interface ComponentProps {
  children: ReactNode;
  style?: CSSProperties;
}
