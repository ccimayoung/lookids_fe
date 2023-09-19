import styled from 'styled-components/native';
import { ComponentProps } from './globalIconType';
/**
 *
 * @param {object} props
 * @param {number} scale
 * @param {number} height
 * @param {number} width
 * @returns
 */

const Component = ({ children, style }: ComponentProps) => {
  return <IconWrapper style={{ ...style }}>{children}</IconWrapper>;
};

// Styling
const IconWrapper = styled.View`
  justify-content: center;
  align-items: center;
`;

export default Component;
