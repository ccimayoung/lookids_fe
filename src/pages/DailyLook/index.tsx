import React, { useState } from 'react';
import styled from 'styled-components';
import { BottomSheet } from '../../components/BottomSheet';
import { ArrowDown } from '../../components/GlobalIcon';
import { DailyLookCard } from './components/DailyLookCard';
import { FloatingButton } from '../../components/FloatingButton';

export interface IAppProps {}

export default function DailyLook() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const changeTab = (index: number) => {
    setActiveTab(index);
  };
  const toggleSheet = (index: number | null) => {
    if (index !== null) setActiveTab(index);
    setIsOpen(!isOpen);
  };
  return (
    <Container>
      <Contents>
        <AdBannerBox>광고입니다.</AdBannerBox>
        <CategoryContainer>
          <CategoryButton onClick={() => toggleSheet(0)}>
            <CategoryText>계절</CategoryText>
            <ArrowDown />
          </CategoryButton>
          <CategoryButton onClick={() => toggleSheet(1)}>
            <CategoryText>성별</CategoryText>
            <ArrowDown />
          </CategoryButton>
          <CategoryButton onClick={() => toggleSheet(2)}>
            <CategoryText>연령대</CategoryText>
            <ArrowDown />
          </CategoryButton>
          <CategoryButton onClick={() => toggleSheet(3)}>
            <CategoryText>키/몸무게</CategoryText>
            <ArrowDown />
          </CategoryButton>
          <CategoryButton onClick={() => toggleSheet(4)}>
            <CategoryText>커뮤니티</CategoryText>
            <ArrowDown />
          </CategoryButton>
        </CategoryContainer>
        <CardContainer>
          <DailyLookCard />
          <DailyLookCard />
          <DailyLookCard />
          <DailyLookCard />
          <DailyLookCard />
        </CardContainer>
        <FloatingButton onClick={() => console.log('test')}>
          버튼
        </FloatingButton>
      </Contents>
      <BottomSheet
        isOpen={isOpen}
        onClick={() => toggleSheet(null)}
        changeTab={changeTab}
        activeTab={activeTab}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Contents = styled.div`
  padding: 24px;
`;
const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  gap: 48px;
`;
const AdBannerBox = styled.div`
  width: 100%;
  height: 50px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.blue[500]};
`;
const CategoryButton = styled.button`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.grey[0]};
  gap: 5px;
  padding: 5px 10px;
  color: ${({ theme }) => theme.colors.grey[2]};
  border: ${({ theme }) => `1px solid ${theme.colors.grey[5]}`};
  border-radius: 15px;
  cursor: pointer;
`;

const CategoryText = styled.div`
  font-size: 11px;
`;

const CategoryContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  position: sticky;
  height: 48px;
  top: 0;
  z-index: 1;
  width: 100%;
  margin-top: 40px;
  justify-content: space-between;
`;
