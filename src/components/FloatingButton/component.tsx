import { ReactNode } from 'react';
import styled from 'styled-components';
/**
 *
 * @param {object} props
 * @param {number} scale
 * @param {number} height
 * @param {number} width
 * @returns
 */

const Component = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: ReactNode;
}) => {
  return <IconWrapper onClick={onClick}>{children}</IconWrapper>;
};

// Styling
const IconWrapper = styled.button`
  border: none;
  position: absolute;
  background-color: ${({ theme }) => theme.colors.yellow[4]};
  bottom: 80px;
  width: 45px;
  height: 45px;
  border-radius: 300px;
  display: flex;
  cursor: pointer;
  right: 30px;
  justify-content: center;
  align-items: center;
`;

export default Component;
