import styled from 'styled-components';
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
const IconWrapper = styled.div`
  justify-content: center;
  align-items: center;
`;

export default Component;
