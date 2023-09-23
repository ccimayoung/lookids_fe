import { ReactNode } from 'react';
import styled from 'styled-components';

interface IButtonProps {
  width: string;
  height: string;
  color: string;
  center: string;
  bold?: string;
  $isclick: string;
  value?: string;
}

interface ILabelProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  text?: string;
  value?: string | undefined;
  disabled?: boolean;
  color: string;
  width: string;
  height: string;
  placeholder?: string;
  center: boolean;
  bold?: boolean;
}

const Component = ({ onClick, onChange, text, value, disabled, width, height, color, placeholder, center, bold }: ILabelProps) => {
  return (
    <IconWrapper
      $isclick={onClick ? 'true' : 'false'}
      value={value && value}
      onClick={onClick}
      width={width}
      height={height}
      color={color}
      center={center.toString()}
      bold={bold?.toString()}
    >
      {onChange ? <LabelInput value={value || ''} disabled={disabled} onChange={onChange} placeholder={placeholder && placeholder} /> : text}
    </IconWrapper>
  );
};

// Styling
const IconWrapper = styled.button<IButtonProps>`
  border: ${({ theme, color }) => (color === '#FFFFFF' ? `1px solid ${theme.colors.yellow[3]}` : 'none')};
  font-size: 0.8rem;
  white-space: nowrap;
  background-color: ${({ color }) => color};
  border-radius: 5px;
  width: ${({ width }) => (width.includes('%') ? width : `${width}px`)};
  height: ${({ height }) => `${height}px`};
  display: flex;
  font-weight: ${({ bold }) => (bold === 'true' ? 600 : 400)};
  cursor: ${({ $isclick, value }) => ($isclick === 'true' && !value ? 'pointer' : 'auto')};
  justify-content: ${({ center }) => (center === 'true' ? 'center' : 'flex-start')};
  align-items: center;
`;
const LabelInput = styled.input`
  width: 100%;
  border: none;
  background-color: transparent;
  outline: none;
`;
export default Component;
