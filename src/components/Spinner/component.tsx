// Spinner.tsx
import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div`
  display: inline-block;
  width: 40px;
  height: 40px;
  border: 5px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: ${({theme})=>`5px solid ${theme.colors.yellow[3]}`};
  animation: ${spin} 1s linear infinite;
`;

const Component: React.FC = () => {
  return <SpinnerContainer />;
};

export default Component;
