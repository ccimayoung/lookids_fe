import React from 'react';
import styled from 'styled-components';

// 스타일드 컴포넌트를 사용하여 버튼 스타일 정의
const ToggleButtonContainer = styled.div`
  display: inline-block;
  width: 24px;
  height: 12px;
  background-color: ${({ theme }) => theme.colors.neutral[1]};
  border-radius: 15px;
  position: relative;
  cursor: pointer;
  &.active {
    background-color: ${({ theme }) => theme.colors.yellow[3]};
  }
  &:before {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: ${({ theme }) => theme.colors.neutral[0]};
    border-radius: 50%;
    top: 1px;
    left: 1px;
    transition: 0.3s;
  }

  &.active:before {
    background-color: ${({ theme }) => theme.colors.yellow[0]};
    transform: translateX(12px);
  }
`;

const Component = ({ isActive, setIsActive }: { isActive: boolean; setIsActive: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const toggleButton = () => {
    setIsActive(!isActive);
  };

  return <ToggleButtonContainer className={isActive ? 'active' : ''} onClick={toggleButton}></ToggleButtonContainer>;
};

export default Component;
